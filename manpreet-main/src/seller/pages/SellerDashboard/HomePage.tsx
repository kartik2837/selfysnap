// import React, { useEffect } from "react";
// import SellingChart from "./SellingChart";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { fetchSellerReport } from "../../../Redux Toolkit/Seller/sellerSlice";
// import ReportCard from "./Report/ReportCard";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import {

//   FormControl,
//   InputLabel,

//   MenuItem,
//   Select,
//   type SelectChangeEvent,

// } from "@mui/material";

// const Chart = [
//   { name: "Today", value: "today" },
//   { name: "Last 7 days", value: "daily" },
//   { name: "Last 12 Month", value: "monthly" },
// ];

// const HomePage = () => {
//   const { sellers } = useAppSelector((store) => store);
//   const dispatch = useAppDispatch();
//   const [chartType, setChartType] = React.useState(Chart[0].value);

//   useEffect(() => {
//     dispatch(fetchSellerReport(localStorage.getItem("jwt") || ""));
//   }, []);



//   const handleChange = (event: SelectChangeEvent) => {
//     setChartType(event.target.value as string);
//   };
//   return (
//     <div className="space-y-5">
//       <section className="grid grid-cols-4 gap-5">
//         <div className="col-span-4 md:col-span-2 lg:col-span-1">
//           <ReportCard
//             icon={<AccountBalanceIcon />}
//             value={"₹" + (sellers.report?.totalEarnings ?? 0)}
//             title={"Total Earnings"}
//           />
//         </div>
//         <div className="col-span-4 md:col-span-2 lg:col-span-1">
//           <ReportCard
//             icon={<AccountBalanceIcon />}
//             value={sellers.report?.totalSales ?? 0}
//             title={"Total Sales"}
//           />
//         </div>
//         <div className="col-span-4 md:col-span-2 lg:col-span-1">
//           <ReportCard
//             icon={<AccountBalanceIcon />}
//             value={sellers.report?.totalRefunds ?? 0}
//             title={"Total Refund"}
//           />
//         </div>
//         <div className="col-span-4 md:col-span-2 lg:col-span-1">
//           <ReportCard
//             icon={<AccountBalanceIcon />}
//             value={sellers.report?.canceledOrders ?? 0}
//             title={"Cancel Orders"}
//           />
//         </div>
//         <div className="col-span-4 md:col-span-2 lg:col-span-1">
//           <ReportCard
//             icon={<AccountBalanceIcon />}
//             value={"₹" + (sellers.report?.totalCommission ?? 0)}
//             title={"Total Commission"}
//           />
//         </div>
//         <div className="col-span-4 md:col-span-2 lg:col-span-1">
//           <ReportCard
//             icon={<AccountBalanceIcon />}
//             value={"₹" + (sellers.report?.netEarnings ?? 0)}
//             title={"Net Earnings"}
//           />
//         </div>
//         <div className="col-span-4 md:col-span-2 lg:col-span-1">
//           <ReportCard
//             icon={<AccountBalanceIcon />}
//             value={"₹" + (sellers.report?.pendingPayout ?? 0)}
//             title={"Pending Payout"}
//           />
//         </div>
//       </section>

//       <div className="h-[500px] space-y-10 p-5 lg:p-10 bg-slate-800 rounded-md">
//         {/* <h1 className="text-lg font-bold text-white ">Total Revanue</h1> */}
//         <div className="w-40" >
//           <FormControl sx={{ color: 'white' }} fullWidth>
//             <InputLabel sx={{ color: 'white' }} id="demo-simple-select-label">Chart Type</InputLabel>
//             <Select
//               sx={{
//                 color: 'white',
//                 '.MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//                 '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//                 '&:hover .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'white',
//                 },
//                 '.MuiSvgIcon-root': {
//                   color: 'white',
//                 },
//               }}
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={chartType}
//               label="Chart Type"
//               onChange={handleChange}
//             >
//               {Chart.map((item) => (
//                 <MenuItem value={item.value}>{item.name}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </div>

//         <div className="h-[350px]">
//           <SellingChart chartType={chartType} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;







// import React, { useEffect } from "react";
// import SellingChart from "./SellingChart";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { fetchSellerReport } from "../../../Redux Toolkit/Seller/sellerSlice";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import ReplayIcon from "@mui/icons-material/Replay";
// import CancelIcon from "@mui/icons-material/Cancel";
// import PercentIcon from "@mui/icons-material/Percent";
// import SavingsIcon from "@mui/icons-material/Savings";
// import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import VerifiedIcon from "@mui/icons-material/Verified";

// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   type SelectChangeEvent,
//   Avatar,
// } from "@mui/material";

