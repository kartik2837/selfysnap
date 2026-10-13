// import {
//   Avatar,
//   Badge,
//   Box,
//   Button,
//   Drawer,
//   IconButton,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import "./Navbar.css";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import SearchIcon from "@mui/icons-material/Search";
// import MenuIcon from "@mui/icons-material/Menu";
// import CategorySheet from "./CategorySheet";
// import DrawerList from "./DrawerList";
// import { useNavigate } from "react-router-dom";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { FavoriteBorder } from "@mui/icons-material";
// import { fetchMainCategories } from "../../../Redux Toolkit/Admin/MainCategorySlice";

// const Navbar = () => {
//   const [showSheet, setShowSheet] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("men");
//   const [hideCategory, setHideCategory] = useState(false); // <- NEW

//   const theme = useTheme();
//   const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const dispatch = useAppDispatch();
//   const { user, auth, cart, sellers, mainCategory } = useAppSelector(
//     (store) => store
//   );
//   const navigate = useNavigate();
//   const [open, setOpen] = React.useState(false);

//   // Fetch categories
//   useEffect(() => {
//     dispatch(fetchMainCategories(auth.jwt || ""));
//   }, [auth.jwt, dispatch]);

//   // Scroll logic for hiding category bar
//   useEffect(() => {
//     const handleScroll = () => {
//       setHideCategory(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const levelOneCategories = mainCategory.categories?.filter(
//     (cat) => cat.level === 1
//   );

//   const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

//   const becomeSellerClick = () => {
//     if (sellers.profile?._id) navigate("/seller");
//     else navigate("/become-seller");
//   };

//   return (
//     <Box
//       sx={{ zIndex: 2 }}
//       className="sticky top-0 left-0 right-0 bg-white blur-bg bg-opacity-80"
//     >
//       {/* ================= NAVBAR TOP ================= */}
//       <div className="flex items-center justify-between px-3 lg:px-20 h-[65px] lg:h-[70px] border-b">
//         {/* LEFT SECTION */}
//         <div className="flex items-center gap-3 lg:gap-9">
//           <div className="flex items-center gap-2">
//             {!isLarge && (
//               <IconButton onClick={toggleDrawer(true)}>
//                 <MenuIcon
//                   className="text-gray-700"
//                   sx={{ fontSize: isMobile ? 24 : 29 }}
//                 />
//               </IconButton>
//             )}

//             <img
//               src="/logo.jpeg"
//               alt="Selfy Snap"
//               onClick={() => navigate("/")}
//               className="h-7 md:h-10 lg:h-14 cursor-pointer"
//             />
//           </div>
//         </div>

//         {/* RIGHT SECTION */}
//         <div className="flex items-center gap-1 sm:gap-2 lg:gap-6">
//           {/* Desktop/Tablet Search Bar */}
//           <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full w-[300px] lg:w-[500px]">
//             <SearchIcon className="text-gray-500 mr-2" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="bg-transparent outline-none w-full text-sm"
//               onFocus={() => navigate("/search-products")}
//             />
//           </div>







          

//           {/* Mobile Search Icon */}
//           <div className="md:hidden">
//             <IconButton onClick={() => navigate("/search-products")}>
//               <SearchIcon
//                 className="text-gray-700"
//                 sx={{ fontSize: isMobile ? 22 : 26 }}
//               />
//             </IconButton>
//           </div>

//           {/* USER */}
//           {user.user ? (
//             <Button
//               onClick={() => navigate("/account/orders")}
//               className="flex items-center gap-2 min-w-0 px-1 sm:px-2"
//             >
//               <Avatar
//                 sx={{
//                   width: isMobile ? 24 : 29,
//                   height: isMobile ? 24 : 29,
//                 }}
//                 src="https://img.icons8.com/ios7/1200/user-male-circle--v2.jpg"
//               />
//               {!isMobile && (
//                 <h1 className="font-semibold hidden lg:block">
//                   {user.user?.fullName?.split(" ")[0]}
//                 </h1>
//               )}
//             </Button>
//           ) : (
//             <Button
//               variant="contained"
//               size={isMobile ? "small" : "medium"}
//               sx={{
//                 minWidth: isMobile ? "auto" : "auto",
//                 px: isMobile ? 1 : 2,
//                 fontSize: isMobile ? "12px" : "14px",
//               }}
//               startIcon={
//                 !isMobile && <AccountCircleIcon sx={{ fontSize: "16px" }} />
//               }
//               onClick={() => navigate("/login")}
//             >
//               {isMobile ? "Login" : "Login"}
//             </Button>
//           )}

//           {/* WISHLIST */}
//           <IconButton
//             size={isMobile ? "small" : "medium"}
//             onClick={() => navigate("/wishlist")}
//           >
//             <FavoriteBorder
//               sx={{ fontSize: isMobile ? 22 : 29 }}
//               className="text-gray-700"
//             />
//           </IconButton>

//           {/* CART */}
//           <IconButton
//             size={isMobile ? "small" : "medium"}
//             onClick={() => navigate("/cart")}
//           >
//             <Badge
//               badgeContent={cart.cart?.cartItems.length}
//               color="primary"
//               sx={{
//                 "& .MuiBadge-badge": {
//                   fontSize: isMobile ? "10px" : "12px",
//                   minWidth: isMobile ? "16px" : "20px",
//                   height: isMobile ? "16px" : "20px",
//                 },
//               }}
//             >
              
//               <AddShoppingCartIcon
//                 sx={{ fontSize: isMobile ? 22 : 29 }}
//                 className="text-gray-700"
//               />
//             </Badge>
//           </IconButton>

//           {/* SELLER BUTTON DESKTOP ONLY */}
//           {isLarge && (
//             <Button
//               onClick={becomeSellerClick}
//               startIcon={<StorefrontIcon />}
//               variant="outlined"
//             >
//               Become Seller
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* ================= CATEGORY BAR ================= */}
//       {isLarge && (
//         <div className="border-b">
//           <ul
//             className="flex items-center gap-8 px-20 font-medium text-gray-800 overflow-x-auto scrollbar-hide transition-all duration-200 ease-in-out"
//             style={{
//               height: hideCategory ? 0 : 55,           // smooth shrink
//               opacity: hideCategory ? 0 : 1,           // fade effect
//               transform: hideCategory ? "translateY(-100%)" : "translateY(0%)", // slide
//             }}
//           >
//             {levelOneCategories?.map((item) => (
//               <li
//                 key={item.categoryId}
//                 onMouseLeave={() => setShowSheet(false)}
//                 onMouseEnter={() => {
//                   setSelectedCategory(item.categoryId);
//                   setShowSheet(true);
//                 }}
//                 className="whitespace-nowrap hover:text-[#df6b3c] cursor-pointer hover:border-b-2 border-[#df6b3c] flex items-center h-full"
//               >
//                 {item.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* DRAWER */}
//       <Drawer open={open} onClose={toggleDrawer(false)}>
//         <DrawerList toggleDrawer={toggleDrawer} />
//       </Drawer>

//       {/* CATEGORY SHEET */}
//       {showSheet && selectedCategory && (
//         <div
//           onMouseLeave={() => setShowSheet(false)}
//           onMouseEnter={() => setShowSheet(true)}
//           className="categorySheet absolute top-[125px] left-20 right-20"
//         >
//           <CategorySheet
//             setShowSheet={setShowSheet}
//             selectedCategory={selectedCategory}
//           />
//         </div>
//       )}
//     </Box>
//   );
// };

// export default Navbar;





// import NotificationBell from "../../../customer/components/Notification/NotificationBell";
// import {
//   Avatar,
//   Badge,
//   Box,
//   Button,
//   Drawer,
//   IconButton,
//   useMediaQuery,
//   useTheme,
//   Tooltip,
//   CircularProgress,
//   Fade,
//   Paper,
//   InputAdornment,
//   TextField,
// } from "@mui/material";
// import { useState, useEffect, useRef, useCallback } from "react";
// import "./Navbar.css";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import SearchIcon from "@mui/icons-material/Search";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import ClearIcon from "@mui/icons-material/Clear";
// import CategorySheet from "./CategorySheet";
// import DrawerList from "./DrawerList";
// import { useNavigate } from "react-router-dom";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { FavoriteBorder, Share } from "@mui/icons-material";
// import { fetchMainCategories } from "../../../Redux Toolkit/Admin/MainCategorySlice";
// import Reward from "../../components/reward";
// import { searchProduct } from "../../../Redux Toolkit/Customer/ProductSlice";
// import ProductCard from "../../pages/Products/ProductCard/ProductCard";
// import type { Product } from "../../../types/productTypes";

// const FALLBACK_CATEGORIES = [
//   { categoryId: "men", name: "Men", level: 1 },
//   { categoryId: "women", name: "Women", level: 1 },
//   { categoryId: "kids", name: "Kids", level: 1 },
//   { categoryId: "electronics", name: "Electronics", level: 1 },
//   { categoryId: "fashion", name: "Fashion", level: 1 },
//   { categoryId: "home", name: "Home & Living", level: 1 },
// ];

// const Navbar = () => {
//   const [showSheet, setShowSheet] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("men");
//   const [hideCategory, setHideCategory] = useState(false);
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [rewardOpen, setRewardOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
//   const [showResults, setShowResults] = useState(false);
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [searchLoading, setSearchLoading] = useState(false);

//   const searchInputRef = useRef<HTMLInputElement>(null);
//   const resultsRef = useRef<HTMLDivElement>(null);
//   const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const theme = useTheme();
//   const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const dispatch = useAppDispatch();
//   const { user, auth, cart, sellers, mainCategory } = useAppSelector((store) => store);
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchMainCategories(auth.jwt || ""));
//   }, [auth.jwt, dispatch]);

//   useEffect(() => {
//     const handleScroll = () => setHideCategory(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         resultsRef.current &&
//         !resultsRef.current.contains(event.target as Node) &&
//         searchInputRef.current &&
//         !searchInputRef.current.contains(event.target as Node)
//       ) {
//         setShowResults(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const realCategories = mainCategory?.categories?.filter((cat: any) => cat.level === 1) || [];
//   const levelOneCategories = realCategories.length > 0 ? realCategories : FALLBACK_CATEGORIES;

//   const toggleDrawer = (newOpen: boolean) => () => setOpenDrawer(newOpen);

//   const becomeSellerClick = () => {
//     if (sellers?.profile?._id) navigate("/seller");
//     else navigate("/become-seller");
//   };

