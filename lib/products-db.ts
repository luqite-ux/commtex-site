import { createClient } from '@supabase/supabase-js'
import { products as fallbackProducts, type Product } from '@/lib/products-data'

const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
function client() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(), key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  return url && key && tenantId ? createClient(url, key, { auth: { persistSession: false } }) : null
}
function map(row: any): Product {
  const extra = row.extra_data || {}
  return { id: row.id, slug: row.slug, name: row.name_en || row.name, articleNumber: extra.article_number || row.specs?.['Article Number'] || '', category: extra.category_name || row.category_slug || '', mainImage: row.image_url, images: extra.images || [{ src: row.image_url, alt: row.name }], specifications: Object.entries(row.specs || {}).map(([label, value]) => ({ label, value: String(value) })), features: extra.features || [], colorCategories: extra.color_categories || [] }
}
export async function getProducts(): Promise<Product[]> {
  const sb = client(); if (!sb) return fallbackProducts
  const { data, error } = await sb.from('products').select('*').eq('tenant_id', tenantId).eq('is_active', true).order('sort_order')
  return error || !data?.length ? fallbackProducts : data.map(map)
}
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const sb = client(); if (!sb) return fallbackProducts.find((p) => p.slug === slug) || null
  const { data, error } = await sb.from('products').select('*').eq('tenant_id', tenantId).eq('slug', slug).eq('is_active', true).maybeSingle()
  return error || !data ? fallbackProducts.find((p) => p.slug === slug) || null : map(data)
}
