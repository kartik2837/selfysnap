



// // import { Box, Button, Divider } from '@mui/material';
// // import { useEffect } from 'react';
// // import PaymentsIcon from '@mui/icons-material/Payments';
// // import OrderStepper from './OrderStepper';
// // import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// // import {
// //   cancelOrder,
// //   createReturnRequest,
// //   fetchOrderById,
// //   fetchOrderItemById,
// // } from '../../../Redux Toolkit/Customer/OrderSlice';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import { fixTrackingLink } from '../../../util/trackingLinkFixer';

// // const OrderDetails = () => {
// //   const dispatch = useAppDispatch();
// //   const navigate = useNavigate();

// //   const { auth, orders } = useAppSelector(store => store);

// //   const { orderItemId, orderId } = useParams();

// //   // ✅ Fetch Data
// //   useEffect(() => {
// //     if (!orderItemId || !orderId) return;

// //     const jwt = auth.jwt || localStorage.getItem('jwt') || '';

// //     dispatch(fetchOrderItemById({ orderItemId, jwt }));
// //     dispatch(fetchOrderById({ orderId, jwt }));
// //   }, [auth.jwt, orderId, orderItemId, dispatch]);

// //   // ✅ Return Order
// //   const handleReturnOrder = async () => {
// //     const reason = prompt("Please enter the reason for return:");
// //     if (reason && orderId) {
// //       const jwt = auth.jwt || localStorage.getItem('jwt') || '';
// //       try {
// //         await dispatch(createReturnRequest({ orderId, reason, jwt })).unwrap();
// //         alert("Return request submitted successfully!");
// //       } catch (err) {
// //         alert("Return request failed");
// //       }
// //     }
// //   };

// //   // ✅ Cancel Order (FIXED)
// //   const handleCancelOrder = async () => {
// //     if (!orderId) return;

// //     const jwt = auth.jwt || localStorage.getItem('jwt') || '';

// //     try {
// //       await dispatch(cancelOrder({ orderId, jwt })).unwrap();

// //       alert("Order cancelled successfully");

// //       // ✅ Redirect after cancel (NO WHITE SCREEN)
// //       navigate("/account/orders");

// //     } catch (error) {
// //       console.error(error);
// //       alert("Failed to cancel order");
// //     }
// //   };

// //   // ✅ Loading State
// //   if (orders?.loading) {
// //     return (
// //       <div className="h-[80vh] flex justify-center items-center">
// //         Loading order details...
// //       </div>
// //     );
// //   }

// //   // ✅ Safe check (NO CRASH)
// //   if (!orders?.orderItem || !orders?.currentOrder) {
// //     return (
// //       <div className="h-[80vh] flex justify-center items-center">
// //         Order not available (maybe cancelled)
// //       </div>
// //     );
// //   }

// //   const orderItem = orders.orderItem;
// //   const currentOrder = orders.currentOrder;

// //   return (
// //     <Box className="space-y-5">

// //       {/* ✅ Product Info */}
// //       <section className="flex flex-col gap-5 justify-center items-center">
// //         <img
// //           className="w-[100px] h-[100px] object-cover rounded shadow"
// //           src={orderItem?.product?.images?.[0] || "/placeholder.png"}
// //           alt={orderItem?.product?.title}
// //         />

// //         <div className="text-sm space-y-1 text-center">
// //           <h1 className="font-bold text-lg">
// //             {currentOrder?.seller?.businessDetails?.businessName ||
// //               orderItem?.product?.seller?.businessDetails?.businessName ||
// //               'SSB'}
// //           </h1>

// //           <p className="text-gray-600">{orderItem?.product?.title}</p>

// //           <p>
// //             <strong>Size:</strong> {orderItem?.size} |{" "}
// //             <strong>Quantity:</strong> {orderItem?.quantity}
// //           </p>
// //         </div>

// //         <div className='flex gap-4'>
// //           <Button
// //             variant="outlined"
// //             onClick={() => navigate(`/reviews/${orderItem?.product?._id}/create`)}
// //           >
// //             Write Review
// //           </Button>

// //           {currentOrder?.orderStatus === 'DELIVERED' && (
// //             <Button variant="outlined" color="warning" onClick={handleReturnOrder}>
// //               Return Item
// //             </Button>
// //           )}
// //         </div>
// //       </section>

// //       {/* ✅ Order Tracking */}
// //       <section className="border p-5 rounded-md shadow-sm">
// //         <div className='flex justify-between items-center mb-4'>
// //           <h1 className='font-bold'>Order Tracking</h1>

// //           {currentOrder?.trackingLink && (
// //             <Button
// //               variant="text"
// //               size="small"
// //               href={fixTrackingLink(currentOrder.trackingLink)}
// //               target="_blank"
// //             >
// //               Track Order
// //             </Button>
// //           )}
// //         </div>

// //         <OrderStepper orderStatus={currentOrder?.orderStatus} />

// //         {currentOrder?.trackingId && (
// //           <p className='text-xs text-center text-gray-500 mt-2'>
// //             Tracking ID: {currentOrder.trackingId}
// //           </p>
// //         )}
// //       </section>

// //       {/* ✅ Address */}
// //       <div className="border p-5 rounded-md shadow-sm">
// //         <h1 className="font-bold pb-3">Delivery Address</h1>

// //         <div className="text-sm space-y-2">
// //           <div className="flex gap-5 font-medium">
// //             <p>{currentOrder?.shippingAddress?.name}</p>
// //             <Divider flexItem orientation="vertical" />
// //             <p>{currentOrder?.shippingAddress?.mobile}</p>
// //           </div>

// //           <p>
// //             {currentOrder?.shippingAddress?.address},{" "}
// //             {currentOrder?.shippingAddress?.city},{" "}
// //             {currentOrder?.shippingAddress?.state} -{" "}
// //             {currentOrder?.shippingAddress?.pinCode}
// //           </p>
// //         </div>
// //       </div>

// //       {/* ✅ Payment */}
// //       <div className="border space-y-4 rounded-md shadow-sm">

// //         <div className="flex justify-between text-sm pt-5 px-5">
// //           <div>
// //             <p className="font-bold">Total Item Price</p>
// //           </div>

// //           <p className="font-medium">
// //             ₹ {orderItem?.sellingPrice * orderItem?.quantity || 0}
// //           </p>
// //         </div>

// //         <div className="px-5">
// //           <div className="bg-orange-50 px-5 py-3 text-xs font-semibold flex justify-between rounded">

// //             <div className='flex items-center gap-3'>
// //               <PaymentsIcon />
// //               <span>
// //                 Payment Mode: {currentOrder?.paymentMethod === 'COD'
// //                   ? 'Cash on Delivery'
// //                   : 'Online'}
// //               </span>
// //             </div>

// //             {currentOrder?.paymentStatus === 'PAID' ? (
// //               <p className="text-green-600 font-bold">PAID</p>
// //             ) : (
// //               <p className="text-orange-600 font-bold">PENDING</p>
// //             )}
// //           </div>
// //         </div>

// //         <Divider />

// //         {/* ✅ Cancel Button */}
// //         {['PENDING', 'PLACED', 'CONFIRMED'].includes(currentOrder?.orderStatus) && (
// //           <div className="px-5 pb-5">
// //             <Button
// //               onClick={handleCancelOrder}
// //               color="error"
// //               variant="outlined"
// //               fullWidth
// //             >
// //               Cancel Order
// //             </Button>
// //           </div>
// //         )}
// //       </div>

// //     </Box>
// //   );
// // };

// // export default OrderDetails;










// import { Box, Button, Divider } from '@mui/material';
// import { useEffect } from 'react';
// import PaymentsIcon from '@mui/icons-material/Payments';
// import OrderStepper from './OrderStepper';
// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// import {
//   cancelOrder,
//   fetchOrderById,
//   fetchOrderItemById,
// } from '../../../Redux Toolkit/Customer/OrderSlice';
// import { useNavigate, useParams } from 'react-router-dom';
// import { fixTrackingLink } from '../../../util/trackingLinkFixer';

// const OrderDetails = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const { auth, orders } = useAppSelector(store => store);

//   const { orderItemId, orderId } = useParams();

//   // ✅ Fetch Data
//   useEffect(() => {
//     if (!orderItemId || !orderId) return;

//     const jwt = auth.jwt || localStorage.getItem('jwt') || '';

//     dispatch(fetchOrderItemById({ orderItemId, jwt }));
//     dispatch(fetchOrderById({ orderId, jwt }));
//   }, [auth.jwt, orderId, orderItemId, dispatch]);

//   // ✅ Return Order – NAVIGATE TO NEW RETURN FORM
//   const handleReturnOrder = () => {
//     if (!orderId) {
//       alert('Order ID missing');
//       return;
//     }

//     // Navigate to new return form with orderId
//     navigate(`/return/${orderId}`, {
//       state: {
//         orderItemId,
//         productName: orderItem?.product?.title,
//         productImage: orderItem?.product?.images?.[0],
//         sellerName: currentOrder?.seller?.businessDetails?.businessName,
//       }
//     });
//   };

//   // ✅ Cancel Order
//   const handleCancelOrder = async () => {
//     if (!orderId) return;

//     const jwt = auth.jwt || localStorage.getItem('jwt') || '';

//     try {
//       await dispatch(cancelOrder({ orderId, jwt })).unwrap();
//       alert("Order cancelled successfully");
//       navigate("/account/orders");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to cancel order");
//     }
//   };

//   // ✅ Loading State
//   if (orders?.loading) {
//     return (
//       <div className="h-[80vh] flex justify-center items-center">
//         Loading order details...
//       </div>
//     );
//   }

//   // ✅ Safe check
//   if (!orders?.orderItem || !orders?.currentOrder) {
//     return (
//       <div className="h-[80vh] flex justify-center items-center">
//         Order not available (maybe cancelled)
//       </div>
//     );
//   }

//   const orderItem = orders.orderItem;
//   const currentOrder = orders.currentOrder;

//   return (
//     <Box className="space-y-5">

//       {/* Product Info */}
//       <section className="flex flex-col gap-5 justify-center items-center">
//         <img
//           className="w-[100px] h-[100px] object-cover rounded shadow"
//           src={orderItem?.product?.images?.[0] || "/placeholder.png"}
//           alt={orderItem?.product?.title}
//         />

//         <div className="text-sm space-y-1 text-center">
//           <h1 className="font-bold text-lg">
//             {currentOrder?.seller?.businessDetails?.businessName ||
//               orderItem?.product?.seller?.businessDetails?.businessName ||
//               'SSB'}
//           </h1>

//           <p className="text-gray-600">{orderItem?.product?.title}</p>

//           <p>
//             <strong>Size:</strong> {orderItem?.size} |{" "}
//             <strong>Quantity:</strong> {orderItem?.quantity}
//           </p>
//         </div>

//         <div className='flex gap-4'>
//           <Button
//             variant="outlined"
//             onClick={() => navigate(`/reviews/${orderItem?.product?._id}/create`)}
//           >
//             Write Review
//           </Button>

//           {currentOrder?.orderStatus === 'DELIVERED' && (
//             <Button
//               variant="outlined"
//               color="warning"
//               onClick={handleReturnOrder}  // ✅ नए Return Form पर जाएगा
//             >
//               Return Item
//             </Button>
//           )}
//         </div>
//       </section>

//       {/* Order Tracking */}
//       <section className="border p-5 rounded-md shadow-sm">
//         <div className='flex justify-between items-center mb-4'>
//           <h1 className='font-bold'>Order Tracking</h1>

//           {currentOrder?.trackingLink && (
//             <Button
//               variant="text"
//               size="small"
//               href={fixTrackingLink(currentOrder.trackingLink)}
//               target="_blank"
//             >
//               Track Order
//             </Button>
//           )}
//         </div>

//         <OrderStepper orderStatus={currentOrder?.orderStatus} />

//         {currentOrder?.trackingId && (
//           <p className='text-xs text-center text-gray-500 mt-2'>
//             Tracking ID: {currentOrder.trackingId}
//           </p>
//         )}
//       </section>

//       {/* Delivery Address */}
//       <div className="border p-5 rounded-md shadow-sm">
//         <h1 className="font-bold pb-3">Delivery Address</h1>

//         <div className="text-sm space-y-2">
//           <div className="flex gap-5 font-medium">
//             <p>{currentOrder?.shippingAddress?.name}</p>
//             <Divider flexItem orientation="vertical" />
//             <p>{currentOrder?.shippingAddress?.mobile}</p>
//           </div>

//           <p>
//             {currentOrder?.shippingAddress?.address},{" "}
//             {currentOrder?.shippingAddress?.city},{" "}
//             {currentOrder?.shippingAddress?.state} -{" "}
//             {currentOrder?.shippingAddress?.pinCode}
//           </p>
//         </div>
//       </div>

//       {/* Payment & Pricing */}
//       <div className="border space-y-4 rounded-md shadow-sm">

//         <div className="flex justify-between text-sm pt-5 px-5">
//           <div>
//             <p className="font-bold">Total Item Price</p>
//           </div>

//           <p className="font-medium">
//             ₹ {orderItem?.sellingPrice * orderItem?.quantity || 0}
//           </p>
//         </div>

//         <div className="px-5">
//           <div className="bg-orange-50 px-5 py-3 text-xs font-semibold flex justify-between rounded">

//             <div className='flex items-center gap-3'>
//               <PaymentsIcon />
//               <span>
//                 Payment Mode: {currentOrder?.paymentMethod === 'COD'
//                   ? 'Cash on Delivery'
//                   : 'Online'}
//               </span>
//             </div>

//             {currentOrder?.paymentStatus === 'PAID' ? (
//               <p className="text-green-600 font-bold">PAID</p>
//             ) : (
//               <p className="text-orange-600 font-bold">PENDING</p>
//             )}
//           </div>
//         </div>

//         <Divider />

//         {/* Cancel Order Button */}
//         {['PENDING', 'PLACED', 'CONFIRMED'].includes(currentOrder?.orderStatus) && (
//           <div className="px-5 pb-5">
//             <Button
//               onClick={handleCancelOrder}
//               color="error"
//               variant="outlined"
//               fullWidth
//             >
//               Cancel Order
//             </Button>
//           </div>
//         )}
//       </div>

//     </Box>
//   );
// };

// export default OrderDetails;







// import { Box, Button, Divider } from '@mui/material';
// import { useEffect } from 'react';
// import PaymentsIcon from '@mui/icons-material/Payments';
// import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// import PhoneIcon from '@mui/icons-material/Phone';
// import BlockIcon from '@mui/icons-material/Block';
// import DownloadIcon from '@mui/icons-material/Download';
// import OrderStepper from './OrderStepper';
// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// import {
//   cancelOrder,
//   fetchOrderById,
//   fetchOrderItemById,
// } from '../../../Redux Toolkit/Customer/OrderSlice';
// import { useNavigate, useParams } from 'react-router-dom';
// import { fixTrackingLink } from '../../../util/trackingLinkFixer';
// import { generateInvoice } from '../../../util/generateInvoice';

// // 🔥 Support Info
// const SUPPORT_PHONE = '+91 99922 88843';
// const SUPPORT_PHONE_RAW = '9992288843';
// const RETURN_WINDOW_DAYS = 5;

// // 🔥 Safe date parser
// const parseDate = (val: any): Date | null => {
//   if (!val) return null;
//   try {
//     const d = new Date(val);
//     if (isNaN(d.getTime())) return null;
//     return d;
//   } catch {
//     return null;
//   }
// };

// // 🔥 Format date
// const formatDate = (d: Date): string => {
//   try {
//     return d.toLocaleDateString('en-IN', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//     });
//   } catch {
//     return '';
//   }
// };

// // 🔥 Return info calc
// const getReturnInfo = (order: any) => {
//   try {
//     let deliveredDate: Date | null = null;

//     deliveredDate = parseDate(order?.deliveredAt);

//     if (!deliveredDate) {
//       const shipped = parseDate(order?.shippedAt);
//       if (shipped) {
//         shipped.setDate(shipped.getDate() + 3);
//         deliveredDate = shipped;
//       }
//     }

//     if (!deliveredDate) {
//       deliveredDate = parseDate(order?.deliverDate);
//     }

//     if (!deliveredDate) {
//       const ordered = parseDate(order?.orderDate);
//       if (ordered) {
//         ordered.setDate(ordered.getDate() + 7);
//         deliveredDate = ordered;
//       }
//     }

//     if (!deliveredDate) {
//       return {
//         canReturn: false,
//         daysLeft: 0,
//         message: 'Delivery date not available',
//         expired: true,
//         deliveryDateText: '',
//         returnEndText: '',
//       };
//     }

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const delDate = new Date(deliveredDate);
//     delDate.setHours(0, 0, 0, 0);

//     const diffTime = today.getTime() - delDate.getTime();
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
//     const daysLeft = RETURN_WINDOW_DAYS - diffDays;

//     const returnEnd = new Date(delDate);
//     returnEnd.setDate(returnEnd.getDate() + RETURN_WINDOW_DAYS);

//     if (daysLeft > 0) {
//       return {
//         canReturn: true,
//         daysLeft,
//         message: `Return available for ${daysLeft} more ${
//           daysLeft === 1 ? 'day' : 'days'
//         }`,
//         expired: false,
//         deliveryDateText: `Delivered on ${formatDate(delDate)}`,
//         returnEndText: `Return till ${formatDate(returnEnd)}`,
//       };
//     }

//     return {
//       canReturn: false,
//       daysLeft: 0,
//       message: `${RETURN_WINDOW_DAYS}-day return window has expired`,
//       expired: true,
//       deliveryDateText: `Delivered on ${formatDate(delDate)}`,
//       returnEndText: `Return window closed on ${formatDate(returnEnd)}`,
//     };
//   } catch (err) {
//     console.error('Return info error:', err);
//     return {
//       canReturn: false,
//       daysLeft: 0,
//       message: 'Unable to calculate return window',
//       expired: true,
//       deliveryDateText: '',
//       returnEndText: '',
//     };
//   }
// };

// const OrderDetails = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const { auth, orders } = useAppSelector((store: any) => store);

//   const { orderItemId, orderId } = useParams();

//   useEffect(() => {
//     if (!orderItemId || !orderId) return;

//     const jwt = auth?.jwt || localStorage.getItem('jwt') || '';

//     dispatch(fetchOrderItemById({ orderItemId, jwt }) as any);
//     dispatch(fetchOrderById({ orderId, jwt }) as any);
//   }, [auth?.jwt, orderId, orderItemId, dispatch]);

//   const handleReturnOrder = () => {
//     if (!orderId) {
//       alert('Order ID missing');
//       return;
//     }

//     navigate(`/return/${orderId}`, {
//       state: {
//         orderItemId,
//         productName: orders?.orderItem?.product?.title || '',
//         productImage: orders?.orderItem?.product?.images?.[0] || '',
//         sellerName:
//           orders?.currentOrder?.seller?.businessDetails?.businessName || '',
//       },
//     });
//   };

//   const handleCancelOrder = async () => {
//     if (!orderId) return;

//     const jwt = auth?.jwt || localStorage.getItem('jwt') || '';

//     try {
//       await dispatch(cancelOrder({ orderId, jwt }) as any).unwrap();
//       alert('Order cancelled successfully');
//       navigate('/account/orders');
//     } catch (error) {
//       console.error(error);
//       alert('Failed to cancel order');
//     }
//   };

//   if (orders?.loading) {
//     return (
//       <div className="h-[80vh] flex justify-center items-center">
//         Loading order details...
//       </div>
//     );
//   }

//   if (!orders?.orderItem || !orders?.currentOrder) {
//     return (
//       <div className="h-[80vh] flex justify-center items-center">
//         Order not available (maybe cancelled)
//       </div>
//     );
//   }

//   const orderItem = orders.orderItem;
//   const currentOrder = orders.currentOrder;
//   const returnInfo = getReturnInfo(currentOrder);

//   // 🔥 INVOICE DOWNLOAD HANDLER
//   const handleDownloadInvoice = async () => {
//     try {
//       const itemTotal =
//         (orderItem?.sellingPrice || 0) * (orderItem?.quantity || 1);

//       await generateInvoice({
//         orderId: currentOrder._id || orderId || '',
//         orderDate: currentOrder.orderDate
//           ? new Date(currentOrder.orderDate).toLocaleDateString('en-IN')
//           : new Date().toLocaleDateString('en-IN'),
//         orderStatus: currentOrder.orderStatus || '',
//         paymentMethod:
//           currentOrder.paymentMethod === 'COD'
//             ? 'Cash on Delivery'
//             : 'Online Payment',
//         paymentStatus: currentOrder.paymentStatus || 'PENDING',

//         customer: {
//           name: currentOrder.shippingAddress?.name || '',
//           mobile: currentOrder.shippingAddress?.mobile || '',
//           email: currentOrder.user?.email || '',
//           address: currentOrder.shippingAddress?.address || '',
//           city: currentOrder.shippingAddress?.city || '',
//           state: currentOrder.shippingAddress?.state || '',
//           pinCode: currentOrder.shippingAddress?.pinCode || '',
//         },

//         seller: {
//           name:
//             currentOrder.seller?.businessDetails?.businessName ||
//             orderItem?.product?.seller?.businessDetails?.businessName ||
//             'SelfySnap Seller',
//           sellerName:
//             currentOrder.seller?.sellerName ||
//             orderItem?.product?.seller?.sellerName ||
//             '',
//           email: currentOrder.seller?.email || '',
//           businessEmail:
//             currentOrder.seller?.businessDetails?.businessEmail ||
//             currentOrder.seller?.email ||
//             '',
//           businessAddress:
//             currentOrder.seller?.businessDetails?.businessAddress || '',
//           GSTIN: currentOrder.seller?.GSTIN || '',
//         },

//         items: [
//           {
//             title: orderItem?.product?.title || 'Product',
//             size: orderItem?.size || 'FREE',
//             quantity: orderItem?.quantity || 1,
//             price: orderItem?.sellingPrice || 0,
//             total: itemTotal,
//           },
//         ],

//         subtotal: itemTotal,
//         deliveryFee: 0,
//         discount: 0,
//         totalAmount: itemTotal,
//       });
//     } catch (err) {
//       console.error('Invoice error:', err);
//       alert('Failed to generate invoice. Please try again.');
//     }
//   };

//   return (
//     <Box className="space-y-5">
//       {/* Product Info */}
//       <section className="flex flex-col gap-5 justify-center items-center">
//         <img
//           className="w-[100px] h-[100px] object-cover rounded shadow"
//           src={orderItem?.product?.images?.[0] || '/placeholder.png'}
//           alt={orderItem?.product?.title || 'Product'}
//         />

//         <div className="text-sm space-y-1 text-center">
//           <h1 className="font-bold text-lg">
//             {currentOrder?.seller?.businessDetails?.businessName ||
//               orderItem?.product?.seller?.businessDetails?.businessName ||
//               'SelfySnap'}
//           </h1>

//           <p className="text-gray-600">{orderItem?.product?.title || 'Product'}</p>

//           <p>
//             <strong>Size:</strong> {orderItem?.size || 'FREE'} |{' '}
//             <strong>Quantity:</strong> {orderItem?.quantity || 1}
//           </p>
//         </div>

//         {currentOrder?.orderStatus === 'DELIVERED' && (
//           <div className="w-full max-w-md">
//             {returnInfo.deliveryDateText && (
//               <div className="text-center mb-3">
//                 <p className="text-xs text-gray-500 font-semibold">
//                   {returnInfo.deliveryDateText}
//                 </p>
//                 {returnInfo.returnEndText && (
//                   <p
//                     className={`text-xs font-semibold mt-1 ${
//                       returnInfo.expired ? 'text-red-500' : 'text-green-600'
//                     }`}
//                   >
//                     {returnInfo.returnEndText}
//                   </p>
//                 )}
//               </div>
//             )}

//             {returnInfo.canReturn ? (
//               <div className="flex flex-col items-center gap-2">
//                 <Button
//                   variant="outlined"
//                   color="warning"
//                   onClick={handleReturnOrder}
//                   fullWidth
//                   sx={{ fontWeight: 'bold' }}
//                 >
//                   Return Item
//                 </Button>
//                 <p className="text-xs text-green-600 font-semibold">
//                   ⏱ {returnInfo.message}
//                 </p>
//               </div>
//             ) : (
//               <div className="flex flex-col items-center gap-2">
//                 <Button
//                   variant="outlined"
//                   disabled
//                   startIcon={<BlockIcon />}
//                   fullWidth
//                   sx={{
//                     color: '#9ca3af !important',
//                     borderColor: '#d1d5db !important',
//                     fontWeight: 'bold',
//                     bgcolor: '#f9fafb',
//                   }}
//                 >
//                   Return Disabled
//                 </Button>
//                 <p className="text-xs text-red-500 font-semibold text-center">
//                   {returnInfo.message}
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         <div className="flex gap-4 flex-wrap justify-center">
//           <Button
//             variant="outlined"
//             onClick={() =>
//               navigate(`/reviews/${orderItem?.product?._id}/create`)
//             }
//           >
//             Write Review
//           </Button>
//         </div>
//       </section>

//       {/* Order Tracking */}
//       <section className="border p-5 rounded-md shadow-sm">
//         <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
//           <h1 className="font-bold">Order Tracking</h1>

//           <div className="flex items-center gap-2">
//             {currentOrder?.trackingLink && (
//               <Button
//                 variant="text"
//                 size="small"
//                 href={fixTrackingLink(currentOrder.trackingLink)}
//                 target="_blank"
//               >
//                 Track Order
//               </Button>
//             )}

//             {/* 🔥 INVOICE BUTTON */}
//             <Button
//               variant="outlined"
//               size="small"
//               startIcon={<DownloadIcon />}
//               onClick={handleDownloadInvoice}
//               sx={{
//                 borderColor: '#2874f0',
//                 color: '#2874f0',
//                 fontWeight: 'bold',
//                 textTransform: 'none',
//                 '&:hover': {
//                   bgcolor: '#eff6ff',
//                   borderColor: '#1e5fc4',
//                 },
//               }}
//             >
//               Invoice
//             </Button>
//           </div>
//         </div>

//         <OrderStepper orderStatus={currentOrder?.orderStatus} />

//         {currentOrder?.trackingId && (
//           <p className="text-xs text-center text-gray-500 mt-2">
//             Tracking ID: {currentOrder.trackingId}
//           </p>
//         )}
//       </section>

//       {/* Delivery Address */}
//       <div className="border p-5 rounded-md shadow-sm">
//         <h1 className="font-bold pb-3">Delivery Address</h1>

//         <div className="text-sm space-y-2">
//           <div className="flex gap-5 font-medium">
//             <p>{currentOrder?.shippingAddress?.name || ''}</p>
//             <Divider flexItem orientation="vertical" />
//             <p>{currentOrder?.shippingAddress?.mobile || ''}</p>
//           </div>

//           <p>
//             {currentOrder?.shippingAddress?.address || ''},{' '}
//             {currentOrder?.shippingAddress?.city || ''},{' '}
//             {currentOrder?.shippingAddress?.state || ''} -{' '}
//             {currentOrder?.shippingAddress?.pinCode || ''}
//           </p>
//         </div>
//       </div>

//       {/* Payment */}
//       <div className="border space-y-4 rounded-md shadow-sm">
//         <div className="flex justify-between text-sm pt-5 px-5">
//           <div>
//             <p className="font-bold">Total Item Price</p>
//           </div>

//           <p className="font-medium">
//             ₹ {(orderItem?.sellingPrice || 0) * (orderItem?.quantity || 0)}
//           </p>
//         </div>

//         <div className="px-5">
//           <div className="bg-orange-50 px-5 py-3 text-xs font-semibold flex justify-between rounded">
//             <div className="flex items-center gap-3">
//               <PaymentsIcon />
//               <span>
//                 Payment Mode:{' '}
//                 {currentOrder?.paymentMethod === 'COD'
//                   ? 'Cash on Delivery'
//                   : 'Online'}
//               </span>
//             </div>

//             {currentOrder?.paymentStatus === 'PAID' ? (
//               <p className="text-green-600 font-bold">PAID</p>
//             ) : (
//               <p className="text-orange-600 font-bold">PENDING</p>
//             )}
//           </div>
//         </div>

//         <Divider />

//         {['PENDING', 'PLACED', 'CONFIRMED'].includes(
//           currentOrder?.orderStatus
//         ) && (
//           <div className="px-5 pb-5">
//             <Button
//               onClick={handleCancelOrder}
//               color="error"
//               variant="outlined"
//               fullWidth
//             >
//               Cancel Order
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Support */}
//       <div className="border-2 border-blue-200 rounded-xl p-5 bg-gradient-to-r from-blue-50 to-white shadow-sm">
//         <div className="flex items-center gap-3 mb-3">
//           <div className="bg-blue-500 rounded-lg p-2">
//             <SupportAgentIcon sx={{ color: 'white', fontSize: 22 }} />
//           </div>
//           <div>
//             <h3 className="font-bold text-gray-800 text-base">
//               SelfySnap Support
//             </h3>
//             <p className="text-xs text-gray-500">
//               Have questions? We're here to help!
//             </p>
//           </div>
//         </div>

//         <div className="space-y-2 mt-4">
//           <a
//             href={`tel:+91${SUPPORT_PHONE_RAW}`}
//             className="flex items-center gap-3 p-3 bg-white border border-blue-100 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
//           >
//             <div className="bg-green-500 rounded-full p-2">
//               <PhoneIcon sx={{ color: 'white', fontSize: 18 }} />
//             </div>
//             <div className="flex-1">
//               <p className="text-xs text-gray-500 font-semibold">
//                 Call Us (10 AM – 7 PM)
//               </p>
//               <p className="text-sm font-bold text-blue-600">
//                 {SUPPORT_PHONE}
//               </p>
//             </div>
//             <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
//               CALL NOW
//             </span>
//           </a>
//         </div>

//         <p className="text-xs text-gray-500 text-center mt-3">
//           For return, refund, or delivery issues — call us directly
//         </p>
//       </div>
//     </Box>
//   );
// };

// export default OrderDetails;
































// import { Box, Button, Divider } from '@mui/material';
// import { useEffect } from 'react';
// import PaymentsIcon from '@mui/icons-material/Payments';
// import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// import PhoneIcon from '@mui/icons-material/Phone';
// import BlockIcon from '@mui/icons-material/Block';
// import DownloadIcon from '@mui/icons-material/Download';
// import OrderStepper from './OrderStepper';
// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// import {
//   cancelOrder,
//   fetchOrderById,
//   fetchOrderItemById,
// } from '../../../Redux Toolkit/Customer/OrderSlice';
// import { useNavigate, useParams } from 'react-router-dom';
// import { fixTrackingLink } from '../../../util/trackingLinkFixer';
// import { generateInvoice } from '../../../util/generateInvoice';
// import { DEPLOYED_URL } from '../../../Config/Api';

// /* ================== IMAGE HELPERS ================== */
// const buildUrl = (p?: string) => {
//   if (!p) return '/placeholder.png';
//   if (p.startsWith('http')) return p;
//   return `${DEPLOYED_URL}${p.startsWith('/') ? p : `/${p}`}`;
// };

// const getItemImage = (orderItem: any) =>
//   buildUrl(
//     orderItem?.customDesign?.compositeImage ||
//       orderItem?.customDesign?.previewImage ||
//       orderItem?.product?.images?.[0]
//   );

// // 🔥 Support Info
// const SUPPORT_PHONE = '+91 99922 88843';
// const SUPPORT_PHONE_RAW = '9992288843';
// const RETURN_WINDOW_DAYS = 5;

// // 🔥 Safe date parser
// const parseDate = (val: any): Date | null => {
//   if (!val) return null;
//   try {
//     const d = new Date(val);
//     if (isNaN(d.getTime())) return null;
//     return d;
//   } catch {
//     return null;
//   }
// };

// // 🔥 Format date
// const formatDate = (d: Date): string => {
//   try {
//     return d.toLocaleDateString('en-IN', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//     });
//   } catch {
//     return '';
//   }
// };

// // 🔥 Return info calc
// const getReturnInfo = (order: any) => {
//   try {
//     let deliveredDate: Date | null = null;

//     deliveredDate = parseDate(order?.deliveredAt);

//     if (!deliveredDate) {
//       const shipped = parseDate(order?.shippedAt);
//       if (shipped) {
//         shipped.setDate(shipped.getDate() + 3);
//         deliveredDate = shipped;
//       }
//     }

//     if (!deliveredDate) {
//       deliveredDate = parseDate(order?.deliverDate);
//     }

//     if (!deliveredDate) {
//       const ordered = parseDate(order?.orderDate);
//       if (ordered) {
//         ordered.setDate(ordered.getDate() + 7);
//         deliveredDate = ordered;
//       }
//     }

//     if (!deliveredDate) {
//       return {
//         canReturn: false,
//         daysLeft: 0,
//         message: 'Delivery date not available',
//         expired: true,
//         deliveryDateText: '',
//         returnEndText: '',
//       };
//     }

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const delDate = new Date(deliveredDate);
//     delDate.setHours(0, 0, 0, 0);

//     const diffTime = today.getTime() - delDate.getTime();
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
//     const daysLeft = RETURN_WINDOW_DAYS - diffDays;

//     const returnEnd = new Date(delDate);
//     returnEnd.setDate(returnEnd.getDate() + RETURN_WINDOW_DAYS);

//     if (daysLeft > 0) {
//       return {
//         canReturn: true,
//         daysLeft,
//         message: `Return available for ${daysLeft} more ${
//           daysLeft === 1 ? 'day' : 'days'
//         }`,
//         expired: false,
//         deliveryDateText: `Delivered on ${formatDate(delDate)}`,
//         returnEndText: `Return till ${formatDate(returnEnd)}`,
//       };
//     }

//     return {
//       canReturn: false,
//       daysLeft: 0,
//       message: `${RETURN_WINDOW_DAYS}-day return window has expired`,
//       expired: true,
//       deliveryDateText: `Delivered on ${formatDate(delDate)}`,
//       returnEndText: `Return window closed on ${formatDate(returnEnd)}`,
//     };
//   } catch (err) {
//     console.error('Return info error:', err);
//     return {
//       canReturn: false,
//       daysLeft: 0,
//       message: 'Unable to calculate return window',
//       expired: true,
//       deliveryDateText: '',
//       returnEndText: '',
//     };
//   }
// };

// const OrderDetails = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const { auth, orders } = useAppSelector((store: any) => store);

//   const { orderItemId, orderId } = useParams();

//   useEffect(() => {
//     if (!orderItemId || !orderId) return;

//     const jwt = auth?.jwt || localStorage.getItem('jwt') || '';

//     dispatch(fetchOrderItemById({ orderItemId, jwt }) as any);
//     dispatch(fetchOrderById({ orderId, jwt }) as any);
//   }, [auth?.jwt, orderId, orderItemId, dispatch]);

//   const handleReturnOrder = () => {
//     if (!orderId) {
//       alert('Order ID missing');
//       return;
//     }

//     const o: any = orders;
//     navigate(`/return/${orderId}`, {
//       state: {
//         orderItemId,
//         productName: o?.orderItem?.product?.title || '',
//         productImage: o?.orderItem?.product?.images?.[0] || '',
//         sellerName:
//           o?.currentOrder?.seller?.businessDetails?.businessName || '',
//       },
//     });
//   };

//   const handleCancelOrder = async () => {
//     if (!orderId) return;

//     const jwt = auth?.jwt || localStorage.getItem('jwt') || '';

//     try {
//       await dispatch(cancelOrder({ orderId, jwt }) as any).unwrap();
//       alert('Order cancelled successfully');
//       navigate('/account/orders');
//     } catch (error) {
//       console.error(error);
//       alert('Failed to cancel order');
//     }
//   };

//   if (orders?.loading) {
//     return (
//       <div className="h-[80vh] flex justify-center items-center">
//         Loading order details...
//       </div>
//     );
//   }

//   if (!orders?.orderItem || !orders?.currentOrder) {
//     return (
//       <div className="h-[80vh] flex justify-center items-center">
//         Order not available (maybe cancelled)
//       </div>
//     );
//   }

//   const orderItem: any = orders.orderItem;
//   const currentOrder: any = orders.currentOrder;
//   const returnInfo = getReturnInfo(currentOrder);
//   const isCustom = !!orderItem?.customDesign?.enabled;

//   const handleDownloadInvoice = async () => {
//     try {
//       const itemTotal =
//         (orderItem?.sellingPrice || 0) * (orderItem?.quantity || 1);

//       await generateInvoice({
//         orderId: currentOrder._id || orderId || '',
//         orderDate: currentOrder.orderDate
//           ? new Date(currentOrder.orderDate).toLocaleDateString('en-IN')
//           : new Date().toLocaleDateString('en-IN'),
//         orderStatus: currentOrder.orderStatus || '',
//         paymentMethod:
//           currentOrder.paymentMethod === 'COD'
//             ? 'Cash on Delivery'
//             : 'Online Payment',
//         paymentStatus: currentOrder.paymentStatus || 'PENDING',

//         customer: {
//           name: currentOrder.shippingAddress?.name || '',
//           mobile: currentOrder.shippingAddress?.mobile || '',
//           email: currentOrder.user?.email || '',
//           address: currentOrder.shippingAddress?.address || '',
//           city: currentOrder.shippingAddress?.city || '',
//           state: currentOrder.shippingAddress?.state || '',
//           pinCode: currentOrder.shippingAddress?.pinCode || '',
//         },

//         seller: {
//           name:
//             currentOrder.seller?.businessDetails?.businessName ||
//             orderItem?.product?.seller?.businessDetails?.businessName ||
//             'SelfySnap Seller',
//           email: currentOrder.seller?.email || '',
//           businessEmail:
//             currentOrder.seller?.businessDetails?.businessEmail ||
//             currentOrder.seller?.email ||
//             '',
//           businessAddress:
//             currentOrder.seller?.businessDetails?.businessAddress || '',
//           GSTIN: currentOrder.seller?.GSTIN || '',
//         } as any,

//         items: [
//           {
//             title: orderItem?.product?.title || 'Product',
//             size: orderItem?.size || 'FREE',
//             quantity: orderItem?.quantity || 1,
//             price: orderItem?.sellingPrice || 0,
//             total: itemTotal,
//           },
//         ],

//         subtotal: itemTotal,
//         deliveryFee: 0,
//         discount: 0,
//         totalAmount: itemTotal,
//       } as any);
//     } catch (err) {
//       console.error('Invoice error:', err);
//       alert('Failed to generate invoice. Please try again.');
//     }
//   };

//   return (
//     <Box className="space-y-5">
//       {/* Product Info */}
//       <section className="flex flex-col gap-5 justify-center items-center">
//         <div className="relative">
//           <img
//             className={`w-[100px] h-[100px] object-cover rounded shadow ${
//               isCustom ? 'ring-2 ring-purple-400' : ''
//             }`}
//             src={getItemImage(orderItem)}
//             alt={orderItem?.product?.title || 'Product'}
//             onError={(e) => {
//               (e.target as HTMLImageElement).src = buildUrl(
//                 orderItem?.product?.images?.[0]
//               );
//             }}
//           />
//           {isCustom && (
//             <span className="absolute -top-1 -left-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
//               CUSTOM
//             </span>
//           )}
//         </div>

//         <div className="text-sm space-y-1 text-center">
//           <h1 className="font-bold text-lg">
//             {currentOrder?.seller?.businessDetails?.businessName ||
//               orderItem?.product?.seller?.businessDetails?.businessName ||
//               'SelfySnap'}
//           </h1>

//           <p className="text-gray-600">
//             {orderItem?.product?.title || 'Product'}
//           </p>

//           {isCustom && (
//             <p className="text-purple-600 text-xs font-semibold">
//               🎨 Printed with your design
//             </p>
//           )}

//           <p>
//             <strong>Size:</strong> {orderItem?.size || 'FREE'} |{' '}
//             <strong>Quantity:</strong> {orderItem?.quantity || 1}
//           </p>
//         </div>

//         {currentOrder?.orderStatus === 'DELIVERED' && (
//           <div className="w-full max-w-md">
//             {returnInfo.deliveryDateText && (
//               <div className="text-center mb-3">
//                 <p className="text-xs text-gray-500 font-semibold">
//                   {returnInfo.deliveryDateText}
//                 </p>
//                 {returnInfo.returnEndText && (
//                   <p
//                     className={`text-xs font-semibold mt-1 ${
//                       returnInfo.expired ? 'text-red-500' : 'text-green-600'
//                     }`}
//                   >
//                     {returnInfo.returnEndText}
//                   </p>
//                 )}
//               </div>
//             )}

//             {returnInfo.canReturn ? (
//               <div className="flex flex-col items-center gap-2">
//                 <Button
//                   variant="outlined"
//                   color="warning"
//                   onClick={handleReturnOrder}
//                   fullWidth
//                   sx={{ fontWeight: 'bold' }}
//                 >
//                   Return Item
//                 </Button>
//                 <p className="text-xs text-green-600 font-semibold">
//                   ⏱ {returnInfo.message}
//                 </p>
//               </div>
//             ) : (
//               <div className="flex flex-col items-center gap-2">
//                 <Button
//                   variant="outlined"
//                   disabled
//                   startIcon={<BlockIcon />}
//                   fullWidth
//                   sx={{
//                     color: '#9ca3af !important',
//                     borderColor: '#d1d5db !important',
//                     fontWeight: 'bold',
//                     bgcolor: '#f9fafb',
//                   }}
//                 >
//                   Return Disabled
//                 </Button>
//                 <p className="text-xs text-red-500 font-semibold text-center">
//                   {returnInfo.message}
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         <div className="flex gap-4 flex-wrap justify-center">
//           <Button
//             variant="outlined"
//             onClick={() =>
//               navigate(`/reviews/${orderItem?.product?._id}/create`)
//             }
//           >
//             Write Review
//           </Button>
//         </div>
//       </section>

//       {/* Order Tracking */}
//       <section className="border p-5 rounded-md shadow-sm">
//         <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
//           <h1 className="font-bold">Order Tracking</h1>

//           <div className="flex items-center gap-2">
//             {currentOrder?.trackingLink && (
//               <Button
//                 variant="text"
//                 size="small"
//                 href={fixTrackingLink(currentOrder.trackingLink)}
//                 target="_blank"
//               >
//                 Track Order
//               </Button>
//             )}

//             <Button
//               variant="outlined"
//               size="small"
//               startIcon={<DownloadIcon />}
//               onClick={handleDownloadInvoice}
//               sx={{
//                 borderColor: '#2874f0',
//                 color: '#2874f0',
//                 fontWeight: 'bold',
//                 textTransform: 'none',
//                 '&:hover': {
//                   bgcolor: '#eff6ff',
//                   borderColor: '#1e5fc4',
//                 },
//               }}
//             >
//               Invoice
//             </Button>
//           </div>
//         </div>

//         <OrderStepper orderStatus={currentOrder?.orderStatus} />

//         {currentOrder?.trackingId && (
//           <p className="text-xs text-center text-gray-500 mt-2">
//             Tracking ID: {currentOrder.trackingId}
//           </p>
//         )}
//       </section>

//       {/* Delivery Address */}
//       <div className="border p-5 rounded-md shadow-sm">
//         <h1 className="font-bold pb-3">Delivery Address</h1>

//         <div className="text-sm space-y-2">
//           <div className="flex gap-5 font-medium">
//             <p>{currentOrder?.shippingAddress?.name || ''}</p>
//             <Divider flexItem orientation="vertical" />
//             <p>{currentOrder?.shippingAddress?.mobile || ''}</p>
//           </div>

//           <p>
//             {currentOrder?.shippingAddress?.address || ''},{' '}
//             {currentOrder?.shippingAddress?.city || ''},{' '}
//             {currentOrder?.shippingAddress?.state || ''} -{' '}
//             {currentOrder?.shippingAddress?.pinCode || ''}
//           </p>
//         </div>
//       </div>

//       {/* Payment */}
//       <div className="border space-y-4 rounded-md shadow-sm">
//         <div className="flex justify-between text-sm pt-5 px-5">
//           <div>
//             <p className="font-bold">Total Item Price</p>
//           </div>

//           <p className="font-medium">
//             ₹ {(orderItem?.sellingPrice || 0) * (orderItem?.quantity || 0)}
//           </p>
//         </div>

//         <div className="px-5">
//           <div className="bg-orange-50 px-5 py-3 text-xs font-semibold flex justify-between rounded">
//             <div className="flex items-center gap-3">
//               <PaymentsIcon />
//               <span>
//                 Payment Mode:{' '}
//                 {currentOrder?.paymentMethod === 'COD'
//                   ? 'Cash on Delivery'
//                   : 'Online'}
//               </span>
//             </div>

//             {currentOrder?.paymentStatus === 'PAID' ? (
//               <p className="text-green-600 font-bold">PAID</p>
//             ) : (
//               <p className="text-orange-600 font-bold">PENDING</p>
//             )}
//           </div>
//         </div>

//         <Divider />

//         {['PENDING', 'PLACED', 'CONFIRMED'].includes(
//           currentOrder?.orderStatus
//         ) && (
//           <div className="px-5 pb-5">
//             <Button
//               onClick={handleCancelOrder}
//               color="error"
//               variant="outlined"
//               fullWidth
//             >
//               Cancel Order
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Support */}
//       <div className="border-2 border-blue-200 rounded-xl p-5 bg-gradient-to-r from-blue-50 to-white shadow-sm">
//         <div className="flex items-center gap-3 mb-3">
//           <div className="bg-blue-500 rounded-lg p-2">
//             <SupportAgentIcon sx={{ color: 'white', fontSize: 22 }} />
//           </div>
//           <div>
//             <h3 className="font-bold text-gray-800 text-base">
//               SelfySnap Support
//             </h3>
//             <p className="text-xs text-gray-500">
//               Have questions? We're here to help!
//             </p>
//           </div>
//         </div>

//         <div className="space-y-2 mt-4">
//           <a
//             href={`tel:+91${SUPPORT_PHONE_RAW}`}
//             className="flex items-center gap-3 p-3 bg-white border border-blue-100 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
//           >
//             <div className="bg-green-500 rounded-full p-2">
//               <PhoneIcon sx={{ color: 'white', fontSize: 18 }} />
//             </div>
//             <div className="flex-1">
//               <p className="text-xs text-gray-500 font-semibold">
//                 Call Us (10 AM – 7 PM)
//               </p>
//               <p className="text-sm font-bold text-blue-600">
//                 {SUPPORT_PHONE}
//               </p>
//             </div>
//             <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
//               CALL NOW
//             </span>
//           </a>
//         </div>

//         <p className="text-xs text-gray-500 text-center mt-3">
//           For return, refund, or delivery issues — call us directly
//         </p>
//       </div>
//     </Box>
//   );
// };

// export default OrderDetails;























import { Box, Button, Divider } from '@mui/material';
import { useEffect } from 'react';
import PaymentsIcon from '@mui/icons-material/Payments';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PhoneIcon from '@mui/icons-material/Phone';
import BlockIcon from '@mui/icons-material/Block';
import DownloadIcon from '@mui/icons-material/Download';
import OrderStepper from './OrderStepper';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import {
  cancelOrder,
  fetchOrderById,
  fetchOrderItemById,
} from '../../../Redux Toolkit/Customer/OrderSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { fixTrackingLink } from '../../../util/trackingLinkFixer';
import { generateInvoice } from '../../../util/generateInvoice';
import { DEPLOYED_URL } from '../../../Config/Api';

/* ================== IMAGE HELPERS ================== */
const buildUrl = (p?: string) => {
  if (!p) return '/placeholder.png';
  if (p.startsWith('http')) return p;
  return `${DEPLOYED_URL}${p.startsWith('/') ? p : `/${p}`}`;
};

const getItemImage = (orderItem: any) =>
  buildUrl(
    orderItem?.customDesign?.compositeImage ||
      orderItem?.customDesign?.previewImage ||
      orderItem?.product?.images?.[0]
  );

const SUPPORT_PHONE = '+91 99922 88843';
const SUPPORT_PHONE_RAW = '9992288843';
const RETURN_WINDOW_DAYS = 5;

const parseDate = (val: any): Date | null => {
  if (!val) return null;
  try {
    const d = new Date(val);
    if (isNaN(d.getTime())) return null;
    return d;
  } catch {
    return null;
  }
};

const formatDate = (d: Date): string => {
  try {
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
};

const getReturnInfo = (order: any) => {
  try {
    let deliveredDate: Date | null = null;

    deliveredDate = parseDate(order?.deliveredAt);

    if (!deliveredDate) {
      const shipped = parseDate(order?.shippedAt);
      if (shipped) {
        shipped.setDate(shipped.getDate() + 3);
        deliveredDate = shipped;
      }
    }

    if (!deliveredDate) {
      deliveredDate = parseDate(order?.deliverDate);
    }

    if (!deliveredDate) {
      const ordered = parseDate(order?.orderDate);
      if (ordered) {
        ordered.setDate(ordered.getDate() + 7);
        deliveredDate = ordered;
      }
    }

    if (!deliveredDate) {
      return {
        canReturn: false,
        daysLeft: 0,
        message: 'Delivery date not available',
        expired: true,
        deliveryDateText: '',
        returnEndText: '',
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const delDate = new Date(deliveredDate);
    delDate.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - delDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const daysLeft = RETURN_WINDOW_DAYS - diffDays;

    const returnEnd = new Date(delDate);
    returnEnd.setDate(returnEnd.getDate() + RETURN_WINDOW_DAYS);

    if (daysLeft > 0) {
      return {
        canReturn: true,
        daysLeft,
        message: `Return available for ${daysLeft} more ${
          daysLeft === 1 ? 'day' : 'days'
        }`,
        expired: false,
        deliveryDateText: `Delivered on ${formatDate(delDate)}`,
        returnEndText: `Return till ${formatDate(returnEnd)}`,
      };
    }

    return {
      canReturn: false,
      daysLeft: 0,
      message: `${RETURN_WINDOW_DAYS}-day return window has expired`,
      expired: true,
      deliveryDateText: `Delivered on ${formatDate(delDate)}`,
      returnEndText: `Return window closed on ${formatDate(returnEnd)}`,
    };
  } catch (err) {
    console.error('Return info error:', err);
    return {
      canReturn: false,
      daysLeft: 0,
      message: 'Unable to calculate return window',
      expired: true,
      deliveryDateText: '',
      returnEndText: '',
    };
  }
};

const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { auth, orders } = useAppSelector((store: any) => store);

  const { orderItemId, orderId } = useParams();

  useEffect(() => {
    if (!orderItemId || !orderId) return;

    const jwt = auth?.jwt || localStorage.getItem('jwt') || '';

    dispatch(fetchOrderItemById({ orderItemId, jwt }) as any);
    dispatch(fetchOrderById({ orderId, jwt }) as any);
  }, [auth?.jwt, orderId, orderItemId, dispatch]);

  const handleReturnOrder = () => {
    if (!orderId) {
      alert('Order ID missing');
      return;
    }

    const o: any = orders;
    navigate(`/return/${orderId}`, {
      state: {
        orderItemId,
        productName: o?.orderItem?.product?.title || '',
        productImage: o?.orderItem?.product?.images?.[0] || '',
        sellerName:
          o?.currentOrder?.seller?.businessDetails?.businessName || '',
      },
    });
  };

  const handleCancelOrder = async () => {
    if (!orderId) return;

    const jwt = auth?.jwt || localStorage.getItem('jwt') || '';

    try {
      await dispatch(cancelOrder({ orderId, jwt }) as any).unwrap();
      alert('Order cancelled successfully');
      navigate('/account/orders');
    } catch (error) {
      console.error(error);
      alert('Failed to cancel order');
    }
  };

  if (orders?.loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        Loading order details...
      </div>
    );
  }

  if (!orders?.orderItem || !orders?.currentOrder) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        Order not available (maybe cancelled)
      </div>
    );
  }

  const orderItem: any = orders.orderItem;
  const currentOrder: any = orders.currentOrder;
  const returnInfo = getReturnInfo(currentOrder);
  const isCustom = !!orderItem?.customDesign?.enabled;

  const handleDownloadInvoice = async () => {
    try {
      const itemTotal =
        (orderItem?.sellingPrice || 0) * (orderItem?.quantity || 1);

      console.log('🔍 SELLER DEBUG:', {
        seller: currentOrder?.seller,
        pickupAddress: currentOrder?.seller?.pickupAddress,
        businessDetails: currentOrder?.seller?.businessDetails,
        GSTIN: currentOrder?.seller?.GSTIN,
      });

      await generateInvoice({
        orderId: currentOrder._id || orderId || '',
        orderDate: currentOrder.orderDate
          ? new Date(currentOrder.orderDate).toLocaleDateString('en-IN')
          : new Date().toLocaleDateString('en-IN'),
        orderStatus: currentOrder.orderStatus || '',
        paymentMethod:
          currentOrder.paymentMethod === 'COD'
            ? 'Cash on Delivery'
            : 'Online Payment',
        paymentStatus: currentOrder.paymentStatus || 'PENDING',
        awbNumber: currentOrder.trackingId || '',

        customer: {
          name: currentOrder.shippingAddress?.name || '',
          mobile: currentOrder.shippingAddress?.mobile || '',
          email: currentOrder.user?.email || '',
          address: currentOrder.shippingAddress?.address || '',
          city: currentOrder.shippingAddress?.city || '',
          state: currentOrder.shippingAddress?.state || '',
          pinCode: currentOrder.shippingAddress?.pinCode || '',
        },

        delivery: {
          name: currentOrder.shippingAddress?.name || '',
          mobile: currentOrder.shippingAddress?.mobile || '',
          address: currentOrder.shippingAddress?.address || '',
          city: currentOrder.shippingAddress?.city || '',
          state: currentOrder.shippingAddress?.state || '',
          pinCode: currentOrder.shippingAddress?.pinCode || '',
        },

        seller: {
          name:
            currentOrder?.seller?.businessDetails?.businessName ||
            currentOrder?.seller?.sellerName ||
            'SelfySnap Seller',

          email: currentOrder?.seller?.email || '',

          businessEmail:
            currentOrder?.seller?.businessDetails?.businessEmail ||
            currentOrder?.seller?.email ||
            '',

          address: currentOrder?.seller?.pickupAddress?.address || '',
          locality: currentOrder?.seller?.pickupAddress?.locality || '',
          city: currentOrder?.seller?.pickupAddress?.city || '',
          state: currentOrder?.seller?.pickupAddress?.state || '',
          pinCode: currentOrder?.seller?.pickupAddress?.pinCode || '',

          businessAddress:
            currentOrder?.seller?.businessDetails?.businessAddress || '',

          GSTIN:
            currentOrder?.seller?.GSTIN ||
            currentOrder?.seller?.businessDetails?.GSTIN ||
            '',
        } as any,

        items: [
          {
            title: orderItem?.product?.title || 'Product',
            size: orderItem?.size || 'FREE',
            quantity: orderItem?.quantity || 1,
            price: orderItem?.sellingPrice || 0,
            total: itemTotal,
            taxRate: 18,
          },
        ],

        subtotal: itemTotal,
        deliveryFee: 0,
        discount: 0,
        totalAmount: itemTotal,
      } as any);
    } catch (err) {
      console.error('Invoice error:', err);
      alert('Failed to generate invoice. Please try again.');
    }
  };

  return (
    <Box className="space-y-5">
      {/* Product Info */}
      <section className="flex flex-col gap-5 justify-center items-center">
        <div className="relative">
          <img
            className={`w-[100px] h-[100px] object-cover rounded shadow ${
              isCustom ? 'ring-2 ring-purple-400' : ''
            }`}
            src={getItemImage(orderItem)}
            alt={orderItem?.product?.title || 'Product'}
            onError={(e) => {
              (e.target as HTMLImageElement).src = buildUrl(
                orderItem?.product?.images?.[0]
              );
            }}
          />
          {isCustom && (
            <span className="absolute -top-1 -left-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              CUSTOM
            </span>
          )}
        </div>

        <div className="text-sm space-y-1 text-center">
          <h1 className="font-bold text-lg">
            {currentOrder?.seller?.businessDetails?.businessName ||
              orderItem?.product?.seller?.businessDetails?.businessName ||
              'SelfySnap'}
          </h1>

          <p className="text-gray-600">
            {orderItem?.product?.title || 'Product'}
          </p>

          {isCustom && (
            <p className="text-purple-600 text-xs font-semibold">
              🎨 Printed with your design
            </p>
          )}

          <p>
            <strong>Size:</strong> {orderItem?.size || 'FREE'} |{' '}
            <strong>Quantity:</strong> {orderItem?.quantity || 1}
          </p>
        </div>

        {currentOrder?.orderStatus === 'DELIVERED' && (
          <div className="w-full max-w-md">
            {returnInfo.deliveryDateText && (
              <div className="text-center mb-3">
                <p className="text-xs text-gray-500 font-semibold">
                  {returnInfo.deliveryDateText}
                </p>
                {returnInfo.returnEndText && (
                  <p
                    className={`text-xs font-semibold mt-1 ${
                      returnInfo.expired ? 'text-red-500' : 'text-green-600'
                    }`}
                  >
                    {returnInfo.returnEndText}
                  </p>
                )}
              </div>
            )}

            {returnInfo.canReturn ? (
              <div className="flex flex-col items-center gap-2">
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={handleReturnOrder}
                  fullWidth
                  sx={{ fontWeight: 'bold' }}
                >
                  Return Item
                </Button>
                <p className="text-xs text-green-600 font-semibold">
                  ⏱ {returnInfo.message}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Button
                  variant="outlined"
                  disabled
                  startIcon={<BlockIcon />}
                  fullWidth
                  sx={{
                    color: '#9ca3af !important',
                    borderColor: '#d1d5db !important',
                    fontWeight: 'bold',
                    bgcolor: '#f9fafb',
                  }}
                >
                  Return Disabled
                </Button>
                <p className="text-xs text-red-500 font-semibold text-center">
                  {returnInfo.message}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-4 flex-wrap justify-center">
          <Button
            variant="outlined"
            onClick={() =>
              navigate(`/reviews/${orderItem?.product?._id}/create`)
            }
          >
            Write Review
          </Button>
        </div>
      </section>

      {/* Order Tracking */}
      <section className="border p-5 rounded-md shadow-sm">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h1 className="font-bold">Order Tracking</h1>

          <div className="flex items-center gap-2">
            {currentOrder?.trackingLink && (
              <Button
                variant="text"
                size="small"
                href={fixTrackingLink(currentOrder.trackingLink)}
                target="_blank"
              >
                Track Order
              </Button>
            )}

            <Button
              variant="outlined"
              size="small"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadInvoice}
              sx={{
                borderColor: '#2874f0',
                color: '#2874f0',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#eff6ff',
                  borderColor: '#1e5fc4',
                },
              }}
            >
              Invoice
            </Button>
          </div>
        </div>

        <OrderStepper orderStatus={currentOrder?.orderStatus} />

        {currentOrder?.trackingId && (
          <p className="text-xs text-center text-gray-500 mt-2">
            Tracking ID: {currentOrder.trackingId}
          </p>
        )}
      </section>

      {/* Delivery Address */}
      <div className="border p-5 rounded-md shadow-sm">
        <h1 className="font-bold pb-3">Delivery Address</h1>

        <div className="text-sm space-y-2">
          <div className="flex gap-5 font-medium">
            <p>{currentOrder?.shippingAddress?.name || ''}</p>
            <Divider flexItem orientation="vertical" />
            <p>{currentOrder?.shippingAddress?.mobile || ''}</p>
          </div>

          <p>
            {currentOrder?.shippingAddress?.address || ''},{' '}
            {currentOrder?.shippingAddress?.city || ''},{' '}
            {currentOrder?.shippingAddress?.state || ''} -{' '}
            {currentOrder?.shippingAddress?.pinCode || ''}
          </p>
        </div>
      </div>

      {/* Payment */}
      <div className="border space-y-4 rounded-md shadow-sm">
        <div className="flex justify-between text-sm pt-5 px-5">
          <div>
            <p className="font-bold">Total Item Price</p>
          </div>

          <p className="font-medium">
            ₹ {(orderItem?.sellingPrice || 0) * (orderItem?.quantity || 0)}
          </p>
        </div>

        <div className="px-5">
          <div className="bg-orange-50 px-5 py-3 text-xs font-semibold flex justify-between rounded">
            <div className="flex items-center gap-3">
              <PaymentsIcon />
              <span>
                Payment Mode:{' '}
                {currentOrder?.paymentMethod === 'COD'
                  ? 'Cash on Delivery'
                  : 'Online'}
              </span>
            </div>

            {currentOrder?.paymentStatus === 'PAID' ? (
              <p className="text-green-600 font-bold">PAID</p>
            ) : (
              <p className="text-orange-600 font-bold">PENDING</p>
            )}
          </div>
        </div>

        <Divider />

        {['PENDING', 'PLACED', 'CONFIRMED'].includes(
          currentOrder?.orderStatus
        ) && (
          <div className="px-5 pb-5">
            <Button
              onClick={handleCancelOrder}
              color="error"
              variant="outlined"
              fullWidth
            >
              Cancel Order
            </Button>
          </div>
        )}
      </div>

      {/* Support */}
      <div className="border-2 border-blue-200 rounded-xl p-5 bg-gradient-to-r from-blue-50 to-white shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-blue-500 rounded-lg p-2">
            <SupportAgentIcon sx={{ color: 'white', fontSize: 22 }} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-base">
              SelfySnap Support
            </h3>
            <p className="text-xs text-gray-500">
              Have questions? We're here to help!
            </p>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <a
            href={`tel:+91${SUPPORT_PHONE_RAW}`}
            className="flex items-center gap-3 p-3 bg-white border border-blue-100 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
          >
            <div className="bg-green-500 rounded-full p-2">
              <PhoneIcon sx={{ color: 'white', fontSize: 18 }} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-semibold">
                Call Us (10 AM – 7 PM)
              </p>
              <p className="text-sm font-bold text-blue-600">
                {SUPPORT_PHONE}
              </p>
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
              CALL NOW
            </span>
          </a>
        </div>

        <p className="text-xs text-gray-500 text-center mt-3">
          For return, refund, or delivery issues — call us directly
        </p>
      </div>
    </Box>
  );
};

export default OrderDetails;