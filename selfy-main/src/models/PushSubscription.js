const mongoose = require('mongoose');

const pushSubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
    unique: true,
  },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true },
  },
  device: {
    type: String,
    enum: ['mobile', 'desktop', 'tablet', 'unknown'],
    default: 'unknown',
  },
  userAgent: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  lastUsed: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('PushSubscription', pushSubscriptionSchema);