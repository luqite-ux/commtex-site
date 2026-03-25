import { getNews } from '@/lib/supabase/database'

export async function GET() {
  const news = await getNews()
  return Response.json(news)
}
