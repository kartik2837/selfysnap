// require("dotenv").config();
// const express = require('express');
// const connectDB = require('./config/db.js');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const app = express();
// app.use(cors());

// app.get('/', (req, res) => {
//   res.send({ message: 'Welcome To Selfy Snap Backend System!' });
// });

// // bodyParser with rawBody capture for webhook signature verification
// // Using the verify option reads the stream ONCE — avoids "stream is not readable" error
// app.use(bodyParser.json({
//   verify: (req, res, buf) => {
//     req.rawBody = buf.toString('utf8');
//   }
// }));

// const productRouters = require("./routers/productRoutes.js")
// const authRouters = require("./routers/authRouters.js")
// const adminRouters = require("./routers/adminRouters.js")
// const cartRouters = require("./routers/cartRoutes.js")
// const revenueRouters = require("./routers/revenueRoutes.js")
// const sellerOrderRouters = require("./routers/sellerOrderRoutes.js")
// const sellerProductRouters = require("./routers/sellerProductRoutes.js")
// const sellerReportRouters = require("./routers/sellerReportRoutes.js")
// const sellerRouters = require("./routers/sellerRoutes.js")
// const transactionRouters = require("./routers/transactionRoutes.js")
// const userRouters = require("./routers/userRoutes.js")
// const wishlistRouters = require("./routers/wishlistRoutes.js")
// const orderRouters = require("./routers/orderRoutes.js")
// const paymentRoutres = require("./routers/paymentRoutes.js")
// const dealRoutres = require("./routers/dealRoutes.js")
// const couponRouters = require("./routers/couponRoutes.js")
// const homeRouters = require("./routers/homeCategoryRoutes.js")
// const chatboatRouters = require("./routers/chatboatRoutes.js")
// const reviewRouters = require("./routers/reviewRouters.js")
// const mainCategoryRoutes = require("./routers/mainCategoryRoutes.js")
// const bannerRoutes = require("./routers/bannerRouters.js")
// const footerRoutes = require("./routers/footerRoutes.js")
// const homeSectionRoutes = require("./routers/homeSectionRoutes.js")
// const payoutRoutes = require("./routers/payoutRoutes.js");
// const reportRoutes = require("./routers/reportRoutes.js")
// const gstRoutes = require('./routers/gstRoutes.js');

// const deliveryPartnerRoutes = require("./routers/deliveryPartnerRoutes.js");
// const categoriesRoutes = require("./routers/categoryRoutes.js")
// const addressRouters = require("./routers/addressRouters.js")
// const webhookRoutes = require("./routers/webhookRoutes.js");
// const returnRoutes = require("./routers/returnRoutes.js");
// const notificationRoutes = require('./routers/notificationRoutes');
// const offerRoutes = require('./routers/offerRoutes');
// const bannersRoutes = require("./routers/bannersRoutes");
// const deliverySettingsRoutes = require( "./routers/deliverySettingsRoutes.js"); 


// app.use('/auth', authRouters);
// app.use("/api/users", userRouters)
// app.use("/sellers", sellerRouters)
// app.use("/products", productRouters)
// app.use("/api/sellers/product", sellerProductRouters)
// app.use("/api/cart", cartRouters);
// app.use("/api/orders", orderRouters);
// app.use("/api/seller/orders", sellerOrderRouters)
// app.use("/api/transactions", transactionRouters)
// app.use("/api/wishlist", wishlistRouters)
// app.use("/api/sellers/report", sellerReportRouters)
// app.use('/api/gst', gstRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/offers', offerRoutes);
// app.use("/api/banners", bannersRoutes);
// app.use("/api/delivery-settings", deliverySettingsRoutes); 



// app.use("/api/payment", paymentRoutres)
// app.use("/home", homeRouters)
// app.use("/admin/deals", dealRoutres)
// app.use("/admin", adminRouters)
// app.use("/api/admin/main-categories", mainCategoryRoutes);
// app.use("/api/admin/banners", bannerRoutes);
// app.use("/api/admin", footerRoutes);
// app.use("/api/admin/home-sections", homeSectionRoutes);

// app.use("/payouts", payoutRoutes);

// app.use("/api/delivery-partners", deliveryPartnerRoutes);
// app.use("/api/admin/categories", categoriesRoutes);
// app.use("/api/address", addressRouters);


// app.use("/api/coupons", couponRouters)
// app.use("/api/sellers/revenue", revenueRouters)

// app.use("/api/reviews", reviewRouters)

// // chatboat
// app.use("/chat", chatboatRouters)

// // Delivery One Webhook (no auth — signature verified internally)
// app.use("/api/webhooks", webhookRoutes);

// // Returns management
// app.use("/api/returns", returnRoutes);
// app.use('/api/reports', reportRoutes);

// //popup 


// const port = process.env.PORT || 8080;
// app.listen(port, async () => {
//   await connectDB()
//   console.log(`Server is running on port ${port}`);
// });



















// require("dotenv").config();
// const express = require("express");
// const path = require("path");                     // 🆕 ADDED
// const connectDB = require("./config/db.js");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// app.get("/", (req, res) => {
//   res.send({ message: "Welcome To Selfy Snap Backend System!" });
// });

// // bodyParser with rawBody capture for webhook signature verification
// app.use(
//   bodyParser.json({
//     verify: (req, res, buf) => {
//       req.rawBody = buf.toString("utf8");
//     },
//   })
// );

// /* ═══════════════════════════════════════════════
//    🔥 SERVE STATIC FILES (UPLOADS)
//    ═══════════════════════════════════════════════ */
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// console.log("📁 Static files served from:", path.join(__dirname, "uploads"));

