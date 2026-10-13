// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Button,
//   IconButton,
//   Chip,
//   TextField,
//   CircularProgress,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// import { api } from "../../../Config/Api";

// /* 🔥 Types */
// interface LegalPage {
//   _id: string;
//   slug: string;
//   title: string;
//   description?: string;
//   category: "customer" | "seller" | "general" | "about";
//   isActive: boolean;
//   isSystem: boolean;
//   order: number;
//   views?: number;
//   updatedAt: string;
// }

// interface PagesResponse {
//   pages: LegalPage[];
//   total: number;
//   page: number;
//   pages: number;
// }

// const LegalPageList: React.FC = () => {
//   const [pages, setPages] = useState<LegalPage[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [search, setSearch] = useState<string>("");
//   const navigate = useNavigate();

//   const getToken = (): string =>
//     localStorage.getItem("adminJwt") ||
//     localStorage.getItem("jwt") ||
//     localStorage.getItem("token") ||
//     "";

//   const fetchPages = async (): Promise<void> => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get<PagesResponse>(
//         `${api}/api/legal/admin/pages`,
//         {
//           params: { search },
//           headers: { Authorization: `Bearer ${getToken()}` },
//         }
//       );
//       setPages(data.pages || []);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPages();
//   }, [search]);

//   const handleToggle = async (id: string): Promise<void> => {
//     try {
//       await axios.patch(
//         `${api}/api/legal/admin/pages/${id}/toggle`,
//         {},
//         { headers: { Authorization: `Bearer ${getToken()}` } }
//       );
//       fetchPages();
//     } catch {
//       alert("Failed to toggle status");
//     }
//   };

//   const handleDelete = async (id: string): Promise<void> => {
//     if (!window.confirm("Are you sure? This cannot be undone.")) return;
//     try {
//       await axios.delete(`${api}/api/legal/admin/pages/${id}`, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       fetchPages();
//     } catch (error: any) {
//       alert(error.response?.data?.error || "Failed to delete");
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">Legal Pages</h1>
//           <p className="text-gray-500 mt-1">
//             Manage public pages & policies
//           </p>
//         </div>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={() => navigate("/admin/legal-pages/new")}
//           sx={{ bgcolor: "#df6b3c", "&:hover": { bgcolor: "#c55a2f" } }}
//         >
//           Create Page
//         </Button>
//       </div>

//       <TextField
//         fullWidth
//         placeholder="Search pages..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         sx={{ mb: 3, maxWidth: 400 }}
//         size="small"
//       />

//       {loading ? (
//         <div className="flex justify-center py-20">
//           <CircularProgress />
//         </div>
//       ) : (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b">
//               <tr>
//                 <th className="text-left px-6 py-3 text-sm font-bold text-gray-700">
//                   Title
//                 </th>
//                 <th className="text-left px-6 py-3 text-sm font-bold text-gray-700">
//                   Slug
//                 </th>
//                 <th className="text-left px-6 py-3 text-sm font-bold text-gray-700">
//                   Category
//                 </th>
//                 <th className="text-left px-6 py-3 text-sm font-bold text-gray-700">
//                   Status
//                 </th>
//                 <th className="text-right px-6 py-3 text-sm font-bold text-gray-700">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {pages.map((page) => (
//                 <tr
//                   key={page._id}
//                   className="border-b hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="px-6 py-4 font-semibold text-gray-800">
//                     {page.title}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600 font-mono">
//                     /{page.slug}
//                   </td>
//                   <td className="px-6 py-4">
//                     <Chip
//                       label={page.category}
//                       size="small"
//                       color={
//                         page.category === "customer"
//                           ? "primary"
//                           : page.category === "seller"
//                           ? "success"
//                           : page.category === "about"
//                           ? "warning"
//                           : "default"
//                       }
//                     />
//                   </td>
//                   <td className="px-6 py-4">
//                     <Chip
//                       label={page.isActive ? "Active" : "Inactive"}
//                       size="small"
//                       color={page.isActive ? "success" : "default"}
//                     />
//                   </td>
//                   <td className="px-6 py-4 text-right">
//                     <IconButton onClick={() => handleToggle(page._id)}>
//                       {page.isActive ? (
//                         <VisibilityIcon sx={{ color: "#10b981" }} />
//                       ) : (
//                         <VisibilityOffIcon sx={{ color: "#9ca3af" }} />
//                       )}
//                     </IconButton>
//                     <IconButton
//                       onClick={() =>
//                         navigate(`/admin/legal-pages/edit/${page._id}`)
//                       }
//                     >
//                       <EditIcon sx={{ color: "#3b82f6" }} />
//                     </IconButton>
//                     <IconButton
//                       onClick={() => handleDelete(page._id)}
//                       disabled={page.isSystem}
//                     >
//                       <DeleteIcon
//                         sx={{
//                           color: page.isSystem ? "#d1d5db" : "#ef4444",
//                         }}
//                       />
//                     </IconButton>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {pages.length === 0 && (
//             <div className="text-center py-16 text-gray-400">
//               No pages found. Create your first page!
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LegalPageList;












