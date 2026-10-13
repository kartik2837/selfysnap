
// const OrderService = require("../services/OrderService");
// const CartService = require("../services/CartService");
// const UserService = require("../services/UserService");
// const OrderError = require("../exceptions/OrderError");
// const PaymentMethod = require("../domain/PaymentMethod");
// const PaymentOrderStatus = require("../domain/PaymentOrderStatus");
// const PaymentStatus = require("../domain/PaymentStatus")
// const PaymentService = require("../services/PaymentService");
// const PaymentOrder = require("../models/PaymentOrder");
// const Cart = require("../models/Cart");


// class OrderController {
//   // Admin: Get all orders  
//   async getAllOrdersForAdmin(req, res) {
//     try {
//       const orders = await OrderService.getAllOrders();
//       return res.status(200).json(orders);
//     } catch (error) {
//       return res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
//     }
//   }

//   // Create a new order
//   async createOrder(req, res, next) {
//     const { shippingAddress } = req.body;
//     const { paymentMethod } = req.query; // "RAZORPAY" or "COD"

//     try {
//       const user = req.user;

//       // 1️⃣ Get user's cart
//       const cart = await CartService.findUserCart(user);
//       if (!cart || cart.cartItems.length === 0) {
//         return res.status(400).json({ message: "Cart is empty. Please add items before placing an order." });
//       }

//       if (!shippingAddress) {
//         return res.status(400).json({ message: "Shipping address is required." });
//       }

//       if (!paymentMethod) {
//         return res.status(400).json({ message: "Payment method is required." });
//       }

//       // 2️⃣ Create orders — returns { subOrders, parentOrder }
//       const result = await OrderService.createOrder(user, shippingAddress, cart, paymentMethod);
//       const orders = result.subOrders;

//       // 3️⃣ Calculate total amount
//       const totalAmount = orders.reduce((sum, order) => sum + order.totalSellingPrice, 0);

//       // 4️⃣ Create PaymentOrder document
//       const paymentOrder = new PaymentOrder({
//         user: user._id,
//         orders: orders.map(o => o._id),
//         amount: totalAmount,
//         status: PaymentOrderStatus.PENDING, // PENDING initially
//         paymentMethod: paymentMethod,
//       });

//       await paymentOrder.save();

//       let response = {};

//       if (paymentMethod === PaymentMethod.RAZORPAY) {
//         // 5️⃣ Generate Razorpay payment link
//         const payment = await PaymentService.createRazorpayPaymentLink(
//           user,
//           totalAmount,
//           paymentOrder._id
//         );

//         // Save payment link info
//         paymentOrder.paymentLinkId = payment.id;
//         paymentOrder.paymentLinkUrl = payment.short_url;
//         await paymentOrder.save();

//         response = {
//           payment_link_url: payment.short_url,
//           message: "Payment link generated. Complete payment to confirm order.",
//           paymentOrderId: paymentOrder._id,
//         };
//       } else if (paymentMethod === PaymentMethod.COD) {
//         // COD orders: subOrders already saved with PENDING in OrderService
//         // Clear cart for COD immediately
//         await Cart.findOneAndUpdate(
//           { user: user._id },
//           { cartItems: [] },
//           { new: true }
//         );

//         response = {
//           message: "Order placed successfully with Cash on Delivery.",
//           paymentOrderId: paymentOrder._id,
//           parentOrderId: result.parentOrder._id,
//           subOrderIds: result.subOrders.map(o => o._id),
//         };
//       }

//       return res.status(200).json(response);

//     } catch (error) {
//       console.error("Error creating order:", error);
//       return res.status(500).json({
//         message: `Error creating order: ${error.message || error}`,
//       });
//     }
//   }



//   // Buy Now — single product direct order
//   async buyNow(req, res) {
//     const { shippingAddress, productId, quantity, size } = req.body;
//     const { paymentMethod } = req.query;

//     try {
//       const user = req.user;

//       if (!productId) {
//         return res.status(400).json({ message: "Product ID is required." });
//       }
//       if (!shippingAddress) {
//         return res.status(400).json({ message: "Shipping address is required." });
//       }
//       if (!paymentMethod) {
//         return res.status(400).json({ message: "Payment method is required." });
//       }

//       const result = await OrderService.createBuyNowOrder(
//         user,
//         shippingAddress,
//         productId,
//         quantity || 1,
//         size || "FREE",
//         paymentMethod
//       );
//       const orders = result.subOrders;

//       const totalAmount = orders.reduce((sum, order) => sum + order.totalSellingPrice, 0);

//       const paymentOrder = new PaymentOrder({
//         user: user._id,
//         orders: orders.map(o => o._id),
//         amount: totalAmount,
//         status: PaymentOrderStatus.PENDING,
//         paymentMethod: paymentMethod,
//       });

//       await paymentOrder.save();