// const productRouters = require("./routers/productRoutes.js");
// const authRouters = require("./routers/authRouters.js");
// const adminRouters = require("./routers/adminRouters.js");
// const cartRouters = require("./routers/cartRoutes.js");
// const revenueRouters = require("./routers/revenueRoutes.js");
// const sellerOrderRouters = require("./routers/sellerOrderRoutes.js");
// const sellerProductRouters = require("./routers/sellerProductRoutes.js");
// const sellerReportRouters = require("./routers/sellerReportRoutes.js");
// const sellerRouters = require("./routers/sellerRoutes.js");
// const transactionRouters = require("./routers/transactionRoutes.js");
// const userRouters = require("./routers/userRoutes.js");
// const wishlistRouters = require("./routers/wishlistRoutes.js");
// const orderRouters = require("./routers/orderRoutes.js");
// const paymentRoutres = require("./routers/paymentRoutes.js");
// const dealRoutres = require("./routers/dealRoutes.js");
// const couponRouters = require("./routers/couponRoutes.js");
// const homeRouters = require("./routers/homeCategoryRoutes.js");
// const chatboatRouters = require("./routers/chatboatRoutes.js");
// const reviewRouters = require("./routers/reviewRouters.js");
// const mainCategoryRoutes = require("./routers/mainCategoryRoutes.js");
// const bannerRoutes = require("./routers/bannerRouters.js");
// const footerRoutes = require("./routers/footerRoutes.js");
// const homeSectionRoutes = require("./routers/homeSectionRoutes.js");
// const payoutRoutes = require("./routers/payoutRoutes.js");
// const reportRoutes = require("./routers/reportRoutes.js");
// const gstRoutes = require("./routers/gstRoutes.js");


// const deliveryPartnerRoutes = require("./routers/deliveryPartnerRoutes.js");
// const categoriesRoutes = require("./routers/categoryRoutes.js");
// const addressRouters = require("./routers/addressRouters.js");
// const webhookRoutes = require("./routers/webhookRoutes.js");
// const returnRoutes = require("./routers/returnRoutes.js");
// const notificationRoutes = require("./routers/notificationRoutes");
// const offerRoutes = require("./routers/offerRoutes");
// const bannersRoutes = require("./routers/bannersRoutes");
// const deliverySettingsRoutes = require("./routers/deliverySettingsRoutes.js");
// const brandRouters = require('./routers/brandRoutes.js');



// app.use("/auth", authRouters);
// app.use("/api/users", userRouters);
// app.use("/sellers", sellerRouters);
// app.use("/products", productRouters);
// app.use("/api/sellers/product", sellerProductRouters);
// app.use("/api/cart", cartRouters);
// app.use("/api/orders", orderRouters);
// app.use("/api/seller/orders", sellerOrderRouters);
// app.use("/api/transactions", transactionRouters);
// app.use("/api/wishlist", wishlistRouters);
// app.use("/api/sellers/report", sellerReportRouters);
// app.use("/api/gst", gstRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/offers", offerRoutes);
// app.use("/api/banners", bannersRoutes);
// app.use("/api/delivery-settings", deliverySettingsRoutes);
// app.use('/api/brands', brandRouters);




// app.use("/api/payment", paymentRoutres);
// app.use("/home", homeRouters);
// app.use("/admin/deals", dealRoutres);
// app.use("/admin", adminRouters);
// app.use("/api/admin/main-categories", mainCategoryRoutes);
// app.use("/api/admin/banners", bannerRoutes);
// app.use("/api/admin", footerRoutes);
// app.use("/api/admin/home-sections", homeSectionRoutes);

// app.use("/payouts", payoutRoutes);

// app.use("/api/delivery-partners", deliveryPartnerRoutes);
// app.use("/api/admin/categories", categoriesRoutes);
// app.use("/api/address", addressRouters);

// app.use("/api/coupons", couponRouters);
// app.use("/api/sellers/revenue", revenueRouters);

// app.use("/api/reviews", reviewRouters);

// app.use("/chat", chatboatRouters);

// app.use("/api/webhooks", webhookRoutes);

// app.use("/api/returns", returnRoutes);
// app.use("/api/reports", reportRoutes);

// const port = process.env.PORT || 8080;
// app.listen(port, async () => {
//   await connectDB();
//   console.log(`Server is running on port ${port}`);
//   console.log(`📁 Files: http://localhost:${port}/uploads/`);
// });






// require("dotenv").config();
// const express = require("express");
// const http = require("http");                       // 🔥 NEW
// const { Server } = require("socket.io");            // 🔥 NEW
// const path = require("path");
// const connectDB = require("./config/db.js");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const server = http.createServer(app);              // 🔥 NEW

// app.use(cors({
//   origin: process.env.CLIENT_URL || "http://localhost:5173",
//   credentials: true,
// }));

// app.get("/", (req, res) => {
//   res.send({ message: "Welcome To Selfy Snap Backend System!" });
// });

// // bodyParser with rawBody capture for webhook signature verification
// app.use(
//   bodyParser.json({
//     verify: (req, res, buf) => {
//       req.rawBody = buf.toString("utf8");
//     },
//   })
// );

// /* ═══════════════════════════════════════════════
//    🔥 SOCKET.IO SETUP
//    ═══════════════════════════════════════════════ */
// const io = new Server(server, {
//   cors: {
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST"],
//   },
//   transports: ["websocket", "polling"],
// });

// global.io = io;

// io.on("connection", (socket) => {
//   console.log("🔌 Socket connected:", socket.id);

//   socket.on("join_admin", (adminId) => {
//     socket.join("admin_room");
//     console.log(`👑 Admin ${adminId} joined admin_room`);
//   });

//   socket.on("join_seller", (sellerId) => {
//     socket.join(`seller_${sellerId}`);
//     console.log(`🛍️ Seller ${sellerId} joined seller_${sellerId}`);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔌 Socket disconnected:", socket.id);
//   });
// });

// /* ═══════════════════════════════════════════════
//    🔥 SERVE STATIC FILES (UPLOADS)
//    ═══════════════════════════════════════════════ */
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// console.log("📁 Static files served from:", path.join(__dirname, "uploads"));

// /* ═══════════════════════════════════════════════
//    ROUTES IMPORT
//    ═══════════════════════════════════════════════ */
// const productRouters = require("./routers/productRoutes.js");
// const authRouters = require("./routers/authRouters.js");
// const adminRouters = require("./routers/adminRouters.js");
// const cartRouters = require("./routers/cartRoutes.js");
// const revenueRouters = require("./routers/revenueRoutes.js");
// const sellerOrderRouters = require("./routers/sellerOrderRoutes.js");
// const sellerProductRouters = require("./routers/sellerProductRoutes.js");
// const sellerReportRouters = require("./routers/sellerReportRoutes.js");
// const sellerRouters = require("./routers/sellerRoutes.js");
// const transactionRouters = require("./routers/transactionRoutes.js");
// const userRouters = require("./routers/userRoutes.js");
// const wishlistRouters = require("./routers/wishlistRoutes.js");
// const orderRouters = require("./routers/orderRoutes.js");
// const paymentRoutres = require("./routers/paymentRoutes.js");
// const dealRoutres = require("./routers/dealRoutes.js");
// const couponRouters = require("./routers/couponRoutes.js");
// const homeRouters = require("./routers/homeCategoryRoutes.js");
// const chatboatRouters = require("./routers/chatboatRoutes.js");
// const reviewRouters = require("./routers/reviewRouters.js");
// const mainCategoryRoutes = require("./routers/mainCategoryRoutes.js");
// const bannerRoutes = require("./routers/bannerRouters.js");
// const footerRoutes = require("./routers/footerRoutes.js");
// const homeSectionRoutes = require("./routers/homeSectionRoutes.js");
// const payoutRoutes = require("./routers/payoutRoutes.js");
// const reportRoutes = require("./routers/reportRoutes.js");
// const gstRoutes = require("./routers/gstRoutes.js");

