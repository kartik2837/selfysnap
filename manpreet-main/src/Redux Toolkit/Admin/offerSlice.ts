// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { api } from "../../Config/Api";

// // ═══════════════════════════════════════════════════
// // CREATE OFFER
// // ═══════════════════════════════════════════════════
// export const createOffer = createAsyncThunk(
//   "offer/create",
//   async (offerData: any, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/api/offers/create", offerData);
//       return res.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // ═══════════════════════════════════════════════════
// // GET ALL OFFERS (Admin)
// // ═══════════════════════════════════════════════════
// export const fetchAllOffers = createAsyncThunk(
//   "offer/fetchAll",
//   async (
//     { page = 1, limit = 20, status = "" }: any = {},
//     { rejectWithValue }
//   ) => {
//     try {
//       const res = await api.get("/api/offers/admin/all", {
//         params: { page, limit, status },
//       });
//       return res.data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // ═══════════════════════════════════════════════════
// // GET LIVE OFFERS (Customer)
// // ═══════════════════════════════════════════════════
// export const fetchLiveOffers = createAsyncThunk(
//   "offer/fetchLive",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await api.get("/api/offers/live");
//       return res.data.offers;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // ═══════════════════════════════════════════════════
// // UPDATE OFFER
// // ═══════════════════════════════════════════════════
// export const updateOffer = createAsyncThunk(
//   "offer/update",
//   async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
//     try {
//       const res = await api.put(`/api/offers/${id}`, data);
//       return res.data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // ═══════════════════════════════════════════════════
// // DELETE OFFER
// // ═══════════════════════════════════════════════════
// export const deleteOffer = createAsyncThunk(
//   "offer/delete",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       await api.delete(`/api/offers/${id}`);
//       return id;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // ═══════════════════════════════════════════════════
// // TOGGLE STATUS
// // ═══════════════════════════════════════════════════
// export const toggleOfferStatus = createAsyncThunk(
//   "offer/toggle",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const res = await api.patch(`/api/offers/${id}/toggle`);
//       return res.data.offer;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // ═══════════════════════════════════════════════════
// // NOTIFY OFFER
// // ═══════════════════════════════════════════════════
// export const notifyOffer = createAsyncThunk(
//   "offer/notify",
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const res = await api.post(`/api/offers/${id}/notify`);
//       return res.data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // ═══════════════════════════════════════════════════
// // SLICE
// // ═══════════════════════════════════════════════════
// interface OfferState {
//   offers: any[];
//   liveOffers: any[];
//   loading: boolean;
//   error: string | null;
//   success: boolean;
// }

// const initialState: OfferState = {
//   offers: [],
//   liveOffers: [],
//   loading: false,
//   error: null,
//   success: false,
// };

// const offerSlice = createSlice({
//   name: "offer",
//   initialState,
//   reducers: {
//     clearOfferError: (state) => {
//       state.error = null;
//     },
//     resetOfferSuccess: (state) => {
//       state.success = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create
//       .addCase(createOffer.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createOffer.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.offers.unshift(action.payload.offer);
//       })
//       .addCase(createOffer.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       // Fetch All
//       .addCase(fetchAllOffers.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchAllOffers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.offers = action.payload.offers || [];
//       })
//       .addCase(fetchAllOffers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       // Fetch Live
//       .addCase(fetchLiveOffers.fulfilled, (state, action) => {
//         state.liveOffers = action.payload;
//       })

//       // Update
//       .addCase(updateOffer.fulfilled, (state, action) => {
//         const idx = state.offers.findIndex(
//           (o) => o._id === action.payload.offer._id
//         );
//         if (idx !== -1) state.offers[idx] = action.payload.offer;
//         state.success = true;
//       })

//       // Delete
//       .addCase(deleteOffer.fulfilled, (state, action) => {
//         state.offers = state.offers.filter((o) => o._id !== action.payload);
//         state.success = true;
//       })

