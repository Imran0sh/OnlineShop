import { useCartManager } from "../../hooks/useCartManager";
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  X,
  ArrowRight,
} from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, decreaseFromCart, addFromCart, clearCart } =
    useCartManager();

  // manually calculate total items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // manually calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-7">
        {/* Заголовок */}
        <div className="flex items-center justify-between border-b border-neutral-200 pb-5">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} strokeWidth={1.8} />
            <h2 className="text-xl font-semibold text-neutral-900">
              Корзина
            </h2>
            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium">
              {totalItems}
            </span>
          </div>

          <button
            onClick={clearCart}
            disabled={cart.length === 0}
            className="flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-red-500 disabled:opacity-40"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Очистить корзину</span>
          </button>
        </div>

        {/* Список товаров */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-neutral-400">
            <ShoppingBag size={42} strokeWidth={1.2} />
            <p className="text-sm">Ваша корзина пуста</p>
          </div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-4 py-5"
              >
                {/* Название товара */}
                <div className="min-w-0 flex flex-row gap-3">
                  <div>
                    <img src={item.image[0]} alt={item.model} className="w-12 h-12" />
                  </div>

                  <section>
                    <h3 className="text-sm font-medium text-neutral-900">
                    {item.model}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    {item.price.toLocaleString("ru-RU")} ₸ / шт.
                    </p>
                  </section>
                </div>

                {/* Количество */}
                <div className="flex items-center rounded-lg border border-neutral-200">
                  <button
                    onClick={() => decreaseFromCart(item.id)}
                    className="p-2.5 text-neutral-500 transition-colors hover:bg-neutral-100 active:scale-95"
                    aria-label="Уменьшить количество"
                  >
                    <Minus size={15} />
                  </button>

                  <span className="min-w-7 text-center text-sm font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => addFromCart(item)}
                    className="p-2.5 text-neutral-500 transition-colors hover:bg-neutral-100 active:scale-95"
                    aria-label="Увеличить количество"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Цена и удаление */}
                //
                /*сделать на одном уровне колво и сумму */
                <div className="flex flex-row justify-between">
                <div className="flex items-center gap-3">
                  <p className="min-w-25 text-right text-sm font-semibold text-neutral-900">
                    {(item.price * item.quantity).toLocaleString("ru-RU")} ₸
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-md p-2 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    aria-label="Удалить товар"
                  >
                    <X size={17} />
                  </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Итоги */}
        <div className="space-y-4 border-t border-neutral-200 pt-5">
          <div className="flex justify-between text-sm text-neutral-500">
            <span>Количество товаров</span>
            <span className="font-medium text-neutral-900">
              {totalItems}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-neutral-900">
              Итого
            </span>
            <span className="text-xl font-bold text-neutral-900">
              {totalPrice.toLocaleString("ru-RU")} ₸
            </span>
          </div>

          <button
            type="button"
            disabled={cart.length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 py-3.5 text-sm font-medium text-white transition-all hover:bg-neutral-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Оформить заказ
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
