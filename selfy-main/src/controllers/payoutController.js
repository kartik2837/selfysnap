// const payoutService = require("../services/payoutService");

// // ✅ Tab 2 → Payout History
// exports.getAllPayouts = async (req, res) => {
//   try {
//     const payouts = await payoutService.getAllPayouts();

//     res.status(200).json({
//       success: true,
//       payouts,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch payouts",
//       error: error.message,
//     });
//   }
// };


// // ✅ Tab 1 → Transaction Summary (Seller Wise + Weekly + Monthly)
// exports.getPayoutSummary = async (req, res) => {
//   try {
//     const summary =
//       await payoutService.getTransactionSummary();

//     res.status(200).json({
//       success: true,
//       summary,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch summary",
//       error: error.message,
//     });
//   }
// };


// // ✅ Create Payout (Manual Admin Payout)
// exports.createPayout = async (req, res) => {
//   try {
//     const {
//       sellerId,
//       amount,
//       commission = 0,
//       transactions = [],
//     } = req.body;

//     if (!sellerId || !amount) {
//       return res.status(400).json({
//         success: false,
//         message: "sellerId and amount required",
//       });
//     }

//     const payout = await payoutService.createPayout({
//       seller: sellerId,
//       amount,
//       commission,
//       transactions,
//     });

//     res.status(201).json({
//       success: true,
//       payout,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to create payout",
//       error: error.message,
//     });
//   }
// };


// // ✅ Update Payout Status
// exports.updatePayoutStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.query;

//     if (!status) {
//       return res.status(400).json({
//         success: false,
//         message: "status required",
//       });
//     }

//     const payout =
//       await payoutService.updateStatus(
//         id,
//         status
//       );

//     res.status(200).json({
//       success: true,
//       payout,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update payout",
//       error: error.message,
//     });
//   }
// };











const payoutService = require("../services/payoutService");
const Payout = require("../models/Payout");

// ✅ Get all payouts (admin)
exports.getAllPayouts = async (req, res) => {
  try {
    const payouts = await payoutService.getAllPayouts();
    res.status(200).json({ success: true, payouts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Transaction summary (admin)
exports.getPayoutSummary = async (req, res) => {
  try {
    const summary = await payoutService.getTransactionSummary();
    res.status(200).json({ success: true, summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Admin create manual payout (with optional commission)
exports.createPayout = async (req, res) => {
  try {
    const { sellerId, amount, commission = 0, transactions = [] } = req.body;
    if (!sellerId || !amount) {
      return res.status(400).json({ success: false, message: "sellerId and amount required" });
    }
    const payout = await payoutService.createPayout({
      seller: sellerId,
      amount,
      commissionAmount: commission,
      transactions,
    });
    res.status(201).json({ success: true, payout });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update payout status (approve/reject)
exports.updatePayoutStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    if (!status) {
      return res.status(400).json({ success: false, message: "status required" });
    }
    const payout = await payoutService.updateStatus(id, status);
    res.status(200).json({ success: true, payout });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ NEW: Only pending requests (for admin approval)
exports.getPendingPayouts = async (req, res) => {
  try {
    const pending = await Payout.find({ status: 'PENDING' })
      .populate({
        path: 'seller',
        select: 'sellerName mobile email bankDetails businessDetails'
      })
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, payouts: pending });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ NEW: Payout history (SUCCESS + REJECTED)
exports.getPayoutHistory = async (req, res) => {
  try {
    const history = await Payout.find({ status: { $in: ['SUCCESS', 'REJECTED'] } })
      .populate({
        path: 'seller',
        select: 'sellerName mobile email bankDetails businessDetails'
      })
      .sort({ paidAt: -1 });
    res.status(200).json({ success: true, payouts: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Seller request payout – automatically applies 8% commission
exports.requestPayout = async (req, res) => {
  try {
    const { amount, subOrderId } = req.body;
    const seller = req.seller;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Valid amount required" });
    }

    // Check nested bankDetails
    if (!seller.bankDetails || !seller.bankDetails.accountNumber || !seller.bankDetails.ifscCode) {
      return res.status(400).json({
        success: false,
        message: "Please update your bank account number and IFSC code in your profile first."
      });
    }

    const existing = await Payout.findOne({ seller: seller._id, status: 'PENDING' });
    if (existing) {
      return res.status(400).json({ success: false, message: "You already have a pending payout request." });
    }

    // ✅ Calculate 8% commission
    const COMMISSION_PERCENT = 8; // changeable to any value
    const commissionAmount = Math.round((amount * COMMISSION_PERCENT) / 100);

    const payout = await payoutService.createPayout({
      seller: seller._id,
      amount,
      commissionAmount,
      subOrder: subOrderId || null,
    });

    res.status(201).json({ success: true, message: "Payout request submitted to admin.", payout });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Seller see his own payouts (includes commissionAmount)
exports.getMyPayouts = async (req, res) => {
  try {
    const sellerId = req.seller._id;
    const payouts = await Payout.find({ seller: sellerId })
      .sort({ createdAt: -1 })
      .select("amount status createdAt paidAt commissionAmount");
    res.status(200).json({ success: true, payouts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

};














