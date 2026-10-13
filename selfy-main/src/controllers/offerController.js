// // backend/controllers/offerController.js

// const Offer = require('../models/Offer');
// const {
//   notifyOfferStart,
//   notifyFlashSale,
//   notifyFestivalSale,
//   broadcastNotification,
// } = require('../services/notificationService');

// // ═══════════════════════════════════════════════════
// // 1️⃣ CREATE OFFER (Admin)
// // ═══════════════════════════════════════════════════
// exports.createOffer = async (req, res) => {
//   try {
//     const offerData = {
//       ...req.body,
//       createdBy: req.user?._id || req.seller?._id,
//     };

//     // Auto-generate offer code
//     if (!offerData.offerCode) {
//       offerData.offerCode = `OFFER${Date.now().toString().slice(-6)}`;
//     }

//     const offer = await Offer.create(offerData);

//     // ✅ Notification भेजो (Background में)
//     if (offer.isActive) {
//       sendOfferNotification(offer).catch(console.error);
//     }

//     res.status(201).json({
//       success: true,
//       message: '🎉 Offer Created! Notification भेजी जा रही है...',
//       offer,
//     });
//   } catch (error) {
//     console.error('Create Offer Error:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ═══════════════════════════════════════════════════
// // 2️⃣ GET ALL OFFERS (Admin)
// // ═══════════════════════════════════════════════════
// exports.getAllOffers = async (req, res) => {
//   try {
//     const { page = 1, limit = 20, status } = req.query;

//     let query = {};
//     if (status === 'active') {
//       query.isActive = true;
//       query.endDate = { $gte: new Date() };
//     } else if (status === 'expired') {
//       query.endDate = { $lt: new Date() };
//     } else if (status === 'inactive') {
//       query.isActive = false;
//     }

//     const offers = await Offer.find(query)
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit));

//     const total = await Offer.countDocuments(query);

//     res.json({
//       success: true,
//       offers,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / limit),
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ═══════════════════════════════════════════════════
// // 3️⃣ GET LIVE OFFERS (Customer)
// // ═══════════════════════════════════════════════════
// exports.getLiveOffers = async (req, res) => {
//   try {
//     const now = new Date();

//     const offers = await Offer.find({
//       isActive: true,
//       startDate: { $lte: now },
//       endDate: { $gte: now },
//     }).sort({ isFeatured: -1, priority: -1, createdAt: -1 });

//     res.json({ success: true, offers });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ═══════════════════════════════════════════════════
// // 4️⃣ GET SINGLE OFFER
// // ═══════════════════════════════════════════════════
// exports.getOfferById = async (req, res) => {
//   try {
//     const offer = await Offer.findById(req.params.id);

//     if (!offer) {
//       return res.status(404).json({ success: false, message: 'Offer not found' });
//     }

//     // View count बढ़ाओ
//     offer.viewCount = (offer.viewCount || 0) + 1;
//     await offer.save();

//     res.json({ success: true, offer });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ═══════════════════════════════════════════════════
// // 5️⃣ UPDATE OFFER
// // ═══════════════════════════════════════════════════
// exports.updateOffer = async (req, res) => {
//   try {
//     const offer = await Offer.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true, runValidators: true }
//     );

//     if (!offer) {
//       return res.status(404).json({ success: false, message: 'Offer not found' });
//     }

//     res.json({
//       success: true,
//       message: 'Offer updated successfully',
//       offer,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ═══════════════════════════════════════════════════
// // 6️⃣ DELETE OFFER
// // ═══════════════════════════════════════════════════
// exports.deleteOffer = async (req, res) => {
//   try {
//     const offer = await Offer.findByIdAndDelete(req.params.id);

//     if (!offer) {
//       return res.status(404).json({ success: false, message: 'Offer not found' });
//     }

//     res.json({ success: true, message: 'Offer deleted' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ═══════════════════════════════════════════════════
// // 7️⃣ TOGGLE ACTIVE
// // ═══════════════════════════════════════════════════
// exports.toggleOfferStatus = async (req, res) => {
//   try {
//     const offer = await Offer.findById(req.params.id);
//     if (!offer) {
//       return res.status(404).json({ success: false, message: 'Offer not found' });
//     }

//     offer.isActive = !offer.isActive;
//     await offer.save();

//     // अगर Active किया → Notification भेजो
//     if (offer.isActive) {
//       sendOfferNotification(offer).catch(console.error);
//     }

//     res.json({
//       success: true,
//       message: `Offer ${offer.isActive ? 'Activated' : 'Deactivated'}`,
//       offer,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ═══════════════════════════════════════════════════
// // 8️⃣ SEND NOTIFICATION MANUALLY
// // ═══════════════════════════════════════════════════
// exports.notifyOffer = async (req, res) => {
//   try {
//     const offer = await Offer.findById(req.params.id);
//     if (!offer) {
//       return res.status(404).json({ success: false, message: 'Offer not found' });
//     }

//     const result = await sendOfferNotification(offer);

//     res.json({
//       success: true,
//       message: '🎉 Notification भेज दी गई!',
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ═══════════════════════════════════════════════════
// // 🔧 HELPER: Send Notification Based on Offer Type
// // ═══════════════════════════════════════════════════
// const sendOfferNotification = async (offer) => {
//   const offerData = {
//     title: offer.title,
//     description: offer.description,
//     discountPercent: offer.discountPercent,
//     bannerImage: offer.bannerImage,
//     actionUrl: `/offers/${offer._id}`,
//     expiryDate: offer.endDate,
//     _id: offer._id,
//   };

//   if (offer.offerType === 'FLASH_SALE') {
//     const hoursLeft = Math.ceil(
//       (new Date(offer.endDate) - new Date()) / (1000 * 60 * 60)
//     );
//     return notifyFlashSale({
//       ...offerData,
//       hours: hoursLeft > 0 ? hoursLeft : 2,
//     });
//   }

//   if (offer.offerType === 'FESTIVAL') {
//     return notifyFestivalSale({
//       ...offerData,
//       name: offer.title,
//     });
//   }

//   return notifyOfferStart(offerData);
// };

// // ═══════════════════════════════════════════════════
// // EXPORTS
// // ═══════════════════════════════════════════════════
// module.exports = {
//   createOffer: exports.createOffer,
//   getAllOffers: exports.getAllOffers,
//   getLiveOffers: exports.getLiveOffers,
//   getOfferById: exports.getOfferById,
//   updateOffer: exports.updateOffer,
//   deleteOffer: exports.deleteOffer,
//   toggleOfferStatus: exports.toggleOfferStatus,
//   notifyOffer: exports.notifyOffer,
// };






// backend/src/controllers/offerController.js

const Offer = require('../models/Offer');
const {
  notifyOfferStart,
  notifyFlashSale,
  notifyFestivalSale,
  broadcastNotification,
} = require('../services/notificationService');