// const Chart = [
//   { name: "Today", value: "today" },
//   { name: "Last 7 days", value: "daily" },
//   { name: "Last 12 Months", value: "monthly" },
// ];

// const HomePage = () => {
//   const { sellers } = useAppSelector((store) => store);
//   const dispatch = useAppDispatch();
//   const [chartType, setChartType] = React.useState(Chart[1].value);

//   useEffect(() => {
//     dispatch(fetchSellerReport(localStorage.getItem("jwt") || ""));
//   }, [dispatch]);

//   const handleChange = (event: SelectChangeEvent) => {
//     setChartType(event.target.value as string);
//   };

//   // ─── Business Name (Priority Order) ──────────────────
//   const businessName =
//     sellers.profile?.businessDetails?.businessName ||
   
//     sellers.profile?.sellerName ||
//     "Your Business";

//   const sellerEmail = sellers.profile?.email || "";

//   // ─── Stats Cards ─────────────────────────────────────
//   const stats = [
//     {
//       icon: <AccountBalanceIcon />,
//       value: `₹${(sellers.report?.totalEarnings ?? 0).toLocaleString("en-IN")}`,
//       title: "Total Earnings",
//       bg: "from-blue-500 to-blue-700",
//       iconBg: "bg-blue-600",
//     },
//     {
//       icon: <TrendingUpIcon />,
//       value: sellers.report?.totalSales ?? 0,
//       title: "Total Sales",
//       bg: "from-green-500 to-green-700",
//       iconBg: "bg-green-600",
//     },
//     {
//       icon: <ReplayIcon />,
//       value: sellers.report?.totalRefunds ?? 0,
//       title: "Total Refunds",
//       bg: "from-orange-500 to-orange-700",
//       iconBg: "bg-orange-600",
//     },
//     {
//       icon: <CancelIcon />,
//       value: sellers.report?.canceledOrders ?? 0,
//       title: "Cancelled Orders",
//       bg: "from-red-500 to-red-700",
//       iconBg: "bg-red-600",
//     },
//     {
//       icon: <PercentIcon />,
//       value: `₹${(sellers.report?.totalCommission ?? 0).toLocaleString("en-IN")}`,
//       title: "Total Commission",
//       bg: "from-purple-500 to-purple-700",
//       iconBg: "bg-purple-600",
//     },
//     {
//       icon: <SavingsIcon />,
//       value: `₹${(sellers.report?.netEarnings ?? 0).toLocaleString("en-IN")}`,
//       title: "Net Earnings",
//       bg: "from-teal-500 to-teal-700",
//       iconBg: "bg-teal-600",
//     },
//     {
//       icon: <HourglassEmptyIcon />,
//       value: `₹${(sellers.report?.pendingPayout ?? 0).toLocaleString("en-IN")}`,
//       title: "Pending Payout",
//       bg: "from-yellow-500 to-yellow-700",
//       iconBg: "bg-yellow-600",
//     },
//   ];

//   return (
//     <div className="space-y-6 pb-10">
//       {/* ─── Welcome Banner with Business Name ───────────── */}
//       <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 md:p-8 shadow-xl">
//         <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
//         <div className="absolute -left-8 -bottom-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

//         <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <Avatar
//               sx={{
//                 width: 68,
//                 height: 68,
//                 bgcolor: "white",
//                 color: "#4f46e5",
//                 fontWeight: "bold",
//                 fontSize: 28,
//                 boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
//               }}
//             >
//               {businessName.charAt(0).toUpperCase()}
//             </Avatar>

//             <div>
//               <div className="flex items-center gap-2">
//                 <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow">
//                   {businessName}
//                 </h1>
//                 <VerifiedIcon
//                   sx={{ color: "#4ade80", fontSize: 22 }}
//                   titleAccess="Verified Seller"
//                 />
//               </div>
//               {sellerEmail && (
//                 <p className="text-white/80 text-sm mt-1">{sellerEmail}</p>
//               )}
//               <p className="text-white/70 text-xs mt-1 flex items-center gap-1">
//                 <StorefrontIcon sx={{ fontSize: 14 }} />
//                 Welcome back to your seller dashboard 👋
//               </p>
//             </div>
//           </div>

//           <div className="text-white/90 text-sm md:text-right bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
//             <p className="font-semibold">
//               {new Date().toLocaleDateString("en-IN", {
//                 weekday: "long",
//                 day: "numeric",
//                 month: "long",
//                 year: "numeric",
//               })}
//             </p>
//             <p className="text-white/70 text-xs">Let's grow your business 🚀</p>
//           </div>
//         </div>
//       </div>

//       {/* ─── Stats Cards Grid ─────────────────────────────── */}
//       <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
//             style={{
//               animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`,
//             }}
//           >
//             <div
//               className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${stat.bg} p-5 shadow-lg text-white`}
//             >
//               <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10" />

