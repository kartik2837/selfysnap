// import { Button, Divider, IconButton } from '@mui/material';
// import React from 'react';
// import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from '@mui/icons-material/Add';
// import CloseIcon from '@mui/icons-material/Close';
// import type { CartItem } from '../../../types/cartTypes';
// import { useAppDispatch } from '../../../Redux Toolkit/Store';
// import { deleteCartItem, updateCartItem } from '../../../Redux Toolkit/Customer/CartSlice';

// interface CartItemProps {
//   item: CartItem;
// }

// const CartItemCard: React.FC<CartItemProps> = ({ item }) => {
//   const dispatch = useAppDispatch();

//   const handleUpdateQuantity = (value: number) => {
//     const jwt = localStorage.getItem("jwt");
//     if (!jwt) return;

//     dispatch(
//       updateCartItem({
//         jwt,
//         cartItemId: item._id,
//         cartItem: { quantity: item.quantity + value }
//       })
//     );
//   };

//   const handleRemoveCartItem = () => {
//     const jwt = localStorage.getItem("jwt");
//     if (!jwt) return;

//     dispatch(
//       deleteCartItem({
//         jwt,
//         cartItemId: item._id
//       })
//     );
//   };

//   return (
//     <div className='border rounded-md relative bg-white'>

//       {/* ===== PRODUCT INFO ===== */}
//       <div className='p-5 flex gap-3'>

//         <div>
//           <img
//             className='w-[90px] rounded-md object-contain'
//             src={item.product?.images?.[0] || "/placeholder.png"}
//             alt={item.product?.title || "product"}
//           />
//         </div>

//         <div className='space-y-2'>

//           {/* Product Title */}
//           <p className='text-gray-600 font-medium text-sm'>
//             {item.product?.title || "Unnamed Product"}
//           </p>

//           {/* Sold By */}
//           <p className='text-gray-400 text-xs'>
//             <strong>Sold by:</strong>{" "}
//             {item.product?.seller?.businessDetails?.businessName || "Unknown"}
//           </p>

//           <p className='text-xs'>
//             <strong>7 days replacement</strong> available
//           </p>

//           <p className='text-sm text-gray-500'>
//             <strong>Quantity :</strong> {item.quantity}
//           </p>
//         </div>
//       </div>

//       <Divider />

//       {/* ===== QUANTITY + PRICE ===== */}
//       <div className='px-5 py-2 flex justify-between items-center'>

//         <div className='flex items-center gap-2 w-[140px] justify-between'>

//           <Button
//             size='small'
//             disabled={item.quantity <= 1}
//             onClick={() => handleUpdateQuantity(-1)}
//           >
//             <RemoveIcon />
//           </Button>

//           <span className='px-3 font-semibold'>
//             {item.quantity}
//           </span>

//           <Button
//             size='small'
//             onClick={() => handleUpdateQuantity(1)}
//           >
//             <AddIcon />
//           </Button>

//         </div>

//         <div>
//           <p className='text-gray-700 font-medium'>
//             ₹{item.sellingPrice}
//           </p>
//         </div>

//       </div>

//       {/* ===== REMOVE BUTTON ===== */}
//       <div className='absolute top-1 right-1'>
//         <IconButton onClick={handleRemoveCartItem} color='primary'>
//           <CloseIcon />
//         </IconButton>
//       </div>

//     </div>
//   );
// };

// export default CartItemCard;










// import { Button, Divider, IconButton } from "@mui/material";
// import React from "react";
// import RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";
// import CloseIcon from "@mui/icons-material/Close";
// import BrushIcon from "@mui/icons-material/Brush";
// import type { CartItem } from "../../../types/cartTypes";
// import { useAppDispatch } from "../../../Redux Toolkit/Store";
// import {
//   deleteCartItem,
//   updateCartItem,
// } from "../../../Redux Toolkit/Customer/CartSlice";
// import { DEPLOYED_URL } from "../../../Config/Api";

// interface CartItemProps {
//   item: CartItem;
// }

// // Relative path ho to DEPLOYED_URL prefix lagao, warna as-is
// const buildUrl = (p?: string) => {
//   if (!p) return "/placeholder.png";
//   if (p.startsWith("http://") || p.startsWith("https://")) return p;
//   return `${DEPLOYED_URL}${p.startsWith("/") ? p : `/${p}`}`;
// };

// const CartItemCard: React.FC<CartItemProps> = ({ item }) => {
//   const dispatch = useAppDispatch();

//   const cd: any = (item as any).customDesign || {};
//   const raw: any = item as any;

//   const compositeImg =
//     cd.compositeImage ||
//     cd.previewImage ||
//     raw.compositeImage ||
//     raw.previewImage ||
//     null;

//   const isCustom =
//     cd.enabled === true || !!raw.compositeImage || !!raw.previewImage;

//   const extraCharge: number =
//     Number(cd.extraCharge) || Number(raw.extraCharge) || 0;

//   const displayImage = isCustom
//     ? compositeImg ||
//       cd.originalImage ||
//       raw.originalImage ||
//       item.product?.images?.[0]
//     : item.product?.images?.[0];

//   const finalSrc = buildUrl(displayImage);

//   const handleUpdateQuantity = (value: number) => {
//     const jwt = localStorage.getItem("jwt");
//     if (!jwt) return;
//     dispatch(
//       updateCartItem({
//         jwt,
//         cartItemId: String(item._id),
//         cartItem: { quantity: item.quantity + value },
//       })
//     );
//   };

//   const handleRemoveCartItem = () => {
//     const jwt = localStorage.getItem("jwt");
//     if (!jwt) return;
//     dispatch(deleteCartItem({ jwt, cartItemId: String(item._id) }));
//   };

//   return (
//     <div className="border rounded-md relative bg-white">
//       <div className="p-5 flex gap-4">
//         <div className="relative flex-shrink-0">
//           <img
//             className={`w-[110px] h-[110px] rounded-md object-cover block ${
//               isCustom ? "ring-2 ring-purple-400" : ""
//             }`}
//             src={finalSrc}
//             alt={item.product?.title || "product"}
//             onError={(e) => {
//               const target = e.target as HTMLImageElement;
//               const fallback = buildUrl(item.product?.images?.[0]);
//               if (target.src !== fallback) target.src = fallback;
//             }}
//           />
//           {isCustom && (
//             <div className="absolute -top-2 -left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
//               <BrushIcon sx={{ fontSize: 10 }} />
//               CUSTOM
//             </div>
//           )}
//         </div>

//         <div className="space-y-2 flex-1 min-w-0">
//           <p className="text-gray-600 font-medium text-sm">
//             {item.product?.title || "Unnamed Product"}
//           </p>

//           {isCustom && (
//             <div className="bg-purple-50 border border-purple-200 rounded-md px-2 py-1 inline-block">
//               <p className="text-[11px] font-bold text-purple-700">
//                  Printed with your design
//               </p>
//               {extraCharge > 0 && (
//                 <p className="text-[10px] text-purple-600">
//                   +₹{extraCharge} customization
//                 </p>
//               )}
//             </div>
//           )}

//           <p className="text-gray-400 text-xs">
//             <strong>Sold by:</strong>{" "}
//             {item.product?.seller?.businessDetails?.businessName || "Unknown"}
//           </p>

//           <p className="text-xs">
//             <strong>5 days replacement</strong> available
//           </p>

//           <p className="text-sm text-gray-500">
//             <strong>Quantity :</strong> {item.quantity}
//           </p>
//         </div>
//       </div>

//       <Divider />

//       <div className="px-5 py-2 flex justify-between items-center">
//         <div className="flex items-center gap-2 w-[140px] justify-between">
//           <Button
//             size="small"
//             disabled={item.quantity <= 1}
//             onClick={() => handleUpdateQuantity(-1)}
//           >
//             <RemoveIcon />
//           </Button>
//           <span className="px-3 font-semibold">{item.quantity}</span>
//           <Button size="small" onClick={() => handleUpdateQuantity(1)}>
//             <AddIcon />
//           </Button>
//         </div>
//         <div className="text-right">
//           <p className="text-gray-700 font-medium">₹{item.sellingPrice}</p>
//           {isCustom && extraCharge > 0 && (
//             <p className="text-[10px] text-purple-600 font-semibold">
//               (incl. ₹{extraCharge * item.quantity} custom)
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="absolute top-1 right-1">
//         <IconButton onClick={handleRemoveCartItem} color="primary">
//           <CloseIcon />
//         </IconButton>
//       </div>
//     </div>
//   );
// };

// export default CartItemCard;

















import { Button, Divider, IconButton } from "@mui/material";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import BrushIcon from "@mui/icons-material/Brush";
import type { CartItem } from "../../../types/cartTypes";
import { useAppDispatch } from "../../../Redux Toolkit/Store";
import {
  deleteCartItem,
  updateCartItem,
} from "../../../Redux Toolkit/Customer/CartSlice";
import { DEPLOYED_URL } from "../../../Config/Api";

interface CartItemProps {
  item: CartItem;
}

/* 🔥 Build image URL */
const buildUrl = (p?: string) => {
  if (!p) return "/placeholder.png";
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  return `${DEPLOYED_URL}${p.startsWith("/") ? p : `/${p}`}`;
};

