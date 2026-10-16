// import { useState, useRef } from "react";
// import {
//   FaCheckCircle,
//   FaStore,
//   FaBoxOpen,
//   FaUsers,
//   FaChartLine,
//   FaShippingFast,
//   FaMoneyBillWave,
//   FaBullhorn,
//   FaTruck,
//   FaBox,
//   FaFacebook,
//   FaInstagram,
//   FaTwitter,
//   FaYoutube,
//   FaLinkedin,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaArrowRight,
//   FaShieldAlt,
//   FaHeadset,
//   FaRocket,
//   FaStar,
//   FaWallet,
//   FaChartBar,
//   FaBell,
//   FaPlay,
//   FaPause,
//   FaUserPlus,
//   FaClipboardCheck,
//   FaUpload,
//   FaRupeeSign,
// } from "react-icons/fa";

// const Landing = () => {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const toggleVideo = () => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (video.paused) {
//       video.play();
//       setIsPlaying(true);
//     } else {
//       video.pause();
//       setIsPlaying(false);
//     }
//   };

//   return (
//     <div className="w-full overflow-hidden">
//       {/* ═══════════════ ANIMATIONS CSS ═══════════════ */}
//       <style>{`
//         @keyframes marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         @keyframes float-slow {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-14px) rotate(2deg); }
//         }
//         @keyframes pulse-glow {
//           0%, 100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.5); }
//           50% { box-shadow: 0 0 0 20px rgba(249, 115, 22, 0); }
//         }
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes slideInLeft {
//           from { opacity: 0; transform: translateX(-50px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes slideInRight {
//           from { opacity: 0; transform: translateX(50px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes gradient-shift {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
//         @keyframes scale-bounce {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//         }
//         @keyframes bar-grow {
//           from { height: 0%; }
//         }
//         @keyframes draw-line {
//           from { stroke-dashoffset: 400; }
//           to { stroke-dashoffset: 0; }
//         }
//         @keyframes pop-in {
//           0% { opacity: 0; transform: scale(0.6); }
//           70% { transform: scale(1.08); }
//           100% { opacity: 1; transform: scale(1); }
//         }
//         @keyframes coin-flip {
//           0%, 100% { transform: rotateY(0deg); }
//           50% { transform: rotateY(180deg); }
//         }
//         @keyframes pulse-ring {
//           0% { transform: scale(0.9); opacity: 0.9; }
//           100% { transform: scale(1.8); opacity: 0; }
//         }
//         @keyframes shimmer-line {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
//         .animate-marquee { animation: marquee 25s linear infinite; }
//         .animate-float { animation: float 4s ease-in-out infinite; }
//         .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
//         .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
//         .animate-fade-up { animation: fadeInUp 0.8s ease-out forwards; }
//         .animate-slide-left { animation: slideInLeft 0.8s ease-out forwards; }
//         .animate-slide-right { animation: slideInRight 0.8s ease-out forwards; }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient-shift 4s ease infinite;
//         }
//         .animate-scale-bounce { animation: scale-bounce 2s ease-in-out infinite; }
//         .animate-pop-in { animation: pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
//         .animate-coin-flip { animation: coin-flip 3s ease-in-out infinite; }
//         .bar-grow { animation: bar-grow 1.4s ease-out both; }
//         .draw-line {
//           stroke-dasharray: 400;
//           stroke-dashoffset: 400;
//           animation: draw-line 2s ease-out 0.4s forwards;
//         }
//         .pulse-ring::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           border-radius: 9999px;
//           background: rgba(239, 68, 68, 0.7);
//           animation: pulse-ring 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
//         .shimmer-line::after {
//           content: '';
//           position: absolute;
//           top: 0; left: 0;
//           width: 40%;
//           height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
//           animation: shimmer-line 3s ease-in-out infinite;
//           pointer-events: none;
//         }
//         .delay-100 { animation-delay: 0.1s; }
//         .delay-200 { animation-delay: 0.2s; }
//         .delay-300 { animation-delay: 0.3s; }
//         .delay-400 { animation-delay: 0.4s; }
//         .delay-500 { animation-delay: 0.5s; }
//         .delay-700 { animation-delay: 0.7s; }
//         .delay-1000 { animation-delay: 1s; }
//       `}</style>

//       {/* ═══════════════ HERO SECTION ═══════════════ */}
//       <div className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden">

//         <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-40 animate-float-slow"></div>
//         <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-30 animate-float-slow" style={{ animationDelay: "1.5s" }}></div>

//         <div className="relative md:w-1/2 space-y-6 animate-slide-left">
//           <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
//             <FaRocket className="animate-bounce" />
//             India's Fastest Growing Marketplace
//           </div>

//           <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
//             Sell Across India <br />
//             with{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 animate-gradient">
//               Selfysnap
//             </span>
//           </h1>

//           <p className="text-gray-600 text-lg md:text-xl max-w-lg">
//             Join thousands of sellers growing their business online with zero
//             investment and maximum profits.
//           </p>

//           <ul className="text-gray-700 space-y-3 text-base">
//             <li className="flex items-center gap-3 animate-fade-up delay-100">
//               <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
//               <span>Zero registration cost</span>
//             </li>
//             <li className="flex items-center gap-3 animate-fade-up delay-200">
//               <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
//               <span>Fast payments within 24 hours</span>
//             </li>
//             <li className="flex items-center gap-3 animate-fade-up delay-300">
//               <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
//               <span>Easy-to-use seller dashboard</span>
//             </li>
//           </ul>

//           <div className="flex flex-wrap gap-4 pt-4">
//             <button className="group relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/60 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden">
//               <span className="relative z-10">Start Selling</span>
//               <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
//               <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//             </button>
//             <button className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-orange-500 hover:text-white transition-all hover:scale-105 active:scale-95">
//               Learn More
//             </button>
//           </div>
//         </div>

//         {/* Dashboard Mockup */}
//         <div className="relative md:w-1/2 mt-16 md:mt-0 flex justify-center animate-slide-right">
//           <div className="relative w-full max-w-[520px]">

//             <div className="relative bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 overflow-hidden">
//               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-600 to-red-500"></div>

//               <div className="flex items-center justify-between mb-5">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white animate-scale-bounce">
//                     <FaStore />
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-400">Seller Dashboard</p>
//                     <p className="text-sm font-bold text-gray-800">Welcome back 👋</p>
//                   </div>
//                 </div>
//                 <div className="relative">
//                   <FaBell className="text-gray-400 text-xl" />
//                   <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
//                 </div>
//               </div>

//               <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white mb-5 overflow-hidden">
//                 <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500 rounded-full blur-2xl opacity-40"></div>
//                 <div className="relative flex items-center justify-between">
//                   <div>
//                     <p className="text-xs text-gray-400 mb-1">This Month</p>
//                     <p className="text-3xl font-bold">₹12,45,800</p>
//                     <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
//                       <FaChartLine /> +24.8% vs last month
//                     </p>
//                   </div>
//                   <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 text-xl animate-coin-flip">
//                     <FaWallet />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-end justify-between gap-2 h-28 mb-4">
//                 {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
//                   <div key={i} className="flex-1 flex flex-col items-center gap-2">
//                     <div
//                       className="w-full rounded-t-lg bg-gradient-to-t from-orange-400 to-orange-600 bar-grow"
//                       style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
//                     ></div>
//                   </div>
//                 ))}
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div className="bg-orange-50 rounded-xl p-3 animate-pop-in delay-500">
//                   <div className="flex items-center gap-2 text-orange-600 mb-1">
//                     <FaBoxOpen className="text-sm" />
//                     <p className="text-[10px] font-semibold">Orders</p>
//                   </div>
//                   <p className="text-lg font-bold text-gray-800">1,248</p>
//                 </div>
//                 <div className="bg-green-50 rounded-xl p-3 animate-pop-in delay-700">
//                   <div className="flex items-center gap-2 text-green-600 mb-1">
//                     <FaChartBar className="text-sm" />
//                     <p className="text-[10px] font-semibold">Growth</p>
//                   </div>
//                   <p className="text-lg font-bold text-gray-800">+38%</p>
//                 </div>
//               </div>
//             </div>

//             <div className="absolute -top-6 -left-6 bg-white shadow-xl rounded-2xl p-4 z-10 animate-float border border-gray-100">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                   <FaStore className="text-green-600 text-xl" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Active Sellers</p>
//                   <p className="text-lg font-bold text-gray-800">10,000+</p>
//                 </div>
//               </div>
//             </div>

//             <div
//               className="absolute -bottom-6 -right-6 bg-white shadow-xl rounded-2xl p-4 z-10 animate-float border border-gray-100"
//               style={{ animationDelay: "1s" }}
//             >
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
//                   <FaBoxOpen className="text-orange-600 text-xl" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Products Live</p>
//                   <p className="text-lg font-bold text-gray-800">45,000+</p>
//                 </div>
//               </div>
//             </div>

//             <div
//               className="absolute top-1/2 -right-10 bg-white shadow-xl rounded-2xl px-4 py-3 z-10 animate-float hidden md:flex items-center gap-2 border border-gray-100"
//               style={{ animationDelay: "0.5s" }}
//             >
//               <FaStar className="text-yellow-400 text-lg" />
//               <div>
//                 <p className="text-xs font-bold text-gray-800">4.9 / 5</p>
//                 <p className="text-[10px] text-gray-500">Seller Rating</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ═══════════════ ⚡ SELLER REGISTRATION VIDEO SECTION ═══════════════ */}
//       <div className="relative px-6 md:px-16 py-20 bg-gradient-to-br from-white via-orange-50/40 to-white overflow-hidden">

//         <div className="absolute -top-16 left-1/4 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-40 animate-float-slow"></div>
//         <div className="absolute -bottom-16 right-1/4 w-80 h-80 bg-red-200 rounded-full blur-3xl opacity-30 animate-float-slow" style={{ animationDelay: "1.5s" }}></div>

//         <div className="relative max-w-7xl mx-auto">

//           {/* Section Heading */}
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-fade-up">
//               <FaPlay className="text-xs" />
//               Watch How It Works
//             </div>
//             <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 animate-fade-up delay-100">
//               Seller{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 animate-gradient">
//                 Registration
//               </span>{" "}
//               Process
//             </h2>
//             <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-up delay-200">
//               Watch this quick video to see how easily you can register and
//               start selling on Selfysnap in just a few minutes.
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-5 gap-8 items-center">

//             {/* ── LEFT: BIG VIDEO CARD ── */}
//             <div className="lg:col-span-3 animate-slide-left">
//               <div className="relative group">

//                 <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-[28px] blur-lg opacity-70 animate-gradient"></div>

//                 <div className="relative bg-black rounded-[24px] overflow-hidden shadow-2xl shimmer-line">

//                   {/* ✅ VIDEO — NO autoplay, click to play */}
//                   <video
//                     ref={videoRef}
//                     className="w-full h-[280px] md:h-[420px] lg:h-[460px] object-cover cursor-pointer"
//                     loop
//                     playsInline
//                     preload="metadata"
//                     onClick={toggleVideo}
//                   >
//                     <source src="/seller.mp4" type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>

//                   {/* Click overlay — only shown when paused */}
//                   {!isPlaying && (
//                     <div
//                       onClick={toggleVideo}
//                       className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-black/30 to-black/40 cursor-pointer transition-opacity"
//                     >
//                       {/* Big play button */}
//                       <div className="relative">
//                         <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-60"></span>
//                         <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-2xl shadow-orange-500/60 hover:scale-110 transition-transform">
//                           <FaPlay className="text-2xl md:text-3xl ml-1" />
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* Pause button — only shown while playing */}
//                   {isPlaying && (
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleVideo();
//                       }}
//                       className="absolute bottom-20 right-5 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 transition-all z-20"
//                     >
//                       <FaPause className="text-sm" />
//                     </button>
//                   )}

