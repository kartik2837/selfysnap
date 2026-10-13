// const sharp = require("sharp");
// const axios = require("axios");
// const fs = require("fs");
// const path = require("path");
// const cloudinary = require("cloudinary").v2;
// const Product = require("../models/Product");

// class CustomizeController {
//   /* ═══════════════════════════════════════════════
//      🔥 Generate print-ready file (300 DPI)
//      ═══════════════════════════════════════════════ */
//   async generatePrintFile(req, res) {
//     try {
//       const { productId, imageUrl, designData } = req.body;

//       if (!productId || !imageUrl) {
//         return res.status(400).json({
//           error: "productId and imageUrl are required",
//         });
//       }

//       /* Get product for print specs */
//       const product = await Product.findById(productId).lean();
//       if (!product) {
//         return res.status(404).json({ error: "Product not found" });
//       }

//       if (!product.isCustomizable) {
//         return res.status(400).json({ error: "Product is not customizable" });
//       }

//       const printSize = product.customization?.printSize || {};
//       const widthCm = printSize.widthCm || 20;
//       const heightCm = printSize.heightCm || 25;
//       const dpi = printSize.dpi || 300;

//       /* Convert cm to pixels at target DPI */
//       const printWidthPx = Math.round((widthCm / 2.54) * dpi);
//       const printHeightPx = Math.round((heightCm / 2.54) * dpi);

//       console.log(`🖨️ Print size: ${printWidthPx}×${printHeightPx}px @ ${dpi} DPI`);

//       /* Download user image */
//       let imageBuffer;

//       if (imageUrl.startsWith("http")) {
//         const response = await axios.get(imageUrl, {
//           responseType: "arraybuffer",
//           timeout: 15000,
//         });
//         imageBuffer = Buffer.from(response.data);
//       } else {
//         /* Local file — resolve path */
//         const localPath = path.join(
//           __dirname,
//           "..",
//           imageUrl.replace(/^\/+/, "")
//         );
//         if (!fs.existsSync(localPath)) {
//           return res.status(404).json({ error: "Image file not found" });
//         }
//         imageBuffer = fs.readFileSync(localPath);
//       }

//       /* 🔥 Resize to print size with high quality */
//       const printBuffer = await sharp(imageBuffer)
//         .resize(printWidthPx, printHeightPx, {
//           fit: "contain",
//           background: { r: 0, g: 0, b: 0, alpha: 0 },
//           kernel: "lanczos3",
//         })
//         .png({
//           quality: 100,
//           compressionLevel: 6,
//         })
//         .toBuffer();

//       /* 🔥 Upload to Cloudinary */
//       let printFileUrl;
//       try {
//         const uploadResult = await cloudinary.uploader.upload(
//           `data:image/png;base64,${printBuffer.toString("base64")}`,
//           {
//             folder: "selfysnap/print-files",
//             resource_type: "image",
//             format: "png",
//           }
//         );
//         printFileUrl = uploadResult.secure_url;
//       } catch (cloudErr) {
//         /* Fallback — save locally */
//         const filename = `print-${Date.now()}.png`;
//         const localPath = path.join(
//           __dirname,
//           "..",
//           "uploads",
//           "print",
//           filename
//         );
//         const printDir = path.dirname(localPath);
//         if (!fs.existsSync(printDir)) {
//           fs.mkdirSync(printDir, { recursive: true });
//         }
//         fs.writeFileSync(localPath, printBuffer);
//         printFileUrl = `/uploads/print/${filename}`;
//       }

//       return res.json({
//         success: true,
//         printFile: printFileUrl,
//         printWidth: printWidthPx,
//         printHeight: printHeightPx,
//         dpi,
//       });
//     } catch (error) {
//       console.error("❌ Print file error:", error);
//       res.status(500).json({ error: error.message });
//     }
//   }

//   /* ═══════════════════════════════════════════════
//      🔥 Generate preview (mockup + user image)
//      ═══════════════════════════════════════════════ */
//   async generatePreview(req, res) {
//     try {
//       const { productId, imageUrl, designData } = req.body;

//       const product = await Product.findById(productId).lean();
//       if (!product) return res.status(404).json({ error: "Product not found" });

//       const mockupImage = product.customization?.mockupImage;
//       if (!mockupImage) {
//         return res.status(400).json({ error: "Mockup image not set" });
//       }

//       const printArea = product.customization?.printArea || {};
//       const mockupW = product.customization?.mockupWidth || 500;
//       const mockupH = product.customization?.mockupHeight || 500;

//       /* Load mockup */
//       let mockupBuffer;
//       if (mockupImage.startsWith("http")) {
//         const r = await axios.get(mockupImage, { responseType: "arraybuffer" });
//         mockupBuffer = Buffer.from(r.data);
//       } else {
//         const p = path.join(__dirname, "..", mockupImage.replace(/^\/+/, ""));
//         mockupBuffer = fs.readFileSync(p);
//       }

