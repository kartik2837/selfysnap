// // src/pages/reports/SalesReport.tsx

// import React, { useState, useEffect } from "react";
// import {
//     Grid,
//     TextField,
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
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     ResponsiveContainer,
// } from "recharts";
// import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
// import { getSalesReportData } from "../../../../Redux Toolkit/Seller/report.slice";

// const SalesReport: React.FC = () => {
//     const dispatch = useAppDispatch();
//     const { salesData, salesLoading, salesError } = useAppSelector(
//         (state) => state.report
//     );

//     const [startDate, setStartDate] = useState<string>("");
//     const [endDate, setEndDate] = useState<string>("");

//     useEffect(() => {
//         const today = new Date();
//         const lastWeek = new Date(today);
//         lastWeek.setDate(today.getDate() - 7);
//         setStartDate(lastWeek.toISOString().split("T")[0]);
//         setEndDate(today.toISOString().split("T")[0]);
//     }, []);

//     useEffect(() => {
//         if (startDate && endDate) {
//             dispatch(getSalesReportData({ startDate, endDate }));
//         }
//     }, [startDate, endDate, dispatch]);

//     if (salesLoading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <CircularProgress />
//             </div>
//         );
//     }

//     if (salesError) {
//         return (
//             <div className="p-4">
//                 <Alert severity="error">{salesError}</Alert>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 bg-gray-50 min-h-screen">
//             <Typography variant="h4" className="mb-4 font-bold">
//                 📈 Sales Report
//             </Typography>

//             <Grid container spacing={2} className="mb-6">
//                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                     <TextField
//                         label="Start Date"
//                         type="date"
//                         value={startDate}
//                         onChange={(e) => setStartDate(e.target.value)}
//                         fullWidth
//                         InputLabelProps={{ shrink: true }}
//                     />
//                 </Grid>
//                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                     <TextField
//                         label="End Date"
//                         type="date"
//                         value={endDate}
//                         onChange={(e) => setEndDate(e.target.value)}
//                         fullWidth
//                         InputLabelProps={{ shrink: true }}
//                     />
//                 </Grid>
//             </Grid>

//             {salesData.length === 0 ? (
//                 <Alert severity="info">No data found for selected dates</Alert>
//             ) : (
//                 <>
//                     {/* Chart */}
//                     <Card className="mb-6 shadow-md">
//                         <CardContent style={{ height: 300 }}>
//                             <Typography variant="h6" align="center" className="mb-2">
//                                 Sales Trend
//                             </Typography>
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <LineChart data={salesData}>
//                                     <CartesianGrid strokeDasharray="3 3" />
//                                     <XAxis dataKey="_id" />
//                                     <YAxis />
//                                     <Tooltip />
//                                     <Line
//                                         type="monotone"
//                                         dataKey="totalSales"
//                                         stroke="#8884d8"
//                                         strokeWidth={2}
//                                     />
//                                 </LineChart>
//                             </ResponsiveContainer>
//                         </CardContent>
//                     </Card>

//                     {/* Table */}
//                     <TableContainer component={Paper} className="shadow-md">
//                         <Table>
//                             <TableHead>
//                                 <TableRow className="bg-gray-200">
//                                     <TableCell>Date</TableCell>
//                                     <TableCell align="right">Orders</TableCell>
//                                     <TableCell align="right">Total Sales (₹)</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {salesData.map((item) => (
//                                     <TableRow key={item._id} className="hover:bg-gray-50">
//                                         <TableCell>{item._id}</TableCell>
//                                         <TableCell align="right">{item.orderCount}</TableCell>
//                                         <TableCell align="right" className="font-bold">
//                                             ₹{item.totalSales}
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </>
//             )}
//         </div>
//     );
// };

// export default SalesReport;







// src/pages/reports/SalesReport.tsx

import React, { useState, useEffect, useMemo } from "react";
import { formatOrderId } from "../../../../util/formatOrderId";
import {
  Grid,
  TextField,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
} from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import DownloadIcon from "@mui/icons-material/Download";
import StorefrontIcon from "@mui/icons-material/Storefront";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CalculateIcon from "@mui/icons-material/Calculate";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
import { getSalesReportData } from "../../../../Redux Toolkit/Seller/report.slice";

// ─── Custom Tooltip ────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-slate-900/95 border border-slate-700 shadow-2xl px-4 py-3 backdrop-blur-md">
        <p className="text-white font-semibold text-sm mb-1">📅 {label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}:{" "}
            <span className="font-bold">
              {entry.name.toLowerCase().includes("sales")
                ? `₹${Number(entry.value).toLocaleString("en-IN")}`
                : entry.value}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const SalesReport: React.FC = () => {
  const dispatch = useAppDispatch();
  const { salesData, salesLoading, salesError } = useAppSelector(
    (state) => state.report
  );
  const { sellers } = useAppSelector((store) => store);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // ─── Business Name ─────────────────────────────────
  const businessName =
    sellers.profile?.businessDetails?.businessName ||
  
    sellers.profile?.sellerName ||
    "Mr. Thind Store";

  useEffect(() => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    setStartDate(lastWeek.toISOString().split("T")[0]);
    setEndDate(today.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(getSalesReportData({ startDate, endDate }));
    }
  }, [startDate, endDate, dispatch]);

  // ─── Summary Calculations ─────────────────────────
  const { totalSales, totalOrders, avgOrderValue } = useMemo(() => {
    const totalSales = salesData.reduce(
      (sum, item) => sum + (item.totalSales || 0),
      0
    );
    const totalOrders = salesData.reduce(
      (sum, item) => sum + (item.orderCount || 0),
      0
    );
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    return { totalSales, totalOrders, avgOrderValue };
  }, [salesData]);

  // ─── Excel/CSV Download ────────────────────────────
  const handleDownloadExcel = () => {
    if (salesData.length === 0) return;

    // CSV Header
    const headers = ["Date", "Total Orders", "Total Sales (₹)", "Avg Order Value (₹)"];

    // CSV Rows
    const rows = salesData.map((item) => {
      const avg =
        item.orderCount > 0 ? (item.totalSales / item.orderCount).toFixed(2) : "0";
      return [item._id, item.orderCount, item.totalSales, avg];
    });

    // Summary Row
    const summaryRow = [
      "TOTAL",
      totalOrders,
      totalSales.toFixed(2),
      avgOrderValue.toFixed(2),
    ];

    // CSV Content
    const csvContent = [
      [`${businessName} - Sales Report`],
      [`Period: ${startDate} to ${endDate}`],
      [`Generated on: ${new Date().toLocaleString("en-IN")}`],
      [], // Empty line
      headers,
      ...rows,
      [], // Empty line
      summaryRow,
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    // Download
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${businessName.replace(/\s+/g, "_")}_Sales_Report_${startDate}_to_${endDate}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // ─── Loading ────────────────────────────────────────
  if (salesLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <CircularProgress size={50} />
        <p className="text-gray-500">Loading sales data...</p>
      </div>
    );
  }

  // ─── Error ──────────────────────────────────────────
  if (salesError) {
    return (
      <div className="p-6">
        <Alert severity="error">{salesError}</Alert>
      </div>
    );
  }

  // ─── Summary Cards Data ────────────────────────────
  const summaryCards = [
    {
      icon: <TrendingUpIcon />,
      title: "Total Sales",
      value: `₹${totalSales.toLocaleString("en-IN")}`,
      bg: "from-purple-500 to-purple-700",
      iconBg: "bg-purple-600",
    },
    {
      icon: <ShoppingBagIcon />,
      title: "Total Orders",
      value: totalOrders,
      bg: "from-green-500 to-green-700",
      iconBg: "bg-green-600",
    },
    {
      icon: <CalculateIcon />,
      title: "Avg Order Value",
      value: `₹${avgOrderValue.toFixed(2)}`,
      bg: "from-blue-500 to-blue-700",
      iconBg: "bg-blue-600",
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
                📈 Sales Report
              </p>
              <p className="text-white/70 text-xs mt-1">
                {startDate && endDate
                  ? `${startDate} → ${endDate}`
                  : "Select date range"}
              </p>
            </div>
          </div>

          <Button
            onClick={handleDownloadExcel}
            variant="contained"
            disabled={salesData.length === 0}
            startIcon={<DownloadIcon />}
            sx={{
              bgcolor: "white",
              color: "#4f46e5",
              fontWeight: "bold",
              textTransform: "none",
              px: 3,
              py: 1.2,
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              "&:hover": {
                bgcolor: "#f3f4f6",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Download Excel
          </Button>
        </div>
      </div>

      {/* ─── Date Filters ─────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <p className="text-xs text-gray-500 text-center md:text-right">
              Showing data for{" "}
              <span className="font-bold text-indigo-600">
                {salesData.length}
              </span>{" "}
              day(s)
            </p>
          </Grid>
        </Grid>
      </div>

      {/* ─── No Data Message ──────────────────────────── */}
      {salesData.length === 0 ? (
        <Alert severity="info" className="rounded-xl">
          No sales data found for the selected date range.
        </Alert>
      ) : (
        <>
          {/* ─── Summary Cards ───────────────────────── */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
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

          {/* ─── Chart ────────────────────────────────── */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-black p-5 lg:p-8 shadow-2xl border border-slate-700">
            <div className="mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                📊 Sales Trend
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Daily sales performance over the selected period
              </p>
            </div>

            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient
                      id="colorSales"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorOrders"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="#334155"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="_id"
                    stroke="#94a3b8"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    axisLine={{ stroke: "#334155" }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    axisLine={{ stroke: "#334155" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ color: "#cbd5e1", paddingTop: 10 }}
                  />

                  <Area
                    type="monotone"
                    dataKey="totalSales"
                    name="Sales (₹)"
                    stroke="#a78bfa"
                    strokeWidth={3}
                    fill="url(#colorSales)"
                    dot={{
                      r: 4,
                      fill: "#a78bfa",
                      strokeWidth: 2,
                      stroke: "#1e1b4b",
                    }}
                    activeDot={{
                      r: 7,
                      fill: "#a78bfa",
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                    animationDuration={1500}
                  />
                  <Area
                    type="monotone"
                    dataKey="orderCount"
                    name="Orders"
                    stroke="#34d399"
                    strokeWidth={3}
                    fill="url(#colorOrders)"
                    dot={{
                      r: 4,
                      fill: "#34d399",
                      strokeWidth: 2,
                      stroke: "#064e3b",
                    }}
                    activeDot={{
                      r: 7,
                      fill: "#34d399",
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                    animationDuration={1800}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ─── Table ────────────────────────────────── */}
          <div className="rounded-2xl bg-white shadow-lg overflow-hidden border border-gray-100">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  📋 Detailed Sales Data
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Day-wise breakdown of your sales
                </p>
              </div>
              <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-3 py-1 rounded-full">
                {salesData.length} records
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
                      Date
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Orders
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Total Sales (₹)
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Avg Order Value (₹)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesData.map((item, index) => {
                    const avg =
                      item.orderCount > 0
                        ? (item.totalSales / item.orderCount).toFixed(2)
                        : "0";
                    return (
                      <TableRow
                        key={item._id}
                        sx={{
                          "&:hover": { backgroundColor: "#f9fafb" },
                          "&:nth-of-type(odd)": {
                            backgroundColor: "#fafafa",
                          },
                          animation: `fadeIn 0.4s ease-out ${index * 0.03}s both`,
                        }}
                      >
                        <TableCell className="font-medium text-gray-700">
                          {item._id}
                        </TableCell>
                        <TableCell align="right" className="text-gray-700">
                          {item.orderCount}
                        </TableCell>
                        <TableCell
                          align="right"
                          className="font-bold text-indigo-600"
                        >
                          ₹{item.totalSales.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell align="right" className="text-gray-600">
                          ₹{Number(avg).toLocaleString("en-IN")}
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {/* ─── Summary Row ──────────────────── */}
                  <TableRow
                    sx={{
                      background:
                        "linear-gradient(90deg, #eef2ff 0%, #f3e8ff 100%)",
                      borderTop: "2px solid #4f46e5",
                    }}
                  >
                    <TableCell className="font-bold text-gray-800">
                      TOTAL
                    </TableCell>
                    <TableCell
                      align="right"
                      className="font-bold text-green-600"
                    >
                      {totalOrders}
                    </TableCell>
                    <TableCell
                      align="right"
                      className="font-bold text-indigo-700 text-lg"
                    >
                      ₹{totalSales.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell
                      align="right"
                      className="font-bold text-blue-600"
                    >
                      ₹{avgOrderValue.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}

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

export default SalesReport;