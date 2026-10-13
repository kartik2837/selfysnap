

// import DrawerList from "../../../admin seller/components/drawerList/DrawerList";
// import { AccountBox } from "@mui/icons-material";
// import LogoutIcon from '@mui/icons-material/Logout';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import AddIcon from '@mui/icons-material/Add';

// import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// const menu = [
//   {
//     name: "Dashboard",
//     path: "/seller",
//     icon: <DashboardIcon className="text-primary-color" />,
//     activeIcon: <DashboardIcon className="text-white" />,
//   },
//   {
//     name: "Orders",
//     path: "/seller/orders",
//     icon: <ShoppingBagIcon className="text-primary-color" />,
//     activeIcon: <ShoppingBagIcon className="text-white" />,
//   },
//   {
//     name: "Returns",
//     path: "/seller/returns",
//     icon: <AssignmentReturnIcon className="text-primary-color" />,
//     activeIcon: <AssignmentReturnIcon className="text-white" />,
//   },
//   {
//     name: "Products",
//     path: "/seller/products",
//     icon: <InventoryIcon className="text-primary-color" />,
//     activeIcon: <InventoryIcon className="text-white" />,
//   },
//   {
//     name: "Add Product",
//     path: "/seller/add-product",
//     icon: <AddIcon className="text-primary-color" />,
//     activeIcon: <AddIcon className="text-white" />,
//   },
//   {
//     name: "Payment",
//     path: "/seller/payment",
//     icon: <AccountBalanceWalletIcon className="text-primary-color" />,
//     activeIcon: <AccountBalanceWalletIcon className="text-white" />,
//   },
//   {
//     name: "Transaction",
//     path: "/seller/transaction",
//     icon: <ReceiptIcon className="text-primary-color" />,
//     activeIcon: <ReceiptIcon className="text-white" />,
//   },
//   // {
//   //   name: "Inventory",
//   //   path: "/seller/inventory",
//   //   icon: <MailIcon className="text-primary-color" />,
//   //   activeIcon: <MailIcon className="text-white" />,
//   // },
// ];

// const menu2 = [

//   {
//     name: "Account",
//     path: "/seller/account",
//     icon: <AccountBox className="text-primary-color" />,
//     activeIcon: <AccountBox className="text-white" />,
//   },
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

// const SellerDrawerList = ({ toggleDrawer }: DrawerListProps) => {
//   return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
// };

// export default SellerDrawerList;







// import DrawerList from "../../../admin seller/components/drawerList/DrawerList";
// import {
//   AccountBox,
//   Dashboard,
//   Receipt,
//   ShoppingBag,
//   Inventory,
//   Add,
//   AssignmentReturn,
//   AccountBalanceWallet,
//   // ✅ नए Icons import करें
//   Assessment,

//   Summarize,
// } from "@mui/icons-material";
// import LogoutIcon from "@mui/icons-material/Logout";

// const menu = [
//   {
//     name: "Dashboard",
//     path: "/seller",
//     icon: <Dashboard className="text-primary-color" />,
//     activeIcon: <Dashboard className="text-white" />,
//   },
//   // ✅ Report Items – ये जोड़ें
//   {
//     name: "Sales Report",
//     path: "/seller/reports/sales",
//     icon: <Assessment className="text-primary-color" />,
//     activeIcon: <Assessment className="text-white" />,
//   },
//   {
//     name: "Stock Report",
//     path: "/seller/reports/inventory/stock",
//     icon: <Inventory className="text-primary-color" />,
//     activeIcon: <Inventory className="text-white" />,
//   },
//   {
//     name: "GST Report",
//     path: "/seller/reports/gst",
//     icon: <Receipt className="text-primary-color" />,
//     activeIcon: <Receipt className="text-white" />,
//   },
//   {
//     name: "Category Summary",
//     path: "/seller/reports/inventory/summary",
//     icon: <Summarize className="text-primary-color" />,
//     activeIcon: <Summarize className="text-white" />,
//   },
//   {
//     name: "Orders",
//     path: "/seller/orders",
//     icon: <ShoppingBag className="text-primary-color" />,
//     activeIcon: <ShoppingBag className="text-white" />,
//   },
//   {
//     name: "Returns",
//     path: "/seller/returns",
//     icon: <AssignmentReturn className="text-primary-color" />,
//     activeIcon: <AssignmentReturn className="text-white" />,
//   },
//   {
//     name: "Products",
//     path: "/seller/products",
//     icon: <Inventory className="text-primary-color" />,
//     activeIcon: <Inventory className="text-white" />,
//   },
//   {
//     name: "Add Product",
//     path: "/seller/add-product",
//     icon: <Add className="text-primary-color" />,
//     activeIcon: <Add className="text-white" />,
//   },
//   {
//     name: "Payment",
//     path: "/seller/payment",
//     icon: <AccountBalanceWallet className="text-primary-color" />,
//     activeIcon: <AccountBalanceWallet className="text-white" />,
//   },
//   {
//     name: "Transaction",
//     path: "/seller/transaction",
//     icon: <Receipt className="text-primary-color" />,
//     activeIcon: <Receipt className="text-white" />,
//   },
// ];

