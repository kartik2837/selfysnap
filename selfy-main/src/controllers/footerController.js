const FooterService = require("../services/FooterService");

/* ================= FOOTER ================= */

exports.createFooter = async (req, res, next) => {
  try {
    const footer = await FooterService.create(req.body);
    res.status(201).json({ success: true, data: footer });
  } catch (error) {
    next(error);
  }
};

exports.getFooters = async (req, res, next) => {
  try {
    const footers = await FooterService.getAll();
    res.json({ success: true, data: footers });
  } catch (error) {
    next(error);
  }
};

exports.getFooter = async (req, res, next) => {
  try {
    const footer = await FooterService.getById(req.params.id);
    if (!footer) return res.status(404).json({ message: "Footer not found" });
    res.json({ success: true, data: footer });
  } catch (error) {
    next(error);
  }
};

exports.updateFooter = async (req, res, next) => {
  try {
    const footer = await FooterService.update(req.params.id, req.body);
    res.json({ success: true, data: footer });
  } catch (error) {
    next(error);
  }
};

exports.deleteFooter = async (req, res, next) => {
  try {
    await FooterService.delete(req.params.id);
    res.json({ success: true, message: "Footer deleted" });
  } catch (error) {
    next(error);
  }
};


/* ================= PAGE ================= */

exports.createPage = async (req, res, next) => {
  try {
    const page = await FooterService.createPage(req.body);
    res.status(201).json({ success: true, data: page });
  } catch (error) {
    next(error);
  }
};

exports.getPages = async (req, res, next) => {
  try {
    const pages = await FooterService.getAllPages();
    res.json({ success: true, data: pages });
  } catch (error) {
    next(error);
  }
};

exports.getPage = async (req, res, next) => {
  try {
    const page = await FooterService.getPageById(req.params.id);
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (error) {
    next(error);
  }
};

exports.getPageBySlug = async (req, res, next) => {
  try {
    const page = await FooterService.getPageBySlug(req.params.slug);
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (error) {
    next(error);
  }
};

exports.updatePage = async (req, res, next) => {
  try {
    const page = await FooterService.updatePage(req.params.id, req.body);
    res.json({ success: true, data: page });
  } catch (error) {
    next(error);
  }
};

exports.deletePage = async (req, res, next) => {
  try {
    await FooterService.deletePage(req.params.id);
    res.json({ success: true, message: "Page deleted" });
  } catch (error) {
    next(error);
  }
};