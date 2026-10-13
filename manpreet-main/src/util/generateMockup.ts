/* ═══════════════════════════════════════════════
   🔥 GENERATE COMPOSITE IMAGE — Mockup + User Image
   ═══════════════════════════════════════════════ */

interface DesignData {
  x: number;
  y: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
}

interface GenerateMockupParams {
  mockupImageUrl: string;
  userImageUrl: string;
  mockupWidth: number;
  mockupHeight: number;
  design: DesignData;
}

/**
 * 🔥 Generate composite image — Mockup pe user design print
 * Returns: Data URL (base64) of composite image
 */
export const generateMockupImage = async ({
  mockupImageUrl,
  userImageUrl,
  mockupWidth,
  mockupHeight,
  design,
}: GenerateMockupParams): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      /* Create canvas with mockup dimensions */
      const canvas = document.createElement("canvas");
      canvas.width = mockupWidth;
      canvas.height = mockupHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available");

      /* Load both images */
      const mockupImg = new Image();
      mockupImg.crossOrigin = "anonymous";
      const userImg = new Image();
      userImg.crossOrigin = "anonymous";

      let mockupLoaded = false;
      let userLoaded = false;

      const tryGenerate = () => {
        if (!mockupLoaded || !userLoaded) return;

        /* 1. Draw mockup as background */
        ctx.clearRect(0, 0, mockupWidth, mockupHeight);
        ctx.drawImage(mockupImg, 0, 0, mockupWidth, mockupHeight);

        /* 2. Draw user image in print area */
        const designWidth = design.width * design.scaleX;
        const designHeight = design.height * design.scaleY;
        const centerX = design.x + designWidth / 2;
        const centerY = design.y + designHeight / 2;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate((design.rotation * Math.PI) / 180);
        ctx.drawImage(
          userImg,
          -designWidth / 2,
          -designHeight / 2,
          designWidth,
          designHeight
        );
        ctx.restore();

        /* 3. Generate Data URL */
        try {
          const dataUrl = canvas.toDataURL("image/png", 0.9);
          resolve(dataUrl);
        } catch (err) {
          reject(err);
        }
      };

      mockupImg.onload = () => {
        mockupLoaded = true;
        tryGenerate();
      };
      mockupImg.onerror = () => reject(new Error("Mockup image failed to load"));

      userImg.onload = () => {
        userLoaded = true;
        tryGenerate();
      };
      userImg.onerror = () => reject(new Error("User image failed to load"));

      mockupImg.src = mockupImageUrl;
      userImg.src = userImageUrl;
    } catch (err) {
      reject(err);
    }
  });
};

/* ═══════════════════════════════════════════════
   🔥 Upload Data URL to Cloudinary
   ═══════════════════════════════════════════════ */
export const uploadDataUrlToCloudinary = async (
  dataUrl: string,
  cloudName: string = "dxoqwusir",
  uploadPreset: string = "ml_default"
): Promise<string> => {
  try {
    /* Convert data URL to blob */
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], `mockup-${Date.now()}.png`, {
      type: "image/png",
    });

    /* Upload to Cloudinary */
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Upload failed");
    }

    const data = await response.json();
    console.log("✅ Mockup uploaded:", data.secure_url);
    return data.secure_url || data.url;
  } catch (error) {
    console.error("❌ Upload error:", error);
    throw error;
  }
};