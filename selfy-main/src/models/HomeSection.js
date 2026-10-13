// const mongoose = require("mongoose");

// const homeSectionSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true
//     },

//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//       index: true
//     },

//     tag: {
//       type: String, // bestseller | popular | seasonal
//       required: true,
//       enum: ["bestseller", "popular", "seasonal"]
//     },

//     limit: {
//       type: Number,
//       default: 8,
//       min: 1
//     },

//     layout: {
//       type: String,
//       enum: ["slider", "grid"],
//       default: "slider"
//     },

//     order: {
//       type: Number,
//       required: true
//     },

//     isActive: {
//       type: Boolean,
//       default: true
//     }
//   },
//   {
//     timestamps: true,
//     versionKey: false
//   }
// );

// module.exports = mongoose.model("HomeSection", homeSectionSchema);











const mongoose = require("mongoose");

const homeSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true
    },

    tag: {
      type: String,
      required: true,
      enum: ["bestseller", "popular", "seasonal", "new", "featured"]
    },

    limit: {
      type: Number,
      default: 8,
      min: 1
    },

    layout: {
      type: String,
      enum: ["amazon", "flipkart", "myntra", "grid", "slider"],
      default: "amazon"
    },

    cardStyle: {
      type: String,
      enum: ["compact", "large", "portrait", "minimal"],
      default: "compact"
    },

    bgColor: {
      type: String,
      default: "#ffffff"
    },

    accentColor: {
      type: String,
      default: "#4f46e5"
    },

    showSeeMore: {
      type: Boolean,
      default: true
    },

    order: {
      type: Number,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("HomeSection", homeSectionSchema);