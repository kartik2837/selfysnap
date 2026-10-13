// // src/pages/reports/InventoryStockReport.tsx

// import React, { useState, useEffect } from "react";
// import { formatOrderId } from "../../../../util/formatOrderId";

// // Use:

// import {
//     TextField,
//     Typography,
//     CircularProgress,
//     Alert,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Chip,
//     Grid,
// } from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
// import { getInventoryReportData } from "../../../../Redux Toolkit/Seller/report.slice";

// const InventoryStockReport: React.FC = () => {
//     const dispatch = useAppDispatch();
//     const { inventoryData, inventoryLoading, inventoryError } = useAppSelector(
//         (state) => state.report
//     );
//     const [search, setSearch] = useState<string>("");

//     useEffect(() => {
//         dispatch(getInventoryReportData());
//     }, [dispatch]);

//     const products = inventoryData?.products || [];
//     const filtered = search.trim() === ""
//         ? products
//         : products.filter(
//             (p) =>
//                 p.name.toLowerCase().includes(search.toLowerCase()) ||
//                 p.sku.toLowerCase().includes(search.toLowerCase())
//         );

//     const totalValue = filtered.reduce((sum, p) => sum + p.price * p.quantity, 0);

//     if (inventoryLoading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <CircularProgress />
//             </div>
//         );
//     }

//     if (inventoryError) {
//         return (
//             <div className="p-4">
//                 <Alert severity="error">{inventoryError}</Alert>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 bg-gray-50 min-h-screen">
//             <Grid container justifyContent="space-between" alignItems="center" className="mb-4">
//                 <Grid>
//                     <Typography variant="h4" className="font-bold">
//                         📦 Detailed Stock Report
//                     </Typography>
//                     <Typography variant="subtitle1" color="textSecondary">
//                         Total Products: {filtered.length} | Total Value: ₹{totalValue.toFixed(2)}
//                     </Typography>
//                 </Grid>
//                 <Grid>
//                     <TextField
//                         placeholder="Search by SKU / Name..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         variant="outlined"
//                         size="small"
//                         className="w-64"
//                     />
//                 </Grid>
//             </Grid>

//             <TableContainer component={Paper} className="shadow-md">
//                 <Table>
//                     <TableHead>
//                         <TableRow className="bg-gray-200">
//                             <TableCell>SKU</TableCell>
//                             <TableCell>Product</TableCell>
//                             <TableCell>Category</TableCell>
//                             <TableCell align="right">Price</TableCell>
//                             <TableCell align="right">Qty</TableCell>
//                             <TableCell align="right">Total Value</TableCell>
//                             <TableCell align="center">Status</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {filtered.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={7} align="center">
//                                     No products found
//                                 </TableCell>
//                             </TableRow>
//                         ) : (
//                             filtered.map((p) => {
//                                 const isLow = p.quantity < 10 && p.quantity > 0;
//                                 const isOut = p.quantity === 0;
//                                 let status = "In Stock";
//                                 let color: "success" | "error" | "warning" = "success";
//                                 if (isOut) { status = "Out of Stock";
//                                     color = "error"; } else if (isLow) { status = "Low Stock";
//                                     color = "warning"; }
//                                 return (
//                                     <TableRow
//                                         key={p._id}
//                                         className={isLow || isOut ? "bg-red-50" : ""}
//                                     >
//                                         <TableCell className="font-mono">{p.sku}</TableCell>
//                                         <TableCell>{p.name}</TableCell>
//                                         <TableCell>{formatOrderId(p.category) || "N/A"}</TableCell>
//                                         <TableCell align="right">₹{p.price}</TableCell>
//                                         <TableCell align="right" className="font-bold">
//                                             {p.quantity}
//                                         </TableCell>
//                                         <TableCell align="right">
//                                             ₹{(p.price * p.quantity).toFixed(2)}
//                                         </TableCell>
//                                         <TableCell align="center">
//                                             <Chip label={status} color={color} size="small" />
//                                         </TableCell>
//                                     </TableRow>
//                                 );
//                             })
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// };

// export default InventoryStockReport;






// // src/pages/reports/InventoryStockReport.tsx

// import React, { useState, useEffect, useMemo } from "react";
// import {
//   TextField,
//   Typography,
//   CircularProgress,
//   Alert,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   Grid,
//   Avatar,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// import CancelIcon from "@mui/icons-material/Cancel";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
// import { getInventoryReportData } from "../../../../Redux Toolkit/Seller/report.slice";
// import { formatOrderId } from "../../../../util/formatOrderId";

// const InventoryStockReport: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { inventoryData, inventoryLoading, inventoryError } = useAppSelector(
//     (state) => state.report
//   );
//   const { sellers } = useAppSelector((store) => store);
//   const [search, setSearch] = useState<string>("");

//   // ─── Business Name ─────────────────────────────────
//   const businessName =
//     sellers.profile?.businessDetails?.businessName ||
 
//     sellers.profile?.sellerName ||
//     "Mr. Thind Store";

//   useEffect(() => {
//     dispatch(getInventoryReportData());
//   }, [dispatch]);

//   const products = inventoryData?.products || [];

//   const filtered = useMemo(() => {
//     if (search.trim() === "") return products;
//     const term = search.toLowerCase();
//     return products.filter(
//       (p) =>
//         p.name.toLowerCase().includes(term) ||
//         p.sku.toLowerCase().includes(term) ||
//         (p.category || "").toLowerCase().includes(term)
//     );
//   }, [search, products]);

//   // ─── Summary Calculations ─────────────────────────
//   const { totalValue, inStock, lowStock, outOfStock } = useMemo(() => {
//     const totalValue = filtered.reduce(
//       (sum, p) => sum + p.price * p.quantity,
//       0
//     );
//     const inStock = filtered.filter((p) => p.quantity >= 10).length;
//     const lowStock = filtered.filter(
//       (p) => p.quantity > 0 && p.quantity < 10
//     ).length;
//     const outOfStock = filtered.filter((p) => p.quantity === 0).length;

//     return { totalValue, inStock, lowStock, outOfStock };
//   }, [filtered]);

//   // ─── Loading ────────────────────────────────────────
//   if (inventoryLoading) {
//     return (
//       <div className="flex flex-col justify-center items-center h-screen gap-4">
//         <CircularProgress size={50} />
//         <p className="text-gray-500">Loading inventory...</p>
//       </div>
//     );
//   }

//   // ─── Error ──────────────────────────────────────────
//   if (inventoryError) {
//     return (
//       <div className="p-6">
//         <Alert severity="error">{inventoryError}</Alert>
//       </div>
//     );
//   }

//   // ─── Summary Cards ──────────────────────────────────
//   const summaryCards = [
//     {
//       icon: <AttachMoneyIcon />,
//       title: "Total Value",
//       value: `₹${totalValue.toLocaleString("en-IN")}`,
//       bg: "from-purple-500 to-purple-700",
//       iconBg: "bg-purple-600",
//     },
//     {
//       icon: <CheckCircleIcon />,
//       title: "In Stock",
//       value: inStock,
//       bg: "from-green-500 to-green-700",
//       iconBg: "bg-green-600",
//     },
//     {
//       icon: <WarningAmberIcon />,
//       title: "Low Stock",
//       value: lowStock,
//       bg: "from-yellow-500 to-yellow-700",
//       iconBg: "bg-yellow-600",
//     },
//     {
//       icon: <CancelIcon />,
//       title: "Out of Stock",
//       value: outOfStock,
//       bg: "from-red-500 to-red-700",
//       iconBg: "bg-red-600",
//     },
//   ];

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 min-h-screen space-y-6">
//       {/* ─── Header Banner ────────────────────────────── */}
//       <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 md:p-8 shadow-xl">
//         <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
//         <div className="absolute -left-8 -bottom-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

//         <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <Avatar
//               sx={{
//                 width: 64,
//                 height: 64,
//                 bgcolor: "white",
//                 color: "#4f46e5",
//                 fontWeight: "bold",
//                 fontSize: 26,
//                 boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
//               }}
//             >
//               <StorefrontIcon sx={{ fontSize: 32 }} />
//             </Avatar>

