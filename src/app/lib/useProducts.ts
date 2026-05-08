import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export interface ProductSize {
  id: string;
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  base_price: number | null;
  has_sizes: boolean;
  sizes: ProductSize[];
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

      // 2. Fetch products with their sizes
      const { data, error: prodErr } = await supabase
        .from("products")
        .select("id, name, description, base_price, has_sizes, image_url, badge, allergene, product_sizes(id, label, price)")
        .eq("category_id", cat.id)
        .eq("is_available", true)
        .order("name");

      if (cancelled) return;
      if (prodErr) {
        setError(prodErr.message);
      } else {
        const mapped = (data ?? []).map((p: any) => ({
          ...p,
          // allergene can be a TEXT[] array from Postgres — normalise to a space-separated string
          allergene: Array.isArray(p.allergene)
            ? p.allergene.join(" ")
            : p.allergene ?? null,
          sizes: (p.product_sizes ?? []).map((s: any) => ({
            id: s.id,
            label: s.label,
            price: Number(s.price),
          })),
        })) as Product[];
        setProducts(mapped);
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

/**
 * Fetch extras for a given category slug via the category_extras join table.
 * Returns labels formatted as "Name (+1,00 €)" when price > 0, else just "Name".
 */
export function useExtras(categorySlug: string): { extras: string[]; loading: boolean } {
  const [extras, setExtras] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categorySlug)
        .single();

      if (!cat) {
        if (!cancelled) setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("category_extras")
        .select("extras(id, name, price)")
        .eq("category_id", cat.id);

      if (!cancelled) {
        const items = (data ?? [])
          .map((row: any) => {
            const e = row.extras;
            if (!e) return null;
            const price = Number(e.price);
            return price > 0
              ? `${e.name} (+${price.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} \u20ac)`
              : e.name;
          })
          .filter(Boolean) as string[];
        setExtras(items);
        setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [categorySlug]);

  return { extras, loading };
}

/**
 * Returns the set of category slugs that have at least one available product.
 * Used by MenuNav and Navbar to hide buttons for empty categories.
 */
export function useActiveSlugs(): Set<string> {
  const [slugs, setSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    supabase
      .from("products")
      .select("category_id, categories(slug)")
      .eq("is_available", true)
      .then(({ data }) => {
        const active = new Set<string>();
        (data ?? []).forEach((row: any) => {
          const slug = row.categories?.slug;
          if (slug) active.add(slug);
        });
        setSlugs(active);
      });
  }, []);

  return slugs;
}
