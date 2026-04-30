-- Migration: add payment_method column to orders
-- Supports 'paypal', 'cash' (Barzahlung), and 'ec' (EC-Karte bei Lieferung)

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS payment_method TEXT NOT NULL DEFAULT 'paypal';

-- Drop old constraint if it only had paypal/cash, then recreate with all three values
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_payment_method_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_payment_method_check
  CHECK (payment_method IN ('paypal', 'cash', 'ec'));
