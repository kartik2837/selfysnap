const express = require('express');
const router = express.Router();
const sellerOrderController = require('../controllers/sellerOrderController');
const sellerAuthMiddleware = require('../middlewares/sellerAuthMiddleware');

// GET all seller's sub-orders
router.get('/', sellerAuthMiddleware, sellerOrderController.getSellerOrders);

// ── New seller action routes ──────────────────────────────────────────────────

// POST /:orderId/accept — Seller accepts → triggers Delivery One shipment
router.post('/:orderId/accept', sellerAuthMiddleware, sellerOrderController.acceptOrder);

// POST /:orderId/reject — Seller rejects → cancels order + flags refund
router.post('/:orderId/reject', sellerAuthMiddleware, sellerOrderController.rejectOrder);

// PATCH /:orderId/pack — Seller marks as packed (ready for pickup)
router.patch('/:orderId/pack', sellerAuthMiddleware, sellerOrderController.packOrder);

// POST /:orderId/request-pickup — Notify Delhivery for courier pickup
router.post('/:orderId/request-pickup', sellerAuthMiddleware, sellerOrderController.requestPickup);

// GET /:orderId/shipping-label — Fetch Delhivery label URL
router.get('/:orderId/shipping-label', sellerAuthMiddleware, sellerOrderController.getShippingLabel);

// PATCH /:orderId/status/:orderStatus — Generic status update (backward compat)
router.patch('/:orderId/status/:orderStatus', sellerAuthMiddleware, sellerOrderController.updateOrderStatus);

// DELETE /:orderId
router.delete('/:orderId', sellerAuthMiddleware, (req, res) => {
    return res.status(403).json({ message: 'Orders cannot be deleted by sellers' });
});

module.exports = router;
