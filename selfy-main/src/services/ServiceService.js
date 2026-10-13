const Service = require("../models/Service");

class ServiceService {
  async createService(data, adminId) {
    const {
      name,
      slug,
      category,
      icon,
      price,
      description,
      deliveryDays,
      features,
    } = data;

    const finalSlug =
      (slug && slug.trim()) ||
      name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const exists = await Service.findOne({ slug: finalSlug });
    if (exists) throw new Error(`Slug "${finalSlug}" already exists`);

    const service = new Service({
      name: name.trim(),
      slug: finalSlug,
      category,
      icon: icon || "🎨",
      price: Number(price),
      description: description || "",
      deliveryDays: Number(deliveryDays) || 3,
      features: features || [],
      isActive: true,
      createdBy: adminId,
    });

    return await service.save();
  }

  async getAllServicesAdmin() {
    return await Service.find()
      .populate("createdBy", "name email")
      .sort("-createdAt");
  }

  async getActiveServices(category) {
    const filter = { isActive: true };
    if (category && category !== "all") filter.category = category;
    return await Service.find(filter).sort("price");
  }

  async getBySlug(slug) {
    const service = await Service.findOne({ slug, isActive: true });
    if (!service) throw new Error("Service not found");
    return service;
  }

  async updateService(id, data) {
    if (data.slug) {
      const exists = await Service.findOne({
        slug: data.slug,
        _id: { $ne: id },
      });
      if (exists) throw new Error("Slug already exists");
    }
    const service = await Service.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
    if (!service) throw new Error("Service not found");
    return service;
  }

  async deleteService(id) {
    const service = await Service.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    if (!service) throw new Error("Service not found");
    return service;
  }

  async toggleActive(id) {
    const service = await Service.findById(id);
    if (!service) throw new Error("Service not found");
    service.isActive = !service.isActive;
    return await service.save();
  }
}

module.exports = new ServiceService();