//                   <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/80 to-transparent pointer-events-none"></div>

//                   <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none"></div>

//                   {/* LIVE badge */}
//                   <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg pointer-events-none">
//                     <span className="relative flex w-2.5 h-2.5">
//                       <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white pulse-ring"></span>
//                     </span>
//                     SELLER TUTORIAL
//                   </div>

//                   {/* Time chip */}
//                   <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold border border-white/20 pointer-events-none">
//                     ⏱ 3:45 min
//                   </div>

//                   {/* Bottom content */}
//                   <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-4 pointer-events-none">
//                     <div className="text-white">
//                       <p className="text-base md:text-xl font-bold mb-1">
//                         How to Register as a Seller
//                       </p>
//                       <p className="text-xs md:text-sm text-gray-300 flex items-center gap-2">
//                         <FaUserPlus className="text-orange-400" />
//                         {isPlaying ? "Now Playing..." : "Tap to watch the guide"}
//                       </p>
//                     </div>

//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleVideo();
//                       }}
//                       className="pointer-events-auto flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white transition-all hover:scale-110 shadow-2xl shadow-orange-500/50"
//                     >
//                       {isPlaying ? <FaPause className="text-lg" /> : <FaPlay className="text-lg ml-0.5" />}
//                     </button>
//                   </div>

//                   {/* Progress bar (decorative) */}
//                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 pointer-events-none">
//                     <div className={`h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-1000 ${isPlaying ? "w-2/3" : "w-1/3"}`}></div>
//                   </div>
//                 </div>

//                 {/* Floating stat card */}
//                 <div className="absolute -bottom-6 -left-6 bg-white shadow-xl rounded-2xl p-4 z-10 animate-float border border-gray-100 hidden md:flex items-center gap-3">
//                   <div className="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center">
//                     <FaClipboardCheck className="text-green-600 text-lg" />
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-gray-500">Setup Time</p>
//                     <p className="text-sm font-bold text-gray-800">Under 5 min</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ── RIGHT: STEPS LIST ── */}
//             <div className="lg:col-span-2 space-y-4 animate-slide-right">
//               <div className="mb-6">
//                 <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-2">
//                   Simple 4-Step Process
//                 </p>
//                 <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
//                   Start Selling in{" "}
//                   <span className="text-orange-500">4 Easy Steps</span>
//                 </h3>
//               </div>

//               {[
//                 {
//                   step: "01",
//                   icon: <FaUserPlus />,
//                   title: "Create Account",
//                   desc: "Register with your mobile number & email — 100% free.",
//                   color: "from-orange-500 to-red-500",
//                 },
//                 {
//                   step: "02",
//                   icon: <FaClipboardCheck />,
//                   title: "Verify Details",
//                   desc: "Add GST, PAN and bank details for quick payouts.",
//                   color: "from-blue-500 to-cyan-500",
//                 },
//                 {
//                   step: "03",
//                   icon: <FaUpload />,
//                   title: "Upload Products",
//                   desc: "List your products with photos, price and stock.",
//                   color: "from-purple-500 to-pink-500",
//                 },
//                 {
//                   step: "04",
//                   icon: <FaRupeeSign />,
//                   title: "Start Earning",
//                   desc: "Receive orders & get payments within 24 hours.",
//                   color: "from-green-500 to-emerald-600",
//                 },
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
//                   style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.15}s both` }}
//                 >
//                   <div className={`absolute left-0 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>

//                   <div className="flex items-start gap-4">
//                     <div className="relative flex-shrink-0">
//                       <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-lg shadow-lg group-hover:scale-110 transition-transform`}>
//                         {item.icon}
//                       </div>
//                       <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-900 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
//                         {item.step}
//                       </span>
//                     </div>

//                     <div className="min-w-0">
//                       <h4 className="text-base font-bold text-gray-800 mb-1">
//                         {item.title}
//                       </h4>
//                       <p className="text-sm text-gray-500 leading-relaxed">
//                         {item.desc}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               <button className="group w-full mt-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/40 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 animate-pulse-glow">
//                 Register Now — It's Free
//                 <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ═══════════════ RUNNING STRIP ═══════════════ */}
//       <div className="w-full overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 py-5">
//         <div className="animate-marquee flex items-center gap-16">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="flex items-center gap-16">
//               {[
//                 { icon: <FaTruck />, text: "Fast Delivery" },
//                 { icon: <FaBox />, text: "All India Shipping" },
//                 { icon: <FaShieldAlt />, text: "Secure Packaging" },
//                 { icon: <FaRocket />, text: "Express Service" },
//               ].map((item, idx) => (
//                 <div key={idx} className="flex items-center gap-3 text-white text-lg font-bold whitespace-nowrap">
//                   <span className="text-2xl">{item.icon}</span>
//                   <span>{item.text}</span>
//                   <span className="text-orange-200 ml-8">★</span>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ═══════════════ STATS ═══════════════ */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-16 py-16 bg-white">
//         {[
//           { icon: <FaStore />, value: "10K+", label: "Active Sellers", color: "from-orange-500 to-orange-600" },
//           { icon: <FaBoxOpen />, value: "45K+", label: "Products Listed", color: "from-blue-500 to-blue-600" },
//           { icon: <FaUsers />, value: "20K+", label: "Happy Customers", color: "from-green-500 to-green-600" },
//           { icon: <FaChartLine />, value: "99%", label: "Success Rate", color: "from-purple-500 to-purple-600" },
//         ].map((stat, i) => (
//           <div
//             key={i}
//             className="group flex flex-col items-center p-6 rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 cursor-pointer"
//             style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.15}s both` }}
//           >
//             <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
//               {stat.icon}
//             </div>
//             <h2 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h2>
//             <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
//           </div>
//         ))}
//       </div>

//       {/* ═══════════════ WELCOME SECTION (Animated Growth) ═══════════════ */}
//       <div className="px-6 md:px-16 py-16">
//         <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl overflow-hidden shadow-2xl">

//           <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-20 animate-float-slow"></div>
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-10 animate-float-slow" style={{ animationDelay: "1.5s" }}></div>

//           <div className="relative flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-10">

//             <div className="md:w-1/2 space-y-6">
//               <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold">
//                 <FaRocket className="text-xs" />
//                 Grow With Us
//               </div>

//               <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
//                 Welcome to <span className="text-orange-500">Selfysnap</span> Sellers
//               </h2>

//               <p className="text-gray-300 text-lg">
//                 Start your journey and unlock unlimited growth opportunities
//                 with India's most trusted marketplace.
//               </p>

//               <ul className="text-gray-300 space-y-3">
//                 {[
//                   "Easy onboarding in 5 minutes",
//                   "Advanced analytics dashboard",
//                   "Secure and fast payments",
//                 ].map((item, i) => (
//                   <li key={i} className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: `${i * 0.15 + 0.3}s` }}>
//                     <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
//                       <FaCheckCircle className="text-orange-400 text-sm" />
//                     </div>
//                     <span>{item}</span>
//                   </li>
//                 ))}
//               </ul>

//               <div className="flex gap-4 pt-4">
//                 <button className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/40 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 animate-pulse-glow">
//                   Join Now
//                   <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             </div>

//             <div className="md:w-1/2 w-full">
//               <div className="relative">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-3xl blur opacity-75 animate-gradient"></div>

//                 <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-white/10 overflow-hidden">
//                   <div className="absolute inset-0 opacity-10" style={{
//                     backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
//                     backgroundSize: "30px 30px"
//                   }}></div>

//                   <div className="relative">
//                     <div className="flex items-center justify-between mb-6">
//                       <div>
//                         <p className="text-xs text-gray-400">Sales Analytics</p>
//                         <p className="text-2xl font-bold text-white">Live Growth</p>
//                       </div>
//                       <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1.5 rounded-full text-xs font-semibold">
//                         <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
//                         Live
//                       </div>
//                     </div>

