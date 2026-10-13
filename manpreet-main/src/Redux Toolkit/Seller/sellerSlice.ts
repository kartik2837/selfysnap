// import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { type RootState } from "../Store";
// import { type Seller, type SellerReport } from "../../types/sellerTypes";
// import { api } from "../../Config/Api";

// // Define the initial state type
// interface SellerState {
//   sellers: Seller[];
//   selectedSeller: Seller | null;
//   profile: Seller | null;
//   loading: boolean;
//   error: string | null;
//   report: SellerReport | null;
//   profileUpdated: boolean;
// }

// // Define the initial state
// const initialState: SellerState = {
//   sellers: [],
//   selectedSeller: null,
//   loading: false,
//   error: null,
//   profile: null,
//   report: null,
//   profileUpdated: false,
// };

// // Define the base URL for the API
// const DEPLOYED_URL = "/sellers";

// // Create async thunks for API calls
// export const fetchSellerProfile = createAsyncThunk<Seller, any>(
//   "sellers/fetchSellerProfile",
//   async (jwt: string, { rejectWithValue }) => {
//     try {
//       const response = await api.get<Seller>(`${DEPLOYED_URL}/profile`, {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       });
//       console.log("fetch seller profile", response.data);
//       return response.data;
//     } catch (error: any) {
//       if (axios.isAxiosError(error) && error.response) {
//         return rejectWithValue(error.response.data.message || error.message);
//       }
//       return rejectWithValue("Failed to fetch profile");
//     }
//   }
// );

// export const fetchSellers = createAsyncThunk<Seller[], string>(
//   "sellers/fetchSellers",
//   async (status: string, { rejectWithValue }) => {
//     try {
//       const response = await api.get<Seller[]>(DEPLOYED_URL, {
//         params: {
//           status,
//         },
//       });
//       console.log("fetch sellers", response.data);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch sellers");
//     }
//   }
// );

// export const fetchSellerReport = createAsyncThunk<
//   SellerReport,
//   string, // JWT token type
//   { rejectValue: string }
// >("sellers/fetchSellerReport", async (jwt: string, { rejectWithValue }) => {
//   try {
//     const response = await api.get(`/api${DEPLOYED_URL}/report`, {
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//       },
//     });
//     console.log("Fetch seller report", response.data);
//     return response.data;
//   } catch (error: any) {
//     if (error.response) {
//       return rejectWithValue(error.response.data.message);
//     }
//     return rejectWithValue("Failed to fetch seller report");
//   }
// });

// export const fetchSellerById = createAsyncThunk<Seller, string>(
//   "sellers/fetchSellerById",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`${DEPLOYED_URL}/${id}`);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch seller");
//     }
//   }
// );

