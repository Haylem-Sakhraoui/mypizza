-- =============================================================================
-- Migration: add image_url and badge columns to products
-- Run after 20260419_admin_schema.sql
-- =============================================================================

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS badge     TEXT;
