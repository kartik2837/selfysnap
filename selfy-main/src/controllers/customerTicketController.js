const TicketService = require('../services/TicketService');

class CustomerTicketController {

    // POST /api/customer/tickets
    async createTicket(req, res) {
        try {
            const customerId = req.user._id;
            const customerName = req.user.name || 'Customer';

            const ticket = await TicketService.createTicket(
                customerId,
                customerName,
                req.body
            );

            return res.status(201).json({
                success: true,
                message: 'Ticket created successfully',
                ticket: {
                    _id: ticket._id,
                    ticketNumber: ticket.ticketNumber,
                    status: ticket.status,
                    priority: ticket.priority,
                    createdAt: ticket.createdAt
                }
            });
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }

    // GET /api/customer/tickets
    async getMyTickets(req, res) {
        try {
            const customerId = req.user._id;
            const result = await TicketService.getCustomerTickets(customerId, req.query);

            return res.status(200).json({
                success: true,
                ...result
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // GET /api/customer/tickets/:ticketId
    async getTicketDetail(req, res) {
        try {
            const customerId = req.user._id;
            const { ticketId } = req.params;

            const ticket = await TicketService.getTicketDetail(ticketId, customerId);

            return res.status(200).json({
                success: true,
                ticket
            });
        } catch (error) {
            return res.status(404).json({ success: false, message: error.message });
        }
    }

    // POST /api/customer/tickets/:ticketId/message
    async sendMessage(req, res) {
        try {
            const customerId = req.user._id;
            const customerName = req.user.name || 'Customer';
            const { ticketId } = req.params;
            const { message, attachments = [] } = req.body;

            if (!message && attachments.length === 0) {
                return res.status(400).json({ success: false, message: 'Message required' });
            }

            const savedMessage = await TicketService.addMessage(
                ticketId,
                customerId,
                customerName,
                message,
                attachments
            );

            return res.status(200).json({
                success: true,
                message: 'Message sent',
                data: savedMessage
            });
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }

    // PATCH /api/customer/tickets/:ticketId/close
    async closeTicket(req, res) {
        try {
            const customerId = req.user._id;
            const customerName = req.user.name || 'Customer';
            const { ticketId } = req.params;

            await TicketService.closeTicket(ticketId, customerId, customerName);

            return res.status(200).json({ success: true, message: 'Ticket closed' });
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }

    // PATCH /api/customer/tickets/:ticketId/reopen
    async reopenTicket(req, res) {
        try {
            const customerId = req.user._id;
            const customerName = req.user.name || 'Customer';
            const { ticketId } = req.params;
            const { reason } = req.body;

            await TicketService.reopenTicket(ticketId, customerId, customerName, reason);

            return res.status(200).json({ success: true, message: 'Ticket reopened' });
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }

    // POST /api/customer/tickets/:ticketId/rate
    async rateTicket(req, res) {
        try {
            const customerId = req.user._id;
            const { ticketId } = req.params;
            const { rating, feedback } = req.body;

            await TicketService.rateTicket(ticketId, customerId, rating, feedback);

            return res.status(200).json({ success: true, message: 'Thanks for your feedback!' });
        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }

    // GET /api/customer/tickets/categories
    async getCategories(req, res) {
        const categories = [
            { id: 'ORDER', label: 'Order Issue', icon: '📦' },
            { id: 'PAYMENT', label: 'Payment Issue', icon: '💳' },
            { id: 'PRODUCT', label: 'Product Issue', icon: '🛍️' },
            { id: 'DELIVERY', label: 'Delivery Issue', icon: '🚚' },
            { id: 'REFUND', label: 'Refund Issue', icon: '💰' },
            { id: 'OTHER', label: 'Other', icon: '❓' }
        ];
        return res.status(200).json({ success: true, categories });
    }
}

module.exports = new CustomerTicketController();