// export const updateSeller = createAsyncThunk<
//   Seller, any
// >(
//   "sellers/updateSeller",
//   async (
//     seller: any,
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await api.patch(`${DEPLOYED_URL}`, seller, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//       });
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Failed to update seller");
//     }
//   }
// );

// export const updateSellerAccountStatus = createAsyncThunk<
//   Seller,
//   { id: string; status: string }
// >(
//   "sellers/updateSellerAccountStatus",
//   async (
//     { id, status }: { id: string; status: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await api.patch(`/admin/seller/${id}/status/${status}`);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Failed to update seller status");
//     }
//   }
// );

// export const verifySellerEmail = createAsyncThunk<
//   any,
//   { otp: number; navigate: any }
// >(
//   "sellers/verifySellerEmail",
//   async ({ otp, navigate }, { rejectWithValue }) => {
//     try {
//       const response = await api.patch(`${DEPLOYED_URL}/verify/${otp}`);
//       navigate("/seller-account-verified");
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Failed to verify email");
//     }
//   }
// );

// export const deleteSeller = createAsyncThunk<void, string>(
//   "sellers/deleteSeller",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       await api.delete(`${DEPLOYED_URL}/${id}`);
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Failed to delete seller");
//     }
//   }
// );

// export const registerDelhivery = createAsyncThunk<
//   Seller,
//   string
// >(
//   "sellers/registerDelhivery",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const response = await api.post(`/admin/seller/${id}/register-delhivery`);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Failed to register delhivery");
//     }
//   }
// );

// export const registerSelfDelhivery = createAsyncThunk<
//   Seller,
//   void
// >(
//   "sellers/registerSelfDelhivery",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.post(`${DEPLOYED_URL}/register-delhivery`, null, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//       });
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Failed to register delhivery");
//     }
//   }
// );

// // Create the slice
// const sellerSlice = createSlice({
//   name: "sellers",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // fetch seller profile
//       .addCase(fetchSellerProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.profileUpdated = false;
//       })
//       .addCase(
//         fetchSellerProfile.fulfilled,
//         (state, action: PayloadAction<Seller>) => {
//           state.profile = action.payload;
//           state.loading = false;
//         }
//       )
//       .addCase(fetchSellerProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = (action.payload as string) || "Failed to fetch profile";
//       })
//       // fetch sellers
//       .addCase(fetchSellers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchSellers.fulfilled,
//         (state, action: PayloadAction<Seller[]>) => {
//           state.sellers = action.payload;
//           state.loading = false;
//         }
//       )
//       .addCase(fetchSellers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = (action.payload as string) || "Failed to fetch sellers";
//       })
//       .addCase(fetchSellerById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchSellerById.fulfilled,
//         (state, action: PayloadAction<Seller>) => {
//           state.selectedSeller = action.payload;
//           state.loading = false;
//         }
//       )
//       .addCase(fetchSellerById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = (action.payload as string) || "Failed to fetch seller";
//       })
//       // update seller
//       .addCase(updateSeller.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.profileUpdated = false;
//       })
//       .addCase(
//         updateSeller.fulfilled,
//         (state, action: PayloadAction<Seller>) => {
//           const index = state.sellers.findIndex(
//             (seller) => seller._id === action.payload._id
//           );
//           if (index !== -1) {
//             state.sellers[index] = action.payload;
//           }
//           state.profile = action.payload;
//           state.loading = false;
//           state.profileUpdated = true;
//         }
//       )
//       .addCase(updateSeller.rejected, (state, action) => {
//         state.loading = false;
//         state.error = (action.payload as string) || "Failed to update seller";
//       })
//       // update seller status
//       .addCase(updateSellerAccountStatus.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         updateSellerAccountStatus.fulfilled,
//         (state, action: PayloadAction<Seller>) => {
//           const index = state.sellers.findIndex(
//             (seller) => seller._id === action.payload._id
//           );
//           if (index !== -1) {
//             state.sellers[index] = action.payload;
//           }
//           if (state.profile?._id === action.payload._id) {
//             state.profile = action.payload;
//           }
//           state.loading = false;
//         }
//       )
//       .addCase(updateSellerAccountStatus.rejected, (state, action) => {
//         state.loading = false;
//         state.error = (action.payload as string) || "Failed to update seller status";
//       })
//       // delete seller
//       .addCase(deleteSeller.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteSeller.fulfilled, (state, action) => {
//         state.sellers = state.sellers.filter(
//           (seller) => seller._id !== action.meta.arg
//         );
//         state.loading = false;
//       })
//       .addCase(deleteSeller.rejected, (state, action) => {
//         state.loading = false;
//         state.error = (action.payload as string) || "Failed to delete seller";
//       })
//       // fetch report
//       .addCase(fetchSellerReport.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSellerReport.fulfilled, (state, action) => {
//         state.loading = false;
//         state.report = action.payload;
//       })
//       .addCase(fetchSellerReport.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // register delhivery
//       .addCase(registerDelhivery.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerDelhivery.fulfilled, (state, action: PayloadAction<Seller>) => {
//         state.loading = false;
//         const index = state.sellers.findIndex(s => s._id === action.payload._id);
//         if (index !== -1) {
//           state.sellers[index] = action.payload;
//         }
//         if (state.profile?._id === action.payload._id) {
//           state.profile = action.payload;
//         }
//       })
//       .addCase(registerDelhivery.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // register self delhivery
//       .addCase(registerSelfDelhivery.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerSelfDelhivery.fulfilled, (state, action: PayloadAction<Seller>) => {
//         state.loading = false;
//         state.profile = action.payload;
//         const index = state.sellers.findIndex(s => s._id === action.payload._id);
//         if (index !== -1) {
//           state.sellers[index] = action.payload;
//         }
//       })
//       .addCase(registerSelfDelhivery.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default sellerSlice.reducer;

// // Define selector functions
// export const selectSellers = (state: RootState) => state.sellers.sellers;
// export const selectSelectedSeller = (state: RootState) => state.sellers.selectedSeller;
// export const selectSellerLoading = (state: RootState) => state.sellers.loading;
// export const selectSellerError = (state: RootState) => state.sellers.error;













import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { type RootState } from "../Store";
import { type Seller, type SellerReport } from "../../types/sellerTypes";
import { api } from "../../Config/Api";

/* ═══════════════════════════════════════════════
   STATE
   ═══════════════════════════════════════════════ */
interface SellerState {
  sellers: Seller[];
  selectedSeller: Seller | null;
  profile: Seller | null;
  loading: boolean;
  error: string | null;
  report: SellerReport | null;
  profileUpdated: boolean;
  otpSent: boolean;
  sellerCreated: string | null;
}

const initialState: SellerState = {
  sellers: [],
  selectedSeller: null,
  loading: false,
  error: null,
  profile: null,
  report: null,
  profileUpdated: false,
  otpSent: false,
  sellerCreated: null,
};

const DEPLOYED_URL = "/sellers";

/* ═══════════════════════════════════════════════
   FETCH SELLER PROFILE
   ═══════════════════════════════════════════════ */
export const fetchSellerProfile = createAsyncThunk<Seller, any>(
  "sellers/fetchSellerProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get<Seller>(`${DEPLOYED_URL}/profile`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || error.message);
      }
      return rejectWithValue("Failed to fetch profile");
    }
  }
);

