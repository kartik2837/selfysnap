// // import {
// //   Button,
// //   Divider,
// //   FormControl,
// //   FormControlLabel,
// //   FormLabel,
// //   Radio,
// //   RadioGroup,
// // } from "@mui/material";
// // import { colors } from "../../../data/filter/color";
// // import { price } from "../../../data/filter/price";
// // import { discount } from "../../../data/filter/discount";
// // import { brands } from "../../../data/filter/brand";
// // import { useSearchParams } from "react-router-dom";
// // import { useState } from "react";

// // const FilterSection = () => {
// //   const [expendColor, setExpendColor] = useState(false);
// //   const [expendBrand, setExpendBrand] = useState(false);

// //   const [searchParams, setSearchParams] = useSearchParams();

// //   const handleExpendColor = () => {
// //     setExpendColor(!expendColor);
// //   };

// //   const handleExpendBrand = () => {
// //     setExpendBrand(!expendBrand);
// //   };

// //   const updateFilterParams = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { value, name } = e.target;
// //     if (value) {
// //       searchParams.set(name, value);
// //     } else {
// //       searchParams.delete(name);
// //     }
// //     setSearchParams(searchParams);
// //   };

// //   const clearAllFilters = () => {
// //     searchParams.forEach((_, key) => {
// //       searchParams.delete(key);
// //     });
// //     setSearchParams(searchParams);
// //   };

// //   return (
// //     <div className="-z-50 space-y-5 bg-white">
// //       {/* Header */}
// //       <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
// //         <p className="text-lg font-semibold">Filters</p>
// //         <Button
// //           onClick={clearAllFilters}
// //           size="small"
// //           className="text-orange-500 cursor-pointer font-semibold"
// //         >
// //           clear all
// //         </Button>
// //       </div>

// //       <Divider />

// //       <div className="px-9 space-y-6">
// //         {/* Brand Section */}
// //         <section>
// //           <FormControl sx={{ zIndex: 0 }}>
// //             <FormLabel
// //               sx={{
// //                 fontSize: "16px",
// //                 fontWeight: "bold",
// //                 pb: "14px",
// //                 color: "#ff864a",
// //               }}
// //               className="text-2xl font-semibold "
// //               id="brand"
// //             >
// //               Brand
// //             </FormLabel>
// //             <RadioGroup
// //               name="brand"
// //               onChange={updateFilterParams}
// //               aria-labelledby="brand"
// //               defaultValue=""
// //             >
// //               {brands
// //                 .slice(0, expendBrand ? brands.length : 5)
// //                 .map((item) => (
// //                   <FormControlLabel
// //                     key={item.name}
// //                     value={item.value}
// //                     control={<Radio size="small" />}
// //                     label={item.name}
// //                   />
// //                 ))}
// //             </RadioGroup>
// //           </FormControl>
// //           <div>
// //             {brands.length > 5 && (
// //               <button
// //                 onClick={handleExpendBrand}
// //                 className="text-orange-500 cursor-pointer hover:text-orange-600 flex items-center"
// //               >
// //                 {expendBrand ? "hide" : `+ ${brands.length - 5} more`}
// //               </button>
// //             )}
// //           </div>
// //         </section>

// //         <Divider />

// //         {/* Color Section */}
// //         <section>
// //           <FormControl sx={{ zIndex: 0 }}>
// //             <FormLabel
// //               sx={{
// //                 fontSize: "16px",
// //                 fontWeight: "bold",
// //                 pb: "14px",
// //                 color: "#ff864a",
// //               }}
// //               className="text-2xl font-semibold"
// //               id="color"
// //             >
// //               Color
// //             </FormLabel>
// //             <RadioGroup
// //               name="color"
// //               onChange={updateFilterParams}
// //               aria-labelledby="color"
// //               defaultValue=""
// //             >
// //               {colors
// //                 .slice(0, expendColor ? colors.length : 5)
// //                 .map((item) => (
// //                   <FormControlLabel
// //                     sx={{ fontSize: "12px" }}
// //                     key={item.name}
// //                     value={item.name}
// //                     control={<Radio size="small" />}
// //                     label={
// //                       <div className="flex items-center gap-3">
// //                         <p>{item.name}</p>
// //                         <span
// //                           style={{ backgroundColor: item.hex }}
// //                           className={`h-5 w-5 rounded-full border`}
// //                         ></span>
// //                       </div>
// //                     }
// //                   />
// //                 ))}
// //             </RadioGroup>
// //           </FormControl>
// //           <div>
// //             {colors.length > 5 && (
// //               <button
// //                 onClick={handleExpendColor}
// //                 className="text-orange-500 cursor-pointer hover:text-orange-600 flex items-center"
// //               >
// //                 {expendColor ? "hide" : `+ ${colors.length - 5} more`}
// //               </button>
// //             )}
// //           </div>
// //         </section>

