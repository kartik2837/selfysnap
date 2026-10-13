// backend/routes/gstRoutes.js

const express = require('express');
const router = express.Router();
const {
  getGSTReport,
  getMonthlyGSTSummary,
} = require('../controllers/gstController');

router.get('/report', getGSTReport);
router.get('/monthly-summary', getMonthlyGSTSummary);

module.exports = router;