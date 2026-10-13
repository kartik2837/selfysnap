const express = require('express');
const router = express.Router();
const {
  getMyNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  savePushSubscription,
  unsubscribePush,
  sendCustomNotification,
  broadcastToAll,
  testPush,
} = require('../controllers/notificationController');

// User Routes
router.get('/', getMyNotifications);
router.get('/unread-count', getUnreadCount);
router.patch('/:id/read', markAsRead);
router.patch('/read-all', markAllAsRead);
router.delete('/:id', deleteNotification);

// Push Subscription
router.post('/subscribe', savePushSubscription);
router.post('/unsubscribe', unsubscribePush);

// Test
router.post('/test', testPush);

// Admin Routes
router.post('/send', sendCustomNotification);
router.post('/broadcast', broadcastToAll);

module.exports = router;