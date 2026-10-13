// // const SupportCall = require("../models/SupportCall");
// // const Seller = require("../models/Seller");

// // class SupportCallService {
// //   async createRequest(sellerId, data) {
// //     const { subject, description, priority, category } = data;
// //     if (!subject) throw new Error("Subject is required");

// //     const seller = await Seller.findById(sellerId);
// //     if (!seller) throw new Error("Seller not found");

// //     // Rate limit: 3 per 30 minutes
// //     const recentCount = await SupportCall.countDocuments({
// //       seller: sellerId,
// //       createdAt: { $gte: new Date(Date.now() - 30 * 60 * 1000) },
// //     });
// //     if (recentCount >= 3) {
// //       throw new Error("Too many requests. Wait 30 minutes.");
// //     }

// //     const call = new SupportCall({
// //       seller: sellerId,
// //       sellerName: seller.sellerName || seller.name,
// //       sellerMobile: seller.mobile || seller.phone,
// //       subject,
// //       description: description || "",
// //       priority: priority || "MEDIUM",
// //       category: category || "OTHER",
// //       status: "PENDING",
// //       timeline: [{
// //         status: "PENDING",
// //         note: "Support call requested",
// //         at: new Date(),
// //         by: sellerId,
// //       }],
// //     });

// //     await call.save();

// //     // 🔥 Socket notification
// //     try {
// //       const populated = await SupportCall.findById(call._id)
// //         .populate("seller", "sellerName email mobile businessDetails.businessName");

// //       if (global.io) {
// //         global.io.to("admin_room").emit("new_support_call", {
// //           call: populated,
// //           timestamp: new Date(),
// //         });
// //         console.log(`📢 Notified admins about call ${call._id}`);
// //       }
// //     } catch (err) {
// //       console.error("Socket emit failed:", err.message);
// //     }

// //     return call;
// //   }

// //   async getMyRequests(sellerId) {
// //     return await SupportCall.find({ seller: sellerId })
// //       .populate("handledBy", "name email")
// //       .sort("-createdAt");
// //   }

// //   async getPendingCalls(status) {
// //     const filter = {};
// //     if (status && status !== "all") filter.status = status;
// //     return await SupportCall.find(filter)
// //       .populate("seller", "sellerName email mobile businessDetails.businessName")
// //       .populate("handledBy", "name email")
// //       .sort({ priority: -1, createdAt: -1 });
// //   }

// //   async acknowledge(callId, adminId) {
// //     const call = await SupportCall.findById(callId);
// //     if (!call) throw new Error("Call not found");

// //     call.status = "ACKNOWLEDGED";
// //     call.handledBy = adminId;
// //     call.handledAt = new Date();
// //     call.timeline.push({
// //       status: "ACKNOWLEDGED",
// //       note: "Admin acknowledged",
// //       at: new Date(),
// //       by: adminId,
// //     });
// //     const saved = await call.save();

// //     if (global.io) {
// //       global.io.to(`seller_${call.seller}`).emit("call_acknowledged", {
// //         callId: call._id,
// //       });
// //     }
// //     return saved;
// //   }

// //   async startCall(callId, adminId) {
// //     const call = await SupportCall.findById(callId);
// //     if (!call) throw new Error("Call not found");

// //     call.status = "CALLING";
// //     call.handledBy = adminId;
// //     call.timeline.push({
// //       status: "CALLING",
// //       note: "Admin is calling seller",
// //       at: new Date(),
// //       by: adminId,
// //     });
// //     const saved = await call.save();

// //     if (global.io) {
// //       global.io.to(`seller_${call.seller}`).emit("incoming_call", {
// //         callId: call._id,
// //         message: "Support team is calling you",
// //       });
// //     }
// //     return saved;
// //   }

// //   async resolve(callId, adminId, note) {
// //     const call = await SupportCall.findById(callId);
// //     if (!call) throw new Error("Call not found");

// //     call.status = "RESOLVED";
// //     call.resolutionNote = note || "Issue resolved";
// //     call.timeline.push({
// //       status: "RESOLVED",
// //       note: call.resolutionNote,
// //       at: new Date(),
// //       by: adminId,
// //     });
// //     const saved = await call.save();

// //     if (global.io) {
// //       global.io.to(`seller_${call.seller}`).emit("call_resolved", {
// //         callId: call._id,
// //         note: call.resolutionNote,
// //       });
// //     }
// //     return saved;
// //   }

// //   async markMissed(callId, adminId, note) {
// //     const call = await SupportCall.findById(callId);
// //     if (!call) throw new Error("Call not found");

