import { createClient } from '@/lib/supabase/server'

export interface NewsArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image: string
  date: string
  images?: Array<{ src: string; alt: string; caption: string }>
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  slug: string
  name: string
  article_number: string
  category: string
  main_image: string
  color_categories: Array<{
    name: string
    colors: string[]
  }>
  specifications: any[]
  features: any[]
  created_at: string
  updated_at: string
}

export async function getNews(): Promise<NewsArticle[]> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false })

    return data || []
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('news')
      .select('*')
      .eq('slug', slug)
      .single()

    return data || null
  } catch (error) {
    console.error('Error fetching news article:', error)
    return null
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    return data || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()

    return data || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}
