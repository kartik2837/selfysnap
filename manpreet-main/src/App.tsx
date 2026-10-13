// import './App.css';
// import { ThemeProvider } from '@emotion/react';
// import customeTheme from './Theme/customeTheme';

// import { Route, Routes, useNavigate } from 'react-router-dom';

// import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
// import CustomerRoutes from './routes/CustomerRoutes';
// import AdminDashboard from './admin/pages/Dashboard/Dashboard';
// import SellerAccountVerification from './seller/pages/SellerAccountVerification';
// import SellerAccountVerified from './seller/pages/SellerAccountVerified';
// import { useAppDispatch, useAppSelector } from './Redux Toolkit/Store';
// import { useEffect } from 'react';
// import { fetchSellerProfile } from './Redux Toolkit/Seller/sellerSlice';
// import BecomeSeller from './customer/pages/BecomeSeller/BecomeSeller';
// import AdminAuth from './admin/pages/Auth/AdminAuth';
// import { fetchUserProfile } from './Redux Toolkit/Customer/UserSlice';
// import { fetchHomePageData } from './Redux Toolkit/Customer/Customer/AsyncThunk';
// import ScrollToTop from './customer/components/TopScroll/ScrollToTop';
// import { ToastContainer } from 'react-toastify';



// function App() {
//   const dispatch = useAppDispatch()
//   const { auth, sellerAuth, sellers, user } = useAppSelector(store => store)
// const navigate=useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("jwt")) {
//       dispatch(fetchUserProfile({jwt:localStorage.getItem("jwt") || auth.jwt || "",navigate}));
//       dispatch(fetchSellerProfile(localStorage.getItem("jwt") || sellerAuth.jwt))
//     }

//   }, [auth.jwt, sellerAuth.jwt])

//   useEffect(() => {
//     // Fetch home page data from database instead of posting static data
//     dispatch(fetchHomePageData() as any)
//   }, [dispatch])

//   return (
    
    
//     <ThemeProvider theme={customeTheme}>
      
//       <div className='App' >
//      <ScrollToTop centerLogo="/logo34.png" brandLogo="/logo34.png" />


//         <ToastContainer position="top-right" autoClose={3000} />

//         <Routes>
//           {sellers.profile && <Route path='/seller/*' element={<SellerDashboard />} />}
//           {user.user?.role === "ROLE_ADMIN" && <Route path='/admin/*' element={<AdminDashboard />} />}
//           <Route path='/verify-seller/:otp' element={<SellerAccountVerification />} />
//           <Route path='/seller-account-verified' element={<SellerAccountVerified />} />
//           <Route path='/become-seller' element={<BecomeSeller />} />
//           <Route path='/admin-login' element={<AdminAuth />} />

//           <Route path='*' element={<CustomerRoutes />} />

//         </Routes>
//         {/* <Footer/> */}
//       </div>



//     </ThemeProvider>
//   );
// }

// export default App;





















// import './App.css';
// import { ThemeProvider } from '@emotion/react';
// import customeTheme from './Theme/customeTheme';

// import { Route, Routes, useNavigate } from 'react-router-dom';

// import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
// import CustomerRoutes from './routes/CustomerRoutes';
// import AdminDashboard from './admin/pages/Dashboard/Dashboard';
// import SellerAccountVerification from './seller/pages/SellerAccountVerification';
// import SellerAccountVerified from './seller/pages/SellerAccountVerified';
// import { useAppDispatch, useAppSelector } from './Redux Toolkit/Store';
// import { useEffect, useState } from 'react';
// import { fetchSellerProfile } from './Redux Toolkit/Seller/sellerSlice';
// import BecomeSeller from './customer/pages/BecomeSeller/BecomeSeller';
// import AdminAuth from './admin/pages/Auth/AdminAuth';
// import { fetchUserProfile } from './Redux Toolkit/Customer/UserSlice';
// import { fetchHomePageData } from './Redux Toolkit/Customer/Customer/AsyncThunk';
// import ScrollToTop from './customer/components/TopScroll/ScrollToTop';


// function App() {
//   const dispatch = useAppDispatch();
//   const { auth, sellerAuth, sellers, user } = useAppSelector(store => store);
//   const navigate = useNavigate();

