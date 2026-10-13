// const Order = require('../models/Order');
// const Product = require('../models/Product');

// // ─── 1. DASHBOARD KPI ──────────────────────────────────────────
// exports.getDashboardStats = async (req, res) => {
//     try {
//         const totalProducts = await Product.countDocuments();
//         // Cancelled Orders को हटाकर गिनती करें
//         const totalOrders = await Order.countDocuments({ orderStatus: { $ne: 'cancelled' } });

//         const revenueData = await Order.aggregate([
//             { $match: { orderStatus: { $ne: 'cancelled' } } },
//             { $group: { _id: null, total: { $sum: "$totalSellingPrice" } } }
//         ]);
//         const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

//         // Low Stock (मान लिया 10 से कम = Low Stock)
//         const lowStockCount = await Product.countDocuments({ quantity: { $lt: 10 } });

//         res.json({
//             success: true,
//             data: { totalProducts, totalOrders, totalRevenue, lowStockCount }
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ─── 2. SALES REPORT (Date Range Filter) ──────────────────────
// exports.getSalesReport = async (req, res) => {
//     try {
//         const { startDate, endDate } = req.query;
//         let matchCondition = { orderStatus: { $ne: 'cancelled' } };

//         if (startDate && endDate) {
//             matchCondition.orderDate = {
//                 $gte: new Date(startDate),
//                 $lte: new Date(endDate)
//             };
//         }

//         const result = await Order.aggregate([
//             { $match: matchCondition },
//             {
//                 $group: {
//                     _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
//                     totalSales: { $sum: "$totalSellingPrice" },
//                     orderCount: { $sum: 1 }
//                 }
//             },
//             { $sort: { _id: 1 } }
//         ]);

//         res.json({ success: true, data: result });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ─── 3. INVENTORY REPORT (Products + Category Summary) ────────
// exports.getInventoryReport = async (req, res) => {
//     try {
//         // सभी Products (Stock Report Table के लिए)
//         const products = await Product.find({}, 'name sku category price quantity');

//         // Category-wise Summary (Charts के लिए)
//         const categorySummary = await Product.aggregate([
//             {
//                 $group: {
//                     _id: "$category",
//                     totalStock: { $sum: "$quantity" },
//                     totalValue: { $sum: { $multiply: ["$price", "$quantity"] } }
//                 }
//             },
//             { $sort: { _id: 1 } }
//         ]);

//         res.json({
//             success: true,
//             data: { products, categorySummary }
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };








// backend/controllers/reportController.js

const Order = require('../models/Order');
const Product = require('../models/Product');

// ─── 1. Dashboard KPI ──────────────────────────────────────────
exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments({
      orderStatus: { $ne: 'cancelled' },
    });

    const revenueData = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalSellingPrice' } } },
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    const lowStockCount = await Product.countDocuments({
      quantity: { $lt: 10 },
    });

    res.json({
      success: true,
      data: { totalProducts, totalOrders, totalRevenue, lowStockCount },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── 2. Sales Report ────────────────────────────────────────────
exports.getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let matchCondition = { orderStatus: { $ne: 'cancelled' } };

    if (startDate && endDate) {
      matchCondition.orderDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const result = await Order.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$orderDate' } },
          totalSales: { $sum: '$totalSellingPrice' },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── 3. Inventory Report (FIXED) ────────────────────────────────
exports.getInventoryReport = async (req, res) => {
  try {
    // ✅ sellingPrice use करें (price नहीं)
    const productsRaw = await Product.find(
      {},
      'name sku category sellingPrice mrpPrice quantity'
    );

    // ✅ sellingPrice को price में Convert कर दो
    // ताकि Frontend में p.price काम करे
    const products = productsRaw.map((p) => ({
      _id: p._id,
      name: p.name,
      sku: p.sku,
      category: p.category,
      price: p.sellingPrice, // ← यहाँ Convert किया
      sellingPrice: p.sellingPrice,
      mrpPrice: p.mrpPrice,
      quantity: p.quantity,
    }));

    // ✅ Category Summary में भी sellingPrice use करें
    const categorySummary = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          totalStock: { $sum: '$quantity' },
          totalValue: {
            $sum: { $multiply: ['$sellingPrice', '$quantity'] },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: { products, categorySummary },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};