// //         <Divider />

// //         {/* Price Section */}
// //         <section>
// //           <FormControl>
// //             <FormLabel
// //               sx={{
// //                 fontSize: "16px",
// //                 fontWeight: "bold",
// //                 pb: "14px",
// //                 color: "#ff864a",
// //               }}
// //               className="text-2xl font-semibold"
// //               id="price"
// //             >
// //               Price
// //             </FormLabel>
// //             <RadioGroup
// //               name="price"
// //               onChange={updateFilterParams}
// //               aria-labelledby="price"
// //               defaultValue=""
// //             >
// //               {price.map((item) => (
// //                 <FormControlLabel
// //                   key={item.name}
// //                   value={item.value}
// //                   control={<Radio size="small" />}
// //                   label={item.name}
// //                 />
// //               ))}
// //             </RadioGroup>
// //           </FormControl>
// //         </section>

// //         <Divider />

// //         {/* Discount Section */}
// //         <section>
// //           <FormControl>
// //             <FormLabel
// //               sx={{
// //                 fontSize: "16px",
// //                 fontWeight: "bold",
// //                 pb: "14px",
// //                 color: "#ff864a",
// //               }}
// //               className="text-2xl font-semibold"
// //               id="discount"
// //             >
// //               Discount
// //             </FormLabel>
// //             <RadioGroup
// //               name="discount"
// //               onChange={updateFilterParams}
// //               aria-labelledby="discount"
// //               defaultValue=""
// //             >
// //               {discount.map((item) => (
// //                 <FormControlLabel
// //                   key={item.name}
// //                   value={item.value}
// //                   control={<Radio size="small" />}
// //                   label={item.name}
// //                 />
// //               ))}
// //             </RadioGroup>
// //           </FormControl>
// //         </section>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FilterSection;













// import {
//   Button,
//   Divider,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Radio,
//   RadioGroup,
// } from "@mui/material";
// import { colors } from "../../../data/filter/color";
// import { price } from "../../../data/filter/price";
// import { discount } from "../../../data/filter/discount";
// import { brands } from "../../../data/filter/brand";
// import { useSearchParams } from "react-router-dom";
// import { useState } from "react";

// // Safe fallbacks in case any import is undefined (build safety)
// const safeColors = colors || [];
// const safePrice = price || [];
// const safeDiscount = discount || [];
// const safeBrands = brands || [];

// const FilterSection = () => {
//   const [expendColor, setExpendColor] = useState(false);
//   const [expendBrand, setExpendBrand] = useState(false);

//   const [searchParams, setSearchParams] = useSearchParams();

//   const handleExpendColor = () => setExpendColor(!expendColor);
//   const handleExpendBrand = () => setExpendBrand(!expendBrand);

//   const updateFilterParams = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, name } = e.target;
//     if (value) {
//       searchParams.set(name, value);
//     } else {
//       searchParams.delete(name);
//     }
//     setSearchParams(searchParams);
//   };

//   const clearAllFilters = () => {
//     searchParams.forEach((_, key) => {
//       searchParams.delete(key);
//     });
//     setSearchParams(searchParams);
//   };

//   return (
//     <div className="-z-50 space-y-5 bg-white">
//       {/* Header */}
//       <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
//         <p className="text-lg font-semibold">Filters</p>
//         <Button
//           onClick={clearAllFilters}
//           size="small"
//           className="text-orange-500 cursor-pointer font-semibold"
//         >
//           clear all
//         </Button>
//       </div>

//       <Divider />

