// const mongoose = require('mongoose');
// const OrderStatus = require('../domain/OrderStatus');
// const PaymentStatus = require('../domain/PaymentStatus');
// const { Schema } = mongoose;

// const DeliveryStatus = Object.freeze({
//     PENDING: 'pending',
//     SHIPPED: 'shipped',
//     IN_TRANSIT: 'in_transit',
//     OUT_FOR_DELIVERY: 'out_for_delivery',
//     DELIVERED: 'delivered',
//     RTO: 'rto',
// });


// const orderSchema = new Schema({

//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },

//     seller: {
//         type: Schema.Types.ObjectId,
//         ref: 'Seller',
//         required: true
//     },

//     orderItems: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: 'OrderItem'
//         }
//     ],

//     shippingAddress: {
//         type: Schema.Types.ObjectId,
//         ref: 'Address',
//         required: true
//     },

//     totalMrpPrice: Number,
//     totalSellingPrice: Number,
//     discount: { type: Number, default: 0 },

//     orderStatus: {
//         type: String,
//         enum: Object.values(OrderStatus),
//         default: OrderStatus.PENDING
//     },

//     totalItem: Number,

//     paymentStatus: {
//         type: String,
//         enum: Object.values(PaymentStatus),
//         default: PaymentStatus.PENDING
//     },

//     paymentMethod: {
//         type: String,
//         default: null
//     },

//     paymentDetails: {
//         status: { type: String, default: null },
//         method: { type: String, default: null },
//     },

//     orderDate: {
//         type: Date,
//         default: Date.now,
//         index: true
//     },

//     deliverDate: {
//         type: Date,
//         default: () => Date.now() + 7 * 24 * 60 * 60 * 1000
//     },

//     deliveredAt: {
//         type: Date,
//         default: null
//     },

//     commission: {
//         type: Number,
//         default: 0
//     },

//     // ─── ParentOrder link ──────────────────────────────────────────────
//     parentOrder: {
//         type: Schema.Types.ObjectId,
//         ref: 'ParentOrder',
//         default: null,
//     },

//     // ─── Commission & Payout Amounts ───────────────────────────────────
//     commissionRate: { type: Number, default: 10 },    // % e.g. 10 for 10%
//     commissionAmount: { type: Number, default: 0 },     // calculated: totalSellingPrice * commissionRate/100
//     sellerAmount: { type: Number, default: 0 },     // totalSellingPrice - commissionAmount

//     // ─── Delivery One Integration ───────────────────────────────────────
//     shipmentId: { type: String, default: null },
//     trackingId: { type: String, default: null },   // AWB number
//     trackingLink: { type: String, default: null },

//     deliveryStatus: {
//         type: String,
//         enum: Object.values(DeliveryStatus),
//         default: DeliveryStatus.PENDING,
//     },

//     // ─── Lifecycle Timestamps ──────────────────────────────────────────
//     packedAt: { type: Date, default: null },
//     shippedAt: { type: Date, default: null },

//     // ─── Delhivery B2C Integration ──────────────────────────────────────
//     pickupRequested: { type: Boolean, default: false },
//     podUrl: { type: String, default: null },
//     warehouseCode: { type: String, default: null },

// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);






const mongoose = require('mongoose');
const OrderStatus = require('../domain/OrderStatus');
const PaymentStatus = require('../domain/PaymentStatus');
const { Schema } = mongoose;

const DeliveryStatus = Object.freeze({
    PENDING: 'pending',
    SHIPPED: 'shipped',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    RTO: 'rto',
});

const orderSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },

    orderItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'OrderItem'
        }
    ],

    shippingAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },

    totalMrpPrice: Number,
    totalSellingPrice: Number,
    discount: { type: Number, default: 0 },

    orderStatus: {
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.PENDING
    },

    totalItem: Number,

    paymentStatus: {
        type: String,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.PENDING
    },

    paymentMethod: {
        type: String,
        default: null
    },

    paymentDetails: {
        status: { type: String, default: null },
        method: { type: String, default: null },
    },

    orderDate: {
        type: Date,
        default: Date.now,
        index: true
    },

    deliverDate: {
        type: Date,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000
    },

    deliveredAt: {
        type: Date,
        default: null
    },

    commission: {
        type: Number,
        default: 0
    },

    parentOrder: {
        type: Schema.Types.ObjectId,
        ref: 'ParentOrder',
        default: null,
    },

    commissionRate: { type: Number, default: 10 },
    commissionAmount: { type: Number, default: 0 },
    sellerAmount: { type: Number, default: 0 },

    shipmentId: { type: String, default: null },
    trackingId: { type: String, default: null },
    trackingLink: { type: String, default: null },

    deliveryStatus: {
        type: String,
        enum: Object.values(DeliveryStatus),
        default: DeliveryStatus.PENDING,
    },

    packedAt: { type: Date, default: null },
    shippedAt: { type: Date, default: null },

    pickupRequested: { type: Boolean, default: false },
    podUrl: { type: String, default: null },
    warehouseCode: { type: String, default: null },

    /* ═══════════════════════════════════════════════
       🔥 NEW: CUSTOM ORDER FLAGS
       ═══════════════════════════════════════════════ */
    hasCustomItems: {
        type: Boolean,
        default: false,
        index: true,
    },

    /* Total extra charge from custom designs in this order */
    totalCustomizationCharge: {
        type: Number,
        default: 0,
    },

    /* Overall production status for custom items */
    customProductionStatus: {
        type: String,
        enum: ["none", "pending", "in_progress", "ready", "shipped"],
        default: "none",
    },

}, { timestamps: true });

/* 🔥 Index for seller dashboard filtering */
orderSchema.index({ seller: 1, hasCustomItems: 1, customProductionStatus: 1 });

module.exports = mongoose.model('Order', orderSchema);