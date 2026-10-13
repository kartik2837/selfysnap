const express = require("express");
const {
  getDeliverySettings,
  updateDeliverySettings,
} = require("../controllers/deliverySettingsController");

const router = express.Router();

/* Public routes (temporary - no auth) */
router.get("/", getDeliverySettings);
router.put("/", updateDeliverySettings);   // ✅ auth हटा दिया

module.exports = router;