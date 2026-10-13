// export const uploadToCloudinary = async (pics:any) => {

//     const cloud_name="dxoqwusir"
    
//     if (pics) {
      
//       const data = new FormData();
//       data.append("file", pics);
//       data.append("upload_preset", "ml_default");
//       data.append("cloud_name", cloud_name);
  
//       const res = await 
//       fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
//         method: "post",
//         body: data,
//       })
        
//         const fileData=await res.json();
//         console.log("url : ", fileData);
//         return fileData.url
  
//     } else {
//       console.log("error");
//     }
//   };









// src/util/uploadToCloudinary.ts

/**
 * Upload a file to Cloudinary (supports image, video, audio)
 * @param file - The file to upload
 * @param resourceType - 'image' | 'video' | 'audio' (default: 'image')
 * @param cloudName - Optional, defaults to your cloud name
 * @param uploadPreset - Optional, defaults to 'ml_default'
 * @returns Promise<string> - The Cloudinary URL
 */
export const uploadToCloudinary = async (
  file: File,
  resourceType: "image" | "video" | "audio" = "image",
  cloudName: string = "dxoqwusir",
  uploadPreset: string = "ml_default"
): Promise<string> => {
  if (!file) {
    throw new Error("No file provided");
  }

  // Cloudinary endpoints for different resource types
  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("cloud_name", cloudName);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Upload failed");
    }

    const data = await response.json();
    console.log("Upload success:", data.secure_url || data.url);
    return data.secure_url || data.url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload file");
  }
};