//               <div className="flex items-start justify-between relative">
//                 <div>
//                   <p className="text-xs uppercase tracking-wider text-white/80">
//                     {stat.title}
//                   </p>
//                   <p className="text-2xl md:text-3xl font-bold mt-2 drop-shadow">
//                     {stat.value}
//                   </p>
//                 </div>

//                 <div
//                   className={`${stat.iconBg} rounded-lg p-2 shadow-md transition-transform duration-300 hover:scale-110`}
//                 >
//                   {stat.icon}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* ─── Chart Section ────────────────────────────────── */}
//       <div className="rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-black p-5 lg:p-8 shadow-2xl border border-slate-700">
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
//           <div>
//             <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
//               📈 Revenue Overview
//             </h2>
//             <p className="text-slate-400 text-sm mt-1">
//               Track your sales & earnings over time
//             </p>
//           </div>

//           <div className="w-full md:w-56">
//             <FormControl fullWidth>
//               <InputLabel sx={{ color: "white" }} id="chart-type-label">
//                 Chart Type
//               </InputLabel>
//               <Select
//                 sx={{
//                   color: "white",
//                   ".MuiOutlinedInput-notchedOutline": {
//                     borderColor: "rgba(255,255,255,0.4)",
//                   },
//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#a78bfa",
//                   },
//                   "&:hover .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "white",
//                   },
//                   ".MuiSvgIcon-root": {
//                     color: "white",
//                   },
//                 }}
//                 labelId="chart-type-label"
//                 id="chart-type"
//                 value={chartType}
//                 label="Chart Type"
//                 onChange={handleChange}
//               >
//                 {Chart.map((item) => (
//                   <MenuItem key={item.value} value={item.value}>
//                     {item.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>
//         </div>

//         <div className="h-[400px] w-full">
//           <SellingChart chartType={chartType} />
//         </div>
//       </div>

//       {/* ─── Custom Animations ────────────────────────────── */}
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
//       `}</style>
//     </div>
//   );
// };

// export default HomePage;

















import React, { useEffect } from "react";
import SellingChart from "./SellingChart";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  fetchSellerReport,
  fetchSellerProfile,
} from "../../../Redux Toolkit/Seller/sellerSlice";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ReplayIcon from "@mui/icons-material/Replay";
import CancelIcon from "@mui/icons-material/Cancel";
import PercentIcon from "@mui/icons-material/Percent";
import SavingsIcon from "@mui/icons-material/Savings";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VerifiedIcon from "@mui/icons-material/Verified";
import SellerActivationPending from "../SellerDashboard/SellerActivationPending";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Avatar,
  CircularProgress,
} from "@mui/material";

const Chart = [
  { name: "Today", value: "today" },
  { name: "Last 7 days", value: "daily" },
  { name: "Last 12 Months", value: "monthly" },
];