/* ═══════════════════════════════════════════════
   FETCH SELLERS
   ═══════════════════════════════════════════════ */
export const fetchSellers = createAsyncThunk<Seller[], string>(
  "sellers/fetchSellers",
  async (status: string, { rejectWithValue }) => {
    try {
      const response = await api.get<Seller[]>(DEPLOYED_URL, {
        params: { status },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch sellers"
      );
    }
  }
);

/* ═══════════════════════════════════════════════
   FETCH SELLER REPORT
   ═══════════════════════════════════════════════ */
export const fetchSellerReport = createAsyncThunk<
  SellerReport,
  string,
  { rejectValue: string }
>("sellers/fetchSellerReport", async (jwt: string, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api${DEPLOYED_URL}/report`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("Failed to fetch seller report");
  }
});

/* ═══════════════════════════════════════════════
   FETCH SELLER BY ID
   ═══════════════════════════════════════════════ */
export const fetchSellerById = createAsyncThunk<Seller, string>(
  "sellers/fetchSellerById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`${DEPLOYED_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller"
      );
    }
  }
);

/* ═══════════════════════════════════════════════
   UPDATE SELLER
   ═══════════════════════════════════════════════ */
export const updateSeller = createAsyncThunk<Seller, any>(
  "sellers/updateSeller",
  async (seller: any, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${DEPLOYED_URL}`, seller, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update seller"
      );
    }
  }
);

/* ═══════════════════════════════════════════════
   UPDATE SELLER ACCOUNT STATUS
   ═══════════════════════════════════════════════ */
export const updateSellerAccountStatus = createAsyncThunk<
  Seller,
  { id: string; status: string }
>(
  "sellers/updateSellerAccountStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/seller/${id}/status/${status}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update seller status"
      );
    }
  }
);

/* ═══════════════════════════════════════════════
   🔥 SEND SELLER LOGIN OTP
   ═══════════════════════════════════════════════ */
export const sendSellerLoginOtp = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>("sellers/sendSellerLoginOtp", async (email, { rejectWithValue }) => {
  try {
    console.log("🔵 [FRONTEND] Sending seller OTP to:", email);

    const response = await api.post(`${DEPLOYED_URL}/sent/login-top`, {
      email,
    });

    console.log("✅ [FRONTEND] OTP sent:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ [FRONTEND] Send OTP error:", error);
    return rejectWithValue(
      error.response?.data?.message || "Failed to send OTP"
    );
  }
});

/* ═══════════════════════════════════════════════
   🔥 VERIFY SELLER EMAIL (Registration)
   ═══════════════════════════════════════════════ */
export const verifySellerEmail = createAsyncThunk<
  any,
  { otp: number; navigate: any }
>(
  "sellers/verifySellerEmail",
  async ({ otp, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${DEPLOYED_URL}/verify/otp`, {
        otp: Number(otp),
      });
      navigate("/seller-account-verified");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to verify email"
      );
    }
  }
);

