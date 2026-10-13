// import React from "react";
// import { TextField } from "@mui/material";

// interface BecomeSellerFormStep2Props {
//   formik: any; // Replace 'any' with the correct type for formik instance
// }

// const BecomeSellerFormStep3: React.FC<BecomeSellerFormStep2Props> = ({ formik }) => {
//   return (
//     <div className="space-y-5">
       
//           <TextField
//             fullWidth
//             name="bankDetails.accountNumber"
//             label="Account Number"
//             value={formik.values.bankDetails.accountNumber}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.bankDetails?.accountNumber && Boolean(formik.errors.bankDetails?.accountNumber)}
//             helperText={formik.touched.bankDetails?.accountNumber && formik.errors.bankDetails?.accountNumber}
//           />
//           <TextField
//             fullWidth
//             name="bankDetails.ifscCode"
//             label="IFSC Code"
//             value={formik.values.bankDetails.ifscCode}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.bankDetails?.ifscCode && Boolean(formik.errors.bankDetails?.ifscCode)}
//             helperText={formik.touched.bankDetails?.ifscCode && formik.errors.bankDetails?.ifscCode}
//           />
//           <TextField
//             fullWidth
//             name="bankDetails.accountHolderName"
//             label="Account Holder Name"
//             value={formik.values.bankDetails.accountHolderName}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.bankDetails?.accountHolderName && Boolean(formik.errors.bankDetails?.accountHolderName)}
//             helperText={formik.touched.bankDetails?.accountHolderName && formik.errors.bankDetails?.accountHolderName}
//           />
//     </div>
//   );
// };

// export default BecomeSellerFormStep3;







import { TextField } from "@mui/material";

const BecomeSellerFormStep3 = ({ formik }: any) => {
  return (
    <div className="space-y-6">
      <TextField
        fullWidth
        name="bankDetails.accountNumber"
        label="Account Number"
        value={formik.values.bankDetails.accountNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bankDetails?.accountNumber &&
          Boolean(formik.errors.bankDetails?.accountNumber)
        }
        helperText={
          formik.touched.bankDetails?.accountNumber &&
          formik.errors.bankDetails?.accountNumber
        }
      />

      <TextField
        fullWidth
        name="bankDetails.ifscCode"
        label="IFSC Code"
        placeholder="ENTER IFSC CODE"
        value={formik.values.bankDetails.ifscCode}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bankDetails?.ifscCode &&
          Boolean(formik.errors.bankDetails?.ifscCode)
        }
        helperText={
          formik.touched.bankDetails?.ifscCode &&
          formik.errors.bankDetails?.ifscCode
        }
        inputProps={{ style: { textTransform: "uppercase" } }}
      />

      <TextField
        fullWidth
        name="bankDetails.accountHolderName"
        label="Account Holder Name"
        value={formik.values.bankDetails.accountHolderName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bankDetails?.accountHolderName &&
          Boolean(formik.errors.bankDetails?.accountHolderName)
        }
        helperText={
          formik.touched.bankDetails?.accountHolderName &&
          formik.errors.bankDetails?.accountHolderName
        }
      />

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
         Make sure the bank account is in the name of the business owner or business itself.
      </div>
    </div>
  );
};

export default BecomeSellerFormStep3;