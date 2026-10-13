// import { Button, CircularProgress, Step, StepLabel, Stepper } from "@mui/material";
// import { useFormik } from "formik";
// import { useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { createSeller } from "../../../Redux Toolkit/Seller/sellerAuthenticationSlice";
// import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
// import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
// import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
// import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";

// const steps = [
//     "Tax Details & Mobile",
//     "Pickup Address",
//     "Bank Details",
//     "Supplier Details",
// ];


// const SellerAccountForm = () => {
//     const [activeStep, setActiveStep] = useState(0);
//     const dispatch = useAppDispatch();
//     const { sellerAuth } = useAppSelector(store => store)

//     const handleStep = (value: number) => {
//         setActiveStep(activeStep + value);
//     };

//     const [otp, setOpt] = useState<any>();

//     const formik = useFormik({
//         initialValues: {
//             mobile: "",
//             otp: "",
//             GSTIN: "",
//             pickupAddress: {
//                 name: "",
//                 mobile: "",
//                 pinCode: "",
//                 address: "",
//                 locality: "",
//                 city: "",
//                 state: "",
//             },
//             bankDetails: {
//                 accountNumber: "",
//                 ifscCode: "",
//                 accountHolderName: "",
//             },
//             sellerName: "",
//             email: "",
//             businessDetails: {
//                 businessName: "",
//                 businessEmail: "",
//                 businessMobile: "",
//                 logo: "",
//                 banner: "",
//                 businessAddress: ""
//             },
//             password: ""
//         },
//         // validationSchema: FormSchema,
//         onSubmit: (values) => {
//             console.log(values, "formik submitted");
//             console.log("active step ", activeStep);
//             dispatch(createSeller(formik.values))
//         },
//     });

//     const handleOtpChange = (otpValue: string) => {
//         setOpt(otpValue);
//         console.log(otpValue);
//         // formik.setFieldValue("opt",otpValue)
//     };

//     const handleSubmit = () => {
//         console.log("OTP entered:", otp);
//         //submit form data to server
//         formik.handleSubmit();
//         console.log("Form Submitted");
//     };



//     return (
//         <div>  <Stepper activeStep={activeStep} alternativeLabel>
//             {steps.map((label) => (
//                 <Step key={label}>
//                     <StepLabel>{label}</StepLabel>
//                 </Step>
//             ))}
//         </Stepper>
//             <div className="mt-20 space-y-10">
//                 <div>
//                     {activeStep === 0 ? (
//                         <BecomeSellerFormStep1
//                             formik={formik}
//                             handleOtpChange={handleOtpChange}
//                         />
//                     ) : activeStep === 1 ? (
//                         <BecomeSellerFormStep2 formik={formik} />
//                     ) : activeStep === 2 ? (
//                         <BecomeSellerFormStep3 formik={formik} />
//                     ) : (
//                         <BecomeSellerFormStep4 formik={formik} />
//                     )}
//                 </div>

//                 <div className="flex items-center justify-between ">
//                     <Button
//                         disabled={activeStep === 0}
//                         onClick={() => handleStep(-1)}
//                         variant="contained"
//                     >
//                         Back
//                     </Button>
//                     <Button
//                         disabled={sellerAuth.loading}
//                         onClick={
//                             activeStep === steps.length - 1
//                                 ? handleSubmit
//                                 : () => handleStep(1)
//                         }
//                         variant="contained"
//                     >
//                         {activeStep === steps.length - 1 ? sellerAuth.loading ? <CircularProgress size="small"
//                             sx={{ width: "27px", height: "27px" }} /> : "create account" : "Continue"}
//                     </Button>
//                 </div>
//             </div> </div>
//     )
// }

// export default SellerAccountForm








