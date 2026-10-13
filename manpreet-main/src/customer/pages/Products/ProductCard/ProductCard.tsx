// import "./ProductCard.css";
// import React, { useState, useEffect } from "react";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ModeCommentIcon from "@mui/icons-material/ModeComment";
// import { Box, Button, Modal } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import type { Product } from "../../../../types/productTypes";
// import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
// import { addProductToWishlist } from "../../../../Redux Toolkit/Customer/WishlistSlice";
// import { isWishlisted } from "../../../../util/isWishlisted";
// import ChatBot from "../../ChatBot/ChatBot";

// interface ProductCardProps {
//   item: Product;
//   categoryId?: string; // optional override
//   isHomePage?: boolean;
// }

// const style = {
//   position: "absolute" as const,
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "auto",
//   borderRadius: ".5rem",
//   boxShadow: 24,
// };

// const ProductCard: React.FC<ProductCardProps> = ({ item, categoryId, isHomePage = false }) => {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [showChatBot, setShowChatBot] = useState(false);

//   const { wishlist } = useAppSelector((store) => store);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const handleAddWishlist = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.stopPropagation();
//     if (item._id) dispatch(addProductToWishlist({ productId: item._id }));
//   };

//   const handleShowChatBot = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.stopPropagation();
//     setShowChatBot(true);
//   };

//   const handleCloseChatBot = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
//     event.stopPropagation();
//     setShowChatBot(false);
//   };

//   useEffect(() => {
//     let interval: number | undefined;
//     if (isHovered && item.images?.length) {
//       interval = window.setInterval(() => {
//         setCurrentImage((prev) => (prev + 1) % item.images.length);
//       }, 1000);
//     }
//     return () => {
//       if (interval) window.clearInterval(interval);
//     };
//   }, [isHovered, item.images]);

//   // ✅ Fix: use category?.categoryId, remove non-existent item.categoryId
//   const resolvedCategoryId = categoryId || item.category?.categoryId;

//   return (
//     <>
//       <div
//         onClick={() =>
//           navigate(`/product-details/${resolvedCategoryId}/${item.title}/${item._id}`)
//         }
//         className="group px-4 relative cursor-pointer"
//       >
//         <div
//           className="card"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {item.images.map((image, index) => (
//             <img
//               key={index}
//               className="card-media object-top"
//               src={image}
//               alt={`product-${index}`}
//               style={{
//                 transform: `translateX(${(index - currentImage) * 100}%)`,
//               }}
//             />
//           ))}

//           {isHovered && (
//             <div className="indicator flex flex-col items-center space-y-2">
//               <div className="flex gap-4">
//                 {item.images.map((_, index) => (
//                   <button
//                     key={index}
//                     className={`indicator-button ${index === currentImage ? "active" : ""}`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setCurrentImage(index);
//                     }}
//                   />
//                 ))}
//               </div>

//               <div className="flex gap-3">
//                 {wishlist.wishlist && (
//                   <Button variant="contained" color="secondary" sx={{ zIndex: 10 }} onClick={handleAddWishlist}>
//                     {isWishlisted(wishlist.wishlist, item) ? (
//                       <FavoriteIcon sx={{ color: "red" }} />
//                     ) : (
//                       <FavoriteBorderIcon sx={{ color: "gray" }} />
//                     )}
//                   </Button>
//                 )}

//                 {!isHomePage && (
//                   <Button onClick={handleShowChatBot} color="secondary" variant="contained">
//                     <ModeCommentIcon sx={{ color: "orange" }} />
//                   </Button>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
//           {!isHomePage && (
//             <h1 className="font-semibold text-lg">
//               {item.seller?.businessDetails?.businessName}
//             </h1>
//           )}

//           <p>{item.title}</p>

//           <div className="price flex items-center gap-3">
//             <span className="font-semibold text-gray-800">₹{item.sellingPrice}</span>