// const menu2 = [
//   {
//     name: "Account",
//     path: "/seller/account",
//     icon: <AccountBox className="text-primary-color" />,
//     activeIcon: <AccountBox className="text-white" />,
//   },
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

// const SellerDrawerList = ({ toggleDrawer }: DrawerListProps) => {
//   return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
// };

// export default SellerDrawerList;








// import DrawerList from "../../../admin seller/components/drawerList/DrawerList";
// import {
//   AccountBox,
//   Dashboard,
//   Receipt,
//   ShoppingBag,
//   Inventory,
//   Add,
//   AssignmentReturn,
//   AccountBalanceWallet,
//   Assessment,
//   Summarize,
//   Palette as PaletteIcon,          
//   Assignment as AssignmentIcon,
      
// } from "@mui/icons-material";
// import LogoutIcon from "@mui/icons-material/Logout";

// const menu = [
//   {
//     name: "Dashboard",
//     path: "/seller",
//     icon: <Dashboard className="text-primary-color" />,
//     activeIcon: <Dashboard className="text-white" />,
//   },

//   // ✅ Report Items
//   {
//     name: "Sales Report",
//     path: "/seller/reports/sales",
//     icon: <Assessment className="text-primary-color" />,
//     activeIcon: <Assessment className="text-white" />,
//   },
//   {
//     name: "Stock Report",
//     path: "/seller/reports/inventory/stock",
//     icon: <Inventory className="text-primary-color" />,
//     activeIcon: <Inventory className="text-white" />,
//   },
//   {
//     name: "GST Report",
//     path: "/seller/reports/gst",
//     icon: <Receipt className="text-primary-color" />,
//     activeIcon: <Receipt className="text-white" />,
//   },
//   {
//     name: "Category Summary",
//     path: "/seller/reports/inventory/summary",
//     icon: <Summarize className="text-primary-color" />,
//     activeIcon: <Summarize className="text-white" />,
//   },

//   // ✅ Orders & Returns
//   {
//     name: "Orders",
//     path: "/seller/orders",
//     icon: <ShoppingBag className="text-primary-color" />,
//     activeIcon: <ShoppingBag className="text-white" />,
//   },
//   {
//     name: "Returns",
//     path: "/seller/returns",
//     icon: <AssignmentReturn className="text-primary-color" />,
//     activeIcon: <AssignmentReturn className="text-white" />,
//   },

//   // ✅ Products
//   {
//     name: "Products",
//     path: "/seller/products",
//     icon: <Inventory className="text-primary-color" />,
//     activeIcon: <Inventory className="text-white" />,
//   },
//   {
//     name: "Add Product",
//     path: "/seller/add-product",
//     icon: <Add className="text-primary-color" />,
//     activeIcon: <Add className="text-white" />,
//   },
// // Seller
// {
//   name: "Creative Studio",
//   path: "/seller/creative-services",
//   icon: <PaletteIcon />,
// },
// {
//   name: "My Requests",
//   path: "/seller/creative-services/my-requests",
//   icon: <AssignmentIcon />,
// },


  

