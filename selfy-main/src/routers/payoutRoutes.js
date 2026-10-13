// const express = require("express");
// const router = express.Router();

// const payoutController = require("../controllers/payoutController");
// const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");


// // ✅ TAB 2 → Payout History (Admin Table)
// router.get(
//   "/admin",
//   adminAuthMiddleware,
//   payoutController.getAllPayouts
// );


// // ✅ TAB 1 → Seller Summary (Transaction Based)
// router.get(
//   "/summary",
//   adminAuthMiddleware,
//   payoutController.getPayoutSummary
// );


// // ✅ Manual Create Payout (ADMIN ONLY)
// router.post(
//   "/create",
//   adminAuthMiddleware,
//   payoutController.createPayout
// );


// // ✅ Update Status (Pending → Success → Rejected)
// router.put(
//   "/:id/status",
//   adminAuthMiddleware,
//   payoutController.updatePayoutStatus
// );

// module.exports = router;





const express = require("express");
const router = express.Router();
const payoutController = require("../controllers/payoutController");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");
const sellerAuthMiddleware = require("../middlewares/sellerAuthMiddleware");

// Admin routes
router.get("/admin", adminAuthMiddleware, payoutController.getAllPayouts);
router.get("/admin/pending", adminAuthMiddleware, payoutController.getPendingPayouts);
router.get("/admin/history", adminAuthMiddleware, payoutController.getPayoutHistory);
router.get("/summary", adminAuthMiddleware, payoutController.getPayoutSummary);
router.post("/create", adminAuthMiddleware, payoutController.createPayout);
router.put("/:id/status", adminAuthMiddleware, payoutController.updatePayoutStatus);

// Seller routes
router.post("/request", sellerAuthMiddleware, payoutController.requestPayout);
router.get("/my-payout", sellerAuthMiddleware, payoutController.getMyPayouts);


module.exports = router;

module.exports = router;





















