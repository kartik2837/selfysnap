// import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
// import { api } from "../../Config/Api";

// export interface Service {
//   _id: string;
//   name: string;
//   slug: string;
//   category: string;
//   icon: string;
//   price: number;
//   deliveryDays: number;
//   description: string;
//   features: string[];
//   isActive: boolean;
//   createdAt: string;
// }

// interface State {
//   services: Service[];
//   loading: boolean;
//   error: string | null;
//   success: string | null;
// }

// const initialState: State = {
//   services: [],
//   loading: false,
//   error: null,
//   success: null,
// };

// const authHeader = () => ({
//   headers: { Authorization: `Bearer ${localStorage.getItem("jwt") || ""}` },
// });

// export const createService = createAsyncThunk<Service, any, { rejectValue: string }>(
//   "service/create",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const { data } = await api.post("/api/services/admin/create", payload, authHeader());
//       return data.service;
//     } catch (e: any) {
//       return rejectWithValue(e.response?.data?.message || "Failed");
//     }
//   }
// );

// export const fetchAllServicesAdmin = createAsyncThunk<Service[], void, { rejectValue: string }>(
//   "service/fetchAllAdmin",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await api.get("/api/services/admin/all", authHeader());
//       return data;
//     } catch (e: any) {
//       return rejectWithValue(e.response?.data?.message || "Failed");
//     }
//   }
// );

// export const fetchActiveServices = createAsyncThunk<Service[], string | undefined, { rejectValue: string }>(
//   "service/fetchActive",
//   async (category, { rejectWithValue }) => {
//     try {
//       const url = category ? `/api/services?category=${category}` : "/api/services";
//       const { data } = await api.get(url);
//       return data;
//     } catch (e: any) {
//       return rejectWithValue(e.response?.data?.message || "Failed");
//     }
//   }
// );

// export const deleteService = createAsyncThunk<Service, string, { rejectValue: string }>(
//   "service/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       const { data } = await api.delete(`/api/services/admin/${id}`, authHeader());
//       return data.service;
//     } catch (e: any) {
//       return rejectWithValue(e.response?.data?.message || "Failed");
//     }
//   }
// );

// export const toggleServiceActive = createAsyncThunk<Service, string, { rejectValue: string }>(
//   "service/toggle",
//   async (id, { rejectWithValue }) => {
//     try {
//       const { data } = await api.patch(`/api/services/admin/${id}/toggle`, {}, authHeader());
//       return data.service;
//     } catch (e: any) {
//       return rejectWithValue(e.response?.data?.message || "Failed");
//     }
//   }
// );

// const serviceSlice = createSlice({
//   name: "service",
//   initialState,
//   reducers: {
//     clearServiceStatus: (s) => {
//       s.error = null;
//       s.success = null;
//     },
//   },
//   extraReducers: (b) => {
//     b.addCase(createService.pending, (s) => {
//       s.loading = true;
//       s.error = null;
//       s.success = null;
//     })
//       .addCase(createService.fulfilled, (s, a) => {
//         s.loading = false;
//         s.success = `"${a.payload.name}" created!`;
//         s.services.unshift(a.payload);
//       })
//       .addCase(createService.rejected, (s, a) => {
//         s.loading = false;
//         s.error = a.payload as string;
//       })

//       .addCase(fetchAllServicesAdmin.pending, (s) => {
//         s.loading = true;
//       })
//       .addCase(fetchAllServicesAdmin.fulfilled, (s, a) => {
//         s.loading = false;
//         s.services = a.payload;
//       })
//       .addCase(fetchAllServicesAdmin.rejected, (s, a) => {
//         s.loading = false;
//         s.error = a.payload as string;
//       })

//       .addCase(fetchActiveServices.fulfilled, (s, a) => {
//         s.services = a.payload;
//       })

//       .addCase(deleteService.fulfilled, (s, a) => {
//         s.services = s.services.map((x) =>
//           x._id === a.payload._id ? a.payload : x
//         );
//         s.success = "Service deactivated";
//       })

//       .addCase(toggleServiceActive.fulfilled, (s, a) => {
//         s.services = s.services.map((x) =>
//           x._id === a.payload._id ? a.payload : x
//         );
//       });
//   },
// });

// export const { clearServiceStatus } = serviceSlice.actions;
// export default serviceSlice.reducer;










import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

export interface Service {
  _id: string;
  name: string;
  slug: string;
  category: string;
  icon: string;
  price: number;
  deliveryDays: number;
  description: string;
  features: string[];
  isActive: boolean;
  createdAt: string;
}

interface State {
  services: Service[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: State = {
  services: [],
  loading: false,
  error: null,
  success: null,
};

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("jwt") || ""}` },
});

/* ---------------- CREATE ---------------- */
export const createService = createAsyncThunk<Service, any, { rejectValue: string }>(
  "service/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/services/admin/create", payload, authHeader());
      return data.service;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Failed");
    }
  }
);

/* ---------------- FETCH ALL (ADMIN) ---------------- */
export const fetchAllServicesAdmin = createAsyncThunk<Service[], void, { rejectValue: string }>(
  "service/fetchAllAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/services/admin/all", authHeader());
      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Failed");
    }
  }
);

/* ---------------- FETCH ACTIVE (USER SIDE) ---------------- */
export const fetchActiveServices = createAsyncThunk<Service[], string | undefined, { rejectValue: string }>(
  "service/fetchActive",
  async (category, { rejectWithValue }) => {
    try {
      const url = category ? `/api/services?category=${category}` : "/api/services";
      const { data } = await api.get(url);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Failed");
    }
  }
);

/* ---------------- UPDATE ---------------- */
export const updateService = createAsyncThunk<
  Service,
  { id: string; payload: Partial<Service> },
  { rejectValue: string }
>(
  "service/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/api/services/admin/${id}`, payload, authHeader());
      return data.service;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Failed");
    }
  }
);

/* ---------------- DELETE ---------------- */
export const deleteService = createAsyncThunk<Service, string, { rejectValue: string }>(
  "service/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/api/services/admin/${id}`, authHeader());
      return data.service;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Failed");
    }
  }
);

/* ---------------- TOGGLE ACTIVE ---------------- */
export const toggleServiceActive = createAsyncThunk<Service, string, { rejectValue: string }>(
  "service/toggle",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/api/services/admin/${id}/toggle`, {}, authHeader());
      return data.service;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Failed");
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    clearServiceStatus: (s) => {
      s.error = null;
      s.success = null;
    },
  },
  extraReducers: (b) => {
    /* ---- CREATE ---- */
    b.addCase(createService.pending, (s) => {
      s.loading = true;
      s.error = null;
      s.success = null;
    })
      .addCase(createService.fulfilled, (s, a) => {
        s.loading = false;
        s.success = `"${a.payload.name}" created!`;
        s.services.unshift(a.payload);
      })
      .addCase(createService.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      /* ---- FETCH ALL ---- */
      .addCase(fetchAllServicesAdmin.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchAllServicesAdmin.fulfilled, (s, a) => {
        s.loading = false;
        s.services = a.payload;
      })
      .addCase(fetchAllServicesAdmin.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      /* ---- FETCH ACTIVE ---- */
      .addCase(fetchActiveServices.fulfilled, (s, a) => {
        s.services = a.payload;
      })

      /* ---- UPDATE ---- */
      .addCase(updateService.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.success = null;
      })
      .addCase(updateService.fulfilled, (s, a) => {
        s.loading = false;
        s.success = `"${a.payload.name}" updated!`;
        s.services = s.services.map((x) => (x._id === a.payload._id ? a.payload : x));
      })
      .addCase(updateService.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      /* ---- DELETE ---- */
      .addCase(deleteService.pending, (s) => {
        s.loading = true;
        s.error = null;
        s.success = null;
      })
      .addCase(deleteService.fulfilled, (s, a) => {
        s.loading = false;
        // असली डिलीट — लिस्ट से हटा दें
        s.services = s.services.filter((x) => x._id !== a.payload._id);
        s.success = `"${a.payload.name}" deleted`;
      })
      .addCase(deleteService.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      /* ---- TOGGLE ---- */
      .addCase(toggleServiceActive.fulfilled, (s, a) => {
        s.services = s.services.map((x) => (x._id === a.payload._id ? a.payload : x));
      });
  },
});

export const { clearServiceStatus } = serviceSlice.actions;
export default serviceSlice.reducer;









