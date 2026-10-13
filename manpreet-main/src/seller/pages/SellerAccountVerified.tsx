// import { Alert, Button } from '@mui/material'
// import { useNavigate } from 'react-router-dom'

// const SellerAccountVerified = () => {
//     const navigate = useNavigate()
//     return (
//         <div className='h-[80vh] flex flex-col justify-center items-center space-y-3'>

//             <Alert variant="filled" severity="success">
//                 Your Email Get Verified Successfully
//             </Alert>
//             <div>
//                 <Button variant='contained' onClick={() => navigate("/become-seller")}>
//                     Login As Seller
//                 </Button>
//             </div>

//         </div>
//     )
// }

// export default SellerAccountVerified








import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import StorefrontIcon from "@mui/icons-material/Storefront";

const SellerAccountVerified = () => {
  const navigate = useNavigate();

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
          <p className="text-gray-600 text-sm md:text-base">
            Your email has been verified successfully.
          </p>
        </div>

        {/* 24-48 Hours */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-5 space-y-3 text-left">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 rounded-full p-2 flex-shrink-0">
              <ScheduleIcon sx={{ fontSize: 22, color: "white" }} />
            </div>
            <div>
              <p className="font-bold text-amber-900">
                Verification in Progress
              </p>
              <p className="text-xs text-amber-700">
                Usually takes 24-48 hours
              </p>
            </div>
          </div>

          <p className="text-xs text-amber-800 leading-relaxed pt-2 border-t border-amber-200">
            Our team is reviewing your submitted documents. You'll receive an
            email once your account is approved.
          </p>
        </div>

        {/* Login Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate("/become-seller")}   // ✅ Seller login
          startIcon={<StorefrontIcon />}
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
          Go to Seller Login
        </Button>
      </div>
    </div>
  );
};

export default SellerAccountVerified;