//       <div className="px-9 space-y-6">
//         {/* Brand Section */}
//         <section>
//           <FormControl sx={{ zIndex: 0 }}>
//             <FormLabel
//               sx={{
//                 fontSize: "16px",
//                 fontWeight: "bold",
//                 pb: "14px",
//                 color: "#ff864a",
//               }}
//               id="brand"
//             >
//               Brand
//             </FormLabel>
//             <RadioGroup
//               name="brand"
//               onChange={updateFilterParams}
//               aria-labelledby="brand"
//               defaultValue=""
//             >
//               {safeBrands
//                 .slice(0, expendBrand ? safeBrands.length : 5)
//                 .map((item) => (
//                   <FormControlLabel
//                     key={item.name}
//                     value={item.value}
//                     control={<Radio size="small" />}
//                     label={item.name}
//                   />
//                 ))}
//             </RadioGroup>
//           </FormControl>
//           {safeBrands.length > 5 && (
//             <button
//               onClick={handleExpendBrand}
//               className="text-orange-500 cursor-pointer hover:text-orange-600 flex items-center mt-1"
//             >
//               {expendBrand ? "hide" : `+ ${safeBrands.length - 5} more`}
//             </button>
//           )}
//         </section>

//         <Divider />

//         {/* Color Section */}
//         <section>
//           <FormControl sx={{ zIndex: 0 }}>
//             <FormLabel
//               sx={{
//                 fontSize: "16px",
//                 fontWeight: "bold",
//                 pb: "14px",
//                 color: "#ff864a",
//               }}
//               id="color"
//             >
//               Color
//             </FormLabel>
//             <RadioGroup
//               name="color"
//               onChange={updateFilterParams}
//               aria-labelledby="color"
//               defaultValue=""
//             >
//               {safeColors
//                 .slice(0, expendColor ? safeColors.length : 5)
//                 .map((item) => (
//                   <FormControlLabel
//                     key={item.name}
//                     value={item.name}
//                     control={<Radio size="small" />}
//                     label={
//                       <div className="flex items-center gap-3">
//                         <p>{item.name}</p>
//                         <span
//                           style={{ backgroundColor: item.hex }}
//                           className="h-5 w-5 rounded-full border"
//                         ></span>
//                       </div>
//                     }
//                   />
//                 ))}
//             </RadioGroup>
//           </FormControl>
//           {safeColors.length > 5 && (
//             <button
//               onClick={handleExpendColor}
//               className="text-orange-500 cursor-pointer hover:text-orange-600 flex items-center mt-1"
//             >
//               {expendColor ? "hide" : `+ ${safeColors.length - 5} more`}
//             </button>
//           )}
//         </section>

//         <Divider />

//         {/* Price Section */}
//         <section>
//           <FormControl>
//             <FormLabel
//               sx={{
//                 fontSize: "16px",
//                 fontWeight: "bold",
//                 pb: "14px",
//                 color: "#ff864a",
//               }}
//               id="price"
//             >
//               Price
//             </FormLabel>
//             <RadioGroup
//               name="price"
//               onChange={updateFilterParams}
//               aria-labelledby="price"
//               defaultValue=""
//             >
//               {safePrice.map((item) => (
//                 <FormControlLabel
//                   key={item.name}
//                   value={item.value}
//                   control={<Radio size="small" />}
//                   label={item.name}
//                 />
//               ))}
//             </RadioGroup>
//           </FormControl>
//         </section>

//         <Divider />

//         {/* Discount Section - FIXED: convert value to string */}
//         <section>
//           <FormControl>
//             <FormLabel
//               sx={{
//                 fontSize: "16px",
//                 fontWeight: "bold",
//                 pb: "14px",
//                 color: "#ff864a",
//               }}
//               id="discount"
//             >
//               Discount
//             </FormLabel>
//             <RadioGroup
//               name="discount"
//               onChange={updateFilterParams}
//               aria-labelledby="discount"
//               defaultValue=""
//             >
//               {safeDiscount.map((item) => (
//                 <FormControlLabel
//                   key={item.name}
//                   value={String(item.value)}  // ✅ Convert number to string
//                   control={<Radio size="small" />}
//                   label={item.name}
//                 />
//               ))}
//             </RadioGroup>
//           </FormControl>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default FilterSection;










import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Redux Toolkit/Store";

interface Category {
  categoryId: string;
  name: string;
  level: number;
  parentCategoryId?: string | null;
}

const FilterSection = () => {
  const navigate = useNavigate();
  const { categories } = useAppSelector((store: any) => store.mainCategory);

  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [expandedSub, setExpandedSub] = useState<string | null>(null);

  const levelOne = categories.filter((cat: Category) => cat.level === 1);

  const getLevelTwo = (parentId: string): Category[] =>
    categories.filter(
      (cat: Category) =>
        cat.level === 2 && cat.parentCategoryId === parentId
    );

  const getLevelThree = (parentId: string): Category[] =>
    categories.filter(
      (cat: Category) =>
        cat.level === 3 && cat.parentCategoryId === parentId
    );

  const handleLevelOneClick = (catId: string) => {
    setExpandedCat((prev) => (prev === catId ? null : catId));
    setExpandedSub(null);
    navigate("/products/" + catId);
  };

  const handleLevelTwoClick = (catId: string) => {
    setExpandedSub((prev) => (prev === catId ? null : catId));
    navigate("/products/" + catId);
  };

  const handleLevelThreeClick = (catId: string) => {
    navigate("/products/" + catId);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col overflow-hidden">
      {/* Header — fixed, scroll nahi hoga */}
      <div className="px-5 py-4 bg-gradient-to-r from-orange-50 to-white border-b border-gray-100 flex-shrink-0">
        <h2 className="text-lg font-bold text-gray-800 tracking-wide">
          Categories
        </h2>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 scrollbar-thin">
        <ul className="space-y-1">
          {levelOne.map((cat: Category) => {
            const levelTwoList = getLevelTwo(cat.categoryId);
            const isCatOpen = expandedCat === cat.categoryId;

            return (
              <li key={cat.categoryId}>
                {/* Level 1 */}
                <button
                  onClick={() => handleLevelOneClick(cat.categoryId)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isCatOpen
                      ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                      : "bg-gray-50 text-gray-800 hover:bg-orange-50 hover:text-[#df6b3c]"
                  }`}
                >
                  <span className="text-sm font-bold tracking-wide uppercase">
                    {cat.name}
                  </span>
                  {levelTwoList.length > 0 && (
                    <span
                      className={`text-lg font-bold transition-transform duration-200 ${
                        isCatOpen ? "rotate-180" : ""
                      }`}
                    >
                      {isCatOpen ? "−" : "+"}
                    </span>
                  )}
                </button>

                {/* Level 2 */}
                {isCatOpen && levelTwoList.length > 0 && (
                  <ul className="mt-2 ml-3 space-y-1 border-l-2 border-orange-300 pl-3">
                    {levelTwoList.map((sub: Category) => {
                      const levelThreeList = getLevelThree(sub.categoryId);
                      const isSubOpen = expandedSub === sub.categoryId;

                      return (
                        <li key={sub.categoryId}>
                          <button
                            onClick={() => handleLevelTwoClick(sub.categoryId)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-all duration-200 ${
                              isSubOpen
                                ? "bg-orange-100 text-[#df6b3c] font-bold"
                                : "text-gray-700 font-semibold hover:bg-orange-50 hover:text-[#df6b3c]"
                            }`}
                          >
                            <span className="text-[13px] tracking-wide">
                              {sub.name}
                            </span>
                            {levelThreeList.length > 0 && (
                              <span className="text-sm font-bold">
                                {isSubOpen ? "−" : "+"}
                              </span>
                            )}
                          </button>

                          {/* Level 3 */}
                          {isSubOpen && levelThreeList.length > 0 && (
                            <ul className="mt-1 ml-2 space-y-0.5 border-l border-gray-200 pl-3">
                              {levelThreeList.map((child: Category) => (
                                <li key={child.categoryId}>
                                  <button
                                    onClick={() =>
                                      handleLevelThreeClick(child.categoryId)
                                    }
                                    className="w-full text-left px-2 py-1.5 rounded text-[12px] font-medium text-gray-600 hover:text-[#df6b3c] hover:bg-orange-50 transition-all duration-200"
                                  >
                                    • {child.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FilterSection;



