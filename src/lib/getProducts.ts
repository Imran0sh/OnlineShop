import { supabase } from "./supabase.ts";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    throw new Error(`Ошибка Supabase: ${error.message}`);
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
