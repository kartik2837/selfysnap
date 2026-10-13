// import {
//   configureStore,
//   combineReducers,
// } from "@reduxjs/toolkit";


// import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
// import sellerSlice from "./Seller/sellerSlice";
// import sellerAuthenticationSlice from "./Seller/sellerAuthenticationSlice";
// import sellerProductSlice from "./Seller/sellerProductSlice";
// import ProductSlice from "./Customer/ProductSlice";
// import CartSlice from "./Customer/CartSlice";
// import AuthSlice from "./Customer/AuthSlice";
// import UserSlice from "./Customer/UserSlice";
// import OrderSlice from "./Customer/OrderSlice";
// import sellerOrderSlice from "./Seller/sellerOrderSlice";
// import payoutSlice from "./Seller/payoutSlice";
// import payoutRequestSlice from "./Seller/payoutRequestSlice";
// import transactionSlice from "./Seller/transactionSlice";
// import CouponSlice from "./Customer/CouponSlice";
// import AdminCouponSlice from "./Admin/AdminCouponSlice";
// import ReviewSlice from "./Customer/ReviewSlice";
// import WishlistSlice from "./Customer/WishlistSlice";
// import AiChatBotSlice from "./Customer/AiChatBotSlice";
// import revenueChartSlice from "./Seller/revenueChartSlice";
// import CustomerSlice from "./Customer/Customer/CustomerSlice";
// import DealSlice from "./Admin/DealSlice";
// import AdminSlice from "./Admin/AdminSlice";
// import mainCategorySlice from "./Admin/MainCategorySlice";
// import bannerSlice from "./Admin/BannerSlice";
// import footerSlice from "./Admin/FooterSlice";
// import homeSectionSlice from "./Admin/HomeSectionSlice";
// import categorySlice from "./Admin/CategorySlice";
// import adminOrderSlice from "./Admin/orderSlice";
// import adminPayoutSlice from "./Admin/payoutSlice";
// import homePreviewSlice from "./Customer/HomeSectionSlice";
// import addressSlice from "./Customer/addressSlice"
// import BuyNowSlice from "./Customer/BuyNowSlice"
// import adminReturnSlice from "./Admin/AdminReturnSlice";


// const rootReducer = combineReducers({

//   // customer
//   auth: AuthSlice,
//   user: UserSlice,
//   products: ProductSlice,
//   cart: CartSlice,
//   orders: OrderSlice,
//   coupone: CouponSlice,
//   review: ReviewSlice,
//   wishlist: WishlistSlice,
//   aiChatBot: AiChatBotSlice,
//   homePage: CustomerSlice,

//   // seller
//   sellers: sellerSlice,
//   sellerAuth: sellerAuthenticationSlice,
//   sellerProduct: sellerProductSlice,
//   sellerOrder: sellerOrderSlice,
//   payouts: payoutSlice,
//   transaction: transactionSlice,
//   revenueChart: revenueChartSlice,
//   payoutRequest: payoutRequestSlice,

//   // admin
//   adminCoupon: AdminCouponSlice,
//   adminDeals: DealSlice,
//   admin: AdminSlice,
//   deal: DealSlice,
//   adminOrders: adminOrderSlice,
//   adminPayouts: adminPayoutSlice,
//   adminReturns: adminReturnSlice,

//   mainCategory: mainCategorySlice,
//   banner: bannerSlice,
//   footer: footerSlice,
//   homeSection: homeSectionSlice,
//   category: categorySlice,
//   homepreview: homePreviewSlice,
//   address: addressSlice,
//   buyNow: BuyNowSlice,
// });

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// });
// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof rootReducer>;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export default store;









// import {
//   configureStore,
//   combineReducers,
// } from "@reduxjs/toolkit";

// import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
// import sellerSlice from "./Seller/sellerSlice";
// import sellerAuthenticationSlice from "./Seller/sellerAuthenticationSlice";
// import sellerProductSlice from "./Seller/sellerProductSlice";
// import ProductSlice from "./Customer/ProductSlice";
// import CartSlice from "./Customer/CartSlice";
// import AuthSlice from "./Customer/AuthSlice";
// import UserSlice from "./Customer/UserSlice";
// import OrderSlice from "./Customer/OrderSlice";
// import sellerOrderSlice from "./Seller/sellerOrderSlice";
// import payoutSlice from "./Seller/payoutSlice";
// import payoutRequestSlice from "./Seller/payoutRequestSlice";
// import transactionSlice from "./Seller/transactionSlice";
// import CouponSlice from "./Customer/CouponSlice";
// import AdminCouponSlice from "./Admin/AdminCouponSlice";
// import ReviewSlice from "./Customer/ReviewSlice";
// import WishlistSlice from "./Customer/WishlistSlice";
// import AiChatBotSlice from "./Customer/AiChatBotSlice";
// import revenueChartSlice from "./Seller/revenueChartSlice";
// import CustomerSlice from "./Customer/Customer/CustomerSlice";
// import DealSlice from "./Admin/DealSlice";
// import AdminSlice from "./Admin/AdminSlice";
// import mainCategorySlice from "./Admin/MainCategorySlice";
// import bannerSlice from "./Admin/BannerSlice";
// import footerSlice from "./Admin/FooterSlice";
// import homeSectionSlice from "./Admin/HomeSectionSlice";
// import categorySlice from "./Admin/CategorySlice";
// import adminOrderSlice from "./Admin/orderSlice";
// import adminPayoutSlice from "./Admin/payoutSlice";
// import homePreviewSlice from "./Customer/HomeSectionSlice";
// import addressSlice from "./Customer/addressSlice";
// import BuyNowSlice from "./Customer/BuyNowSlice";
// import adminReturnSlice from "./Admin/AdminReturnSlice";

// // 👇 NEW: Customer Return Slice Import
// import ReturnSlice from "./Customer/ReturnSlice";

// const rootReducer = combineReducers({

//   // customer
//   auth: AuthSlice,
//   user: UserSlice,
//   products: ProductSlice,
//   cart: CartSlice,
//   orders: OrderSlice,
//   coupone: CouponSlice,
//   review: ReviewSlice,
//   wishlist: WishlistSlice,
//   aiChatBot: AiChatBotSlice,
//   homePage: CustomerSlice,
//   return: ReturnSlice, // 👈 NEW: Customer Return Reducer

//   // seller
//   sellers: sellerSlice,
//   sellerAuth: sellerAuthenticationSlice,
//   sellerProduct: sellerProductSlice,
//   sellerOrder: sellerOrderSlice,
//   payouts: payoutSlice,
//   transaction: transactionSlice,
//   revenueChart: revenueChartSlice,
//   payoutRequest: payoutRequestSlice,

//   // admin
//   adminCoupon: AdminCouponSlice,
//   adminDeals: DealSlice,
//   admin: AdminSlice,
//   deal: DealSlice,
//   adminOrders: adminOrderSlice,
//   adminPayouts: adminPayoutSlice,
//   adminReturns: adminReturnSlice,

//   mainCategory: mainCategorySlice,
//   banner: bannerSlice,
//   footer: footerSlice,
//   homeSection: homeSectionSlice,
//   category: categorySlice,
//   homepreview: homePreviewSlice,
//   address: addressSlice,
//   buyNow: BuyNowSlice,
// });

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof rootReducer>;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export default store;










// import {
//   configureStore,
//   combineReducers,
// } from "@reduxjs/toolkit";
// import gstSlice from "./Seller/gstSlice";

// import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
// import sellerSlice from "./Seller/sellerSlice";
// import sellerAuthenticationSlice from "./Seller/sellerAuthenticationSlice";
// import sellerProductSlice from "./Seller/sellerProductSlice";
// import ProductSlice from "./Customer/ProductSlice";
// import CartSlice from "./Customer/CartSlice";
// import AuthSlice from "./Customer/AuthSlice";
// import UserSlice from "./Customer/UserSlice";
// import OrderSlice from "./Customer/OrderSlice";
// import sellerOrderSlice from "./Seller/sellerOrderSlice";
// import payoutSlice from "./Seller/payoutSlice";
// import payoutRequestSlice from "./Seller/payoutRequestSlice";
// import transactionSlice from "./Seller/transactionSlice";
// import CouponSlice from "./Customer/CouponSlice";
// import AdminCouponSlice from "./Admin/AdminCouponSlice";
// import ReviewSlice from "./Customer/ReviewSlice";
// import WishlistSlice from "./Customer/WishlistSlice";
// import AiChatBotSlice from "./Customer/AiChatBotSlice";
// import revenueChartSlice from "./Seller/revenueChartSlice";
// import CustomerSlice from "./Customer/Customer/CustomerSlice";
// import DealSlice from "./Admin/DealSlice";
// import AdminSlice from "./Admin/AdminSlice";
// import mainCategorySlice from "./Admin/MainCategorySlice";
// import bannerSlice from "./Admin/BannerSlice";
// import footerSlice from "./Admin/FooterSlice";
// import homeSectionSlice from "./Admin/HomeSectionSlice";
// import categorySlice from "./Admin/CategorySlice";
// import adminOrderSlice from "./Admin/orderSlice";
// import adminPayoutSlice from "./Admin/payoutSlice";
// import homePreviewSlice from "./Customer/HomeSectionSlice";
// import addressSlice from "./Customer/addressSlice";
// import BuyNowSlice from "./Customer/BuyNowSlice";
// import adminReturnSlice from "./Admin/AdminReturnSlice";
// import brandReducer from './Seller/brandSlice';
// import adminBrandReducer from './Admin/adminBrandSlice';


// // 👇 Customer Return Slice Import
// import ReturnSlice from "./Customer/ReturnSlice";
// import notificationSlice from "./Customer/notificationSlice";
// import offerSlice from "./Admin/offerSlice";
// import deliverySettingsReducer from "./Admin/deliverySettingsSlice";
// import supportCallReducer from "./Seller/supportCallSlice";
// import serviceReducer from "./Admin/ServiceSlice";
// import serviceRequestReducer from "./Customer/ServiceRequestSlice";
// import adminTicketReducer from './Admin/adminTicketSlice';
// import ticketReducer from './Customer/ticketSlice';


// // 👇 NEW: Report Slice Import
// import reportSlice from "./Seller/report.slice";

// const rootReducer = combineReducers({

//   // customer
//   auth: AuthSlice,
//   user: UserSlice,
//   products: ProductSlice,
//   cart: CartSlice,
//   orders: OrderSlice,
//   coupone: CouponSlice,
//   review: ReviewSlice,
//   wishlist: WishlistSlice,
//   aiChatBot: AiChatBotSlice,
//   homePage: CustomerSlice,
//   return: ReturnSlice,

//   // seller
//   sellers: sellerSlice,
//   sellerAuth: sellerAuthenticationSlice,
//   sellerProduct: sellerProductSlice,
//   sellerOrder: sellerOrderSlice,
//   payouts: payoutSlice,
//   transaction: transactionSlice,
//   revenueChart: revenueChartSlice,
//   payoutRequest: payoutRequestSlice,
//   gst: gstSlice,
//   brand: brandReducer,
//     adminBrand: adminBrandReducer,
//         supportCall: supportCallReducer,
//         service: serviceReducer,
//     serviceRequest: serviceRequestReducer,
   

//   // 👇 NEW: Report Reducer
//   report: reportSlice,

//   // admin
//   adminCoupon: AdminCouponSlice,
//   adminDeals: DealSlice,
//   admin: AdminSlice,
//   deal: DealSlice,
//   adminOrders: adminOrderSlice,
//   adminPayouts: adminPayoutSlice,
//   adminReturns: adminReturnSlice,

//   mainCategory: mainCategorySlice,
//   banner: bannerSlice,
//   footer: footerSlice,
//   homeSection: homeSectionSlice,
//   category: categorySlice,
//   homepreview: homePreviewSlice,
//   address: addressSlice,
//   buyNow: BuyNowSlice,
//     notifications: notificationSlice,
//       offers: offerSlice,
//         deliverySettings: deliverySettingsReducer,
//                 adminTickets: adminTicketReducer,
//                         tickets: ticketReducer
          
// });

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof rootReducer>;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export default store;
























import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

// ============================================================
// ALL SLICES (same as before)
// ============================================================
import gstSlice from "./Seller/gstSlice";
import sellerSlice from "./Seller/sellerSlice";
import sellerAuthenticationSlice from "./Seller/sellerAuthenticationSlice";
import sellerProductSlice from "./Seller/sellerProductSlice";
import ProductSlice from "./Customer/ProductSlice";
import CartSlice from "./Customer/CartSlice";
import AuthSlice from "./Customer/AuthSlice";
import UserSlice from "./Customer/UserSlice";
import OrderSlice from "./Customer/OrderSlice";
import sellerOrderSlice from "./Seller/sellerOrderSlice";
import payoutSlice from "./Seller/payoutSlice";
import payoutRequestSlice from "./Seller/payoutRequestSlice";
import transactionSlice from "./Seller/transactionSlice";
import CouponSlice from "./Customer/CouponSlice";
import AdminCouponSlice from "./Admin/AdminCouponSlice";
import ReviewSlice from "./Customer/ReviewSlice";
import WishlistSlice from "./Customer/WishlistSlice";
import AiChatBotSlice from "./Customer/AiChatBotSlice";
import revenueChartSlice from "./Seller/revenueChartSlice";
import CustomerSlice from "./Customer/Customer/CustomerSlice";
import DealSlice from "./Admin/DealSlice";
import AdminSlice from "./Admin/AdminSlice";
import mainCategorySlice from "./Admin/MainCategorySlice";
import bannerSlice from "./Admin/BannerSlice";
import footerSlice from "./Admin/FooterSlice";
import homeSectionSlice from "./Admin/HomeSectionSlice";
import categorySlice from "./Admin/CategorySlice";
import adminOrderSlice from "./Admin/orderSlice";
import adminPayoutSlice from "./Admin/payoutSlice";
import homePreviewSlice from "./Customer/HomeSectionSlice";
import addressSlice from "./Customer/addressSlice";
import BuyNowSlice from "./Customer/BuyNowSlice";
import adminReturnSlice from "./Admin/AdminReturnSlice";
import brandReducer from './Seller/brandSlice';
import adminBrandReducer from './Admin/adminBrandSlice';
import ReturnSlice from "./Customer/ReturnSlice";
import notificationSlice from "./Customer/notificationSlice";
import offerSlice from "./Admin/offerSlice";
import deliverySettingsReducer from "./Admin/deliverySettingsSlice";
import supportCallReducer from "./Seller/supportCallSlice";
import serviceReducer from "./Admin/ServiceSlice";
import serviceRequestReducer from "./Customer/ServiceRequestSlice";
import adminTicketReducer from './Admin/adminTicketSlice';
import ticketReducer from './Customer/ticketSlice';
import reportSlice from "./Seller/report.slice";

// ============================================================
// ROOT REDUCER
// ============================================================
const rootReducer = combineReducers({
  // Customer
  auth: AuthSlice,
  user: UserSlice,
  products: ProductSlice,
  cart: CartSlice,
  orders: OrderSlice,
  coupone: CouponSlice,
  review: ReviewSlice,
  wishlist: WishlistSlice,
  aiChatBot: AiChatBotSlice,
  homePage: CustomerSlice,
  return: ReturnSlice,

  // Seller
  sellers: sellerSlice,
  sellerAuth: sellerAuthenticationSlice,
  sellerProduct: sellerProductSlice,
  sellerOrder: sellerOrderSlice,
  payouts: payoutSlice,
  transaction: transactionSlice,
  revenueChart: revenueChartSlice,
  payoutRequest: payoutRequestSlice,
  gst: gstSlice,
  brand: brandReducer,
  adminBrand: adminBrandReducer,
  supportCall: supportCallReducer,
  service: serviceReducer,
  serviceRequest: serviceRequestReducer,
  report: reportSlice,

  // Admin
  adminCoupon: AdminCouponSlice,
  adminDeals: DealSlice,
  admin: AdminSlice,
  deal: DealSlice,
  adminOrders: adminOrderSlice,
  adminPayouts: adminPayoutSlice,
  adminReturns: adminReturnSlice,
  mainCategory: mainCategorySlice,
  banner: bannerSlice,
  footer: footerSlice,
  homeSection: homeSectionSlice,
  category: categorySlice,
  homepreview: homePreviewSlice,
  address: addressSlice,
  buyNow: BuyNowSlice,
  notifications: notificationSlice,
  offers: offerSlice,
  deliverySettings: deliverySettingsReducer,

  // Tickets
  adminTickets: adminTicketReducer,
  tickets: ticketReducer
});

// ============================================================
// ✅ STORE — named export (fix)
// ============================================================
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// ============================================================
// ✅ TYPES
// ============================================================
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

// ============================================================
// ✅ HOOKS
// ============================================================
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);

// ============================================================
// ✅ DEFAULT EXPORT (backward compatible)
// ============================================================
export default store;