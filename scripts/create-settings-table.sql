-- Create settings table for storing site configuration
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to settings
CREATE POLICY "Anyone can view settings" ON settings
  FOR SELECT USING (true);

-- Allow admin users to manage settings
CREATE POLICY "Admins can insert settings" ON settings
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "Admins can update settings" ON settings
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Insert default contact information (matching the frontend values)
INSERT INTO settings (key, value) VALUES (
  'contact',
  '{
    "phone": "+86 198 8490 0913",
    "email": "commtex@gocommtex.com",
    "address": "Building B, No.16 Shuanghong Road, Haizhou Street, Haining City, Jiaxing, Zhejiang, China",
    "wechat": "",
    "whatsapp": "+86 198 8490 0913",
    "copyright": "Premium Natural Fiber Fabrics Since 2007"
  }'::jsonb
) ON CONFLICT (key) DO NOTHING;
