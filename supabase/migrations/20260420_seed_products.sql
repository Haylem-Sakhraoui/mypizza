-- =============================================================================
-- Seed: My Pizza — Categories & Products
-- Run in: Supabase Dashboard → SQL Editor → New Query
-- Requires: 20260419_admin_schema.sql + 20260420_products_image_badge.sql
-- =============================================================================

-- ─── Wipe existing seed data (safe re-run) ───────────────────────────────────
DELETE FROM public.products;
DELETE FROM public.categories;

-- ─── Categories ──────────────────────────────────────────────────────────────
INSERT INTO public.categories (id, name, slug) VALUES
  ('11111111-0000-0000-0000-000000000001', 'Pizza',         'pizza'),
  ('11111111-0000-0000-0000-000000000002', 'Burger',        'burger'),
  ('11111111-0000-0000-0000-000000000003', 'French Tacos',  'french-tacos'),
  ('11111111-0000-0000-0000-000000000004', 'Snacks',        'snacks');

-- ─── Pizzas ──────────────────────────────────────────────────────────────────
INSERT INTO public.products (category_id, name, description, base_price, image_url, badge, is_available) VALUES
(
  '11111111-0000-0000-0000-000000000001',
  'Margherita',
  'Tomatensauce, Edmar',
  8.50,
  'https://plus.unsplash.com/premium_photo-1672198597143-45a4b5f064c9?w=600&auto=format&fit=crop&q=60',
  NULL,
  true
),
(
  '11111111-0000-0000-0000-000000000001',
  'Salami',
  'Tomatensauce, Edmar, Salami',
  11.50,
  'https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?w=600&auto=format&fit=crop&q=60',
  'Beliebt',
  true
),
(
  '11111111-0000-0000-0000-000000000001',
  'Hawaii',
  'Tomatensauce, Edmar, Schinken, Ananas',
  12.00,
  'https://images.unsplash.com/photo-1708649360696-7e0af9b714b7?w=600&auto=format&fit=crop&q=60',
  NULL,
  true
),
(
  '11111111-0000-0000-0000-000000000001',
  'Tonno',
  'Tomatensauce, Edmar, Thunfisch, Zwiebeln',
  11.50,
  'https://media.istockphoto.com/id/860443260/fr/photo/pizza-italienne-avec-thon-citron-oignons.webp?a=1&b=1&s=612x612&w=0&k=20&c=1HbnbTaPL_UnydShqC2dmatzdzPo99YwJoPKFWg8P1s=',
  NULL,
  true
),
(
  '11111111-0000-0000-0000-000000000001',
  '4 Käse',
  'Mozzarella, Edmar, Chedar, Hirtincheese, Tomatensauce',
  12.50,
  'https://media.istockphoto.com/id/1598834662/fr/photo/pizza-quatre-fromages-avec-du-basilic-frais-sur-le-dessus-sur-une-planche-de-bois-sur-un-fond.webp?a=1&b=1&s=612x612&w=0&k=20&c=T80n7V-up-PKdweH3kOhXf83eLqBCQr7v6X9IsYQ-eY=',
  'Fan-Fav',
  true
),
(
  '11111111-0000-0000-0000-000000000001',
  'Diabolo 🌶️',
  'Tomatensauce, Edmar, scharfe Salami, Jalapeños, Tabasco',
  10.90,
  'https://images.unsplash.com/photo-1709392975966-6e76d0452436?w=600&auto=format&fit=crop&q=60',
  'Scharf',
  true
),
(
  '11111111-0000-0000-0000-000000000001',
  'Sucuk',
  'Tomatensauce, Edmar, Sucuk',
  11.50,
  'https://media.istockphoto.com/id/1209993541/fr/photo/pizza-au-fromage-mozzarella-jambon-sauce-tomate-saucisse-poivre-%C3%A9pices-et-roquette-fra%C3%AEche.webp?a=1&b=1&s=612x612&w=0&k=20&c=GbPfuA-72P20niZw3Z7nenrJml1p03qwozGrT1X8UEA=',
  'Scharf',
  true
),
(
  '11111111-0000-0000-0000-000000000001',
  'Spinat',
  'Tomatensauce, Schinken, Edmar, Spinat, Ei',
  12.50,
  'https://images.unsplash.com/photo-1617343251257-b5d709934ddd?w=600&auto=format&fit=crop&q=60',
  NULL,
  true
),
(
  '11111111-0000-0000-0000-000000000001',
  'Vegetarisch',
  'Tomatensauce, Edmar, Paprika, Brokkoli, Mais, Champignons, Oliven',
  12.00,
  'https://images.unsplash.com/photo-1739643815373-72444e14c54b?w=600&auto=format&fit=crop&q=60',
  NULL,
  true
),
(
  '11111111-0000-0000-0000-000000000001',
  'Funghi',
  'Tomatensauce, Edmar, Champignons',
  10.50,
  'https://images.unsplash.com/photo-1717883235373-ef10b2a745a3?w=600&auto=format&fit=crop&q=60',
  NULL,
  true
),
(
  '11111111-0000-0000-0000-000000000001',
  'Prochiotto',
  'Tomatensauce, Edmar, Schinken',
  12.00,
  'https://media.istockphoto.com/id/925889900/fr/photo/pizza-au-pepperoni-chaud-maison-pr%C3%AAt-%C3%A0-manger.webp?a=1&b=1&s=612x612&w=0&k=20&c=iKrES2LmlvzZSSrN-3ljfy4k1HPGmNoZjdYDuRKK1t8=',
  NULL,
  true
),
(
  '11111111-0000-0000-0000-000000000001',
  'Mista',
  'Tomatensauce, Edmar, Champignons, Salami, Pepperoni, Schinken',
  12.00,
  'https://images.unsplash.com/photo-1708649783142-846b4f66796f?w=600&auto=format&fit=crop&q=60',
  NULL,
  true
),
(
  '11111111-0000-0000-0000-000000000001',
  'Hühnerwald',
  'Tomatensauce, Edmar, Hollandaise Sauce, Hähnchenbrust Streifen, Brokkoli',
  12.00,
  'https://media.istockphoto.com/id/471961243/fr/photo/pizza-avec-poulet-et-mushroom-cuisine-italienne-studio.webp?a=1&b=1&s=612x612&w=0&k=20&c=HfpYS83I8ycFjuhSg9kkuBF0dzeo0zlPvLikL_J0z_g=',
  NULL,
  true
),
(
  '11111111-0000-0000-0000-000000000001',
  'Regina',
  'Tomatensauce, Hinterschinken, Champignons, Edmar',
  12.00,
  'https://media.istockphoto.com/id/1052912364/fr/photo/pizza-canadien-avec-bacon-isol%C3%A9e-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=XNoHPs93uDSHI_0RgpDkCaQUTOfUY4ylCvANUrlayvs=',
  NULL,
  true
);

