// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { api } from "../../Config/Api";

// export interface SupportCall {
//   _id: string;
//   seller: any;
//   sellerName: string;
//   sellerMobile: string;
//   subject: string;
//   description?: string;
//   priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
//   category: string;
//   status: "PENDING" | "ACKNOWLEDGED" | "CALLING" | "RESOLVED" | "MISSED";
//   handledBy?: { name: string; email: string };
//   handledAt?: string;
//   resolutionNote?: string;
//   createdAt: string;
//   timeline: { status: string; note: string; at: string }[];
// }

// interface State {
//   myCalls: SupportCall[];
//   allCalls: SupportCall[];
//   stats: any;
//   loading: boolean;
//   error: string | null;
//   success: string | null;
// }

// const initialState: State = {
//   myCalls: [],
//   allCalls: [],
//   stats: null,
//   loading: false,
//   error: null,
//   success: null,
// };

// const authHeader = () => ({
//   headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
// });

// /* SELLER */
// export const createSupportCall = createAsyncThunk<
//   SupportCall,
//   { subject: string; description?: string; priority?: string; category?: string },
//   { rejectValue: string }
// >("supportCall/create", async (payload, { rejectWithValue }) => {
//   try {
//     const { data } = await api.post(
//       "/api/support-calls/seller/request",
//       payload,
//       authHeader()
//     );
//     return data.call;
//   } catch (e: any) {
//     return rejectWithValue(e.response?.data?.message || "Failed");
//   }
// });

// export const fetchMySupportCalls = createAsyncThunk<SupportCall[], void, { rejectValue: string }>(
//   "supportCall/my",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await api.get("/api/support-calls/seller/my-requests", authHeader());
//       return data;
//     } catch (e: any) {
//       return rejectWithValue(e.response?.data?.message || "Failed");
//     }
//   }
// );

// /* ADMIN */
// export const fetchAllSupportCalls = createAsyncThunk<
//   SupportCall[],
//   string | undefined,
//   { rejectValue: string }
// >("supportCall/all", async (status, { rejectWithValue }) => {
//   try {
//     const url = status
//       ? `/api/support-calls/admin/all?status=${status}`
//       : "/api/support-calls/admin/all";
//     const { data } = await api.get(url, authHeader());
//     return data;
//   } catch (e: any) {
//     return rejectWithValue(e.response?.data?.message || "Failed");
//   }
// });

// export const fetchSupportCallStats = createAsyncThunk<any, void, { rejectValue: string }>(
//   "supportCall/stats",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await api.get("/api/support-calls/admin/stats", authHeader());
//       return data;
//     } catch (e: any) {
//       return rejectWithValue(e.response?.data?.message || "Failed");
//     }
//   }
// );

// export const acknowledgeCall = createAsyncThunk<SupportCall, string, { rejectValue: string }>(
//   "supportCall/acknowledge",
//   async (id, { rejectWithValue }) => {
//     try {
//       const { data } = await api.patch(
//         `/api/support-calls/admin/${id}/acknowledge`,
//         {},
//         authHeader()
//       );
//       return data.call;
//     } catch (e: any) {
//       return rejectWithValue(e.response?.data?.message || "Failed");
//     }
//   }
// );

// export const startCallAction = createAsyncThunk<SupportCall, string, { rejectValue: string }>(
//   "supportCall/start",
//   async (id, { rejectWithValue }) => {
//     try {
//       const { data } = await api.patch(
//         `/api/support-calls/admin/${id}/call`,
//         {},
//         authHeader()
//       );
//       return data.call;
//     } catch (e: any) {
//       return rejectWithValue(e.response?.data?.message || "Failed");
//     }
//   }
// );

// export const resolveCall = createAsyncThunk<
//   SupportCall,
//   { id: string; note?: string },
//   { rejectValue: string }
// >("supportCall/resolve", async ({ id, note }, { rejectWithValue }) => {
//   try {
//     const { data } = await api.patch(
//       `/api/support-calls/admin/${id}/resolve`,
//       { note },
//       authHeader()
//     );
//     return data.call;
//   } catch (e: any) {
//     return rejectWithValue(e.response?.data?.message || "Failed");
//   }
// });

