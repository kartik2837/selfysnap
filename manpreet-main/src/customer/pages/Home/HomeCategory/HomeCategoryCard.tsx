// import "./HomeCategoryCard.css"
// import { useNavigate } from 'react-router-dom'

// const HomeCategoryCard = ({item}:any) => {
//   const navigate=useNavigate()
//   return (
//     <div onClick={()=>navigate(`/products/${item.categoryId}`)} className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>
//       <div className='custom-border w-[150px] lg:w-[249px] h-[150px] lg:h-[249px] rounded-full bg-blue-900'>
//         <img className='group-hover:scale-95 transition-transform transform duration-700  object-cover object-top h-full w-full' src={item.image} alt="" />
//       </div>
//         <h1 className='font-medium'>{item.name}</h1>
//     </div>
//   )
// }

// export default HomeCategoryCard






// src/customer/pages/Home/HomeCategory/HomeCategoryCard.tsx

import { useNavigate } from "react-router-dom";

const HomeCategoryCard = ({ item }: any) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${item.categoryId}`)}
      className="group flex-shrink-0 cursor-pointer w-[200px] sm:w-[220px] lg:w-[240px]"
      style={{
        animation: "fadeInUp 0.5s ease-out",
      }}
    >
      {/* ═══════════════════════════════════════════ */}
      {/* BIG CARD WITH ANIMATIONS */}
      {/* ═══════════════════════════════════════════ */}
      <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl hover:border-indigo-400 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03]">
        
        {/* ✨ Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-indigo-600/10 group-hover:via-purple-600/10 group-hover:to-pink-600/10 transition-all duration-500 z-10 pointer-events-none" />

        {/* 🖼️ Image Section - BIG */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <img
            className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
            src={item.image || "/placeholder.png"}
            alt={item.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=" +
                item.name;
            }}
          />

          {/* 🌟 Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

          {/* 🔥 Discount/Trending Badge */}
          {item.isTrending && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20 animate-pulse">
              🔥 Trending
            </div>
          )}

          {/* ❤️ Wishlist Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Add wishlist logic
            }}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 z-20 hover:bg-red-500 hover:text-white"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* 📝 Content Section */}
        <div className="relative p-4 bg-white">
          {/* Category Name - Bigger */}
          <h3 className="font-bold text-base lg:text-lg text-center text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-1 mb-1">
            {item.name}
          </h3>

          {/* Subtitle/Count */}
          <p className="text-xs text-gray-500 text-center mb-3">
            {item.productCount || "100+"} Products
          </p>

          {/* 🎯 Shop Now Button */}
          <div className="flex justify-center">
            <button className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105 flex items-center gap-1">
              <span className="relative z-10">Shop Now</span>
              <svg
                className="w-3 h-3 relative z-10 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>

              {/* Shimmer on Button */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </button>
          </div>

          {/* ✨ Bottom Animated Line */}
          <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transition-all duration-500 rounded-full" />
        </div>

        {/* ✨ Corner Decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 rounded-bl-full transition-all duration-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default HomeCategoryCard;