// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {api} from "../../Config/Api"; // या { api } – अपने अनुसार

// // ========== TYPES (Same) ==========
// export interface ReturnMedia {
//   images: string[];
//   videos: string[];
//   audio: string | null;
// }

// export interface ReturnRequest {
//   _id: string;
//   order: string;
//   user: string;
//   seller: string;
//   reason: string;
//   description?: string;
//   status:
//     | "requested"
//     | "admin_approved"
//     | "assigned_to_delivery"
//     | "pickup_scheduled"
//     | "received"
//     | "refunded"
//     | "rejected";
//   refundAmount: number;
//   refundStatus: "pending" | "processed";
//   adminNote?: string;
//   returnShipmentId?: string;
//   returnTrackingId?: string;
//   media: ReturnMedia;
//   pickupAddress?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface ReturnState {
//   returns: ReturnRequest[];
//   currentReturn: ReturnRequest | null;
//   loading: boolean;
//   error: string | null;
//   totalCount: number;
// }

// const initialState: ReturnState = {
//   returns: [],
//   currentReturn: null,
//   loading: false,
//   error: null,
//   totalCount: 0,
// };

// // ========== ASYNC THUNKS (Same, but no explicit return type needed) ==========
// export const createReturn = createAsyncThunk(
//   "return/create",
//   async (payload: { orderId: string; reason: string; description?: string; media: ReturnMedia; pickupAddress?: string }) => {
//     const response = await api.post("/api/returns", payload);
//     return response.data.return;
//   }
// );

// export const fetchMyReturns = createAsyncThunk(
//   "return/fetchMy",
//   async () => {
//     const response = await api.get("/api/returns/my");
//     return response.data;
//   }
// );

// export const fetchAllReturns = createAsyncThunk(
//   "return/fetchAll",
//   async ({ page = 1, limit = 10, status = "" }: { page?: number; limit?: number; status?: string }) => {
//     const params = new URLSearchParams();
//     params.append("page", String(page));
//     params.append("limit", String(limit));
//     if (status) params.append("status", status);
//     const response = await api.get(`/api/returns/admin?${params.toString()}`);
//     return {
//       returns: response.data?.returns || [],
//       total: response.data?.total || 0,
//     };
//   }
// );

// export const fetchReturnById = createAsyncThunk(
//   "return/fetchById",
//   async (returnId: string) => {
//     const response = await api.get(`/api/returns/${returnId}`);
//     return response.data;
//   }
// );

// export const approveReturn = createAsyncThunk(
//   "return/approve",
//   async ({ returnId, adminNote }: { returnId: string; adminNote?: string }) => {
//     const response = await api.patch(`/api/returns/admin/${returnId}/approve`, { adminNote });
//     return response.data.return;
//   }
// );

// export const rejectReturn = createAsyncThunk(
//   "return/reject",
//   async ({ returnId, adminNote }: { returnId: string; adminNote?: string }) => {
//     const response = await api.patch(`/api/returns/admin/${returnId}/reject`, { adminNote });
//     return response.data.return;
//   }
// );

// export const markRefunded = createAsyncThunk(
//   "return/markRefunded",
//   async (returnId: string) => {
//     const response = await api.patch(`/api/returns/admin/${returnId}/refunded`);
//     return response.data.return;
//   }
// );

// export const updatePickupStatus = createAsyncThunk(
//   "return/updateStatus",
//   async ({ returnId, status, scheduledPickup }: { returnId: string; status: string; scheduledPickup?: string }) => {
//     const response = await api.patch(`/api/returns/${returnId}/status`, { status, scheduledPickup });
//     return response.data.return;
//   }
// );

// // ========== SLICE (No explicit PayloadAction types) ==========
// const returnSlice = createSlice({
//   name: "return",
//   initialState,
//   reducers: {
//     clearReturnError: (state) => {
//       state.error = null;
//     },
//     resetReturnState: () => initialState,
//     setCurrentReturn: (state, action) => {
//       state.currentReturn = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createReturn.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createReturn.fulfilled, (state, action) => {
//         state.loading = false;
//         state.returns.unshift(action.payload);
//         state.currentReturn = action.payload;
//       })
//       .addCase(createReturn.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to create return";
//       })