//             {!isHomePage && item.mrpPrice && (
//               <>
//                 <span className="text thin-line-through text-gray-400">₹{item.mrpPrice}</span>
//                 {item.discountPercent && (
//                   <span className="text-[#f47e24] font-semibold">{item.discountPercent}% off</span>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {showChatBot && (
//         <Modal open onClose={handleCloseChatBot}>
//           <Box sx={style}>
//             <ChatBot handleClose={handleCloseChatBot} productId={item._id} />
//           </Box>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default ProductCard;















// import "./ProductCard.css";
// import React, { useState, useEffect } from "react";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ModeCommentIcon from "@mui/icons-material/ModeComment";
// import { Box, Button, Modal } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import type { Product } from "../../../../types/productTypes";
// import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
// import { addProductToWishlist } from "../../../../Redux Toolkit/Customer/WishlistSlice";
// import { isWishlisted } from "../../../../util/isWishlisted";
// import ChatBot from "../../ChatBot/ChatBot";

// interface ProductCardProps {
//   item: Product;
//   categoryId?: string;
//   isHomePage?: boolean;
// }

// const style = {
//   position: "absolute" as const,
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "auto",
//   borderRadius: ".5rem",
//   boxShadow: 24,
// };

// /* 🔥 Helper: Build full image URL */
// const buildImageUrl = (image: string): string => {
//   if (!image) {
//     return "https://via.placeholder.com/300x300?text=No+Image";
//   }
//   // अगर already full URL है (http/https) तो directly return करो
//   if (image.startsWith("http://") || image.startsWith("https://")) {
//     return image;
//   }
//   // अगर data URI है (base64)
//   if (image.startsWith("data:")) {
//     return image;
//   }
//   // वरना backend URL prepend करो
//   const backendUrl =
//     import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
//   return `${backendUrl}${image.startsWith("/") ? image : `/${image}`}`;
// };

// const ProductCard: React.FC<ProductCardProps> = ({
//   item,
//   categoryId,
//   isHomePage = false,
// }) => {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [showChatBot, setShowChatBot] = useState(false);

//   const { wishlist } = useAppSelector((store) => store);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const handleAddWishlist = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.stopPropagation();
//     if (item._id) dispatch(addProductToWishlist({ productId: item._id }));
//   };

//   const handleShowChatBot = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.stopPropagation();
//     setShowChatBot(true);
//   };

//   const handleCloseChatBot = (
//     event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
//   ) => {
//     event.stopPropagation();
//     setShowChatBot(false);
//   };

//   useEffect(() => {
//     let interval: number | undefined;
//     if (isHovered && item.images?.length) {
//       interval = window.setInterval(() => {
//         setCurrentImage((prev) => (prev + 1) % item.images.length);
//       }, 1000);
//     }
//     return () => {
//       if (interval) window.clearInterval(interval);
//     };
//   }, [isHovered, item.images]);

//   const resolvedCategoryId = categoryId || item.category?.categoryId;

//   // ✅ Safe: अगर images empty हैं तो placeholder दो
//   const images =
//     item.images && item.images.length > 0
//       ? item.images
//       : ["https://via.placeholder.com/300x300?text=No+Image"];

//   return (
//     <>
//       <div
//         onClick={() =>
//           navigate(
//             `/product-details/${resolvedCategoryId}/${item.title}/${item._id}`
//           )
//         }
//         className="group px-4 relative cursor-pointer"
//       >
//         <div
//           className="card"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {/* 🔥 IMAGES – with proper URL */}
//           {images.map((image, index) => (
//             <img
//               key={index}
//               className="card-media object-top"
//               src={buildImageUrl(image)}
//               alt={`product-${index}`}
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src =
//                   "https://via.placeholder.com/300x300?text=No+Image";
//               }}
//               style={{
//                 transform: `translateX(${(index - currentImage) * 100}%)`,
//               }}
//             />
//           ))}

