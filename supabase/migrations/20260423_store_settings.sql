-- =============================================================================
-- Store Settings — admin-controlled open/close override
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.store_settings (
  id         INT  PRIMARY KEY DEFAULT 1,
  mode       TEXT NOT NULL DEFAULT 'automatic'
             CHECK (mode IN ('force_closed', 'force_open', 'automatic')),
  reason     TEXT,                          -- optional message shown to customers
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Enforce single-row invariant
  CONSTRAINT store_settings_one_row CHECK (id = 1)
);

-- Seed the default row (safe to run multiple times)
INSERT INTO public.store_settings (id, mode, reason)
VALUES (1, 'automatic', NULL)
ON CONFLICT (id) DO NOTHING;

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Anonymous users (storefront) can read
CREATE POLICY "anon_read_store_settings"
  ON public.store_settings FOR SELECT TO anon USING (true);

-- Authenticated admin has full access
CREATE POLICY "admin_store_settings"
  ON public.store_settings FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- ─── Realtime ─────────────────────────────────────────────────────────────────
-- Allows the frontend to receive live UPDATE events without polling
ALTER PUBLICATION supabase_realtime ADD TABLE public.store_settings;
