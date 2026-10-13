// const CartService = require("../services/CartService");
// const UserService = require("../services/UserService");
// const ProductService = require("../services/ProductService");
// const CartItemService = require("../services/CartItemService");
// // const CartItemService = require("../services/CartItemService");

// class CartController {
//   async findUserCartHandler(req, res) {
//     try {
//       const user = await req.user;


//       const cart = await CartService.findUserCart(user);

//       res.status(200).json(cart);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   // Add item to cart
//   async addItemToCart(req, res) {
//     try {
//       const user = await req.user;
//     //   console.log("req ",req.body)
//       const product = await ProductService.findProductById(req.body.productId);

//       const cartItem = await CartService.addCartItem(
//         user,
//         product,
//         req.body.size,
//         req.body.quantity
//       );

//       res.status(202).json(cartItem);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   // Delete a cart item
//   async deleteCartItemHandler(req, res) {
//     try {

//       const user = await req.user;
//       await CartItemService.removeCartItem(user._id, req.params.cartItemId);

//       res.status(202).json({ message: "Item removed from cart" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   // Update a cart item
//   async updateCartItemHandler(req, res) {
//     try {
//       const cartItemId = req.params.cartItemId;
//       const { quantity } = req.body;

//       const user = await req.user;
//       let updatedCartItem;
//       if (quantity > 0) {
//         updatedCartItem = await CartItemService.updateCartItem(
//           user._id,
//           cartItemId,
//           { quantity }
//         );
//       }

//       res.status(202).json(updatedCartItem);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// }

// module.exports = new CartController();







// const CartService = require("../services/CartService");
// const UserService = require("../services/UserService");
// const ProductService = require("../services/ProductService");
// const CartItemService = require("../services/CartItemService");
// const Cart = require("../models/Cart");
// const CartItem = require("../models/CartItem");

// class CartController {
//   async findUserCartHandler(req, res) {
//     try {
//       const user = await req.user;
//       const cart = await CartService.findUserCart(user);
//       res.status(200).json(cart);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   /* ═══════════════════════════════════════════════
//      🔥 ADD ITEM — Custom + Regular
//      ═══════════════════════════════════════════════ */
//   async addItemToCart(req, res) {
//     try {
//       const user = await req.user;
//       const { productId, size, quantity, customDesign } = req.body;

//       console.log("\n═══════════════════════════════════════");
//       console.log("🛒 [addItemToCart] Request");
//       console.log("   Has CustomDesign:", !!customDesign);
//       console.log("   CustomDesign.enabled:", customDesign?.enabled);
//       console.log("   CustomDesign.compositeImage:", customDesign?.compositeImage);

//       const product = await ProductService.findProductById(productId);

//       /* ═══════════════════════════════════════════════
//          🔥 CUSTOM DESIGN FLOW
//          ═══════════════════════════════════════════════ */
//       if (customDesign && customDesign.originalImage) {
//         console.log("🎨 CUSTOM item flow");

//         if (!product.isCustomizable) {
//           return res.status(400).json({
//             error: "This product is not customizable",
//           });
//         }

//         let cart = await Cart.findOne({ user: user._id });
//         if (!cart) {
//           cart = await Cart.create({ user: user._id, cartItems: [] });
//         }

//         const qty = quantity || 1;
//         const extraCharge = Number(customDesign.extraCharge) || 0;

//         /* 🔥 IMPORTANT: Save compositeImage */
//         const cartItem = await CartItem.create({
//           cart: cart._id,
//           product: productId,
//           size: size || "FREE",
//           quantity: qty,
//           userId: user._id,
//           mrpPrice: (product.mrpPrice + extraCharge) * qty,
//           sellingPrice: (product.sellingPrice + extraCharge) * qty,
//           customDesign: {
//             enabled: true,
//             originalImage: customDesign.originalImage,
//             previewImage: customDesign.compositeImage || customDesign.previewImage || customDesign.originalImage,
//             compositeImage: customDesign.compositeImage || customDesign.previewImage || customDesign.originalImage,
//             printFile: customDesign.printFile || customDesign.originalImage,
//             designData: customDesign.designData || {},
//             extraCharge: extraCharge,
//           },
//         });

//         cart.cartItems.push(cartItem._id);
//         await cart.save();

//         await CartService.findUserCart(user);

//         console.log("✅ Custom item saved:", cartItem._id);
//         console.log("   compositeImage saved:", cartItem.customDesign.compositeImage);
//         console.log("═══════════════════════════════════════\n");

//         return res.status(202).json(cartItem);
//       }

//       /* ═══════════════════════════════════════════════
//          🔥 REGULAR ITEM
//          ═══════════════════════════════════════════════ */
//       console.log("🛒 Regular item flow");

//       const cartItem = await CartService.addCartItem(
//         user, product, size, quantity
//       );

//       await CartService.findUserCart(user);
//       return res.status(202).json(cartItem);
//     } catch (error) {
//       console.error("❌ addItemToCart error:", error);
//       res.status(500).json({ error: error.message });
//     }
//   }

//   async deleteCartItemHandler(req, res) {
//     try {
//       const user = await req.user;
//       await CartItemService.removeCartItem(user._id, req.params.cartItemId);
//       res.status(202).json({ message: "Item removed from cart" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   async updateCartItemHandler(req, res) {
//     try {
//       const cartItemId = req.params.cartItemId;
//       const { quantity } = req.body;
//       const user = await req.user;

