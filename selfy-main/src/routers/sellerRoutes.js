// const express = require('express');
// const router = express.Router();
// const sellerController = require('../controllers/sellerController');
// const sellerAuthMiddleware = require('../middlewares/sellerAuthMiddleware');

// router.get('/profile', sellerAuthMiddleware, sellerController.getSellerProfile);

// router.post('/', sellerController.createSeller);

// router.get('/', sellerController.getAllSellers);

// router.patch('/', sellerAuthMiddleware, sellerController.updateSeller);

// router.post('/register-delhivery', sellerAuthMiddleware, sellerController.registerDelhiverySelf);

// router.get('/:id', sellerController.getSellerById);

// router.post('/verify/login-otp', sellerController.verifyLoginOtp);




// router.delete('/:id', sellerController.deleteSeller);

// router.post('/verify/otp', sellerController.verifyEmail);



// module.exports = router;


















const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sellerController = require("../controllers/sellerController");
const sellerAuthMiddleware = require("../middlewares/sellerAuthMiddleware");

/* ═══════════════════════════════════════════════
   🔥 MULTER SETUP
   ═══════════════════════════════════════════════ */
const docsDir = path.join(__dirname, "../uploads/seller-documents");
if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, docsDir),
  filename: (req, file, cb) =>
    cb(
      null,
      `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`
    ),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /jpeg|jpg|png|pdf/.test(
      path.extname(file.originalname).toLowerCase()
    );
    ok ? cb(null, true) : cb(new Error("Only JPG, PNG, PDF allowed"));
  },
});

/* ═══════════════════════════════════════════════
   🔥 ROUTES
   ═══════════════════════════════════════════════ */

/* Profile */
router.get(
  "/profile",
  sellerAuthMiddleware,
  sellerController.getSellerProfile
);

/* 🔥 CREATE SELLER (with documents) */
router.post(
  "/",
  upload.fields([
    { name: "gstCertificate", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "bankProof", maxCount: 1 },
  ]),
  sellerController.createSeller
);

/* Get all sellers */
router.get("/", sellerController.getAllSellers);

/* Update seller */
router.patch("/", sellerAuthMiddleware, sellerController.updateSeller);

/* Register Delhivery */
router.post(
  "/register-delhivery",
  sellerAuthMiddleware,
  sellerController.registerDelhiverySelf
);

/* ═══════════════════════════════════════════════
   🔥 OTP ROUTES
   ═══════════════════════════════════════════════ */

/* Send OTP for registration */
router.post("/sent/register-top", sellerController.sentRegisterOtp || sellerController.sentLoginOtp);

/* Send OTP for login */
router.post("/sent/login-top", sellerController.sentLoginOtp);

/* Verify registration email OTP */
router.post("/verify/otp", sellerController.verifyEmail);

/* Verify login OTP */
router.post("/verify/login-otp", sellerController.verifyLoginOtp);

/* Get seller by ID */
router.get("/:id", sellerController.getSellerById);

/* Delete seller */
router.delete("/:id", sellerController.deleteSeller);

module.exports = router;