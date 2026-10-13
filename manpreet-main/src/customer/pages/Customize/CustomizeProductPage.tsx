// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { CircularProgress, Button } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Rotate90DegreesCcwIcon from "@mui/icons-material/Rotate90DegreesCcw";
// import ZoomInIcon from "@mui/icons-material/ZoomIn";
// import ZoomOutIcon from "@mui/icons-material/ZoomOut";
// import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
// import BrushIcon from "@mui/icons-material/Brush";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import FlashOnIcon from "@mui/icons-material/FlashOn";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import PanToolIcon from "@mui/icons-material/PanTool";
// import GestureIcon from "@mui/icons-material/Gesture";

// import { api } from "../../../Config/Api";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { uploadToCloudinary } from "../../../util/uploadToCloudnary";

// interface Product {
//   _id: string;
//   title: string;
//   description: string;
//   sellingPrice: number;
//   mrpPrice: number;
//   discountPercent: number;
//   images: string[];
//   sizes: string;
//   quantity: number;
//   seller: any;
//   category: any;
//   brand: any;
//   isCustomizable: boolean;
//   customizationExtraCharge: number;
//   customization: {
//     enabled: boolean;
//     mockupImage: string;
//     mockupWidth: number;
//     mockupHeight: number;
//     printArea: { x: number; y: number; width: number; height: number };
//     printSize: { widthCm: number; heightCm: number; dpi: number };
//     instructions?: string;
//     templateType: string;
//   };
// }

// interface DesignData {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   scaleX: number;
//   scaleY: number;
//   rotation: number;
//   aspectRatio?: number;
// }

// const DEFAULT_DESIGN: DesignData = {
//   x: 100, y: 100, width: 200, height: 200,
//   scaleX: 1, scaleY: 1, rotation: 0,
// };

// const CustomizeProductPage: React.FC = () => {
//   const { productId } = useParams<{ productId: string }>();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { user } = useAppSelector((store: any) => store);

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [selectedSize, setSelectedSize] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [addingToCart, setAddingToCart] = useState(false);
//   const [buyingNow, setBuyingNow] = useState(false);
//   const [dragging, setDragging] = useState(false);
//   const [resizing, setResizing] = useState<string | null>(null);
//   const [dragStart, setDragStart] = useState({
//     x: 0, y: 0, startX: 0, startY: 0, startW: 0, startH: 0,
//   });

//   const [userImage, setUserImage] = useState<string | null>(() => {
//     try {
//       const saved = localStorage.getItem(`customDesign_${productId}`);
//       if (saved) return JSON.parse(saved).image || null;
//     } catch (e) {}
//     return null;
//   });

//   const [design, setDesign] = useState<DesignData>(() => {
//     try {
//       const saved = localStorage.getItem(`customDesign_${productId}`);
//       if (saved) return JSON.parse(saved).design || DEFAULT_DESIGN;
//     } catch (e) {}
//     return DEFAULT_DESIGN;
//   });

//   const containerRef = useRef<HTMLDivElement>(null);
//   const displayWidth = 500;
//   const scaleX = product?.customization?.mockupWidth
//     ? displayWidth / product.customization.mockupWidth : 1;
//   const displayHeight = product?.customization?.mockupHeight
//     ? Math.round(product.customization.mockupHeight * scaleX) : 500;

//   const saveDesignToStorage = (newDesign: DesignData, imgUrl?: string) => {
//     const imageToSave = imgUrl || userImage;
//     if (!imageToSave) return;
//     try {
//       localStorage.setItem(
//         `customDesign_${productId}`,
//         JSON.stringify({
//           image: imageToSave,
//           design: newDesign,
//           timestamp: Date.now(),
//         })
//       );
//     } catch (e) {}
//   };

//   useEffect(() => {
//     if (productId) fetchProduct();
//   }, [productId]);

//   const fetchProduct = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get(`/products/${productId}`);
//       if (!data.isCustomizable) {
//         setError("This product is not customizable");
//         return;
//       }
//       setProduct(data);
//       const saved = localStorage.getItem(`customDesign_${productId}`);
//       if (!saved) {
//         const pa = data.customization?.printArea || {};
//         setDesign({
//           x: pa.x || 100, y: pa.y || 100,
//           width: pa.width || 200, height: pa.height || 200,
//           scaleX: 1, scaleY: 1, rotation: 0,
//         });
//       }
//       if (data.sizes) {
//         const sizes = typeof data.sizes === "string"
//           ? data.sizes.split(",").map((s: string) => s.trim())
//           : data.sizes;
//         if (sizes.length > 0) setSelectedSize(sizes[0]);
//         else setSelectedSize("FREE");
//       } else setSelectedSize("FREE");
//     } catch (err: any) {
//       setError("Product not found");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateAutoFit = (imgWidth: number, imgHeight: number): DesignData => {
//     const pa = product?.customization?.printArea || { x: 0, y: 0, width: 300, height: 300 };
//     const printW = pa.width || 300;
//     const printH = pa.height || 300;
//     const printX = pa.x || 0;
//     const printY = pa.y || 0;
//     const imgRatio = imgWidth / imgHeight;
//     const printRatio = printW / printH;
//     let newWidth, newHeight;
//     if (imgRatio > printRatio) {
//       newWidth = printW;
//       newHeight = printW / imgRatio;
//     } else {
//       newHeight = printH;
//       newWidth = printH * imgRatio;
//     }
//     return {
//       x: Math.round(printX + (printW - newWidth) / 2),
//       y: Math.round(printY + (printH - newHeight) / 2),
//       width: Math.round(newWidth),
//       height: Math.round(newHeight),
//       scaleX: 1, scaleY: 1, rotation: 0, aspectRatio: imgRatio,
//     };
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
//     if (!allowed.includes(file.type)) return alert("Please upload a JPG, PNG, or WEBP image");
//     if (file.size > 10 * 1024 * 1024) return alert("File size should be less than 10MB");

//     setUploading(true);
//     try {
//       const localUrl = URL.createObjectURL(file);
//       setUserImage(localUrl);
//       const img = new window.Image();
//       img.onload = () => {
//         const fittedDesign = calculateAutoFit(img.width, img.height);
//         setDesign(fittedDesign);
//         saveDesignToStorage(fittedDesign, localUrl);
//       };
//       img.src = localUrl;
//       const cloudUrl = await uploadToCloudinary(file);
//       setUserImage(cloudUrl);
//       saveDesignToStorage(design, cloudUrl);
//       URL.revokeObjectURL(localUrl);
//     } catch (err: any) {
//       alert("Upload failed: " + err.message);
//       setUserImage(null);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleBoxMouseDown = (e: React.MouseEvent) => {
//     e.preventDefault(); e.stopPropagation();
//     setDragging(true);
//     setDragStart({
//       x: e.clientX - design.x * scaleX,
//       y: e.clientY - design.y * scaleX,
//       startX: design.x, startY: design.y,
//       startW: design.width, startH: design.height,
//     });
//   };

//   const handleCornerMouseDown = (e: React.MouseEvent, corner: string) => {
//     e.preventDefault(); e.stopPropagation();
//     setResizing(corner);
//     setDragStart({
//       x: e.clientX, y: e.clientY,
//       startX: design.x, startY: design.y,
//       startW: design.width, startH: design.height,
//     });
//   };

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!product) return;
//       const pa = product.customization?.printArea || {};
//       if (dragging) {
//         const newX = (e.clientX - dragStart.x) / scaleX;
//         const newY = (e.clientY - dragStart.y) / scaleX;
//         setDesign((prev) => ({
//           ...prev,
//           x: Math.max(pa.x || 0, Math.min((pa.x || 0) + (pa.width || 300) - prev.width * prev.scaleX, Math.round(newX))),
//           y: Math.max(pa.y || 0, Math.min((pa.y || 0) + (pa.height || 300) - prev.height * prev.scaleY, Math.round(newY))),
//         }));
//       } else if (resizing) {
//         const dx = (e.clientX - dragStart.x) / scaleX;
//         const aspectRatio = dragStart.startW / dragStart.startH;
//         let newW = dragStart.startW, newH = dragStart.startH;
//         let newX = dragStart.startX, newY = dragStart.startY;
//         if (resizing.includes("w")) newW = Math.max(50, dragStart.startW - dx);
//         else newW = Math.max(50, dragStart.startW + dx);
//         newH = newW / aspectRatio;
//         if (resizing.includes("n")) newY = dragStart.startY + (dragStart.startH - newH);
//         if (resizing.includes("w")) newX = dragStart.startX + (dragStart.startW - newW);
//         setDesign((prev) => ({ ...prev, x: Math.round(newX), y: Math.round(newY), width: Math.round(newW), height: Math.round(newH) }));
//       }
//     };
//     const handleMouseUp = () => {
//       setDragging(false);
//       setResizing(null);
//       setTimeout(() => saveDesignToStorage(design), 100);
//     };
//     if (dragging || resizing) {
//       document.addEventListener("mousemove", handleMouseMove);
//       document.addEventListener("mouseup", handleMouseUp);
//     }
//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [dragging, resizing, dragStart, design, scaleX, product]);

//   const handleZoomIn = () => setDesign((prev) => {
//     const next = { ...prev, scaleX: Math.min(3, prev.scaleX + 0.1), scaleY: Math.min(3, prev.scaleY + 0.1) };
//     saveDesignToStorage(next);
//     return next;
//   });

//   const handleZoomOut = () => setDesign((prev) => {
//     const next = { ...prev, scaleX: Math.max(0.3, prev.scaleX - 0.1), scaleY: Math.max(0.3, prev.scaleY - 0.1) };
//     saveDesignToStorage(next);
//     return next;
//   });

//   const handleRotate = () => setDesign((prev) => {
//     const next = { ...prev, rotation: (prev.rotation + 90) % 360 };
//     saveDesignToStorage(next);
//     return next;
//   });

//   const handleRemove = () => {
//     setUserImage(null);
//     localStorage.removeItem(`customDesign_${productId}`);
//     const pa = product?.customization?.printArea || {};
//     setDesign({
//       x: pa.x || 100, y: pa.y || 100,
//       width: pa.width || 200, height: pa.height || 200,
//       scaleX: 1, scaleY: 1, rotation: 0,
//     });
//   };

//   const handleAutoFit = () => {
//     if (!userImage) return;
//     const img = new window.Image();
//     img.onload = () => {
//       const fitted = calculateAutoFit(img.width, img.height);
//       setDesign(fitted);
//       saveDesignToStorage(fitted);
//     };
//     img.src = userImage;
//   };

//   /* ═══════════════════════════════════════════════
//      🔥 PREPARE CUSTOM DESIGN — Backend composite
//      ═══════════════════════════════════════════════ */
//   const prepareCustomDesign = async () => {
//     console.log("🎨 Generating composite from backend...");

//     let compositeImage = userImage;
//     try {
//       const { data } = await api.post("/api/customize/preview", {
//         productId,
//         imageUrl: userImage,
//         designData: design,
//       });
//       console.log("📦 Composite response:", data);
//       compositeImage = data.compositeImage || data.previewImage || userImage;
//       console.log("✅ Composite URL:", compositeImage);
//     } catch (err: any) {
//       console.warn("❌ Composite failed:", err.message);
//     }

//     console.log("🖨️ Generating print file...");
//     const { data: printData } = await api.post("/api/customize/print-file", {
//       productId,
//       imageUrl: userImage,
//       designData: design,
//     });

//     return {
//       originalImage: userImage,
//       previewImage: compositeImage,
//       compositeImage: compositeImage,
//       printFile: printData.printFile,
//       designData: design,
//       extraCharge: product?.customizationExtraCharge || 0,
//     };
//   };

//   /* ═══════════════════════════════════════════════
//      🔥 ADD TO CART
//      ═══════════════════════════════════════════════ */
//   const handleAddToCart = async (): Promise<boolean> => {
//     if (!user?.user) {
//       alert("Please login first");
//       navigate("/login");
//       return false;
//     }
//     if (!userImage) {
//       alert("Please upload your design first");
//       return false;
//     }
//     try {
//       setAddingToCart(true);
//       const customDesign = await prepareCustomDesign();

//       console.log("📤 Sending to backend:", {
//         productId,
//         size: selectedSize,
//         quantity,
//         customDesign,
//       });

//       await api.put("/api/cart/add", {
//         productId,
//         size: selectedSize || "FREE",
//         quantity,
//         customDesign,
//       });

//       return true;
//     } catch (err: any) {
//       console.error("❌ Add to cart error:", err);
//       alert("Failed to add to cart: " + (err.response?.data?.error || err.message));
//       return false;
//     } finally {
//       setAddingToCart(false);
//     }
//   };

//   const handleAddToCartClick = async () => {
//     const success = await handleAddToCart();
//     if (success) {
//       alert("✅ Your custom design has been added to cart!");
//       localStorage.removeItem(`customDesign_${productId}`);
//       navigate("/cart");
//     }
//   };

//   const handleBuyNow = async () => {
//     if (!userImage) {
//       alert("Please upload your design first");
//       return;
//     }
//     try {
//       setBuyingNow(true);
//       const success = await handleAddToCart();
//       if (success) {
//         localStorage.removeItem(`customDesign_${productId}`);
//         navigate("/cart");
//       }
//     } finally {
//       setBuyingNow(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col justify-center items-center py-20 min-h-[60vh] bg-white">
//         <CircularProgress sx={{ color: "#f97316" }} size={50} />
//         <p className="mt-4 text-gray-600 font-semibold">Loading product...</p>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="max-w-2xl mx-auto px-4 py-20 text-center">
//         <h1 className="text-5xl font-bold text-red-500 mb-4">Oops!</h1>
//         <p className="text-gray-700 text-lg mb-6">{error || "Product not found"}</p>
//         <Link to="/" className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-bold">
//           <ArrowBackIcon /> Back to Home
//         </Link>
//       </div>
//     );
//   }

//   const totalPrice = (product.sellingPrice + (product.customizationExtraCharge || 0)) * quantity;

//   return (
//     <div className="min-h-screen bg-white">
//       {/* HEADER */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
//           <Link
//             to={`/product-details/${product.category?.categoryId}/${product.title}/${product._id}`}
//             className="inline-flex items-center gap-2 text-gray-700 hover:text-orange-600 font-semibold"
//           >
//             <ArrowBackIcon sx={{ fontSize: 20 }} />
//             <span className="hidden sm:inline">Back</span>
//           </Link>
//           <div className="flex items-center gap-2 text-orange-600 font-bold">
//             <BrushIcon sx={{ fontSize: 20 }} />
//             <span className="text-sm">Customize</span>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
//         <div className="mb-6">
//           <h1 className="text-xl md:text-2xl font-bold text-gray-900">{product.title}</h1>
//           <p className="text-sm text-gray-600 mt-1">
//             Upload your image — it will be automatically placed on the product
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* LEFT: PREVIEW */}
//           <div>
//             <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
//               <div className="flex justify-center">
//                 <div
//                   ref={containerRef}
//                   className="relative select-none overflow-hidden rounded-xl"
//                   style={{
//                     width: displayWidth, height: displayHeight,
//                     maxWidth: "100%",
//                     cursor: dragging ? "grabbing" : "default",
//                     boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//                   }}
//                 >
//                   <img
//                     src={product.customization?.mockupImage}
//                     alt="Product"
//                     className="absolute inset-0 w-full h-full object-cover pointer-events-none"
//                     draggable={false}
//                   />

//                   {userImage && (
//                     <div
//                       onMouseDown={handleBoxMouseDown}
//                       className="absolute"
//                       style={{
//                         left: design.x * scaleX,
//                         top: design.y * scaleX,
//                         width: design.width * scaleX * design.scaleX,
//                         height: design.height * scaleX * design.scaleY,
//                         transform: `rotate(${design.rotation}deg)`,
//                         transformOrigin: "center",
//                         cursor: dragging ? "grabbing" : "move",
//                       }}
//                     >
//                       <img
//                         src={userImage}
//                         alt="Your Design"
//                         className="w-full h-full pointer-events-none"
//                         style={{ objectFit: "contain", display: "block" }}
//                         draggable={false}
//                       />
//                       <div
//                         className="absolute inset-0 pointer-events-none"
//                         style={{
//                           border: dragging ? "2px dashed #f97316" : "2px dashed transparent",
//                           borderRadius: "4px",
//                         }}
//                       />
//                       {["nw", "ne", "sw", "se"].map((corner) => (
//                         <div
//                           key={corner}
//                           onMouseDown={(e) => handleCornerMouseDown(e, corner)}
//                           className="absolute w-3 h-3 bg-white border-2 border-orange-500 rounded-full shadow-md hover:scale-125 transition-transform"
//                           style={{
//                             left: corner.includes("w") ? -7 : undefined,
//                             right: corner.includes("e") ? -7 : undefined,
//                             top: corner.includes("n") ? -7 : undefined,
//                             bottom: corner.includes("s") ? -7 : undefined,
//                             cursor: corner === "nw" || corner === "se" ? "nwse-resize" : "nesw-resize",
//                             zIndex: 10,
//                           }}
//                         />
//                       ))}
//                     </div>
//                   )}

