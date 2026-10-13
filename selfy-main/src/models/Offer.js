const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  // Basic Info
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  offerCode: {
    type: String,
    unique: true,
    sparse: true,
  },

  // Type
  offerType: {
    type: String,
    enum: ['PERCENTAGE', 'FLAT', 'BOGO', 'FREE_SHIPPING', 'FLASH_SALE', 'FESTIVAL'],
    required: true,
  },

  // Discount
  discountPercent: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  flatDiscount: {
    type: Number,
    default: 0,
  },
  maxDiscount: {
    type: Number,
    default: 0,
  },
  minPurchaseAmount: {
    type: Number,
    default: 0,
  },

  // Validity
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },

  // Banner
  bannerImage: {
    type: String,
    default: '',
  },
  thumbnailImage: {
    type: String,
    default: '',
  },
  backgroundColor: {
    type: String,
    default: '#4f46e5',
  },

  // Target
  applicableProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  applicableCategories: [{
    type: String,
  }],
  applicableBrands: [{
    type: String,
  }],

  // Status
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'MEDIUM',
  },

  // Stats
  viewCount: {
    type: Number,
    default: 0,
  },
  usedCount: {
    type: Number,
    default: 0,
  },

  // Terms
  termsAndConditions: {
    type: String,
    default: '',
  },

  // Metadata
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

}, { timestamps: true });

// Indexes
offerSchema.index({ isActive: 1, startDate: 1, endDate: 1 });
offerSchema.index({ offerType: 1 });
offerSchema.index({ isFeatured: 1 });

// Virtual: isLive
offerSchema.virtual('isLive').get(function () {
  const now = new Date();
  return this.isActive && this.startDate <= now && this.endDate >= now;
});

offerSchema.set('toJSON', { virtuals: true });
offerSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Offer', offerSchema);