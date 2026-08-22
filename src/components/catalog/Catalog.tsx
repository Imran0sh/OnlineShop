import productsData from "../../api/MOSK_ITEMS.json";
import { useSearchStore } from "../store/SerchStore";
import { ProductCard } from "@/components/shadcn-components/card-componentProductCard";

interface Products {
  id: number;
  slug: string;
  model: string;
  image: string[];
  price: number;
  description: string;
  type: string;
}

const PRODUCTS: Products[] = productsData as Products[];

export default function Catalog() {
  const searchTerm = useSearchStore((state) => state.searchTerm);

  const filteredItems = PRODUCTS.filter(({ model }) =>
    model.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="catalog">
      {filteredItems.map((product) => (
        <ProductCard
          title={product.model}
          type={product.type}
          image={product.image}
          slug={product.slug}
        />
      ))}

      {/* error */}
      {filteredItems.length === 0 && (
        <p>Нечего не найдено по данному запросу</p>
      )}
    </div>
  );
}
