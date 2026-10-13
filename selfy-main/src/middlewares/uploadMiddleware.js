// src/middleware/uploadMiddleware.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ═══════════════════════════════════════════════════
// Upload Folder Path (src/uploads/offers)
// ═══════════════════════════════════════════════════
const uploadDir = path.join(__dirname, '../uploads/offers');

console.log('📁 Upload Dir Path:', uploadDir);

// Folder नहीं है तो बनाओ
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('✅ Created folder:', uploadDir);
} else {
  console.log('✅ Folder exists:', uploadDir);
}

// ═══════════════════════════════════════════════════
// Storage Setup
// ═══════════════════════════════════════════════════
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `offer-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname).toLowerCase()}`;
    cb(null, uniqueName);
  },
});

// ═══════════════════════════════════════════════════
// File Filter
// ═══════════════════════════════════════════════════
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('सिर्फ Images allowed हैं (jpg, png, webp, gif)'));
};

// ═══════════════════════════════════════════════════
// Multer Setup
// ═══════════════════════════════════════════════════
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;