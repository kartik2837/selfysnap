// // src/Redux Toolkit/Seller/reportSlice.ts

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import {
//     fetchDashboard,
//     fetchSalesReport,
//     fetchInventoryReport,
//     DashboardStats,
//     SalesData,
//     InventoryReportData,
// } from "../../services/reportService";

// // ─── State Interface ─────────────────────────────────────────
// interface ReportState {
//     dashboard: DashboardStats | null;
//     dashboardLoading: boolean;
//     dashboardError: string | null;

//     salesData: SalesData[];
//     salesLoading: boolean;
//     salesError: string | null;

//     inventoryData: InventoryReportData | null;
//     inventoryLoading: boolean;
//     inventoryError: string | null;
// }

// const initialState: ReportState = {
//     dashboard: null,
//     dashboardLoading: false,
//     dashboardError: null,
//     salesData: [],
//     salesLoading: false,
//     salesError: null,
//     inventoryData: null,
//     inventoryLoading: false,
//     inventoryError: null,
// };

// // ─── Async Thunks ────────────────────────────────────────────

// export const getDashboardStats = createAsyncThunk(
//     "report/getDashboardStats",
//     async (_, { rejectWithValue }) => {
//         try {
//             return await fetchDashboard();
//         } catch (error: any) {
//             return rejectWithValue(error.message || "Failed to fetch dashboard");
//         }
//     }
// );

// export const getSalesReportData = createAsyncThunk(
//     "report/getSalesReportData",
//     async ({ startDate, endDate }: { startDate: string; endDate: string }, { rejectWithValue }) => {
//         try {
//             return await fetchSalesReport(startDate, endDate);
//         } catch (error: any) {
//             return rejectWithValue(error.message || "Failed to fetch sales report");
//         }
//     }
// );

// export const getInventoryReportData = createAsyncThunk(
//     "report/getInventoryReportData",
//     async (_, { rejectWithValue }) => {
//         try {
//             return await fetchInventoryReport();
//         } catch (error: any) {
//             return rejectWithValue(error.message || "Failed to fetch inventory report");
//         }
//     }
// );

// // ─── Slice ────────────────────────────────────────────────────
// const reportSlice = createSlice({
//     name: "report",
//     initialState,
//     reducers: {
//         resetReportState: () => initialState,
//     },
//     extraReducers: (builder) => {
//         // Dashboard
//         builder
//             .addCase(getDashboardStats.pending, (state) => {
//                 state.dashboardLoading = true;
//                 state.dashboardError = null;
//             })
//             .addCase(getDashboardStats.fulfilled, (state, action: PayloadAction<DashboardStats>) => {
//                 state.dashboardLoading = false;
//                 state.dashboard = action.payload;
//             })
//             .addCase(getDashboardStats.rejected, (state, action) => {
//                 state.dashboardLoading = false;
//                 state.dashboardError = action.payload as string || "Something went wrong";
//             })
//             // Sales
//             .addCase(getSalesReportData.pending, (state) => {
//                 state.salesLoading = true;
//                 state.salesError = null;
//             })
//             .addCase(getSalesReportData.fulfilled, (state, action: PayloadAction<SalesData[]>) => {
//                 state.salesLoading = false;
//                 state.salesData = action.payload;
//             })
//             .addCase(getSalesReportData.rejected, (state, action) => {
//                 state.salesLoading = false;
//                 state.salesError = action.payload as string || "Failed to load sales";
//             })
//             // Inventory
//             .addCase(getInventoryReportData.pending, (state) => {
//                 state.inventoryLoading = true;
//                 state.inventoryError = null;
//             })
//             .addCase(getInventoryReportData.fulfilled, (state, action: PayloadAction<InventoryReportData>) => {
//                 state.inventoryLoading = false;
//                 state.inventoryData = action.payload;
//             })
//             .addCase(getInventoryReportData.rejected, (state, action) => {
//                 state.inventoryLoading = false;
//                 state.inventoryError = action.payload as string || "Failed to load inventory";
//             });
//     },
// });

// export const { resetReportState } = reportSlice.actions;
// export default reportSlice.reducer;





// src/Redux Toolkit/Seller/report.slice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDashboard,
  fetchSalesReport,
  fetchInventoryReport,
} from "../../services/report.api";

// ─── All Interfaces defined here ─────────────────────────────

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockCount: number;
}

export interface SalesData {
  _id: string;
  totalSales: number;
  orderCount: number;
}

export interface ProductStock {
  _id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  quantity: number;
}

export interface CategorySummary {
  _id: string;
  totalStock: number;
  totalValue: number;
}

export interface InventoryReportData {
  products: ProductStock[];
  categorySummary: CategorySummary;
}

// ─── State Interface ─────────────────────────────────────────

interface ReportState {
  dashboard: DashboardStats | null;
  dashboardLoading: boolean;
  dashboardError: string | null;

  salesData: SalesData[];
  salesLoading: boolean;
  salesError: string | null;

  inventoryData: InventoryReportData | null;
  inventoryLoading: boolean;
  inventoryError: string | null;
}

const initialState: ReportState = {
  dashboard: null,
  dashboardLoading: false,
  dashboardError: null,
  salesData: [],
  salesLoading: false,
  salesError: null,
  inventoryData: null,
  inventoryLoading: false,
  inventoryError: null,
};

// ─── Async Thunks ────────────────────────────────────────────

export const getDashboardStats = createAsyncThunk(
  "report/getDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchDashboard();
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch dashboard");
    }
  }
);

export const getSalesReportData = createAsyncThunk(
  "report/getSalesReportData",
  async (
    { startDate, endDate }: { startDate: string; endDate: string },
    { rejectWithValue }
  ) => {
    try {
      return await fetchSalesReport(startDate, endDate);
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch sales");
    }
  }
);

export const getInventoryReportData = createAsyncThunk(
  "report/getInventoryReportData",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchInventoryReport();
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch inventory");
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    resetReportState: () => initialState,
  },
  extraReducers: (builder) => {
    // Dashboard
    builder
      .addCase(getDashboardStats.pending, (state) => {
        state.dashboardLoading = true;
        state.dashboardError = null;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.dashboard = action.payload as DashboardStats;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.dashboardLoading = false;
        state.dashboardError = (action.payload as string) || "Something went wrong";
      })
      // Sales
      .addCase(getSalesReportData.pending, (state) => {
        state.salesLoading = true;
        state.salesError = null;
      })
      .addCase(getSalesReportData.fulfilled, (state, action) => {
        state.salesLoading = false;
        state.salesData = action.payload as SalesData[];
      })
      .addCase(getSalesReportData.rejected, (state, action) => {
        state.salesLoading = false;
        state.salesError = (action.payload as string) || "Failed to load sales";
      })
      // Inventory
      .addCase(getInventoryReportData.pending, (state) => {
        state.inventoryLoading = true;
        state.inventoryError = null;
      })
      .addCase(getInventoryReportData.fulfilled, (state, action) => {
        state.inventoryLoading = false;
        state.inventoryData = action.payload as InventoryReportData;
      })
      .addCase(getInventoryReportData.rejected, (state, action) => {
        state.inventoryLoading = false;
        state.inventoryError = (action.payload as string) || "Failed to load inventory";
      });
  },
});

export const { resetReportState } = reportSlice.actions;
export default reportSlice.reducer;