// const deliveryPartnerRoutes = require("./routers/deliveryPartnerRoutes.js");
// const categoriesRoutes = require("./routers/categoryRoutes.js");
// const addressRouters = require("./routers/addressRouters.js");
// const webhookRoutes = require("./routers/webhookRoutes.js");
// const returnRoutes = require("./routers/returnRoutes.js");
// const notificationRoutes = require("./routers/notificationRoutes");
// const offerRoutes = require("./routers/offerRoutes");
// const bannersRoutes = require("./routers/bannersRoutes");
// const deliverySettingsRoutes = require("./routers/deliverySettingsRoutes.js");
// const brandRouters = require("./routers/brandRoutes.js");

// /* 🔥 NEW: Support Call Route */
// const supportCallRouters = require("./routers/supportCallRoutes.js");
// const serviceRouters = require("./routers/serviceRoutes.js");
// const serviceRequestRouters = require("./routers/serviceRequestRoutes.js");
// const twilioRoutes = require("./routers/twilioRoutes");

// /* ═══════════════════════════════════════════════
//    ROUTES REGISTER
//    ═══════════════════════════════════════════════ */
// app.use("/auth", authRouters);
// app.use("/api/users", userRouters);
// app.use("/sellers", sellerRouters);
// app.use("/products", productRouters);
// app.use("/api/sellers/product", sellerProductRouters);
// app.use("/api/cart", cartRouters);
// app.use("/api/orders", orderRouters);
// app.use("/api/seller/orders", sellerOrderRouters);
// app.use("/api/transactions", transactionRouters);
// app.use("/api/wishlist", wishlistRouters);
// app.use("/api/sellers/report", sellerReportRouters);
// app.use("/api/gst", gstRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/offers", offerRoutes);
// app.use("/api/banners", bannersRoutes);
// app.use("/api/delivery-settings", deliverySettingsRoutes);
// app.use("/api/brands", brandRouters);

// /* 🔥 NEW: Support Calls API */
// app.use("/api/support-calls", supportCallRouters);
// app.use("/api/services", serviceRouters);
// app.use("/api/service-requests", serviceRequestRouters);
// app.use("/api/twilio", twilioRoutes);

// app.use("/api/payment", paymentRoutres);
// app.use("/home", homeRouters);
// app.use("/admin/deals", dealRoutres);
// app.use("/admin", adminRouters);
// app.use("/api/admin/main-categories", mainCategoryRoutes);
// app.use("/api/admin/banners", bannerRoutes);
// app.use("/api/admin", footerRoutes);
// app.use("/api/admin/home-sections", homeSectionRoutes);

// app.use("/payouts", payoutRoutes);

// app.use("/api/delivery-partners", deliveryPartnerRoutes);
// app.use("/api/admin/categories", categoriesRoutes);
// app.use("/api/address", addressRouters);

// app.use("/api/coupons", couponRouters);
// app.use("/api/sellers/revenue", revenueRouters);

// app.use("/api/reviews", reviewRouters);

// app.use("/chat", chatboatRouters);

// app.use("/api/webhooks", webhookRoutes);

// app.use("/api/returns", returnRoutes);
// app.use("/api/reports", reportRoutes);

// /* ═══════════════════════════════════════════════
//    🔥 SERVER START (Socket.io + MongoDB)
//    ═══════════════════════════════════════════════ */
// const port = process.env.PORT || 8080;
// server.listen(port, async () => {                    // 🔥 server.listen (not app.listen)
//   await connectDB();
//   console.log(`Server is running on port ${port}`);
//   console.log(`📁 Files: http://localhost:${port}/uploads/`);
//   console.log(`🔌 Socket.io ready for connections`);
// });









// require("dotenv").config();
// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const path = require("path");
// const connectDB = require("./config/db.js");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const server = http.createServer(app);

// app.use(cors({
//   origin: process.env.CLIENT_URL || "http://localhost:5173",
//   credentials: true,
// }));

// app.get("/", (req, res) => {
//   res.send({ message: "Welcome To Selfy Snap Backend System!" });
// });

// app.use(
//   bodyParser.json({
//     verify: (req, res, buf) => {
//       req.rawBody = buf.toString("utf8");
//     },
//   })
// );

// const io = new Server(server, {
//   cors: {
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST"],
//   },
//   transports: ["websocket", "polling"],
// });

// global.io = io;

// io.on("connection", (socket) => {
//   console.log("🔌 Socket connected:", socket.id);

//   socket.on("join_admin", (adminId) => {
//     socket.join("admin_room");
//     console.log(`👑 Admin ${adminId} joined admin_room`);
//   });

//   socket.on("join_seller", (sellerId) => {
//     socket.join(`seller_${sellerId}`);
//     console.log(`🛍️ Seller ${sellerId} joined seller_${sellerId}`);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔌 Socket disconnected:", socket.id);
//   });
// });

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// console.log("📁 Static files served from:", path.join(__dirname, "uploads"));

