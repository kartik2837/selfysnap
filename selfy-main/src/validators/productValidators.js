// // validators/productValidator.js
// const Yup = require('yup');

// const createProductSchema = Yup.object({
//   title: Yup.string().required('Title is required'),
//   description: Yup.string().max(2000, 'Description is too long'),
//   mrpPrice: Yup.number().required('MRP Price is required').positive('MRP Price must be a positive number'),
//   sellingPrice: Yup.number().required('Selling Price is required').positive('Selling Price must be a positive number'),
//   color: Yup.string().required('Color is required'),
//   images: Yup.array().of(Yup.string().url('Must be a valid URL')).max(5000, 'Too many images'),
//   category: Yup.string().required('Category is required'),
//   category2: Yup.string().required('Category2 is required'),
//   category3: Yup.string().required('Category3 is required'),
//   sizes: Yup.string().required('Sizes is required'),
//   quantity: Yup.number().required('Quantity is required').min(0, 'Quantity cannot be negative'),
// });

// module.exports = {
//   createProductSchema,
// };













// validators/productValidators.js
const Yup = require("yup");

const createProductSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),

  description: Yup.string()
    .max(5000, "Description is too long"),

  mrpPrice: Yup.number()
    .required("MRP Price is required")
    .positive("MRP Price must be positive"),

  sellingPrice: Yup.number()
    .required("Selling Price is required")
    .positive("Selling Price must be positive"),

  quantity: Yup.number()
    .required("Quantity is required")
    .min(0, "Quantity cannot be negative"),

  color: Yup.string().required("Color is required"),

  /* 🔥 FIXED — Images optional, URL check removed (Cloudinary sometimes local) */
  images: Yup.array()
    .of(Yup.string())
    .min(1, "At least 1 image is required")
    .max(10, "Maximum 10 images allowed"),

  /* 🔥 FIXED — Category hierarchy: only level 1 required */
  category: Yup.string().required("Category is required"),
  category2: Yup.string().nullable().notRequired(),   // ✅ Optional
  category3: Yup.string().nullable().notRequired(),   // ✅ Optional

  /* 🔥 FIXED — Brand required */
  brand: Yup.string().required("Brand is required"),

  /* 🔥 FIXED — Sizes: array ya string dono allow */
  sizes: Yup.mixed().test(
    "sizes-required",
    "At least one size is required",
    (value) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === "string") return value.trim().length > 0;
      return false;
    }
  ),

  /* 🔥 OPTIONAL FIELDS */
  slug: Yup.string(),
  sku: Yup.string(),
  hsnCode: Yup.string(),
  gstPercent: Yup.number().min(0).max(28).nullable(),
  countryOfOrigin: Yup.string().default("India"),

  unitValue: Yup.number().min(0).nullable(),
  unitType: Yup.string(),

  weight: Yup.object().nullable(),
  dimensions: Yup.object().nullable(),

  shippingCharges: Yup.number().min(0).nullable(),
  estimatedDeliveryDays: Yup.number().min(0).nullable(),

  isActive: Yup.boolean(),
  isFeatured: Yup.boolean(),

  metaTitle: Yup.string().nullable(),
  metaDescription: Yup.string().nullable(),
  keywords: Yup.mixed(),

  /* 🔥 CUSTOM PRODUCT FIELDS (all optional) */
  isCustomizable: Yup.boolean().nullable(),
  customizationExtraCharge: Yup.number().min(0).nullable(),
  customization: Yup.object().nullable(),
});

module.exports = {
  createProductSchema,
};