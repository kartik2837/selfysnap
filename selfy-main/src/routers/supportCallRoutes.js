const express = require("express");
const controller = require("../controllers/SupportCallController");
const authMiddleware = require("../middlewares/userAuthMiddleware");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

const router = express.Router();

/* SELLER */
router.post("/seller/request", authMiddleware, controller.createRequest);
router.get("/seller/my-requests", authMiddleware, controller.getMyRequests);

/* ADMIN */
router.get("/admin/all", adminAuthMiddleware, controller.getPendingCalls);
router.get("/admin/stats", adminAuthMiddleware, controller.getStats);
router.patch("/admin/:id/acknowledge", adminAuthMiddleware, controller.acknowledge);
router.patch("/admin/:id/call", adminAuthMiddleware, controller.startCall);
router.patch("/admin/:id/resolve", adminAuthMiddleware, controller.resolve);
router.patch("/admin/:id/missed", adminAuthMiddleware, controller.markMissed);

module.exports = router;