/* ═══════════════════════════════════════════════
   🔥 VERIFY LOGIN OTP
   ═══════════════════════════════════════════════ */
export const verifyLoginOtp = createAsyncThunk<
  any,
  { email: string; otp: string; navigate: any }
>(
  "sellers/verifyLoginOtp",
  async ({ email, otp, navigate }, { rejectWithValue }) => {
    try {
      console.log("🔵 [FRONTEND] Verifying login OTP:", { email, otp });

      const response = await api.post(`${DEPLOYED_URL}/verify/login-otp`, {
        email,
        otp,
      });

      console.log("✅ [FRONTEND] Login success:", response.data);

      if (response.data?.jwt) {
        localStorage.setItem("jwt", response.data.jwt);
        navigate("/seller");
      }

      return response.data;
    } catch (error: any) {
      console.error("❌ [FRONTEND] Login error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Invalid OTP"
      );
    }
  }
);

/* ═══════════════════════════════════════════════
   DELETE SELLER
   ═══════════════════════════════════════════════ */
export const deleteSeller = createAsyncThunk<void, string>(
  "sellers/deleteSeller",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`${DEPLOYED_URL}/${id}`);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete seller"
      );
    }
  }
);

/* ═══════════════════════════════════════════════
   REGISTER DELHIVERY (Admin)
   ═══════════════════════════════════════════════ */
export const registerDelhivery = createAsyncThunk<Seller, string>(
  "sellers/registerDelhivery",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.post(`/admin/seller/${id}/register-delhivery`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to register delhivery"
      );
    }
  }
);

/* ═══════════════════════════════════════════════
   REGISTER DELHIVERY (Self)
   ═══════════════════════════════════════════════ */
