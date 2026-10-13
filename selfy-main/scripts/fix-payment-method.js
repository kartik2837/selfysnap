/**
 * One-time migration script to backfill `paymentMethod` field for existing orders.
 * 
 * Logic:
 * - If paymentStatus is 'COD_PENDING' and paymentMethod is null/empty → set paymentMethod = 'COD'
 * - If paymentStatus is 'PAID' or 'PENDING' and paymentMethod is null/empty → set paymentMethod = 'RAZORPAY'
 * 
 * Run: node scripts/fix-payment-method.js
 */

require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

const orderSchema = new mongoose.Schema({
    paymentMethod: { type: String, default: null },
    paymentStatus: { type: String }
}, { strict: false, timestamps: true });

const Order = mongoose.model('Order', orderSchema);

async function main() {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected!');

    // Fix COD orders
    const codResult = await Order.updateMany(
        {
            paymentStatus: 'COD_PENDING',
            $or: [
                { paymentMethod: null },
                { paymentMethod: '' },
                { paymentMethod: { $exists: false } }
            ]
        },
        { $set: { paymentMethod: 'COD', 'paymentDetails.method': 'COD' } }
    );
    console.log(`✅ Fixed COD orders: ${codResult.modifiedCount} updated`);

    // Fix Online (Razorpay) orders  
    const razorpayResult = await Order.updateMany(
        {
            paymentStatus: { $in: ['PENDING', 'PAID'] },
            $or: [
                { paymentMethod: null },
                { paymentMethod: '' },
                { paymentMethod: { $exists: false } }
            ]
        },
        { $set: { paymentMethod: 'RAZORPAY', 'paymentDetails.method': 'RAZORPAY' } }
    );
    console.log(`✅ Fixed Razorpay orders: ${razorpayResult.modifiedCount} updated`);

    await mongoose.disconnect();
    console.log('Done!');
}

main().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});
