// import { useEffect, useState } from "react";
// import {
//   Box,
//   Paper,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Switch,
//   Button,
//   Typography,
// } from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { createHomeSection } from "../../../Redux Toolkit/Admin/HomeSectionSlice";
// import { fetchCategories } from "../../../Redux Toolkit/Admin/CategorySlice";

// // ================= TYPES =================
// interface Category {
//   _id: string;
//   name: string;
//   categoryId?: string;
// }

// interface HomeSectionFormType {
//   title: string;
//   category: string;
//   tag: "bestseller" | "popular" | "seasonal";
//   layout: "slider" | "grid";
//   limit: number;
//   order: number;
//   isActive: boolean;
// }

// export default function HomeSectionForm() {
//   const dispatch = useAppDispatch();

//   const { categories, loading } = useAppSelector(
//     (state) => state.category
//   ) as { categories: Category[]; loading: boolean };

//   const [form, setForm] = useState<HomeSectionFormType>({
//     title: "",
//     category: "",
//     tag: "bestseller",
//     layout: "slider",
//     limit: 8,
//     order: 1,
//     isActive: true,
//   });

//   useEffect(() => {
//     const jwt = "user-token-here"; // replace with your auth token
//     dispatch(fetchCategories(jwt));
//   }, [dispatch]);

//   const handleSubmit = () => {
//     if (!form.title || !form.category) {
//       alert("Title & Category are required");
//       return;
//     }

//     const jwt = "user-token-here";
//     dispatch(createHomeSection({ section: form, jwt }));

//     // Reset form
//     setForm({
//       title: "",
//       category: "",
//       tag: "bestseller",
//       layout: "slider",
//       limit: 8,
//       order: 1,
//       isActive: true,
//     });
//   };

//   return (
//     <Paper sx={{ p: 4, maxWidth: 500, margin: "auto" }}>
//       <Typography variant="h5" sx={{ mb: 3 }}>
//         Add Home Section
//       </Typography>

//       {/* Title */}
//       <TextField
//         fullWidth
//         label="Title"
//         variant="outlined"
//         sx={{ mb: 2 }}
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//       />

//       {/* Category */}
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <InputLabel>Category</InputLabel>
//         <Select
//           value={form.category}
//           label="Category"
//           onChange={(e) => setForm({ ...form, category: e.target.value })}
//         >
//           <MenuItem value="">
//             <em>Select Category</em>
//           </MenuItem>
//           {categories.map((c) => (
//             <MenuItem key={c._id} value={c._id}>
//               {c.name || c.categoryId}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {/* Tag */}
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <InputLabel>Tag</InputLabel>
//         <Select
//           value={form.tag}
//           label="Tag"
//           onChange={(e) =>
//             setForm({ ...form, tag: e.target.value as HomeSectionFormType["tag"] })
//           }
//         >
//           <MenuItem value="bestseller">Bestseller</MenuItem>
//           <MenuItem value="popular">Popular</MenuItem>
//           <MenuItem value="seasonal">Seasonal</MenuItem>
//         </Select>
//       </FormControl>

//       {/* Layout */}
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <InputLabel>Layout</InputLabel>
//         <Select
//           value={form.layout}
//           label="Layout"
//           onChange={(e) =>
//             setForm({ ...form, layout: e.target.value as HomeSectionFormType["layout"] })
//           }
//         >
//           <MenuItem value="slider">Slider</MenuItem>
//           {/* <MenuItem value="grid">Grid</MenuItem> */}
//         </Select>
//       </FormControl>

//       {/* Order */}
//       <TextField
//         fullWidth
//         type="number"
//         label="Order"
//         variant="outlined"
//         sx={{ mb: 2 }}
//         value={form.order}
//         onChange={(e) =>
//           setForm({ ...form, order: Number(e.target.value) })
//         }
//       />

//       {/* Limit */}
//       <TextField
//         fullWidth
//         type="number"
//         label="Limit"
//         variant="outlined"
//         sx={{ mb: 2 }}
//         value={form.limit}
//         onChange={(e) =>
//           setForm({ ...form, limit: Number(e.target.value) })
//         }
//       />

//       {/* Active Switch */}
//       <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
//         <Typography>Active</Typography>
//         <Switch
//           checked={form.isActive}
//           onChange={(e) =>
//             setForm({ ...form, isActive: e.target.checked })
//           }
//         />
//       </Box>

//       {/* Submit */}
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         disabled={loading}
//         onClick={handleSubmit}
//       >
//         {loading ? "Saving..." : "Save"}
//       </Button>
//     </Paper>
//   );
// }

















// src/admin/pages/HomeSection/HomeSectionForm.tsx

import { useEffect, useState } from "react";
import {
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Switch,
  Button,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  createHomeSection,
  updateHomeSection,
} from "../../../Redux Toolkit/Admin/HomeSectionSlice";
import { fetchCategories } from "../../../Redux Toolkit/Admin/CategorySlice";

// ═══════════════════════════════════════════════════
// 🎨 LAYOUT OPTIONS
// ═══════════════════════════════════════════════════
const LAYOUTS = [
  { value: "amazon",  desc: "Compact Square Cards" },
  { value: "flipkart",  desc: "Big Cards + Offers" },
  { value: "myntra",  desc: "Portrait Cards" },
  { value: "grid", label: "Grid", desc: "Simple Grid" },
];

const ACCENT_COLORS = [
  { value: "#4f46e5", label: "Indigo" },
  { value: "#ec4899", label: "Pink" },
  { value: "#f59e0b", label: "Amber" },
  { value: "#10b981", label: "Emerald" },
  { value: "#ef4444", label: "Red" },
  { value: "#3b82f6", label: "Blue" },
  { value: "#8b5cf6", label: "Violet" },
  { value: "#f97316", label: "Orange" },
];

// ═══════════════════════════════════════════════════
// ✅ FORM TYPE (सभी fields defined)
// ═══════════════════════════════════════════════════
interface FormData {
  title: string;
  category: string;
  tag: string;
  layout: string;
  cardStyle: string;
  bgColor: string;
  accentColor: string;
  limit: number;
  order: number;
  isActive: boolean;
  showSeeMore: boolean;
}

interface HomeSectionFormProps {
  editData?: any;
  onSuccess?: () => void;
}

export default function HomeSectionForm({
  editData,
  onSuccess,
}: HomeSectionFormProps) {
  const dispatch = useAppDispatch();

  const { categories, loading: categoryLoading } = useAppSelector(
    (state: any) => state.category
  );

  const [saving, setSaving] = useState(false);
  const isEditMode = !!editData?._id;

  // ✅ Proper Type
  const [form, setForm] = useState<FormData>({
    title: "",
    category: "",
    tag: "bestseller",
    layout: "amazon",
    cardStyle: "compact",
    bgColor: "#ffffff",
    accentColor: "#4f46e5",
    limit: 12,
    order: 1,
    isActive: true,
    showSeeMore: true,
  });

  // ═══════════════════════════════════════════════════
  // 📥 Load Categories
  // ═══════════════════════════════════════════════════
  useEffect(() => {
    const jwt = localStorage.getItem("jwt") || "";
    dispatch(fetchCategories(jwt) as any);
  }, [dispatch]);

  // ═══════════════════════════════════════════════════
  // ✏️ EDIT MODE: Populate Form
  // ═══════════════════════════════════════════════════
  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        category:
          typeof editData.category === "object"
            ? editData.category?._id || ""
            : editData.category || "",
        tag: editData.tag || "bestseller",
        layout: editData.layout || "amazon",
        cardStyle: editData.cardStyle || "compact",
        bgColor: editData.bgColor || "#ffffff",
        accentColor: editData.accentColor || "#4f46e5",
        limit: editData.limit || 12,
        order: editData.order || 1,
        isActive: editData.isActive !== false,
        showSeeMore: editData.showSeeMore !== false,
      });
    }
  }, [editData]);

  // ═══════════════════════════════════════════════════
  // 💾 SUBMIT
  // ═══════════════════════════════════════════════════
  const handleSubmit = async () => {
    if (!form.title || !form.category) {
      alert("Title & Category ");
      return;
    }

    setSaving(true);

    try {
      if (isEditMode) {
        await dispatch(
          updateHomeSection({
            sectionId: editData._id,
            data: form,
          }) as any
        ).unwrap();
      } else {
        await dispatch(
          createHomeSection({ section: form }) as any
        ).unwrap();
      }

      if (!isEditMode) {
        setForm({
          title: "",
          category: "",
          tag: "bestseller",
          layout: "amazon",
          cardStyle: "compact",
          bgColor: "#ffffff",
          accentColor: "#4f46e5",
          limit: 12,
          order: 1,
          isActive: true,
          showSeeMore: true,
        });
      }

      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Save error:", error);
      alert(error || "Failed to save section");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Paper className="p-6 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl">
            <span className="text-2xl">{isEditMode ? "✏️" : ""}</span>
          </div>
          <div>
            <Typography variant="h5" className="font-bold text-gray-800">
              {isEditMode ? "Edit Home Section" : "Add Home Section"}
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              {isEditMode
                ? "Section की Details"
                : "create new Layout"}
            </Typography>
          </div>
        </div>

        {/* Title */}
        <TextField
          fullWidth
          label="Section Title"
          variant="outlined"
          className="mb-5"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Best Sellers"
        />

        {/* Category */}
        <FormControl fullWidth className="mb-5">
          <InputLabel>Category</InputLabel>
          <Select
            value={form.category}
            label="Category"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            disabled={categoryLoading}
          >
            <MenuItem value="">
              <em>Select Category</em>
            </MenuItem>
            {categories?.map((c: any) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name || c.categoryId}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Tag */}
        <FormControl fullWidth className="mb-6">
          <InputLabel>Tag</InputLabel>
          <Select
            value={form.tag}
            label="Tag"
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
          >
            <MenuItem value="bestseller"> Bestseller</MenuItem>
            <MenuItem value="popular"> Popular</MenuItem>
            <MenuItem value="seasonal"> Seasonal</MenuItem>
            <MenuItem value="new"> New Arrivals</MenuItem>
            <MenuItem value="featured"> Featured</MenuItem>
          </Select>
        </FormControl>

        {/* Layout Selector */}
        <div className="mb-6">
          <Typography className="font-bold text-gray-700 mb-3">
             Layout Style
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {LAYOUTS.map((layout) => (
              <div
                key={layout.value}
                onClick={() => setForm({ ...form, layout: layout.value })}
                className={`
                  relative p-3 rounded-xl cursor-pointer transition-all duration-300 text-center
                  ${
                    form.layout === layout.value
                      ? "border-2 border-indigo-600 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg scale-105"
                      : "border-2 border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                  }
                `}
              >
                {form.layout === layout.value && (
                  <div className="absolute top-1 right-1 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                )}
                <Typography className="font-bold text-xs text-gray-800">
                  {layout.label}
                </Typography>
                <Typography className="text-[10px] text-gray-500 mt-1">
                  {layout.desc}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Accent Color */}
        <div className="mb-6">
          <Typography className="font-bold text-gray-700 mb-3">
             Accent Color
          </Typography>
          <div className="flex flex-wrap gap-3">
            {ACCENT_COLORS.map((color) => (
              <div
                key={color.value}
                onClick={() => setForm({ ...form, accentColor: color.value })}
                className={`
                  relative w-10 h-10 rounded-full cursor-pointer transition-all duration-300
                  ${
                    form.accentColor === color.value
                      ? "ring-4 ring-offset-2 ring-gray-400 scale-110"
                      : "hover:scale-110"
                  }
                `}
                style={{ backgroundColor: color.value }}
                title={color.label}
              >
                {form.accentColor === color.value && (
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                    ✓
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order + Limit */}
        <Grid container spacing={2} className="mb-5">
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="Order"
              value={form.order}
              onChange={(e) =>
                setForm({ ...form, order: Number(e.target.value) })
              }
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              type="number"
              label="Limit (Products)"
              value={form.limit}
              onChange={(e) =>
                setForm({ ...form, limit: Number(e.target.value) })
              }
            />
          </Grid>
        </Grid>

        {/* Toggles */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2">
            <Switch
              checked={form.isActive}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.checked })
              }
              color="success"
            />
            <Typography className="text-sm font-medium">Active</Typography>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={form.showSeeMore}
              onChange={(e) =>
                setForm({ ...form, showSeeMore: e.target.checked })
              }
              color="primary"
            />
            <Typography className="text-sm font-medium">
               "See More" 
            </Typography>
          </div>
        </div>

        {/* Submit */}
        <Button
          variant="contained"
          fullWidth
          disabled={saving}
          onClick={handleSubmit}
          startIcon={
            saving ? <CircularProgress size={20} color="inherit" /> : null
          }
          sx={{
            py: 1.5,
            bgcolor: "#4f46e5",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: 16,
            borderRadius: "12px",
            "&:hover": { bgcolor: "#4338ca" },
          }}
        >
          {saving
            ? "Saving..."
            : isEditMode
            ? "✏️ Update Section"
            : " Create Section"}
        </Button>
      </Paper>
    </div>
  );
}