const ServiceRequestService = require("../services/ServiceRequestService");

class ServiceRequestController {
  /* SELLER */
  async createRequest(req, res) {
    try {
      const userData = req.user.toObject ? req.user.toObject() : { ...req.user };

      const request = await ServiceRequestService.createRequest(
        req.user._id,
        req.body,
        userData
      );

      res.status(201).json({
        success: true,
        message: "Request submitted! Admin will review soon.",
        request,
      });
    } catch (error) {
      console.error("❌ [createRequest]", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async getMyRequests(req, res) {
    try {
      const requests = await ServiceRequestService.getMyRequests(req.user._id);
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /* 🔥 RAZORPAY: Create order */
  async createPaymentOrder(req, res) {
    try {
      const result = await ServiceRequestService.createPaymentOrder(
        req.params.id,
        req.user._id
      );
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      console.error("❌ [createPaymentOrder]", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  /* 🔥 RAZORPAY: Verify payment */
  async verifyPayment(req, res) {
    try {
      const request = await ServiceRequestService.verifyPayment(
        req.params.id,
        req.user._id,
        req.body
      );
      res.status(200).json({ success: true, request });
    } catch (error) {
      console.error("❌ [verifyPayment]", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async completeRequest(req, res) {
    try {
      const request = await ServiceRequestService.completeRequest(
        req.params.id,
        req.user._id
      );
      res.status(200).json({ success: true, request });
    } catch (error) {
      console.error("❌ [completeRequest]", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  /* ADMIN */
  async getAllRequests(req, res) {
    try {
      const requests = await ServiceRequestService.getAllRequests(req.query.status);
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async approveRequest(req, res) {
    try {
      const { price, note } = req.body;
      const request = await ServiceRequestService.approveRequest(
        req.params.id,
        req.user._id,
        price,
        note
      );
      res.status(200).json({ success: true, request });
    } catch (error) {
      console.error("❌ [approveRequest]", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async rejectRequest(req, res) {
    try {
      const { reason } = req.body;
      const request = await ServiceRequestService.rejectRequest(
        req.params.id,
        req.user._id,
        reason
      );
      res.status(200).json({ success: true, request });
    } catch (error) {
      console.error("❌ [rejectRequest]", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async assignSelf(req, res) {
    try {
      const request = await ServiceRequestService.assignSelf(
        req.params.id,
        req.user._id
      );
      res.status(200).json({ success: true, request });
    } catch (error) {
      console.error("❌ [assignSelf]", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async deliverRequest(req, res) {
    try {
      const { files, note } = req.body;
      const request = await ServiceRequestService.deliverRequest(
        req.params.id,
        req.user._id,
        files,
        note
      );
      res.status(200).json({ success: true, request });
    } catch (error) {
      console.error("❌ [deliverRequest]", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async getRequestById(req, res) {
    try {
      const request = await ServiceRequestService.getRequestById(req.params.id);
      if (!request) return res.status(404).json({ message: "Not found" });
      res.status(200).json(request);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ServiceRequestController();