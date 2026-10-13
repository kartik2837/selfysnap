// const mongoose = require('mongoose');

// // Define the Product schema
// const productSchema = new mongoose.Schema({
    
//     // 🔹 Existing Fields (UNCHANGED)
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     mrpPrice: {
//         type: Number,
//         required: true
//     },
//     sellingPrice: {
//         type: Number,
//         required: true
//     },
//     discountPercent: {
//         type: Number,
//         required: true
//     },
//     quantity: {
//         type: Number,
//     },
//     color: {
//         type: String,
//         required: true
//     },
//     images: {
//         type: [String],
//         default: []
//     },
//     numRatings: {
//         type: Number,
//         default: 0
//     },
//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category',
//         required: true
//     },
//     seller: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Seller',
//         required: true
//     },
//     sizes: {
//         type: String,
//         required: false
//     },
//     reviews: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Review',
//         default: []
//     }],

//     // 🔥 NEW IMPORTANT FIELDS ADDED BELOW

//     // 🔹 Brand
//     brand: {
//         type: String,
//         required: true
//     },

//     // 🔹 SEO Slug
//     slug: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true
//     },

//     // 🔹 SKU (Inventory tracking)
//     sku: {
//         type: String,
//         required: true,
//         unique: true
//     },

//     // 🔹 GST & HSN
//     hsnCode: {
//         type: String,
//         required: true
//     },
//     gstPercent: {
//         type: Number,
//         required: true
//     },

//     countryOfOrigin: {
//         type: String,
//         default: "India"
//     },

//     // 🔹 Unit System (Solid / Liquid / Piece etc.)
//     unitValue: {
//         type: Number,
//         required: true
//     },
//     unitType: {
//         type: String,
//         enum: ["g", "kg", "ml", "liter", "piece", "pack", "meter", "cm"],
//         required: true
//     },

//     // 🔹 Weight (for shipping)
//     weight: {
//         value: Number,
//         unit: {
//             type: String,
//             enum: ["g", "kg"]
//         }
//     },

//     // 🔹 Dimensions
//     dimensions: {
//         length: Number,
//         width: Number,
//         height: Number,
//         unit: {
//             type: String,
//             enum: ["cm", "inch"]
//         }
//     },

//     // 🔹 Shipping
//     shippingCharges: {
//         type: Number,
//         default: 0
//     },
//     estimatedDeliveryDays: {
//         type: Number,
//         default: 3
//     },

//     // 🔹 Status Control
//     isActive: {
//         type: Boolean,
//         default: true
//     },
//     isFeatured: {
//         type: Boolean,
//         default: false
//     },

//     // 🔹 SEO Fields
//     metaTitle: String,
//     metaDescription: String,
//     keywords: [String],

// }, {
//     timestamps: true
// });

// const Product = mongoose.model('Product', productSchema);
// module.exports = Product;






// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
    
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     mrpPrice: {
//         type: Number,
//         required: true
//     },
//     sellingPrice: {
//         type: Number,
//         required: true
//     },
//     discountPercent: {
//         type: Number,
//         required: true
//     },
//     quantity: {
//         type: Number,
//     },
//     color: {
//         type: String,
//         required: true
//     },
//     images: {
//         type: [String],
//         default: []
//     },
//     numRatings: {
//         type: Number,
//         default: 0
//     },
//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category',
//         required: true
//     },
//     seller: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Seller',
//         required: true
//     },
//     sizes: {
//         type: String,
//         required: false
//     },
//     reviews: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Review',
//         default: []
//     }],

//     brand: {
//         type: String,
//         required: true
//     },

//     slug: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true
//     },

//     sku: {
//         type: String,
//         required: true,
//         unique: true
//     },

//     hsnCode: {
//         type: String,
//         required: true
//     },
//     gstPercent: {
//         type: Number,
//         required: true
//     },

//     countryOfOrigin: {
//         type: String,
//         default: "India"
//     },

//     unitValue: {
//         type: Number,
//         required: true
//     },
//     unitType: {
//         type: String,
//         enum: ["g", "kg", "ml", "liter", "piece", "pack", "meter", "cm"],
//         required: true
//     },

//     weight: {
//         value: Number,
//         unit: {
//             type: String,
//             enum: ["g", "kg"]
//         }
//     },

//     dimensions: {
//         length: Number,
//         width: Number,
//         height: Number,
//         unit: {
//             type: String,
//             enum: ["cm", "inch"]
//         }
//     },

//     shippingCharges: {
//         type: Number,
//         default: 0
//     },
//     estimatedDeliveryDays: {
//         type: Number,
//         default: 3
//     },

//     isActive: {
//         type: Boolean,
//         default: true
//     },
//     isFeatured: {
//         type: Boolean,
//         default: false
//     },

//     // ✅ यह NEW Field जोड़ें - Home Sections के लिए
//     tags: {
//         type: [String],
//         default: [],
//         index: true
//     },

//     metaTitle: String,
//     metaDescription: String,
//     keywords: [String],

// }, {
//     timestamps: true
// });

// const Product = mongoose.model('Product', productSchema);
// module.exports = Product;








// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     mrpPrice: { type: Number, required: true },
//     sellingPrice: { type: Number, required: true },
//     discountPercent: { type: Number, required: true },
//     quantity: { type: Number, default: 0 },
//     color: { type: String, required: true },
//     images: { type: [String], default: [] },
//     numRatings: { type: Number, default: 0 },

//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category',
//         required: true
//     },
//     seller: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Seller',
//         required: true
//     },
//     sizes: { type: String, required: false },

//     reviews: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Review',
//         default: []
//     }],

//     /* 🔥 UPDATED: Brand ab ObjectId reference */
//     brand: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Brand',
//         required: false
//     },

//     slug: { type: String, required: true, unique: true, lowercase: true },
//     sku: { type: String, required: true, unique: true },
//     hsnCode: { type: String, required: true },
//     gstPercent: { type: Number, required: true },
//     countryOfOrigin: { type: String, default: "India" },

//     unitValue: { type: Number, required: true },
//     unitType: {
//         type: String,
//         enum: ["g", "kg", "ml", "liter", "piece", "pack", "meter", "cm"],
//         required: true
//     },

//     weight: {
//         value: Number,
//         unit: { type: String, enum: ["g", "kg"] }
//     },

//     dimensions: {
//         length: Number,
//         width: Number,
//         height: Number,
//         unit: { type: String, enum: ["cm", "inch"] }
//     },

//     shippingCharges: { type: Number, default: 0 },
//     estimatedDeliveryDays: { type: Number, default: 3 },

//     isActive: { type: Boolean, default: true },
//     isFeatured: { type: Boolean, default: false },

//     tags: { type: [String], default: [], index: true },

//     metaTitle: String,
//     metaDescription: String,
//     keywords: [String],

//     /* 🔥 NEW: Auto stock status */
//     isInStock: { type: Boolean, default: true, index: true },

// }, {
//     timestamps: true
// });

// /* 🔥 Auto-update isInStock on save */
// productSchema.pre('save', function (next) {
//     this.isInStock = (this.quantity || 0) > 0;
//     next();
// });

// const Product = mongoose.model('Product', productSchema);
// module.exports = Product;






// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     mrpPrice: { type: Number, required: true },
//     sellingPrice: { type: Number, required: true },
//     discountPercent: { type: Number, required: true },
//     quantity: { type: Number, default: 0 },
//     color: { type: String, required: true },
//     images: { type: [String], default: [] },
//     numRatings: { type: Number, default: 0 },

//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category',
//         required: true
//     },
//     seller: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Seller',
//         required: true
//     },
//     sizes: { type: String, required: false },

//     reviews: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Review',
//         default: []
//     }],

//     brand: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Brand',
//         required: false
//     },

//     slug: { type: String, required: true, unique: true, lowercase: true },
//     sku: { type: String, required: true, unique: true },
//     hsnCode: { type: String, required: true },
//     gstPercent: { type: Number, required: true },
//     countryOfOrigin: { type: String, default: "India" },

//     unitValue: { type: Number, required: true },
//     unitType: {
//         type: String,
//         enum: ["g", "kg", "ml", "liter", "piece", "pack", "meter", "cm"],
//         required: true
//     },

//     weight: {
//         value: Number,
//         unit: { type: String, enum: ["g", "kg"] }
//     },

//     dimensions: {
//         length: Number,
//         width: Number,
//         height: Number,
//         unit: { type: String, enum: ["cm", "inch"] }
//     },

//     shippingCharges: { type: Number, default: 0 },
//     estimatedDeliveryDays: { type: Number, default: 3 },

//     isActive: { type: Boolean, default: true },
//     isFeatured: { type: Boolean, default: false },

//     tags: { type: [String], default: [], index: true },

//     metaTitle: String,
//     metaDescription: String,
//     keywords: [String],

//     isInStock: { type: Boolean, default: true, index: true },

// }, {
//     timestamps: true
// });

// /* 🔥 Auto-update isInStock */
// productSchema.pre('save', function (next) {
//     this.isInStock = (this.quantity || 0) > 0;
//     next();
// });

// /* ═══════════════════════════════════════════════
//    🔥 PERFORMANCE INDEXES
//    ═══════════════════════════════════════════════ */

// // Seller dashboard
// productSchema.index({ seller: 1, isActive: 1, createdAt: -1 });

// // Category page
// productSchema.index({ category: 1, isActive: 1, createdAt: -1 });

// // Homepage featured
// productSchema.index({ isFeatured: 1, isActive: 1, createdAt: -1 });

// // Price sorting
// productSchema.index({ sellingPrice: 1, isActive: 1 });

// // Stock filter
// productSchema.index({ isInStock: 1, isActive: 1 });

// // Brand filter
// productSchema.index({ brand: 1, isActive: 1 });

// // Text search
// productSchema.index(
//     { title: "text", description: "text", tags: "text" },
//     { weights: { title: 10, tags: 5, description: 1 } }
// );

// // Slug lookup
// productSchema.index({ slug: 1 });

// const Product = mongoose.model('Product', productSchema);
// module.exports = Product;


















const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    mrpPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    discountPercent: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    color: { type: String, required: true },
    images: { type: [String], default: [] },
    numRatings: { type: Number, default: 0 },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    sizes: { type: String, required: false },

    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        default: []
    }],

    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: false
    },

    slug: { type: String, required: true, unique: true, lowercase: true },
    sku: { type: String, required: true, unique: true },
    hsnCode: { type: String, required: true },
    gstPercent: { type: Number, required: true },
    countryOfOrigin: { type: String, default: "India" },

    unitValue: { type: Number, required: true },
    unitType: {
        type: String,
        enum: ["g", "kg", "ml", "liter", "piece", "pack", "meter", "cm"],
        required: true
    },

    weight: {
        value: Number,
        unit: { type: String, enum: ["g", "kg"] }
    },

    dimensions: {
        length: Number,
        width: Number,
        height: Number,
        unit: { type: String, enum: ["cm", "inch"] }
    },

    shippingCharges: { type: Number, default: 0 },
    estimatedDeliveryDays: { type: Number, default: 3 },

    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },

    tags: { type: [String], default: [], index: true },

    metaTitle: String,
    metaDescription: String,
    keywords: [String],

    isInStock: { type: Boolean, default: true, index: true },

    /* ═══════════════════════════════════════════════
       🔥 NEW: CUSTOM PRODUCT SUPPORT
       ═══════════════════════════════════════════════ */

    isCustomizable: {
        type: Boolean,
        default: false,
        index: true,
    },

    customizationExtraCharge: {
        type: Number,
        default: 0,
        min: 0,
    },

    customization: {
        enabled: { type: Boolean, default: false },

        /* Mockup image (blank product image) */
        mockupImage: { type: String, default: null },

        /* Mockup original dimensions (px) */
        mockupWidth: { type: Number, default: 0 },
        mockupHeight: { type: Number, default: 0 },

        /* Print area coordinates on the mockup (px) */
        printArea: {
            x: { type: Number, default: 0 },
            y: { type: Number, default: 0 },
            width: { type: Number, default: 0 },
            height: { type: Number, default: 0 },
        },

        /* Print physical size (for print file generation) */
        printSize: {
            widthCm: { type: Number, default: 20 },
            heightCm: { type: Number, default: 25 },
            dpi: { type: Number, default: 300 },
        },

        /* Upload rules */
        allowedFormats: {
            type: [String],
            default: ["jpg", "jpeg", "png", "webp"],
        },
        maxFileSizeMB: { type: Number, default: 10 },

        /* Template type — used for preset sizes */
        templateType: {
            type: String,
            enum: ["tshirt", "mug", "phone-case", "poster", "hoodie", "cap", "custom"],
            default: "custom",
        },

        /* Optional instructions shown to customer */
        instructions: { type: String, default: null },
    },

}, {
    timestamps: true
});

/* 🔥 Auto-update isInStock */
productSchema.pre('save', function (next) {
    this.isInStock = (this.quantity || 0) > 0;

    /* 🔥 Sync customization.enabled with isCustomizable */
    if (this.isCustomizable && this.customization) {
        this.customization.enabled = true;
    }

    next();
});

/* ═══════════════════════════════════════════════
   🔥 PERFORMANCE INDEXES
   ═══════════════════════════════════════════════ */

productSchema.index({ seller: 1, isActive: 1, createdAt: -1 });
productSchema.index({ category: 1, isActive: 1, createdAt: -1 });
productSchema.index({ isFeatured: 1, isActive: 1, createdAt: -1 });
productSchema.index({ sellingPrice: 1, isActive: 1 });
productSchema.index({ isInStock: 1, isActive: 1 });
productSchema.index({ brand: 1, isActive: 1 });
productSchema.index(
    { title: "text", description: "text", tags: "text" },
    { weights: { title: 10, tags: 5, description: 1 } }
);
productSchema.index({ slug: 1 });

/* 🔥 Custom products filter */
productSchema.index({ isCustomizable: 1, isActive: 1 });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;