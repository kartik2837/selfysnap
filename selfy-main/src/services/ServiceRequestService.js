// const ServiceRequest = require("../models/ServiceRequest");
// const Service = require("../models/Service");
// const Seller = require("../models/Seller");
// const User = require("../models/User");
// const razorpay = require("../config/razorpayClient");
// const crypto = require("crypto");

// class ServiceRequestService {
//   /* ═══════════════════════════════════════════
//      SELLER: Create request
//      ═══════════════════════════════════════════ */
//   async createRequest(sellerId, data, userInfo = {}) {
//     const { serviceSlug, title, description, specificNotes, files } = data;

//     if (!serviceSlug) throw new Error("Service is required");
//     if (!title) throw new Error("Title is required");
//     if (!description) throw new Error("Description is required");

//     const service = await Service.findOne({
//       slug: serviceSlug,
//       isActive: true,
//     });
//     if (!service) throw new Error("Service not found");

//     let dbRecord = null;
//     try {
//       dbRecord = await Seller.findById(sellerId).lean();
//     } catch (err) {}
//     if (!dbRecord) {
//       try {
//         dbRecord = await User.findById(sellerId).lean();
//       } catch (err) {}
//     }

//     const merged = { ...userInfo, ...(dbRecord || {}) };
//     const sellerName =
//       merged.sellerName || merged.fullName || merged.name || "Unknown Seller";
//     const sellerMobile = merged.mobile || merged.phone || "N/A";

//     const referenceFiles = (files || []).map((f) => ({
//       originalName: f.originalName || f.name,
//       url: f.url,
//       size: f.size || 0,
//       type: "reference",
//       uploadedAt: new Date(),
//     }));

//     const request = new ServiceRequest({
//       seller: sellerId,
//       service: service._id,
//       serviceName: service.name,
//       servicePrice: service.price,
//       serviceCategory: service.category,
//       title: title.trim(),
//       description: description.trim(),
//       specificNotes: specificNotes || "",
//       status: "PENDING",
//       files: referenceFiles,
//       timeline: [
//         {
//           status: "PENDING",
//           note: `Request submitted by ${sellerName}`,
//           at: new Date(),
//           by: sellerId,
//         },
//       ],
//     });

//     await request.save();
//     console.log("✅ [ServiceRequest] Created:", request._id);

//     try {
//       const populated = await ServiceRequest.findById(request._id)
//         .populate("seller", "sellerName fullName email mobile")
//         .populate("service", "name icon");

//       if (global.io) {
//         global.io.to("admin_room").emit("new_service_request", {
//           request: populated,
//           timestamp: new Date(),
//         });
//         console.log("📢 Notified admins");
//       }
//     } catch (err) {
//       console.error("⚠️ Socket error:", err.message);
//     }

//     return request;
//   }

//   async getMyRequests(sellerId) {
//     return await ServiceRequest.find({ seller: sellerId })
//       .populate("assignedAdmin", "name fullName email")
//       .sort("-createdAt");
//   }

//   async getAllRequests(status) {
//     const filter = {};
//     if (status && status !== "all") filter.status = status;

//     return await ServiceRequest.find(filter)
//       .populate("seller", "sellerName fullName email mobile businessDetails")
//       .populate("assignedAdmin", "name fullName email")
//       .populate("service", "name icon category")
//       .sort({ priority: -1, createdAt: -1 });
//   }

//   async approveRequest(id, adminId, price, note) {
//     if (!price || price <= 0) throw new Error("Valid price required");

//     const request = await ServiceRequest.findById(id);
//     if (!request) throw new Error("Request not found");
//     if (request.status !== "PENDING") {
//       throw new Error(`Cannot approve. Status: ${request.status}`);
//     }

//     request.status = "APPROVED";
//     request.price = Number(price);
//     request.isPriceSet = true;
//     request.timeline.push({
//       status: "APPROVED",
//       note: note || `Approved. Pay ₹${price}`,
//       at: new Date(),
//       by: adminId,
//     });

//     const saved = await request.save();

