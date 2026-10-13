// const Product = require("../models/Product");
// const Category = require("../models/Category");
// const mongoose = require("mongoose");
// const ProductError = require("../exceptions/ProductError");

// const calculateDiscountPercentage = (mrpPrice, sellingPrice) => {
//   if (mrpPrice <= 0) {
//     throw new Error("MRP must be greater than zero");
//   }
//   const discount = mrpPrice - sellingPrice;
//   return Math.round((discount / mrpPrice) * 100);
// };

// // 🔥 Slug generator
// const slugify = (text) =>
//   text
//     ?.toString()
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, "-")
//     .replace(/[^\w\-]+/g, "");

// class ProductService {

//   async createProduct(req, seller) {
//     try {
//       const discountPercentage = calculateDiscountPercentage(
//         req.mrpPrice,
//         req.sellingPrice
//       );

//       const category1 = await this.createOrGetCategory(req.category, 1);
//       const category2 = await this.createOrGetCategory(
//         req.category2,
//         2,
//         category1._id
//       );
//       const category3 = await this.createOrGetCategory(
//         req.category3,
//         3,
//         category2._id
//       );

//       const product = new Product({
//         seller: seller._id,
//         category: category3._id,

//         // existing fields
//         title: req.title,
//         color: req.color,
//         description: req.description,
//         discountPercent: discountPercentage,
//         sellingPrice: req.sellingPrice,
//         images: req.images,
//         mrpPrice: req.mrpPrice,
//         sizes: req.sizes,
//         quantity: req.quantity,
//         createdAt: new Date(),

//         // 🔥 new fields support
//         brand: req.brand,
//         slug: req.slug || slugify(req.title),
//         sku: req.sku,
//         hsnCode: req.hsnCode,
//         gstPercent: req.gstPercent,
//         countryOfOrigin: req.countryOfOrigin || "India",
//         unitValue: req.unitValue,
//         unitType: req.unitType,

//         weight: req.weight,
//         dimensions: req.dimensions,

//         shippingCharges: req.shippingCharges || 0,
//         estimatedDeliveryDays: req.estimatedDeliveryDays || 3,

//         isActive: req.isActive ?? true,
//         isFeatured: req.isFeatured ?? false,

//         metaTitle: req.metaTitle,
//         metaDescription: req.metaDescription,
//         keywords: req.keywords,
//       });

//       return await product.save();
//     } catch (error) {
//       console.log("====== ", error.message);
//       throw new ProductError(error.message);
//     }
//   }

//   async createOrGetCategory(categoryId, level, parentId = null) {
//     let category = await Category.findOne({ categoryId });
//     if (!category) {
//       category = new Category({
//         categoryId,
//         level,
//         parentCategory: parentId,
//       });
//       await category.save();
//     }
//     return category;
//   }

//   async deleteProduct(productId) {
//     try {
//       const product = await this.findProductById(productId);
//       await Product.findByIdAndDelete(product._id);
//     } catch (error) {
//       throw new ProductError(error.message);
//     }
//   }

//   async updateProduct(productId, updatedProductData) {
//     try {
//       if (
//         updatedProductData.mrpPrice &&
//         updatedProductData.sellingPrice
//       ) {
//         updatedProductData.discountPercent =
//           calculateDiscountPercentage(
//             updatedProductData.mrpPrice,
//             updatedProductData.sellingPrice
//           );
//       }

//       if (updatedProductData.title) {
//         updatedProductData.slug = slugify(updatedProductData.title);
//       }

//       const product = await Product.findByIdAndUpdate(
//         productId,
//         { $set: updatedProductData },
//         { new: true }
//       );

//       if (!product) throw new ProductError("Product not found");

//       return product;
//     } catch (error) {
//       throw new ProductError(error.message);
//     }
//   }

//   async findProductById(productId) {
//     try {
//       if (!mongoose.Types.ObjectId.isValid(productId)) {
//         throw new ProductError("Invalid product ID...");
//       }

//       const product = await Product.findById(productId)
//         .populate("seller")
//         .populate("category");

//       if (!product) throw new ProductError("Product not found");

//       return product;
//     } catch (error) {
//       throw new ProductError(error.message);
//     }
//   }

