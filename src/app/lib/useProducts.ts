import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  base_price: number | null;
  image_url: string | null;
  badge: string | null;
  allergene: string | null;
}

/** Format a numeric price to German locale string, e.g. 8.5 → "8,50 €" */
export function formatPrice(price: number | null): string {
  if (price == null) return "–";
  return (
    price.toLocaleString("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " €"
  );
}

/**
 * Fetch all available products for a given category slug.
 * Step 1: resolve category_id from slug.
 * Step 2: query products directly by category_id.
 */
export function useProducts(categorySlug: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // 1. Get the category id for the slug
      const { data: cat, error: catErr } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categorySlug)
        .single();

      if (catErr || !cat) {
        if (!cancelled) {
          setError(catErr?.message ?? "Category not found");
          setLoading(false);
        }
        return;
      }

      // 2. Fetch products filtered by category_id
      const { data, error: prodErr } = await supabase
        .from("products")
        .select("id, name, description, base_price, image_url, badge, allergene")
        .eq("category_id", cat.id)
        .eq("is_available", true)
        .order("name");

      if (cancelled) return;
      if (prodErr) {
        setError(prodErr.message);
      } else {
        setProducts((data ?? []) as Product[]);
      }
      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [categorySlug]);

  return { products, loading, error };
}