//   const performSearch = useCallback(async (query: string) => {
//     if (!query.trim()) {
//       setSearchedProducts([]);
//       setShowResults(false);
//       setSearchLoading(false);
//       return;
//     }
//     setSearchLoading(true);
//     try {
//       const data = await dispatch(searchProduct(query)).unwrap();
//       setSearchedProducts(Array.isArray(data) ? data : []);
//       setShowResults(true);
//     } catch (error) {
//       console.error("Search failed:", error);
//       setSearchedProducts([]);
//       setShowResults(true);
//     } finally {
//       setSearchLoading(false);
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     if (!searchQuery.trim()) {
//       setShowResults(false);
//       setSearchedProducts([]);
//       setSearchLoading(false);
//       return;
//     }
//     debounceTimerRef.current = setTimeout(() => {
//       performSearch(searchQuery);
//     }, 500);
//     return () => {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     };
//   }, [searchQuery, performSearch]);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//       performSearch(searchQuery);
//     }
//   };

//   const handleClearResults = () => {
//     setShowResults(false);
//     setSearchQuery("");
//     setSearchedProducts([]);
//   };

//   const handleClearInput = () => {
//     setSearchQuery("");
//     searchInputRef.current?.focus();
//   };

//   const handleProductClick = (productId: string) => {
//     setShowResults(false);
//     setShowMobileSearch(false);
//     navigate(`/product/${productId}`);
//   };

//   const cartItemsCount = cart?.cart?.cartItems?.length ?? 0;

//   return (
//     <Box sx={{ zIndex: 2 }} className="sticky top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm">
//       {/* TOP BAR (logo, search, icons) */}
//       <div className="flex items-center justify-between px-3 lg:px-20 h-[65px] lg:h-[70px] border-b border-gray-100">
//         <div className="flex items-center gap-3 lg:gap-9">
//           <div className="flex items-center gap-2">
//             {!isLarge && (
//               <IconButton onClick={toggleDrawer(true)}>
//                 <MenuIcon className="text-gray-700" sx={{ fontSize: isMobile ? 24 : 29 }} />
//               </IconButton>
//             )}
//             <img
//               src="/logo.jpeg"
//               alt="Selfy Snap"
//               onClick={() => navigate("/")}
//               className="h-7 md:h-10 lg:h-14 cursor-pointer"
//             />
//           </div>
//         </div>

//         <div className="flex items-center gap-1 sm:gap-2 lg:gap-6">
//           {/* Desktop search */}
//           <div className="hidden md:block relative">
//             <TextField
//               inputRef={searchInputRef}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Search products..."
//               variant="outlined"
//               size="small"
//               sx={{
//                 width: { md: "280px", lg: "450px" },
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "40px",
//                   backgroundColor: "#f8fafc",
//                   "&:hover": { backgroundColor: "#f1f5f9" },
//                   "&.Mui-focused": { backgroundColor: "#ffffff", boxShadow: "0 0 0 2px #3b82f6" },
//                 },
//               }}
//               InputProps={{
//                 startAdornment: <InputAdornment position="start"><SearchIcon className="text-gray-400" /></InputAdornment>,
//                 endAdornment: searchQuery ? <InputAdornment position="end"><IconButton size="small" onClick={handleClearInput} edge="end"><ClearIcon fontSize="small" /></IconButton></InputAdornment> : null,
//               }}
//             />
//           </div>

//           {/* Mobile search icon */}
//           <div className="md:hidden">
//             <IconButton onClick={() => setShowMobileSearch(true)}>
//               <SearchIcon className="text-gray-700" sx={{ fontSize: isMobile ? 22 : 26 }} />
//             </IconButton>
//           </div>

//           <Tooltip title="Referral Rewards">
//             <IconButton onClick={() => setRewardOpen(true)} color="primary">
//               <Share sx={{ fontSize: isMobile ? 22 : 26 }} />
//             </IconButton>
//           </Tooltip>

//           {user?.user ? (
//             <Button onClick={() => navigate("/account/orders")} className="flex items-center gap-2 min-w-0 px-1 sm:px-2">
//               <Avatar sx={{ width: isMobile ? 24 : 29, height: isMobile ? 24 : 29 }} src="https://img.icons8.com/ios7/1200/user-male-circle--v2.jpg" />
//               {!isMobile && <h1 className="font-semibold hidden lg:block">{user.user?.fullName?.split(" ")[0]}</h1>}
//             </Button>
//           ) : (
//             <Button
//               variant="contained"
//               size={isMobile ? "small" : "medium"}
//               sx={{ minWidth: "auto", px: isMobile ? 1 : 2, fontSize: isMobile ? "12px" : "14px", borderRadius: "40px", textTransform: "none", boxShadow: "none", "&:hover": { boxShadow: "none" } }}
//               startIcon={!isMobile && <AccountCircleIcon sx={{ fontSize: "16px" }} />}
//               onClick={() => navigate("/login")}
//             >
//               {isMobile ? "Login" : "Login"}
//             </Button>
//           )}

//           <IconButton size={isMobile ? "small" : "medium"} onClick={() => navigate("/wishlist")}>
//             <FavoriteBorder sx={{ fontSize: isMobile ? 22 : 29 }} className="text-gray-700" />
//           </IconButton>

//           <IconButton size={isMobile ? "small" : "medium"} onClick={() => navigate("/cart")}>
//             <Badge badgeContent={cartItemsCount} color="primary" sx={{ "& .MuiBadge-badge": { fontSize: isMobile ? "10px" : "12px", minWidth: isMobile ? "16px" : "20px", height: isMobile ? "16px" : "20px", borderRadius: "50%" } }}>
//               <AddShoppingCartIcon sx={{ fontSize: isMobile ? 22 : 29 }} className="text-gray-700" />
//             </Badge>
//           </IconButton>

//           {isLarge && (
//             <Button onClick={becomeSellerClick} startIcon={<StorefrontIcon />} variant="outlined" sx={{ borderRadius: "40px", textTransform: "none", borderColor: "#e2e8f0", "&:hover": { borderColor: "#3b82f6", backgroundColor: "#eff6ff" } }}>
//               Become Seller
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* ================= CATEGORY BAR – DESKTOP ONLY ================= */}
//       {isLarge && levelOneCategories.length > 0 && (
//         <div className={`border-b border-gray-100 transition-all duration-300 ease-in-out ${hideCategory ? "hidden" : "block"}`}>
//           <ul className="flex items-center gap-8 px-20 py-2 font-medium text-gray-700 whitespace-nowrap overflow-x-auto scrollbar-hide">
//             {levelOneCategories.map((item) => (
//               <li
//                 key={item.categoryId}
//                 onMouseLeave={() => setShowSheet(false)}
//                 onMouseEnter={() => {
//                   setSelectedCategory(item.categoryId);
//                   setShowSheet(true);
//                 }}
//                 className="cursor-pointer hover:text-blue-600 hover:border-b-2 border-blue-600 transition-all duration-200"
//               >
//                 {item.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Search Results Panel (unchanged) */}
//       <Fade in={showResults} timeout={200}>
//         <div ref={resultsRef} className="absolute left-0 right-0 bg-white shadow-2xl z-50 border-t border-gray-100" style={{ top: isLarge ? (hideCategory ? 70 : 125) : 65 }}>
//           <Paper elevation={0} className="rounded-none max-h-[70vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-4 flex justify-between items-center">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 {searchLoading ? <span className="flex items-center gap-2"><CircularProgress size={20} /> Searching...</span> : `Results for "${searchQuery}" (${searchedProducts.length})`}
//               </h2>
//               <IconButton onClick={handleClearResults} size="small"><CloseIcon /></IconButton>
//             </div>
//             <div className="p-6">
//               {!searchLoading && (
//                 <>
//                   {searchedProducts.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//                       {searchedProducts.map((product) => (
//                         <div key={product._id} className="transform transition-all duration-200 hover:scale-105 cursor-pointer" onClick={() => product._id && handleProductClick(product._id)}>
//                           <ProductCard item={product} />
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-16">
//                       <SearchIcon sx={{ fontSize: 60, color: "#cbd5e1" }} />
//                       <p className="text-gray-500 mt-4">No products found for "{searchQuery}"</p>
//                       <p className="text-sm text-gray-400 mt-2">Try different keywords or check spelling</p>
//                     </div>
//                   )}
//                 </>
//               )}
//               {searchLoading && <div className="flex justify-center py-16"><CircularProgress /></div>}
//             </div>
//           </Paper>
//         </div>
//       </Fade>

//       {/* DRAWER (hamburger menu) – categories appear here on all screens */}
//       <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
//         <DrawerList toggleDrawer={toggleDrawer} categories={levelOneCategories} />
//       </Drawer>

//       {showSheet && selectedCategory && (
//         <div onMouseLeave={() => setShowSheet(false)} onMouseEnter={() => setShowSheet(true)} className="categorySheet absolute top-[125px] left-20 right-20 z-10">
//           <CategorySheet setShowSheet={setShowSheet} selectedCategory={selectedCategory} />
//         </div>
//       )}

//       <Drawer anchor="right" open={rewardOpen} onClose={() => setRewardOpen(false)}>
//         <Box sx={{ width: { xs: 300, sm: 400 }, padding: 3 }}><Reward /></Box>
//       </Drawer>

//       {showMobileSearch && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-16 px-4">
//           <Paper elevation={6} className="w-full max-w-md p-4 rounded-2xl">
//             <div className="flex items-center gap-2">
//               <TextField autoFocus fullWidth value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} placeholder="Search products..." variant="outlined" size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: "40px" } }} InputProps={{
//                 startAdornment: <InputAdornment position="start"><SearchIcon className="text-gray-400" /></InputAdornment>,
//                 endAdornment: searchQuery ? <InputAdornment position="end"><IconButton size="small" onClick={handleClearInput}><ClearIcon fontSize="small" /></IconButton></InputAdornment> : null,
//               }} />
//               <IconButton onClick={() => setShowMobileSearch(false)}><CloseIcon /></IconButton>
//             </div>
//             {searchLoading && <div className="flex justify-center mt-4"><CircularProgress size={28} /></div>}
//           </Paper>
//         </div>
//       )}
//     </Box>
//   );
// };

// export default Navbar;







// import NotificationBell from "../../../customer/components/Notification/NotificationBell";
// import {
//   Avatar,
//   Badge,
//   Box,
//   Button,
//   Drawer,
//   IconButton,
//   useMediaQuery,
//   useTheme,
//   Tooltip,
//   CircularProgress,
//   Fade,
//   Paper,
//   InputAdornment,
//   TextField,
// } from "@mui/material";
// import { useState, useEffect, useRef, useCallback } from "react";
// import "./Navbar.css";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import SearchIcon from "@mui/icons-material/Search";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import ClearIcon from "@mui/icons-material/Clear";
// import CategorySheet from "./CategorySheet";
// import DrawerList from "./DrawerList";
// import { useNavigate } from "react-router-dom";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { FavoriteBorder, Share } from "@mui/icons-material";
// import { fetchMainCategories } from "../../../Redux Toolkit/Admin/MainCategorySlice";
// import Reward from "../../components/reward";
// import { searchProduct } from "../../../Redux Toolkit/Customer/ProductSlice";
// import ProductCard from "../../pages/Products/ProductCard/ProductCard";
// import type { Product } from "../../../types/productTypes";

// const FALLBACK_CATEGORIES = [
//   { categoryId: "men", name: "Men", level: 1 },
//   { categoryId: "women", name: "Women", level: 1 },
//   { categoryId: "kids", name: "Kids", level: 1 },
//   { categoryId: "electronics", name: "Electronics", level: 1 },
//   { categoryId: "fashion", name: "Fashion", level: 1 },
//   { categoryId: "home", name: "Home & Living", level: 1 },
// ];

// const Navbar = () => {
//   const [showSheet, setShowSheet] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("men");
//   const [hideCategory, setHideCategory] = useState(false);
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [rewardOpen, setRewardOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
//   const [showResults, setShowResults] = useState(false);
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [searchLoading, setSearchLoading] = useState(false);

//   const searchInputRef = useRef<HTMLInputElement>(null);
//   const resultsRef = useRef<HTMLDivElement>(null);
//   const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const theme = useTheme();
//   const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const dispatch = useAppDispatch();
//   const { user, auth, cart, sellers, mainCategory } = useAppSelector((store) => store);
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchMainCategories(auth.jwt || ""));
//   }, [auth.jwt, dispatch]);

//   useEffect(() => {
//     const handleScroll = () => setHideCategory(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         resultsRef.current &&
//         !resultsRef.current.contains(event.target as Node) &&
//         searchInputRef.current &&
//         !searchInputRef.current.contains(event.target as Node)
//       ) {
//         setShowResults(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const realCategories = mainCategory?.categories?.filter((cat: any) => cat.level === 1) || [];
//   const levelOneCategories = realCategories.length > 0 ? realCategories : FALLBACK_CATEGORIES;

//   const toggleDrawer = (newOpen: boolean) => () => setOpenDrawer(newOpen);

//   const becomeSellerClick = () => {
//     if (sellers?.profile?._id) navigate("/seller");
//     else navigate("/become-seller");
//   };

