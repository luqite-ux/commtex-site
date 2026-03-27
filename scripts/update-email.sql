-- Update email in settings table
UPDATE settings 
SET value = jsonb_set(value, '{email}', '"info@gocommtex.com"')
WHERE key = 'contact';
