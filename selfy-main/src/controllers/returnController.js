// /**
//  * returnController.js
//  * Handles return requests from users and admin approval flow.
//  */

// const ReturnService = require('../services/ReturnService');

// class ReturnController {

//     // POST /api/returns — User creates a return request
//     async createReturn(req, res) {
//         try {
//             const userId = req.user._id;
//             const { orderId, reason } = req.body;

//             if (!orderId || !reason) {
//                 return res.status(400).json({ message: 'orderId and reason are required' });
//             }

//             const ret = await ReturnService.createReturn(userId, orderId, reason);
//             return res.status(201).json({
//                 success: true,
//                 message: 'Return request submitted. Admin will review shortly.',
//                 return: ret,
//             });
//         } catch (error) {
//             return res.status(400).json({ success: false, message: error.message });
//         }
//     }

//     // GET /api/returns/my — User's own return requests
//     async getMyReturns(req, res) {
//         try {
//             const userId = req.user._id;
//             const returns = await ReturnService.getReturnsByUser(userId);
//             return res.status(200).json(returns);
//         } catch (error) {
//             return res.status(500).json({ message: error.message });
//         }
//     }

//     // GET /api/returns/admin — Admin lists all returns
//     async getAllReturns(req, res) {
//         try {
//             const returns = await ReturnService.getAllReturns();
//             return res.status(200).json(returns);
//         } catch (error) {
//             return res.status(500).json({ message: error.message });
//         }
//     }

//     // PATCH /api/returns/admin/:returnId/approve — Admin approves return
//     async approveReturn(req, res) {
//         try {
//             const { returnId } = req.params;
//             const { adminNote = '' } = req.body;

//             const ret = await ReturnService.approveReturn(returnId, adminNote);
//             return res.status(200).json({
//                 success: true,
//                 message: 'Return approved. Pickup will be scheduled.',
//                 return: ret,
//             });
//         } catch (error) {
//             return res.status(400).json({ success: false, message: error.message });
//         }
//     }

//     // PATCH /api/returns/admin/:returnId/reject — Admin rejects return
//     async rejectReturn(req, res) {
//         try {
//             const { returnId } = req.params;
//             const { adminNote = '' } = req.body;

//             const ret = await ReturnService.rejectReturn(returnId, adminNote);
//             return res.status(200).json({
//                 success: true,
//                 message: 'Return rejected.',
//                 return: ret,
//             });
//         } catch (error) {
//             return res.status(400).json({ success: false, message: error.message });
//         }
//     }

//     // PATCH /api/returns/admin/:returnId/refunded — Mark return as refunded
//     async markRefunded(req, res) {
//         try {
//             const { returnId } = req.params;
//             const ret = await ReturnService.markRefunded(returnId);
//             return res.status(200).json({
//                 success: true,
//                 message: 'Return marked as refunded.',
//                 return: ret,
//             });
//         } catch (error) {
//             return res.status(400).json({ success: false, message: error.message });
//         }
//     }
// }







// module.exports = new ReturnController();








/**
 * returnController.js
 * Handles return requests from users and admin approval flow.
 */

const ReturnService = require('../services/ReturnService');

class ReturnController {

