







// import React, { useEffect, useState, useMemo } from "react";
// import { Box, Typography, Chip } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import PaymentsIcon from "@mui/icons-material/Payments";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import TrendingDownIcon from "@mui/icons-material/TrendingDown";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import PeopleIcon from "@mui/icons-material/People";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import { useAppSelector } from "../../../Redux Toolkit/Store";
// import {
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,

// } from "recharts";

// // ═══════════════════════════════════════════════════
// //  Animated Counter Hook
// // ═══════════════════════════════════════════════════
// const useCountUp = (end: number, duration: number = 1200) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let startTime: number | null = null;
//     let animationFrame: number;

//     const animate = (currentTime: number) => {
//       if (!startTime) startTime = currentTime;
//       const progress = Math.min((currentTime - startTime) / duration, 1);
//       setCount(Math.floor(progress * end));

//       if (progress < 1) {
//         animationFrame = requestAnimationFrame(animate);
//       }
//     };

//     animationFrame = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(animationFrame);
//   }, [end, duration]);

//   return count;
// };

// // ═══════════════════════════════════════════════════
// // 🎴 Stat Card Component
// // ═══════════════════════════════════════════════════
// interface StatCardProps {
//   icon: React.ReactNode;
//   title: string;
//   value: number | string;
//   subtitle?: string;
//   gradient: string;
//   iconBg: string;
//   trend?: number;
//   isCurrency?: boolean;
//   delay?: number;
// }

// const StatCard: React.FC<StatCardProps> = ({
//   icon,
//   title,
//   value,
//   subtitle,
//   gradient,
//   iconBg,
//   trend,
//   isCurrency = false,
//   delay = 0,
// }) => {
//   const numericValue = typeof value === "number" ? value : 0;
//   const animatedValue = useCountUp(numericValue);

//   const displayValue =
//     typeof value === "number"
//       ? isCurrency
//         ? `₹${animatedValue.toLocaleString("en-IN")}`
//         : animatedValue.toLocaleString("en-IN")
//       : value;

//   return (
//     <div
//       className="relative group"
//       style={{ animation: `fadeInUp 0.6s ease-out ${delay}s both` }}
//     >
//       <div
//         className={`
//           relative overflow-hidden rounded-2xl 
//           bg-gradient-to-br ${gradient}
//           p-5 shadow-lg hover:shadow-2xl 
//           transition-all duration-500 
//           hover:-translate-y-2
//           cursor-pointer
//           border border-white/10
//         `}
//       >
//         <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
//         <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

//         <div className="relative z-10">
//           <div className="flex items-start justify-between mb-3">
//             <div
//               className={`
//                 ${iconBg} 
//                 p-3 rounded-xl shadow-lg 
//                 transition-all duration-300 
//                 group-hover:scale-110 group-hover:rotate-6
//                 border border-white/20
//               `}
//             >
//               <div className="text-white">{icon}</div>
//             </div>

//             {trend !== undefined && (
//               <div
//                 className={`
//                   flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold
//                   ${
//                     trend >= 0
//                       ? "bg-green-500/20 text-green-100 border border-green-400/30"
//                       : "bg-red-500/20 text-red-100 border border-red-400/30"
//                   }
//                 `}
//               >
//                 {trend >= 0 ? (
//                   <TrendingUpIcon sx={{ fontSize: 14 }} />
//                 ) : (
//                   <TrendingDownIcon sx={{ fontSize: 14 }} />
//                 )}
//                 {Math.abs(trend)}%
//               </div>
//             )}
//           </div>

//           <Typography className="text-white/80 text-xs uppercase tracking-wider font-bold mb-1">
//             {title}
//           </Typography>

//           <Typography
//             className="text-white text-3xl font-bold drop-shadow-lg"
//             sx={{ letterSpacing: "-0.5px" }}
//           >
//             {displayValue}
//           </Typography>

//           {subtitle && (
//             <Typography className="text-white/70 text-xs mt-2">
//               {subtitle}
//             </Typography>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ═══════════════════════════════════════════════════
// // 🎯 Custom Tooltip for Charts
// // ═══════════════════════════════════════════════════
// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-slate-900/95 border border-slate-700 rounded-lg px-4 py-3 backdrop-blur-md shadow-2xl">
//         <p className="text-white font-bold text-sm mb-1">📅 {label}</p>
//         {payload.map((entry: any, idx: number) => (
//           <p
//             key={idx}
//             className="text-xs"
//             style={{ color: entry.color }}
//           >
//             {entry.name}:{" "}
//             <span className="font-bold">
//               {entry.name.toLowerCase().includes("revenue") ||
//               entry.name.toLowerCase().includes("earning") ||
//               entry.name.toLowerCase().includes("commission")
//                 ? `₹${Number(entry.value).toLocaleString("en-IN")}`
//                 : entry.value}
//             </span>
//           </p>
//         ))}
//       </div>
//     );
//   }
//   return null;
// };

