const Ticket = require('../models/Ticket');
const Order = require('../models/Order');

class TicketService {

    // Auto-detect priority
    static detectPriority(subject, description) {
        const text = `${subject} ${description}`.toLowerCase();

        const highKeywords = ['urgent', 'fraud', 'scam', 'money', 'legal', 'police', 'stolen'];
        const lowKeywords = ['suggestion', 'feedback', 'inquiry', 'query', 'question'];

        if (highKeywords.some(k => text.includes(k))) return 'HIGH';
        if (lowKeywords.some(k => text.includes(k))) return 'LOW';
        return 'MEDIUM';
    }

    // Create ticket
    static async createTicket(customerId, customerName, data) {
        const { category, orderId, subject, description, priority, attachments } = data;

        // Validate order if provided
        let orderRef = null;
        if (orderId) {
            const order = await Order.findOne({
                $or: [
                    { _id: orderId },
                    { orderId: orderId }
                ],
                customer: customerId
            });
            if (order) orderRef = order._id;
        }

        // Auto priority
        const finalPriority = priority || this.detectPriority(subject, description);

        // Generate ticket number
        const ticketNumber = Ticket.generateTicketNumber();

        // Create
        const ticket = await Ticket.create({
            ticketNumber,
            customer: customerId,
            order: orderRef,
            category,
            subject,
            description,
            priority: finalPriority,
            attachments: attachments || [],
            status: 'OPEN',
            messages: [{
                sender: customerId,
                senderModel: 'User',
                senderName: customerName,
                senderRole: 'CUSTOMER',
                message: description,
                attachments: attachments || [],
                isInternal: false
            }],
            lastMessageAt: new Date(),
            unreadCountAgent: 1
        });

        // Add auto-reply
        setTimeout(async () => {
            try {
                const t = await Ticket.findById(ticket._id);
                if (t) {
                    t.messages.push({
                        sender: null,
                        senderModel: 'AdminUser',
                        senderName: 'SelfySnap Support',
                        senderRole: 'SYSTEM',
                        message: `Hi! आपका ticket ${ticketNumber} मिल गया है। हमारी team 2-4 घंटे में reply करेगी। धन्यवाद! 🙏`,
                        isInternal: false
                    });
                    t.lastMessageAt = new Date();
                    t.unreadCountCustomer = (t.unreadCountCustomer || 0) + 1;
                    await t.save();

                    if (global.io) {
                        global.io.to(`user-${customerId}`).emit('ticket:new-reply', {
                            ticketId: t._id,
                            ticketNumber: t.ticketNumber,
                            preview: 'Auto-reply sent'
                        });
                    }
                }
            } catch (e) { console.error('Auto-reply error:', e); }
        }, 2000);

        // Notify admins via Socket
        if (global.io) {
            global.io.to('admin-room').emit('ticket:new', {
                ticketId: ticket._id,
                ticketNumber: ticket.ticketNumber,
                subject: ticket.subject,
                customer: customerName,
                category: ticket.category,
                priority: ticket.priority
            });
        }

        return ticket;
    }

    // Get customer tickets
    static async getCustomerTickets(customerId, filters = {}) {
        const { status = 'all', page = 1, limit = 10 } = filters;

        const query = { customer: customerId };
        if (status !== 'all') {
            query.status = status;
        }

        const tickets = await Ticket.find(query)
            .populate('order', 'orderId totalAmount status')
            .sort({ lastMessageAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .select('-messages');

        const total = await Ticket.countDocuments(query);

        const counts = {
            open: await Ticket.countDocuments({ customer: customerId, status: 'OPEN' }),
            inProgress: await Ticket.countDocuments({ customer: customerId, status: 'IN_PROGRESS' }),
            resolved: await Ticket.countDocuments({ customer: customerId, status: 'RESOLVED' }),
            closed: await Ticket.countDocuments({ customer: customerId, status: 'CLOSED' })
        };

        return {
            tickets,
            counts,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }

    // Get single ticket
    static async getTicketDetail(ticketId, customerId) {
        const ticket = await Ticket.findOne({
            _id: ticketId,
            customer: customerId
        })
        .populate('order', 'orderId totalAmount status orderItems')
        .populate('assignedTo', 'name');

        if (!ticket) throw new Error('Ticket not found');

        // Mark as read
        if (ticket.unreadCountCustomer > 0) {
            ticket.unreadCountCustomer = 0;
            await ticket.save();
        }

        // Filter internal messages
        const ticketObj = ticket.toObject();
        ticketObj.messages = ticketObj.messages.filter(m => !m.isInternal);

        return ticketObj;
    }

    // Add message
    static async addMessage(ticketId, customerId, customerName, message, attachments = []) {
        const ticket = await Ticket.findOne({
            _id: ticketId,
            customer: customerId
        });

        if (!ticket) throw new Error('Ticket not found');
        if (ticket.status === 'CLOSED') throw new Error('Ticket closed. Please reopen.');

        ticket.messages.push({
            sender: customerId,
            senderModel: 'User',
            senderName: customerName,
            senderRole: 'CUSTOMER',
            message: message || '',
            attachments,
            isInternal: false
        });

        ticket.lastMessageAt = new Date();
        ticket.unreadCountAgent = (ticket.unreadCountAgent || 0) + 1;

        // Reopen if resolved
        if (ticket.status === 'RESOLVED') {
            ticket.status = 'IN_PROGRESS';
            ticket.resolvedAt = null;
        }

        await ticket.save();

        // Notify agent
        if (global.io && ticket.assignedTo) {
            global.io.to(`admin-${ticket.assignedTo}`).emit('ticket:new-message', {
                ticketId: ticket._id,
                ticketNumber: ticket.ticketNumber,
                from: 'CUSTOMER',
                customerName,
                preview: message.substring(0, 50)
            });
        }

        return ticket.messages[ticket.messages.length - 1];
    }

    // Close ticket
    static async closeTicket(ticketId, customerId, customerName) {
        const ticket = await Ticket.findOne({ _id: ticketId, customer: customerId });
        if (!ticket) throw new Error('Ticket not found');

        ticket.status = 'CLOSED';
        ticket.closedAt = new Date();
        ticket.messages.push({
            sender: customerId,
            senderModel: 'User',
            senderName: customerName,
            senderRole: 'SYSTEM',
            message: 'Ticket closed by customer',
            isInternal: false
        });
        await ticket.save();
        return ticket;
    }

    // Reopen ticket
    static async reopenTicket(ticketId, customerId, customerName, reason) {
        const ticket = await Ticket.findOne({ _id: ticketId, customer: customerId });
        if (!ticket) throw new Error('Ticket not found');

        ticket.status = 'OPEN';
        ticket.closedAt = null;
        ticket.resolvedAt = null;
        ticket.messages.push({
            sender: customerId,
            senderModel: 'User',
            senderName: customerName,
            senderRole: 'CUSTOMER',
            message: `Ticket reopened: ${reason || 'Issue not resolved'}`,
            isInternal: false
        });
        ticket.lastMessageAt = new Date();
        ticket.unreadCountAgent = (ticket.unreadCountAgent || 0) + 1;
        await ticket.save();
        return ticket;
    }

    // Rate ticket
    static async rateTicket(ticketId, customerId, rating, feedback) {
        if (!rating || rating < 1 || rating > 5) {
            throw new Error('Rating must be between 1-5');
        }

        const ticket = await Ticket.findOne({ _id: ticketId, customer: customerId });
        if (!ticket) throw new Error('Ticket not found');

        if (!['RESOLVED', 'CLOSED'].includes(ticket.status)) {
            throw new Error('Can only rate resolved tickets');
        }

        ticket.rating = rating;
        ticket.feedback = feedback || '';
        await ticket.save();
        return ticket;
    }
}

module.exports = TicketService;