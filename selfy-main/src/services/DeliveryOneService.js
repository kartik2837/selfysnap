// services/DeliveryOneService.js
const axios = require('axios');

/**
 * DeliveryOneService - Handles all Delivery Partner (Shiprocket/Delhivery) API calls
 */
class DeliveryOneService {
    
    /**
     * Create a Return Pickup Request
     * @param {Object} payload - Pickup details
     * @returns {Object} { shipmentId, trackingId }
     */
    async createReturnPickup(payload) {
        try {
            // 📌 अपनी Delivery Partner की API URL डालें
            const API_URL = process.env.DELIVERY_API_URL || 'https://api.shiprocket.in/v1';
            const API_TOKEN = process.env.DELIVERY_API_TOKEN;

            console.log('📦 Creating return pickup for order:', payload.orderNumber);

            // 📌 अपनी Delivery Partner के API Format के अनुसार Payload बनाएँ
            const requestPayload = {
                order_id: payload.orderNumber,
                pickup_address: payload.pickupAddress,
                pincode: payload.pincode || '110001',
                customer_name: payload.customerName || 'Customer',
                customer_phone: payload.customerPhone || '9999999999',
                return_reason: payload.reason || 'Customer requested return',
                items: payload.products || [],
            };

            console.log('🚀 Sending request to Delivery API:', requestPayload);

            const response = await axios.post(
                `${API_URL}/returns/create`,
                requestPayload,
                {
                    headers: {
                        'Authorization': `Bearer ${API_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                    timeout: 10000,
                }
            );

            console.log('✅ Delivery API Response:', response.data);

            return {
                shipmentId: response.data.shipment_id || response.data.order_id || `SHIP-${Date.now()}`,
                trackingId: response.data.tracking_id || response.data.awb_number || `TRK-${Date.now()}`,
            };

        } catch (error) {
            console.error('❌ Delivery API Error:', error.response?.data || error.message);
            
            // Development के लिए Fake Response
            if (process.env.NODE_ENV === 'development') {
                console.warn('⚠️ Using fake delivery response for development');
                return {
                    shipmentId: `SHIP-FAKE-${Date.now()}`,
                    trackingId: `TRK-FAKE-${Date.now()}`,
                };
            }
            
            throw new Error(`Delivery API failed: ${error.response?.data?.message || error.message}`);
        }
    }

    /**
     * Track Return Pickup Status
     */
    async trackReturnPickup(trackingId) {
        try {
            const API_URL = process.env.DELIVERY_API_URL;
            const API_TOKEN = process.env.DELIVERY_API_TOKEN;

            const response = await axios.get(
                `${API_URL}/returns/track/${trackingId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${API_TOKEN}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error('Track API Error:', error.message);
            return { status: 'unknown' };
        }
    }

    /**
     * Cancel Return Pickup
     */
    async cancelReturnPickup(shipmentId) {
        try {
            const API_URL = process.env.DELIVERY_API_URL;
            const API_TOKEN = process.env.DELIVERY_API_TOKEN;

            await axios.post(
                `${API_URL}/returns/cancel/${shipmentId}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${API_TOKEN}`,
                    },
                }
            );
            return { success: true };
        } catch (error) {
            console.error('Cancel API Error:', error.message);
            throw new Error(`Failed to cancel pickup: ${error.message}`);
        }
    }
}

module.exports = new DeliveryOneService();