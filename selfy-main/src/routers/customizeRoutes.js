const express = require("express");
const router = express.Router();
const customizeController = require("../controllers/customizeController");

let authMiddleware, sellerAuthMiddleware;
try {
  authMiddleware = require("../middleware/authMiddleware");
} catch {
  authMiddleware = (req, res, next) => next();
}
try {
  sellerAuthMiddleware = require("../middleware/sellerAuthMiddleware");
} catch {
  sellerAuthMiddleware = authMiddleware;
}

/* Customer routes */
router.post("/print-file", authMiddleware, customizeController.generatePrintFile);
router.post("/preview", authMiddleware, customizeController.generatePreview);

/* Seller routes */
router.post(
  "/batch-download",
  sellerAuthMiddleware,
  customizeController.batchDownloadPrintFiles
);

module.exports = router;