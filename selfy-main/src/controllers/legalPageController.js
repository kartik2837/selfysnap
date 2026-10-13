const LegalPage = require("../models/LegalPage");

class LegalPageController {
  /* ═══════════ PUBLIC — No Auth Needed ═══════════ */

  /* 🔥 Get single page by slug */
  async getPageBySlug(req, res) {
    try {
      const { slug } = req.params;

      const page = await LegalPage.findOne({
        slug: slug.toLowerCase(),
        isActive: true,
      }).lean();

      if (!page) {
        return res.status(404).json({ error: "Page not found" });
      }

      LegalPage.findByIdAndUpdate(page._id, { $inc: { views: 1 } }).exec();

      res.json(page);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /* 🔥 Get all active pages (footer ke liye) */
  async getAllActivePages(req, res) {
    try {
      const pages = await LegalPage.find({ isActive: true })
        .select("slug title category order")
        .sort({ order: 1, title: 1 })
        .lean();

      res.json(pages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /* ═══════════ ADMIN ═══════════ */

  /* ═══════════════════════════════════════════════
     🔥 FIXED — Same key name conflict resolved
     ═══════════════════════════════════════════════ */
  async adminGetAllPages(req, res) {
    try {
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 20;
      const search = req.query.search || "";

      const filter = {};
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { slug: { $regex: search, $options: "i" } },
        ];
      }

      const [pagesList, total] = await Promise.all([
        LegalPage.find(filter)
          .select("-content")
          .sort({ order: 1, createdAt: -1 })
          .skip(page * limit)
          .limit(limit)
          .lean(),
        LegalPage.countDocuments(filter),
      ]);

      /* 🔥 FIX: Alag naam use kiye — koi conflict nahi */
      res.json({
        pages: pagesList,                        // ✅ Array
        totalElements: total,                    // ✅ Total documents
        page: page,                              // ✅ Current page
        totalPages: Math.ceil(total / limit),    // ✅ Renamed from "pages"
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async adminGetPageById(req, res) {
    try {
      const page = await LegalPage.findById(req.params.id).lean();
      if (!page) return res.status(404).json({ error: "Page not found" });
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createPage(req, res) {
    try {
      const {
        title, slug, content, description, category,
        metaTitle, metaDescription, order, isActive,
      } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: "Title and content required" });
      }

      const finalSlug =
        slug ||
        title.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

      const existing = await LegalPage.findOne({ slug: finalSlug });
      if (existing) {
        return res.status(400).json({ error: "Slug already exists" });
      }

      const page = await LegalPage.create({
        title,
        slug: finalSlug,
        content,
        description,
        category: category || "general",
        metaTitle,
        metaDescription,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
      });

      res.status(201).json(page);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updatePage(req, res) {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      if (updateData.slug) {
        const existing = await LegalPage.findOne({
          slug: updateData.slug,
          _id: { $ne: id },
        });
        if (existing) {
          return res.status(400).json({ error: "Slug already exists" });
        }
      }

      const page = await LegalPage.findByIdAndUpdate(
        id,
        { $set: updateData, $inc: { version: 1 } },
        { new: true, runValidators: true }
      );

      if (!page) return res.status(404).json({ error: "Page not found" });
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async togglePageStatus(req, res) {
    try {
      const page = await LegalPage.findById(req.params.id);
      if (!page) return res.status(404).json({ error: "Page not found" });

      page.isActive = !page.isActive;
      await page.save();

      res.json({ message: "Updated", isActive: page.isActive });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deletePage(req, res) {
    try {
      const page = await LegalPage.findById(req.params.id);
      if (!page) return res.status(404).json({ error: "Page not found" });

      if (page.isSystem) {
        return res.status(400).json({
          error: "System pages cannot be deleted. Deactivate instead.",
        });
      }

      await LegalPage.findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new LegalPageController();