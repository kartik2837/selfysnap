// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const orderItemSchema = new Schema({
    
//     product: {
//         type: Schema.Types.ObjectId,
//         ref: 'Product', // Reference to the Product model
//         required: true,
//     },
//     size: {
//         type: String,
//         required: true,
//     },
//     quantity: {
//         type: Number,
//         required: true,
//     },
//     mrpPrice: {
//         type: Number,
//         required: true,
//     },
//     sellingPrice: {
//         type: Number,
//         required: true,
//     },
// }, {
//     timestamps: true,
// });

// const OrderItem = mongoose.model('OrderItem', orderItemSchema);
// module.exports = OrderItem;






const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderItemSchema = new Schema({

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    mrpPrice: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },

    /* ═══════════════════════════════════════════════
       🔥 CUSTOM DESIGN DATA
       ═══════════════════════════════════════════════ */
    customDesign: {
        enabled: { type: Boolean, default: false },

        originalImage: { type: String, default: null },
        previewImage: { type: String, default: null },

        /* 🔥 COMPOSITE — Product + User Design */
        compositeImage: { type: String, default: null },

        printFile: { type: String, default: null },

        designData: {
            x: { type: Number, default: 0 },
            y: { type: Number, default: 0 },
            width: { type: Number, default: 0 },
            height: { type: Number, default: 0 },
            scaleX: { type: Number, default: 1 },
            scaleY: { type: Number, default: 1 },
            rotation: { type: Number, default: 0 },
        },

        extraCharge: { type: Number, default: 0 },

        /* Print details snapshot */
        printSize: {
            widthCm: Number,
            heightCm: Number,
            dpi: Number,
        },
    },

    /* 🔥 Production tracking */
    printingStatus: {
        type: String,
        enum: ["pending", "printing", "printed", "packed", "failed"],
        default: "pending",
    },
    printedAt: { type: Date, default: null },

}, {
    timestamps: true,
});

orderItemSchema.pre('save', function (next) {
    if (this.customDesign?.enabled && !this.printingStatus) {
        this.printingStatus = "pending";
    }
    next();
});

orderItemSchema.index({ "customDesign.enabled": 1, printingStatus: 1 });

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem;