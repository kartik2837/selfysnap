// import DrawerList from "../../admin seller/components/drawerList/DrawerList";
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import AddIcon from '@mui/icons-material/Add';
// import HomeIcon from '@mui/icons-material/Home';
// import FolderIcon from '@mui/icons-material/Folder';
// import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
// import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
// import { ViewCarouselSharp } from "@mui/icons-material";
// import LogoutIcon from '@mui/icons-material/Logout';
// const menu = [
//     {
//         name: "Dashboard",
//         path: "/admin",
//         icon: <DashboardIcon className="text-primary-color" />,
//         activeIcon: <DashboardIcon className="text-white" />,
//     },
//     {
//         name: "Orders",
//         path: "/admin/orders",
//         icon: <DashboardIcon className="text-primary-color" />,
//         activeIcon: <DashboardIcon className="text-white" />,
//     },
//     {
//         name: "Payouts",
//         path: "/admin/payouts",
//         icon: <DashboardIcon className="text-primary-color" />,
//         activeIcon: <DashboardIcon className="text-white" />,
//     },
//     {
//         name: "Returns",
//         path: "/admin/returns",
//         icon: <DashboardIcon className="text-primary-color" />,
//         activeIcon: <DashboardIcon className="text-white" />,
//     },
//     {
//         name: "Coupons",
//         path: "/admin/coupon",
//         icon: <IntegrationInstructionsIcon className="text-primary-color" />,
//         activeIcon: <IntegrationInstructionsIcon className="text-white" />,
//     },
//     {
//         name: "Add New Coupon",
//         path: "/admin/add-coupon",
//         icon: <AddIcon className="text-primary-color" />,
//         activeIcon: <AddIcon className="text-white" />,
//     },
//     {
//         name: "Banners",
//         path: "/admin/banners",
//         icon: <ViewCarouselSharp className="text-primary-color" />,
//         activeIcon: <ViewCarouselSharp className="text-white" />,
//     },
//     {
//         name: "Footer",
//         path: "/admin/footer",
//         icon: <HomeIcon className="text-primary-color" />,
//         activeIcon: <HomeIcon className="text-white" />,
//     },
//     {
//         name: "Home Management",
//         path: "/admin/home-page",
//         icon: <HomeIcon className="text-primary-color" />,
//         activeIcon: <HomeIcon className="text-white" />,
//     },
//     {
//         name: "Home Sections",
//         path: "/admin/home-section",
//         icon: <ElectricBoltIcon className="text-primary-color" />,
//         activeIcon: <ElectricBoltIcon className="text-white" />,
//     },
//     {
//         name: "Main Category",
//         path: "/admin/main-category",
//         icon: <FolderIcon className="text-primary-color" />,
//         activeIcon: <FolderIcon className="text-white" />,
//     },

    
//     {
//         name: "Deals",
//         path: "/admin/deals",
//         icon: <LocalOfferIcon className="text-primary-color" />,
//         activeIcon: <LocalOfferIcon className="text-white" />,
//     },
//     {
//   name: "Offers",
//   path: "/admin/offers",
//   icon: <LocalOfferIcon />,
// },
    
// ];

// const menu2 = [


//     {
//         name: "Logout",
//         path: "/",
//         icon: <LogoutIcon className="text-primary-color" />,
//         activeIcon: <LogoutIcon className="text-white" />,
//     },

// ]

// interface DrawerListProps {
//     toggleDrawer?: any;
// }

// const AdminDrawerList = ({ toggleDrawer }: DrawerListProps) => {

//     return (
//         <>
//             <DrawerList toggleDrawer={toggleDrawer} menu={menu} menu2={menu2} />
//         </>
//     );
// };

// export default AdminDrawerList;








// // src/admin seller/components/SideBar/DrawerList.tsx

// import DrawerList from "../../admin seller/components/drawerList/DrawerList";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import AddIcon from "@mui/icons-material/Add";
// import HomeIcon from "@mui/icons-material/Home";
// import FolderIcon from "@mui/icons-material/Folder";
// import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
// import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
// import { ViewCarouselSharp } from "@mui/icons-material";
// import LogoutIcon from "@mui/icons-material/Logout";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";

// const menu = [
//   {
//     name: "Dashboard",
//     path: "/admin",
//     icon: <DashboardIcon className="text-primary-color" />,
//     activeIcon: <DashboardIcon className="text-white" />,
//   },
//   // ✅ SELLERS – Dashboard के बाद Add किया
//   {
//     name: "Sellers",
//     path: "/admin/sellers",
//     icon: <StorefrontIcon className="text-primary-color" />,
//     activeIcon: <StorefrontIcon className="text-white" />,
//   },
//   {
//     name: "Orders",
//     path: "/admin/orders",
//     icon: <ShoppingBagIcon className="text-primary-color" />,
//     activeIcon: <ShoppingBagIcon className="text-white" />,
//   },
//   {
//     name: "Payouts",
//     path: "/admin/payouts",
//     icon: <AccountBalanceWalletIcon className="text-primary-color" />,
//     activeIcon: <AccountBalanceWalletIcon className="text-white" />,
//   },
  
//   {
//     name: "Returns",
//     path: "/admin/returns",
//     icon: <AssignmentReturnIcon className="text-primary-color" />,
//     activeIcon: <AssignmentReturnIcon className="text-white" />,
//   },
//   {
//     name: "Coupons",
//     path: "/admin/coupon",
//     icon: <IntegrationInstructionsIcon className="text-primary-color" />,
//     activeIcon: <IntegrationInstructionsIcon className="text-white" />,
//   },
//   {
//     name: "Add New Coupon",
//     path: "/admin/add-coupon",
//     icon: <AddIcon className="text-primary-color" />,
//     activeIcon: <AddIcon className="text-white" />,
//   },
//   {
//     name: "Banners",
//     path: "/admin/banners",
//     icon: <ViewCarouselSharp className="text-primary-color" />,
//     activeIcon: <ViewCarouselSharp className="text-white" />,
//   },
//   {
//     name: "New Banners",
//     path: "/admin/new-banners",
//     icon: <ViewCarouselSharp className="text-primary-color" />,
//     activeIcon: <ViewCarouselSharp className="text-white" />,
//   },
//   {
//     name: "Footer",
//     path: "/admin/footer",
//     icon: <HomeIcon className="text-primary-color" />,
//     activeIcon: <HomeIcon className="text-white" />,
//   },
//   {
//     name: "Home Management",
//     path: "/admin/home-page",
//     icon: <HomeIcon className="text-primary-color" />,
//     activeIcon: <HomeIcon className="text-white" />,
//   },
//   {
//     name: "Home Sections",
//     path: "/admin/home-section",
//     icon: <ElectricBoltIcon className="text-primary-color" />,
//     activeIcon: <ElectricBoltIcon className="text-white" />,
//   },
//   {
//     name: "Main Category",
//     path: "/admin/main-category",
//     icon: <FolderIcon className="text-primary-color" />,
//     activeIcon: <FolderIcon className="text-white" />,
//   },
//   {
//     name: "Deals",
//     path: "/admin/deals",
//     icon: <LocalOfferIcon className="text-primary-color" />,
//     activeIcon: <LocalOfferIcon className="text-white" />,
//   },
//   {
//     name: "Offers",
//     path: "/admin/offers",
//     icon: <LocalOfferIcon className="text-primary-color" />,
//     activeIcon: <LocalOfferIcon className="text-white" />,
//   },
// ];

// const menu2 = [
//   {
//     name: "Logout",
//     path: "/",
//     icon: <LogoutIcon className="text-primary-color" />,
//     activeIcon: <LogoutIcon className="text-white" />,
//   },
// ];

// interface DrawerListProps {
//   toggleDrawer?: any;
// }

// const AdminDrawerList = ({ toggleDrawer }: DrawerListProps) => {
//   return (
//     <>
//       <DrawerList toggleDrawer={toggleDrawer} menu={menu} menu2={menu2} />
//     </>
//   );
// };

// export default AdminDrawerList;








// // src/admin seller/components/SideBar/DrawerList.tsx

// import DrawerList from "../../admin seller/components/drawerList/DrawerList";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import AddIcon from "@mui/icons-material/Add";
// import HomeIcon from "@mui/icons-material/Home";
// import FolderIcon from "@mui/icons-material/Folder";
// import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
// import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
// import { ViewCarouselSharp } from "@mui/icons-material";
// import LogoutIcon from "@mui/icons-material/Logout";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping"; // 🆕 NEW

// const menu = [
//   {
//     name: "Dashboard",
//     path: "/admin",
//     icon: <DashboardIcon className="text-primary-color" />,
//     activeIcon: <DashboardIcon className="text-white" />,
//   },
//   // ✅ SELLERS
//   {
//     name: "Sellers",
//     path: "/admin/sellers",
//     icon: <StorefrontIcon className="text-primary-color" />,
//     activeIcon: <StorefrontIcon className="text-white" />,
//   },
//   {
//     name: "Orders",
//     path: "/admin/orders",
//     icon: <ShoppingBagIcon className="text-primary-color" />,
//     activeIcon: <ShoppingBagIcon className="text-white" />,
//   },
//   {
//     name: "Payouts",
//     path: "/admin/payouts",
//     icon: <AccountBalanceWalletIcon className="text-primary-color" />,
//     activeIcon: <AccountBalanceWalletIcon className="text-white" />,
//   },
//   {
//     name: "Returns",
//     path: "/admin/returns",
//     icon: <AssignmentReturnIcon className="text-primary-color" />,
//     activeIcon: <AssignmentReturnIcon className="text-white" />,
//   },
//   {
//     name: "Coupons",
//     path: "/admin/coupon",
//     icon: <IntegrationInstructionsIcon className="text-primary-color" />,
//     activeIcon: <IntegrationInstructionsIcon className="text-white" />,
//   },
//   {
//     name: "Add New Coupon",
//     path: "/admin/add-coupon",
//     icon: <AddIcon className="text-primary-color" />,
//     activeIcon: <AddIcon className="text-white" />,
//   },

//   // 🆕 DELIVERY SETTINGS – यहाँ ADD किया (Coupons के बाद)
//   {
//     name: "Delivery Settings",
//     path: "/admin/settings/delivery",
//     icon: <LocalShippingIcon className="text-primary-color" />,
//     activeIcon: <LocalShippingIcon className="text-white" />,
//   },

//   {
//     name: "Banners",
//     path: "/admin/banners",
//     icon: <ViewCarouselSharp className="text-primary-color" />,
//     activeIcon: <ViewCarouselSharp className="text-white" />,
//   },
//   {
//     name: "New Banners",
//     path: "/admin/new-banners",
//     icon: <ViewCarouselSharp className="text-primary-color" />,
//     activeIcon: <ViewCarouselSharp className="text-white" />,
//   },
//   {
//     name: "Footer",
//     path: "/admin/footer",
//     icon: <HomeIcon className="text-primary-color" />,
//     activeIcon: <HomeIcon className="text-white" />,
//   },
//   {
//     name: "Home Management",
//     path: "/admin/home-page",
//     icon: <HomeIcon className="text-primary-color" />,
//     activeIcon: <HomeIcon className="text-white" />,
//   },
//   {
//     name: "Home Sections",
//     path: "/admin/home-section",
//     icon: <ElectricBoltIcon className="text-primary-color" />,
//     activeIcon: <ElectricBoltIcon className="text-white" />,
//   },
//   {
//     name: "Main Category",
//     path: "/admin/main-category",
//     icon: <FolderIcon className="text-primary-color" />,
//     activeIcon: <FolderIcon className="text-white" />,
//   },
//   {
//     name: "Deals",
//     path: "/admin/deals",
//     icon: <LocalOfferIcon className="text-primary-color" />,
//     activeIcon: <LocalOfferIcon className="text-white" />,
//   },
//   {
//     name: "Offers",
//     path: "/admin/offers",
//     icon: <LocalOfferIcon className="text-primary-color" />,
//     activeIcon: <LocalOfferIcon className="text-white" />,
//   },
// ];

// const menu2 = [
//   {
//     name: "Logout",
//     path: "/",
//     icon: <LogoutIcon className="text-primary-color" />,
//     activeIcon: <LogoutIcon className="text-white" />,
//   },
// ];

// interface DrawerListProps {
//   toggleDrawer?: any;
// }

// const AdminDrawerList = ({ toggleDrawer }: DrawerListProps) => {
//   return (
//     <>
//       <DrawerList toggleDrawer={toggleDrawer} menu={menu} menu2={menu2} />
//     </>
//   );
// };

// export default AdminDrawerList;






// // src/admin seller/components/SideBar/DrawerList.tsx

