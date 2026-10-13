/**
 * Cloudinary URL ko download URL mein convert karta hai
 * fl_attachment flag add karke — direct download hoga
 */
export const getDownloadUrl = (url: string): string => {
  if (!url) return url;
  if (!url.includes("cloudinary.com")) return url;
  if (url.includes("fl_attachment")) return url;

  // /upload/ ke baad fl_attachment inject karo
  return url.replace("/upload/", "/upload/fl_attachment/");
};

/**
 * Force download — seedha download, koi tab nahi khulega
 */
export const forceDownload = (url: string, filename: string) => {
  const downloadUrl = getDownloadUrl(url);

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = filename || "download";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};