import useCart from "@/context/cart-context/useCart";
import type { IProduct } from "@/ types/cartType";

export default function useAddToCart() {
  const { addProduct, openCart } = useCart();

  const addToCart = (product: IProduct) => {
    addProduct({ ...product, quantity: 1 });
    openCart();
  };
  return { addToCart };
}
