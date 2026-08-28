import * as React from "react";

import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import { PaginationSimple } from "@/components/shadcn-components/Pagination";

interface Products {
  id: number;
  model: string;
  image: string[];
}

interface ImageSliderProps {
  product: Products;
}

export function CarouselDemo({ product }: ImageSliderProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel setApi={setApi}>
      <CarouselContent className="w-full">
        {product.image.map((image, index) => (
          <CarouselItem key={index} className="basis-full">
            <CardContent className="flex items-center justify-center">
              <img
                src={image}
                alt={`${product.model} — фото ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </CardContent>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="flex flex-row items-center justify-center gap-4">
        <CarouselPrevious className="static translate-y-0" />

        <PaginationSimple image={product.image} api={api} current={current} />

        <CarouselNext className="static translate-y-0" />
      </div>
    </Carousel>
  );
}
