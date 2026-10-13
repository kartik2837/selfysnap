const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * ParentOrder — Groups all seller-wise SubOrders (Order docs) 
 * created in a single user checkout session.
 */
const parentOrderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        // All sub-orders (one per seller) created in this checkout
        subOrders: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Order',
            },
        ],

        totalAmount: {
            type: Number,
            required: true,
        },

        /**
         * paymentStatus mirrors PaymentStatus domain:
         *   PENDING      — online payment initiated
         *   PAID         — online payment confirmed
         *   COD_PENDING  — COD order, payment on delivery
         *   REFUNDED     — refund processed
         */
        paymentStatus: {
            type: String,
            enum: ['PENDING', 'PAID', 'COD_PENDING', 'REFUNDED'],
            default: 'PENDING',
        },

        /**
         * orderStatus at parent level:
         *   placed              — all sub-orders created
         *   partially_delivered — some sub-orders delivered
         *   completed           — all sub-orders delivered
         *   cancelled           — all sub-orders cancelled
         */
        orderStatus: {
            type: String,
            enum: ['pending', 'placed', 'partially_delivered', 'completed', 'cancelled'],
            default: 'pending',
        },

        shippingAddress: {
            type: Schema.Types.ObjectId,
            ref: 'Address',
            required: true,
        },

        // Link back to PaymentOrder for Razorpay tracking
        paymentOrder: {
            type: Schema.Types.ObjectId,
            ref: 'PaymentOrder',
            default: null,
        },
    },
    { timestamps: true }
);

// ── Helper: recompute parent order status after a sub-order changes ──────────
parentOrderSchema.methods.recomputeStatus = async function () {
    const Order = mongoose.model('Order');
    const subOrders = await Order.find({ _id: { $in: this.subOrders } });

    const total = subOrders.length;
    const delivered = subOrders.filter(o => o.orderStatus === 'DELIVERED').length;
    const cancelled = subOrders.filter(o => o.orderStatus === 'CANCELLED').length;

    if (delivered === total) {
        this.orderStatus = 'completed';
    } else if (cancelled === total) {
        this.orderStatus = 'cancelled';
    } else if (delivered > 0) {
        this.orderStatus = 'partially_delivered';
    } else {
        this.orderStatus = 'placed';
    }

    return this.save();
};

module.exports = mongoose.model('ParentOrder', parentOrderSchema);