//   const performSearch = useCallback(async (query: string) => {
//     if (!query.trim()) {
//       setSearchedProducts([]);
//       setShowResults(false);
//       setSearchLoading(false);
//       return;
//     }
//     setSearchLoading(true);
//     try {
//       const data = await dispatch(searchProduct(query)).unwrap();
//       setSearchedProducts(Array.isArray(data) ? data : []);
//       setShowResults(true);
//     } catch (error) {
//       console.error("Search failed:", error);
//       setSearchedProducts([]);
//       setShowResults(true);
//     } finally {
//       setSearchLoading(false);
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     if (!searchQuery.trim()) {
//       setShowResults(false);
//       setSearchedProducts([]);
//       setSearchLoading(false);
//       return;
//     }
//     debounceTimerRef.current = setTimeout(() => {
//       performSearch(searchQuery);
//     }, 500);
//     return () => {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     };
//   }, [searchQuery, performSearch]);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//       performSearch(searchQuery);
//     }
//   };

//   const handleClearResults = () => {
//     setShowResults(false);
//     setSearchQuery("");
//     setSearchedProducts([]);
//   };

//   const handleClearInput = () => {
//     setSearchQuery("");
//     searchInputRef.current?.focus();
//   };

//   const handleProductClick = (productId: string) => {
//     setShowResults(false);
//     setShowMobileSearch(false);
//     navigate(`/product/${productId}`);
//   };

//   const cartItemsCount = cart?.cart?.cartItems?.length ?? 0;

//   return (
//     <Box sx={{ zIndex: 2 }} className="sticky top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm">
//       {/* TOP BAR (logo, search, icons) */}
//       <div className="flex items-center justify-between px-3 lg:px-20 h-[65px] lg:h-[70px] border-b border-gray-100">
//         <div className="flex items-center gap-3 lg:gap-9">
//           <div className="flex items-center gap-2">
//             {!isLarge && (
//               <IconButton onClick={toggleDrawer(true)}>
//                 <MenuIcon className="text-gray-700" sx={{ fontSize: isMobile ? 24 : 29 }} />
//               </IconButton>
//             )}
//             <img
//               src="/logo.jpeg"
//               alt="Selfy Snap"
//               onClick={() => navigate("/")}
//               className="h-7 md:h-10 lg:h-14 cursor-pointer"
//             />
//           </div>
//         </div>

//         <div className="flex items-center gap-1 sm:gap-2 lg:gap-6">
//           {/* Desktop search */}
//           <div className="hidden md:block relative">
//             <TextField
//               inputRef={searchInputRef}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Search products..."
//               variant="outlined"
//               size="small"
//               sx={{
//                 width: { md: "280px", lg: "450px" },
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "40px",
//                   backgroundColor: "#f8fafc",
//                   "&:hover": { backgroundColor: "#f1f5f9" },
//                   "&.Mui-focused": { backgroundColor: "#ffffff", boxShadow: "0 0 0 2px #3b82f6" },
//                 },
//               }}
//               InputProps={{
//                 startAdornment: <InputAdornment position="start"><SearchIcon className="text-gray-400" /></InputAdornment>,
//                 endAdornment: searchQuery ? <InputAdornment position="end"><IconButton size="small" onClick={handleClearInput} edge="end"><ClearIcon fontSize="small" /></IconButton></InputAdornment> : null,
//               }}
//             />
//           </div>

//           {/* Mobile search icon */}
//           <div className="md:hidden">
//             <IconButton onClick={() => setShowMobileSearch(true)}>
//               <SearchIcon className="text-gray-700" sx={{ fontSize: isMobile ? 22 : 26 }} />
//             </IconButton>
//           </div>

//           <Tooltip title="Referral Rewards">
//             <IconButton onClick={() => setRewardOpen(true)} color="primary">
//               <Share sx={{ fontSize: isMobile ? 22 : 26 }} />
//             </IconButton>
//           </Tooltip>

//           {/* ✅ NOTIFICATION BELL – यहाँ जोड़ा गया */}
//           {user?.user && (
//             <Tooltip title="Notifications">
//               <div>
//                 <NotificationBell />
//               </div>
//             </Tooltip>
//           )}

//           {user?.user ? (
//             <Button onClick={() => navigate("/account/orders")} className="flex items-center gap-2 min-w-0 px-1 sm:px-2">
//               <Avatar sx={{ width: isMobile ? 24 : 29, height: isMobile ? 24 : 29 }} src="https://img.icons8.com/ios7/1200/user-male-circle--v2.jpg" />
//               {!isMobile && <h1 className="font-semibold hidden lg:block">{user.user?.fullName?.split(" ")[0]}</h1>}
//             </Button>
//           ) : (
//             <Button
//               variant="contained"
//               size={isMobile ? "small" : "medium"}
//               sx={{ minWidth: "auto", px: isMobile ? 1 : 2, fontSize: isMobile ? "12px" : "14px", borderRadius: "40px", textTransform: "none", boxShadow: "none", "&:hover": { boxShadow: "none" } }}
//               startIcon={!isMobile && <AccountCircleIcon sx={{ fontSize: "16px" }} />}
//               onClick={() => navigate("/login")}
//             >
//               {isMobile ? "Login" : "Login"}
//             </Button>
//           )}

//           <IconButton size={isMobile ? "small" : "medium"} onClick={() => navigate("/wishlist")}>
//             <FavoriteBorder sx={{ fontSize: isMobile ? 22 : 29 }} className="text-gray-700" />
//           </IconButton>

//           <IconButton size={isMobile ? "small" : "medium"} onClick={() => navigate("/cart")}>
//             <Badge badgeContent={cartItemsCount} color="primary" sx={{ "& .MuiBadge-badge": { fontSize: isMobile ? "10px" : "12px", minWidth: isMobile ? "16px" : "20px", height: isMobile ? "16px" : "20px", borderRadius: "50%" } }}>
//               <AddShoppingCartIcon sx={{ fontSize: isMobile ? 22 : 29 }} className="text-gray-700" />
//             </Badge>
//           </IconButton>

//           {isLarge && (
//             <Button onClick={becomeSellerClick} startIcon={<StorefrontIcon />} variant="outlined" sx={{ borderRadius: "40px", textTransform: "none", borderColor: "#e2e8f0", "&:hover": { borderColor: "#3b82f6", backgroundColor: "#eff6ff" } }}>
//               Become Seller
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* ================= CATEGORY BAR – DESKTOP ONLY ================= */}
//       {isLarge && levelOneCategories.length > 0 && (
//         <div className={`border-b border-gray-100 transition-all duration-300 ease-in-out ${hideCategory ? "hidden" : "block"}`}>
//           <ul className="flex items-center gap-8 px-20 py-2 font-medium text-gray-700 whitespace-nowrap overflow-x-auto scrollbar-hide">
//             {levelOneCategories.map((item) => (
//               <li
//                 key={item.categoryId}
//                 onMouseLeave={() => setShowSheet(false)}
//                 onMouseEnter={() => {
//                   setSelectedCategory(item.categoryId);
//                   setShowSheet(true);
//                 }}
//                 className="cursor-pointer hover:text-blue-600 hover:border-b-2 border-blue-600 transition-all duration-200"
//               >
//                 {item.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Search Results Panel */}
//       <Fade in={showResults} timeout={200}>
//         <div ref={resultsRef} className="absolute left-0 right-0 bg-white shadow-2xl z-50 border-t border-gray-100" style={{ top: isLarge ? (hideCategory ? 70 : 125) : 65 }}>
//           <Paper elevation={0} className="rounded-none max-h-[70vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-4 flex justify-between items-center">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 {searchLoading ? <span className="flex items-center gap-2"><CircularProgress size={20} /> Searching...</span> : `Results for "${searchQuery}" (${searchedProducts.length})`}
//               </h2>
//               <IconButton onClick={handleClearResults} size="small"><CloseIcon /></IconButton>
//             </div>
//             <div className="p-6">
//               {!searchLoading && (
//                 <>
//                   {searchedProducts.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//                       {searchedProducts.map((product) => (
//                         <div key={product._id} className="transform transition-all duration-200 hover:scale-105 cursor-pointer" onClick={() => product._id && handleProductClick(product._id)}>
//                           <ProductCard item={product} />
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-16">
//                       <SearchIcon sx={{ fontSize: 60, color: "#cbd5e1" }} />
//                       <p className="text-gray-500 mt-4">No products found for "{searchQuery}"</p>
//                       <p className="text-sm text-gray-400 mt-2">Try different keywords or check spelling</p>
//                     </div>
//                   )}
//                 </>
//               )}
//               {searchLoading && <div className="flex justify-center py-16"><CircularProgress /></div>}
//             </div>
//           </Paper>
//         </div>
//       </Fade>

//       {/* DRAWER (hamburger menu) */}
//       <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
//         <DrawerList toggleDrawer={toggleDrawer} categories={levelOneCategories} />
//       </Drawer>

//       {showSheet && selectedCategory && (
//         <div onMouseLeave={() => setShowSheet(false)} onMouseEnter={() => setShowSheet(true)} className="categorySheet absolute top-[125px] left-20 right-20 z-10">
//           <CategorySheet setShowSheet={setShowSheet} selectedCategory={selectedCategory} />
//         </div>
//       )}

//       <Drawer anchor="right" open={rewardOpen} onClose={() => setRewardOpen(false)}>
//         <Box sx={{ width: { xs: 300, sm: 400 }, padding: 3 }}><Reward /></Box>
//       </Drawer>

//       {showMobileSearch && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-16 px-4">
//           <Paper elevation={6} className="w-full max-w-md p-4 rounded-2xl">
//             <div className="flex items-center gap-2">
//               <TextField autoFocus fullWidth value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} placeholder="Search products..." variant="outlined" size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: "40px" } }} InputProps={{
//                 startAdornment: <InputAdornment position="start"><SearchIcon className="text-gray-400" /></InputAdornment>,
//                 endAdornment: searchQuery ? <InputAdornment position="end"><IconButton size="small" onClick={handleClearInput}><ClearIcon fontSize="small" /></IconButton></InputAdornment> : null,
//               }} />
//               <IconButton onClick={() => setShowMobileSearch(false)}><CloseIcon /></IconButton>
//             </div>
//             {searchLoading && <div className="flex justify-center mt-4"><CircularProgress size={28} /></div>}
//           </Paper>
//         </div>
//       )}
//     </Box>
//   );
// };

// export default Navbar;







// import NotificationBell from "../../../customer/components/Notification/NotificationBell";
// import {
//   Avatar,
//   Badge,
//   Box,
//   Button,
//   Drawer,
//   IconButton,
//   useMediaQuery,
//   useTheme,
//   Tooltip,
//   CircularProgress,
//   Fade,
//   Paper,
//   InputAdornment,
//   TextField,
// } from "@mui/material";
// import { useState, useEffect, useRef, useCallback } from "react";
// import "./Navbar.css";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import SearchIcon from "@mui/icons-material/Search";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import ClearIcon from "@mui/icons-material/Clear";
// import CategorySheet from "./CategorySheet";
// import DrawerList from "./DrawerList";
// import { useNavigate } from "react-router-dom";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { FavoriteBorder, Share } from "@mui/icons-material";
// import { fetchMainCategories } from "../../../Redux Toolkit/Admin/MainCategorySlice";
// import Reward from "../../components/reward";
// import { searchProduct } from "../../../Redux Toolkit/Customer/ProductSlice";
// import type { Product } from "../../../types/productTypes";

// const FALLBACK_CATEGORIES = [
//   { categoryId: "men", name: "Men", level: 1 },
//   { categoryId: "women", name: "Women", level: 1 },
//   { categoryId: "kids", name: "Kids", level: 1 },
//   { categoryId: "electronics", name: "Electronics", level: 1 },
//   { categoryId: "fashion", name: "Fashion", level: 1 },
//   { categoryId: "home", name: "Home & Living", level: 1 },
// ];

// /* 🔥 Helper: Build full image URL */
// const buildImageUrl = (image: string): string => {
//   if (!image) return "https://via.placeholder.com/100x100?text=No+Image";
//   if (image.startsWith("http://") || image.startsWith("https://")) return image;
//   if (image.startsWith("data:")) return image;
//   const backendUrl =
//     import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
//   return `${backendUrl}${image.startsWith("/") ? image : `/${image}`}`;
// };

// const Navbar = () => {
//   const [showSheet, setShowSheet] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("men");
//   const [hideCategory, setHideCategory] = useState(false);
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [rewardOpen, setRewardOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
//   const [showResults, setShowResults] = useState(false);
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [searchLoading, setSearchLoading] = useState(false);

//   const searchInputRef = useRef<HTMLInputElement>(null);
//   const resultsRef = useRef<HTMLDivElement>(null);
//   const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const theme = useTheme();
//   const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const dispatch = useAppDispatch();
//   const { user, auth, cart, sellers, mainCategory } = useAppSelector(
//     (store) => store
//   );
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchMainCategories(auth.jwt || ""));
//   }, [auth.jwt, dispatch]);

//   useEffect(() => {
//     const handleScroll = () => setHideCategory(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         resultsRef.current &&
//         !resultsRef.current.contains(event.target as Node) &&
//         searchInputRef.current &&
//         !searchInputRef.current.contains(event.target as Node)
//       ) {
//         setShowResults(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const realCategories =
//     mainCategory?.categories?.filter((cat: any) => cat.level === 1) || [];
//   const levelOneCategories =
//     realCategories.length > 0 ? realCategories : FALLBACK_CATEGORIES;

//   const toggleDrawer = (newOpen: boolean) => () => setOpenDrawer(newOpen);

//   const becomeSellerClick = () => {
//     if (sellers?.profile?._id) navigate("/seller");
//     else navigate("/become-seller");
//   };

//   /* 🔥 SEARCH */
//   const performSearch = useCallback(
//     async (query: string) => {
//       if (!query.trim()) {
//         setSearchedProducts([]);
//         setShowResults(false);
//         setSearchLoading(false);
//         return;
//       }
//       setSearchLoading(true);
//       try {
//         const data = await dispatch(searchProduct(query)).unwrap();
//         setSearchedProducts(Array.isArray(data) ? data : []);
//         setShowResults(true);
//       } catch (error) {
//         console.error("Search failed:", error);
//         setSearchedProducts([]);
//         setShowResults(true);
//       } finally {
//         setSearchLoading(false);
//       }
//     },
//     [dispatch]
//   );

//   useEffect(() => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     if (!searchQuery.trim()) {
//       setShowResults(false);
//       setSearchedProducts([]);
//       setSearchLoading(false);
//       return;
//     }
//     debounceTimerRef.current = setTimeout(() => {
//       performSearch(searchQuery);
//     }, 500);
//     return () => {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     };
//   }, [searchQuery, performSearch]);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//       performSearch(searchQuery);
//     }
//   };

//   const handleClearResults = () => {
//     setShowResults(false);
//     setSearchQuery("");
//     setSearchedProducts([]);
//   };

//   const handleClearInput = () => {
//     setSearchQuery("");
//     searchInputRef.current?.focus();
//   };

//   const handleProductClick = (product: Product) => {
//     setShowResults(false);
//     setShowMobileSearch(false);
//     const categoryId = product.category?.categoryId || "all";
//     navigate(`/product-details/${categoryId}/${product.title}/${product._id}`);
//   };

//   const handleViewAll = () => {
//     setShowResults(false);
//     setShowMobileSearch(false);
//     navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
//   };

//   const cartItemsCount = cart?.cart?.cartItems?.length ?? 0;

//   return (
//     <Box
//       sx={{ zIndex: 2 }}
//       className="sticky top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm"
//     >
//       {/* TOP BAR */}
//       <div className="flex items-center justify-between px-3 lg:px-20 h-[65px] lg:h-[70px] border-b border-gray-100">
//         <div className="flex items-center gap-3 lg:gap-9">
//           <div className="flex items-center gap-2">
//             {!isLarge && (
//               <IconButton onClick={toggleDrawer(true)}>
//                 <MenuIcon
//                   className="text-gray-700"
//                   sx={{ fontSize: isMobile ? 24 : 29 }}
//                 />
//               </IconButton>
//             )}
//             <img
//               src="/logo.jpeg"
//               alt="Selfy Snap"
//               onClick={() => navigate("/")}
//               className="h-7 md:h-10 lg:h-14 cursor-pointer"
//             />
//           </div>
//         </div>

//         <div className="flex items-center gap-1 sm:gap-2 lg:gap-6">
//           {/* Desktop search */}
//           <div className="hidden md:block relative">
//             <TextField
//               inputRef={searchInputRef}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Search products..."
//               variant="outlined"
//               size="small"
//               sx={{
//                 width: { md: "280px", lg: "450px" },
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "40px",
//                   backgroundColor: "#f8fafc",
//                   "&:hover": { backgroundColor: "#f1f5f9" },
//                   "&.Mui-focused": {
//                     backgroundColor: "#ffffff",
//                     boxShadow: "0 0 0 2px #3b82f6",
//                   },
//                 },
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon className="text-gray-400" />
//                   </InputAdornment>
//                 ),
//                 endAdornment: searchQuery ? (
//                   <InputAdornment position="end">
//                     <IconButton
//                       size="small"
//                       onClick={handleClearInput}
//                       edge="end"
//                     >
//                       <ClearIcon fontSize="small" />
//                     </IconButton>
//                   </InputAdornment>
//                 ) : null,
//               }}
//             />

//             {/* 🔥 COMPACT SEARCH DROPDOWN */}
//             <Fade in={showResults} timeout={200}>
//               <div
//                 ref={resultsRef}
//                 className="absolute bg-white shadow-2xl z-50 border border-gray-200 rounded-2xl mt-2 overflow-hidden"
//                 style={{
//                   top: "100%",
//                   left: 0,
//                   right: 0,
//                   maxHeight: "500px",
//                 }}
//               >
//                 {/* Header */}
//                 <div className="bg-gray-50 border-b border-gray-100 px-4 py-2 flex justify-between items-center">
//                   <span className="text-xs font-semibold text-gray-600">
//                     {searchLoading
//                       ? "Searching..."
//                       : `${searchedProducts.length} result${
//                           searchedProducts.length > 1 ? "s" : ""
//                         }`}
//                   </span>
//                   <IconButton onClick={handleClearResults} size="small">
//                     <CloseIcon fontSize="small" />
//                   </IconButton>
//                 </div>

//                 {/* Results */}
//                 <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
//                   {searchLoading ? (
//                     <div className="flex justify-center py-8">
//                       <CircularProgress size={28} />
//                     </div>
//                   ) : searchedProducts.length > 0 ? (
//                     <>
//                       {searchedProducts.slice(0, 6).map((product) => (
//                         <div
//                           key={product._id}
//                           onClick={() => handleProductClick(product)}
//                           className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition"
//                         >
//                           {/* Thumbnail */}
//                           <img
//                             src={buildImageUrl(product.images?.[0] || "")}
//                             alt={product.title}
//                             className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0"
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).src =
//                                 "https://via.placeholder.com/100x100?text=No+Image";
//                             }}
//                           />

//                           {/* Info */}
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium text-gray-800 truncate">
//                               {product.title}
//                             </p>
//                             <div className="flex items-center gap-2 mt-0.5">
//                               <span className="text-sm font-bold text-gray-900">
//                                 ₹{product.sellingPrice}
//                               </span>
//                               {product.mrpPrice &&
//                                 product.mrpPrice > product.sellingPrice && (
//                                   <>
//                                     <span className="text-xs text-gray-400 line-through">
//                                       ₹{product.mrpPrice}
//                                     </span>
//                                     {product.discountPercent && (
//                                       <span className="text-xs text-green-600 font-semibold">
//                                         {product.discountPercent}% off
//                                       </span>
//                                     )}
//                                   </>
//                                 )}
//                             </div>
//                           </div>
//                         </div>
//                       ))}

//                       {/* View All */}
//                       {searchedProducts.length > 0 && (
//                         <div
//                           onClick={handleViewAll}
//                           className="text-center py-3 bg-indigo-50 hover:bg-indigo-100 cursor-pointer text-sm font-semibold text-indigo-600 transition"
//                         >
//                           View all {searchedProducts.length} results →
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <div className="text-center py-8 px-4">
//                       <SearchIcon
//                         sx={{ fontSize: 40, color: "#cbd5e1" }}
//                       />
//                       <p className="text-sm text-gray-500 mt-2">
//                         No products found for "{searchQuery}"
//                       </p>
//                       <p className="text-xs text-gray-400 mt-1">
//                         Try different keywords
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </Fade>
//           </div>

//           {/* Mobile search icon */}
//           <div className="md:hidden">
//             <IconButton onClick={() => setShowMobileSearch(true)}>
//               <SearchIcon
//                 className="text-gray-700"
//                 sx={{ fontSize: isMobile ? 22 : 26 }}
//               />
//             </IconButton>
//           </div>

//           <Tooltip title="Referral Rewards">
//             <IconButton onClick={() => setRewardOpen(true)} color="primary">
//               <Share sx={{ fontSize: isMobile ? 22 : 26 }} />
//             </IconButton>
//           </Tooltip>

//           {user?.user && (
//             <Tooltip title="Notifications">
//               <div>
//                 <NotificationBell />
//               </div>
//             </Tooltip>
//           )}

//           {user?.user ? (
//             <Button
//               onClick={() => navigate("/account/orders")}
//               className="flex items-center gap-2 min-w-0 px-1 sm:px-2"
//             >
//               <Avatar
//                 sx={{
//                   width: isMobile ? 24 : 29,
//                   height: isMobile ? 24 : 29,
//                 }}
//                 src="https://img.icons8.com/ios7/1200/user-male-circle--v2.jpg"
//               />
//               {!isMobile && (
//                 <h1 className="font-semibold hidden lg:block">
//                   {user.user?.fullName?.split(" ")[0]}
//                 </h1>
//               )}
//             </Button>
//           ) : (
//             <Button
//               variant="contained"
//               size={isMobile ? "small" : "medium"}
//               sx={{
//                 minWidth: "auto",
//                 px: isMobile ? 1 : 2,
//                 fontSize: isMobile ? "12px" : "14px",
//                 borderRadius: "40px",
//                 textTransform: "none",
//                 boxShadow: "none",
//                 "&:hover": { boxShadow: "none" },
//               }}
//               startIcon={
//                 !isMobile && <AccountCircleIcon sx={{ fontSize: "16px" }} />
//               }
//               onClick={() => navigate("/login")}
//             >
//               Login
//             </Button>
//           )}

//           <IconButton
//             size={isMobile ? "small" : "medium"}
//             onClick={() => navigate("/wishlist")}
//           >
//             <FavoriteBorder
//               sx={{ fontSize: isMobile ? 22 : 29 }}
//               className="text-gray-700"
//             />
//           </IconButton>

//           <IconButton
//             size={isMobile ? "small" : "medium"}
//             onClick={() => navigate("/cart")}
//           >
//             <Badge
//               badgeContent={cartItemsCount}
//               color="primary"
//               sx={{
//                 "& .MuiBadge-badge": {
//                   fontSize: isMobile ? "10px" : "12px",
//                   minWidth: isMobile ? "16px" : "20px",
//                   height: isMobile ? "16px" : "20px",
//                   borderRadius: "50%",
//                 },
//               }}
//             >
//               <AddShoppingCartIcon
//                 sx={{ fontSize: isMobile ? 22 : 29 }}
//                 className="text-gray-700"
//               />
//             </Badge>
//           </IconButton>

//           {isLarge && (
//             <Button
//               onClick={becomeSellerClick}
//               startIcon={<StorefrontIcon />}
//               variant="outlined"
//               sx={{
//                 borderRadius: "40px",
//                 textTransform: "none",
//                 borderColor: "#e2e8f0",
//                 "&:hover": {
//                   borderColor: "#3b82f6",
//                   backgroundColor: "#eff6ff",
//                 },
//               }}
//             >
//               Become Seller
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* CATEGORY BAR – DESKTOP ONLY */}
//       {isLarge && levelOneCategories.length > 0 && (
//         <div
//           className={`border-b border-gray-100 transition-all duration-300 ease-in-out ${
//             hideCategory ? "hidden" : "block"
//           }`}
//         >
//           <ul className="flex items-center gap-8 px-20 py-2 font-medium text-gray-700 whitespace-nowrap overflow-x-auto scrollbar-hide">
//             {levelOneCategories.map((item) => (
//               <li
//                 key={item.categoryId}
//                 onMouseLeave={() => setShowSheet(false)}
//                 onMouseEnter={() => {
//                   setSelectedCategory(item.categoryId);
//                   setShowSheet(true);
//                 }}
//                 className="cursor-pointer hover:text-blue-600 hover:border-b-2 border-blue-600 transition-all duration-200"
//               >
//                 {item.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* DRAWER */}
//       <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
//         <DrawerList toggleDrawer={toggleDrawer} categories={levelOneCategories} />
//       </Drawer>

//       {showSheet && selectedCategory && (
//         <div
//           onMouseLeave={() => setShowSheet(false)}
//           onMouseEnter={() => setShowSheet(true)}
//           className="categorySheet absolute top-[125px] left-20 right-20 z-10"
//         >
//           <CategorySheet
//             setShowSheet={setShowSheet}
//             selectedCategory={selectedCategory}
//           />
//         </div>
//       )}

//       <Drawer
//         anchor="right"
//         open={rewardOpen}
//         onClose={() => setRewardOpen(false)}
//       >
//         <Box sx={{ width: { xs: 300, sm: 400 }, padding: 3 }}>
//           <Reward />
//         </Box>
//       </Drawer>

//       {/* 🔥 MOBILE SEARCH OVERLAY */}
//       {showMobileSearch && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-4 px-3">
//           <Paper
//             elevation={6}
//             className="w-full max-w-md rounded-2xl overflow-hidden"
//           >
//             {/* Search input */}
//             <div className="p-3 flex items-center gap-2 border-b border-gray-100">
//               <TextField
//                 autoFocus
//                 fullWidth
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Search products..."
//                 variant="outlined"
//                 size="small"
//                 sx={{
//                   "& .MuiOutlinedInput-root": { borderRadius: "40px" },
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon className="text-gray-400" />
//                     </InputAdornment>
//                   ),
//                   endAdornment: searchQuery ? (
//                     <InputAdornment position="end">
//                       <IconButton size="small" onClick={handleClearInput}>
//                         <ClearIcon fontSize="small" />
//                       </IconButton>
//                     </InputAdornment>
//                   ) : null,
//                 }}
//               />
//               <IconButton onClick={() => setShowMobileSearch(false)}>
//                 <CloseIcon />
//               </IconButton>
//             </div>

//             {/* Mobile results */}
//             <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
//               {searchLoading ? (
//                 <div className="flex justify-center py-8">
//                   <CircularProgress size={28} />
//                 </div>
//               ) : searchedProducts.length > 0 ? (
//                 <>
//                   {searchedProducts.slice(0, 8).map((product) => (
//                     <div
//                       key={product._id}
//                       onClick={() => handleProductClick(product)}
//                       className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition"
//                     >
//                       <img
//                         src={buildImageUrl(product.images?.[0] || "")}
//                         alt={product.title}
//                         className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0"
//                         onError={(e) => {
//                           (e.target as HTMLImageElement).src =
//                             "https://via.placeholder.com/100x100?text=No+Image";
//                         }}
//                       />
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium text-gray-800 truncate">
//                           {product.title}
//                         </p>
//                         <div className="flex items-center gap-2 mt-0.5">
//                           <span className="text-sm font-bold text-gray-900">
//                             ₹{product.sellingPrice}
//                           </span>
//                           {product.mrpPrice &&
//                             product.mrpPrice > product.sellingPrice && (
//                               <span className="text-xs text-gray-400 line-through">
//                                 ₹{product.mrpPrice}
//                               </span>
//                             )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   <div
//                     onClick={handleViewAll}
//                     className="text-center py-3 bg-indigo-50 text-sm font-semibold text-indigo-600"
//                   >
//                     View all {searchedProducts.length} results →
//                   </div>
//                 </>
//               ) : searchQuery ? (
//                 <div className="text-center py-8 px-4">
//                   <SearchIcon sx={{ fontSize: 40, color: "#cbd5e1" }} />
//                   <p className="text-sm text-gray-500 mt-2">
//                     No products found for "{searchQuery}"
//                   </p>
//                 </div>
//               ) : (
//                 <div className="text-center py-8 px-4">
//                   <p className="text-sm text-gray-400">
//                     Type to search products...
//                   </p>
//                 </div>
//               )}
//             </div>
//           </Paper>
//         </div>
//       )}
//     </Box>
//   );
// };

// export default Navbar;




























// import NotificationBell from "../../../customer/components/Notification/NotificationBell";
// import {
//   Avatar,
//   Badge,
//   Box,
//   Button,
//   Drawer,
//   IconButton,
//   useMediaQuery,
//   useTheme,
//   Tooltip,
//   CircularProgress,
//   Fade,
//   Paper,
//   InputAdornment,
//   TextField,
// } from "@mui/material";
// import { useState, useEffect, useRef, useCallback } from "react";
// import "./Navbar.css";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import SearchIcon from "@mui/icons-material/Search";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import ClearIcon from "@mui/icons-material/Clear";
// import CategorySheet from "./CategorySheet";
// import DrawerList from "./DrawerList";
// import { useNavigate } from "react-router-dom";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { FavoriteBorder } from "@mui/icons-material";
// import { fetchMainCategories } from "../../../Redux Toolkit/Admin/MainCategorySlice";
// import { searchProduct } from "../../../Redux Toolkit/Customer/ProductSlice";
// import type { Product } from "../../../types/productTypes";

// const FALLBACK_CATEGORIES = [
//   { categoryId: "men", name: "Men", level: 1 },
//   { categoryId: "women", name: "Women", level: 1 },
//   { categoryId: "kids", name: "Kids", level: 1 },
//   { categoryId: "electronics", name: "Electronics", level: 1 },
//   { categoryId: "fashion", name: "Fashion", level: 1 },
//   { categoryId: "home", name: "Home & Living", level: 1 },
// ];

// /* 🔥 Helper: Build full image URL */
// const buildImageUrl = (image: string): string => {
//   if (!image) return "https://via.placeholder.com/100x100?text=No+Image";
//   if (image.startsWith("http://") || image.startsWith("https://")) return image;
//   if (image.startsWith("data:")) return image;
//   const backendUrl =
//     import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
//   return `${backendUrl}${image.startsWith("/") ? image : `/${image}`}`;
// };

// const Navbar = () => {
//   const [showSheet, setShowSheet] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("men");
//   const [hideCategory, setHideCategory] = useState(false);
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
//   const [showResults, setShowResults] = useState(false);
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [searchLoading, setSearchLoading] = useState(false);

//   const searchInputRef = useRef<HTMLInputElement>(null);
//   const resultsRef = useRef<HTMLDivElement>(null);
//   const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const theme = useTheme();
//   const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const dispatch = useAppDispatch();
//   const { user, auth, cart, sellers, mainCategory } = useAppSelector(
//     (store) => store
//   );
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchMainCategories(auth.jwt || ""));
//   }, [auth.jwt, dispatch]);

//   useEffect(() => {
//     const handleScroll = () => setHideCategory(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         resultsRef.current &&
//         !resultsRef.current.contains(event.target as Node) &&
//         searchInputRef.current &&
//         !searchInputRef.current.contains(event.target as Node)
//       ) {
//         setShowResults(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const realCategories =
//     mainCategory?.categories?.filter((cat: any) => cat.level === 1) || [];
//   const levelOneCategories =
//     realCategories.length > 0 ? realCategories : FALLBACK_CATEGORIES;

//   const toggleDrawer = (newOpen: boolean) => () => setOpenDrawer(newOpen);

//   const becomeSellerClick = () => {
//     if (sellers?.profile?._id) navigate("/seller");
//     else navigate("/become-seller");
//   };

//   /* 🔥 SEARCH */
//   const performSearch = useCallback(
//     async (query: string) => {
//       if (!query.trim()) {
//         setSearchedProducts([]);
//         setShowResults(false);
//         setSearchLoading(false);
//         return;
//       }
//       setSearchLoading(true);
//       try {
//         const data = await dispatch(searchProduct(query)).unwrap();
//         setSearchedProducts(Array.isArray(data) ? data : []);
//         setShowResults(true);
//       } catch (error) {
//         console.error("Search failed:", error);
//         setSearchedProducts([]);
//         setShowResults(true);
//       } finally {
//         setSearchLoading(false);
//       }
//     },
//     [dispatch]
//   );

//   useEffect(() => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     if (!searchQuery.trim()) {
//       setShowResults(false);
//       setSearchedProducts([]);
//       setSearchLoading(false);
//       return;
//     }
//     debounceTimerRef.current = setTimeout(() => {
//       performSearch(searchQuery);
//     }, 500);
//     return () => {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     };
//   }, [searchQuery, performSearch]);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//       performSearch(searchQuery);
//     }
//   };

//   const handleClearResults = () => {
//     setShowResults(false);
//     setSearchQuery("");
//     setSearchedProducts([]);
//   };

//   const handleClearInput = () => {
//     setSearchQuery("");
//     searchInputRef.current?.focus();
//   };

//   const handleProductClick = (product: Product) => {
//     setShowResults(false);
//     setShowMobileSearch(false);
//     const categoryId = product.category?.categoryId || "all";
//     navigate(`/product-details/${categoryId}/${product.title}/${product._id}`);
//   };

//   const handleViewAll = () => {
//     setShowResults(false);
//     setShowMobileSearch(false);
//     navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
//   };

//   const cartItemsCount = cart?.cart?.cartItems?.length ?? 0;

//   return (
//     <Box
//       sx={{ zIndex: 2 }}
//       className="sticky top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm"
//     >
//       {/* 🔥 Navbar Animation Styles */}
//       <style>{`
//         @keyframes bellRing {
//           0%, 100% { transform: rotate(0deg); }
//           10% { transform: rotate(14deg); }
//           20% { transform: rotate(-14deg); }
//           30% { transform: rotate(10deg); }
//           40% { transform: rotate(-10deg); }
//           50% { transform: rotate(6deg); }
//           60% { transform: rotate(-6deg); }
//           70% { transform: rotate(0deg); }
//         }
//         @keyframes bellPulse {
//           0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); }
//           70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
//           100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
//         }
//         .notification-bell-wrapper {
//           position: relative;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 50%;
//           transition: all 0.3s ease;
//         }
//         .notification-bell-wrapper:hover {
//           background-color: rgba(59, 130, 246, 0.08);
//         }
//         .notification-bell-wrapper:hover .notification-bell-icon {
//           animation: bellRing 0.8s ease-in-out;
//         }
//         .notification-bell-wrapper.has-unread {
//           animation: bellPulse 2s infinite;
//         }
//       `}</style>

//       {/* TOP BAR */}
//       <div className="flex items-center justify-between px-3 lg:px-20 h-[65px] lg:h-[70px] border-b border-gray-100">
//         <div className="flex items-center gap-3 lg:gap-9">
//           <div className="flex items-center gap-2">
//             {!isLarge && (
//               <IconButton onClick={toggleDrawer(true)}>
//                 <MenuIcon
//                   className="text-gray-700"
//                   sx={{ fontSize: isMobile ? 24 : 29 }}
//                 />
//               </IconButton>
//             )}
//             <img
//               src="/logo.jpeg"
//               alt="Selfy Snap"
//               onClick={() => navigate("/")}
//               className="h-7 md:h-10 lg:h-14 cursor-pointer"
//             />
//           </div>
//         </div>

//         <div className="flex items-center gap-1 sm:gap-2 lg:gap-6">
//           {/* Desktop search */}
//           <div className="hidden md:block relative">
//             <TextField
//               inputRef={searchInputRef}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Search products..."
//               variant="outlined"
//               size="small"
//               sx={{
//                 width: { md: "280px", lg: "450px" },
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "40px",
//                   backgroundColor: "#f8fafc",
//                   "&:hover": { backgroundColor: "#f1f5f9" },
//                   "&.Mui-focused": {
//                     backgroundColor: "#ffffff",
//                     boxShadow: "0 0 0 2px #3b82f6",
//                   },
//                 },
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon className="text-gray-400" />
//                   </InputAdornment>
//                 ),
//                 endAdornment: searchQuery ? (
//                   <InputAdornment position="end">
//                     <IconButton
//                       size="small"
//                       onClick={handleClearInput}
//                       edge="end"
//                     >
//                       <ClearIcon fontSize="small" />
//                     </IconButton>
//                   </InputAdornment>
//                 ) : null,
//               }}
//             />

//             {/* COMPACT SEARCH DROPDOWN */}
//             <Fade in={showResults} timeout={200}>
//               <div
//                 ref={resultsRef}
//                 className="absolute bg-white shadow-2xl z-50 border border-gray-200 rounded-2xl mt-2 overflow-hidden"
//                 style={{
//                   top: "100%",
//                   left: 0,
//                   right: 0,
//                   maxHeight: "500px",
//                 }}
//               >
//                 <div className="bg-gray-50 border-b border-gray-100 px-4 py-2 flex justify-between items-center">
//                   <span className="text-xs font-semibold text-gray-600">
//                     {searchLoading
//                       ? "Searching..."
//                       : `${searchedProducts.length} result${
//                           searchedProducts.length > 1 ? "s" : ""
//                         }`}
//                   </span>
//                   <IconButton onClick={handleClearResults} size="small">
//                     <CloseIcon fontSize="small" />
//                   </IconButton>
//                 </div>

//                 <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
//                   {searchLoading ? (
//                     <div className="flex justify-center py-8">
//                       <CircularProgress size={28} />
//                     </div>
//                   ) : searchedProducts.length > 0 ? (
//                     <>
//                       {searchedProducts.slice(0, 6).map((product) => (
//                         <div
//                           key={product._id}
//                           onClick={() => handleProductClick(product)}
//                           className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition"
//                         >
//                           <img
//                             src={buildImageUrl(product.images?.[0] || "")}
//                             alt={product.title}
//                             className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0"
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).src =
//                                 "https://via.placeholder.com/100x100?text=No+Image";
//                             }}
//                           />
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium text-gray-800 truncate">
//                               {product.title}
//                             </p>
//                             <div className="flex items-center gap-2 mt-0.5">
//                               <span className="text-sm font-bold text-gray-900">
//                                 ₹{product.sellingPrice}
//                               </span>
//                               {product.mrpPrice &&
//                                 product.mrpPrice > product.sellingPrice && (
//                                   <>
//                                     <span className="text-xs text-gray-400 line-through">
//                                       ₹{product.mrpPrice}
//                                     </span>
//                                     {product.discountPercent && (
//                                       <span className="text-xs text-green-600 font-semibold">
//                                         {product.discountPercent}% off
//                                       </span>
//                                     )}
//                                   </>
//                                 )}
//                             </div>
//                           </div>
//                         </div>
//                       ))}

//                       <div
//                         onClick={handleViewAll}
//                         className="text-center py-3 bg-indigo-50 hover:bg-indigo-100 cursor-pointer text-sm font-semibold text-indigo-600 transition"
//                       >
//                         View all {searchedProducts.length} results →
//                       </div>
//                     </>
//                   ) : (
//                     <div className="text-center py-8 px-4">
//                       <SearchIcon sx={{ fontSize: 40, color: "#cbd5e1" }} />
//                       <p className="text-sm text-gray-500 mt-2">
//                         No products found for "{searchQuery}"
//                       </p>
//                       <p className="text-xs text-gray-400 mt-1">
//                         Try different keywords
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </Fade>
//           </div>

//           {/* Mobile search icon */}
//           <div className="md:hidden">
//             <IconButton onClick={() => setShowMobileSearch(true)}>
//               <SearchIcon
//                 className="text-gray-700"
//                 sx={{ fontSize: isMobile ? 22 : 26 }}
//               />
//             </IconButton>
//           </div>

//           {/* ❌ SHARE / REWARD ICON REMOVED */}

//           {/* ✅ NOTIFICATION BELL WITH ANIMATION */}
//           {user?.user && (
//             <Tooltip title="Notifications" arrow>
//               <div className="notification-bell-wrapper">
//                 <div className="notification-bell-icon">
//                   <NotificationBell />
//                 </div>
//               </div>
//             </Tooltip>
//           )}

//           {user?.user ? (
//             <Button
//               onClick={() => navigate("/account/orders")}
//               className="flex items-center gap-2 min-w-0 px-1 sm:px-2"
//             >
//               <Avatar
//                 sx={{
//                   width: isMobile ? 24 : 29,
//                   height: isMobile ? 24 : 29,
//                 }}
//                 src="https://img.icons8.com/ios7/1200/user-male-circle--v2.jpg"
//               />
//               {!isMobile && (
//                 <h1 className="font-semibold hidden lg:block">
//                   {user.user?.fullName?.split(" ")[0]}
//                 </h1>
//               )}
//             </Button>
//           ) : (
//             <Button
//               variant="contained"
//               size={isMobile ? "small" : "medium"}
//               sx={{
//                 minWidth: "auto",
//                 px: isMobile ? 1 : 2,
//                 fontSize: isMobile ? "12px" : "14px",
//                 borderRadius: "40px",
//                 textTransform: "none",
//                 boxShadow: "none",
//                 "&:hover": { boxShadow: "none" },
//               }}
//               startIcon={
//                 !isMobile && <AccountCircleIcon sx={{ fontSize: "16px" }} />
//               }
//               onClick={() => navigate("/login")}
//             >
//               Login
//             </Button>
//           )}

//           <IconButton
//             size={isMobile ? "small" : "medium"}
//             onClick={() => navigate("/wishlist")}
//           >
//             <FavoriteBorder
//               sx={{ fontSize: isMobile ? 22 : 29 }}
//               className="text-gray-700"
//             />
//           </IconButton>