//   async searchProduct(query) {
//     return await Product.find({
//       $or: [
//         { title: new RegExp(query, "i") },
//         { brand: new RegExp(query, "i") },
//         { description: new RegExp(query, "i") },
//       ],
//     });
//   }

//   async getAllProducts(req) {
//     const filterQuery = {};

//     if (req.category) {
//       const category = await Category.findOne({ categoryId: req.category });
//       if (!category) {
//         return {
//           content: [],
//           totalPages: 0,
//           totalElements: 0,
//         };
//       }
//       filterQuery.category = category._id;
//     }

//     if (req.color) filterQuery.color = req.color;
//     if (req.brand) filterQuery.brand = req.brand;
//     if (req.unitType) filterQuery.unitType = req.unitType;

//     if (req.minPrice) {
//       filterQuery.sellingPrice = { $gte: Number(req.minPrice) };
//     }

//     if (req.maxPrice) {
//       filterQuery.sellingPrice = {
//         ...filterQuery.sellingPrice,
//         $lte: Number(req.maxPrice),
//       };
//     }

//     if (req.minDiscount) {
//       filterQuery.discountPercent = { $gte: Number(req.minDiscount) };
//     }

//     if (req.inStock === "true") {
//       filterQuery.quantity = { $gt: 0 };
//     }

//     let sortQuery = {};
//     if (req.sort === "price_low") sortQuery.sellingPrice = 1;
//     if (req.sort === "price_high") sortQuery.sellingPrice = -1;
//     if (req.sort === "newest") sortQuery.createdAt = -1;

//     const page = parseInt(req.pageNumber) || 0;
//     const pageSize = parseInt(req.pageSize) || 10;

//     const products = await Product.find(filterQuery)
//       .sort(sortQuery)
//       .skip(page * pageSize)
//       .limit(pageSize);

//     const totalElements = await Product.countDocuments(filterQuery);
//     const totalPages = Math.ceil(totalElements / pageSize);

//     return {
//       content: products,
//       totalPages,
//       totalElements,
//     };
//   }

//   async recentlyAddedProduct() {
//     return await Product.find().sort({ createdAt: -1 }).limit(10);
//   }

//   async getProductBySellerId(sellerId) {
//     return await Product.find({ seller: sellerId });
//   }
// }

// module.exports = new ProductService();







// const Product = require("../models/Product");
// const Category = require("../models/Category");
// const mongoose = require("mongoose");
// const ProductError = require("../exceptions/ProductError");

// /* ═══════════════════════════════════════════════
//    HELPER: Discount Calculate
//    ═══════════════════════════════════════════════ */
// const calculateDiscountPercentage = (mrpPrice, sellingPrice) => {
//   if (mrpPrice <= 0) {
//     throw new Error("MRP must be greater than zero");
//   }
//   const discount = mrpPrice - sellingPrice;
//   return Math.round((discount / mrpPrice) * 100);
// };

// /* ═══════════════════════════════════════════════
//    HELPER: Slug Generator
//    ═══════════════════════════════════════════════ */
// const slugify = (text) =>
//   text
//     ?.toString()
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, "-")
//     .replace(/[^\w\-]+/g, "");

// class ProductService {
//   /* ═══════════════════════════════════════════════
//      CREATE PRODUCT
//      ═══════════════════════════════════════════════ */
//   async createProduct(req, seller) {
//     try {
//       const discountPercentage = calculateDiscountPercentage(
//         req.mrpPrice,
//         req.sellingPrice
//       );

//       const category1 = await this.createOrGetCategory(req.category, 1);
//       const category2 = await this.createOrGetCategory(
//         req.category2,
//         2,
//         category1._id
//       );
//       const category3 = await this.createOrGetCategory(
//         req.category3,
//         3,
//         category2._id
//       );

//       const product = new Product({
//         seller: seller._id,
//         category: category3._id,

//         title: req.title,
//         color: req.color,
//         description: req.description,
//         discountPercent: discountPercentage,
//         sellingPrice: req.sellingPrice,
//         images: req.images,
//         mrpPrice: req.mrpPrice,
//         sizes: req.sizes,
//         quantity: req.quantity,
//         createdAt: new Date(),

//         brand: req.brand,
//         slug: req.slug || slugify(req.title),
//         sku: req.sku,
//         hsnCode: req.hsnCode,
//         gstPercent: req.gstPercent,
//         countryOfOrigin: req.countryOfOrigin || "India",
//         unitValue: req.unitValue,
//         unitType: req.unitType,

//         weight: req.weight,
//         dimensions: req.dimensions,

//         shippingCharges: req.shippingCharges || 0,
//         estimatedDeliveryDays: req.estimatedDeliveryDays || 3,

//         isActive: req.isActive ?? true,
//         isFeatured: req.isFeatured ?? false,

//         metaTitle: req.metaTitle,
//         metaDescription: req.metaDescription,
//         keywords: req.keywords,
//       });

//       return await product.save();
//     } catch (error) {
//       console.log("====== ", error.message);
//       throw new ProductError(error.message);
//     }
//   }

//   /* ═══════════════════════════════════════════════
//      CREATE OR GET CATEGORY
//      ═══════════════════════════════════════════════ */
//   async createOrGetCategory(categoryId, level, parentId = null) {
//     let category = await Category.findOne({ categoryId });
//     if (!category) {
//       category = new Category({
//         categoryId,
//         level,
//         parentCategory: parentId,
//       });
//       await category.save();
//     }
//     return category;
//   }

//   /* ═══════════════════════════════════════════════
//      DELETE PRODUCT
//      ═══════════════════════════════════════════════ */
//   async deleteProduct(productId) {
//     try {
//       const product = await this.findProductById(productId);
//       await Product.findByIdAndDelete(product._id);
//     } catch (error) {
//       throw new ProductError(error.message);
//     }
//   }

//   /* ═══════════════════════════════════════════════
//      UPDATE PRODUCT
//      ═══════════════════════════════════════════════ */
//   async updateProduct(productId, updatedProductData) {
//     try {
//       if (updatedProductData.mrpPrice && updatedProductData.sellingPrice) {
//         updatedProductData.discountPercent = calculateDiscountPercentage(
//           updatedProductData.mrpPrice,
//           updatedProductData.sellingPrice
//         );
//       }

//       if (updatedProductData.title) {
//         updatedProductData.slug = slugify(updatedProductData.title);
//       }

//       const product = await Product.findByIdAndUpdate(
//         productId,
//         { $set: updatedProductData },
//         { new: true }
//       );

//       if (!product) throw new ProductError("Product not found");

//       return product;
//     } catch (error) {
//       throw new ProductError(error.message);
//     }
//   }

//   /* ═══════════════════════════════════════════════
//      FIND PRODUCT BY ID
//      ═══════════════════════════════════════════════ */
//   async findProductById(productId) {
//     try {
//       if (!mongoose.Types.ObjectId.isValid(productId)) {
//         throw new ProductError("Invalid product ID...");
//       }

//       const product = await Product.findById(productId)
//         .populate("seller")
//         .populate("category");

//       if (!product) throw new ProductError("Product not found");

//       return product;
//     } catch (error) {
//       throw new ProductError(error.message);
//     }
//   }

//   /* ═══════════════════════════════════════════════
//      🔥 SEARCH PRODUCT (TEXT + CATEGORY SUPPORT)
//      ═══════════════════════════════════════════════ */
//   async searchProduct(query) {
//     try {
//       // ⚠️ Empty/null query → खाली array
//       if (!query || typeof query !== "string" || !query.trim()) {
//         console.log("⚠️ [ProductService] Empty query, returning []");
//         return [];
//       }

//       const searchTerm = query.trim();
//       const searchRegex = new RegExp(searchTerm, "i");

//       console.log(`🔍 [ProductService] Searching for: "${searchTerm}"`);

//       /* ───────────────────────────────────────────
//          1️⃣ Categories ढूंढो जो query से match करती हैं
//          ─────────────────────────────────────────── */
//       const matchedCategories = await Category.find({
//         $or: [{ name: searchRegex }, { categoryId: searchRegex }],
//       }).select("_id name categoryId");

//       console.log(
//         `📁 [ProductService] Matched categories: ${matchedCategories.length}`,
//         matchedCategories.map((c) => c.name || c.categoryId)
//       );

//       const matchedCategoryIds = matchedCategories.map((cat) => cat._id);

//       /* ───────────────────────────────────────────
//          1️⃣.b Children categories भी include करो (Parent search ke liye)
//          ─────────────────────────────────────────── */
//       let childCategoryIds = [];
//       if (matchedCategoryIds.length > 0) {
//         const children = await Category.find({
//           parentCategory: { $in: matchedCategoryIds },
//         }).select("_id");

