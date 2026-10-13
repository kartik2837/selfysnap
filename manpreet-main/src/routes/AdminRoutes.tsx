// import { Route, Routes } from 'react-router-dom'
// import SellersTable from '../admin/pages/sellers/SellersTable'
// import Coupon from '../admin/pages/Coupon/Coupon'
// import CouponForm from '../admin/pages/Coupon/CreateCouponForm'
// import GridTable from '../admin/pages/Home Page/GridTable'
// import ElectronicsTable from '../admin/pages/Home Page/ElectronicsTable'
// import ShopByCategoryTable from '../admin/pages/Home Page/ShopByCategoryTable'
// import Deal from '../admin/pages/Home Page/Deal'
// import AdminMainCategoryPage from '../admin/pages/Maincategory/MainCategoryPage'
// import AddBanner from '../admin/pages/Banner/AdminBannerPage'
// import HomePageManagement from '../admin/pages/Home Page/HomePageManagement'
// import FooterAdmin from '../admin/pages/Footer/FooterAdmin'
// import HomeSection from '../admin/pages/HomeSection/HomeSectionPage'
// import AdminOrdersTable from '../admin/pages/Dashboard/AdminOrdersTable'
// import AdminPayoutsTable from '../admin/pages/Dashboard/AdminPayoutsTable'
// import AdminReturnsTable from '../admin/pages/Dashboard/AdminReturnsTable'
// import OfferList from "../admin/pages/Offers/OfferList";
// import CreateOffer from "../admin/pages/Offers/CreateOffer";
// const AdminRoutes = () => {
//   return (
//     <Routes>
//       <Route path='/' element={<SellersTable />} />
//       <Route path='/orders' element={<AdminOrdersTable />} />
//       <Route path='/payouts' element={<AdminPayoutsTable />} />
//       <Route path='/returns' element={<AdminReturnsTable />} />
//       <Route path='/coupon' element={<Coupon />} />
//       <Route path='/add-coupon' element={<CouponForm />} />
//       <Route path='/home-page' element={<HomePageManagement />} />
//       <Route path='/home-grid' element={<GridTable />} />
//       <Route path='/electronics-category' element={<ElectronicsTable />} />
//       <Route path='/main-category' element={<AdminMainCategoryPage />} />
//       <Route path='/banners' element={<AddBanner />} />
//       <Route path='/shop-by-category' element={<ShopByCategoryTable />} />
//       <Route path='/deals' element={<Deal />} />
//       <Route path='/footer' element={<FooterAdmin />} />
//       <Route path='/home-section' element={<HomeSection />} />
//       <Route path="/offers" element={<OfferList />} />
// <Route path="/offers/create" element={<CreateOffer />} />
//     </Routes>
//   )
// }

// export default AdminRoutes











// // src/routes/AdminRoutes.tsx

// import { Route, Routes } from "react-router-dom";

// // ═══ Dashboard ═══
// import AdminAnalyticsCards from "../admin/pages/Dashboard/AdminAnalyticsCards";

// // ═══ Sellers ═══
// import SellersTable from "../admin/pages/sellers/SellersTable";

// // ═══ Coupons ═══
// import Coupon from "../admin/pages/Coupon/Coupon";
// import CouponForm from "../admin/pages/Coupon/CreateCouponForm";

// // ═══ Home Page ═══
// import GridTable from "../admin/pages/Home Page/GridTable";
// import ElectronicsTable from "../admin/pages/Home Page/ElectronicsTable";
// import ShopByCategoryTable from "../admin/pages/Home Page/ShopByCategoryTable";
// import Deal from "../admin/pages/Home Page/Deal";
// import HomePageManagement from "../admin/pages/Home Page/HomePageManagement";

// // ═══ Others ═══
// import AdminMainCategoryPage from "../admin/pages/Maincategory/MainCategoryPage";
// import AddBanner from "../admin/pages/Banner/AdminBannerPage";
// import FooterAdmin from "../admin/pages/Footer/FooterAdmin";
// import HomeSection from "../admin/pages/HomeSection/HomeSectionPage";

// // ═══ Orders & Payouts ═══
// import AdminOrdersTable from "../admin/pages/Dashboard/AdminOrdersTable";
// import AdminPayoutsTable from "../admin/pages/Dashboard/AdminPayoutsTable";
// import AdminReturnsTable from "../admin/pages/Dashboard/AdminReturnsTable";

