// const jwtProvider = require("../utils/jwtProvider");
// const UserService = require("../services/UserService");

// const authMiddleware = async (req, res, next) => {
//   try {
//     // 1️⃣ Get the Authorization header
//     const authHeader = req.header("Authorization");
//     if (!authHeader) {
//       return res.status(401).json({ message: "Authorization header is missing" });
//     }

//     // 2️⃣ Extract token (Bearer <token>)
//     const token = authHeader.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "JWT token is missing" });
//     }

//     // 3️⃣ Verify the token
//     let decoded;
//     try {
//       decoded = jwtProvider.verifyJwt(token); // throws if invalid
//     } catch (err) {
//       return res.status(401).json({ message: "Invalid or expired token" });
//     }

//     // 4️⃣ Fetch user by email from decoded token
//     const user = await UserService.findUserByEmail(decoded.email);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // 5️⃣ Attach user to request
//     req.user = user;

//     next(); // pass to next middleware/route handler
//   } catch (error) {
//     console.error("Error in authentication middleware:", error.message);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = authMiddleware;






// const jwtProvider = require("../utils/jwtProvider");
// const UserService = require("../services/UserService");
// const SellerService = require("../services/SellerService"); // 🔥 add karo

// const authMiddleware = async (req, res, next) => {
//   try {
//     // 1️⃣ Authorization header check
//     const authHeader = req.header("Authorization");
//     if (!authHeader) {
//       console.log("❌ [AUTH] No header");
//       return res.status(401).json({ message: "Authorization header is missing" });
//     }

//     // 2️⃣ Token extract
//     const token = authHeader.startsWith("Bearer ")
//       ? authHeader.split(" ")[1]
//       : authHeader;

//     if (!token || token === "null" || token === "undefined") {
//       console.log("❌ [AUTH] Token missing");
//       return res.status(401).json({ message: "JWT token is missing" });
//     }

//     // 3️⃣ Verify
//     let decoded;
//     try {
//       decoded = jwtProvider.verifyJwt(token);
//       console.log("✅ [AUTH] Decoded:", decoded);
//     } catch (err) {
//       console.log("❌ [AUTH] Verify failed:", err.message);
//       return res.status(401).json({ message: "Invalid or expired token" });
//     }

//     // 4️⃣ Fetch user — try multiple approaches
//     let user = null;
//     const emailLower = decoded.email ? decoded.email.toLowerCase().trim() : null;

//     console.log("🔍 [AUTH] Looking for email:", emailLower);

//     // Try UserService first
//     if (emailLower) {
//       try {
//         user = await UserService.findUserByEmail(emailLower);
//       } catch (err) {
//         console.log("⚠️ [AUTH] UserService error:", err.message);
//       }
//     }

//     // Try direct User model
//     if (!user && emailLower) {
//       try {
//         const User = require("../models/User");
//         user = await User.findOne({ email: emailLower });
//         console.log("🔍 [AUTH] User.findById direct:", user ? "found" : "not found");
//       } catch (err) {
//         console.log("⚠️ [AUTH] User model error:", err.message);
//       }
//     }

//     // Try Seller collection (agar tumhara project seller hai)
//     if (!user && emailLower) {
//       try {
//         const Seller = require("../models/Seller");
//         user = await Seller.findOne({ email: emailLower });
//         console.log("🔍 [AUTH] Seller found:", user ? "yes" : "no");
//       } catch (err) {
//         console.log("⚠️ [AUTH] Seller model error:", err.message);
//       }
//     }

//     // Try original email (case-sensitive)
//     if (!user && decoded.email) {
//       try {
//         const User = require("../models/User");
//         user = await User.findOne({ email: decoded.email });
//         console.log("🔍 [AUTH] User (case-sensitive):", user ? "found" : "not found");
//       } catch (err) {
//         console.log("⚠️ [AUTH] Error:", err.message);
//       }
//     }

//     if (!user) {
//       console.log("❌ [AUTH] User not found for:", decoded);
//       return res.status(401).json({ message: "User not found" });
//     }

//     // 5️⃣ Attach
//     req.user = user;
//     console.log("✅ [AUTH] User attached:", user._id, user.email || user.sellerName);

