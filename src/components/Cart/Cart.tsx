import { useCartManager } from "../../hooks/useCartManager";

export default function Cart() {
  const { cart } = useCartManager();

  // const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // manually calculate total items
  const totalItems = cart.length;
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * totalItems,
    0,
  );

  return (
    <div className="h-fit w-[20%] bg-neutral-200 flex flex-col gap-y-2 p-2 rounded-md">
      <h3 className="text-[1rem] text-neutral-950 font-semibold border-b border-neutral-400 pb-2">
        Cart:
      </h3>
      <ul>
        {cart.map((item) => (
          <li
            key={item.id + item.model}
            className="text-[0.9rem] text-neutral-800 flex justify-between"
          >
            <p>
              {item.model.length > 10
                ? `${item.model.slice(0, 10)}...`
                : item.model}
            </p>
            {/*<div className="flex items-center gap-x-2">
              <button onClick={() => removeCart(item.id)}>-</button>
              <p>{totalItems}</p>
              <button onClick={() => addCart(item)}>+</button>
            </div>*/}
            <p>${(item.price * totalItems).toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <div className="text-[0.9rem] text-neutral-900 font-medium flex justify-between border-t border-dashed border-neutral-400 pt-2">
        <p>Total Items:</p>
        <p>{totalItems}</p>
      </div>
      <div className="text-[0.9rem] text-neutral-900 font-medium flex justify-between">
        <p>Total Price:</p>
        <p>${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}
