const express = require("express");
const controller = require("../controllers/ServiceController");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

const router = express.Router();

/* PUBLIC */
router.get("/", controller.getActiveServices);

/* ADMIN */
router.get("/admin/all", adminAuthMiddleware, controller.getAllServicesAdmin);
router.post("/admin/create", adminAuthMiddleware, controller.createService);
router.put("/admin/:id", adminAuthMiddleware, controller.updateService);
router.delete("/admin/:id", adminAuthMiddleware, controller.deleteService);
router.patch("/admin/:id/toggle", adminAuthMiddleware, controller.toggleActive);

/* PUBLIC (slug last) */
router.get("/:slug", controller.getServiceBySlug);

module.exports = router;