//             <div>
//               <div className="flex items-center gap-2">
//                 <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow">
//                   {businessName}
//                 </h1>
//                 <VerifiedIcon sx={{ color: "#4ade80", fontSize: 22 }} />
//               </div>
//               <p className="text-white/90 text-lg font-medium mt-1 flex items-center gap-2">
//                  Detailed Stock Report
//               </p>
//               <p className="text-white/70 text-xs mt-1">
//                 Complete inventory overview with stock status
//               </p>
//             </div>
//           </div>

//           <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-white/90 text-sm">
//             <p className="font-semibold flex items-center gap-2">
//               <InventoryIcon sx={{ fontSize: 16 }} />
//               {filtered.length} Products Listed
//             </p>
//             <p className="text-white/70 text-xs mt-1">
//               Updated: {new Date().toLocaleDateString("en-IN")}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ─── Summary Cards ─────────────────────────────── */}
//       <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
//         {summaryCards.map((card, index) => (
//           <div
//             key={index}
//             className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
//             style={{
//               animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
//             }}
//           >
//             <div
//               className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${card.bg} p-5 shadow-lg text-white`}
//             >
//               <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10" />
//               <div className="flex items-start justify-between relative">
//                 <div>
//                   <p className="text-xs uppercase tracking-wider text-white/80">
//                     {card.title}
//                   </p>
//                   <p className="text-2xl md:text-3xl font-bold mt-2 drop-shadow">
//                     {card.value}
//                   </p>
//                 </div>
//                 <div
//                   className={`${card.iconBg} rounded-lg p-2 shadow-md transition-transform duration-300 hover:scale-110`}
//                 >
//                   {card.icon}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* ─── Search Bar ────────────────────────────────── */}
//       <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
//         <Grid container alignItems="center" spacing={2}>
//           <Grid size={{ xs: 12, md: 6 }}>
//             <TextField
//               placeholder="Search by SKU, Product Name, or Category..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               variant="outlined"
//               size="small"
//               fullWidth
//               InputProps={{
//                 startAdornment: (
//                   <SearchIcon className="text-gray-400 mr-2" />
//                 ),
//               }}
//             />
//           </Grid>
//           <Grid size={{ xs: 12, md: 6 }}>
//             <p className="text-xs text-gray-500 text-center md:text-right">
//               Showing{" "}
//               <span className="font-bold text-indigo-600">
//                 {filtered.length}
//               </span>{" "}
//               of{" "}
//               <span className="font-bold text-gray-700">{products.length}</span>{" "}
//               products
//             </p>
//           </Grid>
//         </Grid>
//       </div>

//       {/* ─── Table ────────────────────────────────────── */}
//       <div className="rounded-2xl bg-white shadow-lg overflow-hidden border border-gray-100">
//         <div className="p-5 border-b border-gray-100 flex items-center justify-between">
//           <div>
//             <h3 className="text-lg font-bold text-gray-800">
//               📋 Product-wise Stock
//             </h3>
//             <p className="text-xs text-gray-500 mt-1">
//               Complete breakdown of all products in inventory
//             </p>
//           </div>
//           <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-3 py-1 rounded-full">
//             {filtered.length} records
//           </span>
//         </div>

//         <TableContainer component={Paper} elevation={0}>
//           <Table>
//             <TableHead>
//               <TableRow
//                 sx={{
//                   background:
//                     "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)",
//                 }}
//               >
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                   SKU
//                 </TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                   Product
//                 </TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                   Category
//                 </TableCell>
//                 <TableCell
//                   align="right"
//                   sx={{ color: "white", fontWeight: "bold" }}
//                 >
//                   Price
//                 </TableCell>
//                 <TableCell
//                   align="right"
//                   sx={{ color: "white", fontWeight: "bold" }}
//                 >
//                   Qty
//                 </TableCell>
//                 <TableCell
//                   align="right"
//                   sx={{ color: "white", fontWeight: "bold" }}
//                 >
//                   Total Value
//                 </TableCell>
//                 <TableCell
//                   align="center"
//                   sx={{ color: "white", fontWeight: "bold" }}
//                 >
//                   Status
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filtered.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
//                     <InventoryIcon
//                       sx={{ fontSize: 60, color: "#cbd5e1", mb: 1 }}
//                     />
//                     <Typography color="textSecondary">
//                       No products found
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filtered.map((p, index) => {
//                   const isLow = p.quantity < 10 && p.quantity > 0;
//                   const isOut = p.quantity === 0;
//                   let status = "In Stock";
//                   let chipColor: "success" | "error" | "warning" = "success";
//                   if (isOut) {
//                     status = "Out of Stock";
//                     chipColor = "error";
//                   } else if (isLow) {
//                     status = "Low Stock";
//                     chipColor = "warning";
//                   }

//                   return (
//                     <TableRow
//                       key={p._id}
//                       sx={{
//                         "&:hover": {
//                           backgroundColor: isOut || isLow ? "#fef2f2" : "#f9fafb",
//                         },
//                         "&:nth-of-type(odd)": {
//                           backgroundColor:
//                             isOut || isLow ? "#fef2f2" : "#fafafa",
//                         },
//                         borderLeft:
//                           isOut
//                             ? "4px solid #dc2626"
//                             : isLow
//                             ? "4px solid #f59e0b"
//                             : "4px solid #10b981",
//                         animation: `fadeIn 0.4s ease-out ${
//                           index * 0.03
//                         }s both`,
//                       }}
//                     >
//                       <TableCell
//                         className="font-mono text-gray-700"
//                         sx={{ fontWeight: 600 }}
//                       >
//                         {p.sku}
//                       </TableCell>
//                       <TableCell className="text-gray-800 font-medium">
//                         {p.name}
//                       </TableCell>
//                       <TableCell>
//                         <span className="text-xs bg-gray-100 text-gray-700 font-medium px-2 py-1 rounded">
//                           {formatOrderId(p.category) || "N/A"}
//                         </span>
//                       </TableCell>
//                       <TableCell align="right" className="text-gray-700">
//                         ₹{p.price.toLocaleString("en-IN")}
//                       </TableCell>
//                       <TableCell align="right">
//                         <span
//                           className={`font-bold ${
//                             isOut
//                               ? "text-red-600"
//                               : isLow
//                               ? "text-yellow-600"
//                               : "text-green-600"
//                           }`}
//                         >
//                           {p.quantity}
//                         </span>
//                       </TableCell>
//                       <TableCell
//                         align="right"
//                         className="font-bold text-indigo-600"
//                       >
//                         ₹{(p.price * p.quantity).toLocaleString("en-IN")}
//                       </TableCell>
//                       <TableCell align="center">
//                         <Chip
//                           label={status}
//                           color={chipColor}
//                           size="small"
//                           sx={{ fontWeight: "bold" }}
//                         />
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })
//               )}

//               {/* ─── Total Row ─────────────────────────── */}
//               {filtered.length > 0 && (
//                 <TableRow
//                   sx={{
//                     background:
//                       "linear-gradient(90deg, #eef2ff 0%, #f3e8ff 100%)",
//                     borderTop: "2px solid #4f46e5",
//                   }}
//                 >
//                   <TableCell
//                     colSpan={5}
//                     className="font-bold text-gray-800 text-right"
//                   >
//                     TOTAL INVENTORY VALUE
//                   </TableCell>
//                   <TableCell
//                     align="right"
//                     className="font-bold text-indigo-700 text-lg"
//                   >
//                     ₹{totalValue.toLocaleString("en-IN")}
//                   </TableCell>
//                   <TableCell align="center">
//                     <span className="text-xs font-bold text-gray-600">
//                       {filtered.length} items
//                     </span>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>

//       {/* ─── Animations ───────────────────────────────── */}
//       <style>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default InventoryStockReport;









// src/pages/reports/InventoryStockReport.tsx

import React, { useState, useEffect, useMemo } from "react";
import { formatOrderId } from "../../../../util/formatOrderId";
import {
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InventoryIcon from "@mui/icons-material/Inventory";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VerifiedIcon from "@mui/icons-material/Verified";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
import { getInventoryReportData } from "../../../../Redux Toolkit/Seller/report.slice";

// ─── Type Definitions ──────────────────────────────
interface ProductStock {
  _id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  sellingPrice?: number;
  quantity: number;
}

const InventoryStockReport: React.FC = () => {
  const dispatch = useAppDispatch();
  const { inventoryData, inventoryLoading, inventoryError } = useAppSelector(
    (state: any) => state.report
  );
  const { sellers } = useAppSelector((store: any) => store);
  const [search, setSearch] = useState<string>("");

  // ─── Business Name ─────────────────────────────────
  const businessName =
    sellers.profile?.businessDetails?.businessName ||
    sellers.profile?.businessName ||
    sellers.profile?.sellerName ||
    "Mr. Thind Store";

  useEffect(() => {
    dispatch(getInventoryReportData() as any);
  }, [dispatch]);

  const products: ProductStock[] = inventoryData?.products || [];

  const filtered = useMemo(() => {
    if (search.trim() === "") return products;
    const term = search.toLowerCase();
    return products.filter(
      (p) =>
        (p.name || "").toLowerCase().includes(term) ||
        (p.sku || "").toLowerCase().includes(term) ||
        (p.category || "").toLowerCase().includes(term)
    );
  }, [search, products]);

  // ─── Summary Calculations ─────────────────────────
  const { totalValue, inStock, lowStock, outOfStock } = useMemo(() => {
    const totalValue = filtered.reduce(
      (sum, p) => sum + (p.price || 0) * (p.quantity || 0),
      0
    );
    const inStock = filtered.filter((p) => p.quantity >= 10).length;
    const lowStock = filtered.filter(
      (p) => p.quantity > 0 && p.quantity < 10
    ).length;
    const outOfStock = filtered.filter((p) => p.quantity === 0).length;

    return { totalValue, inStock, lowStock, outOfStock };
  }, [filtered]);

  // ─── Loading ────────────────────────────────────────
  if (inventoryLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <CircularProgress size={50} />
        <p className="text-gray-500">Loading inventory...</p>
      </div>
    );
  }

  // ─── Error ──────────────────────────────────────────
  if (inventoryError) {
    return (
      <div className="p-6">
        <Alert severity="error">{inventoryError}</Alert>
      </div>
    );
  }

  // ─── Summary Cards Data ─────────────────────────────
  const summaryCards = [
    {
      icon: <AttachMoneyIcon />,
      title: "Total Value",
      value: `₹${totalValue.toLocaleString("en-IN")}`,
      bg: "from-purple-500 to-purple-700",
      iconBg: "bg-purple-600",
    },
    {
      icon: <CheckCircleIcon />,
      title: "In Stock",
      value: inStock,
      bg: "from-green-500 to-green-700",
      iconBg: "bg-green-600",
    },
    {
      icon: <WarningAmberIcon />,
      title: "Low Stock",
      value: lowStock,
      bg: "from-yellow-500 to-yellow-700",
      iconBg: "bg-yellow-600",
    },
    {
      icon: <CancelIcon />,
      title: "Out of Stock",
      value: outOfStock,
      bg: "from-red-500 to-red-700",
      iconBg: "bg-red-600",
    },
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen space-y-6">
      {/* ─── Header Banner ────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 md:p-8 shadow-xl">
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -left-8 -bottom-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: "white",
                color: "#4f46e5",
                fontWeight: "bold",
                fontSize: 26,
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              }}
            >
              <StorefrontIcon sx={{ fontSize: 32 }} />
            </Avatar>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow">
                  {businessName}
                </h1>
                <VerifiedIcon sx={{ color: "#4ade80", fontSize: 22 }} />
              </div>
              <p className="text-white/90 text-lg font-medium mt-1 flex items-center gap-2">
                📦 Detailed Stock Report
              </p>
              <p className="text-white/70 text-xs mt-1">
                Complete inventory overview with stock status
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-white/90 text-sm">
            <p className="font-semibold flex items-center gap-2">
              <InventoryIcon sx={{ fontSize: 16 }} />
              {filtered.length} Products Listed
            </p>
            <p className="text-white/70 text-xs mt-1">
              Updated: {new Date().toLocaleDateString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Summary Cards ─────────────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
            }}
          >
            <div
              className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${card.bg} p-5 shadow-lg text-white`}
            >
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10" />
              <div className="flex items-start justify-between relative">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/80">
                    {card.title}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold mt-2 drop-shadow">
                    {card.value}
                  </p>
                </div>
                <div
                  className={`${card.iconBg} rounded-lg p-2 shadow-md transition-transform duration-300 hover:scale-110`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ─── Search Bar ────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
        <Grid container alignItems="center" spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              placeholder="Search by SKU, Product Name, or Category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <SearchIcon className="text-gray-400 mr-2" />
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <p className="text-xs text-gray-500 text-center md:text-right">
              Showing{" "}
              <span className="font-bold text-indigo-600">
                {filtered.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-gray-700">{products.length}</span>{" "}
              products
            </p>
          </Grid>
        </Grid>
      </div>

      {/* ─── Table ────────────────────────────────────── */}
      <div className="rounded-2xl bg-white shadow-lg overflow-hidden border border-gray-100">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              📋 Product-wise Stock
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Complete breakdown of all products in inventory
            </p>
          </div>
          <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-3 py-1 rounded-full">
            {filtered.length} records
          </span>
        </div>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background:
                    "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)",
                }}
              >
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  SKU
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Product
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Category
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Price
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Qty
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Total Value
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <InventoryIcon
                      sx={{ fontSize: 60, color: "#cbd5e1", mb: 1 }}
                    />
                    <Typography color="textSecondary">
                      No products found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((p, index) => {
                  const isLow = p.quantity < 10 && p.quantity > 0;
                  const isOut = p.quantity === 0;
                  let status = "In Stock";
                  let chipColor: "success" | "error" | "warning" = "success";
                  if (isOut) {
                    status = "Out of Stock";
                    chipColor = "error";
                  } else if (isLow) {
                    status = "Low Stock";
                    chipColor = "warning";
                  }

                  return (
                    <TableRow
                      key={p._id}
                      sx={{
                        "&:hover": {
                          backgroundColor:
                            isOut || isLow ? "#fef2f2" : "#f9fafb",
                        },
                        "&:nth-of-type(odd)": {
                          backgroundColor:
                            isOut || isLow ? "#fef2f2" : "#fafafa",
                        },
                        borderLeft: isOut
                          ? "4px solid #dc2626"
                          : isLow
                          ? "4px solid #f59e0b"
                          : "4px solid #10b981",
                        animation: `fadeIn 0.4s ease-out ${
                          index * 0.03
                        }s both`,
                      }}
                    >
                      <TableCell
                        className="font-mono text-gray-700"
                        sx={{ fontWeight: 600 }}
                      >
                        {p.sku}
                      </TableCell>
                      <TableCell className="text-gray-800 font-medium">
                        {p.name}
                      </TableCell>
                      <TableCell>
                        <span className="text-xs bg-gray-100 text-gray-700 font-medium px-2 py-1 rounded">
                          {formatOrderId (p.category || "N/A")}
                        </span>
                      </TableCell>
                      <TableCell align="right" className="text-gray-700">
                        ₹{(p.price || 0).toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell align="right">
                        <span
                          className={`font-bold ${
                            isOut
                              ? "text-red-600"
                              : isLow
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {p.quantity}
                        </span>
                      </TableCell>
                      <TableCell
                        align="right"
                        className="font-bold text-indigo-600"
                      >
                        ₹{((p.price || 0) * (p.quantity || 0)).toLocaleString(
                          "en-IN"
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={status}
                          color={chipColor}
                          size="small"
                          sx={{ fontWeight: "bold" }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}

              {/* ─── Total Row ─────────────────────────── */}
              {filtered.length > 0 && (
                <TableRow
                  sx={{
                    background:
                      "linear-gradient(90deg, #eef2ff 0%, #f3e8ff 100%)",
                    borderTop: "2px solid #4f46e5",
                  }}
                >
                  <TableCell
                    colSpan={5}
                    className="font-bold text-gray-800 text-right"
                  >
                    TOTAL INVENTORY VALUE
                  </TableCell>
                  <TableCell
                    align="right"
                    className="font-bold text-indigo-700 text-lg"
                  >
                    ₹{totalValue.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell align="center">
                    <span className="text-xs font-bold text-gray-600">
                      {filtered.length} items
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* ─── Animations ───────────────────────────────── */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default InventoryStockReport;