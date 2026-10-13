
// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";

// import {
//   fetchAllReturns,
//   approveReturn,
//   rejectReturn,
//   markRefunded,
//   clearReturnError,
// } from "../../../Redux Toolkit/Customer/ReturnSlice";

// import {
//   Box,
//   Typography,
//   Chip,
//   Divider,
//   CircularProgress,
//   Alert,
//   Button,
//   Tabs,
//   Tab,
//   Paper,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Tooltip,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Badge,
//   Snackbar,
// } from "@mui/material";
// import MuiAlert from "@mui/material/Alert";

// import {
//   CheckCircle,
//   Cancel,
//   LocalShipping,
//   AttachMoney,
//   Visibility,
//   ExpandLess,
//   PhotoLibrary,
//   PlayArrow,
//   Mic,
//   Refresh,
//   Close as CloseIcon,
// } from "@mui/icons-material";
// import { format } from "date-fns";

// // ===== STATUS =====
// const statusColors: Record<string, "warning" | "info" | "success" | "error" | "default"> = {
//   requested: "warning",
//   admin_approved: "info",
//   assigned_to_delivery: "info",
//   pickup_scheduled: "info",
//   received: "info",
//   refunded: "success",
//   rejected: "error",
// };

// const statusLabels: Record<string, string> = {
//   requested: "Requested",
//   admin_approved: "Approved",
//   assigned_to_delivery: "Pickup Assigned",
//   pickup_scheduled: "Pickup Scheduled",
//   received: "Received",
//   refunded: "Refunded ✅",
//   rejected: "Rejected ❌",
// };

// // ===== COMPONENT =====
// const AdminReturnsTable = () => {
//   const dispatch = useAppDispatch();
//   const {
//     returns = [],
//     loading = false,
//     error = null,
//     totalCount = 0,
//   } = useAppSelector((state) => state.return || {
//     returns: [],
//     loading: false,
//     error: null,
//     totalCount: 0,
//   });

//   const [filter, setFilter] = useState("all");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [selectedReturn, setSelectedReturn] = useState<any>(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [dialogAction, setDialogAction] = useState<"approve" | "reject" | "refund" | null>(null);
//   const [adminNote, setAdminNote] = useState("");
//   const [expandedId, setExpandedId] = useState<string | null>(null);

//   // ✅ Snackbar for success/error messages
//   const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   // ✅ Media Modal State
//   const [mediaModalOpen, setMediaModalOpen] = useState(false);
//   const [mediaModalData, setMediaModalData] = useState<{ images: string[]; videos: string[]; audio: string | null } | null>(null);

//   useEffect(() => {
//     dispatch(fetchAllReturns({ page: page + 1, limit: rowsPerPage, status: filter }));
//   }, [dispatch, page, rowsPerPage, filter]);

//   const handleAction = (ret: any, action: "approve" | "reject" | "refund") => {
//     setSelectedReturn(ret);
//     setDialogAction(action);
//     setAdminNote("");
//     setDialogOpen(true);
//   };

//   const confirmAction = async () => {
//     if (!selectedReturn || !dialogAction) return;
//     try {
//       let result;
//       switch (dialogAction) {
//         case "approve":
//           result = await dispatch(approveReturn({ returnId: selectedReturn._id, adminNote })).unwrap();
//           setSnackbar({ open: true, message: "Return Approved Successfully ✅", severity: "success" });
//           break;
//         case "reject":
//           result = await dispatch(rejectReturn({ returnId: selectedReturn._id, adminNote })).unwrap();
//           setSnackbar({ open: true, message: "Return Rejected ❌", severity: "error" });
//           break;
//         case "refund":
//           result = await dispatch(markRefunded(selectedReturn._id)).unwrap();
//           setSnackbar({ open: true, message: "Refund Completed 💰", severity: "success" });
//           break;
//       }
//       setDialogOpen(false);
//       // Refresh the list
//       dispatch(fetchAllReturns({ page: page + 1, limit: rowsPerPage, status: filter }));
//     } catch (err: any) {
//       console.error("Action failed:", err);
//       setSnackbar({
//         open: true,
//         message: err.message || "Action failed. Please try again.",
//         severity: "error",
//       });
//     }
//   };

//   const toggleExpand = (id: string) => setExpandedId(expandedId === id ? null : id);
//   const getStatusCount = (status: string) => returns.filter((r) => r.status === status).length;
//   const expandedReturn = returns.find((r) => r._id === expandedId);

//   const handleMediaClick = (ret: any) => {
//     if (ret.media && (ret.media.images?.length > 0 || ret.media.videos?.length > 0 || ret.media.audio)) {
//       setMediaModalData(ret.media);
//       setMediaModalOpen(true);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   if (loading && returns.length === 0) {
//     return (
//       <Box className="flex justify-center items-center min-h-[400px]">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box className="p-4">
//       <Box className="flex justify-between items-center mb-6">
//         <div>
//           <Typography variant="h4" fontWeight="bold">Return Management</Typography>
//           <Typography variant="body2" color="text.secondary">Manage all return requests</Typography>
//         </div>
//         <Button
//           startIcon={<Refresh />}
//           onClick={() => dispatch(fetchAllReturns({ page: page + 1, limit: rowsPerPage, status: filter }))}
//           variant="outlined"
//         >
//           Refresh
//         </Button>
//       </Box>

//       {error && (
//         <Alert severity="error" className="mb-4" onClose={() => dispatch(clearReturnError())}>
//           {error}
//         </Alert>
//       )}

//       <Box className="flex flex-wrap gap-4 mb-4">
//         {[
//           { label: "Pending", count: getStatusCount("requested"), color: "warning.main" },
//           { label: "Approved", count: getStatusCount("admin_approved"), color: "info.main" },
//           { label: "Refunded", count: getStatusCount("refunded"), color: "success.main" },
//           { label: "Rejected", count: getStatusCount("rejected"), color: "error.main" },
//         ].map((stat) => (
//           <Box key={stat.label} className="flex-1 min-w-[100px]">
//             <Paper className="p-3 text-center">
//               <Typography variant="h5" color={stat.color}>{stat.count}</Typography>
//               <Typography variant="caption">{stat.label}</Typography>
//             </Paper>
//           </Box>
//         ))}
//       </Box>

//       <Box className="flex flex-wrap gap-4 items-center mb-4">
//         <Tabs value={filter} onChange={(_, v) => setFilter(v)} className="flex-1">
//           <Tab label="All" value="all" />
//           <Tab label="Pending" value="requested" />
//           <Tab label="Approved" value="admin_approved" />
//           <Tab label="Refunded" value="refunded" />
//           <Tab label="Rejected" value="rejected" />
//         </Tabs>
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow className="bg-gray-50">
//               <TableCell>Return ID</TableCell>
//               <TableCell>User</TableCell>
//               <TableCell>Reason</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Media</TableCell>
//               <TableCell>Amount</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {returns.map((ret) => {
//               const user = ret.user as any;
//               return (
//                 <TableRow key={ret._id} hover>
//                   <TableCell>
//                     <Typography variant="body2" fontWeight="500">
//                       #{ret._id.slice(-8).toUpperCase()}
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       {format(new Date(ret.createdAt), "dd MMM yyyy")}
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="body2">{user?.fullName || "N/A"}</Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       {user?.email || ""}
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="body2">{ret.reason}</Typography>
//                     {ret.description && (
//                       <Typography variant="caption" color="text.secondary">
//                         {ret.description.slice(0, 50)}...
//                       </Typography>
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     <Chip
//                       label={statusLabels[ret.status] || ret.status}
//                       color={statusColors[ret.status] || "default"}
//                       size="small"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Box className="flex gap-1">
//                       {ret.media?.images?.length > 0 && (
//                         <Badge
//                           badgeContent={ret.media.images.length}
//                           color="primary"
//                           onClick={() => handleMediaClick(ret)}
//                           className="cursor-pointer hover:opacity-70"
//                         >
//                           <PhotoLibrary fontSize="small" className="text-gray-500" />
//                         </Badge>
//                       )}
//                       {ret.media?.videos?.length > 0 && (
//                         <Badge
//                           badgeContent={ret.media.videos.length}
//                           color="secondary"
//                           onClick={() => handleMediaClick(ret)}
//                           className="cursor-pointer hover:opacity-70"
//                         >
//                           <PlayArrow fontSize="small" className="text-gray-500" />
//                         </Badge>
//                       )}
//                       {ret.media?.audio && (
//                         <Mic
//                           fontSize="small"
//                           className="text-gray-500 cursor-pointer hover:opacity-70"
//                           onClick={() => handleMediaClick(ret)}
//                         />
//                       )}
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="body2" fontWeight="500">₹{ret.refundAmount}</Typography>
//                     <Typography variant="caption" color="text.secondary">{ret.refundStatus}</Typography>
//                   </TableCell>
//                   <TableCell align="right">
//                     <Box className="flex gap-1 justify-end">
//                       <Tooltip title="View Details">
//                         <IconButton size="small" onClick={() => toggleExpand(ret._id)}>
//                           <Visibility fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                       {ret.status === "requested" && (
//                         <>
//                           <Tooltip title="Approve">
//                             <IconButton size="small" color="success" onClick={() => handleAction(ret, "approve")}>
//                               <CheckCircle fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Reject">
//                             <IconButton size="small" color="error" onClick={() => handleAction(ret, "reject")}>
//                               <Cancel fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                         </>
//                       )}
//                       {ret.status === "received" && ret.refundStatus === "pending" && (
//                         <Tooltip title="Mark Refunded">
//                           <IconButton size="small" color="primary" onClick={() => handleAction(ret, "refund")}>
//                             <AttachMoney fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                       )}
//                       {ret.returnTrackingId && (
//                         <Tooltip title={`Track: ${ret.returnTrackingId}`}>
//                           <LocalShipping fontSize="small" className="text-gray-400" />
//                         </Tooltip>
//                       )}
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={totalCount || returns.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={(_, np) => setPage(np)}
//           onRowsPerPageChange={(e) => {
//             setRowsPerPage(parseInt(e.target.value, 10));
//             setPage(0);
//           }}
//         />
//       </TableContainer>

//       {expandedId && expandedReturn && (
//         <Paper className="mt-4 p-4 bg-gray-50">
//           <Box>
//             <Box className="flex justify-between">
//               <Typography variant="h6">Return Details</Typography>
//               <IconButton onClick={() => setExpandedId(null)}>
//                 <ExpandLess />
//               </IconButton>
//             </Box>
//             <Divider className="my-2" />
//             <Box className="flex flex-col md:flex-row gap-6">
//               <Box className="flex-1">
//                 <Typography variant="subtitle2" fontWeight="600">Customer</Typography>
//                 <Typography variant="body2">Name: {(expandedReturn.user as any)?.fullName}</Typography>
//                 <Typography variant="body2">Email: {(expandedReturn.user as any)?.email}</Typography>
//                 <Typography variant="body2">Phone: {(expandedReturn.user as any)?.mobile}</Typography>
//               </Box>
//               <Box className="flex-1">
//                 <Typography variant="subtitle2" fontWeight="600">Pickup Address</Typography>
//                 <Typography variant="body2">{expandedReturn.pickupAddress || "Order address"}</Typography>
//               </Box>
//             </Box>
//             <Box className="mt-4">
//               <Typography variant="subtitle2" fontWeight="600">Media</Typography>
//               <Box className="flex flex-wrap gap-2 mt-1">
//                 {expandedReturn.media?.images?.map((img: string, i: number) => (
//                   <img key={i} src={img} className="w-20 h-20 object-cover rounded border cursor-pointer hover:shadow-md" onClick={() => window.open(img, "_blank")} alt="" />
//                 ))}
//                 {expandedReturn.media?.videos?.map((vid: string, i: number) => (
//                   <video key={i} src={vid} controls className="w-20 h-20 object-cover rounded border" />
//                 ))}
//                 {expandedReturn.media?.audio && <audio controls src={expandedReturn.media.audio} className="w-full max-w-xs" />}
//               </Box>
//             </Box>
//           </Box>
//         </Paper>
//       )}

//       {/* Media Modal */}
//       <Dialog open={mediaModalOpen} onClose={() => setMediaModalOpen(false)} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Media Proof
//           <IconButton
//             aria-label="close"
//             onClick={() => setMediaModalOpen(false)}
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {mediaModalData && (
//             <Box className="space-y-4">
//               {mediaModalData.images?.length > 0 && (
//                 <div>
//                   <Typography variant="subtitle2" fontWeight="600">Images ({mediaModalData.images.length})</Typography>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {mediaModalData.images.map((img, i) => (
//                       <img
//                         key={i}
//                         src={img}
//                         alt={`Media ${i+1}`}
//                         className="w-32 h-32 object-cover rounded border cursor-pointer hover:shadow-lg transition"
//                         onClick={() => window.open(img, '_blank')}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {mediaModalData.videos?.length > 0 && (
//                 <div>
//                   <Typography variant="subtitle2" fontWeight="600">Videos ({mediaModalData.videos.length})</Typography>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {mediaModalData.videos.map((vid, i) => (
//                       <video
//                         key={i}
//                         src={vid}
//                         controls
//                         className="w-48 h-32 object-cover rounded border"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {mediaModalData.audio && (
//                 <div>
//                   <Typography variant="subtitle2" fontWeight="600">Audio</Typography>
//                   <audio controls src={mediaModalData.audio} className="w-full mt-2" />
//                 </div>
//               )}
//             </Box>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Action Dialog (Approve/Reject/Refund) */}
//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>
//           {dialogAction === "approve" ? "Approve Return" : dialogAction === "reject" ? "Reject Return" : "Confirm Refund"}
//         </DialogTitle>
//         <DialogContent>
//           {dialogAction === "approve" && <Typography variant="body2" className="mb-3">Approve and schedule pickup with delivery partner.</Typography>}
//           {dialogAction === "reject" && <Typography variant="body2" className="mb-3">Reject the return. Provide reason below.</Typography>}
//           {dialogAction === "refund" && <Typography variant="body2" className="mb-3">Mark as refunded. Amount ₹{selectedReturn?.refundAmount} will be processed.</Typography>}
//           {(dialogAction === "approve" || dialogAction === "reject") && (
//             <TextField fullWidth multiline rows={3} label="Admin Note" value={adminNote} onChange={(e) => setAdminNote(e.target.value)} placeholder="Add remarks..." />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
//           <Button variant="contained" color={dialogAction === "reject" ? "error" : "primary"} onClick={confirmAction} disabled={loading}>
//             {loading ? <CircularProgress size={20} /> : "Confirm"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={5000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <MuiAlert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
//           {snackbar.message}
//         </MuiAlert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default AdminReturnsTable;










import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";

import {
  fetchAllReturns,
  approveReturn,
  rejectReturn,
  markRefunded,
  clearReturnError,
} from "../../../Redux Toolkit/Customer/ReturnSlice";

import {
  Box,
  Typography,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Button,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Badge,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import {
  CheckCircle,
  Cancel,
  LocalShipping,
  AttachMoney,
  Visibility,
  ExpandLess,
  PhotoLibrary,
  PlayArrow,
  Mic,
  Refresh,
  Close as CloseIcon,
} from "@mui/icons-material";
import { format } from "date-fns";

// ===== STATUS =====
const statusColors: Record<string, "warning" | "info" | "success" | "error" | "default"> = {
  requested: "warning",
  admin_approved: "info",
  assigned_to_delivery: "info",
  pickup_scheduled: "info",
  received: "info",
  refunded: "success",
  rejected: "error",
};

const statusLabels: Record<string, string> = {
  requested: "Requested",
  admin_approved: "Approved",
  assigned_to_delivery: "Pickup Assigned",
  pickup_scheduled: "Pickup Scheduled",
  received: "Received",
  refunded: "Refunded ✅",
  rejected: "Rejected ❌",
};

// ===== COMPONENT =====
const AdminReturnsTable = () => {
  const dispatch = useAppDispatch();
  const {
    returns = [],
    loading = false,
    error = null,
    totalCount = 0,
  } = useAppSelector((state) => state.return || {
    returns: [],
    loading: false,
    error: null,
    totalCount: 0,
  });

  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedReturn, setSelectedReturn] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<"approve" | "reject" | "refund" | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // ✅ Snackbar for success/error messages
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  // ✅ Media Modal State
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [mediaModalData, setMediaModalData] = useState<{ images: string[]; videos: string[]; audio: string | null } | null>(null);

  useEffect(() => {
    dispatch(fetchAllReturns({ page: page + 1, limit: rowsPerPage, status: filter }));
  }, [dispatch, page, rowsPerPage, filter]);

  const handleAction = (ret: any, action: "approve" | "reject" | "refund") => {
    setSelectedReturn(ret);
    setDialogAction(action);
    setAdminNote("");
    setDialogOpen(true);
  };

  const confirmAction = async () => {
    if (!selectedReturn || !dialogAction) return;
    try {
      switch (dialogAction) {
        case "approve":
          await dispatch(approveReturn({ returnId: selectedReturn._id, adminNote })).unwrap();
          setSnackbar({ open: true, message: "Return Approved Successfully ✅", severity: "success" });
          break;
        case "reject":
          await dispatch(rejectReturn({ returnId: selectedReturn._id, adminNote })).unwrap();
          setSnackbar({ open: true, message: "Return Rejected ❌", severity: "error" });
          break;
        case "refund":
          await dispatch(markRefunded(selectedReturn._id)).unwrap();
          setSnackbar({ open: true, message: "Refund Completed 💰", severity: "success" });
          break;
      }
      setDialogOpen(false);
      // Refresh the list
      dispatch(fetchAllReturns({ page: page + 1, limit: rowsPerPage, status: filter }));
    } catch (err: any) {
      console.error("Action failed:", err);
      setSnackbar({
        open: true,
        message: err.message || "Action failed. Please try again.",
        severity: "error",
      });
    }
  };

  const toggleExpand = (id: string) => setExpandedId(expandedId === id ? null : id);
  const getStatusCount = (status: string) => returns.filter((r) => r.status === status).length;
  const expandedReturn = returns.find((r) => r._id === expandedId);

  const handleMediaClick = (ret: any) => {
    if (ret.media && (ret.media.images?.length > 0 || ret.media.videos?.length > 0 || ret.media.audio)) {
      setMediaModalData(ret.media);
      setMediaModalOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading && returns.length === 0) {
    return (
      <Box className="flex justify-center items-center min-h-[400px]">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="p-4">
      <Box className="flex justify-between items-center mb-6">
        <div>
          <Typography variant="h4" fontWeight="bold">Return Management</Typography>
          <Typography variant="body2" color="text.secondary">Manage all return requests</Typography>
        </div>
        <Button
          startIcon={<Refresh />}
          onClick={() => dispatch(fetchAllReturns({ page: page + 1, limit: rowsPerPage, status: filter }))}
          variant="outlined"
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Alert severity="error" className="mb-4" onClose={() => dispatch(clearReturnError())}>
          {error}
        </Alert>
      )}

      <Box className="flex flex-wrap gap-4 mb-4">
        {[
          { label: "Pending", count: getStatusCount("requested"), color: "warning.main" },
          { label: "Approved", count: getStatusCount("admin_approved"), color: "info.main" },
          { label: "Refunded", count: getStatusCount("refunded"), color: "success.main" },
          { label: "Rejected", count: getStatusCount("rejected"), color: "error.main" },
        ].map((stat) => (
          <Box key={stat.label} className="flex-1 min-w-[100px]">
            <Paper className="p-3 text-center">
              <Typography variant="h5" color={stat.color}>{stat.count}</Typography>
              <Typography variant="caption">{stat.label}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      <Box className="flex flex-wrap gap-4 items-center mb-4">
        <Tabs value={filter} onChange={(_, v) => setFilter(v)} className="flex-1">
          <Tab label="All" value="all" />
          <Tab label="Pending" value="requested" />
          <Tab label="Approved" value="admin_approved" />
          <Tab label="Refunded" value="refunded" />
          <Tab label="Rejected" value="rejected" />
        </Tabs>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell>Return ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Media</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {returns.map((ret) => {
              const user = ret.user as any;
              return (
                <TableRow key={ret._id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight="500">
                      #{ret._id.slice(-8).toUpperCase()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {format(new Date(ret.createdAt), "dd MMM yyyy")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{user?.fullName || "N/A"}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user?.email || ""}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{ret.reason}</Typography>
                    {ret.description && (
                      <Typography variant="caption" color="text.secondary">
                        {ret.description.slice(0, 50)}...
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={statusLabels[ret.status] || ret.status}
                      color={statusColors[ret.status] || "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box className="flex gap-1">
                      {ret.media?.images?.length > 0 && (
                        <Badge
                          badgeContent={ret.media.images.length}
                          color="primary"
                          onClick={() => handleMediaClick(ret)}
                          className="cursor-pointer hover:opacity-70"
                        >
                          <PhotoLibrary fontSize="small" className="text-gray-500" />
                        </Badge>
                      )}
                      {ret.media?.videos?.length > 0 && (
                        <Badge
                          badgeContent={ret.media.videos.length}
                          color="secondary"
                          onClick={() => handleMediaClick(ret)}
                          className="cursor-pointer hover:opacity-70"
                        >
                          <PlayArrow fontSize="small" className="text-gray-500" />
                        </Badge>
                      )}
                      {ret.media?.audio && (
                        <Mic
                          fontSize="small"
                          className="text-gray-500 cursor-pointer hover:opacity-70"
                          onClick={() => handleMediaClick(ret)}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="500">₹{ret.refundAmount}</Typography>
                    <Typography variant="caption" color="text.secondary">{ret.refundStatus}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box className="flex gap-1 justify-end">
                      <Tooltip title="View Details">
                        <IconButton size="small" onClick={() => toggleExpand(ret._id)}>
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {ret.status === "requested" && (
                        <>
                          <Tooltip title="Approve">
                            <IconButton size="small" color="success" onClick={() => handleAction(ret, "approve")}>
                              <CheckCircle fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <IconButton size="small" color="error" onClick={() => handleAction(ret, "reject")}>
                              <Cancel fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      {ret.status === "received" && ret.refundStatus === "pending" && (
                        <Tooltip title="Mark Refunded">
                          <IconButton size="small" color="primary" onClick={() => handleAction(ret, "refund")}>
                            <AttachMoney fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {ret.returnTrackingId && (
                        <Tooltip title={`Track: ${ret.returnTrackingId}`}>
                          <LocalShipping fontSize="small" className="text-gray-400" />
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount || returns.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, np) => setPage(np)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>

      {expandedId && expandedReturn && (
        <Paper className="mt-4 p-4 bg-gray-50">
          <Box>
            <Box className="flex justify-between">
              <Typography variant="h6">Return Details</Typography>
              <IconButton onClick={() => setExpandedId(null)}>
                <ExpandLess />
              </IconButton>
            </Box>
            <Divider className="my-2" />
            <Box className="flex flex-col md:flex-row gap-6">
              <Box className="flex-1">
                <Typography variant="subtitle2" fontWeight="600">Customer</Typography>
                <Typography variant="body2">Name: {(expandedReturn.user as any)?.fullName}</Typography>
                <Typography variant="body2">Email: {(expandedReturn.user as any)?.email}</Typography>
                <Typography variant="body2">Phone: {(expandedReturn.user as any)?.mobile}</Typography>
              </Box>
              <Box className="flex-1">
                <Typography variant="subtitle2" fontWeight="600">Pickup Address</Typography>
                <Typography variant="body2">{expandedReturn.pickupAddress || "Order address"}</Typography>
              </Box>
            </Box>
            <Box className="mt-4">
              <Typography variant="subtitle2" fontWeight="600">Media</Typography>
              <Box className="flex flex-wrap gap-2 mt-1">
                {expandedReturn.media?.images?.map((img: string, i: number) => (
                  <img key={i} src={img} className="w-20 h-20 object-cover rounded border cursor-pointer hover:shadow-md" onClick={() => window.open(img, "_blank")} alt="" />
                ))}
                {expandedReturn.media?.videos?.map((vid: string, i: number) => (
                  <video key={i} src={vid} controls className="w-20 h-20 object-cover rounded border" />
                ))}
                {expandedReturn.media?.audio && <audio controls src={expandedReturn.media.audio} className="w-full max-w-xs" />}
              </Box>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Media Modal */}
      <Dialog open={mediaModalOpen} onClose={() => setMediaModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Media Proof
          <IconButton
            aria-label="close"
            onClick={() => setMediaModalOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {mediaModalData && (
            <Box className="space-y-4">
              {mediaModalData.images?.length > 0 && (
                <div>
                  <Typography variant="subtitle2" fontWeight="600">Images ({mediaModalData.images.length})</Typography>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mediaModalData.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Media ${i+1}`}
                        className="w-32 h-32 object-cover rounded border cursor-pointer hover:shadow-lg transition"
                        onClick={() => window.open(img, '_blank')}
                      />
                    ))}
                  </div>
                </div>
              )}
              {mediaModalData.videos?.length > 0 && (
                <div>
                  <Typography variant="subtitle2" fontWeight="600">Videos ({mediaModalData.videos.length})</Typography>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mediaModalData.videos.map((vid, i) => (
                      <video
                        key={i}
                        src={vid}
                        controls
                        className="w-48 h-32 object-cover rounded border"
                      />
                    ))}
                  </div>
                </div>
              )}
              {mediaModalData.audio && (
                <div>
                  <Typography variant="subtitle2" fontWeight="600">Audio</Typography>
                  <audio controls src={mediaModalData.audio} className="w-full mt-2" />
                </div>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Dialog (Approve/Reject/Refund) */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogAction === "approve" ? "Approve Return" : dialogAction === "reject" ? "Reject Return" : "Confirm Refund"}
        </DialogTitle>
        <DialogContent>
          {dialogAction === "approve" && <Typography variant="body2" className="mb-3">Approve and schedule pickup with delivery partner.</Typography>}
          {dialogAction === "reject" && <Typography variant="body2" className="mb-3">Reject the return. Provide reason below.</Typography>}
          {dialogAction === "refund" && <Typography variant="body2" className="mb-3">Mark as refunded. Amount ₹{selectedReturn?.refundAmount} will be processed.</Typography>}
          {(dialogAction === "approve" || dialogAction === "reject") && (
            <TextField fullWidth multiline rows={3} label="Admin Note" value={adminNote} onChange={(e) => setAdminNote(e.target.value)} placeholder="Add remarks..." />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color={dialogAction === "reject" ? "error" : "primary"} onClick={confirmAction} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default AdminReturnsTable;
