-- =============================================================================
-- My Pizza Admin — Full Schema (PayPal-compatible)
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables (in dependency order)
DROP TABLE IF EXISTS public.order_items   CASCADE;
DROP TABLE IF EXISTS public.orders        CASCADE;
DROP TABLE IF EXISTS public.product_sizes CASCADE;
DROP TABLE IF EXISTS public.products      CASCADE;
DROP TABLE IF EXISTS public.categories    CASCADE;
DROP TABLE IF EXISTS public.promocodes    CASCADE;

-- ─── Categories ──────────────────────────────────────────────────────────────
CREATE TABLE public.categories (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT        NOT NULL UNIQUE,
  slug       TEXT        NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Products ────────────────────────────────────────────────────────────────
CREATE TABLE public.products (
  id           UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id  UUID          NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  name         TEXT          NOT NULL,
  description  TEXT,
  base_price   NUMERIC(10,2),   -- NULL when has_sizes = true
  has_sizes    BOOLEAN       NOT NULL DEFAULT false,
  is_available BOOLEAN       NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ─── Product Sizes ───────────────────────────────────────────────────────────
CREATE TABLE public.product_sizes (
  id         UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID          NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  label      TEXT          NOT NULL,
  price      NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  UNIQUE (product_id, label)
);

-- ─── Orders ──────────────────────────────────────────────────────────────────
-- Stores one row per checkout, created before payment and updated after.
CREATE TABLE public.orders (
  id               UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Customer / delivery info (captured at checkout time)
  customer_name    TEXT          NOT NULL,
  phone            TEXT          NOT NULL,
  delivery_address JSONB         NOT NULL,   -- { street, plz, city }

  -- Totals & lifecycle
  total_price      NUMERIC(10,2) NOT NULL DEFAULT 0,
  status           TEXT          NOT NULL DEFAULT 'pending'
                                 CHECK (status IN ('pending', 'paid', 'cancelled', 'completed')),
  notes            TEXT,
  created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

  -- PayPal — filled in after a successful capture (NULL until then)
  paypal_order_id  TEXT          UNIQUE,     -- PayPal's order ID returned by createOrder
  payer_id         TEXT,                     -- PayPal's payer_id returned on approval
  paid_at          TIMESTAMPTZ
);

-- ─── Order Items ─────────────────────────────────────────────────────────────
-- Normalized snapshot of each cart line; product_id may be NULL for ad-hoc items.
CREATE TABLE public.order_items (
  id           UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id     UUID          NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id   UUID          REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT          NOT NULL,        -- snapshot at order time
  size_label   TEXT,                          -- snapshot of chosen size (if any)
  quantity     INT           NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price   NUMERIC(10,2) NOT NULL,
  created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ─── Promo Codes ─────────────────────────────────────────────────────────────
CREATE TABLE public.promocodes (
  id                  UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  code                TEXT          NOT NULL UNIQUE,
  discount_percentage NUMERIC(5,2)  CHECK (discount_percentage > 0 AND discount_percentage <= 100),
  fixed_amount        NUMERIC(10,2) CHECK (fixed_amount > 0),
  expiration_date     DATE,
  is_active           BOOLEAN       NOT NULL DEFAULT true,
  created_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  CONSTRAINT exactly_one_discount CHECK (
    (discount_percentage IS NOT NULL AND fixed_amount IS NULL) OR
    (discount_percentage IS NULL AND fixed_amount IS NOT NULL)
  )
);

-- =============================================================================
-- Indexes
-- =============================================================================

CREATE INDEX IF NOT EXISTS orders_status_idx      ON public.orders (status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx  ON public.orders (created_at DESC);
CREATE INDEX IF NOT EXISTS order_items_order_idx  ON public.order_items (order_id);
CREATE INDEX IF NOT EXISTS products_category_idx  ON public.products (category_id);

-- =============================================================================
-- Row Level Security
-- =============================================================================

ALTER TABLE public.categories    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promocodes    ENABLE ROW LEVEL SECURITY;

-- ─── Admin (authenticated) — full access to everything ───────────────────────

CREATE POLICY "admin_categories"    ON public.categories    FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_products"      ON public.products      FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_product_sizes" ON public.product_sizes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_orders"        ON public.orders        FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_order_items"   ON public.order_items   FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "admin_promocodes"    ON public.promocodes    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ─── Anon (checkout flow) — tightly scoped write access ──────────────────────
--
-- The storefront runs with the anon key.  The three policies below enforce:
--   INSERT  → only allowed when status = 'pending'
--   SELECT  → only pending rows (so .select("id") works in upsertPendingOrder)
--   UPDATE  → only pending → paid / cancelled transitions

CREATE POLICY "anon_insert_orders"
  ON public.orders FOR INSERT TO anon
  WITH CHECK (status = 'pending');

CREATE POLICY "anon_select_orders"
  ON public.orders FOR SELECT TO anon
  USING (status = 'pending');

-- Once paypal_order_id is written the row cannot be changed again by anon.
CREATE POLICY "anon_update_orders"
  ON public.orders FOR UPDATE TO anon
  USING  (status = 'pending')
  WITH CHECK (status IN ('paid', 'cancelled'));

-- order_items are inserted right after the pending order is created.
CREATE POLICY "anon_insert_order_items"
  ON public.order_items FOR INSERT TO anon
  WITH CHECK (true);

-- =============================================================================
-- Grants — privileges must be granted in addition to RLS policies
-- =============================================================================

GRANT USAGE  ON SCHEMA public         TO anon;
GRANT INSERT ON public.orders         TO anon;
GRANT SELECT ON public.orders         TO anon;
GRANT UPDATE ON public.orders         TO anon;
GRANT INSERT ON public.order_items    TO anon;

-- =============================================================================
-- Verification queries (uncomment to run after applying):
--
--   SELECT column_name, data_type, is_nullable
--   FROM information_schema.columns
--   WHERE table_name = 'orders' ORDER BY ordinal_position;
--
--   SELECT policyname, cmd, roles
--   FROM pg_policies
--   WHERE tablename IN ('orders','order_items');
--
--   SELECT grantee, table_name, privilege_type
--   FROM information_schema.role_table_grants
--   WHERE table_name IN ('orders','order_items');
-- =============================================================================
