'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ProductsManagement() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
    setLoading(false)
  }

  if (loading) {
    return <div className="p-8">加载中...</div>
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#8B4513]">产品管理</h1>
          <Link href="/admin">
            <Button variant="outline">返回</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={product.main_image || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-[#8B4513] mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {product.article_number}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  分类: {product.category}
                </p>
                {product.color_categories && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold mb-2">色卡:</p>
                    {product.color_categories.map((cat: any, idx: number) => (
                      <p key={idx} className="text-xs text-muted-foreground">
                        {cat.name}: {cat.colors?.length || 0} 种颜色
                      </p>
                    ))}
                  </div>
                )}
                <Button size="sm" variant="outline" className="w-full">
                  编辑
                </Button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">暂无产品数据</p>
          </div>
        )}
      </div>
    </div>
  )
}
