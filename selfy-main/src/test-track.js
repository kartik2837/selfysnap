// test-track.js
require('dotenv').config();
const mongoose = require('mongoose');
const DelhiveryService = require('./services/DelhiveryService');

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const Order = require('./models/Order');

        // ⬇️ YAHAN apna stuck order ka _id dalo
        const orderId = 'YAHAN_ORDER_ID_DALO';
        const order = await Order.findById(orderId);

        if (!order) {
            console.log('❌ Order not found');
            process.exit(1);
        }

        console.log('=== ORDER INFO ===');
        console.log('Order ID      :', order._id);
        console.log('trackingId    :', order.trackingId);
        console.log('deliveryStatus:', order.deliveryStatus);
        console.log('orderStatus   :', order.orderStatus);
        console.log('shipmentId    :', order.shipmentId);

        if (!order.trackingId) {
            console.log('\n❌ trackingId NULL hai — shipment controller check karo');
            process.exit(1);
        }

        console.log('\n=== CALLING DELHIVERY ===');
        const data = await DelhiveryService.trackShipment(order.trackingId);
        console.log(JSON.stringify(data, null, 2));

        // Status string alag se print karo
        const shipment = data?.ShipmentData?.[0]?.Shipment;
        console.log('\n=== EXACT STATUS ===');
        console.log('Status     :', shipment?.Status?.Status);
        console.log('StatusType :', shipment?.Status?.StatusType);

        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
})();