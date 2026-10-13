// import SimilarProductCard from "./SimilarProductCard";
// import {
//   useAppDispatch,
//   useAppSelector,
// } from "../../../../Redux Toolkit/Store";
// import { useEffect } from "react";
// import { getAllProducts } from "../../../../Redux Toolkit/Customer/ProductSlice";
// import { useParams } from "react-router-dom";

// const SmilarProduct = () => {
//   const { products } = useAppSelector((store) => store);
//   const dispatch = useAppDispatch();
//   const { categoryId } = useParams();

//   useEffect(() => {
//     if (categoryId) {
//       dispatch(getAllProducts({ category: categoryId }));
//     }
//   }, [categoryId, dispatch]);
//   return (
//     <div>
     
//       <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-between gap-4 gap-y-8">
//         {products.products.map((item) => (
//           <div key={item._id} className="">
//             <SimilarProductCard product={item} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SmilarProduct;





// // src/customer/pages/Product/SimilarProduct/SmilarProduct.tsx

// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
// import { useNavigate, useParams } from "react-router-dom";
// import { getAllProducts } from "../../../../Redux Toolkit/Customer/ProductSlice";

// const SmilarProduct: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { products } = useAppSelector((store: any) => store);
//   const { productId, categoryId } = useParams<{ productId: string; categoryId: string }>();

//   // ✅ Current Product की Category निकालें
//   const currentProduct = products?.product;

//   // ✅ Category ID - पहले URL से, वरना Product के अंदर से
//   const actualCategoryId =
//     categoryId ||
//     (typeof currentProduct?.category === "object"
//       ? currentProduct?.category?._id
//       : currentProduct?.category) ||
//     currentProduct?.categoryId;

//   // ═══════════════════════════════════════════════
//   // 📥 FETCH PRODUCTS BY CATEGORY
//   // ═══════════════════════════════════════════════
//   useEffect(() => {
//     if (actualCategoryId) {
//       console.log("🔍 Fetching similar products for category:", actualCategoryId);
//       dispatch(getAllProducts({ category: actualCategoryId }) as any);
//     } else {
//       console.log("❌ No Category ID found!");
//       console.log("currentProduct:", currentProduct);
//     }
//   }, [actualCategoryId, dispatch]);

//   // ✅ Current product हटाएँ
//   const allProducts = products?.products || [];
//   const similarProducts = allProducts.filter(
//     (item: any) => item._id !== productId
//   );

//   console.log("🔍 All Products:", allProducts.length);
//   console.log("🔍 Similar Products:", similarProducts.length);

//   // ═══════════════════════════════════════════════
//   // 🎯 EMPTY STATE
//   // ═══════════════════════════════════════════════
//   if (similarProducts.length === 0) {
//     return (
//       <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-xl">
//         <div className="text-5xl mb-3"></div>
//         <p className="text-lg font-semibold text-gray-600">
//           product Not Found
//         </p>
//         <p className="text-sm mt-1">
//           {actualCategoryId
//             ? " Category is not found"
//             : "Category Not found"}
//         </p>
//       </div>
//     );
//   }

//   // ═══════════════════════════════════════════════
//   // 🎴 SIMILAR PRODUCTS GRID
//   // ═══════════════════════════════════════════════
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//       {similarProducts.map((item: any) => (
//         <SimilarProductCard
//           key={item._id}
//           item={item}
//           onClick={() =>
//             navigate(
//               `/product-details/${item.categoryId || item.category?._id || item.category}/${item._id}`
//             )
//           }
//         />
//       ))}
//     </div>
//   );
// };

// // ═══════════════════════════════════════════════
// // 🎴 Similar Product Card Component
// // ═══════════════════════════════════════════════
// const SimilarProductCard = ({ item, onClick }: { item: any; onClick: () => void }) => {
//   const getImageUrl = (): string => {
//     if (Array.isArray(item?.images) && item.images.length > 0) {
//       return item.images[0];
//     }
//     return "https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=No+Image";
//   };

//   const discount =
//     item.discountPercent ||
//     (item.mrpPrice && item.sellingPrice
//       ? Math.round(((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100)
//       : 0);

//   return (
//     <div
//       onClick={onClick}
//       className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
//     >
//       {/* Image */}
//       <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-3 overflow-hidden">
//         <img
//           src={getImageUrl()}
//           alt={item.title}
//           className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
//           onError={(e) => {
//             (e.target as HTMLImageElement).src =
//               "https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=No+Image";
//           }}
//         />

//         {discount > 0 && (
//           <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
//             {discount}% OFF
//           </div>
//         )}

//         <div className="absolute bottom-2 right-2 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
//           <span>{item.rating?.toFixed(1) || "4.3"}</span>
//           <span className="text-[8px]">★</span>
//         </div>
//       </div>

