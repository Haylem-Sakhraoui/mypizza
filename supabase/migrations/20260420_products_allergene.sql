-- =============================================================================
-- Migration: add allergene column to products
-- Run after 20260420_products_image_badge.sql
-- =============================================================================

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS allergene TEXT;
