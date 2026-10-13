// // src/pages/reports/GSTReport.tsx

// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Grid, Typography, CircularProgress, Alert, Paper, Avatar, Button,
//   TextField, MenuItem, Select, FormControl, InputLabel, Chip,
//   Accordion, AccordionSummary, AccordionDetails, Table, TableBody,
//   TableCell, TableContainer, TableHead, TableRow, Tooltip,
// } from "@mui/material";
// import DownloadIcon from "@mui/icons-material/Download";
// import ReceiptIcon from "@mui/icons-material/Receipt";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import PrintIcon from "@mui/icons-material/Print";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import PersonIcon from "@mui/icons-material/Person";
// import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
// import { fetchGSTReport } from "../../../../Redux Toolkit/Seller/gstSlice";
// import { formatOrderId } from "../../../../util/formatOrderId";

// const GSTReport: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { gst, sellers } = useAppSelector((state: any) => state);

//   const [startDate, setStartDate] = useState<string>("");
//   const [endDate, setEndDate] = useState<string>("");
//   const [filterType, setFilterType] = useState<string>("monthly");

//   const businessName =
//     sellers?.profile?.businessDetails?.businessName ||
//     sellers?.profile?.businessName ||
//     "Mr. Thind Store";

//   const gstNumber =
//     sellers?.profile?.businessDetails?.gstin || "22AAAAA0000A1Z5";
//   const panNumber =
//     sellers?.profile?.businessDetails?.panNumber || "AAAAA0000A";
//   const sellerAddress =
//     sellers?.profile?.businessDetails?.address ||
//     "Shop No. 12, Main Market, Ludhiana, Punjab - 141001";
//   const sellerState = "Punjab";
//   const sellerStateCode = "03";
//   const sellerEmail = sellers?.profile?.email || "seller@example.com";
//   const sellerPhone = sellers?.profile?.phone || "+91 98765 43210";

//   useEffect(() => {
//     const today = new Date();
//     const lastMonth = new Date(today);
//     lastMonth.setMonth(today.getMonth() - 1);
//     setStartDate(lastMonth.toISOString().split("T")[0]);
//     setEndDate(today.toISOString().split("T")[0]);
//   }, []);

//   useEffect(() => {
//     if (startDate && endDate) {
//       dispatch(fetchGSTReport({ startDate, endDate, type: filterType }) as any);
//     }
//   }, [startDate, endDate, filterType, dispatch]);

//   const setQuickFilter = (type: string) => {
//     const today = new Date();
//     const start = new Date();
//     if (type === "current-month") start.setDate(1);
//     else if (type === "last-month") {
//       start.setMonth(today.getMonth() - 1);
//       start.setDate(1);
//       today.setDate(0);
//     } else if (type === "3-months") start.setMonth(today.getMonth() - 3);
//     else if (type === "6-months") start.setMonth(today.getMonth() - 6);
//     else if (type === "1-year") start.setFullYear(today.getFullYear() - 1);
//     setStartDate(start.toISOString().split("T")[0]);
//     setEndDate(today.toISOString().split("T")[0]);
//     setFilterType(type);
//   };

//   const reportData = gst?.reportData;
//   const orders = reportData?.orders || [];
//   const monthlySummary = reportData?.monthlySummary || [];
//   const totals = reportData?.totals || {};

//   // ═══════════════════════════════════════════════════
//   // 📥 AMAZON MTR-STYLE EXCEL DOWNLOAD (All 40+ Columns)
//   // ═══════════════════════════════════════════════════
//   const handleDownloadExcel = () => {
//     if (orders.length === 0) return;

//     // ─── Amazon MTR Style Headers ────────────────────
//     const headers = [
//       // Order Info
//       "Order ID",
//       "Order Date",
//       "Invoice Number",
//       "Invoice Date",
//       "Order Status",
//       "Order Type",
//       // Seller Info
//       "Seller Name",
//       "Seller GSTIN",
//       "Seller State",
//       "Seller State Code",
//       // Customer Info
//       "Customer Name",
//       "Customer Email",
//       "Customer Phone",
//       "Customer GSTIN",
//       "Customer Address",
//       "Customer City",
//       "Customer State",
//       "Customer State Code",
//       "Customer Pin Code",
//       "Place of Supply",
//       "Inter State",
//       // Ship From
//       "Ship From City",
//       "Ship From State",
//       "Ship From Country",
//       "Ship From Pin Code",
//       // Ship To
//       "Ship To City",
//       "Ship To State",
//       "Ship To Country",
//       "Ship To Pin Code",
//       // Product Info
//       "ASIN",
//       "SKU",
//       "Product Name",
//       "Category",
//       "Brand",
//       "HSN Code",
//       "Quantity",
//       "MRP (₹)",
//       "Selling Price (₹)",
//       "Rate (₹)",
//       "Discount (₹)",
//       "Discount %",
//       // Tax Info
//       "Taxable Value (₹)",
//       "GST %",
//       "Tax Type",
//       "CGST (₹)",
//       "SGST (₹)",
//       "IGST (₹)",
//       "Total GST (₹)",
//       "Invoice Value (₹)",
//       // Payment
//       "Currency",
//       "Payment Method",
//       "Payment Status",
//       // Compliance
//       "Tax Collection Model",
//       "Tax Responsible Party",
//       "Tax Calculated Date",
//       "Posted Date",
//       "Fulfillment Type",
//     ];

//     // ─── Rows: हर Order के हर Item की अलग Row ────────
//     const rows: any[] = [];

//     orders.forEach((order: any) => {
//       order.items.forEach((item: any) => {
//         rows.push([
//           formatOrderId(order.orderId),
//           new Date(order.orderDate).toLocaleDateString("en-IN"),
//           order.invoiceNumber,
//           new Date(order.invoiceDate).toLocaleDateString("en-IN"),
//           order.orderStatus,
//           order.orderType,
//           order.sellerName,
//           order.sellerGSTIN,
//           order.sellerState,
//           order.sellerStateCode,
//           order.customerName,
//           order.customerEmail,
//           order.customerPhone,
//           order.customerGSTIN || "-",
//           order.customerAddress,
//           order.customerCity,
//           order.customerState,
//           order.customerStateCode,
//           order.customerPinCode,
//           order.placeOfSupply,
//           order.isInterState ? "Yes" : "No",
//           order.shipFromCity,
//           order.shipFromState,
//           order.shipFromCountry,
//           order.shipFromPinCode,
//           order.shipToCity,
//           order.shipToState,
//           order.shipToCountry,
//           order.shipToPinCode,
//           item.asin,
//           item.sku,
//           item.productName,
//           item.category,
//           item.brand,
//           item.hsnCode,
//           item.quantity,
//           item.mrpPrice,
//           item.sellingPrice,
//           item.rate,
//           item.discount,
//           item.discountPercent,
//           item.taxableValue,
//           item.gstPercent,
//           item.taxType,
//           item.cgst,
//           item.sgst,
//           item.igst,
//           item.totalGst,
//           item.itemTotal,
//           order.currency,
//           order.paymentMethod,
//           order.paymentStatus,
//           order.taxCollectionModel,
//           order.taxResponsibleParty,
//           new Date(order.taxCalculatedDate).toLocaleDateString("en-IN"),
//           new Date(order.postedDate).toLocaleDateString("en-IN"),
//           order.fulfillmentType,
//         ]);
//       });
//     });

//     // ─── CSV Content ─────────────────────────────────
//     const csvContent = [
//       [`${businessName} - Amazon MTR Style GST Report`],
//       [`GSTIN: ${gstNumber} | PAN: ${panNumber}`],
//       [`Address: ${sellerAddress}`],
//       [`State: ${sellerState} (Code: ${sellerStateCode})`],
//       [`Email: ${sellerEmail} | Phone: ${sellerPhone}`],
//       [`Period: ${startDate} to ${endDate}`],
//       [`Generated on: ${new Date().toLocaleString("en-IN")}`],
//       [],
//       headers,
//       ...rows,
//     ]
//       .map((row) => row.map((cell: any) => `"${cell}"`).join(","))
//       .join("\n");

//     const blob = new Blob(["\uFEFF" + csvContent], {
//       type: "text/csv;charset=utf-8;",
//     });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `Amazon_MTR_${businessName.replace(/\s+/g, "_")}_${startDate}_to_${endDate}.csv`;
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   const summaryCards = useMemo(
//     () => [
//       { icon: <ReceiptIcon />, title: "Taxable Value", value: `₹${Number(totals.totalTaxableValue || 0).toLocaleString("en-IN")}`, bg: "from-purple-500 to-purple-700" },
//       { icon: <AttachMoneyIcon />, title: "CGST", value: `₹${Number(totals.totalCGST || 0).toLocaleString("en-IN")}`, bg: "from-blue-500 to-blue-700" },
//       { icon: <AttachMoneyIcon />, title: "SGST", value: `₹${Number(totals.totalSGST || 0).toLocaleString("en-IN")}`, bg: "from-green-500 to-green-700" },
//       { icon: <AttachMoneyIcon />, title: "IGST", value: `₹${Number(totals.totalIGST || 0).toLocaleString("en-IN")}`, bg: "from-orange-500 to-orange-700" },
//       { icon: <AccountBalanceIcon />, title: "Total GST", value: `₹${Number(totals.totalTax || 0).toLocaleString("en-IN")}`, bg: "from-red-500 to-red-700" },
//       { icon: <TrendingUpIcon />, title: "Invoice Value", value: `₹${Number(totals.totalInvoiceValue || 0).toLocaleString("en-IN")}`, bg: "from-teal-500 to-teal-700" },
//     ],
//     [totals]
//   );

//   if (gst?.loading && !reportData) {
//     return (
//       <div className="flex flex-col justify-center items-center h-screen gap-4">
//         <CircularProgress size={50} />
//         <p className="text-gray-500">Loading GST data...</p>
//       </div>
//     );
//   }

//   if (gst?.error) {
//     return (
//       <div className="p-6">
//         <Alert severity="error">{gst.error}</Alert>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 min-h-screen space-y-6">
//       {/* ═══ Header ═══ */}
//       <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 md:p-8 shadow-xl">
//         <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <Avatar sx={{ width: 64, height: 64, bgcolor: "white", color: "#4f46e5" }}>
//               <StorefrontIcon sx={{ fontSize: 36 }} />
//             </Avatar>
//             <div>
//               <div className="flex items-center gap-2">
//                 <h1 className="text-2xl md:text-3xl font-bold text-white">{businessName}</h1>
//                 <VerifiedIcon sx={{ color: "#4ade80", fontSize: 22 }} />
//               </div>
//               <p className="text-white/90 text-sm mt-1 font-mono">GSTIN: {gstNumber}</p>
//               <p className="text-white/70 text-xs mt-1">{sellerAddress}</p>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             <Button
//               onClick={handleDownloadExcel}
//               variant="contained"
//               disabled={orders.length === 0}
//               startIcon={<DownloadIcon />}
//               sx={{ bgcolor: "white", color: "#4f46e5", fontWeight: "bold", textTransform: "none", px: 3, py: 1.2, "&:hover": { bgcolor: "#f3f4f6" } }}
//             >
//               Download Amazon MTR
//             </Button>
//             <Button
//               onClick={() => window.print()}
//               variant="outlined"
//               startIcon={<PrintIcon />}
//               sx={{ color: "white", borderColor: "white", fontWeight: "bold", textTransform: "none", px: 3, py: 1.2 }}
//             >
//               Print
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* ═══ Filters ═══ */}
//       <Paper className="p-5 shadow-md rounded-xl">
//         <Typography variant="h6" className="font-bold mb-4">🗓️ Filter Options</Typography>
//         <div className="flex flex-wrap gap-2 mb-4">
//           {[
//             { label: "Current Month", value: "current-month" },
//             { label: "Last Month", value: "last-month" },
//             { label: "Last 3 Months", value: "3-months" },
//             { label: "Last 6 Months", value: "6-months" },
//             { label: "Last 1 Year", value: "1-year" },
//           ].map((filter) => (
//             <Button
//               key={filter.value}
//               variant={filterType === filter.value ? "contained" : "outlined"}
//               size="small"
//               onClick={() => setQuickFilter(filter.value)}
//               sx={{ textTransform: "none" }}
//             >
//               {filter.label}
//             </Button>
//           ))}
//         </div>

//         <Grid container spacing={3}>
//           <Grid size={{ xs: 12, sm: 4 }}>
//             <TextField label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} fullWidth size="small" InputLabelProps={{ shrink: true }} />
//           </Grid>
//           <Grid size={{ xs: 12, sm: 4 }}>
//             <TextField label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} fullWidth size="small" InputLabelProps={{ shrink: true }} />
//           </Grid>
//           <Grid size={{ xs: 12, sm: 4 }}>
//             <FormControl fullWidth size="small">
//               <InputLabel>Report Type</InputLabel>
//               <Select value={filterType} onChange={(e) => setFilterType(e.target.value)} label="Report Type">
//                 <MenuItem value="monthly">Monthly</MenuItem>
//                 <MenuItem value="quarterly">Quarterly (3 Months)</MenuItem>
//                 <MenuItem value="yearly">Yearly</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* ═══ Summary Cards ═══ */}
//       <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//         {summaryCards.map((card, index) => (
//           <div
//             key={index}
//             className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
//             style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both` }}
//           >
//             <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${card.bg} p-4 shadow-lg text-white`}>
//               <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-white/10" />
//               <div className="relative">
//                 <p className="text-xs uppercase tracking-wider text-white/80">{card.title}</p>
//                 <p className="text-lg md:text-xl font-bold mt-2">{card.value}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* ═══ Order-wise Invoices ═══ */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
//           <div>
//             <Typography variant="h6" className="font-bold text-gray-800">🛒 Order-wise GST Invoices</Typography>
//             <Typography variant="body2" className="text-gray-500">Amazon MTR style with all tax details</Typography>
//           </div>
//           <Chip label={`${orders.length} Orders`} sx={{ bgcolor: "#4f46e5", color: "white", fontWeight: "bold" }} />
//         </div>

//         {orders.length === 0 ? (
//           <Paper className="p-10 text-center">
//             <ReceiptIcon sx={{ fontSize: 60, color: "#cbd5e1", mb: 1 }} />
//             <Typography color="textSecondary">कोई Orders नहीं मिले इस Period में</Typography>
//           </Paper>
//         ) : (
//           orders.map((order: any, idx: number) => (
//             <Accordion
//               key={order.orderId}
//               defaultExpanded={idx === 0}
//               sx={{ borderRadius: "12px !important", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", "&:before": { display: "none" }, overflow: "hidden", border: "1px solid #e5e7eb" }}
//             >
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 sx={{ background: "linear-gradient(90deg, #f8fafc 0%, #eef2ff 100%)", borderBottom: "1px solid #e5e7eb" }}
//               >
//                 <div className="w-full flex flex-col md:flex-row md:items-center gap-3 pr-4">
//                   <div className="flex items-center gap-3 flex-1">
//                     <Avatar sx={{ bgcolor: "#4f46e5", width: 44, height: 44, fontWeight: "bold", fontSize: 16 }}>
//                       {idx + 1}
//                     </Avatar>
//                     <div>
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <span className="font-mono font-bold text-indigo-700 text-sm">
//                           {formatOrderId(order.orderId)}
//                         </span>
//                         <Chip label={order.orderStatus?.toUpperCase() || "COMPLETED"} size="small" sx={{ bgcolor: "#10b981", color: "white", fontSize: 10, height: 20, fontWeight: "bold" }} />
//                         {order.isInterState && (
//                           <Chip label="IGST" size="small" sx={{ bgcolor: "#f59e0b", color: "white", fontSize: 10, height: 20 }} />
//                         )}
//                       </div>
//                       <div className="text-xs text-gray-500 mt-1">
//                         {new Date(order.orderDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
//                         {" • "}{order.items.length} item{order.items.length > 1 ? "s" : ""}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4">
//                     <div className="text-right">
//                       <p className="text-xs text-gray-500">Total GST</p>
//                       <p className="font-bold text-red-600 text-sm">₹{Number(order.totalGST).toLocaleString("en-IN")}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-xs text-gray-500">Invoice Value</p>
//                       <p className="font-bold text-indigo-700 text-base">₹{Number(order.totalInvoiceValue).toLocaleString("en-IN")}</p>
//                     </div>
//                   </div>
//                 </div>
//               </AccordionSummary>

//               <AccordionDetails sx={{ p: 0 }}>
//                 <div className="bg-white">
//                   {/* Invoice Header */}
//                   <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 flex justify-between items-center flex-wrap gap-3">
//                     <div className="flex items-center gap-2 text-white">
//                       <ReceiptIcon />
//                       <span className="font-bold">TAX INVOICE</span>
//                     </div>
//                     <div className="text-white text-right">
//                       <p className="text-xs opacity-90">Invoice No</p>
//                       <p className="font-mono font-bold">{order.invoiceNumber}</p>
//                     </div>
//                   </div>

//                   {/* Seller & Customer Info (3 Columns) */}
//                   <div className="grid grid-cols-1 md:grid-cols-3 border-b">
//                     <div className="p-4 bg-indigo-50 border-r">
//                       <div className="flex items-center gap-2 mb-2">
//                         <StorefrontIcon sx={{ fontSize: 16, color: "#4f46e5" }} />
//                         <Typography className="font-bold text-xs text-indigo-800 uppercase">Sold By</Typography>
//                       </div>
//                       <p className="font-bold text-gray-900 text-sm">{businessName}</p>
//                       <p className="text-xs text-gray-600 mt-1">{sellerAddress}</p>
//                       <p className="text-xs text-indigo-700 font-mono font-bold mt-1">GSTIN: {gstNumber}</p>
//                       <p className="text-xs text-gray-600 font-mono">PAN: {panNumber}</p>
//                       <p className="text-xs text-gray-500 mt-1">State: {sellerState} ({sellerStateCode})</p>
//                     </div>

//                     <div className="p-4 bg-green-50 border-r">
//                       <div className="flex items-center gap-2 mb-2">
//                         <PersonIcon sx={{ fontSize: 16, color: "#10b981" }} />
//                         <Typography className="font-bold text-xs text-green-800 uppercase">Ship To</Typography>
//                       </div>
//                       <p className="font-bold text-gray-900 text-sm">{order.customerName}</p>
//                       <p className="text-xs text-gray-600 mt-1">{order.customerAddress}</p>
//                       <p className="text-xs text-gray-600">{order.customerCity} - {order.customerPinCode}</p>
//                       <p className="text-xs text-gray-600">📞 {order.customerPhone}</p>
//                       <p className="text-xs text-gray-600">📧 {order.customerEmail}</p>
//                     </div>

//                     <div className="p-4 bg-yellow-50">
//                       <Typography className="font-bold text-xs text-yellow-800 uppercase mb-2">Tax Details</Typography>
//                       <div className="space-y-1">
//                         <p className="text-xs text-gray-600">Place of Supply: <strong>{order.placeOfSupply}</strong></p>
//                         <p className="text-xs text-gray-600">Supply Type: <strong>{order.isInterState ? "Inter-State (IGST)" : "Intra-State (CGST+SGST)"}</strong></p>
//                         <p className="text-xs text-gray-600">Tax Model: <strong>{order.taxCollectionModel}</strong></p>
//                         <p className="text-xs text-gray-600">Responsible: <strong>{order.taxResponsibleParty}</strong></p>
//                         <p className="text-xs text-gray-600">Payment: <strong>{order.paymentMethod}</strong></p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Products Table (All Amazon Fields) */}
//                   <div className="p-4">
//                     <TableContainer>
//                       <Table size="small">
//                         <TableHead>
//                           <TableRow sx={{ bgcolor: "#1e293b" }}>
//                             <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }}>#</TableCell>
//                             <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }}>PRODUCT</TableCell>
//                             <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }}>ASIN / SKU</TableCell>
//                             <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }} align="center">HSN</TableCell>
//                             <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }} align="right">QTY</TableCell>
//                             <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }} align="right">MRP</TableCell>
//                             <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }} align="right">RATE</TableCell>
//                             <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }} align="right">TAXABLE</TableCell>
//                             <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }} align="center">GST</TableCell>
//                             <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }} align="right">TOTAL</TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {order.items.map((item: any, i: number) => (
//                             <TableRow key={i} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
//                               <TableCell className="text-xs font-bold">{i + 1}</TableCell>
//                               <TableCell>
//                                 <div className="flex items-center gap-2">
//                                   {item.image && <img src={item.image} alt={item.productName} className="w-10 h-10 object-cover rounded" />}
//                                   <div>
//                                     <p className="text-xs font-bold text-gray-800">{item.productName}</p>
//                                     <p className="text-[10px] text-gray-500">{item.brand} • {item.category}</p>
//                                   </div>
//                                 </div>
//                               </TableCell>
//                               <TableCell>
//                                 <div className="text-[10px] font-mono">
//                                   <div className="font-bold text-indigo-700">{item.asin}</div>
//                                   <div className="text-gray-500">{item.sku}</div>
//                                 </div>
//                               </TableCell>
//                               <TableCell align="center" className="font-mono text-xs">{item.hsnCode}</TableCell>
//                               <TableCell align="right" className="font-bold text-xs">{item.quantity}</TableCell>
//                               <TableCell align="right" className="text-xs text-gray-400 line-through">₹{Number(item.mrpPrice).toLocaleString("en-IN")}</TableCell>
//                               <TableCell align="right" className="text-xs">₹{Number(item.rate).toLocaleString("en-IN")}</TableCell>
//                               <TableCell align="right" className="font-bold text-xs">₹{Number(item.taxableValue).toLocaleString("en-IN")}</TableCell>
//                               <TableCell align="center">
//                                 <Chip
//                                   label={`${item.gstPercent}%`}
//                                   size="small"
//                                   sx={{
//                                     bgcolor: item.gstPercent === 18 ? "#fef3c7" : item.gstPercent === 12 ? "#dbeafe" : item.gstPercent === 5 ? "#dcfce7" : "#f3e8ff",
//                                     color: item.gstPercent === 18 ? "#92400e" : item.gstPercent === 12 ? "#1e40af" : item.gstPercent === 5 ? "#166534" : "#6b21a8",
//                                     fontSize: 10, height: 20, fontWeight: "bold",
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell align="right" className="font-bold text-indigo-700 text-xs">₹{Number(item.itemTotal).toLocaleString("en-IN")}</TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                     </TableContainer>
//                   </div>

//                   {/* Tax Breakdown */}
//                   <div className="p-4 bg-slate-50 border-t">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                       <div className="bg-white p-3 rounded border"><p className="text-[10px] text-gray-500 uppercase font-bold">Taxable Value</p><p className="text-sm font-bold">₹{Number(order.totalTaxableValue).toLocaleString("en-IN")}</p></div>
//                       <div className="bg-white p-3 rounded border"><p className="text-[10px] text-gray-500 uppercase font-bold">CGST</p><p className="text-sm font-bold text-blue-700">₹{Number(order.totalCGST).toLocaleString("en-IN")}</p></div>
//                       <div className="bg-white p-3 rounded border"><p className="text-[10px] text-gray-500 uppercase font-bold">SGST</p><p className="text-sm font-bold text-green-700">₹{Number(order.totalSGST).toLocaleString("en-IN")}</p></div>
//                       <div className="bg-white p-3 rounded border"><p className="text-[10px] text-gray-500 uppercase font-bold">IGST</p><p className="text-sm font-bold text-orange-700">₹{Number(order.totalIGST).toLocaleString("en-IN")}</p></div>
//                     </div>
//                     <div className="mt-3 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex justify-between items-center flex-wrap gap-3">
//                       <div className="text-white">
//                         <p className="text-xs uppercase opacity-90">Total GST</p>
//                         <p className="text-xl font-bold">₹{Number(order.totalGST).toLocaleString("en-IN")}</p>
//                       </div>
//                       <div className="text-right text-white">
//                         <p className="text-xs uppercase opacity-90">Invoice Value</p>
//                         <p className="text-2xl font-bold">₹{Number(order.totalInvoiceValue).toLocaleString("en-IN")}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-3 bg-slate-100 text-center border-t">
//                     <p className="text-[10px] text-gray-500 italic">Computer-generated invoice | {order.fulfillmentType} | {order.currency}</p>
//                   </div>
//                 </div>
//               </AccordionDetails>
//             </Accordion>
//           ))
//         )}
//       </div>

//       {/* ═══ Monthly Summary ═══ */}
//       {monthlySummary.length > 0 && (
//         <Paper className="shadow-md overflow-hidden">
//           <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600">
//             <Typography variant="h6" className="font-bold text-white">📅 Monthly Summary</Typography>
//           </div>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow className="bg-gray-100">
//                   <TableCell className="font-bold">Month</TableCell>
//                   <TableCell align="right" className="font-bold">Taxable (₹)</TableCell>
//                   <TableCell align="right" className="font-bold">CGST (₹)</TableCell>
//                   <TableCell align="right" className="font-bold">SGST (₹)</TableCell>
//                   <TableCell align="right" className="font-bold">IGST (₹)</TableCell>
//                   <TableCell align="right" className="font-bold">Total GST (₹)</TableCell>
//                   <TableCell align="right" className="font-bold">Invoice (₹)</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {monthlySummary.map((m: any) => (
//                   <TableRow key={m.month} className="hover:bg-gray-50">
//                     <TableCell className="font-bold">{m.month}</TableCell>
//                     <TableCell align="right">₹{Number(m.taxableValue).toLocaleString("en-IN")}</TableCell>
//                     <TableCell align="right">₹{Number(m.cgst).toLocaleString("en-IN")}</TableCell>
//                     <TableCell align="right">₹{Number(m.sgst).toLocaleString("en-IN")}</TableCell>
//                     <TableCell align="right">₹{Number(m.igst).toLocaleString("en-IN")}</TableCell>
//                     <TableCell align="right" className="font-bold text-red-600">₹{Number(m.totalGst).toLocaleString("en-IN")}</TableCell>
//                     <TableCell align="right" className="font-bold text-indigo-600">₹{Number(m.invoiceValue).toLocaleString("en-IN")}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       )}

//       <style>{`
//         @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
//         @media print { body * { visibility: hidden; } .MuiAccordion-root, .MuiAccordion-root * { visibility: visible; } }
//       `}</style>
//     </div>
//   );
// };

// export default GSTReport;








// src/pages/reports/GSTReport.tsx

import React, { useState, useEffect, useMemo } from "react";
import {
  Grid, Typography, CircularProgress, Alert, Paper, Avatar, Button,
  TextField, MenuItem, Select, FormControl, InputLabel, Chip,
  Accordion, AccordionSummary, AccordionDetails, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VerifiedIcon from "@mui/icons-material/Verified";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PrintIcon from "@mui/icons-material/Print";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
import { fetchGSTReport } from "../../../../Redux Toolkit/Seller/gstSlice";
import { formatOrderId } from "../../../../util/formatOrderId";

const GSTReport: React.FC = () => {
  const dispatch = useAppDispatch();
  const { gst, sellers } = useAppSelector((state: any) => state);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("monthly");

  // ═══════════════════════════════════════════════════
  // ✅ SELLER DETAILS – सब कुछ Profile से Dynamic
  // ═══════════════════════════════════════════════════
  const reportData = gst?.reportData;
  const backendSellerInfo = reportData?.sellerInfo || {};
  const sellerProfile = sellers?.profile || {};
  const businessDetails = sellerProfile?.businessDetails || {};
  const backendAddress = backendSellerInfo?.pickupAddress || {};

  // ─── Personal Info (Profile से) ────────────────────
  const sellerName =
    sellerProfile?.sellerName ||
    sellerProfile?.name ||
    backendSellerInfo?.name ||
    "Seller";

  const sellerEmail =
    sellerProfile?.email ||
    backendSellerInfo?.email ||
    "N/A";

  const sellerMobile =
    sellerProfile?.mobile ||
    sellerProfile?.phone ||
    backendSellerInfo?.mobile ||
    "N/A";

  const sellerId = sellerProfile?._id || sellerProfile?.id || null;

  // ─── Business Info (Profile के businessDetails से) ─
  const businessName =
    businessDetails?.businessName ||
    sellerProfile?.businessName ||
    backendSellerInfo?.businessName ||
    "Business Name";

  const gstNumber =
    businessDetails?.gstin ||
    businessDetails?.GSTIN ||
    sellerProfile?.gstin ||
    sellerProfile?.GSTIN ||
    backendSellerInfo?.gstin ||
    "N/A";

  const panNumber =
    businessDetails?.panNumber ||
    businessDetails?.PAN ||
    sellerProfile?.panNumber ||
    sellerProfile?.PAN ||
    backendSellerInfo?.panNumber ||
    "N/A";

  const accountStatus =
    sellerProfile?.accountStatus ||
    backendSellerInfo?.accountStatus ||
    "ACTIVE";

  const warehouseCode =
    sellerProfile?.warehouseCode ||
    businessDetails?.warehouseCode ||
    backendSellerInfo?.warehouseCode ||
    "N/A";

  // ─── Pickup Address (Profile के businessDetails से) ─
  const pickupAddress = {
    address:
      businessDetails?.address ||
      sellerProfile?.pickupAddress?.address ||
      backendAddress?.address ||
      "N/A",
    city:
      businessDetails?.city ||
      sellerProfile?.pickupAddress?.city ||
      backendAddress?.city ||
      "N/A",
    state:
      businessDetails?.state ||
      sellerProfile?.pickupAddress?.state ||
      backendAddress?.state ||
      "N/A",
    stateCode:
      businessDetails?.stateCode ||
      sellerProfile?.pickupAddress?.stateCode ||
      backendAddress?.stateCode ||
      "N/A",
    pinCode:
      businessDetails?.pinCode ||
      sellerProfile?.pickupAddress?.pinCode ||
      backendAddress?.pinCode ||
      "N/A",
    mobile:
      businessDetails?.mobile ||
      sellerProfile?.pickupAddress?.mobile ||
      sellerMobile,
  };

  // Backward compatibility
  const sellerAddress = pickupAddress.address;
  const sellerState = pickupAddress.state;
  const sellerStateCode = pickupAddress.stateCode;
  const sellerPhone = sellerMobile;

  // ─── Dates Setup ───────────────────────────────────
  useEffect(() => {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    setStartDate(lastMonth.toISOString().split("T")[0]);
    setEndDate(today.toISOString().split("T")[0]);
  }, []);

  // ─── Fetch Data ────────────────────────────────────
  useEffect(() => {
    if (startDate && endDate) {
      dispatch(
        fetchGSTReport({
          startDate,
          endDate,
          type: filterType,
          sellerId: sellerId || undefined,
        }) as any
      );
    }
  }, [startDate, endDate, filterType, sellerId, dispatch]);

  // ─── Debug Console ────────────────────────────────
  useEffect(() => {
    console.log("═══════════════════════════════════");
    console.log("🔍 Full sellers.profile:", sellers?.profile);
    console.log("🔍 businessDetails:", sellers?.profile?.businessDetails);
    console.log("🔍 reportData.sellerInfo:", gst?.reportData?.sellerInfo);
    console.log("🔍 Final Values:");
    console.log("   Business Name:", businessName);
    console.log("   GSTIN:", gstNumber);
    console.log("   PAN:", panNumber);
    console.log("   Address:", pickupAddress.address);
    console.log("   City:", pickupAddress.city);
    console.log("   State:", pickupAddress.state);
    console.log("═══════════════════════════════════");
  }, [sellers, gst]);

  const setQuickFilter = (type: string) => {
    const today = new Date();
    const start = new Date();
    if (type === "current-month") start.setDate(1);
    else if (type === "last-month") {
      start.setMonth(today.getMonth() - 1);
      start.setDate(1);
      today.setDate(0);
    } else if (type === "3-months") start.setMonth(today.getMonth() - 3);
    else if (type === "6-months") start.setMonth(today.getMonth() - 6);
    else if (type === "1-year") start.setFullYear(today.getFullYear() - 1);
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(today.toISOString().split("T")[0]);
    setFilterType(type);
  };

  const orders = reportData?.orders || [];
  const monthlySummary = reportData?.monthlySummary || [];
  const totals = reportData?.totals || {};

  // ═══════════════════════════════════════════════════
  // 📥 EXCEL DOWNLOAD
  // ═══════════════════════════════════════════════════
  const handleDownloadExcel = () => {
    if (orders.length === 0) return;

    const headers = [
      "Order ID", "Order Date", "Invoice Number", "Invoice Date",
      "Order Status", "Order Type",
      "Seller Name", "Seller Email", "Seller Mobile",
      "Business Name", "Seller GSTIN", "Seller PAN",
      "Account Status", "Warehouse Code",
      "Seller Address", "Seller City", "Seller State",
      "Seller State Code", "Seller Pin Code",
      "Customer Name", "Customer Email", "Customer Phone",
      "Customer GSTIN", "Customer Address", "Customer City",
      "Customer State", "Customer State Code", "Customer Pin Code",
      "Place of Supply", "Inter State",
      "Ship From City", "Ship From State", "Ship From Country", "Ship From Pin Code",
      "Ship To City", "Ship To State", "Ship To Country", "Ship To Pin Code",
      "ASIN", "SKU", "Product Name", "Category", "Brand", "HSN Code",
      "Quantity", "MRP (₹)", "Selling Price (₹)", "Rate (₹)",
      "Discount (₹)", "Discount %",
      "Taxable Value (₹)", "GST %", "Tax Type",
      "CGST (₹)", "SGST (₹)", "IGST (₹)", "Total GST (₹)", "Invoice Value (₹)",
      "Currency", "Payment Method", "Payment Status",
      "Tax Collection Model", "Tax Responsible Party",
      "Tax Calculated Date", "Posted Date", "Fulfillment Type",
    ];

    const rows: any[] = [];

    orders.forEach((order: any) => {
      order.items.forEach((item: any) => {
        rows.push([
          formatOrderId(order.orderId),
          new Date(order.orderDate).toLocaleDateString("en-IN"),
          order.invoiceNumber,
          new Date(order.invoiceDate).toLocaleDateString("en-IN"),
          order.orderStatus, order.orderType,
          sellerName, sellerEmail, sellerMobile,
          businessName, gstNumber, panNumber,
          accountStatus, warehouseCode,
          pickupAddress.address, pickupAddress.city,
          pickupAddress.state, pickupAddress.stateCode,
          pickupAddress.pinCode,
          order.customerName, order.customerEmail, order.customerPhone,
          order.customerGSTIN || "-", order.customerAddress,
          order.customerCity, order.customerState, order.customerStateCode,
          order.customerPinCode, order.placeOfSupply,
          order.isInterState ? "Yes" : "No",
          order.shipFromCity, order.shipFromState,
          order.shipFromCountry, order.shipFromPinCode,
          order.shipToCity, order.shipToState,
          order.shipToCountry, order.shipToPinCode,
          item.asin, item.sku, item.productName, item.category,
          item.brand, item.hsnCode, item.quantity,
          item.mrpPrice, item.sellingPrice, item.rate,
          item.discount, item.discountPercent,
          item.taxableValue, item.gstPercent, item.taxType,
          item.cgst, item.sgst, item.igst, item.totalGst, item.itemTotal,
          order.currency, order.paymentMethod, order.paymentStatus,
          order.taxCollectionModel, order.taxResponsibleParty,
          new Date(order.taxCalculatedDate).toLocaleDateString("en-IN"),
          new Date(order.postedDate).toLocaleDateString("en-IN"),
          order.fulfillmentType,
        ]);
      });
    });

    const csvContent = [
      ["═══ SELLER DETAILS ═══"],
      ["Seller Name", sellerName],
      ["Seller Email", sellerEmail],
      ["Seller Mobile", sellerMobile],
      [],
      ["═══ BUSINESS DETAILS ═══"],
      ["Business Name", businessName],
      ["GSTIN", gstNumber],
      ["PAN", panNumber],
      ["Account Status", accountStatus],
      ["Delhivery Warehouse Code", warehouseCode],
      [],
      ["═══ PICKUP ADDRESS ═══"],
      ["Address", pickupAddress.address],
      ["City", pickupAddress.city],
      ["State", pickupAddress.state],
      ["State Code", pickupAddress.stateCode],
      ["Pin Code", pickupAddress.pinCode],
      ["Mobile", pickupAddress.mobile],
      [],
      ["═══ GST REPORT ═══"],
      [`Period: ${startDate} to ${endDate}`],
      [`Generated on: ${new Date().toLocaleString("en-IN")}`],
      [],
      ["═══ DETAILED GST INVOICE RECORDS ═══"],
      headers,
      ...rows,
    ]
      .map((row) => row.map((cell: any) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `GST_Report_${businessName.replace(/\s+/g, "_")}_${startDate}_to_${endDate}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const summaryCards = useMemo(
    () => [
      { icon: <ReceiptIcon />, title: "Taxable Value", value: `₹${Number(totals.totalTaxableValue || 0).toLocaleString("en-IN")}`, bg: "from-purple-500 to-purple-700" },
      { icon: <AttachMoneyIcon />, title: "CGST", value: `₹${Number(totals.totalCGST || 0).toLocaleString("en-IN")}`, bg: "from-blue-500 to-blue-700" },
      { icon: <AttachMoneyIcon />, title: "SGST", value: `₹${Number(totals.totalSGST || 0).toLocaleString("en-IN")}`, bg: "from-green-500 to-green-700" },
      { icon: <AttachMoneyIcon />, title: "IGST", value: `₹${Number(totals.totalIGST || 0).toLocaleString("en-IN")}`, bg: "from-orange-500 to-orange-700" },
      { icon: <AccountBalanceIcon />, title: "Total GST", value: `₹${Number(totals.totalTax || 0).toLocaleString("en-IN")}`, bg: "from-red-500 to-red-700" },
      { icon: <TrendingUpIcon />, title: "Invoice Value", value: `₹${Number(totals.totalInvoiceValue || 0).toLocaleString("en-IN")}`, bg: "from-teal-500 to-teal-700" },
    ],
    [totals]
  );

  if (gst?.loading && !reportData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <CircularProgress size={50} />
        <p className="text-gray-500">Loading GST data...</p>
      </div>
    );
  }

  if (gst?.error) {
    return (
      <div className="p-6">
        <Alert severity="error">{gst.error}</Alert>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen space-y-6">
      {/* ═══ HEADER BANNER ═══ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 md:p-8 shadow-xl">
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar sx={{ width: 72, height: 72, bgcolor: "white", color: "#4f46e5", fontWeight: "bold", fontSize: 28 }}>
              <StorefrontIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow">
                  {businessName}
                </h1>
                <VerifiedIcon sx={{ color: "#4ade80", fontSize: 22 }} />
                <Chip
                  label={accountStatus}
                  size="small"
                  sx={{ bgcolor: "#10b981", color: "white", fontWeight: "bold", fontSize: 11 }}
                />
              </div>
              <p className="text-white/90 text-sm mt-1 font-mono">
                GSTIN: {gstNumber} | PAN: {panNumber}
              </p>
              <p className="text-white/80 text-xs mt-1 flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1">
                  <PersonIcon sx={{ fontSize: 14 }} /> {sellerName}
                </span>
                <span className="flex items-center gap-1">
                  <EmailIcon sx={{ fontSize: 14 }} /> {sellerEmail}
                </span>
                <span className="flex items-center gap-1">
                  <PhoneIcon sx={{ fontSize: 14 }} /> {sellerMobile}
                </span>
              </p>
              <p className="text-white/70 text-xs mt-1 flex items-center gap-1">
                <LocationOnIcon sx={{ fontSize: 14 }} />
                {pickupAddress.address}, {pickupAddress.city}, {pickupAddress.state} - {pickupAddress.pinCode}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleDownloadExcel}
              variant="contained"
              disabled={orders.length === 0}
              startIcon={<DownloadIcon />}
              sx={{ bgcolor: "white", color: "#4f46e5", fontWeight: "bold", textTransform: "none", px: 3, py: 1.2, "&:hover": { bgcolor: "#f3f4f6" } }}
            >
              Download Excel
            </Button>
            <Button
              onClick={() => window.print()}
              variant="outlined"
              startIcon={<PrintIcon />}
              sx={{ color: "white", borderColor: "white", fontWeight: "bold", textTransform: "none", px: 3, py: 1.2 }}
            >
              Print
            </Button>
          </div>
        </div>
      </div>

      {/* ═══ SELLER DETAILS CARD ═══ */}
      <Paper className="shadow-md rounded-xl overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600">
          <Typography variant="h6" className="font-bold text-white flex items-center gap-2">
            <BusinessIcon /> Seller Details
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Personal */}
          <div className="p-5 bg-indigo-50 border-r">
            <Typography className="font-bold text-xs text-indigo-800 uppercase mb-3">
              👤 Personal Information
            </Typography>
            <div className="space-y-2">
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Seller Name</p>
                <p className="font-bold text-gray-900">{sellerName}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Email</p>
                <p className="text-sm text-gray-700">{sellerEmail}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Mobile</p>
                <p className="text-sm text-gray-700">{sellerMobile}</p>
              </div>
            </div>
          </div>

          {/* Business */}
          <div className="p-5 bg-green-50 border-r">
            <Typography className="font-bold text-xs text-green-800 uppercase mb-3">
              🏢 Business Details
            </Typography>
            <div className="space-y-2">
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Business Name</p>
                <p className="font-bold text-gray-900">{businessName}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold">GSTIN</p>
                <p className="font-mono font-bold text-indigo-700">{gstNumber}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold">PAN</p>
                <p className="font-mono font-bold text-gray-800">{panNumber}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Status</p>
                <Chip label={accountStatus} size="small" sx={{ bgcolor: "#10b981", color: "white", fontWeight: "bold", fontSize: 11 }} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Delhivery Warehouse Code</p>
                <p className="font-mono font-bold text-gray-800 flex items-center gap-1">
                  <WarehouseIcon sx={{ fontSize: 14 }} /> {warehouseCode}
                </p>
              </div>
            </div>
          </div>

          {/* Pickup Address */}
          <div className="p-5 bg-yellow-50">
            <Typography className="font-bold text-xs text-yellow-800 uppercase mb-3">
              📍 Pickup Address
            </Typography>
            <div className="space-y-2">
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Address</p>
                <p className="text-sm text-gray-800 font-medium">{pickupAddress.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">City</p>
                  <p className="text-sm font-bold text-gray-800">{pickupAddress.city}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">State</p>
                  <p className="text-sm font-bold text-gray-800">{pickupAddress.state}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">State Code</p>
                  <p className="text-sm font-mono font-bold text-gray-800">{pickupAddress.stateCode}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Pin Code</p>
                  <p className="text-sm font-mono font-bold text-gray-800">{pickupAddress.pinCode}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Mobile</p>
                <p className="text-sm text-gray-700">{pickupAddress.mobile}</p>
              </div>
            </div>
          </div>
        </div>
      </Paper>

      {/* ═══ FILTERS ═══ */}
      <Paper className="p-5 shadow-md rounded-xl">
        <Typography variant="h6" className="font-bold mb-4">🗓️ Filter Options</Typography>
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { label: "Current Month", value: "current-month" },
            { label: "Last Month", value: "last-month" },
            { label: "Last 3 Months", value: "3-months" },
            { label: "Last 6 Months", value: "6-months" },
            { label: "Last 1 Year", value: "1-year" },
          ].map((filter) => (
            <Button
              key={filter.value}
              variant={filterType === filter.value ? "contained" : "outlined"}
              size="small"
              onClick={() => setQuickFilter(filter.value)}
              sx={{ textTransform: "none" }}
            >
              {filter.label}
            </Button>
          ))}
        </div>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} fullWidth size="small" InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} fullWidth size="small" InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Report Type</InputLabel>
              <Select value={filterType} onChange={(e) => setFilterType(e.target.value)} label="Report Type">
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly (3 Months)</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* ═══ SUMMARY CARDS ═══ */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both` }}
          >
            <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${card.bg} p-4 shadow-lg text-white`}>
              <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-white/10" />
              <div className="relative">
                <p className="text-xs uppercase tracking-wider text-white/80">{card.title}</p>
                <p className="text-lg md:text-xl font-bold mt-2">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ═══ ORDER-WISE INVOICES ═══ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
          <div>
            <Typography variant="h6" className="font-bold text-gray-800">🛒 Order-wise GST Invoices</Typography>
            <Typography variant="body2" className="text-gray-500">Flipkart / Amazon MTR Style</Typography>
          </div>
          <Chip label={`${orders.length} Orders`} sx={{ bgcolor: "#4f46e5", color: "white", fontWeight: "bold" }} />
        </div>

        {orders.length === 0 ? (
          <Paper className="p-10 text-center">
            <ReceiptIcon sx={{ fontSize: 60, color: "#cbd5e1", mb: 1 }} />
            <Typography color="textSecondary">कोई Orders नहीं मिले इस Period में</Typography>
          </Paper>
        ) : (
          orders.map((order: any, idx: number) => (
            <Accordion
              key={order.orderId}
              defaultExpanded={idx === 0}
              sx={{ borderRadius: "12px !important", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", "&:before": { display: "none" }, overflow: "hidden", border: "1px solid #e5e7eb" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ background: "linear-gradient(90deg, #f8fafc 0%, #eef2ff 100%)", borderBottom: "1px solid #e5e7eb" }}
              >
                <div className="w-full flex flex-col md:flex-row md:items-center gap-3 pr-4">
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar sx={{ bgcolor: "#4f46e5", width: 44, height: 44, fontWeight: "bold", fontSize: 16 }}>
                      {idx + 1}
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-indigo-700 text-sm">
                          {formatOrderId(order.orderId)}
                        </span>
                        <Chip label={order.orderStatus?.toUpperCase() || "COMPLETED"} size="small" sx={{ bgcolor: "#10b981", color: "white", fontSize: 10, height: 20, fontWeight: "bold" }} />
                        {order.isInterState && (
                          <Chip label="IGST" size="small" sx={{ bgcolor: "#f59e0b", color: "white", fontSize: 10, height: 20 }} />
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(order.orderDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        {" • "}{order.items.length} item{order.items.length > 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Total GST</p>
                      <p className="font-bold text-red-600 text-sm">₹{Number(order.totalGST).toLocaleString("en-IN")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Invoice Value</p>
                      <p className="font-bold text-indigo-700 text-base">₹{Number(order.totalInvoiceValue).toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </div>
              </AccordionSummary>

              <AccordionDetails sx={{ p: 0 }}>
                <div className="bg-white">
                  {/* Invoice Header */}
                  <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 flex justify-between items-center flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-white">
                      <ReceiptIcon />
                      <span className="font-bold">TAX INVOICE</span>
                    </div>
                    <div className="text-white text-right">
                      <p className="text-xs opacity-90">Invoice No</p>
                      <p className="font-mono font-bold">{order.invoiceNumber}</p>
                    </div>
                  </div>

                  {/* 3-Column Seller + Customer + Tax */}
                  <div className="grid grid-cols-1 md:grid-cols-3 border-b">
                    {/* Seller Info */}
                    <div className="p-4 bg-indigo-50 border-r">
                      <div className="flex items-center gap-2 mb-2">
                        <StorefrontIcon sx={{ fontSize: 16, color: "#4f46e5" }} />
                        <Typography className="font-bold text-xs text-indigo-800 uppercase">Sold By</Typography>
                      </div>
                      <p className="font-bold text-gray-900 text-sm">{sellerName}</p>
                      <p className="text-xs text-gray-600">📧 {sellerEmail}</p>
                      <p className="text-xs text-gray-600">📞 {sellerMobile}</p>
                      <div className="mt-2 pt-2 border-t border-indigo-200">
                        <p className="font-bold text-gray-900 text-sm">{businessName}</p>
                        <p className="text-xs text-indigo-700 font-mono font-bold">GSTIN: {gstNumber}</p>
                        <p className="text-xs text-gray-600 font-mono">PAN: {panNumber}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          🏭 Warehouse: <strong>{warehouseCode}</strong>
                        </p>
                      </div>
                      <div className="mt-2 pt-2 border-t border-indigo-200">
                        <p className="text-xs text-gray-700">{pickupAddress.address}</p>
                        <p className="text-xs text-gray-600">
                          {pickupAddress.city}, {pickupAddress.state} - {pickupAddress.pinCode}
                        </p>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="p-4 bg-green-50 border-r">
                      <div className="flex items-center gap-2 mb-2">
                        <PersonIcon sx={{ fontSize: 16, color: "#10b981" }} />
                        <Typography className="font-bold text-xs text-green-800 uppercase">Ship To</Typography>
                      </div>
                      <p className="font-bold text-gray-900 text-sm">{order.customerName}</p>
                      <p className="text-xs text-gray-600 mt-1">{order.customerAddress}</p>
                      <p className="text-xs text-gray-600">{order.customerCity} - {order.customerPinCode}</p>
                      <p className="text-xs text-gray-600">📞 {order.customerPhone}</p>
                      <p className="text-xs text-gray-600">📧 {order.customerEmail}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">Place of Supply:</span>
                        <Chip label={order.placeOfSupply} size="small" sx={{ bgcolor: "#10b981", color: "white", fontSize: 10, height: 20 }} />
                      </div>
                    </div>

                    {/* Tax Details */}
                    <div className="p-4 bg-yellow-50">
                      <Typography className="font-bold text-xs text-yellow-800 uppercase mb-2">Tax Details</Typography>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-600">Supply Type: <strong>{order.isInterState ? "Inter-State (IGST)" : "Intra-State (CGST+SGST)"}</strong></p>
                        <p className="text-xs text-gray-600">Tax Model: <strong>{order.taxCollectionModel}</strong></p>
                        <p className="text-xs text-gray-600">Responsible: <strong>{order.taxResponsibleParty}</strong></p>
                        <p className="text-xs text-gray-600">Payment: <strong>{order.paymentMethod}</strong></p>
                        <p className="text-xs text-gray-600">Status: <strong>{order.paymentStatus}</strong></p>
                        <p className="text-xs text-gray-600">Fulfillment: <strong>{order.fulfillmentType}</strong></p>
                      </div>
                    </div>
                  </div>

                  {/* Products Table */}
                  <div className="p-4">
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ bgcolor: "#1e293b" }}>
                            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }}>#</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }}>PRODUCT</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }}>ASIN / SKU</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }} align="center">HSN</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }} align="right">QTY</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }} align="right">MRP</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }} align="right">RATE</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }} align="right">TAXABLE</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }} align="center">GST</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 10 }} align="right">TOTAL</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.items.map((item: any, i: number) => (
                            <TableRow key={i} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                              <TableCell className="text-xs font-bold">{i + 1}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {item.image && <img src={item.image} alt={item.productName} className="w-10 h-10 object-cover rounded" />}
                                  <div>
                                    <p className="text-xs font-bold text-gray-800">{item.productName}</p>
                                    <p className="text-[10px] text-gray-500">{item.brand} • {item.category}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-[10px] font-mono">
                                  <div className="font-bold text-indigo-700">{item.asin}</div>
                                  <div className="text-gray-500">{item.sku}</div>
                                </div>
                              </TableCell>
                              <TableCell align="center" className="font-mono text-xs">{item.hsnCode}</TableCell>
                              <TableCell align="right" className="font-bold text-xs">{item.quantity}</TableCell>
                              <TableCell align="right" className="text-xs text-gray-400 line-through">₹{Number(item.mrpPrice).toLocaleString("en-IN")}</TableCell>
                              <TableCell align="right" className="text-xs">₹{Number(item.rate).toLocaleString("en-IN")}</TableCell>
                              <TableCell align="right" className="font-bold text-xs">₹{Number(item.taxableValue).toLocaleString("en-IN")}</TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={`${item.gstPercent}%`}
                                  size="small"
                                  sx={{
                                    bgcolor: item.gstPercent === 18 ? "#fef3c7" : item.gstPercent === 12 ? "#dbeafe" : item.gstPercent === 5 ? "#dcfce7" : "#f3e8ff",
                                    color: item.gstPercent === 18 ? "#92400e" : item.gstPercent === 12 ? "#1e40af" : item.gstPercent === 5 ? "#166534" : "#6b21a8",
                                    fontSize: 10, height: 20, fontWeight: "bold",
                                  }}
                                />
                              </TableCell>
                              <TableCell align="right" className="font-bold text-indigo-700 text-xs">₹{Number(item.itemTotal).toLocaleString("en-IN")}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>

                  {/* Tax Breakdown */}
                  <div className="p-4 bg-slate-50 border-t">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-white p-3 rounded border"><p className="text-[10px] text-gray-500 uppercase font-bold">Taxable Value</p><p className="text-sm font-bold">₹{Number(order.totalTaxableValue).toLocaleString("en-IN")}</p></div>
                      <div className="bg-white p-3 rounded border"><p className="text-[10px] text-gray-500 uppercase font-bold">CGST</p><p className="text-sm font-bold text-blue-700">₹{Number(order.totalCGST).toLocaleString("en-IN")}</p></div>
                      <div className="bg-white p-3 rounded border"><p className="text-[10px] text-gray-500 uppercase font-bold">SGST</p><p className="text-sm font-bold text-green-700">₹{Number(order.totalSGST).toLocaleString("en-IN")}</p></div>
                      <div className="bg-white p-3 rounded border"><p className="text-[10px] text-gray-500 uppercase font-bold">IGST</p><p className="text-sm font-bold text-orange-700">₹{Number(order.totalIGST).toLocaleString("en-IN")}</p></div>
                    </div>
                    <div className="mt-3 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex justify-between items-center flex-wrap gap-3">
                      <div className="text-white">
                        <p className="text-xs uppercase opacity-90">Total GST</p>
                        <p className="text-xl font-bold">₹{Number(order.totalGST).toLocaleString("en-IN")}</p>
                      </div>
                      <div className="text-right text-white">
                        <p className="text-xs uppercase opacity-90">Invoice Value</p>
                        <p className="text-2xl font-bold">₹{Number(order.totalInvoiceValue).toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-100 text-center border-t">
                    <p className="text-[10px] text-gray-500 italic">
                      Computer-generated invoice | {order.fulfillmentType} | {order.currency}
                    </p>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </div>

      {/* ═══ MONTHLY SUMMARY ═══ */}
      {monthlySummary.length > 0 && (
        <Paper className="shadow-md overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600">
            <Typography variant="h6" className="font-bold text-white">📅 Monthly Summary</Typography>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell className="font-bold">Month</TableCell>
                  <TableCell align="right" className="font-bold">Taxable (₹)</TableCell>
                  <TableCell align="right" className="font-bold">CGST (₹)</TableCell>
                  <TableCell align="right" className="font-bold">SGST (₹)</TableCell>
                  <TableCell align="right" className="font-bold">IGST (₹)</TableCell>
                  <TableCell align="right" className="font-bold">Total GST (₹)</TableCell>
                  <TableCell align="right" className="font-bold">Invoice (₹)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {monthlySummary.map((m: any) => (
                  <TableRow key={m.month} className="hover:bg-gray-50">
                    <TableCell className="font-bold">{m.month}</TableCell>
                    <TableCell align="right">₹{Number(m.taxableValue).toLocaleString("en-IN")}</TableCell>
                    <TableCell align="right">₹{Number(m.cgst).toLocaleString("en-IN")}</TableCell>
                    <TableCell align="right">₹{Number(m.sgst).toLocaleString("en-IN")}</TableCell>
                    <TableCell align="right">₹{Number(m.igst).toLocaleString("en-IN")}</TableCell>
                    <TableCell align="right" className="font-bold text-red-600">₹{Number(m.totalGst).toLocaleString("en-IN")}</TableCell>
                    <TableCell align="right" className="font-bold text-indigo-600">₹{Number(m.invoiceValue).toLocaleString("en-IN")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @media print { body * { visibility: hidden; } .MuiAccordion-root, .MuiAccordion-root * { visibility: visible; } }
      `}</style>
    </div>
  );
};

export default GSTReport;