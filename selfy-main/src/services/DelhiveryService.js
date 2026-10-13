/**
 * DelhiveryService.js
 * 
 * Handles all communication with the Delhivery B2C API.
 * API documents: https://track.delhivery.com
 */

const axios = require('axios');

const BASE_URL = process.env.DELHIVERY_BASE_URL || 'https://track.delhivery.com';
const TOKEN = process.env.DELHIVERY_API_TOKEN;

class DelhiveryService {
    constructor() {
        if (!TOKEN) {
            console.warn('[Delhivery] Warning: DELHIVERY_API_TOKEN is not defined in .env');
        } else {
            console.log(`[Delhivery] Service initialized with token (length: ${TOKEN.length})`);
        }

        this.client = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Authorization': `Token ${TOKEN.trim()}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            timeout: 20000,
        });

        // Add request interceptor for debugging
        this.client.interceptors.request.use(config => {
            console.log(`[Delhivery] Outgoing Request: ${config.method.toUpperCase()} ${config.url}`);
            return config;
        });
    }

    /**
     * Check pincode serviceability and COD availability.
     */
    async checkServiceability(pincode) {
        try {
            const response = await this.client.get(`/c/api/pin-codes/json/?filter=pincode:${pincode}`);
            return response.data;
        } catch (error) {
            console.error('[Delhivery] Serviceability check failed:', error.message);
            throw error;
        }
    }

    /**
     * Register a seller warehouse (Pickup Location).
     * Needs to be called once per seller.
     */
    async createWarehouse(sellerData) {
        try {
            // Documented required fields for Delhivery One warehouse creation
            const payload = {
                name: sellerData.warehouseName,
                registered_name: sellerData.businessName,
                address: sellerData.address,
                pin: sellerData.pincode,
                phone: sellerData.mobile,
                city: sellerData.city,
                state: sellerData.state,
                country: 'India',
                // Return details are mandatory in Delhivery One
                return_address: sellerData.address,
                return_pin: sellerData.pincode,
                return_phone: sellerData.mobile,
                return_city: sellerData.city,
                return_state: sellerData.state,
                return_country: 'India'
            };

            console.log('[Delhivery] Creating warehouse with payload:', JSON.stringify(payload));
            const response = await this.client.post('/api/backend/clientwarehouse/create/', payload);
            return response.data;
        } catch (error) {
            const errorData = error.response?.data;
            const errorMessage = errorData?.data?.message || errorData?.message || error.message;

            if (errorData) {
                console.error('[Delhivery] Warehouse creation raw error response:', JSON.stringify(errorData));

                // Handle "already exists" error gracefully
                const errorStr = JSON.stringify(errorData).toLowerCase();
                if (errorStr.includes('already exists') || errorStr.includes('duplicate')) {
                    console.log('[Delhivery] Warehouse already exists. Treating as success.');
                    return {
                        success: true,
                        data: {
                            name: sellerData.warehouseName
                        },
                        message: "Warehouse already exists"
                    };
                }
            }

            console.error('[Delhivery] Warehouse creation failed:', errorMessage);
            throw new Error(errorMessage);
        }
    }

    /**
     * Create a shipment (pushing order to Delhivery).
     */
    async createShipment(subOrder, seller, customerAddress) {
        try {
            const isCOD = subOrder.paymentMethod === 'COD';
            const pickupName = seller.delhiveryWarehouseCode || seller.sellerName;

            // Crucial: Use pickup address if business address is missing
            const sellerAddress = seller.businessDetails?.businessAddress ||
                (seller.pickupAddress?.address) ||
                "Address not specified";

            const payload = {
                shipments: [{
                    add: customerAddress.address,
                    address_type: "home",
                    phone: customerAddress.mobile,
                    payment_mode: isCOD ? "COD" : "Prepaid",
                    name: customerAddress.name,
                    pin: customerAddress.pinCode,
                    order: subOrder._id.toString(),
                    waybill: "", // Let Delhivery assign automatically
                    cod: isCOD ? subOrder.totalSellingPrice : 0,
                    shipping_mode: "Surface", // Added mandatory field
                    total_amount: subOrder.totalSellingPrice,
                    seller_add: sellerAddress,
                    seller_name: seller.businessDetails?.businessName || seller.sellerName,
                    seller_inv: subOrder._id.toString(),
                    quantity: subOrder.totalItem || 1,
                    commodity: "B2C Product", // Added commodity field
                    weight: subOrder.totalWeight || 500, // grams
                    pickup_location: pickupName,
                }],
                pickup_location: {
                    name: pickupName,
                }
            };

            console.log(`[Delhivery] Creating shipment. Pickup: ${pickupName}, Destination Pin: ${customerAddress.pinCode}, Seller Pin: ${seller.pickupAddress?.pinCode}`);
            console.log('[Delhivery] Payload:', JSON.stringify(payload));

            const response = await this.client.post('/api/cmu/create.json', `format=json&data=${JSON.stringify(payload)}`, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            const data = response.data;
            if (!data.success) {
                console.error('[Delhivery] Shipment creation API error:', JSON.stringify(data));
                throw new Error(data.rmk || (data.packages && data.packages[0].remarks[0]) || "Shipment creation failed");
            }

            const result = {
                shipmentId: data.packages[0].waybill,
                awbNumber: data.packages[0].waybill,
                trackingLink: `https://www.delhivery.com/track-v2/package/${data.packages[0].waybill}`
            };

            console.log(`[Delhivery] Shipment created successfully! Waybill: ${result.awbNumber}`);
            return result;
        } catch (error) {
            if (error.response?.data) {
                console.error('[Delhivery] createShipment raw error response:', JSON.stringify(error.response.data));
            }
            console.error('[Delhivery] createShipment failed:', error.message);
            throw error;
        }
    }

    /**
     * Create a pickup request (PUR).
     */
    async createPickupRequest(seller, subOrder) {
        try {
            const payload = {
                pickup_time: "10:00:00", // HH:MM:SS
                pickup_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
                pickup_location: seller.delhiveryWarehouseCode || seller.sellerName,
                expected_package_count: 1
            };
            console.log('[Delhivery] Sending pickup request:', JSON.stringify(payload));
            const response = await this.client.post('/fm/request/new/', payload);
            return response.data;
        } catch (error) {
            const data = error.response?.data;
            if (data) {
                console.error('[Delhivery] Pickup request raw error response:', JSON.stringify(data));
                // Extracting the most descriptive message from known Delhivery error fields
                const specificError = data.prepaid || data.rmk || (data.packages && data.packages[0]?.remarks?.[0]);
                if (specificError) throw new Error(specificError);
            }
            console.error('[Delhivery] Pickup request failed:', error.message);
            throw new Error(error.message);
        }
    }

    /**
     * Fetch shipping label (raw content).
     */
    async getShippingLabel(waybill) {
        try {
            const response = await axios.get(`${BASE_URL}/api/p/packing_slip?wbns=${waybill}`, {
                headers: {
                    'Authorization': `Token ${TOKEN.trim()}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('[Delhivery] Label fetch failed:', error.message);
            throw error;
        }
    }

    /**
     * Get tracking details for a shipment.
     */
    async trackShipment(waybill) {
        try {
            const response = await this.client.get(`/api/v1/packages/json/?waybill=${waybill}`);
            return response.data;
        } catch (error) {
            console.error('[Delhivery] Tracking failed:', error.message);
            throw error;
        }
    }

    /**
     * Fetch pre-assigned waybills if required.
     */
    async fetchWaybills(count = 1) {
        try {
            const response = await this.client.get(`/waybill/api/fetch/json/?count=${count}`);
            return response.data;
        } catch (error) {
            console.error('[Delhivery] Waybill fetch failed:', error.message);
            throw error;
        }
    }

    /**
     * Cancel a shipment.
     */
    async cancelShipment(waybill) {
        try {
            const payload = {
                waybill: waybill,
                cancellation: true
            };
            const response = await this.client.post('/api/p/edit', payload);
            return response.data;
        } catch (error) {
            console.error('[Delhivery] Shipment cancellation failed:', error.message);
            throw error;
        }
    }

    /**
     * Get estimated shipping charges.
     */
    async getShippingCost(origin, destination, weight, codAmount = 0) {
        try {
            const response = await this.client.get(`/api/kbs/calculate-price?md=S&ss=Delivered&d_pin=${destination}&o_pin=${origin}&c_amount=${codAmount}&pt=Pre-paid&wt=${weight}`);
            return response.data;
        } catch (error) {
            console.error('[Delhivery] Shipping cost calculation failed:', error.message);
            throw error;
        }
    }

    /**
     * Download documents (POD, Labels, etc).
     * Only works in test/staging if base URL is set to staging.
     */
    async downloadDocument(waybills, type = 'POD') {
        try {
            // Bulk Document Download API
            const response = await this.client.get(`/api/p/bwbnl/${type}/json?wbns=${waybills.join(',')}`);
            return response.data;
        } catch (error) {
            console.error('[Delhivery] Document download failed:', error.message);
            throw error;
        }
    }

    /**
     * Get manifest for a warehouse.
     */
    async getManifest(warehouseName) {
        try {
            const response = await this.client.get(`/api/p/manifest/json/?warehouse=${warehouseName}`);
            return response.data;
        } catch (error) {
            console.error('[Delhivery] Manifest fetch failed:', error.message);
            throw error;
        }
    }

    /**
     * Generate manifest PDF link.
     */
    async generateManifestPDF(warehouseName) {
        try {
            const response = await this.client.get(`/api/p/manifest/pdf/?warehouse=${warehouseName}`);
            return response.data;
        } catch (error) {
            console.error('[Delhivery] Manifest PDF generation failed:', error.message);
            throw error;
        }
    }
}

module.exports = new DelhiveryService();
