"use client";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardProps {
  title: string;
  type: string;
  image: string[];
  slug: string;
}

export function ProductCard({ title, type, image, slug }: CardProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <img
        src={image[0]}
        alt={title}
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardAction>
          <Button variant="outline" size="icon" aria-label="Submit">
            <CirclePlus />
          </Button>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{type}</CardDescription>
      </CardHeader>
      <CardFooter>
        <a
          href={`/product/${slug}`}
          className={buttonVariants({ size: "lg", className: "w-full" })}
        >
          Смотреть
        </a>
      </CardFooter>
    </Card>
  );
}
