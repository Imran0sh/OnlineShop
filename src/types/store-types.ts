import type { IProductInCart, IProduct } from "./cartType";

export interface productStore {
  products: IProduct[];
  addProduct: (product: IProduct) => void;
  removeProduct: (id: number) => void;
  updateProduct: (id: number, product: IProduct) => void;

  cart: IProductInCart[];
  addFromCart: (product: IProduct) => void;
  removeFromCart: (id: number) => void;
  decreaseFromCart: (id: number) => void;
  updateCart: (id: number, product: IProductInCart) => void;
}
