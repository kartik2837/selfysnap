// backend/src/routes/bannersRoutes.js

const express = require("express");
const router = express.Router();
const {
  createBanners,
  getAllBanners,
  getActiveBanners,
  getBannersById,
  updateBanners,
  deleteBanners,
  toggleBanners,
} = require("../controllers/bannersController");

// ═══ Customer ═══
router.get("/active", getActiveBanners);

// ═══ Admin ═══
router.get("/", getAllBanners);
router.post("/", createBanners);  // ✅ File upload नहीं, सिर्फ JSON

// ═══ Dynamic ═══
router.get("/:id", getBannersById);
router.put("/:id", updateBanners);
router.delete("/:id", deleteBanners);
router.patch("/:id/toggle", toggleBanners);

module.exports = router;