//     next();
//   } catch (error) {
//     console.error("🚨 [AUTH CRASH]");
//     console.error("   Message:", error.message);
//     console.error("   Stack:", error.stack);

//     return res.status(500).json({
//       message: error.message, // 🔥 asli error bhejo, generic nahi
//     });
//   }
// };

// module.exports = authMiddleware;















const jwtProvider = require("../utils/jwtProvider");
const UserService = require("../services/UserService");

const authMiddleware = async (req, res, next) => {
  try {
    /* 1️⃣ Authorization header check */
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      console.log("❌ [AUTH] No header");
      return res.status(401).json({ message: "Authorization header is missing" });
    }

    /* 2️⃣ Token extract */
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token || token === "null" || token === "undefined") {
      console.log("❌ [AUTH] Token missing");
      return res.status(401).json({ message: "JWT token is missing" });
    }

    /* 3️⃣ Verify */
    let decoded;
    try {
      decoded = jwtProvider.verifyJwt(token);
      console.log("✅ [AUTH] Decoded:", decoded);
    } catch (err) {
      console.log("❌ [AUTH] Verify failed:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const emailLower = decoded.email ? decoded.email.toLowerCase().trim() : null;
    console.log("🔍 [AUTH] Looking for email:", emailLower);

    if (!emailLower) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    /* ═══════════════════════════════════════════════
       🔥 ROUTE-BASED LOOKUP
       ═══════════════════════════════════════════════ */
    const isSellerRoute =
      req.originalUrl.includes("/sellers/") ||
      req.originalUrl.includes("/seller/") ||
      req.originalUrl.startsWith("/api/sellers/") ||
      req.originalUrl.startsWith("/api/seller/");

    console.log("🛣️ [AUTH] Seller route?:", isSellerRoute);
    console.log("🛣️ [AUTH] URL:", req.originalUrl);

    let user = null;

    /* 🔥 PRIORITY 1: Agar seller route hai, to Seller me dhundo */
    if (isSellerRoute) {
      try {
        const Seller = require("../models/Seller");
        user = await Seller.findOne({ email: emailLower });

        if (user) {
          console.log(
            "✅ [AUTH] SELLER attached:",
            user._id,
            user.sellerName,
            user.email
          );
          req.seller = user;
          req.user = user; // Dono me set kar (compatibility)
          return next();
        } else {
          console.log("⚠️ [AUTH] No seller found for:", emailLower);
        }
      } catch (err) {
        console.log("⚠️ [AUTH] Seller lookup error:", err.message);
      }
    }

    /* 🔥 PRIORITY 2: User dhundho */
    try {
      user = await UserService.findUserByEmail(emailLower);
    } catch (err) {
      console.log("⚠️ [AUTH] UserService error:", err.message);
    }

    if (!user) {
      try {
        const User = require("../models/User");
        user = await User.findOne({ email: emailLower });
        console.log("🔍 [AUTH] User model:", user ? "found" : "not found");
      } catch (err) {
        console.log("⚠️ [AUTH] User model error:", err.message);
      }
    }

    /* 🔥 PRIORITY 3: Fallback — Seller me dhundo */
    if (!user) {
      try {
        const Seller = require("../models/Seller");
        user = await Seller.findOne({ email: emailLower });
        if (user) {
          console.log("✅ [AUTH] Seller (fallback):", user._id);
          req.seller = user;
        }
      } catch (err) {
        console.log("⚠️ [AUTH] Seller fallback error:", err.message);
      }
    }

    if (!user) {
      console.log("❌ [AUTH] No user/seller found for:", emailLower);
      return res.status(401).json({ message: "User not found" });
    }

    /* 5️⃣ Attach */
    req.user = user;

    /* 🔥 Agar seller hai to req.seller bhi set kar */
    if (user.sellerName) {
      req.seller = user;
    }

    console.log(
      "✅ [AUTH] User attached:",
      user._id,
      user.email || user.sellerName
    );

    next();
  } catch (error) {
    console.error("🚨 [AUTH CRASH]");
    console.error("   Message:", error.message);
    console.error("   Stack:", error.stack);

    return res.status(500).json({ message: error.message });
  }
};

module.exports = authMiddleware;