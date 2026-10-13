// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const supportCallSchema = new Schema(
//   {
//     seller: {
//       type: Schema.Types.ObjectId,
//       ref: "Seller",
//       required: true,
//       index: true,
//     },
//     subject: { type: String, required: true },
//     description: { type: String },
//     priority: {
//       type: String,
//       enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
//       default: "MEDIUM",
//     },
//     category: {
//       type: String,
//       enum: ["PRODUCT_ISSUE", "ORDER_ISSUE", "PAYMENT_ISSUE", "TECHNICAL", "OTHER"],
//       default: "OTHER",
//     },
//     status: {
//       type: String,
//       enum: ["PENDING", "ACKNOWLEDGED", "CALLING", "RESOLVED", "MISSED"],
//       default: "PENDING",
//       index: true,
//     },
//     sellerMobile: String,
//     sellerName: String,
//     handledBy: { type: Schema.Types.ObjectId, ref: "User" },
//     handledAt: Date,
//     resolutionNote: String,
//     timeline: [
//       {
//         status: String,
//         note: String,
//         at: { type: Date, default: Date.now },
//         by: { type: Schema.Types.ObjectId, ref: "User" },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("SupportCall", supportCallSchema);





const mongoose = require("mongoose");
const { Schema } = mongoose;

const supportCallSchema = new Schema(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
      index: true,
    },

    // 🔥 Seller info saved at request time
    sellerName: { type: String, required: true, default: "Unknown Seller" },
    sellerMobile: { type: String, default: "N/A" },
    sellerEmail: { type: String, default: "" },
    sellerBusinessName: { type: String, default: "" },

    subject: { type: String, required: true },
    description: { type: String, default: "" },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
      default: "MEDIUM",
    },

    category: {
      type: String,
      enum: [
        "PRODUCT_ISSUE",
        "ORDER_ISSUE",
        "PAYMENT_ISSUE",
        "TECHNICAL",
        "OTHER",
      ],
      default: "OTHER",
    },

    status: {
      type: String,
      enum: ["PENDING", "ACKNOWLEDGED", "CALLING", "RESOLVED", "MISSED"],
      default: "PENDING",
      index: true,
    },

    handledBy: { type: Schema.Types.ObjectId, ref: "User" },
    handledAt: Date,
    resolutionNote: { type: String, default: "" },

    timeline: [
      {
        status: String,
        note: String,
        at: { type: Date, default: Date.now },
        by: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SupportCall", supportCallSchema);