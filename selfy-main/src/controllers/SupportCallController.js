// const SupportCallService = require("../services/SupportCallService");

// class SupportCallController {
//   async createRequest(req, res) {
//     try {
//       const call = await SupportCallService.createRequest(req.user._id, req.body);
//       res.status(201).json({
//         success: true,
//         message: "Support call requested! We'll call you shortly.",
//         call,
//       });
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }

//   async getMyRequests(req, res) {
//     try {
//       const calls = await SupportCallService.getMyRequests(req.user._id);
//       res.status(200).json(calls);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }

//   async getPendingCalls(req, res) {
//     try {
//       const calls = await SupportCallService.getPendingCalls(req.query.status);
//       res.status(200).json(calls);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }

//   async acknowledge(req, res) {
//     try {
//       const call = await SupportCallService.acknowledge(req.params.id, req.user._id);
//       res.status(200).json({ success: true, call });
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }

//   async startCall(req, res) {
//     try {
//       const call = await SupportCallService.startCall(req.params.id, req.user._id);
//       res.status(200).json({ success: true, call });
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }

//   async resolve(req, res) {
//     try {
//       const call = await SupportCallService.resolve(req.params.id, req.user._id, req.body.note);
//       res.status(200).json({ success: true, call });
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }

//   async markMissed(req, res) {
//     try {
//       const call = await SupportCallService.markMissed(req.params.id, req.user._id, req.body.note);
//       res.status(200).json({ success: true, call });
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }

//   async getStats(req, res) {
//     try {
//       const stats = await SupportCallService.getStats();
//       res.status(200).json(stats);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// }

// module.exports = new SupportCallController();



const SupportCallService = require("../services/SupportCallService");

class SupportCallController {
  /* ═══════════════════════════════════════════
     SELLER: Create request
     ═══════════════════════════════════════════ */
  async createRequest(req, res) {
    try {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🔍 [DEBUG] req.user:");
      console.log("   _id:", req.user?._id);
      console.log("   email:", req.user?.email);
      console.log("   sellerName:", req.user?.sellerName);
      console.log("   fullName:", req.user?.fullName);
      console.log("   name:", req.user?.name);
      console.log("   mobile:", req.user?.mobile);
      console.log("   businessDetails:", req.user?.businessDetails);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      // 🔥 Convert Mongoose document to plain object
      const userData = req.user.toObject
        ? req.user.toObject()
        : { ...req.user };

      const call = await SupportCallService.createRequest(
        req.user._id,
        req.body,
        userData
      );

      res.status(201).json({
        success: true,
        message: "Support call requested! We'll call you shortly.",
        call,
      });
    } catch (error) {
      console.error("❌ [createRequest]", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async getMyRequests(req, res) {
    try {
      const calls = await SupportCallService.getMyRequests(req.user._id);
      res.status(200).json(calls);
    } catch (error) {
      console.error("❌ [getMyRequests]", error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async getPendingCalls(req, res) {
    try {
      const calls = await SupportCallService.getPendingCalls(req.query.status);
      res.status(200).json(calls);
    } catch (error) {
      console.error("❌ [getPendingCalls]", error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async acknowledge(req, res) {
    try {
      const call = await SupportCallService.acknowledge(
        req.params.id,
        req.user._id
      );
      res.status(200).json({ success: true, call });
    } catch (error) {
      console.error("❌ [acknowledge]", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async startCall(req, res) {
    try {
      const call = await SupportCallService.startCall(
        req.params.id,
        req.user._id
      );
      res.status(200).json({ success: true, call });
    } catch (error) {
      console.error("❌ [startCall]", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async resolve(req, res) {
    try {
      const call = await SupportCallService.resolve(
        req.params.id,
        req.user._id,
        req.body.note
      );
      res.status(200).json({ success: true, call });
    } catch (error) {
      console.error("❌ [resolve]", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async markMissed(req, res) {
    try {
      const call = await SupportCallService.markMissed(
        req.params.id,
        req.user._id,
        req.body.note
      );
      res.status(200).json({ success: true, call });
    } catch (error) {
      console.error("❌ [markMissed]", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async getStats(req, res) {
    try {
      const stats = await SupportCallService.getStats();
      res.status(200).json(stats);
    } catch (error) {
      console.error("❌ [getStats]", error.message);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new SupportCallController();