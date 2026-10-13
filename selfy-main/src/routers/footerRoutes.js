const router = require("express").Router();
const controller = require("../controllers/footerController");

// FOOTER
router.post("/footer", controller.createFooter);
router.get("/footer", controller.getFooters);
router.get("/footer/:id", controller.getFooter);
router.put("/footer/:id", controller.updateFooter);
router.delete("/footer/:id", controller.deleteFooter);

// PAGE
router.post("/pages", controller.createPage);
router.get("/pages", controller.getPages);
router.get("/pages/slug/:slug", controller.getPageBySlug);
router.get("/pages/:id", controller.getPage);
router.put("/pages/:id", controller.updatePage);
router.delete("/pages/:id", controller.deletePage);

module.exports = router;
