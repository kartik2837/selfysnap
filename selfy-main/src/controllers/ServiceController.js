const ServiceService = require("../services/ServiceService");

class ServiceController {
  async createService(req, res) {
    try {
      const { name, category, price } = req.body;
      if (!name || !category || price === undefined) {
        return res.status(400).json({ message: "Name, category, price required" });
      }

      const service = await ServiceService.createService(req.body, req.user._id);
      res.status(201).json({ success: true, service });
    } catch (error) {
      console.error("❌ [createService]", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async getAllServicesAdmin(req, res) {
    try {
      const services = await ServiceService.getAllServicesAdmin();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getActiveServices(req, res) {
    try {
      const services = await ServiceService.getActiveServices(req.query.category);
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getServiceBySlug(req, res) {
    try {
      const service = await ServiceService.getBySlug(req.params.slug);
      res.status(200).json(service);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async updateService(req, res) {
    try {
      const service = await ServiceService.updateService(req.params.id, req.body);
      res.status(200).json({ success: true, service });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteService(req, res) {
    try {
      const service = await ServiceService.deleteService(req.params.id);
      res.status(200).json({ success: true, service });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async toggleActive(req, res) {
    try {
      const service = await ServiceService.toggleActive(req.params.id);
      res.status(200).json({ success: true, service });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ServiceController();