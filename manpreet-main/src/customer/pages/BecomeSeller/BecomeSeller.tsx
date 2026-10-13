// import { Alert, Button, Snackbar } from "@mui/material";
// import { useState, useEffect } from "react";
// import SellerAccountForm from "./SellerAccountForm";
// import SellerLoginForm from "./SellerLoginForm";
// import { useAppSelector } from "../../../Redux Toolkit/Store";


// const BecomeSeller = () => {

//   const [isLoginPage, setIsLoginPage] = useState(false);
//   const { sellerAuth } = useAppSelector(store => store)

//   const handleCloseSnackbar = () => setSnackbarOpen(false)
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   useEffect(() => {
//     if (sellerAuth.sellerCreated || sellerAuth.error || sellerAuth.otpSent) {
//       setSnackbarOpen(true);
//       console.log("store ", sellerAuth.error)
//     }
//   }, [sellerAuth.sellerCreated, sellerAuth.error, sellerAuth.otpSent]);

//   return (
//     <div className="grid md:gap-10 grid-cols-3 min-h-screen ">
//       <section className="lg:col-span-1 md:col-span-2 col-span-3  p-10 shadow-lg rounded-b-md">

//         {!isLoginPage ?
//           <SellerAccountForm /> :
//           <SellerLoginForm />
//         }

//         <div className='mt-10 space-y-2'>
//           <h1 className='text-center text-sm font-medium'>{isLoginPage && "Don't"} have account ? </h1>
//           <Button onClick={() => setIsLoginPage(!isLoginPage)} fullWidth sx={{ py: "11px" }} variant='outlined'>{isLoginPage ? "Register" : "Login"}</Button>
//         </div>

//       </section>
//       <section className=" hidden md:col-span-1 md:flex  lg:col-span-2  justify-center items-center">
//         <div className="lg:w-[70%] px-5 space-y-10">
//           <div className="borderr rounded-md space-y-2 font-bold text-center">
//             <p className=" text-2xl">Grow Your Business on Our Marketplace</p>
//             <p className="text-lg text-orange-500"> Start Selling Smarter Today</p>
//           </div>

//           <img className="" src={"/seller.jpg"} alt="" />
//           {/* <div>
//                 <p className=" logo absolute p-6 rounded-t-full text-white text-center top-0 left-16 right-11 bg-teal-500">Zosh Bazaar</p>
//             </div> */}

//         </div>


//       </section>


//       <Snackbar
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         open={snackbarOpen} autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={sellerAuth.error ? "error" : "success"}
//           variant="filled"
//           sx={{ width: '100%' }}
//         >
//           {sellerAuth.error ? sellerAuth.error : sellerAuth.sellerCreated ? sellerAuth.sellerCreated : " otp sent to your email!"}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default BecomeSeller;


























// import { Alert, Button, Snackbar } from "@mui/material";
// import { useState, useEffect } from "react";
// import SellerAccountForm from "./SellerAccountForm";
// import SellerLoginForm from "./SellerLoginForm";
// import { useAppSelector } from "../../../Redux Toolkit/Store";
// import Landing from "../../../seller/components/Landing";


// const BecomeSeller = () => {

//   const [isLoginPage, setIsLoginPage] = useState(false);
//   const { sellerAuth } = useAppSelector(store => store)

//   const handleCloseSnackbar = () => setSnackbarOpen(false)
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   useEffect(() => {
//     if (sellerAuth.sellerCreated || sellerAuth.error || sellerAuth.otpSent) {
//       setSnackbarOpen(true);
//       console.log("store ", sellerAuth.error)
//     }
//   }, [sellerAuth.sellerCreated, sellerAuth.error, sellerAuth.otpSent]);

//   return (
//     <>
    
    
//     <div className="grid md:gap-10 grid-cols-3 min-h-screen ">
//       <section className="lg:col-span-1 md:col-span-2 col-span-3  p-10 shadow-lg rounded-b-md">

//         {!isLoginPage ?
//           <SellerAccountForm /> :
//           <SellerLoginForm />
//         }

//         <div className='mt-10 space-y-2'>
//           <h1 className='text-center text-sm font-medium'>{isLoginPage && "Don't"} have account ? </h1>
//           <Button onClick={() => setIsLoginPage(!isLoginPage)} fullWidth sx={{ py: "11px" }} variant='outlined'>{isLoginPage ? "Register" : "Login"}</Button>
//         </div>

//       </section>
//       <section className=" hidden md:col-span-1 md:flex  lg:col-span-2  justify-center items-center">
//         <div className="lg:w-[70%] px-5 space-y-10">
//           <div className="borderr rounded-md space-y-2 font-bold text-center">
//             <p className=" text-2xl">Grow Your Business on Our Marketplace</p>
//             <p className="text-lg text-orange-500"> Start Selling Smarter Today</p>
//           </div>

//           <img className="" src={"/seller.jpg"} alt="" />
//           {/* <div>
//                 <p className=" logo absolute p-6 rounded-t-full text-white text-center top-0 left-16 right-11 bg-teal-500">Zosh Bazaar</p>
//             </div> */}

//         </div>


//       </section>


//       <Snackbar
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         open={snackbarOpen} autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={sellerAuth.error ? "error" : "success"}
//           variant="filled"
//           sx={{ width: '100%' }}
//         >
//           {sellerAuth.error ? sellerAuth.error : sellerAuth.sellerCreated ? sellerAuth.sellerCreated : " otp sent to your email!"}
//         </Alert>
//       </Snackbar>
//     </div>
//     <Landing/>

//     </>
    
//   );
// };

// export default BecomeSeller;






// import { Alert, Button, Snackbar } from "@mui/material";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import SellerAccountForm from "./SellerAccountForm";
// import SellerLoginForm from "./SellerLoginForm";
// import { useAppSelector } from "../../../Redux Toolkit/Store";
// import Landing from "../../../seller/components/Landing";

// const BecomeSeller = () => {
//   const [isLoginPage, setIsLoginPage] = useState(false);
//   const { sellerAuth } = useAppSelector((store) => store);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (sellerAuth.sellerCreated || sellerAuth.error || sellerAuth.otpSent) {
//       setSnackbarOpen(true);
//     }
//   }, [sellerAuth.sellerCreated, sellerAuth.error, sellerAuth.otpSent]);

//   /* 🔥 Redirect on success */
//   useEffect(() => {
//     if (sellerAuth.sellerCreated) {
//       const timer = setTimeout(() => navigate("/login"), 2500);
//       return () => clearTimeout(timer);
//     }
//   }, [sellerAuth.sellerCreated, navigate]);

//   return (
//     <>
//       <div className="grid md:gap-10 grid-cols-3 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//         <section className="lg:col-span-2 md:col-span-2 col-span-3 p-6 lg:p-10">
//           <div className="max-w-xl mx-auto">
//             {!isLoginPage ? <SellerAccountForm /> : <SellerLoginForm />}

//             <div className="mt-8 space-y-3">
//               <p className="text-center text-sm text-gray-600 font-medium">
//                 {isLoginPage ? "Don't" : "Already"} have an account?
//               </p>
//               <Button
//                 onClick={() => setIsLoginPage(!isLoginPage)}
//                 fullWidth
//                 sx={{
//                   py: "11px",
//                   borderRadius: 2,
//                   textTransform: "none",
//                   fontWeight: "bold",
//                   borderColor: "#6366f1",
//                   color: "#6366f1",
//                   "&:hover": {
//                     backgroundColor: "#eef2ff",
//                     borderColor: "#4f46e5",
//                   },
//                 }}
//                 variant="outlined"
//               >
//                 {isLoginPage ? "Register as Seller" : "Login instead"}
//               </Button>
//             </div>
//           </div>
//         </section>

//         <section className="hidden md:flex lg:col-span-1 justify-center items-center p-10">
//           <div className="max-w-md space-y-8 text-center">
//             <div className="space-y-3">
//               <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 Grow Your Business
//               </h1>
//               <p className="text-lg text-orange-500 font-semibold">
//                 Start Selling Smarter Today
//               </p>
//               <p className="text-sm text-gray-500">
//                 Join thousands of sellers growing with Selfysnap
//               </p>
//             </div>
//             {/* <img
//               className="rounded-2xl shadow-xl"
//               src={"/seller.jpg"}
//               alt="seller"
//             /> */}
//           </div>
//         </section>

//         <Snackbar
//           anchorOrigin={{ vertical: "top", horizontal: "right" }}
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={() => setSnackbarOpen(false)}
//         >
//           <Alert
//             onClose={() => setSnackbarOpen(false)}
//             severity={sellerAuth.error ? "error" : "success"}
//             variant="filled"
//             sx={{ width: "100%" }}
//           >
//             {sellerAuth.error
//               ? sellerAuth.error
//               : sellerAuth.sellerCreated
//               ? sellerAuth.sellerCreated + " Redirecting to login..."
//               : "OTP sent to your email!"}
//           </Alert>
//         </Snackbar>
//       </div>
//       <Landing />
//     </>
//   );
// };

// export default BecomeSeller;








// import { Alert, Snackbar } from "@mui/material";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import SellerAccountForm from "./SellerAccountForm";
// import SellerLoginForm from "./SellerLoginForm";
// import { useAppSelector } from "../../../Redux Toolkit/Store";
// import Landing from "../../../seller/components/Landing";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import PaymentsIcon from "@mui/icons-material/Payments";
// import SupportAgentIcon from "@mui/icons-material/SupportAgent";

// const BecomeSeller = () => {
//   const [isLoginPage, setIsLoginPage] = useState(false);
//   const { sellerAuth } = useAppSelector((store: any) => store);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (sellerAuth.sellerCreated || sellerAuth.error || sellerAuth.otpSent) {
//       setSnackbarOpen(true);
//     }
//   }, [sellerAuth.sellerCreated, sellerAuth.error, sellerAuth.otpSent]);

//   useEffect(() => {
//     if (sellerAuth.sellerCreated) {
//       const timer = setTimeout(() => navigate("/login"), 2500);
//       return () => clearTimeout(timer);
//     }
//   }, [sellerAuth.sellerCreated, navigate]);

//   return (
//     <>
//       {/* ═══════════════════════════════════════════
//           🔥 SIMPLE CENTERED LAYOUT
//           ═══════════════════════════════════════════ */}
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-start justify-center px-4 py-8">
//         <div className="w-full max-w-2xl">
//           {/* Logo — clickable */}
//           <div className="flex justify-center mb-5">
//             <button
//               type="button"
//               onClick={() => navigate("/")}
//               className="cursor-pointer hover:scale-105 transition-transform"
//               title="Go to Home"
//             >
//               <img
//                 src="/logo34.png"
//                 alt="SelfySnap"
//                 className="h-12 w-auto object-contain"
//               />
//             </button>
//           </div>

//           {/* Main Card */}
//           <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 sm:p-7">
//             {/* Heading */}
//             <div className="text-center mb-5">
//               <h1 className="text-2xl font-extrabold text-gray-800">
//                 Become a <span className="text-orange-500">Seller</span>
//               </h1>
//               <p className="text-gray-500 text-xs mt-1">
//                 Join thousands of sellers growing with SelfySnap
//               </p>
//             </div>

//             {/* Tab Switcher */}
//             <div className="grid grid-cols-2 gap-2 mb-5 bg-gray-100 rounded-xl p-1">
//               <button
//                 type="button"
//                 onClick={() => setIsLoginPage(false)}
//                 className={`py-2.5 rounded-lg font-bold text-sm transition-all ${
//                   !isLoginPage
//                     ? "bg-white text-orange-600 shadow-sm"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Register
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsLoginPage(true)}
//                 className={`py-2.5 rounded-lg font-bold text-sm transition-all ${
//                   isLoginPage
//                     ? "bg-white text-orange-600 shadow-sm"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Login
//               </button>
//             </div>

//             {/* Form */}
//             {!isLoginPage ? <SellerAccountForm /> : <SellerLoginForm />}
//           </div>

//           {/* Trust badges */}
//           <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
//             <div className="flex items-center gap-1.5">
//               <VerifiedIcon sx={{ fontSize: 14, color: "#10b981" }} />
//               <span>100% Secure</span>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <PaymentsIcon sx={{ fontSize: 14, color: "#10b981" }} />
//               <span>Fast Payouts</span>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <SupportAgentIcon sx={{ fontSize: 14, color: "#10b981" }} />
//               <span>24/7 Support</span>
//             </div>
//           </div>

//           <p className="text-xs text-gray-400 text-center mt-3">
//             © 2026 SelfySnap. All rights reserved.
//           </p>
//         </div>
//       </div>

//       {/* Snackbar */}
//       <Snackbar
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//       >
//         <Alert
//           onClose={() => setSnackbarOpen(false)}
//           severity={sellerAuth.error ? "error" : "success"}
//           variant="filled"
//           sx={{ width: "100%" }}
//         >
//           {sellerAuth.error
//             ? sellerAuth.error
//             : sellerAuth.sellerCreated
//             ? sellerAuth.sellerCreated + " Redirecting to login..."
//             : "OTP sent to your email!"}
//         </Alert>
//       </Snackbar>

//       <Landing />
//     </>
//   );
// };

// export default BecomeSeller;






import { Alert, Snackbar } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SellerAccountForm from "./SellerAccountForm";
import SellerLoginForm from "./SellerLoginForm";
import { useAppSelector } from "../../../Redux Toolkit/Store";
import Landing from "../../../seller/components/Landing";
import VerifiedIcon from "@mui/icons-material/Verified";
import PaymentsIcon from "@mui/icons-material/Payments";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const BecomeSeller = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const { sellerAuth } = useAppSelector((store: any) => store);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sellerAuth.sellerCreated || sellerAuth.error || sellerAuth.otpSent) {
      setSnackbarOpen(true);
    }
  }, [sellerAuth.sellerCreated, sellerAuth.error, sellerAuth.otpSent]);

  useEffect(() => {
    if (sellerAuth.sellerCreated) {
      const timer = setTimeout(() => navigate("/login"), 2500);
      return () => clearTimeout(timer);
    }
  }, [sellerAuth.sellerCreated, navigate]);

  return (
    <>
      {/* 🔥 BACKGROUND GRADIENT + ANIMATED BLOBS */}
      <style>{`
        @keyframes blobFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 30px) scale(0.9); }
        }
        @keyframes blobFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 40px) scale(1.15); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .become-seller-bg {
          background: linear-gradient(135deg, #fff7ed 0%, #ffffff 40%, #eff6ff 100%);
          position: relative;
          overflow: hidden;
        }
        .blob-1 {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(251, 146, 60, 0.25) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(40px);
          animation: blobFloat1 12s ease-in-out infinite;
          pointer-events: none;
        }
        .blob-2 {
          position: absolute;
          bottom: -100px;
          left: -100px;
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(40px);
          animation: blobFloat2 15s ease-in-out infinite;
          pointer-events: none;
        }
        .blob-3 {
          position: absolute;
          top: 40%;
          left: 50%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(50px);
          animation: blobFloat1 18s ease-in-out infinite reverse;
          pointer-events: none;
        }
        .become-seller-card {
          animation: fadeInUp 0.6s ease-out both;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .logo-btn-wrapper {
          animation: fadeInUp 0.4s ease-out both;
        }
      `}</style>

      {/* ═══════════════════════════════════════════
          🔥 BACKGROUND WITH GRADIENT + BLOBS
          ═══════════════════════════════════════════ */}
      <div className="become-seller-bg min-h-screen flex items-start justify-center px-4 py-8">
        {/* Animated background blobs */}
        <div className="blob-1" />
        <div className="blob-2" />
        <div className="blob-3" />

        <div className="w-full max-w-2xl relative z-10">
          {/* Logo — same as before, clickable */}
          <div className="flex justify-center mb-5 logo-btn-wrapper">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="cursor-pointer hover:scale-105 transition-transform"
              title="Go to Home"
            >
              <img
                src="/logo34.png"
                alt="SelfySnap"
                className="h-12 w-auto object-contain"
              />
            </button>
          </div>

          {/* Main Card — glassy look */}
          <div className="become-seller-card rounded-3xl shadow-2xl border border-white/60 p-5 sm:p-7">
            {/* Heading */}
            <div className="text-center mb-5">
              <h1 className="text-2xl font-extrabold text-gray-800">
                Become a <span className="text-orange-500">Seller</span>
              </h1>
              <p className="text-gray-500 text-xs mt-1">
                Join thousands of sellers growing with SelfySnap
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="grid grid-cols-2 gap-2 mb-5 bg-gray-100 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setIsLoginPage(false)}
                className={`py-2.5 rounded-lg font-bold text-sm transition-all ${
                  !isLoginPage
                    ? "bg-white text-orange-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => setIsLoginPage(true)}
                className={`py-2.5 rounded-lg font-bold text-sm transition-all ${
                  isLoginPage
                    ? "bg-white text-orange-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Login
              </button>
            </div>

            {/* Form */}
            {!isLoginPage ? <SellerAccountForm /> : <SellerLoginForm />}
          </div>

          {/* Trust badges */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur px-3 py-1.5 rounded-full border border-white/60 shadow-sm">
              <VerifiedIcon sx={{ fontSize: 14, color: "#10b981" }} />
              <span className="font-medium">100% Secure</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur px-3 py-1.5 rounded-full border border-white/60 shadow-sm">
              <PaymentsIcon sx={{ fontSize: 14, color: "#10b981" }} />
              <span className="font-medium">Fast Payouts</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur px-3 py-1.5 rounded-full border border-white/60 shadow-sm">
              <SupportAgentIcon sx={{ fontSize: 14, color: "#10b981" }} />
              <span className="font-medium">24/7 Support</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center mt-3">
            © 2026 SelfySnap. All rights reserved.
          </p>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={sellerAuth.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {sellerAuth.error
            ? sellerAuth.error
            : sellerAuth.sellerCreated
            ? sellerAuth.sellerCreated + " Redirecting to login..."
            : "OTP sent to your email!"}
        </Alert>
      </Snackbar>

      <Landing />
    </>
  );
};

export default BecomeSeller;