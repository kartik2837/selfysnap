// import { useEffect, useRef } from "react";
// import { IconButton } from "@mui/material";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { fetchHomeSections } from "../../../Redux Toolkit/Customer/HomeSectionSlice";

// interface Product {
//   _id: string;
//   title: string;
//   brand?: string;
//   images?: string[];
//   categoryId?: string;
//   mrpPrice?: number;
//   sellingPrice?: number;
//   discountPercent?: number;
//   unitValue?: number;
//   unitType?: string;
//   shippingCharges?: number;
// }

// interface Section {
//   _id: string;
//   title: string;
//   layout: "slider" | "grid";
//   products?: Product[];
// }

// export default function HomePreview() {
//   const dispatch = useAppDispatch();
//   const sections: Section[] = useAppSelector(
//     (state) => state.homepreview.sections ?? []
//   );

//   const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchHomeSections());
//   }, [dispatch]);

//   const scroll = (id: string, dir: "left" | "right") => {
//     const slider = sliderRefs.current[id];
//     if (!slider) return;
//     slider.scrollBy({
//       left: dir === "left" ? -320 : 320,
//       behavior: "smooth",
//     });
//   };

//   const sliderSections = sections.filter((s) => s.layout === "slider");
//   const gridSections = sections.filter((s) => s.layout === "grid");

//   // ✅ Added thin orange border
//   const cardClasses =
//     "flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px] bg-white rounded-2xl border-2 border-orange-400 overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer";

//   const ProductCard = ({ item }: { item: Product }) => (
//     <div
//       key={item._id}
//       className={cardClasses}
//       onClick={() =>
//         navigate(
//           `/product-details/${item.categoryId}/${item.title}/${item._id}`
//         )
//       }
//     >
//       {/* ✅ Image Section with Padding */}
//       <div className="p-3">
//         <div className="relative rounded-xl overflow-hidden">
//           <img
//             src={item.images?.[0] ?? "/placeholder.png"}
//             alt={item.title}
//             className="w-full h-[240px] object-cover rounded-xl"
//           />

//           {/* Discount Badge */}

//         </div>
//       </div>

//       {/* Content */}
//       <div className="px-4 pb-4 space-y-2">
//         {/* Title */}
//         <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
//           {item.title}
//         </h3>

//         {/* Brand */}
//         <p className="text-sm text-blue-600 font-medium">
//           {item.brand}
//         </p>

//         {/* Price Section */}
//         <div className="flex items-center gap-2 pt-2 flex-wrap">
//           {/* MRP Price */}
//           {item.mrpPrice && item.discountPercent && (
//             <span className="text-gray-400 text-sm line-through">
//               ₹{item.mrpPrice?.toFixed(0)}
//             </span>
//           )}

//           {/* Selling Price */}
//           <span className="text-lg font-bold text-gray-900">
//             ₹{item.sellingPrice?.toFixed(0)}
//           </span>

//           {/* Discount */}
//           {item.discountPercent && (
//             <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
//               {item.discountPercent}% OFF
//             </span>
//           )}

//           {/* Rating */}
//           <div className="flex items-center gap-1 text-sm text-gray-600 ml-auto">
//             ⭐ {4.5} {/* default 4.5 if rating missing */}
//             <span className="text-gray-400 text-xs">({50})</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="px-4 sm:px-6 md:px-10 lg:px-20 space-y-12">
//       {/* ===== SLIDER SECTIONS ===== */}
//       {sliderSections.map((sec) => (
//         <div key={sec._id}>
//           <h2 className="text-2xl lg:text-3xl font-semibold mb-6">
//             {sec.title ?? "Untitled"}
//           </h2>

//           <div className="relative">
//             <IconButton
//               onClick={() => scroll(sec._id, "left")}
//               className="!absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md"
//             >
//               <ArrowBackIosNewIcon fontSize="small" />
//             </IconButton>

//             <div
//               ref={(el) => {
//                 sliderRefs.current[sec._id] = el;
//               }}

//               className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
//             >
//               {sec.products?.map((item) => (
//                 <ProductCard key={item._id} item={item} />
//               ))}
//             </div>

//             <IconButton
//               onClick={() => scroll(sec._id, "right")}
//               className="!absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md"
//             >
//               <ArrowForwardIosIcon fontSize="small" />
//             </IconButton>
//           </div>
//         </div>
//       ))}