// // ═══════════════════════════════════════════════════
// // 🎯 Main Component
// // ═══════════════════════════════════════════════════
// const AdminAnalyticsCards = () => {
//   const { adminOrders, adminPayouts, adminReturns } = useAppSelector(
//     (store: any) => store
//   );

//   const orders = adminOrders?.orders || [];
//   const payoutsPending = adminPayouts?.pending || [];
//   const payoutsHistory = adminPayouts?.history || [];
//   const returns = adminReturns?.returns || [];

//   // ─── Stats ─────────────────────────────────────────
//   const totalOrders = orders.length;
//   const totalPayouts = payoutsPending.length + payoutsHistory.length;
//   const totalReturns = returns.length;
//   const pendingPayouts = payoutsPending.length;

//   const totalCommission = orders.reduce(
//     (sum: number, order: any) => sum + (order?.commissionAmount || 0),
//     0
//   );

//   const totalEarnings = orders.reduce(
//     (sum: number, order: any) => sum + (order?.totalSellingPrice || 0),
//     0
//   );

//   const totalNetEarnings = totalEarnings - totalCommission;

//   // ═══════════════════════════════════════════════════
//   // 📊 CHART DATA – Monthly Revenue (Last 6 Months)
//   // ═══════════════════════════════════════════════════
//   const monthlyData = useMemo(() => {
//     const months = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//     ];
//     const currentMonth = new Date().getMonth();
//     const data: any[] = [];

//     for (let i = 5; i >= 0; i--) {
//       const monthIndex = (currentMonth - i + 12) % 12;
//       const monthName = months[monthIndex];

//       const monthOrders = orders.filter((o: any) => {
//         const d = new Date(o.orderDate);
//         return d.getMonth() === monthIndex;
//       });

//       const revenue = monthOrders.reduce(
//         (sum: number, o: any) => sum + (o.totalSellingPrice || 0),
//         0
//       );
//       const commission = monthOrders.reduce(
//         (sum: number, o: any) => sum + (o.commissionAmount || 0),
//         0
//       );
//       const net = revenue - commission;

//       data.push({
//         month: monthName,
//         revenue,
//         commission,
//         net,
//         orders: monthOrders.length,
//       });
//     }

//     return data;
//   }, [orders]);

//   // ═══════════════════════════════════════════════════
//   // 🥧 PIE DATA – Order Distribution
//   // ═══════════════════════════════════════════════════
//   const pieData = [
//     { name: "Completed", value: orders.filter((o: any) => o.orderStatus === "DELIVERED").length, color: "#10b981" },
//     { name: "Pending", value: orders.filter((o: any) => o.orderStatus === "PENDING").length, color: "#f59e0b" },
//     { name: "Shipped", value: orders.filter((o: any) => o.orderStatus === "SHIPPED").length, color: "#3b82f6" },
//     { name: "Cancelled", value: orders.filter((o: any) => o.orderStatus === "CANCELLED").length, color: "#ef4444" },
//   ].filter((d) => d.value > 0);

//   // ═══════════════════════════════════════════════════
//   // 📈 WEEKLY DATA – Last 7 Days
//   // ═══════════════════════════════════════════════════
//   const weeklyData = useMemo(() => {
//     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     const data: any[] = [];

//     for (let i = 6; i >= 0; i--) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       const dayName = days[date.getDay()];
//       const dayDate = date.toDateString();

//       const dayOrders = orders.filter((o: any) => {
//         return new Date(o.orderDate).toDateString() === dayDate;
//       });

//       const revenue = dayOrders.reduce(
//         (sum: number, o: any) => sum + (o.totalSellingPrice || 0),
//         0
//       );

//       data.push({
//         day: dayName,
//         revenue,
//         orders: dayOrders.length,
//       });
//     }

//     return data;
//   }, [orders]);

