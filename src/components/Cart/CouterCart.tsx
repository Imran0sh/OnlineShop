import { useProductStore } from "@/store";
import { ShoppingCart } from "lucide-react";

export default function CounterCart() {
  const cart = useProductStore((state) => state.cart);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className="relative inline-flex">
      <ShoppingCart className="w-6 h-6" />
      <span className="absolute -right-2 -top-2 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white font-medium">
        {cartCount}
      </span>
    </div>
  );
}
