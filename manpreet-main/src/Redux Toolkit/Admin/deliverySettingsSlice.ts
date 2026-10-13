import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

// ✅ तुम्हारे project की तरह relative URL
const DEPLOYED_URL = "/api/delivery-settings";

export interface DeliverySettings {
  _id?: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  codFee: number;
  codEnabled: boolean;
  codMaxPrice: number;
  taxPercent: number;
  isActive?: boolean;
}

interface State {
  settings: DeliverySettings | null;
  loading: boolean;
  updating: boolean;
  error: string | null;
  success: boolean;
}

const initialState: State = {
  settings: null,
  loading: false,
  updating: false,
  error: null,
  success: false,
};

/* =========================================
   FETCH (Public – customer checkout ke liye)
   ========================================= */
export const fetchDeliverySettings = createAsyncThunk<
  DeliverySettings,
  void,
  { rejectValue: string }
>("deliverySettings/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(DEPLOYED_URL);
    console.log("✅ Fetched delivery settings:", response.data);
    return response.data.settings as DeliverySettings;
  } catch (error: any) {
    console.error("❌ fetchDeliverySettings error:", error);
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch settings"
    );
  }
});

/* =========================================
   UPDATE (Admin only)
   ========================================= */
export const updateDeliverySettings = createAsyncThunk<
  DeliverySettings,
  Partial<DeliverySettings>,
  { rejectValue: string }
>(
  "deliverySettings/update",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const jwt =
        state.user?.user?.token ||
        state.user?.token ||
        localStorage.getItem("token") ||
        "";

      const response = await api.put(DEPLOYED_URL, payload, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      console.log("✅ Updated delivery settings:", response.data);
      return response.data.settings as DeliverySettings;
    } catch (error: any) {
      console.error("❌ updateDeliverySettings error:", error);
      console.error("❌ Status:", error.response?.status);
      console.error("❌ Response:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update settings"
      );
    }
  }
);

/* =========================================
   SLICE
   ========================================= */
const deliverySettingsSlice = createSlice({
  name: "deliverySettings",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchDeliverySettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDeliverySettings.fulfilled,
        (state, action: PayloadAction<DeliverySettings>) => {
          state.loading = false;
          state.settings = action.payload;
        }
      )
      .addCase(
        fetchDeliverySettings.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch settings";
        }
      )
      /* UPDATE */
      .addCase(updateDeliverySettings.pending, (state) => {
        state.updating = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        updateDeliverySettings.fulfilled,
        (state, action: PayloadAction<DeliverySettings>) => {
          state.updating = false;
          state.settings = action.payload;
          state.success = true;
        }
      )
      .addCase(
        updateDeliverySettings.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.updating = false;
          state.error = action.payload || "Failed to update settings";
        }
      );
  },
});

export const { resetStatus } = deliverySettingsSlice.actions;
export default deliverySettingsSlice.reducer;