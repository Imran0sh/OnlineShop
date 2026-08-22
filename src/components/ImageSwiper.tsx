import { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Products {
  id: number;
  slug: string;
  model: string;
  image: string[];
  price: number;
  description: string;
}

interface ImageSliderProps {
  product: Products;
}

function ImageSlider({ product }: ImageSliderProps) {
  /* Current slide index; drives the nav bar text strip transform (see below) */
  const [activeIndex, setActiveIndex] = useState(0);

  /* Called on swipe/arrow/dot; keeps activeIndex in sync so nav bar text slides with the image */
  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <>
      {/* Swiper carousel + nav bar (sliding text + prev/dots/next) */}
      <section className="w-full h-full" aria-label="Image slider">
        {/* One slide per view; Navigation and Pagination bind to elements in the nav bar below */}
        <Swiper
          modules={[Navigation, Pagination]}
          className="w-full h-[500px]"
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          pagination={{ clickable: true, el: ".swiper-pagination" }}
          spaceBetween={0}
          slidesPerView={1}
          onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSlideChange={handleSlideChange}
        >
          {product.image.map((image, index) => (
            <SwiperSlide key={index} className="h-full">
              <div className="w-full h-full flex justify-center items-center overflow-hidden">
                <img
                  src={image}
                  alt={`${product.model} — фото ${index + 1}`}
                  className="block w-full h-full object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Nav bar: sliding text strip (5 cells × 20%) + centered prev / pagination / next */}
        <div className="relative flex items-center py-7 px-6  text-white min-h-[88px] box-border">
          {/* Full-width strip; transform shifts so active slide’s text is visible; pointer-events-none so clicks go to controls */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
            aria-live="polite"
          >
            <div
              className="flex w-auto h-full transition-transform duration-300 ease-out will-change-transform"
              style={{
                transform: `translate3d(${-activeIndex * 20}%, 0, 0)`,
              }}
            />
          </div>
          {/* Centered controls: Swiper binds to these class names for prev/next and pagination */}
          <div className="nav-bar-controls">
            <ChevronLeft className="swiper-button-prev" />
            <div className="swiper-pagination" />
            <ChevronRight className="swiper-button-next" />
          </div>
        </div>
      </section>
    </>
  );
}

export default ImageSlider;
