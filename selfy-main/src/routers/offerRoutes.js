// // backend/routes/offerRoutes.js

// const express = require('express');
// const router = express.Router();
// const {
//   createOffer,
//   getAllOffers,
//   getLiveOffers,
//   getOfferById,
//   updateOffer,
//   deleteOffer,
//   toggleOfferStatus,
//   notifyOffer,
// } = require('../controllers/offerController');

// // ═══ Customer Routes ═══
// router.get('/live', getLiveOffers);
// router.get('/:id', getOfferById);

// // ═══ Admin Routes ═══
// router.post('/create', createOffer);
// router.get('/admin/all', getAllOffers);
// router.put('/:id', updateOffer);
// router.delete('/:id', deleteOffer);
// router.patch('/:id/toggle', toggleOfferStatus);
// router.post('/:id/notify', notifyOffer);

// module.exports = router;




// backend/src/routes/offerRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const {
  createOffer,
  getAllOffers,
  getLiveOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
  toggleOfferStatus,
  notifyOffer,
} = require('../controllers/offerController');

// ═══ Customer Routes ═══
router.get('/live', getLiveOffers);

// ═══ Admin Routes ═══
router.get('/admin/all', getAllOffers);

// ✅ Create with Image Upload
router.post('/create', upload.single('bannerImage'), createOffer);

// ✅ Update with Image Upload
router.put('/:id', upload.single('bannerImage'), updateOffer);

// ═══ Other Routes ═══
router.get('/:id', getOfferById);
router.delete('/:id', deleteOffer);
router.patch('/:id/toggle', toggleOfferStatus);
router.post('/:id/notify', notifyOffer);

module.exports = router;