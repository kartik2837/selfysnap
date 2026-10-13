// import { Divider } from "@mui/material";

// import {
//   sumCartItemMrpPrice,
//   sumCartItemSellingPrice,
// } from "../../../util/cartCalculator";
// import { useAppSelector } from "../../../Redux Toolkit/Store";

// const PricingCard = () => {
//   const { cart } = useAppSelector((store) => store);
//   return (
//     <div>
//       <div className="space-y-3 p-5">
//         <div className="flex justify-between items-center">
//           <span>Subtotal</span>
//           <span>₹ {cart.cart?.totalMrpPrice}</span>
//         </div>
//         <div className="flex justify-between items-center">
//           <span>Discount</span>
//           <span>
//             ₹{" "}
//             {sumCartItemMrpPrice(cart.cart?.cartItems || []) -
//               sumCartItemSellingPrice(cart.cart?.cartItems || [])}
//           </span>
//         </div>
//         <div className="flex justify-between items-center">
//           <span>Shipping</span>
//           <span>Free</span>
//         </div>
//         <div className="flex justify-between items-center">
//           <span>plateform fee</span> 
//           <span className="text-orange-500">Free</span>
//         </div>
//       </div>
//       <Divider />

//       <div className="font-medium px-5 py-2 flex justify-between items-center">
//         <span>Total</span>
//         <span>₹ {cart.cart?.totalSellingPrice}</span>
//       </div>
//     </div>
//   );
//  };

// export default PricingCard;






// src/customer/pages/Cart/PricingCard.tsx

import { Divider } from "@mui/material";


import {
  sumCartItemMrpPrice,
  sumCartItemSellingPrice,
} from "../../../util/cartCalculator";
import { useAppSelector } from "../../../Redux Toolkit/Store";

const PricingCard = () => {
  const { cart } = useAppSelector((store: any) => store);

  const mrpTotal = sumCartItemMrpPrice(cart.cart?.cartItems || []);
  const sellingTotal = sumCartItemSellingPrice(cart.cart?.cartItems || []);
  const discount = mrpTotal - sellingTotal;
  const discountPercent = mrpTotal > 0 ? Math.round((discount / mrpTotal) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">

      {/* ═══════════════════════════════════════════ */}
      {/* HEADER */}
      {/* ═══════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3.5">
        <h2 className="text-white font-extrabold text-sm tracking-wider flex items-center gap-2">
         
          PRICE DETAILS
        </h2>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* PRICE BREAKDOWN */}
      {/* ═══════════════════════════════════════════ */}
      <div className="p-5 space-y-4">

        {/* Subtotal (MRP) */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700 font-bold">
            Price ({cart.cart?.cartItems?.length || 0} items)
          </span>
          <span className="text-base font-extrabold text-gray-900">
            ₹{mrpTotal}
          </span>
        </div>

        {/* Discount */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700 font-bold flex items-center gap-1.5">
            
            Discount
            {discountPercent > 0 && (
              <span className="text-[10px] bg-green-100 text-green-700 font-extrabold px-2 py-0.5 rounded-full ml-1">
                {discountPercent}% OFF
              </span>
            )}
          </span>
          <span className="text-base font-extrabold text-green-600">
            − ₹{discount}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700 font-bold">
            Shipping
          </span>
          <span className="text-base font-extrabold text-green-600">
            FREE
          </span>
        </div>

        {/* Platform Fee */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700 font-bold">
            Platform Fee
          </span>
          <span className="text-base font-extrabold text-green-600">
            FREE
          </span>
        </div>

      </div>

      <Divider sx={{ borderStyle: 'dashed', borderColor: '#d1d5db' }} />

      {/* ═══════════════════════════════════════════ */}
      {/* TOTAL */}
      {/* ═══════════════════════════════════════════ */}
      <div className="px-5 py-4 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50">
        <span className="text-base font-extrabold text-gray-900 tracking-wide">
          Total Amount
        </span>
        <span className="text-2xl font-extrabold text-indigo-700">
          ₹{cart.cart?.totalSellingPrice || 0}
        </span>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* SAVINGS BANNER */}
      {/* ═══════════════════════════════════════════ */}
      {discount > 0 && (
        <div className="mx-5 my-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 flex items-center gap-2.5">
          <div className="bg-green-500 rounded-full p-1.5 flex-shrink-0">
           
          </div>
          <p className="text-sm font-extrabold text-green-800">
            You save ₹{discount} on this order!
          </p>
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* FOOTER - SECURE */}
      {/* ═══════════════════════════════════════════ */}
      <div className="px-5 pb-4">
        <div className="text-center">
          
        </div>
      </div>

    </div>
  );
};

export default PricingCard;