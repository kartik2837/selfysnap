// Import necessary modules
const Razorpay = require('razorpay');
const PaymentOrder = require('../models/PaymentOrder'); // Assuming you have Mongoose models defined
const Order = require('../models/Order');
const ParentOrder = require('../models/ParentOrder');
const User = require('../models/User');
const PaymentStatus = require('../domain/PaymentStatus');
const PaymentOrderStatus = require('../domain/PaymentOrderStatus');
const razorpay = require("../config/razorpayClient");
const OrderStatus = require('../domain/OrderStatus');

class PaymentService {


    async createOrder(user, orders, paymentMethod) {
        const amount = orders.reduce((sum, order) => sum + order.totalSellingPrice, 0);
        const paymentOrder = new PaymentOrder({
            amount,
            user: user._id,
            orders: orders.map(order => order._id)
        });
        await paymentOrder.save();
        // COD: Mark orders as placed and payment completed
        if (paymentMethod === 'COD') {
            await Promise.all(orders.map(async (order) => {
                order.paymentStatus = PaymentStatus.COD_PENDING; // Corrected from PENDING
                order.orderStatus = OrderStatus.PLACED;
                order.paymentMethod = 'COD';
                if (!order.paymentDetails) order.paymentDetails = {};
                order.paymentDetails.method = 'COD';
                order.paymentDetails.status = PaymentStatus.COD_PENDING;
                await order.save();
            }));
            paymentOrder.status = PaymentOrderStatus.PENDING;
            paymentOrder.paymentMethod = 'COD';
            await paymentOrder.save();
        }
        return paymentOrder;
    }

    async getPaymentOrderById(orderId) {
        const paymentOrder = await PaymentOrder.findById(orderId);
        if (!paymentOrder) {
            throw new Error('Payment order not found');
        }
        return paymentOrder;
    }

    async getPaymentOrderByPaymentId(paymentId) {
        const paymentOrder = await PaymentOrder.findOne({ paymentLinkId: paymentId });
        if (!paymentOrder) {
            throw new Error('Payment order not found with provided payment link id');
        }
        return paymentOrder;
    }

    async proceedPaymentOrder(paymentOrder, paymentId, paymentLinkId) {

        if (paymentOrder.status === PaymentOrderStatus.PENDING) {
            const payment = await razorpay.payments.fetch(paymentId);



            if (payment.status === 'captured' || payment.status === 'authorized') {
                console.log(`[PaymentService] Payment ${paymentId} verified (${payment.status}). Updating records...`);
                // Update each order's payment status
                for (let orderId of paymentOrder.orders) {
                    const order = await Order.findById(orderId);
                    if (order) {
                        order.paymentStatus = PaymentStatus.PAID;
                        order.orderStatus = OrderStatus.PLACED;
                        if (!order.paymentDetails) order.paymentDetails = {};
                        order.paymentDetails.status = PaymentStatus.PAID;
                        order.paymentDetails.method = paymentOrder.paymentMethod || 'RAZORPAY';
                        order.paymentMethod = paymentOrder.paymentMethod || 'RAZORPAY';
                        await order.save();
                        console.log(`[PaymentService] Updated order ${orderId} to PAID and PLACED with method ${order.paymentMethod}`);

                        // Update ParentOrder status directly using the reference
                        if (order.parentOrder) {
                            await ParentOrder.findByIdAndUpdate(order.parentOrder, {
                                paymentStatus: PaymentStatus.PAID,
                                orderStatus: 'placed'
                            });
                            console.log(`[PaymentService] Updated ParentOrder ${order.parentOrder} to PAID and placed`);
                        }
                    }
                }

                paymentOrder.status = PaymentOrderStatus.SUCCESS;

                await paymentOrder.save();

                return true;
            } else {
                console.log(`[PaymentService] Payment ${paymentId} status is ${payment.status}, not captured.`);
                paymentOrder.status = PaymentOrderStatus.FAILED;
                await paymentOrder.save();
                return false;
            }
        }
        return false;
    }

    async createRazorpayPaymentLink(user, amount, orderId) {
        // Use imported razorpay client
        try {
            const frontendUrl = process.env.FRONTEND_URL || "https://selfysnap.com";
            const paymentLinkRequest = {
                amount: amount * 100,
                currency: 'INR',
                customer: {
                    name: user.fullName,
                    email: user.email
                },
                notify: {
                    email: true
                },
                callback_url: `https://selfysnap.com/payment-success/${orderId}`,
                callback_method: 'get'
            };



            const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
            console.log("payment link", paymentLink);

            return paymentLink;
        } catch (err) {
            console.error("razorr pay errror ", err);
            throw new Error(err.message);
        }
    }

    // Stripe removed, COD handled above
}

module.exports = new PaymentService();
