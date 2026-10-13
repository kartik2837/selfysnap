const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payoutSchema = new Schema({
  seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
  subOrder: { type: Schema.Types.ObjectId, ref: 'Order', default: null },  // linked sub-order
  amount: { type: Number, required: true },
  commissionAmount: { type: Number, default: 0 },   // platform commission deducted
  status: { type: String, enum: ['PENDING', 'SUCCESS', 'REJECTED'], default: 'PENDING' },
  date: { type: Date, default: Date.now },
  paidAt: { type: Date, default: null },  // when actually paid out
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
}, { timestamps: true });

module.exports = mongoose.model('Payout', payoutSchema);
