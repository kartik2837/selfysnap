const mongoose = require("mongoose");

const deliverySettingsSchema = new mongoose.Schema(
  {
    deliveryFee: { type: Number, default: 50, min: 0 },
    freeDeliveryThreshold: { type: Number, default: 1000, min: 0 },
    codFee: { type: Number, default: 20, min: 0 },
    codEnabled: { type: Boolean, default: true },
    codMaxPrice: { type: Number, default: 10000, min: 0 },
    taxPercent: { type: Number, default: 0, min: 0, max: 100 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const DeliverySettings = mongoose.model(
  "DeliverySettings",
  deliverySettingsSchema
);

module.exports = DeliverySettings;