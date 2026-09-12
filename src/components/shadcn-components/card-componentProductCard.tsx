"use client";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import useAddToCart from "@/components/Cart/useAddToCart";
import type { IProduct } from "@/ types/cartType";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ItemProps {
  product: IProduct;
}

export function ProductCard({ product }: ItemProps) {
  const { addToCart } = useAddToCart();
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <img
        src={product?.image[0]}
        alt={product?.model}
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardAction>
          {/* <CartWrapper> */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Submit"
              onClick={() => addToCart(product)}
            >
              <CirclePlus />
            </Button>
          </div>
        </CardAction>
        <CardTitle>{product?.model}</CardTitle>
        <CardDescription>{product?.type}</CardDescription>
      </CardHeader>
      <CardFooter>
        <a
          href={`/product/${product?.slug}`}
          className={buttonVariants({ size: "lg", className: "w-full" })}
        >
          Смотреть
        </a>
      </CardFooter>
    </Card>
  );
}
