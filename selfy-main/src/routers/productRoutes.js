// const express = require('express');
// const productController = require('../controllers/productController');
// const router = express.Router();



// // Search for products by query
// router.get('/search',  productController.searchProduct);

// // Get all products with filters
// router.get('/', productController.getAllProducts);

// // Get product by ID
// router.get('/:productId', productController.getProductById);

// module.exports = router;





const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

/* Search */
router.get('/search', productController.searchProduct);

/* Get all */
router.get('/', productController.getAllProducts);

/* Get by ID */
router.get('/:productId', productController.getProductById);

module.exports = router;