//   // ✅ Payments
//   {
//     name: "Payment",
//     path: "/seller/payment",
//     icon: <AccountBalanceWallet className="text-primary-color" />,
//     activeIcon: <AccountBalanceWallet className="text-white" />,
//   },
//   {
//     name: "Transaction",
//     path: "/seller/transaction",
//     icon: <Receipt className="text-primary-color" />,
//     activeIcon: <Receipt className="text-white" />,
//   },
// ];

// const menu2 = [
//   {
//     name: "Account",
//     path: "/seller/account",
//     icon: <AccountBox className="text-primary-color" />,
//     activeIcon: <AccountBox className="text-white" />,
//   },
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

// const SellerDrawerList = ({ toggleDrawer }: DrawerListProps) => {
//   return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
// };

// export default SellerDrawerList;








// import DrawerList from "../../../admin seller/components/drawerList/DrawerList";
// import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
// import {
//   AccountBox,
//   Dashboard,
//   Receipt,
//   ShoppingBag,
//   Inventory,
//   Add,
//   AssignmentReturn,
//   AccountBalanceWallet,
//   Assessment,
//   Summarize,
  
// } from "@mui/icons-material";
// import LogoutIcon from "@mui/icons-material/Logout";

// const menu = [
//   {
//     name: "Dashboard",
//     path: "/seller",
//     icon: <Dashboard className="text-primary-color" />,
//     activeIcon: <Dashboard className="text-white" />,
//   },

//   // ✅ Report Items
//   {
//     name: "Sales Report",
//     path: "/seller/reports/sales",
//     icon: <Assessment className="text-primary-color" />,
//     activeIcon: <Assessment className="text-white" />,
//   },
//   {
//     name: "Stock Report",
//     path: "/seller/reports/inventory/stock",
//     icon: <Inventory className="text-primary-color" />,
//     activeIcon: <Inventory className="text-white" />,
//   },
//   {
//     name: "GST Report",
//     path: "/seller/reports/gst",
//     icon: <Receipt className="text-primary-color" />,
//     activeIcon: <Receipt className="text-white" />,
//   },
//   {
//     name: "Category Summary",
//     path: "/seller/reports/inventory/summary",
//     icon: <Summarize className="text-primary-color" />,
//     activeIcon: <Summarize className="text-white" />,
//   },

//   // ✅ Orders & Returns
//   {
//     name: "Orders",
//     path: "/seller/orders",
//     icon: <ShoppingBag className="text-primary-color" />,
//     activeIcon: <ShoppingBag className="text-white" />,
//   },
//   {
//     name: "Returns",
//     path: "/seller/returns",
//     icon: <AssignmentReturn className="text-primary-color" />,
//     activeIcon: <AssignmentReturn className="text-white" />,
//   },

//   // ✅ Products
//   {
//     name: "Products",
//     path: "/seller/products",
//     icon: <Inventory className="text-primary-color" />,
//     activeIcon: <Inventory className="text-white" />,
//   },
//   {
//     name: "Add Product",
//     path: "/seller/add-product",
//     icon: <Add className="text-primary-color" />,
//     activeIcon: <Add className="text-white" />,
//   },

//   // ✅ Creative Services
  

//   // ✅ Payments
//   {
//     name: "Payment",
//     path: "/seller/payment",
//     icon: <AccountBalanceWallet className="text-primary-color" />,
//     activeIcon: <AccountBalanceWallet className="text-white" />,
//   },
//   {
//     name: "Transaction",
//     path: "/seller/transaction",
//     icon: <Receipt className="text-primary-color" />,
//     activeIcon: <Receipt className="text-white" />,
//   },
//   {
//   label: "Support Calls",
//   icon: <HeadsetMicIcon />,
//   path: "/seller/support-calls",
// },
// ];

// const menu2 = [
//   {
//     name: "Account",
//     path: "/seller/account",
//     icon: <AccountBox className="text-primary-color" />,
//     activeIcon: <AccountBox className="text-white" />,
//   },
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