// //     call.status = "MISSED";
// //     call.resolutionNote = note || "Seller not reachable";
// //     call.timeline.push({
// //       status: "MISSED",
// //       note: call.resolutionNote,
// //       at: new Date(),
// //       by: adminId,
// //     });
// //     return await call.save();
// //   }

// //   async getStats() {
// //     const stats = await SupportCall.aggregate([
// //       { $group: { _id: "$status", count: { $sum: 1 } } },
// //     ]);
// //     const pending = await SupportCall.countDocuments({ status: "PENDING" });
// //     const calling = await SupportCall.countDocuments({ status: "CALLING" });
// //     const resolvedToday = await SupportCall.countDocuments({
// //       status: "RESOLVED",
// //       updatedAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
// //     });
// //     return { stats, pending, calling, resolvedToday };
// //   }
// // }

// // module.exports = new SupportCallService();





// const SupportCall = require("../models/SupportCall");
// const Seller = require("../models/Seller");
// const User = require("../models/User");

// class SupportCallService {
//   /* ═══════════════════════════════════════════
//      SELLER: Create support request
//      ═══════════════════════════════════════════ */
//   async createRequest(sellerId, data, userInfo = {}) {
//     const { subject, description, priority, category } = data;
//     if (!subject) throw new Error("Subject is required");

//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
//     console.log("🔍 [SERVICE] sellerId:", sellerId);
//     console.log("🔍 [SERVICE] userInfo keys:", Object.keys(userInfo));
//     console.log("🔍 [SERVICE] userInfo.sellerName:", userInfo.sellerName);
//     console.log("🔍 [SERVICE] userInfo.fullName:", userInfo.fullName);
//     console.log("🔍 [SERVICE] userInfo.mobile:", userInfo.mobile);
//     console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");

//     /* ═══════════════════════════════════════════
//        STEP 1: Try DB lookup (extra fallback)
//        ═══════════════════════════════════════════ */
//     let dbRecord = null;

//     try {
//       dbRecord = await Seller.findById(sellerId).lean();
//       if (dbRecord) console.log("✅ Found in Seller collection");
//     } catch (err) {
//       console.log("⚠️ Seller lookup failed:", err.message);
//     }

//     if (!dbRecord) {
//       try {
//         dbRecord = await User.findById(sellerId).lean();
//         if (dbRecord) console.log("✅ Found in User collection");
//       } catch (err) {
//         console.log("⚠️ User lookup failed:", err.message);
//       }
//     }

//     /* ═══════════════════════════════════════════
//        STEP 2: Merge — userInfo first, DB overrides
//        ═══════════════════════════════════════════ */
//     const merged = { ...userInfo, ...(dbRecord || {}) };

//     console.log("🔍 [MERGED] sellerName:", merged.sellerName);
//     console.log("🔍 [MERGED] fullName:", merged.fullName);
//     console.log("🔍 [MERGED] mobile:", merged.mobile);

//     /* ═══════════════════════════════════════════
//        STEP 3: Extract with fallbacks
//        ═══════════════════════════════════════════ */
//     const sellerName =
//       merged.sellerName ||
//       merged.fullName ||
//       merged.name ||
//       merged.businessDetails?.businessName ||
//       "Unknown Seller";

//     const sellerMobile =
//       merged.mobile ||
//       merged.phone ||
//       merged.businessDetails?.businessMobile ||
//       "N/A";

//     const sellerEmail =
//       merged.email || merged.businessDetails?.businessEmail || "";

//     const sellerBusinessName =
//       merged.businessDetails?.businessName || "";

//     console.log("━━━━━ [FINAL DATA] ━━━━━");
//     console.log("Name:", sellerName);
//     console.log("Mobile:", sellerMobile);
//     console.log("Email:", sellerEmail);
//     console.log("Business:", sellerBusinessName);

//     /* ═══════════════════════════════════════════
//        STEP 4: Rate limit
//        ═══════════════════════════════════════════ */
//     const recentCount = await SupportCall.countDocuments({
//       seller: sellerId,
//       createdAt: { $gte: new Date(Date.now() - 30 * 60 * 1000) },
//     });
//     if (recentCount >= 3) {
//       throw new Error("Too many requests. Please wait 30 minutes.");
//     }

//     /* ═══════════════════════════════════════════
//        STEP 5: Save
//        ═══════════════════════════════════════════ */
//     const call = new SupportCall({
//       seller: sellerId,
//       sellerName,
//       sellerMobile,
//       sellerEmail,
//       sellerBusinessName,
//       subject,
//       description: description || "",
//       priority: priority || "MEDIUM",
//       category: category || "OTHER",
//       status: "PENDING",
//       timeline: [
//         {
//           status: "PENDING",
//           note: `Support call requested by ${sellerName}`,
//           at: new Date(),
//           by: sellerId,
//         },
//       ],
//     });

