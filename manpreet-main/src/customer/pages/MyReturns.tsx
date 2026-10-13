// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";

// import { fetchMyReturns } from "../../Redux Toolkit/Customer/ReturnSlice";

// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Chip,
//   Divider,
//   CircularProgress,
//   Alert,
//   Button,
//   Tabs,
//   Tab,
//   Paper,
//   Tooltip,
//   IconButton,
//   Collapse,
// } from "@mui/material";

// import { Link } from "react-router-dom";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import ScheduleIcon from "@mui/icons-material/Schedule";

// // ===== STATUS CONFIGURATION =====
// const statusColors: Record<string, "warning" | "info" | "success" | "error" | "default"> = {
//   requested: "warning",
//   admin_approved: "info",
//   assigned_to_delivery: "info",
//   pickup_scheduled: "info",
//   received: "info",
//   refunded: "success",
//   rejected: "error",
// };

// // ✅ Helper to ensure icon is always a ReactElement
// const getStatusIcon = (status: string): React.ReactElement => {
//   const iconMap: Record<string, React.ReactElement> = {
//     requested: <ScheduleIcon className="text-yellow-600" />,
//     admin_approved: <LocalShippingIcon className="text-blue-600" />,
//     assigned_to_delivery: <LocalShippingIcon className="text-blue-600" />,
//     pickup_scheduled: <LocalShippingIcon className="text-blue-600" />,
//     received: <CheckCircleIcon className="text-green-600" />,
//     refunded: <CheckCircleIcon className="text-green-600" />,
//     rejected: <CancelIcon className="text-red-600" />,
//   };
//   return iconMap[status] || <ScheduleIcon className="text-gray-400" />;
// };

// const statusLabels: Record<string, string> = {
//   requested: "Requested",
//   admin_approved: "Admin Approved",
//   assigned_to_delivery: "Pickup Assigned",
//   pickup_scheduled: "Pickup Scheduled",
//   received: "Received at Warehouse",
//   refunded: "Refunded ✅",
//   rejected: "Rejected ❌",
// };

// // ===== COMPONENT =====
// const MyReturns = () => {
//   const dispatch = useAppDispatch();
//   const { returns = [], loading, error } = useAppSelector(
//     (state) => state.return || { returns: [], loading: false, error: null }
//   );
//   const [expandedId, setExpandedId] = useState<string | null>(null);
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     dispatch(fetchMyReturns());
//   }, [dispatch]);

//   const toggleExpand = (id: string) => setExpandedId(expandedId === id ? null : id);

//   const filteredReturns = filter === "all" ? returns : returns.filter((r) => r.status === filter);

//   const statusCounts = returns.reduce((acc, r) => {
//     acc[r.status] = (acc[r.status] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   if (loading) {
//     return (
//       <Box className="flex justify-center items-center min-h-[400px]">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box className="max-w-4xl mx-auto p-4">
//       <Typography variant="h4" fontWeight="bold" className="mb-2">
//         My Returns
//       </Typography>
//       <Typography variant="body2" color="text.secondary" className="mb-6">
//         Track and manage your return requests
//       </Typography>

//       {error && (
//         <Alert severity="error" className="mb-4">
//           {error}
//         </Alert>
//       )}

//       {/* Stats */}
//       <Paper className="p-4 mb-6 bg-gray-50">
//         <div className="flex flex-wrap gap-4">
//           {Object.entries(statusCounts).map(([status, count]) => (
//             <div key={status} className="flex items-center gap-2">
//               <Chip
//                 label={`${statusLabels[status] || status}: ${count}`}
//                 color={statusColors[status] || "default"}
//                 size="small"
//               />
//             </div>
//           ))}
//           {returns.length === 0 && (
//             <Typography variant="body2" color="text.secondary">
//               No returns yet
//             </Typography>
//           )}
//         </div>
//       </Paper>

