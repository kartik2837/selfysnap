const mongoose = require('mongoose');
const { Schema } = mongoose;

const brandSchema = new Schema(
    {
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'Seller',
            required: true,
            index: true,
        },
        name: { type: String, required: true, trim: true },
        certificateUrl: { type: String, required: true },
        certificateNumber: { type: String, required: true, trim: true },
        status: {
            type: String,
            enum: ['PENDING', 'APPROVED', 'REJECTED'],
            default: 'PENDING',
            index: true,
        },
        rejectionReason: String,
        approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        approvedAt: Date,
    },
    { timestamps: true }
);

brandSchema.index({ seller: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Brand', brandSchema);