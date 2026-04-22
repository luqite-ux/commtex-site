import { getNewsBySlug } from '@/lib/supabase/database'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const article = await getNewsBySlug(slug)
  
  if (!article) {
    return Response.json({ error: 'Article not found' }, { status: 404 })
  }
  
  return Response.json(article)
}
