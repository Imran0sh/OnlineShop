//нахуй не нужен использовать лояут
import { CartProvider } from "@/context/cart-context/CartContextProvider";
import Cart from "./Cart";
import type { ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

export default function CartWrapper({ children }: IProps) {
  return (
    <CartProvider>
      <Cart />
      {children}
    </CartProvider>
  );
}