//       <div className="p-3 space-y-1">
//         {item.brand && (
//           <p className="text-[10px] text-gray-500 uppercase font-semibold truncate">
//             {item.brand}
//           </p>
//         )}

//         <h3 className="text-xs font-medium text-gray-800 line-clamp-2 min-h-[2rem]">
//           {item.title}
//         </h3>

//         <div className="flex items-baseline gap-1.5 flex-wrap pt-1">
//           <span className="text-sm font-bold text-gray-900">
//             ₹{item.sellingPrice?.toFixed(0) || 0}
//           </span>
//           {item.mrpPrice && item.mrpPrice > (item.sellingPrice || 0) && (
//             <span className="text-[10px] text-gray-400 line-through">
//               ₹{item.mrpPrice.toFixed(0)}
//             </span>
//           )}
//         </div>

//         <p className="text-[10px] text-gray-500">FREE Delivery</p>
//       </div>
//     </div>
//   );
// };

// export default SmilarProduct;

























// src/customer/pages/Product/SimilarProduct/SmilarProduct.tsx

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
import { useNavigate, useParams } from "react-router-dom";
import { getAllProducts } from "../../../../Redux Toolkit/Customer/ProductSlice";

/* ═══════════════════════════════════════════════
   🔥 Safe helpers
   ═══════════════════════════════════════════════ */
const getText = (val: any): string => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object") return val.name || val.title || "";
  return String(val);
};

const getCategoryId = (item: any): string => {
  if (item?.categoryId) return String(item.categoryId);
  const c = item?.category;
  if (!c) return "all";
  if (typeof c === "string") return c;
  if (typeof c === "object") return c.categoryId || c._id || "all";
  return "all";
};

const SmilarProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products } = useAppSelector((store: any) => store);
  const { productId, categoryId } = useParams<{
    productId: string;
    categoryId: string;
  }>();

  const currentProduct = products?.product;

  const actualCategoryId =
    categoryId ||
    (typeof currentProduct?.category === "object"
      ? currentProduct?.category?._id
      : currentProduct?.category) ||
    currentProduct?.categoryId;

  useEffect(() => {
    if (actualCategoryId) {
      dispatch(getAllProducts({ category: actualCategoryId }) as any);
    }
  }, [actualCategoryId, dispatch]);

  const allProducts = products?.products || [];
  const similarProducts = allProducts.filter(
    (item: any) => item._id !== productId
  );

  if (similarProducts.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-xl">
        <div className="text-5xl mb-3">📦</div>
        <p className="text-lg font-semibold text-gray-600">
          Product Not Found
        </p>
        <p className="text-sm mt-1">
          {actualCategoryId
            ? "Similar products not available"
            : "Category not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {similarProducts.map((item: any) => (
        <SimilarProductCard
          key={item._id}
          item={item}
          onClick={() => {
            const catId = getCategoryId(item);
            const title = encodeURIComponent(item.title || "product");
            navigate(`/product-details/${catId}/${title}/${item._id}`);
          }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════
   🎴 Similar Product Card
   ═══════════════════════════════════════════════ */
const SimilarProductCard = ({
  item,
  onClick,
}: {
  item: any;
  onClick: () => void;
}) => {
  const getImageUrl = (): string => {
    if (Array.isArray(item?.images) && item.images.length > 0) {
      return item.images[0];
    }
    return "https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=No+Image";
  };

  const brandName = getText(item.brand);

  const discount =
    item.discountPercent ||
    (item.mrpPrice && item.sellingPrice
      ? Math.round(((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100)
      : 0);

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
    >
      <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-3 overflow-hidden">
        <img
          src={getImageUrl()}
          alt={item.title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=No+Image";
          }}
        />

        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            {discount}% OFF
          </div>
        )}

        <div className="absolute bottom-2 right-2 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
          <span>{item.rating?.toFixed(1) || "4.3"}</span>
          <span className="text-[8px]">★</span>
        </div>
      </div>

      <div className="p-3 space-y-1">
        {brandName && (
          <p className="text-[10px] text-gray-500 uppercase font-semibold truncate">
            {brandName}
          </p>
        )}

        <h3 className="text-xs font-medium text-gray-800 line-clamp-2 min-h-[2rem]">
          {item.title}
        </h3>

        <div className="flex items-baseline gap-1.5 flex-wrap pt-1">
          <span className="text-sm font-bold text-gray-900">
            ₹{item.sellingPrice?.toFixed(0) || 0}
          </span>
          {item.mrpPrice && item.mrpPrice > (item.sellingPrice || 0) && (
            <span className="text-[10px] text-gray-400 line-through">
              ₹{item.mrpPrice.toFixed(0)}
            </span>
          )}
        </div>

        <p className="text-[10px] text-gray-500">FREE Delivery</p>
      </div>
    </div>
  );
};

export default SmilarProduct;