// ProductPageCart.tsx
import CartWrapper from "@/components/Cart/CartWrapper";
import useAddToCart from "@/components/Cart/useAddToCart";
import type { IProduct } from "@/ types/cartType";

interface IProps {
  product: IProduct;
}

function ProductPageButton({ product }: IProps) {
  const { addToCart } = useAddToCart();

  return <button onClick={() => addToCart(product)}>В корзину</button>;
}

export default function ProductPageCart({ product }: IProps) {
  return (
    <CartWrapper>
      <ProductPageButton product={product} />
    </CartWrapper>
  );
}