//       let response = {};

//       if (paymentMethod === PaymentMethod.RAZORPAY) {
//         const payment = await PaymentService.createRazorpayPaymentLink(
//           user,
//           totalAmount,
//           paymentOrder._id
//         );

//         paymentOrder.paymentLinkId = payment.id;
//         paymentOrder.paymentLinkUrl = payment.short_url;
//         await paymentOrder.save();

//         response = {
//           payment_link_url: payment.short_url,
//           message: "Payment link generated. Complete payment to confirm order.",
//           paymentOrderId: paymentOrder._id,
//         };
//       } else if (paymentMethod === PaymentMethod.COD) {
//         // COD already set COD_PENDING in OrderService
//         response = {
//           message: "Order placed successfully with Cash on Delivery.",
//           paymentOrderId: paymentOrder._id,
//           parentOrderId: result.parentOrder._id,
//           orderId: orders[0]._id,
//         };
//       }

//       return res.status(200).json(response);
//     } catch (error) {
//       console.error("Error in buy now:", error);
//       return res.status(500).json({
//         message: `Error in buy now: ${error.message || error}`,
//       });
//     }
//   }

//   // Get order by ID
//   async getOrderById(req, res, next) {
//     try {
//       const { orderId } = req.params;
//       const order = await OrderService.findOrderById(orderId);
//       return res.status(200).json(order);
//     } catch (error) {
//       return res.status(401).json({ error: error.message });
//     }
//   }

//   async getOrderItemById(req, res, next) {
//     try {
//       const { orderItemId } = req.params;
//       const orderItem = await OrderService.findOrderItemById(orderItemId);
//       return res.status(200).json(orderItem);
//     } catch (error) {
//       return res.status(401).json({ error: error.message });
//     }
//   }

//   // Get user's order history
//   async getUserOrderHistory(req, res) {
//     // console.log("req ",req.user)
//     try {
//       const userId = await req.user._id;
//       const orderHistory = await OrderService.usersOrderHistory(userId);
//       return res.status(200).json(orderHistory);
//     } catch (error) {
//       return res.status(401).json({ error: error.message });
//     }
//   }

//   // Get orders for a specific seller (shop)
//   async getSellersOrders(req, res) {
//     try {
//       const sellerId = req.seller._id
//       const orders = await OrderService.getShopsOrders(sellerId);
//       return res.status(200).json(orders);
//     } catch (error) {
//       return res.status(401).json({ error: error.message });
//     }
//   }

//   // Update order status
//   async updateOrderStatus(req, res) {
//     try {
//       const { orderId, orderStatus } = req.params;

//       const updatedOrder = await OrderService.updateOrderStatus(
//         orderId,
//         orderStatus
//       );
//       return res
//         .status(200)
//         .json(updatedOrder);
//     } catch (error) {
//       return res.status(401).json({ error: error.message });
//     }
//   }

//   // Cancel an order
//   async cancelOrder(req, res, next) {
//     try {
//       const { orderId } = req.params;
//       const userId = req.user._id;
//       const canceledOrder = await OrderService.cancelOrder(orderId, userId);
//       return res
//         .status(200)
//         .json({
//           message: "Order cancelled successfully",
//           order: canceledOrder,
//         });
//     } catch (error) {
//       return res.status(401).json({ error: error.message });
//     }
//   }

//   // Delete an order
//   async deleteOrder(req, res, next) {
//     try {
//       const { orderId } = req.params;
//       await OrderService.deleteOrder(orderId);
//       return res.status(200).json({ message: "Order deleted successfully" });
//     } catch (error) {
//       return res.status(401).json({ error: error.message });
//     }
//   }
// }

// module.exports = new OrderController();











const OrderService = require("../services/OrderService");
const CartService = require("../services/CartService");
const UserService = require("../services/UserService");
const OrderError = require("../exceptions/OrderError");
const PaymentMethod = require("../domain/PaymentMethod");
const PaymentOrderStatus = require("../domain/PaymentOrderStatus");
const PaymentStatus = require("../domain/PaymentStatus");
const PaymentService = require("../services/PaymentService");
const PaymentOrder = require("../models/PaymentOrder");
const Cart = require("../models/Cart");

class OrderController {
  
