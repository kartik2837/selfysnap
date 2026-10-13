const BrandService = require('../services/BrandService');

class BrandController {
    async createBrandRequest(req, res) {
        try {
            const brand = await BrandService.createBrandRequest(req.user._id, req.body);
            res.status(201).json({
                success: true,
                message: 'Brand request submitted! Admin will review.',
                brand,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getMyBrands(req, res) {
        try {
            const brands = await BrandService.getMyBrands(req.user._id);
            res.status(200).json(brands);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllBrandRequests(req, res) {
        try {
            const brands = await BrandService.getAllBrandRequests(req.query.status);
            res.status(200).json(brands);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async approveBrand(req, res) {
        try {
            const brand = await BrandService.approveBrand(req.params.id, req.user._id);
            res.status(200).json({ success: true, brand });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async rejectBrand(req, res) {
        try {
            const { reason } = req.body;
            const brand = await BrandService.rejectBrand(req.params.id, req.user._id, reason);
            res.status(200).json({ success: true, brand });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new BrandController();