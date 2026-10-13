// // src/pages/reports/InventorySummaryReport.tsx

// import React, { useEffect } from "react";
// import {
//     Grid,
//     Card,
//     CardContent,
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
// } from "@mui/material";
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     ResponsiveContainer,
//     PieChart,
//     Pie,
//     Cell,
// } from "recharts";
// import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
// import { getInventoryReportData } from "../../../../Redux Toolkit/Seller/report.slice";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

// const InventorySummaryReport: React.FC = () => {
//     const dispatch = useAppDispatch();
//     const { inventoryData, inventoryLoading, inventoryError } = useAppSelector(
//         (state) => state.report
//     );

//     useEffect(() => {
//         dispatch(getInventoryReportData());
//     }, [dispatch]);

//     const categoryData = inventoryData?.categorySummary || [];
//     const totalStock = categoryData.reduce((sum, d) => sum + d.totalStock, 0);
//     const totalValue = categoryData.reduce((sum, d) => sum + d.totalValue, 0);

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

//     if (categoryData.length === 0) {
//         return (
//             <div className="p-4">
//                 <Alert severity="info">No categories found</Alert>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 bg-gray-50 min-h-screen">
//             <Typography variant="h4" className="font-bold mb-2">
//                 📊 Category-wise Summary
//             </Typography>
//             <Typography variant="subtitle1" color="textSecondary" className="mb-6">
//                 Total Categories: {categoryData.length} | Total Stock: {totalStock} | Total Value: ₹
//                 {totalValue.toFixed(2)}
//             </Typography>

//             <Grid container spacing={4} className="mb-6">
//                 {/* Bar Chart */}
//                 <Grid size={{ xs: 12, md: 6 }}>
//                     <Card className="shadow-md">
//                         <CardContent style={{ height: 300 }}>
//                             <Typography variant="h6" align="center" className="mb-2">
//                                 Category Stock (Qty)
//                             </Typography>
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <BarChart data={categoryData}>
//                                     <CartesianGrid strokeDasharray="3 3" />
//                                     <XAxis dataKey="_id" />
//                                     <YAxis />
//                                     <Tooltip />
//                                     <Bar dataKey="totalStock" fill="#82ca9d" />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>

//                 {/* Pie Chart */}
//                 <Grid size={{ xs: 12, md: 6 }}>
//                     <Card className="shadow-md">
//                         <CardContent style={{ height: 300 }}>
//                             <Typography variant="h6" align="center" className="mb-2">
//                                 Stock Distribution
//                             </Typography>
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <PieChart>
//                                     <Pie
//                                         data={categoryData}
//                                         dataKey="totalStock"
//                                         nameKey="_id"
//                                         cx="50%"
//                                         cy="50%"
//                                         outerRadius={80}
//                                         label
//                                     >
//                                         {categoryData.map((_, index) => (
//                                             <Cell
//                                                 key={`cell-${index}`}
//                                                 fill={COLORS[index % COLORS.length]}
//                                             />
//                                         ))}
//                                     </Pie>
//                                     <Tooltip />
//                                 </PieChart>
//                             </ResponsiveContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>

//             {/* Table */}
//             <TableContainer component={Paper} className="shadow-md">
//                 <Table>
//                     <TableHead>
//                         <TableRow className="bg-gray-200">
//                             <TableCell>Category</TableCell>
//                             <TableCell align="right">Total Stock</TableCell>
//                             <TableCell align="right">Total Value (₹)</TableCell>
//                             <TableCell align="right">% of Stock</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {categoryData.map((item) => (
//                             <TableRow key={item._id} className="hover:bg-gray-50">
//                                 <TableCell className="font-bold">
//                                     {item._id || "Uncategorized"}
//                                 </TableCell>
//                                 <TableCell align="right">{item.totalStock}</TableCell>
//                                 <TableCell align="right">₹{item.totalValue.toFixed(2)}</TableCell>
//                                 <TableCell align="right">
//                                     {totalStock > 0
//                                         ? ((item.totalStock / totalStock) * 100).toFixed(2)
//                                         : 0}
//                                     %
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// };

// export default InventorySummaryReport;













// // src/pages/reports/InventorySummaryReport.tsx

// import React, { useEffect } from "react";
// import {
//   Grid,
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
//   Avatar,
// } from "@mui/material";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
// import { getInventoryReportData } from "../../../../Redux Toolkit/Seller/report.slice";

