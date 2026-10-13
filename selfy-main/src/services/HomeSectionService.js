// const Product = require("../models/Product");
// const HomeSection = require("../models/HomeSection");

// class HomeSectionService {

//   async createSection(data) {
//     return await HomeSection.create(data);
//   }

//   async getAllSections() {
//     return await HomeSection.find()
//       .sort({ order: 1 })
//       .populate("category");
//   }

// async getActiveSectionsWithProducts() {
//   const sections = await HomeSection.find({ isActive: true })
//     .sort({ order: 1 })
//     .populate("category", "categoryId"); // section slug

//   const result = [];

//   for (const section of sections) {
//     const products = await Product.find({
//       category: section.category._id
//     })
//       .populate({
//         path: "category",
//         select: "categoryId name"
//       })
//       .limit(section.limit || 8);

//     const mappedProducts = products.map(p => ({
//       _id: p._id,
//       title: p.title,
//       images: p.images,
//       categoryId: p.category.categoryId, // slug
//       brand: p.brand,
//       mrpPrice: p.mrpPrice,
//       sellingPrice: p.sellingPrice,
//       discountPercent: p.discountPercent,
//       unitValue: p.unitValue,
//       unitType: p.unitType,
//       shippingCharges: p.shippingCharges,
//     }));

//     result.push({
//       _id: section._id,
//       title: section.title,
//       layout: section.layout,
//       order: section.order,
//       categoryId: section.category.categoryId, // see more slug
//       products: mappedProducts,
//     });
//   }

//   return result;
// }



//   async updateSection(id, data) {
//     return await HomeSection.findByIdAndUpdate(id, data, { new: true });
//   }

//   async deleteSection(id) {
//     return await HomeSection.findByIdAndDelete(id);
//   }
// }

// module.exports = new HomeSectionService();





const HomeSection = require("../models/HomeSection");
const Product = require("../models/Product");

class HomeSectionService {

  async createSection(data) {
    if (!data.order) {
      const lastSection = await HomeSection.findOne().sort({ order: -1 });
      data.order = lastSection ? lastSection.order + 1 : 1;
    }
    const section = await HomeSection.create(data);
    return section.populate("category");
  }

  async getAllSections() {
    return HomeSection.find().populate("category").sort({ order: 1 });
  }

  async getSectionById(id) {
    const section = await HomeSection.findById(id).populate("category");
    if (!section) throw new Error("Section not found");
    return section;
  }

  // ═══════════════════════════════════════════════
  // ✅ GET SECTIONS WITH PRODUCTS (FIXED)
  // ═══════════════════════════════════════════════
  async getActiveSectionsWithProducts() {
    const sections = await HomeSection.find({ isActive: true })
      .populate("category")
      .sort({ order: 1 });

    const sectionsWithProducts = await Promise.all(
      sections.map(async (section) => {
        let categoryId = null;
        if (section.category) {
          categoryId = section.category._id || section.category;
        }

        let products = [];

        // 🎯 TRY 1: Category + Tag दोनों
        if (categoryId && section.tag) {
          products = await Product.find({
            category: categoryId,
            tags: { $in: [section.tag] },
            isActive: true,
          })
            .sort({ createdAt: -1 })
            .limit(section.limit || 8);
        }

        // 🎯 TRY 2: सिर्फ Tag
        if (products.length === 0 && section.tag) {
          console.log(`⚠️ "${section.title}": Trying tag only...`);
          products = await Product.find({
            tags: { $in: [section.tag] },
            isActive: true,
          })
            .sort({ createdAt: -1 })
            .limit(section.limit || 8);
        }

        // 🎯 TRY 3: सिर्फ Category
        if (products.length === 0 && categoryId) {
          console.log(`⚠️ "${section.title}": Trying category only...`);
          products = await Product.find({
            category: categoryId,
            isActive: true,
          })
            .sort({ createdAt: -1 })
            .limit(section.limit || 8);
        }

        // 🎯 TRY 4: Latest Products (Final Fallback)
        if (products.length === 0) {
          console.log(`⚠️ "${section.title}": Using latest products...`);
          products = await Product.find({ isActive: true })
            .sort({ createdAt: -1 })
            .limit(section.limit || 8);
        }

        console.log(`📦 Section: "${section.title}" | Products: ${products.length}`);
        if (products.length > 0) {
          console.log(`   [1] ${products[0].title} | Images: ${products[0].images?.length || 0}`);
        }

        return {
          ...section.toObject(),
          products,
        };
      })
    );

    return sectionsWithProducts;
  }

  async updateSection(id, data) {
    const cleanData = {};
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        cleanData[key] = data[key];
      }
    });

    const section = await HomeSection.findByIdAndUpdate(
      id,
      { $set: cleanData },
      { new: true, runValidators: false }
    ).populate("category");

    if (!section) throw new Error("Section not found");
    return section;
  }

  async deleteSection(id) {
    const section = await HomeSection.findByIdAndDelete(id);
    if (!section) throw new Error("Section not found");
    return section;
  }
}

module.exports = new HomeSectionService();