//       {/* ===== GRID SECTIONS ===== */}
//       {gridSections.map((sec) => (
//         <div key={sec._id}>
//           <h2 className="text-2xl lg:text-3xl font-semibold mb-6">
//             {sec.title ?? "Untitled"}
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {sec.products?.map((item) => (
//               <ProductCard key={item._id} item={item} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }







// import { useEffect, useRef } from "react";
// import { IconButton } from "@mui/material";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import StarIcon from "@mui/icons-material/Star";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { fetchHomeSections } from "../../../Redux Toolkit/Customer/HomeSectionSlice";

// interface Product {
//   _id: string;
//   title: string;
//   brand?: string;
//   images?: string[];
//   categoryId?: string;
//   category?: string;
//   mrpPrice?: number;
//   sellingPrice?: number;
//   discountPercent?: number;
//   numRatings?: number;
//   rating?: number;
// }

// interface Section {
//   _id: string;
//   title: string;
//   layout: "amazon" | "flipkart" | "myntra" | "grid" | "slider";
//   accentColor?: string;
//   bgColor?: string;
//   products?: Product[];
// }

// // ═══════════════════════════════════════════════════
// // 🖼️ Safe Image URL Getter
// // ═══════════════════════════════════════════════════
// const getImageUrl = (item: any): string => {
//   if (Array.isArray(item?.images) && item.images.length > 0) {
//     const img = item.images[0];
//     if (typeof img === "string" && img.trim()) {
//       return img;
//     }
//   }
//   if (item?.image && typeof item.image === "string") return item.image;
//   if (item?.imageUrl && typeof item.imageUrl === "string") return item.imageUrl;
//   return "https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=No+Image";
// };

// export default function HomePreview() {
//   const dispatch = useAppDispatch();
//   const sections: Section[] = useAppSelector(
//     (state: any) => state.homepreview.sections ?? []
//   );

//   const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchHomeSections() as any);
//   }, [dispatch]);

//   // Debug
//   useEffect(() => {
//     console.log("═══════════════════════════════");
//     console.log("📊 SECTIONS:", sections.length);
//     sections.forEach((sec, i) => {
//       console.log(`${i + 1}. "${sec.title}" | Products: ${sec.products?.length || 0}`);
//       if (sec.products && sec.products.length > 0) {
//         console.log(`   [1] ${sec.products[0].title}`);
//         console.log(`       images:`, sec.products[0].images);
//       }
//     });
//     console.log("═══════════════════════════════");
//   }, [sections]);

//   const scroll = (id: string, dir: "left" | "right") => {
//     const slider = sliderRefs.current[id];
//     if (!slider) return;
//     slider.scrollBy({
//       left: dir === "left" ? -600 : 600,
//       behavior: "smooth",
//     });
//   };

//   // ═══════════════════════════════════════════════
//   // 🎴 Product Card
//   // ═══════════════════════════════════════════════
//   const ProductCard = ({ item, accent = "#4f46e5" }: { item: Product; accent?: string }) => {
//     const imageUrl = getImageUrl(item);
//     const discount =
//       item.discountPercent ||
//       (item.mrpPrice && item.sellingPrice
//         ? Math.round(((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100)
//         : 0);

//     return (
//       <div
//         className="group flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px] bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
//         onClick={() =>
//           navigate(
//             `/product-details/${item.categoryId || item.category}/${item.title}/${item._id}`
//           )
//         }
//       >
//         {/* Image */}
//         <div className="relative bg-gray-50 p-3">
//           <div className="aspect-square flex items-center justify-center overflow-hidden rounded-lg">
//             <img
//               src={imageUrl}
//               alt={item.title || "Product"}
//               className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
//               loading="lazy"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src =
//                   "https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=No+Image";
//               }}
//             />
//           </div>
//           {discount > 0 && (
//             <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
//               {discount}% OFF
//             </div>
//           )}
//         </div>

//         {/* Content */}
//         <div className="p-3 space-y-1">
//           {item.brand && (
//             <p className="text-xs text-gray-500 uppercase font-medium truncate">
//               {item.brand}
//             </p>
//           )}
//           <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem]">
//             {item.title}
//           </h3>

//           <div className="flex items-center gap-1">
//             <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
//               <span>{item.rating?.toFixed(1) || "4.3"}</span>
//               <StarIcon sx={{ fontSize: 10, ml: 0.3 }} />
//             </div>
//             <span className="text-[10px] text-gray-500">
//               ({item.numRatings || 50})
//             </span>
//           </div>

//           <div className="flex items-baseline gap-2 flex-wrap">
//             <span className="text-base font-bold text-gray-900">
//               ₹{item.sellingPrice?.toFixed(0) || 0}
//             </span>
//             {item.mrpPrice && item.mrpPrice > (item.sellingPrice || 0) && (
//               <span className="text-xs text-gray-400 line-through">
//                 ₹{item.mrpPrice.toFixed(0)}
//               </span>
//             )}
//           </div>

//           <p className="text-[10px] text-gray-500">FREE Delivery</p>
//         </div>
//       </div>
//     );
//   };

//   // Empty State
//   if (sections.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20 text-center">
//         <div className="text-6xl mb-4">📦</div>
//         <p className="text-gray-500 text-lg font-medium">
//           कोई Home Section नहीं है
//         </p>
//         <p className="text-gray-400 text-sm mt-1">
//           Admin → Home Management से Section बनाएँ
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen -m-6 p-6">
//       <div className="max-w-[1500px] mx-auto space-y-6">
//         {sections.map((sec) => {
//           const accent = sec.accentColor || "#4f46e5";
//           const isGrid = sec.layout === "grid";

//           return (
//             <div
//               key={sec._id}
//               className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
//             >
//               {/* Header */}
//               <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
//                 <div className="flex items-center gap-3">
//                   <div
//                     className="h-1 w-8 rounded-full"
//                     style={{ backgroundColor: accent }}
//                   />
//                   <h2 className="text-lg md:text-xl font-bold text-gray-800">
//                     {sec.title || "Featured"}
//                   </h2>
//                   <span
//                     className="text-xs font-bold px-2 py-1 rounded-full"
//                     style={{ backgroundColor: `${accent}20`, color: accent }}
//                   >
//                     {sec.products?.length || 0} items
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => navigate(`/products?section=${sec._id}`)}
//                   className="text-sm font-semibold hover:underline"
//                   style={{ color: accent }}
//                 >
//                   See More →
//                 </button>
//               </div>

//               {/* Products */}
//               {!sec.products || sec.products.length === 0 ? (
//                 <div className="text-center py-10 text-gray-400">
//                   ⚠️ इस Section में कोई Products नहीं मिले
//                   <br />
//                   <span className="text-xs">
//                     (MongoDB में Products को Tags दें)
//                   </span>
//                 </div>
//               ) : isGrid ? (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
//                   {sec.products.map((item) => (
//                     <ProductCard key={item._id} item={item} accent={accent} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="relative group/slider">
//                   <IconButton
//                     onClick={() => scroll(sec._id, "left")}
//                     className="!absolute !left-0 !top-1/2 !-translate-y-1/2 !z-10 !bg-white !shadow-md opacity-0 group-hover/slider:opacity-100 transition-opacity"
//                     sx={{ width: 36, height: 36, border: "1px solid #e5e7eb" }}
//                   >
//                     <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
//                   </IconButton>

//                   <div
//                     ref={(el) => {
//                       sliderRefs.current[sec._id] = el;
//                     }}
//                     className="flex gap-3 md:gap-4 overflow-x-auto pb-2"
//                     style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//                   >
//                     {sec.products.map((item) => (
//                       <ProductCard key={item._id} item={item} accent={accent} />
//                     ))}
//                   </div>

//                   <IconButton
//                     onClick={() => scroll(sec._id, "right")}
//                     className="!absolute !right-0 !top-1/2 !-translate-y-1/2 !z-10 !bg-white !shadow-md opacity-0 group-hover/slider:opacity-100 transition-opacity"
//                     sx={{ width: 36, height: 36, border: "1px solid #e5e7eb" }}
//                   >
//                     <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
//                   </IconButton>
//                 </div>
//               )}
//             </div>
//           );
//         })}

//         <div className="text-center py-6">
//           <p className="text-xs text-gray-400">
//             © 2026 Selfysnap • All rights reserved
//           </p>
//         </div>
//       </div>

//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//             .line-clamp-2 {
//               display: -webkit-box;
//               -webkit-line-clamp: 2;
//               -webkit-box-orient: vertical;
//               overflow: hidden;
//             }
//             div::-webkit-scrollbar { display: none; }
//           `,
//         }}
//       />
//     </div>
//   );
// }









// // src/admin/pages/HomeSection/HomePreview.tsx

// import { useEffect, useRef } from "react";
// import { IconButton } from "@mui/material";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import StarIcon from "@mui/icons-material/Star";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { fetchHomeSections } from "../../../Redux Toolkit/Customer/HomeSectionSlice";

// interface Product {
//   _id: string;
//   title: string;
//   brand?: string;
//   images?: string[];
//   categoryId?: string;
//   category?: string;
//   mrpPrice?: number;
//   sellingPrice?: number;
//   discountPercent?: number;
//   numRatings?: number;
//   rating?: number;
// }

// interface Section {
//   _id: string;
//   title: string;
//   layout: "amazon" | "flipkart" | "myntra" | "grid" | "slider";
//   accentColor?: string;
//   bgColor?: string;
//   products?: Product[];
// }

// // ═══════════════════════════════════════════════════
// // 🖼️ Safe Image URL
// // ═══════════════════════════════════════════════════
// const getImageUrl = (item: any): string => {
//   if (Array.isArray(item?.images) && item.images.length > 0) {
//     const img = item.images[0];
//     if (typeof img === "string" && img.trim()) return img;
//   }
//   if (item?.image) return item.image;
//   if (item?.imageUrl) return item.imageUrl;
//   return "https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=No+Image";
// };

// export default function HomePreview() {
//   const dispatch = useAppDispatch();
//   const sections: Section[] = useAppSelector(
//     (state: any) => state.homepreview.sections ?? []
//   );

//   const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchHomeSections() as any);
//   }, [dispatch]);

//   const scroll = (id: string, dir: "left" | "right") => {
//     const slider = sliderRefs.current[id];
//     if (!slider) return;
//     slider.scrollBy({
//       left: dir === "left" ? -600 : 600,
//       behavior: "smooth",
//     });
//   };

//   const goToProduct = (item: Product) => {
//     navigate(
//       `/product-details/${item.categoryId || item.category}/${item.title}/${item._id}`
//     );
//   };

//   // ═══════════════════════════════════════════════════
//   // 🅰️ AMAZON CARD (Compact Square)
//   // ═══════════════════════════════════════════════════
//   const AmazonCard = ({ item }: { item: Product }) => {
//     const imageUrl = getImageUrl(item);
//     const discount =
//       item.discountPercent ||
//       (item.mrpPrice && item.sellingPrice
//         ? Math.round(((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100)
//         : 0);

//     return (
//       <div
//         className="group flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] cursor-pointer"
//         onClick={() => goToProduct(item)}
//       >
//         <div className="relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300">
//           <div className="aspect-square bg-gray-50 flex items-center justify-center p-3">
//             <img
//               src={imageUrl}
//               alt={item.title}
//               className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src =
//                   "https://via.placeholder.com/200x200?text=No+Image";
//               }}
//             />
//             {discount > 0 && (
//               <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
//                 {discount}% OFF
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="mt-2 px-1 space-y-1">
//           {item.brand && (
//             <p className="text-[11px] text-gray-500 uppercase font-medium truncate">
//               {item.brand}
//             </p>
//           )}
//           <h3 className="text-xs font-medium text-gray-800 line-clamp-2 min-h-[2rem]">
//             {item.title}
//           </h3>
//           <div className="flex items-center gap-1">
//             <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
//               <span>{item.rating?.toFixed(1) || "4.3"}</span>
//               <StarIcon sx={{ fontSize: 10, ml: 0.3 }} />
//             </div>
//             <span className="text-[10px] text-gray-500">
//               ({item.numRatings || 50})
//             </span>
//           </div>
//           <div className="flex items-baseline gap-1.5 flex-wrap">
//             <span className="text-sm font-bold text-gray-900">
//               ₹{item.sellingPrice?.toFixed(0) || 0}
//             </span>
//             {item.mrpPrice && item.mrpPrice > (item.sellingPrice || 0) && (
//               <span className="text-[11px] text-gray-400 line-through">
//                 ₹{item.mrpPrice.toFixed(0)}
//               </span>
//             )}
//           </div>
//           <p className="text-[10px] text-gray-500">FREE Delivery</p>
//         </div>
//       </div>
//     );
//   };

//   // ═══════════════════════════════════════════════════
//   // 🅵 FLIPKART CARD (Big Cards + Offers)
//   // ═══════════════════════════════════════════════════
//   const FlipkartCard = ({ item }: { item: Product }) => {
//     const imageUrl = getImageUrl(item);
//     const discount =
//       item.discountPercent ||
//       (item.mrpPrice && item.sellingPrice
//         ? Math.round(((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100)
//         : 0);

//     return (
//       <div
//         className="group flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px] bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
//         onClick={() => goToProduct(item)}
//       >
//         <div className="relative bg-gray-50 aspect-[4/3] flex items-center justify-center p-4">
//           <img
//             src={imageUrl}
//             alt={item.title}
//             className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
//             onError={(e) => {
//               (e.target as HTMLImageElement).src =
//                 "https://via.placeholder.com/300x300?text=No+Image";
//             }}
//           />
//           {discount > 0 && (
//             <div className="absolute bottom-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
//               🔥 {discount}% OFF
//             </div>
//           )}
//         </div>

//         <div className="p-3 space-y-2">
//           <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
//             {item.title}
//           </h3>
//           {item.brand && (
//             <p className="text-xs text-blue-600 font-medium">{item.brand}</p>
//           )}
//           <div className="flex items-center gap-2 flex-wrap">
//             <span className="text-lg font-bold text-gray-900">
//               ₹{item.sellingPrice?.toFixed(0)}
//             </span>
//             {item.mrpPrice && item.mrpPrice > (item.sellingPrice || 0) && (
//               <span className="text-xs text-gray-400 line-through">
//                 ₹{item.mrpPrice.toFixed(0)}
//               </span>
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold">
//               {item.rating?.toFixed(1) || "4.3"}
//               <StarIcon sx={{ fontSize: 12 }} />
//             </div>
//             <span className="text-xs text-gray-500">
//               ({item.numRatings || 100})
//             </span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ═══════════════════════════════════════════════════
//   // 🅼 MYNTRA CARD (Portrait)
//   // ═══════════════════════════════════════════════════
//   const MyntraCard = ({ item }: { item: Product }) => {
//     const imageUrl = getImageUrl(item);
//     const discount =
//       item.discountPercent ||
//       (item.mrpPrice && item.sellingPrice
//         ? Math.round(((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100)
//         : 0);

//     return (
//       <div
//         className="group flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] cursor-pointer"
//         onClick={() => goToProduct(item)}
//       >
//         <div className="relative rounded-xl overflow-hidden bg-white">
//           <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
//             <img
//               src={imageUrl}
//               alt={item.title}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src =
//                   "https://via.placeholder.com/300x400?text=No+Image";
//               }}
//             />
//           </div>
//           <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur px-2 py-1 rounded-md shadow-md">
//             <div className="flex items-center gap-1 text-[11px] font-bold">
//               <span>{item.rating?.toFixed(1) || "4.3"}</span>
//               <StarIcon sx={{ fontSize: 10, color: "#10b981" }} />
//               <span className="text-gray-400">|</span>
//               <span className="text-gray-600">{item.numRatings || 50}</span>
//             </div>
//           </div>
//         </div>

//         <div className="mt-2 space-y-1 px-1">
//           {item.brand && (
//             <p className="text-xs font-bold text-gray-800 uppercase">
//               {item.brand}
//             </p>
//           )}
//           <p className="text-xs text-gray-600 line-clamp-1">{item.title}</p>
//           <div className="flex items-baseline gap-1.5">
//             <span className="text-sm font-bold text-gray-900">
//               ₹{item.sellingPrice?.toFixed(0)}
//             </span>
//             {item.mrpPrice && item.mrpPrice > (item.sellingPrice || 0) && (
//               <>
//                 <span className="text-xs text-gray-400 line-through">
//                   ₹{item.mrpPrice.toFixed(0)}
//                 </span>
//                 {discount > 0 && (
//                   <span className="text-xs font-bold text-orange-600">
//                     ({discount}% OFF)
//                   </span>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ═══════════════════════════════════════════════════
//   // ⊞ GRID CARD (Simple)
//   // ═══════════════════════════════════════════════════
//   const GridCard = ({ item }: { item: Product }) => {
//     const imageUrl = getImageUrl(item);

//     return (
//       <div
//         className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
//         onClick={() => goToProduct(item)}
//       >
//         <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
//           <img
//             src={imageUrl}
//             alt={item.title}
//             className="w-full h-full object-contain"
//             onError={(e) => {
//               (e.target as HTMLImageElement).src =
//                 "https://via.placeholder.com/300x300?text=No+Image";
//             }}
//           />
//         </div>
//         <div className="p-3">
//           <p className="text-sm font-medium text-gray-800 line-clamp-2">
//             {item.title}
//           </p>
//           <p className="text-base font-bold mt-1">
//             ₹{item.sellingPrice?.toFixed(0)}
//           </p>
//         </div>
//       </div>
//     );
//   };

//   // ═══════════════════════════════════════════════════
//   // 🎯 Get Card by Layout
//   // ═══════════════════════════════════════════════════
//   const getCard = (item: Product, layout: string) => {
//     switch (layout) {
//       case "flipkart":
//         return <FlipkartCard item={item} />;
//       case "myntra":
//         return <MyntraCard item={item} />;
//       case "grid":
//         return <GridCard item={item} />;
//       case "amazon":
//       case "slider":
//       default:
//         return <AmazonCard item={item} />;
//     }
//   };

//   // Empty State
//   if (sections.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20 text-center">
//         <div className="text-6xl mb-4">📦</div>
//         <p className="text-gray-500 text-lg font-medium">
//           कोई Home Section नहीं है
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen -m-6 p-6">
//       <div className="max-w-[1500px] mx-auto space-y-6">
//         {sections.map((sec) => {
//           const accent = sec.accentColor || "#4f46e5";
//           const layout = sec.layout || "amazon";
//           const isGrid = layout === "grid";

//           return (
//             <div
//               key={sec._id}
//               className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
//             >
//               {/* Section Header */}
//               <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
//                 <div className="flex items-center gap-3">
//                   <div
//                     className="h-1 w-8 rounded-full"
//                     style={{ backgroundColor: accent }}
//                   />
//                   <h2 className="text-lg md:text-xl font-bold text-gray-800">
//                     {sec.title || "Featured"}
//                   </h2>
//                   <span
//                     className="text-xs font-bold px-2 py-1 rounded-full"
//                     style={{ backgroundColor: `${accent}20`, color: accent }}
//                   >
//                     {sec.products?.length || 0} items
//                   </span>
//                   {/* Layout Badge */}
//                   <span className="text-[10px] bg-gray-100 text-gray-600 font-bold px-2 py-1 rounded-full uppercase">
//                     {layout}
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => navigate(`/products?section=${sec._id}`)}
//                   className="text-sm font-semibold hover:underline"
//                   style={{ color: accent }}
//                 >
//                   See More →
//                 </button>
//               </div>

//               {/* Products Render */}
//               {!sec.products || sec.products.length === 0 ? (
//                 <div className="text-center py-10 text-gray-400">
//                   ⚠️ इस Section में कोई Products नहीं मिले
//                 </div>
//               ) : isGrid ? (
//                 /* GRID Layout */
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
//                   {sec.products.map((item) => (
//                     <div key={item._id}>{getCard(item, layout)}</div>
//                   ))}
//                 </div>
//               ) : (
//                 /* SLIDER Layout (Amazon / Flipkart / Myntra) */
//                 <div className="relative group/slider">
//                   <IconButton
//                     onClick={() => scroll(sec._id, "left")}
//                     className="!absolute !left-0 !top-1/2 !-translate-y-1/2 !z-10 !bg-white !shadow-md opacity-0 group-hover/slider:opacity-100 transition-opacity"
//                     sx={{ width: 36, height: 36, border: "1px solid #e5e7eb" }}
//                   >
//                     <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
//                   </IconButton>

//                   <div
//                     ref={(el) => {
//                       sliderRefs.current[sec._id] = el;
//                     }}
//                     className="flex gap-3 md:gap-4 overflow-x-auto pb-2"
//                     style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//                   >
//                     {sec.products.map((item) => (
//                       <div key={item._id}>{getCard(item, layout)}</div>
//                     ))}
//                   </div>

//                   <IconButton
//                     onClick={() => scroll(sec._id, "right")}
//                     className="!absolute !right-0 !top-1/2 !-translate-y-1/2 !z-10 !bg-white !shadow-md opacity-0 group-hover/slider:opacity-100 transition-opacity"
//                     sx={{ width: 36, height: 36, border: "1px solid #e5e7eb" }}
//                   >
//                     <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
//                   </IconButton>
//                 </div>
//               )}
//             </div>
//           );
//         })}

//         <div className="text-center py-6">
//           <p className="text-xs text-gray-400">
//             © 2026 Selfysnap • All rights reserved
//           </p>
//         </div>
//       </div>

//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//             .line-clamp-2 {
//               display: -webkit-box;
//               -webkit-line-clamp: 2;
//               -webkit-box-orient: vertical;
//               overflow: hidden;
//             }
//             .line-clamp-1 {
//               display: -webkit-box;
//               -webkit-line-clamp: 1;
//               -webkit-box-orient: vertical;
//               overflow: hidden;
//             }
//             div::-webkit-scrollbar { display: none; }
//           `,
//         }}
//       />
//     </div>
//   );
// }








// // src/admin/pages/HomeSection/HomePreview.tsx

// import { useEffect, useRef } from "react";
// import { IconButton } from "@mui/material";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import StarIcon from "@mui/icons-material/Star";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { fetchHomeSections } from "../../../Redux Toolkit/Customer/HomeSectionSlice";

// // ✅ BANNER IMPORT जोड़ें
// import NewBanners from "../../../customer/pages/Home/Banner/banners";

// interface Product {
//   _id: string;
//   title: string;
//   brand?: string;
//   images?: string[];
//   categoryId?: string;
//   category?: string;
//   mrpPrice?: number;
//   sellingPrice?: number;
//   discountPercent?: number;
//   numRatings?: number;
//   rating?: number;
// }

// interface Section {
//   _id: string;
//   title: string;
//   layout: "amazon" | "flipkart" | "myntra" | "grid" | "slider";
//   accentColor?: string;
//   bgColor?: string;
//   products?: Product[];
// }

// // ═══════════════════════════════════════════════════
// // 🖼️ Safe Image URL
// // ═══════════════════════════════════════════════════
// const getImageUrl = (item: any): string => {
//   if (Array.isArray(item?.images) && item.images.length > 0) {
//     const img = item.images[0];
//     if (typeof img === "string" && img.trim()) return img;
//   }
//   if (item?.image) return item.image;
//   if (item?.imageUrl) return item.imageUrl;
//   return "https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=No+Image";
// };

// export default function HomePreview() {
//   const dispatch = useAppDispatch();
//   const sections: Section[] = useAppSelector(
//     (state: any) => state.homepreview.sections ?? []
//   );

//   const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchHomeSections() as any);
//   }, [dispatch]);

//   const scroll = (id: string, dir: "left" | "right") => {
//     const slider = sliderRefs.current[id];
//     if (!slider) return;
//     slider.scrollBy({
//       left: dir === "left" ? -600 : 600,
//       behavior: "smooth",
//     });
//   };

//   const goToProduct = (item: Product) => {
//     navigate(
//       `/product-details/${item.categoryId || item.category}/${item.title}/${item._id}`
//     );
//   };

//   // ═══════════════════════════════════════════════════
//   // 🅰️ AMAZON CARD
//   // ═══════════════════════════════════════════════════
//   const AmazonCard = ({ item }: { item: Product }) => {
//     const imageUrl = getImageUrl(item);
//     const discount =
//       item.discountPercent ||
//       (item.mrpPrice && item.sellingPrice
//         ? Math.round(((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100)
//         : 0);

//     return (
//       <div
//         className="group flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] cursor-pointer"
//         onClick={() => goToProduct(item)}
//       >
//         <div className="relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300">
//           <div className="aspect-square bg-gray-50 flex items-center justify-center p-3">
//             <img
//               src={imageUrl}
//               alt={item.title}
//               className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src =
//                   "https://via.placeholder.com/200x200?text=No+Image";
//               }}
//             />
//             {discount > 0 && (
//               <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
//                 {discount}% OFF
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="mt-2 px-1 space-y-1">
//           {item.brand && (
//             <p className="text-[11px] text-gray-500 uppercase font-medium truncate">
//               {item.brand}
//             </p>
//           )}
//           <h3 className="text-xs font-medium text-gray-800 line-clamp-2 min-h-[2rem]">
//             {item.title}
//           </h3>
//           <div className="flex items-center gap-1">
//             <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
//               <span>{item.rating?.toFixed(1) || "4.3"}</span>
//               <StarIcon sx={{ fontSize: 10, ml: 0.3 }} />
//             </div>
//             <span className="text-[10px] text-gray-500">
//               ({item.numRatings || 50})
//             </span>
//           </div>
//           <div className="flex items-baseline gap-1.5 flex-wrap">
//             <span className="text-sm font-bold text-gray-900">
//               ₹{item.sellingPrice?.toFixed(0) || 0}
//             </span>
//             {item.mrpPrice && item.mrpPrice > (item.sellingPrice || 0) && (
//               <span className="text-[11px] text-gray-400 line-through">
//                 ₹{item.mrpPrice.toFixed(0)}
//               </span>
//             )}
//           </div>
//           <p className="text-[10px] text-gray-500">FREE Delivery</p>
//         </div>
//       </div>
//     );
//   };

//   // ═══════════════════════════════════════════════════
//   // 🅵 FLIPKART CARD
//   // ═══════════════════════════════════════════════════
//   const FlipkartCard = ({ item }: { item: Product }) => {
//     const imageUrl = getImageUrl(item);
//     const discount =
//       item.discountPercent ||
//       (item.mrpPrice && item.sellingPrice
//         ? Math.round(((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100)
//         : 0);

//     return (
//       <div
//         className="group flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px] bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
//         onClick={() => goToProduct(item)}
//       >
//         <div className="relative bg-gray-50 aspect-[4/3] flex items-center justify-center p-4">
//           <img
//             src={imageUrl}
//             alt={item.title}
//             className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
//             onError={(e) => {
//               (e.target as HTMLImageElement).src =
//                 "https://via.placeholder.com/300x300?text=No+Image";
//             }}
//           />
//           {discount > 0 && (
//             <div className="absolute bottom-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
//               🔥 {discount}% OFF
//             </div>
//           )}
//         </div>

//         <div className="p-3 space-y-2">
//           <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
//             {item.title}
//           </h3>
//           {item.brand && (
//             <p className="text-xs text-blue-600 font-medium">{item.brand}</p>
//           )}
//           <div className="flex items-center gap-2 flex-wrap">
//             <span className="text-lg font-bold text-gray-900">
//               ₹{item.sellingPrice?.toFixed(0)}
//             </span>
//             {item.mrpPrice && item.mrpPrice > (item.sellingPrice || 0) && (
//               <span className="text-xs text-gray-400 line-through">
//                 ₹{item.mrpPrice.toFixed(0)}
//               </span>
//             )}
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold">
//               {item.rating?.toFixed(1) || "4.3"}
//               <StarIcon sx={{ fontSize: 12 }} />
//             </div>
//             <span className="text-xs text-gray-500">
//               ({item.numRatings || 100})
//             </span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ═══════════════════════════════════════════════════
//   // 🅼 MYNTRA CARD
//   // ═══════════════════════════════════════════════════
//   const MyntraCard = ({ item }: { item: Product }) => {
//     const imageUrl = getImageUrl(item);
//     const discount =
//       item.discountPercent ||
//       (item.mrpPrice && item.sellingPrice
//         ? Math.round(((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100)
//         : 0);

//     return (
//       <div
//         className="group flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] cursor-pointer"
//         onClick={() => goToProduct(item)}
//       >
//         <div className="relative rounded-xl overflow-hidden bg-white">
//           <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
//             <img
//               src={imageUrl}
//               alt={item.title}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src =
//                   "https://via.placeholder.com/300x400?text=No+Image";
//               }}
//             />
//           </div>
//           <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur px-2 py-1 rounded-md shadow-md">
//             <div className="flex items-center gap-1 text-[11px] font-bold">
//               <span>{item.rating?.toFixed(1) || "4.3"}</span>
//               <StarIcon sx={{ fontSize: 10, color: "#10b981" }} />
//               <span className="text-gray-400">|</span>
//               <span className="text-gray-600">{item.numRatings || 50}</span>
//             </div>
//           </div>
//         </div>

//         <div className="mt-2 space-y-1 px-1">
//           {item.brand && (
//             <p className="text-xs font-bold text-gray-800 uppercase">
//               {item.brand}
//             </p>
//           )}
//           <p className="text-xs text-gray-600 line-clamp-1">{item.title}</p>
//           <div className="flex items-baseline gap-1.5">
//             <span className="text-sm font-bold text-gray-900">
//               ₹{item.sellingPrice?.toFixed(0)}
//             </span>
//             {item.mrpPrice && item.mrpPrice > (item.sellingPrice || 0) && (
//               <>
//                 <span className="text-xs text-gray-400 line-through">
//                   ₹{item.mrpPrice.toFixed(0)}
//                 </span>
//                 {discount > 0 && (
//                   <span className="text-xs font-bold text-orange-600">
//                     ({discount}% OFF)
//                   </span>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ═══════════════════════════════════════════════════
//   // ⊞ GRID CARD
//   // ═══════════════════════════════════════════════════
//   const GridCard = ({ item }: { item: Product }) => {
//     const imageUrl = getImageUrl(item);

//     return (
//       <div
//         className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
//         onClick={() => goToProduct(item)}
//       >
//         <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
//           <img
//             src={imageUrl}
//             alt={item.title}
//             className="w-full h-full object-contain"
//             onError={(e) => {
//               (e.target as HTMLImageElement).src =
//                 "https://via.placeholder.com/300x300?text=No+Image";
//             }}
//           />
//         </div>
//         <div className="p-3">
//           <p className="text-sm font-medium text-gray-800 line-clamp-2">
//             {item.title}
//           </p>
//           <p className="text-base font-bold mt-1">
//             ₹{item.sellingPrice?.toFixed(0)}
//           </p>
//         </div>
//       </div>
//     );
//   };

//   // ═══════════════════════════════════════════════════
//   // 🎯 Get Card by Layout
//   // ═══════════════════════════════════════════════════
//   const getCard = (item: Product, layout: string) => {
//     switch (layout) {
//       case "flipkart":
//         return <FlipkartCard item={item} />;
//       case "myntra":
//         return <MyntraCard item={item} />;
//       case "grid":
//         return <GridCard item={item} />;
//       case "amazon":
//       case "slider":
//       default:
//         return <AmazonCard item={item} />;
//     }
//   };

//   // Empty State
//   if (sections.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20 text-center">
//         <div className="text-6xl mb-4">📦</div>
//         <p className="text-gray-500 text-lg font-medium">
//           कोई Home Section नहीं है
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen -m-6 p-6">
//       <div className="max-w-[1500px] mx-auto space-y-6">
//         {sections.map((sec, index) => {
//           const accent = sec.accentColor || "#4f46e5";
//           const layout = sec.layout || "amazon";
//           const isGrid = layout === "grid";

//           return (
//             <div key={sec._id}>
//               {/* ═══════════════════════════════════════════════ */}
//               {/* SECTION CARD */}
//               {/* ═══════════════════════════════════════════════ */}
//               <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
//                 {/* Section Header */}
//                 <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
//                   <div className="flex items-center gap-3">
//                     <div
//                       className="h-1 w-8 rounded-full"
//                       style={{ backgroundColor: accent }}
//                     />
//                     <h2 className="text-lg md:text-xl font-bold text-gray-800">
//                       {sec.title || "Featured"}
//                     </h2>
//                     <span
//                       className="text-xs font-bold px-2 py-1 rounded-full"
//                       style={{ backgroundColor: `${accent}20`, color: accent }}
//                     >
//                       {sec.products?.length || 0} items
//                     </span>
//                     <span className="text-[10px] bg-gray-100 text-gray-600 font-bold px-2 py-1 rounded-full uppercase">
//                       {layout}
//                     </span>
//                   </div>
//                   <button
//                     onClick={() => navigate(`/products?section=${sec._id}`)}
//                     className="text-sm font-semibold hover:underline"
//                     style={{ color: accent }}
//                   >
//                     See More →
//                   </button>
//                 </div>

//                 {/* Products Render */}
//                 {!sec.products || sec.products.length === 0 ? (
//                   <div className="text-center py-10 text-gray-400">
//                     ⚠️ इस Section में कोई Products नहीं मिले
//                   </div>
//                 ) : isGrid ? (
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
//                     {sec.products.map((item) => (
//                       <div key={item._id}>{getCard(item, layout)}</div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="relative group/slider">
//                     <IconButton
//                       onClick={() => scroll(sec._id, "left")}
//                       className="!absolute !left-0 !top-1/2 !-translate-y-1/2 !z-10 !bg-white !shadow-md opacity-0 group-hover/slider:opacity-100 transition-opacity"
//                       sx={{ width: 36, height: 36, border: "1px solid #e5e7eb" }}
//                     >
//                       <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
//                     </IconButton>

//                     <div
//                       ref={(el) => {
//                         sliderRefs.current[sec._id] = el;
//                       }}
//                       className="flex gap-3 md:gap-4 overflow-x-auto pb-2"
//                       style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//                     >
//                       {sec.products.map((item) => (
//                         <div key={item._id}>{getCard(item, layout)}</div>
//                       ))}
//                     </div>

//                     <IconButton
//                       onClick={() => scroll(sec._id, "right")}
//                       className="!absolute !right-0 !top-1/2 !-translate-y-1/2 !z-10 !bg-white !shadow-md opacity-0 group-hover/slider:opacity-100 transition-opacity"
//                       sx={{ width: 36, height: 36, border: "1px solid #e5e7eb" }}
//                     >
//                       <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
//                     </IconButton>
//                   </div>
//                 )}
//               </div>

//               {/* ═══════════════════════════════════════════════ */}
//               {/* 🎬 BANNER – सिर्फ Section 2 के बाद (index === 1) */}
//               {/* ═══════════════════════════════════════════════ */}
//               {index === 1 && (
//                 <div className="px-4 lg:px-20 py-4">
//                   <NewBanners />
//                 </div>
//               )}
//             </div>
//           );
//         })}

//         <div className="text-center py-6">
//           <p className="text-xs text-gray-400">
//             © 2026 Selfysnap • All rights reserved
//           </p>
//         </div>
//       </div>

//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//             .line-clamp-2 {
//               display: -webkit-box;
//               -webkit-line-clamp: 2;
//               -webkit-box-orient: vertical;
//               overflow: hidden;
//             }
//             .line-clamp-1 {
//               display: -webkit-box;
//               -webkit-line-clamp: 1;
//               -webkit-box-orient: vertical;
//               overflow: hidden;
//             }
//             div::-webkit-scrollbar { display: none; }
//           `,
//         }}
//       />
//     </div>
//   );
// }























// src/admin/pages/HomeSection/HomePreview.tsx

import { useEffect, useRef } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { fetchHomeSections } from "../../../Redux Toolkit/Customer/HomeSectionSlice";
import NewBanners from "../../../customer/pages/Home/Banner/banners";

interface Product {
  _id: string;
  title: string;
  brand?: any;
  images?: string[];
  categoryId?: string;
  category?: any;
  mrpPrice?: number;
  sellingPrice?: number;
  discountPercent?: number;
  numRatings?: number;
  rating?: number;
}

interface Section {
  _id: string;
  title: string;
  layout: "amazon" | "flipkart" | "myntra" | "grid" | "slider";
  accentColor?: string;
  bgColor?: string;
  products?: Product[];
}

/* ═══════════════════════════════════════════════════
   🖼️ Safe Image URL
   ═══════════════════════════════════════════════════ */
const getImageUrl = (item: any): string => {
  if (Array.isArray(item?.images) && item.images.length > 0) {
    const img = item.images[0];
    if (typeof img === "string" && img.trim()) return img;
  }
  if (item?.image) return item.image;
  if (item?.imageUrl) return item.imageUrl;
  return "https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=No+Image";
};

/* ═══════════════════════════════════════════════════
   🔥 Brand resolver — string, object, ya ObjectId handle
   ═══════════════════════════════════════════════════ */
const getBrandName = (brand: any): string | null => {
  if (!brand) return null;

  // Case 1: object { _id, name }
  if (typeof brand === "object") {
    const name = brand.name || brand.title;
    if (typeof name === "string" && name.trim()) return name.trim();
    return null;
  }

  // Case 2: string
  if (typeof brand === "string") {
    const s = brand.trim();
    if (!s) return null;
    // ❌ 24-char hex ObjectId → skip
    if (/^[a-f0-9]{24}$/i.test(s)) return null;
    return s;
  }

  return null;
};

/* ═══════════════════════════════════════════════════
   🔥 Category resolver — string, object, ya ObjectId handle
   ═══════════════════════════════════════════════════ */
const getCategoryId = (item: any): string => {
  if (item.categoryId && typeof item.categoryId === "string") {
    return item.categoryId;
  }
  const c = item.category;
  if (!c) return "";
  if (typeof c === "string") return c;
  if (typeof c === "object") return c.categoryId || c._id || "";
  return "";
};

export default function HomePreview() {
  const dispatch = useAppDispatch();
  const sections: Section[] = useAppSelector(
    (state: any) => state.homepreview.sections ?? []
  );

  const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchHomeSections() as any);
  }, [dispatch]);

  const scroll = (id: string, dir: "left" | "right") => {
    const slider = sliderRefs.current[id];
    if (!slider) return;
    slider.scrollBy({
      left: dir === "left" ? -600 : 600,
      behavior: "smooth",
    });
  };

  const goToProduct = (item: Product) => {
    const catId = getCategoryId(item);
    if (!catId) return;
    navigate(
      `/product-details/${catId}/${encodeURIComponent(item.title)}/${item._id}`
    );
  };

  /* ═══════════════════════════════════════════════════
     🅰️ AMAZON CARD
     ═══════════════════════════════════════════════════ */
  const AmazonCard = ({ item }: { item: Product }) => {
    const imageUrl = getImageUrl(item);
    const brandName = getBrandName(item.brand);
    const discount =
      item.discountPercent ||
      (item.mrpPrice && item.sellingPrice
        ? Math.round(((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100)
        : 0);

    return (
      <div
        className="group flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] cursor-pointer"
        onClick={() => goToProduct(item)}
      >
        <div className="relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300">
          <div className="aspect-square bg-gray-50 flex items-center justify-center p-3">
            <img
              src={imageUrl}
              alt={item.title}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/200x200?text=No+Image";
              }}
            />
            {discount > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {discount}% OFF
              </div>
            )}
          </div>
        </div>

        <div className="mt-2 px-1 space-y-1">
          {brandName && (
            <p className="text-[11px] text-gray-500 uppercase font-medium truncate">
              {brandName}
            </p>
          )}
          <h3 className="text-xs font-medium text-gray-800 line-clamp-2 min-h-[2rem]">
            {item.title}
          </h3>
          <div className="flex items-center gap-1">
            <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
              <span>{item.rating?.toFixed(1) || "4.3"}</span>
              <StarIcon sx={{ fontSize: 10, ml: 0.3 }} />
            </div>
            <span className="text-[10px] text-gray-500">
              ({item.numRatings || 50})
            </span>
          </div>
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm font-bold text-gray-900">
              ₹{item.sellingPrice?.toFixed(0) || 0}
            </span>
            {item.mrpPrice && item.mrpPrice > (item.sellingPrice || 0) && (
              <span className="text-[11px] text-gray-400 line-through">
                ₹{item.mrpPrice.toFixed(0)}
              </span>
            )}
          </div>
          <p className="text-[10px] text-gray-500">FREE Delivery</p>
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════
     🅵 FLIPKART CARD
     ═══════════════════════════════════════════════════ */
  const FlipkartCard = ({ item }: { item: Product }) => {
    const imageUrl = getImageUrl(item);
    const brandName = getBrandName(item.brand);
    const discount =
      item.discountPercent ||
      (item.mrpPrice && item.sellingPrice
        ? Math.round(((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100)
        : 0);

    return (
      <div
        className="group flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px] bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
        onClick={() => goToProduct(item)}
      >
        <div className="relative bg-gray-50 aspect-[4/3] flex items-center justify-center p-4">
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/300x300?text=No+Image";
            }}
          />
          {discount > 0 && (
            <div className="absolute bottom-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              🔥 {discount}% OFF
            </div>
          )}
        </div>

        <div className="p-3 space-y-2">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
            {item.title}
          </h3>
          {brandName && (
            <p className="text-xs text-blue-600 font-medium">{brandName}</p>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg font-bold text-gray-900">
              ₹{item.sellingPrice?.toFixed(0)}
            </span>
            {item.mrpPrice && item.mrpPrice > (item.sellingPrice || 0) && (
              <span className="text-xs text-gray-400 line-through">
                ₹{item.mrpPrice.toFixed(0)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold">
              {item.rating?.toFixed(1) || "4.3"}
              <StarIcon sx={{ fontSize: 12 }} />
            </div>
            <span className="text-xs text-gray-500">
              ({item.numRatings || 100})
            </span>
          </div>
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════
     🅼 MYNTRA CARD
     ═══════════════════════════════════════════════════ */
  const MyntraCard = ({ item }: { item: Product }) => {
    const imageUrl = getImageUrl(item);
    const brandName = getBrandName(item.brand);
    const discount =
      item.discountPercent ||
      (item.mrpPrice && item.sellingPrice
        ? Math.round(((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100)
        : 0);

    return (
      <div
        className="group flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] cursor-pointer"
        onClick={() => goToProduct(item)}
      >
        <div className="relative rounded-xl overflow-hidden bg-white">
          <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
            <img
              src={imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/300x400?text=No+Image";
              }}
            />
          </div>
          <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur px-2 py-1 rounded-md shadow-md">
            <div className="flex items-center gap-1 text-[11px] font-bold">
              <span>{item.rating?.toFixed(1) || "4.3"}</span>
              <StarIcon sx={{ fontSize: 10, color: "#10b981" }} />
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">{item.numRatings || 50}</span>
            </div>
          </div>
        </div>

        <div className="mt-2 space-y-1 px-1">
          {brandName && (
            <p className="text-xs font-bold text-gray-800 uppercase">
              {brandName}
            </p>
          )}
          <p className="text-xs text-gray-600 line-clamp-1">{item.title}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-gray-900">
              ₹{item.sellingPrice?.toFixed(0)}
            </span>
            {item.mrpPrice && item.mrpPrice > (item.sellingPrice || 0) && (
              <>
                <span className="text-xs text-gray-400 line-through">
                  ₹{item.mrpPrice.toFixed(0)}
                </span>
                {discount > 0 && (
                  <span className="text-xs font-bold text-orange-600">
                    ({discount}% OFF)
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════
     ⊞ GRID CARD
     ═══════════════════════════════════════════════════ */
  const GridCard = ({ item }: { item: Product }) => {
    const imageUrl = getImageUrl(item);
    const brandName = getBrandName(item.brand);

    return (
      <div
        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
        onClick={() => goToProduct(item)}
      >
        <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/300x300?text=No+Image";
            }}
          />
        </div>
        <div className="p-3">
          {brandName && (
            <p className="text-[11px] text-gray-500 uppercase font-medium truncate mb-1">
              {brandName}
            </p>
          )}
          <p className="text-sm font-medium text-gray-800 line-clamp-2">
            {item.title}
          </p>
          <p className="text-base font-bold mt-1">
            ₹{item.sellingPrice?.toFixed(0)}
          </p>
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════
     🎯 Get Card by Layout
     ═══════════════════════════════════════════════════ */
  const getCard = (item: Product, layout: string) => {
    switch (layout) {
      case "flipkart":
        return <FlipkartCard item={item} />;
      case "myntra":
        return <MyntraCard item={item} />;
      case "grid":
        return <GridCard item={item} />;
      case "amazon":
      case "slider":
      default:
        return <AmazonCard item={item} />;
    }
  };

  if (sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">📦</div>
        <p className="text-gray-500 text-lg font-medium">
          Product shows is Not Found
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen -m-6 p-6">
      <div className="max-w-[1500px] mx-auto space-y-6">
        {sections.map((sec, index) => {
          const accent = sec.accentColor || "#4f46e5";
          const layout = sec.layout || "amazon";
          const isGrid = layout === "grid";

          return (
            <div key={sec._id}>
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-1 w-8 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    <h2 className="text-lg md:text-xl font-bold text-gray-800">
                      {sec.title || "Featured"}
                    </h2>
                    <span
                      className="text-xs font-bold px-2 py-1 rounded-full"
                      style={{ backgroundColor: `${accent}20`, color: accent }}
                    >
                      {sec.products?.length || 0} items
                    </span>
                    <span className="text-[10px] bg-gray-100 text-gray-600 font-bold px-2 py-1 rounded-full uppercase">
                      {layout}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/products?section=${sec._id}`)}
                    className="text-sm font-semibold hover:underline"
                    style={{ color: accent }}
                  >
                    See More →
                  </button>
                </div>

                {!sec.products || sec.products.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    ⚠️ इस Section में कोई Products नहीं मिले
                  </div>
                ) : isGrid ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                    {sec.products.map((item) => (
                      <div key={item._id}>{getCard(item, layout)}</div>
                    ))}
                  </div>
                ) : (
                  <div className="relative group/slider">
                    <IconButton
                      onClick={() => scroll(sec._id, "left")}
                      className="!absolute !left-0 !top-1/2 !-translate-y-1/2 !z-10 !bg-white !shadow-md opacity-0 group-hover/slider:opacity-100 transition-opacity"
                      sx={{ width: 36, height: 36, border: "1px solid #e5e7eb" }}
                    >
                      <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
                    </IconButton>

                    <div
                      ref={(el) => {
                        sliderRefs.current[sec._id] = el;
                      }}
                      className="flex gap-3 md:gap-4 overflow-x-auto pb-2"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      {sec.products.map((item) => (
                        <div key={item._id}>{getCard(item, layout)}</div>
                      ))}
                    </div>

                    <IconButton
                      onClick={() => scroll(sec._id, "right")}
                      className="!absolute !right-0 !top-1/2 !-translate-y-1/2 !z-10 !bg-white !shadow-md opacity-0 group-hover/slider:opacity-100 transition-opacity"
                      sx={{ width: 36, height: 36, border: "1px solid #e5e7eb" }}
                    >
                      <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </div>
                )}
              </div>

              {index === 1 && (
                <div className="px-4 lg:px-20 py-4">
                  <NewBanners />
                </div>
              )}
            </div>
          );
        })}

        <div className="text-center py-6">
          {/* <p className="text-xs text-gray-400">
            © 2026 Selfysnap • All rights reserved
          </p> */}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .line-clamp-2 {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .line-clamp-1 {
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            div::-webkit-scrollbar { display: none; }
          `,
        }}
      />
    </div>
  );
}