// import { useEffect } from 'react'
// import HomeCategory from './HomeCategory/HomeCategory'
// import TopBrand from './TopBrands/Grid'
// import ElectronicCategory from './Electronic Category/ElectronicCategory'
// import { Backdrop, Button, CircularProgress } from '@mui/material'
// import { useNavigate } from 'react-router-dom'
// import StorefrontIcon from '@mui/icons-material/Storefront'
// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store'
// import { getAllProducts } from '../../../Redux Toolkit/Customer/ProductSlice'
// import DealSlider from './Deals/DealSlider'
// import BannerCarousel from './Banner/Banner'
// // import ProductCard from '../Products/ProductCard/ProductCard'
// // import TopDealMens from './Deals/TopDealMens'
// // import TopDealWomens from './Deals/TopDealWomens'
// import HomePreview from '../../../admin/pages/HomeSection/HomePreview'

// const Home = () => {
//     const dispatch = useAppDispatch()

//     // ✅ FIXED SELECTORS
//     const homePage = useAppSelector(store => store.homePage)
//     const productsState = useAppSelector(store => store.products)

//     // ✅ SAFE PRODUCTS ARRAY
//     // const products = productsState?.products || []

//     // const topProducts = products.slice(0, 4)
//     // const middleProducts = products.slice(4, 8)

//     const navigate = useNavigate()

//     // ✅ FETCH PRODUCTS
//     useEffect(() => {
//         dispatch(getAllProducts({}));
//     }, [dispatch]);

//     const becomeSellerClick = () => navigate('/become-seller')

//     if (homePage.loading || productsState.loading) {
//         return (
//             <Backdrop open>
//                 <CircularProgress color="inherit" />
//             </Backdrop>
//         )
//     }

//     return (
//         <div className='space-y-5 lg:space-y-6 relative'>
//             {homePage.homePageData?.electricCategories && <ElectronicCategory />}

//             <BannerCarousel />

//             {homePage.homePageData?.grid && <TopBrand />}

//             {homePage.homePageData?.deals && (
//                 <section className='lg:pt-10'>
//                     <h1 className='text-center text-lg lg:text-4xl font-bold text-[#284797] pb-4 md:pb-4'>
//                         Today&apos;s Deals
//                     </h1>
//                     <DealSlider />
//                 </section>
//             )}

//             {homePage.homePageData?.shopByCategories && (
//                 <section className='flex flex-col items-center py-20 px-5 lg:px-10'>
//                     <h1 className='text-lg lg:text-4xl font-bold text-[#284797] pb-20'>
//                         SHOP BY CATEGORY
//                     </h1>
//                     <HomeCategory />
//                 </section>
//             )}

//             <HomePreview />

//             {/* <TopDealMens /> */}

//             {/* 🔥 TOP PRODUCTS */}
//             {/* {topProducts.length > 0 && (
//                 <section className="px-5 lg:px-20 py-10">
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                         {topProducts.map(item => (
//                             <div key={item._id} className="scale-110">
//                                 <ProductCard item={item} categoryId={item.category?._id} isHomePage={true} />
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//             )} */}

//             {/* <TopDealWomens /> */}

//             {/* 🔥 MIDDLE PRODUCTS */}
//             {/* {middleProducts.length > 0 && (
//                 <section className="px-5 lg:px-20 py-10 ">

//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                         {middleProducts.map(item => (
//                             <div key={item._id} className="scale-110">
//                                 <ProductCard item={item} categoryId={item.category?._id} isHomePage={true} />
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//             )} */}


//             {/* SELLER BANNER */}
//             <section className='lg:px-20 relative h-[200px] lg:h-[450px]'>
//                 <img className='w-full h-full' src="/seller_banner_image.jpg" alt="" />
//                 <div className='absolute top-1/2 left-4 lg:left-[15rem] -translate-y-1/2 font-semibold lg:text-4xl space-y-3'>
//                     <h1>Sell Your Product</h1>
//                     <p className='text-lg md:text-2xl'>
//                         With <strong className='logo text-3xl md:text-5xl pl-2'>Selfy Snap</strong>
//                     </p>
//                     <Button onClick={becomeSellerClick} startIcon={<StorefrontIcon />} variant="contained">
//                         Become Seller
//                     </Button>
//                 </div>
//             </section>
//         </div>
//     )
// }

// export default Home



























// import { useEffect, useState } from 'react';
// import HomeCategory from './HomeCategory/HomeCategory';
// import TopBrand from './TopBrands/Grid';
// import ElectronicCategory from './Electronic Category/ElectronicCategory';
// import {
//   Backdrop,
//   Button,
//   CircularProgress,
//   IconButton,
//   Fab,
//   Tooltip,
//   Zoom,
//   Fade,
//   Paper,
//   AppBar,
//   Toolbar,
//   Typography,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import StorefrontIcon from '@mui/icons-material/Storefront';
// import CloseIcon from '@mui/icons-material/Close';
// import ChatIcon from '@mui/icons-material/Chat';
// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// import { getAllProducts } from '../../../Redux Toolkit/Customer/ProductSlice';
// import DealSlider from './Deals/DealSlider';
// import BannerCarousel from './Banner/Banner';
// import HomePreview from '../../../admin/pages/HomeSection/HomePreview';
// import ChatBot from '../ChatBot/ChatBot';

// const Home = () => {
//   const dispatch = useAppDispatch();
//   const homePage = useAppSelector(store => store.homePage);
//   const productsState = useAppSelector(store => store.products);
//   const navigate = useNavigate();

//   const [chatOpen, setChatOpen] = useState(false);

//   useEffect(() => {
//     dispatch(getAllProducts({}));
//   }, [dispatch]);

//   const becomeSellerClick = () => navigate('/become-seller');
//   const toggleChat = () => setChatOpen(prev => !prev);
//   const closeChat = () => setChatOpen(false);

//   if (homePage.loading || productsState.loading) {
//     return (
//       <Backdrop open>
//         <CircularProgress color="inherit" />
//       </Backdrop>
//     );
//   }

//   return (
//     <div className="space-y-5 lg:space-y-6 relative">
//       {homePage.homePageData?.electricCategories && <ElectronicCategory />}
//       <BannerCarousel />
//       {homePage.homePageData?.grid && <TopBrand />}
//       {homePage.homePageData?.deals && (
//         <section className="lg:pt-10">
//           <h1 className="text-center text-lg lg:text-4xl font-bold text-[#284797] pb-4 md:pb-4">
//             Today&apos;s Deals
//           </h1>
//           <DealSlider />
//         </section>
//       )}
//       {homePage.homePageData?.shopByCategories && (
//         <section className="flex flex-col items-center py-20 px-5 lg:px-10">
//           <h1 className="text-lg lg:text-4xl font-bold text-[#284797] pb-20">
//             SHOP BY CATEGORY
//           </h1>
//           <HomeCategory />
//         </section>
//       )}
//       <HomePreview />
//       <section className="lg:px-20 relative h-[200px] lg:h-[450px]">
//         <img className="w-full h-full" src="/seller_banner_image.jpg" alt="" />
//         <div className="absolute top-1/2 left-4 lg:left-[15rem] -translate-y-1/2 font-semibold lg:text-4xl space-y-3">
//           <h1>Sell Your Product</h1>
//           <p className="text-lg md:text-2xl">
//             With <strong className="logo text-3xl md:text-5xl pl-2">Selfy Snap</strong>
//           </p>
//           <Button
//             onClick={becomeSellerClick}
//             startIcon={<StorefrontIcon />}
//             variant="contained"
//           >
//             Become Seller
//           </Button>
//         </div>
//       </section>

//       {/* ChatBot Window */}
//       <Fade in={chatOpen} timeout={300}>
//         <Paper
//           elevation={8}
//           sx={{
//             position: 'fixed',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: '90vw',
//             maxWidth: '560px',
//             height: '80vh',
//             zIndex: 2000,
//             display: 'flex',
//             flexDirection: 'column',
//             overflow: 'hidden',
//             borderRadius: 2,
//           }}
//         >
//           <AppBar position="static" color="default" elevation={1}>
//             <Toolbar variant="dense">
//               <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
//                 Selfy Snap AI
//               </Typography>
//               <IconButton edge="end" color="inherit" onClick={closeChat} size="large">
//                 <CloseIcon />
//               </IconButton>
//             </Toolbar>
//           </AppBar>
//           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//             <ChatBot handleClose={closeChat} />
//           </div>
//         </Paper>
//       </Fade>

//       {/* Chat Button */}
//       <Zoom in={!chatOpen} timeout={300}>
//         <Tooltip title="Chat with us" placement="left">
//           <Fab
//             color="primary"
//             aria-label="chat"
//             onClick={toggleChat}
//             sx={{
//               position: 'fixed',
//               bottom: 20,
//               right: 20,
//               zIndex: 1000,
//               boxShadow: 3,
//               '&:hover': {
//                 transform: 'scale(1.1)',
//               },
//             }}
//           >
//             <ChatIcon fontSize="large" />
//           </Fab>
//         </Tooltip>
//       </Zoom>
//     </div>
//   );
// };
// export default Home;



















// import { useEffect, useState } from 'react';
// import HomeCategory from './HomeCategory/HomeCategory';
// import TopBrand from './TopBrands/Grid';
// import ElectronicCategory from './Electronic Category/ElectronicCategory';
// import {
//   Backdrop,
//   Button,
//   CircularProgress,
//   IconButton,
//   Fade,
//   Paper,
//   AppBar,
//   Toolbar,
//   Typography,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import StorefrontIcon from '@mui/icons-material/Storefront';
// import CloseIcon from '@mui/icons-material/Close';
// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// import { getAllProducts } from '../../../Redux Toolkit/Customer/ProductSlice';
// import DealSlider from './Deals/DealSlider';
// import BannerCarousel from './Banner/Banner';
// import HomePreview from '../../../admin/pages/HomeSection/HomePreview';
// import ChatBot from '../ChatBot/ChatBot';

// const Home = () => {
//   const dispatch = useAppDispatch();
//   const homePage = useAppSelector(store => store.homePage);
//   const productsState = useAppSelector(store => store.products);
//   const navigate = useNavigate();

//   const [chatOpen, setChatOpen] = useState(false);

//   useEffect(() => {
//     dispatch(getAllProducts({}));
//   }, [dispatch]);

//   const becomeSellerClick = () => navigate('/become-seller');
//   const closeChat = () => setChatOpen(false);

//   if (homePage.loading || productsState.loading) {
//     return (
//       <Backdrop open>
//         <CircularProgress color="inherit" />
//       </Backdrop>
//     );
//   }

//   return (
//     <div className="space-y-5 lg:space-y-6 relative">
//       {homePage.homePageData?.electricCategories && <ElectronicCategory />}
//       <BannerCarousel />
//       {homePage.homePageData?.grid && <TopBrand />}
//       {homePage.homePageData?.deals && (
//         <section className="lg:pt-10">
//           <h1 className="text-center text-lg lg:text-4xl font-bold text-[#284797] pb-4 md:pb-4">
//             Today&apos;s Deals
//           </h1>
//           <DealSlider />
//         </section>
//       )}
//       {homePage.homePageData?.shopByCategories && (
//         <section className="flex flex-col items-center py-20 px-5 lg:px-10">
//           <h1 className="text-lg lg:text-4xl font-bold text-[#284797] pb-20">
//             SHOP BY CATEGORY
//           </h1>
//           <HomeCategory />
//         </section>
//       )}
//       <HomePreview />
//       <section className="lg:px-20 relative h-[200px] lg:h-[450px]">
//         <img className="w-full h-full" src="/seller_banner_image.jpg" alt="" />
//         <div className="absolute top-1/2 left-4 lg:left-[15rem] -translate-y-1/2 font-semibold lg:text-4xl space-y-3">
//           <h1>Sell Your Product</h1>
//           <p className="text-lg md:text-2xl">
//             With <strong className="logo text-3xl md:text-5xl pl-2">Selfy Snap</strong>
//           </p>
//           <Button
//             onClick={becomeSellerClick}
//             startIcon={<StorefrontIcon />}
//             variant="contained"
//           >
//             Become Seller
//           </Button>
//         </div>
//       </section>

//       {/* ChatBot Window */}
//       <Fade in={chatOpen} timeout={300}>
//         <Paper
//           elevation={8}
//           sx={{
//             position: 'fixed',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: '90vw',
//             maxWidth: '560px',
//             height: '80vh',
//             zIndex: 2000,
//             display: 'flex',
//             flexDirection: 'column',
//             overflow: 'hidden',
//             borderRadius: 2,
//           }}
//         >
//           <AppBar position="static" color="default" elevation={1}>
//             <Toolbar variant="dense">
//               <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
//                 Selfy Snap AI
//               </Typography>
//               <IconButton edge="end" color="inherit" onClick={closeChat} size="large">
//                 <CloseIcon />
//               </IconButton>
//             </Toolbar>
//           </AppBar>
//           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//             <ChatBot handleClose={closeChat} />
//           </div>
//         </Paper>
//       </Fade>

//       {/* ❌ CHAT FAB BUTTON — REMOVED */}
//     </div>
//   );
// };
// export default Home;



import { useEffect, useState, lazy, Suspense, memo } from 'react';
import {
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  Fade,
  Paper,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import BannerCarousel from './Banner/Banner';

/* ═══════════════════════════════════════════════
   🔥 LAZY LOAD — Heavy components baad me load
   ═══════════════════════════════════════════════ */
const HomeCategory = lazy(() => import('./HomeCategory/HomeCategory'));
const TopBrand = lazy(() => import('./TopBrands/Grid'));
const ElectronicCategory = lazy(() => import('./Electronic Category/ElectronicCategory'));
const DealSlider = lazy(() => import('./Deals/DealSlider'));
const HomePreview = lazy(() => import('../../../admin/pages/HomeSection/HomePreview'));
const ChatBot = lazy(() => import('../ChatBot/ChatBot'));

/* ═══════════════════════════════════════════════
   🔥 SKELETONS — Loading ke waqt dikhega
   ═══════════════════════════════════════════════ */
const CategorySkeleton = memo(() => (
  <div className="flex gap-6 px-5 lg:px-10 py-6 overflow-hidden">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gray-200 animate-pulse" />
        <div className="w-14 h-3 bg-gray-200 rounded animate-pulse" />
      </div>
    ))}
  </div>
));

const ProductGridSkeleton = memo(() => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5 lg:px-10 py-4">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="space-y-3">
        <div className="w-full aspect-square bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
      </div>
    ))}
  </div>
));

