// const Order = require("../models/Order");
// const ParentOrder = require("../models/ParentOrder");
// const Cart = require("../models/Cart");
// const Address = require("../models/Address");
// const User = require("../models/User");
// const Seller = require("../models/Seller");
// const OrderItem = require("../models/OrderItem");
// const CartItem = require("../models/CartItem");
// const CartService = require("../services/CartService");
// const OrderError = require("../exceptions/OrderError");
// const OrderStatus = require("../domain/OrderStatus");
// const PaymentStatus = require("../domain/PaymentStatus");
// const PaymentMethod = require("../domain/PaymentMethod");
// const mongoose = require("mongoose");
// const TransactionService = require("./TransactionService");
// const DelhiveryService = require("./DelhiveryService");

// // ── Internal helper: compute seller/commission amounts ───────────────────────
// function computeAmounts(totalSellingPrice, commissionRate = 10) {
//   const commissionAmount = Math.round(totalSellingPrice * commissionRate / 100);
//   const sellerAmount = totalSellingPrice - commissionAmount;
//   return { commissionRate, commissionAmount, sellerAmount };
// }

// class OrderService {

//   // ───────────────────────────────────────────────────────────────────────────
//   // Admin helpers
//   // ───────────────────────────────────────────────────────────────────────────

//   async getAllOrders() {
//     const PaymentOrder = require('../models/PaymentOrder');

//     // Fetch all non-pending orders as plain objects (lean) so we can freely add fields
//     const orders = await Order.find({ orderStatus: { $ne: OrderStatus.PENDING } })
//       .populate('user')
//       .populate('seller')
//       .populate('shippingAddress')
//       .sort({ createdAt: -1 })
//       .lean();

//     // Build a map: orderId (string) → paymentMethod from the PaymentOrder collection
//     const orderIds = orders.map(o => o._id);
//     const paymentOrders = await PaymentOrder.find({ orders: { $in: orderIds } })
//       .select('orders paymentMethod')
//       .lean();

//     const paymentMethodMap = {};
//     for (const po of paymentOrders) {
//       for (const oid of po.orders) {
//         paymentMethodMap[oid.toString()] = po.paymentMethod;
//       }
//     }

//     // Attach paymentMethod to each order, preferring PaymentOrder data
//     for (const order of orders) {
//       const pmFromPaymentOrder = paymentMethodMap[order._id.toString()];
//       if (pmFromPaymentOrder) {
//         order.paymentMethod = pmFromPaymentOrder;
//       } else if (!order.paymentMethod && order.paymentStatus === 'COD_PENDING') {
//         // Fallback for older COD orders with no PaymentOrder record
//         order.paymentMethod = 'COD';
//       }
//     }

//     return orders;
//   }

//   // ───────────────────────────────────────────────────────────────────────────
//   // Create Order (from cart) — creates ParentOrder + per-seller SubOrders
//   // ───────────────────────────────────────────────────────────────────────────

//   async createOrder(user, shippingAddress, cart, paymentMethod) {
//     try {
//       if (!cart.cartItems || cart.cartItems.length === 0) {
//         throw new Error("Cart is empty. Cannot create order.");
//       }

//       // Group cart items by seller
//       const itemsBySeller = cart.cartItems.reduce((acc, item) => {
//         const sellerId = item.product?.seller?._id?.toString();
//         if (!sellerId) throw new Error("Seller not found in product");
//         acc[sellerId] = acc[sellerId] || [];
//         acc[sellerId].push(item);
//         return acc;
//       }, {});

//       // Determine payment status
//       const payStatus = paymentMethod === PaymentMethod.COD ? PaymentStatus.COD_PENDING : PaymentStatus.PENDING;
//       const initialOrderStatus = paymentMethod === PaymentMethod.COD ? OrderStatus.PLACED : OrderStatus.PENDING;

//       const subOrders = [];
//       let totalAmount = 0;

//       // Create a SubOrder (Order doc) per seller
//       for (const [sellerId, cartItems] of Object.entries(itemsBySeller)) {
//         const seller = await Seller.findById(sellerId);

//         const totalSellingPrice = cartItems.reduce((s, i) => s + i.sellingPrice, 0);
//         const totalMrpPrice = cartItems.reduce((s, i) => s + i.mrpPrice, 0);
//         const totalItemCount = cartItems.reduce((s, i) => s + i.quantity, 0);

//         // Use seller-specific commission rate if set, fallback to 10%
//         const commissionRate = seller?.commissionRate ?? 10;
//         const { commissionAmount, sellerAmount } = computeAmounts(totalSellingPrice, commissionRate);

//         const newOrder = new Order({
//           user: user._id,
//           seller: sellerId,
//           totalMrpPrice,
//           totalSellingPrice,
//           totalItem: totalItemCount,
//           shippingAddress: shippingAddress._id,
//           orderStatus: initialOrderStatus,
//           paymentMethod: paymentMethod,
//           paymentDetails: {
//             status: payStatus,
//             method: paymentMethod,
//           },
//           orderItems: [],
//           commission: commissionAmount,   // backward compat
//           commissionRate,
//           commissionAmount,
//           sellerAmount,
//         });

//         for (const cartItem of cartItems) {
//           const orderItem = await OrderItem.create({
//             mrpPrice: cartItem.mrpPrice,
//             product: cartItem.product._id,
//             quantity: cartItem.quantity,
//             size: cartItem.size,
//             userId: cartItem.userId,
//             sellingPrice: cartItem.sellingPrice,
//           });
//           newOrder.orderItems.push(orderItem._id);
//         }

//         const savedOrder = await newOrder.save();
//         await TransactionService.createTransaction(savedOrder._id);

//         subOrders.push(savedOrder);
//         totalAmount += totalSellingPrice;
//       }

//       // Create the ParentOrder grouping all sub-orders
//       const parentOrder = new ParentOrder({
//         user: user._id,
//         subOrders: subOrders.map(o => o._id),
//         totalAmount,
//         paymentStatus: payStatus,
//         orderStatus: initialOrderStatus.toLowerCase(), // ParentOrder uses string lowercase
//         shippingAddress: shippingAddress._id,
//       });
//       const savedParent = await parentOrder.save();

//       // Back-link each sub-order to the parent
//       await Order.updateMany(
//         { _id: { $in: subOrders.map(o => o._id) } },
//         { parentOrder: savedParent._id }
//       );

//       // Clear cart removed from here - it should be cleared only after payment success (Razorpay)
//       // or immediately after order creation (COD) in the controller.

//       return { subOrders, parentOrder: savedParent };
//     } catch (error) {
//       console.error("createOrder error:", error);
//       throw new Error(error.message);
//     }
//   }

//   // ───────────────────────────────────────────────────────────────────────────
//   // Buy Now (single product) — creates ParentOrder + 1 SubOrder
//   // ───────────────────────────────────────────────────────────────────────────

//   async createBuyNowOrder(user, shippingAddress, productId, quantity, size, paymentMethod) {
//     try {
//       const Product = require("../models/Product");
//       const product = await Product.findById(productId).populate("seller");
//       if (!product) throw new Error("Product not found");

//       const sellerId = product.seller?._id?.toString();
//       if (!sellerId) throw new Error("Seller not found for this product");

//       const seller = await Seller.findById(sellerId);

//       const totalMrpPrice = product.mrpPrice * quantity;
//       const totalSellingPrice = product.sellingPrice * quantity;
//       const commissionRate = seller?.commissionRate ?? 10;
//       const { commissionAmount, sellerAmount } = computeAmounts(totalSellingPrice, commissionRate);

//       const payStatus = paymentMethod === PaymentMethod.COD ? PaymentStatus.COD_PENDING : PaymentStatus.PENDING;
//       const initialOrderStatus = paymentMethod === PaymentMethod.COD ? OrderStatus.PLACED : OrderStatus.PENDING;

//       const orderItem = await OrderItem.create({
//         product: product._id,
//         quantity,
//         size,
//         mrpPrice: totalMrpPrice,
//         sellingPrice: totalSellingPrice,
//       });

//       const newOrder = new Order({
//         user: user._id,
//         seller: sellerId,
//         totalMrpPrice,
//         totalSellingPrice,
//         totalItem: quantity,
//         shippingAddress: shippingAddress._id,
//         orderStatus: initialOrderStatus,
//         paymentMethod: paymentMethod,
//         paymentDetails: {
//           status: payStatus,
//           method: paymentMethod,
//         },
//         orderItems: [orderItem._id],
//         commission: commissionAmount,
//         commissionRate,
//         commissionAmount,
//         sellerAmount,
//       });

//       const savedOrder = await newOrder.save();
//       await TransactionService.createTransaction(savedOrder._id);

//       const parentOrder = new ParentOrder({
//         user: user._id,
//         subOrders: [savedOrder._id],
//         totalAmount: totalSellingPrice,
//         paymentStatus: payStatus,
//         orderStatus: initialOrderStatus.toLowerCase(),
//         shippingAddress: shippingAddress._id,
//       });
//       const savedParent = await parentOrder.save();

//       await Order.findByIdAndUpdate(savedOrder._id, { parentOrder: savedParent._id });

//       return { subOrders: [savedOrder], parentOrder: savedParent };
//     } catch (error) {
//       console.error("buyNow order error:", error);
//       throw new Error(error.message);
//     }
//   }

//   // ───────────────────────────────────────────────────────────────────────────
//   // SELLER: Accept Order → confirm + create Delivery One shipment
//   // ───────────────────────────────────────────────────────────────────────────

//   async acceptOrder(orderId, sellerId) {
//     const order = await this.findOrderById(orderId);

//     if (order.seller._id.toString() !== sellerId.toString()) {
//       throw new OrderError("Not authorized to accept this order");
//     }
//     if (order.orderStatus !== OrderStatus.PLACED) {
//       throw new OrderError(`Order cannot be accepted in status: ${order.orderStatus}`);
//     }

//     // Update to CONFIRMED first
//     order.orderStatus = OrderStatus.CONFIRMED;
//     await order.save();

//     try {
//       // Fetch seller with business details and pickup address
//       const seller = await Seller.findById(sellerId).populate('pickupAddress');
//       const address = await Address.findById(order.shippingAddress);

//       if (!seller.delhiveryWarehouseCode) {
//         console.warn(`[OrderService] Order ${orderId} cannot be shipped: Seller ${seller.sellerName} is not registered with Delhivery.`);
//         throw new Error("You must register your warehouse with Delhivery in your profile before accepting orders.");
//       }

//       console.log(`[OrderService] Preparing shipment for Delhivery. Seller Warehouse: ${seller.delhiveryWarehouseCode}, Pincode: ${seller.pickupAddress?.pinCode}`);

//       // Call Delhivery API
//       const shipment = await DelhiveryService.createShipment(order, seller, address);

//       // Save shipment details on sub-order
//       order.shipmentId = shipment.shipmentId;
//       order.trackingId = shipment.awbNumber;
//       order.trackingLink = shipment.trackingLink;
//       order.warehouseCode = seller.delhiveryWarehouseCode;
//       order.deliveryStatus = 'shipped';
//       order.orderStatus = OrderStatus.SHIPPED;
//       order.shippedAt = new Date();
//       await order.save();

//       console.log(`[OrderService] Order ${orderId} accepted and shipment ${order.trackingId} created.`);

//     } catch (shipmentErr) {
//       // Log but don't block — admin can retry shipment manually
//       console.error("[acceptOrder] Shipment creation failed:", shipmentErr.message);
//       // Order stays CONFIRMED so admin can manually create shipment
//     }

//     return await this.findOrderById(orderId);
//   }

//   // ───────────────────────────────────────────────────────────────────────────
//   // SELLER: Reject Order → cancel subOrder + update ParentOrder
//   // ───────────────────────────────────────────────────────────────────────────

//   async rejectOrder(orderId, sellerId, reason = '') {
//     const order = await this.findOrderById(orderId);

//     if (order.seller._id.toString() !== sellerId.toString()) {
//       throw new OrderError("Not authorized to reject this order");
//     }
//     if (![OrderStatus.PLACED, OrderStatus.CONFIRMED].includes(order.orderStatus)) {
//       throw new OrderError(`Order cannot be rejected in status: ${order.orderStatus}`);
//     }

//     // If shipment was already created, cancel it
//     if (order.shipmentId) {
//       try {
//         await DelhiveryService.cancelShipment(order.shipmentId);
//       } catch (e) {
//         console.error("[rejectOrder] Cancel shipment failed:", e.message);
//       }
//     }

//     order.orderStatus = OrderStatus.CANCELLED;
//     order.deliveryStatus = 'pending';
//     if (reason) order.rejectReason = reason;
//     await order.save();

//     // Recompute parent order status
//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) await parent.recomputeStatus();
//     }

//     // Flag refund if online payment
//     const payMethod = order.paymentDetails?.method;
//     const needsRefund = payMethod !== PaymentMethod.COD;

//     return { order: await this.findOrderById(orderId), needsRefund };
//   }

//   // ───────────────────────────────────────────────────────────────────────────
//   // SELLER: Pack Order → seller marks items packed and ready for pickup
//   // ───────────────────────────────────────────────────────────────────────────

//   async packOrder(orderId, sellerId) {
//     const order = await this.findOrderById(orderId);

//     if (order.seller._id.toString() !== sellerId.toString()) {
//       throw new OrderError("Not authorized");
//     }
//     // Allow packing if CONFIRMED or SHIPPED (manifested)
//     if (order.orderStatus !== OrderStatus.CONFIRMED && order.orderStatus !== OrderStatus.SHIPPED) {
//       throw new OrderError(`Order must be CONFIRMED or SHIPPED before packing. Current: ${order.orderStatus}`);
//     }

//     order.orderStatus = OrderStatus.PACKED;
//     order.packedAt = new Date();
//     await order.save();

//     return await this.findOrderById(orderId);
//   }

//   // ───────────────────────────────────────────────────────────────────────────
//   // WEBHOOK: Update delivery status (called by webhookController)
//   // ───────────────────────────────────────────────────────────────────────────

//   async updateDeliveryFromWebhook(shipmentId, deliveryEvent) {
//     // Find sub-order by shipmentId
//     const order = await Order.findOne({ shipmentId });
//     if (!order) throw new OrderError(`No order found for shipmentId: ${shipmentId}`);

//     const eventMap = {
//       manifested: { deliveryStatus: 'packed', orderStatus: OrderStatus.PACKED },
//       pending: { deliveryStatus: 'shipped', orderStatus: OrderStatus.SHIPPED },
//       dispatched: { deliveryStatus: 'shipped', orderStatus: OrderStatus.SHIPPED },
//       in_transit: { deliveryStatus: 'in_transit', orderStatus: OrderStatus.IN_TRANSIT },
//       out_for_delivery: { deliveryStatus: 'out_for_delivery', orderStatus: OrderStatus.OUT_FOR_DELIVERY },
//       delivered: { deliveryStatus: 'delivered', orderStatus: OrderStatus.DELIVERED },
//       rto: { deliveryStatus: 'rto', orderStatus: OrderStatus.RTO },
//       returned: { deliveryStatus: 'returned', orderStatus: OrderStatus.RETURNED },
//       cancelled: { deliveryStatus: 'cancelled', orderStatus: OrderStatus.CANCELLED },
//       failed_delivery: { deliveryStatus: 'rto', orderStatus: OrderStatus.RTO },
//     };

//     const mapped = eventMap[deliveryEvent.toLowerCase()];
//     if (!mapped) throw new OrderError(`Unknown delivery event: ${deliveryEvent}`);

//     order.deliveryStatus = mapped.deliveryStatus;
//     order.orderStatus = mapped.orderStatus;

//     if (mapped.orderStatus === OrderStatus.DELIVERED) {
//       order.deliveredAt = new Date();
//       // If it was COD or any pending status, it is now PAID
//       order.paymentStatus = PaymentStatus.PAID;
//       if (order.paymentDetails) {
//         order.paymentDetails.status = PaymentStatus.PAID;
//       }
//     }

//     await order.save();

//     // Recompute parent
//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) {
//         await parent.recomputeStatus();
//         // If sub-order is paid, check if we should mark parent as paid
//         // For simplicity, if this sub-order became PAID on delivery, we check if all are paid
//         const allSubOrders = await Order.find({ _id: { $in: parent.subOrders } });
//         const allPaid = allSubOrders.every(o => o.paymentStatus === PaymentStatus.PAID);
//         if (allPaid) {
//           parent.paymentStatus = PaymentStatus.PAID;
//           await parent.save();
//         }
//       }
//     }

//     return order;
//   }

//   // ───────────────────────────────────────────────────────────────────────────
//   // Queries
//   // ───────────────────────────────────────────────────────────────────────────

//   async findOrderById(orderId) {
//     if (!mongoose.Types.ObjectId.isValid(orderId)) {
//       throw new OrderError("Invalid Order ID");
//     }
//     const order = await Order.findById(orderId).populate([
//       { path: "seller" },
//       { path: "shippingAddress" },
//       { path: "orderItems", populate: { path: "product" } },
//       {
//         path: "parentOrder",
//         populate: { path: "paymentOrder" }
//       },
//       { path: "user" }
//     ]);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);
//     return order;
//   }

//   async findOrderItemById(orderItemId) {
//     if (!mongoose.Types.ObjectId.isValid(orderItemId)) {
//       throw new OrderError("Invalid Order Item ID");
//     }
//     const item = await OrderItem.findById(orderItemId).populate([
//       { path: "product", populate: { path: "seller" } },
//     ]);
//     if (!item) throw new OrderError(`OrderItem not found with id ${orderItemId}`);
//     return item;
//   }

//   async usersOrderHistory(userId) {
//     // Return ParentOrders for cleaner customer view
//     return await ParentOrder.find({ user: userId })
//       .populate({
//         path: 'subOrders',
//         populate: [
//           { path: 'seller', select: 'sellerName businessDetails' },
//           { path: 'shippingAddress' },
//           { path: 'orderItems', populate: { path: 'product' } },
//         ],
//       })
//       .populate('shippingAddress')
//       .populate('paymentOrder')
//       .sort({ createdAt: -1 });
//   }

//   async getShopsOrders(sellerId) {
//     const PaymentOrder = require('../models/PaymentOrder');

//     const orders = await Order.find({
//       seller: sellerId,
//       orderStatus: { $ne: OrderStatus.PENDING }
//     })
//       .sort({ createdAt: -1 })
//       .populate([
//         { path: "seller" },
//         { path: "shippingAddress" },
//         { path: "orderItems", populate: { path: "product" } },
//         { path: "user", select: "fullName email mobile" },
//       ])
//       .lean();

//     // Build map: orderId → paymentMethod from PaymentOrder
//     const orderIds = orders.map(o => o._id);
//     const paymentOrders = await PaymentOrder.find({ orders: { $in: orderIds } })
//       .select('orders paymentMethod')
//       .lean();

//     const paymentMethodMap = {};
//     for (const po of paymentOrders) {
//       for (const oid of po.orders) {
//         paymentMethodMap[oid.toString()] = po.paymentMethod;
//       }
//     }

//     for (const order of orders) {
//       const pmFromPaymentOrder = paymentMethodMap[order._id.toString()];
//       if (pmFromPaymentOrder) {
//         order.paymentMethod = pmFromPaymentOrder;
//       } else if (!order.paymentMethod && order.paymentStatus === 'COD_PENDING') {
//         order.paymentMethod = 'COD';
//       }
//     }

//     return orders;
//   }

//   async updateOrderStatus(orderId, orderStatus) {
//     const order = await this.findOrderById(orderId);

//     // If Admin is confirming and shipment hasn't been created yet, trigger shipment logic
//     if (orderStatus === OrderStatus.CONFIRMED && !order.shipmentId) {
//       console.log(`[OrderService] Admin confirming order ${orderId}, triggering shipment...`);
//       // We don't call this.acceptOrder because that checks seller ownership
//       // Instead we perform the logic directly or refactor. Direct logic here for safety:
//       try {
//         const seller = await Seller.findById(order.seller).populate('pickupAddress');
//         const address = await Address.findById(order.shippingAddress);

//         // Call Delhivery API
//         const shipment = await DelhiveryService.createShipment(order, seller, address);

//         order.shipmentId = shipment.shipmentId;
//         order.trackingId = shipment.awbNumber;
//         order.trackingLink = shipment.trackingLink;
//         order.warehouseCode = seller.delhiveryWarehouseCode;
//         order.deliveryStatus = 'shipped';
//         order.orderStatus = OrderStatus.SHIPPED;
//         order.shippedAt = new Date();
//         await order.save();

//         return await this.findOrderById(orderId);
//       } catch (shipmentErr) {
//         console.error("[updateOrderStatus] Admin shipment creation failed:", shipmentErr.message);
//         // Fallback to just saving the CONFIRMED status
//       }
//     }

//     order.orderStatus = orderStatus;
//     return await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true, runValidators: true })
//       .populate([
//         { path: "seller" },
//         { path: "shippingAddress" },
//         { path: "orderItems", populate: { path: "product" } },
//       ]);
//   }

//   async deleteOrder(orderId) {
//     const order = await this.findOrderById(orderId);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);
//     return await Order.deleteOne({ _id: orderId });
//   }

//   async cancelOrder(orderId, userId) {
//     const order = await this.findOrderById(orderId);
//     if (userId.toString() !== order.user._id.toString()) {
//       throw new OrderError(`You can't perform this action on order id ${orderId}`);
//     }
//     if ([OrderStatus.SHIPPED, OrderStatus.IN_TRANSIT, OrderStatus.OUT_FOR_DELIVERY, OrderStatus.DELIVERED].includes(order.orderStatus)) {
//       throw new OrderError("Cannot cancel an order that is already shipped or delivered");
//     }

//     order.orderStatus = OrderStatus.CANCELLED;
//     await order.save();

//     // Cancel shipment if already created
//     if (order.shipmentId) {
//       const DelhiveryService = require('./DelhiveryService');
//       try {
//         await DelhiveryService.cancelShipment(order.shipmentId);
//       } catch (e) {
//         console.error("[cancelOrder] Delhivery cancellation failed:", e.message);
//       }
//     }

//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) await parent.recomputeStatus();
//     }

//     return order;
//   }

//   // ─── Delhivery Pickup Request ───────────────────────────────────────
//   async requestPickup(orderId) {
//     const DelhiveryService = require('./DelhiveryService');
//     const order = await this.findOrderById(orderId);
//     if (!order.shipmentId || order.pickupRequested) {
//       throw new Error("Order not ready for pickup or already requested");
//     }

//     const seller = await Seller.findById(order.seller);
//     await DelhiveryService.createPickupRequest(seller, order);

//     order.pickupRequested = true;
//     return await order.save();
//   }
// }

// module.exports = new OrderService();














// const Order = require("../models/Order");
// const ParentOrder = require("../models/ParentOrder");
// const Cart = require("../models/Cart");
// const Address = require("../models/Address");
// const User = require("../models/User");
// const Seller = require("../models/Seller");
// const OrderItem = require("../models/OrderItem");
// const CartItem = require("../models/CartItem");
// const CartService = require("../services/CartService");
// const OrderError = require("../exceptions/OrderError");
// const OrderStatus = require("../domain/OrderStatus");
// const PaymentStatus = require("../domain/PaymentStatus");
// const PaymentMethod = require("../domain/PaymentMethod");
// const mongoose = require("mongoose");
// const TransactionService = require("./TransactionService");
// const DelhiveryService = require("./DelhiveryService");

// function computeAmounts(totalSellingPrice, commissionRate = 10) {
//   const commissionAmount = Math.round(totalSellingPrice * commissionRate / 100);
//   const sellerAmount = totalSellingPrice - commissionAmount;
//   return { commissionRate, commissionAmount, sellerAmount };
// }

// class OrderService {

//   async getAllOrders() {
//     const PaymentOrder = require('../models/PaymentOrder');
//     const orders = await Order.find({ orderStatus: { $ne: OrderStatus.PENDING } })
//       .populate('user').populate('seller').populate('shippingAddress')
//       .sort({ createdAt: -1 }).lean();
//     const orderIds = orders.map(o => o._id);
//     const paymentOrders = await PaymentOrder.find({ orders: { $in: orderIds } })
//       .select('orders paymentMethod').lean();
//     const paymentMethodMap = {};
//     for (const po of paymentOrders) {
//       for (const oid of po.orders) paymentMethodMap[oid.toString()] = po.paymentMethod;
//     }
//     for (const order of orders) {
//       const pm = paymentMethodMap[order._id.toString()];
//       if (pm) order.paymentMethod = pm;
//       else if (!order.paymentMethod && order.paymentStatus === 'COD_PENDING') order.paymentMethod = 'COD';
//     }
//     return orders;
//   }

//   async createOrder(user, shippingAddress, cart, paymentMethod) {
//     try {
//       if (!cart.cartItems || cart.cartItems.length === 0) throw new Error("Cart is empty");
//       const itemsBySeller = cart.cartItems.reduce((acc, item) => {
//         const sellerId = item.product?.seller?._id?.toString();
//         if (!sellerId) throw new Error("Seller not found");
//         acc[sellerId] = acc[sellerId] || [];
//         acc[sellerId].push(item);
//         return acc;
//       }, {});
//       const payStatus = paymentMethod === PaymentMethod.COD ? PaymentStatus.COD_PENDING : PaymentStatus.PENDING;
//       const initialOrderStatus = paymentMethod === PaymentMethod.COD ? OrderStatus.PLACED : OrderStatus.PENDING;
//       const subOrders = [];
//       let totalAmount = 0;
//       for (const [sellerId, cartItems] of Object.entries(itemsBySeller)) {
//         const seller = await Seller.findById(sellerId);
//         const totalSellingPrice = cartItems.reduce((s, i) => s + i.sellingPrice, 0);
//         const totalMrpPrice = cartItems.reduce((s, i) => s + i.mrpPrice, 0);
//         const totalItemCount = cartItems.reduce((s, i) => s + i.quantity, 0);
//         const commissionRate = seller?.commissionRate ?? 10;
//         const { commissionAmount, sellerAmount } = computeAmounts(totalSellingPrice, commissionRate);
//         const newOrder = new Order({
//           user: user._id, seller: sellerId, totalMrpPrice, totalSellingPrice, totalItem: totalItemCount,
//           shippingAddress: shippingAddress._id, orderStatus: initialOrderStatus, paymentMethod,
//           paymentDetails: { status: payStatus, method: paymentMethod }, orderItems: [],
//           commission: commissionAmount, commissionRate, commissionAmount, sellerAmount
//         });
//         for (const cartItem of cartItems) {
//           const orderItem = await OrderItem.create({
//             mrpPrice: cartItem.mrpPrice, product: cartItem.product._id, quantity: cartItem.quantity,
//             size: cartItem.size, userId: cartItem.userId, sellingPrice: cartItem.sellingPrice
//           });
//           newOrder.orderItems.push(orderItem._id);
//         }
//         const savedOrder = await newOrder.save();
//         await TransactionService.createTransaction(savedOrder._id);
//         subOrders.push(savedOrder);
//         totalAmount += totalSellingPrice;
//       }
//       const parentOrder = new ParentOrder({
//         user: user._id, subOrders: subOrders.map(o => o._id), totalAmount,
//         paymentStatus: payStatus, orderStatus: initialOrderStatus.toLowerCase(), shippingAddress: shippingAddress._id
//       });
//       const savedParent = await parentOrder.save();
//       await Order.updateMany({ _id: { $in: subOrders.map(o => o._id) } }, { parentOrder: savedParent._id });
//       return { subOrders, parentOrder: savedParent };
//     } catch (error) {
//       console.error("createOrder error:", error);
//       throw new Error(error.message);
//     }
//   }

//   async createBuyNowOrder(user, shippingAddress, productId, quantity, size, paymentMethod) {
//     try {
//       const Product = require("../models/Product");
//       const product = await Product.findById(productId).populate("seller");
//       if (!product) throw new Error("Product not found");
//       const sellerId = product.seller?._id?.toString();
//       if (!sellerId) throw new Error("Seller not found");
//       const seller = await Seller.findById(sellerId);
//       const totalMrpPrice = product.mrpPrice * quantity;
//       const totalSellingPrice = product.sellingPrice * quantity;
//       const commissionRate = seller?.commissionRate ?? 10;
//       const { commissionAmount, sellerAmount } = computeAmounts(totalSellingPrice, commissionRate);
//       const payStatus = paymentMethod === PaymentMethod.COD ? PaymentStatus.COD_PENDING : PaymentStatus.PENDING;
//       const initialOrderStatus = paymentMethod === PaymentMethod.COD ? OrderStatus.PLACED : OrderStatus.PENDING;
//       const orderItem = await OrderItem.create({
//         product: product._id, quantity, size, mrpPrice: totalMrpPrice, sellingPrice: totalSellingPrice
//       });
//       const newOrder = new Order({
//         user: user._id, seller: sellerId, totalMrpPrice, totalSellingPrice, totalItem: quantity,
//         shippingAddress: shippingAddress._id, orderStatus: initialOrderStatus, paymentMethod,
//         paymentDetails: { status: payStatus, method: paymentMethod }, orderItems: [orderItem._id],
//         commission: commissionAmount, commissionRate, commissionAmount, sellerAmount
//       });
//       const savedOrder = await newOrder.save();
//       await TransactionService.createTransaction(savedOrder._id);
//       const parentOrder = new ParentOrder({
//         user: user._id, subOrders: [savedOrder._id], totalAmount: totalSellingPrice,
//         paymentStatus: payStatus, orderStatus: initialOrderStatus.toLowerCase(), shippingAddress: shippingAddress._id
//       });
//       const savedParent = await parentOrder.save();
//       await Order.findByIdAndUpdate(savedOrder._id, { parentOrder: savedParent._id });
//       return { subOrders: [savedOrder], parentOrder: savedParent };
//     } catch (error) {
//       console.error("buyNow order error:", error);
//       throw new Error(error.message);
//     }
//   }

//   async acceptOrder(orderId, sellerId) {
//     const order = await this.findOrderById(orderId);
//     if (order.seller._id.toString() !== sellerId.toString()) throw new OrderError("Not authorized");
//     if (order.orderStatus !== OrderStatus.PLACED) throw new OrderError(`Order cannot be accepted in status: ${order.orderStatus}`);
//     order.orderStatus = OrderStatus.CONFIRMED;
//     await order.save();
//     try {
//       const seller = await Seller.findById(sellerId).populate('pickupAddress');
//       const address = await Address.findById(order.shippingAddress);
//       if (!seller.delhiveryWarehouseCode) throw new Error("Seller not registered with Delhivery");
//       const shipment = await DelhiveryService.createShipment(order, seller, address);
//       order.shipmentId = shipment.shipmentId;
//       order.trackingId = shipment.awbNumber;
//       order.trackingLink = shipment.trackingLink;
//       order.warehouseCode = seller.delhiveryWarehouseCode;
//       order.deliveryStatus = 'shipped';
//       order.orderStatus = OrderStatus.SHIPPED;
//       order.shippedAt = new Date();
//       await order.save();
//     } catch (shipmentErr) {
//       console.error("[acceptOrder] Shipment creation failed:", shipmentErr.message);
//     }
//     return await this.findOrderById(orderId);
//   }

//   async rejectOrder(orderId, sellerId, reason = '') {
//     const order = await this.findOrderById(orderId);
//     if (order.seller._id.toString() !== sellerId.toString()) throw new OrderError("Not authorized");
//     if (![OrderStatus.PLACED, OrderStatus.CONFIRMED].includes(order.orderStatus)) throw new OrderError(`Order cannot be rejected`);
//     if (order.shipmentId) try { await DelhiveryService.cancelShipment(order.shipmentId); } catch(e) {}
//     order.orderStatus = OrderStatus.CANCELLED;
//     order.deliveryStatus = 'pending';
//     if (reason) order.rejectReason = reason;
//     await order.save();
//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) await parent.recomputeStatus();
//     }
//     const needsRefund = order.paymentDetails?.method !== PaymentMethod.COD;
//     return { order: await this.findOrderById(orderId), needsRefund };
//   }

//   // ✅ FIXED: Pack order only if not already shipped
//   async packOrder(orderId, sellerId) {
//     const order = await this.findOrderById(orderId);
//     if (order.seller._id.toString() !== sellerId.toString()) throw new OrderError("Not authorized");
//     if (order.deliveryStatus !== 'shipped' && order.deliveryStatus !== 'delivered') {
//       order.orderStatus = OrderStatus.PACKED;
//       order.packedAt = new Date();
//       await order.save();
//     } else {
//       console.log(`Order ${orderId} already has deliveryStatus = ${order.deliveryStatus}, skipping PACKED update`);
//     }
//     return await this.findOrderById(orderId);
//   }

//   // ✅ FIXED: Webhook handler using trackingId, normalization, and missing keys
//   async updateDeliveryFromWebhook(waybill, deliveryEvent) {
//     const order = await Order.findOne({ trackingId: waybill });
//     if (!order) throw new OrderError(`No order found for trackingId: ${waybill}`);


//     const rawStatus = deliveryEvent?.toString() || '';
//     const normalized = rawStatus.toLowerCase().trim().replace(/\s+/g, '_');
//     console.log(`[Webhook] Normalized: "${normalized}" (original: "${rawStatus}")`);

//   async updateDeliveryFromWebhook(waybill, deliveryEvent) {
//     // Find sub-order by trackingId (AWB number)
//     const order = await Order.findOne({ trackingId: waybill });
//     if (!order) throw new OrderError(`No order found for trackingId: ${waybill}`);


//     const eventMap = {
//       manifested: { deliveryStatus: 'packed', orderStatus: OrderStatus.PACKED },
//       manifest_generated: { deliveryStatus: 'packed', orderStatus: OrderStatus.PACKED },
//       pickup: { deliveryStatus: 'shipped', orderStatus: OrderStatus.SHIPPED },
//       picked_up: { deliveryStatus: 'shipped', orderStatus: OrderStatus.SHIPPED },
//       dispatched: { deliveryStatus: 'shipped', orderStatus: OrderStatus.SHIPPED },
//       shipped: { deliveryStatus: 'shipped', orderStatus: OrderStatus.SHIPPED },
//       in_transit: { deliveryStatus: 'in_transit', orderStatus: OrderStatus.IN_TRANSIT },
//       intransit: { deliveryStatus: 'in_transit', orderStatus: OrderStatus.IN_TRANSIT },
//       out_for_delivery: { deliveryStatus: 'out_for_delivery', orderStatus: OrderStatus.OUT_FOR_DELIVERY },
//       outfordelivery: { deliveryStatus: 'out_for_delivery', orderStatus: OrderStatus.OUT_FOR_DELIVERY },
//       delivered: { deliveryStatus: 'delivered', orderStatus: OrderStatus.DELIVERED },
//       success: { deliveryStatus: 'delivered', orderStatus: OrderStatus.DELIVERED },
//       rto: { deliveryStatus: 'rto', orderStatus: OrderStatus.RTO },
//       returned: { deliveryStatus: 'returned', orderStatus: OrderStatus.RETURNED },
//       failed_delivery: { deliveryStatus: 'rto', orderStatus: OrderStatus.RTO },
//       cancelled: { deliveryStatus: 'cancelled', orderStatus: OrderStatus.CANCELLED },
//     };

//     const mapped = eventMap[normalized];
//     if (!mapped) {
//       console.warn(`[Webhook] Unknown delivery event: "${rawStatus}" — ignoring update`);
//       return order;
//     }

//     order.deliveryStatus = mapped.deliveryStatus;
//     order.orderStatus = mapped.orderStatus;

//     if (mapped.orderStatus === OrderStatus.DELIVERED) {
//       order.deliveredAt = new Date();
//       order.paymentStatus = PaymentStatus.PAID;
//       if (order.paymentDetails) order.paymentDetails.status = PaymentStatus.PAID;
//     }

//     await order.save();
//     console.log(`[Webhook] Order ${order._id} updated: orderStatus=${order.orderStatus}, deliveryStatus=${order.deliveryStatus}`);

//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) {
//         await parent.recomputeStatus();


//         // If sub-order is paid, check if we should mark parent as paid

//         const allSubOrders = await Order.find({ _id: { $in: parent.subOrders } });
//         const allPaid = allSubOrders.every(o => o.paymentStatus === PaymentStatus.PAID);
//         if (allPaid) {
//           parent.paymentStatus = PaymentStatus.PAID;
//           await parent.save();
//         }
//       }
//     }
//     return order;
//   }

//   async findOrderById(orderId) {
//     if (!mongoose.Types.ObjectId.isValid(orderId)) throw new OrderError("Invalid Order ID");
//     const order = await Order.findById(orderId).populate([
//       { path: "seller" }, { path: "shippingAddress" },
//       { path: "orderItems", populate: { path: "product" } },
//       { path: "parentOrder", populate: { path: "paymentOrder" } }, { path: "user" }
//     ]);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);
//     return order;
//   }

//   async findOrderItemById(orderItemId) {
//     if (!mongoose.Types.ObjectId.isValid(orderItemId)) throw new OrderError("Invalid Order Item ID");
//     const item = await OrderItem.findById(orderItemId).populate([{ path: "product", populate: { path: "seller" } }]);
//     if (!item) throw new OrderError(`OrderItem not found with id ${orderItemId}`);
//     return item;
//   }

//   async usersOrderHistory(userId) {
//     return await ParentOrder.find({ user: userId })
//       .populate({
//         path: 'subOrders',
//         populate: [
//           { path: 'seller', select: 'sellerName businessDetails' },
//           { path: 'shippingAddress' },
//           { path: 'orderItems', populate: { path: 'product' } }
//         ]
//       })
//       .populate('shippingAddress').populate('paymentOrder').sort({ createdAt: -1 });
//   }

//   async getShopsOrders(sellerId) {
//     const PaymentOrder = require('../models/PaymentOrder');
//     const orders = await Order.find({ seller: sellerId, orderStatus: { $ne: OrderStatus.PENDING } })
//       .sort({ createdAt: -1 })
//       .populate([
//         { path: "seller" }, { path: "shippingAddress" },
//         { path: "orderItems", populate: { path: "product" } },
//         { path: "user", select: "fullName email mobile" }
//       ]).lean();
//     const orderIds = orders.map(o => o._id);
//     const paymentOrders = await PaymentOrder.find({ orders: { $in: orderIds } })
//       .select('orders paymentMethod').lean();
//     const paymentMethodMap = {};
//     for (const po of paymentOrders) {
//       for (const oid of po.orders) paymentMethodMap[oid.toString()] = po.paymentMethod;
//     }
//     for (const order of orders) {
//       const pm = paymentMethodMap[order._id.toString()];
//       if (pm) order.paymentMethod = pm;
//       else if (!order.paymentMethod && order.paymentStatus === 'COD_PENDING') order.paymentMethod = 'COD';
//     }
//     return orders;
//   }

//   async updateOrderStatus(orderId, orderStatus) {
//     const order = await this.findOrderById(orderId);
//     if (orderStatus === OrderStatus.CONFIRMED && !order.shipmentId) {
//       try {
//         const seller = await Seller.findById(order.seller).populate('pickupAddress');
//         const address = await Address.findById(order.shippingAddress);
//         const shipment = await DelhiveryService.createShipment(order, seller, address);
//         order.shipmentId = shipment.shipmentId;
//         order.trackingId = shipment.awbNumber;
//         order.trackingLink = shipment.trackingLink;
//         order.warehouseCode = seller.delhiveryWarehouseCode;
//         order.deliveryStatus = 'shipped';
//         order.orderStatus = OrderStatus.SHIPPED;
//         order.shippedAt = new Date();
//         await order.save();
//         return await this.findOrderById(orderId);
//       } catch (shipmentErr) {
//         console.error("[updateOrderStatus] Shipment failed:", shipmentErr.message);
//       }
//     }
//     order.orderStatus = orderStatus;
//     return await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true, runValidators: true })
//       .populate([{ path: "seller" }, { path: "shippingAddress" }, { path: "orderItems", populate: { path: "product" } }]);
//   }

//   async deleteOrder(orderId) {
//     const order = await this.findOrderById(orderId);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);
//     return await Order.deleteOne({ _id: orderId });
//   }

//   async cancelOrder(orderId, userId) {
//     const order = await this.findOrderById(orderId);
//     if (userId.toString() !== order.user._id.toString()) throw new OrderError(`Not authorized`);
//     if ([OrderStatus.SHIPPED, OrderStatus.IN_TRANSIT, OrderStatus.OUT_FOR_DELIVERY, OrderStatus.DELIVERED].includes(order.orderStatus))
//       throw new OrderError("Cannot cancel shipped/delivered order");
//     order.orderStatus = OrderStatus.CANCELLED;
//     await order.save();
//     if (order.shipmentId) try { await DelhiveryService.cancelShipment(order.shipmentId); } catch(e) {}
//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) await parent.recomputeStatus();
//     }
//     return order;
//   }

//   async requestPickup(orderId) {
//     const order = await this.findOrderById(orderId);
//     if (!order.shipmentId || order.pickupRequested) throw new Error("Order not ready for pickup or already requested");
//     const seller = await Seller.findById(order.seller);
//     await DelhiveryService.createPickupRequest(seller, order);
//     order.pickupRequested = true;
//     return await order.save();
//   }
// }

// module.exports = new OrderService();








// const Order = require("../models/Order");
// const ParentOrder = require("../models/ParentOrder");
// const Cart = require("../models/Cart");
// const Address = require("../models/Address");
// const User = require("../models/User");
// const Seller = require("../models/Seller");
// const OrderItem = require("../models/OrderItem");
// const CartItem = require("../models/CartItem");
// const CartService = require("../services/CartService");
// const OrderError = require("../exceptions/OrderError");
// const OrderStatus = require("../domain/OrderStatus");
// const PaymentStatus = require("../domain/PaymentStatus");
// const PaymentMethod = require("../domain/PaymentMethod");
// const mongoose = require("mongoose");
// const TransactionService = require("./TransactionService");
// const DelhiveryService = require("./DelhiveryService");

// // ── Internal helper: compute seller/commission amounts ───────────────────────
// function computeAmounts(totalSellingPrice, commissionRate = 10) {
//   const commissionAmount = Math.round(totalSellingPrice * commissionRate / 100);
//   const sellerAmount = totalSellingPrice - commissionAmount;
//   return { commissionRate, commissionAmount, sellerAmount };
// }

// class OrderService {

//   // ───────────────────────────────────────────────────────────────────────────
//   // Admin helpers
//   // ───────────────────────────────────────────────────────────────────────────

//   async getAllOrders() {
//     const PaymentOrder = require('../models/PaymentOrder');

//     // Fetch all non-pending orders as plain objects (lean) so we can freely add fields
//     const orders = await Order.find({ orderStatus: { $ne: OrderStatus.PENDING } })
//       .populate('user')
//       .populate('seller')
//       .populate('shippingAddress')
//       .sort({ createdAt: -1 })
//       .lean();

//     // Build a map: orderId (string) → paymentMethod from the PaymentOrder collection
//     const orderIds = orders.map(o => o._id);
//     const paymentOrders = await PaymentOrder.find({ orders: { $in: orderIds } })
//       .select('orders paymentMethod')
//       .lean();

//     const paymentMethodMap = {};
//     for (const po of paymentOrders) {
//       for (const oid of po.orders) {
//         paymentMethodMap[oid.toString()] = po.paymentMethod;
//       }
//     }

//     // Attach paymentMethod to each order, preferring PaymentOrder data
//     for (const order of orders) {
//       const pmFromPaymentOrder = paymentMethodMap[order._id.toString()];
//       if (pmFromPaymentOrder) {
//         order.paymentMethod = pmFromPaymentOrder;
//       } else if (!order.paymentMethod && order.paymentStatus === 'COD_PENDING') {
//         // Fallback for older COD orders with no PaymentOrder record
//         order.paymentMethod = 'COD';
//       }
//     }

//     return orders;
//   }

//   // ───────────────────────────────────────────────────────────────────────────
//   // Create Order (from cart) — creates ParentOrder + per-seller SubOrders
//   // ───────────────────────────────────────────────────────────────────────────

//   async createOrder(user, shippingAddress, cart, paymentMethod) {
//     try {
//       if (!cart.cartItems || cart.cartItems.length === 0) {
//         throw new Error("Cart is empty. Cannot create order.");
//       }

//       // Group cart items by seller
//       const itemsBySeller = cart.cartItems.reduce((acc, item) => {
//         const sellerId = item.product?.seller?._id?.toString();
//         if (!sellerId) throw new Error("Seller not found in product");
//         acc[sellerId] = acc[sellerId] || [];
//         acc[sellerId].push(item);
//         return acc;
//       }, {});

//       // Determine payment status
//       const payStatus = paymentMethod === PaymentMethod.COD ? PaymentStatus.COD_PENDING : PaymentStatus.PENDING;
//       const initialOrderStatus = paymentMethod === PaymentMethod.COD ? OrderStatus.PLACED : OrderStatus.PENDING;

//       const subOrders = [];
//       let totalAmount = 0;

//       // Create a SubOrder (Order doc) per seller
//       for (const [sellerId, cartItems] of Object.entries(itemsBySeller)) {
//         const seller = await Seller.findById(sellerId);

//         const totalSellingPrice = cartItems.reduce((s, i) => s + i.sellingPrice, 0);
//         const totalMrpPrice = cartItems.reduce((s, i) => s + i.mrpPrice, 0);
//         const totalItemCount = cartItems.reduce((s, i) => s + i.quantity, 0);

//         // Use seller-specific commission rate if set, fallback to 10%
//         const commissionRate = seller?.commissionRate ?? 10;
//         const { commissionAmount, sellerAmount } = computeAmounts(totalSellingPrice, commissionRate);

//         const newOrder = new Order({
//           user: user._id,
//           seller: sellerId,
//           totalMrpPrice,
//           totalSellingPrice,
//           totalItem: totalItemCount,
//           shippingAddress: shippingAddress._id,
//           orderStatus: initialOrderStatus,
//           paymentMethod: paymentMethod,
//           paymentDetails: {
//             status: payStatus,
//             method: paymentMethod,
//           },
//           orderItems: [],
//           commission: commissionAmount,   // backward compat
//           commissionRate,
//           commissionAmount,
//           sellerAmount,
//         });

//         for (const cartItem of cartItems) {
//           const orderItem = await OrderItem.create({
//             mrpPrice: cartItem.mrpPrice,
//             product: cartItem.product._id,
//             quantity: cartItem.quantity,
//             size: cartItem.size,
//             userId: cartItem.userId,
//             sellingPrice: cartItem.sellingPrice,
//           });
//           newOrder.orderItems.push(orderItem._id);
//         }

//         const savedOrder = await newOrder.save();
//         await TransactionService.createTransaction(savedOrder._id);

//         subOrders.push(savedOrder);
//         totalAmount += totalSellingPrice;
//       }

//       // Create the ParentOrder grouping all sub-orders
//       const parentOrder = new ParentOrder({
//         user: user._id,
//         subOrders: subOrders.map(o => o._id),
//         totalAmount,
//         paymentStatus: payStatus,
//         orderStatus: initialOrderStatus.toLowerCase(), // ParentOrder uses string lowercase
//         shippingAddress: shippingAddress._id,
//       });
//       const savedParent = await parentOrder.save();

//       // Back-link each sub-order to the parent
//       await Order.updateMany(
//         { _id: { $in: subOrders.map(o => o._id) } },
//         { parentOrder: savedParent._id }
//       );

//       // Clear cart removed from here - it should be cleared only after payment success (Razorpay)
//       // or immediately after order creation (COD) in the controller.

//       return { subOrders, parentOrder: savedParent };
//     } catch (error) {
//       console.error("createOrder error:", error);
//       throw new Error(error.message);
//     }
//   }

//   // ───────────────────────────────────────────────────────────────────────────
//   // Buy Now (single product) — creates ParentOrder + 1 SubOrder
//   // ───────────────────────────────────────────────────────────────────────────

//   async createBuyNowOrder(user, shippingAddress, productId, quantity, size, paymentMethod) {
//     try {
//       const Product = require("../models/Product");
//       const product = await Product.findById(productId).populate("seller");
//       if (!product) throw new Error("Product not found");

//       const sellerId = product.seller?._id?.toString();
//       if (!sellerId) throw new Error("Seller not found for this product");

//       const seller = await Seller.findById(sellerId);

//       const totalMrpPrice = product.mrpPrice * quantity;
//       const totalSellingPrice = product.sellingPrice * quantity;
//       const commissionRate = seller?.commissionRate ?? 10;
//       const { commissionAmount, sellerAmount } = computeAmounts(totalSellingPrice, commissionRate);

//       const payStatus = paymentMethod === PaymentMethod.COD ? PaymentStatus.COD_PENDING : PaymentStatus.PENDING;
//       const initialOrderStatus = paymentMethod === PaymentMethod.COD ? OrderStatus.PLACED : OrderStatus.PENDING;

//       const orderItem = await OrderItem.create({
//         product: product._id,
//         quantity,
//         size,
//         mrpPrice: totalMrpPrice,
//         sellingPrice: totalSellingPrice,
//       });

//       const newOrder = new Order({
//         user: user._id,
//         seller: sellerId,
//         totalMrpPrice,
//         totalSellingPrice,
//         totalItem: quantity,
//         shippingAddress: shippingAddress._id,
//         orderStatus: initialOrderStatus,
//         paymentMethod: paymentMethod,
//         paymentDetails: {
//           status: payStatus,
//           method: paymentMethod,
//         },
//         orderItems: [orderItem._id],
//         commission: commissionAmount,
//         commissionRate,
//         commissionAmount,
//         sellerAmount,
//       });

//       const savedOrder = await newOrder.save();
//       await TransactionService.createTransaction(savedOrder._id);

//       const parentOrder = new ParentOrder({
//         user: user._id,
//         subOrders: [savedOrder._id],
//         totalAmount: totalSellingPrice,
//         paymentStatus: payStatus,
//         orderStatus: initialOrderStatus.toLowerCase(),
//         shippingAddress: shippingAddress._id,
//       });
//       const savedParent = await parentOrder.save();

//       await Order.findByIdAndUpdate(savedOrder._id, { parentOrder: savedParent._id });

//       return { subOrders: [savedOrder], parentOrder: savedParent };
//     } catch (error) {
//       console.error("buyNow order error:", error);
//       throw new Error(error.message);
//     }
//   }

//   // ───────────────────────────────────────────────────────────────────────────
//   // SELLER: Accept Order → confirm + create Delivery One shipment
//   // ───────────────────────────────────────────────────────────────────────────

//   async acceptOrder(orderId, sellerId) {
//     const order = await this.findOrderById(orderId);

//     if (order.seller._id.toString() !== sellerId.toString()) {
//       throw new OrderError("Not authorized to accept this order");
//     }
//     if (order.orderStatus !== OrderStatus.PLACED) {
//       throw new OrderError(`Order cannot be accepted in status: ${order.orderStatus}`);
//     }

//     // Update to CONFIRMED first
//     order.orderStatus = OrderStatus.CONFIRMED;
//     await order.save();

//     try {
//       // Fetch seller with business details and pickup address
//       const seller = await Seller.findById(sellerId).populate('pickupAddress');
//       const address = await Address.findById(order.shippingAddress);

//       if (!seller.delhiveryWarehouseCode) {
//         console.warn(`[OrderService] Order ${orderId} cannot be shipped: Seller ${seller.sellerName} is not registered with Delhivery.`);
//         throw new Error("You must register your warehouse with Delhivery in your profile before accepting orders.");
//       }

//       console.log(`[OrderService] Preparing shipment for Delhivery. Seller Warehouse: ${seller.delhiveryWarehouseCode}, Pincode: ${seller.pickupAddress?.pinCode}`);

//       // Call Delhivery API
//       const shipment = await DelhiveryService.createShipment(order, seller, address);

//       // Save shipment details on sub-order
//       order.shipmentId = shipment.shipmentId;
//       order.trackingId = shipment.awbNumber;
//       order.trackingLink = shipment.trackingLink;
//       order.warehouseCode = seller.delhiveryWarehouseCode;
//       order.deliveryStatus = 'shipped';
//       order.orderStatus = OrderStatus.SHIPPED;
//       order.shippedAt = new Date();
//       await order.save();

//       console.log(`[OrderService] Order ${orderId} accepted and shipment ${order.trackingId} created.`);

//     } catch (shipmentErr) {
//       // Log but don't block — admin can retry shipment manually
//       console.error("[acceptOrder] Shipment creation failed:", shipmentErr.message);
//       // Order stays CONFIRMED so admin can manually create shipment
//     }

//     return await this.findOrderById(orderId);
//   }

//   // ───────────────────────────────────────────────────────────────────────────
//   // SELLER: Reject Order → cancel subOrder + update ParentOrder
//   // ───────────────────────────────────────────────────────────────────────────

//   async rejectOrder(orderId, sellerId, reason = '') {
//     const order = await this.findOrderById(orderId);

//     if (order.seller._id.toString() !== sellerId.toString()) {
//       throw new OrderError("Not authorized to reject this order");
//     }
//     if (![OrderStatus.PLACED, OrderStatus.CONFIRMED].includes(order.orderStatus)) {
//       throw new OrderError(`Order cannot be rejected in status: ${order.orderStatus}`);
//     }

//     // If shipment was already created, cancel it
//     if (order.shipmentId) {
//       try {
//         await DelhiveryService.cancelShipment(order.shipmentId);
//       } catch (e) {
//         console.error("[rejectOrder] Cancel shipment failed:", e.message);
//       }
//     }

//     order.orderStatus = OrderStatus.CANCELLED;
//     order.deliveryStatus = 'pending';
//     if (reason) order.rejectReason = reason;
//     await order.save();

//     // Recompute parent order status
//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) await parent.recomputeStatus();
//     }

//     // Flag refund if online payment
//     const payMethod = order.paymentDetails?.method;
//     const needsRefund = payMethod !== PaymentMethod.COD;

//     return { order: await this.findOrderById(orderId), needsRefund };
//   }

//   // ───────────────────────────────────────────────────────────────────────────
//   // SELLER: Pack Order → seller marks items packed and ready for pickup
//   // ───────────────────────────────────────────────────────────────────────────

//   async packOrder(orderId, sellerId) {
//     const order = await this.findOrderById(orderId);

//     if (order.seller._id.toString() !== sellerId.toString()) {
//       throw new OrderError("Not authorized");
//     }
//     // Allow packing if CONFIRMED or SHIPPED (manifested)
//     if (order.orderStatus !== OrderStatus.CONFIRMED && order.orderStatus !== OrderStatus.SHIPPED) {
//       throw new OrderError(`Order must be CONFIRMED or SHIPPED before packing. Current: ${order.orderStatus}`);
//     }

//     order.orderStatus = OrderStatus.PACKED;
//     order.packedAt = new Date();
//     await order.save();

//     return await this.findOrderById(orderId);
//   }

//   // ───────────────────────────────────────────────────────────────────────────
//   // WEBHOOK: Update delivery status (called by webhookController)
//   // ───────────────────────────────────────────────────────────────────────────

//   async updateDeliveryFromWebhook(waybill, deliveryEvent) {
//     // Find sub-order by trackingId (AWB number)
//     const order = await Order.findOne({ trackingId: waybill });
//     if (!order) throw new OrderError(`No order found for trackingId: ${waybill}`);

//     const eventMap = {
//       manifested: { deliveryStatus: 'packed', orderStatus: OrderStatus.PACKED },
//       pending: { deliveryStatus: 'shipped', orderStatus: OrderStatus.SHIPPED },
//       dispatched: { deliveryStatus: 'shipped', orderStatus: OrderStatus.SHIPPED },
//       in_transit: { deliveryStatus: 'in_transit', orderStatus: OrderStatus.IN_TRANSIT },
//       out_for_delivery: { deliveryStatus: 'out_for_delivery', orderStatus: OrderStatus.OUT_FOR_DELIVERY },
//       delivered: { deliveryStatus: 'delivered', orderStatus: OrderStatus.DELIVERED },
//       rto: { deliveryStatus: 'rto', orderStatus: OrderStatus.RTO },
//       returned: { deliveryStatus: 'returned', orderStatus: OrderStatus.RETURNED },
//       cancelled: { deliveryStatus: 'cancelled', orderStatus: OrderStatus.CANCELLED },
//       failed_delivery: { deliveryStatus: 'rto', orderStatus: OrderStatus.RTO },
//     };

//     const mapped = eventMap[deliveryEvent.toLowerCase()];
//     if (!mapped) throw new OrderError(`Unknown delivery event: ${deliveryEvent}`);

//     order.deliveryStatus = mapped.deliveryStatus;
//     order.orderStatus = mapped.orderStatus;

//     if (mapped.orderStatus === OrderStatus.DELIVERED) {
//       order.deliveredAt = new Date();
//       // If it was COD or any pending status, it is now PAID
//       order.paymentStatus = PaymentStatus.PAID;
//       if (order.paymentDetails) {
//         order.paymentDetails.status = PaymentStatus.PAID;
//       }
//     }

//     await order.save();

//     // Recompute parent
//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) {
//         await parent.recomputeStatus();
//         // If sub-order is paid, check if we should mark parent as paid
//         const allSubOrders = await Order.find({ _id: { $in: parent.subOrders } });
//         const allPaid = allSubOrders.every(o => o.paymentStatus === PaymentStatus.PAID);
//         if (allPaid) {
//           parent.paymentStatus = PaymentStatus.PAID;
//           await parent.save();
//         }
//       }
//     }

//     return order;
//   }

//   // ───────────────────────────────────────────────────────────────────────────
//   // Queries
//   // ───────────────────────────────────────────────────────────────────────────

//   async findOrderById(orderId) {
//     if (!mongoose.Types.ObjectId.isValid(orderId)) {
//       throw new OrderError("Invalid Order ID");
//     }
//     const order = await Order.findById(orderId).populate([
//       { path: "seller" },
//       { path: "shippingAddress" },
//       { path: "orderItems", populate: { path: "product" } },
//       {
//         path: "parentOrder",
//         populate: { path: "paymentOrder" }
//       },
//       { path: "user" }
//     ]);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);
//     return order;
//   }

//   async findOrderItemById(orderItemId) {
//     if (!mongoose.Types.ObjectId.isValid(orderItemId)) {
//       throw new OrderError("Invalid Order Item ID");
//     }
//     const item = await OrderItem.findById(orderItemId).populate([
//       { path: "product", populate: { path: "seller" } },
//     ]);
//     if (!item) throw new OrderError(`OrderItem not found with id ${orderItemId}`);
//     return item;
//   }

//   async usersOrderHistory(userId) {
//     // Return ParentOrders for cleaner customer view
//     return await ParentOrder.find({ user: userId })
//       .populate({
//         path: 'subOrders',
//         populate: [
//           { path: 'seller', select: 'sellerName businessDetails' },
//           { path: 'shippingAddress' },
//           { path: 'orderItems', populate: { path: 'product' } },
//         ],
//       })
//       .populate('shippingAddress')
//       .populate('paymentOrder')
//       .sort({ createdAt: -1 });
//   }

//   async getShopsOrders(sellerId) {
//     const PaymentOrder = require('../models/PaymentOrder');

//     const orders = await Order.find({
//       seller: sellerId,
//       orderStatus: { $ne: OrderStatus.PENDING }
//     })
//       .sort({ createdAt: -1 })
//       .populate([
//         { path: "seller" },
//         { path: "shippingAddress" },
//         { path: "orderItems", populate: { path: "product" } },
//         { path: "user", select: "fullName email mobile" },
//       ])
//       .lean();

//     // Build map: orderId → paymentMethod from PaymentOrder
//     const orderIds = orders.map(o => o._id);
//     const paymentOrders = await PaymentOrder.find({ orders: { $in: orderIds } })
//       .select('orders paymentMethod')
//       .lean();

//     const paymentMethodMap = {};
//     for (const po of paymentOrders) {
//       for (const oid of po.orders) {
//         paymentMethodMap[oid.toString()] = po.paymentMethod;
//       }
//     }

//     for (const order of orders) {
//       const pmFromPaymentOrder = paymentMethodMap[order._id.toString()];
//       if (pmFromPaymentOrder) {
//         order.paymentMethod = pmFromPaymentOrder;
//       } else if (!order.paymentMethod && order.paymentStatus === 'COD_PENDING') {
//         order.paymentMethod = 'COD';
//       }
//     }

//     return orders;
//   }

//   async updateOrderStatus(orderId, orderStatus) {
//     const order = await this.findOrderById(orderId);

//     // If Admin is confirming and shipment hasn't been created yet, trigger shipment logic
//     if (orderStatus === OrderStatus.CONFIRMED && !order.shipmentId) {
//       console.log(`[OrderService] Admin confirming order ${orderId}, triggering shipment...`);
//       // We don't call this.acceptOrder because that checks seller ownership
//       // Instead we perform the logic directly or refactor. Direct logic here for safety:
//       try {
//         const seller = await Seller.findById(order.seller).populate('pickupAddress');
//         const address = await Address.findById(order.shippingAddress);

//         // Call Delhivery API
//         const shipment = await DelhiveryService.createShipment(order, seller, address);

//         order.shipmentId = shipment.shipmentId;
//         order.trackingId = shipment.awbNumber;
//         order.trackingLink = shipment.trackingLink;
//         order.warehouseCode = seller.delhiveryWarehouseCode;
//         order.deliveryStatus = 'shipped';
//         order.orderStatus = OrderStatus.SHIPPED;
//         order.shippedAt = new Date();
//         await order.save();

//         return await this.findOrderById(orderId);
//       } catch (shipmentErr) {
//         console.error("[updateOrderStatus] Admin shipment creation failed:", shipmentErr.message);
//         // Fallback to just saving the CONFIRMED status
//       }
//     }

//     order.orderStatus = orderStatus;
//     return await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true, runValidators: true })
//       .populate([
//         { path: "seller" },
//         { path: "shippingAddress" },
//         { path: "orderItems", populate: { path: "product" } },
//       ]);
//   }

//   async deleteOrder(orderId) {
//     const order = await this.findOrderById(orderId);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);
//     return await Order.deleteOne({ _id: orderId });
//   }

//   async cancelOrder(orderId, userId) {
//     const order = await this.findOrderById(orderId);
//     if (userId.toString() !== order.user._id.toString()) {
//       throw new OrderError(`You can't perform this action on order id ${orderId}`);
//     }
//     if ([OrderStatus.SHIPPED, OrderStatus.IN_TRANSIT, OrderStatus.OUT_FOR_DELIVERY, OrderStatus.DELIVERED].includes(order.orderStatus)) {
//       throw new OrderError("Cannot cancel an order that is already shipped or delivered");
//     }

//     order.orderStatus = OrderStatus.CANCELLED;
//     await order.save();

//     // Cancel shipment if already created
//     if (order.shipmentId) {
//       const DelhiveryService = require('./DelhiveryService');
//       try {
//         await DelhiveryService.cancelShipment(order.shipmentId);
//       } catch (e) {
//         console.error("[cancelOrder] Delhivery cancellation failed:", e.message);
//       }
//     }

//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) await parent.recomputeStatus();
//     }

//     return order;
//   }

//   // ─── Delhivery Pickup Request ───────────────────────────────────────
//   async requestPickup(orderId) {
//     const DelhiveryService = require('./DelhiveryService');
//     const order = await this.findOrderById(orderId);
//     if (!order.shipmentId || order.pickupRequested) {
//       throw new Error("Order not ready for pickup or already requested");
//     }