//           <IconButton
//             size={isMobile ? "small" : "medium"}
//             onClick={() => navigate("/cart")}
//           >
//             <Badge
//               badgeContent={cartItemsCount}
//               color="primary"
//               sx={{
//                 "& .MuiBadge-badge": {
//                   fontSize: isMobile ? "10px" : "12px",
//                   minWidth: isMobile ? "16px" : "20px",
//                   height: isMobile ? "16px" : "20px",
//                   borderRadius: "50%",
//                 },
//               }}
//             >
//               <AddShoppingCartIcon
//                 sx={{ fontSize: isMobile ? 22 : 29 }}
//                 className="text-gray-700"
//               />
//             </Badge>
//           </IconButton>

//           {isLarge && (
//             <Button
//               onClick={becomeSellerClick}
//               startIcon={<StorefrontIcon />}
//               variant="outlined"
//               sx={{
//                 borderRadius: "40px",
//                 textTransform: "none",
//                 borderColor: "#e2e8f0",
//                 "&:hover": {
//                   borderColor: "#3b82f6",
//                   backgroundColor: "#eff6ff",
//                 },
//               }}
//             >
//               Become Seller
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* CATEGORY BAR – DESKTOP ONLY */}
//       {isLarge && levelOneCategories.length > 0 && (
//         <div
//           className={`border-b border-gray-100 transition-all duration-300 ease-in-out ${
//             hideCategory ? "hidden" : "block"
//           }`}
//         >
//           <ul className="flex items-center gap-8 px-20 py-2 font-medium text-gray-700 whitespace-nowrap overflow-x-auto scrollbar-hide">
//             {levelOneCategories.map((item) => (
//               <li
//                 key={item.categoryId}
//                 onMouseLeave={() => setShowSheet(false)}
//                 onMouseEnter={() => {
//                   setSelectedCategory(item.categoryId);
//                   setShowSheet(true);
//                 }}
//                 className="cursor-pointer hover:text-blue-600 hover:border-b-2 border-blue-600 transition-all duration-200"
//               >
//                 {item.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* DRAWER */}
//       <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
//         <DrawerList toggleDrawer={toggleDrawer} categories={levelOneCategories} />
//       </Drawer>

//       {showSheet && selectedCategory && (
//         <div
//           onMouseLeave={() => setShowSheet(false)}
//           onMouseEnter={() => setShowSheet(true)}
//           className="categorySheet absolute top-[125px] left-20 right-20 z-10"
//         >
//           <CategorySheet
//             setShowSheet={setShowSheet}
//             selectedCategory={selectedCategory}
//           />
//         </div>
//       )}

//       {/* ❌ REWARD DRAWER REMOVED */}

//       {/* MOBILE SEARCH OVERLAY */}
//       {showMobileSearch && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-4 px-3">
//           <Paper
//             elevation={6}
//             className="w-full max-w-md rounded-2xl overflow-hidden"
//           >
//             <div className="p-3 flex items-center gap-2 border-b border-gray-100">
//               <TextField
//                 autoFocus
//                 fullWidth
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Search products..."
//                 variant="outlined"
//                 size="small"
//                 sx={{
//                   "& .MuiOutlinedInput-root": { borderRadius: "40px" },
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon className="text-gray-400" />
//                     </InputAdornment>
//                   ),
//                   endAdornment: searchQuery ? (
//                     <InputAdornment position="end">
//                       <IconButton size="small" onClick={handleClearInput}>
//                         <ClearIcon fontSize="small" />
//                       </IconButton>
//                     </InputAdornment>
//                   ) : null,
//                 }}
//               />
//               <IconButton onClick={() => setShowMobileSearch(false)}>
//                 <CloseIcon />
//               </IconButton>
//             </div>

//             <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
//               {searchLoading ? (
//                 <div className="flex justify-center py-8">
//                   <CircularProgress size={28} />
//                 </div>
//               ) : searchedProducts.length > 0 ? (
//                 <>
//                   {searchedProducts.slice(0, 8).map((product) => (
//                     <div
//                       key={product._id}
//                       onClick={() => handleProductClick(product)}
//                       className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition"
//                     >
//                       <img
//                         src={buildImageUrl(product.images?.[0] || "")}
//                         alt={product.title}
//                         className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0"
//                         onError={(e) => {
//                           (e.target as HTMLImageElement).src =
//                             "https://via.placeholder.com/100x100?text=No+Image";
//                         }}
//                       />
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium text-gray-800 truncate">
//                           {product.title}
//                         </p>
//                         <div className="flex items-center gap-2 mt-0.5">
//                           <span className="text-sm font-bold text-gray-900">
//                             ₹{product.sellingPrice}
//                           </span>
//                           {product.mrpPrice &&
//                             product.mrpPrice > product.sellingPrice && (
//                               <span className="text-xs text-gray-400 line-through">
//                                 ₹{product.mrpPrice}
//                               </span>
//                             )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   <div
//                     onClick={handleViewAll}
//                     className="text-center py-3 bg-indigo-50 text-sm font-semibold text-indigo-600"
//                   >
//                     View all {searchedProducts.length} results →
//                   </div>
//                 </>
//               ) : searchQuery ? (
//                 <div className="text-center py-8 px-4">
//                   <SearchIcon sx={{ fontSize: 40, color: "#cbd5e1" }} />
//                   <p className="text-sm text-gray-500 mt-2">
//                     No products found for "{searchQuery}"
//                   </p>
//                 </div>
//               ) : (
//                 <div className="text-center py-8 px-4">
//                   <p className="text-sm text-gray-400">
//                     Type to search products...
//                   </p>
//                 </div>
//               )}
//             </div>
//           </Paper>
//         </div>
//       )}
//     </Box>
//   );
// };

// export default Navbar;































// import NotificationBell from "../../../customer/components/Notification/NotificationBell";
// import {
//   Avatar,
//   Badge,
//   Box,
//   Button,
//   Drawer,
//   IconButton,
//   useMediaQuery,
//   useTheme,
//   Tooltip,
//   CircularProgress,
//   Fade,
//   Paper,
//   InputAdornment,
//   TextField,
// } from "@mui/material";
// import { useState, useEffect, useRef, useCallback } from "react";
// import "./Navbar.css";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import SearchIcon from "@mui/icons-material/Search";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import ClearIcon from "@mui/icons-material/Clear";
// import CategorySheet from "./CategorySheet";
// import DrawerList from "./DrawerList";
// import { useNavigate } from "react-router-dom";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { FavoriteBorder } from "@mui/icons-material";
// import { fetchMainCategories } from "../../../Redux Toolkit/Admin/MainCategorySlice";
// import { searchProduct } from "../../../Redux Toolkit/Customer/ProductSlice";
// import type { Product } from "../../../types/productTypes";

// // 🔥 API CONFIG IMPORT
// import {api} from "../../../Config/Api";

// const FALLBACK_CATEGORIES = [
//   { categoryId: "men", name: "Men", level: 1 },
//   { categoryId: "women", name: "Women", level: 1 },
//   { categoryId: "kids", name: "Kids", level: 1 },
//   { categoryId: "electronics", name: "Electronics", level: 1 },
//   { categoryId: "fashion", name: "Fashion", level: 1 },
//   { categoryId: "home", name: "Home & Living", level: 1 },
// ];

// /* ═══════════════════════════════════════════════
//    🔥 BUILD IMAGE URL — API CONFIG KE HISAAB SE
//    ═══════════════════════════════════════════════ */
// const buildImageUrl = (image: string): string => {
//   if (!image) return "https://via.placeholder.com/100x100?text=No+Image";
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

// const Navbar = () => {
//   const [showSheet, setShowSheet] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("men");
//   const [hideCategory, setHideCategory] = useState(false);
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
//   const [showResults, setShowResults] = useState(false);
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
//   const [searchLoading, setSearchLoading] = useState(false);

//   const searchInputRef = useRef<HTMLInputElement>(null);
//   const resultsRef = useRef<HTMLDivElement>(null);
//   const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const theme = useTheme();
//   const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const dispatch = useAppDispatch();
//   const { user, auth, cart, sellers, mainCategory } = useAppSelector(
//     (store) => store
//   );
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchMainCategories(auth.jwt || ""));
//   }, [auth.jwt, dispatch]);

//   useEffect(() => {
//     const handleScroll = () => setHideCategory(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         resultsRef.current &&
//         !resultsRef.current.contains(event.target as Node) &&
//         searchInputRef.current &&
//         !searchInputRef.current.contains(event.target as Node)
//       ) {
//         setShowResults(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const realCategories =
//     mainCategory?.categories?.filter((cat: any) => cat.level === 1) || [];
//   const levelOneCategories =
//     realCategories.length > 0 ? realCategories : FALLBACK_CATEGORIES;

//   const toggleDrawer = (newOpen: boolean) => () => setOpenDrawer(newOpen);

//   const becomeSellerClick = () => {
//     if (sellers?.profile?._id) navigate("/seller");
//     else navigate("/become-seller");
//   };

//   /* 🔥 SEARCH */
//   const performSearch = useCallback(
//     async (query: string) => {
//       if (!query.trim()) {
//         setSearchedProducts([]);
//         setShowResults(false);
//         setSearchLoading(false);
//         return;
//       }
//       setSearchLoading(true);
//       try {
//         const data = await dispatch(searchProduct(query)).unwrap();
//         setSearchedProducts(Array.isArray(data) ? data : []);
//         setShowResults(true);
//       } catch (error) {
//         console.error("Search failed:", error);
//         setSearchedProducts([]);
//         setShowResults(true);
//       } finally {
//         setSearchLoading(false);
//       }
//     },
//     [dispatch]
//   );

//   useEffect(() => {
//     if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     if (!searchQuery.trim()) {
//       setShowResults(false);
//       setSearchedProducts([]);
//       setSearchLoading(false);
//       return;
//     }
//     debounceTimerRef.current = setTimeout(() => {
//       performSearch(searchQuery);
//     }, 500);
//     return () => {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//     };
//   }, [searchQuery, performSearch]);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
//       performSearch(searchQuery);
//     }
//   };

//   const handleClearResults = () => {
//     setShowResults(false);
//     setSearchQuery("");
//     setSearchedProducts([]);
//   };

//   const handleClearInput = () => {
//     setSearchQuery("");
//     searchInputRef.current?.focus();
//   };

//   const handleProductClick = (product: Product) => {
//     setShowResults(false);
//     setShowMobileSearch(false);
//     const categoryId = product.category?.categoryId || "all";
//     navigate(`/product-details/${categoryId}/${product.title}/${product._id}`);
//   };

//   const handleViewAll = () => {
//     setShowResults(false);
//     setShowMobileSearch(false);
//     navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
//   };

//   const cartItemsCount = cart?.cart?.cartItems?.length ?? 0;

//   return (
//     <Box
//       sx={{ zIndex: 2 }}
//       className="sticky top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm"
//     >
//       {/* 🔥 Navbar Animation Styles */}
//       <style>{`
//         @keyframes bellRing {
//           0%, 100% { transform: rotate(0deg); }
//           10% { transform: rotate(14deg); }
//           20% { transform: rotate(-14deg); }
//           30% { transform: rotate(10deg); }
//           40% { transform: rotate(-10deg); }
//           50% { transform: rotate(6deg); }
//           60% { transform: rotate(-6deg); }
//           70% { transform: rotate(0deg); }
//         }
//         @keyframes bellPulse {
//           0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); }
//           70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
//           100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
//         }
//         .notification-bell-wrapper {
//           position: relative;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 50%;
//           transition: all 0.3s ease;
//         }
//         .notification-bell-wrapper:hover {
//           background-color: rgba(59, 130, 246, 0.08);
//         }
//         .notification-bell-wrapper:hover .notification-bell-icon {
//           animation: bellRing 0.8s ease-in-out;
//         }
//         .notification-bell-wrapper.has-unread {
//           animation: bellPulse 2s infinite;
//         }
//       `}</style>

//       {/* TOP BAR */}
//       <div className="flex items-center justify-between px-3 lg:px-20 h-[65px] lg:h-[70px] border-b border-gray-100">
//         <div className="flex items-center gap-3 lg:gap-9">
//           <div className="flex items-center gap-2">
//             {!isLarge && (
//               <IconButton onClick={toggleDrawer(true)}>
//                 <MenuIcon
//                   className="text-gray-700"
//                   sx={{ fontSize: isMobile ? 24 : 29 }}
//                 />
//               </IconButton>
//             )}
//             <img
//               src="/logo.jpeg"
//               alt="Selfy Snap"
//               onClick={() => navigate("/")}
//               className="h-7 md:h-10 lg:h-14 cursor-pointer"
//             />
//           </div>
//         </div>

//         <div className="flex items-center gap-1 sm:gap-2 lg:gap-6">
//           {/* Desktop search */}
//           <div className="hidden md:block relative">
//             <TextField
//               inputRef={searchInputRef}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Search products..."
//               variant="outlined"
//               size="small"
//               sx={{
//                 width: { md: "280px", lg: "450px" },
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "40px",
//                   backgroundColor: "#f8fafc",
//                   "&:hover": { backgroundColor: "#f1f5f9" },
//                   "&.Mui-focused": {
//                     backgroundColor: "#ffffff",
//                     boxShadow: "0 0 0 2px #3b82f6",
//                   },
//                 },
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon className="text-gray-400" />
//                   </InputAdornment>
//                 ),
//                 endAdornment: searchQuery ? (
//                   <InputAdornment position="end">
//                     <IconButton
//                       size="small"
//                       onClick={handleClearInput}
//                       edge="end"
//                     >
//                       <ClearIcon fontSize="small" />
//                     </IconButton>
//                   </InputAdornment>
//                 ) : null,
//               }}
//             />

//             {/* COMPACT SEARCH DROPDOWN */}
//             <Fade in={showResults} timeout={200}>
//               <div
//                 ref={resultsRef}
//                 className="absolute bg-white shadow-2xl z-50 border border-gray-200 rounded-2xl mt-2 overflow-hidden"
//                 style={{
//                   top: "100%",
//                   left: 0,
//                   right: 0,
//                   maxHeight: "500px",
//                 }}
//               >
//                 <div className="bg-gray-50 border-b border-gray-100 px-4 py-2 flex justify-between items-center">
//                   <span className="text-xs font-semibold text-gray-600">
//                     {searchLoading
//                       ? "Searching..."
//                       : `${searchedProducts.length} result${
//                           searchedProducts.length > 1 ? "s" : ""
//                         }`}
//                   </span>
//                   <IconButton onClick={handleClearResults} size="small">
//                     <CloseIcon fontSize="small" />
//                   </IconButton>
//                 </div>

//                 <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
//                   {searchLoading ? (
//                     <div className="flex justify-center py-8">
//                       <CircularProgress size={28} />
//                     </div>
//                   ) : searchedProducts.length > 0 ? (
//                     <>
//                       {searchedProducts.slice(0, 6).map((product) => (
//                         <div
//                           key={product._id}
//                           onClick={() => handleProductClick(product)}
//                           className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition"
//                         >
//                           <img
//                             src={buildImageUrl(product.images?.[0] || "")}
//                             alt={product.title}
//                             className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0"
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).src =
//                                 "https://via.placeholder.com/100x100?text=No+Image";
//                             }}
//                           />
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium text-gray-800 truncate">
//                               {product.title}
//                             </p>
//                             <div className="flex items-center gap-2 mt-0.5">
//                               <span className="text-sm font-bold text-gray-900">
//                                 ₹{product.sellingPrice}
//                               </span>
//                               {product.mrpPrice &&
//                                 product.mrpPrice > product.sellingPrice && (
//                                   <>
//                                     <span className="text-xs text-gray-400 line-through">
//                                       ₹{product.mrpPrice}
//                                     </span>
//                                     {product.discountPercent && (
//                                       <span className="text-xs text-green-600 font-semibold">
//                                         {product.discountPercent}% off
//                                       </span>
//                                     )}
//                                   </>
//                                 )}
//                             </div>
//                           </div>
//                         </div>
//                       ))}

//                       <div
//                         onClick={handleViewAll}
//                         className="text-center py-3 bg-indigo-50 hover:bg-indigo-100 cursor-pointer text-sm font-semibold text-indigo-600 transition"
//                       >
//                         View all {searchedProducts.length} results →
//                       </div>
//                     </>
//                   ) : (
//                     <div className="text-center py-8 px-4">
//                       <SearchIcon sx={{ fontSize: 40, color: "#cbd5e1" }} />
//                       <p className="text-sm text-gray-500 mt-2">
//                         No products found for "{searchQuery}"
//                       </p>
//                       <p className="text-xs text-gray-400 mt-1">
//                         Try different keywords
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </Fade>
//           </div>

//           {/* Mobile search icon */}
//           <div className="md:hidden">
//             <IconButton onClick={() => setShowMobileSearch(true)}>
//               <SearchIcon
//                 className="text-gray-700"
//                 sx={{ fontSize: isMobile ? 22 : 26 }}
//               />
//             </IconButton>
//           </div>

//           {/* ✅ NOTIFICATION BELL WITH ANIMATION */}
//           {user?.user && (
//             <Tooltip title="Notifications" arrow>
//               <div className="notification-bell-wrapper">
//                 <div className="notification-bell-icon">
//                   <NotificationBell />
//                 </div>
//               </div>
//             </Tooltip>
//           )}

//           {user?.user ? (
//             <Button
//               onClick={() => navigate("/account/orders")}
//               className="flex items-center gap-2 min-w-0 px-1 sm:px-2"
//             >
//               <Avatar
//                 sx={{
//                   width: isMobile ? 24 : 29,
//                   height: isMobile ? 24 : 29,
//                 }}
//                 src="https://img.icons8.com/ios7/1200/user-male-circle--v2.jpg"
//               />
//               {!isMobile && (
//                 <h1 className="font-semibold hidden lg:block">
//                   {user.user?.fullName?.split(" ")[0]}
//                 </h1>
//               )}
//             </Button>
//           ) : (
//             <Button
//               variant="contained"
//               size={isMobile ? "small" : "medium"}
//               sx={{
//                 minWidth: "auto",
//                 px: isMobile ? 1 : 2,
//                 fontSize: isMobile ? "12px" : "14px",
//                 borderRadius: "40px",
//                 textTransform: "none",
//                 boxShadow: "none",
//                 "&:hover": { boxShadow: "none" },
//               }}
//               startIcon={
//                 !isMobile && <AccountCircleIcon sx={{ fontSize: "16px" }} />
//               }
//               onClick={() => navigate("/login")}
//             >
//               Login
//             </Button>
//           )}

//           <IconButton
//             size={isMobile ? "small" : "medium"}
//             onClick={() => navigate("/wishlist")}
//           >
//             <FavoriteBorder
//               sx={{ fontSize: isMobile ? 22 : 29 }}
//               className="text-gray-700"
//             />
//           </IconButton>

//           <IconButton
//             size={isMobile ? "small" : "medium"}
//             onClick={() => navigate("/cart")}
//           >
//             <Badge
//               badgeContent={cartItemsCount}
//               color="primary"
//               sx={{
//                 "& .MuiBadge-badge": {
//                   fontSize: isMobile ? "10px" : "12px",
//                   minWidth: isMobile ? "16px" : "20px",
//                   height: isMobile ? "16px" : "20px",
//                   borderRadius: "50%",
//                 },
//               }}
//             >
//               <AddShoppingCartIcon
//                 sx={{ fontSize: isMobile ? 22 : 29 }}
//                 className="text-gray-700"
//               />
//             </Badge>
//           </IconButton>

//           {isLarge && (
//             <Button
//               onClick={becomeSellerClick}
//               startIcon={<StorefrontIcon />}
//               variant="outlined"
//               sx={{
//                 borderRadius: "40px",
//                 textTransform: "none",
//                 borderColor: "#e2e8f0",
//                 "&:hover": {
//                   borderColor: "#3b82f6",
//                   backgroundColor: "#eff6ff",
//                 },
//               }}
//             >
//               Become Seller
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* CATEGORY BAR – DESKTOP ONLY */}
//       {isLarge && levelOneCategories.length > 0 && (
//         <div
//           className={`border-b border-gray-100 transition-all duration-300 ease-in-out ${
//             hideCategory ? "hidden" : "block"
//           }`}
//         >
//           <ul className="flex items-center gap-8 px-20 py-2 font-medium text-gray-700 whitespace-nowrap overflow-x-auto scrollbar-hide">
//             {levelOneCategories.map((item) => (
//               <li
//                 key={item.categoryId}
//                 onMouseLeave={() => setShowSheet(false)}
//                 onMouseEnter={() => {
//                   setSelectedCategory(item.categoryId);
//                   setShowSheet(true);
//                 }}
//                 className="cursor-pointer hover:text-blue-600 hover:border-b-2 border-blue-600 transition-all duration-200"
//               >
//                 {item.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* DRAWER */}
//       <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
//         <DrawerList toggleDrawer={toggleDrawer} categories={levelOneCategories} />
//       </Drawer>

//       {showSheet && selectedCategory && (
//         <div
//           onMouseLeave={() => setShowSheet(false)}
//           onMouseEnter={() => setShowSheet(true)}
//           className="categorySheet absolute top-[125px] left-20 right-20 z-10"
//         >
//           <CategorySheet
//             setShowSheet={setShowSheet}
//             selectedCategory={selectedCategory}
//           />
//         </div>
//       )}

//       {/* MOBILE SEARCH OVERLAY */}
//       {showMobileSearch && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-4 px-3">
//           <Paper
//             elevation={6}
//             className="w-full max-w-md rounded-2xl overflow-hidden"
//           >
//             <div className="p-3 flex items-center gap-2 border-b border-gray-100">
//               <TextField
//                 autoFocus
//                 fullWidth
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Search products..."
//                 variant="outlined"
//                 size="small"
//                 sx={{
//                   "& .MuiOutlinedInput-root": { borderRadius: "40px" },
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon className="text-gray-400" />
//                     </InputAdornment>
//                   ),
//                   endAdornment: searchQuery ? (
//                     <InputAdornment position="end">
//                       <IconButton size="small" onClick={handleClearInput}>
//                         <ClearIcon fontSize="small" />
//                       </IconButton>
//                     </InputAdornment>
//                   ) : null,
//                 }}
//               />
//               <IconButton onClick={() => setShowMobileSearch(false)}>
//                 <CloseIcon />
//               </IconButton>
//             </div>

//             <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
//               {searchLoading ? (
//                 <div className="flex justify-center py-8">
//                   <CircularProgress size={28} />
//                 </div>
//               ) : searchedProducts.length > 0 ? (
//                 <>
//                   {searchedProducts.slice(0, 8).map((product) => (
//                     <div
//                       key={product._id}
//                       onClick={() => handleProductClick(product)}
//                       className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition"
//                     >
//                       <img
//                         src={buildImageUrl(product.images?.[0] || "")}
//                         alt={product.title}
//                         className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0"
//                         onError={(e) => {
//                           (e.target as HTMLImageElement).src =
//                             "https://via.placeholder.com/100x100?text=No+Image";
//                         }}
//                       />
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-medium text-gray-800 truncate">
//                           {product.title}
//                         </p>
//                         <div className="flex items-center gap-2 mt-0.5">
//                           <span className="text-sm font-bold text-gray-900">
//                             ₹{product.sellingPrice}
//                           </span>
//                           {product.mrpPrice &&
//                             product.mrpPrice > product.sellingPrice && (
//                               <span className="text-xs text-gray-400 line-through">
//                                 ₹{product.mrpPrice}
//                               </span>
//                             )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   <div
//                     onClick={handleViewAll}
//                     className="text-center py-3 bg-indigo-50 text-sm font-semibold text-indigo-600"
//                   >
//                     View all {searchedProducts.length} results →
//                   </div>
//                 </>
//               ) : searchQuery ? (
//                 <div className="text-center py-8 px-4">
//                   <SearchIcon sx={{ fontSize: 40, color: "#cbd5e1" }} />
//                   <p className="text-sm text-gray-500 mt-2">
//                     No products found for "{searchQuery}"
//                   </p>
//                 </div>
//               ) : (
//                 <div className="text-center py-8 px-4">
//                   <p className="text-sm text-gray-400">
//                     Type to search products...
//                   </p>
//                 </div>
//               )}
//             </div>
//           </Paper>
//         </div>
//       )}
//     </Box>
//   );
// };

// export default Navbar;





















import NotificationBell from "../../../customer/components/Notification/NotificationBell";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Tooltip,
  CircularProgress,
  Fade,
  Paper,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState, useEffect, useRef, useCallback } from "react";
import "./Navbar.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import CategorySheet from "./CategorySheet";
import DrawerList from "./DrawerList";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { FavoriteBorder } from "@mui/icons-material";
import { fetchMainCategories } from "../../../Redux Toolkit/Admin/MainCategorySlice";
import { searchProduct } from "../../../Redux Toolkit/Customer/ProductSlice";
import type { Product } from "../../../types/productTypes";
import { api } from "../../../Config/Api";

const FALLBACK_CATEGORIES = [
  { categoryId: "men", name: "Men", level: 1 },
  { categoryId: "women", name: "Women", level: 1 },
  { categoryId: "kids", name: "Kids", level: 1 },
  { categoryId: "electronics", name: "Electronics", level: 1 },
  { categoryId: "fashion", name: "Fashion", level: 1 },
  { categoryId: "home", name: "Home & Living", level: 1 },
];

/* ═══════════════════════════════════════════════
   🔥 BUILD IMAGE URL
   ═══════════════════════════════════════════════ */
const buildImageUrl = (image: string): string => {
  if (!image) return "https://via.placeholder.com/100x100?text=No+Image";
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  if (image.startsWith("data:")) return image;

  let baseURL = "";
  if (api && api.defaults && api.defaults.baseURL) {
    baseURL = api.defaults.baseURL;
  }

  if (!baseURL) {
    return image.startsWith("/") ? image : `/${image}`;
  }

  const rootURL = baseURL.replace(/\/api\/?$/, "").replace(/\/$/, "");
  return `${rootURL}${image.startsWith("/") ? image : `/${image}`}`;
};

