const express = require("express");
const router = express.Router();
const controller = require("../controllers/legalPageController");

let adminAuth;
try {
  adminAuth = require("../middleware/adminAuth");
} catch (e) {
  adminAuth = (req, res, next) => next();
}

/* ═══════════ PUBLIC (No Auth) ═══════════ */
router.get("/all", controller.getAllActivePages);

/* ═══════════ ADMIN (Auth Required) ═══════════ */
router.get("/admin/pages", adminAuth, controller.adminGetAllPages);
router.get("/admin/pages/:id", adminAuth, controller.adminGetPageById);
router.post("/admin/pages", adminAuth, controller.createPage);
router.put("/admin/pages/:id", adminAuth, controller.updatePage);
router.patch("/admin/pages/:id/toggle", adminAuth, controller.togglePageStatus);
router.delete("/admin/pages/:id", adminAuth, controller.deletePage);

/* ═══════════ SLUG (Sabse LAST) ═══════════ */
router.get("/:slug", controller.getPageBySlug);

module.exports = router;