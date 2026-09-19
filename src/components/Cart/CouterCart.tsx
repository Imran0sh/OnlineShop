import { useProductStore } from "@/store";

export default function CounterCart() {
  const cart = useProductStore((state) => state.cart);

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )
  return (
    <div>
      <span>{totalItems}</span>
    </div>
  );
}
