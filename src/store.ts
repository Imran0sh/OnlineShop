// src/store.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { productStore } from "@/types/store-types";
import productsData from "@/api/MOSK_ITEMS.json";

export const useProductStore = create<productStore>()(
  persist(
    (set) => ({
      // Products типо под админку минус товар
      products: productsData,

      // Add product to cart (button +, catalog)
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),

      // Remove product from cart (button -, if you want to remove it from catalog)
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

      // Add product from cart (+)
      addFromCart: (product) =>
        set((state) => {
          const existingProduct = state.cart.find((p) => p.id === product.id);

          if (existingProduct) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
          };
        }),

      // Remove product from cart (button delete)
      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((p) => p.id !== id) })),

      // Decrease product from cart by id (-)
      decreaseFromCart: (id) =>
        set((state) => {
          const product = state.cart.find((p) => p.id === id);

          if (!product) return state;

          if (product.quantity === 1) {
            return {
              cart: state.cart.filter((p) => p.id !== id),
            };
          }

          return {
            cart: state.cart.map((p) =>
              p.id === id ? { ...p, quantity: p.quantity - 1 } : p,
            ),
          };
        }),

      updateCart: (id, product) =>
        set((state) => ({
          cart: state.cart.map((p) => (p.id === id ? product : p)),
        })),
    }),
    { name: "product-storage" },
  ),
);

interface SearchStore {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchTerm: "",
  setSearchTerm: (value) => set({ searchTerm: value }),
}));
