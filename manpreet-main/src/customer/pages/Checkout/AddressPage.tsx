// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Button, FormControlLabel, Modal, Radio, RadioGroup } from '@mui/material';
// import AddressForm from './AddresssForm';
// import AddressCard from './AddressCard';
// import PricingCard from '../Cart/PricingCard';
// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// import { fetchAddresses } from '../../../Redux Toolkit/Customer/addressSlice';
// import { createOrder } from '../../../Redux Toolkit/Customer/OrderSlice';

// const style = {
//   position: 'absolute' as const,
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 450,
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
// };

// const paymentGatewayList = [
//   {
//     value: 'RAZORPAY',
//     name: 'Online',
//     label: 'Razorpay',
//     image: "/online.png"
//   },
//   {
//     value: 'COD',
//     name: 'COD',
//     label: 'Cash on Delivery',
//     image: "/cashon.png"
//   },
// ];

// const AddressPage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { addresses } = useAppSelector((store) => store.address);

//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [paymentGateway, setPaymentGateway] = useState(paymentGatewayList[0].value);
//   const [open, setOpen] = useState(false);
//   const [isServiceable, setIsServiceable] = useState<boolean | null>(null);
//   const [checkingServiceability, setCheckingServiceability] = useState(false);

//   useEffect(() => {
//     const jwt = localStorage.getItem('jwt') || '';
//     if (jwt) dispatch(fetchAddresses(jwt));
//   }, [dispatch]);

//   const navigate = useNavigate();

//   const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const index = Number(event.target.value);
//     setSelectedIndex(index);
//     checkPincode(addresses[index].pinCode);
//   };

//   const checkPincode = async (pincode: string) => {
//     if (!pincode) return;
//     setCheckingServiceability(true);
//     try {
//       const { api } = await import('../../../Config/Api');
//       const response = await api.get(`/api/delivery-partners/check-serviceability/${pincode}`);
//       setIsServiceable(response.data.isServiceable);
//     } catch (error) {
//       console.error("Serviceability check failed:", error);
//       setIsServiceable(true);
//     } finally {
//       setCheckingServiceability(false);
//     }
//   };

//   useEffect(() => {
//     if (addresses.length > 0) {
//       checkPincode(addresses[selectedIndex].pinCode);
//     }
//   }, [addresses]);

//   const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPaymentGateway(event.target.value);
//   };

//   const handlePlaceOrder = async () => {
//     if (!addresses || addresses.length === 0) {
//       alert("Please add/select a delivery address.");
//       return;
//     }

//     try {
//       const jwt = localStorage.getItem("jwt") || "";

//       const res = await dispatch(
//         createOrder({
//           address: addresses[selectedIndex],
//           paymentGateway,
//           jwt,
//         })
//       ).unwrap();

//       if (res?.payment_link_url) {
//         window.location.href = res.payment_link_url;
//       } else {
//         const orderId = res?.orderId || res?.parentOrderId || res?.paymentOrderId;
//         if (orderId) {
//           navigate(`/payment-success/${orderId}`);
//         }
//       }

//     } catch (error) {
//       console.error("Order failed:", error);
//     }
//   };

//   return (
//     <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
//       <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">

//         <div className="col-span-2 space-y-5">
//           <div className="flex justify-between items-center">
//             <span className="font-semibold">Select Delivery Address</span>
//             <Button onClick={() => setOpen(true)} variant="outlined">
//               Add New Address
//             </Button>
//           </div>

//           <div className="text-xs font-medium space-y-3">
//             {addresses.length ? (
//               <RadioGroup value={selectedIndex} onChange={handleAddressChange}>
//                 {addresses.map((addr, index) => (
//                   <AddressCard
//                     key={addr._id}
//                     value={index}
//                     selectedValue={selectedIndex}
//                     handleChange={handleAddressChange}
//                     item={addr}
//                   />
//                 ))}
//               </RadioGroup>
//             ) : (
//               <p>No saved addresses found.</p>
//             )}
//           </div>
//         </div>

//         <div className="col-span-1 text-sm space-y-3">
//           <section className="space-y-3 border p-5 rounded-md">
//             <h1 className="text-primary-color font-medium pb-2 text-center">
//               Choose Payment Gateway
//             </h1>

//             <RadioGroup
//               row
//               value={paymentGateway}
//               onChange={handlePaymentChange}
//               className="flex justify-between pr-0"
//             >
//               {paymentGatewayList.map((item) => (
//                 <FormControlLabel
//                   key={item.value}
//                   value={item.value}
//                   control={<Radio />}
//                   label={
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-80 h-16 object-contain"
//                       />
//                     </div>
//                   }
//                   className={`border w-[45%] flex justify-center rounded-md pr-2 ${paymentGateway === item.value ? 'border-primary-color' : ''
//                     }`}
//                 />
//               ))}
//             </RadioGroup>
//           </section>

//           <section className="border rounded-md">
//             <PricingCard />
//             <div className="p-5 space-y-2">
//               {isServiceable === false && (
//                 <p className="text-red-500 text-xs text-center font-medium">
//                   Sorry, we don't deliver to this pincode yet.
//                 </p>
//               )}
//               <Button
//                 onClick={handlePlaceOrder}
//                 sx={{ py: '11px' }}
//                 variant="contained"
//                 fullWidth
//                 disabled={isServiceable === false || checkingServiceability}
//               >
//                 {checkingServiceability ? 'Checking...' : 'Place Order'}
//               </Button>
//             </div>
//           </section>
//         </div>
//       </div>

