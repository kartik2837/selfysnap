// export interface HomeSection {
//   _id: string;
//   title: string;
//   category: string; // MainCategory ObjectId
//   tag: "bestseller" | "popular" | "seasonal";
//   layout: "slider" | "grid";
//   limit: number;
//   order: number;
//   isActive: boolean;
//   createdAt?: string;
//   updatedAt?: string;
// }







// src/types/homeSectionType.ts

export interface HomeSection {
  _id: string;
  title: string;
  category: string | any;
  tag: string;

  // ✅ ये Fields ADD करें - यही Red Errors का कारण है
  layout: string;
  cardStyle: string;
  bgColor: string;
  accentColor: string;
  showSeeMore: boolean;

  limit: number;
  order: number;
  isActive: boolean;

  // Optional
  products?: any[];
  createdAt?: string;
  updatedAt?: string;
}