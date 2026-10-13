const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminTicketController');
const adminAuth = require('../middlewares/adminAuthMiddleware'); // तुम्हारा existing

// All routes require admin auth
router.use(adminAuth);

// Stats & agents
router.get('/stats/overview', controller.getStats);
router.get('/agents/list', controller.getAgents);

// Ticket list & detail
router.get('/', controller.getAllTickets);
router.get('/:ticketId', controller.getTicketDetail);

// Actions
router.patch('/:ticketId/assign', controller.assignTicket);
router.patch('/:ticketId/status', controller.updateStatus);
router.patch('/:ticketId/priority', controller.updatePriority);

// Reply
router.post('/:ticketId/message', controller.sendMessage);

module.exports = router;