// export const markMissed = createAsyncThunk<
//   SupportCall,
//   { id: string; note?: string },
//   { rejectValue: string }
// >("supportCall/missed", async ({ id, note }, { rejectWithValue }) => {
//   try {
//     const { data } = await api.patch(
//       `/api/support-calls/admin/${id}/missed`,
//       { note },
//       authHeader()
//     );
//     return data.call;
//   } catch (e: any) {
//     return rejectWithValue(e.response?.data?.message || "Failed");
//   }
// });

// const upsert = (state: State, call: SupportCall) => {
//   const i = state.myCalls.findIndex((c) => c._id === call._id);
//   if (i >= 0) state.myCalls[i] = call;
//   const j = state.allCalls.findIndex((c) => c._id === call._id);
//   if (j >= 0) state.allCalls[j] = call;
// };

// const supportCallSlice = createSlice({
//   name: "supportCall",
//   initialState,
//   reducers: {
//     clearStatus: (s) => {
//       s.error = null;
//       s.success = null;
//     },
//     addLiveCall: (state, action) => {
//       const call = action.payload;
//       const exists = state.allCalls.find((c) => c._id === call._id);
//       if (!exists) state.allCalls.unshift(call);
//     },
//   },
//   extraReducers: (b) => {
//     b.addCase(createSupportCall.pending, (s) => {
//       s.loading = true;
//       s.error = null;
//     })
//       .addCase(createSupportCall.fulfilled, (s, a) => {
//         s.loading = false;
//         s.success = "Support call requested!";
//         s.myCalls.unshift(a.payload);
//       })
//       .addCase(createSupportCall.rejected, (s, a) => {
//         s.loading = false;
//         s.error = a.payload as string;
//       })
//       .addCase(fetchMySupportCalls.fulfilled, (s, a) => {
//         s.myCalls = a.payload;
//       })
//       .addCase(fetchAllSupportCalls.fulfilled, (s, a) => {
//         s.allCalls = a.payload;
//       })
//       .addCase(fetchSupportCallStats.fulfilled, (s, a) => {
//         s.stats = a.payload;
//       })
//       .addCase(acknowledgeCall.fulfilled, upsert)
//       .addCase(startCallAction.fulfilled, upsert)
//       .addCase(resolveCall.fulfilled, upsert)
//       .addCase(markMissed.fulfilled, upsert);
//   },
// });

// export const { clearStatus, addLiveCall } = supportCallSlice.actions;
// export default supportCallSlice.reducer;






import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

/* ═══════════════ TYPES ═══════════════ */
export interface SupportCall {
  _id: string;
  seller: any;
  sellerName: string;
  sellerMobile: string;
  subject: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  category: string;
  status: "PENDING" | "ACKNOWLEDGED" | "CALLING" | "RESOLVED" | "MISSED";
  handledBy?: { name: string; email: string };
  handledAt?: string;
  resolutionNote?: string;
  createdAt: string;
  timeline: { status: string; note: string; at: string }[];
}

interface State {
  myCalls: SupportCall[];
  allCalls: SupportCall[];
  stats: any;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: State = {
  myCalls: [],
  allCalls: [],
  stats: null,
  loading: false,
  error: null,
  success: null,
};

/* ═══════════════ AUTH HEADER ═══════════════ */
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
  },
});

/* ═══════════════ SELLER THUNKS ═══════════════ */
export const createSupportCall = createAsyncThunk<
  SupportCall,
  {
    subject: string;
    description?: string;
    priority?: string;
    category?: string;
  },
  { rejectValue: string }
>("supportCall/create", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post(
      "/api/support-calls/seller/request",
      payload,
      authHeader()
    );
    return data.call as SupportCall;
  } catch (e: any) {
    return rejectWithValue(
      e?.response?.data?.message || "Failed to create call"
    );
  }
});

export const fetchMySupportCalls = createAsyncThunk<
  SupportCall[],
  void,
  { rejectValue: string }
>("supportCall/my", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get(
      "/api/support-calls/seller/my-requests",
      authHeader()
    );
    return data as SupportCall[];
  } catch (e: any) {
    return rejectWithValue(
      e?.response?.data?.message || "Failed to fetch calls"
    );
  }
});

/* ═══════════════ ADMIN THUNKS ═══════════════ */
export const fetchAllSupportCalls = createAsyncThunk<
  SupportCall[],
  string | undefined,
  { rejectValue: string }
>("supportCall/all", async (status, { rejectWithValue }) => {
  try {
    const url = status
      ? `/api/support-calls/admin/all?status=${status}`
      : "/api/support-calls/admin/all";
    const { data } = await api.get(url, authHeader());
    return data as SupportCall[];
  } catch (e: any) {
    return rejectWithValue(
      e?.response?.data?.message || "Failed to fetch all calls"
    );
  }
});

export const fetchSupportCallStats = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("supportCall/stats", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get(
      "/api/support-calls/admin/stats",
      authHeader()
    );
    return data;
  } catch (e: any) {
    return rejectWithValue(
      e?.response?.data?.message || "Failed to fetch stats"
    );
  }
});

export const acknowledgeCall = createAsyncThunk<
  SupportCall,
  string,
  { rejectValue: string }
>("supportCall/acknowledge", async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(
      `/api/support-calls/admin/${id}/acknowledge`,
      {},
      authHeader()
    );
    return data.call as SupportCall;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || "Failed");
  }
});

export const startCallAction = createAsyncThunk<
  SupportCall,
  string,
  { rejectValue: string }
>("supportCall/start", async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(
      `/api/support-calls/admin/${id}/call`,
      {},
      authHeader()
    );
    return data.call as SupportCall;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || "Failed");
  }
});

export const resolveCall = createAsyncThunk<
  SupportCall,
  { id: string; note?: string },
  { rejectValue: string }
>("supportCall/resolve", async ({ id, note }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(
      `/api/support-calls/admin/${id}/resolve`,
      { note },
      authHeader()
    );
    return data.call as SupportCall;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || "Failed");
  }
});

export const markMissed = createAsyncThunk<
  SupportCall,
  { id: string; note?: string },
  { rejectValue: string }
>("supportCall/missed", async ({ id, note }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(
      `/api/support-calls/admin/${id}/missed`,
      { note },
      authHeader()
    );
    return data.call as SupportCall;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || "Failed");
  }
});

/* ═══════════════ HELPER ═══════════════ */
const upsert = (state: any, call: SupportCall) => {
  const i = state.myCalls.findIndex((c: SupportCall) => c._id === call._id);
  if (i >= 0) state.myCalls[i] = call;

  const j = state.allCalls.findIndex((c: SupportCall) => c._id === call._id);
  if (j >= 0) state.allCalls[j] = call;
};

/* ═══════════════ SLICE ═══════════════ */
const supportCallSlice = createSlice({
  name: "supportCall",
  initialState,
  reducers: {
    clearStatus: (s) => {
      s.error = null;
      s.success = null;
    },
    addLiveCall: (state, action: PayloadAction<SupportCall>) => {
      const call = action.payload;
      const exists = state.allCalls.find((c) => c._id === call._id);
      if (!exists) state.allCalls.unshift(call);
    },
  },
  extraReducers: (builder) => {
    builder
      /* CREATE */
      .addCase(createSupportCall.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.success = null;
      })
      .addCase(createSupportCall.fulfilled, (s, a) => {
        s.loading = false;
        s.success = "Support call requested!";
        s.myCalls.unshift(a.payload);
      })
      .addCase(createSupportCall.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      /* FETCH MY */
      .addCase(fetchMySupportCalls.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchMySupportCalls.fulfilled, (s, a) => {
        s.loading = false;
        s.myCalls = a.payload;
      })
      .addCase(fetchMySupportCalls.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      /* FETCH ALL */
      .addCase(fetchAllSupportCalls.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchAllSupportCalls.fulfilled, (s, a) => {
        s.loading = false;
        s.allCalls = a.payload;
      })
      .addCase(fetchAllSupportCalls.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      /* STATS */
      .addCase(fetchSupportCallStats.fulfilled, (s, a) => {
        s.stats = a.payload;
      })

      /* UPSERT ACTIONS */
      .addCase(acknowledgeCall.fulfilled, (s, a) => upsert(s, a.payload))
      .addCase(startCallAction.fulfilled, (s, a) => upsert(s, a.payload))
      .addCase(resolveCall.fulfilled, (s, a) => upsert(s, a.payload))
      .addCase(markMissed.fulfilled, (s, a) => upsert(s, a.payload));
  },
});

export const { clearStatus, addLiveCall } = supportCallSlice.actions;
export default supportCallSlice.reducer;