// ═══════════════════════════════════════════════════
// 1️⃣ CREATE OFFER (With Image Upload)
// ═══════════════════════════════════════════════════
exports.createOffer = async (req, res) => {
  try {
    console.log('═══════════════════════════════');
    console.log('📥 Create Offer Request');
    console.log('📋 Body:', req.body);
    console.log('📷 File:', req.file);
    console.log('═══════════════════════════════');

    const offerData = { ...req.body };

    // ✅ Image File Upload Handle
    if (req.file) {
      const imagePath = `/uploads/offers/${req.file.filename}`;
      offerData.bannerImage = imagePath;
      offerData.bannerImageFile = imagePath;
      console.log('✅ Image saved:', imagePath);
    } else if (offerData.bannerImage) {
      console.log('✅ Using Image URL:', offerData.bannerImage);
    }

    // ─── Number Fields Convert ────────────────────────
    if (offerData.discountPercent)
      offerData.discountPercent = Number(offerData.discountPercent);
    if (offerData.flatDiscount)
      offerData.flatDiscount = Number(offerData.flatDiscount);
    if (offerData.maxDiscount)
      offerData.maxDiscount = Number(offerData.maxDiscount);
    if (offerData.minPurchaseAmount)
      offerData.minPurchaseAmount = Number(offerData.minPurchaseAmount);

    // ─── Boolean Fields Convert ───────────────────────
    if (offerData.isActive === 'true' || offerData.isActive === true)
      offerData.isActive = true;
    else if (offerData.isActive === 'false' || offerData.isActive === false)
      offerData.isActive = false;

    if (offerData.isFeatured === 'true' || offerData.isFeatured === true)
      offerData.isFeatured = true;
    else if (
      offerData.isFeatured === 'false' ||
      offerData.isFeatured === false
    )
      offerData.isFeatured = false;

    // ─── Auto-generate offer code ─────────────────────
    if (!offerData.offerCode) {
      offerData.offerCode = `OFFER${Date.now().toString().slice(-6)}`;
    }

    // ─── Save to DB ───────────────────────────────────
    const offer = await Offer.create(offerData);

    console.log('✅ Offer created:', offer._id);

    // ─── Send Notification ────────────────────────────
    if (offer.isActive) {
      sendOfferNotification(offer)
        .then((result) => {
          console.log(
            `📢 Offer Notification sent to ${result?.sent || 0} users`
          );
        })
        .catch((err) => {
          console.error('Notification error:', err.message);
        });
    }

    res.status(201).json({
      success: true,
      message: '🎉 Offer Created! Notification भेजी जा रही है...',
      offer,
    });
  } catch (error) {
    console.error('❌ Create Offer Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════════
// 2️⃣ UPDATE OFFER (With Image Upload)
// ═══════════════════════════════════════════════════
exports.updateOffer = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // ✅ New Image Upload
    if (req.file) {
      const imagePath = `/uploads/offers/${req.file.filename}`;
      updateData.bannerImage = imagePath;
      updateData.bannerImageFile = imagePath;
      console.log('✅ New Image:', imagePath);
    }

    // Number Convert
    if (updateData.discountPercent)
      updateData.discountPercent = Number(updateData.discountPercent);
    if (updateData.flatDiscount)
      updateData.flatDiscount = Number(updateData.flatDiscount);
    if (updateData.maxDiscount)
      updateData.maxDiscount = Number(updateData.maxDiscount);
    if (updateData.minPurchaseAmount)
      updateData.minPurchaseAmount = Number(updateData.minPurchaseAmount);

    // Boolean Convert
    if (updateData.isActive === 'true') updateData.isActive = true;
    if (updateData.isActive === 'false') updateData.isActive = false;
    if (updateData.isFeatured === 'true') updateData.isFeatured = true;
    if (updateData.isFeatured === 'false') updateData.isFeatured = false;

    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: 'Offer not found' });
    }

    res.json({
      success: true,
      message: 'Offer updated successfully',
      offer,
    });
  } catch (error) {
    console.error('Update Offer Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════════
// बाकी Functions (Same)
// ═══════════════════════════════════════════════════

exports.getAllOffers = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    let query = {};

    if (status === 'active') {
      query.isActive = true;
      query.endDate = { $gte: new Date() };
    } else if (status === 'expired') {
      query.endDate = { $lt: new Date() };
    } else if (status === 'inactive') {
      query.isActive = false;
    }

    const offers = await Offer.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Offer.countDocuments(query);

    res.json({
      success: true,
      offers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLiveOffers = async (req, res) => {
  try {
    const now = new Date();
    const offers = await Offer.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    }).sort({ isFeatured: -1, priority: -1, createdAt: -1 });

    res.json({ success: true, offers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: 'Offer not found' });
    }
    offer.viewCount = (offer.viewCount || 0) + 1;
    await offer.save();
    res.json({ success: true, offer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: 'Offer not found' });
    }
    res.json({ success: true, message: 'Offer deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleOfferStatus = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: 'Offer not found' });
    }

    offer.isActive = !offer.isActive;
    await offer.save();

    if (offer.isActive) {
      sendOfferNotification(offer).catch(console.error);
    }

    res.json({
      success: true,
      message: `Offer ${offer.isActive ? 'Activated' : 'Deactivated'}`,
      offer,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.notifyOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: 'Offer not found' });
    }

    const result = await sendOfferNotification(offer);

    res.json({
      success: true,
      message: '🎉 Notification भेज दी गई!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ═══════════════════════════════════════════════════
// 🔧 HELPER
// ═══════════════════════════════════════════════════
const sendOfferNotification = async (offer) => {
  const offerData = {
    title: offer.title,
    description: offer.description,
    discountPercent: offer.discountPercent,
    bannerImage: offer.bannerImage,
    actionUrl: `/offers/${offer._id}`,
    expiryDate: offer.endDate,
    _id: offer._id,
  };

  if (offer.offerType === 'FLASH_SALE') {
    const hoursLeft = Math.ceil(
      (new Date(offer.endDate) - new Date()) / (1000 * 60 * 60)
    );
    return notifyFlashSale({
      ...offerData,
      hours: hoursLeft > 0 ? hoursLeft : 2,
    });
  }

  if (offer.offerType === 'FESTIVAL') {
    return notifyFestivalSale({ ...offerData, name: offer.title });
  }

  return notifyOfferStart(offerData);
};