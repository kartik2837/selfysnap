// import  { useEffect, useState } from 'react'
// import LoginForm from './LoginForm'
// import { Alert, Button, Snackbar } from '@mui/material';
// import SignupForm from './SignupForm';
// import { useAppSelector } from '../../../Redux Toolkit/Store';

// const Auth = () => {
//     const [isLoginPage, setIsLoginPage] = useState(true);
//     const handleCloseSnackbar = () => setSnackbarOpen(false)
//     const { auth } = useAppSelector(store => store)
//     const [snackbarOpen, setSnackbarOpen] = useState(false);

//     useEffect(() => {

//         if (auth.otpSent || auth.error) {
//             setSnackbarOpen(true);
//             console.log("store ", auth.error)
//         }

//     }, [auth.otpSent,auth.error])

//     return (
//         <div className='flex justify-center h-[90vh] items-center'>
//             <div className='max-w-md h-[85vh] rounded-md border shadow-lg '>
//                 {/* <img className='w-full rounded-t-md' src="/login_banner.png" alt="" /> */}
//                 <div className='mt-8 px-10'>
//                     {isLoginPage ? <LoginForm /> : <SignupForm />}

//                     <div className='flex items-center gap-1 justify-center mt-5'>
//                         <p>{isLoginPage && "Don't"} have Account ?</p>
//                         <Button onClick={() => setIsLoginPage(!isLoginPage)} size='small'>{isLoginPage ? "create account" : "login"}</Button>
//                     </div>
//                 </div>


//             </div>
//             <Snackbar
//                 anchorOrigin={{ vertical: "top", horizontal: "right" }}
//                 open={snackbarOpen} autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//             >
//                 <Alert
//                     onClose={handleCloseSnackbar}
//                     severity={auth.error?"error":"success"}
//                     variant="filled"
//                     sx={{ width: '100%' }}
//                 >
//                     {auth.error?auth.error : " otp sent to your email!"}
//                 </Alert>
//             </Snackbar>
//         </div>
//     )
// }

// export default Auth
















import { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import { Alert, Button, Snackbar } from '@mui/material';
import SignupForm from './SignupForm';
import { useAppSelector } from '../../../Redux Toolkit/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const Auth = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const { auth } = useAppSelector((store: any) => store);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  useEffect(() => {
    if (auth.otpSent || auth.error) {
      setSnackbarOpen(true);
    }
  }, [auth.otpSent, auth.error]);

  return (
    /* 🔥 FULL SCREEN SPLIT LAYOUT */
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* ═══════════════════════════════════════════
          🔥 LEFT SIDE — Form
          ═══════════════════════════════════════════ */}
      <div className="flex items-center justify-center px-4 sm:px-8 py-10 bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <div className="w-full max-w-md">
          {/* Logo — click → home */}
          <div className="flex justify-center mb-6">
            <button
              type="button"
              onClick={() => (window.location.href = '/')}
              className="cursor-pointer hover:scale-105 transition-transform"
              title="Go to Home"
            >
              <img
                src="/logo34.png"
                alt="SelfySnap"
                className="h-14 w-auto object-contain"
              />
            </button>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8">
            {/* Tab Switcher */}
            <div className="grid grid-cols-2 gap-2 mb-6 bg-gray-100 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setIsLoginPage(true)}
                className={`py-2.5 rounded-lg font-bold text-sm transition-all ${
                  isLoginPage
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLoginPage(false)}
                className={`py-2.5 rounded-lg font-bold text-sm transition-all ${
                  !isLoginPage
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            {isLoginPage ? <LoginForm /> : <SignupForm />}
          </div>

          {/* Trust badges */}
          

          {/* Footer */}
          
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          🔥 RIGHT SIDE — Branding (LIGHT VERSION)
          ═══════════════════════════════════════════ */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-orange-100 via-pink-50 to-blue-100 p-12 text-gray-800">
        {/* Decorative circles — halke */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 space-y-8 mt-auto mb-auto">
          <div>
            <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight mb-4 text-gray-800">
              Shop Smarter
              <br />
              with <span className="text-orange-500">SelfySnap</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Discover millions of products with exclusive deals and fast
              delivery across India.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 max-w-md">
            <div className="flex items-start gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white shadow-sm">
              <div className="bg-yellow-400 rounded-lg p-2 flex-shrink-0">
                <LocalShippingIcon sx={{ fontSize: 22, color: '#1e293b' }} />
              </div>
              <div>
                <p className="font-bold text-gray-800">Free Delivery</p>
                <p className="text-sm text-gray-600">
                  On orders above ₹100
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white shadow-sm">
              <div className="bg-green-400 rounded-lg p-2 flex-shrink-0">
                {/* <VerifiedIcon sx={{ fontSize: 22, color: '#1e293b' }} /> */}
              </div>
              <div>
             
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white shadow-sm">
              <div className="bg-blue-400 rounded-lg p-2 flex-shrink-0">
                <SupportAgentIcon sx={{ fontSize: 22, color: '#1e293b' }} />
              </div>
              <div>
                <p className="font-bold text-gray-800">24/7 Support</p>
                <p className="text-sm text-gray-600">
                  We're here to help you
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-300/50">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-orange-500">20k+</p>
              <p className="text-xs text-gray-600">Products</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-pink-500">10k+</p>
              <p className="text-xs text-gray-600">Customers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-blue-500">500+</p>
              <p className="text-xs text-gray-600">Cities</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        
      </div>

      {/* Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={auth.error ? 'error' : 'success'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {auth.error ? auth.error : 'OTP sent to your email!'}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Auth;