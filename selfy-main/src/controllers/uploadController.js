const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

class UploadController {
  /* ═══════════════════════════════════════════════
     🔥 Upload customer custom image
     ═══════════════════════════════════════════════ */
  async uploadCustomImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const filePath = req.file.path;

      /* 🔥 Upload to Cloudinary (if configured) */
      let imageUrl = "";
      let publicId = "";

      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: "selfysnap/custom-designs",
          resource_type: "image",
          transformation: [
            { quality: "auto:best", fetch_format: "auto" },
          ],
        });
        imageUrl = result.secure_url;
        publicId = result.public_id;

        /* Delete local file after upload */
        fs.unlinkSync(filePath);
      } catch (cloudErr) {
        console.warn("⚠️ Cloudinary failed, using local file:", cloudErr.message);
        /* Fallback — local file */
        const filename = path.basename(filePath);
        imageUrl = `/uploads/custom/${filename}`;
      }

      return res.status(200).json({
        success: true,
        url: imageUrl,
        publicId,
        originalName: req.file.originalname,
        size: req.file.size,
      });
    } catch (error) {
      console.error("❌ Upload error:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  /* ═══════════════════════════════════════════════
     🔥 Delete uploaded image
     ═══════════════════════════════════════════════ */
  async deleteCustomImage(req, res) {
    try {
      const { publicId } = req.body;
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UploadController();