// import DrawerList from "../../admin seller/components/drawerList/DrawerList";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import AddIcon from "@mui/icons-material/Add";
// import HomeIcon from "@mui/icons-material/Home";
// import FolderIcon from "@mui/icons-material/Folder";
// import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
// import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
// import { ViewCarouselSharp } from "@mui/icons-material";
// import LogoutIcon from "@mui/icons-material/Logout";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import VerifiedIcon from "@mui/icons-material/Verified";


// const menu = [
//   {
//     name: "Dashboard",
//     path: "/admin",
//     icon: <DashboardIcon className="text-primary-color" />,
//     activeIcon: <DashboardIcon className="text-white" />,
//   },
//   // ✅ SELLERS
//   {
//     name: "Sellers",
//     path: "/admin/sellers",
//     icon: <StorefrontIcon className="text-primary-color" />,
//     activeIcon: <StorefrontIcon className="text-white" />,
//   },
//     {
//     name: "Brand Requests",
//     path: "/admin/brands",
//     icon: <VerifiedIcon className="text-primary-color" />,
//     activeIcon: <VerifiedIcon className="text-white" />,
//   },
//   {
//     name: "Orders",
//     path: "/admin/orders",
//     icon: <ShoppingBagIcon className="text-primary-color" />,
//     activeIcon: <ShoppingBagIcon className="text-white" />,
//   },
//   {
//     name: "Payouts",
//     path: "/admin/payouts",
//     icon: <AccountBalanceWalletIcon className="text-primary-color" />,
//     activeIcon: <AccountBalanceWalletIcon className="text-white" />,
//   },
//   {
//     name: "Returns",
//     path: "/admin/returns",
//     icon: <AssignmentReturnIcon className="text-primary-color" />,
//     activeIcon: <AssignmentReturnIcon className="text-white" />,
//   },
//   {
//     name: "Coupons",
//     path: "/admin/coupon",
//     icon: <IntegrationInstructionsIcon className="text-primary-color" />,
//     activeIcon: <IntegrationInstructionsIcon className="text-white" />,
//   },
//   {
//     name: "Add New Coupon",
//     path: "/admin/add-coupon",
//     icon: <AddIcon className="text-primary-color" />,
//     activeIcon: <AddIcon className="text-white" />,
//   },

//   // ✅ DELIVERY SETTINGS
//   {
//     name: "Delivery Settings",
//     path: "/admin/settings/delivery",
//     icon: <LocalShippingIcon className="text-primary-color" />,
//     activeIcon: <LocalShippingIcon className="text-white" />,
//   },


 

//   // ✅ BANNERS & HOME
//   {
//     name: "Banners",
//     path: "/admin/banners",
//     icon: <ViewCarouselSharp className="text-primary-color" />,
//     activeIcon: <ViewCarouselSharp className="text-white" />,
//   },
//   {
//     name: "New Banners",
//     path: "/admin/new-banners",
//     icon: <ViewCarouselSharp className="text-primary-color" />,
//     activeIcon: <ViewCarouselSharp className="text-white" />,
//   },
//   {
//     name: "Footer",
//     path: "/admin/footer",
//     icon: <HomeIcon className="text-primary-color" />,
//     activeIcon: <HomeIcon className="text-white" />,
//   },
//   {
//     name: "Home Management",
//     path: "/admin/home-page",
//     icon: <HomeIcon className="text-primary-color" />,
//     activeIcon: <HomeIcon className="text-white" />,
//   },
//   {
//     name: "Home Sections",
//     path: "/admin/home-section",
//     icon: <ElectricBoltIcon className="text-primary-color" />,
//     activeIcon: <ElectricBoltIcon className="text-white" />,
//   },
//   {
//     name: "Main Category",
//     path: "/admin/main-category",
//     icon: <FolderIcon className="text-primary-color" />,
//     activeIcon: <FolderIcon className="text-white" />,
//   },
//   {
//     name: "Deals",
//     path: "/admin/deals",
//     icon: <LocalOfferIcon className="text-primary-color" />,
//     activeIcon: <LocalOfferIcon className="text-white" />,
//   },
//   {
//     name: "Offers",
//     path: "/admin/offers",
//     icon: <LocalOfferIcon className="text-primary-color" />,
//     activeIcon: <LocalOfferIcon className="text-white" />,
//   },
// ];

// const menu2 = [
//   {
//     name: "Logout",
//     path: "/",
//     icon: <LogoutIcon className="text-primary-color" />,
//     activeIcon: <LogoutIcon className="text-white" />,
//   },
// ];

