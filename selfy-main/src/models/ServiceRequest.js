const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new Schema(
  {
    originalName: String,
    url: String,
    size: Number,
    type: { type: String, enum: ["reference", "delivery"] },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const timelineSchema = new Schema(
  {
    status: String,
    note: String,
    at: { type: Date, default: Date.now },
    by: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { _id: false }
);

const serviceRequestSchema = new Schema(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
      index: true,
    },

    // Service snapshot
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    serviceName: { type: String, required: true },
    servicePrice: { type: Number, required: true },
    serviceCategory: { type: String, required: true },

    // Seller's form data
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    specificNotes: { type: String, default: "" },

    // Price (admin sets)
    price: { type: Number, default: 0 },
    isPriceSet: { type: Boolean, default: false },

    // Status
    status: {
      type: String,
      enum: [
        "PENDING",
        "REJECTED",
        "APPROVED",
        "PAID",
        "IN_PROGRESS",
        "DELIVERED",
        "COMPLETED",
      ],
      default: "PENDING",
      index: true,
    },
    rejectionReason: { type: String, default: "" },

    // Payment
    isPaid: { type: Boolean, default: false },
    payment: {
      amount: Number,
      txnId: String,
      paidAt: Date,
      method: String,
    },

    // Admin assigned
    assignedAdmin: { type: Schema.Types.ObjectId, ref: "User" },
    assignedAt: Date,

    // Files
    files: [fileSchema],

    // Delivery
    deliveredAt: Date,
    deliveryNote: { type: String, default: "" },

    // Completion
    completedAt: Date,

    // Timeline
    timeline: [timelineSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);