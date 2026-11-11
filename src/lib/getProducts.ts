import { supabase } from "./supabase.ts";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(`Ошибка Supabase: ${error.message}`, {
      cause: error,
    });
  }

  return data ?? [];
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Ошибка Supabase: ${error.message}`);
  }

  return data;
}