//       .addCase(fetchMyReturns.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMyReturns.fulfilled, (state, action) => {
//         state.loading = false;
//         state.returns = action.payload;
//       })
//       .addCase(fetchMyReturns.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to fetch returns";
//       })

//       .addCase(fetchAllReturns.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllReturns.fulfilled, (state, action) => {
//         state.loading = false;
//         state.returns = action.payload.returns;
//         state.totalCount = action.payload.total;
//       })
//       .addCase(fetchAllReturns.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to fetch all returns";
//       })

//       .addCase(fetchReturnById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchReturnById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentReturn = action.payload;
//       })
//       .addCase(fetchReturnById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to fetch return details";
//       })

//       .addCase(approveReturn.fulfilled, (state, action) => {
//         const index = state.returns.findIndex((r) => r._id === action.payload._id);
//         if (index !== -1) state.returns[index] = action.payload;
//         if (state.currentReturn?._id === action.payload._id) state.currentReturn = action.payload;
//       })

//       .addCase(rejectReturn.fulfilled, (state, action) => {
//         const index = state.returns.findIndex((r) => r._id === action.payload._id);
//         if (index !== -1) state.returns[index] = action.payload;
//         if (state.currentReturn?._id === action.payload._id) state.currentReturn = action.payload;
//       })

//       .addCase(markRefunded.fulfilled, (state, action) => {
//         const index = state.returns.findIndex((r) => r._id === action.payload._id);
//         if (index !== -1) state.returns[index] = action.payload;
//         if (state.currentReturn?._id === action.payload._id) state.currentReturn = action.payload;
//       })

//       .addCase(updatePickupStatus.fulfilled, (state, action) => {
//         const index = state.returns.findIndex((r) => r._id === action.payload._id);
//         if (index !== -1) state.returns[index] = action.payload;
//         if (state.currentReturn?._id === action.payload._id) state.currentReturn = action.payload;
//       });
//   },
// });

// export const { clearReturnError, resetReturnState, setCurrentReturn } = returnSlice.actions;
// export default returnSlice.reducer;








import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

export interface ReturnMedia {
  images: string[];
  videos: string[];
  audio: string | null;
}

export interface ReturnRequest {
  _id: string;
  order: string;
  user: string;
  seller: string;
  reason: string;
  description?: string;
  status:
    | "requested"
    | "admin_approved"
    | "assigned_to_delivery"
    | "pickup_scheduled"
    | "received"
    | "refunded"
    | "rejected";
  refundAmount: number;
  refundStatus: "pending" | "processed";
  adminNote?: string;
  returnShipmentId?: string;
  returnTrackingId?: string;
  media: ReturnMedia;
  pickupAddress?: string;
  createdAt: string;
  updatedAt: string;
}

interface ReturnState {
  returns: ReturnRequest[];
  currentReturn: ReturnRequest | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
}

const initialState: ReturnState = {
  returns: [],
  currentReturn: null,
  loading: false,
  error: null,
  totalCount: 0,
};

export const createReturn = createAsyncThunk(
  "return/create",
  async (payload: { orderId: string; reason: string; description?: string; media: ReturnMedia; pickupAddress?: string }) => {
    const response = await api.post("/api/returns", payload);
    return response.data.return;
  }
);

export const fetchMyReturns = createAsyncThunk(
  "return/fetchMy",
  async () => {
    const response = await api.get("/api/returns/my");
    return response.data;
  }
);

// ✅ FIXED: Handles array response from backend
export const fetchAllReturns = createAsyncThunk(
  "return/fetchAll",
  async ({ page = 1, limit = 10, status = "" }: { page?: number; limit?: number; status?: string }) => {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(limit));
    if (status) params.append("status", status);
    const response = await api.get(`/api/returns/admin?${params.toString()}`);
    
    if (Array.isArray(response.data)) {
      return {
        returns: response.data,
        total: response.data.length,
      };
    }
    return {
      returns: response.data?.returns || [],
      total: response.data?.total || 0,
    };
  }
);

