// src/check.js
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

(async () => {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected\n');

    const Order = require('./models/Order');
    const DelhiveryService = require('./services/DelhiveryService');

    console.log('🔍 Finding order 6aab4a3c812a171376a73227...');
    const order = await Order.findById('6aab4a3c812a171376a73227');

    if (!order) {
        console.log('❌ Order nahi mila');
        process.exit(1);
    }

    console.log('✅ Order mila');
    console.log('   AWB  :', order.trackingId);
    console.log('   Abhi :', order.deliveryStatus, '/', order.orderStatus);
    console.log('\n📞 Delhivery se pooch raha hoon...\n');

    try {
        const data = await DelhiveryService.trackShipment(order.trackingId);
        const shipment = data?.ShipmentData?.[0]?.Shipment;
        const statusStr = shipment?.Status?.Status;
        const statusTime = shipment?.Status?.StatusDateTime;

        console.log('📦 DELHIVERY KA JAWAB:');
        console.log('   Status     :', statusStr);
        console.log('   StatusTime :', statusTime);
        console.log('   StatusType :', shipment?.Status?.StatusType);
        console.log('');

        if (!statusStr) {
            console.log('⚠️ Delhivery ne koi status nahi bheja');
            process.exit(0);
        }

        // ✅ FIXED MAP
        const MAP = {
            'Manifested':              'pending',
            'Not Picked':              'pending',
            'Not Picked Up':           'pending',
            'Picked Up':               'shipped',
            'Picked':                  'shipped',
            'In Transit':              'in_transit',
            'Pending':                 'in_transit',
            'Reached Destination Hub': 'in_transit',
            'Dispatched':              'out_for_delivery',  // ✅ FIX
            'Out for Delivery':        'out_for_delivery',
            'Out For Delivery':        'out_for_delivery',
            'Undelivered':             'out_for_delivery',
            'Delivered':               'delivered',
            'RTO':                     'rto',
            'RTO In Transit':          'rto',
            'RTO Delivered':           'rto',
            'Returned':                'rto',
            'Returned to Seller':      'rto',
            'Canceled':                'rto',
            'Cancelled':               'rto',
        };

        const mapped = MAP[statusStr];

        if (!mapped) {
            console.log(`⚠️ UNMAPPED: "${statusStr}" — ye string map me nahi hai`);
            process.exit(0);
        }

        console.log(`🎯 Mapped: "${statusStr}" → "${mapped}"`);

        if (mapped === order.deliveryStatus) {
            console.log('\n✓ Order already up to date hai. Kuch change nahi karna.');
            process.exit(0);
        }

        console.log(`\n💾 Updating DB: ${order.deliveryStatus} → ${mapped}`);
        order.deliveryStatus = mapped;

        if (mapped === 'delivered') {
            order.orderStatus = 'DELIVERED';
            order.deliveredAt = statusTime ? new Date(statusTime) : new Date();
        } else if (mapped === 'out_for_delivery') {
            order.orderStatus = 'OUT_FOR_DELIVERY';
        } else if (mapped === 'in_transit') {
            order.orderStatus = 'IN_TRANSIT';
        } else if (mapped === 'rto') {
            order.orderStatus = 'RTO';
        }

        await order.save();
        console.log('✅✅✅ DB UPDATE HO GAYA!');
        console.log('   deliveryStatus:', order.deliveryStatus);
        console.log('   orderStatus   :', order.orderStatus);
        console.log('   deliveredAt   :', order.deliveredAt);

    } catch (err) {
        console.log('❌ Delhivery API error:', err.message);
        if (err.response?.data) {
            console.log('   Response:', JSON.stringify(err.response.data, null, 2));
        }
    }

    process.exit(0);
})();