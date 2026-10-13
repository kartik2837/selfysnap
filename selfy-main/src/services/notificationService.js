// const Notification = require('../models/Notification');
// const PushSubscription = require('../models/PushSubscription');
// const webpush = require('web-push');

// // ✅ VAPID Setup
// if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
//   webpush.setVapidDetails(
//     process.env.VAPID_EMAIL || 'mailto:admin@yourstore.com',
//     process.env.VAPID_PUBLIC_KEY,
//     process.env.VAPID_PRIVATE_KEY
//   );
// }

// /**
//  * 📨 एक User को Notification भेजो (DB + Push)
//  */
// const sendNotification = async ({
//   recipient,
//   recipientType = 'User',
//   type,
//   title,
//   message,
//   image = null,
//   actionUrl = '/',
//   actionText = 'View',
//   relatedId = null,
//   relatedType = null,
//   priority = 'NORMAL',
//   metadata = {},
//   sendPush = true,
// }) => {
//   try {
//     // 1. DB में Save करो
//     const notification = await Notification.create({
//       recipient,
//       recipientType,
//       type,
//       title,
//       message,
//       image,
//       actionUrl,
//       actionText,
//       relatedId,
//       relatedType,
//       priority,
//       metadata,
//     });

//     // 2. Push Notification भेजो
//     if (sendPush && recipient) {
//       await sendPushToUser(recipient, {
//         title,
//         body: message,
//         image,
//         url: actionUrl,
//         tag: `${type}-${notification._id}`,
//       });

//       notification.pushSent = true;
//       notification.pushSentAt = new Date();
//       await notification.save();
//     }

//     console.log(`✅ Notification sent: ${type} to ${recipient || 'ALL'}`);
//     return notification;
//   } catch (error) {
//     console.error('❌ sendNotification error:', error);
//     return null;
//   }
// };

// /**
//  * 📢 सभी Users को Broadcast Notification
//  */
// const broadcastNotification = async ({
//   type,
//   title,
//   message,
//   image = null,
//   actionUrl = '/',
//   priority = 'NORMAL',
//   sendPush = true,
// }) => {
//   try {
//     // 1. DB में Save करो (recipient = null for broadcast)
//     const notification = await Notification.create({
//       recipient: null,
//       recipientType: 'ALL',
//       type,
//       title,
//       message,
//       image,
//       actionUrl,
//       priority,
//     });

//     // 2. सभी Subscribed Users को Push भेजो
//     if (sendPush) {
//       const subscriptions = await PushSubscription.find({ isActive: true });

//       let sent = 0;
//       await Promise.all(
//         subscriptions.map(async (sub) => {
//           try {
//             await webpush.sendNotification(
//               {
//                 endpoint: sub.endpoint,
//                 keys: sub.keys,
//               },
//               JSON.stringify({
//                 title,
//                 body: message,
//                 image,
//                 url: actionUrl,
//                 tag: `broadcast-${notification._id}`,
//               })
//             );
//             sent++;
//           } catch (err) {
//             if (err.statusCode === 410 || err.statusCode === 404) {
//               await PushSubscription.findByIdAndDelete(sub._id);
//             }
//           }
//         })
//       );

//       notification.pushSent = true;
//       notification.pushSentAt = new Date();
//       await notification.save();

//       console.log(`📢 Broadcast sent to ${sent}/${subscriptions.length} devices`);
//     }

//     return notification;
//   } catch (error) {
//     console.error('❌ broadcastNotification error:', error);
//     return null;
//   }
// };

// /**
//  * 🔔 एक User के सभी Devices पर Push भेजो
//  */
// const sendPushToUser = async (userId, payload) => {
//   try {
//     const subscriptions = await PushSubscription.find({
//       user: userId,
//       isActive: true,
//     });

//     if (subscriptions.length === 0) return 0;

//     let sent = 0;
//     await Promise.all(
//       subscriptions.map(async (sub) => {
//         try {
//           await webpush.sendNotification(
//             {
//               endpoint: sub.endpoint,
//               keys: sub.keys,
//             },
//             JSON.stringify(payload)
//           );
//           sent++;
//           sub.lastUsed = new Date();
//           await sub.save();
//         } catch (err) {
//           if (err.statusCode === 410 || err.statusCode === 404) {
//             await PushSubscription.findByIdAndDelete(sub._id);
//           }
//         }
//       })
//     );

//     return sent;
//   } catch (error) {
//     console.error('sendPushToUser error:', error);
//     return 0;
//   }
// };

// // ═══════════════════════════════════════════════════
// // 🎯 Auto Triggers
// // ═══════════════════════════════════════════════════

