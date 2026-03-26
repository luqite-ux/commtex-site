import { getAllNewsArticles } from '@/lib/news-data'

export async function GET() {
  const articles = getAllNewsArticles()
  
  // Transform to match API response format
  const formattedArticles = articles.map(article => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    date: article.date,
    cover_image: article.coverImage,
    images: article.images
  }))
  
  return Response.json(formattedArticles)
}
