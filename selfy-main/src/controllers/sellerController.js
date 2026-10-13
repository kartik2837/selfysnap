// // const UserRoles = require("../domain/UserRole");
// // const SellerError = require("../exceptions/SellerError");
// // const Seller = require("../models/Seller");
// // const VerificationCode = require("../models/VerificationCode");
// // const SellerService = require("../services/SellerService");
// // const VerificationService = require("../services/VerificationService");
// // const generateOTP = require("../utils/generateOtp");
// // const jwtProvider = require("../utils/jwtProvider");
// // const { sendVerificationEmail } = require("../utils/sendEmail");

// // class SellerController {
// //   async getSellerProfile(req, res) {
// //     try {
// //       const jwt = req.headers.authorization.split(" ")[1];
// //       const seller = await SellerService.getSellerProfile(jwt);
// //       // const seller=req.seller

// //       res.status(200).json(seller);
// //     } catch (err) {
// //       res
// //         .status(err instanceof SellerError ? 404 : 500)
// //         .json({ message: err.message });
// //     }
// //   }

// //   async createSeller(req, res) {
// //     try {
// //       const newSeller = await SellerService.createSeller(req.body);

// //       // Step 2: Generate OTP
// //       const otp = generateOTP();
// //       const verificationCode = await VerificationService.createVerificationCode(
// //         otp,
// //         req.body.email
// //       );

// //       // Step 3: Send verification email
 
// //       const subject = "Selfysnap Email Verification Code";
// //       const text =
// //         "Welcome to Selfysnap, verify your account using this link: ";
// //       const frontendUrl = "http://localhost:3000/verify-seller/" + otp;

// //       // const subject = "Zosh Bazaar Email Verification Code";
// //       // const text =
// //       //   "Welcome to Zosh Bazaar, verify your account using this link: ";
// //       // const frontendUrl = "http://localhost:3000/verify-seller/" + otp;
// //       // await sendVerificationEmail(
// //       //   req.body.email,
// //       //   subject,
// //       //   text + frontendUrl
// //       // );
// //       const subject = "Selfysnap Email Verification Code";
// //       const text =
// //         "Welcome to Selfysnap, verify your account using this link: ";
// //       const frontendUrl = "https://manpreet-nu.vercel.app/verify-seller/" + otp;
// //  caa2134ba248764cba6f3f1d6217b418d7d7a5e3
// //       await sendVerificationEmail(
// //         req.body.email,
// //         subject,
// //         text + frontendUrl
// //       );


// //       return res
// //         .status(201)
// //         .json({
// //           message: "Seller created successfully, verification email sent.",
// //         });

// //     } catch (err) {
// //       res
// //         .status(err instanceof SellerError ? 400 : 500)
// //         .json({ error: err.message });
// //     }
// //   }



// //   async getSellerById(req, res) {
// //     try {
// //       const seller = await SellerService.getSellerById(req.params.id);
// //       res.status(200).json(seller);
// //     } catch (err) {
// //       res
// //         .status(err instanceof SellerError ? 404 : 500)
// //         .json({ message: err.message });
// //     }
// //   }

// //   async getAllSellers(req, res) {
// //     try {
// //       const { status } = req.query;
// //       const sellers = await SellerService.getAllSellers(status);
// //       res.status(200).json(sellers);
// //     } catch (err) {
// //       res.status(500).json({ message: "Internal Server Error" });
// //     }
// //   }

// //   async updateSeller(req, res) {
// //     try {
// //       const seller = await req.seller;
// //       const updatedSeller = await SellerService.updateSeller(
// //         seller,
// //         req.body
// //       );
// //       res.status(200).json(updatedSeller);
// //     } catch (err) {
// //       res
// //         .status(err instanceof SellerError ? 404 : 500)
// //         .json({ message: err.message });
// //     }
// //   }