//           {isHovered && (
//             <div className="indicator flex flex-col items-center space-y-2">
//               <div className="flex gap-4">
//                 {images.map((_, index) => (
//                   <button
//                     key={index}
//                     className={`indicator-button ${
//                       index === currentImage ? "active" : ""
//                     }`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setCurrentImage(index);
//                     }}
//                   />
//                 ))}
//               </div>

//               <div className="flex gap-3">
//                 {wishlist.wishlist && (
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     sx={{ zIndex: 10 }}
//                     onClick={handleAddWishlist}
//                   >
//                     {isWishlisted(wishlist.wishlist, item) ? (
//                       <FavoriteIcon sx={{ color: "red" }} />
//                     ) : (
//                       <FavoriteBorderIcon sx={{ color: "gray" }} />
//                     )}
//                   </Button>
//                 )}

//                 {!isHomePage && (
//                   <Button
//                     onClick={handleShowChatBot}
//                     color="secondary"
//                     variant="contained"
//                   >
//                     <ModeCommentIcon sx={{ color: "orange" }} />
//                   </Button>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
//           {!isHomePage && (
//             <h1 className="font-semibold text-lg">
//               {item.seller?.businessDetails?.businessName}
//             </h1>
//           )}

//           <p>{item.title}</p>

//           <div className="price flex items-center gap-3">
//             <span className="font-semibold text-gray-800">
//               ₹{item.sellingPrice}
//             </span>

//             {!isHomePage && item.mrpPrice && (
//               <>
//                 <span className="text thin-line-through text-gray-400">
//                   ₹{item.mrpPrice}
//                 </span>
//                 {item.discountPercent && (
//                   <span className="text-[#f47e24] font-semibold">
//                     {item.discountPercent}% off
//                   </span>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {showChatBot && (
//         <Modal open onClose={handleCloseChatBot}>
//           <Box sx={style}>
//             <ChatBot handleClose={handleCloseChatBot} productId={item._id} />
//           </Box>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default ProductCard;








// import "./ProductCard.css";
// import React, { useState, useEffect } from "react";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ModeCommentIcon from "@mui/icons-material/ModeComment";
// import { Box, Button, Modal } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import type { Product } from "../../../../types/productTypes";
// import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
// import { addProductToWishlist } from "../../../../Redux Toolkit/Customer/WishlistSlice";
// import { isWishlisted } from "../../../../util/isWishlisted";
// import ChatBot from "../../ChatBot/ChatBot";

// interface ProductCardProps {
//   item: Product;
//   categoryId?: string;
//   isHomePage?: boolean;
// }

// const style = {
//   position: "absolute" as const,
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "auto",
//   borderRadius: ".5rem",
//   boxShadow: 24,
// };

// const buildImageUrl = (image: string): string => {
//   if (!image) return "https://via.placeholder.com/300x300?text=No+Image";
//   if (image.startsWith("http://") || image.startsWith("https://")) return image;
//   if (image.startsWith("data:")) return image;
//   const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
//   return `${backendUrl}${image.startsWith("/") ? image : `/${image}`}`;
// };

// const ProductCard: React.FC<ProductCardProps> = ({
//   item,
//   categoryId,
//   isHomePage = false,
// }) => {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [showChatBot, setShowChatBot] = useState(false);

//   const { wishlist } = useAppSelector((store) => store);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   /* 🔥 OUT OF STOCK CHECK */
//   const isOutOfStock = !item.quantity || item.quantity <= 0;
//   const isLowStock = !isOutOfStock && item.quantity && item.quantity <= 5;

//   const handleAddWishlist = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.stopPropagation();
//     if (item._id) dispatch(addProductToWishlist({ productId: item._id }));
//   };

//   const handleShowChatBot = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.stopPropagation();
//     setShowChatBot(true);
//   };

//   const handleCloseChatBot = (
//     event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
//   ) => {
//     event.stopPropagation();
//     setShowChatBot(false);
//   };

//   useEffect(() => {
//     let interval: number | undefined;
//     if (isHovered && item.images?.length && !isOutOfStock) {
//       interval = window.setInterval(() => {
//         setCurrentImage((prev) => (prev + 1) % item.images.length);
//       }, 1000);
//     }
//     return () => {
//       if (interval) window.clearInterval(interval);
//     };
//   }, [isHovered, item.images, isOutOfStock]);

//   const resolvedCategoryId = categoryId || item.category?.categoryId;

//   const images =
//     item.images && item.images.length > 0
//       ? item.images
//       : ["https://via.placeholder.com/300x300?text=No+Image"];

//   return (
//     <>
//       <div
//         onClick={() =>
//           navigate(
//             `/product-details/${resolvedCategoryId}/${item.title}/${item._id}`
//           )
//         }
//         className="group px-4 relative cursor-pointer"
//       >
//         <div
//           className="card relative"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {/* 🔥 OUT OF STOCK OVERLAY */}
//           {isOutOfStock && (
//             <div className="absolute inset-0 bg-black/40 z-20 flex items-center justify-center rounded-lg">
//               <div className="bg-white px-4 py-2 rounded-lg shadow-xl border-2 border-red-500 rotate-[-3deg]">
//                 <p className="text-red-600 font-extrabold text-sm uppercase tracking-wider text-center">
//                   🚫 Out of Stock
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* 🔥 LOW STOCK BADGE */}
//           {isLowStock && (
//             <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2.5 py-1 rounded-md shadow-lg">
//               <p className="text-[10px] font-bold uppercase tracking-wide">
//                 ⚡ Only {item.quantity} left!
//               </p>
//             </div>
//           )}

//           {/* IMAGES */}
//           {images.map((image, index) => (
//             <img
//               key={index}
//               className="card-media object-top"
//               src={buildImageUrl(image)}
//               alt={`product-${index}`}
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src =
//                   "https://via.placeholder.com/300x300?text=No+Image";
//               }}
//               style={{
//                 transform: `translateX(${(index - currentImage) * 100}%)`,
//                 filter: isOutOfStock ? "grayscale(70%)" : "none",
//               }}
//             />
//           ))}

//           {/* HOVER ACTIONS */}
//           {isHovered && (
//             <div className="indicator flex flex-col items-center space-y-2">
//               {!isOutOfStock && (
//                 <div className="flex gap-4">
//                   {images.map((_, index) => (
//                     <button
//                       key={index}
//                       className={`indicator-button ${
//                         index === currentImage ? "active" : ""
//                       }`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setCurrentImage(index);
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}

//               <div className="flex gap-3">
//                 {wishlist.wishlist && (
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     sx={{ zIndex: 10 }}
//                     onClick={handleAddWishlist}
//                   >
//                     {isWishlisted(wishlist.wishlist, item) ? (
//                       <FavoriteIcon sx={{ color: "red" }} />
//                     ) : (
//                       <FavoriteBorderIcon sx={{ color: "gray" }} />
//                     )}
//                   </Button>
//                 )}

//                 {!isHomePage && !isOutOfStock && (
//                   <Button
//                     onClick={handleShowChatBot}
//                     color="secondary"
//                     variant="contained"
//                   >
//                     <ModeCommentIcon sx={{ color: "orange" }} />
//                   </Button>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* DETAILS */}
//         <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
//           {!isHomePage && (
//             <h1 className="font-semibold text-lg">
//               {item.seller?.businessDetails?.businessName}
//             </h1>
//           )}

//           <p className={isOutOfStock ? "text-gray-400" : "text-gray-800"}>
//             {item.title}
//           </p>

//           <div className="price flex items-center gap-3">
//             <span
//               className={`font-semibold ${
//                 isOutOfStock ? "text-gray-400" : "text-gray-800"
//               }`}
//             >
//               ₹{item.sellingPrice}
//             </span>

//             {!isHomePage && item.mrpPrice && (
//               <>
//                 <span className="text thin-line-through text-gray-400">
//                   ₹{item.mrpPrice}
//                 </span>
//                 {item.discountPercent && (
//                   <span className="text-[#f47e24] font-semibold">
//                     {item.discountPercent}% off
//                   </span>
//                 )}
//               </>
//             )}
//           </div>

//           {/* OUT OF STOCK TEXT */}
//           {isOutOfStock && (
//             <p className="text-red-600 font-bold text-xs mt-1">
//               Currently Unavailable
//             </p>
//           )}
//         </div>
//       </div>

//       {showChatBot && (
//         <Modal open onClose={handleCloseChatBot}>
//           <Box sx={style}>
//             <ChatBot handleClose={handleCloseChatBot} productId={item._id} />
//           </Box>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default ProductCard;































// import "./ProductCard.css";
// import React, { useState, useEffect } from "react";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ModeCommentIcon from "@mui/icons-material/ModeComment";
// import { Box, Button, Modal } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import type { Product } from "../../../../types/productTypes";
// import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
// import { addProductToWishlist } from "../../../../Redux Toolkit/Customer/WishlistSlice";
// import { isWishlisted } from "../../../../util/isWishlisted";
// import ChatBot from "../../ChatBot/ChatBot";

// // 🔥 API CONFIG IMPORT
// import {api} from "../../../../Config/Api";

// interface ProductCardProps {
//   item: Product;
//   categoryId?: string;
//   isHomePage?: boolean;
// }

// const style = {
//   position: "absolute" as const,
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "auto",
//   borderRadius: ".5rem",
//   boxShadow: 24,
// };

// /* ═══════════════════════════════════════════════
//    🔥 BUILD IMAGE URL — API CONFIG KE HISAAB SE
//    ═══════════════════════════════════════════════ */
// const buildImageUrl = (image: string): string => {
//   if (!image) return "https://via.placeholder.com/300x300?text=No+Image";
//   if (image.startsWith("http://") || image.startsWith("https://")) return image;
//   if (image.startsWith("data:")) return image;

//   // 🔥 api.ts se baseURL uthao
//   let baseURL = "";
//   if (api && api.defaults && api.defaults.baseURL) {
//     baseURL = api.defaults.baseURL;
//   }

//   // Safety fallback
//   if (!baseURL) {
//     console.warn("⚠️ API baseURL not found in config/api.ts");
//     return image.startsWith("/") ? image : `/${image}`;
//   }

//   // /api suffix hata do (kyunki images root pe hote hain)
//   const rootURL = baseURL.replace(/\/api\/?$/, "").replace(/\/$/, "");

//   return `${rootURL}${image.startsWith("/") ? image : `/${image}`}`;
// };

// const ProductCard: React.FC<ProductCardProps> = ({
//   item,
//   categoryId,
//   isHomePage = false,
// }) => {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [showChatBot, setShowChatBot] = useState(false);

//   const { wishlist } = useAppSelector((store) => store);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   /* 🔥 OUT OF STOCK CHECK */
//   const isOutOfStock = !item.quantity || item.quantity <= 0;
//   const isLowStock = !isOutOfStock && item.quantity && item.quantity <= 5;

//   const handleAddWishlist = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.stopPropagation();
//     if (item._id) dispatch(addProductToWishlist({ productId: item._id }));
//   };

//   const handleShowChatBot = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.stopPropagation();
//     setShowChatBot(true);
//   };

//   const handleCloseChatBot = (
//     event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
//   ) => {
//     event.stopPropagation();
//     setShowChatBot(false);
//   };

//   useEffect(() => {
//     let interval: number | undefined;
//     if (isHovered && item.images?.length && !isOutOfStock) {
//       interval = window.setInterval(() => {
//         setCurrentImage((prev) => (prev + 1) % item.images.length);
//       }, 1000);
//     }
//     return () => {
//       if (interval) window.clearInterval(interval);
//     };
//   }, [isHovered, item.images, isOutOfStock]);

//   const resolvedCategoryId = categoryId || item.category?.categoryId;

//   const images =
//     item.images && item.images.length > 0
//       ? item.images
//       : ["https://via.placeholder.com/300x300?text=No+Image"];

//   return (
//     <>
//       <div
//         onClick={() =>
//           navigate(
//             `/product-details/${resolvedCategoryId}/${item.title}/${item._id}`
//           )
//         }
//         className="group px-4 relative cursor-pointer"
//       >
//         <div
//           className="card relative"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {/* 🔥 OUT OF STOCK OVERLAY */}
//           {isOutOfStock && (
//             <div className="absolute inset-0 bg-black/40 z-20 flex items-center justify-center rounded-lg">
//               <div className="bg-white px-4 py-2 rounded-lg shadow-xl border-2 border-red-500 rotate-[-3deg]">
//                 <p className="text-red-600 font-extrabold text-sm uppercase tracking-wider text-center">
//                   🚫 Out of Stock
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* 🔥 LOW STOCK BADGE */}
//           {isLowStock && (
//             <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2.5 py-1 rounded-md shadow-lg">
//               <p className="text-[10px] font-bold uppercase tracking-wide">
//                 ⚡ Only {item.quantity} left!
//               </p>
//             </div>
//           )}

//           {/* IMAGES */}
//           {images.map((image, index) => (
//             <img
//               key={index}
//               className="card-media object-top"
//               src={buildImageUrl(image)}
//               alt={`product-${index}`}
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src =
//                   "https://via.placeholder.com/300x300?text=No+Image";
//               }}
//               style={{
//                 transform: `translateX(${(index - currentImage) * 100}%)`,
//                 filter: isOutOfStock ? "grayscale(70%)" : "none",
//               }}
//             />
//           ))}

//           {/* HOVER ACTIONS */}
//           {isHovered && (
//             <div className="indicator flex flex-col items-center space-y-2">
//               {!isOutOfStock && (
//                 <div className="flex gap-4">
//                   {images.map((_, index) => (
//                     <button
//                       key={index}
//                       className={`indicator-button ${
//                         index === currentImage ? "active" : ""
//                       }`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setCurrentImage(index);
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}

//               <div className="flex gap-3">
//                 {wishlist.wishlist && (
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     sx={{ zIndex: 10 }}
//                     onClick={handleAddWishlist}
//                   >
//                     {isWishlisted(wishlist.wishlist, item) ? (
//                       <FavoriteIcon sx={{ color: "red" }} />
//                     ) : (
//                       <FavoriteBorderIcon sx={{ color: "gray" }} />
//                     )}
//                   </Button>
//                 )}

//                 {!isHomePage && !isOutOfStock && (
//                   <Button
//                     onClick={handleShowChatBot}
//                     color="secondary"
//                     variant="contained"
//                   >
//                     <ModeCommentIcon sx={{ color: "orange" }} />
//                   </Button>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* DETAILS */}
//         <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
//           {!isHomePage && (
//             <h1 className="font-semibold text-lg">
//               {item.seller?.businessDetails?.businessName}
//             </h1>
//           )}

//           <p className={isOutOfStock ? "text-gray-400" : "text-gray-800"}>
//             {item.title}
//           </p>

//           <div className="price flex items-center gap-3">
//             <span
//               className={`font-semibold ${
//                 isOutOfStock ? "text-gray-400" : "text-gray-800"
//               }`}
//             >
//               ₹{item.sellingPrice}
//             </span>

//             {!isHomePage && item.mrpPrice && (
//               <>
//                 <span className="text thin-line-through text-gray-400">
//                   ₹{item.mrpPrice}
//                 </span>
//                 {item.discountPercent && (
//                   <span className="text-[#f47e24] font-semibold">
//                     {item.discountPercent}% off
//                   </span>
//                 )}
//               </>
//             )}
//           </div>

