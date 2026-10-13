// routes/cartRoutes.js
const express = require('express');
const cartController = require('../controllers/cartController.js');
const authMiddleware = require('../middlewares/userAuthMiddleware.js');

const router = express.Router();

router.get('/', authMiddleware, cartController.findUserCartHandler);

router.put('/add', authMiddleware, cartController.addItemToCart);

router.delete('/item/:cartItemId',authMiddleware, cartController.deleteCartItemHandler);

router.put('/item/:cartItemId',authMiddleware, cartController.updateCartItemHandler);

module.exports = router;







// // routes/cartRoutes.js
// const express = require("express");
// const cartController = require("../controllers/cartController.js");
// const authMiddleware = require("../middlewares/userAuthMiddleware.js");

// const router = express.Router();

// /* Fetch cart */
// router.get("/", authMiddleware, cartController.findUserCartHandler);

// /* Add item */
// router.put("/add", authMiddleware, cartController.addItemToCart);

// /* 🔥 CLEAR CART — must be BEFORE /item/:cartItemId */
// router.delete("/clear", authMiddleware, cartController.clearCartHandler);

// /* Delete single item */
// router.delete(
//   "/item/:cartItemId",
//   authMiddleware,
//   cartController.deleteCartItemHandler
// );

// /* Update single item */
// router.put(
//   "/item/:cartItemId",
//   authMiddleware,
//   cartController.updateCartItemHandler
// );

// module.exports = router;