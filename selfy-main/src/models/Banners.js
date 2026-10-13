// backend/src/models/Banners.js

const mongoose = require("mongoose");

const bannersSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "" },
    description: { type: String, default: "" },

    mediaType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },

    // ✅ Cloudinary URLs (Frontend से आएंगे)
    image: { type: String, default: "" },
    video: { type: String, default: "" },

    // ✅ Cloudinary Public IDs (Delete के लिए)
    imagePublicId: { type: String, default: "" },
    videoPublicId: { type: String, default: "" },

    videoAutoplay: { type: Boolean, default: true },
    videoLoop: { type: Boolean, default: true },
    videoMuted: { type: Boolean, default: true },

    link: { type: String, default: "/" },
    buttonText: { type: String, default: "Shop Now" },
    buttonColor: { type: String, default: "#4f46e5" },

    textPosition: {
      type: String,
      enum: ["left", "center", "right"],
      default: "left",
    },
    textColor: { type: String, default: "#ffffff" },

    overlayOpacity: { type: Number, default: 0.4, min: 0, max: 1 },

    order: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Banners", bannersSchema);