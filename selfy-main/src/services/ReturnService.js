// const Return = require('../models/Return');
// const Order = require('../models/Order');
// const OrderStatus = require('../domain/OrderStatus');

// class ReturnService {

//     /**
//      * User raises a return request for a delivered sub-order.
//      */
//     async createReturn(userId, orderId, reason) {
//         const order = await Order.findById(orderId);
//         if (!order) throw new Error('Order not found');
//         if (order.user.toString() !== userId.toString()) {
//             throw new Error('You are not authorized to return this order');
//         }
//         if (order.orderStatus !== OrderStatus.DELIVERED) {
//             throw new Error('Only delivered orders can be returned');
//         }

//         // Check no existing return for this order
//         const existing = await Return.findOne({ order: orderId });
//         if (existing) throw new Error('Return already requested for this order');

//         const ret = new Return({
//             order: orderId,
//             user: userId,
//             seller: order.seller,
//             reason,
//             refundAmount: order.totalSellingPrice,
//         });

//         return await ret.save();
//     }

//     /**
//      * Admin approves a return — delivery partner will pick up from customer.
//      */
//     async approveReturn(returnId, adminNote = '') {
//         const ret = await Return.findById(returnId);
//         if (!ret) throw new Error('Return not found');
//         if (ret.status !== 'requested') {
//             throw new Error(`Cannot approve return in status: ${ret.status}`);
//         }

//         ret.status = 'admin_approved';
//         ret.adminNote = adminNote;

//         // Update the sub-order status to RETURNED
//         await Order.findByIdAndUpdate(ret.order, { orderStatus: OrderStatus.RETURNED });

//         return await ret.save();
//     }

//     /**
//      * Admin rejects a return request.
//      */
//     async rejectReturn(returnId, adminNote = '') {
//         const ret = await Return.findById(returnId);
//         if (!ret) throw new Error('Return not found');
//         ret.status = 'rejected';
//         ret.adminNote = adminNote;
//         return await ret.save();
//     }

//     /**
//      * Mark return as refunded after payment is reversed.
//      */
//     async markRefunded(returnId) {
//         const ret = await Return.findById(returnId);
//         if (!ret) throw new Error('Return not found');
//         ret.status = 'refunded';
//         ret.refundStatus = 'processed';
//         return await ret.save();
//     }

//     async getAllReturns() {
//         return await Return.find()
//             .populate('user', 'name email mobile')
//             .populate('seller', 'sellerName email')
//             .populate('order')
//             .sort({ createdAt: -1 });
//     }

//     async getReturnsByUser(userId) {
//         return await Return.find({ user: userId })
//             .populate('order')
//             .sort({ createdAt: -1 });
//     }

//     async getReturnById(returnId) {
//         return await Return.findById(returnId)
//             .populate('user', 'name email')
//             .populate('seller', 'sellerName')
//             .populate('order');
//     }
// }

// module.exports = new ReturnService();







// services/ReturnService.js
const Return = require('../models/Return');
const Order = require('../models/Order');
const OrderStatus = require('../domain/OrderStatus');
const DeliveryOneService = require('./DeliveryOneService');

class ReturnService {

    /**
     * User raises a return request for a delivered sub-order.
     * 👇 Updated: accepts description, media, pickupAddress
     */
    async createReturn(userId, orderId, reason, description = '', media = null, pickupAddress = null) {
        const order = await Order.findById(orderId);
        if (!order) throw new Error('Order not found');
        if (order.user.toString() !== userId.toString()) {
            throw new Error('You are not authorized to return this order');
        }
        if (order.orderStatus !== OrderStatus.DELIVERED) {
            throw new Error('Only delivered orders can be returned');
        }

        // Check no existing return for this order
        const existing = await Return.findOne({ order: orderId });
        if (existing) throw new Error('Return already requested for this order');

        const ret = new Return({
            order: orderId,
            user: userId,
            seller: order.seller,
            reason,
            description,                                    // 👈 NEW
            media: media || { images: [], videos: [], audio: null },  // 👈 NEW
            pickupAddress: pickupAddress || order.address?.fullAddress || null,  // 👈 NEW
            refundAmount: order.totalSellingPrice,
        });

        return await ret.save();
    }