// const COLORS = [
//   "#0088FE",
//   "#00C49F",
//   "#FFBB28",
//   "#FF8042",
//   "#8884D8",
//   "#82CA9D",
// ];

// const InventorySummaryReport: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { inventoryData, inventoryLoading, inventoryError } = useAppSelector(
//     (state) => state.report
//   );

//   useEffect(() => {
//     dispatch(getInventoryReportData());
//   }, [dispatch]);

//   const categoryData = inventoryData?.categorySummary || [];
//   const totalStock = categoryData.reduce((sum, d) => sum + d.totalStock, 0);
//   const totalValue = categoryData.reduce((sum, d) => sum + d.totalValue, 0);

//   if (inventoryLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (inventoryError) {
//     return (
//       <div className="p-4">
//         <Alert severity="error">{inventoryError}</Alert>
//       </div>
//     );
//   }

//   if (categoryData.length === 0) {
//     return (
//       <div className="p-4">
//         <Alert severity="info">No categories found</Alert>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen space-y-6">
//       {/* ─── Header ──────────────────────────────────── */}
//       <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 shadow-xl">
//         <div className="relative flex items-center gap-4">
//           <Avatar
//             sx={{
//               width: 60,
//               height: 60,
//               bgcolor: "white",
//               color: "#4f46e5",
//             }}
//           >
//             <StorefrontIcon sx={{ fontSize: 30 }} />
//           </Avatar>
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-white">
//               📊 Category-wise Summary
//             </h1>
//             <p className="text-white/80 text-sm mt-1">
//               Total Categories: {categoryData.length} | Total Stock: {totalStock} | Total Value: ₹
//               {totalValue.toFixed(2)}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ─── Charts ──────────────────────────────────── */}
//       <Grid container spacing={3}>
//         {/* Bar Chart */}
//         <Grid size={{ xs: 12, md: 6 }}>
//           <Paper className="shadow-md p-4">
//             <Typography variant="h6" align="center" className="mb-3 font-bold">
//               📊 Category Stock (Qty)
//             </Typography>
//             <div style={{ height: 300 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={categoryData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="_id" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="totalStock" fill="#82ca9d" radius={[8, 8, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </Paper>
//         </Grid>