// // ═══ Offers ═══
// import OfferList from "../admin/pages/Offers/OfferList";
// import CreateOffer from "../admin/pages/Offers/CreateOffer";
// import AdminBannersPage from "../admin/pages/Banners/AdminBannersPage";
// import DeliverySettingsPage from "../admin/pages/Settings/DeliverySettings";
// import AdminBrands from "../admin/pages/Brands/AdminBrands";
// import AdminSupportCalls from "../admin/pages/Support/AdminSupportCalls";
// import CreateService from "../admin/pages/Services/CreateService";
// import AllServices from "../admin/pages/Services/AllServices";
// import AdminServiceRequests from "../admin/pages/Services/AdminServiceRequests";
// import TicketsList from '../admin/pages/TicketsList';
// import TicketDetail from '../admin/pages/TicketDetail';
// import LegalPageList from "../admin/pages/LegalPages/LegalPageList";
// import LegalPageEditor from "../admin/pages/LegalPages/";



// const AdminRoutes = () => {
//   return (
//     <Routes>
//       {/* ═══════════════════════════════════════════════ */}
//       {/* ✅ HOME – Dashboard (Charts + Cards) */}
//       {/* ═══════════════════════════════════════════════ */}
//       <Route path="/" element={<AdminAnalyticsCards />} />

//       {/* ═══════════════════════════════════════════════ */}
//       {/* ✅ SELLERS – अलग Route */}
//       {/* ═══════════════════════════════════════════════ */}
//       <Route path="/sellers" element={<SellersTable />} />

//       {/* ═══ Orders & Payouts ═══ */}
//       <Route path="/orders" element={<AdminOrdersTable />} />
//       <Route path="/payouts" element={<AdminPayoutsTable />} />
//       <Route path="/returns" element={<AdminReturnsTable />} />

//       {/* ═══ Coupons ═══ */}
//       <Route path="/coupon" element={<Coupon />} />
//       <Route path="/add-coupon" element={<CouponForm />} />

//       {/* ═══ Home Page ═══ */}
//       <Route path="/home-page" element={<HomePageManagement />} />
//       <Route path="/home-grid" element={<GridTable />} />
//       <Route path="/electronics-category" element={<ElectronicsTable />} />
//       <Route path="/shop-by-category" element={<ShopByCategoryTable />} />
//       <Route path="/deals" element={<Deal />} />

//       {/* ═══ Categories & Banners ═══ */}
//       <Route path="/main-category" element={<AdminMainCategoryPage />} />
//       <Route path="/banners" element={<AddBanner />} />
//       <Route path="/footer" element={<FooterAdmin />} />
//       <Route path="/home-section" element={<HomeSection />} />

//       {/* ═══ Offers ═══ */}
//       <Route path="/offers" element={<OfferList />} />
//       <Route path="/offers/create" element={<CreateOffer />} />
//       <Route path="/new-banners" element={<AdminBannersPage />} />
//       <Route path="/brands" element={<AdminBrands />} />
//       <Route path="/support-calls" element={<AdminSupportCalls />} />

//       <Route
//         path="/settings/delivery"
//         element={<DeliverySettingsPage />}


//       />
//       <Route path="/services" element={<AllServices />} />
// <Route path="/services/create" element={<CreateService />} />
// <Route path="/service-requests" element={<AdminServiceRequests />} />

// <Route path="/tickets" element={<TicketsList />} />
//  <Route path="/tickets/:ticketId" element={<TicketDetail />} />

//  <Route path="/admin/legal-pages" element={<LegalPageList />} />
// <Route path="/admin/legal-pages/new" element={<LegalPageEditor />} />
// <Route path="/admin/legal-pages/edit/:id" element={<LegalPageEditor />} />

//     </Routes>
//   );
// };

// export default AdminRoutes;





















// src/routes/AdminRoutes.tsx

import { Route, Routes } from "react-router-dom";

// ═══ Dashboard ═══
import AdminAnalyticsCards from "../admin/pages/Dashboard/AdminAnalyticsCards";

// ═══ Sellers ═══
import SellersTable from "../admin/pages/sellers/SellersTable";

// ═══ Coupons ═══
import Coupon from "../admin/pages/Coupon/Coupon";
import CouponForm from "../admin/pages/Coupon/CreateCouponForm";

// ═══ Home Page ═══
import GridTable from "../admin/pages/Home Page/GridTable";
import ElectronicsTable from "../admin/pages/Home Page/ElectronicsTable";
import ShopByCategoryTable from "../admin/pages/Home Page/ShopByCategoryTable";
import Deal from "../admin/pages/Home Page/Deal";
import HomePageManagement from "../admin/pages/Home Page/HomePageManagement";

// ═══ Others ═══
import AdminMainCategoryPage from "../admin/pages/Maincategory/MainCategoryPage";
import AddBanner from "../admin/pages/Banner/AdminBannerPage";
import FooterAdmin from "../admin/pages/Footer/FooterAdmin";
import HomeSection from "../admin/pages/HomeSection/HomeSectionPage";

// ═══ Orders & Payouts ═══
import AdminOrdersTable from "../admin/pages/Dashboard/AdminOrdersTable";
import AdminPayoutsTable from "../admin/pages/Dashboard/AdminPayoutsTable";
import AdminReturnsTable from "../admin/pages/Dashboard/AdminReturnsTable";

// ═══ Offers ═══
import OfferList from "../admin/pages/Offers/OfferList";
import CreateOffer from "../admin/pages/Offers/CreateOffer";
import AdminBannersPage from "../admin/pages/Banners/AdminBannersPage";
import DeliverySettingsPage from "../admin/pages/Settings/DeliverySettings";
import AdminBrands from "../admin/pages/Brands/AdminBrands";
import AdminSupportCalls from "../admin/pages/Support/AdminSupportCalls";
import CreateService from "../admin/pages/Services/CreateService";
import AllServices from "../admin/pages/Services/AllServices";
import AdminServiceRequests from "../admin/pages/Services/AdminServiceRequests";
import TicketsList from "../admin/pages/TicketsList";
import TicketDetail from "../admin/pages/TicketDetail";

// ═══ Legal Pages ═══
import LegalPageList from "../admin/pages/LegalPages/LegalPageList";
import LegalPageEditor from "../admin/pages/LegalPages/LegalPageEditor";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* ═══════════════════════════════════════════════ */}
      {/* ✅ HOME – Dashboard (Charts + Cards) */}
      {/* ═══════════════════════════════════════════════ */}
      <Route path="/" element={<AdminAnalyticsCards />} />

      {/* ═══════════════════════════════════════════════ */}
      {/* ✅ SELLERS */}
      {/* ═══════════════════════════════════════════════ */}
      <Route path="/sellers" element={<SellersTable />} />

      {/* ═══ Orders & Payouts ═══ */}
      <Route path="/orders" element={<AdminOrdersTable />} />
      <Route path="/payouts" element={<AdminPayoutsTable />} />
      <Route path="/returns" element={<AdminReturnsTable />} />

      {/* ═══ Coupons ═══ */}
      <Route path="/coupon" element={<Coupon />} />
      <Route path="/add-coupon" element={<CouponForm />} />

      {/* ═══ Home Page ═══ */}
      <Route path="/home-page" element={<HomePageManagement />} />
      <Route path="/home-grid" element={<GridTable />} />
      <Route path="/electronics-category" element={<ElectronicsTable />} />
      <Route path="/shop-by-category" element={<ShopByCategoryTable />} />
      <Route path="/deals" element={<Deal />} />

      {/* ═══ Categories & Banners ═══ */}
      <Route path="/main-category" element={<AdminMainCategoryPage />} />
      <Route path="/banners" element={<AddBanner />} />
      <Route path="/footer" element={<FooterAdmin />} />
      <Route path="/home-section" element={<HomeSection />} />

      {/* ═══ Offers ═══ */}
      <Route path="/offers" element={<OfferList />} />
      <Route path="/offers/create" element={<CreateOffer />} />
      <Route path="/new-banners" element={<AdminBannersPage />} />
      <Route path="/brands" element={<AdminBrands />} />
      <Route path="/support-calls" element={<AdminSupportCalls />} />

      <Route path="/settings/delivery" element={<DeliverySettingsPage />} />
      <Route path="/services" element={<AllServices />} />
      <Route path="/services/create" element={<CreateService />} />
      <Route path="/service-requests" element={<AdminServiceRequests />} />

      <Route path="/tickets" element={<TicketsList />} />
      <Route path="/tickets/:ticketId" element={<TicketDetail />} />

      {/* ═══════════════════════════════════════════════ */}
      {/* 🔥 LEGAL PAGES — Bina /admin prefix */}
      {/* ═══════════════════════════════════════════════ */}
      <Route path="/legal-pages" element={<LegalPageList />} />
      <Route path="/legal-pages/new" element={<LegalPageEditor />} />
      <Route path="/legal-pages/edit/:id" element={<LegalPageEditor />} />
    </Routes>
  );
};

export default AdminRoutes;