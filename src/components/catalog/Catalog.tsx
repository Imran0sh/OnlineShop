import productsData from "../../api/MOSK_ITEMS.json";
import { useSearchStore } from "../store/SerchStore";
import { ProductCard } from "@/components/shadcn-components/card-componentProductCard";
import type { IProduct } from "@/ types/cartType";
import CartWrapper from "@/components/Cart/CartWrapper";

const PRODUCTS: IProduct[] = productsData as IProduct[];

export default function Catalog() {
  const searchTerm = useSearchStore((state) => state.searchTerm);

  const filteredItems = PRODUCTS.filter(({ model }) =>
    model.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="catalog">
      <CartWrapper>
        {filteredItems.map((product) => (
          <ProductCard product={product} />
        ))}

        {/* error */}
        {filteredItems.length === 0 && (
          <p>Нечего не найдено по данному запросу</p>
        )}
      </CartWrapper>
    </div>
  );
}
