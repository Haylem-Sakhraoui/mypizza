-- Allow anonymous (unauthenticated) users to read categories and products
CREATE POLICY "public_read_categories" ON public.categories
  FOR SELECT TO anon USING (true);

CREATE POLICY "public_read_products" ON public.products
  FOR SELECT TO anon USING (true);

CREATE POLICY "public_read_product_sizes" ON public.product_sizes
  FOR SELECT TO anon USING (true);