export const fetchReturnById = createAsyncThunk(
  "return/fetchById",
  async (returnId: string) => {
    const response = await api.get(`/api/returns/${returnId}`);
    return response.data;
  }
);

export const approveReturn = createAsyncThunk(
  "return/approve",
  async ({ returnId, adminNote }: { returnId: string; adminNote?: string }) => {
    const response = await api.patch(`/api/returns/admin/${returnId}/approve`, { adminNote });
    return response.data.return;
  }
);

export const rejectReturn = createAsyncThunk(
  "return/reject",
  async ({ returnId, adminNote }: { returnId: string; adminNote?: string }) => {
    const response = await api.patch(`/api/returns/admin/${returnId}/reject`, { adminNote });
    return response.data.return;
  }
);

export const markRefunded = createAsyncThunk(
  "return/markRefunded",
  async (returnId: string) => {
    const response = await api.patch(`/api/returns/admin/${returnId}/refunded`);
    return response.data.return;
  }
);

export const updatePickupStatus = createAsyncThunk(
  "return/updateStatus",
  async ({ returnId, status, scheduledPickup }: { returnId: string; status: string; scheduledPickup?: string }) => {
    const response = await api.patch(`/api/returns/${returnId}/status`, { status, scheduledPickup });
    return response.data.return;
  }
);

const returnSlice = createSlice({
  name: "return",
  initialState,
  reducers: {
    clearReturnError: (state) => {
      state.error = null;
    },
    resetReturnState: () => initialState,
    setCurrentReturn: (state, action) => {
      state.currentReturn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReturn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReturn.fulfilled, (state, action) => {
        state.loading = false;
        state.returns.unshift(action.payload);
        state.currentReturn = action.payload;
      })
      .addCase(createReturn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create return";
      })
      .addCase(fetchMyReturns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyReturns.fulfilled, (state, action) => {
        state.loading = false;
        state.returns = action.payload;
      })
      .addCase(fetchMyReturns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch returns";
      })
      .addCase(fetchAllReturns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllReturns.fulfilled, (state, action) => {
        state.loading = false;
        state.returns = action.payload.returns;
        state.totalCount = action.payload.total;
      })
      .addCase(fetchAllReturns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch all returns";
      })
      .addCase(fetchReturnById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReturnById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReturn = action.payload;
      })
      .addCase(fetchReturnById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch return details";
      })
      .addCase(approveReturn.fulfilled, (state, action) => {
        const index = state.returns.findIndex((r) => r._id === action.payload._id);
        if (index !== -1) state.returns[index] = action.payload;
        if (state.currentReturn?._id === action.payload._id) state.currentReturn = action.payload;
      })
      .addCase(rejectReturn.fulfilled, (state, action) => {
        const index = state.returns.findIndex((r) => r._id === action.payload._id);
        if (index !== -1) state.returns[index] = action.payload;
        if (state.currentReturn?._id === action.payload._id) state.currentReturn = action.payload;
      })
      .addCase(markRefunded.fulfilled, (state, action) => {
        const index = state.returns.findIndex((r) => r._id === action.payload._id);
        if (index !== -1) state.returns[index] = action.payload;
        if (state.currentReturn?._id === action.payload._id) state.currentReturn = action.payload;
      })
      .addCase(updatePickupStatus.fulfilled, (state, action) => {
        const index = state.returns.findIndex((r) => r._id === action.payload._id);
        if (index !== -1) state.returns[index] = action.payload;
        if (state.currentReturn?._id === action.payload._id) state.currentReturn = action.payload;
      });
  },
});

export const { clearReturnError, resetReturnState, setCurrentReturn } = returnSlice.actions;
export default returnSlice.reducer;