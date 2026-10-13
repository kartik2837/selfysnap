// import {type Product } from "./productTypes";
// import {type User } from "./userTypes";

// export interface CartItem {
//     _id: number;
//     cart?: Cart;
//     product: Product;
//     size: string;
//     quantity: number;
//     mrpPrice: number;
//     sellingPrice: number;
//     user_id: number;
// }


// export interface Cart {
//     _id: number;
//     user: User;
//     cartItems: CartItem[];
//     totalSellingPrice: number;
//     totalItem: number;
//     totalMrpPrice: number;
//     discount: number;
//     couponCode: string | null;
//   }










import { type Product } from "./productTypes";
import { type User } from "./userTypes";

export interface CustomDesignData {
  x: number;
  y: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  aspectRatio?: number;
}

export interface CustomDesign {
  enabled: boolean;
  originalImage?: string;
  previewImage?: string;
  printFile?: string;
  compositeImage?: string;
  designData?: CustomDesignData;
  extraCharge?: number;
}

export interface CartItem {
  _id: number | string;
  cart?: Cart;
  product: Product;
  size: string;
  quantity: number;
  mrpPrice: number;
  sellingPrice: number;
  user_id?: number | string;
  userId?: string;
  customDesign?: CustomDesign;
  createdAt?: string;
  updatedAt?: string;
}

export interface Cart {
  _id: number | string;
  user: User;
  cartItems: CartItem[];
  totalSellingPrice: number;
  totalItem: number;
  totalMrpPrice: number;
  discount: number;
  couponCode: string | null;
  couponPrice?: number;
}