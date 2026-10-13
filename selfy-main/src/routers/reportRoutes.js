const express = require('express');
const router = express.Router();
const { 
    getDashboardStats, 
    getSalesReport, 
    getInventoryReport 
} = require('../controllers/reportController');

// Routes
router.get('/dashboard', getDashboardStats);
router.get('/sales', getSalesReport);
router.get('/inventory', getInventoryReport);

module.exports = router;