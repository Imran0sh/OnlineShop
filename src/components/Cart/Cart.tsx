import { useCartManager } from "../../hooks/useCartManager";

export default function Cart() {
  const { cart, removeFromCart, decreaseFromCart, addFromCart } =
    useCartManager();

  // manually calculate total items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // manually calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="flex justify-center py-5">
      <div className="flex flex-col h-fit w-[30%] bg-neutral-200 gap-y-2 px-5 py-3 rounded-md">
        <h3 className="text-[1rem] text-neutral-950 font-semibold border-b border-neutral-400 pb-2">
          Корзина:
        </h3>
        <ul>
          {cart.map((item) => (
            <li
              key={item.id + item.model}
              className="text-[0.9rem] text-neutral-800 flex justify-between items-center"
            >
              <div className="flex items-center gap-x-3 p-1">
                <p>{item.model}</p>
                <p>x</p>
                <p>{item.quantity}</p>
              </div>
              {/* button to add and remove item from cart */}
              <div className="flex items-center gap-x-2">
                <button onClick={() => decreaseFromCart(item.id)}>-</button>
                <p>{item.quantity}</p>
                <button onClick={() => addFromCart(item)}>+</button>
              </div>
              <p>{item.price * item.quantity} ₸</p>
              <button onClick={() => removeFromCart(item.id)}>Удалить</button>
            </li>
          ))}
        </ul>
        <div className="text-[0.9rem] text-neutral-900 font-medium flex justify-between border-t border-dashed border-neutral-400 pt-2">
          <p>Количество товаров:</p>
          <p>{totalItems}</p>
        </div>
        <div className="text-[0.9rem] text-neutral-900 font-medium flex justify-between">
          <p>Сумма:</p>
          <p>{totalPrice} ₸</p>
        </div>
      </div>
    </div>
  );
}
