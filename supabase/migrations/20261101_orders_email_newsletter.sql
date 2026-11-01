-- Store customer email and explicit newsletter opt-in with each order.
-- Existing orders keep a NULL email and are not opted in.
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS customer_email TEXT,
  ADD COLUMN IF NOT EXISTS newsletter_consent BOOLEAN NOT NULL DEFAULT FALSE;
