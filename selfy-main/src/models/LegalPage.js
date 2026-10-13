const mongoose = require("mongoose");

const legalPageSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    description: { type: String, maxlength: 300 },

    metaTitle: String,
    metaDescription: String,

    category: {
      type: String,
      enum: ["customer", "seller", "general", "about"],
      default: "general",
    },

    isActive: { type: Boolean, default: true, index: true },
    isSystem: { type: Boolean, default: false },
    version: { type: Number, default: 1 },
    order: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

legalPageSchema.pre("save", function (next) {
  if (this.isModified("title") && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }
  next();
});

module.exports = mongoose.model("LegalPage", legalPageSchema);