//       {/* Filter Tabs */}
//       <Box className="border-b mb-4">
//         <Tabs value={filter} onChange={(_, v) => setFilter(v)}>
//           <Tab label="All" value="all" />
//           <Tab label="Pending" value="requested" />
//           <Tab label="Approved" value="admin_approved" />
//           <Tab label="Refunded" value="refunded" />
//           <Tab label="Rejected" value="rejected" />
//         </Tabs>
//       </Box>

//       {/* List – using Box with flex layout */}
//       {filteredReturns.length === 0 ? (
//         <Paper className="p-8 text-center">
//           <Typography variant="body1" color="text.secondary">
//             No return requests found.
//           </Typography>
//           <Button component={Link} to="/orders" variant="outlined" className="mt-4">
//             Go to Orders
//           </Button>
//         </Paper>
//       ) : (
//         <Box className="flex flex-col gap-4">
//           {filteredReturns.map((ret, index) => (
//             <Box key={ret._id || index} className="w-full">
//               <Card variant="outlined" className="hover:shadow-md transition-shadow">
//                 <CardContent>
//                   {/* Header */}
//                   <Box className="flex flex-wrap justify-between items-start gap-2">
//                     <div>
//                       <Typography variant="body2" color="text.secondary">
//                         Return #{ret._id?.slice(-8).toUpperCase() || "N/A"}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         Order #{ret.order?.slice(-8).toUpperCase() || "N/A"}
//                       </Typography>
//                       <Typography variant="body1" fontWeight="500" className="mt-1">
//                         Reason: {ret.reason}
//                       </Typography>
//                       {ret.description && (
//                         <Typography variant="body2" color="text.secondary">
//                           {ret.description}
//                         </Typography>
//                       )}
//                     </div>
//                     <Chip
//                       icon={getStatusIcon(ret.status)} // ✅ Fixed – always returns ReactElement
//                       label={statusLabels[ret.status] || ret.status}
//                       color={statusColors[ret.status] || "default"}
//                       size="medium"
//                     />
//                   </Box>

//                   <Divider className="my-3" />

//                   {/* Tracking & Refund Info */}
//                   <Box className="flex flex-wrap gap-4 items-center">
//                     {ret.returnTrackingId && (
//                       <Typography variant="body2" className="flex items-center gap-1">
//                         <LocalShippingIcon fontSize="small" className="text-gray-500" />
//                         <span className="font-semibold">Tracking:</span>
//                         <span className="text-blue-600 cursor-pointer hover:underline">
//                           {ret.returnTrackingId}
//                         </span>
//                       </Typography>
//                     )}
//                     {ret.status === "refunded" && (
//                       <Typography variant="body2" className="text-green-600 font-semibold">
//                         Refund: ₹{ret.refundAmount}
//                       </Typography>
//                     )}
//                     {ret.adminNote && (
//                       <Typography variant="body2" className="text-gray-500 bg-gray-50 px-2 py-1 rounded">
//                         Note: {ret.adminNote}
//                       </Typography>
//                     )}
//                   </Box>

//                   {/* Media Preview */}
//                   {ret.media && (
//                     <Box className="flex flex-wrap gap-1 mt-2">
//                       {ret.media.images?.slice(0, 4).map((img, i) => (
//                         <img
//                           key={i}
//                           src={img}
//                           className="w-12 h-12 object-cover rounded border cursor-pointer hover:shadow-md transition"
//                           onClick={() => window.open(img, "_blank")}
//                           alt="Proof"
//                         />
//                       ))}
//                       {ret.media.images?.length > 4 && (
//                         <span className="text-xs text-gray-500 self-center">
//                           +{ret.media.images.length - 4} more
//                         </span>
//                       )}
//                       {ret.media.videos?.length > 0 && (
//                         <span className="text-xs bg-blue-50 px-2 py-1 rounded">
//                           🎬 {ret.media.videos.length} videos
//                         </span>
//                       )}
//                       {ret.media.audio && (
//                         <span className="text-xs bg-purple-50 px-2 py-1 rounded">🎤 Audio</span>
//                       )}
//                     </Box>
//                   )}

//                   {/* Date & Expand */}
//                   <Box className="flex justify-between items-center mt-2">
//                     <Typography variant="caption" color="text.secondary">
//                       Requested:{" "}
//                       {ret.createdAt
//                         ? new Date(ret.createdAt).toLocaleDateString("en-IN", {
//                             day: "numeric",
//                             month: "short",
//                             year: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })
//                         : "N/A"}
//                     </Typography>
//                     <IconButton size="small" onClick={() => toggleExpand(ret._id)}>
//                       {expandedId === ret._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                     </IconButton>
//                   </Box>

//                   {/* Expanded Details */}
//                   <Collapse in={expandedId === ret._id}>
//                     <Box className="mt-3 p-3 bg-gray-50 rounded-lg">
//                       <Typography variant="subtitle2" fontWeight="600">
//                         Full Details
//                       </Typography>
//                       <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
//                         <div>
//                           <span className="text-gray-500">Return ID:</span>
//                           <span className="ml-2 font-mono">{ret._id}</span>
//                         </div>
//                         <div>
//                           <span className="text-gray-500">Order ID:</span>
//                           <span className="ml-2 font-mono">{ret.order}</span>
//                         </div>
//                         <div>
//                           <span className="text-gray-500">Status:</span>
//                           <span className="ml-2">{statusLabels[ret.status] || ret.status}</span>
//                         </div>
//                         <div>
//                           <span className="text-gray-500">Refund Amount:</span>
//                           <span className="ml-2">₹{ret.refundAmount}</span>
//                         </div>
//                         {ret.returnShipmentId && (
//                           <div className="col-span-2">
//                             <span className="text-gray-500">Shipment ID:</span>
//                             <span className="ml-2 font-mono">{ret.returnShipmentId}</span>
//                           </div>
//                         )}
//                         {ret.pickupAddress && (
//                           <div className="col-span-2">
//                             <span className="text-gray-500">Pickup Address:</span>
//                             <span className="ml-2">{ret.pickupAddress}</span>
//                           </div>
//                         )}
//                       </div>
//                     </Box>
//                   </Collapse>
//                 </CardContent>
//               </Card>
//             </Box>
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default MyReturns;























import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";

// ✅ CORRECT import path
import { fetchMyReturns } from "../../Redux Toolkit/Customer/ReturnSlice";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Button,
  Tabs,
  Tab,
  Paper,
  // ✅ Tooltip removed - unused
  IconButton,
  Collapse,
} from "@mui/material";

import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ScheduleIcon from "@mui/icons-material/Schedule";

// ===== STATUS CONFIGURATION =====
const statusColors: Record<string, "warning" | "info" | "success" | "error" | "default"> = {
  requested: "warning",
  admin_approved: "info",
  assigned_to_delivery: "info",
  pickup_scheduled: "info",
  received: "info",
  refunded: "success",
  rejected: "error",
};

const getStatusIcon = (status: string): React.ReactElement => {
  const iconMap: Record<string, React.ReactElement> = {
    requested: <ScheduleIcon className="text-yellow-600" />,
    admin_approved: <LocalShippingIcon className="text-blue-600" />,
    assigned_to_delivery: <LocalShippingIcon className="text-blue-600" />,
    pickup_scheduled: <LocalShippingIcon className="text-blue-600" />,
    received: <CheckCircleIcon className="text-green-600" />,
    refunded: <CheckCircleIcon className="text-green-600" />,
    rejected: <CancelIcon className="text-red-600" />,
  };
  return iconMap[status] || <ScheduleIcon className="text-gray-400" />;
};

const statusLabels: Record<string, string> = {
  requested: "Requested",
  admin_approved: "Admin Approved",
  assigned_to_delivery: "Pickup Assigned",
  pickup_scheduled: "Pickup Scheduled",
  received: "Received at Warehouse",
  refunded: "Refunded ✅",
  rejected: "Rejected ❌",
};

// ===== COMPONENT =====
const MyReturns = () => {
  const dispatch = useAppDispatch();
  const { returns = [], loading, error } = useAppSelector(
    (state) => state.return || { returns: [], loading: false, error: null }
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchMyReturns());
  }, [dispatch]);

  const toggleExpand = (id: string) => setExpandedId(expandedId === id ? null : id);

  const filteredReturns = filter === "all" ? returns : returns.filter((r) => r.status === filter);

  const statusCounts = returns.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-[400px]">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="max-w-4xl mx-auto p-4">
      <Typography variant="h4" fontWeight="bold" className="mb-2">
        My Returns
      </Typography>
      <Typography variant="body2" color="text.secondary" className="mb-6">
        Track and manage your return requests
      </Typography>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Stats */}
      <Paper className="p-4 mb-6 bg-gray-50">
        <div className="flex flex-wrap gap-4">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="flex items-center gap-2">
              <Chip
                label={`${statusLabels[status] || status}: ${count}`}
                color={statusColors[status] || "default"}
                size="small"
              />
            </div>
          ))}
          {returns.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No returns yet
            </Typography>
          )}
        </div>
      </Paper>

      {/* Filter Tabs */}
      <Box className="border-b mb-4">
        <Tabs value={filter} onChange={(_, v) => setFilter(v)}>
          <Tab label="All" value="all" />
          <Tab label="Pending" value="requested" />
          <Tab label="Approved" value="admin_approved" />
          <Tab label="Refunded" value="refunded" />
          <Tab label="Rejected" value="rejected" />
        </Tabs>
      </Box>

      {/* List */}
      {filteredReturns.length === 0 ? (
        <Paper className="p-8 text-center">
          <Typography variant="body1" color="text.secondary">
            No return requests found.
          </Typography>
          <Button component={Link} to="/orders" variant="outlined" className="mt-4">
            Go to Orders
          </Button>
        </Paper>
      ) : (
        <Box className="flex flex-col gap-4">
          {filteredReturns.map((ret, index) => {
            const orderId = (ret.order as any)?._id || ret.order || "N/A";
            const orderDisplay =
              typeof orderId === "string" && orderId !== "N/A"
                ? orderId.slice(-8).toUpperCase()
                : "N/A";

            return (
              <Box key={ret._id || index} className="w-full">
                <Card variant="outlined" className="hover:shadow-md transition-shadow">
                  <CardContent>
                    <Box className="flex flex-wrap justify-between items-start gap-2">
                      <div>
                        <Typography variant="body2" color="text.secondary">
                          Return #{ret._id?.slice(-8).toUpperCase() || "N/A"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Order #{orderDisplay}
                        </Typography>
                        <Typography variant="body1" fontWeight="500" className="mt-1">
                          Reason: {ret.reason}
                        </Typography>
                        {ret.description && (
                          <Typography variant="body2" color="text.secondary">
                            {ret.description}
                          </Typography>
                        )}
                      </div>
                      <Chip
                        icon={getStatusIcon(ret.status)}
                        label={statusLabels[ret.status] || ret.status}
                        color={statusColors[ret.status] || "default"}
                        size="medium"
                      />
                    </Box>

                    <Divider className="my-3" />

                    <Box className="flex flex-wrap gap-4 items-center">
                      {ret.returnTrackingId && (
                        <Typography variant="body2" className="flex items-center gap-1">
                          <LocalShippingIcon fontSize="small" className="text-gray-500" />
                          <span className="font-semibold">Tracking:</span>
                          <span className="text-blue-600 cursor-pointer hover:underline">
                            {ret.returnTrackingId}
                          </span>
                        </Typography>
                      )}
                      {ret.status === "refunded" && (
                        <Typography variant="body2" className="text-green-600 font-semibold">
                          Refund: ₹{ret.refundAmount}
                        </Typography>
                      )}
                      {ret.adminNote && (
                        <Typography variant="body2" className="text-gray-500 bg-gray-50 px-2 py-1 rounded">
                          Note: {ret.adminNote}
                        </Typography>
                      )}
                    </Box>

                    {ret.media && (
                      <Box className="flex flex-wrap gap-1 mt-2">
                        {ret.media.images?.slice(0, 4).map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            className="w-12 h-12 object-cover rounded border cursor-pointer hover:shadow-md transition"
                            onClick={() => window.open(img, "_blank")}
                            alt="Proof"
                          />
                        ))}
                        {ret.media.images?.length > 4 && (
                          <span className="text-xs text-gray-500 self-center">
                            +{ret.media.images.length - 4} more
                          </span>
                        )}
                        {ret.media.videos?.length > 0 && (
                          <span className="text-xs bg-blue-50 px-2 py-1 rounded">
                            🎬 {ret.media.videos.length} videos
                          </span>
                        )}
                        {ret.media.audio && (
                          <span className="text-xs bg-purple-50 px-2 py-1 rounded">🎤 Audio</span>
                        )}
                      </Box>
                    )}

                    <Box className="flex justify-between items-center mt-2">
                      <Typography variant="caption" color="text.secondary">
                        Requested:{" "}
                        {ret.createdAt
                          ? new Date(ret.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A"}
                      </Typography>
                      <IconButton size="small" onClick={() => toggleExpand(ret._id)}>
                        {expandedId === ret._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </Box>

                    <Collapse in={expandedId === ret._id}>
                      <Box className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <Typography variant="subtitle2" fontWeight="600">
                          Full Details
                        </Typography>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                          <div>
                            <span className="text-gray-500">Return ID:</span>
                            <span className="ml-2 font-mono">{ret._id}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Order ID:</span>
                            <span className="ml-2 font-mono">{orderId}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Status:</span>
                            <span className="ml-2">{statusLabels[ret.status] || ret.status}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Refund Amount:</span>
                            <span className="ml-2">₹{ret.refundAmount}</span>
                          </div>
                          {ret.returnShipmentId && (
                            <div className="col-span-2">
                              <span className="text-gray-500">Shipment ID:</span>
                              <span className="ml-2 font-mono">{ret.returnShipmentId}</span>
                            </div>
                          )}
                          {ret.pickupAddress && (
                            <div className="col-span-2">
                              <span className="text-gray-500">Pickup Address:</span>
                              <span className="ml-2">{ret.pickupAddress}</span>
                            </div>
                          )}
                        </div>
                      </Box>
                    </Collapse>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default MyReturns;



// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";

// // ✅ CORRECT import path
// import { fetchMyReturns } from "../../Redux Toolkit/Customer/ReturnSlice";

// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Chip,
//   Divider,
//   CircularProgress,
//   Alert,
//   Button,
//   Tabs,
//   Tab,
//   Paper,
//   Tooltip,
//   IconButton,
//   Collapse,
// } from "@mui/material";

// import { Link } from "react-router-dom";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import ScheduleIcon from "@mui/icons-material/Schedule";

// // ===== STATUS CONFIGURATION =====
// const statusColors: Record<string, "warning" | "info" | "success" | "error" | "default"> = {
//   requested: "warning",
//   admin_approved: "info",
//   assigned_to_delivery: "info",
//   pickup_scheduled: "info",
//   received: "info",
//   refunded: "success",
//   rejected: "error",
// };

// const getStatusIcon = (status: string): React.ReactElement => {
//   const iconMap: Record<string, React.ReactElement> = {
//     requested: <ScheduleIcon className="text-yellow-600" />,
//     admin_approved: <LocalShippingIcon className="text-blue-600" />,
//     assigned_to_delivery: <LocalShippingIcon className="text-blue-600" />,
//     pickup_scheduled: <LocalShippingIcon className="text-blue-600" />,
//     received: <CheckCircleIcon className="text-green-600" />,
//     refunded: <CheckCircleIcon className="text-green-600" />,
//     rejected: <CancelIcon className="text-red-600" />,
//   };
//   return iconMap[status] || <ScheduleIcon className="text-gray-400" />;
// };

// const statusLabels: Record<string, string> = {
//   requested: "Requested",
//   admin_approved: "Admin Approved",
//   assigned_to_delivery: "Pickup Assigned",
//   pickup_scheduled: "Pickup Scheduled",
//   received: "Received at Warehouse",
//   refunded: "Refunded ✅",
//   rejected: "Rejected ❌",
// };

// // ===== COMPONENT =====
// const MyReturns = () => {
//   const dispatch = useAppDispatch();
//   const { returns = [], loading, error } = useAppSelector(
//     (state) => state.return || { returns: [], loading: false, error: null }
//   );
//   const [expandedId, setExpandedId] = useState<string | null>(null);
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     dispatch(fetchMyReturns());
//   }, [dispatch]);

//   const toggleExpand = (id: string) => setExpandedId(expandedId === id ? null : id);

//   const filteredReturns = filter === "all" ? returns : returns.filter((r) => r.status === filter);

//   const statusCounts = returns.reduce((acc, r) => {
//     acc[r.status] = (acc[r.status] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   if (loading) {
//     return (
//       <Box className="flex justify-center items-center min-h-[400px]">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box className="max-w-4xl mx-auto p-4">
//       <Typography variant="h4" fontWeight="bold" className="mb-2">
//         My Returns
//       </Typography>
//       <Typography variant="body2" color="text.secondary" className="mb-6">
//         Track and manage your return requests
//       </Typography>

//       {error && (
//         <Alert severity="error" className="mb-4">
//           {error}
//         </Alert>
//       )}

//       {/* Stats */}
//       <Paper className="p-4 mb-6 bg-gray-50">
//         <div className="flex flex-wrap gap-4">
//           {Object.entries(statusCounts).map(([status, count]) => (
//             <div key={status} className="flex items-center gap-2">
//               <Chip
//                 label={`${statusLabels[status] || status}: ${count}`}
//                 color={statusColors[status] || "default"}
//                 size="small"
//               />
//             </div>
//           ))}
//           {returns.length === 0 && (
//             <Typography variant="body2" color="text.secondary">
//               No returns yet
//             </Typography>
//           )}
//         </div>
//       </Paper>

//       {/* Filter Tabs */}
//       <Box className="border-b mb-4">
//         <Tabs value={filter} onChange={(_, v) => setFilter(v)}>
//           <Tab label="All" value="all" />
//           <Tab label="Pending" value="requested" />
//           <Tab label="Approved" value="admin_approved" />
//           <Tab label="Refunded" value="refunded" />
//           <Tab label="Rejected" value="rejected" />
//         </Tabs>
//       </Box>

//       {/* List */}
//       {filteredReturns.length === 0 ? (
//         <Paper className="p-8 text-center">
//           <Typography variant="body1" color="text.secondary">
//             No return requests found.
//           </Typography>
//           <Button component={Link} to="/orders" variant="outlined" className="mt-4">
//             Go to Orders
//           </Button>
//         </Paper>
//       ) : (
//         <Box className="flex flex-col gap-4">
//           {filteredReturns.map((ret, index) => {
//             const orderId = (ret.order as any)?._id || ret.order || "N/A";
//             const orderDisplay =
//               typeof orderId === "string" && orderId !== "N/A"
//                 ? orderId.slice(-8).toUpperCase()
//                 : "N/A";

//             return (
//               <Box key={ret._id || index} className="w-full">
//                 <Card variant="outlined" className="hover:shadow-md transition-shadow">
//                   <CardContent>
//                     <Box className="flex flex-wrap justify-between items-start gap-2">
//                       <div>
//                         <Typography variant="body2" color="text.secondary">
//                           Return #{ret._id?.slice(-8).toUpperCase() || "N/A"}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           Order #{orderDisplay}
//                         </Typography>
//                         <Typography variant="body1" fontWeight="500" className="mt-1">
//                           Reason: {ret.reason}
//                         </Typography>
//                         {ret.description && (
//                           <Typography variant="body2" color="text.secondary">
//                             {ret.description}
//                           </Typography>
//                         )}
//                       </div>
//                       <Chip
//                         icon={getStatusIcon(ret.status)}
//                         label={statusLabels[ret.status] || ret.status}
//                         color={statusColors[ret.status] || "default"}
//                         size="medium"
//                       />
//                     </Box>

//                     <Divider className="my-3" />

//                     <Box className="flex flex-wrap gap-4 items-center">
//                       {ret.returnTrackingId && (
//                         <Typography variant="body2" className="flex items-center gap-1">
//                           <LocalShippingIcon fontSize="small" className="text-gray-500" />
//                           <span className="font-semibold">Tracking:</span>
//                           <span className="text-blue-600 cursor-pointer hover:underline">
//                             {ret.returnTrackingId}
//                           </span>
//                         </Typography>
//                       )}
//                       {ret.status === "refunded" && (
//                         <Typography variant="body2" className="text-green-600 font-semibold">
//                           Refund: ₹{ret.refundAmount}
//                         </Typography>
//                       )}
//                       {ret.adminNote && (
//                         <Typography variant="body2" className="text-gray-500 bg-gray-50 px-2 py-1 rounded">
//                           Note: {ret.adminNote}
//                         </Typography>
//                       )}
//                     </Box>

//                     {ret.media && (
//                       <Box className="flex flex-wrap gap-1 mt-2">
//                         {ret.media.images?.slice(0, 4).map((img, i) => (
//                           <img
//                             key={i}
//                             src={img}
//                             className="w-12 h-12 object-cover rounded border cursor-pointer hover:shadow-md transition"
//                             onClick={() => window.open(img, "_blank")}
//                             alt="Proof"
//                           />
//                         ))}
//                         {ret.media.images?.length > 4 && (
//                           <span className="text-xs text-gray-500 self-center">
//                             +{ret.media.images.length - 4} more
//                           </span>
//                         )}
//                         {ret.media.videos?.length > 0 && (
//                           <span className="text-xs bg-blue-50 px-2 py-1 rounded">
//                             🎬 {ret.media.videos.length} videos
//                           </span>
//                         )}
//                         {ret.media.audio && (
//                           <span className="text-xs bg-purple-50 px-2 py-1 rounded">🎤 Audio</span>
//                         )}
//                       </Box>
//                     )}

//                     <Box className="flex justify-between items-center mt-2">
//                       <Typography variant="caption" color="text.secondary">
//                         Requested:{" "}
//                         {ret.createdAt
//                           ? new Date(ret.createdAt).toLocaleDateString("en-IN", {
//                               day: "numeric",
//                               month: "short",
//                               year: "numeric",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })
//                           : "N/A"}
//                       </Typography>
//                       <IconButton size="small" onClick={() => toggleExpand(ret._id)}>
//                         {expandedId === ret._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                       </IconButton>
//                     </Box>

//                     <Collapse in={expandedId === ret._id}>
//                       <Box className="mt-3 p-3 bg-gray-50 rounded-lg">
//                         <Typography variant="subtitle2" fontWeight="600">
//                           Full Details
//                         </Typography>
//                         <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
//                           <div>
//                             <span className="text-gray-500">Return ID:</span>
//                             <span className="ml-2 font-mono">{ret._id}</span>
//                           </div>
//                           <div>
//                             <span className="text-gray-500">Order ID:</span>
//                             <span className="ml-2 font-mono">{orderId}</span>
//                           </div>
//                           <div>
//                             <span className="text-gray-500">Status:</span>
//                             <span className="ml-2">{statusLabels[ret.status] || ret.status}</span>
//                           </div>
//                           <div>
//                             <span className="text-gray-500">Refund Amount:</span>
//                             <span className="ml-2">₹{ret.refundAmount}</span>
//                           </div>
//                           {ret.returnShipmentId && (
//                             <div className="col-span-2">
//                               <span className="text-gray-500">Shipment ID:</span>
//                               <span className="ml-2 font-mono">{ret.returnShipmentId}</span>
//                             </div>
//                           )}
//                           {ret.pickupAddress && (
//                             <div className="col-span-2">
//                               <span className="text-gray-500">Pickup Address:</span>
//                               <span className="ml-2">{ret.pickupAddress}</span>
//                             </div>
//                           )}
//                         </div>
//                       </Box>
//                     </Collapse>
//                   </CardContent>
//                 </Card>
//               </Box>
//             );
//           })}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default MyReturns;