  async getAllOrdersForAdmin(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ 
        message: 'Failed to fetch orders', 
        error: error.message 
      });
    }
  }

  async createOrder(req, res, next) {
    const { shippingAddress } = req.body;
    const { paymentMethod } = req.query;

    try {
      const user = req.user;

      const cart = await CartService.findUserCart(user);
      if (!cart || cart.cartItems.length === 0) {
        return res.status(400).json({ 
          message: "Cart is empty. Please add items before placing an order." 
        });
      }

      if (!shippingAddress) {
        return res.status(400).json({ message: "Shipping address is required." });
      }

      if (!paymentMethod) {
        return res.status(400).json({ message: "Payment method is required." });
      }

      const result = await OrderService.createOrder(
        user, shippingAddress, cart, paymentMethod
      );
      const orders = result.subOrders;

      const totalAmount = orders.reduce(
        (sum, order) => sum + order.totalSellingPrice, 0
      );

      const paymentOrder = new PaymentOrder({
        user: user._id,
        orders: orders.map(o => o._id),
        amount: totalAmount,
        status: PaymentOrderStatus.PENDING,
        paymentMethod: paymentMethod,
      });

      await paymentOrder.save();

      let response = {};

      if (paymentMethod === PaymentMethod.RAZORPAY) {
        const payment = await PaymentService.createRazorpayPaymentLink(
          user, totalAmount, paymentOrder._id
        );

        paymentOrder.paymentLinkId = payment.id;
        paymentOrder.paymentLinkUrl = payment.short_url;
        await paymentOrder.save();

        response = {
          payment_link_url: payment.short_url,
          message: "Payment link generated. Complete payment to confirm order.",
          paymentOrderId: paymentOrder._id,
        };
      } else if (paymentMethod === PaymentMethod.COD) {
        await Cart.findOneAndUpdate(
          { user: user._id },
          { cartItems: [] },
          { new: true }
        );

        response = {
          message: "Order placed successfully with Cash on Delivery.",
          paymentOrderId: paymentOrder._id,
          parentOrderId: result.parentOrder._id,
          subOrderIds: result.subOrders.map(o => o._id),
        };
      }

      return res.status(200).json(response);

    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({
        message: `Error creating order: ${error.message || error}`,
      });
    }
  }

  async buyNow(req, res) {
    const { shippingAddress, productId, quantity, size } = req.body;
    const { paymentMethod } = req.query;

    try {
      const user = req.user;

      if (!productId) {
        return res.status(400).json({ message: "Product ID is required." });
      }
      if (!shippingAddress) {
        return res.status(400).json({ message: "Shipping address is required." });
      }
      if (!paymentMethod) {
        return res.status(400).json({ message: "Payment method is required." });
      }

      const result = await OrderService.createBuyNowOrder(
        user, shippingAddress, productId, quantity || 1,
        size || "FREE", paymentMethod
      );
      const orders = result.subOrders;

      const totalAmount = orders.reduce(
        (sum, order) => sum + order.totalSellingPrice, 0
      );

      const paymentOrder = new PaymentOrder({
        user: user._id,
        orders: orders.map(o => o._id),
        amount: totalAmount,
        status: PaymentOrderStatus.PENDING,
        paymentMethod: paymentMethod,
      });

      await paymentOrder.save();

      let response = {};

      if (paymentMethod === PaymentMethod.RAZORPAY) {
        const payment = await PaymentService.createRazorpayPaymentLink(
          user, totalAmount, paymentOrder._id
        );

        paymentOrder.paymentLinkId = payment.id;
        paymentOrder.paymentLinkUrl = payment.short_url;
        await paymentOrder.save();

        response = {
          payment_link_url: payment.short_url,
          message: "Payment link generated. Complete payment to confirm order.",
          paymentOrderId: paymentOrder._id,
        };
      } else if (paymentMethod === PaymentMethod.COD) {
        response = {
          message: "Order placed successfully with Cash on Delivery.",
          paymentOrderId: paymentOrder._id,
          parentOrderId: result.parentOrder._id,
          orderId: orders[0]._id,
        };
      }

      return res.status(200).json(response);
    } catch (error) {
      console.error("Error in buy now:", error);
      return res.status(500).json({
        message: `Error in buy now: ${error.message || error}`,
      });
    }
  }

  async getOrderById(req, res, next) {
    try {
      const { orderId } = req.params;
      const order = await OrderService.findOrderById(orderId);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async getOrderItemById(req, res, next) {
    try {
      const { orderItemId } = req.params;
      const orderItem = await OrderService.findOrderItemById(orderItemId);
      return res.status(200).json(orderItem);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async getUserOrderHistory(req, res) {
    try {
      const userId = req.user._id;
      const orderHistory = await OrderService.usersOrderHistory(userId);
      return res.status(200).json(orderHistory);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async getSellersOrders(req, res) {
    try {
      const sellerId = req.seller._id;
      const orders = await OrderService.getShopsOrders(sellerId);
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { orderId, orderStatus } = req.params;
      const updatedOrder = await OrderService.updateOrderStatus(
        orderId, orderStatus
      );
      return res.status(200).json(updatedOrder);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async cancelOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      const userId = req.user._id;
      const canceledOrder = await OrderService.cancelOrder(orderId, userId);
      return res.status(200).json({
        message: "Order cancelled successfully",
        order: canceledOrder,
      });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const { orderId } = req.params;
      await OrderService.deleteOrder(orderId);
      return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new OrderController();