// //   async deleteSeller(req, res) {
// //     try {
// //       await SellerService.deleteSeller(req.params.id);
// //       res.status(204).send(); // No Content
// //     } catch (err) {
// //       res
// //         .status(err instanceof SellerError ? 404 : 500)
// //         .json({ message: err.message });
// //     }
// //   }

// //   async verifyEmail(req, res) {
// //     try {
// //       const { email, otp } = req.body; // Expecting email and OTP in request body
// //       const seller = await SellerService.verifyEmail(email, otp);
// //       res.status(200).json(seller);
// //     } catch (err) {
// //       res
// //         .status(err instanceof SellerError ? 404 : 500)
// //         .json({ message: err.message });
// //     }
// //   }

// //   async updateSellerAccountStatus(req, res) {
// //     try {
// //       const updatedSeller = await SellerService.updateSellerAccountStatus(
// //         req.params.id,
// //         req.params.status
// //       );
// //       res.status(200).json(updatedSeller);
// //     } catch (err) {
// //       res
// //         .status(err instanceof SellerError ? 404 : 500)
// //         .json({ message: err.message });
// //     }
// //   }

// //   async registerDelhivery(req, res) {
// //     try {
// //       const { id } = req.params;
// //       const updatedSeller = await SellerService.registerWithDelhivery(id);
// //       res.status(200).json(updatedSeller);
// //     } catch (err) {
// //       console.error("[SellerController] registerDelhivery Error:", err);
// //       res.status(500).json({ message: err.message });
// //     }
// //   }

// //   async registerDelhiverySelf(req, res) {
// //     try {
// //       const seller = await req.seller;
// //       const updatedSeller = await SellerService.registerWithDelhivery(seller._id);
// //       res.status(200).json(updatedSeller);
// //     } catch (err) {
// //       console.error("[SellerController] registerDelhiverySelf Error:", err);
// //       res.status(500).json({ message: err.message });
// //     }
// //   }

// //   async verifyLoginOtp(req, res) {
// //     try {
// //       const { otp, email } = req.body;

// //       const seller = await Seller.findOne({ email });



// //       if (!seller) {
// //         throw new SellerError("Invalid username...");
// //       }

// //       const verificationCode = await VerificationCode.findOne({ email });

// //       if (!verificationCode || verificationCode.otp !== otp) {
// //         throw new Error("Wrong OTP...");
// //       }
// //       const token = jwtProvider.createJwt({ email });

// //       const authResponse = {
// //         message: "Login Success",
// //         jwt: token,
// //         role: UserRoles.SELLER,
// //       };

// //       return res.status(200).json(authResponse);
// //     } catch (err) {
// //       res
// //         .status(err instanceof SellerError ? 400 : 500)
// //         .json({ message: err.message });
// //     }
// //   }
// // }

// // module.exports = new SellerController();














// const UserRoles = require("../domain/UserRole");
// const SellerError = require("../exceptions/SellerError");
// const Seller = require("../models/Seller");
// const VerificationCode = require("../models/VerificationCode");
// const SellerService = require("../services/SellerService");
// const VerificationService = require("../services/VerificationService");
// const generateOTP = require("../utils/generateOtp");
// const jwtProvider = require("../utils/jwtProvider");
// const { sendVerificationEmail } = require("../utils/sendEmail");

// class SellerController {
//   async getSellerProfile(req, res) {
//     try {
//       const jwt = req.headers.authorization.split(" ")[1];
//       const seller = await SellerService.getSellerProfile(jwt);
//       res.status(200).json(seller);
//     } catch (err) {
//       res
//         .status(err instanceof SellerError ? 404 : 500)
//         .json({ message: err.message });
//     }
//   }

//   async createSeller(req, res) {
//     try {
//       const newSeller = await SellerService.createSeller(req.body);

//       // Generate OTP
//       const otp = generateOTP();
//       await VerificationService.createVerificationCode(otp, req.body.email);

