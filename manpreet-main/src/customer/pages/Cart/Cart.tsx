// import {
//   Alert,
//   Button,
//   IconButton,
//   Snackbar,
//   TextField,
// } from "@mui/material";
// import { useEffect, useState } from "react";

// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import CartItemCard from "./CartItemCard";
// import { useNavigate } from "react-router-dom";
// import PricingCard from "./PricingCard";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { fetchUserCart } from "../../../Redux Toolkit/Customer/CartSlice";
// import type { CartItem } from "../../../types/cartTypes";
// import { applyCoupon } from "../../../Redux Toolkit/Customer/CouponSlice";
// import { Close } from "@mui/icons-material";

// const Cart = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { cart, auth, coupone } = useAppSelector((store) => store);
//   const [couponCode, setCouponCode] = useState("");
//   const [snackbarOpen, setOpenSnackbar] = useState(false);

//   useEffect(() => {
//     dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
//   }, [auth.jwt]);

//   const handleChange = (e: any) => {
//     setCouponCode(e.target.value);
//   };

//   const handleApllyCoupon = (apply: string) => {
//     // console.log(couponCode,apply)

//     var code = couponCode;

//     if (apply == "false") {
//       code = cart.cart?.couponCode || "";
//     }

//     dispatch(
//       applyCoupon({
//         apply,
//         code,
//         orderValue: cart.cart?.totalSellingPrice || 100,
//         jwt: localStorage.getItem("jwt") || "",
//       })
//     );
//   };
//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   useEffect(() => {
//     if (coupone.couponApplied || coupone.error) {
//       setOpenSnackbar(true);
//       setCouponCode("");
//     }
//   }, [coupone.couponApplied, coupone.error]);

//   console.log("cart ", coupone);
//   return (
//     <>
//       {cart.cart && cart.cart?.cartItems.length !== 0 ? (
//         <div className="pt-10 px-5 sm:px-10 md:px-60 lg:px-60 min-h-screen">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
//             <div className="lg:col-span-2 space-y-3 ">
//               {cart.cart?.cartItems.map((item: CartItem) => (
//                 <CartItemCard key={item._id} item={item} />
//               ))}
//             </div>

//             <div className="col-span-1  text-sm space-y-3">
//               <div className="border rounded-md px-5 py-3 space-y-5">
//                 <div className="">
//                   <div className="flex gap-3 text-sm items-center">
//                     <LocalOfferIcon
//                       sx={{ color: "#ee915f", fontSize: "17px" }}
//                     />
//                     <span>Apply Coupens</span>
//                   </div>
//                 </div>
//                 {!cart.cart?.couponCode ? (
//                   <div className="flex justify-between items-center">
//                     <TextField
//                       value={couponCode}
//                       onChange={handleChange}
//                       placeholder="coupon code"
//                       className=""
//                       size="small"
//                     />
//                     <Button
//                       onClick={() => handleApllyCoupon("true")}
//                       disabled={couponCode ? false : true}
//                       size="small"
//                     >
//                       Aplly
//                     </Button>
//                   </div>
//                 ) : (
//                   <div className="flex">
//                     <div className="p-1 pl-5 pr-3 border rounded-full flex gap-2 items-center">
//                       <span className="">{cart.cart.couponCode} Applied</span>
//                       <IconButton
//                         onClick={() => handleApllyCoupon("false")}
//                         size="small"
//                       >
//                         <Close className="text-red-600" />
//                       </IconButton>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <section className="border rounded-md">
//                 <PricingCard />
//                 <div className="p-5">
//                   <Button
//                     onClick={() => navigate("/checkout/address")}
//                     sx={{ py: "11px" }}
//                     variant="contained"
//                     fullWidth
//                   >
//                     BUY NOW
//                   </Button>
//                 </div>
//               </section>

//               {/* Wishlist/additional features removed for clean workflow */}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="h-[85vh] flex justify-center items-center flex-col">
//           <div className="text-center py-5">
//             <h1 className="text-lg font-medium">Your cart is empty!</h1>
//             <p className="text-gray-500 text-sm">
//               There is nothing in your bag. Start shopping to add items.
//             </p>
//           </div>
//           <Button variant="outlined" sx={{ py: "11px" }} onClick={() => navigate("/") }>
//             Go to Home
//           </Button>
//         </div>
//       )}
//       <Snackbar
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={coupone.error ? "error" : "success"}
//           variant="filled"
//           sx={{ width: "100%" }}
//         >
//           {coupone.error ? coupone.error : "Coupon Applied successfully"}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default Cart;