const Navbar = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [hideCategory, setHideCategory] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* 🔥 CATEGORY SHEET DELAY TIMER */
  const hideSheetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useAppDispatch();
  const { user, auth, cart, sellers, mainCategory } = useAppSelector(
    (store) => store
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMainCategories(auth.jwt || ""));
  }, [auth.jwt, dispatch]);

  useEffect(() => {
    const handleScroll = () => setHideCategory(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ═══════════════════════════════════════════════
     🔥 CATEGORY SHEET — DELAY HELPERS
     ═══════════════════════════════════════════════ */
  const scheduleHideSheet = useCallback(() => {
    if (hideSheetTimerRef.current) clearTimeout(hideSheetTimerRef.current);
    hideSheetTimerRef.current = setTimeout(() => {
      setShowSheet(false);
    }, 250);
  }, []);

  const cancelHideSheet = useCallback(() => {
    if (hideSheetTimerRef.current) {
      clearTimeout(hideSheetTimerRef.current);
      hideSheetTimerRef.current = null;
    }
  }, []);

  /* cleanup on unmount */
  useEffect(() => {
    return () => {
      if (hideSheetTimerRef.current) clearTimeout(hideSheetTimerRef.current);
    };
  }, []);

  const realCategories =
    mainCategory?.categories?.filter((cat: any) => cat.level === 1) || [];
  const levelOneCategories =
    realCategories.length > 0 ? realCategories : FALLBACK_CATEGORIES;

  const toggleDrawer = (newOpen: boolean) => () => setOpenDrawer(newOpen);

  const becomeSellerClick = () => {
    if (sellers?.profile?._id) navigate("/seller");
    else navigate("/become-seller");
  };

  /* 🔥 SEARCH */
  const performSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchedProducts([]);
        setShowResults(false);
        setSearchLoading(false);
        return;
      }
      setSearchLoading(true);
      try {
        const data = await dispatch(searchProduct(query)).unwrap();
        setSearchedProducts(Array.isArray(data) ? data : []);
        setShowResults(true);
      } catch (error) {
        console.error("Search failed:", error);
        setSearchedProducts([]);
        setShowResults(true);
      } finally {
        setSearchLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (!searchQuery.trim()) {
      setShowResults(false);
      setSearchedProducts([]);
      setSearchLoading(false);
      return;
    }
    debounceTimerRef.current = setTimeout(() => {
      performSearch(searchQuery);
    }, 500);
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [searchQuery, performSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      performSearch(searchQuery);
    }
  };

  const handleClearResults = () => {
    setShowResults(false);
    setSearchQuery("");
    setSearchedProducts([]);
  };

  const handleClearInput = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

  const handleProductClick = (product: Product) => {
    setShowResults(false);
    setShowMobileSearch(false);
    const categoryId = product.category?.categoryId || "all";
    navigate(`/product-details/${categoryId}/${product.title}/${product._id}`);
  };

  const handleViewAll = () => {
    setShowResults(false);
    setShowMobileSearch(false);
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  const cartItemsCount = cart?.cart?.cartItems?.length ?? 0;

  return (
    <Box
      sx={{ zIndex: 2 }}
      className="sticky top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm"
    >
      <style>{`
        @keyframes bellRing {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-14deg); }
          30% { transform: rotate(10deg); }
          40% { transform: rotate(-10deg); }
          50% { transform: rotate(6deg); }
          60% { transform: rotate(-6deg); }
          70% { transform: rotate(0deg); }
        }
        @keyframes bellPulse {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); }
          70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        .notification-bell-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .notification-bell-wrapper:hover {
          background-color: rgba(59, 130, 246, 0.08);
        }
        .notification-bell-wrapper:hover .notification-bell-icon {
          animation: bellRing 0.8s ease-in-out;
        }
        .notification-bell-wrapper.has-unread {
          animation: bellPulse 2s infinite;
        }
      `}</style>

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-3 lg:px-20 h-[65px] lg:h-[70px] border-b border-gray-100">
        <div className="flex items-center gap-3 lg:gap-9">
          <div className="flex items-center gap-2">
            {!isLarge && (
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon
                  className="text-gray-700"
                  sx={{ fontSize: isMobile ? 24 : 29 }}
                />
              </IconButton>
            )}
            <img
              src="/logo.jpeg"
              alt="Selfy Snap"
              onClick={() => navigate("/")}
              className="h-7 md:h-10 lg:h-14 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 lg:gap-6">
          {/* Desktop search */}
          <div className="hidden md:block relative">
            <TextField
              inputRef={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              variant="outlined"
              size="small"
              sx={{
                width: { md: "280px", lg: "450px" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "40px",
                  backgroundColor: "#f8fafc",
                  "&:hover": { backgroundColor: "#f1f5f9" },
                  "&.Mui-focused": {
                    backgroundColor: "#ffffff",
                    boxShadow: "0 0 0 2px #3b82f6",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="text-gray-400" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={handleClearInput}
                      edge="end"
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />

            <Fade in={showResults} timeout={200}>
              <div
                ref={resultsRef}
                className="absolute bg-white shadow-2xl z-50 border border-gray-200 rounded-2xl mt-2 overflow-hidden"
                style={{
                  top: "100%",
                  left: 0,
                  right: 0,
                  maxHeight: "500px",
                }}
              >
                <div className="bg-gray-50 border-b border-gray-100 px-4 py-2 flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-600">
                    {searchLoading
                      ? "Searching..."
                      : `${searchedProducts.length} result${
                          searchedProducts.length > 1 ? "s" : ""
                        }`}
                  </span>
                  <IconButton onClick={handleClearResults} size="small">
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>

                <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
                  {searchLoading ? (
                    <div className="flex justify-center py-8">
                      <CircularProgress size={28} />
                    </div>
                  ) : searchedProducts.length > 0 ? (
                    <>
                      {searchedProducts.slice(0, 6).map((product) => (
                        <div
                          key={product._id}
                          onClick={() => handleProductClick(product)}
                          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition"
                        >
                          <img
                            src={buildImageUrl(product.images?.[0] || "")}
                            alt={product.title}
                            className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/100x100?text=No+Image";
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {product.title}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-sm font-bold text-gray-900">
                                ₹{product.sellingPrice}
                              </span>
                              {product.mrpPrice &&
                                product.mrpPrice > product.sellingPrice && (
                                  <>
                                    <span className="text-xs text-gray-400 line-through">
                                      ₹{product.mrpPrice}
                                    </span>
                                    {product.discountPercent && (
                                      <span className="text-xs text-green-600 font-semibold">
                                        {product.discountPercent}% off
                                      </span>
                                    )}
                                  </>
                                )}
                            </div>
                          </div>
                        </div>
                      ))}

                      <div
                        onClick={handleViewAll}
                        className="text-center py-3 bg-indigo-50 hover:bg-indigo-100 cursor-pointer text-sm font-semibold text-indigo-600 transition"
                      >
                        View all {searchedProducts.length} results →
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 px-4">
                      <SearchIcon sx={{ fontSize: 40, color: "#cbd5e1" }} />
                      <p className="text-sm text-gray-500 mt-2">
                        No products found for "{searchQuery}"
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Try different keywords
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Fade>
          </div>

          {/* Mobile search icon */}
          <div className="md:hidden">
            <IconButton onClick={() => setShowMobileSearch(true)}>
              <SearchIcon
                className="text-gray-700"
                sx={{ fontSize: isMobile ? 22 : 26 }}
              />
            </IconButton>
          </div>

          {/* NOTIFICATION BELL */}
          {user?.user && (
            <Tooltip title="Notifications" arrow>
              <div className="notification-bell-wrapper">
                <div className="notification-bell-icon">
                  <NotificationBell />
                </div>
              </div>
            </Tooltip>
          )}

          {user?.user ? (
            <Button
              onClick={() => navigate("/account/orders")}
              className="flex items-center gap-2 min-w-0 px-1 sm:px-2"
            >
              <Avatar
                sx={{
                  width: isMobile ? 24 : 29,
                  height: isMobile ? 24 : 29,
                }}
                src="https://img.icons8.com/ios7/1200/user-male-circle--v2.jpg"
              />
              {!isMobile && (
                <h1 className="font-semibold hidden lg:block">
                  {user.user?.fullName?.split(" ")[0]}
                </h1>
              )}
            </Button>
          ) : (
            <Button
              variant="contained"
              size={isMobile ? "small" : "medium"}
              sx={{
                minWidth: "auto",
                px: isMobile ? 1 : 2,
                fontSize: isMobile ? "12px" : "14px",
                borderRadius: "40px",
                textTransform: "none",
                boxShadow: "none",
                "&:hover": { boxShadow: "none" },
              }}
              startIcon={
                !isMobile && <AccountCircleIcon sx={{ fontSize: "16px" }} />
              }
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}

          <IconButton
            size={isMobile ? "small" : "medium"}
            onClick={() => navigate("/wishlist")}
          >
            <FavoriteBorder
              sx={{ fontSize: isMobile ? 22 : 29 }}
              className="text-gray-700"
            />
          </IconButton>

          <IconButton
            size={isMobile ? "small" : "medium"}
            onClick={() => navigate("/cart")}
          >
            <Badge
              badgeContent={cartItemsCount}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: isMobile ? "10px" : "12px",
                  minWidth: isMobile ? "16px" : "20px",
                  height: isMobile ? "16px" : "20px",
                  borderRadius: "50%",
                },
              }}
            >
              <AddShoppingCartIcon
                sx={{ fontSize: isMobile ? 22 : 29 }}
                className="text-gray-700"
              />
            </Badge>
          </IconButton>

          {isLarge && (
            <Button
              onClick={becomeSellerClick}
              startIcon={<StorefrontIcon />}
              variant="outlined"
              sx={{
                borderRadius: "40px",
                textTransform: "none",
                borderColor: "#e2e8f0",
                "&:hover": {
                  borderColor: "#3b82f6",
                  backgroundColor: "#eff6ff",
                },
              }}
            >
              Become Seller
            </Button>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          CATEGORY BAR – DESKTOP ONLY (fixed hover)
          ═══════════════════════════════════════════════ */}
      {isLarge && levelOneCategories.length > 0 && (
        <div
          className={`border-b border-gray-100 transition-all duration-300 ease-in-out ${
            hideCategory ? "hidden" : "block"
          }`}
          onMouseEnter={cancelHideSheet}
          onMouseLeave={scheduleHideSheet}
        >
          <ul className="flex items-center gap-8 px-20 py-2 font-medium text-gray-700 whitespace-nowrap overflow-x-auto scrollbar-hide">
            {levelOneCategories.map((item) => (
              <li
                key={item.categoryId}
                onMouseEnter={() => {
                  cancelHideSheet();
                  setSelectedCategory(item.categoryId);
                  setShowSheet(true);
                }}
                className={`cursor-pointer hover:text-blue-600 transition-all duration-200 pb-1 ${
                  showSheet && selectedCategory === item.categoryId
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : ""
                }`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* DRAWER */}
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} categories={levelOneCategories} />
      </Drawer>

      {/* ═══════════════════════════════════════════════
          CATEGORY SHEET — with delay + gap bridge
          ═══════════════════════════════════════════════ */}
      {showSheet && selectedCategory && isLarge && (
        <div
          onMouseEnter={cancelHideSheet}
          onMouseLeave={scheduleHideSheet}
          className="categorySheet absolute left-20 right-20 z-10"
          style={{
            top: "100%",           // just below navbar bottom
            paddingTop: "8px",     // ✅ invisible bridge — gap cover
          }}
        >
          <CategorySheet
            setShowSheet={setShowSheet}
            selectedCategory={selectedCategory}
          />
        </div>
      )}

      {/* MOBILE SEARCH OVERLAY */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-4 px-3">
          <Paper
            elevation={6}
            className="w-full max-w-md rounded-2xl overflow-hidden"
          >
            <div className="p-3 flex items-center gap-2 border-b border-gray-100">
              <TextField
                autoFocus
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search products..."
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "40px" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={handleClearInput}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                }}
              />
              <IconButton onClick={() => setShowMobileSearch(false)}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
              {searchLoading ? (
                <div className="flex justify-center py-8">
                  <CircularProgress size={28} />
                </div>
              ) : searchedProducts.length > 0 ? (
                <>
                  {searchedProducts.slice(0, 8).map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleProductClick(product)}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition"
                    >
                      <img
                        src={buildImageUrl(product.images?.[0] || "")}
                        alt={product.title}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/100x100?text=No+Image";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {product.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm font-bold text-gray-900">
                            ₹{product.sellingPrice}
                          </span>
                          {product.mrpPrice &&
                            product.mrpPrice > product.sellingPrice && (
                              <span className="text-xs text-gray-400 line-through">
                                ₹{product.mrpPrice}
                              </span>
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div
                    onClick={handleViewAll}
                    className="text-center py-3 bg-indigo-50 text-sm font-semibold text-indigo-600"
                  >
                    View all {searchedProducts.length} results →
                  </div>
                </>
              ) : searchQuery ? (
                <div className="text-center py-8 px-4">
                  <SearchIcon sx={{ fontSize: 40, color: "#cbd5e1" }} />
                  <p className="text-sm text-gray-500 mt-2">
                    No products found for "{searchQuery}"
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 px-4">
                  <p className="text-sm text-gray-400">
                    Type to search products...
                  </p>
                </div>
              )}
            </div>
          </Paper>
        </div>
      )}
    </Box>
  );
};

export default Navbar;