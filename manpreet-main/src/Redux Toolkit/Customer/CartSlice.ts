// // src/slices/cartSlice.ts
// import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
// import { type Cart, type CartItem } from "../../types/cartTypes";
// import { api } from "../../Config/Api";
// import { type RootState } from "../Store";
// import { applyCoupon } from "./CouponSlice";
// import { sumCartItemMrpPrice, sumCartItemSellingPrice } from "../../util/cartCalculator";

// interface CartState {
//   cart: Cart | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: CartState = {
//   cart: null,
//   loading: false,
//   error: null,
// };

// // Define the base URL for the API
// const DEPLOYED_URL = "/api/cart";

// export const fetchUserCart = createAsyncThunk<Cart, string>(
//   "cart/fetchUserCart",
//   async (jwt: string, { rejectWithValue }) => {
//     try {
//       const response = await api.get(DEPLOYED_URL, {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       });
//       console.log("Cart fetched ", response.data);
//       return response.data;
//     } catch (error: any) {
//       console.log("error ", error.response);
//       return rejectWithValue("Failed to fetch user cart");
//     }
//   }
// );

// interface AddItemRequest {
//   productId: string | undefined;
//   size: string;
//   quantity: number;
// }

// export const addItemToCart = createAsyncThunk<
//   CartItem,
//   { jwt: string | null; request: AddItemRequest }
// >("cart/addItemToCart", async ({ jwt, request }, { rejectWithValue }) => {
//   try {
//     const response = await api.put(`${DEPLOYED_URL}/add`, request, {
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//       },
//     });

//     console.log("Cart added ", response.data);
//     return response.data;
//   } catch (error: any) {
//     console.log("error ", error.response);
//     return rejectWithValue("Failed to add item to cart");
//   }
// });

// export const deleteCartItem = createAsyncThunk<
//   any,
//   { jwt: string; cartItemId: number }
// >("cart/deleteCartItem", async ({ jwt, cartItemId }, { rejectWithValue }) => {
//   try {
//     const response = await api.delete(`${DEPLOYED_URL}/item/${cartItemId}`, {
//       headers: { Authorization: `Bearer ${jwt}` },
//     });
//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(
//       error.response.data.message || "Failed to delete cart item"
//     );
//   }
// });

// export const updateCartItem = createAsyncThunk<
//   any,
//   { jwt: string | null; cartItemId: number; cartItem: any }
// >(
//   "cart/updateCartItem",
//   async ({ jwt, cartItemId, cartItem }, { rejectWithValue }) => {
//     try {
//       const response = await api.put(
//         `${DEPLOYED_URL}/item/${cartItemId}`,
//         cartItem,
//         {
//           headers: { Authorization: `Bearer ${jwt}` },
//         }
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response.data.message || "Failed to update cart item"
//       );
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     resetCartState: (state) => {
//       state.cart = null;
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchUserCart.fulfilled,
//         (state, action: PayloadAction<Cart>) => {
//           state.cart = action.payload;
//           state.loading = false;
//         }
//       )
//       .addCase(fetchUserCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(addItemToCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         addItemToCart.fulfilled,
//         (state, action: PayloadAction<CartItem>) => {
//           if (state.cart) {
//             state.cart.cartItems.push(action.payload);
//           }
//           state.loading = false;
//         }
//       )
//       .addCase(addItemToCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       // cart item
//       .addCase(deleteCartItem.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteCartItem.fulfilled, (state, action) => {
//         if (state.cart) {
//           state.cart.cartItems = state.cart.cartItems.filter(
//             (item: CartItem) => item._id !== action.meta.arg.cartItemId
//           );
//           const mrpPrice = sumCartItemMrpPrice(state.cart?.cartItems || [])
//           const sellingPrice = sumCartItemSellingPrice(state.cart?.cartItems || [])
//           state.cart.totalSellingPrice = sellingPrice;
//           state.cart.totalMrpPrice = mrpPrice;
//         }

//         state.loading = false;
//       })
//       .addCase(deleteCartItem.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(updateCartItem.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateCartItem.fulfilled, (state, action) => {
//         if (state.cart) {
//           const index = state.cart.cartItems.findIndex(
//             (item: CartItem) => item._id === action.meta.arg.cartItemId
//           );
//           if (index !== -1) {
//             state.cart.cartItems[index] = {
//               ...state.cart.cartItems[index],
//               ...action.payload,
//             };
//           }
//           const mrpPrice = sumCartItemMrpPrice(state.cart?.cartItems || [])
//           const sellingPrice = sumCartItemSellingPrice(state.cart?.cartItems || [])
//           state.cart.totalSellingPrice = sellingPrice;
//           state.cart.totalMrpPrice = mrpPrice;
//         }
//         state.loading = false;
//       })
//       .addCase(updateCartItem.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(applyCoupon.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cart = action.payload;

//       })
//       .addMatcher(
//         (action) => action.type === "orders/createOrder/fulfilled",
//         (state) => {
//           state.cart = null;
//         }
//       )
//       .addMatcher(
//         (action) => action.type === "orders/paymentSuccess/fulfilled",
//         (state) => {
//           state.cart = null;
//         }
//       );
//   },
// });

// export default cartSlice.reducer;
// export const { resetCartState } = cartSlice.actions;

// export const selectCart = (state: RootState) => state.cart.cart;
// export const selectCartLoading = (state: RootState) => state.cart.loading;
// export const selectCartError = (state: RootState) => state.cart.error;










// // src/slices/cartSlice.ts
// import {
//   createSlice,
//   createAsyncThunk,
//   type PayloadAction,
// } from "@reduxjs/toolkit";
// import { type Cart, type CartItem } from "../../types/cartTypes";
// import { api } from "../../Config/Api";
// import { type RootState } from "../Store";
// import { applyCoupon } from "./CouponSlice";
// import {
//   sumCartItemMrpPrice,
//   sumCartItemSellingPrice,
// } from "../../util/cartCalculator";

// interface CartState {
//   cart: Cart | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: CartState = {
//   cart: null,
//   loading: false,
//   error: null,
// };

// const DEPLOYED_URL = "/api/cart";

// /* ═══════════════════════════════════════════════
//    🔥 FETCH USER CART (with Seller guard)
//    ═══════════════════════════════════════════════ */
// export const fetchUserCart = createAsyncThunk<Cart, string>(
//   "cart/fetchUserCart",
//   async (jwt: string, { rejectWithValue }) => {
//     try {
//       /* 🔥 SELLER GUARD */
//       const userRole = localStorage.getItem("userRole");
//       if (userRole === "SELLER") {
//         console.log(
//           "⚠️ [CART] Seller token detected — skipping cart fetch"
//         );
//         return rejectWithValue("Seller account — no cart");
//       }

//       const response = await api.get(DEPLOYED_URL, {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       });
//       console.log("🛒 Cart fetched", response.data);
//       return response.data;
//     } catch (error: any) {
//       console.log("❌ cart error", error.response);
//       return rejectWithValue("Failed to fetch user cart");
//     }
//   }
// );

// interface AddItemRequest {
//   productId: string | undefined;
//   size: string;
//   quantity: number;
// }

// export const addItemToCart = createAsyncThunk<
//   CartItem,
//   { jwt: string | null; request: AddItemRequest }
// >("cart/addItemToCart", async ({ jwt, request }, { rejectWithValue }) => {
//   try {
//     const response = await api.put(`${DEPLOYED_URL}/add`, request, {
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//       },
//     });

//     console.log("Cart added ", response.data);
//     return response.data;
//   } catch (error: any) {
//     console.log("error ", error.response);
//     return rejectWithValue("Failed to add item to cart");
//   }
// });

// export const deleteCartItem = createAsyncThunk<
//   any,
//   { jwt: string; cartItemId: number }
// >("cart/deleteCartItem", async ({ jwt, cartItemId }, { rejectWithValue }) => {
//   try {
//     const response = await api.delete(`${DEPLOYED_URL}/item/${cartItemId}`, {
//       headers: { Authorization: `Bearer ${jwt}` },
//     });
//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(
//       error.response.data.message || "Failed to delete cart item"
//     );
//   }
// });

// export const updateCartItem = createAsyncThunk<
//   any,
//   { jwt: string | null; cartItemId: number; cartItem: any }
// >(
//   "cart/updateCartItem",
//   async ({ jwt, cartItemId, cartItem }, { rejectWithValue }) => {
//     try {
//       const response = await api.put(
//         `${DEPLOYED_URL}/item/${cartItemId}`,
//         cartItem,
//         {
//           headers: { Authorization: `Bearer ${jwt}` },
//         }
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response.data.message || "Failed to update cart item"
//       );
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     resetCartState: (state) => {
//       state.cart = null;
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchUserCart.fulfilled,
//         (state, action: PayloadAction<Cart>) => {
//           state.cart = action.payload;
//           state.loading = false;
//         }
//       )
//       .addCase(fetchUserCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         state.cart = null; // ✅ Clear cart on failure
//       })
//       .addCase(addItemToCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         addItemToCart.fulfilled,
//         (state, action: PayloadAction<CartItem>) => {
//           if (state.cart) {
//             state.cart.cartItems.push(action.payload);
//           }
//           state.loading = false;
//         }
//       )
//       .addCase(addItemToCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(deleteCartItem.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteCartItem.fulfilled, (state, action) => {
//         if (state.cart) {
//           state.cart.cartItems = state.cart.cartItems.filter(
//             (item: CartItem) => item._id !== action.meta.arg.cartItemId
//           );
//           const mrpPrice = sumCartItemMrpPrice(state.cart?.cartItems || []);
//           const sellingPrice = sumCartItemSellingPrice(
//             state.cart?.cartItems || []
//           );
//           state.cart.totalSellingPrice = sellingPrice;
//           state.cart.totalMrpPrice = mrpPrice;
//         }
//         state.loading = false;
//       })
//       .addCase(deleteCartItem.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(updateCartItem.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateCartItem.fulfilled, (state, action) => {
//         if (state.cart) {
//           const index = state.cart.cartItems.findIndex(
//             (item: CartItem) => item._id === action.meta.arg.cartItemId
//           );
//           if (index !== -1) {
//             state.cart.cartItems[index] = {
//               ...state.cart.cartItems[index],
//               ...action.payload,
//             };
//           }
//           const mrpPrice = sumCartItemMrpPrice(state.cart?.cartItems || []);
//           const sellingPrice = sumCartItemSellingPrice(
//             state.cart?.cartItems || []
//           );
//           state.cart.totalSellingPrice = sellingPrice;
//           state.cart.totalMrpPrice = mrpPrice;
//         }
//         state.loading = false;
//       })
//       .addCase(updateCartItem.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(applyCoupon.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cart = action.payload;
//       })
//       .addMatcher(
//         (action) => action.type === "orders/createOrder/fulfilled",
//         (state) => {
//           state.cart = null;
//         }
//       )
//       .addMatcher(
//         (action) => action.type === "orders/paymentSuccess/fulfilled",
//         (state) => {
//           state.cart = null;
//         }
//       );
//   },
// });

// export default cartSlice.reducer;
// export const { resetCartState } = cartSlice.actions;

// export const selectCart = (state: RootState) => state.cart.cart;
// export const selectCartLoading = (state: RootState) => state.cart.loading;
// export const selectCartError = (state: RootState) => state.cart.error;










// // src/slices/cartSlice.ts
// import {
//   createSlice,
//   createAsyncThunk,
//   type PayloadAction,
// } from "@reduxjs/toolkit";
// import { type Cart, type CartItem } from "../../types/cartTypes";
// import { api } from "../../Config/Api";
// import { type RootState } from "../Store";
// import { applyCoupon } from "./CouponSlice";
// import {
//   sumCartItemMrpPrice,
//   sumCartItemSellingPrice,
// } from "../../util/cartCalculator";

// interface CartState {
//   cart: Cart | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: CartState = {
//   cart: null,
//   loading: false,
//   error: null,
// };

// const DEPLOYED_URL = "/api/cart";

// /* ═══════════════════════════════════════════════
//    🔥 FETCH USER CART (with Seller guard)
//    ═══════════════════════════════════════════════ */
// export const fetchUserCart = createAsyncThunk<Cart, string>(
//   "cart/fetchUserCart",
//   async (jwt: string, { rejectWithValue }) => {
//     try {
//       /* 🔥 SELLER GUARD */
//       const userRole = localStorage.getItem("userRole");
//       if (userRole === "SELLER") {
//         console.log("⚠️ [CART] Seller token detected — skipping cart fetch");
//         return rejectWithValue("Seller account — no cart");
//       }

//       const response = await api.get(DEPLOYED_URL, {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       });
//       console.log("🛒 Cart fetched", response.data);
//       return response.data;
//     } catch (error: any) {
//       console.log("❌ cart error", error.response);
//       return rejectWithValue("Failed to fetch user cart");
//     }
//   }
// );

// interface AddItemRequest {
//   productId: string | undefined;
//   size: string;
//   quantity: number;
// }

// export const addItemToCart = createAsyncThunk<
//   CartItem,
//   { jwt: string | null; request: AddItemRequest }
// >("cart/addItemToCart", async ({ jwt, request }, { rejectWithValue }) => {
//   try {
//     const response = await api.put(`${DEPLOYED_URL}/add`, request, {
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//       },
//     });

//     console.log("Cart added ", response.data);
//     return response.data;
//   } catch (error: any) {
//     console.log("error ", error.response);
//     return rejectWithValue("Failed to add item to cart");
//   }
// });

// export const deleteCartItem = createAsyncThunk<
//   any,
//   { jwt: string; cartItemId: number }
// >("cart/deleteCartItem", async ({ jwt, cartItemId }, { rejectWithValue }) => {
//   try {
//     const response = await api.delete(`${DEPLOYED_URL}/item/${cartItemId}`, {
//       headers: { Authorization: `Bearer ${jwt}` },
//     });
//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(
//       error.response.data.message || "Failed to delete cart item"
//     );
//   }
// });

// export const updateCartItem = createAsyncThunk<
//   any,
//   { jwt: string | null; cartItemId: number; cartItem: any }
// >(
//   "cart/updateCartItem",
//   async ({ jwt, cartItemId, cartItem }, { rejectWithValue }) => {
//     try {
//       const response = await api.put(
//         `${DEPLOYED_URL}/item/${cartItemId}`,
//         cartItem,
//         {
//           headers: { Authorization: `Bearer ${jwt}` },
//         }
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response.data.message || "Failed to update cart item"
//       );
//     }
//   }
// );

// /* ═══════════════════════════════════════════════
//    🔥 CLEAR CART
//    ═══════════════════════════════════════════════ */
// export const clearCart = createAsyncThunk<
//   any,
//   string,
//   { rejectValue: string }
// >("cart/clearCart", async (jwt, { rejectWithValue }) => {
//   try {
//     console.log("🔵 [CART] Clearing cart...");

//     const response = await api.delete(`${DEPLOYED_URL}/clear`, {
//       headers: { Authorization: `Bearer ${jwt}` },
//     });

//     console.log("✅ [CART] Cart cleared:", response.data);
//     return response.data;
//   } catch (error: any) {
//     console.error("❌ [CART] Clear error:", error);
//     return rejectWithValue(
//       error.response?.data?.message || "Failed to clear cart"
//     );
//   }
// });

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     resetCartState: (state) => {
//       state.cart = null;
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchUserCart.fulfilled,
//         (state, action: PayloadAction<Cart>) => {
//           state.cart = action.payload;
//           state.loading = false;
//         }
//       )
//       .addCase(fetchUserCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         state.cart = null;
//       })
//       .addCase(addItemToCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         addItemToCart.fulfilled,
//         (state, action: PayloadAction<CartItem>) => {
//           if (state.cart) {
//             state.cart.cartItems.push(action.payload);
//           }
//           state.loading = false;
//         }
//       )
//       .addCase(addItemToCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(deleteCartItem.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteCartItem.fulfilled, (state, action) => {
//         if (state.cart) {
//           state.cart.cartItems = state.cart.cartItems.filter(
//             (item: CartItem) => item._id !== action.meta.arg.cartItemId
//           );
//           const mrpPrice = sumCartItemMrpPrice(state.cart?.cartItems || []);
//           const sellingPrice = sumCartItemSellingPrice(
//             state.cart?.cartItems || []
//           );
//           state.cart.totalSellingPrice = sellingPrice;
//           state.cart.totalMrpPrice = mrpPrice;
//         }
//         state.loading = false;
//       })
//       .addCase(deleteCartItem.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(updateCartItem.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateCartItem.fulfilled, (state, action) => {
//         if (state.cart) {
//           const index = state.cart.cartItems.findIndex(
//             (item: CartItem) => item._id === action.meta.arg.cartItemId
//           );
//           if (index !== -1) {
//             state.cart.cartItems[index] = {
//               ...state.cart.cartItems[index],
//               ...action.payload,
//             };
//           }
//           const mrpPrice = sumCartItemMrpPrice(state.cart?.cartItems || []);
//           const sellingPrice = sumCartItemSellingPrice(
//             state.cart?.cartItems || []
//           );
//           state.cart.totalSellingPrice = sellingPrice;
//           state.cart.totalMrpPrice = mrpPrice;
//         }
//         state.loading = false;
//       })
//       .addCase(updateCartItem.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(applyCoupon.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cart = action.payload;
//       })
//       /* 🔥 CLEAR CART CASES */
//       .addCase(clearCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(clearCart.fulfilled, (state) => {
//         if (state.cart) {
//           state.cart = {
//             ...state.cart,
//             cartItems: [],
//             totalSellingPrice: 0,
//             totalMrpPrice: 0,
//             totalDiscount: 0,
//             couponCode: null,
//             couponPrice: 0,
//           } as any;
//         } else {
//           state.cart = null;
//         }
//         state.loading = false;
//       })
//       .addCase(clearCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addMatcher(
//         (action) => action.type === "orders/createOrder/fulfilled",
//         (state) => {
//           state.cart = null;
//         }
//       )
//       .addMatcher(
//         (action) => action.type === "orders/paymentSuccess/fulfilled",
//         (state) => {
//           state.cart = null;
//         }
//       );
//   },
// });

// export default cartSlice.reducer;
// export const { resetCartState } = cartSlice.actions;

// export const selectCart = (state: RootState) => state.cart.cart;
// export const selectCartLoading = (state: RootState) => state.cart.loading;
// export const selectCartError = (state: RootState) => state.cart.error;









// // src/slices/cartSlice.ts
// import {
//   createSlice,
//   createAsyncThunk,
//   type PayloadAction,
// } from "@reduxjs/toolkit";
// import { type Cart, type CartItem } from "../../types/cartTypes";
// import { api } from "../../Config/Api";
// import { type RootState } from "../Store";
// import { applyCoupon } from "./CouponSlice";

// /* ═══════════════════════════════════════════════
//    STATE
//    ═══════════════════════════════════════════════ */
// interface CartState {
//   cart: Cart | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: CartState = {
//   cart: null,
//   loading: false,
//   error: null,
// };

// const DEPLOYED_URL = "/api/cart";

// /* ═══════════════════════════════════════════════
//    1️⃣ FETCH USER CART
//    ═══════════════════════════════════════════════ */
// export const fetchUserCart = createAsyncThunk<
//   Cart,
//   string,
//   { rejectValue: string }
// >("cart/fetchUserCart", async (jwt, { rejectWithValue }) => {
//   try {
//     // 🛡️ Seller guard
//     const role = localStorage.getItem("userRole");
//     if (role === "SELLER" || role === "ROLE_SELLER") {
//       return rejectWithValue("Seller account — no cart");
//     }

//     const { data } = await api.get(DEPLOYED_URL, {
//       headers: { Authorization: `Bearer ${jwt}` },
//     });

//     console.log("🛒 Cart fetched:", data);
//     return data;
//   } catch (error: any) {
//     console.log("❌ fetch error:", error?.response?.data || error.message);
//     return rejectWithValue(
//       error?.response?.data?.message || "Failed to fetch cart"
//     );
//   }
// });

// /* ═══════════════════════════════════════════════
//    2️⃣ ADD TO CART
//    ═══════════════════════════════════════════════ */
// interface AddItemRequest {
//   productId: string;
//   size: string;
//   quantity: number;
// }

// export const addItemToCart = createAsyncThunk<
//   Cart,
//   { jwt: string | null; request: AddItemRequest },
//   { rejectValue: string }
// >("cart/addItemToCart", async ({ jwt, request }, { rejectWithValue }) => {
//   try {
//     if (!jwt) return rejectWithValue("Please login to add items");
//     if (!request.productId) return rejectWithValue("Invalid product");

//     const { data } = await api.put(`${DEPLOYED_URL}/add`, request, {
//       headers: { Authorization: `Bearer ${jwt}` },
//     });

//     console.log("✅ Added to cart:", data);
//     return data;
//   } catch (error: any) {
//     console.log("❌ add error:", error?.response?.data || error.message);
//     return rejectWithValue(
//       error?.response?.data?.message ||
//         error?.response?.data?.error ||
//         "Failed to add item"
//     );
//   }
// });

// /* ═══════════════════════════════════════════════
//    3️⃣ DELETE CART ITEM
//    ═══════════════════════════════════════════════ */
// export const deleteCartItem = createAsyncThunk<
//   Cart,
//   { jwt: string; cartItemId: string },
//   { rejectValue: string }
// >("cart/deleteCartItem", async ({ jwt, cartItemId }, { rejectWithValue }) => {
//   try {
//     const { data } = await api.delete(`${DEPLOYED_URL}/item/${cartItemId}`, {
//       headers: { Authorization: `Bearer ${jwt}` },
//     });
//     console.log("🗑️ Item deleted:", data);
//     return data;
//   } catch (error: any) {
//     return rejectWithValue(
//       error?.response?.data?.message || "Failed to delete item"
//     );
//   }
// });

// /* ═══════════════════════════════════════════════
//    4️⃣ UPDATE CART ITEM (quantity)
//    ═══════════════════════════════════════════════ */
// export const updateCartItem = createAsyncThunk<
//   Cart,
//   { jwt: string | null; cartItemId: string; cartItem: { quantity: number } },
//   { rejectValue: string }
// >(
//   "cart/updateCartItem",
//   async ({ jwt, cartItemId, cartItem }, { rejectWithValue }) => {
//     try {
//       const { data } = await api.put(
//         `${DEPLOYED_URL}/item/${cartItemId}`,
//         cartItem,
//         { headers: { Authorization: `Bearer ${jwt}` } }
//       );
//       console.log("✏️ Item updated:", data);
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error?.response?.data?.message || "Failed to update item"
//       );
//     }
//   }
// );

// /* ═══════════════════════════════════════════════
//    5️⃣ CLEAR CART
//    ═══════════════════════════════════════════════ */
// export const clearCart = createAsyncThunk<
//   any,
//   string,
//   { rejectValue: string }
// >("cart/clearCart", async (jwt, { rejectWithValue }) => {
//   try {
//     const { data } = await api.delete(`${DEPLOYED_URL}/clear`, {
//       headers: { Authorization: `Bearer ${jwt}` },
//     });
//     console.log("🧹 Cart cleared");
//     return data;
//   } catch (error: any) {
//     return rejectWithValue(
//       error?.response?.data?.message || "Failed to clear cart"
//     );
//   }
// });

// /* ═══════════════════════════════════════════════
//    SLICE
//    ═══════════════════════════════════════════════ */
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     /* Logout ya manual reset */
//     resetCartState: (state) => {
//       state.cart = null;
//       state.loading = false;
//       state.error = null;
//     },

//     /* Optimistic local clear */
//     clearCartLocal: (state) => {
//       state.cart = null;
//       state.error = null;
//       state.loading = false;
//     },

//     /* Error dismiss */
//     clearCartError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       /* ───────── FETCH ───────── */
//       .addCase(fetchUserCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserCart.fulfilled, (state, action: PayloadAction<Cart>) => {
//         state.cart = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchUserCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         state.cart = null;
//       })

//       /* ───────── ADD TO CART ───────── */
//       .addCase(addItemToCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addItemToCart.fulfilled, (state, action: PayloadAction<Cart>) => {
//         state.cart = action.payload;      // 🔥 Full cart replace
//         state.loading = false;
//       })
//       .addCase(addItemToCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       /* ───────── DELETE ITEM ───────── */
//       .addCase(deleteCartItem.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteCartItem.fulfilled, (state, action: PayloadAction<Cart>) => {
//         state.cart = action.payload;
//         state.loading = false;
//       })
//       .addCase(deleteCartItem.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       /* ───────── UPDATE ITEM ───────── */
//       .addCase(updateCartItem.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateCartItem.fulfilled, (state, action: PayloadAction<Cart>) => {
//         state.cart = action.payload;
//         state.loading = false;
//       })
//       .addCase(updateCartItem.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       /* ───────── APPLY COUPON ───────── */
//       .addCase(applyCoupon.fulfilled, (state, action: any) => {
//         state.loading = false;
//         state.cart = action.payload?.cart ?? action.payload ?? null;
//       })

//       /* ───────── CLEAR CART ───────── */
//       .addCase(clearCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(clearCart.fulfilled, (state) => {
//         if (state.cart) {
//           state.cart = {
//             ...state.cart,
//             cartItems: [],
//             totalSellingPrice: 0,
//             totalMrpPrice: 0,
//             totalDiscount: 0,
//             couponCode: null,
//             couponPrice: 0,
//           } as any;
//         } else {
//           state.cart = null;
//         }
//         state.loading = false;
//       })
//       .addCase(clearCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       /* ───────── ORDER SUCCESS → CART KHALI ───────── */
//       .addMatcher(
//         (action) => action.type === "orders/createOrder/fulfilled",
//         (state) => {
//           state.cart = null;
//         }
//       )
//       .addMatcher(
//         (action) => action.type === "orders/paymentSuccess/fulfilled",
//         (state) => {
//           state.cart = null;
//         }
//       );
//   },
// });

// export default cartSlice.reducer;

// export const { resetCartState, clearCartLocal, clearCartError } =
//   cartSlice.actions;

// /* ═══════════════════════════════════════════════
//    SELECTORS
//    ═══════════════════════════════════════════════ */
// export const selectCart = (state: RootState) => state.cart.cart;
// export const selectCartLoading = (state: RootState) => state.cart.loading;
// export const selectCartError = (state: RootState) => state.cart.error;

// export const selectCartItemCount = (state: RootState) =>
//   state.cart.cart?.cartItems?.reduce(
//     (sum, item) => sum + (item.quantity || 0),
//     0
//   ) ?? 0;

// export const selectCartTotalSellingPrice = (state: RootState) =>
//   state.cart.cart?.totalSellingPrice ?? 0;

// export const selectCartTotalMrpPrice = (state: RootState) =>
//   state.cart.cart?.totalMrpPrice ?? 0;

// export const selectCartDiscount = (state: RootState) => {
//   const cart = state.cart.cart;
//   if (!cart) return 0;
//   return (cart.totalMrpPrice || 0) - (cart.totalSellingPrice || 0);
// };



















// src/slices/cartSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type Cart } from "../../types/cartTypes";
import { api } from "../../Config/Api";
import { type RootState } from "../Store";
import { applyCoupon } from "./CouponSlice";

/* ═══════════════════════════════════════════════
   STATE
   ═══════════════════════════════════════════════ */
interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

const DEPLOYED_URL = "/api/cart";

/* ═══════════════════════════════════════════════
   1️⃣ FETCH USER CART
   ═══════════════════════════════════════════════ */
export const fetchUserCart = createAsyncThunk<
  Cart,
  string,
  { rejectValue: string }
>("cart/fetchUserCart", async (jwt, { rejectWithValue }) => {
  try {
    // 🛡️ Seller guard
    const role = localStorage.getItem("userRole");
    if (role === "SELLER" || role === "ROLE_SELLER") {
      return rejectWithValue("Seller account — no cart");
    }

    const { data } = await api.get(DEPLOYED_URL, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    console.log("🛒 Cart fetched:", data);
    return data;
  } catch (error: any) {
    console.log("❌ fetch error:", error?.response?.data || error.message);
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch cart"
    );
  }
});

/* ═══════════════════════════════════════════════
   2️⃣ ADD TO CART
   ═══════════════════════════════════════════════ */
interface AddItemRequest {
  productId: string;
  size: string;
  quantity: number;
  customDesign?: any;
}

export const addItemToCart = createAsyncThunk<
  Cart,
  { jwt: string | null; request: AddItemRequest },
  { rejectValue: string }
>("cart/addItemToCart", async ({ jwt, request }, { rejectWithValue }) => {
  try {
    if (!jwt) return rejectWithValue("Please login to add items");
    if (!request.productId) return rejectWithValue("Invalid product");

    const { data } = await api.put(`${DEPLOYED_URL}/add`, request, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    console.log("✅ Added to cart — full cart received:", data);
    return data;
  } catch (error: any) {
    console.log("❌ add error:", error?.response?.data || error.message);
    return rejectWithValue(
      error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to add item"
    );
  }
});

/* ═══════════════════════════════════════════════
   3️⃣ DELETE CART ITEM
   ═══════════════════════════════════════════════ */
export const deleteCartItem = createAsyncThunk<
  Cart,
  { jwt: string; cartItemId: string },
  { rejectValue: string }
>("cart/deleteCartItem", async ({ jwt, cartItemId }, { rejectWithValue }) => {
  try {
    const { data } = await api.delete(`${DEPLOYED_URL}/item/${cartItemId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("🗑️ Item deleted — full cart received:", data);
    return data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to delete item"
    );
  }
});

/* ═══════════════════════════════════════════════
   4️⃣ UPDATE CART ITEM (quantity)
   ═══════════════════════════════════════════════ */
export const updateCartItem = createAsyncThunk<
  Cart,
  { jwt: string | null; cartItemId: string; cartItem: { quantity: number } },
  { rejectValue: string }
>(
  "cart/updateCartItem",
  async ({ jwt, cartItemId, cartItem }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `${DEPLOYED_URL}/item/${cartItemId}`,
        cartItem,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      console.log("✏️ Item updated — full cart received:", data);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update item"
      );
    }
  }
);

/* ═══════════════════════════════════════════════
   5️⃣ CLEAR CART
   ═══════════════════════════════════════════════ */
export const clearCart = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>("cart/clearCart", async (jwt, { rejectWithValue }) => {
  try {
    const { data } = await api.delete(`${DEPLOYED_URL}/clear`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    console.log("🧹 Cart cleared");
    return data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to clear cart"
    );
  }
});

/* ═══════════════════════════════════════════════
   SLICE
   ═══════════════════════════════════════════════ */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /* Logout ya manual reset */
    resetCartState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },

    /* Optimistic local clear */
    clearCartLocal: (state) => {
      state.cart = null;
      state.error = null;
      state.loading = false;
    },

    /* Error dismiss */
    clearCartError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ───────── FETCH ───────── */
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserCart.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.cart = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.cart = null;
      })

      /* ───────── ADD TO CART ───────── */
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addItemToCart.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.cart = action.payload; // 🔥 FULL CART REPLACE
          state.loading = false;
        }
      )
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ───────── DELETE ITEM ───────── */
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteCartItem.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.cart = action.payload; // 🔥 FULL CART REPLACE
          state.loading = false;
        }
      )
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ───────── UPDATE ITEM ───────── */
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCartItem.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.cart = action.payload; // 🔥 FULL CART REPLACE
          state.loading = false;
        }
      )
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ───────── APPLY COUPON ───────── */
      .addCase(applyCoupon.fulfilled, (state, action: any) => {
        state.loading = false;
        state.cart = action.payload?.cart ?? action.payload ?? null;
      })

      /* ───────── CLEAR CART ───────── */
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        if (state.cart) {
          state.cart = {
            ...state.cart,
            cartItems: [],
            totalSellingPrice: 0,
            totalMrpPrice: 0,
            totalDiscount: 0,
            couponCode: null,
            couponPrice: 0,
          } as any;
        } else {
          state.cart = null;
        }
        state.loading = false;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ───────── ORDER SUCCESS → CART KHALI ───────── */
      .addMatcher(
        (action) => action.type === "orders/createOrder/fulfilled",
        (state) => {
          state.cart = null;
        }
      )
      .addMatcher(
        (action) => action.type === "orders/paymentSuccess/fulfilled",
        (state) => {
          state.cart = null;
        }
      );
  },
});

export default cartSlice.reducer;

export const { resetCartState, clearCartLocal, clearCartError } =
  cartSlice.actions;

/* ═══════════════════════════════════════════════
   SELECTORS
   ═══════════════════════════════════════════════ */
export const selectCart = (state: RootState) => state.cart.cart;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;

export const selectCartItemCount = (state: RootState) =>
  state.cart.cart?.cartItems?.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  ) ?? 0;

export const selectCartTotalSellingPrice = (state: RootState) =>
  state.cart.cart?.totalSellingPrice ?? 0;

export const selectCartTotalMrpPrice = (state: RootState) =>
  state.cart.cart?.totalMrpPrice ?? 0;

export const selectCartDiscount = (state: RootState) => {
  const cart = state.cart.cart;
  if (!cart) return 0;
  return (cart.totalMrpPrice || 0) - (cart.totalSellingPrice || 0);
};