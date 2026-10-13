// const CartItem = require("../models/CartItem");
// const Product = require("../models/Product");
// const User = require("../models/User");
// const Cart = require("../models/Cart");

// class CartService {
//   async findUserCart(user) {

//     let cart = await Cart.findOne({ user: user._id }).populate({
//       path: "cartItems",
//       populate: {
//         path: "product",
//         populate: {
//           path: "seller",
//           select: "businessDetails"
//         }
//       }
//     });


//     if (!cart) {
//       // If no cart found, you can create a new one or handle as needed
//       const newCart = new Cart({ user: user._id, cartItems: [] });
//       cart = await newCart.save();
//     }

//     let totalPrice = 0;
//     let totalDiscountedPrice = 0;
//     let totalItem = 0;

//     cart.cartItems.forEach((cartsItem) => {
//       totalPrice += cartsItem.mrpPrice;
//       totalDiscountedPrice += cartsItem.sellingPrice;
//       totalItem += cartsItem.quantity;
//     });
//     // console.log("total sellling price",totalDiscountedPrice)
//     cart.totalMrpPrice = totalPrice;
//     cart.totalItem = cart.cartItems.length;
//     cart.totalSellingPrice = totalDiscountedPrice - (cart.couponPrice || 0);
//     cart.discount = this.calculateDiscountPercentage(
//       totalPrice,
//       totalDiscountedPrice
//     );
//     cart.totalItem = totalItem;

//     let cartItems = await CartItem.find({ cart: cart._id }).populate({
//       path: "product",
//       populate: {
//         path: "seller",
//         select: "businessDetails"
//       }
//     });

//     cart.cartItems = cartItems;

//     cart.cartItems = cartItems

//     return cart;
//   }

//   calculateDiscountPercentage(mrpPrice, sellingPrice) {
//     if (mrpPrice <= 0) {
//       return 0;
//     }
//     const discount = mrpPrice - sellingPrice;
//     const discountPercentage = (discount / mrpPrice) * 100;
//     return Math.round(discountPercentage);
//   }

//   async addCartItem(user, product, size, quantity) {
//     const cart = await this.findUserCart(user);

//     let isPresent = await CartItem.findOne({
//       cart: cart._id,
//       product: product._id,
//       size,
//     }).populate("product");



//     if (!isPresent) {
//       const cartItem = new CartItem({
//         product,
//         quantity,
//         userId: user._id,
//         sellingPrice: quantity * product.sellingPrice,
//         mrpPrice: quantity * product.mrpPrice,
//         size,
//         cart: cart._id,
//       });

//       await cartItem.save();

//       let updatedCart = await Cart.findOneAndUpdate(
//         { _id: cart._id }, // Match cart by ID
//         { $push: { cartItems: cartItem._id } }, // Add cart item ID
//         { new: true } // Return the updated document
//       );

//       console.log("updated cart", updatedCart);



//       return cartItem;
//     }

//     return isPresent;
//   }
// }

// module.exports = new CartService();





















// const CartItem = require("../models/CartItem");
// const Product = require("../models/Product");
// const User = require("../models/User");
// const Cart = require("../models/Cart");

// class CartService {
//   /* ═══════════════════════════════════════════════
//      🔥 FIND USER CART — Fixed double fetch bug
//      ═══════════════════════════════════════════════ */
//   async findUserCart(user) {
//     // 🔥 Single fetch — populate cartItems with product + seller
//     let cart = await Cart.findOne({ user: user._id })
//       .populate({
//         path: "cartItems",
//         populate: {
//           path: "product",
//           select: "title images sellingPrice mrpPrice quantity slug isActive seller",
//           populate: {
//             path: "seller",
//             select: "sellerName businessDetails",
//           },
//         },
//       })
//       .lean();

//     // If no cart, create empty one
//     if (!cart) {
//       const newCart = await Cart.create({
//         user: user._id,
//         cartItems: [],
//         totalMrpPrice: 0,
//         totalSellingPrice: 0,
//         totalItem: 0,
//         discount: 0,
//       });
//       return newCart.toObject();
//     }

//     // Filter active products
//     const validItems = (cart.cartItems || []).filter(
//       (item) => item.product && item.product.isActive !== false
//     );

//     // Calculate totals
//     let totalPrice = 0;
//     let totalDiscountedPrice = 0;
//     let totalItem = 0;

//     for (const item of validItems) {
//       totalPrice += item.mrpPrice || 0;
//       totalDiscountedPrice += item.sellingPrice || 0;
//       totalItem += item.quantity || 0;
//     }

//     cart.cartItems = validItems;
//     cart.totalMrpPrice = totalPrice;
//     cart.totalItem = totalItem;
//     cart.totalSellingPrice = totalDiscountedPrice - (cart.couponPrice || 0);
//     cart.discount = this.calculateDiscountPercentage(
//       totalPrice,
//       totalDiscountedPrice
//     );

//     return cart;
//   }

//   calculateDiscountPercentage(mrpPrice, sellingPrice) {
//     if (mrpPrice <= 0) return 0;
//     const discount = mrpPrice - sellingPrice;
//     return Math.round((discount / mrpPrice) * 100);
//   }

//   /* ═══════════════════════════════════════════════
//      🔥 ADD CART ITEM — Optimized
//      ═══════════════════════════════════════════════ */
//   async addCartItem(user, product, size, quantity) {
//     // 🔥 Ensure cart exists
//     let cart = await Cart.findOne({ user: user._id }).select("_id").lean();
//     if (!cart) {
//       const newCart = await Cart.create({ user: user._id, cartItems: [] });
//       cart = { _id: newCart._id };
//     }

//     // 🔥 Check if item already exists
//     const isPresent = await CartItem.findOne({
//       cart: cart._id,
//       product: product._id,
//       size,
//     })
//       .populate("product")
//       .lean();

//     if (isPresent) {
//       // 🔥 Increment quantity if item exists
//       const newQty = isPresent.quantity + quantity;
//       const updated = await CartItem.findByIdAndUpdate(
//         isPresent._id,
//         {
//           $inc: { quantity },
//           $set: {
//             sellingPrice: newQty * product.sellingPrice,
//             mrpPrice: newQty * product.mrpPrice,
//           },
//         },
//         { new: true }
//       ).lean();
//       return updated;
//     }

//     // 🔥 Create new cart item
//     const cartItem = await CartItem.create({
//       product: product._id,
//       quantity,
//       userId: user._id,
//       sellingPrice: quantity * product.sellingPrice,
//       mrpPrice: quantity * product.mrpPrice,
//       size,
//       cart: cart._id,
//     });

//     // 🔥 Push to cart
//     await Cart.findByIdAndUpdate(cart._id, {
//       $push: { cartItems: cartItem._id },
//     });

//     return cartItem.toObject();
//   }

//   /* ═══════════════════════════════════════════════
//      🔥 EXTRA: Remove item (bonus, tu use kar sakta hai)
//      ═══════════════════════════════════════════════ */
//   async removeCartItem(user, cartItemId) {
//     const cart = await Cart.findOne({ user: user._id }).select("_id").lean();
//     if (!cart) throw new Error("Cart not found");

//     await CartItem.deleteOne({ _id: cartItemId, cart: cart._id });
//     await Cart.findByIdAndUpdate(cart._id, {
//       $pull: { cartItems: cartItemId },
//     });

//     return { message: "Item removed" };
//   }

//   /* ═══════════════════════════════════════════════
//      🔥 EXTRA: Clear cart
//      ═══════════════════════════════════════════════ */
//   async clearCart(user) {
//     const cart = await Cart.findOne({ user: user._id }).select("_id cartItems").lean();
//     if (!cart) return { message: "Cart already empty" };

//     await CartItem.deleteMany({ cart: cart._id });
//     await Cart.findByIdAndUpdate(cart._id, {
//       $set: {
//         cartItems: [],
//         totalMrpPrice: 0,
//         totalSellingPrice: 0,
//         totalItem: 0,
//         discount: 0,
//         couponPrice: 0,
//       },
//     });

//     return { message: "Cart cleared" };
//   }
// }

// module.exports = new CartService();







const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");

class CartService {
  async findUserCart(user) {
    let cart = await Cart.findOne({ user: user._id })
      .populate({
        path: "cartItems",
        populate: {
          path: "product",
          select: "title images sellingPrice mrpPrice quantity slug isActive seller",
          populate: {
            path: "seller",
            select: "sellerName businessDetails",
          },
        },
      })
      .lean();

    if (!cart) {
      const newCart = await Cart.create({
        user: user._id, cartItems: [],
        totalMrpPrice: 0, totalSellingPrice: 0,
        totalItem: 0, discount: 0,
      });
      return newCart.toObject();
    }

    const validItems = (cart.cartItems || []).filter(
      (item) => item.product && item.product.isActive !== false
    );

    /* 🔥 Debug log */
    console.log("\n🛒 Cart fetched — Custom items check:");
    validItems.forEach((item, i) => {
      if (item.customDesign?.enabled) {
        console.log(`   🎨 Custom item ${i + 1}:`, {
          product: item.product?.title,
          compositeImage: item.customDesign?.compositeImage,
          previewImage: item.customDesign?.previewImage,
        });
      }
    });

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (const item of validItems) {
      totalPrice += item.mrpPrice || 0;
      totalDiscountedPrice += item.sellingPrice || 0;
      totalItem += item.quantity || 0;
    }

    cart.cartItems = validItems;
    cart.totalMrpPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.totalSellingPrice = totalDiscountedPrice - (cart.couponPrice || 0);
    cart.discount = this.calculateDiscountPercentage(totalPrice, totalDiscountedPrice);

    return cart;
  }

  calculateDiscountPercentage(mrpPrice, sellingPrice) {
    if (mrpPrice <= 0) return 0;
    const discount = mrpPrice - sellingPrice;
    return Math.round((discount / mrpPrice) * 100);
  }

  async addCartItem(user, product, size, quantity) {
    let cart = await Cart.findOne({ user: user._id }).select("_id").lean();
    if (!cart) {
      const newCart = await Cart.create({ user: user._id, cartItems: [] });
      cart = { _id: newCart._id };
    }

    const isPresent = await CartItem.findOne({
      cart: cart._id, product: product._id, size,
    }).populate("product").lean();

    if (isPresent) {
      const newQty = isPresent.quantity + quantity;
      const updated = await CartItem.findByIdAndUpdate(
        isPresent._id,
        {
          $inc: { quantity },
          $set: {
            sellingPrice: newQty * product.sellingPrice,
            mrpPrice: newQty * product.mrpPrice,
          },
        },
        { new: true }
      ).lean();
      return updated;
    }

    const cartItem = await CartItem.create({
      product: product._id,
      quantity,
      userId: user._id,
      sellingPrice: quantity * product.sellingPrice,
      mrpPrice: quantity * product.mrpPrice,
      size,
      cart: cart._id,
    });

    await Cart.findByIdAndUpdate(cart._id, {
      $push: { cartItems: cartItem._id },
    });

    return cartItem.toObject();
  }

  async removeCartItem(user, cartItemId) {
    const cart = await Cart.findOne({ user: user._id }).select("_id").lean();
    if (!cart) throw new Error("Cart not found");

    await CartItem.deleteOne({ _id: cartItemId, cart: cart._id });
    await Cart.findByIdAndUpdate(cart._id, {
      $pull: { cartItems: cartItemId },
    });

    return { message: "Item removed" };
  }

  async clearCart(user) {
    const cart = await Cart.findOne({ user: user._id }).select("_id").lean();
    if (!cart) return { message: "Cart already empty" };

    await CartItem.deleteMany({ cart: cart._id });
    await Cart.findByIdAndUpdate(cart._id, {
      $set: {
        cartItems: [], totalMrpPrice: 0, totalSellingPrice: 0,
        totalItem: 0, discount: 0, couponPrice: 0,
      },
    });

    return { message: "Cart cleared" };
  }
}

module.exports = new CartService();