// // import {
// //   Alert,
// //   Button,
// //   IconButton,
// //   Snackbar,
// //   TextField,
// // } from "@mui/material";
// // import { useEffect, useState } from "react";

// // import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// // import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
// // import CartItemCard from "./CartItemCard";
// // import { useNavigate } from "react-router-dom";
// // import PricingCard from "./PricingCard";
// // import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// // import {
// //   fetchUserCart,
// //   clearCart,
// // } from "../../../Redux Toolkit/Customer/CartSlice";
// // import type { CartItem } from "../../../types/cartTypes";
// // import { applyCoupon } from "../../../Redux Toolkit/Customer/CouponSlice";
// // import { Close } from "@mui/icons-material";

// // const Cart = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useAppDispatch();
// //   const { cart, auth, coupone } = useAppSelector((store: any) => store);
// //   const [couponCode, setCouponCode] = useState("");
// //   const [snackbarOpen, setOpenSnackbar] = useState(false);

// //   useEffect(() => {
// //     dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
// //   }, [auth.jwt]);

// //   /* 🔥 CLEAR CART HANDLER */
// //   const handleClearCart = () => {
// //     if (window.confirm("Are you sure you want to clear the entire cart?")) {
// //       const jwt = localStorage.getItem("jwt") || "";
// //       console.log("🔵 Clearing cart...");
// //       dispatch(clearCart(jwt) as any);
// //     }
// //   };

// //   const handleChange = (e: any) => {
// //     setCouponCode(e.target.value);
// //   };

// //   const handleApllyCoupon = (apply: string) => {
// //     var code = couponCode;
// //     if (apply == "false") {
// //       code = cart.cart?.couponCode || "";
// //     }
// //     dispatch(
// //       applyCoupon({
// //         apply,
// //         code,
// //         orderValue: cart.cart?.totalSellingPrice || 100,
// //         jwt: localStorage.getItem("jwt") || "",
// //       }) as any
// //     );
// //   };

// //   const handleCloseSnackbar = () => {
// //     setOpenSnackbar(false);
// //   };

// //   useEffect(() => {
// //     if (coupone.couponApplied || coupone.error) {
// //       setOpenSnackbar(true);
// //       setCouponCode("");
// //     }
// //   }, [coupone.couponApplied, coupone.error]);

// //   return (
// //     <>
// //       {cart.cart && cart.cart?.cartItems.length !== 0 ? (
// //         <div className="pt-10 px-5 sm:px-10 md:px-60 lg:px-60 min-h-screen">
// //           {/* 🆕 HEADER WITH CLEAR CART BUTTON */}
// //           <div className="flex justify-between items-center mb-4">
// //             <h1 className="text-xl font-bold text-gray-800">
// //               Shopping Cart ({cart.cart?.cartItems.length} items)
// //             </h1>

// //             <Button
// //               onClick={handleClearCart}
// //               variant="outlined"
// //               startIcon={<DeleteSweepIcon />}
// //               sx={{
// //                 borderColor: "#ef4444",
// //                 color: "#ef4444",
// //                 textTransform: "none",
// //                 fontWeight: "bold",
// //                 borderRadius: 2,
// //                 "&:hover": {
// //                   borderColor: "#dc2626",
// //                   backgroundColor: "#fef2f2",
// //                 },
// //               }}
// //             >
// //               Clear Cart
// //             </Button>
// //           </div>

// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
// //             <div className="lg:col-span-2 space-y-3 ">
// //               {cart.cart?.cartItems.map((item: CartItem) => (
// //                 <CartItemCard key={item._id} item={item} />
// //               ))}
// //             </div>