//           {/* OUT OF STOCK TEXT */}
//           {isOutOfStock && (
//             <p className="text-red-600 font-bold text-xs mt-1">
//               Currently Unavailable
//             </p>
//           )}
//         </div>
//       </div>

//       {showChatBot && (
//         <Modal open onClose={handleCloseChatBot}>
//           <Box sx={style}>
//             <ChatBot handleClose={handleCloseChatBot} productId={item._id} />
//           </Box>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default ProductCard;
























import "./ProductCard.css";
import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { Box, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
import { addProductToWishlist } from "../../../../Redux Toolkit/Customer/WishlistSlice";
import { isWishlisted } from "../../../../util/isWishlisted";
import ChatBot from "../../ChatBot/ChatBot";
import { api } from "../../../../Config/Api";

interface ProductCardProps {
  item: any;
  categoryId?: string;
  isHomePage?: boolean;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  borderRadius: ".5rem",
  boxShadow: 24,
};

/* ═══════════════════════════════════════════════
   🔥 IMAGE URL — Computed ONCE
   ═══════════════════════════════════════════════ */
const API_BASE = api?.defaults?.baseURL || "";
const ROOT_URL = API_BASE.replace(/\/api\/?$/, "").replace(/\/$/, "");

const buildImageUrl = (image: string): string => {
  if (!image) return "https://via.placeholder.com/300x300?text=No+Image";
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  if (image.startsWith("data:")) return image;
  if (!ROOT_URL) return image.startsWith("/") ? image : `/${image}`;
  return `${ROOT_URL}${image.startsWith("/") ? image : `/${image}`}`;
};

/* ═══════════════════════════════════════════════
   🔥 PRODUCT CARD — Memoized
   ═══════════════════════════════════════════════ */
const ProductCard: React.FC<ProductCardProps> = ({
  item,
  categoryId,
  isHomePage = false,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);

  // 🔥 Selective subscription — sirf wishlist
  const wishlistItems = useAppSelector((store: any) => store.wishlist?.wishlist);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /* 🔥 MEMOIZED VALUES */
  const isOutOfStock = useMemo(
    () => !item.quantity || item.quantity <= 0,
    [item.quantity]
  );

  const isLowStock = useMemo(
    () => !isOutOfStock && item.quantity && item.quantity <= 5,
    [isOutOfStock, item.quantity]
  );

  const images = useMemo(
    () =>
      item.images && item.images.length > 0
        ? item.images
        : ["https://via.placeholder.com/300x300?text=No+Image"],
    [item.images]
  );

  const resolvedCategoryId = categoryId || item.category?.categoryId;

  const productUrl = useMemo(
    () => `/product-details/${resolvedCategoryId}/${item.title}/${item._id}`,
    [resolvedCategoryId, item.title, item._id]
  );

  const wishlisted = useMemo(
    () => wishlistItems && isWishlisted(wishlistItems, item),
    [wishlistItems, item]
  );

  /* 🔥 MEMOIZED HANDLERS */
  const handleAddWishlist = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (item._id) dispatch(addProductToWishlist({ productId: item._id }));
    },
    [dispatch, item._id]
  );

  const handleShowChatBot = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setShowChatBot(true);
    },
    []
  );

  const handleCloseChatBot = useCallback(
    (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
      event.stopPropagation();
      setShowChatBot(false);
    },
    []
  );

  const handleNavigate = useCallback(() => {
    navigate(productUrl);
  }, [navigate, productUrl]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  /* 🔥 AUTO SLIDE — Sirf hover pe, optizimized */
  useEffect(() => {
    if (!isHovered || isOutOfStock || images.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 1500);

    return () => window.clearInterval(interval);
  }, [isHovered, isOutOfStock, images.length]);

  return (
    <>
      <div
        onClick={handleNavigate}
        className="group px-4 relative cursor-pointer"
      >
        <div
          className="card relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* OUT OF STOCK OVERLAY */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/40 z-20 flex items-center justify-center rounded-lg">
              <div className="bg-white px-4 py-2 rounded-lg shadow-xl border-2 border-red-500 rotate-[-3deg]">
                <p className="text-red-600 font-extrabold text-sm uppercase tracking-wider text-center">
                  🚫 Out of Stock
                </p>
              </div>
            </div>
          )}

          {/* LOW STOCK BADGE */}
          {isLowStock && (
            <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2.5 py-1 rounded-md shadow-lg">
              <p className="text-[10px] font-bold uppercase tracking-wide">
                ⚡ Only {item.quantity} left!
              </p>
            </div>
          )}

          {/* IMAGES */}
          {images.map((image: string, index: number) => (
            <img
              key={index}
              className="card-media object-top"
              src={buildImageUrl(image)}
              alt={`product-${index}`}
              loading={index === 0 ? "eager" : "lazy"}   // 🔥 1st image eager, baaki lazy
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/300x300?text=No+Image";
              }}
              style={{
                transform: `translateX(${(index - currentImage) * 100}%)`,
                filter: isOutOfStock ? "grayscale(70%)" : "none",
              }}
            />
          ))}

          {/* HOVER ACTIONS */}
          {isHovered && (
            <div className="indicator flex flex-col items-center space-y-2">
              {!isOutOfStock && images.length > 1 && (
                <div className="flex gap-4">
                  {images.map((_: string, index: number) => (
                    <button
                      key={index}
                      className={`indicator-button ${
                        index === currentImage ? "active" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImage(index);
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                {wishlistItems && (
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ zIndex: 10 }}
                    onClick={handleAddWishlist}
                  >
                    {wishlisted ? (
                      <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: "gray" }} />
                    )}
                  </Button>
                )}

                {!isHomePage && !isOutOfStock && (
                  <Button
                    onClick={handleShowChatBot}
                    color="secondary"
                    variant="contained"
                  >
                    <ModeCommentIcon sx={{ color: "orange" }} />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
          {!isHomePage && (
            <h1 className="font-semibold text-lg">
              {item.seller?.businessDetails?.businessName}
            </h1>
          )}

          <p className={isOutOfStock ? "text-gray-400" : "text-gray-800"}>
            {item.title}
          </p>

          <div className="price flex items-center gap-3">
            <span
              className={`font-semibold ${
                isOutOfStock ? "text-gray-400" : "text-gray-800"
              }`}
            >
              ₹{item.sellingPrice}
            </span>

            {!isHomePage && item.mrpPrice && (
              <>
                <span className="text thin-line-through text-gray-400">
                  ₹{item.mrpPrice}
                </span>
                {item.discountPercent && (
                  <span className="text-[#f47e24] font-semibold">
                    {item.discountPercent}% off
                  </span>
                )}
              </>
            )}
          </div>

          {isOutOfStock && (
            <p className="text-red-600 font-bold text-xs mt-1">
              Currently Unavailable
            </p>
          )}
        </div>
      </div>

      {showChatBot && (
        <Modal open onClose={handleCloseChatBot}>
          <Box sx={style}>
            <ChatBot handleClose={handleCloseChatBot} productId={item._id} />
          </Box>
        </Modal>
      )}
    </>
  );
};

/* 🔥 CUSTOM COMPARISON — Sirf tab re-render jab zaroori ho */
export default memo(ProductCard, (prev, next) => {
  return (
    prev.item._id === next.item._id &&
    prev.item.quantity === next.item.quantity &&
    prev.item.sellingPrice === next.item.sellingPrice &&
    prev.categoryId === next.categoryId &&
    prev.isHomePage === next.isHomePage
  );
});