//       // Send verification email (only once)
//       const subject = "Selfysnap Email Verification Code";
//       const text = "Welcome to Selfysnap, verify your account using this link: ";
//       const frontendUrl = "https://selfysnap-flks.vercel.app/verify-seller/" + otp;

//       await sendVerificationEmail(req.body.email, subject, text + frontendUrl);

//       return res.status(201).json({
//         message: "Seller created successfully, verification email sent.",
//       });
//     } catch (err) {
//       res
//         .status(err instanceof SellerError ? 400 : 500)
//         .json({ error: err.message });
//     }
//   }

//   async getSellerById(req, res) {
//     try {
//       const seller = await SellerService.getSellerById(req.params.id);
//       res.status(200).json(seller);
//     } catch (err) {
//       res
//         .status(err instanceof SellerError ? 404 : 500)
//         .json({ message: err.message });
//     }
//   }

//   async getAllSellers(req, res) {
//     try {
//       const { status } = req.query;
//       const sellers = await SellerService.getAllSellers(status);
//       res.status(200).json(sellers);
//     } catch (err) {
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   }

//   async updateSeller(req, res) {
//     try {
//       const seller = await req.seller;
//       const updatedSeller = await SellerService.updateSeller(seller, req.body);
//       res.status(200).json(updatedSeller);
//     } catch (err) {
//       res
//         .status(err instanceof SellerError ? 404 : 500)
//         .json({ message: err.message });
//     }
//   }

//   async deleteSeller(req, res) {
//     try {
//       await SellerService.deleteSeller(req.params.id);
//       res.status(204).send();
//     } catch (err) {
//       res
//         .status(err instanceof SellerError ? 404 : 500)
//         .json({ message: err.message });
//     }
//   }

//   async verifyEmail(req, res) {
//     try {
//       const { email, otp } = req.body;
//       const seller = await SellerService.verifyEmail(email, otp);
//       res.status(200).json(seller);
//     } catch (err) {
//       res
//         .status(err instanceof SellerError ? 404 : 500)
//         .json({ message: err.message });
//     }
//   }

//   async updateSellerAccountStatus(req, res) {
//     try {
//       const updatedSeller = await SellerService.updateSellerAccountStatus(
//         req.params.id,
//         req.params.status
//       );
//       res.status(200).json(updatedSeller);
//     } catch (err) {
//       res
//         .status(err instanceof SellerError ? 404 : 500)
//         .json({ message: err.message });
//     }
//   }

//   async registerDelhivery(req, res) {
//     try {
//       const { id } = req.params;
//       const updatedSeller = await SellerService.registerWithDelhivery(id);
//       res.status(200).json(updatedSeller);
//     } catch (err) {
//       console.error("[SellerController] registerDelhivery Error:", err);
//       res.status(500).json({ message: err.message });
//     }
//   }

//   async registerDelhiverySelf(req, res) {
//     try {
//       const seller = await req.seller;
//       const updatedSeller = await SellerService.registerWithDelhivery(seller._id);
//       res.status(200).json(updatedSeller);
//     } catch (err) {
//       console.error("[SellerController] registerDelhiverySelf Error:", err);
//       res.status(500).json({ message: err.message });
//     }
//   }

//   async verifyLoginOtp(req, res) {
//     try {
//       const { otp, email } = req.body;

//       const seller = await Seller.findOne({ email });

//       if (!seller) {
//         throw new SellerError("Invalid username...");
//       }

//       const verificationCode = await VerificationCode.findOne({ email });

//       if (!verificationCode || verificationCode.otp !== otp) {
//         throw new Error("Wrong OTP...");
//       }

//       const token = jwtProvider.createJwt({ email });

//       const authResponse = {
//         message: "Login Success",
//         jwt: token,
//         role: UserRoles.SELLER,
//       };

//       return res.status(200).json(authResponse);
//     } catch (err) {
//       res
//         .status(err instanceof SellerError ? 400 : 500)
//         .json({ message: err.message });
//     }
//   }
// }

