const express = require('express');
const router = express.Router();
const controller = require('../controllers/customerTicketController');
const customerAuth = require('../middlewares/userAuthMiddleware'); // तुम्हारा existing middleware

// All routes require customer login
router.use(customerAuth);

// Categories
router.get('/categories', controller.getCategories);

// Ticket CRUD
router.post('/', controller.createTicket);
router.get('/', controller.getMyTickets);
router.get('/:ticketId', controller.getTicketDetail);

// Messages
router.post('/:ticketId/message', controller.sendMessage);

// Status
router.patch('/:ticketId/close', controller.closeTicket);
router.patch('/:ticketId/reopen', controller.reopenTicket);

// Rating
router.post('/:ticketId/rate', controller.rateTicket);

module.exports = router;