//   // ═══════════════════════════════════════════════════
//   // 📊 CARDS DATA
//   // ═══════════════════════════════════════════════════
//   const cards = [
//     {
//       icon: <ShoppingCartIcon sx={{ fontSize: 24 }} />,
//       title: "Total Orders",
//       value: totalOrders,
//       subtitle: " All time orders",
//       gradient: "from-indigo-600 via-indigo-700 to-purple-700",
//       iconBg: "bg-indigo-500",
//       trend: 12,
//       delay: 0,
//     },
//     {
//       icon: <AssignmentReturnIcon sx={{ fontSize: 24 }} />,
//       title: "Return Requests",
//       value: totalReturns,
//       subtitle: "↩️ Pending returns",
//       gradient: "from-red-600 via-red-700 to-pink-700",
//       iconBg: "bg-red-500",
//       trend: -5,
//       delay: 0.1,
//     },
//     {
//       icon: <PaymentsIcon sx={{ fontSize: 24 }} />,
//       title: "Total Payouts",
//       value: totalPayouts,
//       subtitle: `⏳ ${pendingPayouts} pending`,
//       gradient: "from-blue-600 via-blue-700 to-cyan-700",
//       iconBg: "bg-blue-500",
//       trend: 8,
//       delay: 0.2,
//     },
//     {
//       icon: <CurrencyRupeeIcon sx={{ fontSize: 24 }} />,
//       title: "Total Commission",
//       value: totalCommission,
//       subtitle: ` Net: ₹${totalNetEarnings.toLocaleString("en-IN")}`,
//       gradient: "from-emerald-600 via-emerald-700 to-teal-700",
//       iconBg: "bg-emerald-500",
//       trend: 15,
//       isCurrency: true,
//       delay: 0.3,
//     },
//     {
//       icon: <AccountBalanceWalletIcon sx={{ fontSize: 24 }} />,
//       title: "Total Earnings",
//       value: totalEarnings,
//       subtitle: " Gross earnings",
//       gradient: "from-purple-600 via-purple-700 to-fuchsia-700",
//       iconBg: "bg-purple-500",
//       trend: 10,
//       isCurrency: true,
//       delay: 0.4,
//     },
//   ];

//   return (
//     <>
//       <style>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes shimmer {
//           0% { background-position: -200% 0; }
//           100% { background-position: 200% 0; }
//         }
//         @keyframes pulse-dot {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(1.2); }
//         }
//         @keyframes slideInLeft {
//           from { opacity: 0; transform: translateX(-20px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//       `}</style>

//       <div className="space-y-6">
//         {/* ═══════════════════════════════════════════════ */}
//         {/* HEADER */}
//         {/* ═══════════════════════════════════════════════ */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
//           <div>
//             <div className="flex items-center gap-3">
//               <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" />
//               <Typography
//   variant="h5"
//   className="font-bold flip-color-text"
// >
//    Welcome Selfysnap Admin Panel
// </Typography>

// <style>{`
//   @keyframes color-cycle {
//     0% { color: #4f46e5; transform: scale(1); }
//     25% { color: #7c3aed; transform: scale(1.02); }
//     50% { color: #ec4899; transform: scale(1); }
//     75% { color: #f59e0b; transform: scale(1.02); }
//     100% { color: #4f46e5; transform: scale(1); }
//   }
//   .flip-color-text {
//     animation: color-cycle 4s ease-in-out infinite;
//     font-size: 1.6rem;
//     letter-spacing: 1px;
//     font-weight: 800;
//     transition: all 0.3s;
//   }
// `}</style>
//             </div>
//             {/* <Typography className="text-gray-500 text-sm mt-1 ml-15">
//               आपके Store की पूरी Performance एक नज़र में
//             </Typography> */}
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
//               <div
//                 className="w-2 h-2 bg-green-500 rounded-full"
//                 style={{ animation: "pulse-dot 2s infinite" }}
//               />
//               <span className="text-xs font-bold text-green-700">
//                 Live Data
//               </span>
//             </div>
//             <Chip
//               label={`Last Updated: ${new Date().toLocaleTimeString("en-IN", {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}`}
//               size="small"
//               sx={{ bgcolor: "#eef2ff", color: "#4f46e5", fontWeight: "bold" }}
//             />
//           </div>
//         </div>

//         {/* ═══════════════════════════════════════════════ */}
//         {/* STATS CARDS */}
//         {/* ═══════════════════════════════════════════════ */}
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr",
//               sm: "repeat(2, 1fr)",
//               md: "repeat(3, 1fr)",
//               lg: "repeat(5, 1fr)",
//             },
//             gap: 2.5,
//           }}
//         >
//           {cards.map((card, index) => (
//             <StatCard key={index} {...card} />
//           ))}
//         </Box>

//         {/* ═══════════════════════════════════════════════ */}
//         {/* CHARTS SECTION */}
//         {/* ═══════════════════════════════════════════════ */}

//         {/* Row 1: Revenue Chart (Full Width) */}
//         <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-2xl border border-slate-700">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-6">
//             <div>
//               <Typography className="text-white text-xl font-bold flex items-center gap-2">
//                 Revenue Trend (Last 6 Months)
//               </Typography>
//               <Typography className="text-slate-400 text-xs mt-1">
//                 Monthly Revenue, Commission और Net Earnings
//               </Typography>
//             </div>

//             <div className="flex gap-3">
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full bg-indigo-500" />
//                 <span className="text-xs text-slate-300">Revenue</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full bg-red-500" />
//                 <span className="text-xs text-slate-300">Commission</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full bg-emerald-500" />
//                 <span className="text-xs text-slate-300">Net</span>
//               </div>
//             </div>
//           </div>

//           <div style={{ height: 350 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={monthlyData}>
//                 <defs>
//                   <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
//                     <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
//                   </linearGradient>
//                   <linearGradient id="colorCommission" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
//                     <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
//                   </linearGradient>
//                   <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
//                     <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="4 4" stroke="#334155" vertical={false} />
//                 <XAxis
//                   dataKey="month"
//                   stroke="#94a3b8"
//                   tick={{ fill: "#94a3b8", fontSize: 12 }}
//                 />
//                 <YAxis
//                   stroke="#94a3b8"
//                   tick={{ fill: "#94a3b8", fontSize: 12 }}
//                   tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
//                 />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Area
//                   type="monotone"
//                   dataKey="revenue"
//                   name="Revenue"
//                   stroke="#6366f1"
//                   strokeWidth={3}
//                   fill="url(#colorRevenue)"
//                   animationDuration={1500}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="commission"
//                   name="Commission"
//                   stroke="#ef4444"
//                   strokeWidth={3}
//                   fill="url(#colorCommission)"
//                   animationDuration={1800}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="net"
//                   name="Net Earnings"
//                   stroke="#10b981"
//                   strokeWidth={3}
//                   fill="url(#colorNet)"
//                   animationDuration={2100}
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Row 2: Weekly + Pie (2 columns) */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Weekly Bar Chart */}
//           <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-2xl border border-slate-700">
//             <div className="mb-6">
//               <Typography className="text-white text-lg font-bold flex items-center gap-2">
//                  Weekly Revenue
//               </Typography>
//               <Typography className="text-slate-400 text-xs mt-1">
//                 Last 7 Days Performance
//               </Typography>
//             </div>

//             <div style={{ height: 280 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={weeklyData}>
//                   <defs>
//                     <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="0%" stopColor="#a78bfa" stopOpacity={1} />
//                       <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.6} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid strokeDasharray="4 4" stroke="#334155" vertical={false} />
//                   <XAxis
//                     dataKey="day"
//                     stroke="#94a3b8"
//                     tick={{ fill: "#94a3b8", fontSize: 12 }}
//                   />
//                   <YAxis
//                     stroke="#94a3b8"
//                     tick={{ fill: "#94a3b8", fontSize: 12 }}
//                     tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
//                   />
//                   <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
//                   <Bar
//                     dataKey="revenue"
//                     name="Revenue"
//                     fill="url(#barGradient)"
//                     radius={[8, 8, 0, 0]}
//                     animationDuration={1200}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Pie Chart */}
//           <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-2xl border border-slate-700">
//             <div className="mb-4">
//               <Typography className="text-white text-lg font-bold flex items-center gap-2">
//                  Order Status
//               </Typography>
//               <Typography className="text-slate-400 text-xs mt-1">
//                 Distribution by Status
//               </Typography>
//             </div>

//             <div style={{ height: 220 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={pieData.length > 0 ? pieData : [{ name: "No Data", value: 1, color: "#334155" }]}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={45}
//                     outerRadius={80}
//                     paddingAngle={3}
//                     animationDuration={1200}
//                   >
//                     {(pieData.length > 0 ? pieData : [{ color: "#334155" }]).map(
//                       (entry: any, index: number) => (
//                         <Cell
//                           key={index}
//                           fill={entry.color}
//                           stroke="#0f172a"
//                           strokeWidth={2}
//                         />
//                       )
//                     )}
//                   </Pie>
//                   <Tooltip content={<CustomTooltip />} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Legend */}
//             <div className="grid grid-cols-2 gap-2 mt-2">
//               {pieData.map((d: any) => (
//                 <div key={d.name} className="flex items-center gap-2">
//                   <div
//                     className="w-3 h-3 rounded-full"
//                     style={{ backgroundColor: d.color }}
//                   />
//                   <span className="text-xs text-slate-300">
//                     {d.name}: <strong className="text-white">{d.value}</strong>
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Row 3: Orders Trend Line Chart + Summary */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Orders Line Chart */}
//           <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-2xl border border-slate-700">
//             <div className="mb-6">
//               <Typography className="text-white text-lg font-bold flex items-center gap-2">
//                  Orders Trend (6 Months)
//               </Typography>
//               <Typography className="text-slate-400 text-xs mt-1">
//                 Monthly Order Count
//               </Typography>
//             </div>

//             <div style={{ height: 250 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={monthlyData}>
//                   <CartesianGrid strokeDasharray="4 4" stroke="#334155" vertical={false} />
//                   <XAxis
//                     dataKey="month"
//                     stroke="#94a3b8"
//                     tick={{ fill: "#94a3b8", fontSize: 12 }}
//                   />
//                   <YAxis
//                     stroke="#94a3b8"
//                     tick={{ fill: "#94a3b8", fontSize: 12 }}
//                   />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Line
//                     type="monotone"
//                     dataKey="orders"
//                     name="Orders"
//                     stroke="#f59e0b"
//                     strokeWidth={3}
//                     dot={{ r: 5, fill: "#f59e0b", strokeWidth: 2, stroke: "#0f172a" }}
//                     activeDot={{ r: 8, fill: "#f59e0b", stroke: "#fff", strokeWidth: 2 }}
//                     animationDuration={1500}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Summary Card */}
//           <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 shadow-2xl border border-white/10">
//             <Typography className="text-white text-lg font-bold flex items-center gap-2 mb-4">
//                Quick Summary
//             </Typography>

//             <div className="space-y-3">
//               <div className="bg-white/10 backdrop-blur rounded-xl p-3 flex justify-between items-center">
//                 <div className="flex items-center gap-2">
//                   <PeopleIcon className="text-white" sx={{ fontSize: 20 }} />
//                   <span className="text-white text-sm font-medium">
//                     Total Orders
//                   </span>
//                 </div>
//                 <span className="text-white font-bold text-lg">
//                   {totalOrders}
//                 </span>
//               </div>

//               <div className="bg-white/10 backdrop-blur rounded-xl p-3 flex justify-between items-center">
//                 <div className="flex items-center gap-2">
//                   <StorefrontIcon className="text-white" sx={{ fontSize: 20 }} />
//                   <span className="text-white text-sm font-medium">
//                     Total Payouts
//                   </span>
//                 </div>
//                 <span className="text-white font-bold text-lg">
//                   {totalPayouts}
//                 </span>
//               </div>

//               <div className="bg-white/10 backdrop-blur rounded-xl p-3 flex justify-between items-center">
//                 <div className="flex items-center gap-2">
//                   <CurrencyRupeeIcon className="text-white" sx={{ fontSize: 20 }} />
//                   <span className="text-white text-sm font-medium">
//                     Total Revenue
//                   </span>
//                 </div>
//                 <span className="text-white font-bold text-lg">
//                   ₹{(totalEarnings / 1000).toFixed(1)}k
//                 </span>
//               </div>

//               <div className="bg-white/10 backdrop-blur rounded-xl p-3 flex justify-between items-center">
//                 <div className="flex items-center gap-2">
//                   <AccountBalanceWalletIcon className="text-white" sx={{ fontSize: 20 }} />
//                   <span className="text-white text-sm font-medium">
//                     Net Earnings
//                   </span>
//                 </div>
//                 <span className="text-white font-bold text-lg">
//                   ₹{(totalNetEarnings / 1000).toFixed(1)}k
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminAnalyticsCards;







import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Chip, CircularProgress } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PeopleIcon from "@mui/icons-material/People";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useAppSelector } from "../../../Redux Toolkit/Store";
import { api } from "../../../Config/Api";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ═══════════════════════════════════════════════════
//  Animated Counter Hook
// ═══════════════════════════════════════════════════
const useCountUp = (end: number, duration: number = 1200) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
};

