// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { api } from '../../Config/Api';
// import { type Seller } from '../../types/sellerTypes';
// import axios from 'axios';
// import { sendLoginSignupOtp } from '../Customer/AuthSlice';

// // Define initial state
// interface SellerAuthState {
//     otpSent: boolean;
//     error: string | null;
//     loading: boolean;
//     jwt: string | null;
//     sellerCreated: string | null;
// }

// const initialState: SellerAuthState = {
//     otpSent: false,
//     error: null,
//     loading: false,
//     jwt: null,
//     sellerCreated: ""
// };

// const DEPLOYED_URL = '/sellers';

// // Define async thunks for sending and verifying OTP
// export const sendLoginOtp = createAsyncThunk('otp/sendLoginOtp', async (email: string, { rejectWithValue }) => {
//     try {
//         const { data } = await api.post('/sellers/sent/login-top', { email });
//         console.log("otp sent - ", email, data)
//         return { email };
//     } catch (error: any) {
//         console.log("error", error)
//         return rejectWithValue(error.response?.data?.message || 'Failed to send OTP');
//     }
// });

// export const verifyLoginOtp = createAsyncThunk('otp/verifyLoginOtp',
//     async (data: { email: string; otp: string, navigate: any }, { rejectWithValue }) => {
//         try {
//             const response = await api.post('/sellers/verify/login-otp', data);
//             console.log("login seller success - ", response.data)
//             localStorage.setItem("jwt", response.data.jwt)
//             data.navigate("/seller")
//             return response.data;
//         } catch (error: any) {
//             console.log("error", error.response?.data)
//             return rejectWithValue(error.response?.data?.message || 'Failed to verify OTP');
//         }
//     });

// export const createSeller = createAsyncThunk<Seller, Seller>(
//     'sellers/createSeller',
//     async (seller: Seller, { rejectWithValue }) => {
//         try {
//             const response = await api.post<Seller>(DEPLOYED_URL, seller);
//             console.log('create seller', response.data);
//             return response.data;
//         } catch (error: any) {
//             if (axios.isAxiosError(error) && error.response) {
//                 console.error('Create seller error response data:', error.response.data);
//                 console.error('Create seller error response status:', error.response.status);
//                 console.error('Create seller error response headers:', error.response.headers);
//                 return rejectWithValue(error.message);
//             } else {
//                 console.error('Create seller error message:', error.message);
//                 return rejectWithValue('Failed to create seller');
//             }
//         }
//     }
// );

// // Create the slice
// const sellerAuthSlice = createSlice({
//     name: 'sellerAuth',
//     initialState,
//     reducers: {
//         resetSellerAuthState: (state) => {
//             state.otpSent = false;
//             state.error = null;
//             state.loading = false;
//             state.jwt = null;
//         },
//     },
//     extraReducers: (builder) => {
//         // Handle sendLoginOtp actions
//         builder
//             .addCase(sendLoginSignupOtp.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(sendLoginSignupOtp.fulfilled, (state) => {
//                 state.loading = false;
//                 state.otpSent = true;
//                 state.error = null;
//             })
//             .addCase(sendLoginSignupOtp.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             });

//         // Handle verifyLoginOtp actions
//         builder
//             .addCase(verifyLoginOtp.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(verifyLoginOtp.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.jwt = action.payload.jwt;
//                 state.error = null;
//             })
//             .addCase(verifyLoginOtp.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             // create new seller
//             .addCase(createSeller.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(createSeller.fulfilled, (state) => {
//                 // state.sellers.push(action.payload);
//                 state.sellerCreated = "verification email sent to you"
//                 state.loading = false;
//             })
//             .addCase(createSeller.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string || 'Failed to create seller';
//             })
//             ;
//     },
// });

// // Export actions and reducer
// export const { resetSellerAuthState } = sellerAuthSlice.actions;
// export default sellerAuthSlice.reducer;









import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

interface SellerAuthState {
  loading: boolean;
  error: string | null;
  otpSent: boolean;
  sellerCreated: string | null;
}

const initialState: SellerAuthState = {
  loading: false,
  error: null,
  otpSent: false,
  sellerCreated: null,
};

/* 🔥 CREATE SELLER with FormData */
export const createSeller = createAsyncThunk<any, any>(
  "sellerAuth/createSeller",
  async (sellerData: any, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Text fields
      formData.append("mobile", sellerData.mobile || "");
      formData.append("GSTIN", sellerData.GSTIN || "");
      formData.append("sellerName", sellerData.sellerName || "");
      formData.append("email", sellerData.email || "");
      formData.append("password", sellerData.password || "");

      // Nested objects
      formData.append(
        "pickupAddress",
        JSON.stringify(sellerData.pickupAddress || {})
      );
      formData.append(
        "bankDetails",
        JSON.stringify(sellerData.bankDetails || {})
      );
      formData.append(
        "businessDetails",
        JSON.stringify(sellerData.businessDetails || {})
      );

      // 🔥 Document files
      if (sellerData.documents?.gstCertificate) {
        formData.append("gstCertificate", sellerData.documents.gstCertificate);
      }
      if (sellerData.documents?.panCard) {
        formData.append("panCard", sellerData.documents.panCard);
      }
      if (sellerData.documents?.bankProof) {
        formData.append("bankProof", sellerData.documents.bankProof);
      }
      formData.append(
        "bankProofType",
        sellerData.documents?.bankProofType || "cancelled_cheque"
      );

      const { data } = await api.post("/sellers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to create seller"
      );
    }
  }
);

export const sendOtp = createAsyncThunk<any, string>(
  "sellerAuth/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/sellers/sent/login-top", { email });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);

export const verifyLoginOtp = createAsyncThunk<any, any>(
  "sellerAuth/verifyLoginOtp",
  async ({ email, otp, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/sellers/verify/login-otp", {
        email,
        otp,
      });
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        navigate("/seller");
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);

const sellerAuthSlice = createSlice({
  name: "sellerAuth",
  initialState,
  reducers: {
    resetSellerAuth: (state) => {
      state.error = null;
      state.sellerCreated = null;
      state.otpSent = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.sellerCreated = null;
      })
      .addCase(createSeller.fulfilled, (state) => {
        state.loading = false;
        state.sellerCreated = "Seller account created successfully! ✅";
      })
      .addCase(createSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyLoginOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyLoginOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSellerAuth } = sellerAuthSlice.actions;
export default sellerAuthSlice.reducer;