// const SellerDrawerList = ({ toggleDrawer }: DrawerListProps) => {
//   return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
// };

// export default SellerDrawerList;









// import DrawerList from "../../../admin seller/components/drawerList/DrawerList";
// import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
// import DesignServicesIcon from "@mui/icons-material/DesignServices";
// import {
//   AccountBox,
//   Dashboard,
//   Receipt,
//   ShoppingBag,
//   Inventory,
//   Add,
//   AssignmentReturn,
//   AccountBalanceWallet,
//   Assessment,
//   Summarize,
// } from "@mui/icons-material";
// import LogoutIcon from "@mui/icons-material/Logout";

// const menu = [
//   {
//     name: "Dashboard",
//     path: "/seller",
//     icon: <Dashboard className="text-primary-color" />,
//     activeIcon: <Dashboard className="text-white" />,
//   },

//   // ✅ Report Items
//   {
//     name: "Sales Report",
//     path: "/seller/reports/sales",
//     icon: <Assessment className="text-primary-color" />,
//     activeIcon: <Assessment className="text-white" />,
//   },
//   {
//     name: "Stock Report",
//     path: "/seller/reports/inventory/stock",
//     icon: <Inventory className="text-primary-color" />,
//     activeIcon: <Inventory className="text-white" />,
//   },
//   {
//     name: "GST Report",
//     path: "/seller/reports/gst",
//     icon: <Receipt className="text-primary-color" />,
//     activeIcon: <Receipt className="text-white" />,
//   },
//   {
//     name: "Category Summary",
//     path: "/seller/reports/inventory/summary",
//     icon: <Summarize className="text-primary-color" />,
//     activeIcon: <Summarize className="text-white" />,
//   },

//   // ✅ Orders & Returns
//   {
//     name: "Orders",
//     path: "/seller/orders",
//     icon: <ShoppingBag className="text-primary-color" />,
//     activeIcon: <ShoppingBag className="text-white" />,
//   },
//   {
//     name: "Returns",
//     path: "/seller/returns",
//     icon: <AssignmentReturn className="text-primary-color" />,
//     activeIcon: <AssignmentReturn className="text-white" />,
//   },


//   // ✅ Products
//   {
//     name: "Products",
//     path: "/seller/products",
//     icon: <Inventory className="text-primary-color" />,
//     activeIcon: <Inventory className="text-white" />,
//   },
//   {
//     name: "Add Product",
//     path: "/seller/add-product",
//     icon: <Add className="text-primary-color" />,
//     activeIcon: <Add className="text-white" />,
//   },

//   // ✅ Payments
//   {
//     name: "Payment",
//     path: "/seller/payment",
//     icon: <AccountBalanceWallet className="text-primary-color" />,
//     activeIcon: <AccountBalanceWallet className="text-white" />,
//   },
//   {
//     name: "Transaction",
//     path: "/seller/transaction",
//     icon: <Receipt className="text-primary-color" />,
//     activeIcon: <Receipt className="text-white" />,
//   },

//   // 🔥 NEW: Support Calls — FIXED (name instead of label)
//   {
//     name: "Support Calls",
//     path: "/seller/support-calls",
//     icon: <HeadsetMicIcon className="text-primary-color" />,
//     activeIcon: <HeadsetMicIcon className="text-white" />,
//   },
//   {
//   name: "Creative Studio",
//   path: "/seller/creative-services",
//   icon: <DesignServicesIcon className="text-primary-color" />,
//   activeIcon: <DesignServicesIcon className="text-white" />,
// },
// ];

// const menu2 = [
//   {
//     name: "Account",
//     path: "/seller/account",
//     icon: <AccountBox className="text-primary-color" />,
//     activeIcon: <AccountBox className="text-white" />,
//   },
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

// const SellerDrawerList = ({ toggleDrawer }: DrawerListProps) => {
//   return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
// };

// export default SellerDrawerList;