// module.exports = new SellerController();









const UserRoles = require("../domain/UserRole");
const SellerError = require("../exceptions/SellerError");
const Seller = require("../models/Seller");
const VerificationCode = require("../models/VerificationCode");
const SellerService = require("../services/SellerService");
const VerificationService = require("../services/VerificationService");
const generateOTP = require("../utils/generateOtp");
const jwtProvider = require("../utils/jwtProvider");
const { sendVerificationEmail } = require("../utils/sendEmail");

class SellerController {
  /* ═══════════════════════════════════════════════
     GET SELLER PROFILE
     ═══════════════════════════════════════════════ */
  async getSellerProfile(req, res) {
    try {
      const jwt = req.headers.authorization.split(" ")[1];
      const seller = await SellerService.getSellerProfile(jwt);
      res.status(200).json(seller);
    } catch (err) {
      res
        .status(err instanceof SellerError ? 404 : 500)
        .json({ message: err.message });
    }
  }

  /* ═══════════════════════════════════════════════
     🔥 CREATE SELLER (with Document Upload + OTP)
     ═══════════════════════════════════════════════ */
  async createSeller(req, res) {
    try {
      console.log("\n════════════════════════════════════════");
      console.log("🔵 [BACKEND] createSeller START");
      console.log("🔵 Body keys:", Object.keys(req.body));
      console.log("🔵 Files:", req.files ? Object.keys(req.files) : "none");
      console.log("════════════════════════════════════════\n");

      /* ─── Parse pickupAddress ─── */
      let pickupAddress = {};
      try {
        if (req.body.pickupAddress) {
          pickupAddress =
            typeof req.body.pickupAddress === "string"
              ? JSON.parse(req.body.pickupAddress)
              : req.body.pickupAddress;
        }
      } catch (e) {
        return res.status(400).json({
          message: "Invalid pickupAddress format",
          error: e.message,
        });
      }

      /* ─── Parse bankDetails ─── */
      let bankDetails = {};
      try {
        if (req.body.bankDetails) {
          bankDetails =
            typeof req.body.bankDetails === "string"
              ? JSON.parse(req.body.bankDetails)
              : req.body.bankDetails;
        }
      } catch (e) {
        return res.status(400).json({
          message: "Invalid bankDetails format",
          error: e.message,
        });
      }

      /* ─── Parse businessDetails ─── */
      let businessDetails = {};
      try {
        if (req.body.businessDetails) {
          businessDetails =
            typeof req.body.businessDetails === "string"
              ? JSON.parse(req.body.businessDetails)
              : req.body.businessDetails;
        }
      } catch (e) {
        return res.status(400).json({
          message: "Invalid businessDetails format",
          error: e.message,
        });
      }

      console.log("✅ Parsed pickupAddress:", pickupAddress);

      /* ─── Documents ─── */
      const documents = {
        gstCertificate: req.files?.gstCertificate?.[0]?.filename || null,
        panCard: req.files?.panCard?.[0]?.filename || null,
        bankProof: req.files?.bankProof?.[0]?.filename || null,
        bankProofType: req.body.bankProofType || "cancelled_cheque",
      };

      /* ─── Validation ─── */
      const errors = [];
      if (!req.body.mobile) errors.push("mobile");
      if (!req.body.GSTIN) errors.push("GSTIN");
      if (!req.body.sellerName) errors.push("sellerName");
      if (!req.body.email) errors.push("email");
      if (!req.body.password) errors.push("password");

      if (!pickupAddress.name) errors.push("pickupAddress.name");
      if (!pickupAddress.mobile) errors.push("pickupAddress.mobile");
      if (!pickupAddress.pinCode) errors.push("pickupAddress.pinCode");
      if (!pickupAddress.address) errors.push("pickupAddress.address");
      if (!pickupAddress.locality) errors.push("pickupAddress.locality");
      if (!pickupAddress.city) errors.push("pickupAddress.city");
      if (!pickupAddress.state) errors.push("pickupAddress.state");

      if (errors.length > 0) {
        console.error("❌ Missing fields:", errors);
        return res.status(400).json({
          message: "Missing required fields",
          missing: errors,
        });
      }

      /* ─── Create seller via service ─── */
      const sellerData = {
        mobile: req.body.mobile,
        GSTIN: req.body.GSTIN,
        sellerName: req.body.sellerName,
        email: req.body.email,
        password: req.body.password,
        pickupAddress,
        bankDetails,
        businessDetails,
        documents,
      };

      const newSeller = await SellerService.createSeller(sellerData);
      console.log("✅ Seller created:", newSeller._id);

      /* ─── Generate OTP ─── */
      const otp = generateOTP();
      console.log("🔑 Generated OTP:", otp, "| Type:", typeof otp);

      /* ─── Save verification code ─── */
      await VerificationService.createVerificationCode(otp, req.body.email);
      console.log("💾 Verification code saved for:", req.body.email);

      /* ─── Build verification link ─── */
      const FRONTEND_URL =
        process.env.FRONTEND_URL || "http://localhost:5173";
      const frontendUrl = `${FRONTEND_URL}/verify-seller/${otp}`;

      console.log("════════════════════════════════════════");
      console.log("🔗 Verification Link:", frontendUrl);
      console.log("🔑 OTP:", otp);
      console.log("════════════════════════════════════════");

      /* ─── Send email ─── */
      try {
        await sendVerificationEmail(
          req.body.email,
          "🎉 Welcome to SelfySnap - Verify Your Email",
          frontendUrl,
          otp
        );
        console.log("✅ Verification email sent");
      } catch (emailErr) {
        console.error("⚠️ Email failed (ignoring):", emailErr.message);
        console.log("🔗 Use this link manually:", frontendUrl);
      }

      return res.status(201).json({
        success: true,
        message: "Seller created successfully, verification email sent.",
        sellerId: newSeller._id,
        verificationLink:
          process.env.NODE_ENV === "development" ? frontendUrl : undefined,
      });
    } catch (err) {
      console.error("❌ createSeller error:", err);
      res.status(err instanceof SellerError ? 400 : 500).json({
        error: err.message,
      });
    }
  }

