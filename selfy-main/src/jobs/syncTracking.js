// src/jobs/syncTracking.js
const cron = require('node-cron');
const Order = require('../models/Order');
const DelhiveryService = require('../services/DelhiveryService');
const OrderStatus = require('../domain/OrderStatus');
const DeliveryStatus = require('../domain/DeliveryStatus');

// ✅ FIXED MAP
const DELHIVERY_STATUS_MAP = {
    'Manifested':              DeliveryStatus.PENDING,
    'Not Picked':              DeliveryStatus.PENDING,
    'Not Picked Up':           DeliveryStatus.PENDING,

    'Picked Up':               DeliveryStatus.SHIPPED,
    'Picked':                  DeliveryStatus.SHIPPED,

    'In Transit':              DeliveryStatus.IN_TRANSIT,
    'Pending':                 DeliveryStatus.IN_TRANSIT,
    'Reached Destination Hub': DeliveryStatus.IN_TRANSIT,

    'Dispatched':              DeliveryStatus.OUT_FOR_DELIVERY,  // ✅ FIX
    'Out for Delivery':        DeliveryStatus.OUT_FOR_DELIVERY,
    'Out For Delivery':        DeliveryStatus.OUT_FOR_DELIVERY,
    'Undelivered':             DeliveryStatus.OUT_FOR_DELIVERY,

    'Delivered':               DeliveryStatus.DELIVERED,

    'RTO':                     DeliveryStatus.RTO,
    'RTO In Transit':          DeliveryStatus.RTO,
    'RTO Delivered':           DeliveryStatus.RTO,
    'Returned':                DeliveryStatus.RTO,
    'Returned to Seller':      DeliveryStatus.RTO,
    'Canceled':                DeliveryStatus.RTO,
    'Cancelled':               DeliveryStatus.RTO,
};

// ⚠️ TEST ke liye */1 — production me */30 kar dena
cron.schedule('*/1 * * * *', async () => {
    console.log('[TrackingSync] ▶ Starting...');

    try {
        const orders = await Order.find({
            trackingId: { $ne: null },
            deliveryStatus: {
                $in: [
                    DeliveryStatus.PENDING,
                    DeliveryStatus.SHIPPED,
                    DeliveryStatus.IN_TRANSIT,
                    DeliveryStatus.OUT_FOR_DELIVERY,
                ],
            },
        }).limit(50);

        console.log(`[TrackingSync] Found ${orders.length} active orders`);

        for (const order of orders) {
            try {
                const data = await DelhiveryService.trackShipment(order.trackingId);
                const shipment   = data?.ShipmentData?.[0]?.Shipment;
                const statusStr  = shipment?.Status?.Status;
                const statusTime = shipment?.Status?.StatusDateTime;

                if (!statusStr) {
                    console.log(`[TrackingSync] ⚠️ No status for AWB ${order.trackingId}`);
                    continue;
                }

                console.log(`[TrackingSync] AWB ${order.trackingId} → "${statusStr}"`);

                const mapped = DELHIVERY_STATUS_MAP[statusStr];

                if (!mapped) {
                    console.log(`[TrackingSync] ⚠️ UNMAPPED: "${statusStr}"`);
                    continue;
                }

                if (mapped === order.deliveryStatus) {
                    console.log(`[TrackingSync] ✓ Already ${mapped}`);
                    continue;
                }

                console.log(`[TrackingSync] ✅ ${order._id} | ${order.deliveryStatus} → ${mapped}`);
                order.deliveryStatus = mapped;

                if (mapped === DeliveryStatus.DELIVERED) {
                    order.orderStatus = OrderStatus.DELIVERED;
                    order.deliveredAt = statusTime ? new Date(statusTime) : new Date();
                } else if (mapped === DeliveryStatus.OUT_FOR_DELIVERY) {
                    order.orderStatus = OrderStatus.OUT_FOR_DELIVERY;
                } else if (mapped === DeliveryStatus.IN_TRANSIT) {
                    order.orderStatus = OrderStatus.IN_TRANSIT;
                } else if (mapped === DeliveryStatus.SHIPPED) {
                    order.orderStatus = OrderStatus.SHIPPED;
                    if (!order.shippedAt) order.shippedAt = new Date();
                } else if (mapped === DeliveryStatus.RTO) {
                    order.orderStatus = OrderStatus.RTO;
                }

                await order.save();
                console.log(`[TrackingSync] 💾 Saved: ${order.deliveryStatus} / ${order.orderStatus}`);

                if (global.io) {
                    global.io.emit('order_status_updated', {
                        orderId: order._id,
                        deliveryStatus: order.deliveryStatus,
                        orderStatus: order.orderStatus,
                    });
                }
            } catch (err) {
                console.error(`[TrackingSync] ❌ AWB ${order.trackingId}:`, err.message);
            }

            await new Promise(r => setTimeout(r, 500));
        }

        console.log('[TrackingSync] ■ Done\n');
    } catch (err) {
        console.error('[TrackingSync] ❌ Job failed:', err.message);
    }
});

module.exports = {};