import {
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { createSeller } from "../../../Redux Toolkit/Seller/sellerAuthenticationSlice";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";
import BecomeSellerFormStep5 from "./BecomeSellerFormStep5";

const steps = [
  "Contact & GST",
  "Pickup Address",
  "Bank Details",
  "Business Info",
  "Documents",
];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();

  // ✅ Type-safe selector with fallback
  const sellerAuth = useAppSelector((store: any) => store.sellerAuth) || {
    loading: false,
    error: null,
    sellerCreated: null,
    otpSent: false,
  };

  const navigate = useNavigate();

  /* 🔥 Auto redirect to login on success */
  useEffect(() => {
    if (sellerAuth.sellerCreated) {
      const timer = setTimeout(() => navigate("/login"), 2500);
      return () => clearTimeout(timer);
    }
  }, [sellerAuth.sellerCreated, navigate]);

  const formik = useFormik({
    initialValues: {
      mobile: "",
      GSTIN: "",
      pickupAddress: {
        name: "",
        mobile: "",
        pinCode: "",
        address: "",
        locality: "",
        city: "",
        state: "",
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        businessAddress: "",
        logo: "",
        banner: "",
      },
      password: "",
      documents: {
        gstCertificate: null as File | null,
        panCard: null as File | null,
        bankProof: null as File | null,
        bankProofType: "cancelled_cheque" as
          | "cancelled_cheque"
          | "passbook_savings"
          | "passbook_current",
      },
    },

    validationSchema: Yup.object({
      mobile: Yup.string()
        .required("Mobile number is required")
        .matches(/^[6-9]\d{9}$/, "Invalid mobile (10 digits, starts 6-9)"),
      GSTIN: Yup.string()
        .required("GSTIN is required")
        .matches(
          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
          "Invalid GSTIN (e.g., 22AAAAA0000A1Z5)"
        ),
      pickupAddress: Yup.object({
        name: Yup.string().required("Name required"),
        mobile: Yup.string()
          .required("Mobile required")
          .matches(/^[6-9]\d{9}$/, "Invalid mobile"),
        pinCode: Yup.string()
          .required("Pincode required")
          .matches(/^[1-9][0-9]{5}$/, "Invalid pincode (6 digits)"),
        address: Yup.string().required("Address required"),
        locality: Yup.string().required("Locality required"),
        city: Yup.string().required("City required"),
        state: Yup.string().required("State required"),
      }),
      bankDetails: Yup.object({
        accountNumber: Yup.string()
          .required("Account number required")
          .matches(/^\d{9,18}$/, "Invalid account (9-18 digits)"),
        ifscCode: Yup.string()
          .required("IFSC required")
          .matches(
            /^[A-Z]{4}0[A-Z0-9]{6}$/,
            "Invalid IFSC (e.g., SBIN0001234)"
          ),
        accountHolderName: Yup.string().required("Holder name required"),
      }),
      sellerName: Yup.string().required("Seller name required"),
      email: Yup.string().required("Email required").email("Invalid email"),
      password: Yup.string()
        .required("Password required")
        .min(6, "Min 6 characters"),
      businessDetails: Yup.object({
        businessName: Yup.string().required("Business name required"),
        businessEmail: Yup.string()
          .required("Business email required")
          .email("Invalid email"),
        businessMobile: Yup.string()
          .required("Business mobile required")
          .matches(/^[6-9]\d{9}$/, "Invalid mobile"),
        businessAddress: Yup.string().required("Business address required"),
      }),
      documents: Yup.object({
        gstCertificate: Yup.mixed().required("GST Certificate required"),
        panCard: Yup.mixed().required("PAN Card required"),
        bankProof: Yup.mixed().required("Bank proof required"),
      }),
    }),

    onSubmit: (values) => {
      dispatch(createSeller(values as any));
    },
  });

  const handleStep = (value: number) => setActiveStep((s) => s + value);

  /* 🔥 Validate current step */
  const validateCurrentStep = async (): Promise<boolean> => {
    const errors: any = await formik.validateForm();

    const fieldsByStep: string[][] = [
      ["mobile", "GSTIN"],
      [
        "pickupAddress.name",
        "pickupAddress.mobile",
        "pickupAddress.pinCode",
        "pickupAddress.address",
        "pickupAddress.locality",
        "pickupAddress.city",
        "pickupAddress.state",
      ],
      [
        "bankDetails.accountNumber",
        "bankDetails.ifscCode",
        "bankDetails.accountHolderName",
      ],
      [
        "sellerName",
        "email",
        "password",
        "businessDetails.businessName",
        "businessDetails.businessEmail",
        "businessDetails.businessMobile",
        "businessDetails.businessAddress",
      ],
      ["documents.gstCertificate", "documents.panCard", "documents.bankProof"],
    ];

    const stepFields = fieldsByStep[activeStep];
    const touchedFields: any = {};

    for (const field of stepFields) {
      const keys = field.split(".");
      let obj: any = touchedFields;
      keys.forEach((k, i) => {
        if (i === keys.length - 1) obj[k] = true;
        else {
          obj[k] = obj[k] || {};
          obj = obj[k];
        }
      });
    }
    formik.setTouched({ ...formik.touched, ...touchedFields });

    /* Check errors in current step */
    for (const field of stepFields) {
      const keys = field.split(".");
      let err: any = errors;
      for (const k of keys) err = err?.[k];
      if (err) return false;
    }
    return true;
  };

  const handleNext = async () => {
    const ok = await validateCurrentStep();
    if (ok) handleStep(1);
  };

  return (
    <div className="space-y-8">
      {/* 🎨 Header */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Become a Seller
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Complete all steps to start selling on Selfysnap
        </p>
      </div>

      {/* 🎨 Stepper */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, i) => (
            <Step key={label} completed={i < activeStep}>
              <StepLabel>
                <span className="text-xs font-medium">{label}</span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* 🎨 Form Body */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="h-1 w-6 bg-indigo-500 rounded-full" />
            Step {activeStep + 1}: {steps[activeStep]}
          </h2>
        </div>

        {activeStep === 0 && <BecomeSellerFormStep1 formik={formik} />}
        {activeStep === 1 && <BecomeSellerFormStep2 formik={formik} />}
        {activeStep === 2 && <BecomeSellerFormStep3 formik={formik} />}
        {activeStep === 3 && <BecomeSellerFormStep4 formik={formik} />}
        {activeStep === 4 && <BecomeSellerFormStep5 formik={formik} />}
      </div>

      {/* 🎨 Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          disabled={activeStep === 0}
          onClick={() => handleStep(-1)}
          variant="outlined"
          sx={{
            py: "11px",
            px: 4,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
            borderColor: "#cbd5e1",
          }}
        >
          ← Back
        </Button>

       <Button
  disabled={sellerAuth.loading}
  onClick={() => {
    if (activeStep === steps.length - 1) {
      formik.handleSubmit();
    } else {
      handleNext();
    }
  }}
  variant="contained"
  sx={{
    py: "11px",
    px: 4,
    borderRadius: 2,
    textTransform: "none",
    fontWeight: "bold",
    background: "linear-gradient(to right, #4f46e5, #7c3aed)",
    "&:hover": {
      background: "linear-gradient(to right, #4338ca, #6d28d9)",
    },
  }}
>
  {activeStep === steps.length - 1 ? (
    sellerAuth.loading ? (
      <CircularProgress size={24} sx={{ color: "white" }} />
    ) : (
      "Create Account"
    )
  ) : (
    "Continue →"
  )}
</Button>
      </div>
    </div>
  );
};

export default SellerAccountForm;