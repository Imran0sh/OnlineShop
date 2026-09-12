import type { ICartProduct } from "@/ types/cartType";

import useCart from "@/context/cart-context/useCart";

interface IProps {
  product: ICartProduct;
}
const CartProduct = ({ product }: IProps) => {
  const { removeProduct, increaseProductQuantity, decreaseProductQuantity } =
    useCart();
  const { model, quantity } = product;

  const handleRemoveProduct = () => removeProduct(product);
  const handleIncreaseProductQuantity = () => increaseProductQuantity(product);
  const handleDecreaseProductQuantity = () => decreaseProductQuantity(product);

  return (
    <div>
      {" "}
      <button onClick={handleRemoveProduct} title="remove product from cart">
        Удалить
      </button>
      <img src={product.image[0]} alt={model} />
      <div>
        <h1>{product.model}</h1>
        <p>{product.price.toLocaleString("тг-ТГ")} ₸</p>
      </div>
      <div>
        <div>
          <button
            onClick={handleDecreaseProductQuantity}
            disabled={quantity === 1 ? true : false}
          >
            -
          </button>
          <button onClick={handleIncreaseProductQuantity}>+</button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
