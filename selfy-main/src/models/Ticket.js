const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    ticketNumber: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default: null
    },
    category: {
        type: String,
        enum: ['ORDER', 'PAYMENT', 'PRODUCT', 'DELIVERY', 'REFUND', 'OTHER'],
        required: true
    },
    subject: {
        type: String,
        required: true,
        maxlength: 200,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    attachments: [{
        url: String,
        type: { type: String, default: 'image' },
        uploadedAt: { type: Date, default: Date.now }
    }],
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        default: 'MEDIUM'
    },
    status: {
        type: String,
        enum: ['OPEN', 'IN_PROGRESS', 'WAITING', 'RESOLVED', 'CLOSED'],
        default: 'OPEN',
        index: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    assignedAt: Date,
    resolvedAt: Date,
    closedAt: Date,
    resolutionNote: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    },
    feedback: String,
    messages: [{
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',              // ✅ Fixed
            default: null
        },
        senderName: String,
        senderRole: {
            type: String,
            enum: ['CUSTOMER', 'AGENT', 'SYSTEM'],
            required: true
        },
        message: String,
        attachments: [{
            url: String,
            type: String
        }],
        isInternal: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    lastMessageAt: {
        type: Date,
        default: Date.now
    },
    unreadCountCustomer: {
        type: Number,
        default: 0
    },
    unreadCountAgent: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

TicketSchema.index({ customer: 1, status: 1, lastMessageAt: -1 });
TicketSchema.index({ assignedTo: 1, status: 1 });

TicketSchema.statics.generateTicketNumber = function () {
    const date = new Date();
    const yymmdd = date.toISOString().slice(2, 10).replace(/-/g, '');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `TKT-${yymmdd}-${random}`;
};

module.exports = mongoose.model('Ticket', TicketSchema);