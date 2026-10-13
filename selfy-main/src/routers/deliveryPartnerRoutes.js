const express = require('express');
const router = express.Router();

// Public: Check pincode serviceability (Delhivery)
router.get('/check-serviceability/:pincode', async (req, res) => {
    try {
        const { pincode } = req.params;
        const DelhiveryService = require('../services/DelhiveryService');
        const data = await DelhiveryService.checkServiceability(pincode);

        // Delhivery response parsing: check if any centers are returned for this pincode
        const isServiceable = data.delivery_codes && data.delivery_codes.length > 0;

        res.status(200).json({
            pincode,
            isServiceable,
            data: data.delivery_codes?.[0] || null
        });
    } catch (error) {
        res.status(500).json({ message: 'Serviceability check failed', error: error.message });
    }
});

module.exports = router;