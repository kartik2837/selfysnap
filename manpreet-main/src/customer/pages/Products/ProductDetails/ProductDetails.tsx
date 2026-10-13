// import StarIcon from '@mui/icons-material/Star';
// import { Box, Button, Divider, IconButton, Modal } from '@mui/material';
// import ShieldIcon from '@mui/icons-material/Shield';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
// import { Wallet } from '@mui/icons-material';
// import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from '@mui/icons-material/Add';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FlashOnIcon from '@mui/icons-material/FlashOn';
// import SmilarProduct from '../SimilarProduct/SmilarProduct';
// import ZoomableImage from './ZoomableImage';
// import { useAppDispatch, useAppSelector } from '../../../../Redux Toolkit/Store';
// import { useNavigate, useParams } from 'react-router-dom';
// import { fetchProductById, getAllProducts } from '../../../../Redux Toolkit/Customer/ProductSlice';
// import { addItemToCart } from '../../../../Redux Toolkit/Customer/CartSlice';
// import { addProductToWishlist } from '../../../../Redux Toolkit/Customer/WishlistSlice';
// import { setBuyNowProduct } from '../../../../Redux Toolkit/Customer/BuyNowSlice';
// import { isWishlisted } from '../../../../util/isWishlisted';
// import ProductReviewCard from '../../Review/ProductReviewCard';
// import RatingCard from '../../Review/RatingCard';
// import { fetchReviewsByProductId } from '../../../../Redux Toolkit/Customer/ReviewSlice';
// import { useState, useEffect } from 'react';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: "auto",
//     height: "100%",
//     // bgcolor: 'background.paper',
//     boxShadow: 24,
//     outline: "none",
// };


// const ProductDetails = () => {
//     const [open, setOpen] = useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     const dispatch = useAppDispatch();
//     const { products, review, wishlist } = useAppSelector(store => store)
//     const navigate = useNavigate()
//     const { productId, categoryId } = useParams()
//     const [selectedImage, setSelectedImage] = useState(0);
//     const [quantity, setQuantity] = useState(1);
//     const [selectedSize, setSelectedSize] = useState<string>("");

//     useEffect(() => {
//         if (products.product?.sizes) {
//             const sizes = products.product.sizes;
//             const sizeArray = Array.isArray(sizes)
//                 ? sizes
//                 : (typeof sizes === 'string' ? (sizes as string).split(',').map((s: string) => s.trim()) : []);

//             if (sizeArray.length > 0) {
//                 setSelectedSize(sizeArray[0]);
//             } else {
//                 setSelectedSize("FREE");
//             }
//         } else {
//             setSelectedSize("FREE");
//         }
//     }, [products.product]);


//     useEffect(() => {

//         if (productId) {
//             dispatch(fetchProductById(productId))
//             dispatch(fetchReviewsByProductId({ productId }))
//         }
//         dispatch(getAllProducts({ category: categoryId }));

//     }, [productId])

//     const handleAddCart = () => {
//         dispatch(addItemToCart({
//             jwt: localStorage.getItem('jwt'),
//             request: { productId, size: selectedSize || "FREE", quantity }

//         }))
//     }

//     return (
//         <div className='px-5 lg:px-20 pt-10 '>
//             <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>

//                 <section className='flex flex-col lg:flex-row gap-5'>
//                     {/* Image Thumbnails - Scrollable */}
//                     <div className='w-full lg:w-[15%] flex gap-3 overflow-x-auto lg:overflow-x-visible lg:flex-col py-2'>
//                         {products.product?.images?.map((item, index) => (
//                             <img
//                                 key={index}
//                                 onClick={() => setSelectedImage(index)}
//                                 className='w-[60px] lg:w-full cursor-pointer rounded-md border-2 border-transparent hover:border-orange-500'
//                                 src={item}
//                                 alt=""
//                             />
//                         ))}
//                     </div>

//                     {/* Main Image */}
//                     <div className='w-full lg:w-[85%] relative'>
//                         <img
//                             onClick={handleOpen}
//                             className='w-full rounded-md cursor-zoom-in'
//                             src={products.product?.images?.[selectedImage]}
//                             alt=""
//                         />

//                         {/* Wishlist Heart Icon - Top Right of Image */}
//                         <IconButton
//                             onClick={() => {
//                                 if (!localStorage.getItem('jwt')) {
//                                     navigate('/login');
//                                     return;
//                                 }
//                                 if (products.product?._id) {
//                                     dispatch(addProductToWishlist({ productId: products.product._id }));
//                                 }
//                             }}
//                             sx={{
//                                 position: 'absolute',
//                                 top: 12,
//                                 right: 12,
//                                 bgcolor: 'rgba(255,255,255,0.85)',
//                                 '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
//                                 boxShadow: 2,
//                             }}
//                         >
//                             {products.product && wishlist.wishlist && isWishlisted(wishlist.wishlist, products.product) ? (
//                                 <FavoriteIcon sx={{ color: '#ff4081' }} />
//                             ) : (
//                                 <FavoriteBorderIcon sx={{ color: '#ff4081' }} />
//                             )}
//                         </IconButton>

//                         {/* Description below main image */}
//                         <div className='mt-20 p-4'>
//                             <h2 className='text-lg font-semibold mb-2'>Product Description</h2>
//                             <p className='text-gray-700 border-2 border-gray-50 whitespace-pre-line leading-relaxed rounded p-4'>
//                                 {products.product?.description}
//                             </p>
//                         </div>

//                         {/* Modal for Zoomable Image */}
//                         <Modal
//                             open={open}
//                             onClose={handleClose}
//                             aria-labelledby="modal-modal-title"
//                             aria-describedby="modal-modal-description"
//                         >
//                             <Box sx={{ ...style, maxWidth: "90%", maxHeight: "90%" }}>
//                               <ZoomableImage src={products.product?.images?.[selectedImage] || ""} alt="" />
//                             </Box>
//                         </Modal>
//                     </div>
//                 </section>

//                 <section>
//                     <h1 className='font-bold text-lg text-orange-600'>{products.product?.seller?.businessDetails?.businessName}</h1>
//                     <p className='text-gray-500 font-semibold'>{products.product?.title}</p>

//                     <div className='flex justify-between items-center py-2 border w-[180px] px-3 mt-5'>
//                         <div className='flex gap-1 items-center'>
//                             <span>4</span>
//                             <StarIcon sx={{ color: "#ff9644", fontSize: "17px" }} />
//                         </div>
//                         <Divider orientation="vertical" flexItem />
//                         <span>
//                             358 Ratings
//                         </span>
//                     </div>

//                     <div className='space-y-2'>
//                         <div className='price flex items-center gap-3 mt-5 text-lg'>
//                             <span className='font-semibold text-gray-800' > ₹{products.product?.sellingPrice}</span>
//                             <span className='text thin-line-through text-gray-400 '>₹{products.product?.mrpPrice}</span>
//                             <span className='text-[#ff9644] font-semibold'>{products.product?.discountPercent}% off</span>
//                         </div>
//                         <p className='text-sm'>Inclusive of all taxes. Free Shipping above ₹799.</p>
//                     </div>

//                     <div className='mt-7 space-y-3'>

//                         <div className='flex items-center gap-4'>
//                             <ShieldIcon sx={{ color: "#ff9644" }} />
//                             <p>Authentic & Quality Assured</p>
//                         </div>

//                         <div className='flex items-center gap-4'>
//                             <WorkspacePremiumIcon sx={{ color: "#ff9644" }} />
//                             <p>100% money back guarantee</p>
//                         </div>

//                         <div className='flex items-center gap-4'>
//                             <LocalShippingIcon sx={{ color: "#ff9644" }} />
//                             <p>Free Shipping & Returns</p>
//                         </div>



//                         <div className='flex items-center gap-4'>
//                             <Wallet sx={{ color: "#ff9644" }} />
//                             <p>Pay on delivery might be available</p>
//                         </div>



//                     </div>

//                     <div className='mt-7 space-y-3'>
//                         <h1 className='font-semibold'>SELECT SIZE:</h1>
//                         <Box className='flex flex-wrap gap-3'>
//                             {(() => {
//                                 const sizes = products.product?.sizes;
//                                 const sizeArray = Array.isArray(sizes)
//                                     ? sizes
//                                     : (typeof sizes === 'string' && sizes ? (sizes as string).split(',').map((s: string) => s.trim()) : []);

//                                 if (sizeArray.length > 0) {
//                                     return sizeArray.map((size: string) => (
//                                         <Button
//                                             key={size}
//                                             onClick={() => setSelectedSize(size)}
//                                             variant={selectedSize === size ? 'contained' : 'outlined'}
//                                             sx={{ minWidth: "60px", borderRadius: "20px" }}
//                                         >
//                                             {size}
//                                         </Button>
//                                     ));
//                                 } else {
//                                     return (
//                                         <Button
//                                             onClick={() => setSelectedSize("FREE")}
//                                             variant={selectedSize === "FREE" ? 'contained' : 'outlined'}
//                                             sx={{ minWidth: "60px", borderRadius: "20px" }}
//                                         >
//                                             FREE
//                                         </Button>
//                                     );
//                                 }
//                             })()}
//                         </Box>
//                     </div>

//                     <div className='mt-7 space-y-2'>
//                         <h1 className='font-semibold'>QUANTITY:</h1>
//                         <div className=' flex items-center gap-2  w-[140px] justify-between'>

//                             <Button disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)} variant='outlined'>
//                                 <RemoveIcon />
//                             </Button>
//                             <span className='px-3 text-lg font-semibold'>
//                                 {quantity}
//                             </span>
//                             <Button onClick={() => setQuantity(quantity + 1)} variant='outlined'>
//                                 <AddIcon />
//                             </Button>

//                         </div>
//                     </div>

//                     <div className="mt-12 flex items-center gap-5">
//                         <Button
//                             onClick={handleAddCart}
//                             sx={{ py: "1rem" }}
//                             variant='contained' fullWidth startIcon={<AddShoppingCartIcon />}>
//                             Add To Bag
//                         </Button>
//                         <Button
//                             onClick={() => {
//                                 if (!localStorage.getItem('jwt')) {
//                                     navigate('/login');
//                                     return;
//                                 }
//                                 if (products.product) {
//                                     dispatch(setBuyNowProduct({
//                                         product: products.product,
//                                         quantity,
//                                         size: selectedSize || 'FREE',
//                                     }));
//                                     navigate('/checkout/buy-now');
//                                 }
//                             }}
//                             sx={{ py: "1rem" }}
//                             color='warning'
//                             variant='contained' fullWidth startIcon={<FlashOnIcon />}>
//                             Buy Now
//                         </Button>
//                     </div>

//                     <div className="ratings w-full mt-10">
//                         <h1 className="font-semibold text-lg pb-4">
//                             Review & Ratings
//                         </h1>

//                         <RatingCard totalReview={review.reviews.length} />
//                         <div className='mt-10'>
//                             <div className="space-y-5">
//                                 {review.reviews.map((item) => (
//                                     <div className='space-y-5'>
//                                         <ProductReviewCard item={item} />
//                                         <Divider />
//                                     </div>
//                                 ))}
//                                 <Button onClick={() => navigate(`/reviews/${productId}`)}>View All {review.reviews.length} Reviews</Button>
//                             </div>
//                         </div>



//                     </div>
//                 </section>



//             </div>
//             <section className='mt-20'>
//                 <h1 className='text-lg font-bold'>Similar Product</h1>

//                 <div className='pt-5'>
//                     <SmilarProduct />
//                 </div>

//             </section>
//         </div>
//     )
// }

// export default ProductDetails


















// import StarIcon from '@mui/icons-material/Star';
// import { Box, Button, Divider, IconButton, Modal, Chip } from '@mui/material';
// import ShieldIcon from '@mui/icons-material/Shield';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

// import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from '@mui/icons-material/Add';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FlashOnIcon from '@mui/icons-material/FlashOn';
// import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
// import PaymentsIcon from '@mui/icons-material/Payments';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import VerifiedIcon from '@mui/icons-material/Verified';
// // ❌ Airplane Icon हटाया

// import SmilarProduct from '../SimilarProduct/SmilarProduct';
// import ZoomableImage from './ZoomableImage';
// import { useAppDispatch, useAppSelector } from '../../../../Redux Toolkit/Store';
// import { useNavigate, useParams } from 'react-router-dom';
// import { fetchProductById, getAllProducts } from '../../../../Redux Toolkit/Customer/ProductSlice';
// import { addItemToCart } from '../../../../Redux Toolkit/Customer/CartSlice';
// import { addProductToWishlist } from '../../../../Redux Toolkit/Customer/WishlistSlice';
// import { setBuyNowProduct } from '../../../../Redux Toolkit/Customer/BuyNowSlice';
// import { isWishlisted } from '../../../../util/isWishlisted';
// import ProductReviewCard from '../../Review/ProductReviewCard';
// import RatingCard from '../../Review/RatingCard';
// import { fetchReviewsByProductId } from '../../../../Redux Toolkit/Customer/ReviewSlice';
// import { useState, useEffect } from 'react';

// const style = {
//     position: 'absolute' as const,
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: "auto",
//     height: "100%",
//     boxShadow: 24,
//     outline: "none",
// };

// const ProductDetails = () => {
//     const [open, setOpen] = useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     const dispatch = useAppDispatch();
//     const { products, review, wishlist } = useAppSelector((store: any) => store);
//     const navigate = useNavigate();
//     const { productId, categoryId } = useParams<{ productId: string; categoryId: string }>();
//     const [selectedImage, setSelectedImage] = useState(0);
//     const [quantity, setQuantity] = useState(1);
//     const [selectedSize, setSelectedSize] = useState<string>("");

//     useEffect(() => {
//         if (products.product?.sizes) {
//             const sizes = products.product.sizes;
//             const sizeArray = Array.isArray(sizes)
//                 ? sizes
//                 : (typeof sizes === 'string' ? (sizes as string).split(',').map((s: string) => s.trim()) : []);

//             if (sizeArray.length > 0) {
//                 setSelectedSize(sizeArray[0]);
//             } else {
//                 setSelectedSize("FREE");
//             }
//         } else {
//             setSelectedSize("FREE");
//         }
//     }, [products.product]);

//     useEffect(() => {
//         if (productId) {
//             dispatch(fetchProductById(productId) as any);
//             dispatch(fetchReviewsByProductId({ productId }) as any);
//         }
//         dispatch(getAllProducts({ category: categoryId }) as any);
//     }, [productId, categoryId, dispatch]);

//     // ✅ Auto Image Slide (5 seconds) - रहेगा
//     useEffect(() => {
//         const images = products.product?.images;
//         if (!images || images.length <= 1) return;

//         const interval = setInterval(() => {
//             setSelectedImage((prev) => (prev + 1) % images.length);
//         }, 5000);

//         return () => clearInterval(interval);
//     }, [products.product?.images]);

//     const handleAddCart = () => {
//         dispatch(addItemToCart({
//             jwt: localStorage.getItem('jwt') || "",
//             request: { productId: productId || "", size: selectedSize || "FREE", quantity }
//         }) as any);
//     };

//     const categoryName =
//         typeof products.product?.category === 'object'
//             ? products.product?.category?.name
//             : products.product?.category || 'N/A';

//     return (
//         <div className='px-5 lg:px-20 pt-10'>
//             {/* ✅ सिर्फ Float Icon Animation रहेगा */}
//             <style>{`
//                 @keyframes floatIcon {
//                     0%, 100% { transform: translateY(0); }
//                     50% { transform: translateY(-3px); }
//                 }
//                 .float-icon {
//                     animation: floatIcon 3s ease-in-out infinite;
//                 }
//             `}</style>

//             <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>

//                 <section className='flex flex-col lg:flex-row gap-5'>
//                     {/* Thumbnails */}
//                     <div className='w-full lg:w-[15%] flex gap-3 overflow-x-auto lg:overflow-x-visible lg:flex-col py-2'>
//                         {products.product?.images?.map((item: string, index: number) => (
//                             <img
//                                 key={index}
//                                 onClick={() => setSelectedImage(index)}
//                                 className={`w-[60px] lg:w-full cursor-pointer rounded-md border-2 transition-all ${
//                                     selectedImage === index
//                                         ? 'border-orange-500 shadow-md scale-105'
//                                         : 'border-transparent hover:border-orange-300'
//                                 }`}
//                                 src={item}
//                                 alt=""
//                             />
//                         ))}
//                     </div>

//                     {/* Main Image - NO AUTO ZOOM */}
//                     <div className='w-full lg:w-[85%] relative'>
//                         <div className='relative overflow-hidden rounded-md'>
//                             <img
//                                 onClick={handleOpen}
//                                 className='w-full rounded-md cursor-zoom-in transition-all duration-700'
//                                 src={products.product?.images?.[selectedImage]}
//                                 alt=""
//                             />

//                             <div className='absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur'>
//                                 {selectedImage + 1} / {products.product?.images?.length || 1}
//                             </div>

//                             {products.product?.images && products.product.images.length > 1 && (
//                                 <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5'>
//                                     {products.product.images.map((_: string, idx: number) => (
//                                         <button
//                                             key={idx}
//                                             onClick={() => setSelectedImage(idx)}
//                                             className={`h-1.5 rounded-full transition-all ${
//                                                 idx === selectedImage ? 'w-6 bg-white' : 'w-1.5 bg-white/60'
//                                             }`}
//                                         />
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Wishlist */}
//                         <IconButton
//                             onClick={() => {
//                                 if (!localStorage.getItem('jwt')) {
//                                     navigate('/login');
//                                     return;
//                                 }
//                                 if (products.product?._id) {
//                                     dispatch(addProductToWishlist({ productId: products.product._id }) as any);
//                                 }
//                             }}
//                             sx={{
//                                 position: 'absolute',
//                                 top: 12,
//                                 right: 12,
//                                 bgcolor: 'rgba(255,255,255,0.9)',
//                                 '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
//                                 boxShadow: 2,
//                             }}
//                         >
//                             {products.product && wishlist.wishlist && isWishlisted(wishlist.wishlist, products.product) ? (
//                                 <FavoriteIcon sx={{ color: '#ff4081' }} />
//                             ) : (
//                                 <FavoriteBorderIcon sx={{ color: '#ff4081' }} />
//                             )}
//                         </IconButton>

//                         {/* Description */}
//                         <div className='mt-8 p-5 bg-white border border-gray-200 rounded-xl shadow-sm'>
//                             <h2 className='text-lg font-bold mb-3 flex items-center gap-2'>
//                                 <span className='h-1 w-6 bg-orange-500 rounded-full' />
//                                  Product Description
//                             </h2>

//                             <p className='text-gray-700 whitespace-pre-line leading-relaxed text-sm font-medium'>
//                                 {products.product?.description}
//                             </p>

//                             <Divider sx={{ my: 3 }} />

//                             <h3 className='text-md font-bold mb-3 text-gray-800'>
//                                  Key Features
//                             </h3>
//                             <ul className='space-y-2 text-sm text-gray-700'>
//                                 <li className='flex items-start gap-2'>
//                                     <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
//                                     <span className='font-semibold'>Premium quality material for long-lasting durability</span>
//                                 </li>
//                                 <li className='flex items-start gap-2'>
//                                     <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
//                                     <span className='font-semibold'>Designed for everyday comfort and style</span>
//                                 </li>
//                                 <li className='flex items-start gap-2'>
//                                     <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
//                                     <span className='font-semibold'>Easy to maintain and clean</span>
//                                 </li>
//                                 <li className='flex items-start gap-2'>
//                                     <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
//                                     <span className='font-semibold'>100% Genuine Product with brand warranty</span>
//                                 </li>
//                             </ul>

//                             <Divider sx={{ my: 3 }} />

//                             <h3 className='text-md font-bold mb-3 text-gray-800'>
//                                 📋 Product Details
//                             </h3>
//                             <div className='grid grid-cols-2 gap-3 text-sm'>
//                                 {products.product?.brand && (
//                                     <div className='bg-gray-50 p-2 rounded'>
//                                         <p className='text-xs text-gray-500 font-semibold'>Brand</p>
//                                         <p className='font-bold text-gray-800'>{products.product.brand}</p>
//                                     </div>
//                                 )}
//                                 {products.product?.color && (
//                                     <div className='bg-gray-50 p-2 rounded'>
//                                         <p className='text-xs text-gray-500 font-semibold'>Color</p>
//                                         <p className='font-bold text-gray-800'>{products.product.color}</p>
//                                     </div>
//                                 )}
//                                 <div className='bg-gray-50 p-2 rounded'>
//                                     <p className='text-xs text-gray-500 font-semibold'>Category</p>
//                                     <p className='font-bold text-gray-800'>{categoryName}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 <section>
//                     <h1 className='font-bold text-lg text-orange-600'>
//                         {products.product?.seller?.businessDetails?.businessName}
//                     </h1>
//                     <p className='text-gray-700 font-bold text-base'>{products.product?.title}</p>

//                     <div className='flex justify-between items-center py-2 border w-[180px] px-3 mt-5'>
//                         <div className='flex gap-1 items-center'>
//                             <span className='font-bold'>4</span>
//                             <StarIcon sx={{ color: "#ff9644", fontSize: "17px" }} />
//                         </div>
//                         <Divider orientation="vertical" flexItem />
//                         <span className='font-bold'>358 Ratings</span>
//                     </div>

//                     <div className='space-y-2'>
//                         <div className='price flex items-center gap-3 mt-5 text-lg'>
//                             <span className='font-bold text-gray-900 text-2xl'>₹{products.product?.sellingPrice}</span>
//                             <span className='line-through text-gray-400 font-semibold'>₹{products.product?.mrpPrice}</span>
//                             <span className='text-[#ff9644] font-bold'>{products.product?.discountPercent}% off</span>
//                         </div>
//                         {/* ✅ 799 हटाया */}
//                         <p className='text-sm font-medium'>Inclusive of all taxes.</p>
//                     </div>

//                     {/* ✅ 5 Features (Airplane हटाया) */}
//                     <div className='mt-7 grid grid-cols-2 gap-3'>
//                         <div className='flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100 hover:shadow-md transition-all'>
//                             <div className='bg-orange-500 rounded-lg p-2 float-icon'>
//                                 <AssignmentReturnIcon sx={{ color: "white", fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className='text-xs text-gray-500 font-semibold'>Return Policy</p>
//                                 <p className='text-sm font-bold text-gray-800'>5 Days Returnable</p>
//                             </div>
//                         </div>

//                         <div className='flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100 hover:shadow-md transition-all'>
//                             <div className='bg-green-500 rounded-lg p-2 float-icon'>
//                                 <LocalShippingIcon sx={{ color: "white", fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className='text-xs text-gray-500 font-semibold'>Delivery</p>
//                                 <p className='text-sm font-bold text-gray-800'>Free Delivery</p>
//                             </div>
//                         </div>

//                         <div className='flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-all'>
//                             <div className='bg-blue-500 rounded-lg p-2 float-icon'>
//                                 <PaymentsIcon sx={{ color: "white", fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className='text-xs text-gray-500 font-semibold'>Payment</p>
//                                 <p className='text-sm font-bold text-gray-800'>Pay on Delivery</p>
//                             </div>
//                         </div>

//                         <div className='flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100 hover:shadow-md transition-all'>
//                             <div className='bg-purple-500 rounded-lg p-2 float-icon'>
//                                 <WorkspacePremiumIcon sx={{ color: "white", fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className='text-xs text-gray-500 font-semibold'>Trust</p>
//                                 <p className='text-sm font-bold text-gray-800'>Top Brand</p>
//                             </div>
//                         </div>

//                         <div className='flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100 hover:shadow-md transition-all'>
//                             <div className='bg-red-500 rounded-lg p-2 float-icon'>
//                                 <ShieldIcon sx={{ color: "white", fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className='text-xs text-gray-500 font-semibold'>Security</p>
//                                 <p className='text-sm font-bold text-gray-800'>Secure Payment</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Offers */}
//                     <div className='mt-5 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100'>
//                         <h3 className='text-sm font-bold text-gray-800 mb-3 flex items-center gap-2'>
//                             <LocalOfferIcon sx={{ color: '#ff9644', fontSize: 18 }} />
//                             Available Offers
//                         </h3>
//                         <div className='space-y-2 text-sm'>
//                             <div className='flex items-center gap-2'>
//                                 <Chip label="10%" size="small" sx={{ bgcolor: '#10b981', color: 'white', fontWeight: 'bold', fontSize: 10 }} />
//                                 <span className='text-gray-700 font-semibold'>Bank Offer: 10% off on HDFC Credit Card</span>
//                             </div>
//                             <div className='flex items-center gap-2'>
//                                 <Chip label="₹100" size="small" sx={{ bgcolor: '#4f46e5', color: 'white', fontWeight: 'bold', fontSize: 10 }} />
//                                 <span className='text-gray-700 font-semibold'>Special Price: Get extra ₹100 off</span>
//                             </div>
//                             <div className='flex items-center gap-2'>
//                                 <Chip label="FREE" size="small" sx={{ bgcolor: '#f59e0b', color: 'white', fontWeight: 'bold', fontSize: 10 }} />
//                                 <span className='text-gray-700 font-semibold'>Free Delivery on orders above ₹499</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Size */}
//                     <div className='mt-7 space-y-3'>
//                         <h1 className='font-bold text-base'>SELECT SIZE:</h1>
//                         <Box className='flex flex-wrap gap-3'>
//                             {(() => {
//                                 const sizes = products.product?.sizes;
//                                 const sizeArray = Array.isArray(sizes)
//                                     ? sizes
//                                     : (typeof sizes === 'string' && sizes ? (sizes as string).split(',').map((s: string) => s.trim()) : []);

//                                 if (sizeArray.length > 0) {
//                                     return sizeArray.map((size: string) => (
//                                         <Button
//                                             key={size}
//                                             onClick={() => setSelectedSize(size)}
//                                             variant={selectedSize === size ? 'contained' : 'outlined'}
//                                             sx={{ minWidth: "60px", borderRadius: "20px", fontWeight: "bold" }}
//                                         >
//                                             {size}
//                                         </Button>
//                                     ));
//                                 } else {
//                                     return (
//                                         <Button
//                                             onClick={() => setSelectedSize("FREE")}
//                                             variant={selectedSize === "FREE" ? 'contained' : 'outlined'}
//                                             sx={{ minWidth: "60px", borderRadius: "20px", fontWeight: "bold" }}
//                                         >
//                                             FREE
//                                         </Button>
//                                     );
//                                 }
//                             })()}
//                         </Box>
//                     </div>

//                     {/* Quantity */}
//                     <div className='mt-7 space-y-2'>
//                         <h1 className='font-bold text-base'>QUANTITY:</h1>
//                         <div className='flex items-center gap-2 w-[140px] justify-between'>
//                             <Button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)} variant='outlined'>
//                                 <RemoveIcon />
//                             </Button>
//                             <span className='px-3 text-lg font-bold'>{quantity}</span>
//                             <Button onClick={() => setQuantity(quantity + 1)} variant='outlined'>
//                                 <AddIcon />
//                             </Button>
//                         </div>
//                     </div>

//                     {/* Buttons */}
//                     <div className="mt-12 flex items-center gap-5">
//                         <Button
//                             onClick={handleAddCart}
//                             sx={{ py: "1rem", fontWeight: "bold" }}
//                             variant='contained' fullWidth startIcon={<AddShoppingCartIcon />}>
//                             Add To Cart
//                         </Button>
//                         <Button
//                             onClick={() => {
//                                 if (!localStorage.getItem('jwt')) {
//                                     navigate('/login');
//                                     return;
//                                 }
//                                 if (products.product) {
//                                     dispatch(setBuyNowProduct({
//                                         product: products.product,
//                                         quantity,
//                                         size: selectedSize || 'FREE',
//                                     }) as any);
//                                     navigate('/checkout/buy-now');
//                                 }
//                             }}
//                             sx={{ py: "1rem", fontWeight: "bold" }}
//                             color='warning'
//                             variant='contained' fullWidth startIcon={<FlashOnIcon />}>
//                             Buy Now
//                         </Button>
//                     </div>

//                     {/* Reviews */}
//                     <div className="ratings w-full mt-10">
//                         <h1 className="font-bold text-lg pb-4">Review & Ratings</h1>
//                         <RatingCard totalReview={review.reviews.length} />
//                         <div className='mt-10'>
//                             <div className="space-y-5">
//                                 {review.reviews.map((item: any, index: number) => (
//                                     <div className='space-y-5' key={item._id || index}>
//                                         <ProductReviewCard item={item} />
//                                         <Divider />
//                                     </div>
//                                 ))}
//                                 <Button
//                                     onClick={() => navigate(`/reviews/${productId}`)}
//                                     sx={{ fontWeight: "bold" }}
//                                 >
//                                     View All {review.reviews.length} Reviews
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </div>

//             {/* Similar */}
//             <section className='mt-20'>
//                 <h1 className='text-lg font-bold'>Similar Product</h1>
//                 <div className='pt-5'>
//                     <SmilarProduct />
//                 </div>
//             </section>

//             {/* Modal */}
//             <Modal open={open} onClose={handleClose}>
//                 <Box sx={{ ...style, maxWidth: "90%", maxHeight: "90%" }}>
//                     <ZoomableImage src={products.product?.images?.[selectedImage] || ""} alt="" />
//                 </Box>
//             </Modal>
//         </div>
//     );
// };

// export default ProductDetails;









// import StarIcon from '@mui/icons-material/Star';
// import { Box, Button, Divider, IconButton, Modal, Chip } from '@mui/material';
// import ShieldIcon from '@mui/icons-material/Shield';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
// import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from '@mui/icons-material/Add';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FlashOnIcon from '@mui/icons-material/FlashOn';
// import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
// import PaymentsIcon from '@mui/icons-material/Payments';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import VerifiedIcon from '@mui/icons-material/Verified';
// import BlockIcon from '@mui/icons-material/Block';   // 🔥 NEW

// import SmilarProduct from '../SimilarProduct/SmilarProduct';
// import ZoomableImage from './ZoomableImage';
// import { useAppDispatch, useAppSelector } from '../../../../Redux Toolkit/Store';
// import { useNavigate, useParams } from 'react-router-dom';
// import { fetchProductById, getAllProducts } from '../../../../Redux Toolkit/Customer/ProductSlice';
// import { addItemToCart } from '../../../../Redux Toolkit/Customer/CartSlice';
// import { addProductToWishlist } from '../../../../Redux Toolkit/Customer/WishlistSlice';
// import { setBuyNowProduct } from '../../../../Redux Toolkit/Customer/BuyNowSlice';
// import { isWishlisted } from '../../../../util/isWishlisted';
// import ProductReviewCard from '../../Review/ProductReviewCard';
// import RatingCard from '../../Review/RatingCard';
// import { fetchReviewsByProductId } from '../../../../Redux Toolkit/Customer/ReviewSlice';
// import { useState, useEffect } from 'react';

// const style = {
//     position: 'absolute' as const,
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: "auto",
//     height: "100%",
//     boxShadow: 24,
//     outline: "none",
// };

// const ProductDetails = () => {
//     const [open, setOpen] = useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     const dispatch = useAppDispatch();
//     const { products, review, wishlist } = useAppSelector((store: any) => store);
//     const navigate = useNavigate();
//     const { productId, categoryId } = useParams<{ productId: string; categoryId: string }>();
//     const [selectedImage, setSelectedImage] = useState(0);
//     const [quantity, setQuantity] = useState(1);
//     const [selectedSize, setSelectedSize] = useState<string>("");

//     /* 🔥 OUT OF STOCK CHECK */
//     const product = products.product;
//     const isOutOfStock = !product?.quantity || product.quantity <= 0;
//     const maxQuantity = product?.quantity || 0;

//     useEffect(() => {
//         if (products.product?.sizes) {
//             const sizes = products.product.sizes;
//             const sizeArray = Array.isArray(sizes)
//                 ? sizes
//                 : (typeof sizes === 'string' ? (sizes as string).split(',').map((s: string) => s.trim()) : []);

//             if (sizeArray.length > 0) {
//                 setSelectedSize(sizeArray[0]);
//             } else {
//                 setSelectedSize("FREE");
//             }
//         } else {
//             setSelectedSize("FREE");
//         }
//     }, [products.product]);

//     useEffect(() => {
//         if (productId) {
//             dispatch(fetchProductById(productId) as any);
//             dispatch(fetchReviewsByProductId({ productId }) as any);
//         }
//         dispatch(getAllProducts({ category: categoryId }) as any);
//     }, [productId, categoryId, dispatch]);

//     // ✅ Auto Image Slide (5 seconds)
//     useEffect(() => {
//         const images = products.product?.images;
//         if (!images || images.length <= 1) return;

//         const interval = setInterval(() => {
//             setSelectedImage((prev) => (prev + 1) % images.length);
//         }, 5000);

//         return () => clearInterval(interval);
//     }, [products.product?.images]);

//     const handleAddCart = () => {
//         if (isOutOfStock) return;
//         dispatch(addItemToCart({
//             jwt: localStorage.getItem('jwt') || "",
//             request: { productId: productId || "", size: selectedSize || "FREE", quantity }
//         }) as any);
//     };

//     const handleBuyNow = () => {
//         if (isOutOfStock) return;
//         if (!localStorage.getItem('jwt')) {
//             navigate('/login');
//             return;
//         }
//         if (products.product) {
//             dispatch(setBuyNowProduct({
//                 product: products.product,
//                 quantity,
//                 size: selectedSize || 'FREE',
//             }) as any);
//             navigate('/checkout/buy-now');
//         }
//     };

//     const categoryName =
//         typeof products.product?.category === 'object'
//             ? products.product?.category?.name
//             : products.product?.category || 'N/A';

//     return (
//         <div className='px-5 lg:px-20 pt-10'>
//             <style>{`
//                 @keyframes floatIcon {
//                     0%, 100% { transform: translateY(0); }
//                     50% { transform: translateY(-3px); }
//                 }
//                 .float-icon {
//                     animation: floatIcon 3s ease-in-out infinite;
//                 }
//             `}</style>

//             {/* 🔥 OUT OF STOCK TOP BANNER */}
//             {isOutOfStock && (
//                 <div className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-2xl p-5 flex items-center gap-4 shadow-md">
//                     <div className="bg-red-500 rounded-full p-3 flex-shrink-0">
//                         <BlockIcon sx={{ fontSize: 28, color: 'white' }} />
//                     </div>
//                     <div>
//                         <h3 className="text-red-700 font-extrabold text-lg">
//                             Out of Stock
//                         </h3>
//                         <p className="text-red-600 text-sm mt-0.5">
//                             This product is currently unavailable. Check back soon or explore similar products below!
//                         </p>
//                     </div>
//                 </div>
//             )}

//             <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>

//                 <section className='flex flex-col lg:flex-row gap-5'>
//                     {/* Thumbnails */}
//                     <div className='w-full lg:w-[15%] flex gap-3 overflow-x-auto lg:overflow-x-visible lg:flex-col py-2'>
//                         {products.product?.images?.map((item: string, index: number) => (
//                             <img
//                                 key={index}
//                                 onClick={() => setSelectedImage(index)}
//                                 className={`w-[60px] lg:w-full cursor-pointer rounded-md border-2 transition-all ${
//                                     selectedImage === index
//                                         ? 'border-orange-500 shadow-md scale-105'
//                                         : 'border-transparent hover:border-orange-300'
//                                 } ${isOutOfStock ? 'opacity-60' : ''}`}
//                                 src={item}
//                                 alt=""
//                             />
//                         ))}
//                     </div>

//                     {/* Main Image */}
//                     <div className='w-full lg:w-[85%] relative'>
//                         <div className='relative overflow-hidden rounded-md'>
//                             {/* 🔥 OUT OF STOCK OVERLAY */}
//                             {isOutOfStock && (
//                                 <div className='absolute inset-0 bg-black/50 z-10 flex items-center justify-center'>
//                                     <div className='bg-white px-6 py-3 rounded-xl shadow-2xl border-2 border-red-500 rotate-[-5deg]'>
//                                         <p className='text-red-600 font-extrabold text-lg uppercase tracking-wider'>
//                                             🚫 Out of Stock
//                                         </p>
//                                     </div>
//                                 </div>
//                             )}

//                             <img
//                                 onClick={handleOpen}
//                                 className='w-full rounded-md cursor-zoom-in transition-all duration-700'
//                                 src={products.product?.images?.[selectedImage]}
//                                 alt=""
//                                 style={{ filter: isOutOfStock ? 'grayscale(60%)' : 'none' }}
//                             />

//                             <div className='absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur'>
//                                 {selectedImage + 1} / {products.product?.images?.length || 1}
//                             </div>

//                             {products.product?.images && products.product.images.length > 1 && (
//                                 <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5'>
//                                     {products.product.images.map((_: string, idx: number) => (
//                                         <button
//                                             key={idx}
//                                             onClick={() => setSelectedImage(idx)}
//                                             className={`h-1.5 rounded-full transition-all ${
//                                                 idx === selectedImage ? 'w-6 bg-white' : 'w-1.5 bg-white/60'
//                                             }`}
//                                         />
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Wishlist */}
//                         <IconButton
//                             onClick={() => {
//                                 if (!localStorage.getItem('jwt')) {
//                                     navigate('/login');
//                                     return;
//                                 }
//                                 if (products.product?._id) {
//                                     dispatch(addProductToWishlist({ productId: products.product._id }) as any);
//                                 }
//                             }}
//                             sx={{
//                                 position: 'absolute',
//                                 top: 12,
//                                 right: 12,
//                                 bgcolor: 'rgba(255,255,255,0.9)',
//                                 '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
//                                 boxShadow: 2,
//                                 zIndex: 20,
//                             }}
//                         >
//                             {products.product && wishlist.wishlist && isWishlisted(wishlist.wishlist, products.product) ? (
//                                 <FavoriteIcon sx={{ color: '#ff4081' }} />
//                             ) : (
//                                 <FavoriteBorderIcon sx={{ color: '#ff4081' }} />
//                             )}
//                         </IconButton>

//                         {/* Description */}
//                         <div className='mt-8 p-5 bg-white border border-gray-200 rounded-xl shadow-sm'>
//                             <h2 className='text-lg font-bold mb-3 flex items-center gap-2'>
//                                 <span className='h-1 w-6 bg-orange-500 rounded-full' />
//                                 Product Description
//                             </h2>

//                             <p className='text-gray-700 whitespace-pre-line leading-relaxed text-sm font-medium'>
//                                 {products.product?.description}
//                             </p>

//                             <Divider sx={{ my: 3 }} />

//                             <h3 className='text-md font-bold mb-3 text-gray-800'>
//                                 Key Features
//                             </h3>
//                             <ul className='space-y-2 text-sm text-gray-700'>
//                                 <li className='flex items-start gap-2'>
//                                     <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
//                                     <span className='font-semibold'>Premium quality material for long-lasting durability</span>
//                                 </li>
//                                 <li className='flex items-start gap-2'>
//                                     <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
//                                     <span className='font-semibold'>Designed for everyday comfort and style</span>
//                                 </li>
//                                 <li className='flex items-start gap-2'>
//                                     <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
//                                     <span className='font-semibold'>Easy to maintain and clean</span>
//                                 </li>
//                                 <li className='flex items-start gap-2'>
//                                     <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
//                                     <span className='font-semibold'>100% Genuine Product with brand warranty</span>
//                                 </li>
//                             </ul>

//                             <Divider sx={{ my: 3 }} />

//                             <h3 className='text-md font-bold mb-3 text-gray-800'>
//                                 📋 Product Details
//                             </h3>
//                             <div className='grid grid-cols-2 gap-3 text-sm'>
//                                 {products.product?.brand && (
//                                     <div className='bg-gray-50 p-2 rounded'>
//                                         <p className='text-xs text-gray-500 font-semibold'>Brand</p>
//                                         <p className='font-bold text-gray-800'>{products.product.brand}</p>
//                                     </div>
//                                 )}
//                                 {products.product?.color && (
//                                     <div className='bg-gray-50 p-2 rounded'>
//                                         <p className='text-xs text-gray-500 font-semibold'>Color</p>
//                                         <p className='font-bold text-gray-800'>{products.product.color}</p>
//                                     </div>
//                                 )}
//                                 <div className='bg-gray-50 p-2 rounded'>
//                                     <p className='text-xs text-gray-500 font-semibold'>Category</p>
//                                     <p className='font-bold text-gray-800'>{categoryName}</p>
//                                 </div>
//                                 {!isOutOfStock && (
//                                     <div className='bg-green-50 p-2 rounded border border-green-200'>
//                                         <p className='text-xs text-green-600 font-semibold'>In Stock</p>
//                                         <p className='font-bold text-green-700'>{product.quantity} available</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 <section>
//                     <h1 className='font-bold text-lg text-orange-600'>
//                         {products.product?.seller?.businessDetails?.businessName}
//                     </h1>
//                     <p className='text-gray-700 font-bold text-base'>{products.product?.title}</p>

//                     <div className='flex justify-between items-center py-2 border w-[180px] px-3 mt-5'>
//                         <div className='flex gap-1 items-center'>
//                             <span className='font-bold'>4</span>
//                             <StarIcon sx={{ color: "#ff9644", fontSize: "17px" }} />
//                         </div>
//                         <Divider orientation="vertical" flexItem />
//                         <span className='font-bold'>358 Ratings</span>
//                     </div>

//                     <div className='space-y-2'>
//                         <div className='price flex items-center gap-3 mt-5 text-lg'>
//                             <span className={`font-bold text-2xl ${isOutOfStock ? 'text-gray-400' : 'text-gray-900'}`}>
//                                 ₹{products.product?.sellingPrice}
//                             </span>
//                             <span className='line-through text-gray-400 font-semibold'>₹{products.product?.mrpPrice}</span>
//                             <span className='text-[#ff9644] font-bold'>{products.product?.discountPercent}% off</span>
//                         </div>
//                         <p className='text-sm font-medium'>Inclusive of all taxes.</p>
//                     </div>

//                     {/* Features */}
//                     <div className='mt-7 grid grid-cols-2 gap-3'>
//                         <div className='flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100 hover:shadow-md transition-all'>
//                             <div className='bg-orange-500 rounded-lg p-2 float-icon'>
//                                 <AssignmentReturnIcon sx={{ color: "white", fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className='text-xs text-gray-500 font-semibold'>Return Policy</p>
//                                 <p className='text-sm font-bold text-gray-800'>5 Days Returnable</p>
//                             </div>
//                         </div>

//                         <div className='flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100 hover:shadow-md transition-all'>
//                             <div className='bg-green-500 rounded-lg p-2 float-icon'>
//                                 <LocalShippingIcon sx={{ color: "white", fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className='text-xs text-gray-500 font-semibold'>Delivery</p>
//                                 <p className='text-sm font-bold text-gray-800'>Free Delivery</p>
//                             </div>
//                         </div>

//                         <div className='flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-all'>
//                             <div className='bg-blue-500 rounded-lg p-2 float-icon'>
//                                 <PaymentsIcon sx={{ color: "white", fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className='text-xs text-gray-500 font-semibold'>Payment</p>
//                                 <p className='text-sm font-bold text-gray-800'>Pay on Delivery</p>
//                             </div>
//                         </div>

//                         <div className='flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100 hover:shadow-md transition-all'>
//                             <div className='bg-purple-500 rounded-lg p-2 float-icon'>
//                                 <WorkspacePremiumIcon sx={{ color: "white", fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className='text-xs text-gray-500 font-semibold'>Trust</p>
//                                 <p className='text-sm font-bold text-gray-800'>Top Brand</p>
//                             </div>
//                         </div>

//                         <div className='flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100 hover:shadow-md transition-all'>
//                             <div className='bg-red-500 rounded-lg p-2 float-icon'>
//                                 <ShieldIcon sx={{ color: "white", fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className='text-xs text-gray-500 font-semibold'>Security</p>
//                                 <p className='text-sm font-bold text-gray-800'>Secure Payment</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Offers */}
//                     <div className='mt-5 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100'>
//                         <h3 className='text-sm font-bold text-gray-800 mb-3 flex items-center gap-2'>
//                             <LocalOfferIcon sx={{ color: '#ff9644', fontSize: 18 }} />
//                             Available Offers
//                         </h3>
//                         <div className='space-y-2 text-sm'>
//                             <div className='flex items-center gap-2'>
//                                 <Chip label="10%" size="small" sx={{ bgcolor: '#10b981', color: 'white', fontWeight: 'bold', fontSize: 10 }} />
//                                 <span className='text-gray-700 font-semibold'>Bank Offer: 10% off on HDFC Credit Card</span>
//                             </div>
//                             <div className='flex items-center gap-2'>
//                                 <Chip label="₹100" size="small" sx={{ bgcolor: '#4f46e5', color: 'white', fontWeight: 'bold', fontSize: 10 }} />
//                                 <span className='text-gray-700 font-semibold'>Special Price: Get extra ₹100 off</span>
//                             </div>
//                             <div className='flex items-center gap-2'>
//                                 <Chip label="FREE" size="small" sx={{ bgcolor: '#f59e0b', color: 'white', fontWeight: 'bold', fontSize: 10 }} />
//                                 <span className='text-gray-700 font-semibold'>Free Delivery on orders above ₹499</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Size */}
//                     <div className='mt-7 space-y-3'>
//                         <h1 className='font-bold text-base'>SELECT SIZE:</h1>
//                         <Box className='flex flex-wrap gap-3'>
//                             {(() => {
//                                 const sizes = products.product?.sizes;
//                                 const sizeArray = Array.isArray(sizes)
//                                     ? sizes
//                                     : (typeof sizes === 'string' && sizes ? (sizes as string).split(',').map((s: string) => s.trim()) : []);

//                                 if (sizeArray.length > 0) {
//                                     return sizeArray.map((size: string) => (
//                                         <Button
//                                             key={size}
//                                             onClick={() => setSelectedSize(size)}
//                                             disabled={isOutOfStock}
//                                             variant={selectedSize === size ? 'contained' : 'outlined'}
//                                             sx={{ minWidth: "60px", borderRadius: "20px", fontWeight: "bold" }}
//                                         >
//                                             {size}
//                                         </Button>
//                                     ));
//                                 } else {
//                                     return (
//                                         <Button
//                                             onClick={() => setSelectedSize("FREE")}
//                                             disabled={isOutOfStock}
//                                             variant={selectedSize === "FREE" ? 'contained' : 'outlined'}
//                                             sx={{ minWidth: "60px", borderRadius: "20px", fontWeight: "bold" }}
//                                         >
//                                             FREE
//                                         </Button>
//                                     );
//                                 }
//                             })()}
//                         </Box>
//                     </div>

//                     {/* Quantity - सिर्फ available होने पर */}
//                     {!isOutOfStock && (
//                         <div className='mt-7 space-y-2'>
//                             <h1 className='font-bold text-base'>QUANTITY:</h1>
//                             <div className='flex items-center gap-2 w-[140px] justify-between'>
//                                 <Button
//                                     disabled={quantity === 1}
//                                     onClick={() => setQuantity(quantity - 1)}
//                                     variant='outlined'
//                                 >
//                                     <RemoveIcon />
//                                 </Button>
//                                 <span className='px-3 text-lg font-bold'>{quantity}</span>
//                                 <Button
//                                     onClick={() => setQuantity(Math.min(quantity + 1, maxQuantity))}
//                                     disabled={quantity >= maxQuantity}
//                                     variant='outlined'
//                                 >
//                                     <AddIcon />
//                                 </Button>
//                             </div>
//                             {maxQuantity <= 5 && (
//                                 <p className='text-orange-600 text-xs font-bold'>
//                                     ⚡ Only {maxQuantity} left in stock!
//                                 </p>
//                             )}
//                         </div>
//                     )}

//                     {/* 🔥 BUTTONS - OUT OF STOCK HANDLING */}
//                     <div className="mt-12 flex items-center gap-5">
//                         {isOutOfStock ? (
//                             <>
//                                 <Button
//                                     disabled
//                                     sx={{
//                                         py: "1rem",
//                                         fontWeight: "bold",
//                                         bgcolor: "#cbd5e1 !important",
//                                         color: "white !important",
//                                     }}
//                                     variant='contained'
//                                     fullWidth
//                                     startIcon={<BlockIcon />}
//                                 >
//                                     Out of Stock
//                                 </Button>
//                                 <Button
//                                     onClick={() => {
//                                         if (products.product?._id) {
//                                             dispatch(addProductToWishlist({ productId: products.product._id }) as any);
//                                         }
//                                     }}
//                                     sx={{ py: "1rem", fontWeight: "bold" }}
//                                     color='secondary'
//                                     variant='contained'
//                                     fullWidth
//                                     startIcon={<FavoriteBorderIcon />}
//                                 >
//                                     Notify Me
//                                 </Button>
//                             </>
//                         ) : (
//                             <>
//                                 <Button
//                                     onClick={handleAddCart}
//                                     sx={{ py: "1rem", fontWeight: "bold" }}
//                                     variant='contained'
//                                     fullWidth
//                                     startIcon={<AddShoppingCartIcon />}
//                                 >
//                                     Add To Cart
//                                 </Button>
//                                 <Button
//                                     onClick={handleBuyNow}
//                                     sx={{ py: "1rem", fontWeight: "bold" }}
//                                     color='warning'
//                                     variant='contained'
//                                     fullWidth
//                                     startIcon={<FlashOnIcon />}
//                                 >
//                                     Buy Now
//                                 </Button>
//                             </>
//                         )}
//                     </div>

//                     {/* Reviews */}
//                     <div className="ratings w-full mt-10">
//                         <h1 className="font-bold text-lg pb-4">Review & Ratings</h1>
//                         <RatingCard totalReview={review.reviews.length} />
//                         <div className='mt-10'>
//                             <div className="space-y-5">
//                                 {review.reviews.map((item: any, index: number) => (
//                                     <div className='space-y-5' key={item._id || index}>
//                                         <ProductReviewCard item={item} />
//                                         <Divider />
//                                     </div>
//                                 ))}
//                                 <Button
//                                     onClick={() => navigate(`/reviews/${productId}`)}
//                                     sx={{ fontWeight: "bold" }}
//                                 >
//                                     View All {review.reviews.length} Reviews
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </div>

//             {/* Similar */}
//             <section className='mt-20'>
//                 <h1 className='text-lg font-bold'>Similar Product</h1>
//                 <div className='pt-5'>
//                     <SmilarProduct />
//                 </div>
//             </section>

//             {/* Modal */}
//             <Modal open={open} onClose={handleClose}>
//                 <Box sx={{ ...style, maxWidth: "90%", maxHeight: "90%" }}>
//                     <ZoomableImage src={products.product?.images?.[selectedImage] || ""} alt="" />
//                 </Box>
//             </Modal>
//         </div>
//     );
// };

// export default ProductDetails;








// import StarIcon from '@mui/icons-material/Star';
// import { Box, Button, Divider, IconButton, Modal, Chip } from '@mui/material';
// import ShieldIcon from '@mui/icons-material/Shield';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
// import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from '@mui/icons-material/Add';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FlashOnIcon from '@mui/icons-material/FlashOn';
// import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
// import PaymentsIcon from '@mui/icons-material/Payments';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import VerifiedIcon from '@mui/icons-material/Verified';
// import BlockIcon from '@mui/icons-material/Block';

// import SmilarProduct from '../SimilarProduct/SmilarProduct';
// import ZoomableImage from './ZoomableImage';
// import EmiWidget from '../../../../components/EMI/EmiBadge';
// import { useAppDispatch, useAppSelector } from '../../../../Redux Toolkit/Store';
// import { useNavigate, useParams } from 'react-router-dom';
// import { fetchProductById, getAllProducts } from '../../../../Redux Toolkit/Customer/ProductSlice';
// import { addItemToCart } from '../../../../Redux Toolkit/Customer/CartSlice';
// import { addProductToWishlist } from '../../../../Redux Toolkit/Customer/WishlistSlice';
// import { isWishlisted } from '../../../../util/isWishlisted';
// import ProductReviewCard from '../../Review/ProductReviewCard';
// import RatingCard from '../../Review/RatingCard';
// import { fetchReviewsByProductId } from '../../../../Redux Toolkit/Customer/ReviewSlice';
// import { useState, useEffect } from 'react';

// const style = {
//     position: 'absolute' as const,
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 'auto',
//     height: '100%',
//     boxShadow: 24,
//     outline: 'none',
// };

// const ProductDetails = () => {
//     const [open, setOpen] = useState<boolean>(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     const dispatch = useAppDispatch();
//     const { products, review, wishlist } = useAppSelector((store: any) => store);
//     const navigate = useNavigate();
//     const { productId, categoryId } = useParams<{ productId: string; categoryId: string }>();
//     const [selectedImage, setSelectedImage] = useState<number>(0);
//     const [quantity, setQuantity] = useState<number>(1);
//     const [selectedSize, setSelectedSize] = useState<string>('');

//     // 🔥 EMI Plan state
//     const [selectedEmiPlan, setSelectedEmiPlan] = useState<{
//         bankCode: string;
//         bankName: string;
//         tenure: number;
//         interestRate: number;
//         emiAmount: number;
//         totalPayable: number;
//     } | null>(null);

//     /* 🔥 OUT OF STOCK CHECK */
//     const product = products.product;
//     const isOutOfStock = !product?.quantity || product.quantity <= 0;
//     const maxQuantity = product?.quantity || 0;

//     useEffect(() => {
//         if (products.product?.sizes) {
//             const sizes = products.product.sizes;
//             const sizeArray = Array.isArray(sizes)
//                 ? sizes
//                 : typeof sizes === 'string'
//                   ? (sizes as string).split(',').map((s: string) => s.trim())
//                   : [];

//             if (sizeArray.length > 0) {
//                 setSelectedSize(sizeArray[0]);
//             } else {
//                 setSelectedSize('FREE');
//             }
//         } else {
//             setSelectedSize('FREE');
//         }
//     }, [products.product]);

//     useEffect(() => {
//         if (productId) {
//             dispatch(fetchProductById(productId) as any);
//             dispatch(fetchReviewsByProductId({ productId }) as any);
//         }
//         dispatch(getAllProducts({ category: categoryId }) as any);
//     }, [productId, categoryId, dispatch]);

//     // ✅ Auto Image Slide (5 seconds)
//     useEffect(() => {
//         const images = products.product?.images;
//         if (!images || images.length <= 1) return;

//         const interval = setInterval(() => {
//             setSelectedImage((prev) => (prev + 1) % images.length);
//         }, 5000);

//         return () => clearInterval(interval);
//     }, [products.product?.images]);

//     // 🔥 Add to Cart
//     const handleAddCart = (): void => {
//         if (isOutOfStock) return;

//         // EMI plan save karo
//         if (selectedEmiPlan) {
//             localStorage.setItem('selectedEmiPlan', JSON.stringify(selectedEmiPlan));
//         } else {
//             localStorage.removeItem('selectedEmiPlan');
//         }

//         dispatch(
//             addItemToCart({
//                 jwt: localStorage.getItem('jwt') || '',
//                 request: { productId: productId || '', size: selectedSize || 'FREE', quantity },
//             }) as any
//         );

//         navigate('/cart');   // 🔥 Cart page pe bhejo
//     };

//     // 🔥 Buy Now → Cart page pe bhejo
//     const handleBuyNow = (): void => {
//         if (isOutOfStock) return;
//         if (!localStorage.getItem('jwt')) {
//             navigate('/login');
//             return;
//         }
//         if (products.product) {
//             // EMI plan save karo
//             if (selectedEmiPlan) {
//                 localStorage.setItem('selectedEmiPlan', JSON.stringify(selectedEmiPlan));
//             } else {
//                 localStorage.removeItem('selectedEmiPlan');
//             }

//             // Cart me add karo
//             dispatch(
//                 addItemToCart({
//                     jwt: localStorage.getItem('jwt') || '',
//                     request: {
//                         productId: productId || '',
//                         size: selectedSize || 'FREE',
//                         quantity,
//                     },
//                 }) as any
//             );

//             // 🔥 Cart page pe bhejo (checkout nahi)
//             navigate('/cart');
//         }
//     };

//     const categoryName =
//         typeof products.product?.category === 'object'
//             ? products.product?.category?.name
//             : products.product?.category || 'N/A';

//     return (
//         <div className="px-5 lg:px-20 pt-10">
//             <style>{`
//                 @keyframes floatIcon {
//                     0%, 100% { transform: translateY(0); }
//                     50% { transform: translateY(-3px); }
//                 }
//                 .float-icon {
//                     animation: floatIcon 3s ease-in-out infinite;
//                 }
//             `}</style>

//             {/* 🔥 OUT OF STOCK TOP BANNER */}
//             {isOutOfStock && (
//                 <div className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-2xl p-5 flex items-center gap-4 shadow-md">
//                     <div className="bg-red-500 rounded-full p-3 flex-shrink-0">
//                         <BlockIcon sx={{ fontSize: 28, color: 'white' }} />
//                     </div>
//                     <div>
//                         <h3 className="text-red-700 font-extrabold text-lg">Out of Stock</h3>
//                         <p className="text-red-600 text-sm mt-0.5">
//                             This product is currently unavailable. Check back soon or explore similar
//                             products below!
//                         </p>
//                     </div>
//                 </div>
//             )}

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//                 <section className="flex flex-col lg:flex-row gap-5">
//                     {/* Thumbnails */}
//                     <div className="w-full lg:w-[15%] flex gap-3 overflow-x-auto lg:overflow-x-visible lg:flex-col py-2">
//                         {products.product?.images?.map((item: string, index: number) => (
//                             <img
//                                 key={index}
//                                 onClick={() => setSelectedImage(index)}
//                                 className={`w-[60px] lg:w-full cursor-pointer rounded-md border-2 transition-all ${
//                                     selectedImage === index
//                                         ? 'border-orange-500 shadow-md scale-105'
//                                         : 'border-transparent hover:border-orange-300'
//                                 } ${isOutOfStock ? 'opacity-60' : ''}`}
//                                 src={item}
//                                 alt=""
//                             />
//                         ))}
//                     </div>

//                     {/* Main Image */}
//                     <div className="w-full lg:w-[85%] relative">
//                         <div className="relative overflow-hidden rounded-md">
//                             {isOutOfStock && (
//                                 <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
//                                     <div className="bg-white px-6 py-3 rounded-xl shadow-2xl border-2 border-red-500 rotate-[-5deg]">
//                                         <p className="text-red-600 font-extrabold text-lg uppercase tracking-wider">
//                                             🚫 Out of Stock
//                                         </p>
//                                     </div>
//                                 </div>
//                             )}

//                             <img
//                                 onClick={handleOpen}
//                                 className="w-full rounded-md cursor-zoom-in transition-all duration-700"
//                                 src={products.product?.images?.[selectedImage]}
//                                 alt=""
//                                 style={{ filter: isOutOfStock ? 'grayscale(60%)' : 'none' }}
//                             />

//                             <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur">
//                                 {selectedImage + 1} / {products.product?.images?.length || 1}
//                             </div>

//                             {products.product?.images && products.product.images.length > 1 && (
//                                 <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
//                                     {products.product.images.map((_: string, idx: number) => (
//                                         <button
//                                             key={idx}
//                                             onClick={() => setSelectedImage(idx)}
//                                             className={`h-1.5 rounded-full transition-all ${
//                                                 idx === selectedImage
//                                                     ? 'w-6 bg-white'
//                                                     : 'w-1.5 bg-white/60'
//                                             }`}
//                                         />
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Wishlist */}
//                         <IconButton
//                             onClick={() => {
//                                 if (!localStorage.getItem('jwt')) {
//                                     navigate('/login');
//                                     return;
//                                 }
//                                 if (products.product?._id) {
//                                     dispatch(
//                                         addProductToWishlist({
//                                             productId: products.product._id,
//                                         }) as any
//                                     );
//                                 }
//                             }}
//                             sx={{
//                                 position: 'absolute',
//                                 top: 12,
//                                 right: 12,
//                                 bgcolor: 'rgba(255,255,255,0.9)',
//                                 '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
//                                 boxShadow: 2,
//                                 zIndex: 20,
//                             }}
//                         >
//                             {products.product &&
//                             wishlist.wishlist &&
//                             isWishlisted(wishlist.wishlist, products.product) ? (
//                                 <FavoriteIcon sx={{ color: '#ff4081' }} />
//                             ) : (
//                                 <FavoriteBorderIcon sx={{ color: '#ff4081' }} />
//                             )}
//                         </IconButton>

//                         {/* Description */}
//                         <div className="mt-8 p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
//                             <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
//                                 <span className="h-1 w-6 bg-orange-500 rounded-full" />
//                                 Product Description
//                             </h2>

//                             <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm font-medium">
//                                 {products.product?.description}
//                             </p>

//                             <Divider sx={{ my: 3 }} />

//                             <h3 className="text-md font-bold mb-3 text-gray-800">Key Features</h3>
//                             <ul className="space-y-2 text-sm text-gray-700">
//                                 <li className="flex items-start gap-2">
//                                     <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
//                                     <span className="font-semibold">
//                                         Premium quality material for long-lasting durability
//                                     </span>
//                                 </li>
//                                 <li className="flex items-start gap-2">
//                                     <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
//                                     <span className="font-semibold">
//                                         Designed for everyday comfort and style
//                                     </span>
//                                 </li>
//                                 <li className="flex items-start gap-2">
//                                     <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
//                                     <span className="font-semibold">Easy to maintain and clean</span>
//                                 </li>
//                                 <li className="flex items-start gap-2">
//                                     <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
//                                     <span className="font-semibold">
//                                         100% Genuine Product with brand warranty
//                                     </span>
//                                 </li>
//                             </ul>

//                             <Divider sx={{ my: 3 }} />

//                             <h3 className="text-md font-bold mb-3 text-gray-800">
//                                 📋 Product Details
//                             </h3>
//                             <div className="grid grid-cols-2 gap-3 text-sm">
//                                 {products.product?.brand && (
//                                     <div className="bg-gray-50 p-2 rounded">
//                                         <p className="text-xs text-gray-500 font-semibold">Brand</p>
//                                         <p className="font-bold text-gray-800">
//                                             {products.product.brand}
//                                         </p>
//                                     </div>
//                                 )}
//                                 {products.product?.color && (
//                                     <div className="bg-gray-50 p-2 rounded">
//                                         <p className="text-xs text-gray-500 font-semibold">Color</p>
//                                         <p className="font-bold text-gray-800">
//                                             {products.product.color}
//                                         </p>
//                                     </div>
//                                 )}
//                                 <div className="bg-gray-50 p-2 rounded">
//                                     <p className="text-xs text-gray-500 font-semibold">Category</p>
//                                     <p className="font-bold text-gray-800">{categoryName}</p>
//                                 </div>
//                                 {!isOutOfStock && (
//                                     <div className="bg-green-50 p-2 rounded border border-green-200">
//                                         <p className="text-xs text-green-600 font-semibold">
//                                             In Stock
//                                         </p>
//                                         <p className="font-bold text-green-700">
//                                             {product.quantity} available
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 <section>
//                     <h1 className="font-bold text-lg text-orange-600">
//                         {products.product?.seller?.businessDetails?.businessName}
//                     </h1>
//                     <p className="text-gray-700 font-bold text-base">{products.product?.title}</p>

//                     <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
//                         <div className="flex gap-1 items-center">
//                             <span className="font-bold">4</span>
//                             <StarIcon sx={{ color: '#ff9644', fontSize: '17px' }} />
//                         </div>
//                         <Divider orientation="vertical" flexItem />
//                         <span className="font-bold">358 Ratings</span>
//                     </div>

//                     <div className="space-y-2">
//                         <div className="price flex items-center gap-3 mt-5 text-lg">
//                             <span
//                                 className={`font-bold text-2xl ${
//                                     isOutOfStock ? 'text-gray-400' : 'text-gray-900'
//                                 }`}
//                             >
//                                 ₹{products.product?.sellingPrice}
//                             </span>
//                             <span className="line-through text-gray-400 font-semibold">
//                                 ₹{products.product?.mrpPrice}
//                             </span>
//                             <span className="text-[#ff9644] font-bold">
//                                 {products.product?.discountPercent}% off
//                             </span>
//                         </div>
//                         <p className="text-sm font-medium">Inclusive of all taxes.</p>

//                         {/* 🔥 EMI WIDGET */}
//                         {!isOutOfStock && (products.product?.sellingPrice ?? 0) >= 5000 && (
//                             <EmiWidget
//                                 price={products.product?.sellingPrice ?? 0}
//                                 onSelectPlan={(plan) => {
//                                     setSelectedEmiPlan(plan);
//                                     console.log('🔥 EMI Plan selected:', plan);
//                                 }}
//                             />
//                         )}
//                     </div>

//                     {/* Features */}
//                     <div className="mt-7 grid grid-cols-2 gap-3">
//                         <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100 hover:shadow-md transition-all">
//                             <div className="bg-orange-500 rounded-lg p-2 float-icon">
//                                 <AssignmentReturnIcon sx={{ color: 'white', fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className="text-xs text-gray-500 font-semibold">Return Policy</p>
//                                 <p className="text-sm font-bold text-gray-800">
//                                     5 Days Returnable
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100 hover:shadow-md transition-all">
//                             <div className="bg-green-500 rounded-lg p-2 float-icon">
//                                 <LocalShippingIcon sx={{ color: 'white', fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className="text-xs text-gray-500 font-semibold">Delivery</p>
//                                 <p className="text-sm font-bold text-gray-800">Free Delivery</p>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-all">
//                             <div className="bg-blue-500 rounded-lg p-2 float-icon">
//                                 <PaymentsIcon sx={{ color: 'white', fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className="text-xs text-gray-500 font-semibold">Payment</p>
//                                 <p className="text-sm font-bold text-gray-800">Pay on Delivery</p>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100 hover:shadow-md transition-all">
//                             <div className="bg-purple-500 rounded-lg p-2 float-icon">
//                                 <WorkspacePremiumIcon sx={{ color: 'white', fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className="text-xs text-gray-500 font-semibold">Trust</p>
//                                 <p className="text-sm font-bold text-gray-800">Top Brand</p>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100 hover:shadow-md transition-all">
//                             <div className="bg-red-500 rounded-lg p-2 float-icon">
//                                 <ShieldIcon sx={{ color: 'white', fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className="text-xs text-gray-500 font-semibold">Security</p>
//                                 <p className="text-sm font-bold text-gray-800">Secure Payment</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Offers */}
//                     <div className="mt-5 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
//                         <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
//                             <LocalOfferIcon sx={{ color: '#ff9644', fontSize: 18 }} />
//                             Available Offers
//                         </h3>
//                         <div className="space-y-2 text-sm">
//                             <div className="flex items-center gap-2">
//                                 <Chip
//                                     label="10%"
//                                     size="small"
//                                     sx={{
//                                         bgcolor: '#10b981',
//                                         color: 'white',
//                                         fontWeight: 'bold',
//                                         fontSize: 10,
//                                     }}
//                                 />
//                                 <span className="text-gray-700 font-semibold">
//                                     Bank Offer: 10% off on HDFC Credit Card
//                                 </span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <Chip
//                                     label="₹100"
//                                     size="small"
//                                     sx={{
//                                         bgcolor: '#4f46e5',
//                                         color: 'white',
//                                         fontWeight: 'bold',
//                                         fontSize: 10,
//                                     }}
//                                 />
//                                 <span className="text-gray-700 font-semibold">
//                                     Special Price: Get extra ₹100 off
//                                 </span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <Chip
//                                     label="FREE"
//                                     size="small"
//                                     sx={{
//                                         bgcolor: '#f59e0b',
//                                         color: 'white',
//                                         fontWeight: 'bold',
//                                         fontSize: 10,
//                                     }}
//                                 />
//                                 <span className="text-gray-700 font-semibold">
//                                     Free Delivery on orders above ₹499
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Size */}
//                     <div className="mt-7 space-y-3">
//                         <h1 className="font-bold text-base">SELECT SIZE:</h1>
//                         <Box className="flex flex-wrap gap-3">
//                             {(() => {
//                                 const sizes = products.product?.sizes;
//                                 const sizeArray = Array.isArray(sizes)
//                                     ? sizes
//                                     : typeof sizes === 'string' && sizes
//                                       ? (sizes as string)
//                                             .split(',')
//                                             .map((s: string) => s.trim())
//                                       : [];

//                                 if (sizeArray.length > 0) {
//                                     return sizeArray.map((size: string) => (
//                                         <Button
//                                             key={size}
//                                             onClick={() => setSelectedSize(size)}
//                                             disabled={isOutOfStock}
//                                             variant={
//                                                 selectedSize === size ? 'contained' : 'outlined'
//                                             }
//                                             sx={{
//                                                 minWidth: '60px',
//                                                 borderRadius: '20px',
//                                                 fontWeight: 'bold',
//                                             }}
//                                         >
//                                             {size}
//                                         </Button>
//                                     ));
//                                 } else {
//                                     return (
//                                         <Button
//                                             onClick={() => setSelectedSize('FREE')}
//                                             disabled={isOutOfStock}
//                                             variant={
//                                                 selectedSize === 'FREE' ? 'contained' : 'outlined'
//                                             }
//                                             sx={{
//                                                 minWidth: '60px',
//                                                 borderRadius: '20px',
//                                                 fontWeight: 'bold',
//                                             }}
//                                         >
//                                             FREE
//                                         </Button>
//                                     );
//                                 }
//                             })()}
//                         </Box>
//                     </div>

//                     {/* Quantity */}
//                     {!isOutOfStock && (
//                         <div className="mt-7 space-y-2">
//                             <h1 className="font-bold text-base">QUANTITY:</h1>
//                             <div className="flex items-center gap-2 w-[140px] justify-between">
//                                 <Button
//                                     disabled={quantity === 1}
//                                     onClick={() => setQuantity(quantity - 1)}
//                                     variant="outlined"
//                                 >
//                                     <RemoveIcon />
//                                 </Button>
//                                 <span className="px-3 text-lg font-bold">{quantity}</span>
//                                 <Button
//                                     onClick={() => setQuantity(Math.min(quantity + 1, maxQuantity))}
//                                     disabled={quantity >= maxQuantity}
//                                     variant="outlined"
//                                 >
//                                     <AddIcon />
//                                 </Button>
//                             </div>
//                             {maxQuantity <= 5 && (
//                                 <p className="text-orange-600 text-xs font-bold">
//                                     ⚡ Only {maxQuantity} left in stock!
//                                 </p>
//                             )}
//                         </div>
//                     )}

//                     {/* BUTTONS */}
//                     <div className="mt-12 flex items-center gap-5">
//                         {isOutOfStock ? (
//                             <>
//                                 <Button
//                                     disabled
//                                     sx={{
//                                         py: '1rem',
//                                         fontWeight: 'bold',
//                                         bgcolor: '#cbd5e1 !important',
//                                         color: 'white !important',
//                                     }}
//                                     variant="contained"
//                                     fullWidth
//                                     startIcon={<BlockIcon />}
//                                 >
//                                     Out of Stock
//                                 </Button>
//                                 <Button
//                                     onClick={() => {
//                                         if (products.product?._id) {
//                                             dispatch(
//                                                 addProductToWishlist({
//                                                     productId: products.product._id,
//                                                 }) as any
//                                             );
//                                         }
//                                     }}
//                                     sx={{ py: '1rem', fontWeight: 'bold' }}
//                                     color="secondary"
//                                     variant="contained"
//                                     fullWidth
//                                     startIcon={<FavoriteBorderIcon />}
//                                 >
//                                     Notify Me
//                                 </Button>
//                             </>
//                         ) : (
//                             <>
//                                 <Button
//                                     onClick={handleAddCart}
//                                     sx={{ py: '1rem', fontWeight: 'bold' }}
//                                     variant="contained"
//                                     fullWidth
//                                     startIcon={<AddShoppingCartIcon />}
//                                 >
//                                     Add To Cart
//                                 </Button>
//                                 <Button
//                                     onClick={handleBuyNow}
//                                     sx={{ py: '1rem', fontWeight: 'bold' }}
//                                     color="warning"
//                                     variant="contained"
//                                     fullWidth
//                                     startIcon={<FlashOnIcon />}
//                                 >
//                                     Buy Now
//                                 </Button>
//                             </>
//                         )}
//                     </div>

//                     {/* Reviews */}
//                     <div className="ratings w-full mt-10">
//                         <h1 className="font-bold text-lg pb-4">Review &amp; Ratings</h1>
//                         <RatingCard totalReview={review.reviews.length} />
//                         <div className="mt-10">
//                             <div className="space-y-5">
//                                 {review.reviews.map((item: any, index: number) => (
//                                     <div className="space-y-5" key={item._id || index}>
//                                         <ProductReviewCard item={item} />
//                                         <Divider />
//                                     </div>
//                                 ))}
//                                 <Button
//                                     onClick={() => navigate(`/reviews/${productId}`)}
//                                     sx={{ fontWeight: 'bold' }}
//                                 >
//                                     View All {review.reviews.length} Reviews
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </div>

//             {/* Similar */}
//             <section className="mt-20">
//                 <h1 className="text-lg font-bold">Similar Product</h1>
//                 <div className="pt-5">
//                     <SmilarProduct />
//                 </div>
//             </section>

//             {/* Modal */}
//             <Modal open={open} onClose={handleClose}>
//                 <Box sx={{ ...style, maxWidth: '90%', maxHeight: '90%' }}>
//                     <ZoomableImage
//                         src={products.product?.images?.[selectedImage] || ''}
//                         alt=""
//                     />
//                 </Box>
//             </Modal>
//         </div>
//     );
// };

// export default ProductDetails;








// import StarIcon from '@mui/icons-material/Star';
// import { Box, Button, Divider, IconButton, Modal, Chip } from '@mui/material';
// import ShieldIcon from '@mui/icons-material/Shield';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
// import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from '@mui/icons-material/Add';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FlashOnIcon from '@mui/icons-material/FlashOn';
// import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
// import PaymentsIcon from '@mui/icons-material/Payments';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import VerifiedIcon from '@mui/icons-material/Verified';
// import BlockIcon from '@mui/icons-material/Block';
// import ShareIcon from '@mui/icons-material/Share';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import CheckIcon from '@mui/icons-material/Check';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// import SmilarProduct from '../SimilarProduct/SmilarProduct';
// import ZoomableImage from './ZoomableImage';
// import EmiWidget from '../../../../components/EMI/EmiBadge';
// import { useAppDispatch, useAppSelector } from '../../../../Redux Toolkit/Store';
// import { useNavigate, useParams } from 'react-router-dom';
// import { fetchProductById, getAllProducts } from '../../../../Redux Toolkit/Customer/ProductSlice';
// import { addItemToCart } from '../../../../Redux Toolkit/Customer/CartSlice';
// import { addProductToWishlist } from '../../../../Redux Toolkit/Customer/WishlistSlice';
// import { isWishlisted } from '../../../../util/isWishlisted';
// import ProductReviewCard from '../../Review/ProductReviewCard';
// import RatingCard from '../../Review/RatingCard';
// import { fetchReviewsByProductId } from '../../../../Redux Toolkit/Customer/ReviewSlice';
// import { useState, useEffect } from 'react';

// const style = {
//     position: 'absolute' as const,
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 'auto',
//     height: '100%',
//     boxShadow: 24,
//     outline: 'none',
// };

// const ProductDetails = () => {
//     const [open, setOpen] = useState<boolean>(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     const dispatch = useAppDispatch();
//     const { products, review, wishlist } = useAppSelector((store: any) => store);
//     const navigate = useNavigate();
//     const { productId, categoryId } = useParams<{ productId: string; categoryId: string }>();
//     const [selectedImage, setSelectedImage] = useState<number>(0);
//     const [quantity, setQuantity] = useState<number>(1);
//     const [selectedSize, setSelectedSize] = useState<string>('');

//     // 🔥 Share state
//     const [showShareMenu, setShowShareMenu] = useState<boolean>(false);
//     const [copied, setCopied] = useState<boolean>(false);

//     // 🔥 EMI Plan state
//     const [selectedEmiPlan, setSelectedEmiPlan] = useState<{
//         bankCode: string;
//         bankName: string;
//         tenure: number;
//         interestRate: number;
//         emiAmount: number;
//         totalPayable: number;
//     } | null>(null);

//     /* 🔥 OUT OF STOCK CHECK */
//     const product = products.product;
//     const isOutOfStock = !product?.quantity || product.quantity <= 0;
//     const maxQuantity = product?.quantity || 0;

//     useEffect(() => {
//         if (products.product?.sizes) {
//             const sizes = products.product.sizes;
//             const sizeArray = Array.isArray(sizes)
//                 ? sizes
//                 : typeof sizes === 'string'
//                   ? (sizes as string).split(',').map((s: string) => s.trim())
//                   : [];

//             if (sizeArray.length > 0) {
//                 setSelectedSize(sizeArray[0]);
//             } else {
//                 setSelectedSize('FREE');
//             }
//         } else {
//             setSelectedSize('FREE');
//         }
//     }, [products.product]);

//     useEffect(() => {
//         if (productId) {
//             dispatch(fetchProductById(productId) as any);
//             dispatch(fetchReviewsByProductId({ productId }) as any);
//         }
//         dispatch(getAllProducts({ category: categoryId }) as any);
//     }, [productId, categoryId, dispatch]);

//     // ✅ Auto Image Slide (5 seconds)
//     useEffect(() => {
//         const images = products.product?.images;
//         if (!images || images.length <= 1) return;

//         const interval = setInterval(() => {
//             setSelectedImage((prev) => (prev + 1) % images.length);
//         }, 5000);