//     if (global.io) {
//       global.io.to(`seller_${request.seller}`).emit("request_approved", {
//         requestId: request._id,
//         price: request.price,
//       });
//     }

//     return saved;
//   }

//   async rejectRequest(id, adminId, reason) {
//     const request = await ServiceRequest.findById(id);
//     if (!request) throw new Error("Request not found");
//     if (request.status !== "PENDING") {
//       throw new Error(`Cannot reject. Status: ${request.status}`);
//     }

//     request.status = "REJECTED";
//     request.rejectionReason = reason || "Not specified";
//     request.timeline.push({
//       status: "REJECTED",
//       note: `Rejected: ${request.rejectionReason}`,
//       at: new Date(),
//       by: adminId,
//     });

//     return await request.save();
//   }

//   /* ═══════════════════════════════════════════
//      🔥 RAZORPAY: Create Payment Order (Step 1)
//      ═══════════════════════════════════════════ */
//   async createPaymentOrder(id, sellerId) {
//     const request = await ServiceRequest.findById(id);
//     if (!request) throw new Error("Request not found");
//     if (String(request.seller) !== String(sellerId)) {
//       throw new Error("Not your request");
//     }
//     if (request.status !== "APPROVED") {
//       throw new Error(`Cannot pay. Status: ${request.status}`);
//     }
//     if (request.isPaid) throw new Error("Already paid");

//     const razorpayOrder = await razorpay.orders.create({
//       amount: Math.round(request.price * 100),
//       currency: "INR",
//       receipt: `service_${request._id.toString().slice(-10)}`,
//       notes: {
//         requestId: request._id.toString(),
//         sellerId: sellerId.toString(),
//       },
//     });

//     request.payment = {
//       razorpayOrderId: razorpayOrder.id,
//       amount: request.price,
//       status: "created",
//     };
//     await request.save();

//     console.log("✅ [Razorpay] Order created:", razorpayOrder.id);

//     return {
//       orderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//       keyId: "rzp_live_SAkK1UBHwykxcB",
//       requestId: request._id,
//     };
//   }

