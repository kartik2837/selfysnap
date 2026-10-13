// import {
//   createSlice,
//   createAsyncThunk,
//   type PayloadAction,
// } from "@reduxjs/toolkit";
// import { api } from "../../Config/Api";
// import { type HomeSection } from "../../types/homeSectionType";

// const DEPLOYED_URL = "/api/admin/home-sections";

// // ---------- State Type ----------
// interface HomeSectionState {
//   sections: HomeSection[];
//   loading: boolean;
//   error: string | null;
//   sectionCreated: boolean;
//   sectionUpdated: boolean;
// }

// // ---------- Initial State ----------
// const initialState: HomeSectionState = {
//   sections: [],
//   loading: false,
//   error: null,
//   sectionCreated: false,
//   sectionUpdated: false,
// };

// // ---------- Async Thunks ----------

// // CREATE
// export const createHomeSection = createAsyncThunk<
//   HomeSection,
//   { section: Partial<HomeSection>; jwt: string },
//   { rejectValue: string }
// >("homeSection/create", async ({ section, jwt }, { rejectWithValue }) => {
//   try {
//     const payload = {
//       title: section.title,
//       category: section.category,
//       tag: section.tag,
//       layout: section.layout,
//       limit: section.limit,
//       order: section.order,
//       isActive: section.isActive,
//     };

//     const res = await api.post(`${DEPLOYED_URL}/`, payload, {
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//         "Content-Type": "application/json",
//       },
//     });

//     return res.data;
//   } catch (error: any) {
//     return rejectWithValue(
//       error.response?.data?.message || "Failed to create home section"
//     );
//   }
// });

// // FETCH ALL
// export const fetchHomeSections = createAsyncThunk<
//   HomeSection[],
//   string,
//   { rejectValue: string }
// >("homeSection/fetchAll", async (jwt, { rejectWithValue }) => {
//   try {
//     const res = await api.get(`${DEPLOYED_URL}/`, {
//       headers: { Authorization: `Bearer ${jwt}` },
//     });
//     return res.data;
//   } catch (error: any) {
//     return rejectWithValue(
//       error.response?.data || "Failed to fetch home sections"
//     );
//   }
// });

// // UPDATE
// export const updateHomeSection = createAsyncThunk<
//   HomeSection,
//   { sectionId: string; data: Partial<HomeSection>; jwt: string },
//   { rejectValue: string }
// >(
//   "homeSection/update",
//   async ({ sectionId, data, jwt }, { rejectWithValue }) => {
//     try {
//       const res = await api.put(`${DEPLOYED_URL}/${sectionId}`, data, {
//         headers: { Authorization: `Bearer ${jwt}` },
//       });
//       return res.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data || "Failed to update home section"
//       );
//     }
//   }
// );

// // DELETE
// export const deleteHomeSection = createAsyncThunk<
//   string,
//   { id: string; jwt: string },
//   { rejectValue: string }
// >("homeSection/delete", async ({ id, jwt }, { rejectWithValue }) => {
//   try {
//     await api.delete(`${DEPLOYED_URL}/${id}`, {
//       headers: { Authorization: `Bearer ${jwt}` },
//     });
//     return id;
//   } catch (error: any) {
//     return rejectWithValue(
//       error.response?.data || "Failed to delete home section"
//     );
//   }
// });

// // ---------- Slice ----------
// const homeSectionSlice = createSlice({
//   name: "homeSection",
//   initialState,
//   reducers: {
//     resetHomeSectionState: (state) => {
//       state.sectionCreated = false;
//       state.sectionUpdated = false;
//       state.error = null;
//     },

//     // ✅ UI-only reorder (Drag & Drop)
//     reorderSections: (state, action: PayloadAction<HomeSection[]>) => {
//       state.sections = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // CREATE
//       .addCase(createHomeSection.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.sectionCreated = false;
//       })
//       .addCase(
//         createHomeSection.fulfilled,
//         (state, action: PayloadAction<HomeSection>) => {
//           state.loading = false;
//           state.sections.push(action.payload);
//           state.sectionCreated = true;
//         }
//       )
//       .addCase(
//         createHomeSection.rejected,
//         (state, action: PayloadAction<string | undefined>) => {
//           state.loading = false;
//           state.error = action.payload || "Create failed";
//         }
//       )

//       // FETCH
//       .addCase(fetchHomeSections.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchHomeSections.fulfilled,
//         (state, action: PayloadAction<HomeSection[]>) => {
//           state.loading = false;
//           state.sections = action.payload;
//         }
//       )
//       .addCase(
//         fetchHomeSections.rejected,
//         (state, action: PayloadAction<string | undefined>) => {
//           state.loading = false;
//           state.error = action.payload || "Fetch failed";
//         }
//       )

//       // UPDATE
//       .addCase(updateHomeSection.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.sectionUpdated = false;
//       })
//       .addCase(
//         updateHomeSection.fulfilled,
//         (state, action: PayloadAction<HomeSection>) => {
//           state.loading = false;
//           const index = state.sections.findIndex(
//             (s) => s._id === action.payload._id
//           );
//           if (index !== -1) state.sections[index] = action.payload;
//           state.sectionUpdated = true;
//         }
//       )
//       .addCase(
//         updateHomeSection.rejected,
//         (state, action: PayloadAction<string | undefined>) => {
//           state.loading = false;
//           state.error = action.payload || "Update failed";
//         }
//       )

//       // DELETE
//       .addCase(deleteHomeSection.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteHomeSection.fulfilled, (state, action) => {
//         state.loading = false;
//         state.sections = state.sections.filter(
//           (s) => s._id !== action.payload
//         );
//       })
//       .addCase(
//         deleteHomeSection.rejected,
//         (state, action: PayloadAction<string | undefined>) => {
//           state.loading = false;
//           state.error = action.payload || "Delete failed";
//         }
//       );
//   },
// });

// // ---------- Exports ----------
// export const {
//   resetHomeSectionState,
//   reorderSections, // ✅ NOW AVAILABLE
// } = homeSectionSlice.actions;

// export default homeSectionSlice.reducer;










// src/Redux Toolkit/Admin/HomeSectionSlice.ts

import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { api } from "../../Config/Api";
import { type HomeSection } from "../../types/homeSectionType";

const DEPLOYED_URL = "/api/admin/home-sections";

// ---------- State Type ----------
interface HomeSectionState {
  sections: HomeSection[];
  loading: boolean;
  error: string | null;
  sectionCreated: boolean;
  sectionUpdated: boolean;
}

// ---------- Initial State ----------
const initialState: HomeSectionState = {
  sections: [],
  loading: false,
  error: null,
  sectionCreated: false,
  sectionUpdated: false,
};

// ═══════════════════════════════════════════════════
// CREATE HOME SECTION
// ═══════════════════════════════════════════════════
export const createHomeSection = createAsyncThunk<
  HomeSection,
  { section: Partial<HomeSection>; jwt?: string },
  { rejectValue: string }
>("homeSection/create", async ({ section, jwt }, { rejectWithValue }) => {
  try {
    const payload = {
      title: section.title,
      category: section.category,
      tag: section.tag,
      layout: section.layout || "amazon",
      cardStyle: section.cardStyle || "compact",
      bgColor: section.bgColor || "#ffffff",
      accentColor: section.accentColor || "#4f46e5",
      showSeeMore: section.showSeeMore !== false,
      limit: section.limit || 12,
      order: section.order || 1,
      isActive: section.isActive !== false,
    };

    const token = jwt || localStorage.getItem("jwt") || "";

    const res = await api.post(`${DEPLOYED_URL}/`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data as HomeSection;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to create home section"
    );
  }
});

// ═══════════════════════════════════════════════════
// FETCH ALL SECTIONS
// ═══════════════════════════════════════════════════
export const fetchHomeSections = createAsyncThunk<
  HomeSection[],
  string | undefined,
  { rejectValue: string }
