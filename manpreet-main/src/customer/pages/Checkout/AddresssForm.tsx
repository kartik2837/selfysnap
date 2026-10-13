// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import {
//   Button,
//   TextField,
//   Typography,
//   Paper,
//   Box,
// } from '@mui/material';
// import { useAppDispatch } from '../../../Redux Toolkit/Store';
// import {
//   createAddress,
//   updateAddress,
// } from '../../../Redux Toolkit/Customer/addressSlice';
// import type { Address } from '../../../types/userTypes';

// const ContactSchema = Yup.object().shape({
//   name: Yup.string().required('Required'),
//   mobile: Yup.string()
//     .matches(/^[6-9]\d{9}$/, 'Invalid mobile number')
//     .required('Required'),
//   pinCode: Yup.string()
//     .matches(/^\d{6}$/, 'Invalid pincode')
//     .required('Required'),
//   address: Yup.string().required('Required'),
//   locality: Yup.string().required('Required'),
//   city: Yup.string().required('Required'),
//   state: Yup.string().required('Required'),
// });

// interface AddressFormProp {
//   handleClose: () => void;
//   editData?: Address;
// }

// type AddressFormValues = {
//   name: string;
//   mobile: string;
//   pinCode: string;
//   address: string;
//   locality: string;
//   city: string;
//   state: string;
// };

// const AddressForm: React.FC<AddressFormProp> = ({
//   handleClose,
//   editData,
// }) => {
//   const dispatch = useAppDispatch();

//   const formik = useFormik<AddressFormValues>({
//     enableReinitialize: true,
//     initialValues: {
//       name: editData?.name || '',
//       mobile: editData?.mobile || '',
//       pinCode: editData?.pinCode || '',
//       address: editData?.address || '',
//       locality: editData?.locality || '',
//       city: editData?.city || '',
//       state: editData?.state || '',
//     },
//     validationSchema: ContactSchema,
//     onSubmit: async (values) => {
//       try {
//         const jwt = localStorage.getItem('jwt') || '';

//         if (editData?._id) {
//           await dispatch(
//             updateAddress({
//               id: editData._id,
//               data: values,
//               jwt,
//             })
//           ).unwrap();
//         } else {
//           await dispatch(
//             createAddress({
//               data: values,
//               jwt,
//             })
//           ).unwrap();
//         }

//         handleClose();
//       } catch (err: any) {
//         alert(err.message || 'Failed to save address');
//       }
//     },
//   });

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: 4,
//         borderRadius: 3,
//         width: '100%',
//         maxWidth: 500,
//         mx: 'auto',
//       }}
//     >
//       <Typography
//         variant="h6"
//         fontWeight="bold"
//         textAlign="center"
//         mb={3}
//       >
//         {editData ? 'Edit Address' : 'Add Delivery Address'}
//       </Typography>

//       <form onSubmit={formik.handleSubmit}>
//         <Box display="flex" flexDirection="column" gap={2}>
//           {Object.keys(formik.values).map((key) => (
//             <TextField
//               key={key}
//               fullWidth
//               size="small"
//               name={key}
//               label={key.charAt(0).toUpperCase() + key.slice(1)}
//               value={(formik.values as any)[key]}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={
//                 (formik.touched as any)[key] &&
//                 Boolean((formik.errors as any)[key])
//               }
//               helperText={
//                 (formik.touched as any)[key] &&
//                 (formik.errors as any)[key]
//               }
//             />
//           ))}

//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{
//               py: '12px',
//               fontWeight: 'bold',
//               borderRadius: 2,
//               mt: 1,
//             }}
//           >
//             {editData ? 'Update Address' : 'Save Address'}
//           </Button>
//         </Box>
//       </form>
//     </Paper>
//   );
// };

// export default AddressForm;







// src/customer/pages/Checkout/AddresssForm.tsx

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  TextField,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch } from '../../../Redux Toolkit/Store';
import {
  createAddress,
  updateAddress,
} from '../../../Redux Toolkit/Customer/addressSlice';
import type { Address } from '../../../types/userTypes';

const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  mobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid mobile number')
    .required('Required'),
  pinCode: Yup.string()
    .matches(/^\d{6}$/, 'Invalid pincode')
    .required('Required'),
  address: Yup.string().required('Required'),
  locality: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
});

interface AddressFormProp {
  handleClose: () => void;
  editData?: Address;
}

type AddressFormValues = {
  name: string;
  mobile: string;
  pinCode: string;
  address: string;
  locality: string;
  city: string;
  state: string;
};

const AddressForm: React.FC<AddressFormProp> = ({
  handleClose,
  editData,
}) => {
  const dispatch = useAppDispatch();
  const [loadingPin, setLoadingPin] = useState(false);
  const [pinError, setPinError] = useState<string | null>(null);

  const formik = useFormik<AddressFormValues>({
    enableReinitialize: true,
    initialValues: {
      name: editData?.name || '',
      mobile: editData?.mobile || '',
      pinCode: editData?.pinCode || '',
      address: editData?.address || '',
      locality: editData?.locality || '',
      city: editData?.city || '',
      state: editData?.state || '',
    },
    validationSchema: ContactSchema,
    onSubmit: async (values) => {
      try {
        const jwt = localStorage.getItem('jwt') || '';

        if (editData?._id) {
          await dispatch(
            updateAddress({
              id: editData._id,
              data: values,
              jwt,
            }) as any
          ).unwrap();
        } else {
          await dispatch(
            createAddress({
              data: values,
              jwt,
            }) as any
          ).unwrap();
        }

        handleClose();
      } catch (err: any) {
        alert(err.message || 'Failed to save address');
      }
    },
  });

  // ═══════════════════════════════════════════════
  // 📍 PINCODE AUTO-FETCH CITY & STATE
  // ═══════════════════════════════════════════════
  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    formik.setFieldValue('pinCode', value);

    // जब 6 अंक पूरे हो जाएँ
    if (value.length === 6) {
      setLoadingPin(true);
      setPinError(null);

      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await response.json();

        if (data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
          const postOffice = data[0].PostOffice[0];

          formik.setFieldValue('city', postOffice.District || postOffice.Block || '');
          formik.setFieldValue('state', postOffice.State || '');
          formik.setFieldValue('locality', postOffice.Name || '');

          setPinError(null);
          console.log("✅ Auto-filled:", postOffice.District, postOffice.State);
        } else {
          setPinError('Invalid Pincode');
          formik.setFieldValue('city', '');
          formik.setFieldValue('state', '');
        }
      } catch (error) {
        console.error("Pincode fetch failed:", error);
        setPinError('Could not fetch details');
      } finally {
        setLoadingPin(false);
      }
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        width: '100%',
        maxWidth: 500,
        mx: 'auto',
      }}
    >
      <Typography variant="h6" fontWeight="bold" textAlign="center" mb={3}>
        {editData ? 'Edit Address' : 'Add Delivery Address'}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>

          {/* Name */}
          <TextField
            fullWidth
            size="small"
            name="name"
            label="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          {/* Mobile */}
          <TextField
            fullWidth
            size="small"
            name="mobile"
            label="Mobile Number"
            value={formik.values.mobile}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 10);
              formik.setFieldValue('mobile', val);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
            inputProps={{ maxLength: 10 }}
          />

          {/* Pincode */}
          <TextField
            fullWidth
            size="small"
            name="pinCode"
            label="Pincode"
            value={formik.values.pinCode}
            onChange={handlePincodeChange}
            onBlur={formik.handleBlur}
            error={
              (formik.touched.pinCode && Boolean(formik.errors.pinCode)) ||
              Boolean(pinError)
            }
            helperText={
              pinError ||
              (formik.touched.pinCode && formik.errors.pinCode)
            }
            inputProps={{ maxLength: 6 }}
            InputProps={{
              endAdornment: loadingPin ? (
                <CircularProgress size={18} />
              ) : formik.values.city ? (
                <CheckCircleIcon sx={{ color: '#10b981', fontSize: 20 }} />
              ) : null,
            }}
          />

          {/* Address */}
          <TextField
            fullWidth
            size="small"
            multiline
            rows={2}
            name="address"
            label="Address (House No, Building, Street)"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />

          {/* Locality */}
          <TextField
            fullWidth
            size="small"
            name="locality"
            label="Locality / Area"
            value={formik.values.locality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.locality && Boolean(formik.errors.locality)}
            helperText={formik.touched.locality && formik.errors.locality}
          />

          {/* City + State */}
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              size="small"
              name="city"
              label="City / District"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              InputProps={{ readOnly: true }}
              sx={{ bgcolor: '#f9fafb' }}
            />
            <TextField
              fullWidth
              size="small"
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
              InputProps={{ readOnly: true }}
              sx={{ bgcolor: '#f9fafb' }}
            />
          </Box>

          {/* Save */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: '12px',
              fontWeight: 'bold',
              borderRadius: 2,
              mt: 1,
              bgcolor: '#4f46e5',
              '&:hover': { bgcolor: '#4338ca' },
            }}
          >
            {editData ? 'Update Address' : 'Save Address'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AddressForm;