import type { MetadataRoute } from 'next'
import { getProducts } from '@/lib/products-db'
import { getArticles } from '@/lib/articles-db'
export const revalidate = 60
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, articles] = await Promise.all([getProducts(), getArticles()]); const base = 'https://gocommtex.com'
  const staticRoutes = ['', '/about', '/products', '/news', '/contact', '/faq'].map((route) => ({ url: `${base}${route}`, lastModified: new Date() }))
  return [...staticRoutes, ...products.map((p) => ({ url: `${base}/products/${p.slug}`, lastModified: new Date() })), ...articles.map((a: any) => ({ url: `${base}/news/${a.slug}`, lastModified: new Date(a.updated_at || a.published_at) }))]
}
