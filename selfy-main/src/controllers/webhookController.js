// /**
//  * webhookController.js
//  * 
//  * Handles incoming webhook events from Delhivery B2C.
//  * Route: POST /api/webhooks/delhivery
//  */

// const OrderService = require('../services/OrderService');
// const PayoutService = require('../services/payoutService');
// const OrderStatus = require('../domain/OrderStatus');

// class WebhookController {

//     async handleDelhiveryWebhook(req, res) {
//         try {
//             const { waybill, status } = req.body;

//             if (!waybill || !status) {
//                 return res.status(400).json({ message: 'waybill and status are required' });
//             }

//             console.log(`[Webhook] Delhivery event: waybill=${waybill}, status=${status}`);

//             const updatedOrder = await OrderService.updateDeliveryFromWebhook(waybill, status);

//             if (updatedOrder.orderStatus === OrderStatus.DELIVERED) {
//                 try {
//                     await PayoutService.autoReleasePayout(updatedOrder);
//                 } catch (payoutErr) {
//                     console.error('[Webhook] Auto payout failed:', payoutErr.message);
//                 }
//             }

//             return res.status(200).json({ received: true, orderId: updatedOrder._id });
//         } catch (error) {
//             console.error('[Webhook] handleDelhiveryWebhook error:', error.message);
//             if (error.message.includes('No order found')) {
//                 return res.status(200).json({ received: true, warning: error.message });
//             }
//             return res.status(500).json({ message: error.message });
//         }
//     }
// }

// module.exports = new WebhookController();


















/**
 * webhookController.js
 * 
 * Handles incoming webhook events from Delhivery B2C.
 * Route: POST /api/webhooks/delhivery
 */

const OrderService = require('../services/OrderService');
const PayoutService = require('../services/payoutService');
const OrderStatus = require('../domain/OrderStatus');

class WebhookController {

    async handleDelhiveryWebhook(req, res) {
        // Immediately acknowledge to prevent Delhivery retries
        res.status(200).json({ received: true });

        // Process asynchronously (fire and forget)
        setImmediate(async () => {
            try {
                const { waybill, status } = req.body;
                if (!waybill || !status) {
                    console.error('[Webhook] Missing required fields: waybill or status');
                    return;
                }

                console.log(`[Webhook] Delhivery event: waybill=${waybill}, status=${status}`);

                const updatedOrder = await OrderService.updateDeliveryFromWebhook(waybill, status);

                if (updatedOrder && updatedOrder.orderStatus === OrderStatus.DELIVERED) {
                    try {
                        await PayoutService.autoReleasePayout(updatedOrder);
                        console.log(`[Webhook] Payout auto-released for order ${updatedOrder._id}`);
                    } catch (payoutErr) {
                        console.error('[Webhook] Auto payout failed:', payoutErr.message);
                    }
                }
            } catch (error) {
                console.error('[Webhook] Async processing error:', error.message);
            }
        });
    }
}

module.exports = new WebhookController();