// const productRouters = require("./routers/productRoutes.js");
// const authRouters = require("./routers/authRouters.js");
// const adminRouters = require("./routers/adminRouters.js");
// const cartRouters = require("./routers/cartRoutes.js");
// const revenueRouters = require("./routers/revenueRoutes.js");
// const sellerOrderRouters = require("./routers/sellerOrderRoutes.js");
// const sellerProductRouters = require("./routers/sellerProductRoutes.js");
// const sellerReportRouters = require("./routers/sellerReportRoutes.js");
// const sellerRouters = require("./routers/sellerRoutes.js");
// const transactionRouters = require("./routers/transactionRoutes.js");
// const userRouters = require("./routers/userRoutes.js");
// const wishlistRouters = require("./routers/wishlistRoutes.js");
// const orderRouters = require("./routers/orderRoutes.js");
// const paymentRoutres = require("./routers/paymentRoutes.js");
// const dealRoutres = require("./routers/dealRoutes.js");
// const couponRouters = require("./routers/couponRoutes.js");
// const homeRouters = require("./routers/homeCategoryRoutes.js");
// const chatboatRouters = require("./routers/chatboatRoutes.js");
// const reviewRouters = require("./routers/reviewRouters.js");
// const mainCategoryRoutes = require("./routers/mainCategoryRoutes.js");
// const bannerRoutes = require("./routers/bannerRouters.js");
// const footerRoutes = require("./routers/footerRoutes.js");
// const homeSectionRoutes = require("./routers/homeSectionRoutes.js");
// const payoutRoutes = require("./routers/payoutRoutes.js");
// const reportRoutes = require("./routers/reportRoutes.js");
// const gstRoutes = require("./routers/gstRoutes.js");

// const deliveryPartnerRoutes = require("./routers/deliveryPartnerRoutes.js");
// const categoriesRoutes = require("./routers/categoryRoutes.js");
// const addressRouters = require("./routers/addressRouters.js");
// const webhookRoutes = require("./routers/webhookRoutes.js");
// const returnRoutes = require("./routers/returnRoutes.js");
// const notificationRoutes = require("./routers/notificationRoutes");
// const offerRoutes = require("./routers/offerRoutes");
// const bannersRoutes = require("./routers/bannersRoutes");
// const deliverySettingsRoutes = require("./routers/deliverySettingsRoutes.js");
// const brandRouters = require("./routers/brandRoutes.js");

// const supportCallRouters = require("./routers/supportCallRoutes.js");
// const serviceRouters = require("./routers/serviceRoutes.js");
// const serviceRequestRouters = require("./routers/serviceRequestRoutes.js");
// const twilioRoutes = require("./routers/twilioRoutes");
// const customerTicketRoutes = require('./routers/customerTicketRoutes');
// const adminTicketRoutes = require('./routers/adminTicketRoutes');

// app.use("/auth", authRouters);
// app.use("/api/users", userRouters);
// app.use("/sellers", sellerRouters);
// app.use("/products", productRouters);
// app.use("/api/sellers/product", sellerProductRouters);
// app.use("/api/cart", cartRouters);
// app.use("/api/orders", orderRouters);
// app.use("/api/seller/orders", sellerOrderRouters);
// app.use("/api/transactions", transactionRouters);
// app.use("/api/wishlist", wishlistRouters);
// app.use("/api/sellers/report", sellerReportRouters);
// app.use("/api/gst", gstRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/offers", offerRoutes);
// app.use("/api/banners", bannersRoutes);
// app.use("/api/delivery-settings", deliverySettingsRoutes);
// app.use("/api/brands", brandRouters);

// app.use("/api/support-calls", supportCallRouters);
// app.use("/api/services", serviceRouters);
// app.use("/api/service-requests", serviceRequestRouters);
// app.use("/api/twilio", twilioRoutes);
// app.use('/api/customer/tickets', customerTicketRoutes);
// app.use('/api/admin/tickets', adminTicketRoutes);

// app.use("/api/payment", paymentRoutres);
// app.use("/home", homeRouters);
// app.use("/admin/deals", dealRoutres);
// app.use("/admin", adminRouters);
// app.use("/api/admin/main-categories", mainCategoryRoutes);
// app.use("/api/admin/banners", bannerRoutes);
// app.use("/api/admin", footerRoutes);
// app.use("/api/admin/home-sections", homeSectionRoutes);

// app.use("/payouts", payoutRoutes);

// app.use("/api/delivery-partners", deliveryPartnerRoutes);
// app.use("/api/admin/categories", categoriesRoutes);
// app.use("/api/address", addressRouters);

// app.use("/api/coupons", couponRouters);
// app.use("/api/sellers/revenue", revenueRouters);

// app.use("/api/reviews", reviewRouters);

// app.use("/chat", chatboatRouters);

// app.use("/api/webhooks", webhookRoutes);

// app.use("/api/returns", returnRoutes);
// app.use("/api/reports", reportRoutes);

// const port = process.env.PORT || 8080;
// server.listen(port, async () => {
//   await connectDB();
//   console.log(`Server is running on port ${port}`);
//   console.log(`📁 Files: http://localhost:${port}/uploads/`);
//   console.log(`🔌 Socket.io ready for connections`);

//   // ⬇️ CRON JOB START
//   require('./jobs/syncTracking');
//   console.log(`⏰ Tracking sync cron started`);
// });














// require("dotenv").config();
// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const path = require("path");
// const connectDB = require("./config/db.js");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const compression = require("compression");
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
// const morgan = require("morgan");

// const app = express();
// const server = http.createServer(app);

// /* ═══════════════ MIDDLEWARE ═══════════════ */

// // 1. Compression
// app.use(compression({
//   level: 6,
//   threshold: 1024,
// }));

// // 2. Helmet
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: "cross-origin" },
//   contentSecurityPolicy: false,
// }));

// // 3. Morgan (dev only)
// if (process.env.NODE_ENV !== "production") {
//   app.use(morgan("dev"));
// }

// // 4. Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 1000,
//   message: "Too many requests, please try again later.",
//   standardHeaders: true,
//   legacyHeaders: false,
// });
// app.use("/api", limiter);

// // 5. CORS
// app.use(cors({
//   origin: process.env.CLIENT_URL || "http://localhost:5173",
//   credentials: true,
// }));

// // 6. Slow request logger
// app.use((req, res, next) => {
//   const start = Date.now();
//   res.on("finish", () => {
//     const duration = Date.now() - start;
//     if (duration > 500) {
//       console.log(`🐢 SLOW: ${req.method} ${req.originalUrl} — ${duration}ms`);
//     }
//   });
//   next();
// });

// // 7. Body parser
// app.use(
//   bodyParser.json({
//     limit: "10mb",
//     verify: (req, res, buf) => {
//       req.rawBody = buf.toString("utf8");
//     },
//   })
// );

// app.get("/", (req, res) => {
//   res.send({ message: "Welcome To Selfy Snap Backend System!" });
// });