//       let updatedCartItem;
//       if (quantity > 0) {
//         updatedCartItem = await CartItemService.updateCartItem(
//           user._id, cartItemId, { quantity }
//         );
//       }

//       res.status(202).json(updatedCartItem);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// }

// module.exports = new CartController();




















const CartService = require("../services/CartService");
const UserService = require("../services/UserService");
const ProductService = require("../services/ProductService");
const CartItemService = require("../services/CartItemService");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");

class CartController {
  /* ═══════════════════════════════════════════════
     FETCH USER CART
     ═══════════════════════════════════════════════ */
  async findUserCartHandler(req, res) {
    try {
      const user = await req.user;
      const cart = await CartService.findUserCart(user);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /* ═══════════════════════════════════════════════
     🔥 ADD ITEM — Custom + Regular
     Returns FULL CART
     ═══════════════════════════════════════════════ */
  async addItemToCart(req, res) {
    try {
      const user = await req.user;
      const { productId, size, quantity, customDesign } = req.body;

      console.log("\n═══════════════════════════════════════");
      console.log("🛒 [addItemToCart] Request");
      console.log("   Has CustomDesign:", !!customDesign);
      console.log("   CustomDesign.enabled:", customDesign?.enabled);
      console.log(
        "   CustomDesign.compositeImage:",
        customDesign?.compositeImage
      );

      const product = await ProductService.findProductById(productId);

      /* ═══════════════════════════════════════════════
         🔥 CUSTOM DESIGN FLOW
         ═══════════════════════════════════════════════ */
      if (customDesign && customDesign.originalImage) {
        console.log("🎨 CUSTOM item flow");

        if (!product.isCustomizable) {
          return res.status(400).json({
            error: "This product is not customizable",
          });
        }

        let cart = await Cart.findOne({ user: user._id });
        if (!cart) {
          cart = await Cart.create({ user: user._id, cartItems: [] });
        }

        const qty = quantity || 1;
        const extraCharge = Number(customDesign.extraCharge) || 0;

        /* 🔥 Save compositeImage properly */
        const cartItem = await CartItem.create({
          cart: cart._id,
          product: productId,
          size: size || "FREE",
          quantity: qty,
          userId: user._id,
          mrpPrice: (product.mrpPrice + extraCharge) * qty,
          sellingPrice: (product.sellingPrice + extraCharge) * qty,
          customDesign: {
            enabled: true,
            originalImage: customDesign.originalImage,
            previewImage:
              customDesign.compositeImage ||
              customDesign.previewImage ||
              customDesign.originalImage,
            compositeImage:
              customDesign.compositeImage ||
              customDesign.previewImage ||
              customDesign.originalImage,
            printFile: customDesign.printFile || customDesign.originalImage,
            designData: customDesign.designData || {},
            extraCharge: extraCharge,
          },
        });

        cart.cartItems.push(cartItem._id);
        await cart.save();

        console.log("✅ Custom item saved:", cartItem._id);
        console.log(
          "   compositeImage saved:",
          cartItem.customDesign.compositeImage
        );
        console.log("═══════════════════════════════════════\n");

        /* ✅ FULL CART RETURN KARO */
        const fullCart = await CartService.findUserCart(user);
        return res.status(200).json(fullCart);
      }

      /* ═══════════════════════════════════════════════
         🔥 REGULAR ITEM
         ═══════════════════════════════════════════════ */
      console.log("🛒 Regular item flow");

      await CartService.addCartItem(user, product, size, quantity);

      console.log("✅ Regular item added");
      console.log("═══════════════════════════════════════\n");

      /* ✅ FULL CART RETURN KARO */
      const fullCart = await CartService.findUserCart(user);
      return res.status(200).json(fullCart);
    } catch (error) {
      console.error("❌ addItemToCart error:", error);
      res.status(500).json({ error: error.message });
    }
  }

  /* ═══════════════════════════════════════════════
     🔥 DELETE — Returns FULL CART
     ═══════════════════════════════════════════════ */
  async deleteCartItemHandler(req, res) {
    try {
      const user = await req.user;
      await CartItemService.removeCartItem(user._id, req.params.cartItemId);

      console.log("🗑️ Item deleted:", req.params.cartItemId);

      /* ✅ FULL CART RETURN KARO */
      const fullCart = await CartService.findUserCart(user);
      res.status(200).json(fullCart);
    } catch (error) {
      console.error("❌ deleteCartItem error:", error);
      res.status(500).json({ error: error.message });
    }
  }

  /* ═══════════════════════════════════════════════
     🔥 UPDATE — Returns FULL CART
     ═══════════════════════════════════════════════ */
  async updateCartItemHandler(req, res) {
    try {
      const cartItemId = req.params.cartItemId;
      const { quantity } = req.body;
      const user = await req.user;

      if (quantity > 0) {
        await CartItemService.updateCartItem(user._id, cartItemId, {
          quantity,
        });
        console.log("✏️ Item updated:", cartItemId, "qty:", quantity);
      }

      /* ✅ FULL CART RETURN KARO */
      const fullCart = await CartService.findUserCart(user);
      res.status(200).json(fullCart);
    } catch (error) {
      console.error("❌ updateCartItem error:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CartController();