//                     <div className="relative h-40 mb-6">
//                       <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
//                         <defs>
//                           <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
//                             <stop offset="0%" stopColor="#f97316" />
//                             <stop offset="100%" stopColor="#ef4444" />
//                           </linearGradient>
//                           <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
//                             <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
//                             <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
//                           </linearGradient>
//                         </defs>
//                         <path
//                           className="draw-line"
//                           d="M0,130 C50,120 80,90 120,95 C160,100 180,60 220,55 C260,50 280,30 320,25 C360,20 380,15 400,10"
//                           fill="none"
//                           stroke="url(#lineGrad)"
//                           strokeWidth="4"
//                           strokeLinecap="round"
//                         />
//                         <path
//                           d="M0,130 C50,120 80,90 120,95 C160,100 180,60 220,55 C260,50 280,30 320,25 C360,20 380,15 400,10 L400,160 L0,160 Z"
//                           fill="url(#areaGrad)"
//                         />
//                       </svg>
//                     </div>

//                     <div className="grid grid-cols-3 gap-3">
//                       {[
//                         { label: "Orders", value: "1.2K", color: "text-orange-400" },
//                         { label: "Revenue", value: "₹12L", color: "text-green-400" },
//                         { label: "Growth", value: "+38%", color: "text-blue-400" },
//                       ].map((s, i) => (
//                         <div
//                           key={i}
//                           className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 animate-pop-in"
//                           style={{ animationDelay: `${i * 0.2 + 0.6}s` }}
//                         >
//                           <p className="text-[10px] text-gray-400 mb-1">{s.label}</p>
//                           <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ═══════════════ FEATURES ═══════════════ */}
//       <div className="py-20 px-6 md:px-16 text-center bg-gradient-to-b from-white to-orange-50">
//         <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
//           ✨ Why Sellers Love Us
//         </div>

//         <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
//           Why Choose Selfysnap?
//         </h2>
//         <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-14">
//           Everything you need to grow your online business, all in one platform.
//         </p>

//         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {[
//             { icon: <FaMoneyBillWave />, title: "Low Commission", desc: "Keep more of what you earn with industry's lowest commission rates.", color: "from-green-500 to-emerald-600" },
//             { icon: <FaShippingFast />, title: "Fast Delivery", desc: "Pan-India shipping network delivering to 25,000+ pin codes.", color: "from-blue-500 to-blue-600" },
//             { icon: <FaBullhorn />, title: "Marketing Tools", desc: "Boost your sales with built-in ads, coupons, and promotions.", color: "from-orange-500 to-red-500" },
//             { icon: <FaHeadset />, title: "24×7 Support", desc: "Dedicated support team available round the clock for you.", color: "from-purple-500 to-pink-500" },
//             { icon: <FaShieldAlt />, title: "Secure Payments", desc: "100% secure transactions with encrypted payment gateways.", color: "from-teal-500 to-cyan-600" },
//             { icon: <FaRocket />, title: "Fast Setup", desc: "Start selling within minutes with our easy registration.", color: "from-indigo-500 to-violet-600" },
//           ].map((feature, i) => (
//             <div
//               key={i}
//               className="group p-8 bg-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 cursor-pointer border border-gray-100"
//               style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both` }}
//             >
//               <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-2xl mx-auto mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}>
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
//               <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ═══════════════ BIG CTA BANNER ═══════════════ */}
//       <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-gray-900 via-black to-orange-900">
//         <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-30 animate-float-slow"></div>
//         <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-20 animate-float-slow" style={{ animationDelay: "1s" }}></div>

//         <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-orange-900/40"></div>

//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 space-y-6">
//           <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold animate-fade-up">
//             <FaRocket />
//             Ready to Launch?
//           </div>

//           <h2 className="text-3xl md:text-6xl font-bold text-white leading-tight animate-fade-up delay-100 max-w-4xl">
//             Start Your Online Business <span className="text-orange-400">Today</span>
//           </h2>

//           <p className="text-gray-200 max-w-2xl text-lg animate-fade-up delay-200">
//             Join Selfysnap and reach millions of customers across India with
//             zero hassle and maximum profit.
//           </p>

//           <div className="flex flex-wrap gap-4 justify-center animate-fade-up delay-300 pt-4">
//             <button className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
//               Become a Seller
//               <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
//             </button>
//             <button className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-black transition-all hover:scale-105 active:scale-95">
//               Contact Us
//             </button>
//           </div>

//           <div className="flex items-center gap-6 pt-6 text-white/80 text-sm animate-fade-up delay-400 flex-wrap justify-center">
//             <div className="flex items-center gap-2"><FaCheckCircle className="text-green-400" /><span>Free Registration</span></div>
//             <div className="flex items-center gap-2"><FaCheckCircle className="text-green-400" /><span>No Setup Fee</span></div>
//             <div className="flex items-center gap-2"><FaCheckCircle className="text-green-400" /><span>24×7 Support</span></div>
//           </div>
//         </div>
//       </div>

//       {/* ═══════════════ FOOTER ═══════════════ */}
//       <footer className="bg-gray-900 text-gray-300 pt-16 pb-6">
//         <div className="px-6 md:px-16">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
//             <div className="space-y-5">
//               <div className="flex items-center gap-3">
//                 <img src="/logo.jpeg" alt="Selfysnap" className="h-12 rounded-lg" />
//                 <h3 className="text-2xl font-bold text-white">
//                   Selfy<span className="text-orange-500">snap</span>
//                 </h3>
//               </div>
//               <p className="text-gray-400 leading-relaxed">
//                 India's fastest growing multi-vendor marketplace connecting
//                 sellers and customers across the nation.
//               </p>
//               <div className="flex gap-3 pt-2">
//                 {[
//                   { icon: <FaFacebook />, color: "hover:bg-blue-600" },
//                   { icon: <FaInstagram />, color: "hover:bg-pink-600" },
//                   { icon: <FaTwitter />, color: "hover:bg-sky-500" },
//                   { icon: <FaYoutube />, color: "hover:bg-red-600" },
//                   { icon: <FaLinkedin />, color: "hover:bg-blue-700" },
//                 ].map((social, i) => (
//                   <a key={i} href="#" className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white transition-all hover:scale-110 ${social.color}`}>
//                     {social.icon}
//                   </a>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h4 className="text-white font-bold text-lg mb-5 relative inline-block">
//                 Quick Links
//                 <span className="absolute -bottom-1 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
//               </h4>
//               <ul className="space-y-3">
//                 {["About Us", "Become Seller", "Careers", "Blog", "Press", "Contact Us"].map((link, i) => (
//                   <li key={i}>
//                     <a href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
//                       <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:w-3 transition-all"></span>
//                       {link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h4 className="text-white font-bold text-lg mb-5 relative inline-block">
//                 Policies
//                 <span className="absolute -bottom-1 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
//               </h4>
//               <ul className="space-y-3">
//                 {["Terms & Conditions", "Privacy Policy", "Refund Policy", "Shipping Policy", "Return Policy", "Seller Agreement"].map((link, i) => (
//                   <li key={i}>
//                     <a href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
//                       <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:w-3 transition-all"></span>
//                       {link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h4 className="text-white font-bold text-lg mb-5 relative inline-block">
//                 Get In Touch
//                 <span className="absolute -bottom-1 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
//               </h4>
//               <ul className="space-y-4">
//                 <li className="flex items-start gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0 mt-0.5">
//                     <FaMapMarkerAlt />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-400">Address</p>
//                     <p className="text-white text-sm">
//                       Selfysnap Warehouse, Plot No. 12,<br />Main Market, Hisar, Haryana
//                     </p>
//                   </div>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0">
//                     <FaPhone />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-400">Phone</p>
//                     <a href="tel:+919992088843" className="text-white text-sm hover:text-orange-500">
//                       +91 99920 88843
//                     </a>
//                   </div>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0">
//                     <FaEnvelope />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-400">Email</p>
//                     <a href="mailto:support@selfysnap.com" className="text-white text-sm hover:text-orange-500">
//                       support@selfysnap.com
//                     </a>
//                   </div>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
//             <div>
//               <p className="text-white font-bold text-lg mb-1">📱 Download Our App</p>
//               <p className="text-gray-400 text-sm">Shop on the go - Available on all platforms</p>
//             </div>
//             <div className="flex gap-3">
//               <button className="bg-black border border-gray-700 text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition-all flex items-center gap-3 group">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.066l2.5 1.44a1 1 0 0 1 0 1.732l-2.5 1.44-2.5-2.307 2.5-2.305zm-3.199-3.199L5.864 1.807l10.937 6.333-2.302 2.302z"/>
//                 </svg>
//                 <div className="text-left">
//                   <p className="text-[10px] text-gray-400">GET IT ON</p>
//                   <p className="text-sm font-bold">Google Play</p>
//                 </div>
//               </button>

//               <button className="bg-black border border-gray-700 text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition-all flex items-center gap-3 group">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
//                 </svg>
//                 <div className="text-left">
//                   <p className="text-[10px] text-gray-400">Download on the</p>
//                   <p className="text-sm font-bold">App Store</p>
//                 </div>
//               </button>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
//             <p>
//               © {new Date().getFullYear()} <span className="text-white font-semibold">Selfysnap</span>. All rights reserved.
//             </p>
//             <p className="flex items-center gap-2">
//               Made with <span className="text-red-500 animate-pulse">❤️</span> in India
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Landing;
















// import React, { useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaCheckCircle,
//   FaStore,
//   FaBoxOpen,
//   FaUsers,
//   FaChartLine,
//   FaShippingFast,
//   FaMoneyBillWave,
//   FaBullhorn,
//   FaTruck,
//   FaBox,
//   FaFacebook,
//   FaInstagram,
//   FaTwitter,
//   FaYoutube,
//   FaLinkedin,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaArrowRight,
//   FaShieldAlt,
//   FaHeadset,
//   FaRocket,
//   FaStar,
//   FaWallet,
//   FaChartBar,
//   FaBell,
//   FaPlay,
//   FaPause,
//   FaUserPlus,
//   FaClipboardCheck,
//   FaUpload,
//   FaRupeeSign,
// } from "react-icons/fa";

