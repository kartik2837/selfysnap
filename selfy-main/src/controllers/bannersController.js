// backend/src/controllers/bannersController.js

const Banners = require("../models/Banners");

// ═══════════════════════════════════════════════
// CREATE BANNERS
// ═══════════════════════════════════════════════
exports.createBanners = async (req, res) => {
  try {
    console.log("📥 Create Banners:", req.body);

    const data = { ...req.body };

    // Boolean Convert
    ["videoAutoplay", "videoLoop", "videoMuted", "isActive"].forEach((key) => {
      if (data[key] === "true") data[key] = true;
      if (data[key] === "false") data[key] = false;
    });

    // Number Convert
    ["order", "overlayOpacity"].forEach((key) => {
      if (data[key]) data[key] = Number(data[key]);
    });

    const banners = await Banners.create(data);
    console.log("✅ Banners Created:", banners._id);

    res.status(201).json({
      success: true,
      message: "🎉 Banners Created!",
      banners,
    });
  } catch (error) {
    console.error("❌ Create Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════
// GET ALL BANNERS
// ═══════════════════════════════════════════════
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banners.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════
// GET ACTIVE BANNERS
// ═══════════════════════════════════════════════
exports.getActiveBanners = async (req, res) => {
  try {
    const banners = await Banners.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════
// GET SINGLE
// ═══════════════════════════════════════════════
exports.getBannersById = async (req, res) => {
  try {
    const banners = await Banners.findById(req.params.id);
    if (!banners) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════
// UPDATE BANNERS
// ═══════════════════════════════════════════════
exports.updateBanners = async (req, res) => {
  try {
    const existing = await Banners.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const data = { ...req.body };

    // Convert
    ["videoAutoplay", "videoLoop", "videoMuted", "isActive"].forEach((key) => {
      if (data[key] === "true") data[key] = true;
      if (data[key] === "false") data[key] = false;
    });
    ["order", "overlayOpacity"].forEach((key) => {
      if (data[key]) data[key] = Number(data[key]);
    });

    const banners = await Banners.findByIdAndUpdate(
      req.params.id,
      { $set: data },
      { new: true }
    );

    res.json({
      success: true,
      message: "✅ Banners Updated",
      banners,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════
// DELETE BANNERS
// ═══════════════════════════════════════════════
exports.deleteBanners = async (req, res) => {
  try {
    const banners = await Banners.findById(req.params.id);
    if (!banners) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    // ⚠️ Cloudinary से Delete करना है तो Frontend से API call करें
    // या Backend में cloudinary package install करें

    await Banners.findByIdAndDelete(req.params.id);

    console.log("✅ Banners Deleted");
    res.json({ success: true, message: "Banners deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════
// TOGGLE ACTIVE
// ═══════════════════════════════════════════════
exports.toggleBanners = async (req, res) => {
  try {
    const banners = await Banners.findById(req.params.id);
    if (!banners) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    banners.isActive = !banners.isActive;
    await banners.save();

    res.json({
      success: true,
      message: `Banners ${banners.isActive ? "Activated" : "Deactivated"}`,
      banners,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};