-- Seed data for news table
INSERT INTO public.news (slug, title, excerpt, content, date, cover_image) VALUES
(
  '2026-cashmere-color-trends',
  'Tactile Blank Space & Emotional Spectrum: An In-Depth Analysis of 2026 Cashmere Industry Color Trends',
  'After Pantone named Cloud Dancer as the 2026 Color of the Year, the global fashion scene has embraced a shift toward quiet, texture-driven elegance.',
  'After Pantone Color Institute named Cloud Dancer as the 2026 Color of the Year, the global fashion scene has embraced a collective shift toward quiet, texture-driven elegance—and no material embodies this movement better than cashmere, the coveted "soft gold" of luxury fibers.',
  '2026-03-01',
  '/images/news/2026-cashmere-trends/cover.jpg'
),
(
  '2025-annual-celebration',
  'A Night to Remember: Commtex Teams Gather for 2025 Annual Festivities',
  'At Commtex, we believe that our strength lies in the vibrant, dedicated team behind our success.',
  'At Commtex, we believe that our strength lies not only in the innovative products we create but also in the vibrant, dedicated team behind them. As we close another remarkable year, we are thrilled to share highlights from our Annual Celebration.',
  '2025-01-15',
  '/images/news/2025-annual/05-big-family.jpg'
);

-- Seed data for products table
INSERT INTO public.products (slug, name, article_number, category, main_image, color_categories) VALUES
('ss250403zs', 'Double-faced Wool Fabric', 'SS250403ZS', 'Wool Blend', '/images/products/ss250403zs/main.jpg', '[{"name": "Light Tones", "colors": ["#F5F1ED", "#E8DDD5", "#DDD0C5"]}, {"name": "Dark Tones", "colors": ["#2C1810", "#3D2817", "#4A3428"]}]'::jsonb),
('ss250404', 'Luxury Wool Blend', 'SS250404', 'Wool Blend', '/images/products/ss250404/main.jpg', '[{"name": "Natural", "colors": ["#E6D5C3", "#D4C5B9"]}]'::jsonb),
('ss250407lm', 'Fine Cashmere Twill', 'SS250407LM', 'Cashmere', '/images/products/ss250407lm/main.jpg', '[{"name": "Signature", "colors": ["#A89968", "#8B7355", "#6B5C47"]}]'::jsonb),
('ss238016cs', 'Classic Cashmere Blend', 'SS238016CS', 'Cashmere Blend', '/images/products/ss238016cs/main.jpg', '[{"name": "Pastels", "colors": ["#FFE4D6", "#F0D9CE", "#E5CEC3"]}]'::jsonb),
('ss02023592cs', 'Premium Alpaca Blend', 'SS02023592CS', 'Alpaca Blend', '/images/products/ss02023592cs/main.jpg', '[{"name": "Warm Earth", "colors": ["#C9A877", "#B89968", "#A0825F"]}]'::jsonb),
('ss2356265bzs', 'Elegant Cashmere Twill', 'SS2356265BZS', 'Cashmere', '/images/products/ss2356265bzs/main.jpg', '[{"name": "Jewel Tones", "colors": ["#4A3728", "#6B5344", "#8B6F47"]}]'::jsonb),
('sd248042cs', 'Luxury Silk Cashmere', 'SD248042CS', 'Silk Blend', '/images/products/sd248042cs/main.jpg', '[{"name": "Luminous", "colors": ["#F5E6D3", "#E8D4C1", "#DBC2AF"]}]'::jsonb),
('sd07021asxw', 'Fine Wool Twill', 'SD07021ASX', 'Wool', '/images/products/sd07021asxw/main.jpg', '[{"name": "Classic", "colors": ["#2C2C2C", "#404040", "#555555"]}]'::jsonb),
('sd02019601', 'Pure Cashmere Jersey', 'SD02019601', 'Cashmere', '/images/products/sd02019601/main.jpg', '[{"name": "Versatile", "colors": ["#E8E0D5", "#D4C9BD", "#BFAFA3"]}]'::jsonb),
('sdf8955n', 'Specialty Blend', 'SDF8955N', 'Mixed Fibers', '/images/products/sdf8955n/main.jpg', '[{"name": "Modern", "colors": ["#6B7B8C", "#7A8A99", "#8899A8"]}]'::jsonb),
('zd2580a2cs', 'Premium Yak Blend', 'ZD2580A2CS', 'Yak Blend', '/images/products/zd2580a2cs/main.jpg', '[{"name": "Earthy", "colors": ["#9B8B7E", "#8A7968", "#7A6B5C"]}]'::jsonb),
('zd033510cl', 'Cotton-Cashmere Blend', 'ZD033510CL', 'Cotton Blend', '/images/products/zd033510cl/main.jpg', '[{"name": "Fresh", "colors": ["#F0E8DC", "#E5D9CB", "#D9CCBB"]}]'::jsonb);