const CartItemCard: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const cd: any = (item as any).customDesign || {};
  const raw: any = item as any;

  const compositeImg =
    cd.compositeImage ||
    cd.previewImage ||
    raw.compositeImage ||
    raw.previewImage ||
    null;

  const isCustom =
    cd.enabled === true || !!raw.compositeImage || !!raw.previewImage;

  const extraCharge: number =
    Number(cd.extraCharge) || Number(raw.extraCharge) || 0;

  const displayImage = isCustom
    ? compositeImg ||
      cd.originalImage ||
      raw.originalImage ||
      item.product?.images?.[0]
    : item.product?.images?.[0];

  const finalSrc = buildUrl(displayImage);

  /* 🔥 Get safe cart item ID */
  const getCartItemId = (): string | null => {
    const id = item?._id ? String(item._id) : "";
    if (!id || id === "undefined" || id === "null" || id.length === 0) {
      return null;
    }
    return id;
  };

  /* ═════════ UPDATE QUANTITY ═════════ */
  const handleUpdateQuantity = (value: number) => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;

    const cartItemId = getCartItemId();
    if (!cartItemId) {
      console.error("❌ Cart item _id missing:", item);
      alert("Item ID missing — page refresh karke try karo");
      return;
    }

    dispatch(
      updateCartItem({
        jwt,
        cartItemId,
        cartItem: { quantity: item.quantity + value },
      })
    );
  };

  /* ═════════ REMOVE ITEM ═════════ */
  const handleRemoveCartItem = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;

    const cartItemId = getCartItemId();
    if (!cartItemId) {
      console.error("❌ Cart item _id missing:", item);
      alert("Item ID missing — page refresh karke try karo");
      return;
    }

    dispatch(deleteCartItem({ jwt, cartItemId }));
  };

  return (
    <div className="border rounded-md relative bg-white">
      <div className="p-5 flex gap-4">
        {/* ═════════ IMAGE ═════════ */}
        <div className="relative flex-shrink-0">
          <img
            className={`w-[110px] h-[110px] rounded-md object-cover block ${
              isCustom ? "ring-2 ring-purple-400" : ""
            }`}
            src={finalSrc}
            alt={item.product?.title || "product"}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              const fallback = buildUrl(item.product?.images?.[0]);
              if (target.src !== fallback) target.src = fallback;
            }}
          />
          {isCustom && (
            <div className="absolute -top-2 -left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
              <BrushIcon sx={{ fontSize: 10 }} />
              CUSTOM
            </div>
          )}
        </div>

        {/* ═════════ DETAILS ═════════ */}
        <div className="space-y-2 flex-1 min-w-0">
          <p className="text-gray-600 font-medium text-sm">
            {item.product?.title || "Unnamed Product"}
          </p>

          {isCustom && (
            <div className="bg-purple-50 border border-purple-200 rounded-md px-2 py-1 inline-block">
              <p className="text-[11px] font-bold text-purple-700">
                🎨 Printed with your design
              </p>
              {extraCharge > 0 && (
                <p className="text-[10px] text-purple-600">
                  +₹{extraCharge} customization
                </p>
              )}
            </div>
          )}

          <p className="text-gray-400 text-xs">
            <strong>Sold by:</strong>{" "}
            {item.product?.seller?.businessDetails?.businessName || "Unknown"}
          </p>

          <p className="text-xs">
            <strong>5 days replacement</strong> available
          </p>

          <p className="text-sm text-gray-500">
            <strong>Quantity :</strong> {item.quantity}
          </p>
        </div>
      </div>

      <Divider />

      {/* ═════════ QUANTITY + PRICE ═════════ */}
      <div className="px-5 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2 w-[140px] justify-between">
          <Button
            size="small"
            disabled={item.quantity <= 1}
            onClick={() => handleUpdateQuantity(-1)}
          >
            <RemoveIcon />
          </Button>
          <span className="px-3 font-semibold">{item.quantity}</span>
          <Button size="small" onClick={() => handleUpdateQuantity(1)}>
            <AddIcon />
          </Button>
        </div>

        <div className="text-right">
          <p className="text-gray-700 font-medium">₹{item.sellingPrice}</p>
          {isCustom && extraCharge > 0 && (
            <p className="text-[10px] text-purple-600 font-semibold">
              (incl. ₹{extraCharge * item.quantity} custom)
            </p>
          )}
        </div>
      </div>

      {/* ═════════ REMOVE BUTTON ═════════ */}
      <div className="absolute top-1 right-1">
        <IconButton onClick={handleRemoveCartItem} color="primary">
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItemCard;