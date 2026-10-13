// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import {
//   Button,
//   FormControl,
//   Menu,
//   MenuItem,
//   Select,
//   styled,
//   Chip,
// } from "@mui/material";

// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import {
//   fetchSellers,
//   updateSellerAccountStatus,
//   registerDelhivery,
// } from "../../../Redux Toolkit/Seller/sellerSlice";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const accountStatuses = [
//   { status: "PENDING_VERIFICATION", title: "Pending Verification" },
//   { status: "ACTIVE", title: "Active" },
//   { status: "SUSPENDED", title: "Suspended" },
//   { status: "DEACTIVATED", title: "Deactivated" },
//   { status: "BANNED", title: "Banned" },
//   { status: "CLOSED", title: "Closed" },
// ];

// export default function SellersTable() {
//   const [accountStatus, setAccountStatus] = React.useState("ACTIVE");
//   const { sellers } = useAppSelector((store) => store.sellers);
//   const dispatch = useAppDispatch();

//   React.useEffect(() => {
//     dispatch(fetchSellers(accountStatus));
//   }, [accountStatus, dispatch]);

//   const handleAccountStatusChange = (event: any) => {
//     setAccountStatus(event.target.value);
//   };

//   const handleUpdateSellerAccountStatus = (id: string, status: string) => {
//     dispatch(updateSellerAccountStatus({ id, status }));
//   };

//   const handleRegisterDelhivery = (id: string) => {
//     dispatch(registerDelhivery(id));
//   };

//   const [anchorEl, setAnchorEl] = React.useState<
//     Record<string, HTMLElement | null>
//   >({});

//   const handleClick = (
//     event: React.MouseEvent<HTMLButtonElement>,
//     sellerId: string
//   ) => {
//     setAnchorEl((prev) => ({ ...prev, [sellerId]: event.currentTarget }));
//   };

//   const handleClose = (sellerId: string) => {
//     setAnchorEl((prev) => ({ ...prev, [sellerId]: null }));
//   };

//   return (
//     <>
//       <div className="pb-5 w-60">
//         <FormControl fullWidth>
//           <Select value={accountStatus} onChange={handleAccountStatusChange}>
//             {accountStatuses.map((status) => (
//               <MenuItem key={status.status} value={status.status}>
//                 {status.title}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </div>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }}>
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Seller Name</StyledTableCell>
//               <StyledTableCell>Email</StyledTableCell>
//               <StyledTableCell>Mobile</StyledTableCell>
//               <StyledTableCell>GSTIN</StyledTableCell>
//               <StyledTableCell>Business Name</StyledTableCell>
//               <StyledTableCell>Warehouse Code</StyledTableCell>
// <StyledTableCell>Account Number</StyledTableCell>
// <StyledTableCell>IFSC Code</StyledTableCell>
//               <StyledTableCell align="right">Account Status</StyledTableCell>
//               <StyledTableCell align="right">Change Status</StyledTableCell>
//               <StyledTableCell align="right">Logistics</StyledTableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {sellers?.map((seller) => (
//               <StyledTableRow key={seller._id}>
//                 <StyledTableCell>{seller.sellerName}</StyledTableCell>
//                 <StyledTableCell>{seller.email}</StyledTableCell>
//                 <StyledTableCell>{seller.mobile}</StyledTableCell>
//                 <StyledTableCell>{seller.GSTIN}</StyledTableCell>
//                 <StyledTableCell>
//                   {seller.businessDetails?.businessName}
//                 </StyledTableCell>
//                 <StyledTableCell>
//                   {seller.delhiveryWarehouseCode || "-"}
//                 </StyledTableCell>
// <StyledTableCell>{seller.bankDetails?.accountNumber || "-"}</StyledTableCell>
// <StyledTableCell>{seller.bankDetails?.ifscCode || "-"}</StyledTableCell>

//                 <StyledTableCell align="right">
//                   {seller.accountStatus}
//                 </StyledTableCell>

//                 <StyledTableCell align="right">
//                   <Button
//                     disabled={!seller._id}
//                     onClick={(e) =>
//                       seller._id && handleClick(e, seller._id)
//                     }
//                   >
//                     Change Status
//                   </Button>

//                   {seller._id && (
//                     <Menu
//                       anchorEl={anchorEl[seller._id]}
//                       open={Boolean(anchorEl[seller._id])}
//                       onClose={() => seller._id !== undefined && handleClose(seller._id)}
//                     >
//                       {accountStatuses.map((status) => (
//                         <MenuItem
//                           key={status.status}
//                           onClick={() => {
//                             if (seller._id !== undefined) {
//                               handleUpdateSellerAccountStatus(seller._id, status.status);
//                               handleClose(seller._id);
//                             }
//                           }}
//                         >
//                           {status.title}
//                         </MenuItem>
//                       ))}
//                     </Menu>
//                   )}

//                 </StyledTableCell>

//                 <StyledTableCell align="right">
//                   {!seller.delhiveryWarehouseCode ? (
//                     <Button
//                       size="small"
//                       variant="outlined"
//                       color="primary"
//                       onClick={() => seller._id && handleRegisterDelhivery(seller._id)}
//                     >
//                       Register Delhivery
//                     </Button>
//                   ) : (
//                     <Chip label="Registered" size="small" color="success" />
//                   )}
//                 </StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }




















// import * as React from "react";
// import {
//   Button,
//   FormControl,
//   Menu,
//   MenuItem,
//   Select,
//   Chip,
//   Avatar,
//   Typography,
//   IconButton,
//   TextField,
//   InputAdornment,
//   Dialog,
//   DialogContent,
//   DialogActions,
//   Divider,
//   Tooltip,
//   CircularProgress,
//   Card,
//   CardContent,
//   DialogTitle,
// } from "@mui/material";

// import SearchIcon from "@mui/icons-material/Search";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import CloseIcon from "@mui/icons-material/Close";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import PendingIcon from "@mui/icons-material/Pending";
// import BlockIcon from "@mui/icons-material/Block";
// import DescriptionIcon from "@mui/icons-material/Description";
// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";
// import BusinessIcon from "@mui/icons-material/Business";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import PeopleIcon from "@mui/icons-material/People";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import DownloadIcon from "@mui/icons-material/Download";
// import ZoomInIcon from "@mui/icons-material/ZoomIn";
// import ZoomOutIcon from "@mui/icons-material/ZoomOut";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import {
//   fetchSellers,
//   updateSellerAccountStatus,
//   registerDelhivery,
// } from "../../../Redux Toolkit/Seller/sellerSlice";

// /* ═══════════════════════════════════════════════
//    STATUS CONFIG
//    ═══════════════════════════════════════════════ */
// const accountStatuses = [
//   { status: "PENDING_VERIFICATION", title: "Pending Verification" },
//   { status: "ACTIVE", title: "Active" },
//   { status: "SUSPENDED", title: "Suspended" },
//   { status: "DEACTIVATED", title: "Deactivated" },
//   { status: "BANNED", title: "Banned" },
//   { status: "CLOSED", title: "Closed" },
// ];

// const getStatusConfig = (status: string) => {
//   const configs: any = {
//     ACTIVE: {
//       color: "#16a34a",
//       bg: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
//       border: "#86efac",
//       icon: <CheckCircleIcon sx={{ fontSize: 12 }} />,
//       label: "Active",
//     },
//     PENDING_VERIFICATION: {
//       color: "#d97706",
//       bg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
//       border: "#fcd34d",
//       icon: <PendingIcon sx={{ fontSize: 12 }} />,
//       label: "Pending",
//     },
//     SUSPENDED: {
//       color: "#ea580c",
//       bg: "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)",
//       border: "#fdba74",
//       icon: <BlockIcon sx={{ fontSize: 12 }} />,
//       label: "Suspended",
//     },
//     DEACTIVATED: {
//       color: "#ea580c",
//       bg: "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)",
//       border: "#fdba74",
//       icon: <BlockIcon sx={{ fontSize: 12 }} />,
//       label: "Deactivated",
//     },
//     BANNED: {
//       color: "#dc2626",
//       bg: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
//       border: "#fca5a5",
//       icon: <BlockIcon sx={{ fontSize: 12 }} />,
//       label: "Banned",
//     },
//     CLOSED: {
//       color: "#64748b",
//       bg: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
//       border: "#cbd5e1",
//       icon: <BlockIcon sx={{ fontSize: 12 }} />,
//       label: "Closed",
//     },
//   };
//   return configs[status] || configs.CLOSED;
// };

// /* ═══════════════════════════════════════════════
//    BUILD FILE URL
//    ═══════════════════════════════════════════════ */
// const buildFileUrl = (filename: string | null | undefined) => {
//   if (!filename) return null;
//   const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
//   if (filename.startsWith("http")) return filename;
//   return `${baseURL}/uploads/seller-documents/${filename}`;
// };

// /* ═══════════════════════════════════════════════
//    MINI STAT
//    ═══════════════════════════════════════════════ */
// const MiniStat = ({ label, value, color, icon }: any) => (
//   <div
//     className="rounded-2xl p-4 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
//     style={{
//       background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
//       border: `1px solid ${color}30`,
//     }}
//   >
//     <div
//       className="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10"
//       style={{ background: color }}
//     />
//     <div className="flex items-center justify-between relative z-10">
//       <div>
//         <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//           {label}
//         </p>
//         <p className="text-2xl font-extrabold mt-1" style={{ color }}>
//           {value}
//         </p>
//       </div>
//       <div
//         className="p-2.5 rounded-xl"
//         style={{ background: `${color}20`, color }}
//       >
//         {icon}
//       </div>
//     </div>
//   </div>
// );

// /* ═══════════════════════════════════════════════
//    🔥 DOCUMENT VIEWER MODAL
//    ═══════════════════════════════════════════════ */
// interface DocViewerProps {
//   open: boolean;
//   onClose: () => void;
//   url: string | null;
//   title: string;
// }

// const DocumentViewer: React.FC<DocViewerProps> = ({
//   open,
//   onClose,
//   url,
//   title,
// }) => {
//   const [zoom, setZoom] = React.useState(1);
//   const [loading, setLoading] = React.useState(true);

//   React.useEffect(() => {
//     if (open) {
//       setZoom(1);
//       setLoading(true);
//     }
//   }, [open, url]);

//   if (!url) return null;

//   const isPDF = url.toLowerCase().endsWith(".pdf");
//   const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="lg"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: 3,
//           overflow: "hidden",
//           bgcolor: "#0f172a",
//           maxHeight: "90vh",
//         },
//       }}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
//         <div className="flex items-center gap-3 min-w-0">
//           {isPDF ? (
//             <PictureAsPdfIcon sx={{ color: "#ef4444", fontSize: 24 }} />
//           ) : (
//             <DescriptionIcon sx={{ color: "#6366f1", fontSize: 24 }} />
//           )}
//           <div className="min-w-0">
//             <p className="text-white font-bold text-sm truncate">{title}</p>
//             <p className="text-slate-400 text-xs truncate">{url}</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-1">
//           {/* Zoom Controls (only for images) */}
//           {isImage && (
//             <>
//               <Tooltip title="Zoom Out">
//                 <IconButton
//                   size="small"
//                   onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
//                   sx={{ color: "white" }}
//                 >
//                   <ZoomOutIcon fontSize="small" />
//                 </IconButton>
//               </Tooltip>
//               <span className="text-white text-xs font-mono px-2 min-w-[50px] text-center">
//                 {Math.round(zoom * 100)}%
//               </span>
//               <Tooltip title="Zoom In">
//                 <IconButton
//                   size="small"
//                   onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
//                   sx={{ color: "white" }}
//                 >
//                   <ZoomInIcon fontSize="small" />
//                 </IconButton>
//               </Tooltip>
//             </>
//           )}

//           <Tooltip title="Download">
//             <IconButton
//               size="small"
//               href={url}
//               download
//               target="_blank"
//               sx={{ color: "white" }}
//             >
//               <DownloadIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Open in new tab">
//             <IconButton
//               size="small"
//               href={url}
//               target="_blank"
//               sx={{ color: "white" }}
//             >
//               <OpenInNewIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Close">
//             <IconButton
//               size="small"
//               onClick={onClose}
//               sx={{
//                 color: "white",
//                 bgcolor: "rgba(239,68,68,0.2)",
//                 "&:hover": { bgcolor: "rgba(239,68,68,0.4)" },
//               }}
//             >
//               <CloseIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>
//         </div>
//       </div>

//       {/* Content */}
//       <DialogContent
//         sx={{
//           p: 0,
//           bgcolor: "#1e293b",
//           minHeight: "60vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           overflow: "auto",
//         }}
//       >
//         {loading && (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <CircularProgress sx={{ color: "#6366f1" }} />
//           </div>
//         )}

//         {isPDF ? (
//           /* PDF Viewer */
//           <iframe
//             src={url}
//             title={title}
//             onLoad={() => setLoading(false)}
//             style={{
//               width: "100%",
//               height: "80vh",
//               border: "none",
//               display: loading ? "none" : "block",
//             }}
//           />
//         ) : isImage ? (
//           /* Image Viewer with zoom */
//           <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
//             <img
//               src={url}
//               alt={title}
//               onLoad={() => setLoading(false)}
//               style={{
//                 maxWidth: "100%",
//                 maxHeight: "80vh",
//                 transform: `scale(${zoom})`,
//                 transition: "transform 0.2s ease",
//                 display: loading ? "none" : "block",
//                 borderRadius: 8,
//                 boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
//               }}
//             />
//           </div>
//         ) : (
//           /* Fallback for unknown types */
//           <div className="text-center p-10">
//             <DescriptionIcon sx={{ fontSize: 80, color: "#475569" }} />
//             <p className="text-white mt-4 font-bold">
//               Cannot preview this file
//             </p>
//             <p className="text-slate-400 text-sm mt-2">
//               Click "Open in new tab" or "Download"
//             </p>
//             <Button
//               variant="contained"
//               href={url}
//               target="_blank"
//               startIcon={<OpenInNewIcon />}
//               sx={{ mt: 3, textTransform: "none", borderRadius: 2 }}
//             >
//               Open File
//             </Button>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// /* ═══════════════════════════════════════════════
//    MAIN COMPONENT
//    ═══════════════════════════════════════════════ */
// export default function SellersTable() {
//   const [accountStatus, setAccountStatus] = React.useState("ACTIVE");
//   const [searchQuery, setSearchQuery] = React.useState("");
//   const [selectedSeller, setSelectedSeller] = React.useState<any>(null);
//   const [detailsOpen, setDetailsOpen] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);

//   /* 🔥 Document viewer state */
//   const [docViewer, setDocViewer] = React.useState<{
//     open: boolean;
//     url: string | null;
//     title: string;
//   }>({
//     open: false,
//     url: null,
//     title: "",
//   });

//   const openDoc = (filename: string | null, title: string) => {
//     const url = buildFileUrl(filename);
//     if (url) {
//       setDocViewer({ open: true, url, title });
//     }
//   };

//   const closeDoc = () => {
//     setDocViewer({ open: false, url: null, title: "" });
//   };

//   const { sellers } = useAppSelector((store: any) => store.sellers);
//   const dispatch = useAppDispatch();

//   React.useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       await dispatch(fetchSellers(accountStatus) as any);
//       setLoading(false);
//     };
//     load();
//   }, [accountStatus, dispatch]);

//   const handleAccountStatusChange = (event: any) => {
//     setAccountStatus(event.target.value);
//   };

//   const handleUpdateSellerAccountStatus = (id: string, status: string) => {
//     dispatch(updateSellerAccountStatus({ id, status }) as any);
//   };

//   const handleRegisterDelhivery = (id: string) => {
//     dispatch(registerDelhivery(id) as any);
//   };

//   const handleViewDetails = (seller: any) => {
//     setSelectedSeller(seller);
//     setDetailsOpen(true);
//   };

//   const handleRefresh = async () => {
//     setLoading(true);
//     await dispatch(fetchSellers(accountStatus) as any);
//     setLoading(false);
//   };

//   const [anchorEl, setAnchorEl] = React.useState<
//     Record<string, HTMLElement | null>
//   >({});

//   const handleClick = (
//     event: React.MouseEvent<HTMLButtonElement>,
//     sellerId: string
//   ) => {
//     setAnchorEl((prev) => ({ ...prev, [sellerId]: event.currentTarget }));
//   };

//   const handleClose = (sellerId: string) => {
//     setAnchorEl((prev) => ({ ...prev, [sellerId]: null }));
//   };

//   const filteredSellers = React.useMemo(() => {
//     if (!sellers) return [];
//     if (!searchQuery.trim()) return sellers;
//     const q = searchQuery.toLowerCase();
//     return sellers.filter(
//       (s: any) =>
//         s.sellerName?.toLowerCase().includes(q) ||
//         s.email?.toLowerCase().includes(q) ||
//         s.mobile?.includes(q) ||
//         s.GSTIN?.toLowerCase().includes(q) ||
//         s.businessDetails?.businessName?.toLowerCase().includes(q)
//     );
//   }, [sellers, searchQuery]);

//   const totalCount = filteredSellers.length;
//   const activeCount = filteredSellers.filter(
//     (s: any) => s.accountStatus === "ACTIVE"
//   ).length;
//   const pendingCount = filteredSellers.filter(
//     (s: any) => s.accountStatus === "PENDING_VERIFICATION"
//   ).length;
//   const verifiedCount = filteredSellers.filter(
//     (s: any) => s.delhiveryWarehouseCode
//   ).length;

//   return (
//     <>
//       <style>{`
//         @keyframes fadeSlideIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.6; transform: scale(1.15); }
//         }
//         .seller-card-row {
//           animation: fadeSlideIn 0.5s ease-out both;
//         }
//         .glass-card {
//           backdrop-filter: blur(20px);
//           background: rgba(255, 255, 255, 0.7);
//         }
//       `}</style>

//       {/* ═══ HERO ═══ */}
//       <div className="relative mb-6 rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 shadow-2xl">
//         <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
//         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div className="flex items-center gap-4">
//             <div className="p-3 rounded-2xl bg-white/20 backdrop-blur border border-white/20">
//               <StorefrontIcon sx={{ fontSize: 32, color: "white" }} />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
//                 Sellers Management
//                 <span
//                   className="w-2 h-2 bg-green-400 rounded-full"
//                   style={{ animation: "pulse 2s infinite" }}
//                 />
//               </h1>
//               <p className="text-white/80 text-sm mt-1">
//                 Manage all seller accounts, documents & logistics
//               </p>
//             </div>
//           </div>
//           <div className="bg-white/20 backdrop-blur border border-white/20 rounded-xl px-4 py-2 flex items-center gap-2">
//             <PeopleIcon sx={{ fontSize: 18, color: "white" }} />
//             <span className="text-white font-bold text-sm">
//               {totalCount} Sellers
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* ═══ STATS ═══ */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <MiniStat
//           label="Total"
//           value={totalCount}
//           color="#6366f1"
//           icon={<StorefrontIcon sx={{ fontSize: 22 }} />}
//         />
//         <MiniStat
//           label="Active"
//           value={activeCount}
//           color="#16a34a"
//           icon={<CheckCircleIcon sx={{ fontSize: 22 }} />}
//         />
//         <MiniStat
//           label="Pending"
//           value={pendingCount}
//           color="#d97706"
//           icon={<PendingIcon sx={{ fontSize: 22 }} />}
//         />
//         <MiniStat
//           label="Logistics Ready"
//           value={verifiedCount}
//           color="#8b5cf6"
//           icon={<LocalShippingIcon sx={{ fontSize: 22 }} />}
//         />
//       </div>

//       {/* ═══ TOOLBAR ═══ */}
//       <div className="glass-card rounded-2xl border border-white/40 shadow-lg p-4 mb-6">
//         <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-3">
//           <TextField
//             size="small"
//             placeholder="🔍 Search by name, email, mobile, GSTIN, business..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             fullWidth
//             sx={{
//               flex: 1,
//               maxWidth: { lg: 500 },
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: "12px",
//                 bgcolor: "white",
//               },
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon fontSize="small" sx={{ color: "#94a3b8" }} />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <div className="flex items-center gap-2">
//             <FormControl size="small" sx={{ minWidth: 180 }}>
//               <Select
//                 value={accountStatus}
//                 onChange={handleAccountStatusChange}
//                 startAdornment={
//                   <FilterListIcon
//                     sx={{ fontSize: 18, color: "#6366f1", mr: 1 }}
//                   />
//                 }
//                 sx={{
//                   borderRadius: "12px",
//                   bgcolor: "white",
//                   fontWeight: 600,
//                   "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 }}
//               >
//                 {accountStatuses.map((status) => (
//                   <MenuItem key={status.status} value={status.status}>
//                     {status.title}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             <Tooltip title="Refresh">
//               <IconButton
//                 onClick={handleRefresh}
//                 sx={{
//                   bgcolor: "#eef2ff",
//                   color: "#4f46e5",
//                   border: "1px solid #c7d2fe",
//                 }}
//               >
//                 <RefreshIcon fontSize="small" />
//               </IconButton>
//             </Tooltip>
//           </div>
//         </div>
//       </div>

//       {/* ═══ LOADING ═══ */}
//       {loading && (
//         <div className="text-center py-10 bg-white rounded-2xl">
//           <CircularProgress size={40} sx={{ color: "#6366f1" }} />
//           <p className="text-gray-500 mt-3 text-sm font-medium">
//             Loading sellers...
//           </p>
//         </div>
//       )}

//       {/* ═══ EMPTY ═══ */}
//       {!loading && filteredSellers.length === 0 && (
//         <div className="bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100">
//           <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 mb-4">
//             <StorefrontIcon sx={{ fontSize: 60, color: "#6366f1" }} />
//           </div>
//           <Typography className="text-gray-700 font-bold text-lg">
//             No Sellers Found
//           </Typography>
//           <Typography className="text-gray-400 text-sm mt-2">
//             {searchQuery
//               ? `No results matching "${searchQuery}"`
//               : `No sellers with status "${accountStatus}"`}
//           </Typography>
//         </div>
//       )}

//       {/* ═══ SELLER CARDS ═══ */}
//       {!loading && filteredSellers.length > 0 && (
//         <div className="space-y-4">
//           {filteredSellers.map((seller: any, idx: number) => {
//             const statusConfig = getStatusConfig(seller.accountStatus);
//             const docs = seller.documents || {};
//             const docCount = [
//               docs.gstCertificate,
//               docs.panCard,
//               docs.bankProof,
//             ].filter(Boolean).length;

//             return (
//               <div
//                 key={seller._id}
//                 className="seller-card-row group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 hover:border-indigo-200 transition-all duration-300 overflow-hidden"
//                 style={{ animationDelay: `${idx * 0.05}s` }}
//               >
//                 <div
//                   className="h-1 w-full"
//                   style={{ background: statusConfig.color }}
//                 />

//                 <div className="p-5">
//                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
//                     {/* SELLER */}
//                     <div className="lg:col-span-3 flex items-center gap-3">
//                       <div className="relative">
//                         <Avatar
//                           sx={{
//                             width: 56,
//                             height: 56,
//                             background:
//                               "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
//                             fontWeight: 800,
//                             fontSize: 22,
//                             boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
//                           }}
//                         >
//                           {seller.sellerName?.charAt(0)?.toUpperCase() || "S"}
//                         </Avatar>
//                         {seller.delhiveryWarehouseCode && (
//                           <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
//                             <VerifiedIcon
//                               sx={{ fontSize: 18, color: "#16a34a" }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                       <div className="min-w-0">
//                         <p className="font-bold text-gray-800 text-base truncate">
//                           {seller.sellerName}
//                         </p>
//                         <p className="text-xs text-gray-400 font-mono">
//                           #{seller._id?.slice(-8)}
//                         </p>
//                         <Chip
//                           icon={statusConfig.icon}
//                           label={statusConfig.label}
//                           size="small"
//                           sx={{
//                             mt: 0.5,
//                             height: 22,
//                             background: statusConfig.bg,
//                             color: statusConfig.color,
//                             fontWeight: 700,
//                             fontSize: 10,
//                             border: `1px solid ${statusConfig.border}`,
//                             "& .MuiChip-icon": { color: statusConfig.color },
//                           }}
//                         />
//                       </div>
//                     </div>

//                     {/* CONTACT */}
//                     <div className="lg:col-span-2 space-y-1">
//                       <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
//                         Contact
//                       </p>
//                       <p className="text-xs text-gray-700 flex items-center gap-1.5 truncate">
//                         <EmailIcon sx={{ fontSize: 14, color: "#6366f1" }} />
//                         <span className="truncate">{seller.email}</span>
//                       </p>
//                       <p className="text-xs text-gray-700 flex items-center gap-1.5">
//                         <PhoneIcon sx={{ fontSize: 14, color: "#6366f1" }} />
//                         {seller.mobile}
//                       </p>
//                     </div>

//                     {/* BUSINESS */}
//                     <div className="lg:col-span-2 space-y-1">
//                       <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
//                         Business
//                       </p>
//                       <p className="text-sm font-semibold text-gray-800 truncate">
//                         {seller.businessDetails?.businessName || "-"}
//                       </p>
//                       <p className="text-[11px] text-gray-500 font-mono truncate">
//                         {seller.GSTIN || "N/A"}
//                       </p>
//                     </div>

//                     {/* BANK */}
//                     <div className="lg:col-span-2 space-y-1">
//                       <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
//                         Bank
//                       </p>
//                       <p className="text-[11px] font-mono text-gray-700 truncate">
//                         A/C: {seller.bankDetails?.accountNumber || "-"}
//                       </p>
//                       <p className="text-[11px] font-mono text-gray-500 truncate">
//                         IFSC: {seller.bankDetails?.ifscCode || "-"}
//                       </p>
//                     </div>

//                     {/* DOCUMENTS – open in MODAL */}
//                     <div className="lg:col-span-1">
//                       <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
//                         Docs
//                       </p>
//                       <div className="flex items-center gap-1">
//                         <Tooltip title="GST Certificate">
//                           <span>
//                             <IconButton
//                               size="small"
//                               disabled={!docs.gstCertificate}
//                               onClick={() =>
//                                 openDoc(docs.gstCertificate, "GST Certificate")
//                               }
//                               sx={{
//                                 width: 28,
//                                 height: 28,
//                                 bgcolor: docs.gstCertificate
//                                   ? "#eff6ff"
//                                   : "#f8fafc",
//                                 color: docs.gstCertificate
//                                   ? "#2563eb"
//                                   : "#cbd5e1",
//                                 border: docs.gstCertificate
//                                   ? "1px solid #bfdbfe"
//                                   : "1px solid #e2e8f0",
//                                 "&:hover": {
//                                   bgcolor: docs.gstCertificate
//                                     ? "#dbeafe"
//                                     : "#f8fafc",
//                                   transform: "translateY(-2px)",
//                                 },
//                                 transition: "all 0.2s",
//                               }}
//                             >
//                               <DescriptionIcon sx={{ fontSize: 14 }} />
//                             </IconButton>
//                           </span>
//                         </Tooltip>

//                         <Tooltip title="PAN Card">
//                           <span>
//                             <IconButton
//                               size="small"
//                               disabled={!docs.panCard}
//                               onClick={() =>
//                                 openDoc(docs.panCard, "PAN Card")
//                               }
//                               sx={{
//                                 width: 28,
//                                 height: 28,
//                                 bgcolor: docs.panCard
//                                   ? "#fef3c7"
//                                   : "#f8fafc",
//                                 color: docs.panCard ? "#d97706" : "#cbd5e1",
//                                 border: docs.panCard
//                                   ? "1px solid #fde68a"
//                                   : "1px solid #e2e8f0",
//                                 "&:hover": {
//                                   bgcolor: docs.panCard
//                                     ? "#fde68a"
//                                     : "#f8fafc",
//                                   transform: "translateY(-2px)",
//                                 },
//                                 transition: "all 0.2s",
//                               }}
//                             >
//                               <ReceiptLongIcon sx={{ fontSize: 14 }} />
//                             </IconButton>
//                           </span>
//                         </Tooltip>

//                         <Tooltip title="Bank Proof">
//                           <span>
//                             <IconButton
//                               size="small"
//                               disabled={!docs.bankProof}
//                               onClick={() =>
//                                 openDoc(docs.bankProof, "Bank Proof")
//                               }
//                               sx={{
//                                 width: 28,
//                                 height: 28,
//                                 bgcolor: docs.bankProof
//                                   ? "#dcfce7"
//                                   : "#f8fafc",
//                                 color: docs.bankProof
//                                   ? "#16a34a"
//                                   : "#cbd5e1",
//                                 border: docs.bankProof
//                                   ? "1px solid #bbf7d0"
//                                   : "1px solid #e2e8f0",
//                                 "&:hover": {
//                                   bgcolor: docs.bankProof
//                                     ? "#bbf7d0"
//                                     : "#f8fafc",
//                                   transform: "translateY(-2px)",
//                                 },
//                                 transition: "all 0.2s",
//                               }}
//                             >
//                               <AccountBalanceIcon sx={{ fontSize: 14 }} />
//                             </IconButton>
//                           </span>
//                         </Tooltip>
//                       </div>
//                       <p className="text-[10px] text-gray-400 mt-1">
//                         {docCount}/3 uploaded
//                       </p>
//                     </div>

//                     {/* LOGISTICS */}
//                     <div className="lg:col-span-1">
//                       <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
//                         Logistics
//                       </p>
//                       {seller.delhiveryWarehouseCode ? (
//                         <Chip
//                           icon={<LocalShippingIcon sx={{ fontSize: 12 }} />}
//                           label={seller.delhiveryWarehouseCode}
//                           size="small"
//                           sx={{
//                             height: 22,
//                             bgcolor: "#ede9fe",
//                             color: "#7c3aed",
//                             fontWeight: 700,
//                             fontSize: 10,
//                             fontFamily: "monospace",
//                             "& .MuiChip-icon": { color: "#7c3aed" },
//                           }}
//                         />
//                       ) : (
//                         <Button
//                           size="small"
//                           variant="outlined"
//                           startIcon={
//                             <LocalShippingIcon sx={{ fontSize: 12 }} />
//                           }
//                           onClick={() =>
//                             seller._id && handleRegisterDelhivery(seller._id)
//                           }
//                           sx={{
//                             fontSize: 10,
//                             textTransform: "none",
//                             py: 0.3,
//                             px: 1,
//                             borderRadius: 2,
//                           }}
//                         >
//                           Register
//                         </Button>
//                       )}
//                     </div>

//                     {/* ACTIONS */}
//                     <div className="lg:col-span-1 flex items-center justify-end gap-1">
//                       <Tooltip title="View Details">
//                         <IconButton
//                           size="small"
//                           onClick={() => handleViewDetails(seller)}
//                           sx={{
//                             bgcolor: "#eef2ff",
//                             color: "#4f46e5",
//                             border: "1px solid #c7d2fe",
//                             "&:hover": {
//                               bgcolor: "#6366f1",
//                               color: "white",
//                               transform: "scale(1.1)",
//                             },
//                             transition: "all 0.2s",
//                           }}
//                         >
//                           <VisibilityIcon sx={{ fontSize: 16 }} />
//                         </IconButton>
//                       </Tooltip>

//                       <Tooltip title="Change Status">
//                         <IconButton
//                           size="small"
//                           onClick={(e) =>
//                             seller._id && handleClick(e as any, seller._id)
//                           }
//                           sx={{
//                             bgcolor: "#f0fdf4",
//                             color: "#16a34a",
//                             border: "1px solid #bbf7d0",
//                             "&:hover": {
//                               bgcolor: "#16a34a",
//                               color: "white",
//                               transform: "scale(1.1)",
//                             },
//                             transition: "all 0.2s",
//                           }}
//                         >
//                           <MoreVertIcon sx={{ fontSize: 16 }} />
//                         </IconButton>
//                       </Tooltip>

//                       {seller._id && (
//                         <Menu
//                           anchorEl={anchorEl[seller._id]}
//                           open={Boolean(anchorEl[seller._id])}
//                           onClose={() => handleClose(seller._id)}
//                           PaperProps={{
//                             sx: { minWidth: 200, borderRadius: 2, mt: 1 },
//                           }}
//                         >
//                           <MenuItem
//                             disabled
//                             sx={{ fontSize: 11, fontWeight: 700 }}
//                           >
//                             CHANGE STATUS
//                           </MenuItem>
//                           <Divider />
//                           {accountStatuses.map((status) => {
//                             const cfg = getStatusConfig(status.status);
//                             return (
//                               <MenuItem
//                                 key={status.status}
//                                 onClick={() => {
//                                   handleUpdateSellerAccountStatus(
//                                     seller._id,
//                                     status.status
//                                   );
//                                   handleClose(seller._id);
//                                 }}
//                                 sx={{
//                                   fontSize: 13,
//                                   gap: 1.5,
//                                   "&:hover": { bgcolor: cfg.bg },
//                                 }}
//                               >
//                                 <span style={{ color: cfg.color }}>
//                                   {cfg.icon}
//                                 </span>
//                                 {status.title}
//                               </MenuItem>
//                             );
//                           })}
//                         </Menu>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* ═══ DETAILS DIALOG ═══ */}
//       <Dialog
//         open={detailsOpen}
//         onClose={() => setDetailsOpen(false)}
//         maxWidth="md"
//         fullWidth
//         PaperProps={{
//           sx: { borderRadius: 4, overflow: "hidden", bgcolor: "#f8fafc" },
//         }}
//       >
//         {selectedSeller && (
//           <>
//             <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6">
//               <IconButton
//                 onClick={() => setDetailsOpen(false)}
//                 sx={{
//                   position: "absolute",
//                   top: 12,
//                   right: 12,
//                   color: "white",
//                   bgcolor: "rgba(255,255,255,0.2)",
//                 }}
//               >
//                 <CloseIcon />
//               </IconButton>

//               <div className="flex items-center gap-5">
//                 <Avatar
//                   sx={{
//                     width: 80,
//                     height: 80,
//                     bgcolor: "white",
//                     color: "#6366f1",
//                     fontSize: 32,
//                     fontWeight: 800,
//                     border: "4px solid rgba(255,255,255,0.3)",
//                   }}
//                 >
//                   {selectedSeller.sellerName?.charAt(0)?.toUpperCase()}
//                 </Avatar>
//                 <div>
//                   <Typography className="text-white font-extrabold text-2xl">
//                     {selectedSeller.sellerName}
//                   </Typography>
//                   <Typography className="text-white/80 text-sm mt-1 flex items-center gap-1">
//                     <BusinessIcon sx={{ fontSize: 16 }} />
//                     {selectedSeller.businessDetails?.businessName}
//                   </Typography>
//                   <Chip
//                     label={selectedSeller.accountStatus?.replace(/_/g, " ")}
//                     size="small"
//                     sx={{
//                       mt: 1.5,
//                       bgcolor: "rgba(255,255,255,0.25)",
//                       color: "white",
//                       fontWeight: 700,
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             <DialogContent sx={{ p: 3 }}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Card sx={{ borderRadius: 3 }}>
//                   <CardContent>
//                     <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
//                       <PhoneIcon sx={{ fontSize: 18, color: "#6366f1" }} />
//                       Contact Information
//                     </Typography>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">Email</span>
//                         <span className="font-medium">
//                           {selectedSeller.email}
//                         </span>
//                       </div>
//                       <Divider />
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">Mobile</span>
//                         <span className="font-medium">
//                           {selectedSeller.mobile}
//                         </span>
//                       </div>
//                       <Divider />
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">GSTIN</span>
//                         <span className="font-medium font-mono text-xs">
//                           {selectedSeller.GSTIN}
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card sx={{ borderRadius: 3 }}>
//                   <CardContent>
//                     <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
//                       <AccountBalanceIcon
//                         sx={{ fontSize: 18, color: "#16a34a" }}
//                       />
//                       Bank Details
//                     </Typography>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">A/C No.</span>
//                         <span className="font-medium font-mono text-xs">
//                           {selectedSeller.bankDetails?.accountNumber || "-"}
//                         </span>
//                       </div>
//                       <Divider />
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">IFSC</span>
//                         <span className="font-medium font-mono text-xs">
//                           {selectedSeller.bankDetails?.ifscCode || "-"}
//                         </span>
//                       </div>
//                       <Divider />
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">Holder</span>
//                         <span className="font-medium">
//                           {selectedSeller.bankDetails?.accountHolderName ||
//                             "-"}
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card sx={{ borderRadius: 3 }}>
//                   <CardContent>
//                     <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
//                       <StorefrontIcon
//                         sx={{ fontSize: 18, color: "#8b5cf6" }}
//                       />
//                       Business Details
//                     </Typography>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">Name</span>
//                         <span className="font-medium">
//                           {selectedSeller.businessDetails?.businessName || "-"}
//                         </span>
//                       </div>
//                       <Divider />
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">Email</span>
//                         <span className="font-medium text-xs">
//                           {selectedSeller.businessDetails?.businessEmail ||
//                             "-"}
//                         </span>
//                       </div>
//                       <Divider />
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">Mobile</span>
//                         <span className="font-medium">
//                           {selectedSeller.businessDetails?.businessMobile ||
//                             "-"}
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card sx={{ borderRadius: 3 }}>
//                   <CardContent>
//                     <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
//                       <LocalShippingIcon
//                         sx={{ fontSize: 18, color: "#f59e0b" }}
//                       />
//                       Logistics
//                     </Typography>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-500">Warehouse Code</span>
//                       <span className="font-medium font-mono text-xs">
//                         {selectedSeller.delhiveryWarehouseCode ||
//                           "Not registered"}
//                       </span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* Pickup Address */}
//               {selectedSeller.pickupAddress && (
//                 <Card sx={{ mt: 3, borderRadius: 3 }}>
//                   <CardContent>
//                     <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
//                       <LocationOnIcon
//                         sx={{ fontSize: 18, color: "#ef4444" }}
//                       />
//                       Pickup Address
//                     </Typography>
//                     <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 text-sm border border-gray-100">
//                       <p className="font-bold text-gray-800">
//                         {selectedSeller.pickupAddress.name}
//                       </p>
//                       <p className="text-gray-600 mt-1">
//                         {selectedSeller.pickupAddress.address}
//                       </p>
//                       <p className="text-gray-600">
//                         {selectedSeller.pickupAddress.locality},{" "}
//                         {selectedSeller.pickupAddress.city},{" "}
//                         {selectedSeller.pickupAddress.state} -{" "}
//                         {selectedSeller.pickupAddress.pinCode}
//                       </p>
//                       <p className="text-gray-500 text-xs mt-2 flex items-center gap-1">
//                         <PhoneIcon sx={{ fontSize: 12 }} />
//                         {selectedSeller.pickupAddress.mobile}
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}

//               {/* Documents with Modal Viewer */}
//               <Card sx={{ mt: 3, borderRadius: 3 }}>
//                 <CardContent>
//                   <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
//                     <DescriptionIcon
//                       sx={{ fontSize: 18, color: "#6366f1" }}
//                     />
//                     Uploaded Documents
//                   </Typography>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                     {/* GST */}
//                     <div
//                       onClick={() =>
//                         selectedSeller.documents?.gstCertificate &&
//                         openDoc(
//                           selectedSeller.documents.gstCertificate,
//                           "GST Certificate"
//                         )
//                       }
//                       className={`border-2 border-dashed border-blue-300 rounded-xl p-4 text-center bg-gradient-to-br from-blue-50 to-white transition ${
//                         selectedSeller.documents?.gstCertificate
//                           ? "cursor-pointer hover:from-blue-100 hover:shadow-md"
//                           : ""
//                       }`}
//                     >
//                       <div className="inline-flex p-3 rounded-full bg-blue-100">
//                         <DescriptionIcon
//                           sx={{ fontSize: 28, color: "#2563eb" }}
//                         />
//                       </div>
//                       <p className="text-xs font-bold text-gray-700 mt-2">
//                         GST Certificate
//                       </p>
//                       {selectedSeller.documents?.gstCertificate ? (
//                         <p className="text-[10px] text-blue-600 mt-1 font-bold">
//                           👁 Click to view
//                         </p>
//                       ) : (
//                         <p className="text-xs text-gray-400 mt-1">
//                           Not uploaded
//                         </p>
//                       )}
//                     </div>

//                     {/* PAN */}
//                     <div
//                       onClick={() =>
//                         selectedSeller.documents?.panCard &&
//                         openDoc(selectedSeller.documents.panCard, "PAN Card")
//                       }
//                       className={`border-2 border-dashed border-amber-300 rounded-xl p-4 text-center bg-gradient-to-br from-amber-50 to-white transition ${
//                         selectedSeller.documents?.panCard
//                           ? "cursor-pointer hover:from-amber-100 hover:shadow-md"
//                           : ""
//                       }`}
//                     >
//                       <div className="inline-flex p-3 rounded-full bg-amber-100">
//                         <ReceiptLongIcon
//                           sx={{ fontSize: 28, color: "#d97706" }}
//                         />
//                       </div>
//                       <p className="text-xs font-bold text-gray-700 mt-2">
//                         PAN Card
//                       </p>
//                       {selectedSeller.documents?.panCard ? (
//                         <p className="text-[10px] text-amber-600 mt-1 font-bold">
//                           👁 Click to view
//                         </p>
//                       ) : (
//                         <p className="text-xs text-gray-400 mt-1">
//                           Not uploaded
//                         </p>
//                       )}
//                     </div>

//                     {/* Bank Proof */}
//                     <div
//                       onClick={() =>
//                         selectedSeller.documents?.bankProof &&
//                         openDoc(
//                           selectedSeller.documents.bankProof,
//                           "Bank Proof"
//                         )
//                       }
//                       className={`border-2 border-dashed border-green-300 rounded-xl p-4 text-center bg-gradient-to-br from-green-50 to-white transition ${
//                         selectedSeller.documents?.bankProof
//                           ? "cursor-pointer hover:from-green-100 hover:shadow-md"
//                           : ""
//                       }`}
//                     >
//                       <div className="inline-flex p-3 rounded-full bg-green-100">
//                         <AccountBalanceIcon
//                           sx={{ fontSize: 28, color: "#16a34a" }}
//                         />
//                       </div>
//                       <p className="text-xs font-bold text-gray-700 mt-2">
//                         Bank Proof
//                       </p>
//                       <p className="text-[10px] text-gray-500">
//                         {selectedSeller.documents?.bankProofType
//                           ?.replace(/_/g, " ")
//                           .toUpperCase() || "N/A"}
//                       </p>
//                       {selectedSeller.documents?.bankProof ? (
//                         <p className="text-[10px] text-green-600 mt-1 font-bold">
//                           👁 Click to view
//                         </p>
//                       ) : (
//                         <p className="text-xs text-gray-400 mt-1">
//                           Not uploaded
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </DialogContent>

//             <DialogActions sx={{ p: 3, bgcolor: "white" }}>
//               <Button
//                 onClick={() => setDetailsOpen(false)}
//                 variant="outlined"
//                 sx={{
//                   textTransform: "none",
//                   borderRadius: 2,
//                   fontWeight: 700,
//                 }}
//               >
//                 Close
//               </Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog>

//       {/* 🔥 DOCUMENT VIEWER MODAL */}
//       <DocumentViewer
//         open={docViewer.open}
//         onClose={closeDoc}
//         url={docViewer.url}
//         title={docViewer.title}
//       />
//     </>
//   );
// }






























// import * as React from "react";
// import {
//   Button,
//   FormControl,
//   Menu,
//   MenuItem,
//   Select,
//   Chip,
//   Avatar,
//   Typography,
//   IconButton,
//   TextField,
//   InputAdornment,
//   Dialog,
//   DialogContent,
//   DialogActions,
//   Divider,
//   Tooltip,
//   CircularProgress,
//   Card,
//   CardContent,
//   DialogTitle,
// } from "@mui/material";

// import SearchIcon from "@mui/icons-material/Search";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import CloseIcon from "@mui/icons-material/Close";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import PendingIcon from "@mui/icons-material/Pending";
// import BlockIcon from "@mui/icons-material/Block";
// import DescriptionIcon from "@mui/icons-material/Description";
// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";
// import BusinessIcon from "@mui/icons-material/Business";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import PeopleIcon from "@mui/icons-material/People";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import DownloadIcon from "@mui/icons-material/Download";
// import ZoomInIcon from "@mui/icons-material/ZoomIn";
// import ZoomOutIcon from "@mui/icons-material/ZoomOut";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import {
//   fetchSellers,
//   updateSellerAccountStatus,
//   registerDelhivery,
// } from "../../../Redux Toolkit/Seller/sellerSlice";

// // 🔥 IMPORT API CONFIG
// import {api} from "../../../Config/Api";
// // Agar aapke api.ts me alag naam hai toh yahan change karo:
// // import { API_BASE_URL } from "../../../config/api";
// // import { BASE_URL } from "../../../config/api";

// /* ═══════════════════════════════════════════════
//    🔥 BUILD FILE URL — API CONFIG KE HISAAB SE
//    ═══════════════════════════════════════════════ */
// const buildFileUrl = (filename: string | null | undefined) => {
//   if (!filename) return null;

//   // Agar already full URL hai toh waisa hi return karo
//   if (filename.startsWith("http")) return filename;

//   // 🔥 api.ts se baseURL lo
//   let baseURL = "";

//   // PATTERN 1: Axios instance (api.defaults.baseURL)
//   if (api && api.defaults && api.defaults.baseURL) {
//     baseURL = api.defaults.baseURL;
//   }
//   // PATTERN 2: Agar api.ts me direct BASE_URL export hai
//   // else if (typeof BASE_URL !== "undefined") {
//   //   baseURL = BASE_URL;
//   // }

//   // Safety check
//   if (!baseURL) {
//     console.warn("⚠️ API baseURL not found in config/api.ts");
//     baseURL = "";
//   }

//   // /api suffix hata do (kyunki uploads root pe hote hain)
//   const rootURL = baseURL.replace(/\/api\/?$/, "").replace(/\/$/, "");

//   return `${rootURL}/uploads/seller-documents/${filename}`;
// };

// /* ═══════════════════════════════════════════════
//    STATUS CONFIG
//    ═══════════════════════════════════════════════ */
// const accountStatuses = [
//   { status: "PENDING_VERIFICATION", title: "Pending Verification" },
//   { status: "ACTIVE", title: "Active" },
//   { status: "SUSPENDED", title: "Suspended" },
//   { status: "DEACTIVATED", title: "Deactivated" },
//   { status: "BANNED", title: "Banned" },
//   { status: "CLOSED", title: "Closed" },
// ];

// const getStatusConfig = (status: string) => {
//   const configs: any = {
//     ACTIVE: {
//       color: "#16a34a",
//       bg: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
//       border: "#86efac",
//       icon: <CheckCircleIcon sx={{ fontSize: 12 }} />,
//       label: "Active",
//     },
//     PENDING_VERIFICATION: {
//       color: "#d97706",
//       bg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
//       border: "#fcd34d",
//       icon: <PendingIcon sx={{ fontSize: 12 }} />,
//       label: "Pending",
//     },
//     SUSPENDED: {
//       color: "#ea580c",
//       bg: "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)",
//       border: "#fdba74",
//       icon: <BlockIcon sx={{ fontSize: 12 }} />,
//       label: "Suspended",
//     },
//     DEACTIVATED: {
//       color: "#ea580c",
//       bg: "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)",
//       border: "#fdba74",
//       icon: <BlockIcon sx={{ fontSize: 12 }} />,
//       label: "Deactivated",
//     },
//     BANNED: {
//       color: "#dc2626",
//       bg: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
//       border: "#fca5a5",
//       icon: <BlockIcon sx={{ fontSize: 12 }} />,
//       label: "Banned",
//     },
//     CLOSED: {
//       color: "#64748b",
//       bg: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
//       border: "#cbd5e1",
//       icon: <BlockIcon sx={{ fontSize: 12 }} />,
//       label: "Closed",
//     },
//   };
//   return configs[status] || configs.CLOSED;
// };

// /* ═══════════════════════════════════════════════
//    MINI STAT
//    ═══════════════════════════════════════════════ */
// const MiniStat = ({ label, value, color, icon }: any) => (
//   <div
//     className="rounded-2xl p-4 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
//     style={{
//       background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
//       border: `1px solid ${color}30`,
//     }}
//   >
//     <div
//       className="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10"
//       style={{ background: color }}
//     />
//     <div className="flex items-center justify-between relative z-10">
//       <div>
//         <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//           {label}
//         </p>
//         <p className="text-2xl font-extrabold mt-1" style={{ color }}>
//           {value}
//         </p>
//       </div>
//       <div
//         className="p-2.5 rounded-xl"
//         style={{ background: `${color}20`, color }}
//       >
//         {icon}
//       </div>
//     </div>
//   </div>
// );

// /* ═══════════════════════════════════════════════
//    🔥 DOCUMENT VIEWER MODAL
//    ═══════════════════════════════════════════════ */
// interface DocViewerProps {
//   open: boolean;
//   onClose: () => void;
//   url: string | null;
//   title: string;
// }

// const DocumentViewer: React.FC<DocViewerProps> = ({
//   open,
//   onClose,
//   url,
//   title,
// }) => {
//   const [zoom, setZoom] = React.useState(1);
//   const [loading, setLoading] = React.useState(true);

//   React.useEffect(() => {
//     if (open) {
//       setZoom(1);
//       setLoading(true);
//     }
//   }, [open, url]);

//   if (!url) return null;

//   const isPDF = url.toLowerCase().endsWith(".pdf");
//   const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="lg"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: 3,
//           overflow: "hidden",
//           bgcolor: "#0f172a",
//           maxHeight: "90vh",
//         },
//       }}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
//         <div className="flex items-center gap-3 min-w-0">
//           {isPDF ? (
//             <PictureAsPdfIcon sx={{ color: "#ef4444", fontSize: 24 }} />
//           ) : (
//             <DescriptionIcon sx={{ color: "#6366f1", fontSize: 24 }} />
//           )}
//           <div className="min-w-0">
//             <p className="text-white font-bold text-sm truncate">{title}</p>
//             <p className="text-slate-400 text-xs truncate">{url}</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-1">
//           {isImage && (
//             <>
//               <Tooltip title="Zoom Out">
//                 <IconButton
//                   size="small"
//                   onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
//                   sx={{ color: "white" }}
//                 >
//                   <ZoomOutIcon fontSize="small" />
//                 </IconButton>
//               </Tooltip>
//               <span className="text-white text-xs font-mono px-2 min-w-[50px] text-center">
//                 {Math.round(zoom * 100)}%
//               </span>
//               <Tooltip title="Zoom In">
//                 <IconButton
//                   size="small"
//                   onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
//                   sx={{ color: "white" }}
//                 >
//                   <ZoomInIcon fontSize="small" />
//                 </IconButton>
//               </Tooltip>
//             </>
//           )}

//           <Tooltip title="Download">
//             <IconButton
//               size="small"
//               href={url}
//               download
//               target="_blank"
//               sx={{ color: "white" }}
//             >
//               <DownloadIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Open in new tab">
//             <IconButton
//               size="small"
//               href={url}
//               target="_blank"
//               sx={{ color: "white" }}
//             >
//               <OpenInNewIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Close">
//             <IconButton
//               size="small"
//               onClick={onClose}
//               sx={{
//                 color: "white",
//                 bgcolor: "rgba(239,68,68,0.2)",
//                 "&:hover": { bgcolor: "rgba(239,68,68,0.4)" },
//               }}
//             >
//               <CloseIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>
//         </div>
//       </div>

//       {/* Content */}
//       <DialogContent
//         sx={{
//           p: 0,
//           bgcolor: "#1e293b",
//           minHeight: "60vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           overflow: "auto",
//         }}
//       >
//         {loading && (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <CircularProgress sx={{ color: "#6366f1" }} />
//           </div>
//         )}

//         {isPDF ? (
//           <iframe
//             src={url}
//             title={title}
//             onLoad={() => setLoading(false)}
//             style={{
//               width: "100%",
//               height: "80vh",
//               border: "none",
//               display: loading ? "none" : "block",
//             }}
//           />
//         ) : isImage ? (
//           <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
//             <img
//               src={url}
//               alt={title}
//               onLoad={() => setLoading(false)}
//               style={{
//                 maxWidth: "100%",
//                 maxHeight: "80vh",
//                 transform: `scale(${zoom})`,
//                 transition: "transform 0.2s ease",
//                 display: loading ? "none" : "block",
//                 borderRadius: 8,
//                 boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
//               }}
//             />
//           </div>
//         ) : (
//           <div className="text-center p-10">
//             <DescriptionIcon sx={{ fontSize: 80, color: "#475569" }} />
//             <p className="text-white mt-4 font-bold">
//               Cannot preview this file
//             </p>
//             <p className="text-slate-400 text-sm mt-2">
//               Click "Open in new tab" or "Download"
//             </p>
//             <Button
//               variant="contained"
//               href={url}
//               target="_blank"
//               startIcon={<OpenInNewIcon />}
//               sx={{ mt: 3, textTransform: "none", borderRadius: 2 }}
//             >
//               Open File
//             </Button>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// /* ═══════════════════════════════════════════════
//    MAIN COMPONENT
//    ═══════════════════════════════════════════════ */
// export default function SellersTable() {
//   const [accountStatus, setAccountStatus] = React.useState("ACTIVE");
//   const [searchQuery, setSearchQuery] = React.useState("");
//   const [selectedSeller, setSelectedSeller] = React.useState<any>(null);
//   const [detailsOpen, setDetailsOpen] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);

//   const [docViewer, setDocViewer] = React.useState<{
//     open: boolean;
//     url: string | null;
//     title: string;
//   }>({
//     open: false,
//     url: null,
//     title: "",
//   });

//   const openDoc = (filename: string | null, title: string) => {
//     const url = buildFileUrl(filename);
//     if (url) {
//       setDocViewer({ open: true, url, title });
//     }
//   };

//   const closeDoc = () => {
//     setDocViewer({ open: false, url: null, title: "" });
//   };

//   const { sellers } = useAppSelector((store: any) => store.sellers);
//   const dispatch = useAppDispatch();

//   React.useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       await dispatch(fetchSellers(accountStatus) as any);
//       setLoading(false);
//     };
//     load();
//   }, [accountStatus, dispatch]);

//   const handleAccountStatusChange = (event: any) => {
//     setAccountStatus(event.target.value);
//   };

//   const handleUpdateSellerAccountStatus = (id: string, status: string) => {
//     dispatch(updateSellerAccountStatus({ id, status }) as any);
//   };

//   const handleRegisterDelhivery = (id: string) => {
//     dispatch(registerDelhivery(id) as any);
//   };

//   const handleViewDetails = (seller: any) => {
//     setSelectedSeller(seller);
//     setDetailsOpen(true);
//   };

//   const handleRefresh = async () => {
//     setLoading(true);
//     await dispatch(fetchSellers(accountStatus) as any);
//     setLoading(false);
//   };

//   const [anchorEl, setAnchorEl] = React.useState<
//     Record<string, HTMLElement | null>
//   >({});

//   const handleClick = (
//     event: React.MouseEvent<HTMLButtonElement>,
//     sellerId: string
//   ) => {
//     setAnchorEl((prev) => ({ ...prev, [sellerId]: event.currentTarget }));
//   };

//   const handleClose = (sellerId: string) => {
//     setAnchorEl((prev) => ({ ...prev, [sellerId]: null }));
//   };

//   const filteredSellers = React.useMemo(() => {
//     if (!sellers) return [];
//     if (!searchQuery.trim()) return sellers;
//     const q = searchQuery.toLowerCase();
//     return sellers.filter(
//       (s: any) =>
//         s.sellerName?.toLowerCase().includes(q) ||
//         s.email?.toLowerCase().includes(q) ||
//         s.mobile?.includes(q) ||
//         s.GSTIN?.toLowerCase().includes(q) ||
//         s.businessDetails?.businessName?.toLowerCase().includes(q)
//     );
//   }, [sellers, searchQuery]);

//   const totalCount = filteredSellers.length;
//   const activeCount = filteredSellers.filter(
//     (s: any) => s.accountStatus === "ACTIVE"
//   ).length;
//   const pendingCount = filteredSellers.filter(
//     (s: any) => s.accountStatus === "PENDING_VERIFICATION"
//   ).length;
//   const verifiedCount = filteredSellers.filter(
//     (s: any) => s.delhiveryWarehouseCode
//   ).length;

//   return (
//     <>
//       <style>{`
//         @keyframes fadeSlideIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.6; transform: scale(1.15); }
//         }
//         .seller-card-row {
//           animation: fadeSlideIn 0.5s ease-out both;
//         }
//         .glass-card {
//           backdrop-filter: blur(20px);
//           background: rgba(255, 255, 255, 0.7);
//         }
//       `}</style>

//       {/* ═══ HERO ═══ */}
//       <div className="relative mb-6 rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 shadow-2xl">
//         <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
//         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div className="flex items-center gap-4">
//             <div className="p-3 rounded-2xl bg-white/20 backdrop-blur border border-white/20">
//               <StorefrontIcon sx={{ fontSize: 32, color: "white" }} />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
//                 Sellers Management
//                 <span
//                   className="w-2 h-2 bg-green-400 rounded-full"
//                   style={{ animation: "pulse 2s infinite" }}
//                 />
//               </h1>
//               <p className="text-white/80 text-sm mt-1">
//                 Manage all seller accounts, documents & logistics
//               </p>
//             </div>
//           </div>
//           <div className="bg-white/20 backdrop-blur border border-white/20 rounded-xl px-4 py-2 flex items-center gap-2">
//             <PeopleIcon sx={{ fontSize: 18, color: "white" }} />
//             <span className="text-white font-bold text-sm">
//               {totalCount} Sellers
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* ═══ STATS ═══ */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <MiniStat
//           label="Total"
//           value={totalCount}
//           color="#6366f1"
//           icon={<StorefrontIcon sx={{ fontSize: 22 }} />}
//         />
//         <MiniStat
//           label="Active"
//           value={activeCount}
//           color="#16a34a"
//           icon={<CheckCircleIcon sx={{ fontSize: 22 }} />}
//         />
//         <MiniStat
//           label="Pending"
//           value={pendingCount}
//           color="#d97706"
//           icon={<PendingIcon sx={{ fontSize: 22 }} />}
//         />
//         <MiniStat
//           label="Logistics Ready"
//           value={verifiedCount}
//           color="#8b5cf6"
//           icon={<LocalShippingIcon sx={{ fontSize: 22 }} />}
//         />
//       </div>

//       {/* ═══ TOOLBAR ═══ */}
//       <div className="glass-card rounded-2xl border border-white/40 shadow-lg p-4 mb-6">
//         <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-3">
//           <TextField
//             size="small"
//             placeholder="🔍 Search by name, email, mobile, GSTIN, business..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             fullWidth
//             sx={{
//               flex: 1,
//               maxWidth: { lg: 500 },
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: "12px",
//                 bgcolor: "white",
//               },
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon fontSize="small" sx={{ color: "#94a3b8" }} />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <div className="flex items-center gap-2">
//             <FormControl size="small" sx={{ minWidth: 180 }}>
//               <Select
//                 value={accountStatus}
//                 onChange={handleAccountStatusChange}
//                 startAdornment={
//                   <FilterListIcon
//                     sx={{ fontSize: 18, color: "#6366f1", mr: 1 }}
//                   />
//                 }
//                 sx={{
//                   borderRadius: "12px",
//                   bgcolor: "white",
//                   fontWeight: 600,
//                   "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 }}
//               >
//                 {accountStatuses.map((status) => (
//                   <MenuItem key={status.status} value={status.status}>
//                     {status.title}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             <Tooltip title="Refresh">
//               <IconButton
//                 onClick={handleRefresh}
//                 sx={{
//                   bgcolor: "#eef2ff",
//                   color: "#4f46e5",
//                   border: "1px solid #c7d2fe",
//                 }}
//               >
//                 <RefreshIcon fontSize="small" />
//               </IconButton>
//             </Tooltip>
//           </div>
//         </div>
//       </div>

//       {/* ═══ LOADING ═══ */}
//       {loading && (
//         <div className="text-center py-10 bg-white rounded-2xl">
//           <CircularProgress size={40} sx={{ color: "#6366f1" }} />
//           <p className="text-gray-500 mt-3 text-sm font-medium">
//             Loading sellers...
//           </p>
//         </div>
//       )}

//       {/* ═══ EMPTY ═══ */}
//       {!loading && filteredSellers.length === 0 && (
//         <div className="bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100">
//           <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 mb-4">
//             <StorefrontIcon sx={{ fontSize: 60, color: "#6366f1" }} />
//           </div>
//           <Typography className="text-gray-700 font-bold text-lg">
//             No Sellers Found
//           </Typography>
//           <Typography className="text-gray-400 text-sm mt-2">
//             {searchQuery
//               ? `No results matching "${searchQuery}"`
//               : `No sellers with status "${accountStatus}"`}
//           </Typography>
//         </div>
//       )}

//       {/* ═══ SELLER CARDS ═══ */}
//       {!loading && filteredSellers.length > 0 && (
//         <div className="space-y-4">
//           {filteredSellers.map((seller: any, idx: number) => {
//             const statusConfig = getStatusConfig(seller.accountStatus);
//             const docs = seller.documents || {};
//             const docCount = [
//               docs.gstCertificate,
//               docs.panCard,
//               docs.bankProof,
//             ].filter(Boolean).length;

//             return (
//               <div
//                 key={seller._id}
//                 className="seller-card-row group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 hover:border-indigo-200 transition-all duration-300 overflow-hidden"
//                 style={{ animationDelay: `${idx * 0.05}s` }}
//               >
//                 <div
//                   className="h-1 w-full"
//                   style={{ background: statusConfig.color }}
//                 />

//                 <div className="p-5">
//                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
//                     {/* SELLER */}
//                     <div className="lg:col-span-3 flex items-center gap-3">
//                       <div className="relative">
//                         <Avatar
//                           sx={{
//                             width: 56,
//                             height: 56,
//                             background:
//                               "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
//                             fontWeight: 800,
//                             fontSize: 22,
//                             boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
//                           }}
//                         >
//                           {seller.sellerName?.charAt(0)?.toUpperCase() || "S"}
//                         </Avatar>
//                         {seller.delhiveryWarehouseCode && (
//                           <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
//                             <VerifiedIcon
//                               sx={{ fontSize: 18, color: "#16a34a" }}
//                             />
//                           </div>
//                         )}
//                       </div>
//                       <div className="min-w-0">
//                         <p className="font-bold text-gray-800 text-base truncate">
//                           {seller.sellerName}
//                         </p>
//                         <p className="text-xs text-gray-400 font-mono">
//                           #{seller._id?.slice(-8)}
//                         </p>
//                         <Chip
//                           icon={statusConfig.icon}
//                           label={statusConfig.label}
//                           size="small"
//                           sx={{
//                             mt: 0.5,
//                             height: 22,
//                             background: statusConfig.bg,
//                             color: statusConfig.color,
//                             fontWeight: 700,
//                             fontSize: 10,
//                             border: `1px solid ${statusConfig.border}`,
//                             "& .MuiChip-icon": { color: statusConfig.color },
//                           }}
//                         />
//                       </div>
//                     </div>

//                     {/* CONTACT */}
//                     <div className="lg:col-span-2 space-y-1">
//                       <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
//                         Contact
//                       </p>
//                       <p className="text-xs text-gray-700 flex items-center gap-1.5 truncate">
//                         <EmailIcon sx={{ fontSize: 14, color: "#6366f1" }} />
//                         <span className="truncate">{seller.email}</span>
//                       </p>
//                       <p className="text-xs text-gray-700 flex items-center gap-1.5">
//                         <PhoneIcon sx={{ fontSize: 14, color: "#6366f1" }} />
//                         {seller.mobile}
//                       </p>
//                     </div>

//                     {/* BUSINESS */}
//                     <div className="lg:col-span-2 space-y-1">
//                       <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
//                         Business
//                       </p>
//                       <p className="text-sm font-semibold text-gray-800 truncate">
//                         {seller.businessDetails?.businessName || "-"}
//                       </p>
//                       <p className="text-[11px] text-gray-500 font-mono truncate">
//                         {seller.GSTIN || "N/A"}
//                       </p>
//                     </div>

//                     {/* BANK */}
//                     <div className="lg:col-span-2 space-y-1">
//                       <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
//                         Bank
//                       </p>
//                       <p className="text-[11px] font-mono text-gray-700 truncate">
//                         A/C: {seller.bankDetails?.accountNumber || "-"}
//                       </p>
//                       <p className="text-[11px] font-mono text-gray-500 truncate">
//                         IFSC: {seller.bankDetails?.ifscCode || "-"}
//                       </p>
//                     </div>

//                     {/* DOCUMENTS */}
//                     <div className="lg:col-span-1">
//                       <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
//                         Docs
//                       </p>
//                       <div className="flex items-center gap-1">
//                         <Tooltip title="GST Certificate">
//                           <span>
//                             <IconButton
//                               size="small"
//                               disabled={!docs.gstCertificate}
//                               onClick={() =>
//                                 openDoc(docs.gstCertificate, "GST Certificate")
//                               }
//                               sx={{
//                                 width: 28,
//                                 height: 28,
//                                 bgcolor: docs.gstCertificate
//                                   ? "#eff6ff"
//                                   : "#f8fafc",
//                                 color: docs.gstCertificate
//                                   ? "#2563eb"
//                                   : "#cbd5e1",
//                                 border: docs.gstCertificate
//                                   ? "1px solid #bfdbfe"
//                                   : "1px solid #e2e8f0",
//                                 "&:hover": {
//                                   bgcolor: docs.gstCertificate
//                                     ? "#dbeafe"
//                                     : "#f8fafc",
//                                   transform: "translateY(-2px)",
//                                 },
//                                 transition: "all 0.2s",
//                               }}
//                             >
//                               <DescriptionIcon sx={{ fontSize: 14 }} />
//                             </IconButton>
//                           </span>
//                         </Tooltip>

//                         <Tooltip title="PAN Card">
//                           <span>
//                             <IconButton
//                               size="small"
//                               disabled={!docs.panCard}
//                               onClick={() =>
//                                 openDoc(docs.panCard, "PAN Card")
//                               }
//                               sx={{
//                                 width: 28,
//                                 height: 28,
//                                 bgcolor: docs.panCard
//                                   ? "#fef3c7"
//                                   : "#f8fafc",
//                                 color: docs.panCard ? "#d97706" : "#cbd5e1",
//                                 border: docs.panCard
//                                   ? "1px solid #fde68a"
//                                   : "1px solid #e2e8f0",
//                                 "&:hover": {
//                                   bgcolor: docs.panCard
//                                     ? "#fde68a"
//                                     : "#f8fafc",
//                                   transform: "translateY(-2px)",
//                                 },
//                                 transition: "all 0.2s",
//                               }}
//                             >
//                               <ReceiptLongIcon sx={{ fontSize: 14 }} />
//                             </IconButton>
//                           </span>
//                         </Tooltip>

//                         <Tooltip title="Bank Proof">
//                           <span>
//                             <IconButton
//                               size="small"
//                               disabled={!docs.bankProof}
//                               onClick={() =>
//                                 openDoc(docs.bankProof, "Bank Proof")
//                               }
//                               sx={{
//                                 width: 28,
//                                 height: 28,
//                                 bgcolor: docs.bankProof
//                                   ? "#dcfce7"
//                                   : "#f8fafc",
//                                 color: docs.bankProof
//                                   ? "#16a34a"
//                                   : "#cbd5e1",
//                                 border: docs.bankProof
//                                   ? "1px solid #bbf7d0"
//                                   : "1px solid #e2e8f0",
//                                 "&:hover": {
//                                   bgcolor: docs.bankProof
//                                     ? "#bbf7d0"
//                                     : "#f8fafc",
//                                   transform: "translateY(-2px)",
//                                 },
//                                 transition: "all 0.2s",
//                               }}
//                             >
//                               <AccountBalanceIcon sx={{ fontSize: 14 }} />
//                             </IconButton>
//                           </span>
//                         </Tooltip>
//                       </div>
//                       <p className="text-[10px] text-gray-400 mt-1">
//                         {docCount}/3 uploaded
//                       </p>
//                     </div>

//                     {/* LOGISTICS */}
//                     <div className="lg:col-span-1">
//                       <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
//                         Logistics
//                       </p>
//                       {seller.delhiveryWarehouseCode ? (
//                         <Chip
//                           icon={<LocalShippingIcon sx={{ fontSize: 12 }} />}
//                           label={seller.delhiveryWarehouseCode}
//                           size="small"
//                           sx={{
//                             height: 22,
//                             bgcolor: "#ede9fe",
//                             color: "#7c3aed",
//                             fontWeight: 700,
//                             fontSize: 10,
//                             fontFamily: "monospace",
//                             "& .MuiChip-icon": { color: "#7c3aed" },
//                           }}
//                         />
//                       ) : (
//                         <Button
//                           size="small"
//                           variant="outlined"
//                           startIcon={
//                             <LocalShippingIcon sx={{ fontSize: 12 }} />
//                           }
//                           onClick={() =>
//                             seller._id && handleRegisterDelhivery(seller._id)
//                           }
//                           sx={{
//                             fontSize: 10,
//                             textTransform: "none",
//                             py: 0.3,
//                             px: 1,
//                             borderRadius: 2,
//                           }}
//                         >
//                           Register
//                         </Button>
//                       )}
//                     </div>

//                     {/* ACTIONS */}
//                     <div className="lg:col-span-1 flex items-center justify-end gap-1">
//                       <Tooltip title="View Details">
//                         <IconButton
//                           size="small"
//                           onClick={() => handleViewDetails(seller)}
//                           sx={{
//                             bgcolor: "#eef2ff",
//                             color: "#4f46e5",
//                             border: "1px solid #c7d2fe",
//                             "&:hover": {
//                               bgcolor: "#6366f1",
//                               color: "white",
//                               transform: "scale(1.1)",
//                             },
//                             transition: "all 0.2s",
//                           }}
//                         >
//                           <VisibilityIcon sx={{ fontSize: 16 }} />
//                         </IconButton>
//                       </Tooltip>

//                       <Tooltip title="Change Status">
//                         <IconButton
//                           size="small"
//                           onClick={(e) =>
//                             seller._id && handleClick(e as any, seller._id)
//                           }
//                           sx={{
//                             bgcolor: "#f0fdf4",
//                             color: "#16a34a",
//                             border: "1px solid #bbf7d0",
//                             "&:hover": {
//                               bgcolor: "#16a34a",
//                               color: "white",
//                               transform: "scale(1.1)",
//                             },
//                             transition: "all 0.2s",
//                           }}
//                         >
//                           <MoreVertIcon sx={{ fontSize: 16 }} />
//                         </IconButton>
//                       </Tooltip>

//                       {seller._id && (
//                         <Menu
//                           anchorEl={anchorEl[seller._id]}
//                           open={Boolean(anchorEl[seller._id])}
//                           onClose={() => handleClose(seller._id)}
//                           PaperProps={{
//                             sx: { minWidth: 200, borderRadius: 2, mt: 1 },
//                           }}
//                         >
//                           <MenuItem
//                             disabled
//                             sx={{ fontSize: 11, fontWeight: 700 }}
//                           >
//                             CHANGE STATUS
//                           </MenuItem>
//                           <Divider />
//                           {accountStatuses.map((status) => {
//                             const cfg = getStatusConfig(status.status);
//                             return (
//                               <MenuItem
//                                 key={status.status}
//                                 onClick={() => {
//                                   handleUpdateSellerAccountStatus(
//                                     seller._id,
//                                     status.status
//                                   );
//                                   handleClose(seller._id);
//                                 }}
//                                 sx={{
//                                   fontSize: 13,
//                                   gap: 1.5,
//                                   "&:hover": { bgcolor: cfg.bg },
//                                 }}
//                               >
//                                 <span style={{ color: cfg.color }}>
//                                   {cfg.icon}
//                                 </span>
//                                 {status.title}
//                               </MenuItem>
//                             );
//                           })}
//                         </Menu>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* ═══ DETAILS DIALOG ═══ */}
//       <Dialog
//         open={detailsOpen}
//         onClose={() => setDetailsOpen(false)}
//         maxWidth="md"
//         fullWidth
//         PaperProps={{
//           sx: { borderRadius: 4, overflow: "hidden", bgcolor: "#f8fafc" },
//         }}
//       >
//         {selectedSeller && (
//           <>
//             <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6">
//               <IconButton
//                 onClick={() => setDetailsOpen(false)}
//                 sx={{
//                   position: "absolute",
//                   top: 12,
//                   right: 12,
//                   color: "white",
//                   bgcolor: "rgba(255,255,255,0.2)",
//                 }}
//               >
//                 <CloseIcon />
//               </IconButton>

//               <div className="flex items-center gap-5">
//                 <Avatar
//                   sx={{
//                     width: 80,
//                     height: 80,
//                     bgcolor: "white",
//                     color: "#6366f1",
//                     fontSize: 32,
//                     fontWeight: 800,
//                     border: "4px solid rgba(255,255,255,0.3)",
//                   }}
//                 >
//                   {selectedSeller.sellerName?.charAt(0)?.toUpperCase()}
//                 </Avatar>
//                 <div>
//                   <Typography className="text-white font-extrabold text-2xl">
//                     {selectedSeller.sellerName}
//                   </Typography>
//                   <Typography className="text-white/80 text-sm mt-1 flex items-center gap-1">
//                     <BusinessIcon sx={{ fontSize: 16 }} />
//                     {selectedSeller.businessDetails?.businessName}
//                   </Typography>
//                   <Chip
//                     label={selectedSeller.accountStatus?.replace(/_/g, " ")}
//                     size="small"
//                     sx={{
//                       mt: 1.5,
//                       bgcolor: "rgba(255,255,255,0.25)",
//                       color: "white",
//                       fontWeight: 700,
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             <DialogContent sx={{ p: 3 }}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Card sx={{ borderRadius: 3 }}>
//                   <CardContent>
//                     <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
//                       <PhoneIcon sx={{ fontSize: 18, color: "#6366f1" }} />
//                       Contact Information
//                     </Typography>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">Email</span>
//                         <span className="font-medium">
//                           {selectedSeller.email}
//                         </span>
//                       </div>
//                       <Divider />
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">Mobile</span>
//                         <span className="font-medium">
//                           {selectedSeller.mobile}
//                         </span>
//                       </div>
//                       <Divider />
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">GSTIN</span>
//                         <span className="font-medium font-mono text-xs">
//                           {selectedSeller.GSTIN}
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card sx={{ borderRadius: 3 }}>
//                   <CardContent>
//                     <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
//                       <AccountBalanceIcon
//                         sx={{ fontSize: 18, color: "#16a34a" }}
//                       />
//                       Bank Details
//                     </Typography>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">A/C No.</span>
//                         <span className="font-medium font-mono text-xs">
//                           {selectedSeller.bankDetails?.accountNumber || "-"}
//                         </span>
//                       </div>
//                       <Divider />
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">IFSC</span>
//                         <span className="font-medium font-mono text-xs">
//                           {selectedSeller.bankDetails?.ifscCode || "-"}
//                         </span>
//                       </div>
//                       <Divider />
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">Holder</span>
//                         <span className="font-medium">
//                           {selectedSeller.bankDetails?.accountHolderName ||
//                             "-"}
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card sx={{ borderRadius: 3 }}>
//                   <CardContent>
//                     <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
//                       <StorefrontIcon
//                         sx={{ fontSize: 18, color: "#8b5cf6" }}
//                       />
//                       Business Details
//                     </Typography>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">Name</span>
//                         <span className="font-medium">
//                           {selectedSeller.businessDetails?.businessName || "-"}
//                         </span>
//                       </div>
//                       <Divider />
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">Email</span>
//                         <span className="font-medium text-xs">
//                           {selectedSeller.businessDetails?.businessEmail ||
//                             "-"}
//                         </span>
//                       </div>
//                       <Divider />
//                       <div className="flex justify-between">
//                         <span className="text-gray-500">Mobile</span>
//                         <span className="font-medium">
//                           {selectedSeller.businessDetails?.businessMobile ||
//                             "-"}
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card sx={{ borderRadius: 3 }}>
//                   <CardContent>
//                     <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
//                       <LocalShippingIcon
//                         sx={{ fontSize: 18, color: "#f59e0b" }}
//                       />
//                       Logistics
//                     </Typography>
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-500">Warehouse Code</span>
//                       <span className="font-medium font-mono text-xs">
//                         {selectedSeller.delhiveryWarehouseCode ||
//                           "Not registered"}
//                       </span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* Pickup Address */}
//               {selectedSeller.pickupAddress && (
//                 <Card sx={{ mt: 3, borderRadius: 3 }}>
//                   <CardContent>
//                     <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
//                       <LocationOnIcon
//                         sx={{ fontSize: 18, color: "#ef4444" }}
//                       />
//                       Pickup Address
//                     </Typography>
//                     <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 text-sm border border-gray-100">
//                       <p className="font-bold text-gray-800">
//                         {selectedSeller.pickupAddress.name}
//                       </p>
//                       <p className="text-gray-600 mt-1">
//                         {selectedSeller.pickupAddress.address}
//                       </p>
//                       <p className="text-gray-600">
//                         {selectedSeller.pickupAddress.locality},{" "}
//                         {selectedSeller.pickupAddress.city},{" "}
//                         {selectedSeller.pickupAddress.state} -{" "}
//                         {selectedSeller.pickupAddress.pinCode}
//                       </p>
//                       <p className="text-gray-500 text-xs mt-2 flex items-center gap-1">
//                         <PhoneIcon sx={{ fontSize: 12 }} />
//                         {selectedSeller.pickupAddress.mobile}
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}

//               {/* Documents */}
//               <Card sx={{ mt: 3, borderRadius: 3 }}>
//                 <CardContent>
//                   <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
//                     <DescriptionIcon
//                       sx={{ fontSize: 18, color: "#6366f1" }}
//                     />
//                     Uploaded Documents
//                   </Typography>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                     <div
//                       onClick={() =>
//                         selectedSeller.documents?.gstCertificate &&
//                         openDoc(
//                           selectedSeller.documents.gstCertificate,
//                           "GST Certificate"
//                         )
//                       }
//                       className={`border-2 border-dashed border-blue-300 rounded-xl p-4 text-center bg-gradient-to-br from-blue-50 to-white transition ${
//                         selectedSeller.documents?.gstCertificate
//                           ? "cursor-pointer hover:from-blue-100 hover:shadow-md"
//                           : ""
//                       }`}
//                     >
//                       <div className="inline-flex p-3 rounded-full bg-blue-100">
//                         <DescriptionIcon
//                           sx={{ fontSize: 28, color: "#2563eb" }}
//                         />
//                       </div>
//                       <p className="text-xs font-bold text-gray-700 mt-2">
//                         GST Certificate
//                       </p>
//                       {selectedSeller.documents?.gstCertificate ? (
//                         <p className="text-[10px] text-blue-600 mt-1 font-bold">
//                           👁 Click to view
//                         </p>
//                       ) : (
//                         <p className="text-xs text-gray-400 mt-1">
//                           Not uploaded
//                         </p>
//                       )}
//                     </div>

//                     <div
//                       onClick={() =>
//                         selectedSeller.documents?.panCard &&
//                         openDoc(selectedSeller.documents.panCard, "PAN Card")
//                       }
//                       className={`border-2 border-dashed border-amber-300 rounded-xl p-4 text-center bg-gradient-to-br from-amber-50 to-white transition ${
//                         selectedSeller.documents?.panCard
//                           ? "cursor-pointer hover:from-amber-100 hover:shadow-md"
//                           : ""
//                       }`}
//                     >
//                       <div className="inline-flex p-3 rounded-full bg-amber-100">
//                         <ReceiptLongIcon
//                           sx={{ fontSize: 28, color: "#d97706" }}
//                         />
//                       </div>
//                       <p className="text-xs font-bold text-gray-700 mt-2">
//                         PAN Card
//                       </p>
//                       {selectedSeller.documents?.panCard ? (
//                         <p className="text-[10px] text-amber-600 mt-1 font-bold">
//                           👁 Click to view
//                         </p>
//                       ) : (
//                         <p className="text-xs text-gray-400 mt-1">
//                           Not uploaded
//                         </p>
//                       )}
//                     </div>

//                     <div
//                       onClick={() =>
//                         selectedSeller.documents?.bankProof &&
//                         openDoc(
//                           selectedSeller.documents.bankProof,
//                           "Bank Proof"
//                         )
//                       }
//                       className={`border-2 border-dashed border-green-300 rounded-xl p-4 text-center bg-gradient-to-br from-green-50 to-white transition ${
//                         selectedSeller.documents?.bankProof
//                           ? "cursor-pointer hover:from-green-100 hover:shadow-md"
//                           : ""
//                       }`}
//                     >
//                       <div className="inline-flex p-3 rounded-full bg-green-100">
//                         <AccountBalanceIcon
//                           sx={{ fontSize: 28, color: "#16a34a" }}
//                         />
//                       </div>
//                       <p className="text-xs font-bold text-gray-700 mt-2">
//                         Bank Proof
//                       </p>
//                       <p className="text-[10px] text-gray-500">
//                         {selectedSeller.documents?.bankProofType
//                           ?.replace(/_/g, " ")
//                           .toUpperCase() || "N/A"}
//                       </p>
//                       {selectedSeller.documents?.bankProof ? (
//                         <p className="text-[10px] text-green-600 mt-1 font-bold">
//                           👁 Click to view
//                         </p>
//                       ) : (
//                         <p className="text-xs text-gray-400 mt-1">
//                           Not uploaded
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </DialogContent>

//             <DialogActions sx={{ p: 3, bgcolor: "white" }}>
//               <Button
//                 onClick={() => setDetailsOpen(false)}
//                 variant="outlined"
//                 sx={{
//                   textTransform: "none",
//                   borderRadius: 2,
//                   fontWeight: 700,
//                 }}
//               >
//                 Close
//               </Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog>

//       <DocumentViewer
//         open={docViewer.open}
//         onClose={closeDoc}
//         url={docViewer.url}
//         title={docViewer.title}
//       />
//     </>
//   );
// }


























import * as React from "react";
import {
  Button,
  FormControl,
  Menu,
  MenuItem,
  Select,
  Chip,
  Avatar,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
  Tooltip,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import BlockIcon from "@mui/icons-material/Block";
import DescriptionIcon from "@mui/icons-material/Description";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import BusinessIcon from "@mui/icons-material/Business";
import VerifiedIcon from "@mui/icons-material/Verified";
import PeopleIcon from "@mui/icons-material/People";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  fetchSellers,
  updateSellerAccountStatus,
  registerDelhivery,
} from "../../../Redux Toolkit/Seller/sellerSlice";

// 🔥 IMPORT API CONFIG
import { DEPLOYED_URL } from "../../../Config/Api";

/* ═══════════════════════════════════════════════
   🔥 BUILD FILE URL — DEPLOYED_URL se
   ═══════════════════════════════════════════════ */
const buildFileUrl = (filename: string | null | undefined) => {
  if (!filename) return null;

  // Agar already full URL hai toh waisa hi return karo
  if (filename.startsWith("http")) return filename;

  // /api suffix hata do (agar hai)
  const rootURL = DEPLOYED_URL.replace(/\/api\/?$/, "").replace(/\/$/, "");

  return `${rootURL}/uploads/seller-documents/${filename}`;
};

/* ═══════════════════════════════════════════════
   STATUS CONFIG
   ═══════════════════════════════════════════════ */
const accountStatuses = [
  { status: "PENDING_VERIFICATION", title: "Pending Verification" },
  { status: "ACTIVE", title: "Active" },
  { status: "SUSPENDED", title: "Suspended" },
  { status: "DEACTIVATED", title: "Deactivated" },
  { status: "BANNED", title: "Banned" },
  { status: "CLOSED", title: "Closed" },
];

const getStatusConfig = (status: string) => {
  const configs: any = {
    ACTIVE: {
      color: "#16a34a",
      bg: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
      border: "#86efac",
      icon: <CheckCircleIcon sx={{ fontSize: 12 }} />,
      label: "Active",
    },
    PENDING_VERIFICATION: {
      color: "#d97706",
      bg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
      border: "#fcd34d",
      icon: <PendingIcon sx={{ fontSize: 12 }} />,
      label: "Pending",
    },
    SUSPENDED: {
      color: "#ea580c",
      bg: "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)",
      border: "#fdba74",
      icon: <BlockIcon sx={{ fontSize: 12 }} />,
      label: "Suspended",
    },
    DEACTIVATED: {
      color: "#ea580c",
      bg: "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)",
      border: "#fdba74",
      icon: <BlockIcon sx={{ fontSize: 12 }} />,
      label: "Deactivated",
    },
    BANNED: {
      color: "#dc2626",
      bg: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
      border: "#fca5a5",
      icon: <BlockIcon sx={{ fontSize: 12 }} />,
      label: "Banned",
    },
    CLOSED: {
      color: "#64748b",
      bg: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
      border: "#cbd5e1",
      icon: <BlockIcon sx={{ fontSize: 12 }} />,
      label: "Closed",
    },
  };
  return configs[status] || configs.CLOSED;
};

/* ═══════════════════════════════════════════════
   MINI STAT
   ═══════════════════════════════════════════════ */
const MiniStat = ({ label, value, color, icon }: any) => (
  <div
    className="rounded-2xl p-4 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
    style={{
      background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
      border: `1px solid ${color}30`,
    }}
  >
    <div
      className="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10"
      style={{ background: color }}
    />
    <div className="flex items-center justify-between relative z-10">
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-2xl font-extrabold mt-1" style={{ color }}>
          {value}
        </p>
      </div>
      <div
        className="p-2.5 rounded-xl"
        style={{ background: `${color}20`, color }}
      >
        {icon}
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   🔥 DOCUMENT VIEWER MODAL
   ═══════════════════════════════════════════════ */
interface DocViewerProps {
  open: boolean;
  onClose: () => void;
  url: string | null;
  title: string;
}

const DocumentViewer: React.FC<DocViewerProps> = ({
  open,
  onClose,
  url,
  title,
}) => {
  const [zoom, setZoom] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (open) {
      setZoom(1);
      setLoading(true);
    }
  }, [open, url]);

  if (!url) return null;

  const isPDF = url.toLowerCase().endsWith(".pdf");
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "#0f172a",
          maxHeight: "90vh",
        },
      }}
    >
      <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
        <div className="flex items-center gap-3 min-w-0">
          {isPDF ? (
            <PictureAsPdfIcon sx={{ color: "#ef4444", fontSize: 24 }} />
          ) : (
            <DescriptionIcon sx={{ color: "#6366f1", fontSize: 24 }} />
          )}
          <div className="min-w-0">
            <p className="text-white font-bold text-sm truncate">{title}</p>
            <p className="text-slate-400 text-xs truncate">{url}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {isImage && (
            <>
              <Tooltip title="Zoom Out">
                <IconButton
                  size="small"
                  onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
                  sx={{ color: "white" }}
                >
                  <ZoomOutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <span className="text-white text-xs font-mono px-2 min-w-[50px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Tooltip title="Zoom In">
                <IconButton
                  size="small"
                  onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
                  sx={{ color: "white" }}
                >
                  <ZoomInIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}

          <Tooltip title="Download">
            <IconButton
              size="small"
              href={url}
              download
              target="_blank"
              sx={{ color: "white" }}
            >
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Open in new tab">
            <IconButton
              size="small"
              href={url}
              target="_blank"
              sx={{ color: "white" }}
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Close">
            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                color: "white",
                bgcolor: "rgba(239,68,68,0.2)",
                "&:hover": { bgcolor: "rgba(239,68,68,0.4)" },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <DialogContent
        sx={{
          p: 0,
          bgcolor: "#1e293b",
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <CircularProgress sx={{ color: "#6366f1" }} />
          </div>
        )}

        {isPDF ? (
          <iframe
            src={url}
            title={title}
            onLoad={() => setLoading(false)}
            style={{
              width: "100%",
              height: "80vh",
              border: "none",
              display: loading ? "none" : "block",
            }}
          />
        ) : isImage ? (
          <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
            <img
              src={url}
              alt={title}
              onLoad={() => setLoading(false)}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                transform: `scale(${zoom})`,
                transition: "transform 0.2s ease",
                display: loading ? "none" : "block",
                borderRadius: 8,
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            />
          </div>
        ) : (
          <div className="text-center p-10">
            <DescriptionIcon sx={{ fontSize: 80, color: "#475569" }} />
            <p className="text-white mt-4 font-bold">
              Cannot preview this file
            </p>
            <p className="text-slate-400 text-sm mt-2">
              Click "Open in new tab" or "Download"
            </p>
            <Button
              variant="contained"
              href={url}
              target="_blank"
              startIcon={<OpenInNewIcon />}
              sx={{ mt: 3, textTransform: "none", borderRadius: 2 }}
            >
              Open File
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export default function SellersTable() {
  const [accountStatus, setAccountStatus] = React.useState("ACTIVE");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedSeller, setSelectedSeller] = React.useState<any>(null);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [docViewer, setDocViewer] = React.useState<{
    open: boolean;
    url: string | null;
    title: string;
  }>({
    open: false,
    url: null,
    title: "",
  });

  const openDoc = (filename: string | null, title: string) => {
    const url = buildFileUrl(filename);
    if (url) {
      setDocViewer({ open: true, url, title });
    }
  };

  const closeDoc = () => {
    setDocViewer({ open: false, url: null, title: "" });
  };

  const { sellers } = useAppSelector((store: any) => store.sellers);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      await dispatch(fetchSellers(accountStatus) as any);
      setLoading(false);
    };
    load();
  }, [accountStatus, dispatch]);

  const handleAccountStatusChange = (event: any) => {
    setAccountStatus(event.target.value);
  };

  const handleUpdateSellerAccountStatus = (id: string, status: string) => {
    dispatch(updateSellerAccountStatus({ id, status }) as any);
  };

  const handleRegisterDelhivery = (id: string) => {
    dispatch(registerDelhivery(id) as any);
  };

  const handleViewDetails = (seller: any) => {
    setSelectedSeller(seller);
    setDetailsOpen(true);
  };

  const handleRefresh = async () => {
    setLoading(true);
    await dispatch(fetchSellers(accountStatus) as any);
    setLoading(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<
    Record<string, HTMLElement | null>
  >({});

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    sellerId: string
  ) => {
    setAnchorEl((prev) => ({ ...prev, [sellerId]: event.currentTarget }));
  };

  const handleClose = (sellerId: string) => {
    setAnchorEl((prev) => ({ ...prev, [sellerId]: null }));
  };

  const filteredSellers = React.useMemo(() => {
    if (!sellers) return [];
    if (!searchQuery.trim()) return sellers;
    const q = searchQuery.toLowerCase();
    return sellers.filter(
      (s: any) =>
        s.sellerName?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.mobile?.includes(q) ||
        s.GSTIN?.toLowerCase().includes(q) ||
        s.businessDetails?.businessName?.toLowerCase().includes(q)
    );
  }, [sellers, searchQuery]);

  const totalCount = filteredSellers.length;
  const activeCount = filteredSellers.filter(
    (s: any) => s.accountStatus === "ACTIVE"
  ).length;
  const pendingCount = filteredSellers.filter(
    (s: any) => s.accountStatus === "PENDING_VERIFICATION"
  ).length;
  const verifiedCount = filteredSellers.filter(
    (s: any) => s.delhiveryWarehouseCode
  ).length;

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }
        .seller-card-row {
          animation: fadeSlideIn 0.5s ease-out both;
        }
        .glass-card {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.7);
        }
      `}</style>

      <div className="relative mb-6 rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-white/20 backdrop-blur border border-white/20">
              <StorefrontIcon sx={{ fontSize: 32, color: "white" }} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
                Sellers Management
                <span
                  className="w-2 h-2 bg-green-400 rounded-full"
                  style={{ animation: "pulse 2s infinite" }}
                />
              </h1>
              <p className="text-white/80 text-sm mt-1">
                Manage all seller accounts, documents & logistics
              </p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur border border-white/20 rounded-xl px-4 py-2 flex items-center gap-2">
            <PeopleIcon sx={{ fontSize: 18, color: "white" }} />
            <span className="text-white font-bold text-sm">
              {totalCount} Sellers
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MiniStat
          label="Total"
          value={totalCount}
          color="#6366f1"
          icon={<StorefrontIcon sx={{ fontSize: 22 }} />}
        />
        <MiniStat
          label="Active"
          value={activeCount}
          color="#16a34a"
          icon={<CheckCircleIcon sx={{ fontSize: 22 }} />}
        />
        <MiniStat
          label="Pending"
          value={pendingCount}
          color="#d97706"
          icon={<PendingIcon sx={{ fontSize: 22 }} />}
        />
        <MiniStat
          label="Logistics Ready"
          value={verifiedCount}
          color="#8b5cf6"
          icon={<LocalShippingIcon sx={{ fontSize: 22 }} />}
        />
      </div>

      <div className="glass-card rounded-2xl border border-white/40 shadow-lg p-4 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-3">
          <TextField
            size="small"
            placeholder="🔍 Search by name, email, mobile, GSTIN, business..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            sx={{
              flex: 1,
              maxWidth: { lg: 500 },
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                bgcolor: "white",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: "#94a3b8" }} />
                </InputAdornment>
              ),
            }}
          />

          <div className="flex items-center gap-2">
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <Select
                value={accountStatus}
                onChange={handleAccountStatusChange}
                startAdornment={
                  <FilterListIcon
                    sx={{ fontSize: 18, color: "#6366f1", mr: 1 }}
                  />
                }
                sx={{
                  borderRadius: "12px",
                  bgcolor: "white",
                  fontWeight: 600,
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
              >
                {accountStatuses.map((status) => (
                  <MenuItem key={status.status} value={status.status}>
                    {status.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Tooltip title="Refresh">
              <IconButton
                onClick={handleRefresh}
                sx={{
                  bgcolor: "#eef2ff",
                  color: "#4f46e5",
                  border: "1px solid #c7d2fe",
                }}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-10 bg-white rounded-2xl">
          <CircularProgress size={40} sx={{ color: "#6366f1" }} />
          <p className="text-gray-500 mt-3 text-sm font-medium">
            Loading sellers...
          </p>
        </div>
      )}

      {!loading && filteredSellers.length === 0 && (
        <div className="bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100">
          <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 mb-4">
            <StorefrontIcon sx={{ fontSize: 60, color: "#6366f1" }} />
          </div>
          <Typography className="text-gray-700 font-bold text-lg">
            No Sellers Found
          </Typography>
          <Typography className="text-gray-400 text-sm mt-2">
            {searchQuery
              ? `No results matching "${searchQuery}"`
              : `No sellers with status "${accountStatus}"`}
          </Typography>
        </div>
      )}

      {!loading && filteredSellers.length > 0 && (
        <div className="space-y-4">
          {filteredSellers.map((seller: any, idx: number) => {
            const statusConfig = getStatusConfig(seller.accountStatus);
            const docs = seller.documents || {};
            const docCount = [
              docs.gstCertificate,
              docs.panCard,
              docs.bankProof,
            ].filter(Boolean).length;

            return (
              <div
                key={seller._id}
                className="seller-card-row group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 hover:border-indigo-200 transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div
                  className="h-1 w-full"
                  style={{ background: statusConfig.color }}
                />

                <div className="p-5">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    <div className="lg:col-span-3 flex items-center gap-3">
                      <div className="relative">
                        <Avatar
                          sx={{
                            width: 56,
                            height: 56,
                            background:
                              "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                            fontWeight: 800,
                            fontSize: 22,
                            boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                          }}
                        >
                          {seller.sellerName?.charAt(0)?.toUpperCase() || "S"}
                        </Avatar>
                        {seller.delhiveryWarehouseCode && (
                          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                            <VerifiedIcon
                              sx={{ fontSize: 18, color: "#16a34a" }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-800 text-base truncate">
                          {seller.sellerName}
                        </p>
                        <p className="text-xs text-gray-400 font-mono">
                          #{seller._id?.slice(-8)}
                        </p>
                        <Chip
                          icon={statusConfig.icon}
                          label={statusConfig.label}
                          size="small"
                          sx={{
                            mt: 0.5,
                            height: 22,
                            background: statusConfig.bg,
                            color: statusConfig.color,
                            fontWeight: 700,
                            fontSize: 10,
                            border: `1px solid ${statusConfig.border}`,
                            "& .MuiChip-icon": { color: statusConfig.color },
                          }}
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-2 space-y-1">
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
                        Contact
                      </p>
                      <p className="text-xs text-gray-700 flex items-center gap-1.5 truncate">
                        <EmailIcon sx={{ fontSize: 14, color: "#6366f1" }} />
                        <span className="truncate">{seller.email}</span>
                      </p>
                      <p className="text-xs text-gray-700 flex items-center gap-1.5">
                        <PhoneIcon sx={{ fontSize: 14, color: "#6366f1" }} />
                        {seller.mobile}
                      </p>
                    </div>

                    <div className="lg:col-span-2 space-y-1">
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
                        Business
                      </p>
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {seller.businessDetails?.businessName || "-"}
                      </p>
                      <p className="text-[11px] text-gray-500 font-mono truncate">
                        {seller.GSTIN || "N/A"}
                      </p>
                    </div>

                    <div className="lg:col-span-2 space-y-1">
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
                        Bank
                      </p>
                      <p className="text-[11px] font-mono text-gray-700 truncate">
                        A/C: {seller.bankDetails?.accountNumber || "-"}
                      </p>
                      <p className="text-[11px] font-mono text-gray-500 truncate">
                        IFSC: {seller.bankDetails?.ifscCode || "-"}
                      </p>
                    </div>

                    <div className="lg:col-span-1">
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
                        Docs
                      </p>
                      <div className="flex items-center gap-1">
                        <Tooltip title="GST Certificate">
                          <span>
                            <IconButton
                              size="small"
                              disabled={!docs.gstCertificate}
                              onClick={() =>
                                openDoc(docs.gstCertificate, "GST Certificate")
                              }
                              sx={{
                                width: 28,
                                height: 28,
                                bgcolor: docs.gstCertificate
                                  ? "#eff6ff"
                                  : "#f8fafc",
                                color: docs.gstCertificate
                                  ? "#2563eb"
                                  : "#cbd5e1",
                                border: docs.gstCertificate
                                  ? "1px solid #bfdbfe"
                                  : "1px solid #e2e8f0",
                                "&:hover": {
                                  bgcolor: docs.gstCertificate
                                    ? "#dbeafe"
                                    : "#f8fafc",
                                  transform: "translateY(-2px)",
                                },
                                transition: "all 0.2s",
                              }}
                            >
                              <DescriptionIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                          </span>
                        </Tooltip>

                        <Tooltip title="PAN Card">
                          <span>
                            <IconButton
                              size="small"
                              disabled={!docs.panCard}
                              onClick={() =>
                                openDoc(docs.panCard, "PAN Card")
                              }
                              sx={{
                                width: 28,
                                height: 28,
                                bgcolor: docs.panCard
                                  ? "#fef3c7"
                                  : "#f8fafc",
                                color: docs.panCard ? "#d97706" : "#cbd5e1",
                                border: docs.panCard
                                  ? "1px solid #fde68a"
                                  : "1px solid #e2e8f0",
                                "&:hover": {
                                  bgcolor: docs.panCard
                                    ? "#fde68a"
                                    : "#f8fafc",
                                  transform: "translateY(-2px)",
                                },
                                transition: "all 0.2s",
                              }}
                            >
                              <ReceiptLongIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                          </span>
                        </Tooltip>

                        <Tooltip title="Bank Proof">
                          <span>
                            <IconButton
                              size="small"
                              disabled={!docs.bankProof}
                              onClick={() =>
                                openDoc(docs.bankProof, "Bank Proof")
                              }
                              sx={{
                                width: 28,
                                height: 28,
                                bgcolor: docs.bankProof
                                  ? "#dcfce7"
                                  : "#f8fafc",
                                color: docs.bankProof
                                  ? "#16a34a"
                                  : "#cbd5e1",
                                border: docs.bankProof
                                  ? "1px solid #bbf7d0"
                                  : "1px solid #e2e8f0",
                                "&:hover": {
                                  bgcolor: docs.bankProof
                                    ? "#bbf7d0"
                                    : "#f8fafc",
                                  transform: "translateY(-2px)",
                                },
                                transition: "all 0.2s",
                              }}
                            >
                              <AccountBalanceIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {docCount}/3 uploaded
                      </p>
                    </div>

                    <div className="lg:col-span-1">
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
                        Logistics
                      </p>
                      {seller.delhiveryWarehouseCode ? (
                        <Chip
                          icon={<LocalShippingIcon sx={{ fontSize: 12 }} />}
                          label={seller.delhiveryWarehouseCode}
                          size="small"
                          sx={{
                            height: 22,
                            bgcolor: "#ede9fe",
                            color: "#7c3aed",
                            fontWeight: 700,
                            fontSize: 10,
                            fontFamily: "monospace",
                            "& .MuiChip-icon": { color: "#7c3aed" },
                          }}
                        />
                      ) : (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={
                            <LocalShippingIcon sx={{ fontSize: 12 }} />
                          }
                          onClick={() =>
                            seller._id && handleRegisterDelhivery(seller._id)
                          }
                          sx={{
                            fontSize: 10,
                            textTransform: "none",
                            py: 0.3,
                            px: 1,
                            borderRadius: 2,
                          }}
                        >
                          Register
                        </Button>
                      )}
                    </div>

                    <div className="lg:col-span-1 flex items-center justify-end gap-1">
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(seller)}
                          sx={{
                            bgcolor: "#eef2ff",
                            color: "#4f46e5",
                            border: "1px solid #c7d2fe",
                            "&:hover": {
                              bgcolor: "#6366f1",
                              color: "white",
                              transform: "scale(1.1)",
                            },
                            transition: "all 0.2s",
                          }}
                        >
                          <VisibilityIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Change Status">
                        <IconButton
                          size="small"
                          onClick={(e) =>
                            seller._id && handleClick(e as any, seller._id)
                          }
                          sx={{
                            bgcolor: "#f0fdf4",
                            color: "#16a34a",
                            border: "1px solid #bbf7d0",
                            "&:hover": {
                              bgcolor: "#16a34a",
                              color: "white",
                              transform: "scale(1.1)",
                            },
                            transition: "all 0.2s",
                          }}
                        >
                          <MoreVertIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>

                      {seller._id && (
                        <Menu
                          anchorEl={anchorEl[seller._id]}
                          open={Boolean(anchorEl[seller._id])}
                          onClose={() => handleClose(seller._id)}
                          PaperProps={{
                            sx: { minWidth: 200, borderRadius: 2, mt: 1 },
                          }}
                        >
                          <MenuItem
                            disabled
                            sx={{ fontSize: 11, fontWeight: 700 }}
                          >
                            CHANGE STATUS
                          </MenuItem>
                          <Divider />
                          {accountStatuses.map((status) => {
                            const cfg = getStatusConfig(status.status);
                            return (
                              <MenuItem
                                key={status.status}
                                onClick={() => {
                                  handleUpdateSellerAccountStatus(
                                    seller._id,
                                    status.status
                                  );
                                  handleClose(seller._id);
                                }}
                                sx={{
                                  fontSize: 13,
                                  gap: 1.5,
                                  "&:hover": { bgcolor: cfg.bg },
                                }}
                              >
                                <span style={{ color: cfg.color }}>
                                  {cfg.icon}
                                </span>
                                {status.title}
                              </MenuItem>
                            );
                          })}
                        </Menu>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4, overflow: "hidden", bgcolor: "#f8fafc" },
        }}
      >
        {selectedSeller && (
          <>
            <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6">
              <IconButton
                onClick={() => setDetailsOpen(false)}
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  color: "white",
                  bgcolor: "rgba(255,255,255,0.2)",
                }}
              >
                <CloseIcon />
              </IconButton>

              <div className="flex items-center gap-5">
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "white",
                    color: "#6366f1",
                    fontSize: 32,
                    fontWeight: 800,
                    border: "4px solid rgba(255,255,255,0.3)",
                  }}
                >
                  {selectedSeller.sellerName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <div>
                  <Typography className="text-white font-extrabold text-2xl">
                    {selectedSeller.sellerName}
                  </Typography>
                  <Typography className="text-white/80 text-sm mt-1 flex items-center gap-1">
                    <BusinessIcon sx={{ fontSize: 16 }} />
                    {selectedSeller.businessDetails?.businessName}
                  </Typography>
                  <Chip
                    label={selectedSeller.accountStatus?.replace(/_/g, " ")}
                    size="small"
                    sx={{
                      mt: 1.5,
                      bgcolor: "rgba(255,255,255,0.25)",
                      color: "white",
                      fontWeight: 700,
                    }}
                  />
                </div>
              </div>
            </div>

            <DialogContent sx={{ p: 3 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                      <PhoneIcon sx={{ fontSize: 18, color: "#6366f1" }} />
                      Contact Information
                    </Typography>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Email</span>
                        <span className="font-medium">
                          {selectedSeller.email}
                        </span>
                      </div>
                      <Divider />
                      <div className="flex justify-between">
                        <span className="text-gray-500">Mobile</span>
                        <span className="font-medium">
                          {selectedSeller.mobile}
                        </span>
                      </div>
                      <Divider />
                      <div className="flex justify-between">
                        <span className="text-gray-500">GSTIN</span>
                        <span className="font-medium font-mono text-xs">
                          {selectedSeller.GSTIN}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                      <AccountBalanceIcon
                        sx={{ fontSize: 18, color: "#16a34a" }}
                      />
                      Bank Details
                    </Typography>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">A/C No.</span>
                        <span className="font-medium font-mono text-xs">
                          {selectedSeller.bankDetails?.accountNumber || "-"}
                        </span>
                      </div>
                      <Divider />
                      <div className="flex justify-between">
                        <span className="text-gray-500">IFSC</span>
                        <span className="font-medium font-mono text-xs">
                          {selectedSeller.bankDetails?.ifscCode || "-"}
                        </span>
                      </div>
                      <Divider />
                      <div className="flex justify-between">
                        <span className="text-gray-500">Holder</span>
                        <span className="font-medium">
                          {selectedSeller.bankDetails?.accountHolderName ||
                            "-"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                      <StorefrontIcon
                        sx={{ fontSize: 18, color: "#8b5cf6" }}
                      />
                      Business Details
                    </Typography>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Name</span>
                        <span className="font-medium">
                          {selectedSeller.businessDetails?.businessName || "-"}
                        </span>
                      </div>
                      <Divider />
                      <div className="flex justify-between">
                        <span className="text-gray-500">Email</span>
                        <span className="font-medium text-xs">
                          {selectedSeller.businessDetails?.businessEmail ||
                            "-"}
                        </span>
                      </div>
                      <Divider />
                      <div className="flex justify-between">
                        <span className="text-gray-500">Mobile</span>
                        <span className="font-medium">
                          {selectedSeller.businessDetails?.businessMobile ||
                            "-"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                      <LocalShippingIcon
                        sx={{ fontSize: 18, color: "#f59e0b" }}
                      />
                      Logistics
                    </Typography>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Warehouse Code</span>
                      <span className="font-medium font-mono text-xs">
                        {selectedSeller.delhiveryWarehouseCode ||
                          "Not registered"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {selectedSeller.pickupAddress && (
                <Card sx={{ mt: 3, borderRadius: 3 }}>
                  <CardContent>
                    <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                      <LocationOnIcon
                        sx={{ fontSize: 18, color: "#ef4444" }}
                      />
                      Pickup Address
                    </Typography>
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 text-sm border border-gray-100">
                      <p className="font-bold text-gray-800">
                        {selectedSeller.pickupAddress.name}
                      </p>
                      <p className="text-gray-600 mt-1">
                        {selectedSeller.pickupAddress.address}
                      </p>
                      <p className="text-gray-600">
                        {selectedSeller.pickupAddress.locality},{" "}
                        {selectedSeller.pickupAddress.city},{" "}
                        {selectedSeller.pickupAddress.state} -{" "}
                        {selectedSeller.pickupAddress.pinCode}
                      </p>
                      <p className="text-gray-500 text-xs mt-2 flex items-center gap-1">
                        <PhoneIcon sx={{ fontSize: 12 }} />
                        {selectedSeller.pickupAddress.mobile}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card sx={{ mt: 3, borderRadius: 3 }}>
                <CardContent>
                  <Typography className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                    <DescriptionIcon
                      sx={{ fontSize: 18, color: "#6366f1" }}
                    />
                    Uploaded Documents
                  </Typography>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div
                      onClick={() =>
                        selectedSeller.documents?.gstCertificate &&
                        openDoc(
                          selectedSeller.documents.gstCertificate,
                          "GST Certificate"
                        )
                      }
                      className={`border-2 border-dashed border-blue-300 rounded-xl p-4 text-center bg-gradient-to-br from-blue-50 to-white transition ${
                        selectedSeller.documents?.gstCertificate
                          ? "cursor-pointer hover:from-blue-100 hover:shadow-md"
                          : ""
                      }`}
                    >
                      <div className="inline-flex p-3 rounded-full bg-blue-100">
                        <DescriptionIcon
                          sx={{ fontSize: 28, color: "#2563eb" }}
                        />
                      </div>
                      <p className="text-xs font-bold text-gray-700 mt-2">
                        GST Certificate
                      </p>
                      {selectedSeller.documents?.gstCertificate ? (
                        <p className="text-[10px] text-blue-600 mt-1 font-bold">
                          👁 Click to view
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400 mt-1">
                          Not uploaded
                        </p>
                      )}
                    </div>

                    <div
                      onClick={() =>
                        selectedSeller.documents?.panCard &&
                        openDoc(selectedSeller.documents.panCard, "PAN Card")
                      }
                      className={`border-2 border-dashed border-amber-300 rounded-xl p-4 text-center bg-gradient-to-br from-amber-50 to-white transition ${
                        selectedSeller.documents?.panCard
                          ? "cursor-pointer hover:from-amber-100 hover:shadow-md"
                          : ""
                      }`}
                    >
                      <div className="inline-flex p-3 rounded-full bg-amber-100">
                        <ReceiptLongIcon
                          sx={{ fontSize: 28, color: "#d97706" }}
                        />
                      </div>
                      <p className="text-xs font-bold text-gray-700 mt-2">
                        PAN Card
                      </p>
                      {selectedSeller.documents?.panCard ? (
                        <p className="text-[10px] text-amber-600 mt-1 font-bold">
                          👁 Click to view
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400 mt-1">
                          Not uploaded
                        </p>
                      )}
                    </div>

                    <div
                      onClick={() =>
                        selectedSeller.documents?.bankProof &&
                        openDoc(
                          selectedSeller.documents.bankProof,
                          "Bank Proof"
                        )
                      }
                      className={`border-2 border-dashed border-green-300 rounded-xl p-4 text-center bg-gradient-to-br from-green-50 to-white transition ${
                        selectedSeller.documents?.bankProof
                          ? "cursor-pointer hover:from-green-100 hover:shadow-md"
                          : ""
                      }`}
                    >
                      <div className="inline-flex p-3 rounded-full bg-green-100">
                        <AccountBalanceIcon
                          sx={{ fontSize: 28, color: "#16a34a" }}
                        />
                      </div>
                      <p className="text-xs font-bold text-gray-700 mt-2">
                        Bank Proof
                      </p>
                      <p className="text-[10px] text-gray-500">
                        {selectedSeller.documents?.bankProofType
                          ?.replace(/_/g, " ")
                          .toUpperCase() || "N/A"}
                      </p>
                      {selectedSeller.documents?.bankProof ? (
                        <p className="text-[10px] text-green-600 mt-1 font-bold">
                          👁 Click to view
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400 mt-1">
                          Not uploaded
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogContent>

            <DialogActions sx={{ p: 3, bgcolor: "white" }}>
              <Button
                onClick={() => setDetailsOpen(false)}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 700,
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <DocumentViewer
        open={docViewer.open}
        onClose={closeDoc}
        url={docViewer.url}
        title={docViewer.title}
      />
    </>
  );
}