import DrawerList from "../../../admin seller/components/drawerList/DrawerList";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import {
  AccountBox,
  Dashboard,
  Receipt,
  ShoppingBag,
  Inventory,
  Add,
  AssignmentReturn,
  AccountBalanceWallet,
  Assessment,
  Summarize,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppSelector } from "../../../Redux Toolkit/Store";

// ═══════════════════════════════════════════════
// 🔥 FULL MENU (only for ACTIVE sellers)
// ═══════════════════════════════════════════════
const fullMenu = [
  {
    name: "Dashboard",
    path: "/seller",
    icon: <Dashboard className="text-primary-color" />,
    activeIcon: <Dashboard className="text-white" />,
  },
  {
    name: "Sales Report",
    path: "/seller/reports/sales",
    icon: <Assessment className="text-primary-color" />,
    activeIcon: <Assessment className="text-white" />,
  },
  {
    name: "Stock Report",
    path: "/seller/reports/inventory/stock",
    icon: <Inventory className="text-primary-color" />,
    activeIcon: <Inventory className="text-white" />,
  },
  {
    name: "GST Report",
    path: "/seller/reports/gst",
    icon: <Receipt className="text-primary-color" />,
    activeIcon: <Receipt className="text-white" />,
  },
  {
    name: "Category Summary",
    path: "/seller/reports/inventory/summary",
    icon: <Summarize className="text-primary-color" />,
    activeIcon: <Summarize className="text-white" />,
  },
  {
    name: "Orders",
    path: "/seller/orders",
    icon: <ShoppingBag className="text-primary-color" />,
    activeIcon: <ShoppingBag className="text-white" />,
  },
  {
    name: "Returns",
    path: "/seller/returns",
    icon: <AssignmentReturn className="text-primary-color" />,
    activeIcon: <AssignmentReturn className="text-white" />,
  },
  {
    name: "Products",
    path: "/seller/products",
    icon: <Inventory className="text-primary-color" />,
    activeIcon: <Inventory className="text-white" />,
  },
  {
    name: "Add Product",
    path: "/seller/add-product",
    icon: <Add className="text-primary-color" />,
    activeIcon: <Add className="text-white" />,
  },
  {
    name: "Payment",
    path: "/seller/payment",
    icon: <AccountBalanceWallet className="text-primary-color" />,
    activeIcon: <AccountBalanceWallet className="text-white" />,
  },
  {
    name: "Transaction",
    path: "/seller/transaction",
    icon: <Receipt className="text-primary-color" />,
    activeIcon: <Receipt className="text-white" />,
  },
  {
    name: "Support Calls",
    path: "/seller/support-calls",
    icon: <HeadsetMicIcon className="text-primary-color" />,
    activeIcon: <HeadsetMicIcon className="text-white" />,
  },
  {
    name: "Creative Studio",
    path: "/seller/creative-services",
    icon: <DesignServicesIcon className="text-primary-color" />,
    activeIcon: <DesignServicesIcon className="text-white" />,
  },
];

// 🔥 LIMITED MENU (only for non-ACTIVE sellers)
const limitedMenu = [
  {
    name: "Dashboard",
    path: "/seller",
    icon: <Dashboard className="text-primary-color" />,
    activeIcon: <Dashboard className="text-white" />,
  },
];

const menu2 = [
  {
    name: "Account",
    path: "/seller/account",
    icon: <AccountBox className="text-primary-color" />,
    activeIcon: <AccountBox className="text-white" />,
  },
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

const SellerDrawerList = ({ toggleDrawer }: DrawerListProps) => {
  const { sellers } = useAppSelector((store: any) => store);
  const accountStatus = sellers.profile?.accountStatus;
  const isActive = accountStatus === "ACTIVE";

  console.log("🔍 [SellerDrawerList] status:", accountStatus, "| active:", isActive);

  // 🔥 ACTIVE → Full menu | NOT ACTIVE → Limited menu
  const currentMenu = isActive ? fullMenu : limitedMenu;

  return (
    <DrawerList
      menu={currentMenu}
      menu2={menu2}
      toggleDrawer={toggleDrawer}
    />
  );
};

export default SellerDrawerList;