    /**
     * Admin approves a return — triggers Delivery One pickup API.
     * 👇 Updated: Calls DeliveryOneService and saves tracking details
     */
    async approveReturn(returnId, adminNote = '') {
        const ret = await Return.findById(returnId);
        if (!ret) throw new Error('Return not found');
        if (ret.status !== 'requested') {
            throw new Error(`Cannot approve return in status: ${ret.status}`);
        }

        // 1️⃣ Fetch Order Details
        const order = await Order.findById(ret.order)
            .populate('address')
            .populate('items.product');

        if (!order) throw new Error('Order not found for this return');

        // 2️⃣ Call Delivery One API to schedule Return Pickup
        try {
            const pickupPayload = {
                orderNumber: order._id.toString(),
                customerName: order.address?.name || 'Customer',
                customerPhone: order.address?.phone || '9999999999',
                pickupAddress: ret.pickupAddress || order.address?.fullAddress || 'N/A',
                pincode: order.address?.pincode || '110001',
                reason: ret.reason,
                products: order.items?.map(item => ({
                    name: item.product?.title || 'Product',
                    quantity: item.quantity || 1,
                    price: item.price || 0,
                })) || [],
            };

            // 📞 Call Delivery API
            const deliveryResponse = await DeliveryOneService.createReturnPickup(pickupPayload);

            // 3️⃣ Save Delivery Response IDs
            ret.returnShipmentId = deliveryResponse.shipmentId;
            ret.returnTrackingId = deliveryResponse.trackingId;
            ret.status = 'admin_approved';
            ret.adminNote = adminNote;

            // 4️⃣ Update Order Status
            await Order.findByIdAndUpdate(ret.order, { 
                orderStatus: 'RETURN_PICKUP_SCHEDULED' 
            });

            await ret.save();
            return ret;

        } catch (deliveryError) {
            console.error('Delivery API Error:', deliveryError.message);
            throw new Error(`Failed to schedule pickup: ${deliveryError.message}`);
        }
    }

    /**
     * Admin rejects a return request.
     */
    async rejectReturn(returnId, adminNote = '') {
        const ret = await Return.findById(returnId);
        if (!ret) throw new Error('Return not found');
        ret.status = 'rejected';
        ret.adminNote = adminNote;
        return await ret.save();
    }

    /**
     * Mark return as refunded after payment is reversed.
     */
    async markRefunded(returnId) {
        const ret = await Return.findById(returnId);
        if (!ret) throw new Error('Return not found');
        ret.status = 'refunded';
        ret.refundStatus = 'processed';
        return await ret.save();
    }

    /**
     * Get all returns (Admin)
     */
    async getAllReturns() {
        return await Return.find()
            .populate('user', 'fullName email mobile')
            .populate('seller', 'sellerName email')
            .populate('order')
            .sort({ createdAt: -1 });
    }

    /**
     * Get returns by user (Customer)
     */
    async getReturnsByUser(userId) {
        return await Return.find({ user: userId })
            .populate('order')
            .sort({ createdAt: -1 });
    }

    /**
     * Get single return by ID
     */
    async getReturnById(returnId) {
        return await Return.findById(returnId)
            .populate('user', 'fullName email')
            .populate('seller', 'sellerName')
            .populate('order');
    }

    /**
     * 👇 NEW: Update pickup status (called by Delivery Webhook or Admin)
     */
    async updatePickupStatus(returnId, newStatus, additionalData = {}) {
        const ret = await Return.findById(returnId);
        if (!ret) throw new Error('Return not found');

        const allowedTransitions = {
            'admin_approved': ['pickup_scheduled', 'assigned_to_delivery'],
            'assigned_to_delivery': ['pickup_scheduled', 'received'],
            'pickup_scheduled': ['received'],
            'received': ['refunded'],
        };

        const allowed = allowedTransitions[ret.status] || [];
        if (!allowed.includes(newStatus) && newStatus !== ret.status) {
            throw new Error(`Invalid status transition from ${ret.status} to ${newStatus}`);
        }

        ret.status = newStatus;
        
        if (additionalData.scheduledPickup) {
            ret.scheduledPickup = additionalData.scheduledPickup;
        }

        await ret.save();
        return ret;
    }
}

module.exports = new ReturnService();