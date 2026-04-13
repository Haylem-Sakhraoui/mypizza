import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface OrderRecord {
  items: { name: string; price: number; qty: number }[];
  total: number;
  order_id: string;
  payer_id: string;
  created_at: string;
}

export async function saveOrder(order: OrderRecord) {
  const { data, error } = await supabase.from("orders").insert([order]);
  if (error) {
    console.error("Supabase insert error:", error);
    throw error;
  }
  return data;
}
