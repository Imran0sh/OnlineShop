import type { ICartProduct } from "@/ types/cartType";
import CartProduct from "./CartProducT";

interface IProps {
  products: ICartProduct[];
}

export default function CartProducts({ products }: IProps) {
  return (
    <div>
      {products?.length ? (
        products.map((p) => <CartProduct key={p.id} product={p} />)
      ) : (
        <div>
          Добавьте товары в корзину <br />
          :)
        </div>
      )}
    </div>
  );
}