// interface DrawerListProps {
//   toggleDrawer?: any;
// }

// const AdminDrawerList = ({ toggleDrawer }: DrawerListProps) => {
//   return (
//     <>
//       <DrawerList toggleDrawer={toggleDrawer} menu={menu} menu2={menu2} />
//     </>
//   );
// };

// export default AdminDrawerList;








// // src/admin seller/components/SideBar/DrawerList.tsx

// import DrawerList from "../../admin seller/components/drawerList/DrawerList";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import AddIcon from "@mui/icons-material/Add";
// import HomeIcon from "@mui/icons-material/Home";
// import FolderIcon from "@mui/icons-material/Folder";
// import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
// import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
// import { ViewCarouselSharp } from "@mui/icons-material";
// import LogoutIcon from "@mui/icons-material/Logout";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
// import DesignServicesIcon from "@mui/icons-material/DesignServices";
// import AssignmentIcon from "@mui/icons-material/Assignment";

// const menu = [
//   {
//     name: "Dashboard",
//     path: "/admin",
//     icon: <DashboardIcon className="text-primary-color" />,
//     activeIcon: <DashboardIcon className="text-white" />,
//   },
//   // ✅ SELLERS
//   {
//     name: "Sellers",
//     path: "/admin/sellers",
//     icon: <StorefrontIcon className="text-primary-color" />,
//     activeIcon: <StorefrontIcon className="text-white" />,
//   },
//   {
//     name: "Brand Requests",
//     path: "/admin/brands",
//     icon: <VerifiedIcon className="text-primary-color" />,
//     activeIcon: <VerifiedIcon className="text-white" />,
//   },
//   {
//     name: "Orders",
//     path: "/admin/orders",
//     icon: <ShoppingBagIcon className="text-primary-color" />,
//     activeIcon: <ShoppingBagIcon className="text-white" />,
//   },
//   {
//     name: "Payouts",
//     path: "/admin/payouts",
//     icon: <AccountBalanceWalletIcon className="text-primary-color" />,
//     activeIcon: <AccountBalanceWalletIcon className="text-white" />,
//   },
//   {
//     name: "Returns",
//     path: "/admin/returns",
//     icon: <AssignmentReturnIcon className="text-primary-color" />,
//     activeIcon: <AssignmentReturnIcon className="text-white" />,
//   },

//   // 🔥 NEW: Support Calls — LIVE
//   {
//     name: "Support Calls",
//     path: "/admin/support-calls",
//     icon: <HeadsetMicIcon className="text-primary-color" />,
//     activeIcon: <HeadsetMicIcon className="text-white" />,
//   },

//   {
//     name: "Coupons",
//     path: "/admin/coupon",
//     icon: <IntegrationInstructionsIcon className="text-primary-color" />,
//     activeIcon: <IntegrationInstructionsIcon className="text-white" />,
//   },
//   {
//     name: "Add New Coupon",
//     path: "/admin/add-coupon",
//     icon: <AddIcon className="text-primary-color" />,
//     activeIcon: <AddIcon className="text-white" />,
//   },

//   // ✅ DELIVERY SETTINGS
//   {
//     name: "Delivery Settings",
//     path: "/admin/settings/delivery",
//     icon: <LocalShippingIcon className="text-primary-color" />,
//     activeIcon: <LocalShippingIcon className="text-white" />,
//   },
//   {
//   name: "Services",
//   path: "/admin/services",
//   icon: <DesignServicesIcon className="text-primary-color" />,
//   activeIcon: <DesignServicesIcon className="text-white" />,
// },
// {
//   name: "Service Requests",
//   path: "/admin/service-requests",
//   icon: <AssignmentIcon className="text-primary-color" />,
//   activeIcon: <AssignmentIcon className="text-white" />,
// },

//   // ✅ BANNERS & HOME
//   {
//     name: "Banners",
//     path: "/admin/banners",
//     icon: <ViewCarouselSharp className="text-primary-color" />,
//     activeIcon: <ViewCarouselSharp className="text-white" />,
//   },
//   {
//     name: "New Banners",
//     path: "/admin/new-banners",
//     icon: <ViewCarouselSharp className="text-primary-color" />,
//     activeIcon: <ViewCarouselSharp className="text-white" />,
//   },
//   {
//     name: "Footer",
//     path: "/admin/footer",
//     icon: <HomeIcon className="text-primary-color" />,
//     activeIcon: <HomeIcon className="text-white" />,
//   },
//   {
//     name: "Home Management",
//     path: "/admin/home-page",
//     icon: <HomeIcon className="text-primary-color" />,
//     activeIcon: <HomeIcon className="text-white" />,
//   },
//   {
//     name: "Home Sections",
//     path: "/admin/home-section",
//     icon: <ElectricBoltIcon className="text-primary-color" />,
//     activeIcon: <ElectricBoltIcon className="text-white" />,
//   },
//   {
//     name: "Main Category",
//     path: "/admin/main-category",
//     icon: <FolderIcon className="text-primary-color" />,
//     activeIcon: <FolderIcon className="text-white" />,
//   },
//   {
//     name: "Deals",
//     path: "/admin/deals",
//     icon: <LocalOfferIcon className="text-primary-color" />,
//     activeIcon: <LocalOfferIcon className="text-white" />,
//   },
//   {
//     name: "Offers",
//     path: "/admin/offers",
//     icon: <LocalOfferIcon className="text-primary-color" />,
//     activeIcon: <LocalOfferIcon className="text-white" />,
//   },
// ];

// const menu2 = [
//   {
//     name: "Logout",
//     path: "/",
//     icon: <LogoutIcon className="text-primary-color" />,
//     activeIcon: <LogoutIcon className="text-white" />,
//   },
// ];

// interface DrawerListProps {
//   toggleDrawer?: any;
// }

// const AdminDrawerList = ({ toggleDrawer }: DrawerListProps) => {
//   return (
//     <>
//       <DrawerList toggleDrawer={toggleDrawer} menu={menu} menu2={menu2} />
//     </>
//   );
// };

// export default AdminDrawerList;




















// // src/admin seller/components/SideBar/DrawerList.tsx

// import DrawerList from "../../admin seller/components/drawerList/DrawerList";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import AddIcon from "@mui/icons-material/Add";
// import HomeIcon from "@mui/icons-material/Home";
// import FolderIcon from "@mui/icons-material/Folder";
// import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
// import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
// import { ViewCarouselSharp } from "@mui/icons-material";
// import LogoutIcon from "@mui/icons-material/Logout";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
// import DesignServicesIcon from "@mui/icons-material/DesignServices";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";   // ✅ नया import

// const menu = [
//   {
//     name: "Dashboard",
//     path: "/admin",
//     icon: <DashboardIcon className="text-primary-color" />,
//     activeIcon: <DashboardIcon className="text-white" />,
//   },
//   // ✅ SELLERS
//   {
//     name: "Sellers",
//     path: "/admin/sellers",
//     icon: <StorefrontIcon className="text-primary-color" />,
//     activeIcon: <StorefrontIcon className="text-white" />,
//   },
//   {
//     name: "Brand Requests",
//     path: "/admin/brands",
//     icon: <VerifiedIcon className="text-primary-color" />,
//     activeIcon: <VerifiedIcon className="text-white" />,
//   },
//   {
//     name: "Orders",
//     path: "/admin/orders",
//     icon: <ShoppingBagIcon className="text-primary-color" />,
//     activeIcon: <ShoppingBagIcon className="text-white" />,
//   },
//   {
//     name: "Payouts",
//     path: "/admin/payouts",
//     icon: <AccountBalanceWalletIcon className="text-primary-color" />,
//     activeIcon: <AccountBalanceWalletIcon className="text-white" />,
//   },
//   {
//     name: "Returns",
//     path: "/admin/returns",
//     icon: <AssignmentReturnIcon className="text-primary-color" />,
//     activeIcon: <AssignmentReturnIcon className="text-white" />,
//   },

//   // 🔥 NEW: Support Calls — LIVE
//   {
//     name: "Support Calls",
//     path: "/admin/support-calls",
//     icon: <HeadsetMicIcon className="text-primary-color" />,
//     activeIcon: <HeadsetMicIcon className="text-white" />,
//   },

//   // 🎫 NEW: Tickets
//   {
//     name: "Support Tickets",
//     path: "/admin/tickets",
//     icon: <ConfirmationNumberIcon className="text-primary-color" />,
//     activeIcon: <ConfirmationNumberIcon className="text-white" />,
//   },

