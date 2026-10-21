import { useSearchStore } from "../../store.ts";
import { SearchResults } from "./SearchResult.tsx";
import { getProducts } from "../../lib/getProducts.ts";
import type { SearchResult } from "./SearchResult.tsx";
import { useEffect, useState } from "react";

export default function HederSearch() {
  const { searchTerm, setSearchTerm } = useSearchStore();
  const [products, setProducts] = useState<SearchResult[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        console.log("Товары из Supabase:", data);
        console.log("Количество товаров:", data?.length);
        setProducts(data ?? []);
      })
      .catch((error) => console.error(error));
  }, []);

  const results = products.filter(({ model }) =>
    model.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  console.log("results", results);
  console.log("products", products);

  const isVisible = searchTerm.trim() !== "" && results.length > 0;

  const onResultClick = (item: SearchResult) => {
    window.location.href = `/product/${item.slug}`;
  };

  return (
    <div className="relative grow">
      <input
        type="text"
        placeholder="Поиск товаров"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="outline-none w-full"
      />

      <SearchResults
        results={results}
        isVisible={isVisible}
        onResultClick={onResultClick}
        searchTerm={searchTerm}
      />
    </div>
  );
}
