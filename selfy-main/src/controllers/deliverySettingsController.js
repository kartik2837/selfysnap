const DeliverySettings = require("../models/DeliverySettings");

const getDeliverySettings = async (req, res) => {
  try {
    let settings = await DeliverySettings.findOne({ isActive: true });
    if (!settings) settings = await DeliverySettings.create({});
    return res.status(200).json({ success: true, settings });
  } catch (error) {
    console.error("getDeliverySettings error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch delivery settings" });
  }
};

const updateDeliverySettings = async (req, res) => {
  try {
    const {
      deliveryFee,
      freeDeliveryThreshold,
      codFee,
      codEnabled,
      codMaxPrice,
      taxPercent,
    } = req.body;

    let settings = await DeliverySettings.findOne({ isActive: true });
    if (!settings) settings = new DeliverySettings({});

    if (deliveryFee !== undefined) settings.deliveryFee = deliveryFee;
    if (freeDeliveryThreshold !== undefined)
      settings.freeDeliveryThreshold = freeDeliveryThreshold;
    if (codFee !== undefined) settings.codFee = codFee;
    if (codEnabled !== undefined) settings.codEnabled = codEnabled;
    if (codMaxPrice !== undefined) settings.codMaxPrice = codMaxPrice;
    if (taxPercent !== undefined) settings.taxPercent = taxPercent;

    await settings.save();

    return res.status(200).json({
      success: true,
      message: "Delivery settings updated ✅",
      settings,
    });
  } catch (error) {
    console.error("updateDeliverySettings error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update settings" });
  }
};

module.exports = { getDeliverySettings, updateDeliverySettings };