-- =============================================================================
-- Migration: allow anon to read active promocodes + store promo data on orders
-- =============================================================================

-- Allow the frontend to look up promo codes without authentication
CREATE POLICY "public_read_promocodes" ON public.promocodes
  FOR SELECT TO anon USING (is_active = true);

-- Track which promo was applied and how much was discounted on the order
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS promo_code      TEXT,
  ADD COLUMN IF NOT EXISTS discount_amount NUMERIC(10,2) NOT NULL DEFAULT 0;