// /**
//  * Order Placed
//  */
// const notifyOrderPlaced = async (order) => {
//   return sendNotification({
//     recipient: order.user,
//     type: 'ORDER_PLACED',
//     title: '✅ Order Placed Successfully!',
//     message: `आपका Order #${order._id.toString().slice(-8).toUpperCase()} place हो गया है।`,
//     actionUrl: `/order/${order._id}`,
//     actionText: 'View Order',
//     relatedId: order._id,
//     relatedType: 'Order',
//     priority: 'HIGH',
//   });
// };

// /**
//  * Order Shipped
//  */
// const notifyOrderShipped = async (order, trackingId) => {
//   return sendNotification({
//     recipient: order.user,
//     type: 'ORDER_SHIPPED',
//     title: '🚚 Order Shipped!',
//     message: `आपका Order ship हो गया है। Tracking ID: ${trackingId}`,
//     actionUrl: `/order/${order._id}`,
//     relatedId: order._id,
//     relatedType: 'Order',
//     priority: 'HIGH',
//   });
// };

// /**
//  * Order Delivered
//  */
// const notifyOrderDelivered = async (order) => {
//   return sendNotification({
//     recipient: order.user,
//     type: 'ORDER_DELIVERED',
//     title: '🎉 Order Delivered!',
//     message: `आपका Order deliver हो गया है। Review दें!`,
//     actionUrl: `/order/${order._id}`,
//     relatedId: order._id,
//     relatedType: 'Order',
//   });
// };

// /**
//  * Price Drop
//  */
// const notifyPriceDrop = async (userId, product, oldPrice, newPrice) => {
//   const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);
//   return sendNotification({
//     recipient: userId,
//     type: 'PRICE_DROP',
//     title: '💰 Price Drop Alert!',
//     message: `${product.name} अब ₹${newPrice} में! ${discount}% छूट`,
//     image: product.images?.[0],
//     actionUrl: `/product/${product.slug || product._id}`,
//     relatedId: product._id,
//     relatedType: 'Product',
//     priority: 'HIGH',
//   });
// };

// /**
//  * Back in Stock
//  */
// const notifyBackInStock = async (userId, product) => {
//   return sendNotification({
//     recipient: userId,
//     type: 'BACK_IN_STOCK',
//     title: '🔔 Back in Stock!',
//     message: `${product.name} अब वापस उपलब्ध है! जल्दी करें।`,
//     image: product.images?.[0],
//     actionUrl: `/product/${product.slug || product._id}`,
//     relatedId: product._id,
//     relatedType: 'Product',
//     priority: 'HIGH',
//   });
// };

// /**
//  * New Product
//  */
// const notifyNewProduct = async (userId, product) => {
//   return sendNotification({
//     recipient: userId,
//     type: 'NEW_PRODUCT',
//     title: '🎉 नया Product आया है!',
//     message: `${product.title} अब सिर्फ ₹${product.sellingPrice} में!`,
//     image: product.images?.[0],
//     actionUrl: `/product/${product.slug || product._id}`,
//     relatedId: product._id,
//     relatedType: 'Product',
//   });
// };

// module.exports = {
//   sendNotification,
//   broadcastNotification,
//   sendPushToUser,
//   notifyOrderPlaced,
//   notifyOrderShipped,
//   notifyOrderDelivered,
//   notifyPriceDrop,
//   notifyBackInStock,
//   notifyNewProduct,
// };







// backend/src/services/notificationService.js

const Notification = require('../models/Notification');
const PushSubscription = require('../models/PushSubscription');
const webpush = require('web-push');

// ✅ VAPID Setup
if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    process.env.VAPID_EMAIL || 'mailto:selfysnap@gmail.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

// ═══════════════════════════════════════════════════
// 📨 Send to Single User
// ═══════════════════════════════════════════════════
const sendNotification = async ({
  recipient,
  recipientType = 'User',
  type,
  title,
  message,
  image = null,
  actionUrl = '/',
  actionText = 'View',
  relatedId = null,
  relatedType = null,
  priority = 'NORMAL',
  metadata = {},
  sendPush = true,
}) => {
  try {
    const notification = await Notification.create({
      recipient,
      recipientType,
      type,
      title,
      message,
      image,
      actionUrl,
      actionText,
      relatedId,
      relatedType,
      priority,
      metadata,
    });

    if (sendPush && recipient) {
      await sendPushToUser(recipient, {
        title,
        body: message,
        image,
        url: actionUrl,
        tag: `${type}-${notification._id}`,
      });

      notification.pushSent = true;
      notification.pushSentAt = new Date();
      await notification.save();
    }

    console.log(`✅ Notification sent: ${type} to ${recipient || 'ALL'}`);
    return notification;
  } catch (error) {
    console.error('❌ sendNotification error:', error);
    return null;
  }
};

// ═══════════════════════════════════════════════════
// 📢 Broadcast to All Users
// ═══════════════════════════════════════════════════
const broadcastNotification = async ({
  type,
  title,
  message,
  image = null,
  actionUrl = '/',
  priority = 'NORMAL',
  sendPush = true,
}) => {
  try {
    const notification = await Notification.create({
      recipient: null,
      recipientType: 'ALL',
      type,
      title,
      message,
      image,
      actionUrl,
      priority,
    });

    if (sendPush) {
      const subscriptions = await PushSubscription.find({ isActive: true });

      let sent = 0;
      await Promise.all(
        subscriptions.map(async (sub) => {
          try {
            await webpush.sendNotification(
              {
                endpoint: sub.endpoint,
                keys: sub.keys,
              },
              JSON.stringify({
                title,
                body: message,
                image,
                url: actionUrl,
                tag: `broadcast-${notification._id}`,
              })
            );
            sent++;
          } catch (err) {
            if (err.statusCode === 410 || err.statusCode === 404) {
              await PushSubscription.findByIdAndDelete(sub._id);
            }
          }
        })
      );

      notification.pushSent = true;
      notification.pushSentAt = new Date();
      await notification.save();

      console.log(`📢 Broadcast sent to ${sent}/${subscriptions.length} devices`);
    }

    return notification;
  } catch (error) {
    console.error('❌ broadcastNotification error:', error);
    return null;
  }
};

// ═══════════════════════════════════════════════════
// 🔔 Send Push to User's All Devices
// ═══════════════════════════════════════════════════
const sendPushToUser = async (userId, payload) => {
  try {
    const subscriptions = await PushSubscription.find({
      user: userId,
      isActive: true,
    });

    if (subscriptions.length === 0) return 0;

    let sent = 0;
    await Promise.all(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: sub.keys,
            },
            JSON.stringify(payload)
          );
          sent++;
          sub.lastUsed = new Date();
          await sub.save();
        } catch (err) {
          if (err.statusCode === 410 || err.statusCode === 404) {
            await PushSubscription.findByIdAndDelete(sub._id);
          }
        }
      })
    );

    return sent;
  } catch (error) {
    console.error('sendPushToUser error:', error);
    return 0;
  }
};

// ═══════════════════════════════════════════════════
// 🎁 OFFER NOTIFICATIONS (✅ NEW)
// ═══════════════════════════════════════════════════

/**
 * 🔥 Offer Start - सभी Users को
 */
const notifyOfferStart = async (offer) => {
  return broadcastNotification({
    type: 'OFFER',
    title: `🔥 ${offer.title}`,
    message:
      offer.description ||
      `${offer.discountPercent}% की छूट! जल्दी करें, सीमित समय के लिए।`,
    image: offer.bannerImage || null,
    actionUrl: offer.actionUrl || '/offers',
    priority: 'HIGH',
  });
};

/**
 * ⚡ Flash Sale - सभी Users को
 */
const notifyFlashSale = async (sale) => {
  const hours = sale.hours || 2;
  return broadcastNotification({
    type: 'FLASH_SALE',
    title: '⚡ Flash Sale शुरू!',
    message: `${sale.title} - सिर्फ ${hours} घंटे के लिए! ${sale.discountPercent}% तक छूट।`,
    image: sale.bannerImage || null,
    actionUrl: sale.actionUrl || '/flash-sale',
    priority: 'URGENT',
  });
};

/**
 * 🎊 Festival Sale - सभी Users को
 */
const notifyFestivalSale = async (festival) => {
  return broadcastNotification({
    type: 'OFFER',
    title: `🎊 ${festival.name} Sale Live!`,
    message: `${festival.discountPercent}% तक की छूट - आज ही खरीदारी करें!`,
    image: festival.bannerImage || null,
    actionUrl: festival.actionUrl || '/festival-sale',
    priority: 'HIGH',
  });
};

// ═══════════════════════════════════════════════════
// 📦 ORDER NOTIFICATIONS
// ═══════════════════════════════════════════════════

/**
 * Order Placed
 */
const notifyOrderPlaced = async (order) => {
  return sendNotification({
    recipient: order.user,
    type: 'ORDER_PLACED',
    title: '✅ Order Placed Successfully!',
    message: `आपका Order #${order._id.toString().slice(-8).toUpperCase()} place हो गया है।`,
    actionUrl: `/order/${order._id}`,
    actionText: 'View Order',
    relatedId: order._id,
    relatedType: 'Order',
    priority: 'HIGH',
  });
};

/**
 * Order Confirmed
 */
const notifyOrderConfirmed = async (order) => {
  return sendNotification({
    recipient: order.user,
    type: 'ORDER_CONFIRMED',
    title: '✅ Order Confirmed!',
    message: `आपका Order #${order._id.toString().slice(-8).toUpperCase()} confirm हो गया है।`,
    actionUrl: `/order/${order._id}`,
    relatedId: order._id,
    relatedType: 'Order',
    priority: 'HIGH',
  });
};

/**
 * Order Shipped
 */
const notifyOrderShipped = async (order, trackingId) => {
  return sendNotification({
    recipient: order.user,
    type: 'ORDER_SHIPPED',
    title: '🚚 Order Shipped!',
    message: `आपका Order ship हो गया है। Tracking ID: ${trackingId}`,
    actionUrl: `/order/${order._id}`,
    relatedId: order._id,
    relatedType: 'Order',
    priority: 'HIGH',
  });
};

/**
 * Out for Delivery
 */
const notifyOutForDelivery = async (order) => {
  return sendNotification({
    recipient: order.user,
    type: 'ORDER_OUT_FOR_DELIVERY',
    title: '🏠 Out for Delivery!',
    message: `आपका Order आज ही पहुँचेगा!`,
    actionUrl: `/order/${order._id}`,
    relatedId: order._id,
    relatedType: 'Order',
    priority: 'URGENT',
  });
};

/**
 * Order Delivered
 */
const notifyOrderDelivered = async (order) => {
  return sendNotification({
    recipient: order.user,
    type: 'ORDER_DELIVERED',
    title: '🎉 Order Delivered!',
    message: `आपका Order deliver हो गया है। Review दें!`,
    actionUrl: `/order/${order._id}`,
    relatedId: order._id,
    relatedType: 'Order',
    priority: 'HIGH',
  });
};

/**
 * Order Cancelled
 */
const notifyOrderCancelled = async (order, reason = '') => {
  return sendNotification({
    recipient: order.user,
    type: 'ORDER_CANCELLED',
    title: '❌ Order Cancelled',
    message: `आपका Order cancel हो गया है।${reason ? ` कारण: ${reason}` : ''}`,
    actionUrl: `/order/${order._id}`,
    relatedId: order._id,
    relatedType: 'Order',
    priority: 'HIGH',
  });
};

// ═══════════════════════════════════════════════════
// 🛍️ PRODUCT NOTIFICATIONS
// ═══════════════════════════════════════════════════

/**
 * Price Drop
 */
const notifyPriceDrop = async (userId, product, oldPrice, newPrice) => {
  const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  return sendNotification({
    recipient: userId,
    type: 'PRICE_DROP',
    title: '💰 Price Drop Alert!',
    message: `${product.name || product.title} अब ₹${newPrice} में! ${discount}% छूट`,
    image: product.images?.[0],
    actionUrl: `/product/${product.slug || product._id}`,
    relatedId: product._id,
    relatedType: 'Product',
    priority: 'HIGH',
  });
};

/**
 * Back in Stock
 */
const notifyBackInStock = async (userId, product) => {
  return sendNotification({
    recipient: userId,
    type: 'BACK_IN_STOCK',
    title: '🔔 Back in Stock!',
    message: `${product.name || product.title} अब वापस उपलब्ध है! जल्दी करें।`,
    image: product.images?.[0],
    actionUrl: `/product/${product.slug || product._id}`,
    relatedId: product._id,
    relatedType: 'Product',
    priority: 'HIGH',
  });
};

/**
 * New Product
 */
const notifyNewProduct = async (userId, product) => {
  return sendNotification({
    recipient: userId,
    type: 'NEW_PRODUCT',
    title: '🎉 नया Product आया है!',
    message: `${product.title} अब सिर्फ ₹${product.sellingPrice} में!`,
    image: product.images?.[0],
    actionUrl: `/product/${product.slug || product._id}`,
    relatedId: product._id,
    relatedType: 'Product',
  });
};

// ═══════════════════════════════════════════════════
// ✅ ALL EXPORTS (Offer Functions Added)
// ═══════════════════════════════════════════════════
module.exports = {
  // Core
  sendNotification,
  broadcastNotification,
  sendPushToUser,

  // Offer (✅ NEW)
  notifyOfferStart,
  notifyFlashSale,
  notifyFestivalSale,

  // Order
  notifyOrderPlaced,
  notifyOrderConfirmed,
  notifyOrderShipped,
  notifyOutForDelivery,
  notifyOrderDelivered,
  notifyOrderCancelled,

  // Product
  notifyPriceDrop,
  notifyBackInStock,
  notifyNewProduct,
};