//         childCategoryIds = children.map((c) => c._id);

//         console.log(
//           `📁 [ProductService] Including children: ${childCategoryIds.length}`
//         );
//       }

//       const allCategoryIds = [...matchedCategoryIds, ...childCategoryIds];

//       /* ───────────────────────────────────────────
//          2️⃣ Products ढूंढो (text + category)
//          ─────────────────────────────────────────── */
//       const products = await Product.find({
//         $or: [
//           // 📝 Text match
//           { title: searchRegex },
//           { brand: searchRegex },
//           { description: searchRegex },
//           { keywords: searchRegex },

//           // 📁 Category match (if any categories matched)
//           ...(allCategoryIds.length > 0
//             ? [{ category: { $in: allCategoryIds } }]
//             : []),
//         ],
//       })
//         .populate("seller")
//         .populate("category")
//         .sort({ createdAt: -1 })
//         .limit(100);

//       console.log(
//         `✅ [ProductService] Found ${products.length} products for "${searchTerm}"`
//       );

//       return products;
//     } catch (error) {
//       console.error("❌ [ProductService.searchProduct] Error:", error);
//       throw new ProductError(error.message);
//     }
//   }

//   /* ═══════════════════════════════════════════════
//      GET ALL PRODUCTS (with filters + pagination)
//      ═══════════════════════════════════════════════ */
//   async getAllProducts(req) {
//     const filterQuery = {};

//     if (req.category) {
//       const category = await Category.findOne({ categoryId: req.category });
//       if (!category) {
//         return {
//           content: [],
//           totalPages: 0,
//           totalElements: 0,
//         };
//       }
//       filterQuery.category = category._id;
//     }

//     if (req.color) filterQuery.color = req.color;
//     if (req.brand) filterQuery.brand = req.brand;
//     if (req.unitType) filterQuery.unitType = req.unitType;

//     if (req.minPrice) {
//       filterQuery.sellingPrice = { $gte: Number(req.minPrice) };
//     }

//     if (req.maxPrice) {
//       filterQuery.sellingPrice = {
//         ...filterQuery.sellingPrice,
//         $lte: Number(req.maxPrice),
//       };
//     }

//     if (req.minDiscount) {
//       filterQuery.discountPercent = { $gte: Number(req.minDiscount) };
//     }

//     if (req.inStock === "true") {
//       filterQuery.quantity = { $gt: 0 };
//     }

//     let sortQuery = {};
//     if (req.sort === "price_low") sortQuery.sellingPrice = 1;
//     if (req.sort === "price_high") sortQuery.sellingPrice = -1;
//     if (req.sort === "newest") sortQuery.createdAt = -1;

//     const page = parseInt(req.pageNumber) || 0;
//     const pageSize = parseInt(req.pageSize) || 10;

//     const products = await Product.find(filterQuery)
//       .sort(sortQuery)
//       .skip(page * pageSize)
//       .limit(pageSize);

//     const totalElements = await Product.countDocuments(filterQuery);
//     const totalPages = Math.ceil(totalElements / pageSize);

//     return {
//       content: products,
//       totalPages,
//       totalElements,
//     };
//   }

//   /* ═══════════════════════════════════════════════
//      RECENTLY ADDED PRODUCTS
//      ═══════════════════════════════════════════════ */
//   async recentlyAddedProduct() {
//     return await Product.find().sort({ createdAt: -1 }).limit(10);
//   }

//   /* ═══════════════════════════════════════════════
//      GET PRODUCTS BY SELLER
//      ═══════════════════════════════════════════════ */
//   async getProductBySellerId(sellerId) {
//     return await Product.find({ seller: sellerId });
//   }
// }

// module.exports = new ProductService();








// const Product = require("../models/Product");
// const Brand = require("../models/Brand");   // 🔥 NEW
// const Category = require("../models/Category");
// const mongoose = require("mongoose");
// const ProductError = require("../exceptions/ProductError");

// const calculateDiscountPercentage = (mrpPrice, sellingPrice) => {
//   if (mrpPrice <= 0) {
//     throw new Error("MRP must be greater than zero");
//   }
//   const discount = mrpPrice - sellingPrice;
//   return Math.round((discount / mrpPrice) * 100);
// };