    // POST /api/returns — User creates a return request
    // 👇 Updated: accepts media, description, pickupAddress
    async createReturn(req, res) {
        try {
            const userId = req.user._id;
            const { 
                orderId, 
                reason, 
                description = '', 
                media = null,
                pickupAddress = null 
            } = req.body;

            if (!orderId || !reason) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'orderId and reason are required' 
                });
            }

            const ret = await ReturnService.createReturn(
                userId, 
                orderId, 
                reason, 
                description, 
                media, 
                pickupAddress
            );

            return res.status(201).json({
                success: true,
                message: 'Return request submitted. Admin will review shortly.',
                return: ret,
            });
        } catch (error) {
            return res.status(400).json({ 
                success: false, 
                message: error.message 
            });
        }
    }

    // GET /api/returns/my — User's own return requests
    async getMyReturns(req, res) {
        try {
            const userId = req.user._id;
            const returns = await ReturnService.getReturnsByUser(userId);
            return res.status(200).json(returns);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // GET /api/returns/admin — Admin lists all returns
    async getAllReturns(req, res) {
        try {
            const returns = await ReturnService.getAllReturns();
            return res.status(200).json(returns);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // GET /api/returns/:returnId — Get single return
    async getReturnById(req, res) {
        try {
            const { returnId } = req.params;
            const ret = await ReturnService.getReturnById(returnId);
            if (!ret) {
                return res.status(404).json({ message: 'Return not found' });
            }
            return res.status(200).json(ret);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // PATCH /api/returns/admin/:returnId/approve — Admin approves return
    // 👇 Updated: Now calls Delivery API
    async approveReturn(req, res) {
        try {
            const { returnId } = req.params;
            const { adminNote = '' } = req.body;

            const ret = await ReturnService.approveReturn(returnId, adminNote);
            return res.status(200).json({
                success: true,
                message: 'Return approved. Pickup scheduled with delivery partner.',
                return: ret,
            });
        } catch (error) {
            return res.status(400).json({ 
                success: false, 
                message: error.message 
            });
        }
    }

    // PATCH /api/returns/admin/:returnId/reject — Admin rejects return
    async rejectReturn(req, res) {
        try {
            const { returnId } = req.params;
            const { adminNote = '' } = req.body;

            const ret = await ReturnService.rejectReturn(returnId, adminNote);
            return res.status(200).json({
                success: true,
                message: 'Return rejected.',
                return: ret,
            });
        } catch (error) {
            return res.status(400).json({ 
                success: false, 
                message: error.message 
            });
        }
    }

    // PATCH /api/returns/admin/:returnId/refunded — Mark return as refunded
    async markRefunded(req, res) {
        try {
            const { returnId } = req.params;
            const ret = await ReturnService.markRefunded(returnId);
            return res.status(200).json({
                success: true,
                message: 'Return marked as refunded.',
                return: ret,
            });
        } catch (error) {
            return res.status(400).json({ 
                success: false, 
                message: error.message 
            });
        }
    }

    // 👇 NEW: Update pickup status (Webhook or Admin)
    async updatePickupStatus(req, res) {
        try {
            const { returnId } = req.params;
            const { status, scheduledPickup } = req.body;

            const ret = await ReturnService.updatePickupStatus(
                returnId, 
                status, 
                { scheduledPickup }
            );
            
            return res.status(200).json({
                success: true,
                message: 'Pickup status updated',
                return: ret,
            });
        } catch (error) {
            return res.status(400).json({ 
                success: false, 
                message: error.message 
            });
        }
    }

    // 👇 NEW: Delivery Webhook (for automated status updates from delivery partner)
    async deliveryWebhook(req, res) {
        try {
            const { returnId, status, trackingId, shipmentId } = req.body;
            
            let ret;
            if (returnId) {
                ret = await Return.findById(returnId);
            } else if (trackingId) {
                ret = await Return.findOne({ returnTrackingId: trackingId });
            } else if (shipmentId) {
                ret = await Return.findOne({ returnShipmentId: shipmentId });
            }

            if (!ret) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Return not found' 
                });
            }

            const statusMap = {
                'pickup_assigned': 'assigned_to_delivery',
                'pickup_scheduled': 'pickup_scheduled',
                'picked_up': 'received',
                'in_transit': 'received',
                'delivered': 'received',
                'received': 'received',
            };

            const mappedStatus = statusMap[status] || ret.status;
            await ReturnService.updatePickupStatus(ret._id, mappedStatus);

            return res.status(200).json({ 
                success: true, 
                message: 'Webhook processed' 
            });
        } catch (error) {
            console.error('Webhook Error:', error.message);
            return res.status(400).json({ 
                success: false, 
                message: error.message 
            });
        }
    }
}

module.exports = new ReturnController();