//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={style}>
//           <AddressForm handleClose={() => setOpen(false)} />
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default AddressPage;






// // src/customer/pages/Checkout/AddressPage.tsx

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box, Button, Modal, RadioGroup, Divider, CircularProgress, Chip
// } from '@mui/material';
// import PaymentIcon from '@mui/icons-material/Payment';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import AddressForm from './AddresssForm';
// import AddressCard from './AddressCard';
// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// import { fetchAddresses } from '../../../Redux Toolkit/Customer/addressSlice';
// import { createOrder } from '../../../Redux Toolkit/Customer/OrderSlice';
// import { sumCartItemMrpPrice, sumCartItemSellingPrice } from '../../../util/cartCalculator';

// const style = {
//   position: 'absolute' as const,
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 450,
//   maxHeight: '90vh',
//   overflowY: 'auto',
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 2,
//   borderRadius: 3,
// };

// const AddressPage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { addresses } = useAppSelector((store: any) => store.address);
//   const { cart } = useAppSelector((store: any) => store);

//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [paymentGateway, setPaymentGateway] = useState<'RAZORPAY' | 'COD'>('RAZORPAY');
//   const [open, setOpen] = useState(false);
//   const [isServiceable, setIsServiceable] = useState<boolean | null>(null);
//   const [checkingServiceability, setCheckingServiceability] = useState(false);
//   const [placingOrder, setPlacingOrder] = useState(false);

//   useEffect(() => {
//     const jwt = localStorage.getItem('jwt') || '';
//     if (jwt) dispatch(fetchAddresses(jwt) as any);
//   }, [dispatch]);

//   const navigate = useNavigate();

//   const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const index = Number(event.target.value);
//     setSelectedIndex(index);
//     checkPincode(addresses[index].pinCode);
//   };

//   const checkPincode = async (pincode: string) => {
//     if (!pincode) return;
//     setCheckingServiceability(true);
//     try {
//       const { api } = await import('../../../Config/Api');
//       const response = await api.get(`/api/delivery-partners/check-serviceability/${pincode}`);
//       setIsServiceable(response.data.isServiceable);
//     } catch (error) {
//       console.error("Serviceability check failed:", error);
//       setIsServiceable(true);
//     } finally {
//       setCheckingServiceability(false);
//     }
//   };

//   useEffect(() => {
//     if (addresses.length > 0) {
//       checkPincode(addresses[selectedIndex].pinCode);
//     }
//   }, [addresses]);

//   // ═══════════════════════════════════════════════
//   // 💰 PRICE CALCULATIONS
//   // ═══════════════════════════════════════════════
//   const cartItems = cart.cart?.cartItems || [];
//   const mrpTotal = sumCartItemMrpPrice(cartItems);
//   const sellingTotal = sumCartItemSellingPrice(cartItems);
//   const discount = mrpTotal - sellingTotal;
//   const codFee = paymentGateway === 'COD' ? 40 : 0;
//   const finalTotal = sellingTotal + codFee;

//   const handlePlaceOrder = async () => {
//     if (!addresses || addresses.length === 0) {
//       alert("Please add/select a delivery address.");
//       return;
//     }

//     if (isServiceable === false) {
//       alert("This pincode is not serviceable.");
//       return;
//     }

//     setPlacingOrder(true);
//     try {
//       const jwt = localStorage.getItem("jwt") || "";

//       const res = await dispatch(
//         createOrder({
//           address: addresses[selectedIndex],
//           paymentGateway,
//           jwt,
//         }) as any
//       ).unwrap();

//       if (res?.payment_link_url) {
//         window.location.href = res.payment_link_url;
//       } else {
//         const orderId = res?.orderId || res?.parentOrderId || res?.paymentOrderId;
//         if (orderId) {
//           navigate(`/payment-success/${orderId}`);
//         }
//       }
//     } catch (error) {
//       console.error("Order failed:", error);
//       alert("Order failed. Please try again.");
//     } finally {
//       setPlacingOrder(false);
//     }
//   };

//   return (
//     <div className="pt-10 px-5 sm:px-10 md:px-20 lg:px-40 min-h-screen bg-gray-50">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* ═══════════════════════════════════════════ */}
//         {/* LEFT: ADDRESS */}
//         {/* ═══════════════════════════════════════════ */}
//         <div className="lg:col-span-2 space-y-4">
//           <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
//                 <span className="h-1 w-6 bg-indigo-500 rounded-full" />
//                 Select Delivery Address
//               </h2>
//               <Button
//                 onClick={() => setOpen(true)}
//                 variant="outlined"
//                 size="small"
//                 sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: 2 }}
//               >
//                 + Add New
//               </Button>
//             </div>

//             <div className="space-y-3">
//               {addresses.length ? (
//                 <RadioGroup value={selectedIndex} onChange={handleAddressChange}>
//                   {addresses.map((addr: any, index: number) => (
//                     <AddressCard
//                       key={addr._id}
//                       value={index}
//                       selectedValue={selectedIndex}
//                       handleChange={handleAddressChange}
//                       item={addr}
//                     />
//                   ))}
//                 </RadioGroup>
//               ) : (
//                 <div className="text-center py-8 bg-gray-50 rounded-xl">
//                   <p className="text-gray-500 font-medium">No saved addresses</p>
//                   <p className="text-xs text-gray-400 mt-1">Click "+ Add New" to add one</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ═══════════════════════════════════════════ */}
//         {/* RIGHT: PAYMENT + PRICING */}
//         {/* ═══════════════════════════════════════════ */}
//         <div className="lg:col-span-1 space-y-4">

//           {/* ═══ PAYMENT METHOD ═══ */}
//           <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
//             <h3 className="font-bold text-base text-gray-800 mb-4 flex items-center gap-2">
//               <PaymentIcon sx={{ color: '#4f46e5', fontSize: 20 }} />
//               Payment Method
//             </h3>

//             <div className="space-y-3">
//               {/* Online Payment */}
//               <button
//                 onClick={() => setPaymentGateway('RAZORPAY')}
//                 className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
//                   paymentGateway === 'RAZORPAY'
//                     ? 'border-indigo-500 bg-indigo-50 shadow-md'
//                     : 'border-gray-200 hover:border-indigo-300 bg-white'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className={`p-2 rounded-lg ${paymentGateway === 'RAZORPAY' ? 'bg-indigo-500' : 'bg-gray-200'}`}>
//                     <PaymentIcon sx={{ color: 'white', fontSize: 20 }} />
//                   </div>
//                   <div className="text-left">
//                     <p className="font-bold text-sm text-gray-800">Online Payment</p>
//                     <p className="text-xs text-gray-500">UPI, Card, Net Banking</p>
//                   </div>
//                 </div>
//                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                   paymentGateway === 'RAZORPAY' ? 'border-indigo-500' : 'border-gray-300'
//                 }`}>
//                   {paymentGateway === 'RAZORPAY' && (
//                     <div className="w-3 h-3 rounded-full bg-indigo-500" />
//                   )}
//                 </div>
//               </button>

//               {/* Cash on Delivery */}
//               <button
//                 onClick={() => setPaymentGateway('COD')}
//                 className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
//                   paymentGateway === 'COD'
//                     ? 'border-orange-500 bg-orange-50 shadow-md'
//                     : 'border-gray-200 hover:border-orange-300 bg-white'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className={`p-2 rounded-lg ${paymentGateway === 'COD' ? 'bg-orange-500' : 'bg-gray-200'}`}>
//                     <LocalShippingIcon sx={{ color: 'white', fontSize: 20 }} />
//                   </div>
//                   <div className="text-left">
//                     <p className="font-bold text-sm text-gray-800">Cash on Delivery</p>
//                     <p className="text-xs text-gray-500">
//                       Pay when you receive
//                       <span className="ml-1 font-bold text-orange-600">+ ₹40 fee</span>
//                     </p>
//                   </div>
//                 </div>
//                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                   paymentGateway === 'COD' ? 'border-orange-500' : 'border-gray-300'
//                 }`}>
//                   {paymentGateway === 'COD' && (
//                     <div className="w-3 h-3 rounded-full bg-orange-500" />
//                   )}
//                 </div>
//               </button>
//             </div>

//             {/* COD Warning */}
//             {paymentGateway === 'COD' && (
//               <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
//                 <span className="text-orange-500 text-lg">⚠️</span>
//                 <p className="text-xs text-orange-700 font-semibold">
//                   ₹40 platform fee will be added for Cash on Delivery orders.
//                 </p>
//               </div>
//             )}
//           </section>

//           {/* ═══ PRICE DETAILS ═══ */}
//           <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3">
//               <h3 className="text-white font-extrabold text-sm tracking-wider">
//                 📋 PRICE DETAILS
//               </h3>
//             </div>

//             <div className="p-5 space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-700 font-bold">
//                   Price ({cartItems.length} items)
//                 </span>
//                 <span className="text-base font-extrabold text-gray-900">₹{mrpTotal}</span>
//               </div>

//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-700 font-bold">Discount</span>
//                 <span className="text-base font-extrabold text-green-600">− ₹{discount}</span>
//               </div>

//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-700 font-bold">Shipping</span>
//                 <span className="text-base font-extrabold text-green-600">FREE</span>
//               </div>

//               {/* COD Fee */}
//               {paymentGateway === 'COD' && (
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-orange-700 font-bold">
//                     COD Platform Fee
//                   </span>
//                   <span className="text-base font-extrabold text-orange-600">+ ₹40</span>
//                 </div>
//               )}
//             </div>

//             <Divider sx={{ borderStyle: 'dashed' }} />

//             <div className="px-5 py-4 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50">
//               <span className="text-base font-extrabold text-gray-900">
//                 Total Amount
//               </span>
//               <span className="text-2xl font-extrabold text-indigo-700">
//                 ₹{finalTotal}
//               </span>
//             </div>
//           </section>

//           {/* ═══ PLACE ORDER ═══ */}
//           <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
//             {isServiceable === false && (
//               <p className="text-red-500 text-xs text-center font-bold mb-2">
//                 ❌ Sorry, we don't deliver to this pincode.
//               </p>
//             )}

//             <Button
//               onClick={handlePlaceOrder}
//               variant="contained"
//               fullWidth
//               disabled={isServiceable === false || checkingServiceability || placingOrder}
//               startIcon={placingOrder ? <CircularProgress size={18} color="inherit" /> : null}
//               sx={{
//                 py: '12px',
//                 fontWeight: 'bold',
//                 textTransform: 'none',
//                 borderRadius: 2,
//                 bgcolor: '#4f46e5',
//                 '&:hover': { bgcolor: '#4338ca' },
//               }}
//             >
//               {placingOrder
//                 ? 'Placing Order...'
//                 : checkingServiceability
//                 ? 'Checking...'
//                 : `Place Order • ₹${finalTotal}`}
//             </Button>

//             <p className="text-center text-xs text-gray-400 mt-2 font-semibold">
//               🔒 100% Safe & Secure Payments
//             </p>
//           </div>

//         </div>
//       </div>

//       {/* Modal */}
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={style}>
//           <AddressForm handleClose={() => setOpen(false)} />
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default AddressPage;







// // src/customer/pages/Checkout/AddressPage.tsx

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box, Button, Modal, RadioGroup, Divider, CircularProgress
// } from '@mui/material';
// import PaymentIcon from '@mui/icons-material/Payment';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import AddressForm from './AddresssForm';
// import AddressCard from './AddressCard';
// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// import { fetchAddresses } from '../../../Redux Toolkit/Customer/addressSlice';
// import { createOrder } from '../../../Redux Toolkit/Customer/OrderSlice';
// import { sumCartItemMrpPrice, sumCartItemSellingPrice } from '../../../util/cartCalculator';
// import { fetchDeliverySettings } from '../../../Redux Toolkit/Admin/deliverySettingsSlice';

// const style = {
//   position: 'absolute' as const,
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 450,
//   maxHeight: '90vh',
//   overflowY: 'auto',
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 2,
//   borderRadius: 3,
// };

// const AddressPage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { addresses } = useAppSelector((store: any) => store.address);
//   const { cart } = useAppSelector((store: any) => store);
//   const { settings: deliverySettings } = useAppSelector(
//     (store: any) => store.deliverySettings || {}
//   );

//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [paymentGateway, setPaymentGateway] = useState<'RAZORPAY' | 'COD'>('RAZORPAY');
//   const [open, setOpen] = useState(false);
//   const [isServiceable, setIsServiceable] = useState<boolean | null>(null);
//   const [checkingServiceability, setCheckingServiceability] = useState(false);
//   const [placingOrder, setPlacingOrder] = useState(false);

//   /* ─────────────── FETCH ADDRESSES ─────────────── */
//   useEffect(() => {
//     const jwt = localStorage.getItem('jwt') || '';
//     if (jwt) dispatch(fetchAddresses(jwt) as any);
//   }, [dispatch]);

//   /* ─────────────── FETCH DELIVERY SETTINGS ─────────────── */
//   useEffect(() => {
//     dispatch(fetchDeliverySettings() as any);
//   }, [dispatch]);

//   const navigate = useNavigate();

//   const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const index = Number(event.target.value);
//     setSelectedIndex(index);
//     checkPincode(addresses[index].pinCode);
//   };

//   const checkPincode = async (pincode: string) => {
//     if (!pincode) return;
//     setCheckingServiceability(true);
//     try {
//       const { api } = await import('../../../Config/Api');
//       const response = await api.get(
//         `/api/delivery-partners/check-serviceability/${pincode}`
//       );
//       setIsServiceable(response.data.isServiceable);
//     } catch (error) {
//       console.error('Serviceability check failed:', error);
//       setIsServiceable(true);
//     } finally {
//       setCheckingServiceability(false);
//     }
//   };

//   useEffect(() => {
//     if (addresses.length > 0) {
//       checkPincode(addresses[selectedIndex].pinCode);
//     }
//   }, [addresses]);

//   /* ═══════════════════════════════════════════════
//      💰 DYNAMIC PRICE CALCULATIONS
//      ═══════════════════════════════════════════════ */
//   const cartItems = cart.cart?.cartItems || [];
//   const mrpTotal = sumCartItemMrpPrice(cartItems);
//   const sellingTotal = sumCartItemSellingPrice(cartItems);
//   const discount = mrpTotal - sellingTotal;

//   // 🔥 Dynamic values from admin settings
//   const freeDeliveryThreshold = deliverySettings?.freeDeliveryThreshold ?? 1000;
//   const baseDeliveryFee = deliverySettings?.deliveryFee ?? 50;
//   const baseCodFee = deliverySettings?.codFee ?? 20;
//   const codMaxPrice = deliverySettings?.codMaxPrice ?? 10000;
//   const codEnabled = deliverySettings?.codEnabled ?? true;

//   // Delivery fee: free if above threshold
//   const deliveryFee =
//     sellingTotal >= freeDeliveryThreshold ? 0 : baseDeliveryFee;

//   // 🔥 COD allowed check
//   const codAllowed = codEnabled && sellingTotal <= codMaxPrice;

//   // COD fee only when COD selected AND allowed
//   const codFee =
//     paymentGateway === 'COD' && codAllowed ? baseCodFee : 0;

//   const finalTotal = sellingTotal + deliveryFee + codFee;

//   // 🔥 Auto-switch to prepaid if COD becomes unavailable
//   useEffect(() => {
//     if (!codAllowed && paymentGateway === 'COD') {
//       setPaymentGateway('RAZORPAY');
//     }
//   }, [codAllowed, paymentGateway]);

//   /* ─────────────── PLACE ORDER ─────────────── */
//   const handlePlaceOrder = async () => {
//     if (!addresses || addresses.length === 0) {
//       alert('Please add/select a delivery address.');
//       return;
//     }

//     if (isServiceable === false) {
//       alert('This pincode is not serviceable.');
//       return;
//     }

//     // 🔥 Security check (frontend side)
//     if (paymentGateway === 'COD' && !codAllowed) {
//       alert('COD not available for this order amount. Please pay online.');
//       return;
//     }

//     setPlacingOrder(true);
//     try {
//       const jwt = localStorage.getItem('jwt') || '';

//       const res = await dispatch(
//         createOrder({
//           address: addresses[selectedIndex],
//           paymentGateway,
//           jwt,
//         }) as any
//       ).unwrap();

//       if (res?.payment_link_url) {
//         window.location.href = res.payment_link_url;
//       } else {
//         const orderId =
//           res?.orderId || res?.parentOrderId || res?.paymentOrderId;
//         if (orderId) {
//           navigate(`/payment-success/${orderId}`);
//         }
//       }
//     } catch (error) {
//       console.error('Order failed:', error);
//       alert('Order failed. Please try again.');
//     } finally {
//       setPlacingOrder(false);
//     }
//   };

//   return (
//     <div className="pt-10 px-5 sm:px-10 md:px-20 lg:px-40 min-h-screen bg-gray-50">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* ═══════════════════════════════════════════ */}
//         {/* LEFT: ADDRESS */}
//         {/* ═══════════════════════════════════════════ */}
//         <div className="lg:col-span-2 space-y-4">
//           <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
//                 <span className="h-1 w-6 bg-indigo-500 rounded-full" />
//                 Select Delivery Address
//               </h2>
//               <Button
//                 onClick={() => setOpen(true)}
//                 variant="outlined"
//                 size="small"
//                 sx={{
//                   textTransform: 'none',
//                   fontWeight: 'bold',
//                   borderRadius: 2,
//                 }}
//               >
//                 + Add New
//               </Button>
//             </div>

//             <div className="space-y-3">
//               {addresses.length ? (
//                 <RadioGroup value={selectedIndex} onChange={handleAddressChange}>
//                   {addresses.map((addr: any, index: number) => (
//                     <AddressCard
//                       key={addr._id}
//                       value={index}
//                       selectedValue={selectedIndex}
//                       handleChange={handleAddressChange}
//                       item={addr}
//                     />
//                   ))}
//                 </RadioGroup>
//               ) : (
//                 <div className="text-center py-8 bg-gray-50 rounded-xl">
//                   <p className="text-gray-500 font-medium">No saved addresses</p>
//                   <p className="text-xs text-gray-400 mt-1">
//                     Click "+ Add New" to add one
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ═══════════════════════════════════════════ */}
//         {/* RIGHT: PAYMENT + PRICING */}
//         {/* ═══════════════════════════════════════════ */}
//         <div className="lg:col-span-1 space-y-4">

//           {/* ═══ PAYMENT METHOD ═══ */}
//           <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
//             <h3 className="font-bold text-base text-gray-800 mb-4 flex items-center gap-2">
//               <PaymentIcon sx={{ color: '#4f46e5', fontSize: 20 }} />
//               Payment Method
//             </h3>

//             <div className="space-y-3">
//               {/* Online Payment */}
//               <button
//                 onClick={() => setPaymentGateway('RAZORPAY')}
//                 className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
//                   paymentGateway === 'RAZORPAY'
//                     ? 'border-indigo-500 bg-indigo-50 shadow-md'
//                     : 'border-gray-200 hover:border-indigo-300 bg-white'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`p-2 rounded-lg ${
//                       paymentGateway === 'RAZORPAY'
//                         ? 'bg-indigo-500'
//                         : 'bg-gray-200'
//                     }`}
//                   >
//                     <PaymentIcon sx={{ color: 'white', fontSize: 20 }} />
//                   </div>
//                   <div className="text-left">
//                     <p className="font-bold text-sm text-gray-800">
//                       Online Payment
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       UPI, Card, Net Banking
//                     </p>
//                   </div>
//                 </div>
//                 <div
//                   className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                     paymentGateway === 'RAZORPAY'
//                       ? 'border-indigo-500'
//                       : 'border-gray-300'
//                   }`}
//                 >
//                   {paymentGateway === 'RAZORPAY' && (
//                     <div className="w-3 h-3 rounded-full bg-indigo-500" />
//                   )}
//                 </div>
//               </button>

//               {/* Cash on Delivery */}
//               <button
//                 onClick={() => codAllowed && setPaymentGateway('COD')}
//                 disabled={!codAllowed}
//                 className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
//                   !codAllowed
//                     ? 'border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed'
//                     : paymentGateway === 'COD'
//                     ? 'border-orange-500 bg-orange-50 shadow-md'
//                     : 'border-gray-200 hover:border-orange-300 bg-white'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`p-2 rounded-lg ${
//                       !codAllowed
//                         ? 'bg-gray-400'
//                         : paymentGateway === 'COD'
//                         ? 'bg-orange-500'
//                         : 'bg-gray-200'
//                     }`}
//                   >
//                     <LocalShippingIcon sx={{ color: 'white', fontSize: 20 }} />
//                   </div>
//                   <div className="text-left">
//                     <p className="font-bold text-sm text-gray-800 flex items-center gap-2">
//                       Cash on Delivery
//                       {!codAllowed && (
//                         <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-600 font-bold">
//                           NOT AVAILABLE
//                         </span>
//                       )}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {codAllowed ? (
//                         <>
//                           Pay when you receive
//                           {baseCodFee > 0 && (
//                             <span className="ml-1 font-bold text-orange-600">
//                               + ₹{baseCodFee} fee
//                             </span>
//                           )}
//                         </>
//                       ) : (
//                         <>
//                           {!codEnabled
//                             ? 'COD is disabled'
//                             : `Max order ₹${codMaxPrice} allowed`}
//                         </>
//                       )}
//                     </p>
//                   </div>
//                 </div>
//                 <div
//                   className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                     !codAllowed
//                       ? 'border-gray-300'
//                       : paymentGateway === 'COD'
//                       ? 'border-orange-500'
//                       : 'border-gray-300'
//                   }`}
//                 >
//                   {paymentGateway === 'COD' && codAllowed && (
//                     <div className="w-3 h-3 rounded-full bg-orange-500" />
//                   )}
//                 </div>
//               </button>
//             </div>

//             {/* 🔥 COD NOT AVAILABLE Warning */}
//             {!codAllowed && (
//               <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
//                 <span className="text-red-500 text-lg">🚫</span>
//                 <p className="text-xs text-red-700 font-semibold">
//                   {!codEnabled
//                     ? 'Cash on Delivery is currently disabled. Please use online payment.'
//                     : `Cash on Delivery is not available for orders above ₹${codMaxPrice}. Please pay online.`}
//                 </p>
//               </div>
//             )}

//             {/* COD Fee Info */}
//             {paymentGateway === 'COD' && codAllowed && baseCodFee > 0 && (
//               <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
//                 <span className="text-orange-500 text-lg">⚠️</span>
//                 <p className="text-xs text-orange-700 font-semibold">
//                   ₹{baseCodFee} platform fee will be added for Cash on Delivery
//                   orders.
//                 </p>
//               </div>
//             )}
//           </section>

//           {/* ═══ PRICE DETAILS ═══ */}
//           <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3">
//               <h3 className="text-white font-extrabold text-sm tracking-wider">
//                 📋 PRICE DETAILS
//               </h3>
//             </div>

//             <div className="p-5 space-y-3">
//               {/* MRP Price */}
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-700 font-bold">
//                   Price ({cartItems.length} items)
//                 </span>
//                 <span className="text-base font-extrabold text-gray-900">
//                   ₹{mrpTotal}
//                 </span>
//               </div>

//               {/* Discount */}
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-700 font-bold">Discount</span>
//                 <span className="text-base font-extrabold text-green-600">
//                   − ₹{discount}
//                 </span>
//               </div>

//               {/* 🆕 SUBTOTAL (Item Price after discount) */}
//               <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-300">
//                 <span className="text-sm text-gray-800 font-bold">
//                   Subtotal (Item Price)
//                 </span>
//                 <span className="text-base font-extrabold text-gray-900">
//                   ₹{sellingTotal}
//                 </span>
//               </div>

//               {/* Delivery Fee */}
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-700 font-bold">
//                   Delivery Fee
//                 </span>
//                 {deliveryFee === 0 ? (
//                   <span className="text-base font-extrabold text-green-600">
//                     FREE
//                     <span className="ml-1 text-[10px] text-gray-500 font-semibold">
//                       (above ₹{freeDeliveryThreshold})
//                     </span>
//                   </span>
//                 ) : (
//                   <span className="text-base font-extrabold text-gray-900">
//                     + ₹{deliveryFee}
//                   </span>
//                 )}
//               </div>

//               {/* COD Fee */}
//               {paymentGateway === 'COD' && codAllowed && codFee > 0 && (
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-orange-700 font-bold">
//                     COD Platform Fee
//                   </span>
//                   <span className="text-base font-extrabold text-orange-600">
//                     + ₹{codFee}
//                   </span>
//                 </div>
//               )}
//             </div>

//             <Divider sx={{ borderStyle: 'dashed' }} />

//             <div className="px-5 py-4 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50">
//               <span className="text-base font-extrabold text-gray-900">
//                 Total Amount
//               </span>
//               <span className="text-2xl font-extrabold text-indigo-700">
//                 ₹{finalTotal}
//               </span>
//             </div>
//           </section>

//           {/* ═══ PLACE ORDER ═══ */}
//           <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
//             {isServiceable === false && (
//               <p className="text-red-500 text-xs text-center font-bold mb-2">
//                 ❌ Sorry, we don't deliver to this pincode.
//               </p>
//             )}

//             <Button
//               onClick={handlePlaceOrder}
//               variant="contained"
//               fullWidth
//               disabled={
//                 isServiceable === false ||
//                 checkingServiceability ||
//                 placingOrder ||
//                 (paymentGateway === 'COD' && !codAllowed)
//               }
//               startIcon={
//                 placingOrder ? (
//                   <CircularProgress size={18} color="inherit" />
//                 ) : null
//               }
//               sx={{
//                 py: '12px',
//                 fontWeight: 'bold',
//                 textTransform: 'none',
//                 borderRadius: 2,
//                 bgcolor: '#4f46e5',
//                 '&:hover': { bgcolor: '#4338ca' },
//               }}
//             >
//               {placingOrder
//                 ? 'Placing Order...'
//                 : checkingServiceability
//                 ? 'Checking...'
//                 : `Place Order • ₹${finalTotal}`}
//             </Button>

//             <p className="text-center text-xs text-gray-400 mt-2 font-semibold">
//               🔒 100% Safe & Secure Payments
//             </p>
//           </div>

//         </div>
//       </div>

//       {/* Modal */}
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={style}>
//           <AddressForm handleClose={() => setOpen(false)} />
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default AddressPage;























