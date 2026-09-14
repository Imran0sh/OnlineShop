import { useSearchStore } from "../../store.ts";
import { ProductCard } from "@/components/shadcn-components/card-componentProductCard";
import { useCartManager } from "../../hooks/useCartManager";

export default function Catalog() {
  const { products } = useCartManager();
  const searchTerm = useSearchStore((state) => state.searchTerm);

  const filteredItems = products.filter(({ model }) =>
    model.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="catalog">
      {filteredItems.map((product) => (
        <ProductCard product={product} />
      ))}

      {/* error */}
      {filteredItems.length === 0 && (
        <p>Нечего не найдено по данному запросу</p>
      )}
    </div>
  );
}