import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  Chip,
  TextField,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

/* 🔥 api instance — baseURL aur token automatic handle */
import { api } from "../../../Config/Api";

/* ═══════════════════════════════════════════════
   🔥 Types
   ═══════════════════════════════════════════════ */
interface LegalPage {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  category: "customer" | "seller" | "general" | "about";
  isActive: boolean;
  isSystem: boolean;
  order: number;
  views?: number;
  updatedAt: string;
}

const LegalPageList: React.FC = () => {
  const [pages, setPages] = useState<LegalPage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  /* ═══════════════════════════════════════════════
     🔥 FETCH PAGES — Safe array handling
     ═══════════════════════════════════════════════ */
  const fetchPages = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get(`/api/legal/admin/pages`, {
        params: { search },
      });

      console.log("📦 API Response:", data);

      /* 🔥 Safe array check — koi bhi response shape handle */
      let pagesArray: LegalPage[] = [];

      if (Array.isArray(data)) {
        pagesArray = data;
      } else if (data && Array.isArray(data.pages)) {
        pagesArray = data.pages;
      } else if (data && Array.isArray(data.data)) {
        pagesArray = data.data;
      } else if (data && typeof data === "object") {
        console.warn("⚠️ Unknown response shape:", data);
        pagesArray = [];
      }

      setPages(pagesArray);
    } catch (err: any) {
      console.error("❌ Fetch error:", err);
      setError(
        err.response?.data?.error || err.message || "Failed to load pages"
      );
      setPages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, [search]);

  /* ═══════════════════════════════════════════════
     🔥 TOGGLE — Active/Inactive
     ═══════════════════════════════════════════════ */
  const handleToggle = async (id: string): Promise<void> => {
    try {
      await api.patch(`/api/legal/admin/pages/${id}/toggle`);
      fetchPages();
    } catch {
      alert("Failed to toggle status");
    }
  };

  /* ═══════════════════════════════════════════════
     🔥 DELETE — Page delete
     ═══════════════════════════════════════════════ */
  const handleDelete = async (id: string): Promise<void> => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;
    try {
      await api.delete(`/api/legal/admin/pages/${id}`);
      fetchPages();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to delete");
    }
  };

  return (
    <div className="p-6">
      {/* ═══════════ HEADER ═══════════ */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Legal Pages</h1>
          <p className="text-gray-500 mt-1">
            Manage public pages & policies
          </p>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/legal-pages/new")}
          sx={{ bgcolor: "#df6b3c", "&:hover": { bgcolor: "#c55a2f" } }}
        >
          Create Page
        </Button>
      </div>

      {/* ═══════════ SEARCH ═══════════ */}
      <TextField
        fullWidth
        placeholder="Search pages..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3, maxWidth: 400 }}
        size="small"
      />

      {/* ═══════════ ERROR BOX ═══════════ */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <p className="font-bold">Error:</p>
          <p className="text-sm">{error}</p>
          <button
            onClick={fetchPages}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* ═══════════ LOADING / TABLE ═══════════ */}
      {loading ? (
        <div className="flex justify-center py-20">
          <CircularProgress />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-bold text-gray-700">
                  Title
                </th>
                <th className="text-left px-6 py-3 text-sm font-bold text-gray-700">
                  Slug
                </th>
                <th className="text-left px-6 py-3 text-sm font-bold text-gray-700">
                  Category
                </th>
                <th className="text-left px-6 py-3 text-sm font-bold text-gray-700">
                  Status
                </th>
                <th className="text-right px-6 py-3 text-sm font-bold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* 🔥 SAFE .map() — array check pehle */}
              {Array.isArray(pages) && pages.length > 0 ? (
                pages.map((page) => (
                  <tr
                    key={page._id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {page.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      /{page.slug}
                    </td>
                    <td className="px-6 py-4">
                      <Chip
                        label={page.category}
                        size="small"
                        color={
                          page.category === "customer"
                            ? "primary"
                            : page.category === "seller"
                            ? "success"
                            : page.category === "about"
                            ? "warning"
                            : "default"
                        }
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Chip
                        label={page.isActive ? "Active" : "Inactive"}
                        size="small"
                        color={page.isActive ? "success" : "default"}
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <IconButton onClick={() => handleToggle(page._id)}>
                        {page.isActive ? (
                          <VisibilityIcon sx={{ color: "#10b981" }} />
                        ) : (
                          <VisibilityOffIcon sx={{ color: "#9ca3af" }} />
                        )}
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          navigate(`/admin/legal-pages/edit/${page._id}`)
                        }
                      >
                        <EditIcon sx={{ color: "#3b82f6" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(page._id)}
                        disabled={page.isSystem}
                      >
                        <DeleteIcon
                          sx={{
                            color: page.isSystem ? "#d1d5db" : "#ef4444",
                          }}
                        />
                      </IconButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div className="text-center py-16 text-gray-400">
                      No pages found. Create your first page!
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LegalPageList;