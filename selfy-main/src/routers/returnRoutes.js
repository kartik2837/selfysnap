// const express = require('express');
// const router = express.Router();
// const returnController = require('../controllers/returnController');
// const userAuthMiddleware = require('../middlewares/userAuthMiddleware');
// const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

// // ── User routes ───────────────────────────────────────────────────────────────

// // POST /api/returns — Create a return request (user must be logged in)
// router.post('/', userAuthMiddleware, returnController.createReturn.bind(returnController));

// // GET /api/returns/my — User's own return requests
// router.get('/my', userAuthMiddleware, returnController.getMyReturns.bind(returnController));

// // ── Admin routes ──────────────────────────────────────────────────────────────

// // GET /api/returns/admin — all returns list
// router.get('/admin', adminAuthMiddleware, returnController.getAllReturns.bind(returnController));

// // PATCH /api/returns/admin/:returnId/approve
// router.patch('/admin/:returnId/approve', adminAuthMiddleware, returnController.approveReturn.bind(returnController));

// // PATCH /api/returns/admin/:returnId/reject
// router.patch('/admin/:returnId/reject', adminAuthMiddleware, returnController.rejectReturn.bind(returnController));

// // PATCH /api/returns/admin/:returnId/refunded
// router.patch('/admin/:returnId/refunded', adminAuthMiddleware, returnController.markRefunded.bind(returnController));

// module.exports = router;









// const express = require('express');
// const router = express.Router();
// const returnController = require('../controllers/returnController');
// const userAuthMiddleware = require('../middlewares/userAuthMiddleware');
// const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

// // ── User routes ───────────────────────────────────────────────────────────────

// // POST /api/returns — Create a return request (user must be logged in)
// router.post('/', userAuthMiddleware, returnController.createReturn.bind(returnController));

// // GET /api/returns/my — User's own return requests
// router.get('/my', userAuthMiddleware, returnController.getMyReturns.bind(returnController));

// // GET /api/returns/:returnId — Get single return
// router.get('/:returnId', userAuthMiddleware, returnController.getReturnById.bind(returnController));

// // ── Admin routes ──────────────────────────────────────────────────────────────

// // GET /api/returns/admin — all returns list
// router.get('/admin', adminAuthMiddleware, returnController.getAllReturns.bind(returnController));

// // PATCH /api/returns/admin/:returnId/approve
// router.patch('/admin/:returnId/approve', adminAuthMiddleware, returnController.approveReturn.bind(returnController));

// // PATCH /api/returns/admin/:returnId/reject
// router.patch('/admin/:returnId/reject', adminAuthMiddleware, returnController.rejectReturn.bind(returnController));

// // PATCH /api/returns/admin/:returnId/refunded
// router.patch('/admin/:returnId/refunded', adminAuthMiddleware, returnController.markRefunded.bind(returnController));

// // ── Delivery Webhook (Public - No Auth) ──────────────────────────────────────

// // POST /api/returns/webhook/delivery — Delivery Partner Webhook
// router.post('/webhook/delivery', returnController.deliveryWebhook.bind(returnController));

// // ── Internal Status Update ────────────────────────────────────────────────────

// // PATCH /api/returns/:returnId/status — Update pickup status (Admin or Internal)
// router.patch('/:returnId/status', adminAuthMiddleware, returnController.updatePickupStatus.bind(returnController));

// module.exports = router;

















const express = require('express');
const router = express.Router();
const returnController = require('../controllers/returnController');
const userAuthMiddleware = require('../middlewares/userAuthMiddleware');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

// ── User routes ───────────────────────────────────────────────────────────────

// POST /api/returns — Create a return request (user must be logged in)
router.post('/', userAuthMiddleware, returnController.createReturn.bind(returnController));

// GET /api/returns/my — User's own return requests (✅ Specific route – MUST come before /:returnId)
router.get('/my', userAuthMiddleware, returnController.getMyReturns.bind(returnController));

// ── Admin routes ──────────────────────────────────────────────────────────────

// GET /api/returns/admin — all returns list (✅ Specific route – MUST come before /:returnId)
router.get('/admin', adminAuthMiddleware, returnController.getAllReturns.bind(returnController));

// PATCH /api/returns/admin/:returnId/approve
router.patch('/admin/:returnId/approve', adminAuthMiddleware, returnController.approveReturn.bind(returnController));

// PATCH /api/returns/admin/:returnId/reject
router.patch('/admin/:returnId/reject', adminAuthMiddleware, returnController.rejectReturn.bind(returnController));

// PATCH /api/returns/admin/:returnId/refunded
router.patch('/admin/:returnId/refunded', adminAuthMiddleware, returnController.markRefunded.bind(returnController));

// ── Delivery Webhook (Public - No Auth) ──────────────────────────────────────

// POST /api/returns/webhook/delivery — Delivery Partner Webhook
router.post('/webhook/delivery', returnController.deliveryWebhook.bind(returnController));

// ── Dynamic routes (MUST BE LAST) ────────────────────────────────────────────

// GET /api/returns/:returnId — Get single return (✅ Must be after /admin and /my)
router.get('/:returnId', userAuthMiddleware, returnController.getReturnById.bind(returnController));

// PATCH /api/returns/:returnId/status — Update pickup status (Admin or Internal)
router.patch('/:returnId/status', adminAuthMiddleware, returnController.updatePickupStatus.bind(returnController));

module.exports = router;