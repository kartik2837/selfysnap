// src/admin/pages/Banners/AdminBannersPage.tsx

import React, { useEffect, useState } from "react";
import {
  Paper, Typography, Button, TextField, Grid, MenuItem,
  Select, FormControl, InputLabel, Switch, Snackbar, Alert,
  IconButton, Chip, CircularProgress, Dialog, DialogTitle,
  DialogContent, DialogActions, Slider, LinearProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { api } from "../../../Config/Api";
import { uploadToCloudinary } from "../../../util/uploadToCloudnary";

interface Banners {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  mediaType: "image" | "video";
  image: string;
  video: string;
  imagePublicId: string;
  videoPublicId: string;
  videoAutoplay: boolean;
  videoLoop: boolean;
  videoMuted: boolean;
  link: string;
  textPosition: "left" | "center" | "right";
  textColor: string;
  overlayOpacity: number;
  order: number;
  isActive: boolean;
  buttonText: string;
  buttonColor: string;
}

const defaultBanners: Banners = {
  title: "",
  subtitle: "",
  description: "",
  mediaType: "image",
  image: "",
  video: "",
  imagePublicId: "",
  videoPublicId: "",
  videoAutoplay: true,
  videoLoop: true,
  videoMuted: true,
  link: "/",
  textPosition: "left",
  textColor: "#ffffff",
  overlayOpacity: 0.4,
  order: 1,
  isActive: true,
  buttonText: "Shop Now",
  buttonColor: "#4f46e5",
};

const AdminBannersPage: React.FC = () => {
  const [banners, setBanners] = useState<Banners[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBanners, setEditingBanners] = useState<Banners | null>(null);
  const [form, setForm] = useState<Banners>(defaultBanners);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [snackbar, setSnackbar] = useState<any>({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/banners");
      setBanners(res.data.banners || []);
    } catch (error: any) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleOpenCreate = () => {
    setEditingBanners(null);
    setForm(defaultBanners);
    setMediaFile(null);
    setMediaPreview("");
    setDialogOpen(true);
  };

  const handleOpenEdit = (banner: Banners) => {
    setEditingBanners(banner);
    setForm({ ...banner });
    setMediaFile(null);
    setMediaPreview(banner.video || banner.image || "");
    setDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      setSnackbar({
        open: true,
        message: "File 50MB से छोटी होनी चाहिए",
        severity: "error",
      });
      return;
    }

    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isImage) {
      setSnackbar({
        open: true,
        message: "सिर्फ Image या Video allowed है",
        severity: "error",
      });
      return;
    }

    setMediaFile(file);
    setMediaPreview(URL.createObjectURL(file));

    setForm((prev) => ({
      ...prev,
      mediaType: isVideo ? "video" : "image",
    }));
  };

  const removeMedia = () => {
    setMediaFile(null);
    setMediaPreview("");
    setForm((prev) => ({
      ...prev,
      image: "",
      video: "",
      imagePublicId: "",
      videoPublicId: "",
    }));
  };

  // ═══════════════════════════════════════════════
  // 🚀 UPLOAD TO CLOUDINARY + SAVE TO DB
  // ═══════════════════════════════════════════════
  const handleSubmit = async () => {
    if (!form.title.trim()) {
      setSnackbar({
        open: true,
        message: "Title जरूरी है",
        severity: "error",
      });
      return;
    }

    setSaving(true);

    try {
      const submitData: Banners = { ...form };

      // ✅ अगर File चुनी है तो Cloudinary पर Upload करें
      if (mediaFile) {
        setUploading(true);

        const isVideo = mediaFile.type.startsWith("video/");
        const resourceType = isVideo ? "video" : "image";

        console.log(`☁️  Uploading ${resourceType} to Cloudinary...`);

        // ✅ uploadToCloudinary का Use
        const cloudUrl = await uploadToCloudinary(
          mediaFile,
          resourceType as "image" | "video"
        );

        console.log("✅ Cloudinary URL:", cloudUrl);

        // Public ID निकालें URL से
        // URL Format: https://res.cloudinary.com/cloud/image/upload/v123/folder/publicId.ext
        const publicId = extractPublicId(cloudUrl);
        console.log("✅ Public ID:", publicId);

        if (isVideo) {
          submitData.video = cloudUrl;
          submitData.videoPublicId = publicId;
          submitData.mediaType = "video";
        } else {
          submitData.image = cloudUrl;
          submitData.imagePublicId = publicId;
          submitData.mediaType = "image";
        }

        setUploading(false);
      }

      // ✅ DB में Save करें
      if (editingBanners?._id) {
        await api.put(`/api/banners/${editingBanners._id}`, submitData);
        setSnackbar({
          open: true,
          message: "✅ Banners Updated!",
          severity: "success",
        });
      } else {
        await api.post("/api/banners", submitData);
        setSnackbar({
          open: true,
          message: "🎉 Banners Created!",
          severity: "success",
        });
      }

      setDialogOpen(false);
      fetchBanners();
    } catch (error: any) {
      console.error("Submit error:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || error.message,
        severity: "error",
      });
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  // ═══════════════════════════════════════════════
  // 🔧 Public ID निकालें URL से
  // ═══════════════════════════════════════════════
  const extractPublicId = (url: string): string => {
    try {
      // URL: https://res.cloudinary.com/cloud/image/upload/v123/selfysnap/banners/file.jpg
      const parts = url.split("/upload/");
      if (parts.length < 2) return "";
      // v123/selfysnap/banners/file.jpg → selfysnap/banners/file
      return parts[1].replace(/^v\d+\//, "").replace(/\.[^/.]+$/, "");
    } catch {
      return "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this banner?")) return;
    try {
      await api.delete(`/api/banners/${id}`);
      setSnackbar({
        open: true,
        message: "🗑️ Banners Deleted",
        severity: "success",
      });
      fetchBanners();
    } catch (error: any) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await api.patch(`/api/banners/${id}/toggle`);
      fetchBanners();
    } catch (error: any) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 shadow-xl">
        <div className="relative flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              🎬 Banners Management
            </h1>
            <p className="text-white/80 text-sm mt-1">
              ☁️ Cloudinary पर Direct Upload
            </p>
          </div>
          <Button
            onClick={handleOpenCreate}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "white",
              color: "#4f46e5",
              fontWeight: "bold",
              textTransform: "none",
              px: 3,
              py: 1.2,
              "&:hover": { bgcolor: "#f3f4f6" },
            }}
          >
            Add Banners
          </Button>
        </div>
      </div>

      {/* Banners List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <CircularProgress />
        </div>
      ) : banners.length === 0 ? (
        <Paper className="p-16 text-center rounded-2xl">
          <div className="text-6xl mb-4">🎬</div>
          <Typography className="text-gray-500 text-lg">
            कोई Banners नहीं हैं
          </Typography>
          <Button
            onClick={handleOpenCreate}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mt: 3, textTransform: "none" }}
          >
            पहला Banners बनाएँ
          </Button>
        </Paper>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {banners.map((banner) => (
            <div
              key={banner._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="relative aspect-video bg-gray-900 overflow-hidden">
                {banner.mediaType === "video" && banner.video ? (
                  <video
                    src={banner.video}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                ) : banner.image ? (
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Media
                  </div>
                )}

                <div className="absolute top-3 left-3">
                  <Chip
                    icon={
                      banner.mediaType === "video" ? (
                        <VideoFileIcon sx={{ fontSize: 14 }} />
                      ) : (
                        <AddPhotoAlternateIcon sx={{ fontSize: 14 }} />
                      )
                    }
                    label={banner.mediaType.toUpperCase()}
                    size="small"
                    sx={{
                      bgcolor:
                        banner.mediaType === "video" ? "#ec4899" : "#4f46e5",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 10,
                    }}
                  />
                </div>

                <div className="absolute top-3 right-3">
                  <Chip
                    label={banner.isActive ? "● Active" : "○ Inactive"}
                    size="small"
                    sx={{
                      bgcolor: banner.isActive ? "#10b981" : "#6b7280",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 10,
                    }}
                  />
                </div>
              </div>

              <div className="p-4">
                <Typography className="font-bold text-gray-800 line-clamp-1">
                  {banner.title}
                </Typography>
                <Typography className="text-xs text-gray-500 line-clamp-1 mt-1">
                  {banner.subtitle || banner.description || "No description"}
                </Typography>

                <div className="flex justify-end gap-2 mt-3">
                  <IconButton
                    size="small"
                    onClick={() => handleToggle(banner._id!)}
                    sx={{
                      bgcolor: banner.isActive ? "#dcfce7" : "#f3f4f6",
                    }}
                  >
                    <span className="text-xs font-bold">
                      {banner.isActive ? "ON" : "OFF"}
                    </span>
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() => handleOpenEdit(banner)}
                    sx={{
                      bgcolor: "#eef2ff",
                      "&:hover": {
                        bgcolor: "#4f46e5",
                        "& svg": { color: "white" },
                      },
                    }}
                  >
                    <EditIcon sx={{ fontSize: 16, color: "#4f46e5" }} />
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() => handleDelete(banner._id!)}
                    sx={{
                      bgcolor: "#fee2e2",
                      "&:hover": {
                        bgcolor: "#ef4444",
                        "& svg": { color: "white" },
                      },
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 16, color: "#ef4444" }} />
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {editingBanners ? "✏️ Edit Banners" : "➕ Add New Banners"}
        </DialogTitle>

        {/* Upload Progress */}
        {uploading && <LinearProgress color="secondary" />}

        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3} className="mt-1">
            {/* Media Upload */}
            <Grid size={{ xs: 12 }}>
              <Typography className="font-bold text-sm mb-2 flex items-center gap-2">
                🎬 Media (Image या Video)
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                  ☁️ Cloudinary Direct
                </span>
              </Typography>

              <input
                type="file"
                accept="image/*,video/*"
                id="bannersMediaInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
                disabled={uploading}
              />

              <div className="flex flex-wrap gap-4 items-start">
                <label htmlFor="bannersMediaInput" className="cursor-pointer">
                  <div className="w-48 h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                    <CloudUploadIcon
                      sx={{ fontSize: 32, color: "#4f46e5" }}
                    />
                    <p className="text-xs text-gray-600 mt-1 font-medium">
                      {uploading ? "Uploading..." : "Upload Image / Video"}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Max 50MB • Cloudinary
                    </p>
                  </div>
                </label>

                {mediaPreview && (
                  <div className="relative w-64 h-32">
                    {form.mediaType === "video" ? (
                      <video
                        src={mediaPreview}
                        className="w-full h-full object-cover rounded-xl border-2 border-indigo-500"
                        muted
                        loop
                        autoPlay
                        playsInline
                      />
                    ) : (
                      <img
                        src={mediaPreview}
                        alt="preview"
                        className="w-full h-full object-cover rounded-xl border-2 border-indigo-500"
                      />
                    )}
                    <button
                      type="button"
                      onClick={removeMedia}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600"
                      disabled={uploading}
                    >
                      <CloseIcon sx={{ fontSize: 16 }} />
                    </button>
                  </div>
                )}
              </div>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Media Type</InputLabel>
                <Select
                  value={form.mediaType}
                  label="Media Type"
                  onChange={(e) =>
                    setForm({ ...form, mediaType: e.target.value as any })
                  }
                >
                  <MenuItem value="image">🖼️ Image</MenuItem>
                  <MenuItem value="video">🎬 Video</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Order"
                value={form.order}
                onChange={(e) =>
                  setForm({ ...form, order: Number(e.target.value) })
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="🔥 Big Sale"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Subtitle"
                value={form.subtitle}
                onChange={(e) =>
                  setForm({ ...form, subtitle: e.target.value })
                }
                placeholder="Up to 80% OFF"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Link URL"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="/products"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Button Text"
                value={form.buttonText}
                onChange={(e) =>
                  setForm({ ...form, buttonText: e.target.value })
                }
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Text Position</InputLabel>
                <Select
                  value={form.textPosition}
                  label="Text Position"
                  onChange={(e) =>
                    setForm({ ...form, textPosition: e.target.value as any })
                  }
                >
                  <MenuItem value="left">⬅️ Left</MenuItem>
                  <MenuItem value="center">⬆️ Center</MenuItem>
                  <MenuItem value="right">➡️ Right</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <div className="flex items-center gap-3">
                <TextField
                  fullWidth
                  size="small"
                  label="Text Color"
                  value={form.textColor}
                  onChange={(e) =>
                    setForm({ ...form, textColor: e.target.value })
                  }
                />
                <input
                  type="color"
                  value={form.textColor}
                  onChange={(e) =>
                    setForm({ ...form, textColor: e.target.value })
                  }
                  className="w-12 h-10 rounded cursor-pointer border"
                />
              </div>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography className="text-sm font-medium mb-1">
                Overlay Darkness: {form.overlayOpacity}
              </Typography>
              <Slider
                value={form.overlayOpacity}
                onChange={(_, value) =>
                  setForm({ ...form, overlayOpacity: value as number })
                }
                min={0}
                max={0.9}
                step={0.1}
                valueLabelDisplay="auto"
              />
            </Grid>

            {form.mediaType === "video" && (
              <>
                <Grid size={{ xs: 12 }}>
                  <Typography className="text-sm font-bold mb-2">
                    🎬 Video Settings
                  </Typography>
                </Grid>

                <Grid size={{ xs: 4 }}>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                    <Typography className="text-xs font-medium mb-2">
                      Autoplay
                    </Typography>
                    <Switch
                      checked={form.videoAutoplay}
                      onChange={(e) =>
                        setForm({ ...form, videoAutoplay: e.target.checked })
                      }
                      color="success"
                    />
                  </div>
                </Grid>

                <Grid size={{ xs: 4 }}>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                    <Typography className="text-xs font-medium mb-2">
                      Loop
                    </Typography>
                    <Switch
                      checked={form.videoLoop}
                      onChange={(e) =>
                        setForm({ ...form, videoLoop: e.target.checked })
                      }
                      color="success"
                    />
                  </div>
                </Grid>

                <Grid size={{ xs: 4 }}>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                    <Typography className="text-xs font-medium mb-2">
                      Muted
                    </Typography>
                    <Switch
                      checked={form.videoMuted}
                      onChange={(e) =>
                        setForm({ ...form, videoMuted: e.target.checked })
                      }
                      color="success"
                    />
                  </div>
                </Grid>
              </>
            )}

            <Grid size={{ xs: 12 }}>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Switch
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                  color="success"
                />
                <Typography className="text-sm font-medium">
                  ✅ Active Banners
                </Typography>
              </div>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2, bgcolor: "#f9fafb" }}>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{ textTransform: "none" }}
            disabled={uploading || saving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={saving || uploading}
            startIcon={
              saving || uploading ? (
                <CircularProgress size={16} color="inherit" />
              ) : null
            }
            sx={{
              bgcolor: "#4f46e5",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#4338ca" },
            }}
          >
            {uploading
              ? "☁️ Uploading..."
              : saving
              ? "Saving..."
              : editingBanners
              ? "Update Banners"
              : "Create Banners"}
          </Button>
        </DialogActions>
      </Dialog>

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

export default AdminBannersPage;