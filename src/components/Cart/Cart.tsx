import formatPrice from "@/utils/formatPrice";
import CartProducts from "./CartProductS";
import useCart from "@/context/cart-context/useCart";

export const Cart = () => {
  const { products, total, isOpen, openCart, closeCart } = useCart();

  const handleCheckout = () => {
    if (total.productQuantity) {
      alert(
        `Checkout - Subtotal: ${total.currencyFormat} ${formatPrice(
          total.totalPrice,
          total.currencyId,
        )}`,
      );
    } else {
      alert("Add some product in the cart!");
    }
  };

  const handleToggleCart = () => (isOpen ? closeCart() : openCart());

  return (
    <div
      className={`
        fixed top-0 right-0 z-[99]
        box-border h-full w-full
        bg-primary
        transition-[right] duration-200
        md:w-[450px]
        ${isOpen ? "right-0" : "right-[-100%] md:right-[-450px]"}
      `}
    >
      <button
        onClick={handleToggleCart}
        className={`
          absolute top-0 z-[2]
          h-[50px] w-[50px]
          cursor-pointer
          border-0 p-0
          text-center leading-[50px] text-[#ececec]
          transition-[filter]
          hover:brightness-[85%]
          focus-visible:outline-3
          focus-visible:outline-secondary
          ${
            isOpen
              ? "left-0 bg-black md:left-[-50px]"
              : "left-[-50px] bg-primary"
          }
        `}
      >
        {isOpen ? (
          <span>X</span>
        ) : (
          <div
            className="
              relative inline-block
              h-[50px] w-[50px]
              align-middle
              bg-[url('/cart-icon.png')]
              bg-contain
              bg-center
              bg-no-repeat
              [background-size:50%]
            "
          >
            <div
              title="Products in cart quantity"
              className="
                absolute bottom-0 right-[5px]
                inline-block
                h-[18px] w-[18px]
                rounded-full
                bg-secondary
                text-center
                text-[0.7em]
                font-bold
                leading-[18px]
                text-[#0c0b10]
              "
            >
              {total.productQuantity}
            </div>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="h-full overflow-y-scroll">
          <div className="box-border px-0 py-[45px] text-center text-[#ececec]">
            <div
              className="
                relative inline-block
                h-[60px] w-[60px]
                align-middle
                mr-[15px]
                bg-[url('/cart-icon.png')]
                bg-center
                bg-no-repeat
                bg-contain
                [background-size:50%]
              "
            >
              <div
                className="
                  absolute bottom-0 right-[5px]
                  inline-block
                  h-[18px] w-[18px]
                  rounded-full
                  bg-secondary
                  text-center
                  text-[0.7em]
                  font-bold
                  leading-[18px]
                  text-[#0c0b10]
                "
              >
                {total.productQuantity}
              </div>
            </div>

            <span className="align-middle text-[1.2em] font-bold">Cart</span>
          </div>

          <CartProducts products={products} />

          <div
            className="
              absolute bottom-0 z-[2]
              box-border
              h-[200px] w-full
              bg-primary
              p-[5%]
            "
          >
            <div
              className="
                inline-block
                w-[20%]
                align-middle
                text-[#5b5a5e]
              "
            >
              SUBTOTAL
            </div>

            <div
              className="
                inline-block
                w-[80%]
                align-middle
                text-right
                text-[#5b5a5e]
              "
            >
              <p className="m-0 text-[22px] text-secondary">
                {`${total.currencyFormat} ${formatPrice(
                  total.totalPrice,
                  total.currencyId,
                )}`}
              </p>

              <p className="m-0">
                {total.installments ? (
                  <span>
                    {`OR UP TO ${total.installments} x ${
                      total.currencyFormat
                    } ${formatPrice(
                      total.totalPrice / total.installments,
                      total.currencyId,
                    )}`}
                  </span>
                ) : null}
              </p>
            </div>

            <button
              onClick={handleCheckout}
              autoFocus
              className="
                mt-10 w-full
                cursor-pointer
                border-0
                bg-[#0c0b10]
                px-0 py-[15px]
                text-center
                uppercase
                text-[#ececec]
                outline-none
                transition-colors
                duration-200
                hover:bg-black
                focus-visible:outline-3
                focus-visible:outline-secondary
              "
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
