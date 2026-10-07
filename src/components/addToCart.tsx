// AddToCart.tsx
import { useCartManager } from "@/hooks/useCartManager";
import type { IProduct } from "@/types/cartType";

interface Props {
  product: IProduct;
}

export default function AddToCart({ product }: Props) {
  const { addProduct } = useCartManager();

  return (
    <div>
      <button
        onClick={() => addProduct(product)}
        className="bg-neutral-800 text-white p-2 rounded transition-all active:scale-95 active:opacity-70"
      >
        Добавить в корзину
      </button>
    </div>
  );
}
