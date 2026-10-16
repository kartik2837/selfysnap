// import { Button, CircularProgress, TextField } from '@mui/material'
// import { useEffect, useState } from 'react'
// import OTPInput from '../../components/OtpFild/OTPInput'

// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// import { useNavigate } from 'react-router-dom';
// import { sendLoginSignupOtp, signin } from '../../../Redux Toolkit/Customer/AuthSlice';
// import { useFormik } from 'formik';

// const LoginForm = () => {

//     const navigate = useNavigate();
//     const [otp, setOtp] = useState("");
//     const [timer, setTimer] = useState<number>(30); // Timer state
//     const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
//     const dispatch = useAppDispatch();
//     const { auth } = useAppSelector(store => store)

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             otp: ''
//         },

//         onSubmit: (values: any) => {
//             // Handle form submission
//             dispatch(signin({ email: values.email, otp, navigate }))
//             console.log('Form data:', values);
//         }
//     });

//     const handleOtpChange = (otp: any) => {

//         setOtp(otp);

//     };

//     const handleResendOTP = () => {
//         // Implement OTP resend logic
//         dispatch(sendLoginSignupOtp({ email: "signing_"+formik.values.email }))
//         console.log('Resend OTP');
//         setTimer(30);
//         setIsTimerActive(true);
//     };

//     const handleSentOtp = () => {
//         handleResendOTP();
//     }

//     const handleLogin = () => {
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
//             <h1 className='text-center font-bold text-xl text-orange-400 pb-8'>Login</h1>
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

//                 {auth.otpSent && <div className="space-y-2">
//                     <p className="font-medium text-sm">
//                         * Enter OTP sent to your mobile number
//                     </p>
//                     <OTPInput
//                         length={6}
//                         onChange={handleOtpChange}
//                         error={false}
//                     />
//                     <p className="text-xs space-x-2">
//                         {isTimerActive ? (
//                             <span>Resend OTP in {timer} seconds</span>
//                         ) : (
//                             <>
//                                 Didn’t receive OTP?{" "}
//                                 <span
//                                     onClick={handleResendOTP}
//                                     className="text-orange-400 cursor-pointer hover:text-orange-600 font-semibold"
//                                 >
//                                     Resend OTP
//                                 </span>
//                             </>
//                         )}
//                     </p>
//                     {formik.touched.otp && formik.errors.otp && <p>{formik.errors.otp as string}</p>}
//                 </div>}

//                 {auth.otpSent && <div>
//                     <Button disabled={auth.loading} onClick={handleLogin}
//                         fullWidth variant='contained' sx={{ py: "11px" }}>{
//                             auth.loading ? <CircularProgress  />: "Login"}</Button>
//                 </div>}

//                 {!auth.otpSent && <Button
//                 disabled={auth.loading}
//                     fullWidth
//                     variant='contained'
//                     onClick={handleSentOtp}
//                     sx={{ py: "11px" }}>{
//                         auth.loading ? <CircularProgress  />: "sent otp"}</Button>
//                 }



//             </form>

         
//         </div>
//     )
// }

// export default LoginForm









import { Button, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import OTPInput from '../../components/OtpFild/OTPInput';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { useNavigate } from 'react-router-dom';
import {
  sendLoginSignupOtp,
  signin,
} from '../../../Redux Toolkit/Customer/AuthSlice';
import { useFormik } from 'formik';
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import LockClockIcon from '@mui/icons-material/LockClock';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';



const LoginForm = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState<number>(30);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store: any) => store);

  const formik = useFormik({
    initialValues: { email: '', otp: '' },
    onSubmit: (values: any) => {
      dispatch(signin({ email: values.email, otp, navigate }) as any);
    },
  });

  const handleOtpChange = (otp: any) => setOtp(otp);

  const handleResendOTP = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }) as any);
    setTimer(30);
    setIsTimerActive(true);
    setOtp('');
  };

  const handleSentOtp = () => {
    if (!formik.values.email.trim()) {
      formik.setFieldTouched('email', true);
      return;
    }
    handleResendOTP();
  };

  const handleLogin = () => formik.handleSubmit();

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
    <div>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
        <p className="text-gray-500 text-sm mt-1">
          {auth.otpSent
            ? 'Enter the OTP sent to your email'
            : 'Login to continue shopping'}
        </p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* EMAIL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <TextField
            fullWidth
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={auth.otpSent}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={
              formik.touched.email
                ? (formik.errors.email as string)
                : undefined
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon className="text-gray-400" />
                </InputAdornment>
              ),
              sx: { borderRadius: 2 },
            }}
          />
        </div>

        {/* OTP SECTION */}
        {auth.otpSent && (
          <div className="space-y-3 bg-orange-50 border border-orange-100 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <LockClockIcon sx={{ fontSize: 18, color: '#f97316' }} />
              <p className="font-semibold text-sm text-gray-800">
                Enter 6-Digit OTP
              </p>
            </div>

            <p className="text-xs text-gray-500">
              Sent to{' '}
              <span className="font-semibold text-orange-600">
                {formik.values.email}
              </span>
            </p>

            <div className="flex justify-center py-2">
              <OTPInput
                length={6}
                onChange={handleOtpChange}
                error={false}
              />
            </div>

            <p className="text-center text-xs">
              {isTimerActive ? (
                <span className="text-gray-600">
                  Resend OTP in{' '}
                  <span className="font-bold text-orange-600">{timer}s</span>
                </span>
              ) : (
                <>
                  <span className="text-gray-600">
                    Didn't receive OTP?{' '}
                  </span>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-orange-600 font-bold hover:underline"
                  >
                    Resend OTP
                  </button>
                </>
              )}
            </p>
          </div>
        )}

        {/* ERROR */}
        {auth.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 text-center font-medium">
            ❌ {auth.error}
          </div>
        )}

        {/* BUTTON */}
        {auth.otpSent ? (
          <Button
            disabled={auth.loading}
            onClick={handleLogin}
            fullWidth
            variant="contained"
            sx={{
              py: '12px',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '15px',
              bgcolor: '#2874f0',
              '&:hover': { bgcolor: '#1e5fc4' },
            }}
          >
            {auth.loading ? (
              <CircularProgress size={22} sx={{ color: 'white' }} />
            ) : (
              'Verify & Login'
            )}
          </Button>
        ) : (
          <Button
            disabled={auth.loading}
            fullWidth
            variant="contained"
            onClick={handleSentOtp}
            sx={{
              py: '12px',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '15px',
              bgcolor: '#fb641b',
              '&:hover': { bgcolor: '#e55a15' },
            }}
          >
            {auth.loading ? (
              <CircularProgress size={22} sx={{ color: 'white' }} />
            ) : (
              'Send OTP'
            )}
          </Button>
        )}

        {/* CHANGE EMAIL */}
        {auth.otpSent && (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="w-full text-center text-xs text-gray-500 hover:text-gray-700 font-semibold"
          >
            ← Change email address
          </button>
        )}

        {/* SUPPORT */}
        <div className="flex items-center justify-center gap-2 pt-3 border-t border-gray-100 text-xs text-gray-500">
          <SupportAgentIcon sx={{ fontSize: 14 }} />
          {/* <span>Need help?</span>
          <a
            href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`}
            className="font-bold text-orange-600 hover:underline"
          >
            {SUPPORT_PHONE}
          </a> */}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;



