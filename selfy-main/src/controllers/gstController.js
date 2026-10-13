// // backend/controllers/gstController.js

// const Order = require('../models/Order');
// const Product = require('../models/Product');

// /**
//  * 📊 GST Report – Monthly / Quarterly
//  */
// exports.getGSTReport = async (req, res) => {
//   try {
//     const { startDate, endDate, type = 'monthly' } = req.query;

//     // ─── Date Range Setup ─────────────────────────────
//     let start, end;

//     if (startDate && endDate) {
//       start = new Date(startDate);
//       end = new Date(endDate);
//     } else {
//       end = new Date();
//       start = new Date();
//       start.setMonth(start.getMonth() - 1);
//     }

//     // ─── Orders Fetch करें ─────────────────────────────
//     const orders = await Order.find({
//       orderDate: { $gte: start, $lte: end },
//       orderStatus: { $ne: 'cancelled' },
//     })
//       .populate('user', 'name email')
//       .populate({
//         path: 'orderItems',
//         populate: {
//           path: 'product',
//           select: 'name sku hsnCode gstPercent sellingPrice mrpPrice',
//         },
//       });

//     // ─── GST Data बनाएँ ───────────────────────────────
//     const gstRecords = [];
//     let totalTaxableValue = 0;
//     let totalCGST = 0;
//     let totalSGST = 0;
//     let totalIGST = 0;
//     let totalTax = 0;
//     let totalInvoiceValue = 0;

//     for (const order of orders) {
//       const sellerState = 'Punjab';
//       const customerState =
//         order.shippingAddress?.state || 'Punjab';
//       const isInterState = sellerState !== customerState;

//       for (const item of order.orderItems || []) {
//         const product = item.product;
//         if (!product) continue;

//         const gstPercent = product.gstPercent || 18;
//         const itemPrice = product.sellingPrice || 0;
//         const quantity = item.quantity || 1;
//         const totalItemValue = itemPrice * quantity;

//         // GST Amount (Price Inclusive)
//         const taxableValue = totalItemValue / (1 + gstPercent / 100);
//         const gstAmount = totalItemValue - taxableValue;

//         let cgst = 0;
//         let sgst = 0;
//         let igst = 0;

//         if (isInterState) {
//           igst = gstAmount;
//         } else {
//           cgst = gstAmount / 2;
//           sgst = gstAmount / 2;
//         }

//         gstRecords.push({
//           orderId: order._id,
//           orderDate: order.orderDate,
//           invoiceNumber: `INV-${order._id
//             .toString()
//             .slice(-8)
//             .toUpperCase()}`,
//           invoiceDate: order.orderDate,
//           customerName:
//             order.user?.name || order.shippingAddress?.name || 'N/A',
//           customerEmail: order.user?.email || 'N/A',
//           customerState: customerState,
//           placeOfSupply: customerState,
//           productName: product.name,
//           sku: product.sku || 'N/A',
//           hsnCode: product.hsnCode || '0000',
//           quantity: quantity,
//           rate: itemPrice.toFixed(2),
//           taxableValue: taxableValue.toFixed(2),
//           gstPercent: gstPercent,
//           cgst: cgst.toFixed(2),
//           sgst: sgst.toFixed(2),
//           igst: igst.toFixed(2),
//           totalGst: gstAmount.toFixed(2),
//           invoiceValue: totalItemValue.toFixed(2),
//           isInterState: isInterState,
//         });

//         totalTaxableValue += taxableValue;
//         totalCGST += cgst;
//         totalSGST += sgst;
//         totalIGST += igst;
//         totalTax += gstAmount;
//         totalInvoiceValue += totalItemValue;
//       }
//     }