//       /* Load user image */
//       let userBuffer;
//       if (imageUrl.startsWith("http")) {
//         const r = await axios.get(imageUrl, { responseType: "arraybuffer" });
//         userBuffer = Buffer.from(r.data);
//       } else {
//         const p = path.join(__dirname, "..", imageUrl.replace(/^\/+/, ""));
//         userBuffer = fs.readFileSync(p);
//       }

//       /* Resize user image to fit print area */
//       const areaW = designData?.width || printArea.width || 200;
//       const areaH = designData?.height || printArea.height || 200;

//       const resizedUser = await sharp(userBuffer)
//         .resize(Math.round(areaW), Math.round(areaH), {
//           fit: "contain",
//           background: { r: 0, g: 0, b: 0, alpha: 0 },
//         })
//         .png()
//         .toBuffer();

//       /* Composite on mockup */
//       const compositeBuffer = await sharp(mockupBuffer)
//         .resize(mockupW, mockupH)
//         .composite([
//           {
//             input: resizedUser,
//             top: Math.round(designData?.y || printArea.y || 0),
//             left: Math.round(designData?.x || printArea.x || 0),
//             blend: "over",
//           },
//         ])
//         .png()
//         .toBuffer();

//       /* Upload preview */
//       let previewUrl;
//       try {
//         const result = await cloudinary.uploader.upload(
//           `data:image/png;base64,${compositeBuffer.toString("base64")}`,
//           { folder: "selfysnap/previews", resource_type: "image", format: "png" }
//         );
//         previewUrl = result.secure_url;
//       } catch (e) {
//         const filename = `preview-${Date.now()}.png`;
//         const localPath = path.join(
//           __dirname,
//           "..",
//           "uploads",
//           "previews",
//           filename
//         );
//         const dir = path.dirname(localPath);
//         if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
//         fs.writeFileSync(localPath, compositeBuffer);
//         previewUrl = `/uploads/previews/${filename}`;
//       }

//       return res.json({ success: true, previewImage: previewUrl });
//     } catch (error) {
//       console.error("❌ Preview error:", error);
//       res.status(500).json({ error: error.message });
//     }
//   }

//   /* ═══════════════════════════════════════════════
//      🔥 Batch download print files (ZIP) — Seller
//      ═══════════════════════════════════════════════ */
//   async batchDownloadPrintFiles(req, res) {
//     try {
//       const { orderItemIds } = req.body;

//       if (!Array.isArray(orderItemIds) || orderItemIds.length === 0) {
//         return res.status(400).json({ error: "orderItemIds required" });
//       }

//       const OrderItem = require("../models/OrderItem");

//       const items = await OrderItem.find({
//         _id: { $in: orderItemIds },
//         "customDesign.enabled": true,
//       }).lean();

//       if (items.length === 0) {
//         return res.status(404).json({ error: "No custom items found" });
//       }

//       /* 🔥 Return file URLs — frontend ZIP banayega */
//       const files = items.map((item, idx) => ({
//         orderItemId: item._id,
//         label: `design-${idx + 1}`,
//         printFile: item.customDesign?.printFile,
//         preview: item.customDesign?.previewImage,
//       }));

//       res.json({ success: true, files });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// }

// module.exports = new CustomizeController();




























const sharp = require("sharp");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const Product = require("../models/Product");

/* ═══════════════════════════════════════════════
   🔥 Load image buffer
   ═══════════════════════════════════════════════ */
const loadImageBuffer = async (url) => {
  if (!url) throw new Error("Image URL required");

  if (url.startsWith("http://") || url.startsWith("https://")) {
    const res = await axios.get(url, {
      responseType: "arraybuffer",
      timeout: 15000,
    });
    return Buffer.from(res.data);
  }

  const localPath = path.join(__dirname, "..", url.replace(/^\/+/, ""));
  if (!fs.existsSync(localPath)) {
    throw new Error("Local image not found: " + localPath);
  }
  return fs.readFileSync(localPath);
};

/* ═══════════════════════════════════════════════
   🔥 Upload buffer to Cloudinary
   ═══════════════════════════════════════════════ */
const uploadBuffer = async (buffer, folder) => {
  try {
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${buffer.toString("base64")}`,
      { folder, resource_type: "image", format: "png" }
    );
    return result.secure_url;
  } catch (err) {
    const filename = `${folder.split("/").pop()}-${Date.now()}.png`;
    const localPath = path.join(__dirname, "..", "uploads", folder, filename);
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(localPath, buffer);
    return `/uploads/${folder}/${filename}`;
  }
};

class CustomizeController {
  /* ═══════════════════════════════════════════════
     🔥 SERVER-SIDE COMPOSITE GENERATION
     ═══════════════════════════════════════════════ */
  async generatePreview(req, res) {
    try {
      const { productId, imageUrl, designData } = req.body;

      console.log("\n═══════════════════════════════════════");
      console.log("🎨 [generatePreview] COMPOSITE START");
      console.log("   ProductId:", productId);
      console.log("   ImageUrl:", imageUrl);
      console.log("   DesignData:", JSON.stringify(designData));

      const product = await Product.findById(productId).lean();
      if (!product) return res.status(404).json({ error: "Product not found" });

      const mockupImage = product.customization?.mockupImage;
      if (!mockupImage) {
        return res.status(400).json({ error: "Mockup image not set on product" });
      }

      const printArea = product.customization?.printArea || {};
      const mockupW = product.customization?.mockupWidth || 800;
      const mockupH = product.customization?.mockupHeight || 800;

      console.log("   Mockup size:", mockupW, "x", mockupH);
      console.log("   PrintArea:", JSON.stringify(printArea));

      /* 🔥 Load both images */
      const mockupBuffer = await loadImageBuffer(mockupImage);
      const userBuffer = await loadImageBuffer(imageUrl);

      /* 🔥 Design coords (from frontend) */
      const designX = Number(designData?.x) || printArea.x || 0;
      const designY = Number(designData?.y) || printArea.y || 0;
      const designW = Number(designData?.width) || printArea.width || 200;
      const designH = Number(designData?.height) || printArea.height || 200;
      const scaleX = Number(designData?.scaleX) || 1;
      const scaleY = Number(designData?.scaleY) || 1;
      const rotation = Number(designData?.rotation) || 0;

      console.log("   Design coords:", {
        x: designX, y: designY, w: designW, h: designH,
        scaleX, scaleY, rotation,
      });

      /* 🔥 Resize user image */
      const finalW = Math.max(10, Math.round(designW * scaleX));
      const finalH = Math.max(10, Math.round(designH * scaleY));

      let userResized = await sharp(userBuffer)
        .resize(finalW, finalH, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toBuffer();

      /* 🔥 Rotate if needed */
      if (rotation !== 0) {
        userResized = await sharp(userResized)
          .rotate(rotation, {
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .png()
          .toBuffer();
      }

      const userMeta = await sharp(userResized).metadata();
      const actualW = userMeta.width || finalW;
      const actualH = userMeta.height || finalH;

      /* 🔥 Calculate centered position */
      const centerX = designX + finalW / 2;
      const centerY = designY + finalH / 2;

      let top = Math.round(centerY - actualH / 2);
      let left = Math.round(centerX - actualW / 2);

      top = Math.max(0, Math.min(top, mockupH - actualH));
      left = Math.max(0, Math.min(left, mockupW - actualW));

      console.log("   Final position:", { top, left, actualW, actualH });

      /* 🔥 COMPOSITE — Mockup + User design */
      const compositeBuffer = await sharp(mockupBuffer)
        .resize(mockupW, mockupH, { fit: "cover" })
        .composite([
          {
            input: userResized,
            top,
            left,
            blend: "over",
          },
        ])
        .png()
        .toBuffer();

      /* 🔥 Upload composite */
      const compositeUrl = await uploadBuffer(compositeBuffer, "composite");

      console.log("✅ COMPOSITE CREATED:", compositeUrl);
      console.log("═══════════════════════════════════════\n");

      return res.json({
        success: true,
        compositeImage: compositeUrl,
        previewImage: compositeUrl,
        debug: { top, left, actualW, actualH, mockupW, mockupH },
      });
    } catch (error) {
      console.error("❌ Composite error:", error);
      res.status(500).json({ error: error.message });
    }
  }

  /* ═══════════════════════════════════════════════
     🔥 PRINT FILE — 300 DPI
     ═══════════════════════════════════════════════ */
  async generatePrintFile(req, res) {
    try {
      const { productId, imageUrl, designData } = req.body;

      const product = await Product.findById(productId).lean();
      if (!product) return res.status(404).json({ error: "Product not found" });

      const printSize = product.customization?.printSize || {};
      const widthCm = printSize.widthCm || 20;
      const heightCm = printSize.heightCm || 25;
      const dpi = printSize.dpi || 300;

      const printWidthPx = Math.round((widthCm / 2.54) * dpi);
      const printHeightPx = Math.round((heightCm / 2.54) * dpi);

      const imageBuffer = await loadImageBuffer(imageUrl);

      const printBuffer = await sharp(imageBuffer)
        .resize(printWidthPx, printHeightPx, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
          kernel: "lanczos3",
        })
        .png({ quality: 100, compressionLevel: 6 })
        .toBuffer();

      const printUrl = await uploadBuffer(printBuffer, "print-files");

      return res.json({
        success: true,
        printFile: printUrl,
        printWidth: printWidthPx,
        printHeight: printHeightPx,
        dpi,
      });
    } catch (error) {
      console.error("❌ Print file error:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async batchDownloadPrintFiles(req, res) {
    try {
      const { orderItemIds } = req.body;
      const OrderItem = require("../models/OrderItem");
      const items = await OrderItem.find({
        _id: { $in: orderItemIds },
        "customDesign.enabled": true,
      }).lean();

      const files = items.map((item, idx) => ({
        orderItemId: item._id,
        label: `design-${idx + 1}`,
        printFile: item.customDesign?.printFile,
        preview: item.customDesign?.previewImage,
      }));

      res.json({ success: true, files });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CustomizeController();