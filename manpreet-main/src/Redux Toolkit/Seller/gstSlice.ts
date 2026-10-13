// // src/Redux Toolkit/Seller/gstSlice.ts

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { api } from "../../Config/Api";

// // ─── Async Thunks ────────────────────────────────────
// export const fetchGSTReport = createAsyncThunk(
//   "gst/fetchGSTReport",
//   async (
//     {
//       startDate,
//       endDate,
//       type,
//     }: { startDate: string; endDate: string; type?: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const res = await api.get("/api/gst/report", {
//         params: { startDate, endDate, type },
//       });
//       return res.data.data;
//     } catch (error: any) {
//       return rejectWithValue(error.message || "GST Report Load नहीं हुई");
//     }
//   }
// );

// export const fetchMonthlyGSTSummary = createAsyncThunk(
//   "gst/fetchMonthlyGSTSummary",
//   async (year: number, { rejectWithValue }) => {
//     try {
//       const res = await api.get("/api/gst/monthly-summary", {
//         params: { year },
//       });
//       return res.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.message || "Monthly Summary Load नहीं हुई"
//       );
//     }
//   }
// );

// // ─── State ────────────────────────────────────────────
// interface GSTState {
//   reportData: any;
//   monthlyData: any[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: GSTState = {
//   reportData: null,
//   monthlyData: [],
//   loading: false,
//   error: null,
// };

// // ─── Slice ────────────────────────────────────────────
// const gstSlice = createSlice({
//   name: "gst",
//   initialState,
//   reducers: {
//     clearGSTReport: () => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchGSTReport.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchGSTReport.fulfilled, (state, action) => {
//         state.loading = false;
//         state.reportData = action.payload;
//       })
//       .addCase(fetchGSTReport.rejected, (state, action) => {
//         state.loading = false;
//         state.error = (action.payload as string) || "Error";
//       })
//       .addCase(fetchMonthlyGSTSummary.fulfilled, (state, action) => {
//         state.monthlyData = action.payload;
//       });
//   },
// });

// export const { clearGSTReport } = gstSlice.actions;
// export default gstSlice.reducer;







// src/Redux Toolkit/Seller/gstSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

export const fetchGSTReport = createAsyncThunk(
  "gst/fetchGSTReport",
  async (
    {
      startDate,
      endDate,
      type,
      sellerId,
    }: {
      startDate: string;
      endDate: string;
      type?: string;
      sellerId?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.get("/api/gst/report", {
        params: { startDate, endDate, type, sellerId },
      });
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "GST Report Load नहीं हुई");
    }
  }
);

export const fetchMonthlyGSTSummary = createAsyncThunk(
  "gst/fetchMonthlyGSTSummary",
  async (
    { year, sellerId }: { year: number; sellerId?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.get("/api/gst/monthly-summary", {
        params: { year, sellerId },
      });
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Monthly Summary Load नहीं हुई");
    }
  }
);

interface GSTState {
  reportData: any;
  monthlyData: any[];
  loading: boolean;
  error: string | null;
}

const initialState: GSTState = {
  reportData: null,
  monthlyData: [],
  loading: false,
  error: null,
};

const gstSlice = createSlice({
  name: "gst",
  initialState,
  reducers: {
    clearGSTReport: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGSTReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGSTReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reportData = action.payload;
      })
      .addCase(fetchGSTReport.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Error";
      })
      .addCase(fetchMonthlyGSTSummary.fulfilled, (state, action) => {
        state.monthlyData = action.payload;
      });
  },
});

export const { clearGSTReport } = gstSlice.actions;
export default gstSlice.reducer;