// paymentController.js
const axios = require("axios");
const razorpay = require("../config/razorpayClient");
const PaymentService = require("../services/PaymentService");
const UserService = require("../services/UserService");
const SellerService = require("../services/SellerService");
const OrderService = require("../services/OrderService");
const SellerReportService = require("../services/SellerReportService");
const TransactionService = require("../services/TransactionService");
const Cart = require("../models/Cart");

// ============ EXISTING ============
const paymentSuccessHandler = async (req, res) => {
  const { paymentId } = req.params;
  const { paymentLinkId } = req.query;

  try {
    console.log(`[PaymentController] Received success for paymentId: ${paymentId}, linkId: ${paymentLinkId}`);
    const user = await req.user;

    const paymentOrder = await PaymentService.getPaymentOrderByPaymentId(paymentLinkId);

    const paymentSuccess = await PaymentService.proceedPaymentOrder(
      paymentOrder,
      paymentId,
      paymentLinkId
    );

    if (paymentSuccess) {
      console.log(`[PaymentController] Payment successfully processed. Updating related records...`);
      for (let orderId of paymentOrder.orders) {
        const order = await OrderService.findOrderById(orderId);
        await TransactionService.createTransaction(order._id);
        const seller = await SellerService.getSellerById(order.seller);
        const sellerReport = await SellerReportService.getSellerReport(seller);
        sellerReport.totalOrders += 1;
        sellerReport.totalEarnings += order.totalSellingPrice;
        sellerReport.totalSales += order.orderItems.length;
        await SellerReportService.updateSellerReport(sellerReport);
        console.log("[PaymentController] Updated seller report: " + order.seller);
      }

      await Cart.findOneAndUpdate(
        { user: user._id },
        { cartItems: [] },
        { new: true }
      );

      return res.status(201).json({ message: "Payment successful" });
    } else {
      console.error(`[PaymentController] proceedPaymentOrder returned false for ${paymentId}`);
      return res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (err) {
    console.error(`[PaymentController] Error: ${err.message}`);
    return res.status(500).json({ message: err.message });
  }
};

// ============ 🔥 EMI PLANS ============
const getEmiPlans = async (req, res) => {
  try {
    const { amount } = req.query;

    if (!amount || Number(amount) < 100) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const apiKey = process.env.RAZORPAY_KEY_ID;
    const apiSecret = process.env.RAZORPAY_KEY_SECRET;

    if (!apiKey || !apiSecret) {
      console.error("❌ [EMI] Razorpay keys missing in .env");
      return res.status(500).json({ message: "Razorpay keys not configured" });
    }

    console.log("🔍 [EMI] Amount:", amount);
    console.log("🔍 [EMI] Key:", apiKey.slice(0, 15) + "...");

    const response = await axios.get(
      `https://api.razorpay.com/v1/methods?amount=${amount}`,
      {
        auth: {
          username: apiKey,
          password: apiSecret,
        },
      }
    );

    console.log("✅ [EMI] Razorpay response received");

    const emiPlans = [];
    const banks = response.data.emi_plans || {};

    const bankNames = {
      HDFC: "HDFC Bank",
      ICIC: "ICICI Bank",
      KKBK: "Kotak Mahindra Bank",
      UTIB: "Axis Bank",
      SBIN: "State Bank of India",
      YESB: "Yes Bank",
      RATN: "RBL Bank",
      INDB: "IndusInd Bank",
      SCBL: "Standard Chartered",
      BARB: "BOBCARD",
      CITI: "Citibank",
      HSBC: "HSBC Bank",
      IDFB: "IDFC First Bank",
      FDRL: "Federal Bank",
      AMEX: "American Express",
      AUBL: "AU Small Finance Bank",
      onecard: "OneCard",
    };

    for (const [bankCode, bankData] of Object.entries(banks)) {
      if (Number(amount) < bankData.min_amount) continue;

      for (const [tenure, rate] of Object.entries(bankData.plans)) {
        const months = parseInt(tenure);
        const annualRate = rate / 100;
        const monthlyRate = annualRate / 12 / 100;

        const emiAmount =
          monthlyRate === 0
            ? Math.round(Number(amount) / months)
            : Math.round(
                (Number(amount) * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                  (Math.pow(1 + monthlyRate, months) - 1)
              );

        emiPlans.push({
          bankCode,
          bankName: bankNames[bankCode] || bankCode,
          tenure: months,
          interestRate: annualRate,
          emiAmount,
          totalPayable: emiAmount * months,
        });
      }
    }

    emiPlans.sort((a, b) => {
      if (a.bankName !== b.bankName) return a.bankName.localeCompare(b.bankName);
      return a.tenure - b.tenure;
    });

    console.log("✅ [EMI] Total plans:", emiPlans.length);
    console.log(
      "✅ [EMI] Banks:",
      [...new Set(emiPlans.map((p) => p.bankName))].join(", ")
    );

    return res.status(200).json({
      success: true,
      plans: emiPlans,
    });
  } catch (err) {
    console.error("❌ [EMI] Error:", err.message);
    console.error("❌ [EMI] Response:", err.response?.data);

    return res.status(500).json({
      message: "EMI plans fetch failed",
      error: err.response?.data || err.message,
    });
  }
};

module.exports = {
  paymentSuccessHandler,
  getEmiPlans,
};