//     const seller = await Seller.findById(order.seller);
//     await DelhiveryService.createPickupRequest(seller, order);

//     order.pickupRequested = true;
//     return await order.save();
//   }
// }

// module.exports = new OrderService();



















// const Order = require("../models/Order");
// const ParentOrder = require("../models/ParentOrder");
// const Cart = require("../models/Cart");
// const Address = require("../models/Address");
// const User = require("../models/User");
// const Seller = require("../models/Seller");
// const OrderItem = require("../models/OrderItem");
// const CartItem = require("../models/CartItem");
// const CartService = require("../services/CartService");
// const OrderError = require("../exceptions/OrderError");
// const OrderStatus = require("../domain/OrderStatus");
// const PaymentStatus = require("../domain/PaymentStatus");
// const PaymentMethod = require("../domain/PaymentMethod");
// const mongoose = require("mongoose");
// const TransactionService = require("./TransactionService");
// const DelhiveryService = require("./DelhiveryService");

// function computeAmounts(totalSellingPrice, commissionRate = 10) {
//   const commissionAmount = Math.round(totalSellingPrice * commissionRate / 100);
//   const sellerAmount = totalSellingPrice - commissionAmount;
//   return { commissionRate, commissionAmount, sellerAmount };
// }

// class OrderService {

//   async getAllOrders() {
//     const PaymentOrder = require('../models/PaymentOrder');
//     const orders = await Order.find({ orderStatus: { $ne: OrderStatus.PENDING } })
//       .populate('user').populate('seller').populate('shippingAddress')
//       .sort({ createdAt: -1 }).lean();
//     const orderIds = orders.map(o => o._id);
//     const paymentOrders = await PaymentOrder.find({ orders: { $in: orderIds } })
//       .select('orders paymentMethod').lean();
//     const paymentMethodMap = {};
//     for (const po of paymentOrders) {
//       for (const oid of po.orders) paymentMethodMap[oid.toString()] = po.paymentMethod;
//     }
//     for (const order of orders) {
//       const pm = paymentMethodMap[order._id.toString()];
//       if (pm) order.paymentMethod = pm;
//       else if (!order.paymentMethod && order.paymentStatus === 'COD_PENDING') order.paymentMethod = 'COD';
//     }
//     return orders;
//   }

//   async createOrder(user, shippingAddress, cart, paymentMethod) {
//     try {
//       if (!cart.cartItems || cart.cartItems.length === 0) throw new Error("Cart is empty");
//       const itemsBySeller = cart.cartItems.reduce((acc, item) => {
//         const sellerId = item.product?.seller?._id?.toString();
//         if (!sellerId) throw new Error("Seller not found");
//         acc[sellerId] = acc[sellerId] || [];
//         acc[sellerId].push(item);
//         return acc;
//       }, {});
//       const payStatus = paymentMethod === PaymentMethod.COD ? PaymentStatus.COD_PENDING : PaymentStatus.PENDING;
//       const initialOrderStatus = paymentMethod === PaymentMethod.COD ? OrderStatus.PLACED : OrderStatus.PENDING;
//       const subOrders = [];
//       let totalAmount = 0;
//       for (const [sellerId, cartItems] of Object.entries(itemsBySeller)) {
//         const seller = await Seller.findById(sellerId);
//         const totalSellingPrice = cartItems.reduce((s, i) => s + i.sellingPrice, 0);
//         const totalMrpPrice = cartItems.reduce((s, i) => s + i.mrpPrice, 0);
//         const totalItemCount = cartItems.reduce((s, i) => s + i.quantity, 0);
//         const commissionRate = seller?.commissionRate ?? 10;
//         const { commissionAmount, sellerAmount } = computeAmounts(totalSellingPrice, commissionRate);
//         const newOrder = new Order({
//           user: user._id, seller: sellerId, totalMrpPrice, totalSellingPrice, totalItem: totalItemCount,
//           shippingAddress: shippingAddress._id, orderStatus: initialOrderStatus, paymentMethod,
//           paymentDetails: { status: payStatus, method: paymentMethod }, orderItems: [],
//           commission: commissionAmount, commissionRate, commissionAmount, sellerAmount
//         });
//         for (const cartItem of cartItems) {
//           const orderItem = await OrderItem.create({
//             mrpPrice: cartItem.mrpPrice, product: cartItem.product._id, quantity: cartItem.quantity,
//             size: cartItem.size, userId: cartItem.userId, sellingPrice: cartItem.sellingPrice
//           });
//           newOrder.orderItems.push(orderItem._id);
//         }
//         const savedOrder = await newOrder.save();
//         await TransactionService.createTransaction(savedOrder._id);
//         subOrders.push(savedOrder);
//         totalAmount += totalSellingPrice;
//       }
//       const parentOrder = new ParentOrder({
//         user: user._id, subOrders: subOrders.map(o => o._id), totalAmount,
//         paymentStatus: payStatus, orderStatus: initialOrderStatus.toLowerCase(), shippingAddress: shippingAddress._id
//       });
//       const savedParent = await parentOrder.save();
//       await Order.updateMany({ _id: { $in: subOrders.map(o => o._id) } }, { parentOrder: savedParent._id });
//       return { subOrders, parentOrder: savedParent };
//     } catch (error) {
//       console.error("createOrder error:", error);
//       throw new Error(error.message);
//     }
//   }

//   async createBuyNowOrder(user, shippingAddress, productId, quantity, size, paymentMethod) {
//     try {
//       const Product = require("../models/Product");
//       const product = await Product.findById(productId).populate("seller");
//       if (!product) throw new Error("Product not found");
//       const sellerId = product.seller?._id?.toString();
//       if (!sellerId) throw new Error("Seller not found");
//       const seller = await Seller.findById(sellerId);
//       const totalMrpPrice = product.mrpPrice * quantity;
//       const totalSellingPrice = product.sellingPrice * quantity;
//       const commissionRate = seller?.commissionRate ?? 10;
//       const { commissionAmount, sellerAmount } = computeAmounts(totalSellingPrice, commissionRate);
//       const payStatus = paymentMethod === PaymentMethod.COD ? PaymentStatus.COD_PENDING : PaymentStatus.PENDING;
//       const initialOrderStatus = paymentMethod === PaymentMethod.COD ? OrderStatus.PLACED : OrderStatus.PENDING;
//       const orderItem = await OrderItem.create({
//         product: product._id, quantity, size, mrpPrice: totalMrpPrice, sellingPrice: totalSellingPrice
//       });
//       const newOrder = new Order({
//         user: user._id, seller: sellerId, totalMrpPrice, totalSellingPrice, totalItem: quantity,
//         shippingAddress: shippingAddress._id, orderStatus: initialOrderStatus, paymentMethod,
//         paymentDetails: { status: payStatus, method: paymentMethod }, orderItems: [orderItem._id],
//         commission: commissionAmount, commissionRate, commissionAmount, sellerAmount
//       });
//       const savedOrder = await newOrder.save();
//       await TransactionService.createTransaction(savedOrder._id);
//       const parentOrder = new ParentOrder({
//         user: user._id, subOrders: [savedOrder._id], totalAmount: totalSellingPrice,
//         paymentStatus: payStatus, orderStatus: initialOrderStatus.toLowerCase(), shippingAddress: shippingAddress._id
//       });
//       const savedParent = await parentOrder.save();
//       await Order.findByIdAndUpdate(savedOrder._id, { parentOrder: savedParent._id });
//       return { subOrders: [savedOrder], parentOrder: savedParent };
//     } catch (error) {
//       console.error("buyNow order error:", error);
//       throw new Error(error.message);
//     }
//   }

//   async acceptOrder(orderId, sellerId) {
//     const order = await this.findOrderById(orderId);
//     if (order.seller._id.toString() !== sellerId.toString()) throw new OrderError("Not authorized");
//     if (order.orderStatus !== OrderStatus.PLACED) throw new OrderError(`Order cannot be accepted in status: ${order.orderStatus}`);
//     order.orderStatus = OrderStatus.CONFIRMED;
//     await order.save();
//     try {
//       const seller = await Seller.findById(sellerId).populate('pickupAddress');
//       const address = await Address.findById(order.shippingAddress);
//       if (!seller.delhiveryWarehouseCode) throw new Error("Seller not registered with Delhivery");
//       const shipment = await DelhiveryService.createShipment(order, seller, address);
//       order.shipmentId = shipment.shipmentId;
//       order.trackingId = shipment.awbNumber;
//       order.trackingLink = shipment.trackingLink;
//       order.warehouseCode = seller.delhiveryWarehouseCode;
//       order.deliveryStatus = 'shipped';
//       order.orderStatus = OrderStatus.SHIPPED;
//       order.shippedAt = new Date();
//       await order.save();
//     } catch (shipmentErr) {
//       console.error("[acceptOrder] Shipment creation failed:", shipmentErr.message);
//     }
//     return await this.findOrderById(orderId);
//   }

//   async rejectOrder(orderId, sellerId, reason = '') {
//     const order = await this.findOrderById(orderId);
//     if (order.seller._id.toString() !== sellerId.toString()) throw new OrderError("Not authorized");
//     if (![OrderStatus.PLACED, OrderStatus.CONFIRMED].includes(order.orderStatus)) throw new OrderError(`Order cannot be rejected`);
//     if (order.shipmentId) try { await DelhiveryService.cancelShipment(order.shipmentId); } catch(e) {}
//     order.orderStatus = OrderStatus.CANCELLED;
//     order.deliveryStatus = 'pending';
//     if (reason) order.rejectReason = reason;
//     await order.save();
//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) await parent.recomputeStatus();
//     }
//     const needsRefund = order.paymentDetails?.method !== PaymentMethod.COD;
//     return { order: await this.findOrderById(orderId), needsRefund };
//   }

//   async packOrder(orderId, sellerId) {
//     const order = await this.findOrderById(orderId);
//     if (order.seller._id.toString() !== sellerId.toString()) throw new OrderError("Not authorized");
//     if (order.deliveryStatus !== 'shipped' && order.deliveryStatus !== 'delivered') {
//       order.orderStatus = OrderStatus.PACKED;
//       order.packedAt = new Date();
//       await order.save();
//     } else {
//       console.log(`Order ${orderId} already has deliveryStatus = ${order.deliveryStatus}, skipping PACKED update`);
//     }
//     return await this.findOrderById(orderId);
//   }

//   // ✅ Fixed: single version of updateDeliveryFromWebhook
//   async updateDeliveryFromWebhook(waybill, deliveryEvent) {
//     const order = await Order.findOne({ trackingId: waybill });
//     if (!order) throw new OrderError(`No order found for trackingId: ${waybill}`);

//     const rawStatus = deliveryEvent?.toString() || '';
//     const normalized = rawStatus.toLowerCase().trim().replace(/\s+/g, '_');
//     console.log(`[Webhook] Normalized: "${normalized}" (original: "${rawStatus}")`);

//     const eventMap = {
//       manifested: { deliveryStatus: 'packed', orderStatus: OrderStatus.PACKED },
//       manifest_generated: { deliveryStatus: 'packed', orderStatus: OrderStatus.PACKED },
//       pickup: { deliveryStatus: 'shipped', orderStatus: OrderStatus.SHIPPED },
//       picked_up: { deliveryStatus: 'shipped', orderStatus: OrderStatus.SHIPPED },
//       dispatched: { deliveryStatus: 'shipped', orderStatus: OrderStatus.SHIPPED },
//       shipped: { deliveryStatus: 'shipped', orderStatus: OrderStatus.SHIPPED },
//       in_transit: { deliveryStatus: 'in_transit', orderStatus: OrderStatus.IN_TRANSIT },
//       intransit: { deliveryStatus: 'in_transit', orderStatus: OrderStatus.IN_TRANSIT },
//       out_for_delivery: { deliveryStatus: 'out_for_delivery', orderStatus: OrderStatus.OUT_FOR_DELIVERY },
//       outfordelivery: { deliveryStatus: 'out_for_delivery', orderStatus: OrderStatus.OUT_FOR_DELIVERY },
//       delivered: { deliveryStatus: 'delivered', orderStatus: OrderStatus.DELIVERED },
//       success: { deliveryStatus: 'delivered', orderStatus: OrderStatus.DELIVERED },
//       rto: { deliveryStatus: 'rto', orderStatus: OrderStatus.RTO },
//       returned: { deliveryStatus: 'returned', orderStatus: OrderStatus.RETURNED },
//       failed_delivery: { deliveryStatus: 'rto', orderStatus: OrderStatus.RTO },
//       cancelled: { deliveryStatus: 'cancelled', orderStatus: OrderStatus.CANCELLED },
//     };

//     const mapped = eventMap[normalized];
//     if (!mapped) {
//       console.warn(`[Webhook] Unknown delivery event: "${rawStatus}" — ignoring update`);
//       return order;
//     }

//     order.deliveryStatus = mapped.deliveryStatus;
//     order.orderStatus = mapped.orderStatus;

//     if (mapped.orderStatus === OrderStatus.DELIVERED) {
//       order.deliveredAt = new Date();
//       order.paymentStatus = PaymentStatus.PAID;
//       if (order.paymentDetails) order.paymentDetails.status = PaymentStatus.PAID;
//     }

//     await order.save();
//     console.log(`[Webhook] Order ${order._id} updated: orderStatus=${order.orderStatus}, deliveryStatus=${order.deliveryStatus}`);

//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) {
//         await parent.recomputeStatus();
//         const allSubOrders = await Order.find({ _id: { $in: parent.subOrders } });
//         const allPaid = allSubOrders.every(o => o.paymentStatus === PaymentStatus.PAID);
//         if (allPaid) {
//           parent.paymentStatus = PaymentStatus.PAID;
//           await parent.save();
//         }
//       }
//     }
//     return order;
//   }

//   async findOrderById(orderId) {
//     if (!mongoose.Types.ObjectId.isValid(orderId)) throw new OrderError("Invalid Order ID");
//     const order = await Order.findById(orderId).populate([
//       { path: "seller" }, { path: "shippingAddress" },
//       { path: "orderItems", populate: { path: "product" } },
//       { path: "parentOrder", populate: { path: "paymentOrder" } }, { path: "user" }
//     ]);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);
//     return order;
//   }

//   async findOrderItemById(orderItemId) {
//     if (!mongoose.Types.ObjectId.isValid(orderItemId)) throw new OrderError("Invalid Order Item ID");
//     const item = await OrderItem.findById(orderItemId).populate([{ path: "product", populate: { path: "seller" } }]);
//     if (!item) throw new OrderError(`OrderItem not found with id ${orderItemId}`);
//     return item;
//   }

//   async usersOrderHistory(userId) {
//     return await ParentOrder.find({ user: userId })
//       .populate({
//         path: 'subOrders',
//         populate: [
//           { path: 'seller', select: 'sellerName businessDetails' },
//           { path: 'shippingAddress' },
//           { path: 'orderItems', populate: { path: 'product' } }
//         ]
//       })
//       .populate('shippingAddress').populate('paymentOrder').sort({ createdAt: -1 });
//   }

//   async getShopsOrders(sellerId) {
//     const PaymentOrder = require('../models/PaymentOrder');
//     const orders = await Order.find({ seller: sellerId, orderStatus: { $ne: OrderStatus.PENDING } })
//       .sort({ createdAt: -1 })
//       .populate([
//         { path: "seller" }, { path: "shippingAddress" },
//         { path: "orderItems", populate: { path: "product" } },
//         { path: "user", select: "fullName email mobile" }
//       ]).lean();
//     const orderIds = orders.map(o => o._id);
//     const paymentOrders = await PaymentOrder.find({ orders: { $in: orderIds } })
//       .select('orders paymentMethod').lean();
//     const paymentMethodMap = {};
//     for (const po of paymentOrders) {
//       for (const oid of po.orders) paymentMethodMap[oid.toString()] = po.paymentMethod;
//     }
//     for (const order of orders) {
//       const pm = paymentMethodMap[order._id.toString()];
//       if (pm) order.paymentMethod = pm;
//       else if (!order.paymentMethod && order.paymentStatus === 'COD_PENDING') order.paymentMethod = 'COD';
//     }
//     return orders;
//   }

//   async updateOrderStatus(orderId, orderStatus) {
//     const order = await this.findOrderById(orderId);
//     if (orderStatus === OrderStatus.CONFIRMED && !order.shipmentId) {
//       try {
//         const seller = await Seller.findById(order.seller).populate('pickupAddress');
//         const address = await Address.findById(order.shippingAddress);
//         const shipment = await DelhiveryService.createShipment(order, seller, address);
//         order.shipmentId = shipment.shipmentId;
//         order.trackingId = shipment.awbNumber;
//         order.trackingLink = shipment.trackingLink;
//         order.warehouseCode = seller.delhiveryWarehouseCode;
//         order.deliveryStatus = 'shipped';
//         order.orderStatus = OrderStatus.SHIPPED;
//         order.shippedAt = new Date();
//         await order.save();
//         return await this.findOrderById(orderId);
//       } catch (shipmentErr) {
//         console.error("[updateOrderStatus] Shipment failed:", shipmentErr.message);
//       }
//     }
//     order.orderStatus = orderStatus;
//     return await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true, runValidators: true })
//       .populate([{ path: "seller" }, { path: "shippingAddress" }, { path: "orderItems", populate: { path: "product" } }]);
//   }

//   async deleteOrder(orderId) {
//     const order = await this.findOrderById(orderId);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);
//     return await Order.deleteOne({ _id: orderId });
//   }

//   async cancelOrder(orderId, userId) {
//     const order = await this.findOrderById(orderId);
//     if (userId.toString() !== order.user._id.toString()) throw new OrderError(`Not authorized`);
//     if ([OrderStatus.SHIPPED, OrderStatus.IN_TRANSIT, OrderStatus.OUT_FOR_DELIVERY, OrderStatus.DELIVERED].includes(order.orderStatus))
//       throw new OrderError("Cannot cancel shipped/delivered order");
//     order.orderStatus = OrderStatus.CANCELLED;
//     await order.save();
//     if (order.shipmentId) try { await DelhiveryService.cancelShipment(order.shipmentId); } catch(e) {}
//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) await parent.recomputeStatus();
//     }
//     return order;
//   }

//   async requestPickup(orderId) {
//     const order = await this.findOrderById(orderId);
//     if (!order.shipmentId || order.pickupRequested) throw new Error("Order not ready for pickup or already requested");
//     const seller = await Seller.findById(order.seller);
//     await DelhiveryService.createPickupRequest(seller, order);
//     order.pickupRequested = true;
//     return await order.save();
//   }
// }

// module.exports = new OrderService();







// const Order = require("../models/Order");
// const ParentOrder = require("../models/ParentOrder");
// const Cart = require("../models/Cart");
// const Address = require("../models/Address");
// const User = require("../models/User");
// const Seller = require("../models/Seller");
// const OrderItem = require("../models/OrderItem");
// const CartItem = require("../models/CartItem");
// const CartService = require("../services/CartService");
// const OrderError = require("../exceptions/OrderError");
// const OrderStatus = require("../domain/OrderStatus");
// const PaymentStatus = require("../domain/PaymentStatus");
// const PaymentMethod = require("../domain/PaymentMethod");
// const mongoose = require("mongoose");
// const TransactionService = require("./TransactionService");
// const DelhiveryService = require("./DelhiveryService");

// function computeAmounts(totalSellingPrice, commissionRate = 10) {
//   const commissionAmount = Math.round((totalSellingPrice * commissionRate) / 100);
//   const sellerAmount = totalSellingPrice - commissionAmount;
//   return { commissionRate, commissionAmount, sellerAmount };
// }

// class OrderService {
//   /* ═══════════════════════════════════════════════
//      🔥 GET ALL ORDERS — Lean everything
//      ═══════════════════════════════════════════════ */
//   async getAllOrders() {
//     const PaymentOrder = require("../models/PaymentOrder");

//     const orders = await Order.find({ orderStatus: { $ne: OrderStatus.PENDING } })
//       .populate("user", "fullName email mobile")
//       .populate("seller", "sellerName businessDetails")
//       .populate("shippingAddress")
//       .sort({ createdAt: -1 })
//       .lean();

//     const orderIds = orders.map((o) => o._id);
//     const paymentOrders = await PaymentOrder.find({ orders: { $in: orderIds } })
//       .select("orders paymentMethod")
//       .lean();

//     const paymentMethodMap = {};
//     for (const po of paymentOrders) {
//       for (const oid of po.orders) {
//         paymentMethodMap[oid.toString()] = po.paymentMethod;
//       }
//     }

//     for (const order of orders) {
//       const pm = paymentMethodMap[order._id.toString()];
//       if (pm) order.paymentMethod = pm;
//       else if (!order.paymentMethod && order.paymentStatus === "COD_PENDING")
//         order.paymentMethod = "COD";
//     }
//     return orders;
//   }

//   /* ═══════════════════════════════════════════════
//      🔥 CREATE ORDER — Batched (batch seller fetch + insertMany)
//      ═══════════════════════════════════════════════ */
//   async createOrder(user, shippingAddress, cart, paymentMethod) {
//     try {
//       if (!cart.cartItems || cart.cartItems.length === 0)
//         throw new Error("Cart is empty");

