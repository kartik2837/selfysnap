// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   CircularProgress,
//   Chip,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogActions,
//   Button,
// } from "@mui/material";
// import DownloadIcon from "@mui/icons-material/Download";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import {
//   fetchMyServiceRequests,
//   createPaymentOrder,
//   verifyServicePayment,
//   completeServiceRequest,
// } from "../../../Redux Toolkit/Customer/ServiceRequestSlice";

// const statusColors: any = {
//   PENDING: "#f59e0b",
//   REJECTED: "#dc2626",
//   APPROVED: "#3b82f6",
//   PAID: "#10b981",
//   IN_PROGRESS: "#8b5cf6",
//   DELIVERED: "#06b6d4",
//   COMPLETED: "#16a34a",
// };

// const MyRequests = () => {
//   const dispatch = useAppDispatch();
//   const { serviceRequest } = useAppSelector((s: any) => s);

//   const [selected, setSelected] = useState<any>(null);
//   const [open, setOpen] = useState(false);
//   const [paying, setPaying] = useState(false);

//   useEffect(() => {
//     dispatch(fetchMyServiceRequests() as any);
//   }, [dispatch]);

//   /* ═══════════════════════════════════════════
//      🔥 RAZORPAY PAYMENT FLOW
//      ═══════════════════════════════════════════ */
//   const handlePay = async (req: any) => {
//     try {
//       setPaying(true);

//       // STEP 1: Backend se Razorpay order create karwao
//       const orderRes = await dispatch(
//         createPaymentOrder(req._id) as any
//       ).unwrap();

//       console.log("📦 Razorpay order:", orderRes);

//       // STEP 2: Razorpay SDK check
//       const RazorpaySDK = (window as any).Razorpay;
//       if (!RazorpaySDK) {
//         alert("Razorpay SDK not loaded. Please refresh the page.");
//         setPaying(false);
//         return;
//       }

//       // STEP 3: Razorpay modal open karo
//       const options = {
//         key: orderRes.keyId,
//         amount: orderRes.amount,
//         currency: orderRes.currency,
//         name: "SelfySnap Creative Studio",
//         description: req.serviceName,
//         order_id: orderRes.orderId,
//         theme: { color: "#6366f1" },
//         prefill: {
//           name: req.seller?.sellerName || req.seller?.fullName || "",
//           email: req.seller?.email || "",
//           contact: req.seller?.mobile || "",
//         },
//         handler: async function (response: any) {
//           console.log("✅ Razorpay response:", response);
//           try {
//             await dispatch(
//               verifyServicePayment({
//                 requestId: req._id,
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//               }) as any
//             ).unwrap();

//             alert("✅ Payment successful!");
//             setOpen(false);
//             setPaying(false);
//             dispatch(fetchMyServiceRequests() as any);
//           } catch (err: any) {
//             alert("❌ Payment verification failed: " + err);
//             setPaying(false);
//           }
//         },
//         modal: {
//           ondismiss: function () {
//             console.log("❌ Payment modal closed");
//             setPaying(false);
//           },
//         },
//       };

//       const razorpay = new RazorpaySDK(options);
//       razorpay.open();
//     } catch (err: any) {
//       alert("❌ " + err);
//       setPaying(false);
//     }
//   };

//   const handleComplete = async () => {
//     if (!selected) return;
//     const res = await dispatch(completeServiceRequest(selected._id) as any);
//     if (completeServiceRequest.fulfilled.match(res)) {
//       alert("✅ Marked complete!");
//       setOpen(false);
//       dispatch(fetchMyServiceRequests() as any);
//     }
//   };

//   const handleDownload = (file: any) => {
//     const link = document.createElement("a");
//     link.href = file.url;
//     link.download = file.originalName;
//     link.target = "_blank";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">📋 My Service Requests</h1>
//         <Link
//           to="/seller/creative-services"
//           className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold"
//         >
//           + New Request
//         </Link>
//       </div>

//       {serviceRequest.loading ? (
//         <div className="text-center py-10">
//           <CircularProgress />
//         </div>
//       ) : serviceRequest.myRequests?.length === 0 ? (
//         <div className="bg-white rounded-2xl p-10 text-center">
//           <p className="text-gray-500">No requests yet</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {serviceRequest.myRequests.map((r: any) => (
//             <div
//               key={r._id}
//               className="bg-white rounded-2xl shadow-md border overflow-hidden"
//             >
//               <div
//                 className="h-2"
//                 style={{ background: statusColors[r.status] }}
//               />
//               <div className="p-5 space-y-3">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-bold text-sm">{r.serviceName}</h3>
//                     <p className="text-xs text-gray-500 mt-1">{r.title}</p>
//                   </div>
//                   <Chip
//                     label={r.status}
//                     size="small"
//                     sx={{
//                       bgcolor: statusColors[r.status],
//                       color: "white",
//                       fontWeight: "bold",
//                       fontSize: 10,
//                     }}
//                   />
//                 </div>

//                 <div className="bg-gray-50 rounded-lg p-3">
//                   <p className="font-bold text-lg">
//                     {r.price > 0 ? `₹${r.price}` : "Price TBD"}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {new Date(r.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>

//                 {r.status === "APPROVED" && !r.isPaid && r.price > 0 && (
//                   <button
//                     onClick={() => handlePay(r)}
//                     disabled={paying}
//                     className="w-full py-2 rounded-lg font-bold text-white bg-green-600 disabled:opacity-50"
//                   >
//                     {paying ? "Processing..." : `💳 Pay ₹${r.price}`}
//                   </button>
//                 )}

//                 {r.status === "DELIVERED" && (
//                   <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-2 text-xs text-center text-cyan-700 font-bold">
//                     📁 Files ready — open to download
//                   </div>
//                 )}

//                 {r.status === "COMPLETED" && (
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-xs text-center text-green-700 font-bold">
//                     ✅ Completed
//                   </div>
//                 )}

//                 <button
//                   onClick={() => {
//                     setSelected(r);
//                     setOpen(true);
//                   }}
//                   className="w-full py-2 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-sm"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Detail Dialog */}
//       <Dialog
//         open={open}
//         onClose={() => setOpen(false)}
//         maxWidth="md"
//         fullWidth
//       >
//         {selected && (
//           <>
//             <DialogTitle>
//               {selected.serviceName} — {selected.title}
//             </DialogTitle>
//             <DialogContent>
//               <div className="space-y-3">
//                 <div className="bg-blue-50 rounded-lg p-3">
//                   <p className="text-sm font-semibold">
//                     {selected.description}
//                   </p>
//                   {selected.specificNotes && (
//                     <p className="text-xs mt-1 text-gray-600">
//                       Notes: {selected.specificNotes}
//                     </p>
//                   )}
//                 </div>

//                 <div className="bg-gray-50 rounded-lg p-3">
//                   <p className="text-sm font-bold">Status</p>
//                   <p
//                     className="font-bold"
//                     style={{ color: statusColors[selected.status] }}
//                   >
//                     {selected.status}
//                   </p>
//                   {selected.rejectionReason && (
//                     <p className="text-xs text-red-600 mt-1">
//                       Reason: {selected.rejectionReason}
//                     </p>
//                   )}
//                 </div>

//                 {selected.status === "APPROVED" && !selected.isPaid && (
//                   <button
//                     onClick={() => handlePay(selected)}
//                     disabled={paying}
//                     className="w-full py-3 rounded-xl font-bold text-white bg-green-600 disabled:opacity-50"
//                   >
//                     {paying ? "Processing..." : `💳 Pay ₹${selected.price}`}
//                   </button>
//                 )}

//                 {selected.files?.filter((f: any) => f.type === "delivery")
//                   .length > 0 && (
//                   <div>
//                     <p className="font-bold text-sm mb-2">
//                       📁 Delivered Files
//                     </p>
//                     {selected.files
//                       .filter((f: any) => f.type === "delivery")
//                       .map((f: any, i: number) => (
//                         <button
//                           key={i}
//                           onClick={() => handleDownload(f)}
//                           className="w-full p-3 bg-green-50 rounded-lg text-green-700 text-sm hover:bg-green-100 flex items-center gap-2 font-semibold text-left mb-2"
//                         >
//                           <DownloadIcon fontSize="small" />
//                           ⬇ {f.originalName}
//                         </button>
//                       ))}
//                     {selected.deliveryNote && (
//                       <p className="text-xs bg-gray-100 p-2 rounded mt-2">
//                         💬 {selected.deliveryNote}
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setOpen(false)}>Close</Button>
//               {selected.status === "DELIVERED" && (
//                 <Button
//                   color="success"
//                   variant="contained"
//                   onClick={handleComplete}
//                 >
//                   ✅ Mark Complete
//                 </Button>
//               )}
//             </DialogActions>
//           </>
//         )}
//       </Dialog>
//     </div>
//   );
// };

// export default MyRequests;








import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CircularProgress,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  fetchMyServiceRequests,
  createPaymentOrder,
  verifyServicePayment,
  completeServiceRequest,
} from "../../../Redux Toolkit/Customer/ServiceRequestSlice";
import { forceDownload } from "../../../util/downloadHelper";

const statusColors: any = {
  PENDING: "#f59e0b",
  REJECTED: "#dc2626",
  APPROVED: "#3b82f6",
  PAID: "#10b981",
  IN_PROGRESS: "#8b5cf6",
  DELIVERED: "#06b6d4",
  COMPLETED: "#16a34a",
};

const isImage = (filename: string) =>
  /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(filename);

const isZip = (filename: string) =>
  /\.(zip|rar|7z|tar|gz)$/i.test(filename);

const MyRequests = () => {
  const dispatch = useAppDispatch();
  const { serviceRequest } = useAppSelector((s: any) => s);

  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    dispatch(fetchMyServiceRequests() as any);
  }, [dispatch]);

  const handlePay = async (req: any) => {
    try {
      setPaying(true);
      const orderRes = await dispatch(createPaymentOrder(req._id) as any).unwrap();
      console.log("📦 Razorpay order:", orderRes);

      const RazorpaySDK = (window as any).Razorpay;
      if (!RazorpaySDK) {
        alert("Razorpay SDK not loaded. Please refresh the page.");
        setPaying(false);
        return;
      }

      const options = {
        key: orderRes.keyId,
        amount: orderRes.amount,
        currency: orderRes.currency,
        name: "SelfySnap Creative Studio",
        description: req.serviceName,
        order_id: orderRes.orderId,
        theme: { color: "#6366f1" },
        prefill: {
          name: req.seller?.sellerName || req.seller?.fullName || "",
          email: req.seller?.email || "",
          contact: req.seller?.mobile || "",
        },
        handler: async function (response: any) {
          try {
            await dispatch(
              verifyServicePayment({
                requestId: req._id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }) as any
            ).unwrap();

            alert("✅ Payment successful!");
            setOpen(false);
            setPaying(false);
            dispatch(fetchMyServiceRequests() as any);
          } catch (err: any) {
            alert("❌ Payment verification failed: " + err);
            setPaying(false);
          }
        },
        modal: {
          ondismiss: function () {
            console.log("❌ Payment modal closed");
            setPaying(false);
          },
        },
      };

      const razorpay = new RazorpaySDK(options);
      razorpay.open();
    } catch (err: any) {
      alert("❌ " + err);
      setPaying(false);
    }
  };

  const handleComplete = async () => {
    if (!selected) return;
    const res = await dispatch(completeServiceRequest(selected._id) as any);
    if (completeServiceRequest.fulfilled.match(res)) {
      alert("✅ Marked complete!");
      setOpen(false);
      dispatch(fetchMyServiceRequests() as any);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📋 My Service Requests</h1>
        <Link
          to="/seller/creative-services"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold"
        >
          + New Request
        </Link>
      </div>

      {serviceRequest.loading ? (
        <div className="text-center py-10">
          <CircularProgress />
        </div>
      ) : serviceRequest.myRequests?.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center">
          <p className="text-gray-500">No requests yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceRequest.myRequests.map((r: any) => (
            <div
              key={r._id}
              className="bg-white rounded-2xl shadow-md border overflow-hidden"
            >
              <div className="h-2" style={{ background: statusColors[r.status] }} />
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm">{r.serviceName}</h3>
                    <p className="text-xs text-gray-500 mt-1">{r.title}</p>
                  </div>
                  <Chip
                    label={r.status}
                    size="small"
                    sx={{
                      bgcolor: statusColors[r.status],
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 10,
                    }}
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-bold text-lg">
                    {r.price > 0 ? `₹${r.price}` : "Price TBD"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {r.status === "APPROVED" && !r.isPaid && r.price > 0 && (
                  <button
                    onClick={() => handlePay(r)}
                    disabled={paying}
                    className="w-full py-2 rounded-lg font-bold text-white bg-green-600 disabled:opacity-50"
                  >
                    {paying ? "Processing..." : `💳 Pay ₹${r.price}`}
                  </button>
                )}

                {r.status === "DELIVERED" && (
                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-2 text-xs text-center text-cyan-700 font-bold">
                    📁 Files ready — open to download
                  </div>
                )}

                {r.status === "COMPLETED" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-xs text-center text-green-700 font-bold">
                    ✅ Completed
                  </div>
                )}

                <button
                  onClick={() => {
                    setSelected(r);
                    setOpen(true);
                  }}
                  className="w-full py-2 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        {selected && (
          <>
            <DialogTitle>
              {selected.serviceName} — {selected.title}
            </DialogTitle>
            <DialogContent>
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm font-semibold">{selected.description}</p>
                  {selected.specificNotes && (
                    <p className="text-xs mt-1 text-gray-600">
                      Notes: {selected.specificNotes}
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-bold">Status</p>
                  <p
                    className="font-bold"
                    style={{ color: statusColors[selected.status] }}
                  >
                    {selected.status}
                  </p>
                  {selected.rejectionReason && (
                    <p className="text-xs text-red-600 mt-1">
                      Reason: {selected.rejectionReason}
                    </p>
                  )}
                </div>

                {selected.status === "APPROVED" && !selected.isPaid && (
                  <button
                    onClick={() => handlePay(selected)}
                    disabled={paying}
                    className="w-full py-3 rounded-xl font-bold text-white bg-green-600 disabled:opacity-50"
                  >
                    {paying ? "Processing..." : `💳 Pay ₹${selected.price}`}
                  </button>
                )}

                {/* YOUR REFERENCE FILES */}
                {selected.files?.filter((f: any) => f.type === "reference").length > 0 && (
                  <div className="bg-indigo-50 rounded-lg p-3">
                    <p className="font-bold text-sm mb-2">📎 Your Reference Files</p>
                    <div className="flex flex-wrap gap-3">
                      {selected.files
                        .filter((f: any) => f.type === "reference")
                        .map((f: any, i: number) => (
                          <div key={i}>
                            {isImage(f.originalName) ? (
                              <div className="relative">
                                <img
                                  src={f.url}
                                  alt={f.originalName}
                                  className="w-24 h-24 object-cover rounded border-2 border-white shadow cursor-pointer"
                                  onClick={() => window.open(f.url, "_blank")}
                                />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    forceDownload(f.url, f.originalName);
                                  }}
                                  className="absolute bottom-1 right-1 bg-indigo-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow hover:bg-indigo-700 text-xs"
                                  title="Download"
                                >
                                  ⬇
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => forceDownload(f.url, f.originalName)}
                                className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded border-2 border-gray-200 hover:border-indigo-400 text-xs text-gray-600 p-1"
                              >
                                <span className="text-2xl">
                                  {isZip(f.originalName) ? "📦" : "📄"}
                                </span>
                                <span className="truncate w-full text-center mt-1 font-semibold text-[10px]">
                                  {f.originalName}
                                </span>
                                <span className="text-indigo-600 text-[10px] mt-0.5 font-bold">
                                  ⬇ Download
                                </span>
                              </button>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* DELIVERED FILES */}
                {selected.files?.filter((f: any) => f.type === "delivery").length > 0 && (
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="font-bold text-sm mb-2">📁 Delivered Files</p>

                    {/* Image previews */}
                    {selected.files.filter((f: any) => f.type === "delivery" && isImage(f.originalName)).length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-600 mb-2 font-semibold">Images:</p>
                        <div className="flex flex-wrap gap-3">
                          {selected.files
                            .filter((f: any) => f.type === "delivery" && isImage(f.originalName))
                            .map((f: any, i: number) => (
                              <div key={i} className="relative">
                                <img
                                  src={f.url}
                                  alt={f.originalName}
                                  className="w-28 h-28 object-cover rounded-lg border-2 border-white shadow cursor-pointer"
                                  onClick={() => window.open(f.url, "_blank")}
                                />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    forceDownload(f.url, f.originalName);
                                  }}
                                  className="absolute bottom-1 right-1 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-green-700"
                                  title="Download"
                                >
                                  ⬇
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Non-image files */}
                    {selected.files.filter((f: any) => f.type === "delivery" && !isImage(f.originalName)).length > 0 && (
                      <div>
                        <p className="text-xs text-gray-600 mb-2 font-semibold">Files:</p>
                        {selected.files
                          .filter((f: any) => f.type === "delivery" && !isImage(f.originalName))
                          .map((f: any, i: number) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => forceDownload(f.url, f.originalName)}
                              className="w-full p-3 bg-white rounded-lg text-green-700 text-sm hover:bg-green-100 flex items-center gap-2 font-semibold text-left mb-2 border border-green-200"
                            >
                              {isZip(f.originalName) ? (
                                <span className="text-xl">📦</span>
                              ) : (
                                <DownloadIcon fontSize="small" />
                              )}
                              <div className="flex-1">
                                <p className="truncate">{f.originalName}</p>
                                {f.size && (
                                  <p className="text-xs text-gray-500">
                                    {(f.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                )}
                              </div>
                              <span className="text-green-600 font-bold">⬇</span>
                            </button>
                          ))}
                      </div>
                    )}

                    {selected.deliveryNote && (
                      <p className="text-xs bg-white p-2 rounded mt-2 border border-green-200">
                        💬 {selected.deliveryNote}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Close</Button>
              {selected.status === "DELIVERED" && (
                <Button color="success" variant="contained" onClick={handleComplete}>
                   Mark Complete
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default MyRequests;