//         {/* Pie Chart */}
//         <Grid size={{ xs: 12, md: 6 }}>
//           <Paper className="shadow-md p-4">
//             <Typography variant="h6" align="center" className="mb-3 font-bold">
//               🥧 Stock Distribution
//             </Typography>
//             <div style={{ height: 300 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={categoryData}
//                     dataKey="totalStock"
//                     nameKey="_id"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     label
//                   >
//                     {categoryData.map((_, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* ─── Table ───────────────────────────────────── */}
//       <Paper className="shadow-md overflow-hidden">
//         <div className="p-4 bg-gray-100 border-b">
//           <Typography variant="h6" className="font-bold">
//              Category Breakdown
//           </Typography>
//         </div>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow className="bg-indigo-600">
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>
//                   Category
//                 </TableCell>
//                 <TableCell
//                   align="right"
//                   sx={{ color: "white", fontWeight: "bold" }}
//                 >
//                   Total Stock
//                 </TableCell>
//                 <TableCell
//                   align="right"
//                   sx={{ color: "white", fontWeight: "bold" }}
//                 >
//                   Total Value (₹)
//                 </TableCell>
//                 <TableCell
//                   align="right"
//                   sx={{ color: "white", fontWeight: "bold" }}
//                 >
//                   % of Stock
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {categoryData.map((item) => (
//                 <TableRow key={item._id} className="hover:bg-gray-50">
//                   <TableCell className="font-bold">
//                     {item._id || "Uncategorized"}
//                   </TableCell>
//                   <TableCell align="right">{item.totalStock}</TableCell>
//                   <TableCell align="right" className="font-bold text-indigo-600">
//                     ₹{item.totalValue.toFixed(2)}
//                   </TableCell>
//                   <TableCell align="right">
//                     {totalStock > 0
//                       ? ((item.totalStock / totalStock) * 100).toFixed(2)
//                       : 0}
//                     %
//                   </TableCell>
//                 </TableRow>
//               ))}

//               {/* Total Row */}
//               <TableRow className="bg-indigo-50">
//                 <TableCell className="font-bold">TOTAL</TableCell>
//                 <TableCell align="right" className="font-bold text-green-700">
//                   {totalStock}
//                 </TableCell>
//                 <TableCell align="right" className="font-bold text-indigo-700">
//                   ₹{totalValue.toFixed(2)}
//                 </TableCell>
//                 <TableCell align="right" className="font-bold">
//                   100%
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </div>
//   );
// };

// export default InventorySummaryReport;












// src/pages/reports/InventorySummaryReport.tsx

import React, { useEffect } from "react";
import { formatOrderId } from "../../../../util/formatOrderId";
import {
  Grid,
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
  Avatar,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
import { getInventoryReportData } from "../../../../Redux Toolkit/Seller/report.slice";

// ─── Type Definitions ──────────────────────────────
interface CategoryDataItem {
  _id: string;
  totalStock: number;
  totalValue: number;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

const InventorySummaryReport: React.FC = () => {
  const dispatch = useAppDispatch();
  const { inventoryData, inventoryLoading, inventoryError } = useAppSelector(
    (state: any) => state.report
  );

  useEffect(() => {
    dispatch(getInventoryReportData() as any);
  }, [dispatch]);

  // ─── Safely Extract Category Data ──────────────────
  const categoryData: CategoryDataItem[] =
    inventoryData?.categorySummary || [];

  const totalStock: number = categoryData.reduce(
    (sum: number, d: CategoryDataItem) => sum + (d.totalStock || 0),
    0
  );

  const totalValue: number = categoryData.reduce(
    (sum: number, d: CategoryDataItem) => sum + (d.totalValue || 0),
    0
  );

  // ─── Loading ────────────────────────────────────────
  if (inventoryLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  // ─── Error ──────────────────────────────────────────
  if (inventoryError) {
    return (
      <div className="p-4">
        <Alert severity="error">{inventoryError}</Alert>
      </div>
    );
  }

  // ─── No Data ────────────────────────────────────────
  if (categoryData.length === 0) {
    return (
      <div className="p-4">
        <Alert severity="info">No categories found</Alert>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* ─── Header ──────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 shadow-xl">
        <div className="relative flex items-center gap-4">
          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: "white",
              color: "#4f46e5",
            }}
          >
            <StorefrontIcon sx={{ fontSize: 30 }} />
          </Avatar>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
               Category-wise Summary
            </h1>
            <p className="text-white/80 text-sm mt-1">
              Total Categories: {categoryData.length} | Total Stock: {totalStock} | Total Value: ₹
              {totalValue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Charts ──────────────────────────────────── */}
      <Grid container spacing={3}>
        {/* Bar Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper className="shadow-md p-4">
            <Typography variant="h6" align="center" className="mb-3 font-bold">
               Category Stock (Qty)
            </Typography>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" tickFormatter={(value) => formatOrderId(value)} />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="totalStock"
                    fill="#82ca9d"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper className="shadow-md p-4">
            <Typography variant="h6" align="center" className="mb-3 font-bold">
               Stock Distribution
            </Typography>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="totalStock"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {categoryData.map((_: CategoryDataItem, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
      </Grid>

      {/* ─── Table ───────────────────────────────────── */}
      <Paper className="shadow-md overflow-hidden">
        <div className="p-4 bg-gray-100 border-b">
          <Typography variant="h6" className="font-bold">
             Category Breakdown
          </Typography>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="bg-indigo-600">
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Category
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Total Stock
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Total Value (₹)
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  % of Stock
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryData.map((item: CategoryDataItem) => (
                <TableRow key={item._id} className="hover:bg-gray-50">
                  <TableCell className="font-bold">
                    {formatOrderId(item._id || "Uncategorized")}
                  </TableCell>
                  <TableCell align="right">{item.totalStock}</TableCell>
                  <TableCell
                    align="right"
                    className="font-bold text-indigo-600"
                  >
                    ₹{(item.totalValue || 0).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {totalStock > 0
                      ? ((item.totalStock / totalStock) * 100).toFixed(2)
                      : 0}
                    %
                  </TableCell>
                </TableRow>
              ))}

              {/* Total Row */}
              <TableRow className="bg-indigo-50">
                <TableCell className="font-bold">TOTAL</TableCell>
                <TableCell align="right" className="font-bold text-green-700">
                  {totalStock}
                </TableCell>
                <TableCell align="right" className="font-bold text-indigo-700">
                  ₹{totalValue.toFixed(2)}
                </TableCell>
                <TableCell align="right" className="font-bold">
                  100%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default InventorySummaryReport;