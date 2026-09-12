// src/store.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { productStore } from "@/types/store-types";
import productsData from "@/api/MOSK_ITEMS.json";

export const useProductStore = create<productStore>()(
  persist(
    (set) => ({
      // Products
      products: productsData,
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      updateProduct: (id, product) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? product : p)),
        })),

      // Cart
      cart: [],
      addToCart: (product) =>
        set((state) => ({ cart: [...state.cart, product] })),
      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((p) => p.id !== id) })),
      updateCart: (id, product) =>
        set((state) => ({
          cart: state.cart.map((p) => (p.id === id ? product : p)),
        })),
    }),
    { name: "product-storage" },
  ),
);
