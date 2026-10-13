import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Redux Toolkit/Store";
import { Divider } from "@mui/material";

interface Category {
  categoryId: string;
  name: string;
  level: number;
  parentCategoryId?: string | null;
}

const CategorySidebar = () => {
  const navigate = useNavigate();
  const { categories } = useAppSelector((store) => store.mainCategory);

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
    <div className="bg-white px-3 py-4 rounded-md shadow-sm">
      <p className="text-lg font-semibold px-2 pb-3">Categories</p>
      <Divider />

      <ul className="mt-3 space-y-0.5">
        {levelOne.map((cat: Category) => {
          const levelTwoList = getLevelTwo(cat.categoryId);
          const isCatOpen = expandedCat === cat.categoryId;

          return (
            <li key={cat.categoryId}>
              <button
                onClick={() => handleLevelOneClick(cat.categoryId)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left text-sm font-medium transition ${
                  isCatOpen
                    ? "bg-orange-50 text-[#df6b3c]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{cat.name}</span>
                {levelTwoList.length > 0 && (
                  <span className="text-gray-400 text-xs">
                    {isCatOpen ? "−" : "+"}
                  </span>
                )}
              </button>

              {isCatOpen && levelTwoList.length > 0 && (
                <ul className="ml-3 mt-1 space-y-0.5 border-l-2 border-orange-200 pl-2">
                  {levelTwoList.map((sub: Category) => {
                    const levelThreeList = getLevelThree(sub.categoryId);
                    const isSubOpen = expandedSub === sub.categoryId;

                    return (
                      <li key={sub.categoryId}>
                        <button
                          onClick={() => handleLevelTwoClick(sub.categoryId)}
                          className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-left text-xs font-medium transition ${
                            isSubOpen
                              ? "bg-orange-100 text-[#df6b3c]"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <span>{sub.name}</span>
                          {levelThreeList.length > 0 && (
                            <span className="text-gray-400 text-[10px]">
                              {isSubOpen ? "−" : "+"}
                            </span>
                          )}
                        </button>

                        {isSubOpen && levelThreeList.length > 0 && (
                          <ul className="ml-3 mt-0.5 space-y-0.5 border-l border-gray-200 pl-2">
                            {levelThreeList.map((child: Category) => (
                              <li key={child.categoryId}>
                                <button
                                  onClick={() =>
                                    handleLevelThreeClick(child.categoryId)
                                  }
                                  className="w-full text-left px-2 py-1 rounded text-[11px] text-gray-500 hover:text-[#df6b3c] hover:bg-gray-50 transition"
                                >
                                  {child.name}
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
  );
};

export default CategorySidebar;