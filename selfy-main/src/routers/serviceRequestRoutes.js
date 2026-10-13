const express = require("express");
const controller = require("../controllers/ServiceRequestController");
const authMiddleware = require("../middlewares/userAuthMiddleware");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

const router = express.Router();

/* SELLER */
router.post("/seller/request", authMiddleware, controller.createRequest);
router.get("/seller/my-requests", authMiddleware, controller.getMyRequests);

/* 🔥 RAZORPAY Payment Routes */
router.post("/seller/:id/create-payment", authMiddleware, controller.createPaymentOrder);
router.post("/seller/:id/verify-payment", authMiddleware, controller.verifyPayment);

router.post("/seller/:id/complete", authMiddleware, controller.completeRequest);

/* ADMIN */
router.get("/admin/all", adminAuthMiddleware, controller.getAllRequests);
router.patch("/admin/:id/approve", adminAuthMiddleware, controller.approveRequest);
router.patch("/admin/:id/reject", adminAuthMiddleware, controller.rejectRequest);
router.patch("/admin/:id/assign", adminAuthMiddleware, controller.assignSelf);
router.patch("/admin/:id/deliver", adminAuthMiddleware, controller.deliverRequest);

/* COMMON */
router.get("/:id", authMiddleware, controller.getRequestById);

module.exports = router;