import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import type { CarouselApi } from "@/components/ui/carousel";

interface PaginationProps {
  image: string[];
  api: CarouselApi;
  current: number;
}

export function PaginationSimple({ image, api, current }: PaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        {Array.from({ length: image.length }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => api?.scrollTo(index)}
              isActive={index + 1 === current}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
}
