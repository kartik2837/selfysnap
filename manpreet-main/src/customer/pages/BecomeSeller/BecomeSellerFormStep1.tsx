// import { Box, TextField } from "@mui/material";


// const BecomeSellerFormStep1 = ({ formik }: any) => {



//     return (
//         <Box  >
//             <p className="text-xl font-bold text-center pb-9">Contact Details</p>

//             <div className="space-y-9">

//                 <TextField
//                     fullWidth
//                     name="mobile"
//                     label="Mobile"
//                     value={formik.values.mobile}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.mobile && Boolean(formik.errors.mobile)}
//                     helperText={formik.touched.mobile && formik.errors.mobile}
//                 />

//                 {/* <div className="space-y-2">
//                     <p className="font-medium text-sm">
//                         * Enter OTP sent to your mobile number
//                     </p>
//                     <OTPInput
//                         length={6}
//                         onChange={handleOtpChange}
//                         error={false}
//                     />
//                     <p className="text-xs space-x-2">
//                         Didn’t receive OTP?{" "}
//                         <span onClick={handleResendOTP} className="text-teal-600 cursor-pointer hover:text-teal-800 font-semibold">
//                             Resend OTP
//                         </span>
//                     </p>
//                 </div> */}

//                 <TextField
//                     fullWidth
//                     name="GSTIN"
//                     label="GSTIN Number"
//                     value={formik.values.GSTIN}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.GSTIN && Boolean(formik.errors.GSTIN)}
//                     helperText={formik.touched.GSTIN && formik.errors.GSTIN}
//                 />
//             </div>


//         </Box>
//     );
// };

// export default BecomeSellerFormStep1;







import { Box, TextField, InputAdornment } from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const BecomeSellerFormStep1 = ({ formik }: any) => {
  return (
    <Box>
      <div className="space-y-6">
        {/* Mobile */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <TextField
            fullWidth
            name="mobile"
            placeholder="10-digit mobile number"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
            inputProps={{ maxLength: 10 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneAndroidIcon className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        {/* GSTIN */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            GSTIN Number <span className="text-red-500">*</span>
          </label>
          <TextField
            fullWidth
            name="GSTIN"
            placeholder="ENTER GST"
            value={formik.values.GSTIN}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.GSTIN && Boolean(formik.errors.GSTIN)}
            helperText={formik.touched.GSTIN && formik.errors.GSTIN}
            inputProps={{ maxLength: 15, style: { textTransform: "uppercase" } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ReceiptLongIcon className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        {/* Info box */}
       
      </div>
    </Box>
  );
};

export default BecomeSellerFormStep1;