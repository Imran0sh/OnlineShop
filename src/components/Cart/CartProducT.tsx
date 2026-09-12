import type { IProduct } from "@/types/cartType";
import { useCartManager } from "@/hooks/useCartManager";
import productsData from "@/api/MOSK_ITEMS.json";

export default function ProductList() {
  // Fetch product data from the API and convert it into an array of `IProduct`.
  const products = productsData as IProduct[];

  // Get the `addCart` function from the cart store.
  const { addProduct } = useCartManager();

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-neutral-200 flex flex-col justify-between gap-y-2 p-2 rounded-md"
        >
          <img
            src={product.image[0]}
            alt={product.model}
            className="w-full h-[250px] object-cover rounded-t"
          />
          <h3 className="text-[1rem] text-neutral-900 font-medium">
            {product.model.length > 20
              ? `${product.model.slice(0, 20)}...`
              : product.model}
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-[0.8rem] text-neutral-600">${product.price}</p>
            <button
              onClick={() => addProduct(product)}
              className="bg-neutral-800 text-[0.8rem] text-neutral-100 p-1 rounded"
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
