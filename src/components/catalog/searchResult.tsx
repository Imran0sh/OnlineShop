import { useEffect } from "react";

export interface SearchResult {
  id: number;
  slug: string;
  model: string;
  image: string[];
  price: number;
  description: string;
  type: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isVisible: boolean;
  onResultClick: (item: SearchResult) => void;
  searchTerm: string;
}

export const SearchResults = ({
  results,
  isVisible,
  onResultClick,
  searchTerm,
}: SearchResultsProps) => {
  // Handle "Enter" key to open the first result
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isVisible && results.length > 0 && e.key === "Enter") {
        onResultClick(results[0]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, results, onResultClick]);

  if (!isVisible || results.length === 0) return null;

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span
          key={index}
          className="text-indigo-400 font-bold decoration-indigo-400/30 underline-offset-2 underline"
        >
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
      {results.map((item) => (
        <a
          key={item.id}
          href={`/product/${item.slug}`}
          className="w-full text-left px-4 py-3 hover:bg-gray-100 transition flex flex-col"
        >
          <span className="font-medium">
            {highlightMatch(item.model, searchTerm)}
          </span>
          <span className="">
            {highlightMatch(item.description, searchTerm)}
          </span>

          <span className="text-sm text-gray-500">{item.price} ₸</span>
        </a>
      ))}
    </div>
  );
};