-- ─── Burgers ─────────────────────────────────────────────────────────────────
INSERT INTO public.products (category_id, name, description, base_price, image_url, badge, is_available) VALUES
(
  '11111111-0000-0000-0000-000000000002',
  'CheeseBurger',
  'Rindfleischpatty, Cheddar, Salat, Tomate, Zwiebeln, Ketchup & Senf',
  10.00,
  'https://images.unsplash.com/photo-1605789538467-f715d58e03f9?w=600&auto=format&fit=crop&q=60',
  NULL,
  true
),
(
  '11111111-0000-0000-0000-000000000002',
  'Chicken Burger',
  'Knuspriges Hähnchen, Eisbergsalat, Tomate, Mayo, Brioche-Bun',
  8.50,
  'https://images.unsplash.com/photo-1669490882811-703aa7f0d7a0?w=600&auto=format&fit=crop&q=60',
  'Beliebt',
  true
),
(
  '11111111-0000-0000-0000-000000000002',
  'Doppel Hamburger',
  'Doppeltes Rindfleischpatty, doppelter Käse, karamellisierte Zwiebeln, BBQ',
  10.00,
  'https://images.unsplash.com/photo-1552526881-721ce8509abb?w=600&auto=format&fit=crop&q=60',
  '🔥 XXL',
  true
),
(
  '11111111-0000-0000-0000-000000000002',
  'Chili Cheeseburger',
  'Burger Bun, Rindfleisch, süß-sauren Gurken, Zwiebeln, Tomaten, Blattsalat, Ketchup und Snack-Sauce',
  8.50,
  'https://plus.unsplash.com/premium_photo-1775581876773-704f7dcfc3cc?w=600&auto=format&fit=crop&q=60',
  '🔥 XXL',
  true
),
(
  '11111111-0000-0000-0000-000000000002',
  'Doppel Chili Cheeseburger',
  'Burger Bun, Rindfleisch, süß-sauren Gurken, Zwiebeln, Tomaten, Blattsalat, Ketchup und Snack-Sauce',
  8.50,
  'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&auto=format&fit=crop&q=60',
  '🔥 XXL',
  true
),
(
  '11111111-0000-0000-0000-000000000002',
  'Doppel Cheese Burger',
  'Burger Bun, Rindfleisch, süß-sauren Gurken, Zwiebeln, Tomaten, Blattsalat, Ketchup und Snack-Sauce',
  8.50,
  'https://images.unsplash.com/photo-1768933227584-f9be340e7f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  '🔥 XXL',
  true
),
(
  '11111111-0000-0000-0000-000000000002',
  'Chicken Cheese Burger',
  'Burger Bun, Hähnchen, süß-sauren Gurken, Zwiebeln, Tomaten, Blattsalat, Ketchup und Snack-Sauce',
  8.50,
  'https://images.unsplash.com/photo-1768933227584-f9be340e7f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  '🔥 XXL',
  true
),
(
  '11111111-0000-0000-0000-000000000002',
  'Nuggets Burger',
  'Burger Bun, Nuggets, süß-sauren Gurken, Zwiebeln, Tomaten, Blattsalat, Ketchup und Snack-Sauce',
  8.50,
  'https://images.unsplash.com/photo-1585238341710-4d3ff484184d?w=600&auto=format&fit=crop&q=60',
  '🔥 XXL',
  true
),
(
  '11111111-0000-0000-0000-000000000002',
  'Hamburger',
  'Burger Bun, Rindfleisch, süß-sauren Gurken, Zwiebeln, Tomaten, Blattsalat, Ketchup und Snack-Sauce',
  8.50,
  'https://images.unsplash.com/photo-1610970878459-a0e464d7592b?w=600&auto=format&fit=crop&q=60',
  '🔥 XXL',
  true
),
(
  '11111111-0000-0000-0000-000000000002',
  'Nuggets Cheeseburger',
  'Burger Bun, Nuggets, Käse, süß-sauren Gurken, Zwiebeln, Tomaten, Blattsalat, Ketchup und Snack-Sauce',
  8.50,
  'https://images.unsplash.com/photo-1585238340764-c6f1f6fe1a6d?w=600&auto=format&fit=crop&q=60',
  '🔥 XXL',
  true
);

-- ─── French Tacos ────────────────────────────────────────────────────────────
INSERT INTO public.products (category_id, name, description, base_price, image_url, badge, is_available) VALUES
(
  '11111111-0000-0000-0000-000000000003',
  'French Tacos Tonno',
  'Teigtasche, Thunfisch, Pommes, Käse Sauce und Ei',
  9.00,
  'https://frenchtacoslondon.com/_astro/spicy@601w.c5e0fc31.webp',
  NULL,
  true
),
(
  '11111111-0000-0000-0000-000000000003',
  'French Tacos Hähnchen',
  'Teigtasche, gegrillte Hähnchenbrust, Pommes, Käse Sauce und Ei',
  9.00,
  'https://frenchtacoslondon.com/_astro/classic@601w.4a3b31f0.webp',
  'Beliebt',
  true
),
(
  '11111111-0000-0000-0000-000000000003',
  'French Tacos Sucuk',
  'Türkische Wurst (Sucuk), Salat, Tomate, Zwiebeln, BBQ',
  9.00,
  'https://frenchtacoslondon.com/_astro/falafil@601w.0f3e6941.webp',
  NULL,
  true
),
(
  '11111111-0000-0000-0000-000000000003',
  'French Tacos Hackfleisch',
  'Teigtasche, Hackfleisch, Pommes, Käse Sauce und Ei',
  9.00,
  'https://frenchtacoslondon.com/_astro/french@601w.6a642404.webp',
  'Top-Seller',
  true
),
(
  '11111111-0000-0000-0000-000000000003',
  'French Tacos Vegetarisch',
  'Teigtasche, Rote Zwiebeln, Paprika, Pommes und Ei',
  9.00,
  'https://frenchtacoslondon.com/_astro/veggie@601w.9441998d.webp',
  '🌿 Vegi',
  true
),
(
  '11111111-0000-0000-0000-000000000003',
  'Tacos Nuggets',
  'Teigtasche, Nuggets, Pommes, Käsesauce und Ei',
  9.00,
  'https://images.unsplash.com/photo-1615535248235-253d93813ca5?w=600&auto=format&fit=crop&q=60',
  NULL,
  true
),
(
  '11111111-0000-0000-0000-000000000003',
  'Tacos gemischtes Fleisch',
  'Teigtasche, gegrillte Hähnchenbrust, Rinder-Hackfleisch, Pommes, Käse Sauce und Ei',
  9.00,
  'https://media.istockphoto.com/id/824639360/fr/photo/tacos-de-porc-mexicain.webp?a=1&b=1&s=612x612&w=0&k=20&c=XQM13BLD-tR4UhWSA-BpGfenBtepxH4_6jnxPteP2bg=',
  NULL,
  true
),
(
  '11111111-0000-0000-0000-000000000003',
  'Tacos Halloumi',
  'Teigtasche, Halloumi, Pommes, Käse Sauce und Ei',
  9.00,
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQjYsdynycod8fj5dp8Oe40pxVn8DnUekpgg&s',
  '🌿 Vegi',
  true
),
(
  '11111111-0000-0000-0000-000000000003',
  'Tacos Hollandaise',
  'Teigtasche, Hähnchenfleisch, Pommes, Hollandaise Sauce, Ei',
  9.00,
  'https://media.istockphoto.com/id/2181787560/fr/photo/taco-de-longe-de-porc.webp?a=1&b=1&s=612x612&w=0&k=20&c=9BN4VcPCW2wQxHjJyshGPrZN63mF4S3KyuSUkLsZo8o=',
  NULL,
  true
),
(
  '11111111-0000-0000-0000-000000000003',
  'Tacos BBQ',
  'Teigtasche, Hähnchenfleisch, Pommes, BBQ Sauce, Ei',
  9.00,
  'https://media.istockphoto.com/id/2181787560/fr/photo/taco-de-longe-de-porc.webp?a=1&b=1&s=612x612&w=0&k=20&c=9BN4VcPCW2wQxHjJyshGPrZN63mF4S3KyuSUkLsZo8o=',
  NULL,
  true
);

