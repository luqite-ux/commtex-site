import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/products-db'
import { ProductDetailClient } from './product-detail-client'
import type { Metadata } from 'next'

export const revalidate = 60
export const dynamicParams = true
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const product = await getProductBySlug(slug); if (!product) return {}; const description = product.features[0]?.content?.slice(0, 160) || product.name; const url = `https://gocommtex.com/products/${slug}`; return { title: `${product.name} | Commtex`, description, alternates: { canonical: url }, openGraph: { title: product.name, description, url, type: 'website', images: product.mainImage ? [{ url: product.mainImage }] : undefined } } }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()
  return <ProductDetailClient product={product} />
}
