const mongoose = require("mongoose");

/* =======================
   Page Schema
======================= */

const pageSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

/* =======================
   Auto Slug Generator
======================= */

pageSchema.pre("validate", function (next) {
  if (this.isModified("heading") && this.heading) {
    this.slug = this.heading
      .toLowerCase()
      .trim()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
  next();
});

module.exports = mongoose.model("Page", pageSchema);