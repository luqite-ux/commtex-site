import { notFound } from 'next/navigation'
import { getArticleBySlug } from '@/lib/articles-db'
import { NewsArticleClient } from './news-article-client'
import type { Metadata } from 'next'

export const revalidate = 60
export const dynamicParams = true
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const article = await getArticleBySlug(slug); if (!article) return {}; const url = `https://gocommtex.com/news/${slug}`; return { title: `${article.title} | Commtex`, description: article.excerpt, alternates: { canonical: url }, openGraph: { title: article.title, description: article.excerpt, url, type: 'article', images: article.featured_image ? [{ url: article.featured_image }] : undefined } } }

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()
  return <NewsArticleClient article={article} />
}
