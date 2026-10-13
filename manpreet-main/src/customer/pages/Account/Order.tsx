// import { useEffect } from 'react'
// import OrderItemCard from './OrderItemCard'
// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// import { fetchUserOrderHistory } from '../../../Redux Toolkit/Customer/OrderSlice';

// const Order = () => {
//   const dispatch = useAppDispatch()
//   const { auth, orders } = useAppSelector(store => store);

//   useEffect(() => {
//     dispatch(fetchUserOrderHistory(localStorage.getItem("jwt") || ""))
//   }, [auth.jwt])
//   return (
//     <div className='text-sm min-h-screen'>
//       <div className='pb-5'>
//         <h1 className='font-semibold'>All orders</h1>
//         <p>from anytime</p>
//       </div>
//       <div className='space-y-4'>
//         {orders?.parentOrders?.length > 0 ? (
//           orders.parentOrders.map((parent: any) =>
//             parent.subOrders.map((sub: any) =>
//               sub.orderItems.map((item: any) => (
//                 <OrderItemCard
//                   key={`${parent._id}-${sub._id}-${item._id}`}
//                   item={item}
//                   order={sub}
//                 />
//               ))
//             )
//           )
//         ) : (
//           <p className="text-gray-500">No orders found.</p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Order







import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Chip,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import OrderItemCard from "./OrderItemCard";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { fetchUserOrderHistory } from "../../../Redux Toolkit/Customer/OrderSlice";

/* ═══════════════════════════════════════════════
   Order status helpers
   ═══════════════════════════════════════════════ */
const ORDER_STEPS = [
  "PLACED",
  "CONFIRMED",
  "PACKED",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const statusColors: any = {
  PENDING: "#f59e0b",
  PLACED: "#f59e0b",
  CONFIRMED: "#3b82f6",
  PACKED: "#8b5cf6",
  SHIPPED: "#06b6d4",
  OUT_FOR_DELIVERY: "#f97316",
  DELIVERED: "#16a34a",
  CANCELLED: "#dc2626",
};

const statusLabels: any = {
  PENDING: "Pending",
  PLACED: "Order Placed",
  CONFIRMED: "Order Confirmed",
  PACKED: "Packed",
  SHIPPED: "Shipped",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const getStepIndex = (status: string) => {
  const idx = ORDER_STEPS.indexOf(status);
  return idx === -1 ? 0 : idx;
};

const Order = () => {
  const dispatch = useAppDispatch();
  const { auth, orders } = useAppSelector((store: any) => store);

  const [trackOpen, setTrackOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt") || "") as any);
  }, [auth.jwt, dispatch]);

  /* Open track modal */
  const handleTrackOrder = (subOrder: any) => {
    setSelectedOrder(subOrder);
    setTrackOpen(true);
  };

  const handleCloseTrack = () => {
    setTrackOpen(false);
    setSelectedOrder(null);
  };

  /* Count total orders */
  const totalOrders =
    orders?.parentOrders?.reduce(
      (count: number, parent: any) =>
        count +
        (parent.subOrders?.reduce(
          (c: number, sub: any) => c + (sub.orderItems?.length || 0),
          0
        ) || 0),
      0
    ) || 0;

  return (
    <div className="text-sm min-h-screen p-4 lg:p-8">
      {/* Header */}
      <div className="pb-5 border-b">
        <h1 className="font-bold text-2xl">My Orders</h1>
        <p className="text-gray-500 mt-1">
          {totalOrders} order{totalOrders !== 1 ? "s" : ""} from anytime
        </p>
      </div>

      {/* Orders list */}
      <div className="space-y-4 mt-6">
        {orders?.loading ? (
          <div className="flex justify-center py-10">
            <CircularProgress />
          </div>
        ) : orders?.parentOrders?.length > 0 ? (
          orders.parentOrders.map((parent: any) =>
            parent.subOrders?.map((sub: any) => (
              <div key={sub._id} className="space-y-4">
                {/* Sub-order header with track button */}
                <div className="flex flex-wrap justify-between items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs text-gray-500">Order ID:</span>
                    <span className="font-mono text-xs">
                      {sub._id?.slice(-8).toUpperCase()}
                    </span>
                    <Chip
                      label={statusLabels[sub.orderStatus] || sub.orderStatus}
                      size="small"
                      sx={{
                        bgcolor:
                          statusColors[sub.orderStatus] || "#64748b",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 10,
                      }}
                    />
                    <span className="text-xs text-gray-500">
                      {sub.orderDate
                        ? new Date(sub.orderDate).toLocaleDateString()
                        : ""}
                    </span>
                  </div>

                  <button
                    onClick={() => handleTrackOrder(sub)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition"
                  >
                    <LocalShippingIcon sx={{ fontSize: 16 }} />
                    Track Order
                  </button>
                </div>

                {/* Order items */}
                {sub.orderItems?.map((item: any) => (
                  <OrderItemCard
                    key={`${parent._id}-${sub._id}-${item._id}`}
                    item={item}
                    order={sub}
                  />
                ))}
              </div>
            ))
          )
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center">
            <p className="text-gray-500 text-lg">No orders found.</p>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          TRACK ORDER MODAL
          ═══════════════════════════════════════════ */}
      <Dialog
        open={trackOpen}
        onClose={handleCloseTrack}
        maxWidth="sm"
        fullWidth
      >
        {selectedOrder && (
          <>
            <DialogTitle>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">Track Order</p>
                  <p className="text-xs text-gray-500 font-mono mt-1">
                    #{selectedOrder._id?.slice(-8).toUpperCase()}
                  </p>
                </div>
                <button
                  onClick={handleCloseTrack}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <CloseIcon />
                </button>
              </div>
            </DialogTitle>

            <DialogContent dividers>
              {/* Status summary */}
              <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  Current Status
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{
                      backgroundColor:
                        statusColors[selectedOrder.orderStatus] || "#64748b",
                    }}
                  ></span>
                  <p
                    className="font-bold text-base"
                    style={{
                      color:
                        statusColors[selectedOrder.orderStatus] || "#64748b",
                    }}
                  >
                    {statusLabels[selectedOrder.orderStatus] ||
                      selectedOrder.orderStatus}
                  </p>
                </div>
                {selectedOrder.orderStatus === "DELIVERED" && (
                  <p className="text-xs text-green-700 mt-2">
                    Delivered on{" "}
                    {selectedOrder.deliveryDate
                      ? new Date(selectedOrder.deliveryDate).toLocaleDateString()
                      : "recently"}
                  </p>
                )}
                {selectedOrder.orderStatus === "SHIPPED" && (
                  <p className="text-xs text-blue-700 mt-2">
                    Expected delivery by{" "}
                    {selectedOrder.expectedDeliveryDate
                      ? new Date(
                          selectedOrder.expectedDeliveryDate
                        ).toLocaleDateString()
                      : "soon"}
                  </p>
                )}
              </div>

              {/* Step progress */}
              <div className="mb-6">
                <p className="font-bold text-sm mb-3">Order Progress</p>
                <Stepper
                  activeStep={getStepIndex(selectedOrder.orderStatus)}
                  orientation="vertical"
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontSize: "13px",
                      fontWeight: "600",
                    },
                    "& .Mui-completed .MuiStepLabel-label": {
                      color: "#16a34a !important",
                    },
                    "& .Mui-active .MuiStepLabel-label": {
                      color: "#3b82f6 !important",
                      fontWeight: "700 !important",
                    },
                  }}
                >
                  {ORDER_STEPS.map((step) => (
                    <Step key={step}>
                      <StepLabel>
                        <div>
                          <p>{statusLabels[step] || step}</p>
                          {selectedOrder.timeline?.find(
                            (t: any) => t.status === step
                          ) && (
                            <p className="text-xs text-gray-400 font-normal mt-0.5">
                              {new Date(
                                selectedOrder.timeline.find(
                                  (t: any) => t.status === step
                                ).at
                              ).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>

              {/* Delivery address */}
              {selectedOrder.shippingAddress && (
                <div className="mb-6">
                  <p className="font-bold text-sm mb-2">Delivery Address</p>
                  <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-700 leading-relaxed">
                    <p className="font-semibold">
                      {selectedOrder.shippingAddress.name}
                    </p>
                    <p>{selectedOrder.shippingAddress.address}</p>
                    <p>
                      {selectedOrder.shippingAddress.city},{" "}
                      {selectedOrder.shippingAddress.state} -{" "}
                      {selectedOrder.shippingAddress.pinCode}
                    </p>
                    <p className="mt-1">
                      Phone: {selectedOrder.shippingAddress.mobile}
                    </p>
                  </div>
                </div>
              )}

              {/* Shipping / payment info */}
              <div className="grid grid-cols-2 gap-3">
                {selectedOrder.shippingCharges !== undefined && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Shipping</p>
                    <p className="font-bold text-sm">
                      ₹{selectedOrder.shippingCharges || 0}
                    </p>
                  </div>
                )}
                {selectedOrder.paymentStatus && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Payment</p>
                    <p className="font-bold text-sm">
                      {selectedOrder.paymentStatus}
                    </p>
                  </div>
                )}
                {selectedOrder.totalPrice !== undefined && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="font-bold text-sm">
                      ₹{selectedOrder.totalPrice}
                    </p>
                  </div>
                )}
              </div>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCloseTrack} variant="contained">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default Order;