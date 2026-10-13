const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const uploadController = require("../controllers/uploadController");

/* 🔥 Auth middleware */
let authMiddleware;
try {
  authMiddleware = require("../middleware/authMiddleware");
} catch {
  authMiddleware = (req, res, next) => next();
}

/* Upload custom image */
router.post(
  "/custom-image",
  authMiddleware,
  upload.single("image"),
  uploadController.uploadCustomImage
);

/* Delete custom image */
router.delete(
  "/custom-image",
  authMiddleware,
  uploadController.deleteCustomImage
);

module.exports = router;