//         return () => clearInterval(interval);
//     }, [products.product?.images]);

//     /* ═══════════════════════════════════════════════
//        🔥 SHARE HANDLERS
//        ═══════════════════════════════════════════════ */

//     // Product URL
//     const getProductUrl = () => {
//         return `${window.location.origin}/product/${categoryId}/${productId}`;
//     };

//     // Copy to clipboard
//     const handleCopyLink = async () => {
//         try {
//             await navigator.clipboard.writeText(getProductUrl());
//             setCopied(true);
//             setTimeout(() => setCopied(false), 2000);
//         } catch {
//             const textArea = document.createElement('textarea');
//             textArea.value = getProductUrl();
//             document.body.appendChild(textArea);
//             textArea.select();
//             document.execCommand('copy');
//             document.body.removeChild(textArea);
//             setCopied(true);
//             setTimeout(() => setCopied(false), 2000);
//         }
//     };

//     // Native share (mobile)
//     const handleNativeShare = async () => {
//         const shareData = {
//             title: products.product?.title || 'Check this product',
//             text: `Check out ${products.product?.title} on SelfySnap!`,
//             url: getProductUrl(),
//         };

//         try {
//             if (navigator.share) {
//                 await navigator.share(shareData);
//                 setShowShareMenu(false);
//             } else {
//                 handleCopyLink();
//             }
//         } catch (err: any) {
//             if (err.name !== 'AbortError') {
//                 console.error('Share error:', err);
//             }
//         }
//     };

//     // WhatsApp share
//     const handleWhatsAppShare = () => {
//         const text = encodeURIComponent(
//             `Check out ${products.product?.title} on SelfySnap!\n${getProductUrl()}`
//         );
//         window.open(`https://wa.me/?text=${text}`, '_blank');
//         setShowShareMenu(false);
//     };

//     // 🔥 Add to Cart
//     const handleAddCart = (): void => {
//         if (isOutOfStock) return;

//         if (selectedEmiPlan) {
//             localStorage.setItem('selectedEmiPlan', JSON.stringify(selectedEmiPlan));
//         } else {
//             localStorage.removeItem('selectedEmiPlan');
//         }

//         dispatch(
//             addItemToCart({
//                 jwt: localStorage.getItem('jwt') || '',
//                 request: { productId: productId || '', size: selectedSize || 'FREE', quantity },
//             }) as any
//         );

//         navigate('/cart');
//     };

//     // 🔥 Buy Now
//     const handleBuyNow = (): void => {
//         if (isOutOfStock) return;
//         if (!localStorage.getItem('jwt')) {
//             navigate('/login');
//             return;
//         }
//         if (products.product) {
//             if (selectedEmiPlan) {
//                 localStorage.setItem('selectedEmiPlan', JSON.stringify(selectedEmiPlan));
//             } else {
//                 localStorage.removeItem('selectedEmiPlan');
//             }

//             dispatch(
//                 addItemToCart({
//                     jwt: localStorage.getItem('jwt') || '',
//                     request: {
//                         productId: productId || '',
//                         size: selectedSize || 'FREE',
//                         quantity,
//                     },
//                 }) as any
//             );

//             navigate('/cart');
//         }
//     };

//     const categoryName =
//         typeof products.product?.category === 'object'
//             ? products.product?.category?.name
//             : products.product?.category || 'N/A';

//     return (
//         <div className="px-5 lg:px-20 pt-10">
//             <style>{`
//                 @keyframes floatIcon {
//                     0%, 100% { transform: translateY(0); }
//                     50% { transform: translateY(-3px); }
//                 }
//                 .float-icon {
//                     animation: floatIcon 3s ease-in-out infinite;
//                 }
//             `}</style>

//             {/* 🔥 OUT OF STOCK TOP BANNER */}
//             {isOutOfStock && (
//                 <div className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-2xl p-5 flex items-center gap-4 shadow-md">
//                     <div className="bg-red-500 rounded-full p-3 flex-shrink-0">
//                         <BlockIcon sx={{ fontSize: 28, color: 'white' }} />
//                     </div>
//                     <div>
//                         <h3 className="text-red-700 font-extrabold text-lg">Out of Stock</h3>
//                         <p className="text-red-600 text-sm mt-0.5">
//                             This product is currently unavailable. Check back soon or explore similar
//                             products below!
//                         </p>
//                     </div>
//                 </div>
//             )}

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//                 <section className="flex flex-col lg:flex-row gap-5">
//                     {/* Thumbnails */}
//                     <div className="w-full lg:w-[15%] flex gap-3 overflow-x-auto lg:overflow-x-visible lg:flex-col py-2">
//                         {products.product?.images?.map((item: string, index: number) => (
//                             <img
//                                 key={index}
//                                 onClick={() => setSelectedImage(index)}
//                                 className={`w-[60px] lg:w-full cursor-pointer rounded-md border-2 transition-all ${
//                                     selectedImage === index
//                                         ? 'border-orange-500 shadow-md scale-105'
//                                         : 'border-transparent hover:border-orange-300'
//                                 } ${isOutOfStock ? 'opacity-60' : ''}`}
//                                 src={item}
//                                 alt=""
//                             />
//                         ))}
//                     </div>

//                     {/* Main Image */}
//                     <div className="w-full lg:w-[85%] relative">
//                         <div className="relative overflow-hidden rounded-md">
//                             {isOutOfStock && (
//                                 <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
//                                     <div className="bg-white px-6 py-3 rounded-xl shadow-2xl border-2 border-red-500 rotate-[-5deg]">
//                                         <p className="text-red-600 font-extrabold text-lg uppercase tracking-wider">
//                                             🚫 Out of Stock
//                                         </p>
//                                     </div>
//                                 </div>
//                             )}

//                             <img
//                                 onClick={handleOpen}
//                                 className="w-full rounded-md cursor-zoom-in transition-all duration-700"
//                                 src={products.product?.images?.[selectedImage]}
//                                 alt=""
//                                 style={{ filter: isOutOfStock ? 'grayscale(60%)' : 'none' }}
//                             />

//                             <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur">
//                                 {selectedImage + 1} / {products.product?.images?.length || 1}
//                             </div>

//                             {products.product?.images && products.product.images.length > 1 && (
//                                 <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
//                                     {products.product.images.map((_: string, idx: number) => (
//                                         <button
//                                             key={idx}
//                                             onClick={() => setSelectedImage(idx)}
//                                             className={`h-1.5 rounded-full transition-all ${
//                                                 idx === selectedImage
//                                                     ? 'w-6 bg-white'
//                                                     : 'w-1.5 bg-white/60'
//                                             }`}
//                                         />
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         {/* 🔥 SHARE BUTTON */}
//                         <IconButton
//                             onClick={() => setShowShareMenu(!showShareMenu)}
//                             sx={{
//                                 position: 'absolute',
//                                 top: 12,
//                                 right: 64,
//                                 bgcolor: 'rgba(255,255,255,0.9)',
//                                 '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
//                                 boxShadow: 2,
//                                 zIndex: 20,
//                             }}
//                             title="Share product"
//                         >
//                             <ShareIcon sx={{ color: '#2874f0' }} />
//                         </IconButton>

//                         {/* 🔥 SHARE MENU */}
//                         {showShareMenu && (
//                             <>
//                                 <div
//                                     className="fixed inset-0 z-30"
//                                     onClick={() => setShowShareMenu(false)}
//                                 />

//                                 <div className="absolute top-20 right-16 z-40 bg-white rounded-xl shadow-2xl border border-gray-100 p-2 w-56">
//                                     <p className="text-xs font-bold text-gray-500 px-3 py-2">
//                                         Share this product
//                                     </p>

//                                     {/* Copy Link */}
//                                     <button
//                                         type="button"
//                                         onClick={handleCopyLink}
//                                         className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-all text-left"
//                                     >
//                                         {copied ? (
//                                             <CheckIcon sx={{ fontSize: 20, color: '#10b981' }} />
//                                         ) : (
//                                             <ContentCopyIcon sx={{ fontSize: 20, color: '#2874f0' }} />
//                                         )}
//                                         <span className="text-sm font-semibold text-gray-700">
//                                             {copied ? 'Link Copied!' : 'Copy Link'}
//                                         </span>
//                                     </button>

//                                     {/* WhatsApp */}
//                                     <button
//                                         type="button"
//                                         onClick={handleWhatsAppShare}
//                                         className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-all text-left"
//                                     >
//                                         <WhatsAppIcon sx={{ fontSize: 20, color: '#25D366' }} />
//                                         <span className="text-sm font-semibold text-gray-700">
//                                             Share on WhatsApp
//                                         </span>
//                                     </button>

//                                     {/* Native Share */}
//                                     <button
//                                         type="button"
//                                         onClick={handleNativeShare}
//                                         className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-all text-left"
//                                     >
//                                         <ShareIcon sx={{ fontSize: 20, color: '#8b5cf6' }} />
//                                         <span className="text-sm font-semibold text-gray-700">
//                                             More Options
//                                         </span>
//                                     </button>
//                                 </div>
//                             </>
//                         )}

//                         {/* Wishlist */}
//                         <IconButton
//                             onClick={() => {
//                                 if (!localStorage.getItem('jwt')) {
//                                     navigate('/login');
//                                     return;
//                                 }
//                                 if (products.product?._id) {
//                                     dispatch(
//                                         addProductToWishlist({
//                                             productId: products.product._id,
//                                         }) as any
//                                     );
//                                 }
//                             }}
//                             sx={{
//                                 position: 'absolute',
//                                 top: 12,
//                                 right: 12,
//                                 bgcolor: 'rgba(255,255,255,0.9)',
//                                 '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
//                                 boxShadow: 2,
//                                 zIndex: 20,
//                             }}
//                         >
//                             {products.product &&
//                             wishlist.wishlist &&
//                             isWishlisted(wishlist.wishlist, products.product) ? (
//                                 <FavoriteIcon sx={{ color: '#ff4081' }} />
//                             ) : (
//                                 <FavoriteBorderIcon sx={{ color: '#ff4081' }} />
//                             )}
//                         </IconButton>

//                         {/* Description */}
//                         <div className="mt-8 p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
//                             <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
//                                 <span className="h-1 w-6 bg-orange-500 rounded-full" />
//                                 Product Description
//                             </h2>

//                             <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm font-medium">
//                                 {products.product?.description}
//                             </p>

//                             <Divider sx={{ my: 3 }} />

//                             <h3 className="text-md font-bold mb-3 text-gray-800">Key Features</h3>
//                             <ul className="space-y-2 text-sm text-gray-700">
//                                 <li className="flex items-start gap-2">
//                                     <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
//                                     <span className="font-semibold">
//                                         Premium quality material for long-lasting durability
//                                     </span>
//                                 </li>
//                                 <li className="flex items-start gap-2">
//                                     <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
//                                     <span className="font-semibold">
//                                         Designed for everyday comfort and style
//                                     </span>
//                                 </li>
//                                 <li className="flex items-start gap-2">
//                                     <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
//                                     <span className="font-semibold">Easy to maintain and clean</span>
//                                 </li>
//                                 <li className="flex items-start gap-2">
//                                     <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
//                                     <span className="font-semibold">
//                                         100% Genuine Product with brand warranty
//                                     </span>
//                                 </li>
//                             </ul>

//                             <Divider sx={{ my: 3 }} />

//                             <h3 className="text-md font-bold mb-3 text-gray-800">
//                                 📋 Product Details
//                             </h3>
//                             <div className="grid grid-cols-2 gap-3 text-sm">
//                                 {products.product?.brand && (
//                                     <div className="bg-gray-50 p-2 rounded">
//                                         <p className="text-xs text-gray-500 font-semibold">Brand</p>
//                                         <p className="font-bold text-gray-800">
//                                             {products.product.brand}
//                                         </p>
//                                     </div>
//                                 )}
//                                 {products.product?.color && (
//                                     <div className="bg-gray-50 p-2 rounded">
//                                         <p className="text-xs text-gray-500 font-semibold">Color</p>
//                                         <p className="font-bold text-gray-800">
//                                             {products.product.color}
//                                         </p>
//                                     </div>
//                                 )}
//                                 <div className="bg-gray-50 p-2 rounded">
//                                     <p className="text-xs text-gray-500 font-semibold">Category</p>
//                                     <p className="font-bold text-gray-800">{categoryName}</p>
//                                 </div>
//                                 {!isOutOfStock && (
//                                     <div className="bg-green-50 p-2 rounded border border-green-200">
//                                         <p className="text-xs text-green-600 font-semibold">
//                                             In Stock
//                                         </p>
//                                         <p className="font-bold text-green-700">
//                                             {product.quantity} available
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 <section>
//                     <h1 className="font-bold text-lg text-orange-600">
//                         {products.product?.seller?.businessDetails?.businessName}
//                     </h1>
//                     <p className="text-gray-700 font-bold text-base">{products.product?.title}</p>

//                     <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
//                         <div className="flex gap-1 items-center">
//                             <span className="font-bold">4</span>
//                             <StarIcon sx={{ color: '#ff9644', fontSize: '17px' }} />
//                         </div>
//                         <Divider orientation="vertical" flexItem />
//                         <span className="font-bold">358 Ratings</span>
//                     </div>

//                     <div className="space-y-2">
//                         <div className="price flex items-center gap-3 mt-5 text-lg">
//                             <span
//                                 className={`font-bold text-2xl ${
//                                     isOutOfStock ? 'text-gray-400' : 'text-gray-900'
//                                 }`}
//                             >
//                                 ₹{products.product?.sellingPrice}
//                             </span>
//                             <span className="line-through text-gray-400 font-semibold">
//                                 ₹{products.product?.mrpPrice}
//                             </span>
//                             <span className="text-[#ff9644] font-bold">
//                                 {products.product?.discountPercent}% off
//                             </span>
//                         </div>
//                         <p className="text-sm font-medium">Inclusive of all taxes.</p>

//                         {/* EMI WIDGET */}
//                         {!isOutOfStock && (products.product?.sellingPrice ?? 0) >= 5000 && (
//                             <EmiWidget
//                                 price={products.product?.sellingPrice ?? 0}
//                                 onSelectPlan={(plan) => {
//                                     setSelectedEmiPlan(plan);
//                                 }}
//                             />
//                         )}
//                     </div>

//                     {/* Features */}
//                     <div className="mt-7 grid grid-cols-2 gap-3">
//                         <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100 hover:shadow-md transition-all">
//                             <div className="bg-orange-500 rounded-lg p-2 float-icon">
//                                 <AssignmentReturnIcon sx={{ color: 'white', fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className="text-xs text-gray-500 font-semibold">Return Policy</p>
//                                 <p className="text-sm font-bold text-gray-800">
//                                     5 Days Returnable
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100 hover:shadow-md transition-all">
//                             <div className="bg-green-500 rounded-lg p-2 float-icon">
//                                 <LocalShippingIcon sx={{ color: 'white', fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className="text-xs text-gray-500 font-semibold">Delivery</p>
//                                 <p className="text-sm font-bold text-gray-800">Free Delivery</p>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-all">
//                             <div className="bg-blue-500 rounded-lg p-2 float-icon">
//                                 <PaymentsIcon sx={{ color: 'white', fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className="text-xs text-gray-500 font-semibold">Payment</p>
//                                 <p className="text-sm font-bold text-gray-800">Pay on Delivery</p>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100 hover:shadow-md transition-all">
//                             <div className="bg-purple-500 rounded-lg p-2 float-icon">
//                                 <WorkspacePremiumIcon sx={{ color: 'white', fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className="text-xs text-gray-500 font-semibold">Trust</p>
//                                 <p className="text-sm font-bold text-gray-800">Top Brand</p>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100 hover:shadow-md transition-all">
//                             <div className="bg-red-500 rounded-lg p-2 float-icon">
//                                 <ShieldIcon sx={{ color: 'white', fontSize: 20 }} />
//                             </div>
//                             <div>
//                                 <p className="text-xs text-gray-500 font-semibold">Security</p>
//                                 <p className="text-sm font-bold text-gray-800">Secure Payment</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Offers */}
//                     <div className="mt-5 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
//                         <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
//                             <LocalOfferIcon sx={{ color: '#ff9644', fontSize: 18 }} />
//                             Available Offers
//                         </h3>
//                         <div className="space-y-2 text-sm">
//                             <div className="flex items-center gap-2">
//                                 <Chip
//                                     label="10%"
//                                     size="small"
//                                     sx={{
//                                         bgcolor: '#10b981',
//                                         color: 'white',
//                                         fontWeight: 'bold',
//                                         fontSize: 10,
//                                     }}
//                                 />
//                                 <span className="text-gray-700 font-semibold">
//                                     Bank Offer: 10% off on HDFC Credit Card
//                                 </span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <Chip
//                                     label="₹100"
//                                     size="small"
//                                     sx={{
//                                         bgcolor: '#4f46e5',
//                                         color: 'white',
//                                         fontWeight: 'bold',
//                                         fontSize: 10,
//                                     }}
//                                 />
//                                 <span className="text-gray-700 font-semibold">
//                                     Special Price: Get extra ₹100 off
//                                 </span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <Chip
//                                     label="FREE"
//                                     size="small"
//                                     sx={{
//                                         bgcolor: '#f59e0b',
//                                         color: 'white',
//                                         fontWeight: 'bold',
//                                         fontSize: 10,
//                                     }}
//                                 />
//                                 <span className="text-gray-700 font-semibold">
//                                     Free Delivery on orders above ₹499
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Size */}
//                     <div className="mt-7 space-y-3">
//                         <h1 className="font-bold text-base">SELECT SIZE:</h1>
//                         <Box className="flex flex-wrap gap-3">
//                             {(() => {
//                                 const sizes = products.product?.sizes;
//                                 const sizeArray = Array.isArray(sizes)
//                                     ? sizes
//                                     : typeof sizes === 'string' && sizes
//                                       ? (sizes as string)
//                                             .split(',')
//                                             .map((s: string) => s.trim())
//                                       : [];

//                                 if (sizeArray.length > 0) {
//                                     return sizeArray.map((size: string) => (
//                                         <Button
//                                             key={size}
//                                             onClick={() => setSelectedSize(size)}
//                                             disabled={isOutOfStock}
//                                             variant={
//                                                 selectedSize === size ? 'contained' : 'outlined'
//                                             }
//                                             sx={{
//                                                 minWidth: '60px',
//                                                 borderRadius: '20px',
//                                                 fontWeight: 'bold',
//                                             }}
//                                         >
//                                             {size}
//                                         </Button>
//                                     ));
//                                 } else {
//                                     return (
//                                         <Button
//                                             onClick={() => setSelectedSize('FREE')}
//                                             disabled={isOutOfStock}
//                                             variant={
//                                                 selectedSize === 'FREE' ? 'contained' : 'outlined'
//                                             }
//                                             sx={{
//                                                 minWidth: '60px',
//                                                 borderRadius: '20px',
//                                                 fontWeight: 'bold',
//                                             }}
//                                         >
//                                             FREE
//                                         </Button>
//                                     );
//                                 }
//                             })()}
//                         </Box>
//                     </div>

//                     {/* Quantity */}
//                     {!isOutOfStock && (
//                         <div className="mt-7 space-y-2">
//                             <h1 className="font-bold text-base">QUANTITY:</h1>
//                             <div className="flex items-center gap-2 w-[140px] justify-between">
//                                 <Button
//                                     disabled={quantity === 1}
//                                     onClick={() => setQuantity(quantity - 1)}
//                                     variant="outlined"
//                                 >
//                                     <RemoveIcon />
//                                 </Button>
//                                 <span className="px-3 text-lg font-bold">{quantity}</span>
//                                 <Button
//                                     onClick={() => setQuantity(Math.min(quantity + 1, maxQuantity))}
//                                     disabled={quantity >= maxQuantity}
//                                     variant="outlined"
//                                 >
//                                     <AddIcon />
//                                 </Button>
//                             </div>
//                             {maxQuantity <= 5 && (
//                                 <p className="text-orange-600 text-xs font-bold">
//                                     ⚡ Only {maxQuantity} left in stock!
//                                 </p>
//                             )}
//                         </div>
//                     )}

//                     {/* BUTTONS */}
//                     <div className="mt-12 flex items-center gap-5">
//                         {isOutOfStock ? (
//                             <>
//                                 <Button
//                                     disabled
//                                     sx={{
//                                         py: '1rem',
//                                         fontWeight: 'bold',
//                                         bgcolor: '#cbd5e1 !important',
//                                         color: 'white !important',
//                                     }}
//                                     variant="contained"
//                                     fullWidth
//                                     startIcon={<BlockIcon />}
//                                 >
//                                     Out of Stock
//                                 </Button>
//                                 <Button
//                                     onClick={() => {
//                                         if (products.product?._id) {
//                                             dispatch(
//                                                 addProductToWishlist({
//                                                     productId: products.product._id,
//                                                 }) as any
//                                             );
//                                         }
//                                     }}
//                                     sx={{ py: '1rem', fontWeight: 'bold' }}
//                                     color="secondary"
//                                     variant="contained"
//                                     fullWidth
//                                     startIcon={<FavoriteBorderIcon />}
//                                 >
//                                     Notify Me
//                                 </Button>
//                             </>
//                         ) : (
//                             <>
//                                 <Button
//                                     onClick={handleAddCart}
//                                     sx={{ py: '1rem', fontWeight: 'bold' }}
//                                     variant="contained"
//                                     fullWidth
//                                     startIcon={<AddShoppingCartIcon />}
//                                 >
//                                     Add To Cart
//                                 </Button>
//                                 <Button
//                                     onClick={handleBuyNow}
//                                     sx={{ py: '1rem', fontWeight: 'bold' }}
//                                     color="warning"
//                                     variant="contained"
//                                     fullWidth
//                                     startIcon={<FlashOnIcon />}
//                                 >
//                                     Buy Now
//                                 </Button>
//                             </>
//                         )}
//                     </div>

//                     {/* Reviews */}
//                     <div className="ratings w-full mt-10">
//                         <h1 className="font-bold text-lg pb-4">Review &amp; Ratings</h1>
//                         <RatingCard totalReview={review.reviews.length} />
//                         <div className="mt-10">
//                             <div className="space-y-5">
//                                 {review.reviews.map((item: any, index: number) => (
//                                     <div className="space-y-5" key={item._id || index}>
//                                         <ProductReviewCard item={item} />
//                                         <Divider />
//                                     </div>
//                                 ))}
//                                 <Button
//                                     onClick={() => navigate(`/reviews/${productId}`)}
//                                     sx={{ fontWeight: 'bold' }}
//                                 >
//                                     View All {review.reviews.length} Reviews
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </div>

//             {/* Similar */}
//             <section className="mt-20">
//                 <h1 className="text-lg font-bold">Similar Product</h1>
//                 <div className="pt-5">
//                     <SmilarProduct />
//                 </div>
//             </section>

//             {/* Modal */}
//             <Modal open={open} onClose={handleClose}>
//                 <Box sx={{ ...style, maxWidth: '90%', maxHeight: '90%' }}>
//                     <ZoomableImage
//                         src={products.product?.images?.[selectedImage] || ''}
//                         alt=""
//                     />
//                 </Box>
//             </Modal>
//         </div>
//     );
// };

// export default ProductDetails;














import StarIcon from '@mui/icons-material/Star';
import { Box, Button, Divider, IconButton, Modal, Chip } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VerifiedIcon from '@mui/icons-material/Verified';
import BlockIcon from '@mui/icons-material/Block';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import BrushIcon from '@mui/icons-material/Brush';

import SmilarProduct from '../SimilarProduct/SmilarProduct';
import ZoomableImage from './ZoomableImage';
import EmiWidget from '../../../../components/EMI/EmiBadge';
import { useAppDispatch, useAppSelector } from '../../../../Redux Toolkit/Store';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById, getAllProducts } from '../../../../Redux Toolkit/Customer/ProductSlice';
import { addItemToCart } from '../../../../Redux Toolkit/Customer/CartSlice';
import { addProductToWishlist } from '../../../../Redux Toolkit/Customer/WishlistSlice';
import { isWishlisted } from '../../../../util/isWishlisted';
import ProductReviewCard from '../../Review/ProductReviewCard';
import RatingCard from '../../Review/RatingCard';
import { fetchReviewsByProductId } from '../../../../Redux Toolkit/Customer/ReviewSlice';
import { useState, useEffect } from 'react';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: '100%',
    boxShadow: 24,
    outline: 'none',
};

const ProductDetails = () => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();
    const { products, review, wishlist } = useAppSelector((store: any) => store);
    const navigate = useNavigate();
    const { productId, categoryId } = useParams<{ productId: string; categoryId: string }>();
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedSize, setSelectedSize] = useState<string>('');

    // 🔥 Share state
    const [showShareMenu, setShowShareMenu] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);

    // 🔥 EMI Plan state
    const [selectedEmiPlan, setSelectedEmiPlan] = useState<{
        bankCode: string;
        bankName: string;
        tenure: number;
        interestRate: number;
        emiAmount: number;
        totalPayable: number;
    } | null>(null);

    /* 🔥 OUT OF STOCK CHECK */
    const product = products.product;
    const isOutOfStock = !product?.quantity || product.quantity <= 0;
    const maxQuantity = product?.quantity || 0;

    /* 🔥 CUSTOM PRODUCT CHECK */
    const isCustomizable = product?.isCustomizable || false;

    /* 🔥 SAFE BRAND NAME */
    const brandName =
        typeof product?.brand === 'object'
            ? product?.brand?.name || 'N/A'
            : product?.brand || 'N/A';

    /* 🔥 SAFE CATEGORY NAME */
    const categoryName =
        typeof product?.category === 'object'
            ? product?.category?.name || 'N/A'
            : product?.category || 'N/A';

    useEffect(() => {
        if (products.product?.sizes) {
            const sizes = products.product.sizes;
            const sizeArray = Array.isArray(sizes)
                ? sizes
                : typeof sizes === 'string'
                  ? (sizes as string).split(',').map((s: string) => s.trim())
                  : [];

            if (sizeArray.length > 0) {
                setSelectedSize(sizeArray[0]);
            } else {
                setSelectedSize('FREE');
            }
        } else {
            setSelectedSize('FREE');
        }
    }, [products.product]);

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(productId) as any);
            dispatch(fetchReviewsByProductId({ productId }) as any);
        }
        dispatch(getAllProducts({ category: categoryId }) as any);
    }, [productId, categoryId, dispatch]);

    // ✅ Auto Image Slide (5 seconds)
    useEffect(() => {
        const images = products.product?.images;
        if (!images || images.length <= 1) return;

        const interval = setInterval(() => {
            setSelectedImage((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [products.product?.images]);

    /* ═══════════════════════════════════════════════
       🔥 SHARE HANDLERS
       ═══════════════════════════════════════════════ */
    const getProductUrl = () => {
        return `${window.location.origin}/product/${categoryId}/${productId}`;
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(getProductUrl());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const textArea = document.createElement('textarea');
            textArea.value = getProductUrl();
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleNativeShare = async () => {
        const shareData = {
            title: products.product?.title || 'Check this product',
            text: `Check out ${products.product?.title} on SelfySnap!`,
            url: getProductUrl(),
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                setShowShareMenu(false);
            } else {
                handleCopyLink();
            }
        } catch (err: any) {
            if (err.name !== 'AbortError') {
                console.error('Share error:', err);
            }
        }
    };

    const handleWhatsAppShare = () => {
        const text = encodeURIComponent(
            `Check out ${products.product?.title} on SelfySnap!\n${getProductUrl()}`
        );
        window.open(`https://wa.me/?text=${text}`, '_blank');
        setShowShareMenu(false);
    };

    // 🔥 Add to Cart
    const handleAddCart = (): void => {
        if (isOutOfStock) return;

        if (selectedEmiPlan) {
            localStorage.setItem('selectedEmiPlan', JSON.stringify(selectedEmiPlan));
        } else {
            localStorage.removeItem('selectedEmiPlan');
        }

        dispatch(
            addItemToCart({
                jwt: localStorage.getItem('jwt') || '',
                request: { productId: productId || '', size: selectedSize || 'FREE', quantity },
            }) as any
        );

        navigate('/cart');
    };

    // 🔥 Buy Now
    const handleBuyNow = (): void => {
        if (isOutOfStock) return;
        if (!localStorage.getItem('jwt')) {
            navigate('/login');
            return;
        }
        if (products.product) {
            if (selectedEmiPlan) {
                localStorage.setItem('selectedEmiPlan', JSON.stringify(selectedEmiPlan));
            } else {
                localStorage.removeItem('selectedEmiPlan');
            }

            dispatch(
                addItemToCart({
                    jwt: localStorage.getItem('jwt') || '',
                    request: {
                        productId: productId || '',
                        size: selectedSize || 'FREE',
                        quantity,
                    },
                }) as any
            );

            navigate('/cart');
        }
    };

    // 🔥 Customize Button Click
    const handleCustomizeClick = () => {
        if (!localStorage.getItem('jwt')) {
            navigate('/login');
            return;
        }
        navigate(`/customize/${productId}`);
    };

    return (
        <div className="px-5 lg:px-20 pt-10">
            <style>{`
                @keyframes floatIcon {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
                .float-icon {
                    animation: floatIcon 3s ease-in-out infinite;
                }
            `}</style>

            {/* 🔥 OUT OF STOCK TOP BANNER */}
            {isOutOfStock && (
                <div className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-2xl p-5 flex items-center gap-4 shadow-md">
                    <div className="bg-red-500 rounded-full p-3 flex-shrink-0">
                        <BlockIcon sx={{ fontSize: 28, color: 'white' }} />
                    </div>
                    <div>
                        <h3 className="text-red-700 font-extrabold text-lg">Out of Stock</h3>
                        <p className="text-red-600 text-sm mt-0.5">
                            This product is currently unavailable. Check back soon or explore similar
                            products below!
                        </p>
                    </div>
                </div>
            )}

            {/* 🔥 CUSTOM PRODUCT BANNER */}
            {isCustomizable && !isOutOfStock && (
                <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl p-5 flex items-center gap-4 shadow-md">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-3 flex-shrink-0">
                        <BrushIcon sx={{ fontSize: 28, color: 'white' }} />
                    </div>
                    <div>
                        <h3 className="text-purple-700 font-extrabold text-lg">
                            🎨 Customizable Product
                        </h3>
                        <p className="text-purple-600 text-sm mt-0.5">
                            Apni image upload karke is product ko personalize karein!
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <section className="flex flex-col lg:flex-row gap-5">
                    {/* Thumbnails */}
                    <div className="w-full lg:w-[15%] flex gap-3 overflow-x-auto lg:overflow-x-visible lg:flex-col py-2">
                        {products.product?.images?.map((item: string, index: number) => (
                            <img
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`w-[60px] lg:w-full cursor-pointer rounded-md border-2 transition-all ${
                                    selectedImage === index
                                        ? 'border-orange-500 shadow-md scale-105'
                                        : 'border-transparent hover:border-orange-300'
                                } ${isOutOfStock ? 'opacity-60' : ''}`}
                                src={item}
                                alt=""
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="w-full lg:w-[85%] relative">
                        <div className="relative overflow-hidden rounded-md">
                            {isOutOfStock && (
                                <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
                                    <div className="bg-white px-6 py-3 rounded-xl shadow-2xl border-2 border-red-500 rotate-[-5deg]">
                                        <p className="text-red-600 font-extrabold text-lg uppercase tracking-wider">
                                            🚫 Out of Stock
                                        </p>
                                    </div>
                                </div>
                            )}

                            <img
                                onClick={handleOpen}
                                className="w-full rounded-md cursor-zoom-in transition-all duration-700"
                                src={products.product?.images?.[selectedImage]}
                                alt=""
                                style={{ filter: isOutOfStock ? 'grayscale(60%)' : 'none' }}
                            />

                            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur">
                                {selectedImage + 1} / {products.product?.images?.length || 1}
                            </div>

                            {products.product?.images && products.product.images.length > 1 && (
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                    {products.product.images.map((_: string, idx: number) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`h-1.5 rounded-full transition-all ${
                                                idx === selectedImage
                                                    ? 'w-6 bg-white'
                                                    : 'w-1.5 bg-white/60'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 🔥 SHARE BUTTON */}
                        <IconButton
                            onClick={() => setShowShareMenu(!showShareMenu)}
                            sx={{
                                position: 'absolute',
                                top: 12,
                                right: 64,
                                bgcolor: 'rgba(255,255,255,0.9)',
                                '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
                                boxShadow: 2,
                                zIndex: 20,
                            }}
                            title="Share product"
                        >
                            <ShareIcon sx={{ color: '#2874f0' }} />
                        </IconButton>

                        {/* 🔥 SHARE MENU */}
                        {showShareMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-30"
                                    onClick={() => setShowShareMenu(false)}
                                />

                                <div className="absolute top-20 right-16 z-40 bg-white rounded-xl shadow-2xl border border-gray-100 p-2 w-56">
                                    <p className="text-xs font-bold text-gray-500 px-3 py-2">
                                        Share this product
                                    </p>

                                    <button
                                        type="button"
                                        onClick={handleCopyLink}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-all text-left"
                                    >
                                        {copied ? (
                                            <CheckIcon sx={{ fontSize: 20, color: '#10b981' }} />
                                        ) : (
                                            <ContentCopyIcon sx={{ fontSize: 20, color: '#2874f0' }} />
                                        )}
                                        <span className="text-sm font-semibold text-gray-700">
                                            {copied ? 'Link Copied!' : 'Copy Link'}
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleWhatsAppShare}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-all text-left"
                                    >
                                        <WhatsAppIcon sx={{ fontSize: 20, color: '#25D366' }} />
                                        <span className="text-sm font-semibold text-gray-700">
                                            Share on WhatsApp
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleNativeShare}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-all text-left"
                                    >
                                        <ShareIcon sx={{ fontSize: 20, color: '#8b5cf6' }} />
                                        <span className="text-sm font-semibold text-gray-700">
                                            More Options
                                        </span>
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Wishlist */}
                        <IconButton
                            onClick={() => {
                                if (!localStorage.getItem('jwt')) {
                                    navigate('/login');
                                    return;
                                }
                                if (products.product?._id) {
                                    dispatch(
                                        addProductToWishlist({
                                            productId: products.product._id,
                                        }) as any
                                    );
                                }
                            }}
                            sx={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                bgcolor: 'rgba(255,255,255,0.9)',
                                '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
                                boxShadow: 2,
                                zIndex: 20,
                            }}
                        >
                            {products.product &&
                            wishlist.wishlist &&
                            isWishlisted(wishlist.wishlist, products.product) ? (
                                <FavoriteIcon sx={{ color: '#ff4081' }} />
                            ) : (
                                <FavoriteBorderIcon sx={{ color: '#ff4081' }} />
                            )}
                        </IconButton>

                        {/* Description */}
                        <div className="mt-8 p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                                <span className="h-1 w-6 bg-orange-500 rounded-full" />
                                Product Description
                            </h2>

                            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm font-medium">
                                {products.product?.description}
                            </p>

                            <Divider sx={{ my: 3 }} />

                            <h3 className="text-md font-bold mb-3 text-gray-800">Key Features</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
                                    <span className="font-semibold">
                                        Premium quality material for long-lasting durability
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
                                    <span className="font-semibold">
                                        Designed for everyday comfort and style
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
                                    <span className="font-semibold">Easy to maintain and clean</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <VerifiedIcon sx={{ fontSize: 16, color: '#10b981', mt: 0.3 }} />
                                    <span className="font-semibold">
                                        100% Genuine Product with brand warranty
                                    </span>
                                </li>
                            </ul>

                            <Divider sx={{ my: 3 }} />

                            <h3 className="text-md font-bold mb-3 text-gray-800">
                                📋 Product Details
                            </h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                {/* ✅ FIXED: Brand safe render */}
                                {products.product?.brand && (
                                    <div className="bg-gray-50 p-2 rounded">
                                        <p className="text-xs text-gray-500 font-semibold">Brand</p>
                                        <p className="font-bold text-gray-800">{brandName}</p>
                                    </div>
                                )}

                                {products.product?.color && (
                                    <div className="bg-gray-50 p-2 rounded">
                                        <p className="text-xs text-gray-500 font-semibold">Color</p>
                                        <p className="font-bold text-gray-800">
                                            {products.product.color}
                                        </p>
                                    </div>
                                )}

                                <div className="bg-gray-50 p-2 rounded">
                                    <p className="text-xs text-gray-500 font-semibold">Category</p>
                                    <p className="font-bold text-gray-800">{categoryName}</p>
                                </div>

                                {!isOutOfStock && (
                                    <div className="bg-green-50 p-2 rounded border border-green-200">
                                        <p className="text-xs text-green-600 font-semibold">
                                            In Stock
                                        </p>
                                        <p className="font-bold text-green-700">
                                            {product.quantity} available
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h1 className="font-bold text-lg text-orange-600">
                        {products.product?.seller?.businessDetails?.businessName}
                    </h1>
                    <p className="text-gray-700 font-bold text-base">{products.product?.title}</p>

                    <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
                        <div className="flex gap-1 items-center">
                            <span className="font-bold">4</span>
                            <StarIcon sx={{ color: '#ff9644', fontSize: '17px' }} />
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <span className="font-bold">358 Ratings</span>
                    </div>

                    <div className="space-y-2">
                        <div className="price flex items-center gap-3 mt-5 text-lg">
                            <span
                                className={`font-bold text-2xl ${
                                    isOutOfStock ? 'text-gray-400' : 'text-gray-900'
                                }`}
                            >
                                ₹{products.product?.sellingPrice}
                            </span>
                            <span className="line-through text-gray-400 font-semibold">
                                ₹{products.product?.mrpPrice}
                            </span>
                            <span className="text-[#ff9644] font-bold">
                                {products.product?.discountPercent}% off
                            </span>
                        </div>
                        <p className="text-sm font-medium">Inclusive of all taxes.</p>

                        {/* 🔥 CUSTOMIZATION EXTRA CHARGE INFO */}
                        {isCustomizable && products.product?.customizationExtraCharge > 0 && (
                            <p className="text-sm font-semibold text-purple-600 bg-purple-50 p-2 rounded-lg border border-purple-200">
                                🎨 Customization charge: ₹
                                {products.product.customizationExtraCharge} extra
                            </p>
                        )}

                        {/* EMI WIDGET */}
                        {!isOutOfStock && (products.product?.sellingPrice ?? 0) >= 5000 && (
                            <EmiWidget
                                price={products.product?.sellingPrice ?? 0}
                                onSelectPlan={(plan) => {
                                    setSelectedEmiPlan(plan);
                                }}
                            />
                        )}
                    </div>

                    {/* Features */}
                    <div className="mt-7 grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100 hover:shadow-md transition-all">
                            <div className="bg-orange-500 rounded-lg p-2 float-icon">
                                <AssignmentReturnIcon sx={{ color: 'white', fontSize: 20 }} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold">Return Policy</p>
                                <p className="text-sm font-bold text-gray-800">
                                    5 Days Returnable
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100 hover:shadow-md transition-all">
                            <div className="bg-green-500 rounded-lg p-2 float-icon">
                                <LocalShippingIcon sx={{ color: 'white', fontSize: 20 }} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold">Delivery</p>
                                <p className="text-sm font-bold text-gray-800">Free Delivery</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-all">
                            <div className="bg-blue-500 rounded-lg p-2 float-icon">
                                <PaymentsIcon sx={{ color: 'white', fontSize: 20 }} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold">Payment</p>
                                <p className="text-sm font-bold text-gray-800">Pay on Delivery</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100 hover:shadow-md transition-all">
                            <div className="bg-purple-500 rounded-lg p-2 float-icon">
                                <WorkspacePremiumIcon sx={{ color: 'white', fontSize: 20 }} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold">Trust</p>
                                <p className="text-sm font-bold text-gray-800">Top Brand</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100 hover:shadow-md transition-all">
                            <div className="bg-red-500 rounded-lg p-2 float-icon">
                                <ShieldIcon sx={{ color: 'white', fontSize: 20 }} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold">Security</p>
                                <p className="text-sm font-bold text-gray-800">Secure Payment</p>
                            </div>
                        </div>
                    </div>

                    {/* Offers */}
                    <div className="mt-5 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <LocalOfferIcon sx={{ color: '#ff9644', fontSize: 18 }} />
                            Available Offers
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <Chip
                                    label="10%"
                                    size="small"
                                    sx={{
                                        bgcolor: '#10b981',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: 10,
                                    }}
                                />
                                <span className="text-gray-700 font-semibold">
                                    Bank Offer: 10% off on HDFC Credit Card
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Chip
                                    label="₹100"
                                    size="small"
                                    sx={{
                                        bgcolor: '#4f46e5',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: 10,
                                    }}
                                />
                                <span className="text-gray-700 font-semibold">
                                    Special Price: Get extra ₹100 off
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Chip
                                    label="FREE"
                                    size="small"
                                    sx={{
                                        bgcolor: '#f59e0b',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: 10,
                                    }}
                                />
                                <span className="text-gray-700 font-semibold">
                                    Free Delivery on orders above ₹499
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Size */}
                    <div className="mt-7 space-y-3">
                        <h1 className="font-bold text-base">SELECT SIZE:</h1>
                        <Box className="flex flex-wrap gap-3">
                            {(() => {
                                const sizes = products.product?.sizes;
                                const sizeArray = Array.isArray(sizes)
                                    ? sizes
                                    : typeof sizes === 'string' && sizes
                                      ? (sizes as string)
                                            .split(',')
                                            .map((s: string) => s.trim())
                                      : [];

                                if (sizeArray.length > 0) {
                                    return sizeArray.map((size: string) => (
                                        <Button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            disabled={isOutOfStock}
                                            variant={
                                                selectedSize === size ? 'contained' : 'outlined'
                                            }
                                            sx={{
                                                minWidth: '60px',
                                                borderRadius: '20px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {size}
                                        </Button>
                                    ));
                                } else {
                                    return (
                                        <Button
                                            onClick={() => setSelectedSize('FREE')}
                                            disabled={isOutOfStock}
                                            variant={
                                                selectedSize === 'FREE' ? 'contained' : 'outlined'
                                            }
                                            sx={{
                                                minWidth: '60px',
                                                borderRadius: '20px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            FREE
                                        </Button>
                                    );
                                }
                            })()}
                        </Box>
                    </div>

                    {/* Quantity */}
                    {!isOutOfStock && (
                        <div className="mt-7 space-y-2">
                            <h1 className="font-bold text-base">QUANTITY:</h1>
                            <div className="flex items-center gap-2 w-[140px] justify-between">
                                <Button
                                    disabled={quantity === 1}
                                    onClick={() => setQuantity(quantity - 1)}
                                    variant="outlined"
                                >
                                    <RemoveIcon />
                                </Button>
                                <span className="px-3 text-lg font-bold">{quantity}</span>
                                <Button
                                    onClick={() => setQuantity(Math.min(quantity + 1, maxQuantity))}
                                    disabled={quantity >= maxQuantity}
                                    variant="outlined"
                                >
                                    <AddIcon />
                                </Button>
                            </div>
                            {maxQuantity <= 5 && (
                                <p className="text-orange-600 text-xs font-bold">
                                    ⚡ Only {maxQuantity} left in stock!
                                </p>
                            )}
                        </div>
                    )}

                    {/* 🔥 CUSTOMIZE BUTTON — Only for customizable products */}
                    {isCustomizable && !isOutOfStock && (
                        <div className="mt-8">
                            <Button
                                onClick={handleCustomizeClick}
                                sx={{
                                    py: '1rem',
                                    fontWeight: 'bold',
                                    background:
                                        'linear-gradient(135deg, #8b5cf6, #ec4899)',
                                    color: 'white',
                                    '&:hover': {
                                        background:
                                            'linear-gradient(135deg, #7c3aed, #db2777)',
                                        transform: 'scale(1.02)',
                                    },
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
                                }}
                                variant="contained"
                                fullWidth
                                startIcon={<BrushIcon />}
                            >
                                🎨 Customize & Add
                            </Button>
                            <p className="text-xs text-center text-gray-500 mt-2">
                                Apni image upload karke personalized product banayein
                            </p>
                        </div>
                    )}

                    {/* BUTTONS */}
                    <div className="mt-8 flex items-center gap-5">
                        {isOutOfStock ? (
                            <>
                                <Button
                                    disabled
                                    sx={{
                                        py: '1rem',
                                        fontWeight: 'bold',
                                        bgcolor: '#cbd5e1 !important',
                                        color: 'white !important',
                                    }}
                                    variant="contained"
                                    fullWidth
                                    startIcon={<BlockIcon />}
                                >
                                    Out of Stock
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (products.product?._id) {
                                            dispatch(
                                                addProductToWishlist({
                                                    productId: products.product._id,
                                                }) as any
                                            );
                                        }
                                    }}
                                    sx={{ py: '1rem', fontWeight: 'bold' }}
                                    color="secondary"
                                    variant="contained"
                                    fullWidth
                                    startIcon={<FavoriteBorderIcon />}
                                >
                                    Notify Me
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    onClick={handleAddCart}
                                    sx={{ py: '1rem', fontWeight: 'bold' }}
                                    variant="contained"
                                    fullWidth
                                    startIcon={<AddShoppingCartIcon />}
                                >
                                    Add To Cart
                                </Button>
                                <Button
                                    onClick={handleBuyNow}
                                    sx={{ py: '1rem', fontWeight: 'bold' }}
                                    color="warning"
                                    variant="contained"
                                    fullWidth
                                    startIcon={<FlashOnIcon />}
                                >
                                    Buy Now
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Reviews */}
                    <div className="ratings w-full mt-10">
                        <h1 className="font-bold text-lg pb-4">Review &amp; Ratings</h1>
                        <RatingCard totalReview={review.reviews.length} />
                        <div className="mt-10">
                            <div className="space-y-5">
                                {review.reviews.map((item: any, index: number) => (
                                    <div className="space-y-5" key={item._id || index}>
                                        <ProductReviewCard item={item} />
                                        <Divider />
                                    </div>
                                ))}
                                <Button
                                    onClick={() => navigate(`/reviews/${productId}`)}
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    View All {review.reviews.length} Reviews
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Similar */}
            <section className="mt-20">
                <h1 className="text-lg font-bold">Similar Product</h1>
                <div className="pt-5">
                    <SmilarProduct />
                </div>
            </section>

            {/* Modal */}
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ ...style, maxWidth: '90%', maxHeight: '90%' }}>
                    <ZoomableImage
                        src={products.product?.images?.[selectedImage] || ''}
                        alt=""
                    />
                </Box>
            </Modal>
        </div>
    );
};

export default ProductDetails;