//                   {!userImage && (
//                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                       <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-gray-200">
//                         <CloudUploadIcon sx={{ fontSize: 40, color: "#f97316", mb: 1 }} />
//                         <p className="font-bold text-sm text-gray-800">Upload your image</p>
//                         <p className="text-xs text-gray-500 mt-0.5">It will appear here automatically</p>
//                       </div>
//                     </div>
//                   )}

//                   {userImage && (
//                     <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
//                       <CheckCircleIcon sx={{ fontSize: 12 }} />
//                       Auto-Fitted
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <input
//                   type="file"
//                   id="design-upload"
//                   accept="image/jpeg,image/jpg,image/png,image/webp"
//                   onChange={handleImageUpload}
//                   style={{ display: "none" }}
//                 />
//                 <label
//                   htmlFor="design-upload"
//                   className={`block w-full rounded-xl p-4 text-center cursor-pointer transition-all ${
//                     userImage
//                       ? "border-2 border-orange-300 hover:bg-orange-50"
//                       : "border-2 border-dashed border-orange-400 bg-orange-50 hover:bg-orange-100"
//                   }`}
//                 >
//                   {uploading ? (
//                     <div className="flex items-center justify-center gap-2">
//                       <CircularProgress size={20} sx={{ color: "#f97316" }} />
//                       <span className="text-sm font-bold text-orange-600">Uploading...</span>
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-center gap-2">
//                       <CloudUploadIcon sx={{ fontSize: 22, color: "#f97316" }} />
//                       <span className="text-sm font-bold text-orange-600">
//                         {userImage ? "Change Image" : "Upload Your Image"}
//                       </span>
//                     </div>
//                   )}
//                 </label>
//               </div>

//               {userImage && (
//                 <>
//                   <div className="mt-3 flex flex-wrap gap-2 justify-center">
//                     <button onClick={handleAutoFit} className="flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-orange-400 text-orange-600 rounded-full font-bold text-xs hover:bg-orange-50">
//                       <CenterFocusStrongIcon sx={{ fontSize: 16 }} /> Auto Fit
//                     </button>
//                     <button onClick={handleRotate} className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full font-semibold text-xs hover:bg-gray-50">
//                       <Rotate90DegreesCcwIcon sx={{ fontSize: 16 }} /> Rotate
//                     </button>
//                     <button onClick={handleZoomIn} className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50">
//                       <ZoomInIcon sx={{ fontSize: 18 }} />
//                     </button>
//                     <button onClick={handleZoomOut} className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50">
//                       <ZoomOutIcon sx={{ fontSize: 18 }} />
//                     </button>
//                     <button onClick={handleRemove} className="w-9 h-9 flex items-center justify-center bg-white border border-red-300 text-red-600 rounded-full hover:bg-red-50">
//                       <DeleteIcon sx={{ fontSize: 18 }} />
//                     </button>
//                   </div>
//                   <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500">
//                     <div className="flex items-center gap-1"><PanToolIcon sx={{ fontSize: 14 }} /><span>Drag to move</span></div>
//                     <div className="flex items-center gap-1"><GestureIcon sx={{ fontSize: 14 }} /><span>Resize from corners</span></div>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* RIGHT: INFO */}
//           <div className="space-y-5">
//             <div>
//               <p className="text-sm font-bold text-orange-600">{product.seller?.businessDetails?.businessName}</p>
//               <h2 className="text-xl font-bold text-gray-900 mt-1">{product.title}</h2>
//               <p className="text-sm text-gray-600 mt-2 leading-relaxed">{product.description}</p>
//             </div>

//             <div className="flex items-center gap-3">
//               <span className="text-3xl font-bold text-gray-900">₹{product.sellingPrice}</span>
//               <span className="text-lg line-through text-gray-400">₹{product.mrpPrice}</span>
//               <span className="text-orange-600 font-bold">{product.discountPercent}% off</span>
//             </div>

//             {product.customizationExtraCharge > 0 && (
//               <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-start gap-2">
//                 <InfoOutlinedIcon sx={{ fontSize: 18, color: "#f97316", mt: 0.3 }} />
//                 <div>
//                   <p className="text-sm font-bold text-orange-700">Customization charge: +₹{product.customizationExtraCharge}</p>
//                   <p className="text-xs text-orange-600 mt-0.5">Per piece for adding your custom design</p>
//                 </div>
//               </div>
//             )}

//             <div>
//               <p className="text-sm font-bold text-gray-800 mb-2">Select Size</p>
//               <div className="flex flex-wrap gap-2">
//                 {(() => {
//                   const sizes = product.sizes;
//                   const arr = typeof sizes === "string" ? sizes.split(",").map((s: string) => s.trim()) : Array.isArray(sizes) ? sizes : ["FREE"];
//                   return arr.map((size: string) => (
//                     <button key={size} onClick={() => setSelectedSize(size)}
//                       className={`min-w-[48px] h-10 px-3 rounded-lg font-bold text-sm border-2 transition-all ${
//                         selectedSize === size ? "bg-orange-500 text-white border-orange-500 shadow-md" : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"
//                       }`}>
//                       {size}
//                     </button>
//                   ));
//                 })()}
//               </div>
//             </div>

//             <div>
//               <p className="text-sm font-bold text-gray-800 mb-2">Quantity</p>
//               <div className="flex items-center gap-3">
//                 <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-orange-400 font-bold text-lg">−</button>
//                 <span className="w-16 text-center font-bold text-lg">{quantity}</span>
//                 <button onClick={() => setQuantity(Math.min(product.quantity || 10, quantity + 1))} className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-orange-400 font-bold text-lg">+</button>
//                 <span className="text-sm text-gray-500 ml-2">{product.quantity} available</span>
//               </div>
//             </div>

//             <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-sm font-bold text-gray-700">Total Price</p>
//                   <p className="text-xs text-gray-500 mt-0.5">{quantity} × ₹{product.sellingPrice + product.customizationExtraCharge}</p>
//                 </div>
//                 <p className="text-3xl font-black text-orange-600">₹{totalPrice}</p>
//               </div>
//             </div>

//             {!userImage && (
//               <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 flex items-start gap-2">
//                 <InfoOutlinedIcon sx={{ fontSize: 18, color: "#eab308", mt: 0.3 }} />
//                 <p className="text-sm font-semibold text-yellow-800">Please upload your image first to add to cart</p>
//               </div>
//             )}

//             <div className="flex flex-col sm:flex-row gap-3 pt-2">
//               <Button onClick={handleAddToCartClick} disabled={!userImage || addingToCart || buyingNow} variant="contained" fullWidth
//                 sx={{ py: 1.5, fontWeight: "bold", textTransform: "none", borderRadius: "10px", bgcolor: "#f97316",
//                   "&:hover": { bgcolor: "#ea580c" }, "&:disabled": { bgcolor: "#e5e7eb", color: "#9ca3af" } }}
//                 startIcon={addingToCart ? <CircularProgress size={18} sx={{ color: "white" }} /> : <ShoppingCartIcon />}>
//                 {addingToCart ? "Adding..." : "Add to Cart"}
//               </Button>
//               <Button onClick={handleBuyNow} disabled={!userImage || addingToCart || buyingNow} variant="contained" fullWidth
//                 sx={{ py: 1.5, fontWeight: "bold", textTransform: "none", borderRadius: "10px", bgcolor: "#fb641b",
//                   "&:hover": { bgcolor: "#e35000" }, "&:disabled": { bgcolor: "#e5e7eb", color: "#9ca3af" } }}
//                 startIcon={buyingNow ? <CircularProgress size={18} sx={{ color: "white" }} /> : <FlashOnIcon />}>
//                 {buyingNow ? "Processing..." : "Buy Now"}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomizeProductPage;



















import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CircularProgress, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import Rotate90DegreesCcwIcon from "@mui/icons-material/Rotate90DegreesCcw";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import BrushIcon from "@mui/icons-material/Brush";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PanToolIcon from "@mui/icons-material/PanTool";
import GestureIcon from "@mui/icons-material/Gesture";

import { api } from "../../../Config/Api";
import { useAppSelector } from "../../../Redux Toolkit/Store";
import { uploadToCloudinary } from "../../../util/uploadToCloudnary";

interface Product {
  _id: string;
  title: string;
  description: string;
  sellingPrice: number;
  mrpPrice: number;
  discountPercent: number;
  images: string[];
  sizes: string | string[];
  quantity: number;
  seller: any;
  category: any;
  brand: any;
  isCustomizable: boolean;
  customizationExtraCharge: number;
  customization: {
    enabled: boolean;
    mockupImage: string;
    mockupWidth: number;
    mockupHeight: number;
    printArea: { x: number; y: number; width: number; height: number };
    printSize: { widthCm: number; heightCm: number; dpi: number };
    instructions?: string;
    templateType: string;
  };
}

interface DesignData {
  x: number;
  y: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  aspectRatio?: number;
}

interface PrintArea {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const DEFAULT_DESIGN: DesignData = {
  x: 100,
  y: 100,
  width: 200,
  height: 200,
  scaleX: 1,
  scaleY: 1,
  rotation: 0,
};

const CustomizeProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { user } = useAppSelector((store: any) => store);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState<string | null>(null);

  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
    startW: 0,
    startH: 0,
  });

  const [userImage, setUserImage] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem(`customDesign_${productId}`);
      if (saved) return JSON.parse(saved).image || null;
    } catch {
      // ignore
    }
    return null;
  });

  const [design, setDesign] = useState<DesignData>(() => {
    try {
      const saved = localStorage.getItem(`customDesign_${productId}`);
      if (saved) return JSON.parse(saved).design || DEFAULT_DESIGN;
    } catch {
      // ignore
    }
    return DEFAULT_DESIGN;
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const displayWidth = 500;
  const scaleX = product?.customization?.mockupWidth
    ? displayWidth / product.customization.mockupWidth
    : 1;
  const displayHeight = product?.customization?.mockupHeight
    ? Math.round(product.customization.mockupHeight * scaleX)
    : 500;

  const saveDesignToStorage = (newDesign: DesignData, imgUrl?: string) => {
    const imageToSave = imgUrl || userImage;
    if (!imageToSave) return;
    try {
      localStorage.setItem(
        `customDesign_${productId}`,
        JSON.stringify({
          image: imageToSave,
          design: newDesign,
          timestamp: Date.now(),
        })
      );
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (productId) fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/products/${productId}`);
      if (!data.isCustomizable) {
        setError("This product is not customizable");
        return;
      }
      setProduct(data);
      const saved = localStorage.getItem(`customDesign_${productId}`);
      if (!saved) {
        const pa: PrintArea = data.customization?.printArea || {};
        setDesign({
          x: pa.x || 100,
          y: pa.y || 100,
          width: pa.width || 200,
          height: pa.height || 200,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
        });
      }
      if (data.sizes) {
        const sizes =
          typeof data.sizes === "string"
            ? data.sizes.split(",").map((s: string) => s.trim())
            : data.sizes;
        if (sizes.length > 0) setSelectedSize(sizes[0]);
        else setSelectedSize("FREE");
      } else {
        setSelectedSize("FREE");
      }
    } catch {
      setError("Product not found");
    } finally {
      setLoading(false);
    }
  };

  const calculateAutoFit = (
    imgWidth: number,
    imgHeight: number
  ): DesignData => {
    const pa: PrintArea = product?.customization?.printArea || {};
    const printW = pa.width || 300;
    const printH = pa.height || 300;
    const printX = pa.x || 0;
    const printY = pa.y || 0;

    const imgRatio = imgWidth / imgHeight;
    const printRatio = printW / printH;

    let newWidth: number;
    let newHeight: number;

    if (imgRatio > printRatio) {
      newWidth = printW;
      newHeight = printW / imgRatio;
    } else {
      newHeight = printH;
      newWidth = printH * imgRatio;
    }

    return {
      x: Math.round(printX + (printW - newWidth) / 2),
      y: Math.round(printY + (printH - newHeight) / 2),
      width: Math.round(newWidth),
      height: Math.round(newHeight),
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      aspectRatio: imgRatio,
    };
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      alert("Please upload a JPG, PNG, or WEBP image");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("File size should be less than 10MB");
      return;
    }

    setUploading(true);
    try {
      const localUrl = URL.createObjectURL(file);
      setUserImage(localUrl);

      const img = new window.Image();
      img.onload = () => {
        const fittedDesign = calculateAutoFit(img.width, img.height);
        setDesign(fittedDesign);
        saveDesignToStorage(fittedDesign, localUrl);
      };
      img.src = localUrl;

      const cloudUrl = await uploadToCloudinary(file);
      setUserImage(cloudUrl);
      saveDesignToStorage(design, cloudUrl);
      URL.revokeObjectURL(localUrl);
    } catch (err: any) {
      alert("Upload failed: " + (err?.message || "Unknown error"));
      setUserImage(null);
    } finally {
      setUploading(false);
    }
  };

  const handleBoxMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
    setDragStart({
      x: e.clientX - design.x * scaleX,
      y: e.clientY - design.y * scaleX,
      startX: design.x,
      startY: design.y,
      startW: design.width,
      startH: design.height,
    });
  };

  const handleCornerMouseDown = (e: React.MouseEvent, corner: string) => {
    e.preventDefault();
    e.stopPropagation();
    setResizing(corner);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      startX: design.x,
      startY: design.y,
      startW: design.width,
      startH: design.height,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!product) return;
      const pa: PrintArea = product.customization?.printArea || {};

      if (dragging) {
        const newX = (e.clientX - dragStart.x) / scaleX;
        const newY = (e.clientY - dragStart.y) / scaleX;

        setDesign((prev) => ({
          ...prev,
          x: Math.max(
            pa.x || 0,
            Math.min(
              (pa.x || 0) + (pa.width || 300) - prev.width * prev.scaleX,
              Math.round(newX)
            )
          ),
          y: Math.max(
            pa.y || 0,
            Math.min(
              (pa.y || 0) + (pa.height || 300) - prev.height * prev.scaleY,
              Math.round(newY)
            )
          ),
        }));
      } else if (resizing) {
        const dx = (e.clientX - dragStart.x) / scaleX;
        const aspectRatio = dragStart.startW / dragStart.startH;

        let newW = dragStart.startW;
        let newH = dragStart.startH;
        let newX = dragStart.startX;
        let newY = dragStart.startY;

        if (resizing.includes("w")) {
          newW = Math.max(50, dragStart.startW - dx);
        } else {
          newW = Math.max(50, dragStart.startW + dx);
        }
        newH = newW / aspectRatio;

        if (resizing.includes("n")) {
          newY = dragStart.startY + (dragStart.startH - newH);
        }
        if (resizing.includes("w")) {
          newX = dragStart.startX + (dragStart.startW - newW);
        }

        setDesign((prev) => ({
          ...prev,
          x: Math.round(newX),
          y: Math.round(newY),
          width: Math.round(newW),
          height: Math.round(newH),
        }));
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
      setResizing(null);
      setTimeout(() => saveDesignToStorage(design), 100);
    };

    if (dragging || resizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging, resizing, dragStart, design, scaleX, product]);

  const handleZoomIn = () =>
    setDesign((prev) => {
      const next = {
        ...prev,
        scaleX: Math.min(3, prev.scaleX + 0.1),
        scaleY: Math.min(3, prev.scaleY + 0.1),
      };
      saveDesignToStorage(next);
      return next;
    });

  const handleZoomOut = () =>
    setDesign((prev) => {
      const next = {
        ...prev,
        scaleX: Math.max(0.3, prev.scaleX - 0.1),
        scaleY: Math.max(0.3, prev.scaleY - 0.1),
      };
      saveDesignToStorage(next);
      return next;
    });

  const handleRotate = () =>
    setDesign((prev) => {
      const next = { ...prev, rotation: (prev.rotation + 90) % 360 };
      saveDesignToStorage(next);
      return next;
    });

  const handleRemove = () => {
    setUserImage(null);
    localStorage.removeItem(`customDesign_${productId}`);
    const pa: PrintArea = product?.customization?.printArea || {};
    setDesign({
      x: pa.x || 100,
      y: pa.y || 100,
      width: pa.width || 200,
      height: pa.height || 200,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
    });
  };

  const handleAutoFit = () => {
    if (!userImage) return;
    const img = new window.Image();
    img.onload = () => {
      const fitted = calculateAutoFit(img.width, img.height);
      setDesign(fitted);
      saveDesignToStorage(fitted);
    };
    img.src = userImage;
  };

  /* ═══════════════════════════════════════════════
     🔥 PREPARE CUSTOM DESIGN
     ═══════════════════════════════════════════════ */
  const prepareCustomDesign = async () => {
    let compositeImage = userImage;

    try {
      const { data } = await api.post("/api/customize/preview", {
        productId,
        imageUrl: userImage,
        designData: design,
      });
      compositeImage = data.compositeImage || data.previewImage || userImage;
    } catch (err: any) {
      console.warn("Composite failed:", err?.message);
    }

    let printFile: string | null = null;
    try {
      const { data: printData } = await api.post("/api/customize/print-file", {
        productId,
        imageUrl: userImage,
        designData: design,
      });
      printFile = printData?.printFile || null;
    } catch (err: any) {
      console.warn("Print file failed:", err?.message);
    }

    return {
      originalImage: userImage,
      previewImage: compositeImage,
      compositeImage: compositeImage,
      printFile,
      designData: design,
      extraCharge: product?.customizationExtraCharge || 0,
    };
  };

  /* ═══════════════════════════════════════════════
     🔥 ADD TO CART
     ═══════════════════════════════════════════════ */
  const handleAddToCart = async (): Promise<boolean> => {
    if (!user?.user) {
      alert("Please login first");
      navigate("/login");
      return false;
    }
    if (!userImage) {
      alert("Please upload your design first");
      return false;
    }
    try {
      setAddingToCart(true);
      const customDesign = await prepareCustomDesign();

      await api.put("/api/cart/add", {
        productId,
        size: selectedSize || "FREE",
        quantity,
        customDesign,
      });

      return true;
    } catch (err: any) {
      console.error("Add to cart error:", err);
      alert(
        "Failed to add to cart: " +
          (err?.response?.data?.error || err?.message || "Unknown error")
      );
      return false;
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAddToCartClick = async () => {
    const success = await handleAddToCart();
    if (success) {
      alert("✅ Your custom design has been added to cart!");
      localStorage.removeItem(`customDesign_${productId}`);
      navigate("/cart");
    }
  };

  const handleBuyNow = async () => {
    if (!userImage) {
      alert("Please upload your design first");
      return;
    }
    try {
      setBuyingNow(true);
      const success = await handleAddToCart();
      if (success) {
        localStorage.removeItem(`customDesign_${productId}`);
        navigate("/cart");
      }
    } finally {
      setBuyingNow(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-20 min-h-[60vh] bg-white">
        <CircularProgress sx={{ color: "#f97316" }} size={50} />
        <p className="mt-4 text-gray-600 font-semibold">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-gray-700 text-lg mb-6">
          {error || "Product not found"}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-bold"
        >
          <ArrowBackIcon /> Back to Home
        </Link>
      </div>
    );
  }

  const totalPrice =
    (product.sellingPrice + (product.customizationExtraCharge || 0)) * quantity;

  /* ✅ Size list — string ya array dono handle */
  const sizeList: string[] =
    typeof product.sizes === "string"
      ? product.sizes.split(",").map((s) => s.trim())
      : Array.isArray(product.sizes)
      ? product.sizes
      : ["FREE"];

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link
            to={`/product-details/${product.category?.categoryId}/${product.title}/${product._id}`}
            className="inline-flex items-center gap-2 text-gray-700 hover:text-orange-600 font-semibold"
          >
            <ArrowBackIcon sx={{ fontSize: 20 }} />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="flex items-center gap-2 text-orange-600 font-bold">
            <BrushIcon sx={{ fontSize: 20 }} />
            <span className="text-sm">Customize</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            {product.title}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Upload your image — it will be automatically placed on the product
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: PREVIEW */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
              <div className="flex justify-center">
                <div
                  ref={containerRef}
                  className="relative select-none overflow-hidden rounded-xl"
                  style={{
                    width: displayWidth,
                    height: displayHeight,
                    maxWidth: "100%",
                    cursor: dragging ? "grabbing" : "default",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={product.customization?.mockupImage}
                    alt="Product"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />

                  {userImage && (
                    <div
                      onMouseDown={handleBoxMouseDown}
                      className="absolute"
                      style={{
                        left: design.x * scaleX,
                        top: design.y * scaleX,
                        width: design.width * scaleX * design.scaleX,
                        height: design.height * scaleX * design.scaleY,
                        transform: `rotate(${design.rotation}deg)`,
                        transformOrigin: "center",
                        cursor: dragging ? "grabbing" : "move",
                      }}
                    >
                      <img
                        src={userImage}
                        alt="Your Design"
                        className="w-full h-full pointer-events-none"
                        style={{ objectFit: "contain", display: "block" }}
                        draggable={false}
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          border: dragging
                            ? "2px dashed #f97316"
                            : "2px dashed transparent",
                          borderRadius: "4px",
                        }}
                      />
                      {["nw", "ne", "sw", "se"].map((corner) => (
                        <div
                          key={corner}
                          onMouseDown={(e) => handleCornerMouseDown(e, corner)}
                          className="absolute w-3 h-3 bg-white border-2 border-orange-500 rounded-full shadow-md hover:scale-125 transition-transform"
                          style={{
                            left: corner.includes("w") ? -7 : undefined,
                            right: corner.includes("e") ? -7 : undefined,
                            top: corner.includes("n") ? -7 : undefined,
                            bottom: corner.includes("s") ? -7 : undefined,
                            cursor:
                              corner === "nw" || corner === "se"
                                ? "nwse-resize"
                                : "nesw-resize",
                            zIndex: 10,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {!userImage && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-gray-200">
                        <CloudUploadIcon
                          sx={{ fontSize: 40, color: "#f97316", mb: 1 }}
                        />
                        <p className="font-bold text-sm text-gray-800">
                          Upload your image
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          It will appear here automatically
                        </p>
                      </div>
                    </div>
                  )}

                  {userImage && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <CheckCircleIcon sx={{ fontSize: 12 }} />
                      Auto-Fitted
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <input
                  type="file"
                  id="design-upload"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="design-upload"
                  className={`block w-full rounded-xl p-4 text-center cursor-pointer transition-all ${
                    userImage
                      ? "border-2 border-orange-300 hover:bg-orange-50"
                      : "border-2 border-dashed border-orange-400 bg-orange-50 hover:bg-orange-100"
                  }`}
                >
                  {uploading ? (
                    <div className="flex items-center justify-center gap-2">
                      <CircularProgress size={20} sx={{ color: "#f97316" }} />
                      <span className="text-sm font-bold text-orange-600">
                        Uploading...
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <CloudUploadIcon sx={{ fontSize: 22, color: "#f97316" }} />
                      <span className="text-sm font-bold text-orange-600">
                        {userImage ? "Change Image" : "Upload Your Image"}
                      </span>
                    </div>
                  )}
                </label>
              </div>

              {userImage && (
                <>
                  <div className="mt-3 flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={handleAutoFit}
                      className="flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-orange-400 text-orange-600 rounded-full font-bold text-xs hover:bg-orange-50"
                    >
                      <CenterFocusStrongIcon sx={{ fontSize: 16 }} /> Auto Fit
                    </button>
                    <button
                      onClick={handleRotate}
                      className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full font-semibold text-xs hover:bg-gray-50"
                    >
                      <Rotate90DegreesCcwIcon sx={{ fontSize: 16 }} /> Rotate
                    </button>
                    <button
                      onClick={handleZoomIn}
                      className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50"
                    >
                      <ZoomInIcon sx={{ fontSize: 18 }} />
                    </button>
                    <button
                      onClick={handleZoomOut}
                      className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50"
                    >
                      <ZoomOutIcon sx={{ fontSize: 18 }} />
                    </button>
                    <button
                      onClick={handleRemove}
                      className="w-9 h-9 flex items-center justify-center bg-white border border-red-300 text-red-600 rounded-full hover:bg-red-50"
                    >
                      <DeleteIcon sx={{ fontSize: 18 }} />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <PanToolIcon sx={{ fontSize: 14 }} />
                      <span>Drag to move</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GestureIcon sx={{ fontSize: 14 }} />
                      <span>Resize from corners</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT: INFO */}
          <div className="space-y-5">
            <div>
              <p className="text-sm font-bold text-orange-600">
                {product.seller?.businessDetails?.businessName}
              </p>
              <h2 className="text-xl font-bold text-gray-900 mt-1">
                {product.title}
              </h2>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.sellingPrice}
              </span>
              <span className="text-lg line-through text-gray-400">
                ₹{product.mrpPrice}
              </span>
              <span className="text-orange-600 font-bold">
                {product.discountPercent}% off
              </span>
            </div>

            {product.customizationExtraCharge > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-start gap-2">
                <InfoOutlinedIcon
                  sx={{ fontSize: 18, color: "#f97316", mt: 0.3 }}
                />
                <div>
                  <p className="text-sm font-bold text-orange-700">
                    Customization charge: +₹
                    {product.customizationExtraCharge}
                  </p>
                  <p className="text-xs text-orange-600 mt-0.5">
                    Per piece for adding your custom design
                  </p>
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-bold text-gray-800 mb-2">
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {sizeList.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-10 px-3 rounded-lg font-bold text-sm border-2 transition-all ${
                      selectedSize === size
                        ? "bg-orange-500 text-white border-orange-500 shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-gray-800 mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-orange-400 font-bold text-lg"
                >
                  −
                </button>
                <span className="w-16 text-center font-bold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.quantity || 10, quantity + 1))
                  }
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-orange-400 font-bold text-lg"
                >
                  +
                </button>
                <span className="text-sm text-gray-500 ml-2">
                  {product.quantity} available
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-gray-700">
                    Total Price
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {quantity} × ₹
                    {product.sellingPrice + product.customizationExtraCharge}
                  </p>
                </div>
                <p className="text-3xl font-black text-orange-600">
                  ₹{totalPrice}
                </p>
              </div>
            </div>

            {!userImage && (
              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 flex items-start gap-2">
                <InfoOutlinedIcon
                  sx={{ fontSize: 18, color: "#eab308", mt: 0.3 }}
                />
                <p className="text-sm font-semibold text-yellow-800">
                  Please upload your image first to add to cart
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={handleAddToCartClick}
                disabled={!userImage || addingToCart || buyingNow}
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "10px",
                  bgcolor: "#f97316",
                  "&:hover": { bgcolor: "#ea580c" },
                  "&:disabled": { bgcolor: "#e5e7eb", color: "#9ca3af" },
                }}
                startIcon={
                  addingToCart ? (
                    <CircularProgress size={18} sx={{ color: "white" }} />
                  ) : (
                    <ShoppingCartIcon />
                  )
                }
              >
                {addingToCart ? "Adding..." : "Add to Cart"}
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={!userImage || addingToCart || buyingNow}
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "10px",
                  bgcolor: "#fb641b",
                  "&:hover": { bgcolor: "#e35000" },
                  "&:disabled": { bgcolor: "#e5e7eb", color: "#9ca3af" },
                }}
                startIcon={
                  buyingNow ? (
                    <CircularProgress size={18} sx={{ color: "white" }} />
                  ) : (
                    <FlashOnIcon />
                  )
                }
              >
                {buyingNow ? "Processing..." : "Buy Now"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeProductPage;