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
  sizeLabel?: string;
}

// ─── Pre-payment: insert a pending order + its items, return the order UUID ───

export async function upsertPendingOrder(payload: {
  customer_name: string;
  phone: string;
  delivery_address: DeliveryAddress;
  items: OrderItem[];
  total_price: number;
  promo_code?: string;
  discount_amount?: number;
  payment_method?: "paypal" | "cash" | "ec";
}): Promise<string> {
  // 1. Insert the order header
  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        customer_name: payload.customer_name,
        phone: payload.phone,
        delivery_address: payload.delivery_address,
        total_price: payload.total_price,
        promo_code: payload.promo_code ?? null,
        discount_amount: payload.discount_amount ?? 0,
        status: "pending",
        payment_method: payload.payment_method ?? "paypal",
        created_at: new Date().toISOString(),
      },
    ])
    .select("id")
    .single();

  if (error) {
    console.error("Supabase upsertPendingOrder error:", error);
    throw error;
  }

  const orderId = data.id as string;

  // 2. Insert normalized order_items rows
  const itemRows = payload.items.map((item) => ({
    order_id: orderId,
    product_name: item.name,
    size_label: item.sizeLabel ?? null,
    unit_price: item.price,
    quantity: item.qty,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(itemRows);

  if (itemsError) {
    console.error("Supabase order_items insert error:", itemsError);
    throw itemsError;
  }

  return orderId;
}

// ─── Cash order: place order without online payment ─────────────────────────

export async function placeOfflineOrder(
  method: "cash" | "ec",
  payload: {
    customer_name: string;
    phone: string;
    delivery_address: DeliveryAddress;
    items: OrderItem[];
    total_price: number;
    promo_code?: string;
    discount_amount?: number;
  }
): Promise<string> {
  return upsertPendingOrder({ ...payload, payment_method: method });
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
