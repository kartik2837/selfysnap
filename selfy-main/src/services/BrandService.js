const Brand = require('../models/Brand');

class BrandService {
    async createBrandRequest(sellerId, data) {
        const { name, certificateUrl, certificateNumber } = data;

        if (!name || !certificateUrl || !certificateNumber) {
            throw new Error('Name, certificate URL and number required');
        }

        const existing = await Brand.findOne({
            seller: sellerId,
            name: { $regex: new RegExp(`^${name}$`, 'i') },
        });

        if (existing) {
            if (existing.status === 'APPROVED') throw new Error('Brand already approved');
            if (existing.status === 'PENDING') throw new Error('Brand request already pending');

            existing.certificateUrl = certificateUrl;
            existing.certificateNumber = certificateNumber;
            existing.status = 'PENDING';
            existing.rejectionReason = null;
            return await existing.save();
        }

        const brand = new Brand({
            seller: sellerId,
            name: name.trim(),
            certificateUrl,
            certificateNumber: certificateNumber.trim(),
            status: 'PENDING',
        });

        return await brand.save();
    }

    async getMyBrands(sellerId) {
        return await Brand.find({ seller: sellerId }).sort('-createdAt');
    }

    async getAllBrandRequests(status) {
        const filter = {};
        if (status && status !== 'all') filter.status = status;

        return await Brand.find(filter)
            .populate('seller', 'sellerName email mobile businessDetails.businessName')
            .populate('approvedBy', 'name email')
            .sort('-createdAt');
    }

    async approveBrand(id, adminId) {
        const brand = await Brand.findById(id);
        if (!brand) throw new Error('Brand not found');
        if (brand.status === 'APPROVED') throw new Error('Already approved');

        brand.status = 'APPROVED';
        brand.approvedBy = adminId;
        brand.approvedAt = new Date();
        brand.rejectionReason = null;

        return await brand.save();
    }

    async rejectBrand(id, adminId, reason) {
        const brand = await Brand.findById(id);
        if (!brand) throw new Error('Brand not found');

        brand.status = 'REJECTED';
        brand.rejectionReason = reason || 'Not specified';
        brand.approvedBy = adminId;
        brand.approvedAt = new Date();

        return await brand.save();
    }
}

module.exports = new BrandService();