// //             <div className="col-span-1  text-sm space-y-3">
// //               <div className="border rounded-md px-5 py-3 space-y-5">
// //                 <div className="">
// //                   <div className="flex gap-3 text-sm items-center">
// //                     <LocalOfferIcon
// //                       sx={{ color: "#ee915f", fontSize: "17px" }}
// //                     />
// //                     <span>Apply Coupens</span>
// //                   </div>
// //                 </div>
// //                 {!cart.cart?.couponCode ? (
// //                   <div className="flex justify-between items-center">
// //                     <TextField
// //                       value={couponCode}
// //                       onChange={handleChange}
// //                       placeholder="coupon code"
// //                       className=""
// //                       size="small"
// //                     />
// //                     <Button
// //                       onClick={() => handleApllyCoupon("true")}
// //                       disabled={couponCode ? false : true}
// //                       size="small"
// //                     >
// //                       Aplly
// //                     </Button>
// //                   </div>
// //                 ) : (
// //                   <div className="flex">
// //                     <div className="p-1 pl-5 pr-3 border rounded-full flex gap-2 items-center">
// //                       <span className="">{cart.cart.couponCode} Applied</span>
// //                       <IconButton
// //                         onClick={() => handleApllyCoupon("false")}
// //                         size="small"
// //                       >
// //                         <Close className="text-red-600" />
// //                       </IconButton>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>

// //               <section className="border rounded-md">
// //                 <PricingCard />
// //                 <div className="p-5">
// //                   <Button
// //                     onClick={() => navigate("/checkout/address")}
// //                     sx={{ py: "11px" }}
// //                     variant="contained"
// //                     fullWidth
// //                   >
// //                     BUY NOW
// //                   </Button>
// //                 </div>
// //               </section>
// //             </div>
// //           </div>
// //         </div>
// //       ) : (
// //         <div className="h-[85vh] flex justify-center items-center flex-col">
// //           <div className="text-center py-5">
// //             <h1 className="text-lg font-medium">Your cart is empty!</h1>
// //             <p className="text-gray-500 text-sm">
// //               There is nothing in your bag. Start shopping to add items.
// //             </p>
// //           </div>
// //           <Button
// //             variant="outlined"
// //             sx={{ py: "11px" }}
// //             onClick={() => navigate("/")}
// //           >
// //             Go to Home
// //           </Button>
// //         </div>
// //       )}

// //       <Snackbar
// //         anchorOrigin={{ vertical: "top", horizontal: "right" }}
// //         open={snackbarOpen}
// //         autoHideDuration={6000}
// //         onClose={handleCloseSnackbar}
// //       >
// //         <Alert
// //           onClose={handleCloseSnackbar}
// //           severity={coupone.error ? "error" : "success"}
// //           variant="filled"
// //           sx={{ width: "100%" }}
// //         >
// //           {coupone.error ? coupone.error : "Coupon Applied successfully"}
// //         </Alert>
// //       </Snackbar>
// //     </>
// //   );
// // };

// // export default Cart;








// import {
//   Alert,
//   Button,
//   IconButton,
//   Snackbar,
//   TextField,
// } from "@mui/material";
// import { useEffect, useState } from "react";

// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import CartItemCard from "./CartItemCard";
// import { useNavigate } from "react-router-dom";
// import PricingCard from "./PricingCard";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { fetchUserCart } from "../../../Redux Toolkit/Customer/CartSlice";
// import type { CartItem } from "../../../types/cartTypes";
// import { applyCoupon } from "../../../Redux Toolkit/Customer/CouponSlice";
// import { Close } from "@mui/icons-material";

// const Cart = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   // 🔥 FIX 1: Proper typing + safe defaults
//   const { cart, auth, coupone } = useAppSelector((store: any) => store);

//   const [couponCode, setCouponCode] = useState("");
//   const [snackbarOpen, setOpenSnackbar] = useState(false);

//   // 🔥 FIX 2: auth?.jwt — safe access
//   useEffect(() => {
//     const token = localStorage.getItem("jwt") || "";
//     if (token) {
//       dispatch(fetchUserCart(token) as any);
//     }
//   }, [auth?.jwt, dispatch]);

//   const handleChange = (e: any) => {
//     setCouponCode(e.target.value);
//   };

//   const handleApllyCoupon = (apply: string) => {
//     var code = couponCode;
//     if (apply === "false") {
//       code = cart?.cart?.couponCode || "";
//     }
//     dispatch(
//       applyCoupon({
//         apply,
//         code,
//         orderValue: cart?.cart?.totalSellingPrice || 100,
//         jwt: localStorage.getItem("jwt") || "",
//       }) as any
//     );
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   useEffect(() => {
//     if (coupone?.couponApplied || coupone?.error) {
//       setOpenSnackbar(true);
//       setCouponCode("");
//     }
//   }, [coupone?.couponApplied, coupone?.error]);

//   // 🔥 FIX 3: Safe check — cartItems array hai ya nahi
//   const cartItems = cart?.cart?.cartItems;
//   const hasItems = Array.isArray(cartItems) && cartItems.length > 0;

//   return (
//     <>
//       {hasItems ? (
//         <div className="pt-10 px-5 sm:px-10 md:px-60 lg:px-60 min-h-screen">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//             <div className="lg:col-span-2 space-y-3">
//               {cartItems.map((item: CartItem) => (
//                 <CartItemCard key={item._id} item={item} />
//               ))}
//             </div>

//             <div className="col-span-1 text-sm space-y-3">
//               <div className="border rounded-md px-5 py-3 space-y-5">
//                 <div>
//                   <div className="flex gap-3 text-sm items-center">
//                     <LocalOfferIcon sx={{ color: "#ee915f", fontSize: "17px" }} />
//                     <span>Apply Coupons</span>
//                   </div>
//                 </div>

//                 {!cart?.cart?.couponCode ? (
//                   <div className="flex justify-between items-center">
//                     <TextField
//                       value={couponCode}
//                       onChange={handleChange}
//                       placeholder="coupon code"
//                       size="small"
//                     />
//                     <Button
//                       onClick={() => handleApllyCoupon("true")}
//                       disabled={!couponCode}
//                       size="small"
//                     >
//                       Apply
//                     </Button>
//                   </div>
//                 ) : (
//                   <div className="flex">
//                     <div className="p-1 pl-5 pr-3 border rounded-full flex gap-2 items-center">
//                       <span>{cart.cart.couponCode} Applied</span>
//                       <IconButton
//                         onClick={() => handleApllyCoupon("false")}
//                         size="small"
//                       >
//                         <Close className="text-red-600" />
//                       </IconButton>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <section className="border rounded-md">
//                 <PricingCard />
//                 <div className="p-5">
//                   <Button
//                     onClick={() => navigate("/checkout/address")}
//                     sx={{ py: "11px" }}
//                     variant="contained"
//                     fullWidth
//                   >
//                     BUY NOW
//                   </Button>
//                 </div>
//               </section>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="h-[85vh] flex justify-center items-center flex-col">
//           <div className="text-center py-5">
//             <h1 className="text-lg font-medium">Your cart is empty!</h1>
//             <p className="text-gray-500 text-sm">
//               There is nothing in your bag. Start shopping to add items.
//             </p>
//           </div>
//           <Button
//             variant="outlined"
//             sx={{ py: "11px" }}
//             onClick={() => navigate("/")}
//           >
//             Go to Home
//           </Button>
//         </div>
//       )}

//       <Snackbar
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={coupone?.error ? "error" : "success"}
//           variant="filled"
//           sx={{ width: "100%" }}
//         >
//           {coupone?.error ? coupone.error : "Coupon Applied successfully"}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default Cart;


















import {
  Alert,
  Button,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CartItemCard from "./CartItemCard";
import { useNavigate } from "react-router-dom";
import PricingCard from "./PricingCard";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { fetchUserCart } from "../../../Redux Toolkit/Customer/CartSlice";
import type { CartItem } from "../../../types/cartTypes";
import { applyCoupon } from "../../../Redux Toolkit/Customer/CouponSlice";
import { Close } from "@mui/icons-material";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { cart, auth, coupone } = useAppSelector((store: any) => store);

  const [couponCode, setCouponCode] = useState("");
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  /* 🔥 Fetch cart on mount */
  useEffect(() => {
    const token = localStorage.getItem("jwt") || "";
    if (token) {
      dispatch(fetchUserCart(token) as any);
    }
  }, [auth?.jwt, dispatch]);

  const handleChange = (e: any) => {
    setCouponCode(e.target.value);
  };

  const handleApllyCoupon = (apply: string) => {
    let code = couponCode;
    if (apply === "false") {
      code = cart?.cart?.couponCode || "";
    }
    dispatch(
      applyCoupon({
        apply,
        code,
        orderValue: cart?.cart?.totalSellingPrice || 100,
        jwt: localStorage.getItem("jwt") || "",
      }) as any
    );
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (coupone?.couponApplied || coupone?.error) {
      setOpenSnackbar(true);
      setCouponCode("");
    }
  }, [coupone?.couponApplied, coupone?.error]);

  const cartItems = cart?.cart?.cartItems;
  const hasItems = Array.isArray(cartItems) && cartItems.length > 0;

  /* 🔥 DEBUG LOG — console me check karo */
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      console.log(
        "🔍 CART ITEMS:",
        cartItems.map((it: any) => ({
          _id: it._id,
          productTitle: it.product?.title,
          size: it.size,
          quantity: it.quantity,
        }))
      );
    }
  }, [cartItems]);

  return (
    <>
      {hasItems ? (
        <div className="pt-10 px-5 sm:px-10 md:px-60 lg:px-60 min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* ═════════ CART ITEMS LIST ═════════ */}
            <div className="lg:col-span-2 space-y-3">
              {cartItems.map((item: CartItem, index: number) => {
                // 🔥 UNIQUE KEY — duplicate ya missing _id ke liye safe
                const hasValidId =
                  item._id &&
                  String(item._id) !== "undefined" &&
                  String(item._id) !== "null" &&
                  String(item._id).length > 0;

                const uniqueKey = hasValidId
                  ? String(item._id)
                  : `${(item as any).product?._id || "p"}-${
                      item.size || "free"
                    }-${index}`;

                return <CartItemCard key={uniqueKey} item={item} />;
              })}
            </div>

            {/* ═════════ RIGHT SIDEBAR ═════════ */}
            <div className="col-span-1 text-sm space-y-3">
              {/* Coupon Section */}
              <div className="border rounded-md px-5 py-3 space-y-5">
                <div>
                  <div className="flex gap-3 text-sm items-center">
                    <LocalOfferIcon
                      sx={{ color: "#ee915f", fontSize: "17px" }}
                    />
                    <span>Apply Coupons</span>
                  </div>
                </div>

                {!cart?.cart?.couponCode ? (
                  <div className="flex justify-between items-center">
                    <TextField
                      value={couponCode}
                      onChange={handleChange}
                      placeholder="coupon code"
                      size="small"
                    />
                    <Button
                      onClick={() => handleApllyCoupon("true")}
                      disabled={!couponCode}
                      size="small"
                    >
                      Apply
                    </Button>
                  </div>
                ) : (
                  <div className="flex">
                    <div className="p-1 pl-5 pr-3 border rounded-full flex gap-2 items-center">
                      <span>{cart.cart.couponCode} Applied</span>
                      <IconButton
                        onClick={() => handleApllyCoupon("false")}
                        size="small"
                      >
                        <Close className="text-red-600" />
                      </IconButton>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing + Buy Now */}
              <section className="border rounded-md">
                <PricingCard />
                <div className="p-5">
                  <Button
                    onClick={() => navigate("/checkout/address")}
                    sx={{ py: "11px" }}
                    variant="contained"
                    fullWidth
                  >
                    BUY NOW
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : (
        /* ═════════ EMPTY CART ═════════ */
        <div className="h-[85vh] flex justify-center items-center flex-col">
          <div className="text-center py-5">
            <h1 className="text-lg font-medium">Your cart is empty!</h1>
            <p className="text-gray-500 text-sm">
              There is nothing in your bag. Start shopping to add items.
            </p>
          </div>
          <Button
            variant="outlined"
            sx={{ py: "11px" }}
            onClick={() => navigate("/")}
          >
            Go to Home
          </Button>
        </div>
      )}

      {/* ═════════ SNACKBAR ═════════ */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={coupone?.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {coupone?.error ? coupone.error : "Coupon Applied successfully"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Cart;