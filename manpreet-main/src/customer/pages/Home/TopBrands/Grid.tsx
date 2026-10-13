// import { useAppSelector } from "../../../../Redux Toolkit/Store";


// const TopBrand = () => {
//   const {homePage}=useAppSelector(store=>store)
//   return (
//     <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">
//       <div className=" col-span-3 row-span-12  text-white  rounded ">
//         <img
//           className="w-full h-full object-cover border-fuchsia-800 lg:border-[9px]s rounded-md"
//           src={homePage.homePageData?.grid[0].image}
//           alt=""
//         />
//       </div>

//       <div className="col-span-2 row-span-6  text-white rounded">
//         <img
//           className="w-full h-full object-cover border-fuchsia-800 lg:border-[9px]s rounded-md"
//           src={homePage.homePageData?.grid[1].image}
//           alt=""
//         />
//       </div>

//       <div className="col-span-4 row-span-6  text-white  rounded ">
//         <img
//           className="w-full h-full object-cover object-top border-fuchsia-800 lg:border-[9px]s rounded-md"
//           src={homePage.homePageData?.grid[2].image}
//           alt=""
//         />
//       </div>

//       <div className="col-span-3 row-span-12  text-white  rounded ">
//         <img
//           className="w-full h-full object-cover object-top border-fuchsia-800 lg:border-[9px]s rounded-md"
//           src={homePage.homePageData?.grid[3].image}
//           alt=""
//         />
//       </div>

//       <div className="col-span-4 row-span-6  text-white  rounded ">
//         <img
//           className="w-full h-full object-cover object-top border-fuchsia-800 lg:border-[9px]s rounded-md"
//           src={homePage.homePageData?.grid[4].image}
//           alt=""
//         />
//       </div>
//       <div className="col-span-2 row-span-6  text-white rounded ">
//         <img
//           className="w-full h-full object-cover border-fuchsia-800 lg:border-[9px]s rounded-md"
//           src={homePage.homePageData?.grid[5].image}
//           alt=""
//         />
//       </div>

//       {/* https://tristenwallace.com/wp-content/uploads/2022/06/wed-7.jpg */}
//     </div>
//   );
// };

// export default TopBrand;





import { useAppSelector } from "../../../../Redux Toolkit/Store";

const TopBrand = () => {
  const { homePage } = useAppSelector((store) => store);

  const grid = homePage?.homePageData?.grid || [];

  // ✅ Loading state
  if (!homePage?.homePageData) {
    return (
      <div className="text-center py-10 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  // ✅ No data state (DB empty)
  if (grid.length === 0) {
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        No Top Brand Data Found
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">

      {/* 1 */}
      {grid[0] && (
        <div className="col-span-3 row-span-12">
          <img
            className="w-full h-full object-cover rounded-md"
            src={grid[0]?.image || "/no-image.png"}
            alt="brand-1"
          />
        </div>
      )}

      {/* 2 */}
      {grid[1] && (
        <div className="col-span-2 row-span-6">
          <img
            className="w-full h-full object-cover rounded-md"
            src={grid[1]?.image || "/no-image.png"}
            alt="brand-2"
          />
        </div>
      )}

      {/* 3 */}
      {grid[2] && (
        <div className="col-span-4 row-span-6">
          <img
            className="w-full h-full object-cover rounded-md"
            src={grid[2]?.image || "/no-image.png"}
            alt="brand-3"
          />
        </div>
      )}

      {/* 4 */}
      {grid[3] && (
        <div className="col-span-3 row-span-12">
          <img
            className="w-full h-full object-cover rounded-md"
            src={grid[3]?.image || "/no-image.png"}
            alt="brand-4"
          />
        </div>
      )}

      {/* 5 */}
      {grid[4] && (
        <div className="col-span-4 row-span-6">
          <img
            className="w-full h-full object-cover rounded-md"
            src={grid[4]?.image || "/no-image.png"}
            alt="brand-5"
          />
        </div>
      )}

      {/* 6 */}
      {grid[5] && (
        <div className="col-span-2 row-span-6">
          <img
            className="w-full h-full object-cover rounded-md"
            src={grid[5]?.image || "/no-image.png"}
            alt="brand-6"
          />
        </div>
      )}

    </div>
  );
};

export default TopBrand;