import { useProductStore } from "@/store";
import { ShoppingCart } from "lucide-react";

export default function CounterCart() {
  const cart = useProductStore((state) => state.cart);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div>
      <ShoppingCart>
        <span>{totalItems}</span>
      </ShoppingCart>
    </div>
  );
}