//       // Toggle
//       .addCase(toggleOfferStatus.fulfilled, (state, action) => {
//         const idx = state.offers.findIndex(
//           (o) => o._id === action.payload._id
//         );
//         if (idx !== -1) state.offers[idx] = action.payload;
//       });
//   },
// });

// export const { clearOfferError, resetOfferSuccess } = offerSlice.actions;
// export default offerSlice.reducer;






// src/Redux Toolkit/Admin/offerSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

// ═══════════════════════════════════════════════════
// CREATE OFFER (With Image Upload) - FIXED
// ═══════════════════════════════════════════════════
export const createOffer = createAsyncThunk(
  "offer/create",
  async (offerData: any, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // ✅ सभी Fields Add करें
      Object.keys(offerData).forEach((key) => {
        const value = offerData[key];

        // Image File
        if (key === "bannerImageFile" && value instanceof File) {
          formData.append("bannerImage", value);
          console.log("📷 Image appended:", value.name);
        }
        // Skip file field
        else if (key === "bannerImageFile") {
          // Skip
        }
        // Everything else - append as-is (including empty strings)
        else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
          console.log(`📝 ${key}:`, value);
        }
      });

      console.log("═══════════════════════════════");
      console.log("📤 FormData being sent:");
      for (let pair of formData.entries()) {
        console.log(`   ${pair[0]}:`, pair[1]);
      }
      console.log("═══════════════════════════════");

      // ✅ Content-Type set नहीं करें - Axios खुद करेगा
      const res = await api.post("/api/offers/create", formData);

      return res.data;
    } catch (error: any) {
      console.error("❌ Create offer error:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// ═══════════════════════════════════════════════════
// UPDATE OFFER (With Image Upload) - FIXED
// ═══════════════════════════════════════════════════
export const updateOffer = createAsyncThunk(
  "offer/update",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        const value = data[key];

        if (key === "bannerImageFile" && value instanceof File) {
          formData.append("bannerImage", value);
        } else if (key === "bannerImageFile") {
          // Skip
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      const res = await api.put(`/api/offers/${id}`, formData);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ═══ बाकी Functions ═══
export const fetchAllOffers = createAsyncThunk(
  "offer/fetchAll",
  async (
    { page = 1, limit = 20, status = "" }: any = {},
    { rejectWithValue }
  ) => {
    try {
      const res = await api.get("/api/offers/admin/all", {
        params: { page, limit, status },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLiveOffers = createAsyncThunk(
  "offer/fetchLive",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/offers/live");
      return res.data.offers;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOffer = createAsyncThunk(
  "offer/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/api/offers/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleOfferStatus = createAsyncThunk(
  "offer/toggle",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/api/offers/${id}/toggle`);
      return res.data.offer;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const notifyOffer = createAsyncThunk(
  "offer/notify",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.post(`/api/offers/${id}/notify`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ═══ Slice ═══
interface OfferState {
  offers: any[];
  liveOffers: any[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: OfferState = {
  offers: [],
  liveOffers: [],
  loading: false,
  error: null,
  success: false,
};

const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    clearOfferError: (state) => {
      state.error = null;
    },
    resetOfferSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.offers.unshift(action.payload.offer);
      })
      .addCase(createOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllOffers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload.offers || [];
      })
      .addCase(fetchAllOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchLiveOffers.fulfilled, (state, action) => {
        state.liveOffers = action.payload;
      })
      .addCase(updateOffer.fulfilled, (state, action) => {
        const idx = state.offers.findIndex(
          (o) => o._id === action.payload.offer._id
        );
        if (idx !== -1) state.offers[idx] = action.payload.offer;
      })
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.offers = state.offers.filter((o) => o._id !== action.payload);
      })
      .addCase(toggleOfferStatus.fulfilled, (state, action) => {
        const idx = state.offers.findIndex(
          (o) => o._id === action.payload._id
        );
        if (idx !== -1) state.offers[idx] = action.payload;
      });
  },
});

export const { clearOfferError, resetOfferSuccess } = offerSlice.actions;
export default offerSlice.reducer;