>("homeSection/fetchAll", async (jwt, { rejectWithValue }) => {
  try {
    const token = jwt || localStorage.getItem("jwt") || "";

    const res = await api.get(`${DEPLOYED_URL}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data as HomeSection[];
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ||
        error.response?.data ||
        "Failed to fetch home sections"
    );
  }
});

// ═══════════════════════════════════════════════════
// UPDATE HOME SECTION (✅ PUT Method)
// ═══════════════════════════════════════════════════
export const updateHomeSection = createAsyncThunk<
  HomeSection,
  { sectionId: string; data: Partial<HomeSection>; jwt?: string },
  { rejectValue: string }
>(
  "homeSection/update",
  async ({ sectionId, data, jwt }, { rejectWithValue }) => {
    try {
      const payload: any = {};

      if (data.title !== undefined) payload.title = data.title;
      if (data.category !== undefined) payload.category = data.category;
      if (data.tag !== undefined) payload.tag = data.tag;
      if (data.layout !== undefined) payload.layout = data.layout;
      if (data.cardStyle !== undefined) payload.cardStyle = data.cardStyle;
      if (data.bgColor !== undefined) payload.bgColor = data.bgColor;
      if (data.accentColor !== undefined)
        payload.accentColor = data.accentColor;
      if (data.showSeeMore !== undefined)
        payload.showSeeMore = data.showSeeMore;
      if (data.limit !== undefined) payload.limit = Number(data.limit);
      if (data.order !== undefined) payload.order = Number(data.order);
      if (data.isActive !== undefined) payload.isActive = data.isActive;

      const token = jwt || localStorage.getItem("jwt") || "";

      // ✅ PUT Method (Backend के हिसाब से)
      const res = await api.put(
        `${DEPLOYED_URL}/${sectionId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data as HomeSection;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to update home section"
      );
    }
  }
);

// ═══════════════════════════════════════════════════
// DELETE HOME SECTION
// ═══════════════════════════════════════════════════
export const deleteHomeSection = createAsyncThunk<
  string,
  { id: string; jwt?: string },
  { rejectValue: string }
>("homeSection/delete", async ({ id, jwt }, { rejectWithValue }) => {
  try {
    const token = jwt || localStorage.getItem("jwt") || "";

    await api.delete(`${DEPLOYED_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ||
        error.response?.data ||
        "Failed to delete home section"
    );
  }
});

// ---------- Slice ----------
const homeSectionSlice = createSlice({
  name: "homeSection",
  initialState,
  reducers: {
    resetHomeSectionState: (state) => {
      state.sectionCreated = false;
      state.sectionUpdated = false;
      state.error = null;
    },

    reorderSections: (state, action: PayloadAction<HomeSection[]>) => {
      state.sections = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ═══ CREATE ═══
      .addCase(createHomeSection.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.sectionCreated = false;
      })
      .addCase(
        createHomeSection.fulfilled,
        (state, action: PayloadAction<HomeSection>) => {
          state.loading = false;
          state.sections.push(action.payload);
          state.sectionCreated = true;
        }
      )
      .addCase(
        createHomeSection.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Create failed";
        }
      )

      // ═══ FETCH ═══
      .addCase(fetchHomeSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchHomeSections.fulfilled,
        (state, action: PayloadAction<HomeSection[]>) => {
          state.loading = false;
          state.sections = action.payload;
        }
      )
      .addCase(
        fetchHomeSections.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Fetch failed";
        }
      )

      // ═══ UPDATE ═══
      .addCase(updateHomeSection.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.sectionUpdated = false;
      })
      .addCase(
        updateHomeSection.fulfilled,
        (state, action: PayloadAction<HomeSection>) => {
          state.loading = false;
          const index = state.sections.findIndex(
            (s) => s._id === action.payload._id
          );
          if (index !== -1) state.sections[index] = action.payload;
          state.sectionUpdated = true;
        }
      )
      .addCase(
        updateHomeSection.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Update failed";
        }
      )

      // ═══ DELETE ═══
      .addCase(deleteHomeSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHomeSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = state.sections.filter(
          (s) => s._id !== action.payload
        );
      })
      .addCase(
        deleteHomeSection.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Delete failed";
        }
      );
  },
});

// ---------- Exports ----------
export const {
  resetHomeSectionState,
  reorderSections,
} = homeSectionSlice.actions;

export default homeSectionSlice.reducer;