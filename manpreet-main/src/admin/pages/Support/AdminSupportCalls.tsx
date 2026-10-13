// import { useEffect, useState } from "react";
// import {
//   CircularProgress,
//   Chip,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogActions,
//   TextField,
// } from "@mui/material";
// import CallIcon from "@mui/icons-material/Call";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import {
//   fetchAllSupportCalls,
//   fetchSupportCallStats,
//   acknowledgeCall,
//   startCallAction,
//   resolveCall,
//   markMissed,
// } from "../../../Redux Toolkit/Seller/supportCallSlice";
// import { useSocket } from "../../../hooks/useSocket";

// const statusColors: any = {
//   PENDING: "#f59e0b",
//   ACKNOWLEDGED: "#3b82f6",
//   CALLING: "#8b5cf6",
//   RESOLVED: "#16a34a",
//   MISSED: "#dc2626",
// };

// const priorityColors: any = {
//   LOW: "#94a3b8",
//   MEDIUM: "#3b82f6",
//   HIGH: "#f97316",
//   URGENT: "#dc2626",
// };

// const FILTERS = ["all", "PENDING", "ACKNOWLEDGED", "CALLING", "RESOLVED", "MISSED"];

// const AdminSupportCalls = () => {
//   const dispatch = useAppDispatch();
//   const { supportCall, auth } = useAppSelector((s: any) => s);
//   const socket = useSocket();

//   const [filter, setFilter] = useState("all");
//   const [selected, setSelected] = useState<any>(null);
//   const [open, setOpen] = useState(false);
//   const [resolutionNote, setResolutionNote] = useState("");
//   const [incomingCall, setIncomingCall] = useState<any>(null);
//   const [liveDialogOpen, setLiveDialogOpen] = useState(false);

//   /* 🔥 Join admin room & listen */
//   useEffect(() => {
//     if (!socket) return;

//     const adminId = auth?.user?._id || auth?.user?.id;
//     if (adminId) socket.emit("join_admin", adminId);

//     socket.on("new_support_call", (data: any) => {
//       console.log("📢 [LIVE] New call:", data);
//       setIncomingCall(data.call);
//       setLiveDialogOpen(true);

//       // Play sound
//       try {
//         const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
//         audio.volume = 1.0;
//         audio.play().catch((e) => console.log("Audio blocked:", e.message));
//       } catch (err) {}

//       // Refresh
//       dispatch(fetchAllSupportCalls(filter === "all" ? undefined : filter) as any);
//       dispatch(fetchSupportCallStats() as any);

//       // Browser notification
//       if (Notification.permission === "granted") {
//         new Notification("📞 New Support Call!", {
//           body: `${data.call.sellerName}: ${data.call.subject}`,
//         });
//       }
//     });

//     return () => socket.off("new_support_call");
//   }, [socket, auth, filter, dispatch]);

//   useEffect(() => {
//     if (Notification.permission === "default") Notification.requestPermission();
//   }, []);

//   useEffect(() => {
//     dispatch(fetchAllSupportCalls(filter === "all" ? undefined : filter) as any);
//     dispatch(fetchSupportCallStats() as any);
//   }, [filter, dispatch]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       dispatch(fetchAllSupportCalls(filter === "all" ? undefined : filter) as any);
//     }, 30000);
//     return () => clearInterval(interval);
//   }, [filter, dispatch]);

//   const handleAcknowledge = async () => {
//     await dispatch(acknowledgeCall(selected._id) as any);
//     setOpen(false);
//     dispatch(fetchAllSupportCalls(filter === "all" ? undefined : filter) as any);
//   };

//   const handleCall = async (callObj?: any) => {
//     const call = callObj || selected;
//     await dispatch(startCallAction(call._id) as any);
//     window.open(`tel:${call.sellerMobile}`);
//     setOpen(false);
//     setLiveDialogOpen(false);
//     setIncomingCall(null);
//     dispatch(fetchAllSupportCalls(filter === "all" ? undefined : filter) as any);
//   };

//   const handleResolve = async () => {
//     await dispatch(resolveCall({ id: selected._id, note: resolutionNote }) as any);
//     setResolutionNote("");
//     setOpen(false);
//     dispatch(fetchAllSupportCalls(filter === "all" ? undefined : filter) as any);
//   };

//   const handleMissed = async () => {
//     await dispatch(
//       markMissed({ id: selected._id, note: resolutionNote || "Not reachable" }) as any
//     );
//     setResolutionNote("");
//     setOpen(false);
//     dispatch(fetchAllSupportCalls(filter === "all" ? undefined : filter) as any);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-2">📞 Support Calls</h1>
//       <p className="text-gray-500 mb-6">Live seller requests — respond instantly</p>

//       <div className="mb-4 flex items-center gap-2">
//         <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
//         <span className="text-xs font-bold text-green-700">LIVE — Listening</span>
//       </div>

//       {/* Stats */}
//       {supportCall.stats && (
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//             <p className="text-xs text-yellow-800 font-semibold">PENDING</p>
//             <p className="text-2xl font-bold text-yellow-900">{supportCall.stats.pending || 0}</p>
//           </div>
//           <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
//             <p className="text-xs text-purple-800 font-semibold">CALLING</p>
//             <p className="text-2xl font-bold text-purple-900">{supportCall.stats.calling || 0}</p>
//           </div>
//           <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//             <p className="text-xs text-green-800 font-semibold">RESOLVED TODAY</p>
//             <p className="text-2xl font-bold text-green-900">{supportCall.stats.resolvedToday || 0}</p>
//           </div>
//         </div>
//       )}

//       {/* Filters */}
//       <div className="flex gap-2 mb-4 flex-wrap">
//         {FILTERS.map((f) => (
//           <button
//             key={f}
//             onClick={() => setFilter(f)}
//             className={`px-4 py-1.5 rounded-full text-xs font-bold ${
//               filter === f ? "bg-indigo-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             {f}
//           </button>
//         ))}
//       </div>

//       {/* Table */}
//       {supportCall.loading ? (
//         <div className="text-center py-10"><CircularProgress /></div>
//       ) : supportCall.allCalls?.length === 0 ? (
//         <div className="bg-white rounded-2xl p-10 text-center">
//           <p className="text-gray-500">No support calls</p>
//         </div>
//       ) : (
//         <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-slate-900 text-white">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs uppercase">Seller</th>
//                 <th className="px-4 py-3 text-left text-xs uppercase">Subject</th>
//                 <th className="px-4 py-3 text-center text-xs uppercase">Priority</th>
//                 <th className="px-4 py-3 text-center text-xs uppercase">Status</th>
//                 <th className="px-4 py-3 text-center text-xs uppercase">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {supportCall.allCalls.map((c: any) => (
//                 <tr
//                   key={c._id}
//                   className={`border-b hover:bg-indigo-50 ${
//                     c.priority === "URGENT" && c.status === "PENDING" ? "bg-red-50" : ""
//                   }`}
//                 >
//                   <td className="px-4 py-3">
//                     <p className="font-bold text-sm">{c.seller?.sellerName || c.sellerName}</p>
//                     <p className="text-xs text-gray-500">📞 {c.sellerMobile}</p>
//                   </td>
//                   <td className="px-4 py-3">
//                     <p className="text-sm">{c.subject}</p>
//                     <p className="text-xs text-gray-500">{c.category}</p>
//                   </td>
//                   <td className="px-4 py-3 text-center">
//                     <Chip label={c.priority} size="small" sx={{ bgcolor: priorityColors[c.priority], color: "white", fontWeight: "bold", fontSize: 10 }} />
//                   </td>
//                   <td className="px-4 py-3 text-center">
//                     <Chip label={c.status} size="small" sx={{ bgcolor: statusColors[c.status], color: "white", fontWeight: "bold", fontSize: 10 }} />
//                   </td>
//                   <td className="px-4 py-3 text-center">
//                     <Button
//                       size="small"
//                       variant="contained"
//                       onClick={() => { setSelected(c); setOpen(true); }}
//                       sx={{ textTransform: "none", bgcolor: c.status === "PENDING" ? "#dc2626" : "#6366f1" }}
//                     >
//                       {c.status === "PENDING" ? "URGENT" : "Open"}
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Live Popup */}
//       <Dialog open={liveDialogOpen} onClose={() => setLiveDialogOpen(false)} maxWidth="xs" fullWidth>
//         <DialogContent sx={{ textAlign: "center", py: 4 }}>
//           <div className="animate-bounce mb-3">
//             <NotificationsActiveIcon sx={{ fontSize: 60, color: "#dc2626" }} />
//           </div>
//           <p className="text-red-600 font-bold text-lg mb-1">NEW SUPPORT CALL</p>
//           <p className="text-xs text-gray-500 mb-4">{incomingCall?.priority} PRIORITY</p>

//           <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
//             <p className="font-bold text-base">{incomingCall?.seller?.sellerName || incomingCall?.sellerName}</p>
//             <p className="text-lg font-bold text-red-700 mt-1">📞 {incomingCall?.sellerMobile}</p>
//             <p className="text-xs text-gray-600 mt-2">{incomingCall?.subject}</p>
//           </div>

//           <div className="flex gap-2">
//             <Button fullWidth variant="outlined" color="error" onClick={() => setLiveDialogOpen(false)}>Later</Button>
//             <Button
//               fullWidth
//               variant="contained"
//               color="success"
//               startIcon={<CallIcon />}
//               onClick={() => handleCall(incomingCall)}
//               sx={{ background: "linear-gradient(to right, #16a34a, #22c55e)", fontWeight: "bold" }}
//             >
//               CALL NOW
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Detail Dialog */}
//       <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
//         {selected && (
//           <>
//             <DialogTitle>
//               <div className="flex items-center justify-between">
//                 <span className="font-bold">{selected.subject}</span>
//                 <Chip label={selected.priority} size="small" sx={{ bgcolor: priorityColors[selected.priority], color: "white", fontWeight: "bold" }} />
//               </div>
//             </DialogTitle>
//             <DialogContent>
//               <div className="space-y-4">
//                 <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
//                   <p className="font-bold text-sm mb-2">Seller Information</p>
//                   <p className="text-sm font-semibold">{selected.seller?.sellerName || selected.sellerName}</p>
//                   <p className="text-xs text-gray-600">📧 {selected.seller?.email}</p>
//                   <p className="text-lg font-bold text-indigo-700 mt-2">📞 {selected.sellerMobile}</p>
//                 </div>

//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="font-bold text-sm mb-1">Issue Description</p>
//                   <p className="text-sm text-gray-700">{selected.description || "No description"}</p>
//                   <p className="text-xs text-gray-500 mt-3">Category: <b>{selected.category}</b></p>
//                   <p className="text-xs text-gray-500">Requested: {new Date(selected.createdAt).toLocaleString()}</p>
//                 </div>

//                 {["CALLING", "ACKNOWLEDGED"].includes(selected.status) && (
//                   <TextField
//                     fullWidth
//                     multiline
//                     rows={2}
//                     label="Resolution / Notes"
//                     value={resolutionNote}
//                     onChange={(e) => setResolutionNote(e.target.value)}
//                   />
//                 )}
//               </div>
//             </DialogContent>

//             <DialogActions sx={{ p: 2, gap: 1 }}>
//               <Button onClick={() => setOpen(false)}>Close</Button>

//               {selected.status === "PENDING" && (
//                 <>
//                   <Button color="warning" variant="outlined" onClick={handleAcknowledge}>Acknowledge</Button>
//                   <Button color="success" variant="contained" startIcon={<CallIcon />} onClick={() => handleCall(selected)}>Call Now</Button>
//                 </>
//               )}

//               {selected.status === "ACKNOWLEDGED" && (
//                 <Button color="success" variant="contained" startIcon={<CallIcon />} onClick={() => handleCall(selected)}>Call Now</Button>
//               )}

//               {selected.status === "CALLING" && (
//                 <>
//                   <Button color="error" variant="outlined" startIcon={<CancelIcon />} onClick={handleMissed}>Missed</Button>
//                   <Button color="success" variant="contained" startIcon={<CheckCircleIcon />} onClick={handleResolve}>Resolved</Button>
//                 </>
//               )}
//             </DialogActions>
//           </>
//         )}
//       </Dialog>
//     </div>
//   );
// };

// export default AdminSupportCalls;







// import { useEffect, useState } from "react";
// import {
//   CircularProgress,
//   Chip,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogActions,
//   TextField,
// } from "@mui/material";
// import CallIcon from "@mui/icons-material/Call";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import {
//   fetchAllSupportCalls,
//   fetchSupportCallStats,
//   acknowledgeCall,
//   startCallAction,
//   resolveCall,
//   markMissed,
// } from "../../../Redux Toolkit/Seller/supportCallSlice";
// import { useSocket } from "../../../hooks/useSocket";

// const statusColors: any = {
//   PENDING: "#f59e0b",
//   ACKNOWLEDGED: "#3b82f6",
//   CALLING: "#8b5cf6",
//   RESOLVED: "#16a34a",
//   MISSED: "#dc2626",
// };

// const priorityColors: any = {
//   LOW: "#94a3b8",
//   MEDIUM: "#3b82f6",
//   HIGH: "#f97316",
//   URGENT: "#dc2626",
// };

// const FILTERS = ["all", "PENDING", "ACKNOWLEDGED", "CALLING", "RESOLVED", "MISSED"];

// const AdminSupportCalls = () => {
//   const dispatch = useAppDispatch();

//   /* Specific selectors — no re-render warning */
//   const supportCall = useAppSelector((s: any) => s.supportCall);
//   const auth = useAppSelector((s: any) => s.auth);

//   const socket = useSocket();

//   const [filter, setFilter] = useState("all");
//   const [selected, setSelected] = useState<any>(null);
//   const [open, setOpen] = useState(false);
//   const [resolutionNote, setResolutionNote] = useState("");
//   const [incomingCall, setIncomingCall] = useState<any>(null);
//   const [liveDialogOpen, setLiveDialogOpen] = useState(false);

//   /* ═══════════════════════════════════════════
//      SOCKET — Join admin room & listen
//      ═══════════════════════════════════════════ */
//   useEffect(() => {
//     if (!socket) return;

//     const adminId = auth?.user?._id || auth?.user?.id;
//     if (adminId) {
//       socket.emit("join_admin", adminId);
//       console.log("✅ [ADMIN] Joined admin_room:", adminId);
//     }

//     /* Named handler for proper cleanup */
//     const handleNewCall = (data: any) => {
//       console.log("📢 [LIVE] New call:", data);

//       setIncomingCall(data.call);
//       setLiveDialogOpen(true);

//       // Play sound
//       try {
//         const audio = new Audio(
//           "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
//         );
//         audio.volume = 1.0;
//         audio.play().catch((e: any) =>
//           console.log("Audio blocked:", e?.message)
//         );
//       } catch (err) {
//         console.log("Audio error:", err);
//       }

//       // Refresh data
//       dispatch(
//         fetchAllSupportCalls(filter === "all" ? undefined : filter) as any
//       );
//       dispatch(fetchSupportCallStats() as any);

//       // Browser notification
//       if (
//         "Notification" in window &&
//         Notification.permission === "granted"
//       ) {
//         new Notification("📞 New Support Call!", {
//           body: `${data.call.sellerName}: ${data.call.subject}`,
//         });
//       }
//     };

//     socket.on("new_support_call", handleNewCall);

//     // Cleanup specific handler only
//     return () => {
//       socket.off("new_support_call", handleNewCall);
//     };
//   }, [socket, auth, filter, dispatch]);

//   /* Request notification permission */
//   useEffect(() => {
//     if (
//       "Notification" in window &&
//       Notification.permission === "default"
//     ) {
//       Notification.requestPermission();
//     }
//   }, []);

//   /* Initial load */
//   useEffect(() => {
//     dispatch(fetchAllSupportCalls(filter === "all" ? undefined : filter) as any);
//     dispatch(fetchSupportCallStats() as any);
//   }, [filter, dispatch]);

//   /* Auto refresh every 30s */
//   useEffect(() => {
//     const interval = setInterval(() => {
//       dispatch(
//         fetchAllSupportCalls(filter === "all" ? undefined : filter) as any
//       );
//     }, 30000);
//     return () => clearInterval(interval);
//   }, [filter, dispatch]);

//   /* ═══════════════════════════════════════════
//      ACTIONS
//      ═══════════════════════════════════════════ */
//   const handleAcknowledge = async () => {
//     await dispatch(acknowledgeCall(selected._id) as any);
//     setOpen(false);
//     dispatch(fetchAllSupportCalls(filter === "all" ? undefined : filter) as any);
//   };

//   const handleCall = async (callObj?: any) => {
//     const call = callObj || selected;
//     await dispatch(startCallAction(call._id) as any);
//     window.open(`tel:${call.sellerMobile}`);
//     setOpen(false);
//     setLiveDialogOpen(false);
//     setIncomingCall(null);
//     dispatch(fetchAllSupportCalls(filter === "all" ? undefined : filter) as any);
//   };

//   const handleResolve = async () => {
//     await dispatch(
//       resolveCall({ id: selected._id, note: resolutionNote }) as any
//     );
//     setResolutionNote("");
//     setOpen(false);
//     dispatch(fetchAllSupportCalls(filter === "all" ? undefined : filter) as any);
//   };

//   const handleMissed = async () => {
//     await dispatch(
//       markMissed({
//         id: selected._id,
//         note: resolutionNote || "Not reachable",
//       }) as any
//     );
//     setResolutionNote("");
//     setOpen(false);
//     dispatch(fetchAllSupportCalls(filter === "all" ? undefined : filter) as any);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-2">📞 Support Calls</h1>
//       <p className="text-gray-500 mb-6">
//         Live seller requests — respond instantly
//       </p>

//       <div className="mb-4 flex items-center gap-2">
//         <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
//         <span className="text-xs font-bold text-green-700">
//           LIVE — Listening
//         </span>
//       </div>

//       {/* Stats */}
//       {supportCall?.stats && (
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//             <p className="text-xs text-yellow-800 font-semibold">PENDING</p>
//             <p className="text-2xl font-bold text-yellow-900">
//               {supportCall.stats.pending || 0}
//             </p>
//           </div>
//           <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
//             <p className="text-xs text-purple-800 font-semibold">CALLING</p>
//             <p className="text-2xl font-bold text-purple-900">
//               {supportCall.stats.calling || 0}
//             </p>
//           </div>
//           <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//             <p className="text-xs text-green-800 font-semibold">
//               RESOLVED TODAY
//             </p>
//             <p className="text-2xl font-bold text-green-900">
//               {supportCall.stats.resolvedToday || 0}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Filters */}
//       <div className="flex gap-2 mb-4 flex-wrap">
//         {FILTERS.map((f) => (
//           <button
//             key={f}
//             onClick={() => setFilter(f)}
//             className={`px-4 py-1.5 rounded-full text-xs font-bold ${
//               filter === f ? "bg-indigo-600 text-white" : "bg-gray-200"
//             }`}
//           >
//             {f}
//           </button>
//         ))}
//       </div>

//       {/* Table */}
//       {supportCall?.loading ? (
//         <div className="text-center py-10">
//           <CircularProgress />
//         </div>
//       ) : supportCall?.allCalls?.length === 0 ? (
//         <div className="bg-white rounded-2xl p-10 text-center">
//           <p className="text-gray-500">No support calls</p>
//         </div>
//       ) : (
//         <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-slate-900 text-white">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs uppercase">
//                   Seller
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs uppercase">
//                   Subject
//                 </th>
//                 <th className="px-4 py-3 text-center text-xs uppercase">
//                   Priority
//                 </th>
//                 <th className="px-4 py-3 text-center text-xs uppercase">
//                   Status
//                 </th>
//                 <th className="px-4 py-3 text-center text-xs uppercase">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {supportCall.allCalls.map((c: any) => (
//                 <tr
//                   key={c._id}
//                   className={`border-b hover:bg-indigo-50 ${
//                     c.priority === "URGENT" && c.status === "PENDING"
//                       ? "bg-red-50"
//                       : ""
//                   }`}
//                 >
//                   <td className="px-4 py-3">
//                     <p className="font-bold text-sm">
//                       {c.seller?.sellerName || c.sellerName}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       📞 {c.sellerMobile}
//                     </p>
//                   </td>
//                   <td className="px-4 py-3">
//                     <p className="text-sm">{c.subject}</p>
//                     <p className="text-xs text-gray-500">{c.category}</p>
//                   </td>
//                   <td className="px-4 py-3 text-center">
//                     <Chip
//                       label={c.priority}
//                       size="small"
//                       sx={{
//                         bgcolor: priorityColors[c.priority],
//                         color: "white",
//                         fontWeight: "bold",
//                         fontSize: 10,
//                       }}
//                     />
//                   </td>
//                   <td className="px-4 py-3 text-center">
//                     <Chip
//                       label={c.status}
//                       size="small"
//                       sx={{
//                         bgcolor: statusColors[c.status],
//                         color: "white",
//                         fontWeight: "bold",
//                         fontSize: 10,
//                       }}
//                     />
//                   </td>
//                   <td className="px-4 py-3 text-center">
//                     <Button
//                       size="small"
//                       variant="contained"
//                       onClick={() => {
//                         setSelected(c);
//                         setOpen(true);
//                       }}
//                       sx={{
//                         textTransform: "none",
//                         bgcolor:
//                           c.status === "PENDING" ? "#dc2626" : "#6366f1",
//                       }}
//                     >
//                       {c.status === "PENDING" ? "URGENT" : "Open"}
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Live Popup */}
//       <Dialog
//         open={liveDialogOpen}
//         onClose={() => setLiveDialogOpen(false)}
//         maxWidth="xs"
//         fullWidth
//       >
//         <DialogContent sx={{ textAlign: "center", py: 4 }}>
//           <div className="animate-bounce mb-3">
//             <NotificationsActiveIcon
//               sx={{ fontSize: 60, color: "#dc2626" }}
//             />
//           </div>
//           <p className="text-red-600 font-bold text-lg mb-1">
//             NEW SUPPORT CALL
//           </p>
//           <p className="text-xs text-gray-500 mb-4">
//             {incomingCall?.priority} PRIORITY
//           </p>

//           <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
//             <p className="font-bold text-base">
//               {incomingCall?.seller?.sellerName || incomingCall?.sellerName}
//             </p>
//             <p className="text-lg font-bold text-red-700 mt-1">
//               📞 {incomingCall?.sellerMobile}
//             </p>
//             <p className="text-xs text-gray-600 mt-2">
//               {incomingCall?.subject}
//             </p>
//           </div>

//           <div className="flex gap-2">
//             <Button
//               fullWidth
//               variant="outlined"
//               color="error"
//               onClick={() => setLiveDialogOpen(false)}
//             >
//               Later
//             </Button>
//             <Button
//               fullWidth
//               variant="contained"
//               color="success"
//               startIcon={<CallIcon />}
//               onClick={() => handleCall(incomingCall)}
//               sx={{
//                 background: "linear-gradient(to right, #16a34a, #22c55e)",
//                 fontWeight: "bold",
//               }}
//             >
//               CALL NOW
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Detail Dialog */}
//       <Dialog
//         open={open}
//         onClose={() => setOpen(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         {selected && (
//           <>
//             <DialogTitle>
//               <div className="flex items-center justify-between">
//                 <span className="font-bold">{selected.subject}</span>
//                 <Chip
//                   label={selected.priority}
//                   size="small"
//                   sx={{
//                     bgcolor: priorityColors[selected.priority],
//                     color: "white",
//                     fontWeight: "bold",
//                   }}
//                 />
//               </div>
//             </DialogTitle>
//             <DialogContent>
//               <div className="space-y-4">
//                 <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
//                   <p className="font-bold text-sm mb-2">Seller Information</p>
//                   <p className="text-sm font-semibold">
//                     {selected.seller?.sellerName || selected.sellerName}
//                   </p>
//                   <p className="text-xs text-gray-600">
//                     📧 {selected.seller?.email}
//                   </p>
//                   <p className="text-lg font-bold text-indigo-700 mt-2">
//                     📞 {selected.sellerMobile}
//                   </p>
//                 </div>

//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="font-bold text-sm mb-1">
//                     Issue Description
//                   </p>
//                   <p className="text-sm text-gray-700">
//                     {selected.description || "No description"}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-3">
//                     Category: <b>{selected.category}</b>
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     Requested: {new Date(selected.createdAt).toLocaleString()}
//                   </p>
//                 </div>

//                 {["CALLING", "ACKNOWLEDGED"].includes(selected.status) && (
//                   <TextField
//                     fullWidth
//                     multiline
//                     rows={2}
//                     label="Resolution / Notes"
//                     value={resolutionNote}
//                     onChange={(e) => setResolutionNote(e.target.value)}
//                   />
//                 )}
//               </div>
//             </DialogContent>

//             <DialogActions sx={{ p: 2, gap: 1 }}>
//               <Button onClick={() => setOpen(false)}>Close</Button>

//               {selected.status === "PENDING" && (
//                 <>
//                   <Button
//                     color="warning"
//                     variant="outlined"
//                     onClick={handleAcknowledge}
//                   >
//                     Acknowledge
//                   </Button>
//                   <Button
//                     color="success"
//                     variant="contained"
//                     startIcon={<CallIcon />}
//                     onClick={() => handleCall(selected)}
//                   >
//                     Call Now
//                   </Button>
//                 </>
//               )}

//               {selected.status === "ACKNOWLEDGED" && (
//                 <Button
//                   color="success"
//                   variant="contained"
//                   startIcon={<CallIcon />}
//                   onClick={() => handleCall(selected)}
//                 >
//                   Call Now
//                 </Button>
//               )}

//               {selected.status === "CALLING" && (
//                 <>
//                   <Button
//                     color="error"
//                     variant="outlined"
//                     startIcon={<CancelIcon />}
//                     onClick={handleMissed}
//                   >
//                     Missed
//                   </Button>
//                   <Button
//                     color="success"
//                     variant="contained"
//                     startIcon={<CheckCircleIcon />}
//                     onClick={handleResolve}
//                   >
//                     Resolved
//                   </Button>
//                 </>
//               )}
//             </DialogActions>
//           </>
//         )}
//       </Dialog>
//     </div>
//   );
// };

// export default AdminSupportCalls;







import { useEffect, useState } from "react";
import {
  CircularProgress,
  Chip,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  fetchAllSupportCalls,
  fetchSupportCallStats,
  acknowledgeCall,
  startCallAction,
  resolveCall,
  markMissed,
} from "../../../Redux Toolkit/Seller/supportCallSlice";
import { useSocket } from "../../../hooks/useSocket";

const statusColors: any = {
  PENDING: "#f59e0b",
  ACKNOWLEDGED: "#3b82f6",
  CALLING: "#8b5cf6",
  RESOLVED: "#16a34a",
  MISSED: "#dc2626",
};

const priorityColors: any = {
  LOW: "#94a3b8",
  MEDIUM: "#3b82f6",
  HIGH: "#f97316",
  URGENT: "#dc2626",
};

const FILTERS = ["all", "PENDING", "ACKNOWLEDGED", "CALLING", "RESOLVED", "MISSED"];

const AdminSupportCalls = () => {
  const dispatch = useAppDispatch();

  const supportCall = useAppSelector((s: any) => s.supportCall);
  const auth = useAppSelector((s: any) => s.auth);

  const socket = useSocket();

  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [resolutionNote, setResolutionNote] = useState("");
  const [incomingCall, setIncomingCall] = useState<any>(null);
  const [liveDialogOpen, setLiveDialogOpen] = useState(false);

  /* ═══════════════════════════════════════════
     SOCKET — Join admin room & listen
     ═══════════════════════════════════════════ */
  useEffect(() => {
    if (!socket) return;

    const adminId = auth?.user?._id || auth?.user?.id;
    if (adminId) {
      socket.emit("join_admin", adminId);
      console.log("✅ [ADMIN] Joined admin_room:", adminId);
    }

    const handleNewCall = (data: any) => {
      console.log("📢 [LIVE] New call:", data);

      setIncomingCall(data.call);
      setLiveDialogOpen(true);

      try {
        const audio = new Audio(
          "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
        );
        audio.volume = 1.0;
        audio.play().catch((e: any) =>
          console.log("Audio blocked:", e?.message)
        );
      } catch (err) {
        console.log("Audio error:", err);
      }

      dispatch(
        fetchAllSupportCalls(filter === "all" ? undefined : filter) as any
      );
      dispatch(fetchSupportCallStats() as any);

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("📞 New Support Call!", {
          body: `${data.call.sellerName}: ${data.call.subject}`,
        });
      }
    };

    socket.on("new_support_call", handleNewCall);

    return () => {
      socket.off("new_support_call", handleNewCall);
    };
  }, [socket, auth, filter, dispatch]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    dispatch(fetchAllSupportCalls(filter === "all" ? undefined : filter) as any);
    dispatch(fetchSupportCallStats() as any);
  }, [filter, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        fetchAllSupportCalls(filter === "all" ? undefined : filter) as any
      );
    }, 30000);
    return () => clearInterval(interval);
  }, [filter, dispatch]);

  /* ═══════════════════════════════════════════
     ACTIONS
     ═══════════════════════════════════════════ */
  const handleAcknowledge = async () => {
    await dispatch(acknowledgeCall(selected._id) as any);
    setOpen(false);
    dispatch(fetchAllSupportCalls(filter === "all" ? undefined : filter) as any);
  };

  /* 🔥 TWILIO CALL — No tel: link, backend handles it */
  const handleCall = async (callObj?: any) => {
    const call = callObj || selected;

    try {
      const res = await dispatch(startCallAction(call._id) as any);

      if (startCallAction.fulfilled.match(res)) {
        alert(
          "📞 Calling seller...\n\n" +
          "Aapke phone pe ring bajegi pehle — utha lena!\n" +
          "Uthate hi seller ko connect kar diya jayega."
        );
      } else {
        alert("❌ " + (res.payload || "Call failed"));
      }
    } catch (err: any) {
      alert("❌ " + err.message);
    }

    setOpen(false);
    setLiveDialogOpen(false);
    setIncomingCall(null);
    dispatch(fetchAllSupportCalls(filter === "all" ? undefined : filter) as any);
  };

  const handleResolve = async () => {
    await dispatch(
      resolveCall({ id: selected._id, note: resolutionNote }) as any
    );
    setResolutionNote("");
    setOpen(false);
    dispatch(fetchAllSupportCalls(filter === "all" ? undefined : filter) as any);
  };

  const handleMissed = async () => {
    await dispatch(
      markMissed({
        id: selected._id,
        note: resolutionNote || "Not reachable",
      }) as any
    );
    setResolutionNote("");
    setOpen(false);
    dispatch(fetchAllSupportCalls(filter === "all" ? undefined : filter) as any);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">📞 Support Calls</h1>
      <p className="text-gray-500 mb-6">
        Live seller requests — respond instantly
      </p>

      <div className="mb-4 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
        <span className="text-xs font-bold text-green-700">
          LIVE — Listening
        </span>
      </div>

      {supportCall?.stats && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-xs text-yellow-800 font-semibold">PENDING</p>
            <p className="text-2xl font-bold text-yellow-900">
              {supportCall.stats.pending || 0}
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-xs text-purple-800 font-semibold">CALLING</p>
            <p className="text-2xl font-bold text-purple-900">
              {supportCall.stats.calling || 0}
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-xs text-green-800 font-semibold">
              RESOLVED TODAY
            </p>
            <p className="text-2xl font-bold text-green-900">
              {supportCall.stats.resolvedToday || 0}
            </p>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-4 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold ${
              filter === f ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {supportCall?.loading ? (
        <div className="text-center py-10">
          <CircularProgress />
        </div>
      ) : supportCall?.allCalls?.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center">
          <p className="text-gray-500">No support calls</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs uppercase">Seller</th>
                <th className="px-4 py-3 text-left text-xs uppercase">Subject</th>
                <th className="px-4 py-3 text-center text-xs uppercase">Priority</th>
                <th className="px-4 py-3 text-center text-xs uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {supportCall.allCalls.map((c: any) => (
                <tr
                  key={c._id}
                  className={`border-b hover:bg-indigo-50 ${
                    c.priority === "URGENT" && c.status === "PENDING"
                      ? "bg-red-50"
                      : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <p className="font-bold text-sm">
                      {c.seller?.sellerName || c.sellerName}
                    </p>
                    <p className="text-xs text-gray-500">📞 {c.sellerMobile}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm">{c.subject}</p>
                    <p className="text-xs text-gray-500">{c.category}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Chip
                      label={c.priority}
                      size="small"
                      sx={{
                        bgcolor: priorityColors[c.priority],
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 10,
                      }}
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Chip
                      label={c.status}
                      size="small"
                      sx={{
                        bgcolor: statusColors[c.status],
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 10,
                      }}
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        setSelected(c);
                        setOpen(true);
                      }}
                      sx={{
                        textTransform: "none",
                        bgcolor: c.status === "PENDING" ? "#dc2626" : "#6366f1",
                      }}
                    >
                      {c.status === "PENDING" ? "URGENT" : "Open"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Live Popup */}
      <Dialog
        open={liveDialogOpen}
        onClose={() => setLiveDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent sx={{ textAlign: "center", py: 4 }}>
          <div className="animate-bounce mb-3">
            <NotificationsActiveIcon sx={{ fontSize: 60, color: "#dc2626" }} />
          </div>
          <p className="text-red-600 font-bold text-lg mb-1">
            NEW SUPPORT CALL
          </p>
          <p className="text-xs text-gray-500 mb-4">
            {incomingCall?.priority} PRIORITY
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="font-bold text-base">
              {incomingCall?.seller?.sellerName || incomingCall?.sellerName}
            </p>
            <p className="text-lg font-bold text-red-700 mt-1">
              📞 {incomingCall?.sellerMobile}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              {incomingCall?.subject}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={() => setLiveDialogOpen(false)}
            >
              Later
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="success"
              startIcon={<CallIcon />}
              onClick={() => handleCall(incomingCall)}
              sx={{
                background: "linear-gradient(to right, #16a34a, #22c55e)",
                fontWeight: "bold",
              }}
            >
              CALL NOW
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        {selected && (
          <>
            <DialogTitle>
              <div className="flex items-center justify-between">
                <span className="font-bold">{selected.subject}</span>
                <Chip
                  label={selected.priority}
                  size="small"
                  sx={{
                    bgcolor: priorityColors[selected.priority],
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </div>
            </DialogTitle>
            <DialogContent>
              <div className="space-y-4">
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <p className="font-bold text-sm mb-2">Seller Information</p>
                  <p className="text-sm font-semibold">
                    {selected.seller?.sellerName || selected.sellerName}
                  </p>
                  <p className="text-xs text-gray-600">
                    📧 {selected.seller?.email}
                  </p>
                  <p className="text-lg font-bold text-indigo-700 mt-2">
                    📞 {selected.sellerMobile}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-bold text-sm mb-1">Issue Description</p>
                  <p className="text-sm text-gray-700">
                    {selected.description || "No description"}
                  </p>
                  <p className="text-xs text-gray-500 mt-3">
                    Category: <b>{selected.category}</b>
                  </p>
                  <p className="text-xs text-gray-500">
                    Requested: {new Date(selected.createdAt).toLocaleString()}
                  </p>
                </div>

                {["CALLING", "ACKNOWLEDGED"].includes(selected.status) && (
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Resolution / Notes"
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                  />
                )}
              </div>
            </DialogContent>

            <DialogActions sx={{ p: 2, gap: 1 }}>
              <Button onClick={() => setOpen(false)}>Close</Button>

              {selected.status === "PENDING" && (
                <>
                  <Button color="warning" variant="outlined" onClick={handleAcknowledge}>
                    Acknowledge
                  </Button>
                  <Button
                    color="success"
                    variant="contained"
                    startIcon={<CallIcon />}
                    onClick={() => handleCall(selected)}
                  >
                    Call Now
                  </Button>
                </>
              )}

              {selected.status === "ACKNOWLEDGED" && (
                <Button
                  color="success"
                  variant="contained"
                  startIcon={<CallIcon />}
                  onClick={() => handleCall(selected)}
                >
                  Call Now
                </Button>
              )}

              {selected.status === "CALLING" && (
                <>
                  <Button
                    color="error"
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={handleMissed}
                  >
                    Missed
                  </Button>
                  <Button
                    color="success"
                    variant="contained"
                    startIcon={<CheckCircleIcon />}
                    onClick={handleResolve}
                  >
                    Resolved
                  </Button>
                </>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default AdminSupportCalls;