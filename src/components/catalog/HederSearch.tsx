import { useSearchStore } from "../../store.ts";
import { SearchResults } from "./SearchResult.tsx";
import productList from "../../api/MOSK_ITEMS.json";
import type { SearchResult } from "./SearchResult.tsx";

export default function HederSearch() {
  const { searchTerm, setSearchTerm } = useSearchStore();

  const results = productList.filter(({ model }) =>
    model.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
