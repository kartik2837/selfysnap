// const mongoose = require('mongoose');
// const { Schema } = mongoose;


// const cartItemSchema = new Schema({
//     cart: { 
//         type: Schema.Types.ObjectId, 
//         ref: 'Cart', 
//         required: true 
//     },
//     product: { 
//         type: Schema.Types.ObjectId, 
//         ref: 'Product', 
//         required: true 
//     },
//     size: { 
//         type: String, 
//         required: true 
//     },
//     quantity: { 
//         type: Number, 
//         default: 1 
//     },
//     mrpPrice: { 
//         type: Number, 
//         default:0,
//         required: true 
//     },
//     sellingPrice: { 
//         type: Number,
//         default:0,
//         required: true 
//     },
//     userId: { 
//         type: String, 
//         required: true 
//     }
// }, { timestamps: true });

// const CartItem = mongoose.model('CartItem', cartItemSchema);
// module.exports = CartItem;

// module.exports = CartItem;














const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema({
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    mrpPrice: {
        type: Number,
        default: 0,
        required: true
    },
    sellingPrice: {
        type: Number,
        default: 0,
        required: true
    },
    userId: {
        type: String,
        required: true
    },

    /* ═══════════════════════════════════════════════
       🔥 CUSTOM DESIGN DATA
       ═══════════════════════════════════════════════ */
    customDesign: {
        enabled: { type: Boolean, default: false },

        /* Customer ka original uploaded image */
        originalImage: { type: String, default: null },

        /* Mockup + user image composite (preview dikhane ke liye) */
        previewImage: { type: String, default: null },

        /* 🔥 COMPOSITE — Product + User Design (ye cart me dikhegi) */
        compositeImage: { type: String, default: null },

        /* 300 DPI print-ready file (seller download karega) */
        printFile: { type: String, default: null },

        /* User ka design position data (for re-editing) */
        designData: {
            x: { type: Number, default: 0 },
            y: { type: Number, default: 0 },
            width: { type: Number, default: 0 },
            height: { type: Number, default: 0 },
            scaleX: { type: Number, default: 1 },
            scaleY: { type: Number, default: 1 },
            rotation: { type: Number, default: 0 },
        },

        /* Extra charge applied at time of adding */
        extraCharge: { type: Number, default: 0 },
    },

}, { timestamps: true });

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;