  /* ═══════════════════════════════════════════════
     GET SELLER BY ID
     ═══════════════════════════════════════════════ */
  async getSellerById(req, res) {
    try {
      const seller = await SellerService.getSellerById(req.params.id);
      res.status(200).json(seller);
    } catch (err) {
      res
        .status(err instanceof SellerError ? 404 : 500)
        .json({ message: err.message });
    }
  }

  /* ═══════════════════════════════════════════════
     GET ALL SELLERS
     ═══════════════════════════════════════════════ */
  async getAllSellers(req, res) {
    try {
      const { status } = req.query;
      const sellers = await SellerService.getAllSellers(status);
      res.status(200).json(sellers);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  /* ═══════════════════════════════════════════════
     UPDATE SELLER
     ═══════════════════════════════════════════════ */
  async updateSeller(req, res) {
    try {
      const seller = await req.seller;
      const updatedSeller = await SellerService.updateSeller(seller, req.body);
      res.status(200).json(updatedSeller);
    } catch (err) {
      res
        .status(err instanceof SellerError ? 404 : 500)
        .json({ message: err.message });
    }
  }

  /* ═══════════════════════════════════════════════
     DELETE SELLER
     ═══════════════════════════════════════════════ */
  async deleteSeller(req, res) {
    try {
      await SellerService.deleteSeller(req.params.id);
      res.status(204).send();
    } catch (err) {
      res
        .status(err instanceof SellerError ? 404 : 500)
        .json({ message: err.message });
    }
  }

  /* ═══════════════════════════════════════════════
     🔥 VERIFY EMAIL (Registration OTP)
     ═══════════════════════════════════════════════ */
  async verifyEmail(req, res) {
    try {
      const { otp } = req.body;

      console.log("\n════════════════════════════════════════");
      console.log("🔵 [VERIFY EMAIL] START");
      console.log("🔵 Received OTP:", otp, "| Type:", typeof otp);
      console.log("════════════════════════════════════════\n");

      if (!otp) {
        return res.status(400).json({ message: "OTP is required" });
      }

      const allCodes = await VerificationCode.find()
        .sort({ createdAt: -1 })
        .limit(10);

      console.log("🔵 All OTPs in DB:");
      allCodes.forEach((c, i) => {
        console.log(
          `   [${i}] otp="${c.otp}" (type: ${typeof c.otp}) | email=${c.email}`
        );
      });

      /* ─── Find verification record ─── */
      let verificationRecord = null;

      verificationRecord = await VerificationCode.findOne({
        otp: Number(otp),
      });
      console.log("🔵 [Try 1] Number match:", !!verificationRecord);

      if (!verificationRecord) {
        verificationRecord = await VerificationCode.findOne({
          otp: String(otp),
        });
        console.log("🔵 [Try 2] String match:", !!verificationRecord);
      }

      if (!verificationRecord) {
        verificationRecord = await VerificationCode.findOne({
          otp: { $regex: `^${otp}$` },
        });
        console.log("🔵 [Try 3] Regex match:", !!verificationRecord);
      }

      if (!verificationRecord) {
        const all = await VerificationCode.find();
        verificationRecord = all.find((c) => String(c.otp) === String(otp));
        console.log("🔵 [Try 4] Manual scan:", !!verificationRecord);
      }

      if (!verificationRecord) {
        console.log("❌ No match found for OTP:", otp);
        return res.status(404).json({
          message: "Invalid or expired OTP. Please register again.",
        });
      }

      console.log("✅ Verification record found for:", verificationRecord.email);

      /* ─── Find seller ─── */
      const seller = await Seller.findOne({
        email: verificationRecord.email,
      });

      if (!seller) {
        return res.status(404).json({
          message: "Seller not found: " + verificationRecord.email,
        });
      }

      /* ─── Mark verified ─── */
      seller.isEmailVerified = true;
      await seller.save();
      console.log("✅ Seller marked as verified");

      /* ─── Delete OTP ─── */
      await VerificationCode.deleteOne({ _id: verificationRecord._id });
      console.log("🗑️  Verification code deleted");

      return res.status(200).json({
        success: true,
        message: "Email verified successfully",
        seller: {
          _id: seller._id,
          email: seller.email,
          sellerName: seller.sellerName,
        },
      });
    } catch (err) {
      console.error("❌ [VERIFY EMAIL] Error:", err);
      res.status(500).json({
        message: err.message || "Failed to verify email",
      });
    }
  }

  /* ═══════════════════════════════════════════════
     UPDATE SELLER ACCOUNT STATUS
     ═══════════════════════════════════════════════ */
  async updateSellerAccountStatus(req, res) {
    try {
      const updatedSeller = await SellerService.updateSellerAccountStatus(
        req.params.id,
        req.params.status
      );
      res.status(200).json(updatedSeller);
    } catch (err) {
      res
        .status(err instanceof SellerError ? 404 : 500)
        .json({ message: err.message });
    }
  }

  /* ═══════════════════════════════════════════════
     REGISTER WITH DELHIVERY (Admin)
     ═══════════════════════════════════════════════ */
  async registerDelhivery(req, res) {
    try {
      const { id } = req.params;
      const updatedSeller = await SellerService.registerWithDelhivery(id);
      res.status(200).json(updatedSeller);
    } catch (err) {
      console.error("[SellerController] registerDelhivery Error:", err);
      res.status(500).json({ message: err.message });
    }
  }

  /* ═══════════════════════════════════════════════
     REGISTER WITH DELHIVERY (Self)
     ═══════════════════════════════════════════════ */
  async registerDelhiverySelf(req, res) {
    try {
      const seller = await req.seller;
      const updatedSeller = await SellerService.registerWithDelhivery(
        seller._id
      );
      res.status(200).json(updatedSeller);
    } catch (err) {
      console.error("[SellerController] registerDelhiverySelf Error:", err);
      res.status(500).json({ message: err.message });
    }
  }

  /* ═══════════════════════════════════════════════
     🔥 SEND LOGIN OTP (Seller Login) – NEW!
     ═══════════════════════════════════════════════ */
  async sentLoginOtp(req, res) {
    try {
      const { email } = req.body;

      console.log("\n════════════════════════════════════════");
      console.log("🔵 [SEND LOGIN OTP] Received email:", email);
      console.log("════════════════════════════════════════\n");

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      /* ─── Find seller ─── */
      const seller = await Seller.findOne({ email });

      if (!seller) {
        console.log("❌ Seller not found for:", email);
        return res.status(404).json({
          message: "No seller account found with this email",
        });
      }

      console.log("✅ Seller found:", seller._id, seller.sellerName);

      /* ─── Generate OTP ─── */
      const otp = generateOTP();
      console.log("🔑 Login OTP generated:", otp, "| Type:", typeof otp);

      /* ─── Save verification code ─── */
      await VerificationService.createVerificationCode(otp, email);
      console.log("💾 Login OTP saved for:", email);

      /* ─── Send email ─── */
      try {
        await sendVerificationEmail(
          email,
          "🔐 SelfySnap - Login Verification Code",
          null,
          otp
        );
        console.log("✅ Login OTP email sent");
      } catch (emailErr) {
        console.error("⚠️ Email failed (ignoring):", emailErr.message);
        console.log("🔑 Use this OTP manually:", otp);
      }

      return res.status(200).json({
        success: true,
        message: "OTP sent to your email successfully",
      });
    } catch (err) {
      console.error("❌ sentLoginOtp error:", err);
      res.status(500).json({
        message: err.message || "Failed to send OTP",
      });
    }
  }

  /* ═══════════════════════════════════════════════
     🔥 VERIFY LOGIN OTP
     ═══════════════════════════════════════════════ */
  async verifyLoginOtp(req, res) {
    try {
      const { otp, email } = req.body;

      console.log("\n════════════════════════════════════════");
      console.log("🔵 [VERIFY LOGIN OTP] Email:", email, "| OTP:", otp);
      console.log("════════════════════════════════════════\n");

      if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
      }

      /* ─── Find seller ─── */
      const seller = await Seller.findOne({ email });
      if (!seller) {
        throw new SellerError("Seller not found");
      }

      /* ─── Find verification code ─── */
      const verificationCode = await VerificationCode.findOne({ email });

      if (!verificationCode) {
        return res.status(400).json({ message: "No OTP found. Please request a new one." });
      }

      /* ─── Compare OTP (support both types) ─── */
      const otpMatches =
        String(verificationCode.otp) === String(otp) ||
        Number(verificationCode.otp) === Number(otp);

      if (!otpMatches) {
        throw new Error("Wrong OTP");
      }

      /* ─── Delete OTP (one-time use) ─── */
      await VerificationCode.deleteOne({ _id: verificationCode._id });

      /* ─── Generate JWT ─── */
      const token = jwtProvider.createJwt({ email });

      return res.status(200).json({
        message: "Login Success",
        jwt: token,
        role: UserRoles.SELLER,
        seller: {
          _id: seller._id,
          sellerName: seller.sellerName,
          email: seller.email,
        },
      });
    } catch (err) {
      console.error("❌ [VERIFY LOGIN OTP] Error:", err);
      res
        .status(err instanceof SellerError ? 400 : 500)
        .json({ message: err.message });
    }
  }
}

module.exports = new SellerController();