export const registerSelfDelhivery = createAsyncThunk<Seller, void>(
  "sellers/registerSelfDelhivery",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${DEPLOYED_URL}/register-delhivery`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to register delhivery"
      );
    }
  }
);

/* ═══════════════════════════════════════════════
   SLICE
   ═══════════════════════════════════════════════ */
const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {
    resetSellerAuth: (state) => {
      state.otpSent = false;
      state.error = null;
      state.sellerCreated = null;
    },

    // 🔥 SOCKET — Real-time status update
    updateSellerStatusFromSocket: (
      state,
      action: PayloadAction<{ sellerId: string; accountStatus: string }>
    ) => {
      console.log("📡 [Socket] Updating seller status:", action.payload);

      // Update profile if same seller
      if (state.profile?._id === action.payload.sellerId) {
        state.profile.accountStatus = action.payload.accountStatus;
        console.log(
          "✅ [Socket] Profile status updated to:",
          action.payload.accountStatus
        );
      }

      // Update in sellers list
      const index = state.sellers.findIndex(
        (s) => s._id === action.payload.sellerId
      );
      if (index !== -1) {
        state.sellers[index].accountStatus = action.payload.accountStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      /* fetch seller profile */
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdated = false;
      })
      .addCase(
        fetchSellerProfile.fulfilled,
        (state, action: PayloadAction<Seller>) => {
          state.profile = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch profile";
      })

      /* fetch sellers */
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSellers.fulfilled,
        (state, action: PayloadAction<Seller[]>) => {
          state.sellers = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch sellers";
      })

      /* fetch seller by id */
      .addCase(fetchSellerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSellerById.fulfilled,
        (state, action: PayloadAction<Seller>) => {
          state.selectedSeller = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSellerById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch seller";
      })

      /* update seller */
      .addCase(updateSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdated = false;
      })
      .addCase(
        updateSeller.fulfilled,
        (state, action: PayloadAction<Seller>) => {
          const index = state.sellers.findIndex(
            (seller) => seller._id === action.payload._id
          );
          if (index !== -1) state.sellers[index] = action.payload;
          state.profile = action.payload;
          state.loading = false;
          state.profileUpdated = true;
        }
      )
      .addCase(updateSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update seller";
      })

      /* update status */
      .addCase(updateSellerAccountStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateSellerAccountStatus.fulfilled,
        (state, action: PayloadAction<Seller>) => {
          const index = state.sellers.findIndex(
            (seller) => seller._id === action.payload._id
          );
          if (index !== -1) state.sellers[index] = action.payload;
          if (state.profile?._id === action.payload._id) {
            state.profile = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(updateSellerAccountStatus.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to update seller status";
      })

      /* 🔥 SEND OTP */
      .addCase(sendSellerLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpSent = false;
      })
      .addCase(sendSellerLoginOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendSellerLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.otpSent = false;
        state.error = (action.payload as string) || "Failed to send OTP";
      })

      /* 🔥 VERIFY LOGIN OTP */
      .addCase(verifyLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyLoginOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = false;
      })
      .addCase(verifyLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Invalid OTP";
      })

      /* 🔥 VERIFY EMAIL */
      .addCase(verifySellerEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySellerEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifySellerEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Verification failed";
      })

      /* delete seller */
      .addCase(deleteSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSeller.fulfilled, (state, action) => {
        state.sellers = state.sellers.filter(
          (seller) => seller._id !== action.meta.arg
        );
        state.loading = false;
      })
      .addCase(deleteSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to delete seller";
      })

      /* fetch report */
      .addCase(fetchSellerReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* register delhivery */
      .addCase(registerDelhivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerDelhivery.fulfilled,
        (state, action: PayloadAction<Seller>) => {
          state.loading = false;
          const index = state.sellers.findIndex(
            (s) => s._id === action.payload._id
          );
          if (index !== -1) state.sellers[index] = action.payload;
          if (state.profile?._id === action.payload._id) {
            state.profile = action.payload;
          }
        }
      )
      .addCase(registerDelhivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* register self delhivery */
      .addCase(registerSelfDelhivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerSelfDelhivery.fulfilled,
        (state, action: PayloadAction<Seller>) => {
          state.loading = false;
          state.profile = action.payload;
          const index = state.sellers.findIndex(
            (s) => s._id === action.payload._id
          );
          if (index !== -1) state.sellers[index] = action.payload;
        }
      )
      .addCase(registerSelfDelhivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* ═══════════════════════════════════════════════
   🔥 EXPORT ACTIONS — Socket action bhi add kiya
   ═══════════════════════════════════════════════ */
export const {
  resetSellerAuth,
  updateSellerStatusFromSocket,
} = sellerSlice.actions;

export default sellerSlice.reducer;

/* ═══════════════════════════════════════════════
   SELECTORS
   ═══════════════════════════════════════════════ */
export const selectSellers = (state: RootState) => state.sellers.sellers;
export const selectSelectedSeller = (state: RootState) =>
  state.sellers.selectedSeller;
export const selectSellerLoading = (state: RootState) => state.sellers.loading;
export const selectSellerError = (state: RootState) => state.sellers.error;