//       // Group by seller
//       const itemsBySeller = cart.cartItems.reduce((acc, item) => {
//         const sellerId = item.product?.seller?._id?.toString();
//         if (!sellerId) throw new Error("Seller not found");
//         (acc[sellerId] = acc[sellerId] || []).push(item);
//         return acc;
//       }, {});

//       const payStatus =
//         paymentMethod === PaymentMethod.COD
//           ? PaymentStatus.COD_PENDING
//           : PaymentStatus.PENDING;

//       const initialOrderStatus =
//         paymentMethod === PaymentMethod.COD
//           ? OrderStatus.PLACED
//           : OrderStatus.PENDING;

//       // 🔥 Fetch all sellers in ONE query (not N queries)
//       const sellerIds = Object.keys(itemsBySeller);
//       const sellers = await Seller.find({ _id: { $in: sellerIds } })
//         .select("_id commissionRate")
//         .lean();
//       const sellerMap = {};
//       sellers.forEach((s) => {
//         sellerMap[s._id.toString()] = s;
//       });

//       const subOrders = [];
//       let totalAmount = 0;

//       // 🔥 For each seller, batch OrderItem creation
//       for (const [sellerId, cartItems] of Object.entries(itemsBySeller)) {
//         const seller = sellerMap[sellerId];

//         const totalSellingPrice = cartItems.reduce(
//           (s, i) => s + i.sellingPrice,
//           0
//         );
//         const totalMrpPrice = cartItems.reduce((s, i) => s + i.mrpPrice, 0);
//         const totalItemCount = cartItems.reduce((s, i) => s + i.quantity, 0);
//         const commissionRate = seller?.commissionRate ?? 10;
//         const { commissionAmount, sellerAmount } = computeAmounts(
//           totalSellingPrice,
//           commissionRate
//         );

//         // 🔥 Batch insert OrderItems (insertMany = 1 query instead of N)
//         const orderItemsData = cartItems.map((cartItem) => ({
//           mrpPrice: cartItem.mrpPrice,
//           product: cartItem.product._id,
//           quantity: cartItem.quantity,
//           size: cartItem.size,
//           userId: cartItem.userId,
//           sellingPrice: cartItem.sellingPrice,
//         }));

//         const createdOrderItems = await OrderItem.insertMany(orderItemsData);

//         const newOrder = new Order({
//           user: user._id,
//           seller: sellerId,
//           totalMrpPrice,
//           totalSellingPrice,
//           totalItem: totalItemCount,
//           shippingAddress: shippingAddress._id,
//           orderStatus: initialOrderStatus,
//           paymentMethod,
//           paymentDetails: { status: payStatus, method: paymentMethod },
//           orderItems: createdOrderItems.map((o) => o._id),
//           commission: commissionAmount,
//           commissionRate,
//           commissionAmount,
//           sellerAmount,
//         });

//         const savedOrder = await newOrder.save();
//         subOrders.push(savedOrder);
//         totalAmount += totalSellingPrice;

//         // Fire-and-forget transaction creation (don't block)
//         TransactionService.createTransaction(savedOrder._id).catch((err) =>
//           console.error("Transaction create error:", err.message)
//         );
//       }

//       const parentOrder = new ParentOrder({
//         user: user._id,
//         subOrders: subOrders.map((o) => o._id),
//         totalAmount,
//         paymentStatus: payStatus,
//         orderStatus: initialOrderStatus.toLowerCase(),
//         shippingAddress: shippingAddress._id,
//       });

//       const savedParent = await parentOrder.save();

//       // 🔥 Batch update (single updateMany)
//       await Order.updateMany(
//         { _id: { $in: subOrders.map((o) => o._id) } },
//         { parentOrder: savedParent._id }
//       );

//       return { subOrders, parentOrder: savedParent };
//     } catch (error) {
//       console.error("createOrder error:", error);
//       throw new Error(error.message);
//     }
//   }

//   /* ═══════════════════════════════════════════════
//      🔥 BUY NOW
//      ═══════════════════════════════════════════════ */
//   async createBuyNowOrder(user, shippingAddress, productId, quantity, size, paymentMethod) {
//     try {
//       const Product = require("../models/Product");
//       const product = await Product.findById(productId)
//         .populate("seller", "commissionRate")
//         .lean();
//       if (!product) throw new Error("Product not found");

//       const sellerId = product.seller?._id?.toString();
//       if (!sellerId) throw new Error("Seller not found");

//       const commissionRate = product.seller?.commissionRate ?? 10;
//       const totalMrpPrice = product.mrpPrice * quantity;
//       const totalSellingPrice = product.sellingPrice * quantity;
//       const { commissionAmount, sellerAmount } = computeAmounts(
//         totalSellingPrice,
//         commissionRate
//       );

//       const payStatus =
//         paymentMethod === PaymentMethod.COD
//           ? PaymentStatus.COD_PENDING
//           : PaymentStatus.PENDING;
//       const initialOrderStatus =
//         paymentMethod === PaymentMethod.COD
//           ? OrderStatus.PLACED
//           : OrderStatus.PENDING;

//       const orderItem = await OrderItem.create({
//         product: product._id,
//         quantity,
//         size,
//         mrpPrice: totalMrpPrice,
//         sellingPrice: totalSellingPrice,
//       });

//       const newOrder = new Order({
//         user: user._id,
//         seller: sellerId,
//         totalMrpPrice,
//         totalSellingPrice,
//         totalItem: quantity,
//         shippingAddress: shippingAddress._id,
//         orderStatus: initialOrderStatus,
//         paymentMethod,
//         paymentDetails: { status: payStatus, method: paymentMethod },
//         orderItems: [orderItem._id],
//         commission: commissionAmount,
//         commissionRate,
//         commissionAmount,
//         sellerAmount,
//       });

//       const savedOrder = await newOrder.save();
//       TransactionService.createTransaction(savedOrder._id).catch((err) =>
//         console.error("Transaction create error:", err.message)
//       );

//       const parentOrder = new ParentOrder({
//         user: user._id,
//         subOrders: [savedOrder._id],
//         totalAmount: totalSellingPrice,
//         paymentStatus: payStatus,
//         orderStatus: initialOrderStatus.toLowerCase(),
//         shippingAddress: shippingAddress._id,
//       });

//       const savedParent = await parentOrder.save();
//       await Order.findByIdAndUpdate(savedOrder._id, {
//         parentOrder: savedParent._id,
//       });

//       return { subOrders: [savedOrder], parentOrder: savedParent };
//     } catch (error) {
//       console.error("buyNow order error:", error);
//       throw new Error(error.message);
//     }
//   }

//   /* acceptOrder, rejectOrder, packOrder, updateDeliveryFromWebhook — SAME as before */
//   async acceptOrder(orderId, sellerId) {
//     const order = await this.findOrderById(orderId);
//     if (order.seller._id.toString() !== sellerId.toString())
//       throw new OrderError("Not authorized");
//     if (order.orderStatus !== OrderStatus.PLACED)
//       throw new OrderError(`Order cannot be accepted in status: ${order.orderStatus}`);

//     order.orderStatus = OrderStatus.CONFIRMED;
//     await order.save();

//     try {
//       const seller = await Seller.findById(sellerId)
//         .populate("pickupAddress")
//         .lean();
//       const address = await Address.findById(order.shippingAddress).lean();
//       if (!seller.delhiveryWarehouseCode)
//         throw new Error("Seller not registered with Delhivery");

//       const shipment = await DelhiveryService.createShipment(order, seller, address);
//       order.shipmentId = shipment.shipmentId;
//       order.trackingId = shipment.awbNumber;
//       order.trackingLink = shipment.trackingLink;
//       order.warehouseCode = seller.delhiveryWarehouseCode;
//       order.deliveryStatus = "shipped";
//       order.orderStatus = OrderStatus.SHIPPED;
//       order.shippedAt = new Date();
//       await order.save();
//     } catch (shipmentErr) {
//       console.error("[acceptOrder] Shipment failed:", shipmentErr.message);
//     }
//     return await this.findOrderById(orderId);
//   }

//   async rejectOrder(orderId, sellerId, reason = "") {
//     const order = await this.findOrderById(orderId);
//     if (order.seller._id.toString() !== sellerId.toString())
//       throw new OrderError("Not authorized");
//     if (![OrderStatus.PLACED, OrderStatus.CONFIRMED].includes(order.orderStatus))
//       throw new OrderError(`Order cannot be rejected`);

//     if (order.shipmentId)
//       try {
//         await DelhiveryService.cancelShipment(order.shipmentId);
//       } catch (e) {}

//     order.orderStatus = OrderStatus.CANCELLED;
//     order.deliveryStatus = "pending";
//     if (reason) order.rejectReason = reason;
//     await order.save();

//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) await parent.recomputeStatus();
//     }

//     const needsRefund = order.paymentDetails?.method !== PaymentMethod.COD;
//     return { order: await this.findOrderById(orderId), needsRefund };
//   }

//   async packOrder(orderId, sellerId) {
//     const order = await this.findOrderById(orderId);
//     if (order.seller._id.toString() !== sellerId.toString())
//       throw new OrderError("Not authorized");

//     if (
//       order.deliveryStatus !== "shipped" &&
//       order.deliveryStatus !== "delivered"
//     ) {
//       order.orderStatus = OrderStatus.PACKED;
//       order.packedAt = new Date();
//       await order.save();
//     }
//     return await this.findOrderById(orderId);
//   }

//   async updateDeliveryFromWebhook(waybill, deliveryEvent) {
//     const order = await Order.findOne({ trackingId: waybill });
//     if (!order) throw new OrderError(`No order found for trackingId: ${waybill}`);

//     const rawStatus = deliveryEvent?.toString() || "";
//     const normalized = rawStatus.toLowerCase().trim().replace(/\s+/g, "_");

//     const eventMap = {
//       manifested: { deliveryStatus: "packed", orderStatus: OrderStatus.PACKED },
//       manifest_generated: { deliveryStatus: "packed", orderStatus: OrderStatus.PACKED },
//       pickup: { deliveryStatus: "shipped", orderStatus: OrderStatus.SHIPPED },
//       picked_up: { deliveryStatus: "shipped", orderStatus: OrderStatus.SHIPPED },
//       dispatched: { deliveryStatus: "shipped", orderStatus: OrderStatus.SHIPPED },
//       shipped: { deliveryStatus: "shipped", orderStatus: OrderStatus.SHIPPED },
//       in_transit: { deliveryStatus: "in_transit", orderStatus: OrderStatus.IN_TRANSIT },
//       intransit: { deliveryStatus: "in_transit", orderStatus: OrderStatus.IN_TRANSIT },
//       out_for_delivery: { deliveryStatus: "out_for_delivery", orderStatus: OrderStatus.OUT_FOR_DELIVERY },
//       outfordelivery: { deliveryStatus: "out_for_delivery", orderStatus: OrderStatus.OUT_FOR_DELIVERY },
//       delivered: { deliveryStatus: "delivered", orderStatus: OrderStatus.DELIVERED },
//       success: { deliveryStatus: "delivered", orderStatus: OrderStatus.DELIVERED },
//       rto: { deliveryStatus: "rto", orderStatus: OrderStatus.RTO },
//       returned: { deliveryStatus: "returned", orderStatus: OrderStatus.RETURNED },
//       failed_delivery: { deliveryStatus: "rto", orderStatus: OrderStatus.RTO },
//       cancelled: { deliveryStatus: "cancelled", orderStatus: OrderStatus.CANCELLED },
//     };

//     const mapped = eventMap[normalized];
//     if (!mapped) return order;

//     order.deliveryStatus = mapped.deliveryStatus;
//     order.orderStatus = mapped.orderStatus;

//     if (mapped.orderStatus === OrderStatus.DELIVERED) {
//       order.deliveredAt = new Date();
//       order.paymentStatus = PaymentStatus.PAID;
//       if (order.paymentDetails) order.paymentDetails.status = PaymentStatus.PAID;
//     }

//     await order.save();

//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) {
//         await parent.recomputeStatus();
//         const allSubOrders = await Order.find({
//           _id: { $in: parent.subOrders },
//         })
//           .select("paymentStatus")
//           .lean();
//         const allPaid = allSubOrders.every(
//           (o) => o.paymentStatus === PaymentStatus.PAID
//         );
//         if (allPaid) {
//           parent.paymentStatus = PaymentStatus.PAID;
//           await parent.save();
//         }
//       }
//     }
//     return order;
//   }

//   /* ═══════════════════════════════════════════════
//      🔥 FIND BY ID — heavier, but lean + selective populate
//      ═══════════════════════════════════════════════ */
//   async findOrderById(orderId) {
//     if (!mongoose.Types.ObjectId.isValid(orderId))
//       throw new OrderError("Invalid Order ID");

//     const order = await Order.findById(orderId)
//       .populate("seller", "sellerName businessDetails email mobile")
//       .populate("shippingAddress")
//       .populate({
//         path: "orderItems",
//         populate: { path: "product", select: "title images sellingPrice mrpPrice slug" },
//       })
//       .populate("parentOrder")
//       .populate("user", "fullName email mobile")
//       .lean();

//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);
//     return order;
//   }

//   async findOrderItemById(orderItemId) {
//     if (!mongoose.Types.ObjectId.isValid(orderItemId))
//       throw new OrderError("Invalid Order Item ID");

//     const item = await OrderItem.findById(orderItemId)
//       .populate({
//         path: "product",
//         populate: { path: "seller", select: "sellerName businessDetails" },
//       })
//       .lean();

//     if (!item) throw new OrderError(`OrderItem not found with id ${orderItemId}`);
//     return item;
//   }

//   /* ═══════════════════════════════════════════════
//      🔥 USER ORDER HISTORY — Optimized selective populate
//      ═══════════════════════════════════════════════ */
//   async usersOrderHistory(userId) {
//     return await ParentOrder.find({ user: userId })
//       .populate({
//         path: "subOrders",
//         populate: [
//           { path: "seller", select: "sellerName businessDetails" },
//           { path: "shippingAddress" },
//           {
//             path: "orderItems",
//             populate: {
//               path: "product",
//               select: "title images sellingPrice mrpPrice slug",
//             },
//           },
//         ],
//       })
//       .populate("shippingAddress")
//       .populate("paymentOrder")
//       .sort({ createdAt: -1 })
//       .lean();
//   }

//   /* ═══════════════════════════════════════════════
//      🔥 SHOP ORDERS
//      ═══════════════════════════════════════════════ */
//   async getShopsOrders(sellerId) {
//     const PaymentOrder = require("../models/PaymentOrder");

//     const orders = await Order.find({
//       seller: sellerId,
//       orderStatus: { $ne: OrderStatus.PENDING },
//     })
//       .sort({ createdAt: -1 })
//       .populate("seller", "sellerName businessDetails")
//       .populate("shippingAddress")
//       .populate({
//         path: "orderItems",
//         populate: { path: "product", select: "title images sellingPrice mrpPrice slug" },
//       })
//       .populate("user", "fullName email mobile")
//       .lean();

//     const orderIds = orders.map((o) => o._id);
//     const paymentOrders = await PaymentOrder.find({ orders: { $in: orderIds } })
//       .select("orders paymentMethod")
//       .lean();

//     const paymentMethodMap = {};
//     for (const po of paymentOrders) {
//       for (const oid of po.orders)
//         paymentMethodMap[oid.toString()] = po.paymentMethod;
//     }

//     for (const order of orders) {
//       const pm = paymentMethodMap[order._id.toString()];
//       if (pm) order.paymentMethod = pm;
//       else if (!order.paymentMethod && order.paymentStatus === "COD_PENDING")
//         order.paymentMethod = "COD";
//     }
//     return orders;
//   }

//   async updateOrderStatus(orderId, orderStatus) {
//     const order = await this.findOrderById(orderId);

//     if (orderStatus === OrderStatus.CONFIRMED && !order.shipmentId) {
//       try {
//         const seller = await Seller.findById(order.seller).populate("pickupAddress");
//         const address = await Address.findById(order.shippingAddress);
//         const shipment = await DelhiveryService.createShipment(order, seller, address);

//         await Order.findByIdAndUpdate(orderId, {
//           shipmentId: shipment.shipmentId,
//           trackingId: shipment.awbNumber,
//           trackingLink: shipment.trackingLink,
//           warehouseCode: seller.delhiveryWarehouseCode,
//           deliveryStatus: "shipped",
//           orderStatus: OrderStatus.SHIPPED,
//           shippedAt: new Date(),
//         });

//         return await this.findOrderById(orderId);
//       } catch (shipmentErr) {
//         console.error("[updateOrderStatus] Shipment failed:", shipmentErr.message);
//       }
//     }

//     await Order.findByIdAndUpdate(
//       orderId,
//       { orderStatus },
//       { new: true, runValidators: true }
//     );

//     return await this.findOrderById(orderId);
//   }

//   async deleteOrder(orderId) {
//     const result = await Order.deleteOne({ _id: orderId });
//     if (result.deletedCount === 0)
//       throw new OrderError(`Order not found with id ${orderId}`);
//     return result;
//   }

//   async cancelOrder(orderId, userId) {
//     const order = await this.findOrderById(orderId);
//     if (userId.toString() !== order.user._id.toString())
//       throw new OrderError(`Not authorized`);

//     if (
//       [
//         OrderStatus.SHIPPED,
//         OrderStatus.IN_TRANSIT,
//         OrderStatus.OUT_FOR_DELIVERY,
//         OrderStatus.DELIVERED,
//       ].includes(order.orderStatus)
//     )
//       throw new OrderError("Cannot cancel shipped/delivered order");

//     order.orderStatus = OrderStatus.CANCELLED;
//     await order.save();

//     if (order.shipmentId)
//       try {
//         await DelhiveryService.cancelShipment(order.shipmentId);
//       } catch (e) {}

//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) await parent.recomputeStatus();
//     }
//     return order;
//   }

//   async requestPickup(orderId) {
//     const order = await this.findOrderById(orderId);
//     if (!order.shipmentId || order.pickupRequested)
//       throw new Error("Order not ready for pickup or already requested");

//     const seller = await Seller.findById(order.seller);
//     await DelhiveryService.createPickupRequest(seller, order);
//     order.pickupRequested = true;
//     return await order.save();
//   }
// }

// module.exports = new OrderService();
















// const Order = require("../models/Order");
// const ParentOrder = require("../models/ParentOrder");
// const Cart = require("../models/Cart");
// const Address = require("../models/Address");
// const User = require("../models/User");
// const Seller = require("../models/Seller");
// const OrderItem = require("../models/OrderItem");
// const CartItem = require("../models/CartItem");
// const CartService = require("../services/CartService");
// const OrderError = require("../exceptions/OrderError");
// const OrderStatus = require("../domain/OrderStatus");
// const PaymentStatus = require("../domain/PaymentStatus");
// const PaymentMethod = require("../domain/PaymentMethod");
// const mongoose = require("mongoose");
// const TransactionService = require("./TransactionService");
// const DelhiveryService = require("./DelhiveryService");

// function computeAmounts(totalSellingPrice, commissionRate = 10) {
//   const commissionAmount = Math.round((totalSellingPrice * commissionRate) / 100);
//   const sellerAmount = totalSellingPrice - commissionAmount;
//   return { commissionRate, commissionAmount, sellerAmount };
// }

// class OrderService {
//   /* ═══════════════════════════════════════════════
//      🔥 GET ALL ORDERS — Lean everything
//      ═══════════════════════════════════════════════ */
//   async getAllOrders() {
//     const PaymentOrder = require("../models/PaymentOrder");

//     const orders = await Order.find({ orderStatus: { $ne: OrderStatus.PENDING } })
//       .populate("user", "fullName email mobile")
//       .populate("seller", "sellerName businessDetails")
//       .populate("shippingAddress")
//       .sort({ createdAt: -1 })
//       .lean();

//     const orderIds = orders.map((o) => o._id);
//     const paymentOrders = await PaymentOrder.find({ orders: { $in: orderIds } })
//       .select("orders paymentMethod")
//       .lean();

//     const paymentMethodMap = {};
//     for (const po of paymentOrders) {
//       for (const oid of po.orders) {
//         paymentMethodMap[oid.toString()] = po.paymentMethod;
//       }
//     }

//     for (const order of orders) {
//       const pm = paymentMethodMap[order._id.toString()];
//       if (pm) order.paymentMethod = pm;
//       else if (!order.paymentMethod && order.paymentStatus === "COD_PENDING")
//         order.paymentMethod = "COD";
//     }
//     return orders;
//   }

//   /* ═══════════════════════════════════════════════
//      🔥 CREATE ORDER
//      ═══════════════════════════════════════════════ */
//   async createOrder(user, shippingAddress, cart, paymentMethod) {
//     try {
//       if (!cart.cartItems || cart.cartItems.length === 0)
//         throw new Error("Cart is empty");

//       const itemsBySeller = cart.cartItems.reduce((acc, item) => {
//         const sellerId = item.product?.seller?._id?.toString();
//         if (!sellerId) throw new Error("Seller not found");
//         (acc[sellerId] = acc[sellerId] || []).push(item);
//         return acc;
//       }, {});

//       const payStatus =
//         paymentMethod === PaymentMethod.COD
//           ? PaymentStatus.COD_PENDING
//           : PaymentStatus.PENDING;

//       const initialOrderStatus =
//         paymentMethod === PaymentMethod.COD
//           ? OrderStatus.PLACED
//           : OrderStatus.PENDING;

//       const sellerIds = Object.keys(itemsBySeller);
//       const sellers = await Seller.find({ _id: { $in: sellerIds } })
//         .select("_id commissionRate")
//         .lean();
//       const sellerMap = {};
//       sellers.forEach((s) => {
//         sellerMap[s._id.toString()] = s;
//       });

//       const subOrders = [];
//       let totalAmount = 0;

//       for (const [sellerId, cartItems] of Object.entries(itemsBySeller)) {
//         const seller = sellerMap[sellerId];

//         const totalSellingPrice = cartItems.reduce(
//           (s, i) => s + i.sellingPrice,
//           0
//         );
//         const totalMrpPrice = cartItems.reduce((s, i) => s + i.mrpPrice, 0);
//         const totalItemCount = cartItems.reduce((s, i) => s + i.quantity, 0);
//         const commissionRate = seller?.commissionRate ?? 10;
//         const { commissionAmount, sellerAmount } = computeAmounts(
//           totalSellingPrice,
//           commissionRate
//         );

//         const orderItemsData = cartItems.map((cartItem) => ({
//           mrpPrice: cartItem.mrpPrice,
//           product: cartItem.product._id,
//           quantity: cartItem.quantity,
//           size: cartItem.size,
//           userId: cartItem.userId,
//           sellingPrice: cartItem.sellingPrice,
//         }));

//         const createdOrderItems = await OrderItem.insertMany(orderItemsData);

//         const newOrder = new Order({
//           user: user._id,
//           seller: sellerId,
//           totalMrpPrice,
//           totalSellingPrice,
//           totalItem: totalItemCount,
//           shippingAddress: shippingAddress._id,
//           orderStatus: initialOrderStatus,
//           paymentMethod,
//           paymentDetails: { status: payStatus, method: paymentMethod },
//           orderItems: createdOrderItems.map((o) => o._id),
//           commission: commissionAmount,
//           commissionRate,
//           commissionAmount,
//           sellerAmount,
//         });

//         const savedOrder = await newOrder.save();
//         subOrders.push(savedOrder);
//         totalAmount += totalSellingPrice;

//         TransactionService.createTransaction(savedOrder._id).catch((err) =>
//           console.error("Transaction create error:", err.message)
//         );
//       }

//       const parentOrder = new ParentOrder({
//         user: user._id,
//         subOrders: subOrders.map((o) => o._id),
//         totalAmount,
//         paymentStatus: payStatus,
//         orderStatus: initialOrderStatus.toLowerCase(),
//         shippingAddress: shippingAddress._id,
//       });

//       const savedParent = await parentOrder.save();

//       await Order.updateMany(
//         { _id: { $in: subOrders.map((o) => o._id) } },
//         { parentOrder: savedParent._id }
//       );

//       return { subOrders, parentOrder: savedParent };
//     } catch (error) {
//       console.error("createOrder error:", error);
//       throw new Error(error.message);
//     }
//   }

//   /* ═══════════════════════════════════════════════
//      🔥 BUY NOW
//      ═══════════════════════════════════════════════ */
//   async createBuyNowOrder(user, shippingAddress, productId, quantity, size, paymentMethod) {
//     try {
//       const Product = require("../models/Product");
//       const product = await Product.findById(productId)
//         .populate("seller", "commissionRate")
//         .lean();
//       if (!product) throw new Error("Product not found");

//       const sellerId = product.seller?._id?.toString();
//       if (!sellerId) throw new Error("Seller not found");

//       const commissionRate = product.seller?.commissionRate ?? 10;
//       const totalMrpPrice = product.mrpPrice * quantity;
//       const totalSellingPrice = product.sellingPrice * quantity;
//       const { commissionAmount, sellerAmount } = computeAmounts(
//         totalSellingPrice,
//         commissionRate
//       );

//       const payStatus =
//         paymentMethod === PaymentMethod.COD
//           ? PaymentStatus.COD_PENDING
//           : PaymentStatus.PENDING;
//       const initialOrderStatus =
//         paymentMethod === PaymentMethod.COD
//           ? OrderStatus.PLACED
//           : OrderStatus.PENDING;

//       const orderItem = await OrderItem.create({
//         product: product._id,
//         quantity,
//         size,
//         mrpPrice: totalMrpPrice,
//         sellingPrice: totalSellingPrice,
//       });

//       const newOrder = new Order({
//         user: user._id,
//         seller: sellerId,
//         totalMrpPrice,
//         totalSellingPrice,
//         totalItem: quantity,
//         shippingAddress: shippingAddress._id,
//         orderStatus: initialOrderStatus,
//         paymentMethod,
//         paymentDetails: { status: payStatus, method: paymentMethod },
//         orderItems: [orderItem._id],
//         commission: commissionAmount,
//         commissionRate,
//         commissionAmount,
//         sellerAmount,
//       });

//       const savedOrder = await newOrder.save();
//       TransactionService.createTransaction(savedOrder._id).catch((err) =>
//         console.error("Transaction create error:", err.message)
//       );

//       const parentOrder = new ParentOrder({
//         user: user._id,
//         subOrders: [savedOrder._id],
//         totalAmount: totalSellingPrice,
//         paymentStatus: payStatus,
//         orderStatus: initialOrderStatus.toLowerCase(),
//         shippingAddress: shippingAddress._id,
//       });

//       const savedParent = await parentOrder.save();
//       await Order.findByIdAndUpdate(savedOrder._id, {
//         parentOrder: savedParent._id,
//       });

//       return { subOrders: [savedOrder], parentOrder: savedParent };
//     } catch (error) {
//       console.error("buyNow order error:", error);
//       throw new Error(error.message);
//     }
//   }

//   /* ═══════════════════════════════════════════════
//      ✅ ACCEPT ORDER — FIXED (no .lean() for mutation)
//      ═══════════════════════════════════════════════ */
//   async acceptOrder(orderId, sellerId) {
//     if (!mongoose.Types.ObjectId.isValid(orderId))
//       throw new OrderError("Invalid Order ID");

//     const order = await Order.findById(orderId);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);

//     if (order.seller.toString() !== sellerId.toString())
//       throw new OrderError("Not authorized");

//     if (order.orderStatus !== OrderStatus.PLACED)
//       throw new OrderError(
//         `Order cannot be accepted in status: ${order.orderStatus}`
//       );

//     order.orderStatus = OrderStatus.CONFIRMED;
//     await order.save();

//     try {
//       const seller = await Seller.findById(sellerId)
//         .populate("pickupAddress")
//         .lean();
//       const address = await Address.findById(order.shippingAddress).lean();
//       if (!seller.delhiveryWarehouseCode)
//         throw new Error("Seller not registered with Delhivery");

//       const shipment = await DelhiveryService.createShipment(
//         order,
//         seller,
//         address
//       );
//       order.shipmentId = shipment.shipmentId;
//       order.trackingId = shipment.awbNumber;
//       order.trackingLink = shipment.trackingLink;
//       order.warehouseCode = seller.delhiveryWarehouseCode;
//       order.deliveryStatus = "shipped";
//       order.orderStatus = OrderStatus.SHIPPED;
//       order.shippedAt = new Date();
//       await order.save();
//     } catch (shipmentErr) {
//       console.error("[acceptOrder] Shipment failed:", shipmentErr.message);
//     }

//     return await this.findOrderById(orderId);
//   }

//   /* ═══════════════════════════════════════════════
//      ✅ REJECT ORDER — FIXED
//      ═══════════════════════════════════════════════ */
//   async rejectOrder(orderId, sellerId, reason = "") {
//     if (!mongoose.Types.ObjectId.isValid(orderId))
//       throw new OrderError("Invalid Order ID");

//     const order = await Order.findById(orderId);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);

//     if (order.seller.toString() !== sellerId.toString())
//       throw new OrderError("Not authorized");

//     if (![OrderStatus.PLACED, OrderStatus.CONFIRMED].includes(order.orderStatus))
//       throw new OrderError(
//         `Order cannot be rejected in status: ${order.orderStatus}`
//       );

//     if (order.shipmentId) {
//       try {
//         await DelhiveryService.cancelShipment(order.shipmentId);
//       } catch (e) {
//         console.error("[rejectOrder] cancelShipment failed:", e.message);
//       }
//     }

//     order.orderStatus = OrderStatus.CANCELLED;
//     order.deliveryStatus = "pending";
//     if (reason) order.rejectReason = reason;
//     order.rejectedAt = new Date();

//     await order.save();

//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) await parent.recomputeStatus();
//     }

//     const needsRefund = order.paymentDetails?.method !== PaymentMethod.COD;
//     return { order: await this.findOrderById(orderId), needsRefund };
//   }

//   /* ═══════════════════════════════════════════════
//      ✅ PACK ORDER — FIXED
//      ═══════════════════════════════════════════════ */
//   async packOrder(orderId, sellerId) {
//     if (!mongoose.Types.ObjectId.isValid(orderId))
//       throw new OrderError("Invalid Order ID");

//     const order = await Order.findById(orderId);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);

//     if (order.seller.toString() !== sellerId.toString())
//       throw new OrderError("Not authorized");

//     if (
//       order.deliveryStatus !== "shipped" &&
//       order.deliveryStatus !== "delivered"
//     ) {
//       order.orderStatus = OrderStatus.PACKED;
//       order.packedAt = new Date();
//       await order.save();
//     }

//     return await this.findOrderById(orderId);
//   }

//   /* ═══════════════════════════════════════════════
//      DELIVERY WEBHOOK
//      ═══════════════════════════════════════════════ */
//   async updateDeliveryFromWebhook(waybill, deliveryEvent) {
//     const order = await Order.findOne({ trackingId: waybill });
//     if (!order) throw new OrderError(`No order found for trackingId: ${waybill}`);

//     const rawStatus = deliveryEvent?.toString() || "";
//     const normalized = rawStatus.toLowerCase().trim().replace(/\s+/g, "_");

//     const eventMap = {
//       manifested: { deliveryStatus: "packed", orderStatus: OrderStatus.PACKED },
//       manifest_generated: { deliveryStatus: "packed", orderStatus: OrderStatus.PACKED },
//       pickup: { deliveryStatus: "shipped", orderStatus: OrderStatus.SHIPPED },
//       picked_up: { deliveryStatus: "shipped", orderStatus: OrderStatus.SHIPPED },
//       dispatched: { deliveryStatus: "shipped", orderStatus: OrderStatus.SHIPPED },
//       shipped: { deliveryStatus: "shipped", orderStatus: OrderStatus.SHIPPED },
//       in_transit: { deliveryStatus: "in_transit", orderStatus: OrderStatus.IN_TRANSIT },
//       intransit: { deliveryStatus: "in_transit", orderStatus: OrderStatus.IN_TRANSIT },
//       out_for_delivery: { deliveryStatus: "out_for_delivery", orderStatus: OrderStatus.OUT_FOR_DELIVERY },
//       outfordelivery: { deliveryStatus: "out_for_delivery", orderStatus: OrderStatus.OUT_FOR_DELIVERY },
//       delivered: { deliveryStatus: "delivered", orderStatus: OrderStatus.DELIVERED },
//       success: { deliveryStatus: "delivered", orderStatus: OrderStatus.DELIVERED },
//       rto: { deliveryStatus: "rto", orderStatus: OrderStatus.RTO },
//       returned: { deliveryStatus: "returned", orderStatus: OrderStatus.RETURNED },
//       failed_delivery: { deliveryStatus: "rto", orderStatus: OrderStatus.RTO },
//       cancelled: { deliveryStatus: "cancelled", orderStatus: OrderStatus.CANCELLED },
//     };

//     const mapped = eventMap[normalized];
//     if (!mapped) return order;

//     order.deliveryStatus = mapped.deliveryStatus;
//     order.orderStatus = mapped.orderStatus;

//     if (mapped.orderStatus === OrderStatus.DELIVERED) {
//       order.deliveredAt = new Date();
//       order.paymentStatus = PaymentStatus.PAID;
//       if (order.paymentDetails) order.paymentDetails.status = PaymentStatus.PAID;
//     }

//     await order.save();

//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) {
//         await parent.recomputeStatus();
//         const allSubOrders = await Order.find({
//           _id: { $in: parent.subOrders },
//         })
//           .select("paymentStatus")
//           .lean();
//         const allPaid = allSubOrders.every(
//           (o) => o.paymentStatus === PaymentStatus.PAID
//         );
//         if (allPaid) {
//           parent.paymentStatus = PaymentStatus.PAID;
//           await parent.save();
//         }
//       }
//     }
//     return order;
//   }

//   /* ═══════════════════════════════════════════════
//      FIND BY ID — lean for READ only
//      ═══════════════════════════════════════════════ */
//   async findOrderById(orderId) {
//     if (!mongoose.Types.ObjectId.isValid(orderId))
//       throw new OrderError("Invalid Order ID");

//     const order = await Order.findById(orderId)
//       .populate("seller", "sellerName businessDetails email mobile")
//       .populate("shippingAddress")
//       .populate({
//         path: "orderItems",
//         populate: { path: "product", select: "title images sellingPrice mrpPrice slug" },
//       })
//       .populate("parentOrder")
//       .populate("user", "fullName email mobile")
//       .lean();

//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);
//     return order;
//   }

//   async findOrderItemById(orderItemId) {
//     if (!mongoose.Types.ObjectId.isValid(orderItemId))
//       throw new OrderError("Invalid Order Item ID");

//     const item = await OrderItem.findById(orderItemId)
//       .populate({
//         path: "product",
//         populate: { path: "seller", select: "sellerName businessDetails" },
//       })
//       .lean();

//     if (!item) throw new OrderError(`OrderItem not found with id ${orderItemId}`);
//     return item;
//   }

//   /* ═══════════════════════════════════════════════
//      USER ORDER HISTORY
//      ═══════════════════════════════════════════════ */
//   async usersOrderHistory(userId) {
//     return await ParentOrder.find({ user: userId })
//       .populate({
//         path: "subOrders",
//         populate: [
//           { path: "seller", select: "sellerName businessDetails" },
//           { path: "shippingAddress" },
//           {
//             path: "orderItems",
//             populate: {
//               path: "product",
//               select: "title images sellingPrice mrpPrice slug",
//             },
//           },
//         ],
//       })
//       .populate("shippingAddress")
//       .populate("paymentOrder")
//       .sort({ createdAt: -1 })
//       .lean();
//   }

//   /* ═══════════════════════════════════════════════
//      SHOP ORDERS
//      ═══════════════════════════════════════════════ */
//   async getShopsOrders(sellerId) {
//     const PaymentOrder = require("../models/PaymentOrder");

//     const orders = await Order.find({
//       seller: sellerId,
//       orderStatus: { $ne: OrderStatus.PENDING },
//     })
//       .sort({ createdAt: -1 })
//       .populate("seller", "sellerName businessDetails")
//       .populate("shippingAddress")
//       .populate({
//         path: "orderItems",
//         populate: { path: "product", select: "title images sellingPrice mrpPrice slug" },
//       })
//       .populate("user", "fullName email mobile")
//       .lean();

//     const orderIds = orders.map((o) => o._id);
//     const paymentOrders = await PaymentOrder.find({ orders: { $in: orderIds } })
//       .select("orders paymentMethod")
//       .lean();

//     const paymentMethodMap = {};
//     for (const po of paymentOrders) {
//       for (const oid of po.orders)
//         paymentMethodMap[oid.toString()] = po.paymentMethod;
//     }

//     for (const order of orders) {
//       const pm = paymentMethodMap[order._id.toString()];
//       if (pm) order.paymentMethod = pm;
//       else if (!order.paymentMethod && order.paymentStatus === "COD_PENDING")
//         order.paymentMethod = "COD";
//     }
//     return orders;
//   }

//   /* ═══════════════════════════════════════════════
//      UPDATE ORDER STATUS
//      ═══════════════════════════════════════════════ */
//   async updateOrderStatus(orderId, orderStatus) {
//     if (!mongoose.Types.ObjectId.isValid(orderId))
//       throw new OrderError("Invalid Order ID");

//     const order = await Order.findById(orderId);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);

//     if (orderStatus === OrderStatus.CONFIRMED && !order.shipmentId) {
//       try {
//         const seller = await Seller.findById(order.seller).populate("pickupAddress");
//         const address = await Address.findById(order.shippingAddress);
//         const shipment = await DelhiveryService.createShipment(order, seller, address);

//         order.shipmentId = shipment.shipmentId;
//         order.trackingId = shipment.awbNumber;
//         order.trackingLink = shipment.trackingLink;
//         order.warehouseCode = seller.delhiveryWarehouseCode;
//         order.deliveryStatus = "shipped";
//         order.orderStatus = OrderStatus.SHIPPED;
//         order.shippedAt = new Date();
//         await order.save();

//         return await this.findOrderById(orderId);
//       } catch (shipmentErr) {
//         console.error("[updateOrderStatus] Shipment failed:", shipmentErr.message);
//       }
//     }

//     order.orderStatus = orderStatus;
//     await order.save();

//     return await this.findOrderById(orderId);
//   }

//   async deleteOrder(orderId) {
//     const result = await Order.deleteOne({ _id: orderId });
//     if (result.deletedCount === 0)
//       throw new OrderError(`Order not found with id ${orderId}`);
//     return result;
//   }

//   /* ═══════════════════════════════════════════════
//      ✅ CANCEL ORDER — FIXED
//      ═══════════════════════════════════════════════ */
//   async cancelOrder(orderId, userId) {
//     if (!mongoose.Types.ObjectId.isValid(orderId))
//       throw new OrderError("Invalid Order ID");

//     const order = await Order.findById(orderId);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);

//     if (userId.toString() !== order.user.toString())
//       throw new OrderError("Not authorized");

//     if (
//       [
//         OrderStatus.SHIPPED,
//         OrderStatus.IN_TRANSIT,
//         OrderStatus.OUT_FOR_DELIVERY,
//         OrderStatus.DELIVERED,
//       ].includes(order.orderStatus)
//     )
//       throw new OrderError("Cannot cancel shipped/delivered order");

//     if (order.shipmentId) {
//       try {
//         await DelhiveryService.cancelShipment(order.shipmentId);
//       } catch (e) {
//         console.error("[cancelOrder] cancelShipment failed:", e.message);
//       }
//     }

//     order.orderStatus = OrderStatus.CANCELLED;
//     await order.save();

//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) await parent.recomputeStatus();
//     }
//     return order;
//   }

//   /* ═══════════════════════════════════════════════
//      ✅ REQUEST PICKUP — FIXED
//      ═══════════════════════════════════════════════ */
//   async requestPickup(orderId) {
//     if (!mongoose.Types.ObjectId.isValid(orderId))
//       throw new OrderError("Invalid Order ID");

//     const order = await Order.findById(orderId);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);

//     if (!order.shipmentId || order.pickupRequested)
//       throw new Error("Order not ready for pickup or already requested");

//     const seller = await Seller.findById(order.seller).lean();
//     await DelhiveryService.createPickupRequest(seller, order);

//     order.pickupRequested = true;
//     return await order.save();
//   }
// }

// module.exports = new OrderService();















// const Order = require("../models/Order");
// const ParentOrder = require("../models/ParentOrder");
// const Cart = require("../models/Cart");
// const Address = require("../models/Address");
// const User = require("../models/User");
// const Seller = require("../models/Seller");
// const OrderItem = require("../models/OrderItem");
// const CartItem = require("../models/CartItem");
// const CartService = require("../services/CartService");
// const OrderError = require("../exceptions/OrderError");
// const OrderStatus = require("../domain/OrderStatus");
// const PaymentStatus = require("../domain/PaymentStatus");
// const PaymentMethod = require("../domain/PaymentMethod");
// const mongoose = require("mongoose");
// const TransactionService = require("./TransactionService");
// const DelhiveryService = require("./DelhiveryService");

// function computeAmounts(totalSellingPrice, commissionRate = 10) {
//   const commissionAmount = Math.round((totalSellingPrice * commissionRate) / 100);
//   const sellerAmount = totalSellingPrice - commissionAmount;
//   return { commissionRate, commissionAmount, sellerAmount };
// }

// class OrderService {
//   /* ═══════════════════════════════════════════════
//      🔥 GET ALL ORDERS
//      ═══════════════════════════════════════════════ */
//   async getAllOrders() {
//     const PaymentOrder = require("../models/PaymentOrder");

//     const orders = await Order.find({ orderStatus: { $ne: OrderStatus.PENDING } })
//       .populate("user", "fullName email mobile")
//       .populate("seller", "sellerName businessDetails")
//       .populate("shippingAddress")
//       .sort({ createdAt: -1 })
//       .lean();

//     const orderIds = orders.map((o) => o._id);
//     const paymentOrders = await PaymentOrder.find({ orders: { $in: orderIds } })
//       .select("orders paymentMethod")
//       .lean();

//     const paymentMethodMap = {};
//     for (const po of paymentOrders) {
//       for (const oid of po.orders) {
//         paymentMethodMap[oid.toString()] = po.paymentMethod;
//       }
//     }