//   /* ═══════════════════════════════════════════
//      🔥 RAZORPAY: Verify Payment (Step 2)
//      ═══════════════════════════════════════════ */
//   async verifyPayment(id, sellerId, paymentData) {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       paymentData;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       throw new Error("Payment data incomplete");
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac(
//         "sha256", "XtTn5uHPkh72I4N0un1UHGb9"
        
//       )
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       console.error("❌ [Razorpay] Signature mismatch");
//       throw new Error("Payment verification failed");
//     }

//     const request = await ServiceRequest.findById(id);
//     if (!request) throw new Error("Request not found");

//     request.status = "PAID";
//     request.isPaid = true;
//     request.payment = {
//       ...request.payment,
//       razorpayOrderId: razorpay_order_id,
//       razorpayPaymentId: razorpay_payment_id,
//       razorpaySignature: razorpay_signature,
//       amount: request.price,
//       txnId: razorpay_payment_id,
//       paidAt: new Date(),
//       method: "razorpay",
//       status: "paid",
//     };
//     request.timeline.push({
//       status: "PAID",
//       note: `Payment of ₹${request.price} received via Razorpay`,
//       at: new Date(),
//       by: sellerId,
//     });

//     const saved = await request.save();
//     console.log("✅ [Razorpay] Payment verified for:", request._id);

//     if (global.io) {
//       global.io.to("admin_room").emit("payment_received", {
//         requestId: request._id,
//         amount: request.price,
//       });
//     }

//     return saved;
//   }

//   async assignSelf(id, adminId) {
//     const request = await ServiceRequest.findById(id);
//     if (!request) throw new Error("Request not found");
//     if (request.status !== "PAID") {
//       throw new Error(`Payment required. Status: ${request.status}`);
//     }

//     request.assignedAdmin = adminId;
//     request.assignedAt = new Date();
//     request.status = "IN_PROGRESS";
//     request.timeline.push({
//       status: "IN_PROGRESS",
//       note: "Admin assigned to work",
//       at: new Date(),
//       by: adminId,
//     });

//     const saved = await request.save();

//     if (global.io) {
//       global.io.to(`seller_${request.seller}`).emit("work_started", {
//         requestId: request._id,
//       });
//     }

//     return saved;
//   }

//   async deliverRequest(id, adminId, files, note) {
//     const request = await ServiceRequest.findById(id);
//     if (!request) throw new Error("Request not found");
//     if (request.status !== "IN_PROGRESS") {
//       throw new Error(`Cannot deliver. Status: ${request.status}`);
//     }
//     if (!files || files.length === 0) {
//       throw new Error("Upload at least one file");
//     }

//     files.forEach((f) => {
//       request.files.push({
//         originalName: f.originalName || f.name,
//         url: f.url,
//         size: f.size || 0,
//         type: "delivery",
//         uploadedAt: new Date(),
//       });
//     });

//     request.status = "DELIVERED";
//     request.deliveredAt = new Date();
//     request.deliveryNote = note || "Delivered";
//     request.timeline.push({
//       status: "DELIVERED",
//       note: `${files.length} file(s) delivered`,
//       at: new Date(),
//       by: adminId,
//     });

//     const saved = await request.save();

//     if (global.io) {
//       global.io.to(`seller_${request.seller}`).emit("files_delivered", {
//         requestId: request._id,
//       });
//     }

//     return saved;
//   }

//   async completeRequest(id, sellerId) {
//     const request = await ServiceRequest.findById(id);
//     if (!request) throw new Error("Request not found");
//     if (String(request.seller) !== String(sellerId)) {
//       throw new Error("Not your request");
//     }
//     if (request.status !== "DELIVERED") {
//       throw new Error(`Cannot complete. Status: ${request.status}`);
//     }

//     request.status = "COMPLETED";
//     request.completedAt = new Date();
//     request.timeline.push({
//       status: "COMPLETED",
//       note: "Seller downloaded files and marked complete",
//       at: new Date(),
//       by: sellerId,
//     });

//     return await request.save();
//   }

//   async getRequestById(id) {
//     return await ServiceRequest.findById(id)
//       .populate("seller", "sellerName fullName email mobile businessDetails")
//       .populate("assignedAdmin", "name fullName email")
//       .populate("service", "name icon category");
//   }
// }

// module.exports = new ServiceRequestService();

















const ServiceRequest = require("../models/ServiceRequest");
const Service = require("../models/Service");
const Seller = require("../models/Seller");
const User = require("../models/User");
const razorpay = require("../config/razorpayClient");
const crypto = require("crypto");

/* ═══════════════════════════════════════════
   🔥 RAZORPAY LIVE KEYS (hardcoded)
   ═══════════════════════════════════════════ */
const RAZORPAY_KEY_ID = "rzp_live_SAkK1UBHwykxcB";
const RAZORPAY_KEY_SECRET = "XtTn5uHPkh72I4N0un1UHGb9";

class ServiceRequestService {
  /* ═══════════════════════════════════════════
     SELLER: Create request
     ═══════════════════════════════════════════ */
  async createRequest(sellerId, data, userInfo = {}) {
    const { serviceSlug, title, description, specificNotes, files } = data;

    if (!serviceSlug) throw new Error("Service is required");
    if (!title) throw new Error("Title is required");
    if (!description) throw new Error("Description is required");

    const service = await Service.findOne({
      slug: serviceSlug,
      isActive: true,
    });
    if (!service) throw new Error("Service not found");

    let dbRecord = null;
    try {
      dbRecord = await Seller.findById(sellerId).lean();
    } catch (err) {}
    if (!dbRecord) {
      try {
        dbRecord = await User.findById(sellerId).lean();
      } catch (err) {}
    }

    const merged = { ...userInfo, ...(dbRecord || {}) };
    const sellerName =
      merged.sellerName || merged.fullName || merged.name || "Unknown Seller";
    const sellerMobile = merged.mobile || merged.phone || "N/A";

    const referenceFiles = (files || []).map((f) => ({
      originalName: f.originalName || f.name,
      url: f.url,
      size: f.size || 0,
      type: "reference",
      uploadedAt: new Date(),
    }));

    const request = new ServiceRequest({
      seller: sellerId,
      service: service._id,
      serviceName: service.name,
      servicePrice: service.price,
      serviceCategory: service.category,
      title: title.trim(),
      description: description.trim(),
      specificNotes: specificNotes || "",
      status: "PENDING",
      files: referenceFiles,
      timeline: [
        {
          status: "PENDING",
          note: `Request submitted by ${sellerName}`,
          at: new Date(),
          by: sellerId,
        },
      ],
    });

    await request.save();
    console.log("✅ [ServiceRequest] Created:", request._id);

    try {
      const populated = await ServiceRequest.findById(request._id)
        .populate("seller", "sellerName fullName email mobile")
        .populate("service", "name icon");

      if (global.io) {
        global.io.to("admin_room").emit("new_service_request", {
          request: populated,
          timestamp: new Date(),
        });
        console.log("📢 Notified admins");
      }
    } catch (err) {
      console.error("⚠️ Socket error:", err.message);
    }

    return request;
  }

  async getMyRequests(sellerId) {
    return await ServiceRequest.find({ seller: sellerId })
      .populate("assignedAdmin", "name fullName email")
      .sort("-createdAt");
  }

  async getAllRequests(status) {
    const filter = {};
    if (status && status !== "all") filter.status = status;

    return await ServiceRequest.find(filter)
      .populate("seller", "sellerName fullName email mobile businessDetails")
      .populate("assignedAdmin", "name fullName email")
      .populate("service", "name icon category")
      .sort({ priority: -1, createdAt: -1 });
  }

  async approveRequest(id, adminId, price, note) {
    if (!price || price <= 0) throw new Error("Valid price required");

    const request = await ServiceRequest.findById(id);
    if (!request) throw new Error("Request not found");
    if (request.status !== "PENDING") {
      throw new Error(`Cannot approve. Status: ${request.status}`);
    }

    request.status = "APPROVED";
    request.price = Number(price);
    request.isPriceSet = true;
    request.timeline.push({
      status: "APPROVED",
      note: note || `Approved. Pay ₹${price}`,
      at: new Date(),
      by: adminId,
    });

    const saved = await request.save();

    if (global.io) {
      global.io.to(`seller_${request.seller}`).emit("request_approved", {
        requestId: request._id,
        price: request.price,
      });
    }

    return saved;
  }

  async rejectRequest(id, adminId, reason) {
    const request = await ServiceRequest.findById(id);
    if (!request) throw new Error("Request not found");
    if (request.status !== "PENDING") {
      throw new Error(`Cannot reject. Status: ${request.status}`);
    }

    request.status = "REJECTED";
    request.rejectionReason = reason || "Not specified";
    request.timeline.push({
      status: "REJECTED",
      note: `Rejected: ${request.rejectionReason}`,
      at: new Date(),
      by: adminId,
    });

    return await request.save();
  }

  /* ═══════════════════════════════════════════
     🔥 RAZORPAY: Create Payment Order (Step 1)
     ═══════════════════════════════════════════ */
  async createPaymentOrder(id, sellerId) {
    const request = await ServiceRequest.findById(id);
    if (!request) throw new Error("Request not found");
    if (String(request.seller) !== String(sellerId)) {
      throw new Error("Not your request");
    }
    if (request.status !== "APPROVED") {
      throw new Error(`Cannot pay. Status: ${request.status}`);
    }
    if (request.isPaid) throw new Error("Already paid");

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(request.price * 100),
      currency: "INR",
      receipt: `service_${request._id.toString().slice(-10)}`,
      notes: {
        requestId: request._id.toString(),
        sellerId: sellerId.toString(),
      },
    });

    request.payment = {
      razorpayOrderId: razorpayOrder.id,
      amount: request.price,
      status: "created",
    };
    await request.save();

    console.log("✅ [Razorpay] Order created:", razorpayOrder.id);
    console.log("✅ [Razorpay] Key used:", RAZORPAY_KEY_ID);

    return {
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: RAZORPAY_KEY_ID,
      requestId: request._id,
    };
  }

  /* ═══════════════════════════════════════════
     🔥 RAZORPAY: Verify Payment (Step 2)
     ═══════════════════════════════════════════ */
  async verifyPayment(id, sellerId, paymentData) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      paymentData;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new Error("Payment data incomplete");
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("❌ [Razorpay] Signature mismatch");
      throw new Error("Payment verification failed");
    }

    const request = await ServiceRequest.findById(id);
    if (!request) throw new Error("Request not found");

    request.status = "PAID";
    request.isPaid = true;
    request.payment = {
      ...request.payment,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      amount: request.price,
      txnId: razorpay_payment_id,
      paidAt: new Date(),
      method: "razorpay",
      status: "paid",
    };
    request.timeline.push({
      status: "PAID",
      note: `Payment of ₹${request.price} received via Razorpay`,
      at: new Date(),
      by: sellerId,
    });

    const saved = await request.save();
    console.log("✅ [Razorpay] Payment verified for:", request._id);

    if (global.io) {
      global.io.to("admin_room").emit("payment_received", {
        requestId: request._id,
        amount: request.price,
      });
    }

    return saved;
  }

  async assignSelf(id, adminId) {
    const request = await ServiceRequest.findById(id);
    if (!request) throw new Error("Request not found");
    if (request.status !== "PAID") {
      throw new Error(`Payment required. Status: ${request.status}`);
    }

    request.assignedAdmin = adminId;
    request.assignedAt = new Date();
    request.status = "IN_PROGRESS";
    request.timeline.push({
      status: "IN_PROGRESS",
      note: "Admin assigned to work",
      at: new Date(),
      by: adminId,
    });

    const saved = await request.save();

    if (global.io) {
      global.io.to(`seller_${request.seller}`).emit("work_started", {
        requestId: request._id,
      });
    }

    return saved;
  }

  async deliverRequest(id, adminId, files, note) {
    const request = await ServiceRequest.findById(id);
    if (!request) throw new Error("Request not found");
    if (request.status !== "IN_PROGRESS") {
      throw new Error(`Cannot deliver. Status: ${request.status}`);
    }
    if (!files || files.length === 0) {
      throw new Error("Upload at least one file");
    }

    files.forEach((f) => {
      request.files.push({
        originalName: f.originalName || f.name,
        url: f.url,
        size: f.size || 0,
        type: "delivery",
        uploadedAt: new Date(),
      });
    });

    request.status = "DELIVERED";
    request.deliveredAt = new Date();
    request.deliveryNote = note || "Delivered";
    request.timeline.push({
      status: "DELIVERED",
      note: `${files.length} file(s) delivered`,
      at: new Date(),
      by: adminId,
    });

    const saved = await request.save();

    if (global.io) {
      global.io.to(`seller_${request.seller}`).emit("files_delivered", {
        requestId: request._id,
      });
    }

    return saved;
  }

  async completeRequest(id, sellerId) {
    const request = await ServiceRequest.findById(id);
    if (!request) throw new Error("Request not found");
    if (String(request.seller) !== String(sellerId)) {
      throw new Error("Not your request");
    }
    if (request.status !== "DELIVERED") {
      throw new Error(`Cannot complete. Status: ${request.status}`);
    }

    request.status = "COMPLETED";
    request.completedAt = new Date();
    request.timeline.push({
      status: "COMPLETED",
      note: "Seller downloaded files and marked complete",
      at: new Date(),
      by: sellerId,
    });

    return await request.save();
  }

  async getRequestById(id) {
    return await ServiceRequest.findById(id)
      .populate("seller", "sellerName fullName email mobile businessDetails")
      .populate("assignedAdmin", "name fullName email")
      .populate("service", "name icon category");
  }
}

module.exports = new ServiceRequestService();