//   {
//     name: "Coupons",
//     path: "/admin/coupon",
//     icon: <IntegrationInstructionsIcon className="text-primary-color" />,
//     activeIcon: <IntegrationInstructionsIcon className="text-white" />,
//   },
//   {
//     name: "Add New Coupon",
//     path: "/admin/add-coupon",
//     icon: <AddIcon className="text-primary-color" />,
//     activeIcon: <AddIcon className="text-white" />,
//   },

//   // ✅ DELIVERY SETTINGS
//   {
//     name: "Delivery Settings",
//     path: "/admin/settings/delivery",
//     icon: <LocalShippingIcon className="text-primary-color" />,
//     activeIcon: <LocalShippingIcon className="text-white" />,
//   },
//   {
//     name: "Services",
//     path: "/admin/services",
//     icon: <DesignServicesIcon className="text-primary-color" />,
//     activeIcon: <DesignServicesIcon className="text-white" />,
//   },
//   {
//     name: "Service Requests",
//     path: "/admin/service-requests",
//     icon: <AssignmentIcon className="text-primary-color" />,
//     activeIcon: <AssignmentIcon className="text-white" />,
//   },

//   // ✅ BANNERS & HOME
//   {
//     name: "Banners",
//     path: "/admin/banners",
//     icon: <ViewCarouselSharp className="text-primary-color" />,
//     activeIcon: <ViewCarouselSharp className="text-white" />,
//   },
//   {
//     name: "New Banners",
//     path: "/admin/new-banners",
//     icon: <ViewCarouselSharp className="text-primary-color" />,
//     activeIcon: <ViewCarouselSharp className="text-white" />,
//   },
//   {
//     name: "Footer",
//     path: "/admin/footer",
//     icon: <HomeIcon className="text-primary-color" />,
//     activeIcon: <HomeIcon className="text-white" />,
//   },
//   {
//     name: "Home Management",
//     path: "/admin/home-page",
//     icon: <HomeIcon className="text-primary-color" />,
//     activeIcon: <HomeIcon className="text-white" />,
//   },
//   {
//     name: "Home Sections",
//     path: "/admin/home-section",
//     icon: <ElectricBoltIcon className="text-primary-color" />,
//     activeIcon: <ElectricBoltIcon className="text-white" />,
//   },
//   {
//     name: "Main Category",
//     path: "/admin/main-category",
//     icon: <FolderIcon className="text-primary-color" />,
//     activeIcon: <FolderIcon className="text-white" />,
//   },
//   {
//     name: "Deals",
//     path: "/admin/deals",
//     icon: <LocalOfferIcon className="text-primary-color" />,
//     activeIcon: <LocalOfferIcon className="text-white" />,
//   },
//   {
//     name: "Offers",
//     path: "/admin/offers",
//     icon: <LocalOfferIcon className="text-primary-color" />,
//     activeIcon: <LocalOfferIcon className="text-white" />,
//   },
// ];

// const menu2 = [
//   {
//     name: "Logout",
//     path: "/",
//     icon: <LogoutIcon className="text-primary-color" />,
//     activeIcon: <LogoutIcon className="text-white" />,
//   },
// ];

// interface DrawerListProps {
//   toggleDrawer?: any;
// }

// const AdminDrawerList = ({ toggleDrawer }: DrawerListProps) => {
//   return (
//     <>
//       <DrawerList toggleDrawer={toggleDrawer} menu={menu} menu2={menu2} />
//     </>
//   );
// };

// export default AdminDrawerList;
















// src/admin seller/components/SideBar/DrawerList.tsx

import DrawerList from "../../admin seller/components/drawerList/DrawerList";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import { ViewCarouselSharp } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import GavelIcon from "@mui/icons-material/Gavel";  // 🔥 NEW — Legal Pages ke liye

const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon className="text-primary-color" />,
    activeIcon: <DashboardIcon className="text-white" />,
  },

  // ✅ SELLERS
  {
    name: "Sellers",
    path: "/admin/sellers",
    icon: <StorefrontIcon className="text-primary-color" />,
    activeIcon: <StorefrontIcon className="text-white" />,
  },
  {
    name: "Brand Requests",
    path: "/admin/brands",
    icon: <VerifiedIcon className="text-primary-color" />,
    activeIcon: <VerifiedIcon className="text-white" />,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: <ShoppingBagIcon className="text-primary-color" />,
    activeIcon: <ShoppingBagIcon className="text-white" />,
  },
  {
    name: "Payouts",
    path: "/admin/payouts",
    icon: <AccountBalanceWalletIcon className="text-primary-color" />,
    activeIcon: <AccountBalanceWalletIcon className="text-white" />,
  },
  {
    name: "Returns",
    path: "/admin/returns",
    icon: <AssignmentReturnIcon className="text-primary-color" />,
    activeIcon: <AssignmentReturnIcon className="text-white" />,
  },

  // 🔥 Support Calls
  {
    name: "Support Calls",
    path: "/admin/support-calls",
    icon: <HeadsetMicIcon className="text-primary-color" />,
    activeIcon: <HeadsetMicIcon className="text-white" />,
  },

  // 🎫 Support Tickets
  {
    name: "Support Tickets",
    path: "/admin/tickets",
    icon: <ConfirmationNumberIcon className="text-primary-color" />,
    activeIcon: <ConfirmationNumberIcon className="text-white" />,
  },

  {
    name: "Coupons",
    path: "/admin/coupon",
    icon: <IntegrationInstructionsIcon className="text-primary-color" />,
    activeIcon: <IntegrationInstructionsIcon className="text-white" />,
  },
  {
    name: "Add New Coupon",
    path: "/admin/add-coupon",
    icon: <AddIcon className="text-primary-color" />,
    activeIcon: <AddIcon className="text-white" />,
  },

  // ✅ DELIVERY SETTINGS
  {
    name: "Delivery Settings",
    path: "/admin/settings/delivery",
    icon: <LocalShippingIcon className="text-primary-color" />,
    activeIcon: <LocalShippingIcon className="text-white" />,
  },
  {
    name: "Services",
    path: "/admin/services",
    icon: <DesignServicesIcon className="text-primary-color" />,
    activeIcon: <DesignServicesIcon className="text-white" />,
  },
  {
    name: "Service Requests",
    path: "/admin/service-requests",
    icon: <AssignmentIcon className="text-primary-color" />,
    activeIcon: <AssignmentIcon className="text-white" />,
  },

  // ✅ BANNERS & HOME
  {
    name: "Banners",
    path: "/admin/banners",
    icon: <ViewCarouselSharp className="text-primary-color" />,
    activeIcon: <ViewCarouselSharp className="text-white" />,
  },
  {
    name: "New Banners",
    path: "/admin/new-banners",
    icon: <ViewCarouselSharp className="text-primary-color" />,
    activeIcon: <ViewCarouselSharp className="text-white" />,
  },
  {
    name: "Footer",
    path: "/admin/footer",
    icon: <HomeIcon className="text-primary-color" />,
    activeIcon: <HomeIcon className="text-white" />,
  },
  {
    name: "Home Management",
    path: "/admin/home-page",
    icon: <HomeIcon className="text-primary-color" />,
    activeIcon: <HomeIcon className="text-white" />,
  },
  {
    name: "Home Sections",
    path: "/admin/home-section",
    icon: <ElectricBoltIcon className="text-primary-color" />,
    activeIcon: <ElectricBoltIcon className="text-white" />,
  },
  {
    name: "Main Category",
    path: "/admin/main-category",
    icon: <FolderIcon className="text-primary-color" />,
    activeIcon: <FolderIcon className="text-white" />,
  },
  {
    name: "Deals",
    path: "/admin/deals",
    icon: <LocalOfferIcon className="text-primary-color" />,
    activeIcon: <LocalOfferIcon className="text-white" />,
  },
  {
    name: "Offers",
    path: "/admin/offers",
    icon: <LocalOfferIcon className="text-primary-color" />,
    activeIcon: <LocalOfferIcon className="text-white" />,
  },

  // 🔥 NEW: LEGAL PAGES
  {
    name: "Legal Pages",
    path: "/admin/legal-pages",
    icon: <GavelIcon className="text-primary-color" />,
    activeIcon: <GavelIcon className="text-white" />,
  },
];

const menu2 = [
  {
    name: "Logout",
    path: "/",
    icon: <LogoutIcon className="text-primary-color" />,
    activeIcon: <LogoutIcon className="text-white" />,
  },
];

interface DrawerListProps {
  toggleDrawer?: any;
}

const AdminDrawerList = ({ toggleDrawer }: DrawerListProps) => {
  return (
    <>
      <DrawerList toggleDrawer={toggleDrawer} menu={menu} menu2={menu2} />
    </>
  );
};

export default AdminDrawerList;