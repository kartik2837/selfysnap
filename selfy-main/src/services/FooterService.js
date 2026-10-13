const Footer = require("../models/Footer");
const Page = require("../models/FooterContent");

class FooterService {

  /* ================= FOOTER ================= */

  static async create(data) {
    return await Footer.create(data);
  }

  static async getAll() {
    return await Footer.find();
  }

  static async getById(id) {
    return await Footer.findById(id);
  }

  static async update(id, data) {
    return await Footer.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id) {
    return await Footer.findByIdAndDelete(id);
  }


  /* ================= PAGE (CONTENT) ================= */

  static async createPage(data) {
    return await Page.create(data);
  }

  static async getAllPages() {
    return await Page.find().sort({ createdAt: -1 });
  }

  static async getPageById(id) {
    return await Page.findById(id);
  }

  static async getPageBySlug(slug) {
    return await Page.findOne({ slug });
  }

  static async updatePage(id, data) {
    return await Page.findByIdAndUpdate(id, data, { new: true });
  }

  static async deletePage(id) {
    return await Page.findByIdAndDelete(id);
  }
}

module.exports = FooterService;