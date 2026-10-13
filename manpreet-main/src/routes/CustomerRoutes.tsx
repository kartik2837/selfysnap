// import { Route, Routes } from 'react-router-dom'
// import Home from '../customer/pages/Home/Home'
// import Products from '../customer/pages/Products/Products'
// import ProductDetails from '../customer/pages/Products/ProductDetails/ProductDetails'
// import Cart from '../customer/pages/Cart/Cart'
// import Address from '../customer/pages/Checkout/AddressPage'
// import Profile from '../customer/pages/Account/Profile'
// import Footer from '../customer/components/Footer/Footer'
// import Navbar from '../customer/components/Navbar/Navbar'
// import NotFound from '../customer/pages/NotFound/NotFound'
// import Auth from '../customer/pages/Auth/Auth'
// import { useAppDispatch, useAppSelector } from '../Redux Toolkit/Store'
// import { fetchUserCart } from '../Redux Toolkit/Customer/CartSlice'
// import PaymentSuccessHandler from '../customer/pages/Pyement/PaymentSuccessHandler'
// import Reviews from '../customer/pages/Review/Reviews'
// import WriteReviews from '../customer/pages/Review/WriteReview'
// import Wishlist from '../customer/pages/Wishlist/Wishlist'
// import BuyNowCheckoutPage from '../customer/pages/Checkout/BuyNowCheckoutPage'
// import { getWishlistByUserId } from '../Redux Toolkit/Customer/WishlistSlice'
// import SearchProducts from '../customer/pages/Search/SearchProducts'
// import { useEffect } from 'react'
// import FooterContent from '../customer/components/Footer/FooterContent'
// import Contact from '../customer/components/Footer/Contact'



// const CustomerRoutes = () => {
//   const dispatch = useAppDispatch()
//   const { auth } = useAppSelector(store => store);

//   useEffect(() => {
//     dispatch(fetchUserCart(localStorage.getItem("jwt") || ""))
//     dispatch(getWishlistByUserId())
//   }, [auth.jwt])
//   return (
//     <>
//       <Navbar />
     
//       <Routes>
//         <Route path='/' element={<Home />} />
//         {/* <Route path='/chat-bot' element={<ChatBot />} /> */}
//         <Route path='/products/:categoryId' element={<Products />} />
//         <Route path='/search-products' element={<SearchProducts />} />
//         <Route path='/reviews/:productId' element={<Reviews />} />
//         <Route path='/reviews/:productId/create' element={<WriteReviews />} />
//         <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails />} />
//         <Route path='/cart' element={<Cart />} />
//         <Route path='/wishlist' element={<Wishlist />} />
//         <Route path='/checkout/address' element={<Address />} />
//         <Route path='/checkout/buy-now' element={<BuyNowCheckoutPage />} />
//         <Route path='/account/*' element={<Profile />} />
//         <Route path='/login' element={<Auth />} />
//         <Route path='/payment-success/:orderId' element={<PaymentSuccessHandler />} />
//         <Route path="/:slug" element={<FooterContent />} />
//         <Route path='*' element={<NotFound />} />
//         <Route path='/contact' element={<Contact/>}/>
//          <Route path='/product/:productId' element={<ProductDetails />} />
        
//       </Routes>
//       <Footer />
//     </>

//   )
// }

// export default CustomerRoutes























// import { Route, Routes } from 'react-router-dom'
// import Home from '../customer/pages/Home/Home'
// import Products from '../customer/pages/Products/Products'
// import ProductDetails from '../customer/pages/Products/ProductDetails/ProductDetails'
// import Cart from '../customer/pages/Cart/Cart'
// import Address from '../customer/pages/Checkout/AddressPage'
// import Profile from '../customer/pages/Account/Profile'
// import Footer from '../customer/components/Footer/Footer'
// import Navbar from '../customer/components/Navbar/Navbar'
// import NotFound from '../customer/pages/NotFound/NotFound'
// import Auth from '../customer/pages/Auth/Auth'
// import { useAppDispatch, useAppSelector } from '../Redux Toolkit/Store'
// import { fetchUserCart } from '../Redux Toolkit/Customer/CartSlice'
// import PaymentSuccessHandler from '../customer/pages/Pyement/PaymentSuccessHandler'
// import Reviews from '../customer/pages/Review/Reviews'
// import WriteReviews from '../customer/pages/Review/WriteReview'
// import Wishlist from '../customer/pages/Wishlist/Wishlist'
// import BuyNowCheckoutPage from '../customer/pages/Checkout/BuyNowCheckoutPage'
// import { getWishlistByUserId } from '../Redux Toolkit/Customer/WishlistSlice'
// import SearchProducts from '../customer/pages/Search/SearchProducts'
// import { useEffect } from 'react'
// import FooterContent from '../customer/components/Footer/FooterContent'
// import Contact from '../customer/components/Footer/Contact'

// import MyReturns from '../customer/pages/MyReturns'
// import ReturnForm from '../customer/pages/ReturnForm'
// import OffersPage from "../admin/pages/Offers/OffersPage";
// import MyTickets from '../customer/pages/MyTickets';
// import CreateTicket from '../customer/pages/CreateTicket';
// import TicketChat from '../customer/pages/TicketChat';


