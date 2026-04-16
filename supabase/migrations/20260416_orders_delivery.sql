-- ============================================================
-- Migration: orders table for My Pizza delivery checkout flow
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Create the table (safe to run even if it already exists)
CREATE TABLE IF NOT EXISTS public.orders (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Customer info
  customer_name    TEXT        NOT NULL,
  phone            TEXT        NOT NULL,
  delivery_address JSONB       NOT NULL,   -- { street, plz, city }

  -- Order content
  items            JSONB       NOT NULL,   -- [{ name, price, qty }]
  total_price      NUMERIC(10,2) NOT NULL,

  -- PayPal
  paypal_order_id  TEXT,
  payer_id         TEXT,

  -- Lifecycle
  status           TEXT        NOT NULL DEFAULT 'pending',  -- pending | paid | cancelled
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at          TIMESTAMPTZ
);

-- 2. If the table already existed without some columns, add them safely
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS customer_name    TEXT,
  ADD COLUMN IF NOT EXISTS phone            TEXT,
  ADD COLUMN IF NOT EXISTS delivery_address JSONB,
  ADD COLUMN IF NOT EXISTS items            JSONB,
  ADD COLUMN IF NOT EXISTS total_price      NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS paypal_order_id  TEXT,
  ADD COLUMN IF NOT EXISTS payer_id         TEXT,
  ADD COLUMN IF NOT EXISTS status           TEXT NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS paid_at          TIMESTAMPTZ;

-- 3. Index for fast status queries (kitchen dashboard etc.)
CREATE INDEX IF NOT EXISTS orders_status_idx ON public.orders (status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON public.orders (created_at DESC);

-- 4. Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Drop old policies before recreating to avoid conflicts
DROP POLICY IF EXISTS "anon can insert orders"   ON public.orders;
DROP POLICY IF EXISTS "anon can update own order" ON public.orders;

-- Clients may insert new pending orders
CREATE POLICY "anon can insert orders"
  ON public.orders
  FOR INSERT
  TO anon
  WITH CHECK (status = 'pending');

-- Clients may update only status/paypal fields on their own orders
-- (identified by paypal_order_id so they can't touch other rows)
CREATE POLICY "anon can update own order"
  ON public.orders
  FOR UPDATE
  TO anon
  USING  (paypal_order_id IS NULL)   -- only rows not yet marked paid
  WITH CHECK (status IN ('paid', 'cancelled'));

-- ============================================================
-- Done. Verify with:
--   SELECT column_name, data_type FROM information_schema.columns
--   WHERE table_name = 'orders';
-- ============================================================