//     await call.save();
//     console.log("✅ [SupportCall] Created:", call._id);

//     /* ═══════════════════════════════════════════
//        STEP 6: Socket emit
//        ═══════════════════════════════════════════ */
//     try {
//       const populated = await SupportCall.findById(call._id).populate(
//         "seller",
//         "sellerName fullName email mobile businessDetails"
//       );
//       if (global.io) {
//         global.io.to("admin_room").emit("new_support_call", {
//           call: populated,
//           timestamp: new Date(),
//         });
//         console.log("📢 Notified admins");
//       }
//     } catch (err) {
//       console.error("⚠️ Socket error:", err.message);
//     }

//     return call;
//   }

//   /* ═══════════════════════════════════════════
//      SELLER: My call history
//      ═══════════════════════════════════════════ */
//   async getMyRequests(sellerId) {
//     return await SupportCall.find({ seller: sellerId })
//       .populate("handledBy", "name fullName email")
//       .sort("-createdAt");
//   }

//   /* ═══════════════════════════════════════════
//      ADMIN: Get all calls
//      ═══════════════════════════════════════════ */
//   async getPendingCalls(status) {
//     const filter = {};
//     if (status && status !== "all") filter.status = status;

//     return await SupportCall.find(filter)
//       .populate("seller", "sellerName fullName email mobile businessDetails")
//       .populate("handledBy", "name fullName email")
//       .sort({ priority: -1, createdAt: -1 });
//   }

//   /* ═══════════════════════════════════════════
//      ADMIN: Acknowledge
//      ═══════════════════════════════════════════ */
//   async acknowledge(callId, adminId) {
//     const call = await SupportCall.findById(callId);
//     if (!call) throw new Error("Call not found");

//     call.status = "ACKNOWLEDGED";
//     call.handledBy = adminId;
//     call.handledAt = new Date();
//     call.timeline.push({
//       status: "ACKNOWLEDGED",
//       note: "Admin acknowledged the request",
//       at: new Date(),
//       by: adminId,
//     });

//     const saved = await call.save();

//     if (global.io) {
//       global.io.to(`seller_${call.seller}`).emit("call_acknowledged", {
//         callId: call._id,
//       });
//     }

//     return saved;
//   }

//   /* ═══════════════════════════════════════════
//      ADMIN: Start call
//      ═══════════════════════════════════════════ */
//   async startCall(callId, adminId) {
//     const call = await SupportCall.findById(callId);
//     if (!call) throw new Error("Call not found");

//     call.status = "CALLING";
//     call.handledBy = adminId;
//     call.timeline.push({
//       status: "CALLING",
//       note: "Admin is calling seller",
//       at: new Date(),
//       by: adminId,
//     });

//     const saved = await call.save();

//     if (global.io) {
//       global.io.to(`seller_${call.seller}`).emit("incoming_call", {
//         callId: call._id,
//         message: "Support team is calling you now",
//       });
//     }

//     return saved;
//   }

//   /* ═══════════════════════════════════════════
//      ADMIN: Resolve
//      ═══════════════════════════════════════════ */
//   async resolve(callId, adminId, note) {
//     const call = await SupportCall.findById(callId);
//     if (!call) throw new Error("Call not found");

//     call.status = "RESOLVED";
//     call.resolutionNote = note || "Issue resolved";
//     call.timeline.push({
//       status: "RESOLVED",
//       note: call.resolutionNote,
//       at: new Date(),
//       by: adminId,
//     });

//     const saved = await call.save();

//     if (global.io) {
//       global.io.to(`seller_${call.seller}`).emit("call_resolved", {
//         callId: call._id,
//         note: call.resolutionNote,
//       });
//     }

//     return saved;
//   }

//   /* ═══════════════════════════════════════════
//      ADMIN: Mark missed
//      ═══════════════════════════════════════════ */
//   async markMissed(callId, adminId, note) {
//     const call = await SupportCall.findById(callId);
//     if (!call) throw new Error("Call not found");

//     call.status = "MISSED";
//     call.resolutionNote = note || "Seller not reachable";
//     call.timeline.push({
//       status: "MISSED",
//       note: call.resolutionNote,
//       at: new Date(),
//       by: adminId,
//     });

//     return await call.save();
//   }

//   /* ═══════════════════════════════════════════
//      ADMIN: Stats
//      ═══════════════════════════════════════════ */
//   async getStats() {
//     const stats = await SupportCall.aggregate([
//       { $group: { _id: "$status", count: { $sum: 1 } } },
//     ]);

//     const pending = await SupportCall.countDocuments({ status: "PENDING" });
//     const calling = await SupportCall.countDocuments({ status: "CALLING" });
//     const resolvedToday = await SupportCall.countDocuments({
//       status: "RESOLVED",
//       updatedAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
//     });

//     return { stats, pending, calling, resolvedToday };
//   }
// }

// module.exports = new SupportCallService();








const SupportCall = require("../models/SupportCall");
const Seller = require("../models/Seller");
const User = require("../models/User");
const twilioClient = require("../config/twilioClient"); // 🔥 NEW

class SupportCallService {
  /* ═══════════════════════════════════════════
     SELLER: Create support request
     ═══════════════════════════════════════════ */
  async createRequest(sellerId, data, userInfo = {}) {
    const { subject, description, priority, category } = data;
    if (!subject) throw new Error("Subject is required");

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🔍 [SERVICE] sellerId:", sellerId);
    console.log("🔍 [SERVICE] userInfo keys:", Object.keys(userInfo));
    console.log("🔍 [SERVICE] userInfo.sellerName:", userInfo.sellerName);
    console.log("🔍 [SERVICE] userInfo.fullName:", userInfo.fullName);
    console.log("🔍 [SERVICE] userInfo.mobile:", userInfo.mobile);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    let dbRecord = null;

    try {
      dbRecord = await Seller.findById(sellerId).lean();
      if (dbRecord) console.log("✅ Found in Seller collection");
    } catch (err) {
      console.log("⚠️ Seller lookup failed:", err.message);
    }

    if (!dbRecord) {
      try {
        dbRecord = await User.findById(sellerId).lean();
        if (dbRecord) console.log("✅ Found in User collection");
      } catch (err) {
        console.log("⚠️ User lookup failed:", err.message);
      }
    }

    const merged = { ...userInfo, ...(dbRecord || {}) };

    const sellerName =
      merged.sellerName ||
      merged.fullName ||
      merged.name ||
      merged.businessDetails?.businessName ||
      "Unknown Seller";

    const sellerMobile =
      merged.mobile ||
      merged.phone ||
      merged.businessDetails?.businessMobile ||
      "N/A";

    const sellerEmail =
      merged.email || merged.businessDetails?.businessEmail || "";

    const sellerBusinessName =
      merged.businessDetails?.businessName || "";

    console.log("━━━━━ [FINAL DATA] ━━━━━");
    console.log("Name:", sellerName);
    console.log("Mobile:", sellerMobile);
    console.log("Email:", sellerEmail);
    console.log("Business:", sellerBusinessName);

    const recentCount = await SupportCall.countDocuments({
      seller: sellerId,
      createdAt: { $gte: new Date(Date.now() - 30 * 60 * 1000) },
    });
    if (recentCount >= 3) {
      throw new Error("Too many requests. Please wait 30 minutes.");
    }

    const call = new SupportCall({
      seller: sellerId,
      sellerName,
      sellerMobile,
      sellerEmail,
      sellerBusinessName,
      subject,
      description: description || "",
      priority: priority || "MEDIUM",
      category: category || "OTHER",
      status: "PENDING",
      timeline: [
        {
          status: "PENDING",
          note: `Support call requested by ${sellerName}`,
          at: new Date(),
          by: sellerId,
        },
      ],
    });

    await call.save();
    console.log("✅ [SupportCall] Created:", call._id);

    try {
      const populated = await SupportCall.findById(call._id).populate(
        "seller",
        "sellerName fullName email mobile businessDetails"
      );
      if (global.io) {
        global.io.to("admin_room").emit("new_support_call", {
          call: populated,
          timestamp: new Date(),
        });
        console.log("📢 Notified admins");
      }
    } catch (err) {
      console.error("⚠️ Socket error:", err.message);
    }

    return call;
  }

  /* ═══════════════════════════════════════════
     SELLER: My call history
     ═══════════════════════════════════════════ */
  async getMyRequests(sellerId) {
    return await SupportCall.find({ seller: sellerId })
      .populate("handledBy", "name fullName email")
      .sort("-createdAt");
  }

  /* ═══════════════════════════════════════════
     ADMIN: Get all calls
     ═══════════════════════════════════════════ */
  async getPendingCalls(status) {
    const filter = {};
    if (status && status !== "all") filter.status = status;

    return await SupportCall.find(filter)
      .populate("seller", "sellerName fullName email mobile businessDetails")
      .populate("handledBy", "name fullName email")
      .sort({ priority: -1, createdAt: -1 });
  }

  /* ═══════════════════════════════════════════
     ADMIN: Acknowledge
     ═══════════════════════════════════════════ */
  async acknowledge(callId, adminId) {
    const call = await SupportCall.findById(callId);
    if (!call) throw new Error("Call not found");

    call.status = "ACKNOWLEDGED";
    call.handledBy = adminId;
    call.handledAt = new Date();
    call.timeline.push({
      status: "ACKNOWLEDGED",
      note: "Admin acknowledged the request",
      at: new Date(),
      by: adminId,
    });

    const saved = await call.save();

    if (global.io) {
      global.io.to(`seller_${call.seller}`).emit("call_acknowledged", {
        callId: call._id,
      });
    }

    return saved;
  }

  /* ═══════════════════════════════════════════
     🔥 ADMIN: Start call — TWILIO INTEGRATED
     ═══════════════════════════════════════════ */
  async startCall(callId, adminId) {
    const call = await SupportCall.findById(callId);
    if (!call) throw new Error("Call not found");

    console.log("━━━━━━━━━ [TWILIO CALL] ━━━━━━━━━");
    console.log("Seller:", call.sellerName, "|", call.sellerMobile);

    // Status update
    call.status = "CALLING";
    call.handledBy = adminId;
    call.timeline.push({
      status: "CALLING",
      note: "Admin is calling seller via Twilio",
      at: new Date(),
      by: adminId,
    });
    await call.save();

    try {
      // Admin number from .env
      const adminMobile = process.env.ADMIN_MOBILE || "9876543210";
      const cleanSeller = call.sellerMobile.replace(/[^0-9]/g, "");
      const cleanAdmin = adminMobile.replace(/[^0-9]/g, "");

      const sellerNumber = cleanSeller.startsWith("91")
        ? `+${cleanSeller}`
        : `+91${cleanSeller}`;
      const adminNumber = cleanAdmin.startsWith("91")
        ? `+${cleanAdmin}`
        : `+91${cleanAdmin}`;

      console.log("📞 Admin:", adminNumber, "| Seller:", sellerNumber);

      // Twilio call
      const twilioCall = await twilioClient.calls.create({
        to: adminNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
        url: `${process.env.BACKEND_URL}/api/twilio/twiml?to=${encodeURIComponent(sellerNumber)}`,
        record: true,
        timeout: 30,
      });

      console.log("✅ [Twilio] Call SID:", twilioCall.sid);

      // Socket notify seller
      if (global.io) {
        global.io.to(`seller_${call.seller}`).emit("incoming_call", {
          callId: call._id,
          message: "Support team is calling you now",
        });
      }

      return { call, twilioSid: twilioCall.sid };
    } catch (err) {
      console.error("❌ [Twilio] Error:", err.message);
      call.status = "MISSED";
      call.timeline.push({
        status: "MISSED",
        note: `Twilio error: ${err.message}`,
        at: new Date(),
      });
      await call.save();
      throw new Error("Twilio call failed: " + err.message);
    }
  }

  /* ═══════════════════════════════════════════
     ADMIN: Resolve
     ═══════════════════════════════════════════ */
  async resolve(callId, adminId, note) {
    const call = await SupportCall.findById(callId);
    if (!call) throw new Error("Call not found");

    call.status = "RESOLVED";
    call.resolutionNote = note || "Issue resolved";
    call.timeline.push({
      status: "RESOLVED",
      note: call.resolutionNote,
      at: new Date(),
      by: adminId,
    });

    const saved = await call.save();

    if (global.io) {
      global.io.to(`seller_${call.seller}`).emit("call_resolved", {
        callId: call._id,
        note: call.resolutionNote,
      });
    }

    return saved;
  }

  /* ═══════════════════════════════════════════
     ADMIN: Mark missed
     ═══════════════════════════════════════════ */
  async markMissed(callId, adminId, note) {
    const call = await SupportCall.findById(callId);
    if (!call) throw new Error("Call not found");

    call.status = "MISSED";
    call.resolutionNote = note || "Seller not reachable";
    call.timeline.push({
      status: "MISSED",
      note: call.resolutionNote,
      at: new Date(),
      by: adminId,
    });

    return await call.save();
  }

  /* ═══════════════════════════════════════════
     ADMIN: Stats
     ═══════════════════════════════════════════ */
  async getStats() {
    const stats = await SupportCall.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const pending = await SupportCall.countDocuments({ status: "PENDING" });
    const calling = await SupportCall.countDocuments({ status: "CALLING" });
    const resolvedToday = await SupportCall.countDocuments({
      status: "RESOLVED",
      updatedAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    });

    return { stats, pending, calling, resolvedToday };
  }
}

module.exports = new SupportCallService();