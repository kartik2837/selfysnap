// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// /* 🔥 react-quill-new use kar — Vite compatible */
// import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";

// import {
//   Button,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   CircularProgress,
// } from "@mui/material";
// import SaveIcon from "@mui/icons-material/Save";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// import { api } from "../../../Config/Api";

// /* 🔥 Types */
// type CategoryType = "about" | "customer" | "seller" | "general";

// interface FormData {
//   title: string;
//   slug: string;
//   content: string;
//   description: string;
//   category: CategoryType;
//   order: number;
//   isActive: boolean;
// }

// /* 🔥 Quill Config */
// const QUILL_MODULES = {
//   toolbar: [
//     [{ header: [1, 2, 3, 4, false] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ color: [] }, { background: [] }],
//     ["blockquote", "code-block"],
//     ["link"],
//     ["clean"],
//   ],
// };

// const QUILL_FORMATS = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "list",
//   "bullet",
//   "color",
//   "background",
//   "blockquote",
//   "code-block",
//   "link",
// ];

// const LegalPageEditor: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const isEditing = !!id;

//   const [loading, setLoading] = useState<boolean>(isEditing);
//   const [saving, setSaving] = useState<boolean>(false);
//   const [formData, setFormData] = useState<FormData>({
//     title: "",
//     slug: "",
//     content: "",
//     description: "",
//     category: "general",
//     order: 0,
//     isActive: true,
//   });

//   const getToken = (): string =>
//     localStorage.getItem("adminJwt") ||
//     localStorage.getItem("jwt") ||
//     localStorage.getItem("token") ||
//     "";

//   useEffect(() => {
//     if (isEditing && id) fetchPage(id);
//   }, [id]);

//   const fetchPage = async (pageId: string): Promise<void> => {
//     try {
//       const { data } = await axios.get(
//         `${api}/api/legal/admin/pages/${pageId}`,
//         { headers: { Authorization: `Bearer ${getToken()}` } }
//       );
//       setFormData({
//         title: data.title || "",
//         slug: data.slug || "",
//         content: data.content || "",
//         description: data.description || "",
//         category: data.category || "general",
//         order: data.order || 0,
//         isActive: data.isActive ?? true,
//       });
//     } catch {
//       alert("Page not found");
//       navigate("/admin/legal-pages");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTitleChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ): void => {
//     const title = e.target.value;
//     setFormData((prev) => ({
//       ...prev,
//       title,
//       slug:
//         prev.slug ||
//         title
//           .toLowerCase()
//           .trim()
//           .replace(/[^\w\s-]/g, "")
//           .replace(/\s+/g, "-"),
//     }));
//   };

//   /* 🔥 FIXED — Category change handler (no SelectChangeEvent import) */
//   const handleCategoryChange = (e: any): void => {
//     setFormData({ ...formData, category: e.target.value as CategoryType });
//   };

//   /* 🔥 FIXED — Status change handler */
//   const handleStatusChange = (e: any): void => {
//     setFormData({ ...formData, isActive: e.target.value === "true" || e.target.value === true });
//   };

//   const handleSave = async (): Promise<void> => {
//     if (!formData.title || !formData.content) {
//       alert("Title and content are required");
//       return;
//     }

//     setSaving(true);
//     try {
//       const headers = { Authorization: `Bearer ${getToken()}` };

//       if (isEditing && id) {
//         await axios.put(
//           `${api}/api/legal/admin/pages/${id}`,
//           formData,
//           { headers }
//         );
//       } else {
//         await axios.post(
//           `${api}/api/legal/admin/pages`,
//           formData,
//           { headers }
//         );
//       }

//       alert("Page saved successfully!");
//       navigate("/admin/legal-pages");
//     } catch (error: any) {
//       alert(error.response?.data?.error || "Failed to save");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center py-20">
//         <CircularProgress />
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <Button
//           startIcon={<ArrowBackIcon />}
//           onClick={() => navigate("/admin/legal-pages")}
//         >
//           Back
//         </Button>
//         <Button
//           variant="contained"
//           startIcon={<SaveIcon />}
//           onClick={handleSave}
//           disabled={saving}
//           sx={{ bgcolor: "#df6b3c", "&:hover": { bgcolor: "#c55a2f" } }}
//         >
//           {saving ? "Saving..." : "Save Page"}
//         </Button>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
//         <TextField
//           fullWidth
//           label="Page Title"
//           value={formData.title}
//           onChange={handleTitleChange}
//           required
//           helperText="E.g., About Us, Terms & Conditions"
//         />

//         <TextField
//           fullWidth
//           label="URL Slug"
//           value={formData.slug}
//           onChange={(e) =>
//             setFormData({ ...formData, slug: e.target.value })
//           }
//           required
//           helperText="E.g., about, terms-and-conditions"
//         />

//         <TextField
//           fullWidth
//           label="Short Description"
//           value={formData.description}
//           onChange={(e) =>
//             setFormData({ ...formData, description: e.target.value })
//           }
//           multiline
//           rows={2}
//           inputProps={{ maxLength: 300 }}
//           helperText={`${formData.description?.length || 0}/300 characters`}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <FormControl fullWidth>
//             <InputLabel>Category</InputLabel>
//             <Select
//               value={formData.category}
//               onChange={handleCategoryChange}
//               label="Category"
//             >
//               <MenuItem value="about">About</MenuItem>
//               <MenuItem value="customer">Customer</MenuItem>
//               <MenuItem value="seller">Seller</MenuItem>
//               <MenuItem value="general">General</MenuItem>
//             </Select>
//           </FormControl>

//           <TextField
//             fullWidth
//             type="number"
//             label="Display Order"
//             value={formData.order}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 order: Number(e.target.value),
//               })
//             }
//             helperText="Lower number = appears first"
//           />

//           <FormControl fullWidth>
//             <InputLabel>Status</InputLabel>
//             <Select
//               value={formData.isActive ? "true" : "false"}
//               onChange={handleStatusChange}
//               label="Status"
//             >
//               <MenuItem value="true">Active</MenuItem>
//               <MenuItem value="false">Inactive</MenuItem>
//             </Select>
//           </FormControl>
//         </div>

//         <div className="border-t pt-6">
//           <h3 className="font-bold text-gray-800 mb-4">📝 Page Content</h3>
//           <div className="border rounded-lg overflow-hidden bg-white">
//             <ReactQuill
//               theme="snow"
//               value={formData.content}
//               onChange={(content: string) =>
//                 setFormData({ ...formData, content })
//               }
//               modules={QUILL_MODULES}
//               formats={QUILL_FORMATS}
//               style={{ height: "500px", paddingBottom: "50px" }}
//               placeholder="Write your page content here..."
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LegalPageEditor;

















import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* 🔥 api instance use kar — already baseURL set hai */
import { api } from "../../../Config/Api";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import {
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/* 🔥 Types */
type CategoryType = "about" | "customer" | "seller" | "general";

interface FormData {
  title: string;
  slug: string;
  content: string;
  description: string;
  category: CategoryType;
  order: number;
  isActive: boolean;
}

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["blockquote", "code-block"],
    ["link"],
    ["clean"],
  ],
};

const QUILL_FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "color",
  "background",
  "blockquote",
  "code-block",
  "link",
];

const LegalPageEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState<boolean>(isEditing);
  const [saving, setSaving] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    content: "",
    description: "",
    category: "general",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    if (isEditing && id) fetchPage(id);
  }, [id]);

  /* ═══════════════════════════════════════════════
     🔥 FETCH PAGE — api instance use kar
     ═══════════════════════════════════════════════ */
  const fetchPage = async (pageId: string): Promise<void> => {
    try {
      console.log("🔍 Fetching page:", pageId);

      /* 🔥 api instance — baseURL already set hai */
      const { data } = await api.get(`/api/legal/admin/pages/${pageId}`);

      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        content: data.content || "",
        description: data.description || "",
        category: data.category || "general",
        order: data.order || 0,
        isActive: data.isActive ?? true,
      });
    } catch (error: any) {
      console.error("Fetch error:", error);
      alert("Page not found");
      navigate("/admin/legal-pages");
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug:
        prev.slug ||
        title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-"),
    }));
  };

  const handleCategoryChange = (e: any): void => {
    setFormData({ ...formData, category: e.target.value as CategoryType });
  };

  const handleStatusChange = (e: any): void => {
    setFormData({
      ...formData,
      isActive: e.target.value === "true",
    });
  };

  /* ═══════════════════════════════════════════════
     🔥 SAVE PAGE — api instance use kar
     ═══════════════════════════════════════════════ */
  const handleSave = async (): Promise<void> => {
    if (!formData.title || !formData.content) {
      alert("Title and content are required");
      return;
    }

    setSaving(true);
    try {
      if (isEditing && id) {
        console.log("📤 PUT /api/legal/admin/pages/" + id);
        await api.put(`/api/legal/admin/pages/${id}`, formData);
      } else {
        console.log("📤 POST /api/legal/admin/pages");
        await api.post(`/api/legal/admin/pages`, formData);
      }

      alert("Page saved successfully!");
      navigate("/admin/legal-pages");
    } catch (error: any) {
      console.error("Save error:", error);
      alert(
        error.response?.data?.error ||
          `Failed to save: ${error.message}`
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/admin/legal-pages")}
        >
          Back
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={saving}
          sx={{ bgcolor: "#df6b3c", "&:hover": { bgcolor: "#c55a2f" } }}
        >
          {saving ? "Saving..." : "Save Page"}
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <TextField
          fullWidth
          label="Page Title"
          value={formData.title}
          onChange={handleTitleChange}
          required
          helperText="E.g., About Us, Terms & Conditions"
        />

        <TextField
          fullWidth
          label="URL Slug"
          value={formData.slug}
          onChange={(e) =>
            setFormData({ ...formData, slug: e.target.value })
          }
          required
          helperText="E.g., about, terms-and-conditions"
        />

        <TextField
          fullWidth
          label="Short Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          multiline
          rows={2}
          inputProps={{ maxLength: 300 }}
          helperText={`${formData.description?.length || 0}/300 characters`}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="about">About</MenuItem>
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="seller">Seller</MenuItem>
              <MenuItem value="general">General</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            type="number"
            label="Display Order"
            value={formData.order}
            onChange={(e) =>
              setFormData({
                ...formData,
                order: Number(e.target.value),
              })
            }
          />

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.isActive ? "true" : "false"}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-bold text-gray-800 mb-4">📝 Page Content</h3>
          <div className="border rounded-lg overflow-hidden bg-white">
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(content: string) =>
                setFormData({ ...formData, content })
              }
              modules={QUILL_MODULES}
              formats={QUILL_FORMATS}
              style={{ height: "500px", paddingBottom: "50px" }}
              placeholder="Write your page content here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPageEditor;