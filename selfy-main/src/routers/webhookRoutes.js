/**
 * webhookRoutes.js
 * 
 * Routes for external Delhivery B2C webhooks.
 * NOTE: These routes must NOT use user/seller/admin auth middleware —
 * they are called by Delhivery's servers directly.
 */

const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// POST /api/webhooks/delhivery
// NOTE: Add signature verification once a secret is provided
router.post('/delhivery', webhookController.handleDelhiveryWebhook.bind(webhookController));

module.exports = router;
