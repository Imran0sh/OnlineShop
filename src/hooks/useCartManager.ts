import { useProductStore } from "@/store";
import { useCallback } from "react";
import type { IProduct } from "@/types/cartType";

export function useCartManager() {
  const products = useProductStore((state) => state.products);
  const cart = useProductStore((state) => state.cart);
  const addToCart = useProductStore((state) => state.addFromCart);
  const removeFromCart = useProductStore((state) => state.removeFromCart);
  {
    /*const updateCart = useProductStore((state) => state.updateCart);
    const removeProduct = useProductStore((state) => state.removeProduct);*/
  }
  const decreaseFromCart = useProductStore((state) => state.decreaseFromCart);
  const addFromCart = useProductStore((state) => state.addFromCart);

  const addProduct = useCallback(
    (product: IProduct) => {
      addToCart(product);
    },
    [addToCart],
  );

  return {
    products,
    cart,
    addProduct,
    removeFromCart,
    decreaseFromCart,
    addFromCart,
  };
}