//   // Right-click alert state
//   const [showAlert, setShowAlert] = useState(false);

//   // Fetch profiles
//   useEffect(() => {
//     const jwt = localStorage.getItem("jwt") || auth.jwt || sellerAuth.jwt || "";
//     if (jwt) {
//       dispatch(fetchUserProfile({ jwt, navigate }));
//       dispatch(fetchSellerProfile(jwt));
//     }
//   }, [auth.jwt, sellerAuth.jwt]);

//   // Fetch homepage data
//   useEffect(() => {
//     dispatch(fetchHomePageData() as any);
//   }, [dispatch]);

//   // Disable inspect / right-click / view-source / F12
//   useEffect(() => {
//     // Right-click alert
//     const handleContextMenu = (e: MouseEvent) => {
//       e.preventDefault();
//       setShowAlert(true);
//       setTimeout(() => setShowAlert(false), 2000); // auto-hide after 2 sec
//     };
//     document.addEventListener("contextmenu", handleContextMenu);

//     // Disable keyboard shortcuts
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "F12") e.preventDefault();
//       if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) e.preventDefault();
//       if (e.ctrlKey && e.key.toUpperCase() === "U") e.preventDefault();
//     };
//     document.addEventListener("keydown", handleKeyDown);

//     return () => {
//       document.removeEventListener("contextmenu", handleContextMenu);
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   return (
//     <ThemeProvider theme={customeTheme}>
//       <div className='App'>
     
//        <ScrollToTop />
    

//         {/* Custom Right-click Alert */}
//         {showAlert && (
//           <div style={{
//             position: "fixed",
//             top: "20px",
//             right: "20px",
//             backgroundColor: "#f44336", // red
//             color: "white",
//             padding: "15px 20px",
//             borderRadius: "8px",
//             boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
//             zIndex: 99999,
//             fontWeight: "bold",
//             fontFamily: "sans-serif",
//             animation: "slideIn 0.3s ease-in-out"
//           }}>
//             ⚠ Website Security: Right-click is disabled!
//             <style>{`
//               @keyframes slideIn {
//                 0% { transform: translateX(100%); opacity: 0; }
//                 100% { transform: translateX(0); opacity: 1; }
//               }
//             `}</style>
//           </div>
//         )}

//         <Routes>
//           {sellers.profile && <Route path='/seller/*' element={<SellerDashboard />} />}
//           {user.user?.role === "ROLE_ADMIN" && <Route path='/admin/*' element={<AdminDashboard />} />}
//           <Route path='/verify-seller/:otp' element={<SellerAccountVerification />} />
//           <Route path='/seller-account-verified' element={<SellerAccountVerified />} />
//           <Route path='/become-seller' element={<BecomeSeller />} />
          
//           <Route path='/admin-login' element={<AdminAuth />} />
//           <Route path='*' element={<CustomerRoutes />} />
           
//         </Routes>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App; 






// import './App.css';
// import { ThemeProvider } from '@emotion/react';
// import customeTheme from './Theme/customeTheme';

// import { Route, Routes, useNavigate } from 'react-router-dom';

// import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
// import CustomerRoutes from './routes/CustomerRoutes';
// import AdminDashboard from './admin/pages/Dashboard/Dashboard';
// import SellerAccountVerification from './seller/pages/SellerAccountVerification';
// import SellerAccountVerified from './seller/pages/SellerAccountVerified';
// import { useAppDispatch, useAppSelector } from './Redux Toolkit/Store';
// import { useEffect, useState } from 'react';
// import { fetchSellerProfile } from './Redux Toolkit/Seller/sellerSlice';
// import BecomeSeller from './customer/pages/BecomeSeller/BecomeSeller';
// import AdminAuth from './admin/pages/Auth/AdminAuth';
// import { fetchUserProfile } from './Redux Toolkit/Customer/UserSlice';
// import { fetchHomePageData } from './Redux Toolkit/Customer/Customer/AsyncThunk';
// import ScrollToTop from './customer/components/TopScroll/ScrollToTop';

// // ─── NEW: Report Pages Imports ──────────────────────────────
// // import Dashboard from './seller/pages/SellerDashboard/SellerDashboard';
// // import SalesReport from './seller/pages/SellerDashboard/Report/SalesReport';
// // import InventoryStockReport from './seller/pages/SellerDashboard/Report/InventoryStockReport';
// // import InventorySummaryReport from './seller/pages/SellerDashboard/Report/InventorySummaryReport';

// function App() {
//   const dispatch = useAppDispatch();
//   const { auth, sellerAuth, sellers, user } = useAppSelector(store => store);
//   const navigate = useNavigate();

//   // Right-click alert state
//   const [showAlert, setShowAlert] = useState(false);

//   // Fetch profiles
//   useEffect(() => {
//     const jwt = localStorage.getItem("jwt") || auth.jwt || sellerAuth.jwt || "";
//     if (jwt) {
//       dispatch(fetchUserProfile({ jwt, navigate }));
//       dispatch(fetchSellerProfile(jwt));
//     }
//   }, [auth.jwt, sellerAuth.jwt]);

//   // Fetch homepage data
//   useEffect(() => {
//     dispatch(fetchHomePageData() as any);
//   }, [dispatch]);

//   // Disable inspect / right-click / view-source / F12
//   // useEffect(() => {
//   //   // Right-click alert
//   //   const handleContextMenu = (e: MouseEvent) => {
//   //     e.preventDefault();
//   //     setShowAlert(true);
//   //     setTimeout(() => setShowAlert(false), 2000); // auto-hide after 2 sec
//   //   };
//   //   document.addEventListener("contextmenu", handleContextMenu);

//   //   // Disable keyboard shortcuts
//   //   const handleKeyDown = (e: KeyboardEvent) => {
//   //     if (e.key === "F12") e.preventDefault();
//   //     if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) e.preventDefault();
//   //     if (e.ctrlKey && e.key.toUpperCase() === "U") e.preventDefault();
//   //   };
//   //   document.addEventListener("keydown", handleKeyDown);

//   //   return () => {
//   //     document.removeEventListener("contextmenu", handleContextMenu);
//   //     document.removeEventListener("keydown", handleKeyDown);
//   //   };
//   // }, []);

//   return (
//     <ThemeProvider theme={customeTheme}>
//       <div className='App'>
//         <ScrollToTop />

//         {/* Custom Right-click Alert */}
//         {showAlert && (
//           <div style={{
//             position: "fixed",
//             top: "20px",
//             right: "20px",
//             backgroundColor: "#f44336", // red
//             color: "white",
//             padding: "15px 20px",
//             borderRadius: "8px",
//             boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
//             zIndex: 99999,
//             fontWeight: "bold",
//             fontFamily: "sans-serif",
//             animation: "slideIn 0.3s ease-in-out"
//           }}>
//             ⚠ Website Security: Right-click is disabled!
//             <style>{`
//               @keyframes slideIn {
//                 0% { transform: translateX(100%); opacity: 0; }
//                 100% { transform: translateX(0); opacity: 1; }
//               }
//             `}</style>
//           </div>
//         )}

//         <Routes>
//           {/* ─── Seller Routes ─────────────────────────────── */}
//           {sellers.profile && (
//             <Route path='/seller/*' element={<SellerDashboard />} />
//           )}

//           {/* ─── Report Routes (Accessible to Authenticated Users) ─── */}
//           {/* ये Routes Seller Dashboard के अंदर भी डाल सकते हैं, या यहाँ भी रख सकते हैं */}
//           {/* <Route path='/reports/dashboard' element={<Dashboard />} />
//           <Route path='/reports/sales' element={<SalesReport />} />
//           <Route path='/reports/inventory/stock' element={<InventoryStockReport />} />
//           <Route path='/reports/inventory/summary' element={<InventorySummaryReport />} /> */}

//           {/* ─── Admin Routes ───────────────────────────────── */}
//           {user.user?.role === "ROLE_ADMIN" && (
//             <Route path='/admin/*' element={<AdminDashboard />} />
//           )}

//           {/* ─── Public Routes ───────────────────────────────── */}
//           <Route path='/verify-seller/:otp' element={<SellerAccountVerification />} />
//           <Route path='/seller-account-verified' element={<SellerAccountVerified />} />
//           <Route path='/become-seller' element={<BecomeSeller />} />
//           <Route path='/admin-login' element={<AdminAuth />} />

//           {/* ─── Customer Default Routes ────────────────────── */}
//           <Route path='*' element={<CustomerRoutes />} />
//         </Routes>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;









// import { ThemeProvider } from '@emotion/react';
// import customeTheme from './Theme/customeTheme';
// import { Route, Routes, useNavigate } from 'react-router-dom';

// import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
// import CustomerRoutes from './routes/CustomerRoutes';
// import AdminDashboard from './admin/pages/Dashboard/Dashboard';
// import SellerAccountVerification from './seller/pages/SellerAccountVerification';
// import SellerAccountVerified from './seller/pages/SellerAccountVerified';
// import { useAppDispatch, useAppSelector } from './Redux Toolkit/Store';
// import { useEffect, useState } from 'react';
// import { fetchSellerProfile } from './Redux Toolkit/Seller/sellerSlice';
// import BecomeSeller from './customer/pages/BecomeSeller/BecomeSeller';
// import AdminAuth from './admin/pages/Auth/AdminAuth';
// import { fetchUserProfile } from './Redux Toolkit/Customer/UserSlice';
// import { fetchHomePageData } from './Redux Toolkit/Customer/Customer/AsyncThunk';
// import ScrollToTop from './customer/components/TopScroll/ScrollToTop';

// function App() {
//   const dispatch = useAppDispatch();

//   /* 🔥 Full store as any — no type errors */
//   const store: any = useAppSelector((s: any) => s);
//   const auth: any = store.auth || {};
//   const sellerAuth: any = store.sellerAuth || {};
//   const sellers: any = store.sellers || {};
//   const user: any = store.user || {};

//   const navigate = useNavigate();
//   const [showAlert, setShowAlert] = useState(false);

//   /* ═══════════════════════════════════════════════
//      🔥 ROLE-BASED PROFILE FETCH
//      ═══════════════════════════════════════════════ */
//   useEffect(() => {
//     const jwt: string =
//       localStorage.getItem("jwt") || auth?.jwt || sellerAuth?.jwt || "";

//     if (!jwt) {
//       console.log("🔵 [APP] No JWT found");
//       return;
//     }

//     /* 🔥 Get role from localStorage flag */
//     const userRole = localStorage.getItem("userRole");
//     console.log("🔵 [APP] User Role:", userRole);

//     /* 🔥 Fetch based on role */
//     if (userRole === "SELLER") {
//       console.log("🔵 [APP] SELLER → fetching seller profile only");
//       dispatch(fetchSellerProfile(jwt) as any);
//     } else if (userRole === "ADMIN") {
//       console.log("🔵 [APP] ADMIN → fetching user profile");
//       dispatch(fetchUserProfile({ jwt, navigate }) as any);
//     } else {
//       console.log("🔵 [APP] CUSTOMER → fetching user profile");
//       dispatch(fetchUserProfile({ jwt, navigate }) as any);
//     }
//   }, [auth?.jwt, sellerAuth?.jwt, dispatch, navigate]);

//   /* Fetch homepage data */
//   useEffect(() => {
//     dispatch(fetchHomePageData() as any);
//   }, [dispatch]);

//   return (
//     <ThemeProvider theme={customeTheme}>
//       <div className="App">
//         <ScrollToTop />

//         {showAlert && (
//           <div
//             style={{
//               position: "fixed",
//               top: "20px",
//               right: "20px",
//               backgroundColor: "#f44336",
//               color: "white",
//               padding: "15px 20px",
//               borderRadius: "8px",
//               boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
//               zIndex: 99999,
//               fontWeight: "bold",
//               fontFamily: "sans-serif",
//             }}
//           >
//             ⚠ Website Security: Right-click is disabled!
//           </div>
//         )}

//         <Routes>
//           {/* Seller Routes */}
//           {sellers?.profile && (
//             <Route path="/seller/*" element={<SellerDashboard />} />
//           )}

//           {/* Admin Routes */}
//           {user?.user?.role === "ROLE_ADMIN" && (
//             <Route path="/admin/*" element={<AdminDashboard />} />
//           )}

//           {/* Public Routes */}
//           <Route
//             path="/verify-seller/:otp"
//             element={<SellerAccountVerification />}
//           />
//           <Route
//             path="/seller-account-verified"
//             element={<SellerAccountVerified />}
//           />
//           <Route path="/become-seller" element={<BecomeSeller />} />
//           <Route path="/admin-login" element={<AdminAuth />} />

//           {/* Customer Default */}
//           <Route path="*" element={<CustomerRoutes />} />
//         </Routes>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;






// import { ThemeProvider } from '@emotion/react';
// import customeTheme from './Theme/customeTheme';
// import { Route, Routes } from 'react-router-dom';

// import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
// import CustomerRoutes from './routes/CustomerRoutes';
// import AdminDashboard from './admin/pages/Dashboard/Dashboard';
// import SellerAccountVerification from './seller/pages/SellerAccountVerification';
// import SellerAccountVerified from './seller/pages/SellerAccountVerified';
// import { useAppDispatch, useAppSelector } from './Redux Toolkit/Store';
// import { useEffect, useState } from 'react';
// import { fetchSellerProfile } from './Redux Toolkit/Seller/sellerSlice';
// import BecomeSeller from './customer/pages/BecomeSeller/BecomeSeller';
// import AdminAuth from './admin/pages/Auth/AdminAuth';
// import { fetchUserProfile } from './Redux Toolkit/Customer/UserSlice';
// import { fetchHomePageData } from './Redux Toolkit/Customer/Customer/AsyncThunk';
// import ScrollToTop from './customer/components/TopScroll/ScrollToTop';

// function App() {
//   const dispatch = useAppDispatch();

//   const store: any = useAppSelector((s: any) => s);
//   const auth: any = store.auth || {};
//   const sellerAuth: any = store.sellerAuth || {};
//   const sellers: any = store.sellers || {};
//   const user: any = store.user || {};

//   const [showAlert, setShowAlert] = useState(false);

//   /* ═══════════════════════════════════════════════
//      🔥 ROLE-BASED PROFILE FETCH (NO NAVIGATE)
//      ═══════════════════════════════════════════════ */
//   useEffect(() => {
//     const jwt: string =
//       localStorage.getItem("jwt") || auth?.jwt || sellerAuth?.jwt || "";

//     if (!jwt) {
//       console.log("🔵 [APP] No JWT found");
//       return;
//     }

//     const userRole = localStorage.getItem("userRole");
//     console.log("🔵 [APP] User Role:", userRole);

//     if (userRole === "SELLER") {
//       console.log("🔵 [APP] SELLER → fetching seller profile");
//       dispatch(fetchSellerProfile(jwt) as any);
//     } else {
//       console.log("🔵 [APP] ADMIN/CUSTOMER → fetching user profile");
//       /* 🔥 navigate pass नहीं करो */
//       dispatch(fetchUserProfile({ jwt }) as any);
//     }
//   }, [auth?.jwt, sellerAuth?.jwt, dispatch]);

//   /* Fetch homepage data */
//   useEffect(() => {
//     dispatch(fetchHomePageData() as any);
//   }, [dispatch]);

//   return (
//     <ThemeProvider theme={customeTheme}>
//       <div className="App">
//         <ScrollToTop />

//         {showAlert && (
//           <div
//             style={{
//               position: "fixed",
//               top: "20px",
//               right: "20px",
//               backgroundColor: "#f44336",
//               color: "white",
//               padding: "15px 20px",
//               borderRadius: "8px",
//               boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
//               zIndex: 99999,
//               fontWeight: "bold",
//               fontFamily: "sans-serif",
//             }}
//           >
//             ⚠ Website Security: Right-click is disabled!
//           </div>
//         )}

//         <Routes>
//           {/* Seller Routes */}
//           {sellers?.profile && (
//             <Route path="/seller/*" element={<SellerDashboard />} />
//           )}

//           {/* Admin Routes */}
//           {user?.user?.role === "ROLE_ADMIN" && (
//             <Route path="/admin/*" element={<AdminDashboard />} />
//           )}

//           {/* Public Routes */}
//           <Route
//             path="/verify-seller/:otp"
//             element={<SellerAccountVerification />}
//           />
//           <Route
//             path="/seller-account-verified"
//             element={<SellerAccountVerified />}
//           />
//           <Route path="/become-seller" element={<BecomeSeller />} />
//           <Route path="/admin-login" element={<AdminAuth />} />

//           {/* Customer Default */}
//           <Route path="*" element={<CustomerRoutes />} />
//         </Routes>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;









// import { ThemeProvider } from "@emotion/react";
// import customeTheme from "./Theme/customeTheme";
// import { Route, Routes } from "react-router-dom";

// import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
// import CustomerRoutes from "./routes/CustomerRoutes";
// import AdminDashboard from "./admin/pages/Dashboard/Dashboard";
// import SellerAccountVerification from "./seller/pages/SellerAccountVerification";
// import SellerAccountVerified from "./seller/pages/SellerAccountVerified";
// import { useAppDispatch, useAppSelector } from "./Redux Toolkit/Store";
// import { useEffect, useState } from "react";
// import { fetchSellerProfile } from "./Redux Toolkit/Seller/sellerSlice";
// import BecomeSeller from "./customer/pages/BecomeSeller/BecomeSeller";
// import AdminAuth from "./admin/pages/Auth/AdminAuth";
// import { fetchUserProfile } from "./Redux Toolkit/Customer/UserSlice";
// import { fetchHomePageData } from "./Redux Toolkit/Customer/Customer/AsyncThunk";
// import ScrollToTop from "./customer/components/TopScroll/ScrollToTop";

// function App() {
//   const dispatch = useAppDispatch();

//   /* 🔥 Full store as any — no type errors */
//   const store: any = useAppSelector((s: any) => s);
//   const auth: any = store.auth || {};
//   const sellerAuth: any = store.sellerAuth || {};
//   const user: any = store.user || {};

//   const [showAlert, setShowAlert] = useState(false);

//   /* ═══════════════════════════════════════════════
//      🔥 ROLE-BASED PROFILE FETCH
//      ═══════════════════════════════════════════════ */
//   useEffect(() => {
//     const jwt: string =
//       localStorage.getItem("jwt") || auth?.jwt || sellerAuth?.jwt || "";

//     if (!jwt) {
//       console.log("🔵 [APP] No JWT found");
//       return;
//     }

//     const userRole = localStorage.getItem("userRole");
//     console.log("🔵 [APP] User Role:", userRole);

//     if (userRole === "SELLER") {
//       console.log("🔵 [APP] SELLER → fetching seller profile");
//       dispatch(fetchSellerProfile(jwt) as any);
//     } else {
//       console.log("🔵 [APP] CUSTOMER/ADMIN → fetching user profile");
//       dispatch(fetchUserProfile({ jwt }) as any);
//     }
//   }, [auth?.jwt, sellerAuth?.jwt, dispatch]);

//   /* Fetch homepage data */
//   useEffect(() => {
//     dispatch(fetchHomePageData() as any);
//   }, [dispatch]);

//   return (

    
//     <ThemeProvider theme={customeTheme}>
//       <div className="App">
//         <ScrollToTop />

//         {showAlert && (
//           <div
//             style={{
//               position: "fixed",
//               top: "20px",
//               right: "20px",
//               backgroundColor: "#f44336",
//               color: "white",
//               padding: "15px 20px",
//               borderRadius: "8px",
//               boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
//               zIndex: 99999,
//               fontWeight: "bold",
//               fontFamily: "sans-serif",
//             }}
//           >
//             ⚠ Website Security: Right-click is disabled!
//           </div>
//         )}

//         <Routes>
//           {/* 🔥 SELLER ROUTES - Always available */}
//           <Route path="/seller/*" element={<SellerDashboard />} />

//           {/* 🔥 ADMIN ROUTES */}
//           <Route path="/admin/*" element={<AdminDashboard />} />

//           {/* Public Routes */}
//           <Route
//             path="/verify-seller/:otp"
//             element={<SellerAccountVerification />}
//           />
//           <Route
//             path="/seller-account-verified"
//             element={<SellerAccountVerified />}
//           />
//           <Route path="/become-seller" element={<BecomeSeller />} />
//           <Route path="/admin-login" element={<AdminAuth />} />

//           {/* Customer Default */}
//           <Route path="*" element={<CustomerRoutes />} />
//         </Routes>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;

















import { ThemeProvider } from "@emotion/react";
import customeTheme from "./Theme/customeTheme";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./Redux Toolkit/Store";
import { fetchSellerProfile } from "./Redux Toolkit/Seller/sellerSlice";
import { fetchUserProfile } from "./Redux Toolkit/Customer/UserSlice";
import { fetchHomePageData } from "./Redux Toolkit/Customer/Customer/AsyncThunk";
import ScrollToTop from "./customer/components/TopScroll/ScrollToTop";

/* ═══════════════════════════════════════════════
   🔥 LAZY LOADING — Bundle chhota
   ═══════════════════════════════════════════════ */
const SellerDashboard = lazy(() => import("./seller/pages/SellerDashboard/SellerDashboard"));
const CustomerRoutes = lazy(() => import("./routes/CustomerRoutes"));
const AdminDashboard = lazy(() => import("./admin/pages/Dashboard/Dashboard"));
const SellerAccountVerification = lazy(() => import("./seller/pages/SellerAccountVerification"));
const SellerAccountVerified = lazy(() => import("./seller/pages/SellerAccountVerified"));
const BecomeSeller = lazy(() => import("./customer/pages/BecomeSeller/BecomeSeller"));
const AdminAuth = lazy(() => import("./admin/pages/Auth/AdminAuth"));
import PublicPage from "./customer/pages/PublicPage/PublicPage";

/* 🔥 LOADING FALLBACK */
const Loading = () => (
  <div className="w-full h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 font-semibold">Loading...</p>
    </div>
  </div>
);

function App() {
  const dispatch = useAppDispatch();

  /* 🔥 Sirf zaroori cheezein select */
  const authJwt = useAppSelector((s: any) => s.auth?.jwt);
  const sellerJwt = useAppSelector((s: any) => s.sellerAuth?.jwt);

  const [showAlert] = useState(false);

  /* ═══════════════════════════════════════════════
     🔥 ROLE-BASED PROFILE FETCH
     ═══════════════════════════════════════════════ */
  useEffect(() => {
    const jwt = localStorage.getItem("jwt") || authJwt || sellerJwt || "";
    if (!jwt) return;

    const userRole = localStorage.getItem("userRole");

    if (userRole === "SELLER") {
      dispatch(fetchSellerProfile(jwt) as any);
    } else {
      dispatch(fetchUserProfile({ jwt }) as any);
    }
  }, [authJwt, sellerJwt, dispatch]);

  /* Fetch homepage data — sirf ek baar */
  useEffect(() => {
    dispatch(fetchHomePageData() as any);
  }, [dispatch]);

  return (
    <ThemeProvider theme={customeTheme}>
      <div className="App">
        <ScrollToTop />

        {showAlert && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              backgroundColor: "#f44336",
              color: "white",
              padding: "15px 20px",
              borderRadius: "8px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              zIndex: 99999,
              fontWeight: "bold",
            }}
          >
            ⚠ Website Security: Right-click is disabled!
          </div>
        )}

        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/seller/*" element={<SellerDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/verify-seller/:otp" element={<SellerAccountVerification />} />
            <Route path="/seller-account-verified" element={<SellerAccountVerified />} />
            <Route path="/become-seller" element={<BecomeSeller />} />
            <Route path="/admin-login" element={<AdminAuth />} />
            <Route path="*" element={<CustomerRoutes />} />


{/* 🔥 Public Pages (Bina Login) */}
<Route path="/about" element={<PublicPage slug="about" />} />
<Route path="/terms-and-conditions" element={<PublicPage slug="terms-and-conditions" />} />
<Route path="/privacy-policy" element={<PublicPage slug="privacy-policy" />} />
<Route path="/refund-policy" element={<PublicPage slug="refund-policy" />} />
<Route path="/shipping-policy" element={<PublicPage slug="shipping-policy" />} />
<Route path="/return-policy" element={<PublicPage slug="return-policy" />} />
<Route path="/seller-agreement" element={<PublicPage slug="seller-agreement" />} />

{/* 🔥 Dynamic fallback */}
<Route path="/page/:slug" element={<PublicPage />} />

          </Routes>
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

export default App;