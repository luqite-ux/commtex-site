import { createClient } from '@supabase/supabase-js'

const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
const client = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(), key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  return url && key && tenantId ? createClient(url, key, { auth: { persistSession: false } }) : null
}
export async function getArticles() {
  const sb = client(); if (!sb) return []
  const { data, error } = await sb.from('articles').select('*').eq('tenant_id', tenantId).eq('is_published', true).order('published_at', { ascending: false })
  if (error) throw error
  return (data || []).map((row) => ({ ...row, cover_image: row.featured_image, date: row.published_at, images: [] }))
}
export async function getArticleBySlug(slug: string) {
  const sb = client(); if (!sb) return null
  const { data, error } = await sb.from('articles').select('*').eq('tenant_id', tenantId).eq('slug', slug).eq('is_published', true).maybeSingle()
  if (error) throw error
  return data ? { ...data, cover_image: data.featured_image, date: data.published_at, images: [] } : null
}
