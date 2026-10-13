
// import HomeCategoryCard from './HomeCategoryCard'
// import { useAppSelector } from '../../../../Redux Toolkit/Store';


// const HomeCategory = () => {
//   const { homePage} = useAppSelector((store) => store);
//   return (
//     <div className='flex justify-center gap-7 flex-wrap '>
//         {homePage.homePageData?.shopByCategories.map((item)=><HomeCategoryCard item={item}/>)}
        
//     </div>
//   )
// }

// export default HomeCategory





// src/customer/pages/Home/HomeCategory/HomeCategory.tsx

import { useRef } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../Redux Toolkit/Store";
import HomeCategoryCard from "./HomeCategoryCard";

const HomeCategory = () => {
  const { homePage } = useAppSelector((store) => store);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const allCategories = homePage.homePageData?.shopByCategories || [];

  if (allCategories.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        कोई Category नहीं है
      </div>
    );
  }

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "left" ? -600 : 600,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full">
      {/* ═══════════════════════════════════════════ */}
      {/* HORIZONTAL SCROLL SLIDER */}
      {/* ═══════════════════════════════════════════ */}
      <div className="relative group/slider">
        {/* Left Arrow */}
        <IconButton
          onClick={() => scroll("left")}
          className="!absolute !left-0 !top-1/2 !-translate-y-1/2 !z-20 !bg-white !shadow-lg opacity-0 group-hover/slider:opacity-100 transition-opacity"
          sx={{
            width: 44,
            height: 44,
            border: "1px solid #e5e7eb",
            "&:hover": { bgcolor: "#f3f4f6" },
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
        </IconButton>

        {/* Categories - Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-4 lg:gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* ✅ सभी Categories */}
          {allCategories.map((item: any, index: number) => (
            <HomeCategoryCard key={item._id || index} item={item} />
          ))}

          {/* ✅ View All Card (सबसे आखिर में) */}
          <div
            onClick={() => navigate("/categories")}
            className="group flex-shrink-0 cursor-pointer w-[140px] sm:w-[150px] lg:w-[160px]"
          >
            <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full">
              <div className="aspect-square flex flex-col items-center justify-center gap-2 p-3">
                <div className="bg-white/20 backdrop-blur rounded-full p-3">
                  <ArrowForwardIcon
                    sx={{ color: "white", fontSize: 32 }}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
                <span className="text-white text-xl font-bold">
                  {allCategories.length}+
                </span>
                <span className="text-white/90 text-xs font-medium">
                  Categories
                </span>
              </div>

              <div className="p-2.5 bg-white/10 backdrop-blur border-t border-white/20">
                <h3 className="font-bold text-xs lg:text-sm text-center text-white">
                  View All →
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <IconButton
          onClick={() => scroll("right")}
          className="!absolute !right-0 !top-1/2 !-translate-y-1/2 !z-20 !bg-white !shadow-lg opacity-0 group-hover/slider:opacity-100 transition-opacity"
          sx={{
            width: 44,
            height: 44,
            border: "1px solid #e5e7eb",
            "&:hover": { bgcolor: "#f3f4f6" },
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </div>

      {/* Hide Scrollbar CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `,
        }}
      />
    </div>
  );
};

export default HomeCategory;