const HomePage = () => {
  const { sellers } = useAppSelector((store: any) => store);
  const dispatch = useAppDispatch();
  const [chartType, setChartType] = React.useState(Chart[1].value);

  // ═══════════════════════════════════════════════════
  // 🔥 FETCH BOTH PROFILE + REPORT ON MOUNT
  // ═══════════════════════════════════════════════════
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    console.log("🔵 [HomePage] Mounted. JWT:", !!jwt);

    if (!jwt) {
      console.log("❌ [HomePage] No JWT found");
      return;
    }

    // 🔥 Dono fetch karo
    dispatch(fetchSellerProfile(jwt) as any);
    dispatch(fetchSellerReport(jwt) as any);
  }, [dispatch]);

  const handleChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as string);
  };

  // ─── Business Info ───
  const businessName =
    sellers.profile?.businessDetails?.businessName ||
    sellers.profile?.sellerName ||
    "Your Business";

  const sellerEmail = sellers.profile?.email || "";
  const accountStatus = sellers.profile?.accountStatus;

  // 🔥 DEBUG
  React.useEffect(() => {
    if (sellers.profile) {
      console.log("═══════════════════════════════════════");
      console.log("🔍 [HomePage] Profile loaded:");
      console.log("   accountStatus:", accountStatus);
      console.log("   isActive:", accountStatus === "ACTIVE");
      console.log("   report:", sellers.report);
      console.log("═══════════════════════════════════════");
    }
  }, [sellers.profile, accountStatus, sellers.report]);

  // ─── Loading (pehli baar) ───
  if (sellers.loading && !sellers.profile) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <CircularProgress size={50} />
        <p className="mt-4 text-gray-600 font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  // ─── Error ───
  if (sellers.error && !sellers.profile) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md text-center">
          <p className="text-red-600 font-bold text-lg mb-2">
            ❌ Failed to load
          </p>
          <p className="text-sm text-red-500 mb-4">{sellers.error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ─── No Profile Yet ───
  if (!sellers.profile) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <CircularProgress size={50} />
        <p className="mt-4 text-gray-600 font-semibold">Loading profile...</p>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════
  // 🔥 ACTIVATION CHECK
  // ═══════════════════════════════════════════════════
  if (accountStatus !== "ACTIVE") {
    console.log("🔴 [HomePage] Not ACTIVE → Activation Page");
    return (
      <SellerActivationPending
        sellerName={businessName}
        sellerEmail={sellerEmail}
        accountStatus={accountStatus || "PENDING_VERIFICATION"}
      />
    );
  }

  console.log("🟢 [HomePage] ACTIVE → Full Dashboard");

  // ─── Stats Cards ───
  const stats = [
    {
      icon: <AccountBalanceIcon />,
      value: `₹${(sellers.report?.totalEarnings ?? 0).toLocaleString("en-IN")}`,
      title: "Total Earnings",
      bg: "from-blue-500 to-blue-700",
      iconBg: "bg-blue-600",
    },
    {
      icon: <TrendingUpIcon />,
      value: sellers.report?.totalSales ?? 0,
      title: "Total Sales",
      bg: "from-green-500 to-green-700",
      iconBg: "bg-green-600",
    },
    {
      icon: <ReplayIcon />,
      value: sellers.report?.totalRefunds ?? 0,
      title: "Total Refunds",
      bg: "from-orange-500 to-orange-700",
      iconBg: "bg-orange-600",
    },
    {
      icon: <CancelIcon />,
      value: sellers.report?.canceledOrders ?? 0,
      title: "Cancelled Orders",
      bg: "from-red-500 to-red-700",
      iconBg: "bg-red-600",
    },
    {
      icon: <PercentIcon />,
      value: `₹${(sellers.report?.totalCommission ?? 0).toLocaleString("en-IN")}`,
      title: "Total Commission",
      bg: "from-purple-500 to-purple-700",
      iconBg: "bg-purple-600",
    },
    {
      icon: <SavingsIcon />,
      value: `₹${(sellers.report?.netEarnings ?? 0).toLocaleString("en-IN")}`,
      title: "Net Earnings",
      bg: "from-teal-500 to-teal-700",
      iconBg: "bg-teal-600",
    },
    {
      icon: <HourglassEmptyIcon />,
      value: `₹${(sellers.report?.pendingPayout ?? 0).toLocaleString("en-IN")}`,
      title: "Pending Payout",
      bg: "from-yellow-500 to-yellow-700",
      iconBg: "bg-yellow-600",
    },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 md:p-8 shadow-xl">
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -left-8 -bottom-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar
              sx={{
                width: 68,
                height: 68,
                bgcolor: "white",
                color: "#4f46e5",
                fontWeight: "bold",
                fontSize: 28,
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              }}
            >
              {businessName.charAt(0).toUpperCase()}
            </Avatar>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow">
                  {businessName}
                </h1>
                <VerifiedIcon
                  sx={{ color: "#4ade80", fontSize: 22 }}
                  titleAccess="Verified Seller"
                />
              </div>
              {sellerEmail && (
                <p className="text-white/80 text-sm mt-1">{sellerEmail}</p>
              )}
              <p className="text-white/70 text-xs mt-1 flex items-center gap-1">
                <StorefrontIcon sx={{ fontSize: 14 }} />
                Welcome back to your seller dashboard 👋
              </p>
            </div>
          </div>

          <div className="text-white/90 text-sm md:text-right bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
            <p className="font-semibold">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-white/70 text-xs">Let's grow your business 🚀</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`,
            }}
          >
            <div
              className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${stat.bg} p-5 shadow-lg text-white`}
            >
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10" />

              <div className="flex items-start justify-between relative">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/80">
                    {stat.title}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold mt-2 drop-shadow">
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`${stat.iconBg} rounded-lg p-2 shadow-md transition-transform duration-300 hover:scale-110`}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Chart Section */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-black p-5 lg:p-8 shadow-2xl border border-slate-700">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              📈 Revenue Overview
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Track your sales & earnings over time
            </p>
          </div>

          <div className="w-full md:w-56">
            <FormControl fullWidth>
              <InputLabel sx={{ color: "white" }} id="chart-type-label">
                Chart Type
              </InputLabel>
              <Select
                sx={{
                  color: "white",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.4)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a78bfa",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  ".MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
                labelId="chart-type-label"
                id="chart-type"
                value={chartType}
                label="Chart Type"
                onChange={handleChange}
              >
                {Chart.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <SellingChart chartType={chartType} />
        </div>
      </div>

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
      `}</style>
    </div>
  );
};

export default HomePage;