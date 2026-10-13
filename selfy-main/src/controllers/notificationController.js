const Notification = require('../models/Notification');
const PushSubscription = require('../models/PushSubscription');
const {
  sendNotification,
  broadcastNotification,
} = require('../services/notificationService');

// ═══════════════════════════════════════════════════
// 1️⃣ User के सभी Notifications
// ═══════════════════════════════════════════════════
exports.getMyNotifications = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { page = 1, limit = 20, unreadOnly = false } = req.query;

    const query = {
      $or: [
        { recipient: userId },
        { recipient: null, recipientType: 'ALL' }, // Broadcast
      ],
    };

    if (unreadOnly === 'true') query.isRead = false;

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const unreadCount = await Notification.countDocuments({
      ...query,
      isRead: false,
    });

    res.json({
      success: true,
      data: notifications,
      unreadCount,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════════
// 2️⃣ Unread Count (Bell Icon के लिए)
// ═══════════════════════════════════════════════════
exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user?._id;

    const count = await Notification.countDocuments({
      $or: [
        { recipient: userId, isRead: false },
        { recipient: null, recipientType: 'ALL', isRead: false },
      ],
    });

    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════════
// 3️⃣ Mark as Read
// ═══════════════════════════════════════════════════
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, recipient: userId },
      { isRead: true, readAt: new Date() },
      { new: true }
    );

    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: 'Notification not found' });
    }

    res.json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════════
// 4️⃣ Mark All as Read
// ═══════════════════════════════════════════════════
exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.user?._id;

    await Notification.updateMany(
      { recipient: userId, isRead: false },
      { isRead: true, readAt: new Date() }
    );

    res.json({ success: true, message: 'All marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════════
// 5️⃣ Delete Notification
// ═══════════════════════════════════════════════════
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    await Notification.findOneAndDelete({
      _id: id,
      recipient: userId,
    });

    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════════
// 6️⃣ Save Push Subscription (Frontend से)
// ═══════════════════════════════════════════════════
exports.savePushSubscription = async (req, res) => {
  try {
    const { subscription, device = 'unknown', userAgent = '' } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: 'User not authenticated' });
    }

    if (!subscription || !subscription.endpoint) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid subscription' });
    }

    await PushSubscription.findOneAndUpdate(
      { endpoint: subscription.endpoint },
      {
        user: userId,
        endpoint: subscription.endpoint,
        keys: subscription.keys,
        device,
        userAgent,
        isActive: true,
        lastUsed: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: 'Subscription saved' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════════
// 7️⃣ Unsubscribe Push
// ═══════════════════════════════════════════════════
exports.unsubscribePush = async (req, res) => {
  try {
    const { endpoint } = req.body;
    const userId = req.user?._id;

    await PushSubscription.findOneAndUpdate(
      { endpoint, user: userId },
      { isActive: false }
    );

    res.json({ success: true, message: 'Unsubscribed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════════
// 8️⃣ Admin: Send Custom Notification
// ═══════════════════════════════════════════════════
exports.sendCustomNotification = async (req, res) => {
  try {
    const { userId, title, message, image, actionUrl, actionText, priority } =
      req.body;

    if (!title || !message) {
      return res
        .status(400)
        .json({ success: false, message: 'Title and Message required' });
    }

    const notification = await sendNotification({
      recipient: userId || null,
      recipientType: userId ? 'User' : 'ALL',
      type: 'CUSTOM',
      title,
      message,
      image,
      actionUrl: actionUrl || '/',
      actionText: actionText || 'View',
      priority: priority || 'NORMAL',
    });

    res.json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════════
// 9️⃣ Admin: Broadcast to All
// ═══════════════════════════════════════════════════
exports.broadcastToAll = async (req, res) => {
  try {
    const { title, message, image, actionUrl, priority } = req.body;

    const notification = await broadcastNotification({
      type: 'OFFER',
      title,
      message,
      image,
      actionUrl: actionUrl || '/',
      priority: priority || 'NORMAL',
    });

    res.json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════════
// 🔟 Test Push
// ═══════════════════════════════════════════════════
exports.testPush = async (req, res) => {
  try {
    const userId = req.user?._id;

    await sendNotification({
      recipient: userId,
      type: 'CUSTOM',
      title: '🔔 Test Notification',
      message: 'Push notifications काम कर रहे हैं!',
      actionUrl: '/',
    });

    res.json({ success: true, message: 'Test sent' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};