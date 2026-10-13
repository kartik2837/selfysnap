const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  // किसको भेजना है
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // null = सभी को Broadcast
  },
  recipientType: {
    type: String,
    enum: ['User', 'Seller', 'Admin', 'ALL'],
    default: 'User',
  },

  // Notification का Type
  type: {
    type: String,
    enum: [
      'ORDER_PLACED',
      'ORDER_CONFIRMED',
      'ORDER_SHIPPED',
      'ORDER_OUT_FOR_DELIVERY',
      'ORDER_DELIVERED',
      'ORDER_CANCELLED',
      'PRICE_DROP',
      'BACK_IN_STOCK',
      'NEW_PRODUCT',
      'OFFER',
      'FLASH_SALE',
      'CART_REMINDER',
      'PAYMENT_SUCCESS',
      'PAYMENT_FAILED',
      'REVIEW_REQUEST',
      'WELCOME',
      'CUSTOM',
    ],
    required: true,
  },

  // Content
  title: { type: String, required: true },
  message: { type: String, required: true },
  image: { type: String, default: null },

  // Action Link
  actionUrl: { type: String, default: '/' },
  actionText: { type: String, default: 'View' },

  // Related Data
  relatedId: { type: mongoose.Schema.Types.ObjectId, default: null },
  relatedType: { type: String, default: null }, // 'Order', 'Product', 'Offer'

  // Priority
  priority: {
    type: String,
    enum: ['LOW', 'NORMAL', 'HIGH', 'URGENT'],
    default: 'NORMAL',
  },

  // Status
  isRead: { type: Boolean, default: false },
  readAt: { type: Date, default: null },

  // Delivery Tracking
  pushSent: { type: Boolean, default: false },
  pushSentAt: { type: Date, default: null },
  emailSent: { type: Boolean, default: false },
  smsSent: { type: Boolean, default: false },

  // Metadata
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },

  // Expiry
  expiresAt: { type: Date, default: null },

  // Sender
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
}, { timestamps: true });

// Indexes for fast queries
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ recipientType: 1, createdAt: -1 });
notificationSchema.index({ type: 1, createdAt: -1 });

// Auto-delete after 90 days (optional)
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 });

module.exports = mongoose.model('Notification', notificationSchema);