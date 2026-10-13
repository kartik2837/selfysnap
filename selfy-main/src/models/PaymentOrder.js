const mongoose = require("mongoose");
const PaymentMethod = require("../domain/PaymentMethod");
const PaymentOrderStatus = require("../domain/PaymentOrderStatus");

const paymentOrderSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },

    // 🔥 Payment Status
    status: {
      type: String,
      enum: Object.values(PaymentOrderStatus),
      required: true, // service decide karegi
    },

    // 🔥 Payment Method
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      required: true, // service decide karegi
    },

    paymentLinkId: {
      type: String,
      default: null,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PaymentOrder = mongoose.model("PaymentOrder", paymentOrderSchema);
module.exports = PaymentOrder;
