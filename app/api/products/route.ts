import { getProducts } from '@/lib/supabase/database'

export async function GET() {
  const products = await getProducts()
  return Response.json(products)
}
