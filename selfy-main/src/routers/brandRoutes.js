const express = require('express');
const controller = require('../controllers/BrandController');
const authMiddleware = require('../middlewares/userAuthMiddleware');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

/* SELLER */
router.post('/seller/request', authMiddleware, controller.createBrandRequest);
router.get('/seller/my-brands', authMiddleware, controller.getMyBrands);

/* ADMIN */
router.get('/admin/all', adminAuthMiddleware, controller.getAllBrandRequests);
router.patch('/admin/:id/approve', adminAuthMiddleware, controller.approveBrand);
router.patch('/admin/:id/reject', adminAuthMiddleware, controller.rejectBrand);

module.exports = router;