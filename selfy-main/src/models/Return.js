// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const ReturnStatus = Object.freeze({
//     REQUESTED: 'requested',
//     ADMIN_APPROVED: 'admin_approved',
//     PICKUP_SCHEDULED: 'pickup_scheduled',
//     RECEIVED: 'received',
//     REFUNDED: 'refunded',
//     REJECTED: 'rejected',
// });

// const returnSchema = new Schema(
//     {
//         // The sub-order (Order doc) being returned
//         order: {
//             type: Schema.Types.ObjectId,
//             ref: 'Order',
//             required: true,
//         },

//         user: {
//             type: Schema.Types.ObjectId,
//             ref: 'User',
//             required: true,
//         },

//         seller: {
//             type: Schema.Types.ObjectId,
//             ref: 'Seller',
//             required: true,
//         },

//         reason: {
//             type: String,
//             required: true,
//             trim: true,
//         },

//         status: {
//             type: String,
//             enum: Object.values(ReturnStatus),
//             default: ReturnStatus.REQUESTED,
//         },

//         refundAmount: {
//             type: Number,
//             default: 0,
//         },

//         refundStatus: {
//             type: String,
//             enum: ['pending', 'processed'],
//             default: 'pending',
//         },

//         // Admin notes (optional)
//         adminNote: {
//             type: String,
//             default: null,
//         },

//         // Delivery One shipment for return pickup
//         returnShipmentId: { type: String, default: null },
//         returnTrackingId: { type: String, default: null },
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model('Return', returnSchema);








const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReturnStatus = Object.freeze({
    REQUESTED: 'requested',
    ADMIN_APPROVED: 'admin_approved',
    ASSIGNED_TO_DELIVERY: 'assigned_to_delivery',  // 👈 NEW
    PICKUP_SCHEDULED: 'pickup_scheduled',
    RECEIVED: 'received',
    REFUNDED: 'refunded',
    REJECTED: 'rejected',
});

const returnSchema = new Schema(
    {
        // The sub-order (Order doc) being returned
        order: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        seller: {
            type: Schema.Types.ObjectId,
            ref: 'Seller',
            required: true,
        },

        reason: {
            type: String,
            required: true,
            trim: true,
        },

        // 👇 NEW: Description (optional)
        description: {
            type: String,
            default: '',
            trim: true,
        },

        status: {
            type: String,
            enum: Object.values(ReturnStatus),
            default: ReturnStatus.REQUESTED,
        },

        refundAmount: {
            type: Number,
            default: 0,
        },

        refundStatus: {
            type: String,
            enum: ['pending', 'processed'],
            default: 'pending',
        },

        // Admin notes (optional)
        adminNote: {
            type: String,
            default: null,
        },

        // Delivery One shipment for return pickup
        returnShipmentId: { 
            type: String, 
            default: null 
        },
        returnTrackingId: { 
            type: String, 
            default: null 
        },

        // 👇 NEW: Media Upload Fields (Images, Videos, Audio)
        media: {
            images: { 
                type: [String], 
                default: [] 
            },
            videos: { 
                type: [String], 
                default: [] 
            },
            audio: { 
                type: String, 
                default: null 
            }
        },

        // 👇 NEW: Pickup Address (if different from order address)
        pickupAddress: {
            type: String,
            default: null,
        },

        // 👇 NEW: Scheduled Pickup Date/Time
        scheduledPickup: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Return', returnSchema);