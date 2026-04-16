import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DeliveryAddress {
  street: string;
  plz: string;
  city: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: DeliveryAddress;
}

export interface OrderItem {
  name: string;
  price: number;
  qty: number;
}

// ─── Pre-payment: insert a pending order, return its UUID ─────────────────────

export async function upsertPendingOrder(payload: {
  customer_name: string;
  phone: string;
  delivery_address: DeliveryAddress;
  items: OrderItem[];
  total_price: number;
}): Promise<string> {
  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        customer_name: payload.customer_name,
        phone: payload.phone,
        delivery_address: payload.delivery_address,
        items: payload.items,
        total_price: payload.total_price,
        status: "pending",
        created_at: new Date().toISOString(),
      },
    ])
    .select("id")
    .single();

  if (error) {
    console.error("Supabase upsertPendingOrder error:", error);
    throw error;
  }

  return data.id as string;
}

// ─── Post-payment: flip status to paid, store PayPal IDs ─────────────────────

export async function markOrderPaid(
  supabaseOrderId: string,
  paypalOrderId: string,
  payerId: string
) {
  const { error } = await supabase
    .from("orders")
    .update({
      status: "paid",
      paypal_order_id: paypalOrderId,
      payer_id: payerId,
      paid_at: new Date().toISOString(),
    })
    .eq("id", supabaseOrderId);

  if (error) {
    console.error("Supabase markOrderPaid error:", error);
    throw error;
  }
}
