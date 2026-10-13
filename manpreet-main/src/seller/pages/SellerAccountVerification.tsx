// import { useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { useAppDispatch } from '../../Redux Toolkit/Store';
// import { verifySellerEmail } from '../../Redux Toolkit/Seller/sellerSlice';

// const SellerAccountVerification = () => {
//   const{ otp}=useParams();
//   const navigate=useNavigate()
//   const dispatch=useAppDispatch();

//   useEffect(()=>{
//     dispatch(verifySellerEmail({otp:Number(otp),navigate}))
//   },[otp])


//   return (
//     <div>SellerAccountVerification</div>
//   )
// }

// export default SellerAccountVerification








import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../Redux Toolkit/Store";
import { verifySellerEmail } from "../../Redux Toolkit/Seller/sellerSlice";
import { CircularProgress, Button } from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ScheduleIcon from "@mui/icons-material/Schedule";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

type Status = "verifying" | "success" | "error";

const SellerAccountVerification = () => {
  const { otp } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<Status>("verifying");
  const [errorMsg, setErrorMsg] = useState("");
  const [countdown, setCountdown] = useState(5);

  /* 🔥 Verify on mount */
  useEffect(() => {
    const verify = async () => {
      if (!otp) {
        setStatus("error");
        setErrorMsg("Invalid verification link");
        return;
      }

      try {
        await dispatch(
          verifySellerEmail({ otp: Number(otp), navigate }) as any
        ).unwrap();
        setStatus("success");
      } catch (err: any) {
        setStatus("error");
        setErrorMsg(
          err || "Verification failed. Link may be expired or invalid."
        );
      }
    };

    verify();
  }, [otp, dispatch]);

  /* 🔥 Auto redirect countdown → SELLER LOGIN */
  useEffect(() => {
    if (status === "success") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/become-seller");  // ✅ Seller login page
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, navigate]);

  /* ⏳ VERIFYING */
  if (status === "verifying") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-5">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center space-y-6 border border-gray-100">
          <div className="flex justify-center">
            <div className="relative">
              <CircularProgress size={100} thickness={3} sx={{ color: "#6366f1" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <MarkEmailReadIcon sx={{ fontSize: 44, color: "#6366f1" }} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-gray-900">
              Verifying Your Email
            </h1>
            <p className="text-gray-500 text-sm">
              Please wait while we verify your seller account...
            </p>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-3/4 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  /* 🎉 SUCCESS */
  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-5">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-lg w-full text-center space-y-6 border border-gray-100">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-30" />
              <div className="relative bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-6 shadow-lg">
                <CheckCircleIcon sx={{ fontSize: 60, color: "white" }} />
              </div>
            </div>
          </div>

          {/* Welcome */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Welcome to Selfysnap! 
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Your email has been verified successfully. Thank you for joining
              our seller community!
            </p>
          </div>

          {/* 24-48 Hours Box */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-5 space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="bg-amber-500 rounded-full p-2 flex-shrink-0">
                <ScheduleIcon sx={{ fontSize: 22, color: "white" }} />
              </div>
              <div>
                <p className="font-bold text-amber-900 text-sm md:text-base">
                  Verification in Progress
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Usually takes 24-48 hours
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-amber-200">
              <p className="text-xs text-amber-800 leading-relaxed">
                Our team is reviewing your submitted documents (GST
                Certificate, PAN Card & Bank Proof). You will receive an email
                notification once your account is approved.
              </p>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-left space-y-2">
            <p className="text-xs font-bold text-indigo-900 flex items-center gap-2">
              <VerifiedUserIcon sx={{ fontSize: 16 }} />
              WHAT HAPPENS NEXT?
            </p>
            <div className="space-y-1.5 pt-1">
              <p className="text-xs text-indigo-800 flex items-start gap-2">
                <span className="text-indigo-500 font-bold">1.</span>
                <span>Our team verifies your documents (24-48 hours)</span>
              </p>
              <p className="text-xs text-indigo-800 flex items-start gap-2">
                <span className="text-indigo-500 font-bold">2.</span>
                <span>You'll get an approval email notification</span>
              </p>
              <p className="text-xs text-indigo-800 flex items-start gap-2">
                <span className="text-indigo-500 font-bold">3.</span>
                <span>Login and start listing your products</span>
              </p>
            </div>
          </div>

          {/* Countdown */}
          <div className="bg-green-50 rounded-xl p-3 border border-green-100">
            <p className="text-sm text-green-800">
              Redirecting to seller login in{" "}
              <span className="font-bold text-lg text-green-600">
                {countdown}s
              </span>
            </p>
          </div>

          {/* Login Button */}
          <Button
            onClick={() => navigate("/become-seller")}   // ✅ Seller login
            variant="contained"
            fullWidth
            startIcon={<StorefrontIcon />}
            endIcon={<ArrowForwardIcon />}
            sx={{
              py: "13px",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "15px",
              background: "linear-gradient(to right, #10b981, #059669)",
              "&:hover": {
                background: "linear-gradient(to right, #059669, #047857)",
              },
            }}
          >
            Continue to Seller Login
          </Button>

          <p className="text-xs text-gray-400">
            Questions? Email us at{" "}
            <span className="font-semibold text-indigo-600">
              support@selfysnap.com
            </span>
          </p>
        </div>
      </div>
    );
  }

  /* ❌ ERROR */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 p-5">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center space-y-6 border border-gray-100">
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-red-400 to-orange-500 rounded-full p-6 shadow-lg">
            <ErrorOutlineIcon sx={{ fontSize: 60, color: "white" }} />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Verification Failed
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">{errorMsg}</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left space-y-1.5">
          <p className="text-xs font-bold text-amber-800">
             What can you do?
          </p>
          <p className="text-xs text-amber-700">
            • Check if the link has expired (valid 24 hours)
          </p>
          <p className="text-xs text-amber-700">
            • Request a new verification email
          </p>
          <p className="text-xs text-amber-700">
            • Contact support if issue persists
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            onClick={() => navigate("/become-seller")}   // ✅ Seller register
            variant="contained"
            fullWidth
            sx={{
              py: "12px",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "bold",
              background: "linear-gradient(to right, #4f46e5, #7c3aed)",
              "&:hover": {
                background: "linear-gradient(to right, #4338ca, #6d28d9)",
              },
            }}
          >
            Register Again
          </Button>
        </div>

        <p className="text-xs text-gray-400">
          Need help? Contact{" "}
          <span className="font-semibold text-indigo-600">
            support@selfysnap.com
          </span>
        </p>
      </div>
    </div>
  );
};

export default SellerAccountVerification;