import { useProductStore } from "@/components/store/ProductStore";
import { useCallback } from "react";
import type { IProduct } from "@/types/cartType";

export function useCartManager() {
  const products = useProductStore((state) => state.products);
  const cart = useProductStore((state) => state.cart);
  const addToCart = useProductStore((state) => state.addToCart);
  const removeFromCart = useProductStore((state) => state.removeFromCart);
  const updateCart = useProductStore((state) => state.updateCart);

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
  };
}
