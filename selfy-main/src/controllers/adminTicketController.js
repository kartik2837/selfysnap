const Ticket = require('../models/Ticket');
const User = require('../models/User');

class AdminTicketController {

    // GET /api/admin/tickets
    async getAllTickets(req, res) {
        try {
            const {
                status = 'all',
                priority = 'all',
                category = 'all',
                assignedTo = 'all',
                search = '',
                page = 1,
                limit = 20,
                sortBy = 'lastMessageAt',
                sortOrder = 'desc'
            } = req.query;

            const query = {};

            if (status !== 'all') query.status = status;
            if (priority !== 'all') query.priority = priority;
            if (category !== 'all') query.category = category;

            if (assignedTo === 'unassigned') {
                query.assignedTo = null;
            } else if (assignedTo !== 'all') {
                query.assignedTo = assignedTo;
            }

            if (search) {
                query.$or = [
                    { ticketNumber: { $regex: search, $options: 'i' } },
                    { subject: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ];
            }

            const sortOptions = {};
            sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

            const tickets = await Ticket.find(query)
                .populate('customer', 'name mobile email')
                .populate('order', 'orderId totalAmount status')
                .populate('assignedTo', 'name email')
                .sort(sortOptions)
                .skip((page - 1) * limit)
                .limit(Number(limit))
                .select('-messages');

            const total = await Ticket.countDocuments(query);

            const ratingAgg = await Ticket.aggregate([
                { $match: { rating: { $ne: null } } },
                { $group: { _id: null, avg: { $avg: '$rating' } } }
            ]);

            const stats = {
                total: await Ticket.countDocuments({}),
                open: await Ticket.countDocuments({ status: 'OPEN' }),
                inProgress: await Ticket.countDocuments({ status: 'IN_PROGRESS' }),
                resolved: await Ticket.countDocuments({ status: 'RESOLVED' }),
                closed: await Ticket.countDocuments({ status: 'CLOSED' }),
                unassigned: await Ticket.countDocuments({
                    assignedTo: null,
                    status: { $in: ['OPEN', 'IN_PROGRESS'] }
                }),
                highPriority: await Ticket.countDocuments({
                    priority: 'HIGH',
                    status: { $in: ['OPEN', 'IN_PROGRESS'] }
                }),
                avgRating: ratingAgg[0]?.avg || 0
            };

            return res.status(200).json({
                success: true,
                tickets,
                stats,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            });
        } catch (error) {
            console.error('getAllTickets error:', error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // GET /api/admin/tickets/:ticketId
    async getTicketDetail(req, res) {
        try {
            const { ticketId } = req.params;

            // ✅ messages.sender populate हटा दिया
            const ticket = await Ticket.findById(ticketId)
                .populate('customer', 'name mobile email')
                .populate('order', 'orderId totalAmount status orderItems createdAt')
                .populate('assignedTo', 'name email');

            if (!ticket) {
                return res.status(404).json({ success: false, message: 'Ticket not found' });
            }

            if (ticket.unreadCountAgent > 0) {
                ticket.unreadCountAgent = 0;
                await ticket.save();
            }

            return res.status(200).json({
                success: true,
                ticket
            });
        } catch (error) {
            console.error('getTicketDetail error:', error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // PATCH /api/admin/tickets/:ticketId/assign
    async assignTicket(req, res) {
        try {
            const { ticketId } = req.params;
            const { agentId } = req.body;
            const adminId = req.user?._id || req.admin?._id;
            const adminName = req.user?.name || req.admin?.name || 'Admin';

            const ticket = await Ticket.findById(ticketId);
            if (!ticket) {
                return res.status(404).json({ success: false, message: 'Ticket not found' });
            }

            let agent = null;
            if (agentId) {
                agent = await User.findById(agentId);
                if (!agent) {
                    return res.status(404).json({ success: false, message: 'Agent not found' });
                }
            }

            ticket.assignedTo = agentId || null;
            ticket.assignedAt = agentId ? new Date() : null;

            if (ticket.status === 'OPEN' && agentId) {
                ticket.status = 'IN_PROGRESS';
            }

            ticket.messages.push({
                sender: adminId,
                senderName: adminName,
                senderRole: 'SYSTEM',
                message: agent
                    ? `Ticket assigned to ${agent.name}`
                    : 'Ticket unassigned',
                isInternal: true
            });

            await ticket.save();

            if (global.io && agentId) {
                global.io.to(`admin-${agentId}`).emit('ticket:assigned', {
                    ticketId: ticket._id,
                    ticketNumber: ticket.ticketNumber,
                    subject: ticket.subject,
                    priority: ticket.priority
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Ticket assigned successfully',
                assignedTo: agent ? { name: agent.name, _id: agent._id } : null
            });
        } catch (error) {
            console.error('assignTicket error:', error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // POST /api/admin/tickets/:ticketId/message
    async sendMessage(req, res) {
        try {
            const { ticketId } = req.params;
            const { message, attachments = [], isInternal = false } = req.body;
            const agentId = req.user?._id || req.admin?._id;
            const agentName = req.user?.name || req.admin?.name || 'Agent';

            if (!message && attachments.length === 0) {
                return res.status(400).json({ success: false, message: 'Message required' });
            }

            const ticket = await Ticket.findById(ticketId);
            if (!ticket) {
                return res.status(404).json({ success: false, message: 'Ticket not found' });
            }

            if (ticket.status === 'CLOSED') {
                return res.status(400).json({ success: false, message: 'Ticket is closed' });
            }

            ticket.messages.push({
                sender: agentId,
                senderName: agentName,
                senderRole: 'AGENT',
                message: message || '',
                attachments,
                isInternal
            });

            ticket.lastMessageAt = new Date();

            if (!isInternal) {
                ticket.unreadCountCustomer = (ticket.unreadCountCustomer || 0) + 1;

                if (ticket.status === 'OPEN' || ticket.status === 'WAITING') {
                    ticket.status = 'IN_PROGRESS';
                }

                if (!ticket.assignedTo) {
                    ticket.assignedTo = agentId;
                    ticket.assignedAt = new Date();
                }
            }

            await ticket.save();

            if (!isInternal && global.io) {
                global.io.to(`user-${ticket.customer}`).emit('ticket:new-reply', {
                    ticketId: ticket._id,
                    ticketNumber: ticket.ticketNumber,
                    from: agentName,
                    preview: (message || 'Attachment').substring(0, 60)
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Reply sent'
            });
        } catch (error) {
            console.error('sendMessage error:', error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // PATCH /api/admin/tickets/:ticketId/status
    async updateStatus(req, res) {
        try {
            const { ticketId } = req.params;
            const { status, resolutionNote } = req.body;
            const agentId = req.user?._id || req.admin?._id;
            const agentName = req.user?.name || req.admin?.name || 'Agent';

            const validStatuses = ['OPEN', 'IN_PROGRESS', 'WAITING', 'RESOLVED', 'CLOSED'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ success: false, message: 'Invalid status' });
            }

            const ticket = await Ticket.findById(ticketId);
            if (!ticket) {
                return res.status(404).json({ success: false, message: 'Ticket not found' });
            }

            const oldStatus = ticket.status;
            ticket.status = status;

            if (status === 'RESOLVED') {
                ticket.resolvedAt = new Date();
                if (resolutionNote) ticket.resolutionNote = resolutionNote;

                ticket.messages.push({
                    sender: agentId,
                    senderName: agentName,
                    senderRole: 'SYSTEM',
                    message: resolutionNote || '🎉 आपका ticket resolve हो गया है। कृपया rating दें।',
                    isInternal: false
                });
                ticket.unreadCountCustomer = (ticket.unreadCountCustomer || 0) + 1;
            } else if (status === 'CLOSED') {
                ticket.closedAt = new Date();
            } else if (status === 'OPEN') {
                ticket.resolvedAt = null;
                ticket.closedAt = null;
            }

            ticket.messages.push({
                sender: agentId,
                senderName: agentName,
                senderRole: 'SYSTEM',
                message: `Status changed from ${oldStatus} to ${status}`,
                isInternal: true
            });

            await ticket.save();

            if (global.io && (status === 'RESOLVED' || status === 'CLOSED')) {
                global.io.to(`user-${ticket.customer}`).emit('ticket:status-changed', {
                    ticketId: ticket._id,
                    ticketNumber: ticket.ticketNumber,
                    status
                });
            }

            return res.status(200).json({
                success: true,
                message: `Status updated to ${status}`
            });
        } catch (error) {
            console.error('updateStatus error:', error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // PATCH /api/admin/tickets/:ticketId/priority
    async updatePriority(req, res) {
        try {
            const { ticketId } = req.params;
            const { priority } = req.body;

            if (!['LOW', 'MEDIUM', 'HIGH'].includes(priority)) {
                return res.status(400).json({ success: false, message: 'Invalid priority' });
            }

            const ticket = await Ticket.findByIdAndUpdate(
                ticketId,
                { priority },
                { new: true }
            );

            if (!ticket) {
                return res.status(404).json({ success: false, message: 'Ticket not found' });
            }

            return res.status(200).json({ success: true, message: 'Priority updated' });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // GET /api/admin/tickets/stats/overview
    async getStats(req, res) {
        try {
            const now = new Date();
            const todayStart = new Date(now.setHours(0, 0, 0, 0));

            const ratingAgg = await Ticket.aggregate([
                { $match: { rating: { $ne: null } } },
                { $group: { _id: null, avg: { $avg: '$rating' } } }
            ]);

            const stats = {
                today: await Ticket.countDocuments({ createdAt: { $gte: todayStart } }),
                open: await Ticket.countDocuments({ status: 'OPEN' }),
                inProgress: await Ticket.countDocuments({ status: 'IN_PROGRESS' }),
                resolved: await Ticket.countDocuments({ status: 'RESOLVED' }),
                closed: await Ticket.countDocuments({ status: 'CLOSED' }),
                unassigned: await Ticket.countDocuments({
                    assignedTo: null,
                    status: { $in: ['OPEN', 'IN_PROGRESS'] }
                }),
                highPriority: await Ticket.countDocuments({
                    priority: 'HIGH',
                    status: { $in: ['OPEN', 'IN_PROGRESS'] }
                }),
                avgRating: ratingAgg[0]?.avg || 0
            };

            return res.status(200).json({ success: true, stats });
        } catch (error) {
            console.error('getStats error:', error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // GET /api/admin/tickets/agents/list
    async getAgents(req, res) {
        try {
            const agents = await User.find({})
                .select('name email mobile role')
                .limit(50)
                .lean();

            for (let agent of agents) {
                agent.activeTickets = await Ticket.countDocuments({
                    assignedTo: agent._id,
                    status: { $in: ['OPEN', 'IN_PROGRESS', 'WAITING'] }
                });
            }

            return res.status(200).json({ success: true, agents });
        } catch (error) {
            console.error('getAgents error:', error);
            return res.status(500).json({ success: false, agents: [], message: error.message });
        }
    }
}

module.exports = new AdminTicketController();