//     for (const order of orders) {
//       const pm = paymentMethodMap[order._id.toString()];
//       if (pm) order.paymentMethod = pm;
//       else if (!order.paymentMethod && order.paymentStatus === "COD_PENDING")
//         order.paymentMethod = "COD";
//     }
//     return orders;
//   }

//   /* ═══════════════════════════════════════════════
//      🔥 CREATE ORDER — ✅ customDesign copy FIXED
//      ═══════════════════════════════════════════════ */
//   async createOrder(user, shippingAddress, cart, paymentMethod) {
//     try {
//       if (!cart.cartItems || cart.cartItems.length === 0)
//         throw new Error("Cart is empty");

//       const itemsBySeller = cart.cartItems.reduce((acc, item) => {
//         const sellerId = item.product?.seller?._id?.toString();
//         if (!sellerId) throw new Error("Seller not found");
//         (acc[sellerId] = acc[sellerId] || []).push(item);
//         return acc;
//       }, {});

//       const payStatus =
//         paymentMethod === PaymentMethod.COD
//           ? PaymentStatus.COD_PENDING
//           : PaymentStatus.PENDING;

//       const initialOrderStatus =
//         paymentMethod === PaymentMethod.COD
//           ? OrderStatus.PLACED
//           : OrderStatus.PENDING;

//       const sellerIds = Object.keys(itemsBySeller);
//       const sellers = await Seller.find({ _id: { $in: sellerIds } })
//         .select("_id commissionRate")
//         .lean();
//       const sellerMap = {};
//       sellers.forEach((s) => {
//         sellerMap[s._id.toString()] = s;
//       });

//       const subOrders = [];
//       let totalAmount = 0;

//       for (const [sellerId, cartItems] of Object.entries(itemsBySeller)) {
//         const seller = sellerMap[sellerId];

//         const totalSellingPrice = cartItems.reduce(
//           (s, i) => s + i.sellingPrice,
//           0
//         );
//         const totalMrpPrice = cartItems.reduce((s, i) => s + i.mrpPrice, 0);
//         const totalItemCount = cartItems.reduce((s, i) => s + i.quantity, 0);
//         const commissionRate = seller?.commissionRate ?? 10;
//         const { commissionAmount, sellerAmount } = computeAmounts(
//           totalSellingPrice,
//           commissionRate
//         );

//         // ✅ FIXED — customDesign copy karo
//         const orderItemsData = cartItems.map((cartItem) => {
//           const cd = cartItem.customDesign || {};

//           return {
//             mrpPrice: cartItem.mrpPrice,
//             product: cartItem.product._id,
//             quantity: cartItem.quantity,
//             size: cartItem.size,
//             userId: cartItem.userId,
//             sellingPrice: cartItem.sellingPrice,

//             customDesign: {
//               enabled: !!cd.enabled,
//               originalImage: cd.originalImage || null,
//               previewImage: cd.previewImage || null,
//               compositeImage: cd.compositeImage || null,
//               printFile: cd.printFile || null,
//               designData: cd.designData || {},
//               extraCharge: Number(cd.extraCharge) || 0,
//               printSize: cd.printSize || {},
//             },
//           };
//         });

//         const createdOrderItems = await OrderItem.insertMany(orderItemsData);

//         const newOrder = new Order({
//           user: user._id,
//           seller: sellerId,
//           totalMrpPrice,
//           totalSellingPrice,
//           totalItem: totalItemCount,
//           shippingAddress: shippingAddress._id,
//           orderStatus: initialOrderStatus,
//           paymentMethod,
//           paymentDetails: { status: payStatus, method: paymentMethod },
//           orderItems: createdOrderItems.map((o) => o._id),
//           commission: commissionAmount,
//           commissionRate,
//           commissionAmount,
//           sellerAmount,
//         });

//         const savedOrder = await newOrder.save();
//         subOrders.push(savedOrder);
//         totalAmount += totalSellingPrice;

//         TransactionService.createTransaction(savedOrder._id).catch((err) =>
//           console.error("Transaction create error:", err.message)
//         );
//       }

//       const parentOrder = new ParentOrder({
//         user: user._id,
//         subOrders: subOrders.map((o) => o._id),
//         totalAmount,
//         paymentStatus: payStatus,
//         orderStatus: initialOrderStatus.toLowerCase(),
//         shippingAddress: shippingAddress._id,
//       });

//       const savedParent = await parentOrder.save();

//       await Order.updateMany(
//         { _id: { $in: subOrders.map((o) => o._id) } },
//         { parentOrder: savedParent._id }
//       );

//       return { subOrders, parentOrder: savedParent };
//     } catch (error) {
//       console.error("createOrder error:", error);
//       throw new Error(error.message);
//     }
//   }

//   /* ═══════════════════════════════════════════════
//      🔥 BUY NOW — ✅ customDesign support
//      ═══════════════════════════════════════════════ */
//   async createBuyNowOrder(
//     user,
//     shippingAddress,
//     productId,
//     quantity,
//     size,
//     paymentMethod,
//     customDesign = null
//   ) {
//     try {
//       const Product = require("../models/Product");
//       const product = await Product.findById(productId)
//         .populate("seller", "commissionRate")
//         .lean();
//       if (!product) throw new Error("Product not found");

//       const sellerId = product.seller?._id?.toString();
//       if (!sellerId) throw new Error("Seller not found");

//       const commissionRate = product.seller?.commissionRate ?? 10;
//       const totalMrpPrice = product.mrpPrice * quantity;
//       const totalSellingPrice = product.sellingPrice * quantity;
//       const { commissionAmount, sellerAmount } = computeAmounts(
//         totalSellingPrice,
//         commissionRate
//       );

//       const payStatus =
//         paymentMethod === PaymentMethod.COD
//           ? PaymentStatus.COD_PENDING
//           : PaymentStatus.PENDING;
//       const initialOrderStatus =
//         paymentMethod === PaymentMethod.COD
//           ? OrderStatus.PLACED
//           : OrderStatus.PENDING;

//       const cd = customDesign || {};

//       const orderItem = await OrderItem.create({
//         product: product._id,
//         quantity,
//         size,
//         mrpPrice: totalMrpPrice,
//         sellingPrice: totalSellingPrice,

//         customDesign: {
//           enabled: !!cd.enabled,
//           originalImage: cd.originalImage || null,
//           previewImage: cd.previewImage || null,
//           compositeImage: cd.compositeImage || null,
//           printFile: cd.printFile || null,
//           designData: cd.designData || {},
//           extraCharge: Number(cd.extraCharge) || 0,
//           printSize: cd.printSize || {},
//         },
//       });

//       const newOrder = new Order({
//         user: user._id,
//         seller: sellerId,
//         totalMrpPrice,
//         totalSellingPrice,
//         totalItem: quantity,
//         shippingAddress: shippingAddress._id,
//         orderStatus: initialOrderStatus,
//         paymentMethod,
//         paymentDetails: { status: payStatus, method: paymentMethod },
//         orderItems: [orderItem._id],
//         commission: commissionAmount,
//         commissionRate,
//         commissionAmount,
//         sellerAmount,
//       });

//       const savedOrder = await newOrder.save();
//       TransactionService.createTransaction(savedOrder._id).catch((err) =>
//         console.error("Transaction create error:", err.message)
//       );

//       const parentOrder = new ParentOrder({
//         user: user._id,
//         subOrders: [savedOrder._id],
//         totalAmount: totalSellingPrice,
//         paymentStatus: payStatus,
//         orderStatus: initialOrderStatus.toLowerCase(),
//         shippingAddress: shippingAddress._id,
//       });

//       const savedParent = await parentOrder.save();
//       await Order.findByIdAndUpdate(savedOrder._id, {
//         parentOrder: savedParent._id,
//       });

//       return { subOrders: [savedOrder], parentOrder: savedParent };
//     } catch (error) {
//       console.error("buyNow order error:", error);
//       throw new Error(error.message);
//     }
//   }

//   /* ═══════════════════════════════════════════════
//      ✅ ACCEPT ORDER
//      ═══════════════════════════════════════════════ */
//   async acceptOrder(orderId, sellerId) {
//     if (!mongoose.Types.ObjectId.isValid(orderId))
//       throw new OrderError("Invalid Order ID");

//     const order = await Order.findById(orderId);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);

//     if (order.seller.toString() !== sellerId.toString())
//       throw new OrderError("Not authorized");

//     if (order.orderStatus !== OrderStatus.PLACED)
//       throw new OrderError(
//         `Order cannot be accepted in status: ${order.orderStatus}`
//       );

//     order.orderStatus = OrderStatus.CONFIRMED;
//     await order.save();

//     try {
//       const seller = await Seller.findById(sellerId)
//         .populate("pickupAddress")
//         .lean();
//       const address = await Address.findById(order.shippingAddress).lean();
//       if (!seller.delhiveryWarehouseCode)
//         throw new Error("Seller not registered with Delhivery");

//       const shipment = await DelhiveryService.createShipment(
//         order,
//         seller,
//         address
//       );
//       order.shipmentId = shipment.shipmentId;
//       order.trackingId = shipment.awbNumber;
//       order.trackingLink = shipment.trackingLink;
//       order.warehouseCode = seller.delhiveryWarehouseCode;
//       order.deliveryStatus = "shipped";
//       order.orderStatus = OrderStatus.SHIPPED;
//       order.shippedAt = new Date();
//       await order.save();
//     } catch (shipmentErr) {
//       console.error("[acceptOrder] Shipment failed:", shipmentErr.message);
//     }

//     return await this.findOrderById(orderId);
//   }

//   /* ═══════════════════════════════════════════════
//      ✅ REJECT ORDER
//      ═══════════════════════════════════════════════ */
//   async rejectOrder(orderId, sellerId, reason = "") {
//     if (!mongoose.Types.ObjectId.isValid(orderId))
//       throw new OrderError("Invalid Order ID");

//     const order = await Order.findById(orderId);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);

//     if (order.seller.toString() !== sellerId.toString())
//       throw new OrderError("Not authorized");

//     if (![OrderStatus.PLACED, OrderStatus.CONFIRMED].includes(order.orderStatus))
//       throw new OrderError(
//         `Order cannot be rejected in status: ${order.orderStatus}`
//       );

//     if (order.shipmentId) {
//       try {
//         await DelhiveryService.cancelShipment(order.shipmentId);
//       } catch (e) {
//         console.error("[rejectOrder] cancelShipment failed:", e.message);
//       }
//     }

//     order.orderStatus = OrderStatus.CANCELLED;
//     order.deliveryStatus = "pending";
//     if (reason) order.rejectReason = reason;
//     order.rejectedAt = new Date();

//     await order.save();

//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) await parent.recomputeStatus();
//     }

//     const needsRefund = order.paymentDetails?.method !== PaymentMethod.COD;
//     return { order: await this.findOrderById(orderId), needsRefund };
//   }

//   /* ═══════════════════════════════════════════════
//      ✅ PACK ORDER
//      ═══════════════════════════════════════════════ */
//   async packOrder(orderId, sellerId) {
//     if (!mongoose.Types.ObjectId.isValid(orderId))
//       throw new OrderError("Invalid Order ID");

//     const order = await Order.findById(orderId);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);

//     if (order.seller.toString() !== sellerId.toString())
//       throw new OrderError("Not authorized");

//     if (
//       order.deliveryStatus !== "shipped" &&
//       order.deliveryStatus !== "delivered"
//     ) {
//       order.orderStatus = OrderStatus.PACKED;
//       order.packedAt = new Date();
//       await order.save();
//     }

//     return await this.findOrderById(orderId);
//   }

//   /* ═══════════════════════════════════════════════
//      DELIVERY WEBHOOK
//      ═══════════════════════════════════════════════ */
//   async updateDeliveryFromWebhook(waybill, deliveryEvent) {
//     const order = await Order.findOne({ trackingId: waybill });
//     if (!order) throw new OrderError(`No order found for trackingId: ${waybill}`);

//     const rawStatus = deliveryEvent?.toString() || "";
//     const normalized = rawStatus.toLowerCase().trim().replace(/\s+/g, "_");

//     const eventMap = {
//       manifested: { deliveryStatus: "packed", orderStatus: OrderStatus.PACKED },
//       manifest_generated: { deliveryStatus: "packed", orderStatus: OrderStatus.PACKED },
//       pickup: { deliveryStatus: "shipped", orderStatus: OrderStatus.SHIPPED },
//       picked_up: { deliveryStatus: "shipped", orderStatus: OrderStatus.SHIPPED },
//       dispatched: { deliveryStatus: "shipped", orderStatus: OrderStatus.SHIPPED },
//       shipped: { deliveryStatus: "shipped", orderStatus: OrderStatus.SHIPPED },
//       in_transit: { deliveryStatus: "in_transit", orderStatus: OrderStatus.IN_TRANSIT },
//       intransit: { deliveryStatus: "in_transit", orderStatus: OrderStatus.IN_TRANSIT },
//       out_for_delivery: { deliveryStatus: "out_for_delivery", orderStatus: OrderStatus.OUT_FOR_DELIVERY },
//       outfordelivery: { deliveryStatus: "out_for_delivery", orderStatus: OrderStatus.OUT_FOR_DELIVERY },
//       delivered: { deliveryStatus: "delivered", orderStatus: OrderStatus.DELIVERED },
//       success: { deliveryStatus: "delivered", orderStatus: OrderStatus.DELIVERED },
//       rto: { deliveryStatus: "rto", orderStatus: OrderStatus.RTO },
//       returned: { deliveryStatus: "returned", orderStatus: OrderStatus.RETURNED },
//       failed_delivery: { deliveryStatus: "rto", orderStatus: OrderStatus.RTO },
//       cancelled: { deliveryStatus: "cancelled", orderStatus: OrderStatus.CANCELLED },
//     };

//     const mapped = eventMap[normalized];
//     if (!mapped) return order;

//     order.deliveryStatus = mapped.deliveryStatus;
//     order.orderStatus = mapped.orderStatus;

//     if (mapped.orderStatus === OrderStatus.DELIVERED) {
//       order.deliveredAt = new Date();
//       order.paymentStatus = PaymentStatus.PAID;
//       if (order.paymentDetails) order.paymentDetails.status = PaymentStatus.PAID;
//     }

//     await order.save();

//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) {
//         await parent.recomputeStatus();
//         const allSubOrders = await Order.find({
//           _id: { $in: parent.subOrders },
//         })
//           .select("paymentStatus")
//           .lean();
//         const allPaid = allSubOrders.every(
//           (o) => o.paymentStatus === PaymentStatus.PAID
//         );
//         if (allPaid) {
//           parent.paymentStatus = PaymentStatus.PAID;
//           await parent.save();
//         }
//       }
//     }
//     return order;
//   }

//   /* ═══════════════════════════════════════════════
//      FIND BY ID
//      ═══════════════════════════════════════════════ */
//   async findOrderById(orderId) {
//     if (!mongoose.Types.ObjectId.isValid(orderId))
//       throw new OrderError("Invalid Order ID");

//     const order = await Order.findById(orderId)
//       .populate("seller", "sellerName businessDetails email mobile")
//       .populate("shippingAddress")
//       .populate({
//         path: "orderItems",
//         populate: { path: "product", select: "title images sellingPrice mrpPrice slug" },
//       })
//       .populate("parentOrder")
//       .populate("user", "fullName email mobile")
//       .lean();

//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);
//     return order;
//   }

//   async findOrderItemById(orderItemId) {
//     if (!mongoose.Types.ObjectId.isValid(orderItemId))
//       throw new OrderError("Invalid Order Item ID");

//     const item = await OrderItem.findById(orderItemId)
//       .populate({
//         path: "product",
//         populate: { path: "seller", select: "sellerName businessDetails" },
//       })
//       .lean();

//     if (!item) throw new OrderError(`OrderItem not found with id ${orderItemId}`);
//     return item;
//   }

//   /* ═══════════════════════════════════════════════
//      USER ORDER HISTORY
//      ═══════════════════════════════════════════════ */
//   async usersOrderHistory(userId) {
//     return await ParentOrder.find({ user: userId })
//       .populate({
//         path: "subOrders",
//         populate: [
//           { path: "seller", select: "sellerName businessDetails" },
//           { path: "shippingAddress" },
//           {
//             path: "orderItems",
//             populate: {
//               path: "product",
//               select: "title images sellingPrice mrpPrice slug",
//             },
//           },
//         ],
//       })
//       .populate("shippingAddress")
//       .populate("paymentOrder")
//       .sort({ createdAt: -1 })
//       .lean();
//   }

//   /* ═══════════════════════════════════════════════
//      SHOP ORDERS
//      ═══════════════════════════════════════════════ */
//   async getShopsOrders(sellerId) {
//     const PaymentOrder = require("../models/PaymentOrder");

//     const orders = await Order.find({
//       seller: sellerId,
//       orderStatus: { $ne: OrderStatus.PENDING },
//     })
//       .sort({ createdAt: -1 })
//       .populate("seller", "sellerName businessDetails")
//       .populate("shippingAddress")
//       .populate({
//         path: "orderItems",
//         populate: { path: "product", select: "title images sellingPrice mrpPrice slug" },
//       })
//       .populate("user", "fullName email mobile")
//       .lean();

//     const orderIds = orders.map((o) => o._id);
//     const paymentOrders = await PaymentOrder.find({ orders: { $in: orderIds } })
//       .select("orders paymentMethod")
//       .lean();

//     const paymentMethodMap = {};
//     for (const po of paymentOrders) {
//       for (const oid of po.orders)
//         paymentMethodMap[oid.toString()] = po.paymentMethod;
//     }

//     for (const order of orders) {
//       const pm = paymentMethodMap[order._id.toString()];
//       if (pm) order.paymentMethod = pm;
//       else if (!order.paymentMethod && order.paymentStatus === "COD_PENDING")
//         order.paymentMethod = "COD";
//     }
//     return orders;
//   }

//   /* ═══════════════════════════════════════════════
//      UPDATE ORDER STATUS
//      ═══════════════════════════════════════════════ */
//   async updateOrderStatus(orderId, orderStatus) {
//     if (!mongoose.Types.ObjectId.isValid(orderId))
//       throw new OrderError("Invalid Order ID");

//     const order = await Order.findById(orderId);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);

//     if (orderStatus === OrderStatus.CONFIRMED && !order.shipmentId) {
//       try {
//         const seller = await Seller.findById(order.seller).populate("pickupAddress");
//         const address = await Address.findById(order.shippingAddress);
//         const shipment = await DelhiveryService.createShipment(order, seller, address);

//         order.shipmentId = shipment.shipmentId;
//         order.trackingId = shipment.awbNumber;
//         order.trackingLink = shipment.trackingLink;
//         order.warehouseCode = seller.delhiveryWarehouseCode;
//         order.deliveryStatus = "shipped";
//         order.orderStatus = OrderStatus.SHIPPED;
//         order.shippedAt = new Date();
//         await order.save();

//         return await this.findOrderById(orderId);
//       } catch (shipmentErr) {
//         console.error("[updateOrderStatus] Shipment failed:", shipmentErr.message);
//       }
//     }

//     order.orderStatus = orderStatus;
//     await order.save();

//     return await this.findOrderById(orderId);
//   }

//   async deleteOrder(orderId) {
//     const result = await Order.deleteOne({ _id: orderId });
//     if (result.deletedCount === 0)
//       throw new OrderError(`Order not found with id ${orderId}`);
//     return result;
//   }

//   /* ═══════════════════════════════════════════════
//      ✅ CANCEL ORDER
//      ═══════════════════════════════════════════════ */
//   async cancelOrder(orderId, userId) {
//     if (!mongoose.Types.ObjectId.isValid(orderId))
//       throw new OrderError("Invalid Order ID");

//     const order = await Order.findById(orderId);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);

//     if (userId.toString() !== order.user.toString())
//       throw new OrderError("Not authorized");

//     if (
//       [
//         OrderStatus.SHIPPED,
//         OrderStatus.IN_TRANSIT,
//         OrderStatus.OUT_FOR_DELIVERY,
//         OrderStatus.DELIVERED,
//       ].includes(order.orderStatus)
//     )
//       throw new OrderError("Cannot cancel shipped/delivered order");

//     if (order.shipmentId) {
//       try {
//         await DelhiveryService.cancelShipment(order.shipmentId);
//       } catch (e) {
//         console.error("[cancelOrder] cancelShipment failed:", e.message);
//       }
//     }

//     order.orderStatus = OrderStatus.CANCELLED;
//     await order.save();

//     if (order.parentOrder) {
//       const parent = await ParentOrder.findById(order.parentOrder);
//       if (parent) await parent.recomputeStatus();
//     }
//     return order;
//   }

//   /* ═══════════════════════════════════════════════
//      ✅ REQUEST PICKUP
//      ═══════════════════════════════════════════════ */
//   async requestPickup(orderId) {
//     if (!mongoose.Types.ObjectId.isValid(orderId))
//       throw new OrderError("Invalid Order ID");

//     const order = await Order.findById(orderId);
//     if (!order) throw new OrderError(`Order not found with id ${orderId}`);

//     if (!order.shipmentId || order.pickupRequested)
//       throw new Error("Order not ready for pickup or already requested");

//     const seller = await Seller.findById(order.seller).lean();
//     await DelhiveryService.createPickupRequest(seller, order);

//     order.pickupRequested = true;
//     return await order.save();
//   }
// }

// module.exports = new OrderService();

































const Order = require("../models/Order");
const ParentOrder = require("../models/ParentOrder");
const Cart = require("../models/Cart");
const Address = require("../models/Address");
const User = require("../models/User");
const Seller = require("../models/Seller");
const OrderItem = require("../models/OrderItem");
const CartItem = require("../models/CartItem");
const CartService = require("../services/CartService");
const OrderError = require("../exceptions/OrderError");
const OrderStatus = require("../domain/OrderStatus");
const PaymentStatus = require("../domain/PaymentStatus");
const PaymentMethod = require("../domain/PaymentMethod");
const mongoose = require("mongoose");
const TransactionService = require("./TransactionService");
const DelhiveryService = require("./DelhiveryService");

function computeAmounts(totalSellingPrice, commissionRate = 10) {
  const commissionAmount = Math.round((totalSellingPrice * commissionRate) / 100);
  const sellerAmount = totalSellingPrice - commissionAmount;
  return { commissionRate, commissionAmount, sellerAmount };
}

class OrderService {
  async getAllOrders() {
    const PaymentOrder = require("../models/PaymentOrder");

    const orders = await Order.find({ orderStatus: { $ne: OrderStatus.PENDING } })
      .populate("user", "fullName email mobile")
      .populate({
        path: "seller",
        select: "sellerName businessDetails email mobile GSTIN pickupAddress",
        populate: { path: "pickupAddress" },
      })
      .populate("shippingAddress")
      .sort({ createdAt: -1 })
      .lean();

    const orderIds = orders.map((o) => o._id);
    const paymentOrders = await PaymentOrder.find({ orders: { $in: orderIds } })
      .select("orders paymentMethod")
      .lean();

    const paymentMethodMap = {};
    for (const po of paymentOrders) {
      for (const oid of po.orders) {
        paymentMethodMap[oid.toString()] = po.paymentMethod;
      }
    }

    for (const order of orders) {
      const pm = paymentMethodMap[order._id.toString()];
      if (pm) order.paymentMethod = pm;
      else if (!order.paymentMethod && order.paymentStatus === "COD_PENDING")
        order.paymentMethod = "COD";
    }
    return orders;
  }

  async createOrder(user, shippingAddress, cart, paymentMethod) {
    try {
      if (!cart.cartItems || cart.cartItems.length === 0)
        throw new Error("Cart is empty");

      const itemsBySeller = cart.cartItems.reduce((acc, item) => {
        const sellerId = item.product?.seller?._id?.toString();
        if (!sellerId) throw new Error("Seller not found");
        (acc[sellerId] = acc[sellerId] || []).push(item);
        return acc;
      }, {});

      const payStatus =
        paymentMethod === PaymentMethod.COD
          ? PaymentStatus.COD_PENDING
          : PaymentStatus.PENDING;

      const initialOrderStatus =
        paymentMethod === PaymentMethod.COD
          ? OrderStatus.PLACED
          : OrderStatus.PENDING;

      const sellerIds = Object.keys(itemsBySeller);
      const sellers = await Seller.find({ _id: { $in: sellerIds } })
        .select("_id commissionRate")
        .lean();
      const sellerMap = {};
      sellers.forEach((s) => {
        sellerMap[s._id.toString()] = s;
      });

      const subOrders = [];
      let totalAmount = 0;

      for (const [sellerId, cartItems] of Object.entries(itemsBySeller)) {
        const seller = sellerMap[sellerId];

        const totalSellingPrice = cartItems.reduce((s, i) => s + i.sellingPrice, 0);
        const totalMrpPrice = cartItems.reduce((s, i) => s + i.mrpPrice, 0);
        const totalItemCount = cartItems.reduce((s, i) => s + i.quantity, 0);
        const commissionRate = seller?.commissionRate ?? 10;
        const { commissionAmount, sellerAmount } = computeAmounts(
          totalSellingPrice,
          commissionRate
        );

        const orderItemsData = cartItems.map((cartItem) => {
          const cd = cartItem.customDesign || {};
          return {
            mrpPrice: cartItem.mrpPrice,
            product: cartItem.product._id,
            quantity: cartItem.quantity,
            size: cartItem.size,
            userId: cartItem.userId,
            sellingPrice: cartItem.sellingPrice,
            customDesign: {
              enabled: !!cd.enabled,
              originalImage: cd.originalImage || null,
              previewImage: cd.previewImage || null,
              compositeImage: cd.compositeImage || null,
              printFile: cd.printFile || null,
              designData: cd.designData || {},
              extraCharge: Number(cd.extraCharge) || 0,
              printSize: cd.printSize || {},
            },
          };
        });

        const createdOrderItems = await OrderItem.insertMany(orderItemsData);

        const newOrder = new Order({
          user: user._id,
          seller: sellerId,
          totalMrpPrice,
          totalSellingPrice,
          totalItem: totalItemCount,
          shippingAddress: shippingAddress._id,
          orderStatus: initialOrderStatus,
          paymentMethod,
          paymentDetails: { status: payStatus, method: paymentMethod },
          orderItems: createdOrderItems.map((o) => o._id),
          commission: commissionAmount,
          commissionRate,
          commissionAmount,
          sellerAmount,
        });

        const savedOrder = await newOrder.save();
        subOrders.push(savedOrder);
        totalAmount += totalSellingPrice;

        TransactionService.createTransaction(savedOrder._id).catch((err) =>
          console.error("Transaction create error:", err.message)
        );
      }

      const parentOrder = new ParentOrder({
        user: user._id,
        subOrders: subOrders.map((o) => o._id),
        totalAmount,
        paymentStatus: payStatus,
        orderStatus: initialOrderStatus.toLowerCase(),
        shippingAddress: shippingAddress._id,
      });

      const savedParent = await parentOrder.save();

      await Order.updateMany(
        { _id: { $in: subOrders.map((o) => o._id) } },
        { parentOrder: savedParent._id }
      );

      return { subOrders, parentOrder: savedParent };
    } catch (error) {
      console.error("createOrder error:", error);
      throw new Error(error.message);
    }
  }

  async createBuyNowOrder(user, shippingAddress, productId, quantity, size, paymentMethod, customDesign = null) {
    try {
      const Product = require("../models/Product");
      const product = await Product.findById(productId)
        .populate("seller", "commissionRate")
        .lean();
      if (!product) throw new Error("Product not found");

      const sellerId = product.seller?._id?.toString();
      if (!sellerId) throw new Error("Seller not found");

      const commissionRate = product.seller?.commissionRate ?? 10;
      const totalMrpPrice = product.mrpPrice * quantity;
      const totalSellingPrice = product.sellingPrice * quantity;
      const { commissionAmount, sellerAmount } = computeAmounts(
        totalSellingPrice,
        commissionRate
      );

      const payStatus =
        paymentMethod === PaymentMethod.COD
          ? PaymentStatus.COD_PENDING
          : PaymentStatus.PENDING;
      const initialOrderStatus =
        paymentMethod === PaymentMethod.COD
          ? OrderStatus.PLACED
          : OrderStatus.PENDING;

      const cd = customDesign || {};

      const orderItem = await OrderItem.create({
        product: product._id,
        quantity,
        size,
        mrpPrice: totalMrpPrice,
        sellingPrice: totalSellingPrice,
        customDesign: {
          enabled: !!cd.enabled,
          originalImage: cd.originalImage || null,
          previewImage: cd.previewImage || null,
          compositeImage: cd.compositeImage || null,
          printFile: cd.printFile || null,
          designData: cd.designData || {},
          extraCharge: Number(cd.extraCharge) || 0,
          printSize: cd.printSize || {},
        },
      });

      const newOrder = new Order({
        user: user._id,
        seller: sellerId,
        totalMrpPrice,
        totalSellingPrice,
        totalItem: quantity,
        shippingAddress: shippingAddress._id,
        orderStatus: initialOrderStatus,
        paymentMethod,
        paymentDetails: { status: payStatus, method: paymentMethod },
        orderItems: [orderItem._id],
        commission: commissionAmount,
        commissionRate,
        commissionAmount,
        sellerAmount,
      });

      const savedOrder = await newOrder.save();
      TransactionService.createTransaction(savedOrder._id).catch((err) =>
        console.error("Transaction create error:", err.message)
      );

      const parentOrder = new ParentOrder({
        user: user._id,
        subOrders: [savedOrder._id],
        totalAmount: totalSellingPrice,
        paymentStatus: payStatus,
        orderStatus: initialOrderStatus.toLowerCase(),
        shippingAddress: shippingAddress._id,
      });

      const savedParent = await parentOrder.save();
      await Order.findByIdAndUpdate(savedOrder._id, {
        parentOrder: savedParent._id,
      });

      return { subOrders: [savedOrder], parentOrder: savedParent };
    } catch (error) {
      console.error("buyNow order error:", error);
      throw new Error(error.message);
    }
  }

  async acceptOrder(orderId, sellerId) {
    if (!mongoose.Types.ObjectId.isValid(orderId))
      throw new OrderError("Invalid Order ID");

    const order = await Order.findById(orderId);
    if (!order) throw new OrderError(`Order not found with id ${orderId}`);

    if (order.seller.toString() !== sellerId.toString())
      throw new OrderError("Not authorized");

    if (order.orderStatus !== OrderStatus.PLACED)
      throw new OrderError(`Order cannot be accepted in status: ${order.orderStatus}`);

    order.orderStatus = OrderStatus.CONFIRMED;
    await order.save();

    try {
      const seller = await Seller.findById(sellerId)
        .populate("pickupAddress")
        .lean();
      const address = await Address.findById(order.shippingAddress).lean();
      if (!seller.delhiveryWarehouseCode)
        throw new Error("Seller not registered with Delhivery");

      const shipment = await DelhiveryService.createShipment(order, seller, address);
      order.shipmentId = shipment.shipmentId;
      order.trackingId = shipment.awbNumber;
      order.trackingLink = shipment.trackingLink;
      order.warehouseCode = seller.delhiveryWarehouseCode;
      order.deliveryStatus = "shipped";
      order.orderStatus = OrderStatus.SHIPPED;
      order.shippedAt = new Date();
      await order.save();
    } catch (shipmentErr) {
      console.error("[acceptOrder] Shipment failed:", shipmentErr.message);
    }

    return await this.findOrderById(orderId);
  }

  async rejectOrder(orderId, sellerId, reason = "") {
    if (!mongoose.Types.ObjectId.isValid(orderId))
      throw new OrderError("Invalid Order ID");

    const order = await Order.findById(orderId);
    if (!order) throw new OrderError(`Order not found with id ${orderId}`);

    if (order.seller.toString() !== sellerId.toString())
      throw new OrderError("Not authorized");

    if (![OrderStatus.PLACED, OrderStatus.CONFIRMED].includes(order.orderStatus))
      throw new OrderError(`Order cannot be rejected in status: ${order.orderStatus}`);

    if (order.shipmentId) {
      try {
        await DelhiveryService.cancelShipment(order.shipmentId);
      } catch (e) {
        console.error("[rejectOrder] cancelShipment failed:", e.message);
      }
    }

    order.orderStatus = OrderStatus.CANCELLED;
    order.deliveryStatus = "pending";
    if (reason) order.rejectReason = reason;
    order.rejectedAt = new Date();

    await order.save();

    if (order.parentOrder) {
      const parent = await ParentOrder.findById(order.parentOrder);
      if (parent) await parent.recomputeStatus();
    }

    const needsRefund = order.paymentDetails?.method !== PaymentMethod.COD;
    return { order: await this.findOrderById(orderId), needsRefund };
  }

  async packOrder(orderId, sellerId) {
    if (!mongoose.Types.ObjectId.isValid(orderId))
      throw new OrderError("Invalid Order ID");

    const order = await Order.findById(orderId);
    if (!order) throw new OrderError(`Order not found with id ${orderId}`);

    if (order.seller.toString() !== sellerId.toString())
      throw new OrderError("Not authorized");

    if (order.deliveryStatus !== "shipped" && order.deliveryStatus !== "delivered") {
      order.orderStatus = OrderStatus.PACKED;
      order.packedAt = new Date();
      await order.save();
    }

    return await this.findOrderById(orderId);
  }

  async updateDeliveryFromWebhook(waybill, deliveryEvent) {
    const order = await Order.findOne({ trackingId: waybill });
    if (!order) throw new OrderError(`No order found for trackingId: ${waybill}`);

    const rawStatus = deliveryEvent?.toString() || "";
    const normalized = rawStatus.toLowerCase().trim().replace(/\s+/g, "_");

    const eventMap = {
      manifested: { deliveryStatus: "packed", orderStatus: OrderStatus.PACKED },
      manifest_generated: { deliveryStatus: "packed", orderStatus: OrderStatus.PACKED },
      pickup: { deliveryStatus: "shipped", orderStatus: OrderStatus.SHIPPED },
      picked_up: { deliveryStatus: "shipped", orderStatus: OrderStatus.SHIPPED },
      dispatched: { deliveryStatus: "shipped", orderStatus: OrderStatus.SHIPPED },
      shipped: { deliveryStatus: "shipped", orderStatus: OrderStatus.SHIPPED },
      in_transit: { deliveryStatus: "in_transit", orderStatus: OrderStatus.IN_TRANSIT },
      intransit: { deliveryStatus: "in_transit", orderStatus: OrderStatus.IN_TRANSIT },
      out_for_delivery: { deliveryStatus: "out_for_delivery", orderStatus: OrderStatus.OUT_FOR_DELIVERY },
      outfordelivery: { deliveryStatus: "out_for_delivery", orderStatus: OrderStatus.OUT_FOR_DELIVERY },
      delivered: { deliveryStatus: "delivered", orderStatus: OrderStatus.DELIVERED },
      success: { deliveryStatus: "delivered", orderStatus: OrderStatus.DELIVERED },
      rto: { deliveryStatus: "rto", orderStatus: OrderStatus.RTO },
      returned: { deliveryStatus: "returned", orderStatus: OrderStatus.RETURNED },
      failed_delivery: { deliveryStatus: "rto", orderStatus: OrderStatus.RTO },
      cancelled: { deliveryStatus: "cancelled", orderStatus: OrderStatus.CANCELLED },
    };

    const mapped = eventMap[normalized];
    if (!mapped) return order;

    order.deliveryStatus = mapped.deliveryStatus;
    order.orderStatus = mapped.orderStatus;

    if (mapped.orderStatus === OrderStatus.DELIVERED) {
      order.deliveredAt = new Date();
      order.paymentStatus = PaymentStatus.PAID;
      if (order.paymentDetails) order.paymentDetails.status = PaymentStatus.PAID;
    }

    await order.save();

    if (order.parentOrder) {
      const parent = await ParentOrder.findById(order.parentOrder);
      if (parent) {
        await parent.recomputeStatus();
        const allSubOrders = await Order.find({
          _id: { $in: parent.subOrders },
        })
          .select("paymentStatus")
          .lean();
        const allPaid = allSubOrders.every(
          (o) => o.paymentStatus === PaymentStatus.PAID
        );
        if (allPaid) {
          parent.paymentStatus = PaymentStatus.PAID;
          await parent.save();
        }
      }
    }
    return order;
  }

  async findOrderById(orderId) {
    if (!mongoose.Types.ObjectId.isValid(orderId))
      throw new OrderError("Invalid Order ID");

    const order = await Order.findById(orderId)
      .populate({
        path: "seller",
        select: "sellerName businessDetails email mobile GSTIN pickupAddress",
        populate: { path: "pickupAddress" },
      })
      .populate("shippingAddress")
      .populate({
        path: "orderItems",
        populate: { path: "product", select: "title images sellingPrice mrpPrice slug" },
      })
      .populate("parentOrder")
      .populate("user", "fullName email mobile")
      .lean();

    if (!order) throw new OrderError(`Order not found with id ${orderId}`);
    return order;
  }

  async findOrderItemById(orderItemId) {
    if (!mongoose.Types.ObjectId.isValid(orderItemId))
      throw new OrderError("Invalid Order Item ID");

    const item = await OrderItem.findById(orderItemId)
      .populate({
        path: "product",
        populate: { path: "seller", select: "sellerName businessDetails" },
      })
      .lean();

    if (!item) throw new OrderError(`OrderItem not found with id ${orderItemId}`);
    return item;
  }

  async usersOrderHistory(userId) {
    return await ParentOrder.find({ user: userId })
      .populate({
        path: "subOrders",
        populate: [
          {
            path: "seller",
            select: "sellerName businessDetails email mobile GSTIN pickupAddress",
            populate: { path: "pickupAddress" },
          },
          { path: "shippingAddress" },
          {
            path: "orderItems",
            populate: { path: "product", select: "title images sellingPrice mrpPrice slug" },
          },
        ],
      })
      .populate("shippingAddress")
      .populate("paymentOrder")
      .sort({ createdAt: -1 })
      .lean();
  }

  async getShopsOrders(sellerId) {
    const PaymentOrder = require("../models/PaymentOrder");

    const orders = await Order.find({
      seller: sellerId,
      orderStatus: { $ne: OrderStatus.PENDING },
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "seller",
        select: "sellerName businessDetails email mobile GSTIN pickupAddress",
        populate: { path: "pickupAddress" },
      })
      .populate("shippingAddress")
      .populate({
        path: "orderItems",
        populate: { path: "product", select: "title images sellingPrice mrpPrice slug" },
      })
      .populate("user", "fullName email mobile")
      .lean();

    const orderIds = orders.map((o) => o._id);
    const paymentOrders = await PaymentOrder.find({ orders: { $in: orderIds } })
      .select("orders paymentMethod")
      .lean();

    const paymentMethodMap = {};
    for (const po of paymentOrders) {
      for (const oid of po.orders)
        paymentMethodMap[oid.toString()] = po.paymentMethod;
    }

    for (const order of orders) {
      const pm = paymentMethodMap[order._id.toString()];
      if (pm) order.paymentMethod = pm;
      else if (!order.paymentMethod && order.paymentStatus === "COD_PENDING")
        order.paymentMethod = "COD";
    }
    return orders;
  }

  async updateOrderStatus(orderId, orderStatus) {
    if (!mongoose.Types.ObjectId.isValid(orderId))
      throw new OrderError("Invalid Order ID");

    const order = await Order.findById(orderId);
    if (!order) throw new OrderError(`Order not found with id ${orderId}`);

    if (orderStatus === OrderStatus.CONFIRMED && !order.shipmentId) {
      try {
        const seller = await Seller.findById(order.seller).populate("pickupAddress");
        const address = await Address.findById(order.shippingAddress);
        const shipment = await DelhiveryService.createShipment(order, seller, address);

        order.shipmentId = shipment.shipmentId;
        order.trackingId = shipment.awbNumber;
        order.trackingLink = shipment.trackingLink;
        order.warehouseCode = seller.delhiveryWarehouseCode;
        order.deliveryStatus = "shipped";
        order.orderStatus = OrderStatus.SHIPPED;
        order.shippedAt = new Date();
        await order.save();

        return await this.findOrderById(orderId);
      } catch (shipmentErr) {
        console.error("[updateOrderStatus] Shipment failed:", shipmentErr.message);
      }
    }

    order.orderStatus = orderStatus;
    await order.save();

    return await this.findOrderById(orderId);
  }

  async deleteOrder(orderId) {
    const result = await Order.deleteOne({ _id: orderId });
    if (result.deletedCount === 0)
      throw new OrderError(`Order not found with id ${orderId}`);
    return result;
  }

  async cancelOrder(orderId, userId) {
    if (!mongoose.Types.ObjectId.isValid(orderId))
      throw new OrderError("Invalid Order ID");

    const order = await Order.findById(orderId);
    if (!order) throw new OrderError(`Order not found with id ${orderId}`);

    if (userId.toString() !== order.user.toString())
      throw new OrderError("Not authorized");

    if (
      [
        OrderStatus.SHIPPED,
        OrderStatus.IN_TRANSIT,
        OrderStatus.OUT_FOR_DELIVERY,
        OrderStatus.DELIVERED,
      ].includes(order.orderStatus)
    )
      throw new OrderError("Cannot cancel shipped/delivered order");

    if (order.shipmentId) {
      try {
        await DelhiveryService.cancelShipment(order.shipmentId);
      } catch (e) {
        console.error("[cancelOrder] cancelShipment failed:", e.message);
      }
    }

    order.orderStatus = OrderStatus.CANCELLED;
    await order.save();

    if (order.parentOrder) {
      const parent = await ParentOrder.findById(order.parentOrder);
      if (parent) await parent.recomputeStatus();
    }
    return order;
  }

  async requestPickup(orderId) {
    if (!mongoose.Types.ObjectId.isValid(orderId))
      throw new OrderError("Invalid Order ID");

    const order = await Order.findById(orderId);
    if (!order) throw new OrderError(`Order not found with id ${orderId}`);

    if (!order.shipmentId || order.pickupRequested)
      throw new Error("Order not ready for pickup or already requested");

    const seller = await Seller.findById(order.seller).lean();
    await DelhiveryService.createPickupRequest(seller, order);

    order.pickupRequested = true;
    return await order.save();
  }
}

module.exports = new OrderService();