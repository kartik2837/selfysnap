// import {  Button, CircularProgress, TextField } from '@mui/material'
// import { useEffect, useState } from 'react'
// import OTPInput from '../../components/OtpFild/OTPInput'
// import {  useFormik } from 'formik';

// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// import {  verifyLoginOtp } from '../../../Redux Toolkit/Seller/sellerAuthenticationSlice';
// import { useNavigate } from 'react-router-dom';
// import { sendLoginSignupOtp } from '../../../Redux Toolkit/Customer/AuthSlice';

// const SellerLoginForm = () => {

//     const navigate = useNavigate();
//     const [otp, setOtp] = useState("");
//     const [timer, setTimer] = useState<number>(30); // Timer state
//     const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
//     const dispatch=useAppDispatch();
//     const {sellerAuth}=useAppSelector(store=>store)

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             otp: ''
//         },
        
//         onSubmit: (values: any) => {
//             // Handle form submission
//             dispatch(verifyLoginOtp({email:values.email, otp, navigate}))
//             console.log('Form data:', values);
//         }
//     });

//     const handleOtpChange = (otp: any) => {

//         setOtp(otp);

//     };

//     const handleResendOTP = () => {
//         // Implement OTP resend logic
//         dispatch(sendLoginSignupOtp({email:formik.values.email}))
//         console.log('Resend OTP');
//         setTimer(30);
//         setIsTimerActive(true);
//     };

//     const handleSentOtp=()=>{
//         handleResendOTP();
//     }

//     const handleLogin=()=>{
//         formik.handleSubmit()
//     }

//     useEffect(() => {
//         let interval: NodeJS.Timeout | undefined;

//         if (isTimerActive) {
//             interval = setInterval(() => {
//                 setTimer(prev => {
//                     if (prev === 1) {
//                         clearInterval(interval);
//                         setIsTimerActive(false);
//                         return 30; // Reset timer for next OTP request 
//                     }
//                     return prev - 1;
//                 });
//             }, 1000);
//         }

//         return () => {
//             if (interval) clearInterval(interval);
//         };
//     }, [isTimerActive]);


//     return (
//         <div>
//             <h1 className='text-center font-bold text-xl text-primary-color pb-5'>Login As Seller</h1>
//             <form className="space-y-5">

//                 <TextField
//                     fullWidth
//                     name="email"
//                     label="Enter Your Email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.email && Boolean(formik.errors.email)}
//                     helperText={formik.touched.email ? formik.errors.email as string : undefined}
//                 />

//                 {sellerAuth.otpSent && <div className="space-y-2">
//                     <p className="font-medium text-sm">
//                         * Enter OTP sent to your email
//                     </p>
//                     <OTPInput
//                         length={6}
//                         onChange={handleOtpChange}
//                         error={false}
//                     />
//                     <p className="text-xs space-x-2">
//                             {isTimerActive ? (
//                                 <span>Resend OTP in {timer} seconds</span>
//                             ) : (
//                                 <>
//                                     Didn’t receive OTP?{" "}
//                                     <span 
//                                         onClick={handleResendOTP} 
//                                         className="text-orange-400 cursor-pointer hover:text-orange-500 font-semibold"
//                                     >
//                                         Resend OTP
//                                     </span>
//                                 </>
//                             )}
//                         </p>
//                     {formik.touched.otp && formik.errors.otp && <p>{formik.errors.otp as string}</p>}
//                 </div>}

//                 {sellerAuth.otpSent &&<div>
//                     <Button onClick={handleLogin} 
//                     fullWidth variant='contained' sx={{ py: "11px" }}>Login</Button>
//                 </div>}

//                 {!sellerAuth.otpSent && <Button
//                 disabled={sellerAuth.loading} 
//                 fullWidth 
//                 variant='contained' 
//                 onClick={handleSentOtp}
//                 sx={{ py: "11px" }}>{
//                     sellerAuth.loading ? <CircularProgress  />: "sent otp"}</Button>
//                 }



//             </form>


            
//         </div>
//     )
// }

// export default SellerLoginForm







// import { Button, CircularProgress, TextField } from "@mui/material";
// import { useEffect, useState } from "react";
// import OTPInput from "../../components/OtpFild/OTPInput";
// import { useNavigate } from "react-router-dom";
// import EmailIcon from "@mui/icons-material/Email";
// import InputAdornment from "@mui/material/InputAdornment";
// import { api } from "../../../Config/Api";

// const SellerLoginForm = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [timer, setTimer] = useState<number>(30);
//   const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
//   const [sending, setSending] = useState(false);
//   const [loggingIn, setLoggingIn] = useState(false);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
//   const [successMsg, setSuccessMsg] = useState<string | null>(null);

//   /* ═══════════════════════════════════════════════
//      🔥 SEND OTP
//      ═══════════════════════════════════════════════ */
//   const handleSendOtp = async () => {
//     setErrorMsg(null);
//     setSuccessMsg(null);

//     if (!email.trim()) {
//       setErrorMsg("Please enter your email");
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
//       setErrorMsg("Invalid email format");
//       return;
//     }

//     setSending(true);

//     try {
//       console.log("🔵 [FRONTEND] Sending OTP to:", email.trim());

//       const response = await api.post("/sellers/sent/login-top", {
//         email: email.trim(),
//       });

//       console.log("✅ [FRONTEND] Response:", response.data);

//       setOtpSent(true);
//       setSuccessMsg("OTP sent to your email!");
//       setTimer(30);
//       setIsTimerActive(true);
//       setOtp("");
//     } catch (err: any) {
//       console.error("❌ [FRONTEND] Error:", err);
//       setErrorMsg(
//         err.response?.data?.message ||
//           "Failed to send OTP. Please try again."
//       );
//     } finally {
//       setSending(false);
//     }
//   };

//   /* ═══════════════════════════════════════════════
//      🔥 RESEND OTP
//      ═══════════════════════════════════════════════ */
//   const handleResendOtp = async () => {
//     setErrorMsg(null);
//     setSending(true);

//     try {
//       await api.post("/sellers/sent/login-top", { email: email.trim() });
//       setSuccessMsg("OTP resent successfully!");
//       setTimer(30);
//       setIsTimerActive(true);
//       setOtp("");
//     } catch (err: any) {
//       setErrorMsg(err.response?.data?.message || "Failed to resend OTP");
//     } finally {
//       setSending(false);
//     }
//   };

//   /* ═══════════════════════════════════════════════
//      🔥 VERIFY OTP / LOGIN (with NEW TAB redirect)
//      ═══════════════════════════════════════════════ */
//   const handleLogin = async () => {
//     setErrorMsg(null);

//     if (!otp || otp.length < 6) {
//       setErrorMsg("Please enter 6-digit OTP");
//       return;
//     }

//     setLoggingIn(true);

//     try {
//       console.log("🔵 [FRONTEND] Verifying OTP:", { email, otp });

//       const response = await api.post("/sellers/verify/login-otp", {
//         email: email.trim(),
//         otp: otp,
//       });

//       console.log("✅ [FRONTEND] Login success:", response.data);

//       if (response.data?.jwt) {
//         /* 🔥 Save JWT + Role */
//         localStorage.setItem("jwt", response.data.jwt);
//         localStorage.setItem("userRole", "SELLER");

//         console.log("✅ Seller logged in, opening dashboard in new tab...");

//         /* 🔥 NEW TAB में Seller Dashboard खोलो */
//         const sellerUrl = `${window.location.origin}/seller`;
//         const newWindow = window.open(sellerUrl, "_blank");

//         if (newWindow) {
//           setSuccessMsg("✅ Login successful! Dashboard opened in new tab.");
//           console.log("✅ New tab opened:", sellerUrl);
//         } else {
//           /* अगर popup blocked हो → same tab redirect */
//           console.log("⚠️ Popup blocked, redirecting in same tab...");
//           navigate("/seller");
//         }
//       }
//     } catch (err: any) {
//       console.error("❌ [FRONTEND] Login error:", err);
//       setErrorMsg(err.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoggingIn(false);
//     }
//   };

//   /* ═══════════════════════════════════════════════
//      🔥 TIMER
//      ═══════════════════════════════════════════════ */
//   useEffect(() => {
//     let interval: ReturnType<typeof setInterval> | undefined;

//     if (isTimerActive) {
//       interval = setInterval(() => {
//         setTimer((prev) => {
//           if (prev === 1) {
//             clearInterval(interval);
//             setIsTimerActive(false);
//             return 30;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [isTimerActive]);

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="text-center">
//         <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//           Login as Seller
//         </h1>
//         <p className="text-gray-500 text-sm mt-1">
//           {otpSent
//             ? "Enter the OTP sent to your email"
//             : "Enter your registered email to receive OTP"}
//         </p>
//       </div>

//       <div className="space-y-5">
//         {/* ═══ EMAIL INPUT ═══ */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-800 mb-2">
//             Email Address <span className="text-red-500">*</span>
//           </label>
//           <TextField
//             fullWidth
//             type="email"
//             placeholder="your@email.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={otpSent}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <EmailIcon className="text-gray-400" />
//                 </InputAdornment>
//               ),
//               sx: {
//                 borderRadius: 2,
//                 backgroundColor: otpSent ? "#f1f5f9" : "white",
//               },
//             }}
//           />
//         </div>

//         {/* ═══ OTP SECTION ═══ */}
//         {otpSent && (
//           <div className="space-y-4 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
//             <div className="text-center space-y-1">
//               <p className="font-bold text-base text-gray-800">
//                 Enter 6-Digit OTP
//               </p>
//               <p className="text-xs text-gray-500">
//                 OTP sent to{" "}
//                 <span className="font-semibold text-indigo-600">{email}</span>
//               </p>
//             </div>

//             <div className="flex justify-center py-3">
//               <OTPInput length={6} onChange={setOtp} error={false} />
//             </div>

//             <p className="text-center text-sm">
//               {isTimerActive ? (
//                 <span className="text-gray-600">
//                   Resend OTP in{" "}
//                   <span className="font-bold text-indigo-600">{timer}s</span>
//                 </span>
//               ) : (
//                 <>
//                   <span className="text-gray-600">Didn't receive OTP? </span>
//                   <span
//                     onClick={handleResendOtp}
//                     className="text-indigo-600 cursor-pointer hover:text-indigo-800 font-bold underline"
//                   >
//                     Resend OTP
//                   </span>
//                 </>
//               )}
//             </p>
//           </div>
//         )}

//         {/* ═══ SUCCESS ═══ */}
//         {successMsg && (
//           <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700 text-center font-medium">
//             ✅ {successMsg}
//           </div>
//         )}

//         {/* ═══ ERROR ═══ */}
//         {errorMsg && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 text-center font-medium">
//             ❌ {errorMsg}
//           </div>
//         )}

//         {/* ═══ BUTTONS ═══ */}
//         {!otpSent ? (
//           <Button
//             fullWidth
//             variant="contained"
//             disabled={sending}
//             onClick={handleSendOtp}
//             sx={{
//               py: "13px",
//               borderRadius: 2,
//               textTransform: "none",
//               fontWeight: "bold",
//               fontSize: "16px",
//               background: "linear-gradient(to right, #4f46e5, #7c3aed)",
//               "&:hover": {
//                 background: "linear-gradient(to right, #4338ca, #6d28d9)",
//               },
//             }}
//           >
//             {sending ? (
//               <CircularProgress size={24} sx={{ color: "white" }} />
//             ) : (
//               "Send OTP"
//             )}
//           </Button>
//         ) : (
//           <Button
//             fullWidth
//             variant="contained"
//             disabled={loggingIn}
//             onClick={handleLogin}
//             sx={{
//               py: "13px",
//               borderRadius: 2,
//               textTransform: "none",
//               fontWeight: "bold",
//               fontSize: "16px",
//               background: "linear-gradient(to right, #10b981, #059669)",
//               "&:hover": {
//                 background: "linear-gradient(to right, #059669, #047857)",
//               },
//             }}
//           >
//             {loggingIn ? (
//               <CircularProgress size={24} sx={{ color: "white" }} />
//             ) : (
//               "Login"
//             )}
//           </Button>
//         )}

//         {/* ═══ CHANGE EMAIL ═══ */}
//         {otpSent && (
//           <Button
//             fullWidth
//             variant="text"
//             onClick={() => {
//               setOtpSent(false);
//               setOtp("");
//               setIsTimerActive(false);
//               setErrorMsg(null);
//               setSuccessMsg(null);
//             }}
//             sx={{
//               textTransform: "none",
//               color: "#64748b",
//               fontSize: 13,
//             }}
//           >
//             ← Change Email
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SellerLoginForm;







import { Button, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import OTPInput from "../../components/OtpFild/OTPInput";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import { api } from "../../../Config/Api";

const SellerLoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState<number>(30);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [sending, setSending] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  /* ═══════════════════════════════════════════════
     🔥 SEND OTP
     ═══════════════════════════════════════════════ */
  const handleSendOtp = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setErrorMsg("Please enter your email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg("Invalid email format");
      return;
    }

    setSending(true);

    try {
      const response = await api.post("/sellers/sent/login-top", {
        email: email.trim(),
      });

      setOtpSent(true);
      setSuccessMsg("OTP sent to your email!");
      setTimer(30);
      setIsTimerActive(true);
      setOtp("");
    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.message ||
          "Failed to send OTP. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  /* ═══════════════════════════════════════════════
     🔥 RESEND OTP
     ═══════════════════════════════════════════════ */
  const handleResendOtp = async () => {
    setErrorMsg(null);
    setSending(true);

    try {
      await api.post("/sellers/sent/login-top", { email: email.trim() });
      setSuccessMsg("OTP resent successfully!");
      setTimer(30);
      setIsTimerActive(true);
      setOtp("");
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setSending(false);
    }
  };

  /* ═══════════════════════════════════════════════
     🔥 VERIFY OTP / LOGIN
     ═══════════════════════════════════════════════ */
  const handleLogin = async () => {
    setErrorMsg(null);

    if (!otp || otp.length < 6) {
      setErrorMsg("Please enter 6-digit OTP");
      return;
    }

    setLoggingIn(true);

    try {
      const response = await api.post("/sellers/verify/login-otp", {
        email: email.trim(),
        otp: otp,
      });

      if (response.data?.jwt) {
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("userRole", "SELLER");

        const sellerUrl = `${window.location.origin}/seller`;
        const newWindow = window.open(sellerUrl, "_blank");

        if (newWindow) {
          setSuccessMsg("✅ Login successful! Dashboard opened in new tab.");
        } else {
          navigate("/seller");
        }
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoggingIn(false);
    }
  };

  /* ═══════════════════════════════════════════════
     🔥 TIMER
     ═══════════════════════════════════════════════ */
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setIsTimerActive(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive]);

  return (
    <div className="space-y-4">
      {/* ═══ Header ═══ */}
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-gray-800">Login as Seller</h2>
        <p className="text-gray-500 text-xs mt-1">
          {otpSent
            ? "Enter the OTP sent to your email"
            : "Enter your registered email to receive OTP"}
        </p>
      </div>

      {/* ═══ EMAIL INPUT ═══ */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          Email Address <span className="text-red-500">*</span>
        </label>
        <TextField
          fullWidth
          size="small"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={otpSent}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon className="text-gray-400" sx={{ fontSize: 18 }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 1.5,
              backgroundColor: otpSent ? "#f1f5f9" : "white",
              fontSize: 14,
            },
          }}
        />
      </div>

      {/* ═══ OTP SECTION ═══ */}
      {otpSent && (
        <div className="space-y-3 bg-orange-50 border border-orange-100 rounded-xl p-4">
          <div className="text-center">
            <p className="font-bold text-sm text-gray-800">
              Enter 6-Digit OTP
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Sent to{" "}
              <span className="font-semibold text-orange-600">{email}</span>
            </p>
          </div>

          <div className="flex justify-center py-1">
            <OTPInput length={6} onChange={setOtp} error={false} />
          </div>

          <p className="text-center text-xs">
            {isTimerActive ? (
              <span className="text-gray-600">
                Resend OTP in{" "}
                <span className="font-bold text-orange-600">{timer}s</span>
              </span>
            ) : (
              <>
                <span className="text-gray-600">Didn't receive? </span>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-orange-600 font-bold hover:underline"
                >
                  Resend OTP
                </button>
              </>
            )}
          </p>
        </div>
      )}

      {/* ═══ SUCCESS ═══ */}
      {successMsg && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 text-xs text-green-700 text-center font-medium">
          ✅ {successMsg}
        </div>
      )}

      {/* ═══ ERROR ═══ */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 text-xs text-red-700 text-center font-medium">
          ❌ {errorMsg}
        </div>
      )}

      {/* ═══ BUTTONS ═══ */}
      {!otpSent ? (
        <Button
          fullWidth
          variant="contained"
          disabled={sending}
          onClick={handleSendOtp}
          sx={{
            py: "11px",
            borderRadius: 1.5,
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "14px",
            bgcolor: "#fb641b",
            "&:hover": { bgcolor: "#e55a15" },
          }}
        >
          {sending ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            "Send OTP"
          )}
        </Button>
      ) : (
        <Button
          fullWidth
          variant="contained"
          disabled={loggingIn}
          onClick={handleLogin}
          sx={{
            py: "11px",
            borderRadius: 1.5,
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "14px",
            bgcolor: "#2874f0",
            "&:hover": { bgcolor: "#1e5fc4" },
          }}
        >
          {loggingIn ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            "Login"
          )}
        </Button>
      )}

      {/* ═══ CHANGE EMAIL ═══ */}
      {otpSent && (
        <button
          type="button"
          onClick={() => {
            setOtpSent(false);
            setOtp("");
            setIsTimerActive(false);
            setErrorMsg(null);
            setSuccessMsg(null);
          }}
          className="w-full text-center text-xs text-gray-500 hover:text-gray-700 font-semibold"
        >
          ← Change Email
        </button>
      )}
    </div>
  );
};

export default SellerLoginForm;