const TitleSkeleton = memo(() => (
  <div className="flex justify-center py-4">
    <div className="w-64 h-8 bg-gray-200 rounded animate-pulse" />
  </div>
));

/* ═══════════════════════════════════════════════
   🔥 MAIN HOME
   ═══════════════════════════════════════════════ */
const Home = () => {
  const dispatch = useAppDispatch();
  const homePage = useAppSelector((store: any) => store.homePage);
  const navigate = useNavigate();

  const [chatOpen, setChatOpen] = useState(false);

  /* ❌ getAllProducts({}) HATA DIYA — homepage pe zaroorat nahi */

  const becomeSellerClick = () => navigate('/become-seller');
  const closeChat = () => setChatOpen(false);

  const data = homePage?.homePageData;
  const loading = homePage?.loading;

  return (
    <div className="space-y-5 lg:space-y-6 relative">

      {/* 🔥 ELECTRONIC CATEGORIES */}
      <Suspense fallback={<CategorySkeleton />}>
        {loading && !data?.electricCategories ? (
          <CategorySkeleton />
        ) : data?.electricCategories ? (
          <ElectronicCategory />
        ) : null}
      </Suspense>

      {/* 🔥 BANNER — Hamesha dikhao (fast) */}
      <BannerCarousel />

      {/* 🔥 TOP BRANDS */}
      <Suspense fallback={<ProductGridSkeleton />}>
        {loading && !data?.grid ? (
          <ProductGridSkeleton />
        ) : data?.grid ? (
          <TopBrand />
        ) : null}
      </Suspense>

      {/* 🔥 TODAY'S DEALS */}
      {loading && !data?.deals ? (
        <section className="lg:pt-10">
          <TitleSkeleton />
          <ProductGridSkeleton />
        </section>
      ) : data?.deals ? (
        <section className="lg:pt-10">
          <h1 className="text-center text-lg lg:text-4xl font-bold text-[#284797] pb-4 md:pb-4">
            Today&apos;s Deals
          </h1>
          <Suspense fallback={<ProductGridSkeleton />}>
            <DealSlider />
          </Suspense>
        </section>
      ) : null}

      {/* 🔥 SHOP BY CATEGORY */}
      {loading && !data?.shopByCategories ? (
        <section className="flex flex-col items-center py-20 px-5 lg:px-10">
          <TitleSkeleton />
          <CategorySkeleton />
        </section>
      ) : data?.shopByCategories ? (
        <section className="flex flex-col items-center py-20 px-5 lg:px-10">
          <h1 className="text-lg lg:text-4xl font-bold text-[#284797] pb-20">
            SHOP BY CATEGORY
          </h1>
          <Suspense fallback={<CategorySkeleton />}>
            <HomeCategory />
          </Suspense>
        </section>
      ) : null}

      {/* 🔥 HOME PREVIEW (admin) */}
      <Suspense fallback={null}>
        <HomePreview />
      </Suspense>

      {/* 🔥 SELLER BANNER */}
      <section className="lg:px-20 relative h-[200px] lg:h-[450px]">
        <img
          className="w-full h-full object-cover"
          src="/seller_banner_image.jpg"
          alt="Sell on Selfy Snap"
          loading="lazy"
        />
        <div className="absolute top-1/2 left-4 lg:left-[15rem] -translate-y-1/2 font-semibold lg:text-4xl space-y-3">
          <h1>Sell Your Product</h1>
          <p className="text-lg md:text-2xl">
            With <strong className="logo text-3xl md:text-5xl pl-2">Selfy Snap</strong>
          </p>
          <Button
            onClick={becomeSellerClick}
            startIcon={<StorefrontIcon />}
            variant="contained"
          >
            Become Seller
          </Button>
        </div>
      </section>

      {/* 🔥 CHATBOT — Lazy (MUI components same) */}
      {chatOpen && (
        <Suspense fallback={null}>
          <Fade in={chatOpen} timeout={300}>
            <Paper
              elevation={8}
              sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90vw',
                maxWidth: '560px',
                height: '80vh',
                zIndex: 2000,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: 2,
              }}
            >
              <AppBar position="static" color="default" elevation={1}>
                <Toolbar variant="dense">
                  <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                    Selfy Snap AI
                  </Typography>
                  <IconButton edge="end" color="inherit" onClick={closeChat} size="large">
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <ChatBot handleClose={closeChat} />
              </div>
            </Paper>
          </Fade>
        </Suspense>
      )}
    </div>
  );
};

export default Home;

