//     // ─── Monthly Summary ──────────────────────────────
//     const monthlySummary = {};
//     gstRecords.forEach((rec) => {
//       const month = new Date(rec.orderDate).toISOString().slice(0, 7);
//       if (!monthlySummary[month]) {
//         monthlySummary[month] = {
//           month,
//           taxableValue: 0,
//           cgst: 0,
//           sgst: 0,
//           igst: 0,
//           totalGst: 0,
//           invoiceValue: 0,
//           orderCount: 0,
//         };
//       }
//       monthlySummary[month].taxableValue += parseFloat(rec.taxableValue);
//       monthlySummary[month].cgst += parseFloat(rec.cgst);
//       monthlySummary[month].sgst += parseFloat(rec.sgst);
//       monthlySummary[month].igst += parseFloat(rec.igst);
//       monthlySummary[month].totalGst += parseFloat(rec.totalGst);
//       monthlySummary[month].invoiceValue += parseFloat(rec.invoiceValue);
//       monthlySummary[month].orderCount += 1;
//     });

//     const monthlyArray = Object.values(monthlySummary).sort((a, b) =>
//       a.month.localeCompare(b.month)
//     );

//     res.json({
//       success: true,
//       data: {
//         records: gstRecords,
//         monthlySummary: monthlyArray,
//         totals: {
//           totalRecords: gstRecords.length,
//           totalTaxableValue: totalTaxableValue.toFixed(2),
//           totalCGST: totalCGST.toFixed(2),
//           totalSGST: totalSGST.toFixed(2),
//           totalIGST: totalIGST.toFixed(2),
//           totalTax: totalTax.toFixed(2),
//           totalInvoiceValue: totalInvoiceValue.toFixed(2),
//         },
//         period: {
//           startDate: start.toISOString().split('T')[0],
//           endDate: end.toISOString().split('T')[0],
//           type,
//         },
//       },
//     });
//   } catch (error) {
//     console.error('GST Report Error:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * 📅 Monthly Summary Only
//  */
// exports.getMonthlyGSTSummary = async (req, res) => {
//   try {
//     const { year } = req.query;
//     const selectedYear = year
//       ? parseInt(year)
//       : new Date().getFullYear();

//     const start = new Date(`${selectedYear}-01-01`);
//     const end = new Date(`${selectedYear}-12-31`);

//     const orders = await Order.find({
//       orderDate: { $gte: start, $lte: end },
//       orderStatus: { $ne: 'cancelled' },
//     }).populate({
//       path: 'orderItems',
//       populate: {
//         path: 'product',
//         select: 'sellingPrice gstPercent',
//       },
//     });

//     const monthlyData = {};

//     orders.forEach((order) => {
//       const month = new Date(order.orderDate).toISOString().slice(0, 7);

//       if (!monthlyData[month]) {
//         monthlyData[month] = {
//           month,
//           taxableValue: 0,
//           gst: 0,
//           invoiceValue: 0,
//         };
//       }

//       (order.orderItems || []).forEach((item) => {
//         const product = item.product;
//         if (!product) return;

//         const totalItemValue =
//           (product.sellingPrice || 0) * (item.quantity || 1);
//         const gstPercent = product.gstPercent || 18;
//         const taxableValue = totalItemValue / (1 + gstPercent / 100);
//         const gstAmount = totalItemValue - taxableValue;

//         monthlyData[month].taxableValue += taxableValue;
//         monthlyData[month].gst += gstAmount;
//         monthlyData[month].invoiceValue += totalItemValue;
//       });
//     });

//     const result = Object.values(monthlyData).sort((a, b) =>
//       a.month.localeCompare(b.month)
//     );

//     res.json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };







// backend/controllers/gstController.js

const Order = require('../models/Order');
const Product = require('../models/Product');
const Seller = require('../models/Seller');

exports.getGSTReport = async (req, res) => {
  try {
    const { startDate, endDate, type = 'monthly', sellerId: qSellerId } = req.query;

    // ✅ LOGGED-IN SELLER ID
    const sellerId =
      req.seller?._id ||
      req.user?._id ||
      qSellerId ||
      req.headers['x-seller-id'];

    console.log('🔍 Seller ID:', sellerId);

    let start, end;
    if (startDate && endDate) {
      start = new Date(startDate);
      end = new Date(endDate);
    } else {
      end = new Date();
      start = new Date();
      start.setMonth(start.getMonth() - 1);
    }

    // ═══════════════════════════════════════════════════
    // ✅ LOGGED-IN SELLER की Profile
    // ═══════════════════════════════════════════════════
    let sellerProfile = null;

    try {
      if (sellerId) {
        sellerProfile = await Seller.findById(sellerId);
      }
      if (!sellerProfile && req.user?.email) {
        sellerProfile = await Seller.findOne({ email: req.user.email });
      }
    } catch (e) {
      console.log('Seller fetch error:', e.message);
    }

    const sellerData = {
      _id: sellerProfile?._id || null,
      name: sellerProfile?.sellerName || sellerProfile?.name || 'Seller',
      email: sellerProfile?.email || 'N/A',
      mobile: sellerProfile?.mobile || sellerProfile?.phone || 'N/A',
      businessName:
        sellerProfile?.businessDetails?.businessName ||
        sellerProfile?.businessName ||
        'Business Name',
      gstin:
        sellerProfile?.businessDetails?.gstin ||
        sellerProfile?.gstin ||
        'N/A',
      accountStatus: sellerProfile?.accountStatus || 'ACTIVE',
      panNumber:
        sellerProfile?.businessDetails?.panNumber ||
        sellerProfile?.panNumber ||
        'N/A',
      warehouseCode:
        sellerProfile?.warehouseCode ||
        sellerProfile?.businessDetails?.warehouseCode ||
        'N/A',
      pickupAddress: {
        address:
          sellerProfile?.businessDetails?.address ||
          sellerProfile?.pickupAddress?.address ||
          'N/A',
        city:
          sellerProfile?.businessDetails?.city ||
          sellerProfile?.pickupAddress?.city ||
          'N/A',
        state:
          sellerProfile?.businessDetails?.state ||
          sellerProfile?.pickupAddress?.state ||
          'N/A',
        stateCode:
          sellerProfile?.businessDetails?.stateCode ||
          sellerProfile?.pickupAddress?.stateCode ||
          '00',
        pinCode:
          sellerProfile?.businessDetails?.pinCode ||
          sellerProfile?.pickupAddress?.pinCode ||
          'N/A',
        mobile:
          sellerProfile?.businessDetails?.mobile ||
          sellerProfile?.pickupAddress?.mobile ||
          sellerProfile?.mobile ||
          'N/A',
        country: 'India',
      },
    };

    // ═══════════════════════════════════════════════════
    // ✅ ORDERS (सिर्फ LOGGED-IN SELLER के)
    // ═══════════════════════════════════════════════════
    const orderQuery = {
      orderDate: { $gte: start, $lte: end },
      orderStatus: { $ne: 'cancelled' },
    };

    if (sellerData._id) {
      orderQuery.seller = sellerData._id;
    }

    const orders = await Order.find(orderQuery)
      .populate('user', 'name email phone gstin')
      .populate('shippingAddress')
      .populate({
        path: 'orderItems',
        populate: {
          path: 'product',
          select:
            'name sku hsnCode gstPercent sellingPrice mrpPrice images category brand',
        },
      })
      .sort({ orderDate: -1 });

    console.log(`📦 Orders for this seller: ${orders.length}`);

    const gstOrders = [];
    let totalTaxableValue = 0;
    let totalCGST = 0;
    let totalSGST = 0;
    let totalIGST = 0;
    let totalTax = 0;
    let totalInvoiceValue = 0;

    const sellerState = sellerData.pickupAddress.state;
    const sellerStateCode = sellerData.pickupAddress.stateCode;

    for (const order of orders) {
      const customerState = order.shippingAddress?.state || sellerState;
      const isInterState =
        sellerState.toLowerCase() !== customerState.toLowerCase();

      const orderItems = [];
      let orderTaxableValue = 0;
      let orderCGST = 0;
      let orderSGST = 0;
      let orderIGST = 0;
      let orderTotalGST = 0;
      let orderInvoiceValue = 0;

      for (const item of order.orderItems || []) {
        const product = item.product;
        if (!product) continue;

        const gstPercent = product.gstPercent || 18;
        const itemPrice = product.sellingPrice || 0;
        const mrpPrice = product.mrpPrice || itemPrice;
        const quantity = item.quantity || 1;
        const totalItemValue = itemPrice * quantity;

        const taxableValue = totalItemValue / (1 + gstPercent / 100);
        const gstAmount = totalItemValue - taxableValue;

        let cgst = 0, sgst = 0, igst = 0;
        if (isInterState) {
          igst = gstAmount;
        } else {
          cgst = gstAmount / 2;
          sgst = gstAmount / 2;
        }

        orderItems.push({
          productName: product.name,
          sku: product.sku || 'N/A',
          asin: product._id.toString().slice(-10).toUpperCase(),
          hsnCode: product.hsnCode || '0000',
          category: product.category || 'N/A',
          brand: product.brand || 'N/A',
          image: product.images?.[0] || '',
          quantity: quantity,
          mrpPrice: mrpPrice.toFixed(2),
          sellingPrice: itemPrice.toFixed(2),
          rate: itemPrice.toFixed(2),
          discount: (mrpPrice - itemPrice).toFixed(2),
          discountPercent:
            mrpPrice > 0
              ? (((mrpPrice - itemPrice) / mrpPrice) * 100).toFixed(2)
              : '0',
          taxableValue: taxableValue.toFixed(2),
          gstPercent: gstPercent,
          cgst: cgst.toFixed(2),
          sgst: sgst.toFixed(2),
          igst: igst.toFixed(2),
          totalGst: gstAmount.toFixed(2),
          itemTotal: totalItemValue.toFixed(2),
          taxType: isInterState ? 'IGST' : 'CGST+SGST',
        });

        orderTaxableValue += taxableValue;
        orderCGST += cgst;
        orderSGST += sgst;
        orderIGST += igst;
        orderTotalGST += gstAmount;
        orderInvoiceValue += totalItemValue;
      }

      gstOrders.push({
        orderId: order._id,
        orderDate: order.orderDate,
        invoiceNumber: `INV-${order._id.toString().slice(-8).toUpperCase()}`,
        invoiceDate: order.orderDate,
        orderStatus: order.orderStatus,
        orderType: 'B2C',
        sellerName: sellerData.name,
        sellerEmail: sellerData.email,
        sellerMobile: sellerData.mobile,
        sellerBusinessName: sellerData.businessName,
        sellerGSTIN: sellerData.gstin,
        sellerPAN: sellerData.panNumber,
        sellerAccountStatus: sellerData.accountStatus,
        sellerWarehouseCode: sellerData.warehouseCode,
        sellerAddress: sellerData.pickupAddress.address,
        sellerCity: sellerData.pickupAddress.city,
        sellerState: sellerData.pickupAddress.state,
        sellerStateCode: sellerData.pickupAddress.stateCode,
        sellerPinCode: sellerData.pickupAddress.pinCode,
        customerName: order.user?.name || order.shippingAddress?.name || 'N/A',
        customerEmail: order.user?.email || 'N/A',
        customerPhone:
          order.user?.phone || order.shippingAddress?.phone || 'N/A',
        customerGSTIN: order.user?.gstin || '',
        customerAddress: order.shippingAddress
          ? `${order.shippingAddress.street || ''}, ${order.shippingAddress.city || ''}, ${order.shippingAddress.state || ''}`
          : 'N/A',
        customerCity: order.shippingAddress?.city || 'N/A',
        customerState: customerState,
        customerStateCode: order.shippingAddress?.stateCode || 'N/A',
        customerPinCode: order.shippingAddress?.pinCode || 'N/A',
        placeOfSupply: customerState,
        isInterState: isInterState,
        shipFromCity: sellerData.pickupAddress.city,
        shipFromState: sellerData.pickupAddress.state,
        shipFromCountry: 'India',
        shipFromPinCode: sellerData.pickupAddress.pinCode,
        shipToCity: order.shippingAddress?.city || 'N/A',
        shipToState: customerState,
        shipToCountry: 'India',
        shipToPinCode: order.shippingAddress?.pinCode || 'N/A',
        items: orderItems,
        totalItems: orderItems.length,
        totalTaxableValue: orderTaxableValue.toFixed(2),
        totalCGST: orderCGST.toFixed(2),
        totalSGST: orderSGST.toFixed(2),
        totalIGST: orderIGST.toFixed(2),
        totalGST: orderTotalGST.toFixed(2),
        totalInvoiceValue: orderInvoiceValue.toFixed(2),
        currency: 'INR',
        paymentMethod: order.paymentMethod || 'N/A',
        paymentStatus: order.paymentStatus || 'N/A',
        taxCollectionModel: 'MarketplaceFacilitator',
        taxResponsibleParty: 'Amazon',
        taxCalculatedDate: order.orderDate,
        postedDate: order.updatedAt || order.orderDate,
        fulfillmentType: 'FBA',
      });

      totalTaxableValue += orderTaxableValue;
      totalCGST += orderCGST;
      totalSGST += orderSGST;
      totalIGST += orderIGST;
      totalTax += orderTotalGST;
      totalInvoiceValue += orderInvoiceValue;
    }

    const monthlySummary = {};
    gstOrders.forEach((ord) => {
      const month = new Date(ord.orderDate).toISOString().slice(0, 7);
      if (!monthlySummary[month]) {
        monthlySummary[month] = {
          month,
          taxableValue: 0,
          cgst: 0,
          sgst: 0,
          igst: 0,
          totalGst: 0,
          invoiceValue: 0,
          orderCount: 0,
        };
      }
      monthlySummary[month].taxableValue += parseFloat(ord.totalTaxableValue);
      monthlySummary[month].cgst += parseFloat(ord.totalCGST);
      monthlySummary[month].sgst += parseFloat(ord.totalSGST);
      monthlySummary[month].igst += parseFloat(ord.totalIGST);
      monthlySummary[month].totalGst += parseFloat(ord.totalGST);
      monthlySummary[month].invoiceValue += parseFloat(ord.totalInvoiceValue);
      monthlySummary[month].orderCount += 1;
    });

    const monthlyArray = Object.values(monthlySummary).sort((a, b) =>
      a.month.localeCompare(b.month)
    );

    res.json({
      success: true,
      data: {
        orders: gstOrders,
        monthlySummary: monthlyArray,
        totals: {
          totalOrders: gstOrders.length,
          totalItems: gstOrders.reduce((s, o) => s + o.items.length, 0),
          totalTaxableValue: totalTaxableValue.toFixed(2),
          totalCGST: totalCGST.toFixed(2),
          totalSGST: totalSGST.toFixed(2),
          totalIGST: totalIGST.toFixed(2),
          totalTax: totalTax.toFixed(2),
          totalInvoiceValue: totalInvoiceValue.toFixed(2),
        },
        sellerInfo: sellerData,
        period: {
          startDate: start.toISOString().split('T')[0],
          endDate: end.toISOString().split('T')[0],
          type,
        },
      },
    });
  } catch (error) {
    console.error('GST Report Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMonthlyGSTSummary = async (req, res) => {
  try {
    const { year } = req.query;
    const sellerId =
      req.seller?._id || req.user?._id || req.query.sellerId;
    const selectedYear = year ? parseInt(year) : new Date().getFullYear();

    const start = new Date(`${selectedYear}-01-01`);
    const end = new Date(`${selectedYear}-12-31`);

    const query = {
      orderDate: { $gte: start, $lte: end },
      orderStatus: { $ne: 'cancelled' },
    };
    if (sellerId) query.seller = sellerId;

    const orders = await Order.find(query).populate({
      path: 'orderItems',
      populate: { path: 'product', select: 'sellingPrice gstPercent' },
    });

    const monthlyData = {};

    orders.forEach((order) => {
      const month = new Date(order.orderDate).toISOString().slice(0, 7);
      if (!monthlyData[month]) {
        monthlyData[month] = {
          month,
          taxableValue: 0,
          gst: 0,
          invoiceValue: 0,
        };
      }

      (order.orderItems || []).forEach((item) => {
        const product = item.product;
        if (!product) return;
        const totalItemValue =
          (product.sellingPrice || 0) * (item.quantity || 1);
        const gstPercent = product.gstPercent || 18;
        const taxableValue = totalItemValue / (1 + gstPercent / 100);
        const gstAmount = totalItemValue - taxableValue;

        monthlyData[month].taxableValue += taxableValue;
        monthlyData[month].gst += gstAmount;
        monthlyData[month].invoiceValue += totalItemValue;
      });
    });

    const result = Object.values(monthlyData).sort((a, b) =>
      a.month.localeCompare(b.month)
    );

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};