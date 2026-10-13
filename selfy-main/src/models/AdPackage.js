const mongoose = require("mongoose");

const adPackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    placement: {
      type: String,
      enum: [
        "homepage_banner",
        "homepage_slider",
        "category_page",
        "search_results",
        "product_page_sidebar",
        "mobile_banner",
      ],
      required: true,
    },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    pricingModel: {
      type: String,
      enum: ["cpc", "cpm", "fixed"],
      default: "fixed",
    },
    costPerClick: { type: Number, default: 5 },
    costPerImpression: { type: Number, default: 0.5 },
    displayOrder: { type: Number, default: 1 },
    isPopular: { type: Boolean, default: false },
    badge: String,
    features: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdPackage", adPackageSchema);