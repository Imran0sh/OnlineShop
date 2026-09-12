import type { IProduct } from "./cartType";

export interface productStore {
  products: IProduct[];
  addProduct: (product: IProduct) => void;
  removeProduct: (id: number) => void;
  updateProduct: (id: number, product: IProduct) => void;

  cart: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: number) => void;
  updateCart: (id: number, product: IProduct) => void;
}