// const CustomerRoutes = () => {
//   const dispatch = useAppDispatch()
//   const { auth } = useAppSelector(store => store);

//   useEffect(() => {
//     dispatch(fetchUserCart(localStorage.getItem("jwt") || ""))
//     dispatch(getWishlistByUserId())
//   }, [auth.jwt])

//   return (
//     <>
//       <Navbar />
//       <Routes>
//         {/* Specific routes (first) */}
//         <Route path='/' element={<Home />} />
//         <Route path='/products/:categoryId' element={<Products />} />
//         <Route path='/search-products' element={<SearchProducts />} />
//         <Route path='/reviews/:productId' element={<Reviews />} />
//         <Route path='/reviews/:productId/create' element={<WriteReviews />} />
//         <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails />} />
//         <Route path='/cart' element={<Cart />} />
//         <Route path='/wishlist' element={<Wishlist />} />
//         <Route path='/checkout/address' element={<Address />} />
//         <Route path='/checkout/buy-now' element={<BuyNowCheckoutPage />} />
//         <Route path='/account/*' element={<Profile />} />
//         <Route path='/login' element={<Auth />} />
//         <Route path='/payment-success/:orderId' element={<PaymentSuccessHandler />} />
//         <Route path='/contact' element={<Contact/>}/>
//         <Route path='/product/:productId' element={<ProductDetails />} />

//         {/* ✅ Return Routes – must come before generic "/:slug" */}
//         <Route path='/my-returns' element={<MyReturns />} />
//         <Route path='/return/:orderId' element={<ReturnForm />} />
//         <Route path="/offers" element={<OffersPage />} />


//   <Route path="/tickets" element={<MyTickets />} />
//             <Route path="/tickets/new" element={<CreateTicket />} />
//             <Route path="/tickets/:ticketId" element={<TicketChat />} />


//         {/* Generic / catch-all routes (last) */}
//         <Route path="/:slug" element={<FooterContent />} />
//         <Route path='*' element={<NotFound />} />
//       </Routes>
//       <Footer />
//     </>
//   )
// }

// export default CustomerRoutes













// import { Route, Routes } from 'react-router-dom'
// import Home from '../customer/pages/Home/Home'
// import Products from '../customer/pages/Products/Products'
// import ProductDetails from '../customer/pages/Products/ProductDetails/ProductDetails'
// import Cart from '../customer/pages/Cart/Cart'
// import Address from '../customer/pages/Checkout/AddressPage'
// import Profile from '../customer/pages/Account/Profile'
// import Footer from '../customer/components/Footer/Footer'
// import Navbar from '../customer/components/Navbar/Navbar'
// import NotFound from '../customer/pages/NotFound/NotFound'
// import Auth from '../customer/pages/Auth/Auth'
// import { useAppDispatch, useAppSelector } from '../Redux Toolkit/Store'
// import { fetchUserCart } from '../Redux Toolkit/Customer/CartSlice'
// import PaymentSuccessHandler from '../customer/pages/Pyement/PaymentSuccessHandler'
// import Reviews from '../customer/pages/Review/Reviews'
// import WriteReviews from '../customer/pages/Review/WriteReview'
// import Wishlist from '../customer/pages/Wishlist/Wishlist'
// import BuyNowCheckoutPage from '../customer/pages/Checkout/BuyNowCheckoutPage'
// import { getWishlistByUserId } from '../Redux Toolkit/Customer/WishlistSlice'
// import SearchProducts from '../customer/pages/Search/SearchProducts'
// import { useEffect } from 'react'
// import FooterContent from '../customer/components/Footer/FooterContent'
// import Contact from '../customer/components/Footer/Contact'

// import MyReturns from '../customer/pages/MyReturns'
// import ReturnForm from '../customer/pages/ReturnForm'
// import OffersPage from "../admin/pages/Offers/OffersPage";
// import MyTickets from '../customer/pages/MyTickets';
// import CreateTicket from '../customer/pages/CreateTicket';
// import TicketChat from '../customer/pages/TicketChat';

// // ✅ नया import
// import RaiseTicketButton from '../components/EMI/RaiseTicketButton';


// const CustomerRoutes = () => {
//   const dispatch = useAppDispatch()
//   const { auth } = useAppSelector(store => store);

//   useEffect(() => {
//     dispatch(fetchUserCart(localStorage.getItem("jwt") || ""))
//     dispatch(getWishlistByUserId())
//   }, [auth.jwt])

//   return (
//     <>
//       <Navbar />

//       {/* ✅ Floating Raise Ticket Button */}
//       <RaiseTicketButton />

//       <Routes>
//         {/* Specific routes (first) */}
//         <Route path='/' element={<Home />} />
//         <Route path='/products/:categoryId' element={<Products />} />
//         <Route path='/search-products' element={<SearchProducts />} />
//         <Route path='/reviews/:productId' element={<Reviews />} />
//         <Route path='/reviews/:productId/create' element={<WriteReviews />} />
//         <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails />} />
//         <Route path='/cart' element={<Cart />} />
//         <Route path='/wishlist' element={<Wishlist />} />
//         <Route path='/checkout/address' element={<Address />} />
//         <Route path='/checkout/buy-now' element={<BuyNowCheckoutPage />} />
//         <Route path='/account/*' element={<Profile />} />
//         <Route path='/login' element={<Auth />} />
//         <Route path='/payment-success/:orderId' element={<PaymentSuccessHandler />} />
//         <Route path='/contact' element={<Contact/>}/>
//         <Route path='/product/:productId' element={<ProductDetails />} />

//         {/* ✅ Return Routes */}
//         <Route path='/my-returns' element={<MyReturns />} />
//         <Route path='/return/:orderId' element={<ReturnForm />} />
//         <Route path="/offers" element={<OffersPage />} />

//         {/* ✅ Ticket Routes */}
//         <Route path="/tickets" element={<MyTickets />} />
//         <Route path="/tickets/new" element={<CreateTicket />} />
//         <Route path="/tickets/:ticketId" element={<TicketChat />} />

//         {/* Generic / catch-all routes (last) */}
//         <Route path="/:slug" element={<FooterContent />} />
//         <Route path='*' element={<NotFound />} />
//       </Routes>
//       <Footer />
//     </>
//   )
// }

// export default CustomerRoutes






























import { Route, Routes } from 'react-router-dom'
import Home from '../customer/pages/Home/Home'
import Products from '../customer/pages/Products/Products'
import ProductDetails from '../customer/pages/Products/ProductDetails/ProductDetails'
import Cart from '../customer/pages/Cart/Cart'
import Address from '../customer/pages/Checkout/AddressPage'
import Profile from '../customer/pages/Account/Profile'
import Footer from '../customer/components/Footer/Footer'
import Navbar from '../customer/components/Navbar/Navbar'
import NotFound from '../customer/pages/NotFound/NotFound'
import Auth from '../customer/pages/Auth/Auth'
import { useAppDispatch, useAppSelector } from '../Redux Toolkit/Store'
import { fetchUserCart } from '../Redux Toolkit/Customer/CartSlice'
import PaymentSuccessHandler from '../customer/pages/Pyement/PaymentSuccessHandler'
import Reviews from '../customer/pages/Review/Reviews'
import WriteReviews from '../customer/pages/Review/WriteReview'
import Wishlist from '../customer/pages/Wishlist/Wishlist'
import BuyNowCheckoutPage from '../customer/pages/Checkout/BuyNowCheckoutPage'
import { getWishlistByUserId } from '../Redux Toolkit/Customer/WishlistSlice'
import SearchProducts from '../customer/pages/Search/SearchProducts'
import { useEffect } from 'react'
import FooterContent from '../customer/components/Footer/FooterContent'
import Contact from '../customer/components/Footer/Contact'

import MyReturns from '../customer/pages/MyReturns'
import ReturnForm from '../customer/pages/ReturnForm'
import OffersPage from "../admin/pages/Offers/OffersPage";
import MyTickets from '../customer/pages/MyTickets';
import CreateTicket from '../customer/pages/CreateTicket';
import TicketChat from '../customer/pages/TicketChat';

// ✅ NAYA import
import FloatingTicketWidget from '../customer/components/FloatingTicketWidget';
import CustomizeProductPage from "../customer/pages/Customize/CustomizeProductPage";
import LearningHub from "../customer/pages/LearningHub";
import LearningVideoDetail from "../customer/pages/LearningVideoDetail";

const CustomerRoutes = () => {
  const dispatch = useAppDispatch()
  const { auth } = useAppSelector(store => store);

  useEffect(() => {
    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""))
    dispatch(getWishlistByUserId())
  }, [auth.jwt])

  return (
    <>
      <Navbar />

      {/* ✅ Floating Ticket Widget (purana RaiseTicketButton hata do) */}
      <FloatingTicketWidget />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:categoryId' element={<Products />} />
        <Route path='/search-products' element={<SearchProducts />} />
        <Route path='/reviews/:productId' element={<Reviews />} />
        <Route path='/reviews/:productId/create' element={<WriteReviews />} />
        <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/checkout/address' element={<Address />} />
        <Route path='/checkout/buy-now' element={<BuyNowCheckoutPage />} />
        <Route path='/account/*' element={<Profile />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/payment-success/:orderId' element={<PaymentSuccessHandler />} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:productId' element={<ProductDetails />} />

        <Route path='/my-returns' element={<MyReturns />} />
        <Route path='/return/:orderId' element={<ReturnForm />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/learning-hub" element={<LearningHub />} />
        <Route path="/learning-hub/:id" element={<LearningVideoDetail />} />

        <Route path="/tickets" element={<MyTickets />} />
        <Route path="/tickets/new" element={<CreateTicket />} />
        <Route path="/tickets/:ticketId" element={<TicketChat />} />
        <Route path="/customize/:productId" element={<CustomizeProductPage />} />

        <Route path="/:slug" element={<FooterContent />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default CustomerRoutes