// /* ═══════════════ SOCKET.IO ═══════════════ */
// const io = new Server(server, {
//   cors: {
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST"],
//   },
//   transports: ["websocket", "polling"],
//   pingTimeout: 60000,
//   pingInterval: 25000,
//   perMessageDeflate: false,
// });

// global.io = io;

// io.on("connection", (socket) => {
//   console.log("🔌 Socket connected:", socket.id);

//   socket.on("join_admin", (adminId) => {
//     socket.join("admin_room");
//     console.log(`👑 Admin ${adminId} joined admin_room`);
//   });

//   socket.on("join_seller", (sellerId) => {
//     socket.join(`seller_${sellerId}`);
//     console.log(`🛍️ Seller ${sellerId} joined seller_${sellerId}`);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔌 Socket disconnected:", socket.id);
//   });
// });

// /* ═══════════════ STATIC FILES ═══════════════ */
// app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
//   maxAge: "7d",
//   etag: true,
//   lastModified: true,
//   immutable: true,
// }));
// console.log("📁 Static files served from:", path.join(__dirname, "uploads"));

// /* ═══════════════ ROUTES ═══════════════ */
// const productRouters = require("./routers/productRoutes.js");
// const authRouters = require("./routers/authRouters.js");
// const adminRouters = require("./routers/adminRouters.js");
// const cartRouters = require("./routers/cartRoutes.js");
// const revenueRouters = require("./routers/revenueRoutes.js");
// const sellerOrderRouters = require("./routers/sellerOrderRoutes.js");
// const sellerProductRouters = require("./routers/sellerProductRoutes.js");
// const sellerReportRouters = require("./routers/sellerReportRoutes.js");
// const sellerRouters = require("./routers/sellerRoutes.js");
// const transactionRouters = require("./routers/transactionRoutes.js");
// const userRouters = require("./routers/userRoutes.js");
// const wishlistRouters = require("./routers/wishlistRoutes.js");
// const orderRouters = require("./routers/orderRoutes.js");
// const paymentRoutres = require("./routers/paymentRoutes.js");
// const dealRoutres = require("./routers/dealRoutes.js");
// const couponRouters = require("./routers/couponRoutes.js");
// const homeRouters = require("./routers/homeCategoryRoutes.js");
// const chatboatRouters = require("./routers/chatboatRoutes.js");
// const reviewRouters = require("./routers/reviewRouters.js");
// const mainCategoryRoutes = require("./routers/mainCategoryRoutes.js");
// const bannerRoutes = require("./routers/bannerRouters.js");
// const footerRoutes = require("./routers/footerRoutes.js");
// const homeSectionRoutes = require("./routers/homeSectionRoutes.js");
// const payoutRoutes = require("./routers/payoutRoutes.js");
// const reportRoutes = require("./routers/reportRoutes.js");
// const gstRoutes = require("./routers/gstRoutes.js");
// const deliveryPartnerRoutes = require("./routers/deliveryPartnerRoutes.js");
// const categoriesRoutes = require("./routers/categoryRoutes.js");
// const addressRouters = require("./routers/addressRouters.js");
// const webhookRoutes = require("./routers/webhookRoutes.js");
// const returnRoutes = require("./routers/returnRoutes.js");
// const notificationRoutes = require("./routers/notificationRoutes");
// const offerRoutes = require("./routers/offerRoutes");
// const bannersRoutes = require("./routers/bannersRoutes");
// const deliverySettingsRoutes = require("./routers/deliverySettingsRoutes.js");
// const brandRouters = require("./routers/brandRoutes.js");
// const supportCallRouters = require("./routers/supportCallRoutes.js");
// const serviceRouters = require("./routers/serviceRoutes.js");
// const serviceRequestRouters = require("./routers/serviceRequestRoutes.js");
// const twilioRoutes = require("./routers/twilioRoutes");
// const customerTicketRoutes = require('./routers/customerTicketRoutes');
// const adminTicketRoutes = require('./routers/adminTicketRoutes');

// app.use("/auth", authRouters);
// app.use("/api/users", userRouters);
// app.use("/sellers", sellerRouters);
// app.use("/products", productRouters);
// app.use("/api/sellers/product", sellerProductRouters);
// app.use("/api/cart", cartRouters);
// app.use("/api/orders", orderRouters);
// app.use("/api/seller/orders", sellerOrderRouters);
// app.use("/api/transactions", transactionRouters);
// app.use("/api/wishlist", wishlistRouters);
// app.use("/api/sellers/report", sellerReportRouters);
// app.use("/api/gst", gstRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/offers", offerRoutes);
// app.use("/api/banners", bannersRoutes);
// app.use("/api/delivery-settings", deliverySettingsRoutes);
// app.use("/api/brands", brandRouters);
// app.use("/api/support-calls", supportCallRouters);
// app.use("/api/services", serviceRouters);
// app.use("/api/service-requests", serviceRequestRouters);
// app.use("/api/twilio", twilioRoutes);
// app.use('/api/customer/tickets', customerTicketRoutes);
// app.use('/api/admin/tickets', adminTicketRoutes);
// app.use("/api/payment", paymentRoutres);
// app.use("/home", homeRouters);
// app.use("/admin/deals", dealRoutres);
// app.use("/admin", adminRouters);
// app.use("/api/admin/main-categories", mainCategoryRoutes);
// app.use("/api/admin/banners", bannerRoutes);
// app.use("/api/admin", footerRoutes);
// app.use("/api/admin/home-sections", homeSectionRoutes);
// app.use("/payouts", payoutRoutes);
// app.use("/api/delivery-partners", deliveryPartnerRoutes);
// app.use("/api/admin/categories", categoriesRoutes);
// app.use("/api/address", addressRouters);
// app.use("/api/coupons", couponRouters);
// app.use("/api/sellers/revenue", revenueRouters);
// app.use("/api/reviews", reviewRouters);
// app.use("/chat", chatboatRouters);
// app.use("/api/webhooks", webhookRoutes);
// app.use("/api/returns", returnRoutes);
// app.use("/api/reports", reportRoutes);

// /* ═══════════════ 404 + ERROR ═══════════════ */
// app.use((req, res) => {
//   res.status(404).json({ error: "Route not found" });
// });

// app.use((err, req, res, next) => {
//   console.error("❌ Error:", err.message);
//   res.status(err.status || 500).json({ error: err.message });
// });

