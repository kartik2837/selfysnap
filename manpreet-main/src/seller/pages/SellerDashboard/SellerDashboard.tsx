import SellerRoutes from "../../../routes/SellerRoutes";
import Navbar from "../../../admin seller/components/navbar/Navbar";
import SellerDrawerList from "../../components/SideBar/DrawerList";

const SellerDashboard = () => {
  return (
    <div className="min-h-screen">
      <Navbar DrawerList={SellerDrawerList}/>
      <section className="lg:flex lg:h-[90vh]">
        <div className="hidden lg:block h-full">
        <SellerDrawerList/>
        </div>
        <div className="p-10 w-full lg:w-[80%]  overflow-y-auto">
          <SellerRoutes />
        </div>
      </section>
    </div>
  );
};

export default SellerDashboard;








// // src/pages/reports/Dashboard.tsx

//  import SellerRoutes from "../../../routes/SellerRoutes";
// import Navbar from "../../../admin seller/components/navbar/Navbar";
//  import SellerDrawerList from "../../components/SideBar/DrawerList";

// import React, { useEffect } from "react";
// import {
//     Grid,
//     Card,
//     CardContent,
//     Typography,
//     CircularProgress,
//     Alert,
// } from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { getDashboardStats } from "../../../Redux Toolkit/Seller/report.slice";

// const SellerDashboard : React.FC = () => {
//     const dispatch = useAppDispatch();
//     const { dashboard, dashboardLoading, dashboardError } = useAppSelector(
//         (state) => state.report
//     );

//     useEffect(() => {
//         dispatch(getDashboardStats());
//     }, [dispatch]);

//     if (dashboardLoading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <CircularProgress />
//             </div>
//         );
//     }

//     if (dashboardError) {
//         return (
//             <div className="p-4">
//                 <Alert severity="error">{dashboardError}</Alert>
//             </div>
//         );
//     }

//     if (!dashboard) {
//         return (
//             <div className="p-4">
//                 <Alert severity="info">No data available</Alert>
//             </div>
//         );
//     }

//     const cards = [
//         { title: "Total Products", value: dashboard.totalProducts, color: "blue" },
//         { title: "Total Orders", value: dashboard.totalOrders, color: "green" },
//         { title: "Total Revenue", value: `₹${dashboard.totalRevenue.toFixed(2)}`, color: "purple" },
//         { title: "Low Stock Items", value: dashboard.lowStockCount, color: "red" },
//     ];

//     return (
//         <div className="p-6 bg-gray-50 min-h-screen">
//             <Typography variant="h4" className="mb-6 font-bold">
//                 📊 Dashboard
//             </Typography>
//             <Grid container spacing={4}>
//                 {cards.map((card, index) => (
//                     <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
//                         <Card className={`shadow-md border-l-4 border-${card.color}-500`}>
//                             <CardContent>
//                                 <Typography variant="subtitle2" color="textSecondary">
//                                     {card.title}
//                                 </Typography>
//                                 <Typography variant="h5" className="font-bold">
//                                     {card.value}
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </div>
//     );
// };

// export default SellerDashboard;