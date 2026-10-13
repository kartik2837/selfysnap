import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { type Cart } from "../../types/cartTypes";
import { type CouponState } from "../../types/couponTypes";
import { api } from "../../Config/Api";

const DEPLOYED_URL = "/api/coupons";

// Async thunks
export const applyCoupon = createAsyncThunk<
  Cart,
  {
    apply: string;
    code: string;
    orderValue: number;
    jwt: string;
  },
  { rejectValue: string }
>(
  "coupon/applyCoupon",
  async ({ apply, code, orderValue, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${DEPLOYED_URL}/apply`, null, {
        params: { apply, code, orderValue },
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("aplly coupon ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(error.response?.data.error || "Failed to apply coupon");
    }
  }
);

// Initial state
const initialState: CouponState = {
  coupons: [],
  cart: null,
  loading: false,
  error: null,
  couponCreated: false,
  couponApplied: false,

};

// Slice
const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.couponApplied = false;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;

        if (action.meta.arg.apply == "true") {
          state.couponApplied = true
        }

      })
      .addCase(
        applyCoupon.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to apply coupon";
          state.couponApplied = false;
        }
      );
  },
});

export default couponSlice.reducer;





// import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
// import { type Cart } from "../../types/cartTypes";
// import { type CouponState } from "../../types/couponTypes";
// import { api } from "../../Config/Api";

// const DEPLOYED_URL = "/api/coupons";

// // ========== ASYNC THUNKS ==========

// // ✅ FIXED: Sends data in request body, not as params
// export const applyCoupon = createAsyncThunk<
//   Cart,
//   {
//     apply: string;
//     code: string;
//     orderValue: number;
//     jwt: string;
//   },
//   { rejectValue: string }
// >(
//   "coupon/applyCoupon",
//   async ({ apply, code, orderValue, jwt }, { rejectWithValue }) => {
//     try {
//       // ✅ Send JSON body – matches backend expectations
//       const response = await api.post(
//         `${DEPLOYED_URL}/apply`,
//         {
//           apply: apply === "true" ? true : false, // convert to boolean
//           code: code,
//           cartTotal: orderValue, // backend expects 'cartTotal'
//         },
//         {
//           headers: { Authorization: `Bearer ${jwt}` },
//         }
//       );
//       console.log("✅ Coupon applied:", response.data);
//       return response.data;
//     } catch (error: any) {
//       console.error("❌ Coupon error:", error);
//       return rejectWithValue(
//         error.response?.data?.message ||
//           error.response?.data?.error ||
//           "Failed to apply coupon"
//       );
//     }
//   }
// );

// // ========== INITIAL STATE ==========
// const initialState: CouponState = {
//   coupons: [],
//   cart: null,
//   loading: false,
//   error: null,
//   couponCreated: false,
//   couponApplied: false,
// };

// // ========== SLICE ==========
// const couponSlice = createSlice({
//   name: "coupon",
//   initialState,
//   reducers: {
//     clearCouponError: (state) => {
//       state.error = null;
//     },
//     resetCouponApplied: (state) => {
//       state.couponApplied = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(applyCoupon.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.couponApplied = false;
//       })
//       .addCase(applyCoupon.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cart = action.payload;
//         // Only set applied if apply was "true"
//         if (action.meta.arg.apply === "true") {
//           state.couponApplied = true;
//         }
//       })
//       .addCase(applyCoupon.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to apply coupon";
//         state.couponApplied = false;
//       });
//   },
// });

// export const { clearCouponError, resetCouponApplied } = couponSlice.actions;
// export default couponSlice.reducer;
