// import React from "react";
// import { Grid, TextField } from "@mui/material";

// interface BecomeSellerFormStep2Props {
//   formik: any; // Replace 'any' with the correct type for formik instance
// }

// const BecomeSellerFormStep2: React.FC<BecomeSellerFormStep2Props> = ({ formik }) => {
//   return (
//     <div>
//       <Grid container spacing={3}>
//         <Grid size={12}>
//           <TextField
//             fullWidth
//             name="pickupAddress.name"
//             label="Name"
//             value={formik.values.pickupAddress.name}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.name && Boolean(formik.errors.name)}
//             helperText={formik.touched.name && formik.errors.name}
//           />
//         </Grid>
//         <Grid size={6}>
//           <TextField
//             fullWidth
//             name="pickupAddress.mobile"
//             label="Mobile"
//             value={formik.values.pickupAddress.mobile}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.mobile && Boolean(formik.errors.mobile)}
//             helperText={formik.touched.mobile && formik.errors.mobile}
//           />
//         </Grid>
//         <Grid size={6}>
//           <TextField
//             fullWidth
//             name="pickupAddress.pinCode"
//             label="Pincode"
//             value={formik.values.pickupAddress.pinCode}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.pickupAddress?.pinCode && Boolean(formik.errors.pickupAddress?.pinCode)}
//             helperText={formik.touched.pickupAddress?.pinCode && formik.errors.pickupAddress?.pinCode}
//           />
//         </Grid>
//         <Grid size={12}>
//           <TextField
//             fullWidth
//             name="pickupAddress.address"
//             label="Address (House No, Building, Street)"
//             value={formik.values.pickupAddress.address}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.pickupAddress?.address && Boolean(formik.errors.pickupAddress?.address)}
//             helperText={formik.touched.pickupAddress?.address && formik.errors.pickupAddress?.address}
//           />
//         </Grid>
//         <Grid size={12}>
//           <TextField
//             fullWidth
//             name="pickupAddress.locality"
//             label="Locality/Town"
//             value={formik.values.pickupAddress.locality}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.pickupAddress?.locality && Boolean(formik.errors.pickupAddress?.locality)}
//             helperText={formik.touched.pickupAddress?.locality && formik.errors.pickupAddress?.locality}
//           />
//         </Grid>
//         <Grid size={6}>
//           <TextField
//             fullWidth
//             name="pickupAddress.city"
//             label="City"
//             value={formik.values.pickupAddress.city}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.pickupAddress?.city && Boolean(formik.errors.pickupAddress?.city)}
//             helperText={formik.touched.pickupAddress?.city && formik.errors.pickupAddress?.city}
//           />
//         </Grid>
//         <Grid size={6}>
//           <TextField
//             fullWidth
//             name="pickupAddress.state"
//             label="State"
//             value={formik.values.pickupAddress.state}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.pickupAddress?.state && Boolean(formik.errors.pickupAddress?.state)}
//             helperText={formik.touched.pickupAddress?.state && formik.errors.pickupAddress?.state}
//           />
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default BecomeSellerFormStep2;








