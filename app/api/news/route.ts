import { getNews } from '@/lib/supabase/database'

export async function GET() {
  const articles = await getNews()
  return Response.json(articles)
}