// src/customer/pages/Checkout/AddressPage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Modal, RadioGroup, Divider, CircularProgress
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddressForm from './AddresssForm';
import AddressCard from './AddressCard';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchAddresses } from '../../../Redux Toolkit/Customer/addressSlice';
import { createOrder } from '../../../Redux Toolkit/Customer/OrderSlice';
import { sumCartItemMrpPrice, sumCartItemSellingPrice } from '../../../util/cartCalculator';
import { fetchDeliverySettings } from '../../../Redux Toolkit/Admin/deliverySettingsSlice';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 3,
};

const AddressPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { addresses } = useAppSelector((store: any) => store.address);
  const { cart } = useAppSelector((store: any) => store);
  const { settings: deliverySettings } = useAppSelector(
    (store: any) => store.deliverySettings || {}
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [paymentGateway, setPaymentGateway] = useState<'RAZORPAY' | 'COD'>('RAZORPAY');
  const [open, setOpen] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  /* ─────────────── FETCH ADDRESSES ─────────────── */
  useEffect(() => {
    const jwt = localStorage.getItem('jwt') || '';
    if (jwt) dispatch(fetchAddresses(jwt) as any);
  }, [dispatch]);

  /* ─────────────── FETCH DELIVERY SETTINGS ─────────────── */
  useEffect(() => {
    dispatch(fetchDeliverySettings() as any);
  }, [dispatch]);

  const navigate = useNavigate();

  /* ─────────────── ADDRESS CHANGE ─────────────── */
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = Number(event.target.value);
    setSelectedIndex(index);
    // ❌ pincode check हटा दिया — कोई serviceability verification नहीं
  };

  /* ═══════════════════════════════════════════════
     💰 DYNAMIC PRICE CALCULATIONS
     ═══════════════════════════════════════════════ */
  const cartItems = cart.cart?.cartItems || [];
  const mrpTotal = sumCartItemMrpPrice(cartItems);
  const sellingTotal = sumCartItemSellingPrice(cartItems);
  const discount = mrpTotal - sellingTotal;

  const freeDeliveryThreshold = deliverySettings?.freeDeliveryThreshold ?? 1000;
  const baseDeliveryFee = deliverySettings?.deliveryFee ?? 50;
  const baseCodFee = deliverySettings?.codFee ?? 20;
  const codMaxPrice = deliverySettings?.codMaxPrice ?? 10000;
  const codEnabled = deliverySettings?.codEnabled ?? true;

  const deliveryFee =
    sellingTotal >= freeDeliveryThreshold ? 0 : baseDeliveryFee;

  const codAllowed = codEnabled && sellingTotal <= codMaxPrice;

  const codFee =
    paymentGateway === 'COD' && codAllowed ? baseCodFee : 0;

  const finalTotal = sellingTotal + deliveryFee + codFee;

  // Auto-switch to prepaid if COD becomes unavailable
  useEffect(() => {
    if (!codAllowed && paymentGateway === 'COD') {
      setPaymentGateway('RAZORPAY');
    }
  }, [codAllowed, paymentGateway]);

  /* ─────────────── PLACE ORDER ─────────────── */
  const handlePlaceOrder = async () => {
    if (!addresses || addresses.length === 0) {
      alert('Please add/select a delivery address.');
      return;
    }

    // ❌ serviceability check हटा दिया

    if (paymentGateway === 'COD' && !codAllowed) {
      alert('COD not available for this order amount. Please pay online.');
      return;
    }

    setPlacingOrder(true);
    try {
      const jwt = localStorage.getItem('jwt') || '';

      const res = await dispatch(
        createOrder({
          address: addresses[selectedIndex],
          paymentGateway,
          jwt,
        }) as any
      ).unwrap();

      if (res?.payment_link_url) {
        window.location.href = res.payment_link_url;
      } else {
        const orderId =
          res?.orderId || res?.parentOrderId || res?.paymentOrderId;
        if (orderId) {
          navigate(`/payment-success/${orderId}`);
        }
      }
    } catch (error) {
      console.error('Order failed:', error);
      alert('Order failed. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-20 lg:px-40 min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ═══════════════════════════════════════════ */}
        {/* LEFT: ADDRESS */}
        {/* ═══════════════════════════════════════════ */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span className="h-1 w-6 bg-indigo-500 rounded-full" />
                Select Delivery Address
              </h2>
              <Button
                onClick={() => setOpen(true)}
                variant="outlined"
                size="small"
                sx={{
                  textTransform: 'none',
                  fontWeight: 'bold',
                  borderRadius: 2,
                }}
              >
                + Add New
              </Button>
            </div>

            <div className="space-y-3">
              {addresses.length ? (
                <RadioGroup value={selectedIndex} onChange={handleAddressChange}>
                  {addresses.map((addr: any, index: number) => (
                    <AddressCard
                      key={addr._id}
                      value={index}
                      selectedValue={selectedIndex}
                      handleChange={handleAddressChange}
                      item={addr}
                    />
                  ))}
                </RadioGroup>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-xl">
                  <p className="text-gray-500 font-medium">No saved addresses</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Click "+ Add New" to add one
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* RIGHT: PAYMENT + PRICING */}
        {/* ═══════════════════════════════════════════ */}
        <div className="lg:col-span-1 space-y-4">

          {/* ═══ PAYMENT METHOD ═══ */}
          <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-base text-gray-800 mb-4 flex items-center gap-2">
              <PaymentIcon sx={{ color: '#4f46e5', fontSize: 20 }} />
              Payment Method
            </h3>

            <div className="space-y-3">
              {/* Online Payment */}
              <button
                onClick={() => setPaymentGateway('RAZORPAY')}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                  paymentGateway === 'RAZORPAY'
                    ? 'border-indigo-500 bg-indigo-50 shadow-md'
                    : 'border-gray-200 hover:border-indigo-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      paymentGateway === 'RAZORPAY'
                        ? 'bg-indigo-500'
                        : 'bg-gray-200'
                    }`}
                  >
                    <PaymentIcon sx={{ color: 'white', fontSize: 20 }} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-gray-800">
                      Online Payment
                    </p>
                    <p className="text-xs text-gray-500">
                      UPI, Card, Net Banking
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentGateway === 'RAZORPAY'
                      ? 'border-indigo-500'
                      : 'border-gray-300'
                  }`}
                >
                  {paymentGateway === 'RAZORPAY' && (
                    <div className="w-3 h-3 rounded-full bg-indigo-500" />
                  )}
                </div>
              </button>

              {/* Cash on Delivery */}
              <button
                onClick={() => codAllowed && setPaymentGateway('COD')}
                disabled={!codAllowed}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                  !codAllowed
                    ? 'border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed'
                    : paymentGateway === 'COD'
                    ? 'border-orange-500 bg-orange-50 shadow-md'
                    : 'border-gray-200 hover:border-orange-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      !codAllowed
                        ? 'bg-gray-400'
                        : paymentGateway === 'COD'
                        ? 'bg-orange-500'
                        : 'bg-gray-200'
                    }`}
                  >
                    <LocalShippingIcon sx={{ color: 'white', fontSize: 20 }} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-gray-800 flex items-center gap-2">
                      Cash on Delivery
                      {!codAllowed && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-600 font-bold">
                          NOT AVAILABLE
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {codAllowed ? (
                        <>
                          Pay when you receive
                          {baseCodFee > 0 && (
                            <span className="ml-1 font-bold text-orange-600">
                              + ₹{baseCodFee} fee
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          {!codEnabled
                            ? 'COD is disabled'
                            : `Max order ₹${codMaxPrice} allowed`}
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    !codAllowed
                      ? 'border-gray-300'
                      : paymentGateway === 'COD'
                      ? 'border-orange-500'
                      : 'border-gray-300'
                  }`}
                >
                  {paymentGateway === 'COD' && codAllowed && (
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                  )}
                </div>
              </button>
            </div>

            {!codAllowed && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <span className="text-red-500 text-lg">🚫</span>
                <p className="text-xs text-red-700 font-semibold">
                  {!codEnabled
                    ? 'Cash on Delivery is currently disabled. Please use online payment.'
                    : `Cash on Delivery is not available for orders above ₹${codMaxPrice}. Please pay online.`}
                </p>
              </div>
            )}

            {paymentGateway === 'COD' && codAllowed && baseCodFee > 0 && (
              <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
                <span className="text-orange-500 text-lg">⚠️</span>
                <p className="text-xs text-orange-700 font-semibold">
                  ₹{baseCodFee} platform fee will be added for Cash on Delivery
                  orders.
                </p>
              </div>
            )}
          </section>

          {/* ═══ PRICE DETAILS ═══ */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3">
              <h3 className="text-white font-extrabold text-sm tracking-wider">
                📋 PRICE DETAILS
              </h3>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 font-bold">
                  Price ({cartItems.length} items)
                </span>
                <span className="text-base font-extrabold text-gray-900">
                  ₹{mrpTotal}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 font-bold">Discount</span>
                <span className="text-base font-extrabold text-green-600">
                  − ₹{discount}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-300">
                <span className="text-sm text-gray-800 font-bold">
                  Subtotal (Item Price)
                </span>
                <span className="text-base font-extrabold text-gray-900">
                  ₹{sellingTotal}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 font-bold">
                  Delivery Fee
                </span>
                {deliveryFee === 0 ? (
                  <span className="text-base font-extrabold text-green-600">
                    FREE
                    <span className="ml-1 text-[10px] text-gray-500 font-semibold">
                      (above ₹{freeDeliveryThreshold})
                    </span>
                  </span>
                ) : (
                  <span className="text-base font-extrabold text-gray-900">
                    + ₹{deliveryFee}
                  </span>
                )}
              </div>

              {paymentGateway === 'COD' && codAllowed && codFee > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-orange-700 font-bold">
                    COD Platform Fee
                  </span>
                  <span className="text-base font-extrabold text-orange-600">
                    + ₹{codFee}
                  </span>
                </div>
              )}
            </div>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <div className="px-5 py-4 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50">
              <span className="text-base font-extrabold text-gray-900">
                Total Amount
              </span>
              <span className="text-2xl font-extrabold text-indigo-700">
                ₹{finalTotal}
              </span>
            </div>
          </section>

          {/* ═══ PLACE ORDER ═══ */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <Button
              onClick={handlePlaceOrder}
              variant="contained"
              fullWidth
              disabled={
                placingOrder ||
                (paymentGateway === 'COD' && !codAllowed)
              }
              startIcon={
                placingOrder ? (
                  <CircularProgress size={18} color="inherit" />
                ) : null
              }
              sx={{
                py: '12px',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: 2,
                bgcolor: '#4f46e5',
                '&:hover': { bgcolor: '#4338ca' },
              }}
            >
              {placingOrder
                ? 'Placing Order...'
                : `Place Order • ₹${finalTotal}`}
            </Button>

            
          </div>

        </div>
      </div>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <AddressForm handleClose={() => setOpen(false)} />
        </Box>
      </Modal>
    </div>
  );
};

export default AddressPage;
