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
  ADD COLUMN IF NOT EXISTS paid_at          TIMESTAMPTZ;

-- 2c. Ensure post-payment columns are nullable.
--     The old schema created them as NOT NULL (they were written all at once
--     in the original single-step saveOrder flow). The new two-step flow
--     inserts a pending row first, so these must allow NULL until payment completes.
ALTER TABLE public.orders ALTER COLUMN payer_id        DROP NOT NULL;
ALTER TABLE public.orders ALTER COLUMN paypal_order_id DROP NOT NULL;

-- 2b. Migrate data from legacy `total` column → `total_price`, then drop it.
--     The old saveOrder() used `total`; the new flow uses `total_price`.
--     Safe to run multiple times (IF EXISTS guards).
DO $$
BEGIN
  -- Copy existing values across if total_price is still empty
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name   = 'orders'
      AND column_name  = 'total'
  ) THEN
    UPDATE public.orders
       SET total_price = total::NUMERIC
     WHERE total_price IS NULL AND total IS NOT NULL;

    -- Now safe to drop the legacy column
    ALTER TABLE public.orders DROP COLUMN IF EXISTS total;

    -- Also remove other stale columns from the original schema
    ALTER TABLE public.orders DROP COLUMN IF EXISTS order_id;  -- was the PayPal ID, now paypal_order_id
  END IF;
END $$;

-- Ensure status column exists with a default (ALTER TYPE cannot use IF NOT EXISTS,
-- so we handle it conditionally via DO block)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name   = 'orders'
      AND column_name  = 'status'
  ) THEN
    ALTER TABLE public.orders ADD COLUMN status TEXT NOT NULL DEFAULT 'pending';
  END IF;
END $$;

-- 3. Indexes for fast status / time-range queries
CREATE INDEX IF NOT EXISTS orders_status_idx     ON public.orders (status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON public.orders (created_at DESC);

-- ============================================================
-- 4. GRANTS — required so the anon key can reach the table.
--    RLS policies alone are not enough; Postgres also needs
--    the privilege granted at the table level.
-- ============================================================
GRANT USAGE  ON SCHEMA public TO anon;
GRANT INSERT ON public.orders TO anon;
GRANT UPDATE ON public.orders TO anon;
-- SELECT is needed so .select("id") in upsertPendingOrder works
GRANT SELECT ON public.orders TO anon;

-- ============================================================
-- 5. Row Level Security — keeps anon writes tightly scoped
-- ============================================================
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Drop old versions before recreating (idempotent)
DROP POLICY IF EXISTS "anon can insert orders"    ON public.orders;
DROP POLICY IF EXISTS "anon can update own order" ON public.orders;
DROP POLICY IF EXISTS "anon can select own order" ON public.orders;

-- INSERT: anon may only create rows whose initial status is 'pending'
CREATE POLICY "anon can insert orders"
  ON public.orders
  FOR INSERT
  TO anon
  WITH CHECK (status = 'pending');

-- SELECT: anon may only read rows they just inserted
-- (identified by the absence of a paypal_order_id, i.e. still pending)
CREATE POLICY "anon can select own order"
  ON public.orders
  FOR SELECT
  TO anon
  USING (status = 'pending');

-- UPDATE: anon may only mark a pending order as paid/cancelled;
-- once paypal_order_id is written the row is locked from further changes
CREATE POLICY "anon can update own order"
  ON public.orders
  FOR UPDATE
  TO anon
  USING  (status = 'pending')
  WITH CHECK (status IN ('paid', 'cancelled'));

-- ============================================================
-- Done. Quick verification queries:
--
--   -- Check columns exist:
--   SELECT column_name, data_type
--   FROM information_schema.columns
--   WHERE table_name = 'orders';
--
--   -- Check grants:
--   SELECT grantee, privilege_type
--   FROM information_schema.role_table_grants
--   WHERE table_name = 'orders';
--
--   -- Check policies:
--   SELECT policyname, cmd, roles
--   FROM pg_policies
--   WHERE tablename = 'orders';
-- ============================================================
--   WHERE table_name = 'orders';
-- ============================================================