// ═══════════════════════════════════════════════════
// 🎴 Stat Card Component
// ═══════════════════════════════════════════════════
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  subtitle?: string;
  gradient: string;
  iconBg: string;
  trend?: number;
  isCurrency?: boolean;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  gradient,
  iconBg,
  trend,
  isCurrency = false,
  delay = 0,
}) => {
  const numericValue = typeof value === "number" ? value : 0;
  const animatedValue = useCountUp(numericValue);

  const displayValue =
    typeof value === "number"
      ? isCurrency
        ? `₹${animatedValue.toLocaleString("en-IN")}`
        : animatedValue.toLocaleString("en-IN")
      : value;

  return (
    <div
      className="relative group"
      style={{ animation: `fadeInUp 0.6s ease-out ${delay}s both` }}
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl 
          bg-gradient-to-br ${gradient}
          p-5 shadow-lg hover:shadow-2xl 
          transition-all duration-500 hover:-translate-y-2
          cursor-pointer border border-white/10
        `}
      >
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div
              className={`${iconBg} p-3 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 border border-white/20`}
            >
              <div className="text-white">{icon}</div>
            </div>

            {trend !== undefined && (
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                  trend >= 0
                    ? "bg-green-500/20 text-green-100 border border-green-400/30"
                    : "bg-red-500/20 text-red-100 border border-red-400/30"
                }`}
              >
                {trend >= 0 ? (
                  <TrendingUpIcon sx={{ fontSize: 14 }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 14 }} />
                )}
                {Math.abs(trend)}%
              </div>
            )}
          </div>

          <Typography className="text-white/80 text-xs uppercase tracking-wider font-bold mb-1">
            {title}
          </Typography>

          <Typography
            className="text-white text-3xl font-bold drop-shadow-lg"
            sx={{ letterSpacing: "-0.5px" }}
          >
            {displayValue}
          </Typography>

          {subtitle && (
            <Typography className="text-white/70 text-xs mt-2">
              {subtitle}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════
// Custom Tooltip
// ═══════════════════════════════════════════════════
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border border-slate-700 rounded-lg px-4 py-3 backdrop-blur-md shadow-2xl">
        <p className="text-white font-bold text-sm mb-1">📅 {label}</p>
        {payload.map((entry: any, idx: number) => (
          <p key={idx} className="text-xs" style={{ color: entry.color }}>
            {entry.name}:{" "}
            <span className="font-bold">
              {entry.name.toLowerCase().includes("revenue") ||
              entry.name.toLowerCase().includes("earning") ||
              entry.name.toLowerCase().includes("commission")
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

// ═══════════════════════════════════════════════════
// 🎯 Main Component
// ═══════════════════════════════════════════════════
const AdminAnalyticsCards = () => {
  /* ─── Redux state (if available) ─── */
  const { adminOrders, adminPayouts, adminReturns } = useAppSelector(
    (store: any) => store
  );

  /* ─── Local state for fetched data ─── */
  const [orders, setOrders] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [returns, setReturns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* 🔥 Fetch data directly with axios (no slice dependency) */
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const jwt = localStorage.getItem("jwt") || "";

        console.log("════════════════════════════════════════");
        console.log("🔵 [DASHBOARD] Fetching data...");
        console.log("════════════════════════════════════════");

        /* 🔥 Orders */
        try {
          const ordersRes = await api.get("/admin/orders", {
            headers: { Authorization: `Bearer ${jwt}` },
          });
          console.log("✅ Orders response:", ordersRes.data);

          const ordersData =
            ordersRes.data?.orders ||
            ordersRes.data?.content ||
            (Array.isArray(ordersRes.data) ? ordersRes.data : []);
          setOrders(ordersData);
        } catch (err: any) {
          console.error("❌ Orders fetch failed:", err.message);
        }

        /* 🔥 Payouts */
        try {
          const payoutsRes = await api.get("/payouts/admin", {
            headers: { Authorization: `Bearer ${jwt}` },
          });
          console.log("✅ Payouts response:", payoutsRes.data);

          const payoutsData =
            payoutsRes.data?.payouts ||
            payoutsRes.data?.history ||
            (Array.isArray(payoutsRes.data) ? payoutsRes.data : []);
          setPayouts(payoutsData);
        } catch (err: any) {
          console.error("❌ Payouts fetch failed:", err.message);
        }

        /* 🔥 Returns */
        try {
          const returnsRes = await api.get("/api/returns", {
            headers: { Authorization: `Bearer ${jwt}` },
          });
          console.log("✅ Returns response:", returnsRes.data);

          const returnsData =
            returnsRes.data?.returns ||
            (Array.isArray(returnsRes.data) ? returnsRes.data : []);
          setReturns(returnsData);
        } catch (err: any) {
          console.error("❌ Returns fetch failed:", err.message);
        }

        console.log("════════════════════════════════════════");
        console.log("✅ [DASHBOARD] Fetch complete");
        console.log("════════════════════════════════════════");
      } catch (err) {
        console.error("❌ [DASHBOARD] Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  /* 🔥 Fallback to Redux state if axios failed */
  useEffect(() => {
    if (orders.length === 0 && adminOrders?.orders?.length > 0) {
      console.log("🔵 Using Redux orders:", adminOrders.orders.length);
      setOrders(adminOrders.orders);
    }
    if (payouts.length === 0 && adminPayouts?.history?.length > 0) {
      console.log("🔵 Using Redux payouts:", adminPayouts.history.length);
      setPayouts([
        ...(adminPayouts.pending || []),
        ...(adminPayouts.history || []),
      ]);
    }
    if (returns.length === 0 && adminReturns?.returns?.length > 0) {
      console.log("🔵 Using Redux returns:", adminReturns.returns.length);
      setReturns(adminReturns.returns);
    }
  }, [adminOrders, adminPayouts, adminReturns]);

  // ─── Stats ─────────────────────────────────────────
  const totalOrders = orders.length;
  const totalPayouts = payouts.length;
  const totalReturns = returns.length;
  const pendingPayouts = payouts.filter(
    (p: any) => p.status === "PENDING" || p.status === "pending"
  ).length;

  const totalCommission = orders.reduce(
    (sum: number, order: any) => sum + (order?.commissionAmount || 0),
    0
  );

  const totalEarnings = orders.reduce(
    (sum: number, order: any) => sum + (order?.totalSellingPrice || 0),
    0
  );

  const totalNetEarnings = totalEarnings - totalCommission;

  // ═══════════════════════════════════════════════════
  // 📊 Monthly Data
  // ═══════════════════════════════════════════════════
  const monthlyData = useMemo(() => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const currentMonth = new Date().getMonth();
    const data: any[] = [];

    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const monthName = months[monthIndex];

      const monthOrders = orders.filter((o: any) => {
        const d = new Date(o.orderDate || o.createdAt);
        return d.getMonth() === monthIndex;
      });

      const revenue = monthOrders.reduce(
        (sum: number, o: any) => sum + (o.totalSellingPrice || 0),
        0
      );
      const commission = monthOrders.reduce(
        (sum: number, o: any) => sum + (o.commissionAmount || 0),
        0
      );

      data.push({
        month: monthName,
        revenue,
        commission,
        net: revenue - commission,
        orders: monthOrders.length,
      });
    }

    return data;
  }, [orders]);

  // ═══════════════════════════════════════════════════
  // 🥧 Pie Data
  // ═══════════════════════════════════════════════════
  const pieData = [
    {
      name: "Completed",
      value: orders.filter((o: any) => o.orderStatus === "DELIVERED").length,
      color: "#10b981",
    },
    {
      name: "Pending",
      value: orders.filter((o: any) => o.orderStatus === "PENDING").length,
      color: "#f59e0b",
    },
    {
      name: "Shipped",
      value: orders.filter((o: any) => o.orderStatus === "SHIPPED").length,
      color: "#3b82f6",
    },
    {
      name: "Cancelled",
      value: orders.filter((o: any) => o.orderStatus === "CANCELLED").length,
      color: "#ef4444",
    },
  ].filter((d) => d.value > 0);

  // ═══════════════════════════════════════════════════
  // 📈 Weekly Data
  // ═══════════════════════════════════════════════════
  const weeklyData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const data: any[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayName = days[date.getDay()];
      const dayDate = date.toDateString();

      const dayOrders = orders.filter((o: any) => {
        const orderDate = new Date(o.orderDate || o.createdAt);
        return orderDate.toDateString() === dayDate;
      });

      const revenue = dayOrders.reduce(
        (sum: number, o: any) => sum + (o.totalSellingPrice || 0),
        0
      );

      data.push({
        day: dayName,
        revenue,
        orders: dayOrders.length,
      });
    }

    return data;
  }, [orders]);

  // ═══════════════════════════════════════════════════
  // 🎴 Cards
  // ═══════════════════════════════════════════════════
  const cards = [
    {
      icon: <ShoppingCartIcon sx={{ fontSize: 24 }} />,
      title: "Total Orders",
      value: totalOrders,
      subtitle: "All time orders",
      gradient: "from-indigo-600 via-indigo-700 to-purple-700",
      iconBg: "bg-indigo-500",
      trend: 12,
      delay: 0,
    },
    {
      icon: <AssignmentReturnIcon sx={{ fontSize: 24 }} />,
      title: "Return Requests",
      value: totalReturns,
      subtitle: "↩️ Pending returns",
      gradient: "from-red-600 via-red-700 to-pink-700",
      iconBg: "bg-red-500",
      trend: -5,
      delay: 0.1,
    },
    {
      icon: <PaymentsIcon sx={{ fontSize: 24 }} />,
      title: "Total Payouts",
      value: totalPayouts,
      subtitle: `⏳ ${pendingPayouts} pending`,
      gradient: "from-blue-600 via-blue-700 to-cyan-700",
      iconBg: "bg-blue-500",
      trend: 8,
      delay: 0.2,
    },
    {
      icon: <CurrencyRupeeIcon sx={{ fontSize: 24 }} />,
      title: "Total Commission",
      value: totalCommission,
      subtitle: `Net: ₹${totalNetEarnings.toLocaleString("en-IN")}`,
      gradient: "from-emerald-600 via-emerald-700 to-teal-700",
      iconBg: "bg-emerald-500",
      trend: 15,
      isCurrency: true,
      delay: 0.3,
    },
    {
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 24 }} />,
      title: "Total Earnings",
      value: totalEarnings,
      subtitle: "Gross earnings",
      gradient: "from-purple-600 via-purple-700 to-fuchsia-700",
      iconBg: "bg-purple-500",
      trend: 10,
      isCurrency: true,
      delay: 0.4,
    },
  ];

  /* 🔥 Loading State */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-3">
          <CircularProgress size={50} sx={{ color: "#6366f1" }} />
          <p className="text-gray-500 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        @keyframes color-cycle {
          0% { color: #4f46e5; }
          25% { color: #7c3aed; }
          50% { color: #ec4899; }
          75% { color: #f59e0b; }
          100% { color: #4f46e5; }
        }
        .flip-color-text {
          animation: color-cycle 4s ease-in-out infinite;
          font-size: 1.6rem;
          letter-spacing: 1px;
          font-weight: 800;
        }
      `}</style>

      <div className="space-y-6">
        {/* ═══ HEADER ═══ */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" />
              <Typography variant="h5" className="font-bold flip-color-text">
                Welcome Selfysnap Admin Panel
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
              <div
                className="w-2 h-2 bg-green-500 rounded-full"
                style={{ animation: "pulse-dot 2s infinite" }}
              />
              <span className="text-xs font-bold text-green-700">
                Live Data
              </span>
            </div>
            <Chip
              label={`Last Updated: ${new Date().toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
              size="small"
              sx={{
                bgcolor: "#eef2ff",
                color: "#4f46e5",
                fontWeight: "bold",
              }}
            />
          </div>
        </div>

        {/* ═══ DEBUG INFO (if no data) ═══ */}
        {/* {totalOrders === 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm font-bold text-amber-900 mb-2">
              ⚠️ No data found. Debug info:
            </p>
            <div className="text-xs text-amber-800 space-y-1 font-mono">
              <p>• Orders: {orders.length} items</p>
              <p>• Payouts: {payouts.length} items</p>
              <p>• Returns: {returns.length} items</p>
              <p className="pt-2 text-amber-700">
                
              </p>
            </div>
          </div>
        )} */}

        {/* ═══ STATS CARDS ═══ */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(5, 1fr)",
            },
            gap: 2.5,
          }}
        >
          {cards.map((card, index) => (
            <StatCard key={index} {...card} />
          ))}
        </Box>

        {/* ═══ REVENUE CHART ═══ */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-2xl border border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-6">
            <div>
              <Typography className="text-white text-xl font-bold">
                Revenue Trend (Last 6 Months)
              </Typography>
              <Typography className="text-slate-400 text-xs mt-1">
                Monthly Revenue, Commission और Net Earnings
              </Typography>
            </div>

            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-xs text-slate-300">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-xs text-slate-300">Commission</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-300">Net</span>
              </div>
            </div>
          </div>

          <div style={{ height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient
                    id="colorRevenue"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#6366f1"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="#6366f1"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="colorCommission"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#ef4444"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="#ef4444"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#10b981"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="#10b981"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#334155"
                  vertical={false}
                />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis
                  stroke="#94a3b8"
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="commission"
                  name="Commission"
                  stroke="#ef4444"
                  strokeWidth={3}
                  fill="url(#colorCommission)"
                />
                <Area
                  type="monotone"
                  dataKey="net"
                  name="Net Earnings"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#colorNet)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ═══ WEEKLY + PIE ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Bar */}
          <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-2xl border border-slate-700">
            <Typography className="text-white text-lg font-bold mb-4">
              Weekly Revenue
            </Typography>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <defs>
                    <linearGradient
                      id="barGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#a78bfa"
                        stopOpacity={1}
                      />
                      <stop
                        offset="100%"
                        stopColor="#7c3aed"
                        stopOpacity={0.6}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="#334155"
                    vertical={false}
                  />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis
                    stroke="#94a3b8"
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="revenue"
                    name="Revenue"
                    fill="url(#barGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-2xl border border-slate-700">
            <Typography className="text-white text-lg font-bold mb-4">
              Order Status
            </Typography>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={
                      pieData.length > 0
                        ? pieData
                        : [
                            {
                              name: "No Data",
                              value: 1,
                              color: "#334155",
                            },
                          ]
                    }
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {(pieData.length > 0
                      ? pieData
                      : [{ color: "#334155" }]
                    ).map((entry: any, index: number) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              {pieData.map((d: any) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="text-xs text-slate-300">
                    {d.name}:{" "}
                    <strong className="text-white">{d.value}</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ ORDERS TREND + SUMMARY ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-2xl border border-slate-700">
            <Typography className="text-white text-lg font-bold mb-4">
              Orders Trend (6 Months)
            </Typography>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="#334155"
                    vertical={false}
                  />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    name="Orders"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#f59e0b" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 shadow-2xl border border-white/10">
            <Typography className="text-white text-lg font-bold mb-4">
              Quick Summary
            </Typography>
            <div className="space-y-3">
              <div className="bg-white/10 backdrop-blur rounded-xl p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <PeopleIcon className="text-white" sx={{ fontSize: 20 }} />
                  <span className="text-white text-sm font-medium">
                    Total Orders
                  </span>
                </div>
                <span className="text-white font-bold text-lg">
                  {totalOrders}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <StorefrontIcon
                    className="text-white"
                    sx={{ fontSize: 20 }}
                  />
                  <span className="text-white text-sm font-medium">
                    Total Payouts
                  </span>
                </div>
                <span className="text-white font-bold text-lg">
                  {totalPayouts}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CurrencyRupeeIcon
                    className="text-white"
                    sx={{ fontSize: 20 }}
                  />
                  <span className="text-white text-sm font-medium">
                    Total Revenue
                  </span>
                </div>
                <span className="text-white font-bold text-lg">
                  ₹{(totalEarnings / 1000).toFixed(1)}k
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <AccountBalanceWalletIcon
                    className="text-white"
                    sx={{ fontSize: 20 }}
                  />
                  <span className="text-white text-sm font-medium">
                    Net Earnings
                  </span>
                </div>
                <span className="text-white font-bold text-lg">
                  ₹{(totalNetEarnings / 1000).toFixed(1)}k
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAnalyticsCards;