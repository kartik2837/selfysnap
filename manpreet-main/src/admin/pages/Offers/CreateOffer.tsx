// // src/admin/pages/Offers/CreateOffer.tsx

// import React, { useState } from "react";
// import {
//   TextField, Button, Paper, Typography, Grid, MenuItem, Select,
//   FormControl, InputLabel, Snackbar, Alert, Box, Chip,
// } from "@mui/material";
// import SaveIcon from "@mui/icons-material/Save";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { createOffer } from "../../../Redux Toolkit/Admin/offerSlice";
// import { useNavigate } from "react-router-dom";

// const offerTypes = [
//   { value: "PERCENTAGE", label: "🔥 Percentage Discount" },
//   { value: "FLAT", label: "💵 Flat Discount" },
//   { value: "FLASH_SALE", label: "⚡ Flash Sale" },
//   { value: "FESTIVAL", label: "🎊 Festival Sale" },
//   { value: "BOGO", label: "🎁 Buy 1 Get 1" },
//   { value: "FREE_SHIPPING", label: "🚚 Free Shipping" },
// ];

// const CreateOffer: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { loading } = useAppSelector((state: any) => state.offers);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     offerType: "PERCENTAGE",
//     discountPercent: 50,
//     flatDiscount: 0,
//     maxDiscount: 5000,
//     minPurchaseAmount: 0,
//     startDate: new Date().toISOString().split("T")[0],
//     endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//       .toISOString()
//       .split("T")[0],
//     bannerImage: "",
//     backgroundColor: "#4f46e5",
//     isActive: true,
//     isFeatured: false,
//     priority: "MEDIUM",
//     termsAndConditions: "",
//     notifyUsers: true,
//   });

//   const [snackbar, setSnackbar] = useState<any>({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const handleSubmit = async () => {
//     if (!form.title.trim() || !form.description.trim()) {
//       setSnackbar({
//         open: true,
//         message: "Title और Description जरूरी है",
//         severity: "error",
//       });
//       return;
//     }

//     try {
//       await dispatch(createOffer(form) as any).unwrap();
//       setSnackbar({
//         open: true,
//         message: "🎉 Offer Created! Notification भेज दी गई!",
//         severity: "success",
//       });
//       setTimeout(() => navigate("/admin/offers"), 1500);
//     } catch (error: any) {
//       setSnackbar({
//         open: true,
//         message: error || "Failed to create offer",
//         severity: "error",
//       });
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <Paper className="p-6 max-w-5xl mx-auto rounded-2xl shadow-lg">
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-6 pb-4 border-b">
//           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl">
//             <LocalOfferIcon sx={{ color: "white", fontSize: 28 }} />
//           </div>
//           <div>
//             <Typography variant="h5" className="font-bold text-gray-800">
//               Create New Offer
//             </Typography>
//             <Typography variant="body2" className="text-gray-500">
//               नया Offer बनाएँ – Users को तुरंत Notification जाएगी
//             </Typography>
//           </div>
//         </div>

//         <Grid container spacing={3}>
//           {/* Offer Type */}
//           <Grid size={{ xs: 12, sm: 6 }}>
//             <FormControl fullWidth size="small">
//               <InputLabel>Offer Type</InputLabel>
//               <Select
//                 value={form.offerType}
//                 onChange={(e) =>
//                   setForm({ ...form, offerType: e.target.value })
//                 }
//                 label="Offer Type"
//               >
//                 {offerTypes.map((t) => (
//                   <MenuItem key={t.value} value={t.value}>
//                     {t.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* Priority */}
//           <Grid size={{ xs: 12, sm: 6 }}>
//             <FormControl fullWidth size="small">
//               <InputLabel>Priority</InputLabel>
//               <Select
//                 value={form.priority}
//                 onChange={(e) =>
//                   setForm({ ...form, priority: e.target.value })
//                 }
//                 label="Priority"
//               >
//                 <MenuItem value="LOW">🟢 Low</MenuItem>
//                 <MenuItem value="MEDIUM">🟡 Medium</MenuItem>
//                 <MenuItem value="HIGH">🔴 High</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           {/* Title */}
//           <Grid size={{ xs: 12 }}>
//             <TextField
//               fullWidth
//               label="Offer Title"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//               placeholder="🔥 Diwali Mega Sale Live!"
//               required
//             />
//           </Grid>

//           {/* Description */}
//           <Grid size={{ xs: 12 }}>
//             <TextField
//               fullWidth
//               multiline
//               rows={3}
//               label="Description"
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//               placeholder="60% तक की छूट - सभी Products पर!"
//               required
//             />
//           </Grid>

//           {/* Discount */}
//           {(form.offerType === "PERCENTAGE" ||
//             form.offerType === "FLASH_SALE" ||
//             form.offerType === "FESTIVAL") && (
//             <Grid size={{ xs: 12, sm: 4 }}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Discount %"
//                 value={form.discountPercent}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     discountPercent: Number(e.target.value),
//                   })
//                 }
//               />
//             </Grid>
//           )}

//           {form.offerType === "FLAT" && (
//             <Grid size={{ xs: 12, sm: 4 }}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Flat Discount (₹)"
//                 value={form.flatDiscount}
//                 onChange={(e) =>
//                   setForm({ ...form, flatDiscount: Number(e.target.value) })
//                 }
//               />
//             </Grid>
//           )}

//           <Grid size={{ xs: 12, sm: 4 }}>
//             <TextField
//               fullWidth
//               type="number"
//               label="Max Discount (₹)"
//               value={form.maxDiscount}
//               onChange={(e) =>
//                 setForm({ ...form, maxDiscount: Number(e.target.value) })
//               }
//             />
//           </Grid>

//           <Grid size={{ xs: 12, sm: 4 }}>
//             <TextField
//               fullWidth
//               type="number"
//               label="Min Purchase (₹)"
//               value={form.minPurchaseAmount}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   minPurchaseAmount: Number(e.target.value),
//                 })
//               }
//             />
//           </Grid>

//           {/* Dates */}
//           <Grid size={{ xs: 12, sm: 6 }}>
//             <TextField
//               fullWidth
//               type="date"
//               label="Start Date"
//               value={form.startDate}
//               onChange={(e) =>
//                 setForm({ ...form, startDate: e.target.value })
//               }
//               InputLabelProps={{ shrink: true }}
//             />
//           </Grid>

//           <Grid size={{ xs: 12, sm: 6 }}>
//             <TextField
//               fullWidth
//               type="date"
//               label="End Date"
//               value={form.endDate}
//               onChange={(e) => setForm({ ...form, endDate: e.target.value })}
//               InputLabelProps={{ shrink: true }}
//             />
//           </Grid>

//           {/* Banner Image */}
//           <Grid size={{ xs: 12 }}>
//             <TextField
//               fullWidth
//               label="Banner Image URL"
//               value={form.bannerImage}
//               onChange={(e) =>
//                 setForm({ ...form, bannerImage: e.target.value })
//               }
//               placeholder="https://example.com/banner.jpg"
//             />
//           </Grid>

//           {/* Terms */}
//           <Grid size={{ xs: 12 }}>
//             <TextField
//               fullWidth
//               multiline
//               rows={2}
//               label="Terms & Conditions"
//               value={form.termsAndConditions}
//               onChange={(e) =>
//                 setForm({ ...form, termsAndConditions: e.target.value })
//               }
//             />
//           </Grid>

//           {/* Options */}
//           <Grid size={{ xs: 12 }}>
//             <div className="flex flex-wrap gap-2">
//               <Chip
//                 label={form.isActive ? "✅ Active" : "❌ Inactive"}
//                 onClick={() =>
//                   setForm({ ...form, isActive: !form.isActive })
//                 }
//                 color={form.isActive ? "success" : "default"}
//                 sx={{ fontWeight: "bold", cursor: "pointer" }}
//               />
//               <Chip
//                 label={
//                   form.isFeatured ? "⭐ Featured" : "☆ Not Featured"
//                 }
//                 onClick={() =>
//                   setForm({ ...form, isFeatured: !form.isFeatured })
//                 }
//                 color={form.isFeatured ? "warning" : "default"}
//                 sx={{ fontWeight: "bold", cursor: "pointer" }}
//               />
//             </div>
//           </Grid>
//         </Grid>

//         {/* Preview */}
//         {form.title && (
//           <div className="mt-6 p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl">
//             <Typography className="text-xs text-slate-400 mb-2 uppercase font-bold">
//               📱 Notification Preview
//             </Typography>
//             <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
//               <div className="flex items-start gap-3">
//                 <div className="bg-red-500 rounded-lg p-2">
//                   <NotificationsActiveIcon
//                     sx={{ color: "white", fontSize: 20 }}
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-bold text-white text-sm">{form.title}</p>
//                   <p className="text-xs text-slate-300 mt-1">
//                     {form.description}
//                   </p>
//                   {form.discountPercent > 0 && (
//                     <Chip
//                       label={`${form.discountPercent}% OFF`}
//                       size="small"
//                       sx={{
//                         bgcolor: "#fef3c7",
//                         color: "#92400e",
//                         mt: 1,
//                         fontWeight: "bold",
//                       }}
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Submit */}
//         <Button
//           fullWidth
//           variant="contained"
//           onClick={handleSubmit}
//           disabled={loading}
//           startIcon={<SaveIcon />}
//           sx={{
//             mt: 4,
//             py: 1.5,
//             bgcolor: "#4f46e5",
//             textTransform: "none",
//             fontWeight: "bold",
//             fontSize: 16,
//             "&:hover": { bgcolor: "#4338ca" },
//           }}
//         >
//           {loading ? "बना रहे हैं..." : "🎉 Create Offer & Notify Users"}
//         </Button>
//       </Paper>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert severity={snackbar.severity} variant="filled">
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default CreateOffer;








// src/admin/pages/Offers/CreateOffer.tsx

import React, { useState } from "react";
import {
  TextField, Button, Paper, Typography, Grid, MenuItem, Select,
  FormControl, InputLabel, Snackbar, Alert, Chip, CircularProgress,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { createOffer } from "../../../Redux Toolkit/Admin/offerSlice";
import { useNavigate } from "react-router-dom";

const offerTypes = [
  { value: "PERCENTAGE", label: "🔥 Percentage Discount" },
  { value: "FLAT", label: "💵 Flat Discount" },
  { value: "FLASH_SALE", label: "⚡ Flash Sale" },
  { value: "FESTIVAL", label: "🎊 Festival Sale" },
  { value: "BOGO", label: "🎁 Buy 1 Get 1" },
  { value: "FREE_SHIPPING", label: "🚚 Free Shipping" },
];

const CreateOffer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state: any) => state.offers);

  const [form, setForm] = useState({
    title: "",
    description: "",
    offerType: "PERCENTAGE",
    discountPercent: 50,
    flatDiscount: 0,
    maxDiscount: 5000,
    minPurchaseAmount: 0,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    bannerImage: "",
    backgroundColor: "#4f46e5",
    isActive: true,
    isFeatured: false,
    priority: "MEDIUM",
    termsAndConditions: "",
  });

  // ✅ Image Upload State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [snackbar, setSnackbar] = useState<any>({
    open: false,
    message: "",
    severity: "success",
  });

  // ═══════════════════════════════════════════════════
  // ✅ IMAGE HANDLE
  // ═══════════════════════════════════════════════════
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Size Check (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setSnackbar({
        open: true,
        message: "Image 5MB से छोटी होनी चाहिए",
        severity: "error",
      });
      return;
    }

    // Type Check
    if (!file.type.startsWith("image/")) {
      setSnackbar({
        open: true,
        message: "सिर्फ Image Files allowed हैं",
        severity: "error",
      });
      return;
    }

    console.log("✅ Image selected:", file.name, file.size);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setForm({ ...form, bannerImage: "" });
  };

  // ═══════════════════════════════════════════════════
  // ✅ SUBMIT
  // ═══════════════════════════════════════════════════
  const handleSubmit = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      setSnackbar({
        open: true,
        message: "Title और Description जरूरी है",
        severity: "error",
      });
      return;
    }

    try {
      const submitData: any = { ...form };

      // ✅ Image File Add करो
      if (imageFile) {
        submitData.bannerImageFile = imageFile;
        console.log("📷 Image attached:", imageFile.name);
      }

      console.log("📤 Submitting...", submitData);

      await dispatch(createOffer(submitData) as any).unwrap();

      setSnackbar({
        open: true,
        message: "🎉 Offer Created! Notification भेज दी गई!",
        severity: "success",
      });

      setTimeout(() => navigate("/admin/offers"), 1500);
    } catch (error: any) {
      console.error("Submit error:", error);
      setSnackbar({
        open: true,
        message: error || "Failed to create offer",
        severity: "error",
      });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Paper className="p-6 max-w-5xl mx-auto rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl">
            <LocalOfferIcon sx={{ color: "white", fontSize: 28 }} />
          </div>
          <div>
            <Typography variant="h5" className="font-bold text-gray-800">
              Create New Offer
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              Image Upload करें + सभी Users को Notification भेजें
            </Typography>
          </div>
        </div>

        <Grid container spacing={3}>
          {/* ✅ IMAGE UPLOAD SECTION */}
          <Grid size={{ xs: 12 }}>
            <Typography className="text-sm font-bold text-gray-700 mb-3">
              🖼️ Offer Banner Image
            </Typography>

            <input
              type="file"
              accept="image/*"
              id="offerImageInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <div className="flex flex-wrap gap-4 items-start">
              {/* Upload Box */}
              <label htmlFor="offerImageInput" className="cursor-pointer">
                <div className="w-44 h-44 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                  <AddPhotoAlternateIcon
                    sx={{ fontSize: 48, color: "#9ca3af" }}
                  />
                  <p className="text-sm text-gray-600 mt-2 font-medium">
                    Click to Upload
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    JPG, PNG, WebP (Max 5MB)
                  </p>
                </div>
              </label>

              {/* Preview */}
              {imagePreview && (
                <div className="relative w-44 h-44">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-xl shadow-md border-2 border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-all"
                  >
                    <CloseIcon sx={{ fontSize: 18 }} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] px-2 py-1 rounded-b-xl text-center">
                    ✅ Uploaded
                  </div>
                </div>
              )}

              {/* URL Alternative */}
              <div className="flex-1 min-w-[280px]">
                <TextField
                  fullWidth
                  size="small"
                  label="या Image URL डालें"
                  value={form.bannerImage}
                  onChange={(e) =>
                    setForm({ ...form, bannerImage: e.target.value })
                  }
                  placeholder="https://example.com/banner.jpg"
                  disabled={!!imageFile}
                  helperText={
                    imageFile
                      ? "✅ Image File Uploaded"
                      : "💡 File Upload करें या URL डालें"
                  }
                />
              </div>
            </div>
          </Grid>

          {/* Offer Type */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Offer Type</InputLabel>
              <Select
                value={form.offerType}
                onChange={(e) =>
                  setForm({ ...form, offerType: e.target.value })
                }
                label="Offer Type"
              >
                {offerTypes.map((t) => (
                  <MenuItem key={t.value} value={t.value}>
                    {t.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Priority */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Priority</InputLabel>
              <Select
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value })
                }
                label="Priority"
              >
                <MenuItem value="LOW">🟢 Low</MenuItem>
                <MenuItem value="MEDIUM">🟡 Medium</MenuItem>
                <MenuItem value="HIGH">🔴 High</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Title */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Offer Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="🔥 Diwali Mega Sale Live!"
              required
            />
          </Grid>

          {/* Description */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="60% तक की छूट - सभी Products पर!"
              required
            />
          </Grid>

          {/* Discount */}
          {(form.offerType === "PERCENTAGE" ||
            form.offerType === "FLASH_SALE" ||
            form.offerType === "FESTIVAL") && (
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Discount %"
                value={form.discountPercent}
                onChange={(e) =>
                  setForm({
                    ...form,
                    discountPercent: Number(e.target.value),
                  })
                }
              />
            </Grid>
          )}

          {form.offerType === "FLAT" && (
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Flat Discount (₹)"
                value={form.flatDiscount}
                onChange={(e) =>
                  setForm({ ...form, flatDiscount: Number(e.target.value) })
                }
              />
            </Grid>
          )}

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Max Discount (₹)"
              value={form.maxDiscount}
              onChange={(e) =>
                setForm({ ...form, maxDiscount: Number(e.target.value) })
              }
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              type="number"
              label="Min Purchase (₹)"
              value={form.minPurchaseAmount}
              onChange={(e) =>
                setForm({
                  ...form,
                  minPurchaseAmount: Number(e.target.value),
                })
              }
            />
          </Grid>

          {/* Dates */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              value={form.startDate}
              onChange={(e) =>
                setForm({ ...form, startDate: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="date"
              label="End Date"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Terms */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Terms & Conditions"
              value={form.termsAndConditions}
              onChange={(e) =>
                setForm({ ...form, termsAndConditions: e.target.value })
              }
            />
          </Grid>

          {/* Toggles */}
          <Grid size={{ xs: 12 }}>
            <div className="flex flex-wrap gap-2">
              <Chip
                label={form.isActive ? "✅ Active" : "❌ Inactive"}
                onClick={() =>
                  setForm({ ...form, isActive: !form.isActive })
                }
                color={form.isActive ? "success" : "default"}
                sx={{ fontWeight: "bold", cursor: "pointer" }}
              />
              <Chip
                label={form.isFeatured ? "⭐ Featured" : "☆ Not Featured"}
                onClick={() =>
                  setForm({ ...form, isFeatured: !form.isFeatured })
                }
                color={form.isFeatured ? "warning" : "default"}
                sx={{ fontWeight: "bold", cursor: "pointer" }}
              />
            </div>
          </Grid>
        </Grid>

        {/* Preview */}
        {(form.title || imagePreview) && (
          <div className="mt-6 p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl">
            <Typography className="text-xs text-slate-400 mb-2 uppercase font-bold">
              📱 Notification Preview
            </Typography>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <div className="flex items-start gap-3">
                <div className="bg-red-500 rounded-lg p-2">
                  <LocalOfferIcon sx={{ color: "white", fontSize: 20 }} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white text-sm">
                    {form.title || "Offer Title"}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    {form.description || "Offer Description"}
                  </p>
                  {(imagePreview || form.bannerImage) && (
                    <img
                      src={imagePreview || form.bannerImage}
                      alt=""
                      className="mt-2 w-full h-24 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  )}
                  {form.discountPercent > 0 && (
                    <Chip
                      label={`${form.discountPercent}% OFF`}
                      size="small"
                      sx={{
                        bgcolor: "#fef3c7",
                        color: "#92400e",
                        mt: 1,
                        fontWeight: "bold",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />
          }
          sx={{
            mt: 4,
            py: 1.5,
            bgcolor: "#4f46e5",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: 16,
            "&:hover": { bgcolor: "#4338ca" },
          }}
        >
          {loading ? "बना रहे हैं..." : "🎉 Create Offer & Notify Users"}
        </Button>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateOffer;