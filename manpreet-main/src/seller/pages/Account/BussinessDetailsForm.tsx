// import  { useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { TextField, Button } from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { updateSeller } from "../../../Redux Toolkit/Seller/sellerSlice";

// export interface UpdateDetailsFormProps {
//   onClose: () => void;
// }
// const BusinessDetailsForm = ({ onClose }: UpdateDetailsFormProps) => {
//   const dispatch = useAppDispatch();
//   const { sellers } = useAppSelector((store) => store);
//   const formik = useFormik({
//     initialValues: {
//       businessName: "",
//       GSTIN: "",
//       accountStatus: "",
//     },
//     validationSchema: Yup.object({
//       businessName: Yup.string().required("Business Name is required"),
//       GSTIN: Yup.string().required("GSTIN is required"),
//       accountStatus: Yup.string().required("Account Status is required"),
//     }),
//     onSubmit: (values) => {
//       console.log(values);
//       dispatch(
//         updateSeller({
//           ...values,
//           businessDetails: { businessName: values.businessName },
//         })
//       );
//       onClose();
//     },
//   });

//   useEffect(() => {
//     if (sellers.profile) {
//       formik.setValues({
//         businessName: sellers.profile?.businessDetails?.businessName,
//         GSTIN: sellers.profile?.GSTIN,
//         accountStatus: sellers.profile?.accountStatus ?? "",
//       });
//     }
//   }, [sellers.profile]);

//   return (
//     <>
//       <h1 className="text-xl pb-5 text-center font-bold text-gray-600">
//         Business Details
//       </h1>
//       <form className="space-y-5" onSubmit={formik.handleSubmit}>
//         <TextField
//           fullWidth
//           id="businessName"
//           name="businessName"
//           label="Business Name"
//           value={formik.values.businessName}
//           onChange={formik.handleChange}
//           error={
//             formik.touched.businessName && Boolean(formik.errors.businessName)
//           }
//           helperText={formik.touched.businessName && formik.errors.businessName}
//         />
//         <TextField
//           fullWidth
//           id="gstin"
//           name="GSTIN"
//           label="GSTIN"
//           value={formik.values.GSTIN}
//           onChange={formik.handleChange}
//           error={formik.touched.GSTIN && Boolean(formik.errors.GSTIN)}
//           helperText={formik.touched.GSTIN && formik.errors.GSTIN}
//         />
//         <TextField
//           fullWidth
//           id="accountStatus"
//           name="accountStatus"
//           label="Account Status"
//           value={formik.values.accountStatus}
//           onChange={formik.handleChange}
//           error={
//             formik.touched.accountStatus && Boolean(formik.errors.accountStatus)
//           }
//           helperText={
//             formik.touched.accountStatus && formik.errors.accountStatus
//           }
//         />
//         <Button
//           sx={{ py: ".9rem" }}
//           color="primary"
//           variant="contained"
//           fullWidth
//           type="submit"
//         >
//           Save
//         </Button>
//       </form>
//     </>
//   );
// };

// export default BusinessDetailsForm;


























// src/.../BussinessDetailsForm.tsx

import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, InputAdornment } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { updateSeller } from "../../../Redux Toolkit/Seller/sellerSlice";

export interface UpdateDetailsFormProps {
  onClose: () => void;
}

const BusinessDetailsForm = ({ onClose }: UpdateDetailsFormProps) => {
  const dispatch = useAppDispatch();
  const { sellers } = useAppSelector((store) => store);

  const formik = useFormik({
    initialValues: {
      businessName: "",
      GSTIN: "",
      accountStatus: "",
    },
    validationSchema: Yup.object({
      // businessName और GSTIN locked हैं — validation सिर्फ accountStatus की
      accountStatus: Yup.string().required("Account Status is required"),
    }),
    onSubmit: (values) => {
      /* ⚠️ सिर्फ accountStatus भेज रहे हैं
         businessName और GSTIN payload में नहीं जाएँगे (locked) */
      dispatch(
        updateSeller({
          accountStatus: values.accountStatus,
        })
      );
      onClose();
    },
  });

  useEffect(() => {
    if (sellers.profile) {
      formik.setValues({
        businessName: sellers.profile?.businessDetails?.businessName || "",
        GSTIN: sellers.profile?.GSTIN || "",
        accountStatus: sellers.profile?.accountStatus ?? "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellers.profile]);

  return (
    <>
      <h1 className="text-xl pb-5 text-center font-bold text-gray-600">
        Business Details
      </h1>

      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        {/* 🔒 Business Name — LOCKED */}
        <TextField
          fullWidth
          id="businessName"
          name="businessName"
          label="Business Name"
          value={formik.values.businessName}
          disabled
          helperText="contact for selfysnap"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LockIcon fontSize="small" sx={{ color: "text.disabled" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* 🔒 GSTIN — LOCKED */}
        <TextField
          fullWidth
          id="gstin"
          name="GSTIN"
          label="GSTIN"
          value={formik.values.GSTIN}
          disabled
          helperText="contact for selfysnap"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LockIcon fontSize="small" sx={{ color: "text.disabled" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* ✅ Account Status — EDITABLE */}
        <TextField
          fullWidth
          id="accountStatus"
          name="accountStatus"
          label="Account Status"
          value={formik.values.accountStatus}
          onChange={formik.handleChange}
          error={
            formik.touched.accountStatus && Boolean(formik.errors.accountStatus)
          }
          helperText={
            formik.touched.accountStatus && formik.errors.accountStatus
          }
        />

        <Button
          sx={{ py: ".9rem" }}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Save
        </Button>
      </form>
    </>
  );
};

export default BusinessDetailsForm;