// /* 🔥 Types */
// interface SocialLink {
//   icon: React.ReactNode;
//   color: string;
// }

// interface FooterLink {
//   title: string;
//   path: string;
// }

// const Landing: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const [isPlaying, setIsPlaying] = useState<boolean>(false);

//   const toggleVideo = (): void => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (video.paused) {
//       video.play();
//       setIsPlaying(true);
//     } else {
//       video.pause();
//       setIsPlaying(false);
//     }
//   };

//   /* 🔥 Footer Links */
//   const quickLinks: FooterLink[] = [
//     { title: "About Us", path: "/about" },
//     { title: "Become Seller", path: "/become-seller" },
//     { title: "Careers", path: "/careers" },
//     { title: "Blog", path: "/blog" },
//     { title: "Press", path: "/press" },
//     { title: "Contact Us", path: "/contact" },
//   ];

//   const policyLinks: FooterLink[] = [
//     { title: "Terms & Conditions", path: "/terms-and-conditions" },
//     { title: "Privacy Policy", path: "/privacy-policy" },
//     { title: "Refund Policy", path: "/refund-policy" },
//     { title: "Shipping Policy", path: "/shipping-policy" },
//     { title: "Return Policy", path: "/return-policy" },
//     { title: "Seller Agreement", path: "/seller-agreement" },
//   ];

//   const socialLinks: SocialLink[] = [
//     { icon: <FaFacebook />, color: "hover:bg-blue-600" },
//     { icon: <FaInstagram />, color: "hover:bg-pink-600" },
//     { icon: <FaTwitter />, color: "hover:bg-sky-500" },
//     { icon: <FaYoutube />, color: "hover:bg-red-600" },
//     { icon: <FaLinkedin />, color: "hover:bg-blue-700" },
//   ];

//   return (
//     <div className="w-full overflow-hidden">
//       {/* ═══════════════ ANIMATIONS CSS ═══════════════ */}
//       <style>{`
//         @keyframes marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         @keyframes float-slow {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-14px) rotate(2deg); }
//         }
//         @keyframes pulse-glow {
//           0%, 100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.5); }
//           50% { box-shadow: 0 0 0 20px rgba(249, 115, 22, 0); }
//         }
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes slideInLeft {
//           from { opacity: 0; transform: translateX(-50px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes slideInRight {
//           from { opacity: 0; transform: translateX(50px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes gradient-shift {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
//         @keyframes scale-bounce {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//         }
//         @keyframes bar-grow {
//           from { height: 0%; }
//         }
//         @keyframes draw-line {
//           from { stroke-dashoffset: 400; }
//           to { stroke-dashoffset: 0; }
//         }
//         @keyframes pop-in {
//           0% { opacity: 0; transform: scale(0.6); }
//           70% { transform: scale(1.08); }
//           100% { opacity: 1; transform: scale(1); }
//         }
//         @keyframes coin-flip {
//           0%, 100% { transform: rotateY(0deg); }
//           50% { transform: rotateY(180deg); }
//         }
//         @keyframes pulse-ring {
//           0% { transform: scale(0.9); opacity: 0.9; }
//           100% { transform: scale(1.8); opacity: 0; }
//         }
//         @keyframes shimmer-line {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
//         .animate-marquee { animation: marquee 25s linear infinite; }
//         .animate-float { animation: float 4s ease-in-out infinite; }
//         .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
//         .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
//         .animate-fade-up { animation: fadeInUp 0.8s ease-out forwards; }
//         .animate-slide-left { animation: slideInLeft 0.8s ease-out forwards; }
//         .animate-slide-right { animation: slideInRight 0.8s ease-out forwards; }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient-shift 4s ease infinite;
//         }
//         .animate-scale-bounce { animation: scale-bounce 2s ease-in-out infinite; }
//         .animate-pop-in { animation: pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
//         .animate-coin-flip { animation: coin-flip 3s ease-in-out infinite; }
//         .bar-grow { animation: bar-grow 1.4s ease-out both; }
//         .draw-line {
//           stroke-dasharray: 400;
//           stroke-dashoffset: 400;
//           animation: draw-line 2s ease-out 0.4s forwards;
//         }
//         .pulse-ring::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           border-radius: 9999px;
//           background: rgba(239, 68, 68, 0.7);
//           animation: pulse-ring 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
//         .shimmer-line::after {
//           content: '';
//           position: absolute;
//           top: 0; left: 0;
//           width: 40%;
//           height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
//           animation: shimmer-line 3s ease-in-out infinite;
//           pointer-events: none;
//         }
//         .delay-100 { animation-delay: 0.1s; }
//         .delay-200 { animation-delay: 0.2s; }
//         .delay-300 { animation-delay: 0.3s; }
//         .delay-400 { animation-delay: 0.4s; }
//         .delay-500 { animation-delay: 0.5s; }
//         .delay-700 { animation-delay: 0.7s; }
//         .delay-1000 { animation-delay: 1s; }
//       `}</style>

//       {/* ═══════════════ HERO SECTION ═══════════════ */}
//       <div className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden">

//         <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-40 animate-float-slow"></div>
//         <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-30 animate-float-slow" style={{ animationDelay: "1.5s" }}></div>

//         <div className="relative md:w-1/2 space-y-6 animate-slide-left">
//           <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
//             <FaRocket className="animate-bounce" />
//             India's Fastest Growing Marketplace
//           </div>

//           <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
//             Sell Across India <br />
//             with{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 animate-gradient">
//               Selfysnap
//             </span>
//           </h1>

//           <p className="text-gray-600 text-lg md:text-xl max-w-lg">
//             Join thousands of sellers growing their business online with zero
//             investment and maximum profits.
//           </p>

//           <ul className="text-gray-700 space-y-3 text-base">
//             <li className="flex items-center gap-3 animate-fade-up delay-100">
//               <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
//               <span>Zero registration cost</span>
//             </li>
//             <li className="flex items-center gap-3 animate-fade-up delay-200">
//               <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
//               <span>Fast payments within 24 hours</span>
//             </li>
//             <li className="flex items-center gap-3 animate-fade-up delay-300">
//               <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
//               <span>Easy-to-use seller dashboard</span>
//             </li>
//           </ul>

//           <div className="flex flex-wrap gap-4 pt-4">
//             <button className="group relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/60 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden">
//               <span className="relative z-10">Start Selling</span>
//               <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
//               <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//             </button>
//             <button className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-orange-500 hover:text-white transition-all hover:scale-105 active:scale-95">
//               Learn More
//             </button>
//           </div>
//         </div>

//         {/* Dashboard Mockup */}
//         <div className="relative md:w-1/2 mt-16 md:mt-0 flex justify-center animate-slide-right">
//           <div className="relative w-full max-w-[520px]">

//             <div className="relative bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 overflow-hidden">
//               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-600 to-red-500"></div>

//               <div className="flex items-center justify-between mb-5">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white animate-scale-bounce">
//                     <FaStore />
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-400">Seller Dashboard</p>
//                     <p className="text-sm font-bold text-gray-800">Welcome back 👋</p>
//                   </div>
//                 </div>
//                 <div className="relative">
//                   <FaBell className="text-gray-400 text-xl" />
//                   <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
//                 </div>
//               </div>

//               <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white mb-5 overflow-hidden">
//                 <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500 rounded-full blur-2xl opacity-40"></div>
//                 <div className="relative flex items-center justify-between">
//                   <div>
//                     <p className="text-xs text-gray-400 mb-1">This Month</p>
//                     <p className="text-3xl font-bold">₹12,45,800</p>
//                     <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
//                       <FaChartLine /> +24.8% vs last month
//                     </p>
//                   </div>
//                   <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 text-xl animate-coin-flip">
//                     <FaWallet />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-end justify-between gap-2 h-28 mb-4">
//                 {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
//                   <div key={i} className="flex-1 flex flex-col items-center gap-2">
//                     <div
//                       className="w-full rounded-t-lg bg-gradient-to-t from-orange-400 to-orange-600 bar-grow"
//                       style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
//                     ></div>
//                   </div>
//                 ))}
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div className="bg-orange-50 rounded-xl p-3 animate-pop-in delay-500">
//                   <div className="flex items-center gap-2 text-orange-600 mb-1">
//                     <FaBoxOpen className="text-sm" />
//                     <p className="text-[10px] font-semibold">Orders</p>
//                   </div>
//                   <p className="text-lg font-bold text-gray-800">1,248</p>
//                 </div>
//                 <div className="bg-green-50 rounded-xl p-3 animate-pop-in delay-700">
//                   <div className="flex items-center gap-2 text-green-600 mb-1">
//                     <FaChartBar className="text-sm" />
//                     <p className="text-[10px] font-semibold">Growth</p>
//                   </div>
//                   <p className="text-lg font-bold text-gray-800">+38%</p>
//                 </div>
//               </div>
//             </div>

//             <div className="absolute -top-6 -left-6 bg-white shadow-xl rounded-2xl p-4 z-10 animate-float border border-gray-100">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                   <FaStore className="text-green-600 text-xl" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Active Sellers</p>
//                   <p className="text-lg font-bold text-gray-800">10,000+</p>
//                 </div>
//               </div>
//             </div>

//             <div
//               className="absolute -bottom-6 -right-6 bg-white shadow-xl rounded-2xl p-4 z-10 animate-float border border-gray-100"
//               style={{ animationDelay: "1s" }}
//             >
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
//                   <FaBoxOpen className="text-orange-600 text-xl" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Products Live</p>
//                   <p className="text-lg font-bold text-gray-800">45,000+</p>
//                 </div>
//               </div>
//             </div>

//             <div
//               className="absolute top-1/2 -right-10 bg-white shadow-xl rounded-2xl px-4 py-3 z-10 animate-float hidden md:flex items-center gap-2 border border-gray-100"
//               style={{ animationDelay: "0.5s" }}
//             >
//               <FaStar className="text-yellow-400 text-lg" />
//               <div>
//                 <p className="text-xs font-bold text-gray-800">4.9 / 5</p>
//                 <p className="text-[10px] text-gray-500">Seller Rating</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ═══════════════ SELLER REGISTRATION VIDEO SECTION ═══════════════ */}
//       <div className="relative px-6 md:px-16 py-20 bg-gradient-to-br from-white via-orange-50/40 to-white overflow-hidden">

//         <div className="absolute -top-16 left-1/4 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-40 animate-float-slow"></div>
//         <div className="absolute -bottom-16 right-1/4 w-80 h-80 bg-red-200 rounded-full blur-3xl opacity-30 animate-float-slow" style={{ animationDelay: "1.5s" }}></div>

//         <div className="relative max-w-7xl mx-auto">

//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-fade-up">
//               <FaPlay className="text-xs" />
//               Watch How It Works
//             </div>
//             <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 animate-fade-up delay-100">
//               Seller{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 animate-gradient">
//                 Registration
//               </span>{" "}
//               Process
//             </h2>
//             <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-up delay-200">
//               Watch this quick video to see how easily you can register and
//               start selling on Selfysnap in just a few minutes.
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-5 gap-8 items-center">

//             <div className="lg:col-span-3 animate-slide-left">
//               <div className="relative group">

//                 <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-[28px] blur-lg opacity-70 animate-gradient"></div>

//                 <div className="relative bg-black rounded-[24px] overflow-hidden shadow-2xl shimmer-line">

//                   <video
//                     ref={videoRef}
//                     className="w-full h-[280px] md:h-[420px] lg:h-[460px] object-cover cursor-pointer"
//                     loop
//                     playsInline
//                     preload="metadata"
//                     onClick={toggleVideo}
//                   >
//                     <source src="/seller.mp4" type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>

//                   {!isPlaying && (
//                     <div
//                       onClick={toggleVideo}
//                       className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-black/30 to-black/40 cursor-pointer transition-opacity"
//                     >
//                       <div className="relative">
//                         <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-60"></span>
//                         <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-2xl shadow-orange-500/60 hover:scale-110 transition-transform">
//                           <FaPlay className="text-2xl md:text-3xl ml-1" />
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {isPlaying && (
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleVideo();
//                       }}
//                       className="absolute bottom-20 right-5 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 transition-all z-20"
//                     >
//                       <FaPause className="text-sm" />
//                     </button>
//                   )}

//                   <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/80 to-transparent pointer-events-none"></div>

//                   <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none"></div>

//                   <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg pointer-events-none">
//                     <span className="relative flex w-2.5 h-2.5">
//                       <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white pulse-ring"></span>
//                     </span>
//                     SELLER TUTORIAL
//                   </div>

//                   <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold border border-white/20 pointer-events-none">
//                     ⏱ 3:45 min
//                   </div>

//                   <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-4 pointer-events-none">
//                     <div className="text-white">
//                       <p className="text-base md:text-xl font-bold mb-1">
//                         How to Register as a Seller
//                       </p>
//                       <p className="text-xs md:text-sm text-gray-300 flex items-center gap-2">
//                         <FaUserPlus className="text-orange-400" />
//                         {isPlaying ? "Now Playing..." : "Tap to watch the guide"}
//                       </p>
//                     </div>

//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleVideo();
//                       }}
//                       className="pointer-events-auto flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white transition-all hover:scale-110 shadow-2xl shadow-orange-500/50"
//                     >
//                       {isPlaying ? <FaPause className="text-lg" /> : <FaPlay className="text-lg ml-0.5" />}
//                     </button>
//                   </div>

//                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 pointer-events-none">
//                     <div className={`h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-1000 ${isPlaying ? "w-2/3" : "w-1/3"}`}></div>
//                   </div>
//                 </div>

//                 <div className="absolute -bottom-6 -left-6 bg-white shadow-xl rounded-2xl p-4 z-10 animate-float border border-gray-100 hidden md:flex items-center gap-3">
//                   <div className="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center">
//                     <FaClipboardCheck className="text-green-600 text-lg" />
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-gray-500">Setup Time</p>
//                     <p className="text-sm font-bold text-gray-800">Under 5 min</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="lg:col-span-2 space-y-4 animate-slide-right">
//               <div className="mb-6">
//                 <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-2">
//                   Simple 4-Step Process
//                 </p>
//                 <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
//                   Start Selling in{" "}
//                   <span className="text-orange-500">4 Easy Steps</span>
//                 </h3>
//               </div>

//               {[
//                 {
//                   step: "01",
//                   icon: <FaUserPlus />,
//                   title: "Create Account",
//                   desc: "Register with your mobile number & email — 100% free.",
//                   color: "from-orange-500 to-red-500",
//                 },
//                 {
//                   step: "02",
//                   icon: <FaClipboardCheck />,
//                   title: "Verify Details",
//                   desc: "Add GST, PAN and bank details for quick payouts.",
//                   color: "from-blue-500 to-cyan-500",
//                 },
//                 {
//                   step: "03",
//                   icon: <FaUpload />,
//                   title: "Upload Products",
//                   desc: "List your products with photos, price and stock.",
//                   color: "from-purple-500 to-pink-500",
//                 },
//                 {
//                   step: "04",
//                   icon: <FaRupeeSign />,
//                   title: "Start Earning",
//                   desc: "Receive orders & get payments within 24 hours.",
//                   color: "from-green-500 to-emerald-600",
//                 },
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
//                   style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.15}s both` }}
//                 >
//                   <div className={`absolute left-0 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>

//                   <div className="flex items-start gap-4">
//                     <div className="relative flex-shrink-0">
//                       <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-lg shadow-lg group-hover:scale-110 transition-transform`}>
//                         {item.icon}
//                       </div>
//                       <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-900 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
//                         {item.step}
//                       </span>
//                     </div>

//                     <div className="min-w-0">
//                       <h4 className="text-base font-bold text-gray-800 mb-1">
//                         {item.title}
//                       </h4>
//                       <p className="text-sm text-gray-500 leading-relaxed">
//                         {item.desc}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               <button className="group w-full mt-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/40 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 animate-pulse-glow">
//                 Register Now — It's Free
//                 <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ═══════════════ RUNNING STRIP ═══════════════ */}
//       <div className="w-full overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 py-5">
//         <div className="animate-marquee flex items-center gap-16">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="flex items-center gap-16">
//               {[
//                 { icon: <FaTruck />, text: "Fast Delivery" },
//                 { icon: <FaBox />, text: "All India Shipping" },
//                 { icon: <FaShieldAlt />, text: "Secure Packaging" },
//                 { icon: <FaRocket />, text: "Express Service" },
//               ].map((item, idx) => (
//                 <div key={idx} className="flex items-center gap-3 text-white text-lg font-bold whitespace-nowrap">
//                   <span className="text-2xl">{item.icon}</span>
//                   <span>{item.text}</span>
//                   <span className="text-orange-200 ml-8">★</span>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ═══════════════ STATS ═══════════════ */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-16 py-16 bg-white">
//         {[
//           { icon: <FaStore />, value: "10K+", label: "Active Sellers", color: "from-orange-500 to-orange-600" },
//           { icon: <FaBoxOpen />, value: "45K+", label: "Products Listed", color: "from-blue-500 to-blue-600" },
//           { icon: <FaUsers />, value: "20K+", label: "Happy Customers", color: "from-green-500 to-green-600" },
//           { icon: <FaChartLine />, value: "99%", label: "Success Rate", color: "from-purple-500 to-purple-600" },
//         ].map((stat, i) => (
//           <div
//             key={i}
//             className="group flex flex-col items-center p-6 rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 cursor-pointer"
//             style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.15}s both` }}
//           >
//             <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
//               {stat.icon}
//             </div>
//             <h2 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h2>
//             <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
//           </div>
//         ))}
//       </div>

//       {/* ═══════════════ WELCOME SECTION ═══════════════ */}
//       <div className="px-6 md:px-16 py-16">
//         <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl overflow-hidden shadow-2xl">

//           <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-20 animate-float-slow"></div>
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-10 animate-float-slow" style={{ animationDelay: "1.5s" }}></div>

//           <div className="relative flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-10">

//             <div className="md:w-1/2 space-y-6">
//               <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold">
//                 <FaRocket className="text-xs" />
//                 Grow With Us
//               </div>

//               <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
//                 Welcome to <span className="text-orange-500">Selfysnap</span> Sellers
//               </h2>

//               <p className="text-gray-300 text-lg">
//                 Start your journey and unlock unlimited growth opportunities
//                 with India's most trusted marketplace.
//               </p>

//               <ul className="text-gray-300 space-y-3">
//                 {[
//                   "Easy onboarding in 5 minutes",
//                   "Advanced analytics dashboard",
//                   "Secure and fast payments",
//                 ].map((item, i) => (
//                   <li key={i} className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: `${i * 0.15 + 0.3}s` }}>
//                     <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
//                       <FaCheckCircle className="text-orange-400 text-sm" />
//                     </div>
//                     <span>{item}</span>
//                   </li>
//                 ))}
//               </ul>

//               <div className="flex gap-4 pt-4">
//                 <button className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/40 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 animate-pulse-glow">
//                   Join Now
//                   <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             </div>

//             <div className="md:w-1/2 w-full">
//               <div className="relative">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-3xl blur opacity-75 animate-gradient"></div>

//                 <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-white/10 overflow-hidden">
//                   <div className="absolute inset-0 opacity-10" style={{
//                     backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
//                     backgroundSize: "30px 30px"
//                   }}></div>

//                   <div className="relative">
//                     <div className="flex items-center justify-between mb-6">
//                       <div>
//                         <p className="text-xs text-gray-400">Sales Analytics</p>
//                         <p className="text-2xl font-bold text-white">Live Growth</p>
//                       </div>
//                       <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1.5 rounded-full text-xs font-semibold">
//                         <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
//                         Live
//                       </div>
//                     </div>

//                     <div className="relative h-40 mb-6">
//                       <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
//                         <defs>
//                           <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
//                             <stop offset="0%" stopColor="#f97316" />
//                             <stop offset="100%" stopColor="#ef4444" />
//                           </linearGradient>
//                           <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
//                             <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
//                             <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
//                           </linearGradient>
//                         </defs>
//                         <path
//                           className="draw-line"
//                           d="M0,130 C50,120 80,90 120,95 C160,100 180,60 220,55 C260,50 280,30 320,25 C360,20 380,15 400,10"
//                           fill="none"
//                           stroke="url(#lineGrad)"
//                           strokeWidth="4"
//                           strokeLinecap="round"
//                         />
//                         <path
//                           d="M0,130 C50,120 80,90 120,95 C160,100 180,60 220,55 C260,50 280,30 320,25 C360,20 380,15 400,10 L400,160 L0,160 Z"
//                           fill="url(#areaGrad)"
//                         />
//                       </svg>
//                     </div>

//                     <div className="grid grid-cols-3 gap-3">
//                       {[
//                         { label: "Orders", value: "1.2K", color: "text-orange-400" },
//                         { label: "Revenue", value: "₹12L", color: "text-green-400" },
//                         { label: "Growth", value: "+38%", color: "text-blue-400" },
//                       ].map((s, i) => (
//                         <div
//                           key={i}
//                           className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 animate-pop-in"
//                           style={{ animationDelay: `${i * 0.2 + 0.6}s` }}
//                         >
//                           <p className="text-[10px] text-gray-400 mb-1">{s.label}</p>
//                           <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ═══════════════ FEATURES ═══════════════ */}
//       <div className="py-20 px-6 md:px-16 text-center bg-gradient-to-b from-white to-orange-50">
//         <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
//           ✨ Why Sellers Love Us
//         </div>

//         <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
//           Why Choose Selfysnap?
//         </h2>
//         <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-14">
//           Everything you need to grow your online business, all in one platform.
//         </p>

//         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {[
//             { icon: <FaMoneyBillWave />, title: "Low Commission", desc: "Keep more of what you earn with industry's lowest commission rates.", color: "from-green-500 to-emerald-600" },
//             { icon: <FaShippingFast />, title: "Fast Delivery", desc: "Pan-India shipping network delivering to 25,000+ pin codes.", color: "from-blue-500 to-blue-600" },
//             { icon: <FaBullhorn />, title: "Marketing Tools", desc: "Boost your sales with built-in ads, coupons, and promotions.", color: "from-orange-500 to-red-500" },
//             { icon: <FaHeadset />, title: "24×7 Support", desc: "Dedicated support team available round the clock for you.", color: "from-purple-500 to-pink-500" },
//             { icon: <FaShieldAlt />, title: "Secure Payments", desc: "100% secure transactions with encrypted payment gateways.", color: "from-teal-500 to-cyan-600" },
//             { icon: <FaRocket />, title: "Fast Setup", desc: "Start selling within minutes with our easy registration.", color: "from-indigo-500 to-violet-600" },
//           ].map((feature, i) => (
//             <div
//               key={i}
//               className="group p-8 bg-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 cursor-pointer border border-gray-100"
//               style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both` }}
//             >
//               <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-2xl mx-auto mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}>
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
//               <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ═══════════════ BIG CTA BANNER ═══════════════ */}
//       <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-gray-900 via-black to-orange-900">
//         <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-30 animate-float-slow"></div>
//         <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-20 animate-float-slow" style={{ animationDelay: "1s" }}></div>

//         <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-orange-900/40"></div>

//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 space-y-6">
//           <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold animate-fade-up">
//             <FaRocket />
//             Ready to Launch?
//           </div>

//           <h2 className="text-3xl md:text-6xl font-bold text-white leading-tight animate-fade-up delay-100 max-w-4xl">
//             Start Your Online Business <span className="text-orange-400">Today</span>
//           </h2>

//           <p className="text-gray-200 max-w-2xl text-lg animate-fade-up delay-200">
//             Join Selfysnap and reach millions of customers across India with
//             zero hassle and maximum profit.
//           </p>

//           <div className="flex flex-wrap gap-4 justify-center animate-fade-up delay-300 pt-4">
//             <button className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
//               Become a Seller
//               <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
//             </button>
//             <button className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-black transition-all hover:scale-105 active:scale-95">
//               Contact Us
//             </button>
//           </div>

//           <div className="flex items-center gap-6 pt-6 text-white/80 text-sm animate-fade-up delay-400 flex-wrap justify-center">
//             <div className="flex items-center gap-2"><FaCheckCircle className="text-green-400" /><span>Free Registration</span></div>
//             <div className="flex items-center gap-2"><FaCheckCircle className="text-green-400" /><span>No Setup Fee</span></div>
//             <div className="flex items-center gap-2"><FaCheckCircle className="text-green-400" /><span>24×7 Support</span></div>
//           </div>
//         </div>
//       </div>

//       {/* ═══════════════ FOOTER ═══════════════ */}
//       <footer className="bg-gray-900 text-gray-300 pt-16 pb-6">
//         <div className="px-6 md:px-16">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
//             <div className="space-y-5">
//               <div className="flex items-center gap-3">
//                 <img src="/logo.jpeg" alt="Selfysnap" className="h-12 rounded-lg" />
//                 <h3 className="text-2xl font-bold text-white">
//                   Selfy<span className="text-orange-500">snap</span>
//                 </h3>
//               </div>
//               <p className="text-gray-400 leading-relaxed">
//                 India's fastest growing multi-vendor marketplace connecting
//                 sellers and customers across the nation.
//               </p>
//               <div className="flex gap-3 pt-2">
//                 {socialLinks.map((social, i) => (
//                   <a key={i} href="#" className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white transition-all hover:scale-110 ${social.color}`}>
//                     {social.icon}
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* 🔥 QUICK LINKS — Clickable */}
//             <div>
//               <h4 className="text-white font-bold text-lg mb-5 relative inline-block">
//                 Quick Links
//                 <span className="absolute -bottom-1 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
//               </h4>
//               <ul className="space-y-3">
//                 {quickLinks.map((link, i) => (
//                   <li key={i}>
//                     <Link
//                       to={link.path}
//                       className="hover:text-orange-500 transition-colors flex items-center gap-2 group"
//                     >
//                       <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:w-3 transition-all"></span>
//                       {link.title}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* 🔥 POLICIES — Clickable (Bina Login) */}
//             <div>
//               <h4 className="text-white font-bold text-lg mb-5 relative inline-block">
//                 Policies
//                 <span className="absolute -bottom-1 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
//               </h4>
//               <ul className="space-y-3">
//                 {policyLinks.map((link, i) => (
//                   <li key={i}>
//                     <Link
//                       to={link.path}
//                       className="hover:text-orange-500 transition-colors flex items-center gap-2 group"
//                     >
//                       <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:w-3 transition-all"></span>
//                       {link.title}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h4 className="text-white font-bold text-lg mb-5 relative inline-block">
//                 Get In Touch
//                 <span className="absolute -bottom-1 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
//               </h4>
//               <ul className="space-y-4">
//                 <li className="flex items-start gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0 mt-0.5">
//                     <FaMapMarkerAlt />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-400">Address</p>
//                     <p className="text-white text-sm">
//                       Selfysnap Warehouse, Plot No. 12,<br />Main Market, Hisar, Haryana
//                     </p>
//                   </div>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0">
//                     <FaPhone />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-400">Phone</p>
//                     <a href="tel:+919992088843" className="text-white text-sm hover:text-orange-500">
//                       +91 99920 88843
//                     </a>
//                   </div>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0">
//                     <FaEnvelope />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-400">Email</p>
//                     <a href="mailto:support@selfysnap.com" className="text-white text-sm hover:text-orange-500">
//                       support@selfysnap.com
//                     </a>
//                   </div>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
//             <div>
//               <p className="text-white font-bold text-lg mb-1">📱 Download Our App</p>
//               <p className="text-gray-400 text-sm">Shop on the go - Available on all platforms</p>
//             </div>
//             <div className="flex gap-3">
//               <button className="bg-black border border-gray-700 text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition-all flex items-center gap-3 group">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.066l2.5 1.44a1 1 0 0 1 0 1.732l-2.5 1.44-2.5-2.307 2.5-2.305zm-3.199-3.199L5.864 1.807l10.937 6.333-2.302 2.302z"/>
//                 </svg>
//                 <div className="text-left">
//                   <p className="text-[10px] text-gray-400">GET IT ON</p>
//                   <p className="text-sm font-bold">Google Play</p>
//                 </div>
//               </button>

//               <button className="bg-black border border-gray-700 text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition-all flex items-center gap-3 group">
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
//                 </svg>
//                 <div className="text-left">
//                   <p className="text-[10px] text-gray-400">Download on the</p>
//                   <p className="text-sm font-bold">App Store</p>
//                 </div>
//               </button>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
//             <p>
//               © {new Date().getFullYear()} <span className="text-white font-semibold">Selfysnap</span>. All rights reserved.
//             </p>
//             <p className="flex items-center gap-2">
//               Made with <span className="text-red-500 animate-pulse">❤️</span> in India
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Landing;





























import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaStore,
  FaBoxOpen,
  FaUsers,
  FaChartLine,
  FaShippingFast,
  FaMoneyBillWave,
  FaBullhorn,
  FaTruck,
  FaBox,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaShieldAlt,
  FaHeadset,
  FaRocket,
  FaStar,
  FaWallet,
  FaChartBar,
  FaBell,
  FaPlay,
  FaPause,
  FaUserPlus,
  FaClipboardCheck,
  FaUpload,
  FaRupeeSign,
  FaGraduationCap,
} from "react-icons/fa";

interface SocialLink {
  icon: React.ReactNode;
  color: string;
}

interface FooterLink {
  title: string;
  path: string;
}

const Landing: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleVideo = (): void => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const quickLinks: FooterLink[] = [
    { title: "About Us", path: "/about" },
    { title: "Become Seller", path: "/become-seller" },
    { title: "Careers", path: "/careers" },
    { title: "Blog", path: "/blog" },
    { title: "Press", path: "/press" },
    { title: "Contact Us", path: "/contact" },
  ];

  const policyLinks: FooterLink[] = [
    { title: "Terms & Conditions", path: "/terms-and-conditions" },
    { title: "Privacy Policy", path: "/privacy-policy" },
    { title: "Refund Policy", path: "/refund-policy" },
    { title: "Shipping Policy", path: "/shipping-policy" },
    { title: "Return Policy", path: "/return-policy" },
    { title: "Seller Agreement", path: "/seller-agreement" },
  ];

  const socialLinks: SocialLink[] = [
    { icon: <FaFacebook />, color: "hover:bg-blue-600" },
    { icon: <FaInstagram />, color: "hover:bg-pink-600" },
    { icon: <FaTwitter />, color: "hover:bg-sky-500" },
    { icon: <FaYoutube />, color: "hover:bg-red-600" },
    { icon: <FaLinkedin />, color: "hover:bg-blue-700" },
  ];

  return (
    <div className="w-full overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(2deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.5); }
          50% { box-shadow: 0 0 0 20px rgba(249, 115, 22, 0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes scale-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes bar-grow {
          from { height: 0%; }
        }
        @keyframes draw-line {
          from { stroke-dashoffset: 400; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.6); }
          70% { transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes coin-flip {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.9); opacity: 0.9; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes shimmer-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-marquee { animation: marquee 25s linear infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-fade-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-slide-left { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slide-right { animation: slideInRight 0.8s ease-out forwards; }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
        .animate-scale-bounce { animation: scale-bounce 2s ease-in-out infinite; }
        .animate-pop-in { animation: pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .animate-coin-flip { animation: coin-flip 3s ease-in-out infinite; }
        .bar-grow { animation: bar-grow 1.4s ease-out both; }
        .draw-line {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: draw-line 2s ease-out 0.4s forwards;
        }
        .pulse-ring::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: rgba(239, 68, 68, 0.7);
          animation: pulse-ring 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .shimmer-line::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          animation: shimmer-line 3s ease-in-out infinite;
          pointer-events: none;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <div className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-40 animate-float-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-30 animate-float-slow" style={{ animationDelay: "1.5s" }}></div>

        <div className="relative md:w-1/2 space-y-6 animate-slide-left">
          <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
            <FaRocket className="animate-bounce" />
            India's Fastest Growing Marketplace
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            Sell Across India <br />
            with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 animate-gradient">
              Selfysnap
            </span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-lg">
            Join thousands of sellers growing their business online with zero
            investment and maximum profits.
          </p>

          <ul className="text-gray-700 space-y-3 text-base">
            <li className="flex items-center gap-3 animate-fade-up delay-100">
              <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
              <span>Zero registration cost</span>
            </li>
            <li className="flex items-center gap-3 animate-fade-up delay-200">
              <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
              <span>Fast payments within 24 hours</span>
            </li>
            <li className="flex items-center gap-3 animate-fade-up delay-300">
              <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
              <span>Easy-to-use seller dashboard</span>
            </li>
          </ul>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => navigate("/become-seller")}
              className="group relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/60 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Start Selling</span>
              <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <button
              onClick={() => navigate("/learning-hub")}
              className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-orange-500 hover:text-white transition-all hover:scale-105 active:scale-95"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative md:w-1/2 mt-16 md:mt-0 flex justify-center animate-slide-right">
          <div className="relative w-full max-w-[520px]">
            <div className="relative bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-600 to-red-500"></div>

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white animate-scale-bounce">
                    <FaStore />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Seller Dashboard</p>
                    <p className="text-sm font-bold text-gray-800">
                      Welcome back 👋
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <FaBell className="text-gray-400 text-xl" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white mb-5 overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500 rounded-full blur-2xl opacity-40"></div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">This Month</p>
                    <p className="text-3xl font-bold">₹12,45,800</p>
                    <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                      <FaChartLine /> +24.8% vs last month
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 text-xl animate-coin-flip">
                    <FaWallet />
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between gap-2 h-28 mb-4">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-orange-400 to-orange-600 bar-grow"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    ></div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-orange-50 rounded-xl p-3 animate-pop-in delay-500">
                  <div className="flex items-center gap-2 text-orange-600 mb-1">
                    <FaBoxOpen className="text-sm" />
                    <p className="text-[10px] font-semibold">Orders</p>
                  </div>
                  <p className="text-lg font-bold text-gray-800">1,248</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 animate-pop-in delay-700">
                  <div className="flex items-center gap-2 text-green-600 mb-1">
                    <FaChartBar className="text-sm" />
                    <p className="text-[10px] font-semibold">Growth</p>
                  </div>
                  <p className="text-lg font-bold text-gray-800">+38%</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -left-6 bg-white shadow-xl rounded-2xl p-4 z-10 animate-float border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FaStore className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Active Sellers</p>
                  <p className="text-lg font-bold text-gray-800">10,000+</p>
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-6 -right-6 bg-white shadow-xl rounded-2xl p-4 z-10 animate-float border border-gray-100"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaBoxOpen className="text-orange-600 text-xl" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Products Live</p>
                  <p className="text-lg font-bold text-gray-800">45,000+</p>
                </div>
              </div>
            </div>

            <div
              className="absolute top-1/2 -right-10 bg-white shadow-xl rounded-2xl px-4 py-3 z-10 animate-float hidden md:flex items-center gap-2 border border-gray-100"
              style={{ animationDelay: "0.5s" }}
            >
              <FaStar className="text-yellow-400 text-lg" />
              <div>
                <p className="text-xs font-bold text-gray-800">4.9 / 5</p>
                <p className="text-[10px] text-gray-500">Seller Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ SELLER REGISTRATION VIDEO SECTION ═══════════════ */}
      <div className="relative px-6 md:px-16 py-20 bg-gradient-to-br from-white via-orange-50/40 to-white overflow-hidden">
        <div className="absolute -top-16 left-1/4 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-40 animate-float-slow"></div>
        <div
          className="absolute -bottom-16 right-1/4 w-80 h-80 bg-red-200 rounded-full blur-3xl opacity-30 animate-float-slow"
          style={{ animationDelay: "1.5s" }}
        ></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-fade-up">
              <FaPlay className="text-xs" />
              Watch How It Works
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 animate-fade-up delay-100">
              Seller{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 animate-gradient">
                Registration
              </span>{" "}
              Process
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-up delay-200">
              Watch this quick video to see how easily you can register and
              start selling on Selfysnap in just a few minutes.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3 animate-slide-left">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-[28px] blur-lg opacity-70 animate-gradient"></div>

                <div className="relative bg-black rounded-[24px] overflow-hidden shadow-2xl shimmer-line">
                  <video
                    ref={videoRef}
                    className="w-full h-[280px] md:h-[420px] lg:h-[460px] object-cover cursor-pointer"
                    loop
                    playsInline
                    preload="metadata"
                    onClick={toggleVideo}
                  >
                    <source src="/seller.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {!isPlaying && (
                    <div
                      onClick={toggleVideo}
                      className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-black/30 to-black/40 cursor-pointer transition-opacity"
                    >
                      <div className="relative">
                        <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-60"></span>
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-2xl shadow-orange-500/60 hover:scale-110 transition-transform">
                          <FaPlay className="text-2xl md:text-3xl ml-1" />
                        </div>
                      </div>
                    </div>
                  )}

                  {isPlaying && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVideo();
                      }}
                      className="absolute bottom-20 right-5 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-orange-500 transition-all z-20"
                    >
                      <FaPause className="text-sm" />
                    </button>
                  )}

                  <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/80 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none"></div>

                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg pointer-events-none">
                    <span className="relative flex w-2.5 h-2.5">
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white pulse-ring"></span>
                    </span>
                    SELLER TUTORIAL
                  </div>

                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold border border-white/20 pointer-events-none">
                    ⏱ 3:45 min
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-4 pointer-events-none">
                    <div className="text-white">
                      <p className="text-base md:text-xl font-bold mb-1">
                        How to Register as a Seller
                      </p>
                      <p className="text-xs md:text-sm text-gray-300 flex items-center gap-2">
                        <FaUserPlus className="text-orange-400" />
                        {isPlaying
                          ? "Now Playing..."
                          : "Tap to watch the guide"}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVideo();
                      }}
                      className="pointer-events-auto flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white transition-all hover:scale-110 shadow-2xl shadow-orange-500/50"
                    >
                      {isPlaying ? (
                        <FaPause className="text-lg" />
                      ) : (
                        <FaPlay className="text-lg ml-0.5" />
                      )}
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 pointer-events-none">
                    <div
                      className={`h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-1000 ${
                        isPlaying ? "w-2/3" : "w-1/3"
                      }`}
                    ></div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white shadow-xl rounded-2xl p-4 z-10 animate-float border border-gray-100 hidden md:flex items-center gap-3">
                  <div className="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center">
                    <FaClipboardCheck className="text-green-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500">Setup Time</p>
                    <p className="text-sm font-bold text-gray-800">
                      Under 5 min
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4 animate-slide-right">
              <div className="mb-6">
                <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-2">
                  Simple 4-Step Process
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  Start Selling in{" "}
                  <span className="text-orange-500">4 Easy Steps</span>
                </h3>
              </div>

              {[
                {
                  step: "01",
                  icon: <FaUserPlus />,
                  title: "Create Account",
                  desc: "Register with your mobile number & email — 100% free.",
                  color: "from-orange-500 to-red-500",
                },
                {
                  step: "02",
                  icon: <FaClipboardCheck />,
                  title: "Verify Details",
                  desc: "Add GST, PAN and bank details for quick payouts.",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  step: "03",
                  icon: <FaUpload />,
                  title: "Upload Products",
                  desc: "List your products with photos, price and stock.",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  step: "04",
                  icon: <FaRupeeSign />,
                  title: "Start Earning",
                  desc: "Receive orders & get payments within 24 hours.",
                  color: "from-green-500 to-emerald-600",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${i * 0.15}s both`,
                  }}
                >
                  <div
                    className={`absolute left-0 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                  ></div>

                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-lg shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        {item.icon}
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-900 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                        {item.step}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-base font-bold text-gray-800 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => navigate("/become-seller")}
                className="group w-full mt-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/40 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 animate-pulse-glow"
              >
                Register Now — It's Free
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ RUNNING STRIP ═══════════════ */}
      <div className="w-full overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 py-5">
        <div className="animate-marquee flex items-center gap-16">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-16">
              {[
                { icon: <FaTruck />, text: "Fast Delivery" },
                { icon: <FaBox />, text: "All India Shipping" },
                { icon: <FaShieldAlt />, text: "Secure Packaging" },
                { icon: <FaRocket />, text: "Express Service" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-white text-lg font-bold whitespace-nowrap"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.text}</span>
                  <span className="text-orange-200 ml-8">★</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════ STATS ═══════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-16 py-16 bg-white">
        {[
          {
            icon: <FaStore />,
            value: "10K+",
            label: "Active Sellers",
            color: "from-orange-500 to-orange-600",
          },
          {
            icon: <FaBoxOpen />,
            value: "45K+",
            label: "Products Listed",
            color: "from-blue-500 to-blue-600",
          },
          {
            icon: <FaUsers />,
            value: "20K+",
            label: "Happy Customers",
            color: "from-green-500 to-green-600",
          },
          {
            icon: <FaChartLine />,
            value: "99%",
            label: "Success Rate",
            color: "from-purple-500 to-purple-600",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="group flex flex-col items-center p-6 rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 cursor-pointer"
            style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.15}s both` }}
          >
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}
            >
              {stat.icon}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              {stat.value}
            </h2>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ═══════════════ WELCOME SECTION ═══════════════ */}
      <div className="px-6 md:px-16 py-16">
        <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-20 animate-float-slow"></div>
          <div
            className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-10 animate-float-slow"
            style={{ animationDelay: "1.5s" }}
          ></div>

          <div className="relative flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-10">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold">
                <FaRocket className="text-xs" />
                Grow With Us
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Welcome to <span className="text-orange-500">Selfysnap</span>{" "}
                Sellers
              </h2>

              <p className="text-gray-300 text-lg">
                Start your journey and unlock unlimited growth opportunities
                with India's most trusted marketplace.
              </p>

              <ul className="text-gray-300 space-y-3">
                {[
                  "Easy onboarding in 5 minutes",
                  "Advanced analytics dashboard",
                  "Secure and fast payments",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 animate-fade-up"
                    style={{ animationDelay: `${i * 0.15 + 0.3}s` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-orange-400 text-sm" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => navigate("/become-seller")}
                  className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/40 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 animate-pulse-glow"
                >
                  Join Now
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="md:w-1/2 w-full">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-3xl blur opacity-75 animate-gradient"></div>

                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-white/10 overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                      backgroundSize: "30px 30px",
                    }}
                  ></div>

                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-xs text-gray-400">
                          Sales Analytics
                        </p>
                        <p className="text-2xl font-bold text-white">
                          Live Growth
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1.5 rounded-full text-xs font-semibold">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Live
                      </div>
                    </div>

                    <div className="relative h-40 mb-6">
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 400 160"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient
                            id="lineGrad"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#ef4444" />
                          </linearGradient>
                          <linearGradient
                            id="areaGrad"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#f97316"
                              stopOpacity="0.4"
                            />
                            <stop
                              offset="100%"
                              stopColor="#f97316"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        <path
                          className="draw-line"
                          d="M0,130 C50,120 80,90 120,95 C160,100 180,60 220,55 C260,50 280,30 320,25 C360,20 380,15 400,10"
                          fill="none"
                          stroke="url(#lineGrad)"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M0,130 C50,120 80,90 120,95 C160,100 180,60 220,55 C260,50 280,30 320,25 C360,20 380,15 400,10 L400,160 L0,160 Z"
                          fill="url(#areaGrad)"
                        />
                      </svg>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          label: "Orders",
                          value: "1.2K",
                          color: "text-orange-400",
                        },
                        {
                          label: "Revenue",
                          value: "₹12L",
                          color: "text-green-400",
                        },
                        {
                          label: "Growth",
                          value: "+38%",
                          color: "text-blue-400",
                        },
                      ].map((s, i) => (
                        <div
                          key={i}
                          className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 animate-pop-in"
                          style={{ animationDelay: `${i * 0.2 + 0.6}s` }}
                        >
                          <p className="text-[10px] text-gray-400 mb-1">
                            {s.label}
                          </p>
                          <p className={`text-sm font-bold ${s.color}`}>
                            {s.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <div className="py-20 px-6 md:px-16 text-center bg-gradient-to-b from-white to-orange-50">
        <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          ✨ Why Sellers Love Us
        </div>

        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
          Why Choose Selfysnap?
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-14">
          Everything you need to grow your online business, all in one
          platform.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <FaMoneyBillWave />,
              title: "Low Commission",
              desc: "Keep more of what you earn with industry's lowest commission rates.",
              color: "from-green-500 to-emerald-600",
            },
            {
              icon: <FaShippingFast />,
              title: "Fast Delivery",
              desc: "Pan-India shipping network delivering to 25,000+ pin codes.",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: <FaBullhorn />,
              title: "Marketing Tools",
              desc: "Boost your sales with built-in ads, coupons, and promotions.",
              color: "from-orange-500 to-red-500",
            },
            {
              icon: <FaHeadset />,
              title: "24×7 Support",
              desc: "Dedicated support team available round the clock for you.",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: <FaShieldAlt />,
              title: "Secure Payments",
              desc: "100% secure transactions with encrypted payment gateways.",
              color: "from-teal-500 to-cyan-600",
            },
            {
              icon: <FaRocket />,
              title: "Fast Setup",
              desc: "Start selling within minutes with our easy registration.",
              color: "from-indigo-500 to-violet-600",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group p-8 bg-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 cursor-pointer border border-gray-100"
              style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both` }}
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-2xl mx-auto mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════ LEARNING HUB SECTION ═══════════════ */}
      <div className="px-6 md:px-16 py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-40 animate-float-slow"></div>
        <div
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 animate-float-slow"
          style={{ animationDelay: "1.5s" }}
        ></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 border border-indigo-200 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <FaGraduationCap />
            Free Learning Resources
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Selfysnap{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient">
              Learning Hub
            </span>
          </h2>

          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Master the art of online selling with our free video guides,
            tutorials & expert insights — designed for sellers like you.
          </p>

          <button
            onClick={() => navigate("/learning-hub")}
            className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <FaGraduationCap />
            Explore Learning Hub
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* ═══════════════ BIG CTA BANNER ═══════════════ */}
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-gray-900 via-black to-orange-900">
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-30 animate-float-slow"></div>
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-20 animate-float-slow"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-orange-900/40"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold animate-fade-up">
            <FaRocket />
            Ready to Launch?
          </div>

          <h2 className="text-3xl md:text-6xl font-bold text-white leading-tight animate-fade-up delay-100 max-w-4xl">
            Start Your Online Business{" "}
            <span className="text-orange-400">Today</span>
          </h2>

          <p className="text-gray-200 max-w-2xl text-lg animate-fade-up delay-200">
            Join Selfysnap and reach millions of customers across India with
            zero hassle and maximum profit.
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-up delay-300 pt-4">
            <button
              onClick={() => navigate("/become-seller")}
              className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              Become a Seller
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-black transition-all hover:scale-105 active:scale-95"
            >
              Contact Us
            </button>
          </div>

          <div className="flex items-center gap-6 pt-6 text-white/80 text-sm animate-fade-up delay-400 flex-wrap justify-center">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              <span>Free Registration</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              <span>No Setup Fee</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              <span>24×7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-6">
        <div className="px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.jpeg"
                  alt="Selfysnap"
                  className="h-12 rounded-lg"
                />
                <h3 className="text-2xl font-bold text-white">
                  Selfy<span className="text-orange-500">snap</span>
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                India's fastest growing multi-vendor marketplace connecting
                sellers and customers across the nation.
              </p>
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white transition-all hover:scale-110 ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-5 relative inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.path}
                      className="hover:text-orange-500 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:w-3 transition-all"></span>
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 className="text-white font-bold text-lg mb-5 relative inline-block">
                Policies
                <span className="absolute -bottom-1 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
              </h4>
              <ul className="space-y-3">
                {policyLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.path}
                      className="hover:text-orange-500 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full group-hover:w-3 transition-all"></span>
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact — Address REMOVED */}
            <div>
              <h4 className="text-white font-bold text-lg mb-5 relative inline-block">
                Get In Touch
                <span className="absolute -bottom-1 left-0 w-12 h-1 bg-orange-500 rounded-full"></span>
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    {/* <a
                      href="tel:+919992088843"
                      className="text-white text-sm hover:text-orange-500"
                    >
                      +91 99920 88843
                    </a> */}
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a
                      href="mailto:support@selfysnap.com"
                      className="text-white text-sm hover:text-orange-500"
                    >
                      support@selfysnap.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold text-lg mb-1">
             selfysnap App comming soon
              </p>
              <p className="text-gray-400 text-sm">
                Shop on the go - Available on all platforms
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-black border border-gray-700 text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition-all flex items-center gap-3 group">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.066l2.5 1.44a1 1 0 0 1 0 1.732l-2.5 1.44-2.5-2.307 2.5-2.305zm-3.199-3.199L5.864 1.807l10.937 6.333-2.302 2.302z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400">GET IT ON</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </button>

              <button className="bg-black border border-gray-700 text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition-all flex items-center gap-3 group">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400">
                    Download on the
                  </p>
                  <p className="text-sm font-bold">App Store</p>
                </div>
              </button>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="text-white font-semibold">Selfysnap</span>. All
              rights reserved.
            </p>
           
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