// /* ═══════════════ SERVER START ═══════════════ */
// const port = process.env.PORT || 8080;
// server.listen(port, async () => {
//   await connectDB();
//   console.log(`🚀 Server running on port ${port}`);
//   console.log(`📁 Files: http://localhost:${port}/uploads/`);
//   console.log(`🔌 Socket.io ready for connections`);

//   require('./jobs/syncTracking');
//   console.log(`⏰ Tracking sync cron started`);
// });













// require("dotenv").config();
// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const path = require("path");
// const connectDB = require("./config/db.js");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const compression = require("compression");
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
// const morgan = require("morgan");


// const app = express();
// const server = http.createServer(app);

// /* ═══════════════════════════════════════════════
//    🔥 MIDDLEWARE — Order important hai!
//    ═══════════════════════════════════════════════ */

// // 1. 🔥 CORS — SABSE PEHLE (Helmet se pehle)
// const corsOptions = {
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:5174",
//     "http://localhost:3000",
//     process.env.CLIENT_URL,
//   ].filter(Boolean),
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   allowedHeaders: [
//     "Content-Type",
//     "Authorization",
//     "X-Requested-With",
//     "Accept",
//     "Origin",
//   ],
//   exposedHeaders: ["Content-Length", "X-Total-Count"],
//   maxAge: 86400,
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

// // 🔥 Har OPTIONS request ko instantly handle karo
// app.options("*", cors(corsOptions));

// // 2. Compression
// app.use(compression({
//   level: 6,
//   threshold: 1024,
// }));

// // 3. 🔥 Helmet — CORS ke BAAD
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: "cross-origin" },
//   crossOriginEmbedderPolicy: false,
//   crossOriginOpenerPolicy: false,
//   contentSecurityPolicy: false,
// }));

// // 4. Morgan (dev only)
// if (process.env.NODE_ENV !== "production") {
//   app.use(morgan("dev"));
// }

// // 5. Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 1000,
//   message: "Too many requests, please try again later.",
//   standardHeaders: true,
//   legacyHeaders: false,
// });
// app.use("/api", limiter);

// // 6. 🔥 Request logger — har request terminal me dikhegi
// app.use((req, res, next) => {
//   const start = Date.now();
//   console.log(`📥 [${req.method}] ${req.originalUrl}`);
//   res.on("finish", () => {
//     const duration = Date.now() - start;
//     console.log(`📤 [${res.statusCode}] ${req.method} ${req.originalUrl} — ${duration}ms`);
//   });
//   next();
// });

// // 7. Body parser
// app.use(
//   bodyParser.json({
//     limit: "10mb",
//     verify: (req, res, buf) => {
//       req.rawBody = buf.toString("utf8");
//     },
//   })
// );

// // 8. Root route
// app.get("/", (req, res) => {
//   res.send({ message: "Welcome To Selfy Snap Backend System!" });
// });

// /* ═══════════════════════════════════════════════
//    🔥 SOCKET.IO
//    ═══════════════════════════════════════════════ */
// const io = new Server(server, {
//   cors: {
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:5174",
//       "http://localhost:3000",
//       process.env.CLIENT_URL,
//     ].filter(Boolean),
//     credentials: true,
//     methods: ["GET", "POST"],
//   },
//   transports: ["websocket", "polling"],
//   pingTimeout: 60000,
//   pingInterval: 25000,
//   perMessageDeflate: false,
// });

// global.io = io;

// io.on("connection", (socket) => {
//   console.log("🔌 Socket connected:", socket.id);

//   socket.on("join_admin", (adminId) => {
//     socket.join("admin_room");
//     console.log(`👑 Admin ${adminId} joined admin_room`);
//   });

//   socket.on("join_seller", (sellerId) => {
//     socket.join(`seller_${sellerId}`);
//     console.log(`🛍️ Seller ${sellerId} joined seller_${sellerId}`);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔌 Socket disconnected:", socket.id);
//   });
// });

// /* ═══════════════════════════════════════════════
//    🔥 STATIC FILES
//    ═══════════════════════════════════════════════ */
// app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
//   maxAge: "7d",
//   etag: true,
//   lastModified: true,
//   immutable: true,
// }));
// console.log("📁 Static files served from:", path.join(__dirname, "uploads"));

// /* ═══════════════════════════════════════════════
//    🔥 ROUTES
//    ═══════════════════════════════════════════════ */
// const productRouters = require("./routers/productRoutes.js");
// const authRouters = require("./routers/authRouters.js");
// const adminRouters = require("./routers/adminRouters.js");
// const cartRouters = require("./routers/cartRoutes.js");
// const revenueRouters = require("./routers/revenueRoutes.js");
// const sellerOrderRouters = require("./routers/sellerOrderRoutes.js");
// const sellerProductRouters = require("./routers/sellerProductRoutes.js");
// const sellerReportRouters = require("./routers/sellerReportRoutes.js");
// const sellerRouters = require("./routers/sellerRoutes.js");
// const transactionRouters = require("./routers/transactionRoutes.js");
// const userRouters = require("./routers/userRoutes.js");
// const wishlistRouters = require("./routers/wishlistRoutes.js");
// const orderRouters = require("./routers/orderRoutes.js");
// const paymentRoutres = require("./routers/paymentRoutes.js");
// const dealRoutres = require("./routers/dealRoutes.js");
// const couponRouters = require("./routers/couponRoutes.js");
// const homeRouters = require("./routers/homeCategoryRoutes.js");
// const chatboatRouters = require("./routers/chatboatRoutes.js");
// const reviewRouters = require("./routers/reviewRouters.js");
// const mainCategoryRoutes = require("./routers/mainCategoryRoutes.js");
// const bannerRoutes = require("./routers/bannerRouters.js");
// const footerRoutes = require("./routers/footerRoutes.js");
// const homeSectionRoutes = require("./routers/homeSectionRoutes.js");
// const payoutRoutes = require("./routers/payoutRoutes.js");
// const reportRoutes = require("./routers/reportRoutes.js");
// const gstRoutes = require("./routers/gstRoutes.js");
// const deliveryPartnerRoutes = require("./routers/deliveryPartnerRoutes.js");
// const categoriesRoutes = require("./routers/categoryRoutes.js");
// const addressRouters = require("./routers/addressRouters.js");
// const webhookRoutes = require("./routers/webhookRoutes.js");
// const returnRoutes = require("./routers/returnRoutes.js");
// const notificationRoutes = require("./routers/notificationRoutes");
// const offerRoutes = require("./routers/offerRoutes");
// const bannersRoutes = require("./routers/bannersRoutes");
// const deliverySettingsRoutes = require("./routers/deliverySettingsRoutes.js");
// const brandRouters = require("./routers/brandRoutes.js");
// const supportCallRouters = require("./routers/supportCallRoutes.js");
// const serviceRouters = require("./routers/serviceRoutes.js");
// const serviceRequestRouters = require("./routers/serviceRequestRoutes.js");
// const twilioRoutes = require("./routers/twilioRoutes");
// const customerTicketRoutes = require('./routers/customerTicketRoutes');
// const adminTicketRoutes = require('./routers/adminTicketRoutes');
// const legalPageRoutes = require("./routers/legalPageRoutes.js");
// const uploadRoutes = require("./routers/uploadRoutes.js");
// const customizeRoutes = require("./routers/customizeRoutes.js");

// app.use("/auth", authRouters);
// app.use("/api/users", userRouters);
// app.use("/sellers", sellerRouters);
// app.use("/products", productRouters);
// app.use("/api/sellers/product", sellerProductRouters);
// app.use("/api/cart", cartRouters);
// app.use("/api/orders", orderRouters);
// app.use("/api/seller/orders", sellerOrderRouters);
// app.use("/api/transactions", transactionRouters);
// app.use("/api/wishlist", wishlistRouters);
// app.use("/api/sellers/report", sellerReportRouters);
// app.use("/api/gst", gstRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/offers", offerRoutes);
// app.use("/api/banners", bannersRoutes);
// app.use("/api/delivery-settings", deliverySettingsRoutes);
// app.use("/api/brands", brandRouters);
// app.use("/api/support-calls", supportCallRouters);
// app.use("/api/services", serviceRouters);
// app.use("/api/service-requests", serviceRequestRouters);
// app.use("/api/twilio", twilioRoutes);
// app.use('/api/customer/tickets', customerTicketRoutes);
// app.use('/api/admin/tickets', adminTicketRoutes);
// app.use("/api/payment", paymentRoutres);
// app.use("/home", homeRouters);
// app.use("/admin/deals", dealRoutres);
// app.use("/admin", adminRouters);
// app.use("/api/admin/main-categories", mainCategoryRoutes);
// app.use("/api/admin/banners", bannerRoutes);
// app.use("/api/admin", footerRoutes);
// app.use("/api/admin/home-sections", homeSectionRoutes);
// app.use("/payouts", payoutRoutes);
// app.use("/api/delivery-partners", deliveryPartnerRoutes);
// app.use("/api/admin/categories", categoriesRoutes);
// app.use("/api/address", addressRouters);
// app.use("/api/coupons", couponRouters);
// app.use("/api/sellers/revenue", revenueRouters);
// app.use("/api/reviews", reviewRouters);
// app.use("/chat", chatboatRouters);
// app.use("/api/webhooks", webhookRoutes);
// app.use("/api/returns", returnRoutes);
// app.use("/api/reports", reportRoutes);
// app.use("/api/legal", legalPageRoutes);
// app.use("/api/upload", uploadRoutes);
// app.use("/api/customize", customizeRoutes);

// /* ═══════════════════════════════════════════════
//    🔥 404 + ERROR HANDLER
//    ═══════════════════════════════════════════════ */
// app.use((req, res) => {
//   res.status(404).json({ error: "Route not found" });
// });

// app.use((err, req, res, next) => {
//   console.error("❌ Error:", err.message);
//   res.status(err.status || 500).json({ error: err.message });
// });

// /* ═══════════════════════════════════════════════
//    🔥 SERVER START
//    ═══════════════════════════════════════════════ */
// const port = process.env.PORT || 8080;
// server.listen(port, async () => {
//   await connectDB();
//   console.log(`🚀 Server running on port ${port}`);
//   console.log(`📁 Files: http://localhost:${port}/uploads/`);
//   console.log(`🔌 Socket.io ready for connections`);

//   require('./jobs/syncTracking');
//   console.log(`⏰ Tracking sync cron started`);
// });








require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const connectDB = require("./config/db.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");


const app = express();
const server = http.createServer(app);

/* ═══════════════════════════════════════════════
   🔥 ALLOWED ORIGINS — Single source of truth
   ═══════════════════════════════════════════════ */
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://selfysnap-theta.vercel.app",
  "https://selfysnap.vercel.app",
  "https://selfysnap-8zi6.onrender.com",
  process.env.CLIENT_URL,
].filter(Boolean);

/* ═══════════════════════════════════════════════
   🔥 MIDDLEWARE — Order important hai!
   ═══════════════════════════════════════════════ */

// 1. 🔥 CORS — SABSE PEHLE (Helmet se pehle)
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin) return callback(null, true);

    if (ALLOWED_ORIGINS.indexOf(origin) !== -1) {
      return callback(null, true);
    }

    console.warn("⚠️ Blocked by CORS:", origin);
    return callback(null, true); // ⚠️ TEMPORARY — allow all for testing
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  exposedHeaders: ["Content-Length", "X-Total-Count"],
  maxAge: 86400,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// 🔥 Har OPTIONS request ko instantly handle karo
app.options("*", cors(corsOptions));

// 2. Compression
app.use(compression({
  level: 6,
  threshold: 1024,
}));

// 3. 🔥 Helmet — CORS ke BAAD
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  contentSecurityPolicy: false,
}));

// 4. Morgan (dev only)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// 5. Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// 6. 🔥 Request logger — har request terminal me dikhegi
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`📥 [${req.method}] ${req.originalUrl}`);
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`📤 [${res.statusCode}] ${req.method} ${req.originalUrl} — ${duration}ms`);
  });
  next();
});

// 7. Body parser
app.use(
  bodyParser.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString("utf8");
    },
  })
);

// 8. Root route
app.get("/", (req, res) => {
  res.send({ message: "Welcome To Selfy Snap Backend System!" });
});

/* ═══════════════════════════════════════════════
   🔥 SOCKET.IO
   ═══════════════════════════════════════════════ */
const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    credentials: true,
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
  pingTimeout: 60000,
  pingInterval: 25000,
  perMessageDeflate: false,
});

global.io = io;

io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  socket.on("join_admin", (adminId) => {
    socket.join("admin_room");
    console.log(`👑 Admin ${adminId} joined admin_room`);
  });

  socket.on("join_seller", (sellerId) => {
    socket.join(`seller_${sellerId}`);
    console.log(`🛍️ Seller ${sellerId} joined seller_${sellerId}`);
  });

  socket.on("disconnect", () => {
    console.log("🔌 Socket disconnected:", socket.id);
  });
});

/* ═══════════════════════════════════════════════
   🔥 STATIC FILES
   ═══════════════════════════════════════════════ */
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  maxAge: "7d",
  etag: true,
  lastModified: true,
  immutable: true,
}));
console.log("📁 Static files served from:", path.join(__dirname, "uploads"));

/* ═══════════════════════════════════════════════
   🔥 ROUTES
   ═══════════════════════════════════════════════ */
const productRouters = require("./routers/productRoutes.js");
const authRouters = require("./routers/authRouters.js");
const adminRouters = require("./routers/adminRouters.js");
const cartRouters = require("./routers/cartRoutes.js");
const revenueRouters = require("./routers/revenueRoutes.js");
const sellerOrderRouters = require("./routers/sellerOrderRoutes.js");
const sellerProductRouters = require("./routers/sellerProductRoutes.js");
const sellerReportRouters = require("./routers/sellerReportRoutes.js");
const sellerRouters = require("./routers/sellerRoutes.js");
const transactionRouters = require("./routers/transactionRoutes.js");
const userRouters = require("./routers/userRoutes.js");
const wishlistRouters = require("./routers/wishlistRoutes.js");
const orderRouters = require("./routers/orderRoutes.js");
const paymentRoutres = require("./routers/paymentRoutes.js");
const dealRoutres = require("./routers/dealRoutes.js");
const couponRouters = require("./routers/couponRoutes.js");
const homeRouters = require("./routers/homeCategoryRoutes.js");
const chatboatRouters = require("./routers/chatboatRoutes.js");
const reviewRouters = require("./routers/reviewRouters.js");
const mainCategoryRoutes = require("./routers/mainCategoryRoutes.js");
const bannerRoutes = require("./routers/bannerRouters.js");
const footerRoutes = require("./routers/footerRoutes.js");
const homeSectionRoutes = require("./routers/homeSectionRoutes.js");
const payoutRoutes = require("./routers/payoutRoutes.js");
const reportRoutes = require("./routers/reportRoutes.js");
const gstRoutes = require("./routers/gstRoutes.js");
const deliveryPartnerRoutes = require("./routers/deliveryPartnerRoutes.js");
const categoriesRoutes = require("./routers/categoryRoutes.js");
const addressRouters = require("./routers/addressRouters.js");
const webhookRoutes = require("./routers/webhookRoutes.js");
const returnRoutes = require("./routers/returnRoutes.js");
const notificationRoutes = require("./routers/notificationRoutes");
const offerRoutes = require("./routers/offerRoutes");
const bannersRoutes = require("./routers/bannersRoutes");
const deliverySettingsRoutes = require("./routers/deliverySettingsRoutes.js");
const brandRouters = require("./routers/brandRoutes.js");
const supportCallRouters = require("./routers/supportCallRoutes.js");
const serviceRouters = require("./routers/serviceRoutes.js");
const serviceRequestRouters = require("./routers/serviceRequestRoutes.js");
const twilioRoutes = require("./routers/twilioRoutes");
const customerTicketRoutes = require('./routers/customerTicketRoutes');
const adminTicketRoutes = require('./routers/adminTicketRoutes');
const legalPageRoutes = require("./routers/legalPageRoutes.js");
const uploadRoutes = require("./routers/uploadRoutes.js");
const customizeRoutes = require("./routers/customizeRoutes.js");

app.use("/auth", authRouters);
app.use("/api/users", userRouters);
app.use("/sellers", sellerRouters);
app.use("/products", productRouters);
app.use("/api/sellers/product", sellerProductRouters);
app.use("/api/cart", cartRouters);
app.use("/api/orders", orderRouters);
app.use("/api/seller/orders", sellerOrderRouters);
app.use("/api/transactions", transactionRouters);
app.use("/api/wishlist", wishlistRouters);
app.use("/api/sellers/report", sellerReportRouters);
app.use("/api/gst", gstRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/banners", bannersRoutes);
app.use("/api/delivery-settings", deliverySettingsRoutes);
app.use("/api/brands", brandRouters);
app.use("/api/support-calls", supportCallRouters);
app.use("/api/services", serviceRouters);
app.use("/api/service-requests", serviceRequestRouters);
app.use("/api/twilio", twilioRoutes);
app.use('/api/customer/tickets', customerTicketRoutes);
app.use('/api/admin/tickets', adminTicketRoutes);
app.use("/api/payment", paymentRoutres);
app.use("/home", homeRouters);
app.use("/admin/deals", dealRoutres);
app.use("/admin", adminRouters);
app.use("/api/admin/main-categories", mainCategoryRoutes);
app.use("/api/admin/banners", bannerRoutes);
app.use("/api/admin", footerRoutes);
app.use("/api/admin/home-sections", homeSectionRoutes);
app.use("/payouts", payoutRoutes);
app.use("/api/delivery-partners", deliveryPartnerRoutes);
app.use("/api/admin/categories", categoriesRoutes);
app.use("/api/address", addressRouters);
app.use("/api/coupons", couponRouters);
app.use("/api/sellers/revenue", revenueRouters);
app.use("/api/reviews", reviewRouters);
app.use("/chat", chatboatRouters);
app.use("/api/webhooks", webhookRoutes);
app.use("/api/returns", returnRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/legal", legalPageRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/customize", customizeRoutes);

/* ═══════════════════════════════════════════════
   🔥 404 + ERROR HANDLER
   ═══════════════════════════════════════════════ */
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(err.status || 500).json({ error: err.message });
});

/* ═══════════════════════════════════════════════
   🔥 SERVER START
   ═══════════════════════════════════════════════ */
const port = process.env.PORT || 8080;
server.listen(port, async () => {
  await connectDB();
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📁 Files: http://localhost:${port}/uploads/`);
  console.log(`🔌 Socket.io ready for connections`);
  console.log(`🌐 Allowed origins:`, ALLOWED_ORIGINS);

  require('./jobs/syncTracking');
  console.log(`⏰ Tracking sync cron started`);
});












