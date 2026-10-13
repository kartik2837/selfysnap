// import { Route, Routes } from 'react-router-dom'
// import HomePage from '../seller/pages/SellerDashboard/HomePage'
// import Products from '../seller/pages/Products/Products'
// import ProductForm from '../seller/pages/Products/AddProductForm'
// import Orders from '../seller/pages/Orders/Orders'
// import Profile from '../seller/pages/Account/Profile'
// import Payment from '../seller/pages/Payment/Payment'
// import TransactionTable from '../seller/pages/Payment/TransactionTable'
// import SellerReturnsTable from '../seller/pages/Orders/SellerReturnsTable'

// import Dashboard from '../seller/pages/SellerDashboard/SellerDashboard';
// import SalesReport from '../seller/pages/SellerDashboard/Report/SalesReport';
// import InventoryStockReport from '../seller/pages/SellerDashboard/Report/InventoryStockReport';
// import InventorySummaryReport from '../seller/pages/SellerDashboard/Report/InventorySummaryReport';
// import GSTReport from "../seller/pages/SellerDashboard/Report/GSTReport";
// import MySupportCalls from '../seller/pages/Support/CallSupportButton';
// import CreativeServices from "../seller/pages/CreativeServices/CreativeServices";
// import CreateRequest from "../seller/pages/CreativeServices/CreateRequest";
// import MyRequests from "../seller/pages/CreativeServices/MyRequests";


// const SellerRoutes = () => {
//   return (
//     <Routes>
//       <Route path='/' element={<HomePage />} />
//       <Route path='/products' element={<Products />} />
//       <Route path='/add-product' element={<ProductForm />} />
//       <Route path='/orders' element={<Orders />} />
//       <Route path='/returns' element={<SellerReturnsTable />} />
//       <Route path='/account' element={<Profile />} />
//       <Route path='/payment' element={<Payment />} />
//       <Route path='/transaction' element={<TransactionTable />} />

//       <Route path='/reports/dashboard' element={<Dashboard />} />
//                 <Route path='/reports/sales' element={<SalesReport />} />
//                 <Route path='/reports/inventory/stock' element={<InventoryStockReport />} />
//                 <Route path='/reports/inventory/summary' element={<InventorySummaryReport />} />
//                 <Route path="reports/gst" element={<GSTReport />} />
//                       <Route path='/support-calls' element={<MySupportCalls />} />
//                       <Route path="/creative-services" element={<CreativeServices />} />
// <Route path="/creative-services/request/:slug" element={<CreateRequest />} />
// <Route path="/creative-services/my-requests" element={<MyRequests />} />
                
               
//     </Routes>
//   )
// }

// export default SellerRoutes









import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../Redux Toolkit/Store';
import { fetchSellerProfile } from '../Redux Toolkit/Seller/sellerSlice';
import SellerActivationPending from '../seller/pages/SellerDashboard/SellerActivationPending';

import HomePage from '../seller/pages/SellerDashboard/HomePage';
import Products from '../seller/pages/Products/Products';
import ProductForm from '../seller/pages/Products/AddProductForm';
import Orders from '../seller/pages/Orders/Orders';
import Profile from '../seller/pages/Account/Profile';
import Payment from '../seller/pages/Payment/Payment';
import TransactionTable from '../seller/pages/Payment/TransactionTable';
import SellerReturnsTable from '../seller/pages/Orders/SellerReturnsTable';

import Dashboard from '../seller/pages/SellerDashboard/SellerDashboard';
import SalesReport from '../seller/pages/SellerDashboard/Report/SalesReport';
import InventoryStockReport from '../seller/pages/SellerDashboard/Report/InventoryStockReport';
import InventorySummaryReport from '../seller/pages/SellerDashboard/Report/InventorySummaryReport';
import GSTReport from '../seller/pages/SellerDashboard/Report/GSTReport';
import MySupportCalls from '../seller/pages/Support/CallSupportButton';
import CreativeServices from '../seller/pages/CreativeServices/CreativeServices';
import CreateRequest from '../seller/pages/CreativeServices/CreateRequest';
import MyRequests from '../seller/pages/CreativeServices/MyRequests';

const SellerRoutes = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sellers } = useAppSelector((store: any) => store);

  // ═══════════════════════════════════════════════════
  // 🔥 CHECK SELLER PROFILE + STATUS ON MOUNT
  // ═══════════════════════════════════════════════════
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      console.log('❌ [SellerRoutes] No JWT → Login page');
      navigate('/seller/login', { replace: true });
      return;
    }

    if (!sellers.profile) {
      console.log('🔵 [SellerRoutes] Fetching profile...');
      dispatch(fetchSellerProfile(jwt) as any);
    }
  }, [dispatch, navigate, sellers.profile]);

  // ─── Loading ───
  if (sellers.loading && !sellers.profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <CircularProgress size={50} />
        <p className="mt-4 text-gray-600 font-semibold">
          Loading your account...
        </p>
      </div>
    );
  }

  // ─── No Profile ───
  if (!sellers.profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <CircularProgress size={50} />
      </div>
    );
  }

  // ═══════════════════════════════════════════════════
  // 🔥 BLOCK ALL ROUTES IF NOT ACTIVE
  // ═══════════════════════════════════════════════════
  const accountStatus = sellers.profile?.accountStatus;

  if (accountStatus !== 'ACTIVE') {
    console.log(
      '🔴 [SellerRoutes] Seller not ACTIVE (',
      accountStatus,
      ') → Blocking all routes'
    );

    return (
      <SellerActivationPending
        sellerName={
          sellers.profile?.businessDetails?.businessName ||
          sellers.profile?.sellerName ||
          'Seller'
        }
        sellerEmail={sellers.profile?.email || ''}
        accountStatus={accountStatus || 'PENDING_VERIFICATION'}
      />
    );
  }

  console.log('🟢 [SellerRoutes] Seller ACTIVE → All routes accessible');

  // ═══════════════════════════════════════════════════
  // ✅ ACTIVE → NORMAL ROUTES
  // ═══════════════════════════════════════════════════
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/add-product" element={<ProductForm />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/returns" element={<SellerReturnsTable />} />
      <Route path="/account" element={<Profile />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/transaction" element={<TransactionTable />} />

      <Route path="/reports/dashboard" element={<Dashboard />} />
      <Route path="/reports/sales" element={<SalesReport />} />
      <Route
        path="/reports/inventory/stock"
        element={<InventoryStockReport />}
      />
      <Route
        path="/reports/inventory/summary"
        element={<InventorySummaryReport />}
      />
      <Route path="/reports/gst" element={<GSTReport />} />
      <Route path="/support-calls" element={<MySupportCalls />} />
      <Route path="/creative-services" element={<CreativeServices />} />
      <Route
        path="/creative-services/request/:slug"
        element={<CreateRequest />}
      />
      <Route
        path="/creative-services/my-requests"
        element={<MyRequests />}
      />
    </Routes>
  );
};

export default SellerRoutes;