// const slugify = (text) =>
//   text
//     ?.toString()
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, "-")
//     .replace(/[^\w\-]+/g, "");

// class ProductService {
//   /* 🔥 CREATE — with Brand validation */
//   async createProduct(req, seller) {
//     try {
//       // Brand check
//       if (!req.brand) {
//         throw new ProductError("Brand is required");
//       }

//       const brand = await Brand.findOne({
//         _id: req.brand,
//         seller: seller._id,
//         status: "APPROVED",
//       });

//       if (!brand) {
//         throw new ProductError(
//           "Brand not approved. Please submit brand certificate and wait for admin approval."
//         );
//       }

//       const discountPercentage = calculateDiscountPercentage(
//         req.mrpPrice,
//         req.sellingPrice
//       );

//       const category1 = await this.createOrGetCategory(req.category, 1);
//       const category2 = await this.createOrGetCategory(req.category2, 2, category1._id);
//       const category3 = await this.createOrGetCategory(req.category3, 3, category2._id);

//       const product = new Product({
//         seller: seller._id,
//         category: category3._id,

//         title: req.title,
//         color: req.color,
//         description: req.description,
//         discountPercent: discountPercentage,
//         sellingPrice: req.sellingPrice,
//         images: req.images,
//         mrpPrice: req.mrpPrice,
//         sizes: req.sizes,
//         quantity: req.quantity || 0,

//         brand: brand._id,   // 🔥

//         slug: req.slug || slugify(req.title),
//         sku: req.sku,
//         hsnCode: req.hsnCode,
//         gstPercent: req.gstPercent,
//         countryOfOrigin: req.countryOfOrigin || "India",
//         unitValue: req.unitValue,
//         unitType: req.unitType,

//         weight: req.weight,
//         dimensions: req.dimensions,

//         shippingCharges: req.shippingCharges || 0,
//         estimatedDeliveryDays: req.estimatedDeliveryDays || 3,

//         isActive: req.isActive ?? true,
//         isFeatured: req.isFeatured ?? false,

//         metaTitle: req.metaTitle,
//         metaDescription: req.metaDescription,
//         keywords: req.keywords,
//       });

//       return await product.save();
//     } catch (error) {
//       console.log("❌ [createProduct]", error.message);
//       throw new ProductError(error.message);
//     }
//   }

//   async createOrGetCategory(categoryId, level, parentId = null) {
//     let category = await Category.findOne({ categoryId });
//     if (!category) {
//       category = new Category({
//         categoryId,
//         level,
//         parentCategory: parentId,
//       });
//       await category.save();
//     }
//     return category;
//   }

//   async deleteProduct(productId) {
//     try {
//       const product = await this.findProductById(productId);
//       await Product.findByIdAndDelete(product._id);
//     } catch (error) {
//       throw new ProductError(error.message);
//     }
//   }

//   /* 🔥 UPDATE — Brand lock + isInStock */
//   async updateProduct(productId, updatedProductData) {
//     try {
//       // Brand change nahi hoga
//       delete updatedProductData.brand;

//       if (updatedProductData.mrpPrice && updatedProductData.sellingPrice) {
//         updatedProductData.discountPercent = calculateDiscountPercentage(
//           updatedProductData.mrpPrice,
//           updatedProductData.sellingPrice
//         );
//       }

//       if (updatedProductData.title) {
//         updatedProductData.slug = slugify(updatedProductData.title);
//       }

//       // 🔥 isInStock auto-update
//       if (updatedProductData.quantity !== undefined) {
//         updatedProductData.isInStock = Number(updatedProductData.quantity) > 0;
//       }

//       const product = await Product.findByIdAndUpdate(
//         productId,
//         { $set: updatedProductData },
//         { new: true, runValidators: true }
//       ).populate("brand");

//       if (!product) throw new ProductError("Product not found");
//       return product;
//     } catch (error) {
//       throw new ProductError(error.message);
//     }
//   }

//   async findProductById(productId) {
//     try {
//       if (!mongoose.Types.ObjectId.isValid(productId)) {
//         throw new ProductError("Invalid product ID...");
//       }

//       const product = await Product.findById(productId)
//         .populate("seller")
//         .populate("category")
//         .populate("brand");   // 🔥

//       if (!product) throw new ProductError("Product not found");
//       return product;
//     } catch (error) {
//       throw new ProductError(error.message);
//     }
//   }

//   async searchProduct(query) {
//     try {
//       if (!query || typeof query !== "string" || !query.trim()) return [];

//       const searchTerm = query.trim();
//       const searchRegex = new RegExp(searchTerm, "i");

//       const matchedCategories = await Category.find({
//         $or: [{ name: searchRegex }, { categoryId: searchRegex }],
//       }).select("_id");

//       const matchedCategoryIds = matchedCategories.map((cat) => cat._id);

//       let childCategoryIds = [];
//       if (matchedCategoryIds.length > 0) {
//         const children = await Category.find({
//           parentCategory: { $in: matchedCategoryIds },
//         }).select("_id");
//         childCategoryIds = children.map((c) => c._id);
//       }

//       const allCategoryIds = [...matchedCategoryIds, ...childCategoryIds];

//       return await Product.find({
//         $or: [
//           { title: searchRegex },
//           { description: searchRegex },
//           { keywords: searchRegex },
//           ...(allCategoryIds.length > 0 ? [{ category: { $in: allCategoryIds } }] : []),
//         ],
//       })
//         .populate("seller")
//         .populate("category")
//         .populate("brand")
//         .sort({ createdAt: -1 })
//         .limit(100);
//     } catch (error) {
//       throw new ProductError(error.message);
//     }
//   }

//   async getAllProducts(req) {
//     const filterQuery = {};

//     if (req.category) {
//       const category = await Category.findOne({ categoryId: req.category });
//       if (!category) return { content: [], totalPages: 0, totalElements: 0 };
//       filterQuery.category = category._id;
//     }

//     if (req.color) filterQuery.color = req.color;
//     if (req.brand) filterQuery.brand = req.brand;
//     if (req.unitType) filterQuery.unitType = req.unitType;
//     if (req.minPrice) filterQuery.sellingPrice = { $gte: Number(req.minPrice) };
//     if (req.maxPrice)
//       filterQuery.sellingPrice = {
//         ...filterQuery.sellingPrice,
//         $lte: Number(req.maxPrice),
//       };
//     if (req.minDiscount) filterQuery.discountPercent = { $gte: Number(req.minDiscount) };
//     if (req.inStock === "true") filterQuery.quantity = { $gt: 0 };

//     let sortQuery = {};
//     if (req.sort === "price_low") sortQuery.sellingPrice = 1;
//     if (req.sort === "price_high") sortQuery.sellingPrice = -1;
//     if (req.sort === "newest") sortQuery.createdAt = -1;

//     const page = parseInt(req.pageNumber) || 0;
//     const pageSize = parseInt(req.pageSize) || 10;

//     const products = await Product.find(filterQuery)
//       .populate("brand")   // 🔥
//       .sort(sortQuery)
//       .skip(page * pageSize)
//       .limit(pageSize);

//     const totalElements = await Product.countDocuments(filterQuery);
//     const totalPages = Math.ceil(totalElements / pageSize);

//     return { content: products, totalPages, totalElements };
//   }

//   async recentlyAddedProduct() {
//     return await Product.find().populate("brand").sort({ createdAt: -1 }).limit(10);
//   }

//   async getProductBySellerId(sellerId) {
//     return await Product.find({ seller: sellerId }).populate("brand");
//   }
// }

// module.exports = new ProductService();












const Product = require("../models/Product");
const Brand = require("../models/Brand");
const Category = require("../models/Category");
const mongoose = require("mongoose");
const ProductError = require("../exceptions/ProductError");

const calculateDiscountPercentage = (mrpPrice, sellingPrice) => {
  if (mrpPrice <= 0) {
    throw new Error("MRP must be greater than zero");
  }
  const discount = mrpPrice - sellingPrice;
  return Math.round((discount / mrpPrice) * 100);
};

const slugify = (text) =>
  text
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");

/* ═══════════════════════════════════════════════
   🔥 SAFE BRAND POPULATE — String brand pe crash nahi
   ═══════════════════════════════════════════════ */
const safePopulateBrand = async (productOrProducts) => {
  const isArray = Array.isArray(productOrProducts);
  const products = isArray ? productOrProducts : [productOrProducts];

  for (const p of products) {
    if (!p || !p.brand) continue;

    // Agar already populated object hai to skip
    if (typeof p.brand === "object" && p.brand.name) continue;

    // Agar ObjectId hai to fetch karo
    if (mongoose.Types.ObjectId.isValid(p.brand)) {
      try {
        const brandDoc = await Brand.findById(p.brand)
          .select("name logo")
          .lean();
        if (brandDoc) p.brand = brandDoc;
      } catch (err) {
        console.warn("⚠️ Brand fetch failed:", err.message);
      }
    } else {
      // String hai — as-is chhod do (crash nahi hoga)
      console.warn(`⚠️ String brand found: "${p.brand}"`);
    }
  }

  return isArray ? products : products[0];
};

class ProductService {
  /* 🔥 CREATE — with Brand validation */
  async createProduct(req, seller) {
    try {
      if (!req.brand) {
        throw new ProductError("Brand is required");
      }

      const brand = await Brand.findOne({
        _id: req.brand,
        seller: seller._id,
        status: "APPROVED",
      });

      if (!brand) {
        throw new ProductError(
          "Brand not approved. Please submit brand certificate and wait for admin approval."
        );
      }

      const discountPercentage = calculateDiscountPercentage(
        req.mrpPrice,
        req.sellingPrice
      );

      const category1 = await this.createOrGetCategory(req.category, 1);
      const category2 = await this.createOrGetCategory(
        req.category2,
        2,
        category1._id
      );
      const category3 = await this.createOrGetCategory(
        req.category3,
        3,
        category2._id
      );

      const product = new Product({
        seller: seller._id,
        category: category3._id,

        title: req.title,
        color: req.color,
        description: req.description,
        discountPercent: discountPercentage,
        sellingPrice: req.sellingPrice,
        images: req.images,
        mrpPrice: req.mrpPrice,
        sizes: req.sizes,
        quantity: req.quantity || 0,

        brand: brand._id,

        slug: req.slug || slugify(req.title),
        sku: req.sku,
        hsnCode: req.hsnCode,
        gstPercent: req.gstPercent,
        countryOfOrigin: req.countryOfOrigin || "India",
        unitValue: req.unitValue,
        unitType: req.unitType,

        weight: req.weight,
        dimensions: req.dimensions,

        shippingCharges: req.shippingCharges || 0,
        estimatedDeliveryDays: req.estimatedDeliveryDays || 3,

        isActive: req.isActive ?? true,
        isFeatured: req.isFeatured ?? false,

        metaTitle: req.metaTitle,
        metaDescription: req.metaDescription,
        keywords: req.keywords,
      });

      return await product.save();
    } catch (error) {
      console.log("❌ [createProduct]", error.message);
      throw new ProductError(error.message);
    }
  }

  async createOrGetCategory(categoryId, level, parentId = null) {
    if (!categoryId) return null;
    let category = await Category.findOne({ categoryId });
    if (!category) {
      category = new Category({
        categoryId,
        level,
        parentCategory: parentId,
      });
      await category.save();
    }
    return category;
  }

  async deleteProduct(productId) {
    try {
      const product = await this.findProductById(productId);
      await Product.findByIdAndDelete(product._id);
    } catch (error) {
      throw new ProductError(error.message);
    }
  }

  /* 🔥 UPDATE — Brand lock + isInStock */
  async updateProduct(productId, updatedProductData) {
    try {
      delete updatedProductData.brand;

      if (updatedProductData.mrpPrice && updatedProductData.sellingPrice) {
        updatedProductData.discountPercent = calculateDiscountPercentage(
          updatedProductData.mrpPrice,
          updatedProductData.sellingPrice
        );
      }

      if (updatedProductData.title) {
        updatedProductData.slug = slugify(updatedProductData.title);
      }

      if (updatedProductData.quantity !== undefined) {
        updatedProductData.isInStock = Number(updatedProductData.quantity) > 0;
      }

      const product = await Product.findByIdAndUpdate(
        productId,
        { $set: updatedProductData },
        { new: true, runValidators: true }
      ).lean();

      if (!product) throw new ProductError("Product not found");

      // 🔥 Safe brand populate
      await safePopulateBrand(product);

      return product;
    } catch (error) {
      throw new ProductError(error.message);
    }
  }

  /* ═══════════════════════════════════════════════
     🔥 FIND BY ID — Safe brand handling
     ═══════════════════════════════════════════════ */
  async findProductById(productId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ProductError("Invalid product ID...");
      }

      const product = await Product.findById(productId)
        .populate("seller")
        .populate("category")
        .lean();

      if (!product) throw new ProductError("Product not found");

      // 🔥 Safe brand populate
      await safePopulateBrand(product);

      return product;
    } catch (error) {
      throw new ProductError(error.message);
    }
  }

  /* ═══════════════════════════════════════════════
     🔥 SEARCH — Safe brand
     ═══════════════════════════════════════════════ */
  async searchProduct(query) {
    try {
      if (!query || typeof query !== "string" || !query.trim()) return [];

      const searchTerm = query.trim();
      const searchRegex = new RegExp(searchTerm, "i");

      const matchedCategories = await Category.find({
        $or: [{ name: searchRegex }, { categoryId: searchRegex }],
      }).select("_id");

      const matchedCategoryIds = matchedCategories.map((cat) => cat._id);

      let childCategoryIds = [];
      if (matchedCategoryIds.length > 0) {
        const children = await Category.find({
          parentCategory: { $in: matchedCategoryIds },
        }).select("_id");
        childCategoryIds = children.map((c) => c._id);
      }

      const allCategoryIds = [...matchedCategoryIds, ...childCategoryIds];

      const products = await Product.find({
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { keywords: searchRegex },
          ...(allCategoryIds.length > 0
            ? [{ category: { $in: allCategoryIds } }]
            : []),
        ],
      })
        .populate("seller")
        .populate("category")
        .sort({ createdAt: -1 })
        .limit(100)
        .lean();

      // 🔥 Safe brand populate
      await safePopulateBrand(products);

      return products;
    } catch (error) {
      throw new ProductError(error.message);
    }
  }

  /* ═══════════════════════════════════════════════
     🔥 GET ALL — Safe brand
     ═══════════════════════════════════════════════ */
  async getAllProducts(req) {
    const filterQuery = {};

    if (req.category) {
      const category = await Category.findOne({ categoryId: req.category });
      if (!category) return { content: [], totalPages: 0, totalElements: 0 };
      filterQuery.category = category._id;
    }

    if (req.color) filterQuery.color = req.color;
    if (req.brand) filterQuery.brand = req.brand;
    if (req.unitType) filterQuery.unitType = req.unitType;
    if (req.minPrice) filterQuery.sellingPrice = { $gte: Number(req.minPrice) };
    if (req.maxPrice)
      filterQuery.sellingPrice = {
        ...filterQuery.sellingPrice,
        $lte: Number(req.maxPrice),
      };
    if (req.minDiscount)
      filterQuery.discountPercent = { $gte: Number(req.minDiscount) };
    if (req.inStock === "true") filterQuery.quantity = { $gt: 0 };

    let sortQuery = { createdAt: -1 };
    if (req.sort === "price_low") sortQuery = { sellingPrice: 1 };
    if (req.sort === "price_high") sortQuery = { sellingPrice: -1 };
    if (req.sort === "newest") sortQuery = { createdAt: -1 };

    const page = parseInt(req.pageNumber) || 0;
    const pageSize = Math.min(parseInt(req.pageSize) || 10, 50);
    const skip = page * pageSize;

    // 🔥 Parallel fetch + count
    const [products, totalElements] = await Promise.all([
      Product.find(filterQuery)
        .populate("seller")
        .populate("category")
        .sort(sortQuery)
        .skip(skip)
        .limit(pageSize)
        .lean(),
      Product.countDocuments(filterQuery),
    ]);

    // 🔥 Safe brand populate
    await safePopulateBrand(products);

    const totalPages = Math.ceil(totalElements / pageSize);

    return { content: products, totalPages: totalPages || 1, totalElements };
  }

  /* ═══════════════════════════════════════════════
     🔥 RECENTLY ADDED
     ═══════════════════════════════════════════════ */
  async recentlyAddedProduct() {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    await safePopulateBrand(products);
    return products;
  }

  /* ═══════════════════════════════════════════════
     🔥 SELLER PRODUCTS
     ═══════════════════════════════════════════════ */
  async getProductBySellerId(sellerId) {
    const products = await Product.find({ seller: sellerId }).lean();
    await safePopulateBrand(products);
    return products;
  }
}

module.exports = new ProductService();