-- ─── Snacks ──────────────────────────────────────────────────────────────────
INSERT INTO public.products (category_id, name, description, base_price, image_url, badge, is_available) VALUES
(
  '11111111-0000-0000-0000-000000000004',
  'Chicken Nuggets',
  '6 oder 9 knusprige Chicken Nuggets mit Dip-Sauce deiner Wahl',
  4.90,
  'https://media.istockphoto.com/id/1214299642/fr/photo/p%C3%A9pites-de-poulet-maison-isol%C3%A9es-sur-fond-blanc.webp?a=1&b=1&s=612x612&w=0&k=20&c=R2boGiIBBO-Z79juLFIXwqm-7pPBwdFLhhNAIPBnysM=',
  'Kinder-Fav',
  true
),
(
  '11111111-0000-0000-0000-000000000004',
  'Wings',
  '6 BBQ- oder Buffalo-Chicken Wings, würzig & knusprig',
  6.90,
  'https://images.unsplash.com/photo-1608039755401-742074f0548d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  '🔥 Hot',
  true
),
(
  '11111111-0000-0000-0000-000000000004',
  'Pommes',
  'Goldene Pommes frites, knusprig & heiß – mit Ketchup oder Mayo',
  3.50,
  'https://media.istockphoto.com/id/1405543873/fr/photo/savoureuses-frites-fran%C3%A7ais-avec-mayonnaise-et-ketchup-dans-un-bol-en-c%C3%A9ramique.webp?a=1&b=1&s=612x612&w=0&k=20&c=ogaIHGtzCKYSVzZE9rmxKaG9i5AifbK9lfmAnZGlNpk=',
  NULL,
  true
);

-- ─── Verification ────────────────────────────────────────────────────────────
-- SELECT c.name AS category, COUNT(p.id) AS product_count
-- FROM public.categories c
-- LEFT JOIN public.products p ON p.category_id = c.id
-- GROUP BY c.name
-- ORDER BY c.name;
