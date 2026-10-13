// const Payout = require("../models/Payout");
// const Transaction = require("../models/Transaction");
// const Order = require("../models/Order");

// class PayoutService {

//   // 👉 Payout history (Tab 2)
//   async getAllPayouts() {
//     return await Payout.find()
//       .populate("seller")
//       .populate("transactions");
//   }

//   async getTransactionSummary() {
//     const OrderStatus = require("../domain/OrderStatus");

//     const now = new Date();
//     const startOfWeek = new Date();
//     startOfWeek.setDate(now.getDate() - 7);
//     const startOfMonth = new Date();
//     startOfMonth.setMonth(now.getMonth() - 1);

//     // ✅ Seller Wise Earnings (only DELIVERED)
//     const sellerSummary = await Transaction.aggregate([
//       {
//         // Join with Order to check status and get amount
//         $lookup: {
//           from: "orders",
//           localField: "order",
//           foreignField: "_id",
//           as: "orderDetails"
//         }
//       },
//       { $unwind: "$orderDetails" },
//       {
//         // Filter: only DELIVERED orders
//         $match: {
//           "orderDetails.orderStatus": OrderStatus.DELIVERED
//         }
//       },
//       {
//         $group: {
//           _id: "$seller",
//           totalOrders: { $sum: "$orderDetails.totalSellingPrice" } // Total revenue
//         }
//       },
//       {
//         $lookup: {
//           from: "sellers",
//           localField: "_id",
//           foreignField: "_id",
//           as: "seller"
//         }
//       },
//       { $unwind: "$seller" }
//     ]);

//     // ✅ Weekly Earnings
//     const weeklyData = await Transaction.aggregate([
//       { $match: { createdAt: { $gte: startOfWeek } } },
//       { $lookup: { from: "orders", localField: "order", foreignField: "_id", as: "o" } },
//       { $unwind: "$o" },
//       { $match: { "o.orderStatus": OrderStatus.DELIVERED } },
//       { $group: { _id: null, total: { $sum: "$o.totalSellingPrice" } } }
//     ]);
//     const weekly = weeklyData.length > 0 ? weeklyData[0].total : 0;

//     // ✅ Monthly Earnings
//     const monthlyData = await Transaction.aggregate([
//       { $match: { createdAt: { $gte: startOfMonth } } },
//       { $lookup: { from: "orders", localField: "order", foreignField: "_id", as: "o" } },
//       { $unwind: "$o" },
//       { $match: { "o.orderStatus": OrderStatus.DELIVERED } },
//       { $group: { _id: null, total: { $sum: "$o.totalSellingPrice" } } }
//     ]);
//     const monthly = monthlyData.length > 0 ? monthlyData[0].total : 0;

//     return {
//       sellerSummary,
//       weekly,
//       monthly
//     };
//   }

//   // 👉 Create payout
//   async createPayout(data) {
//     const payout = new Payout(data);
//     return await payout.save();
//   }

//   // 👉 Update payout status
//   async updateStatus(id, status) {
//     return await Payout.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     )
//       .populate("seller")
//       .populate("transactions");
//   }

//   // 👉 Auto release payout after delivery (called by webhookController)
//   async autoReleasePayout(subOrder) {
//     // Avoid duplicate payouts for the same sub-order
//     const existing = await Payout.findOne({ subOrder: subOrder._id });
//     if (existing) {
//       console.log(`[Payout] Already exists for subOrder ${subOrder._id}`);
//       return existing;
//     }

//     const payout = new Payout({
//       seller: subOrder.seller,
//       subOrder: subOrder._id,
//       amount: subOrder.sellerAmount,
//       commissionAmount: subOrder.commissionAmount,
//       status: 'PENDING',  // Admin reviews → marks SUCCESS
//     });

//     const saved = await payout.save();
//     console.log(`[Payout] Auto-created payout ${saved._id} for seller ${subOrder.seller}`);
//     return saved;
//   }

// }

// module.exports = new PayoutService();



























// const Payout = require("../models/Payout");
// const Transaction = require("../models/Transaction");

// class PayoutService {

//   // 👉 Payout history (Admin Tab 2)
//   async getAllPayouts() {
//     return await Payout.find()
//       .populate("seller")
//       .populate("transactions")
//       .sort({ createdAt: -1 });
//   }

//   // 👉 Seller Summary (Admin Tab 1)
//   async getTransactionSummary() {

//     const OrderStatus = require("../domain/OrderStatus");

//     const now = new Date();

//     const startOfWeek = new Date();
//     startOfWeek.setDate(now.getDate() - 7);

//     const startOfMonth = new Date();
//     startOfMonth.setMonth(now.getMonth() - 1);

//     const sellerSummary = await Transaction.aggregate([

//       // Join Order
//       {
//         $lookup: {
//           from: "orders",
//           localField: "order",
//           foreignField: "_id",
//           as: "orderDetails"
//         }
//       },

//       { $unwind: "$orderDetails" },

//       // Only delivered orders
//       {
//         $match: {
//           "orderDetails.orderStatus": OrderStatus.DELIVERED
//         }
//       },

//       {
//         $group: {

//           _id: "$seller",

//           total: {
//             $sum: "$orderDetails.totalSellingPrice"
//           },

//           weekly: {
//             $sum: {
//               $cond: [
//                 { $gte: ["$createdAt", startOfWeek] },
//                 "$orderDetails.totalSellingPrice",
//                 0
//               ]
//             }
//           },

//           monthly: {
//             $sum: {
//               $cond: [
//                 { $gte: ["$createdAt", startOfMonth] },
//                 "$orderDetails.totalSellingPrice",
//                 0
//               ]
//             }
//           }

//         }
//       },

//       // Seller details
//       {
//         $lookup: {
//           from: "sellers",
//           localField: "_id",
//           foreignField: "_id",
//           as: "seller"
//         }
//       },

//       { $unwind: "$seller" },

//       {
//         $project: {
//           sellerId: "$seller._id",
//           sellerName: "$seller.sellerName",
//           total: 1,
//           weekly: 1,
//           monthly: 1
//         }
//       }

//     ]);

//     return {
//       sellerSummary
//     };

//   }

//   // 👉 Create payout
//   async createPayout(data) {

//     const payout = new Payout({
//       seller: data.seller,
//       amount: data.amount,
//       commissionAmount: data.commissionAmount || 0,
//       transactions: data.transactions || [],
//       status: "PENDING"
//     });

//     return await payout.save();

//   }

//   // 👉 Update payout status
//   async updateStatus(id, status) {

//     const payout = await Payout.findById(id);

//     if (!payout) {
//       throw new Error("Payout not found");
//     }

//     payout.status = status;

//     if (status === "SUCCESS") {
//       payout.paidAt = new Date();
//     }

//     await payout.save();

//     return await payout.populate("seller");

//   }

//   // 👉 Auto create payout after delivery
//   async autoReleasePayout(subOrder) {

//     const existing = await Payout.findOne({
//       subOrder: subOrder._id
//     });

//     if (existing) {
//       console.log(`Payout already exists for ${subOrder._id}`);
//       return existing;
//     }

//     const payout = new Payout({

//       seller: subOrder.seller,

//       subOrder: subOrder._id,

//       amount: subOrder.sellerAmount,

//       commissionAmount: subOrder.commissionAmount,

//       status: "PENDING"

//     });

//     const saved = await payout.save();

//     console.log(`Auto payout created: ${saved._id}`);

//     return saved;

//   }

// }

// module.exports = new PayoutService();























const Payout = require("../models/Payout");
const Transaction = require("../models/Transaction");
const OrderStatus = require("../domain/OrderStatus");

class PayoutService {

  async getAllPayouts() {
    return await Payout.find()
      .populate({
        path: "seller",
        select: "sellerName mobile email bankDetails businessDetails"
      })
      .populate("transactions")
      .sort({ createdAt: -1 });
  }

  async getTransactionSummary() {
    const now = new Date();
    const startOfWeek = new Date(new Date().setDate(now.getDate() - 7));
    const startOfMonth = new Date(new Date().setMonth(now.getMonth() - 1));

    const sellerSummary = await Transaction.aggregate([
      { $lookup: { from: "orders", localField: "order", foreignField: "_id", as: "orderDetails" } },
      { $unwind: "$orderDetails" },
      { $match: { "orderDetails.orderStatus": OrderStatus.DELIVERED } },
      {
        $group: {
          _id: "$seller",
          total: { $sum: "$orderDetails.totalSellingPrice" },
          weekly: { $sum: { $cond: [{ $gte: ["$createdAt", startOfWeek] }, "$orderDetails.totalSellingPrice", 0] } },
          monthly: { $sum: { $cond: [{ $gte: ["$createdAt", startOfMonth] }, "$orderDetails.totalSellingPrice", 0] } }
        }
      },
      { $lookup: { from: "sellers", localField: "_id", foreignField: "_id", as: "seller" } },
      { $unwind: "$seller" },
      { $project: { sellerId: "$seller._id", sellerName: "$seller.sellerName", total: 1, weekly: 1, monthly: 1 } }
    ]);
    return { sellerSummary };
  }

  async createPayout(data) {
    const payout = new Payout({
      seller: data.seller,
      amount: data.amount,
      commissionAmount: data.commissionAmount || 0,
      subOrder: data.subOrder || null,
      transactions: data.transactions || [],
      status: "PENDING"
    });
    return await payout.save();
  }

  async updateStatus(id, status) {
    const payout = await Payout.findById(id);
    if (!payout) throw new Error("Payout not found");
    payout.status = status;
    if (status === "SUCCESS") payout.paidAt = new Date();
    await payout.save();
    return await payout.populate("seller", "sellerName mobile email bankDetails businessDetails");
  }

  async autoReleasePayout(subOrder) {
    const existing = await Payout.findOne({ subOrder: subOrder._id });
    if (existing) return existing;
    const payout = new Payout({
      seller: subOrder.seller,
      subOrder: subOrder._id,
      amount: subOrder.sellerAmount,
      commissionAmount: subOrder.commissionAmount,
      status: "PENDING"
    });
    return await payout.save();
  }
}

module.exports = new PayoutService();