import { Grid, TextField, CircularProgress, InputAdornment } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const BecomeSellerFormStep2 = ({ formik }: any) => {
  const [loadingPincode, setLoadingPincode] = useState(false);
  const [pincodeError, setPincodeError] = useState<string | null>(null);
  const [pincodeSuccess, setPincodeSuccess] = useState(false);

  /* 🔥 Pincode वाला value watch करो */
  const pinCode = formik.values.pickupAddress?.pinCode;

  useEffect(() => {
    const fetchPincodeDetails = async () => {
      // Reset states
      setPincodeError(null);
      setPincodeSuccess(false);

      // 6 digits होना चाहिए
      if (!pinCode || pinCode.length !== 6) {
        return;
      }

      // सिर्फ digits
      if (!/^\d{6}$/.test(pinCode)) {
        setPincodeError("Invalid pincode format");
        return;
      }

      setLoadingPincode(true);

      try {
        const { data } = await axios.get(
          `https://api.postalpincode.in/pincode/${pinCode}`
        );

        console.log("📍 Pincode API response:", data);

        if (
          data &&
          data[0] &&
          data[0].Status === "Success" &&
          data[0].PostOffice &&
          data[0].PostOffice.length > 0
        ) {
          const postOffice = data[0].PostOffice[0];
          const city = postOffice.District || postOffice.Block || "";
          const state = postOffice.State || "";
          const locality = postOffice.Name || "";

          console.log("✅ Found:", { city, state, locality });

          // 🔥 Formik में auto-fill करो
          formik.setFieldValue("pickupAddress.city", city);
          formik.setFieldValue("pickupAddress.state", state);

          // अगर locality खाली है तो auto-fill करो
          if (!formik.values.pickupAddress.locality && locality) {
            formik.setFieldValue("pickupAddress.locality", locality);
          }

          setPincodeSuccess(true);
        } else {
          setPincodeError("Invalid pincode. Please check and try again.");
          // Clear fields
          formik.setFieldValue("pickupAddress.city", "");
          formik.setFieldValue("pickupAddress.state", "");
        }
      } catch (error) {
        console.error("❌ Pincode API error:", error);
        setPincodeError("Could not fetch pincode details. Try again.");
      } finally {
        setLoadingPincode(false);
      }
    };

    // Debounce 500ms - ताकि हर keystroke पर API call ना हो
    const timer = setTimeout(fetchPincodeDetails, 500);
    return () => clearTimeout(timer);
  }, [pinCode]);

  return (
    <Grid container spacing={3}>
      {/* Full Name */}
      <Grid size={12}>
        <TextField
          fullWidth
          name="pickupAddress.name"
          label="Full Name"
          value={formik.values.pickupAddress.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.pickupAddress?.name &&
            Boolean(formik.errors.pickupAddress?.name)
          }
          helperText={
            formik.touched.pickupAddress?.name &&
            formik.errors.pickupAddress?.name
          }
        />
      </Grid>

      {/* Mobile */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          name="pickupAddress.mobile"
          label="Mobile Number"
          value={formik.values.pickupAddress.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.pickupAddress?.mobile &&
            Boolean(formik.errors.pickupAddress?.mobile)
          }
          helperText={
            formik.touched.pickupAddress?.mobile &&
            formik.errors.pickupAddress?.mobile
          }
          inputProps={{ maxLength: 10 }}
        />
      </Grid>

      {/* 🔥 PINCODE with Auto-Fill */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          name="pickupAddress.pinCode"
          label="Pincode"
          value={formik.values.pickupAddress.pinCode}
          onChange={(e) => {
            // 🔥 सिर्फ digits allow करो (max 6)
            const value = e.target.value.replace(/\D/g, "").slice(0, 6);
            formik.setFieldValue("pickupAddress.pinCode", value);
          }}
          onBlur={formik.handleBlur}
          error={
            (formik.touched.pickupAddress?.pinCode &&
              Boolean(formik.errors.pickupAddress?.pinCode)) ||
            Boolean(pincodeError)
          }
          helperText={
            pincodeError ||
            (formik.touched.pickupAddress?.pinCode &&
              formik.errors.pickupAddress?.pinCode)
          }
          inputProps={{ maxLength: 6, inputMode: "numeric" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {loadingPincode ? (
                  <CircularProgress size={20} />
                ) : pincodeSuccess ? (
                  <CheckCircleIcon sx={{ color: "#16a34a", fontSize: 22 }} />
                ) : null}
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      {/* Address */}
      <Grid size={12}>
        <TextField
          fullWidth
          name="pickupAddress.address"
          label="Address (House No, Building, Street)"
          value={formik.values.pickupAddress.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.pickupAddress?.address &&
            Boolean(formik.errors.pickupAddress?.address)
          }
          helperText={
            formik.touched.pickupAddress?.address &&
            formik.errors.pickupAddress?.address
          }
        />
      </Grid>

      {/* Locality */}
      <Grid size={12}>
        <TextField
          fullWidth
          name="pickupAddress.locality"
          label="Locality / Town"
          value={formik.values.pickupAddress.locality}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.pickupAddress?.locality &&
            Boolean(formik.errors.pickupAddress?.locality)
          }
          helperText={
            formik.touched.pickupAddress?.locality &&
            formik.errors.pickupAddress?.locality
          }
        />
      </Grid>

      {/* 🔥 CITY (auto-filled, but editable) */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          name="pickupAddress.city"
          label="City / District"
          value={formik.values.pickupAddress.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.pickupAddress?.city &&
            Boolean(formik.errors.pickupAddress?.city)
          }
          helperText={
            formik.touched.pickupAddress?.city &&
            formik.errors.pickupAddress?.city
          }
          InputProps={{
            readOnly: pincodeSuccess, // 🔥 Auto-filled हो तो readonly
            sx: pincodeSuccess
              ? { backgroundColor: "#f0fdf4" }
              : {},
          }}
        />
      </Grid>

      {/* 🔥 STATE (auto-filled, but editable) */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          name="pickupAddress.state"
          label="State"
          value={formik.values.pickupAddress.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.pickupAddress?.state &&
            Boolean(formik.errors.pickupAddress?.state)
          }
          helperText={
            formik.touched.pickupAddress?.state &&
            formik.errors.pickupAddress?.state
          }
          InputProps={{
            readOnly: pincodeSuccess,
            sx: pincodeSuccess
              ? { backgroundColor: "#f0fdf4" }
              : {},
          }}
        />
      </Grid>

      {/* Success message */}
      {pincodeSuccess && (
        <Grid size={12}>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
            <CheckCircleIcon sx={{ color: "#16a34a", fontSize: 20 }} />
            <p className="text-xs text-green-800 font-medium">
              Pincode verified! City & State auto-filled. You can still edit if
              needed.
            </p>
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default BecomeSellerFormStep2;