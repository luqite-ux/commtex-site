'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Eye, Package, Palette } from 'lucide-react'

interface Product {
  id?: string
  slug: string
  name: string
  article_number: string
  category: string
  main_image: string
  images?: any[]
  specifications?: Record<string, string>
  features?: string[]
  color_categories?: {
    name: string
    colors: { name: string; hex: string }[]
  }[]
}

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState<Product>({
    slug: '',
    name: '',
    article_number: '',
    category: '',
    main_image: '',
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const init = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!currentUser) {
        router.push('/admin/login')
        return
      }
      setUser(currentUser)
      fetchProducts()
    }
    init()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setProducts(data as Product[])
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      const { error } = await supabase
        .from('products')
        .update({
          slug: formData.slug,
          name: formData.name,
          article_number: formData.article_number,
          category: formData.category,
          main_image: formData.main_image,
        })
        .eq('id', editingId)

      if (!error) {
        fetchProducts()
        resetForm()
      } else {
        alert('更新失败: ' + error.message)
      }
    } else {
      const { error } = await supabase.from('products').insert([{
        slug: formData.slug,
        name: formData.name,
        article_number: formData.article_number,
        category: formData.category,
        main_image: formData.main_image,
      }])

      if (!error) {
        fetchProducts()
        resetForm()
      } else {
        alert('添加失败: ' + error.message)
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('确定删除此产品?')) {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (!error) {
        fetchProducts()
      } else {
        alert('删除失败: ' + error.message)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      slug: '',
      name: '',
      article_number: '',
      category: '',
      main_image: '',
    })
    setShowForm(false)
    setEditingId(null)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      cashmere: '羊绒系列',
      wool: '羊毛系列',
      alpaca: '羊驼毛系列',
      blended: '混纺系列',
    }
    return labels[cat] || cat
  }

  const getColorCount = (product: Product) => {
    if (!product.color_categories) return 0
    return product.color_categories.reduce((sum, cat) => sum + (cat.colors?.length || 0), 0)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar onLogout={handleLogout} userEmail={user?.email} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">产品管理</h1>
              <p className="text-gray-500 text-sm mt-1">管理产品信息、色卡和图片</p>
            </div>
            <Button
              onClick={() => {
                setShowForm(!showForm)
                if (showForm) resetForm()
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              {showForm ? '取消' : '添加产品'}
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{editingId ? '编辑产品' : '添加产品'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">产品名称 *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">货号 *</label>
                      <input
                        type="text"
                        value={formData.article_number}
                        onChange={(e) => setFormData({ ...formData, article_number: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="例如: SS250403ZS"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Slug (URL路径) *</label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="例如: ss250403zs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">产品分类 *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      >
                        <option value="">选择分类</option>
                        <option value="cashmere">羊绒系列</option>
                        <option value="wool">羊毛系列</option>
                        <option value="alpaca">羊驼毛系列</option>
                        <option value="blended">混纺系列</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">主图 URL *</label>
                    <input
                      type="url"
                      value={formData.main_image}
                      onChange={(e) => setFormData({ ...formData, main_image: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="https://..."
                      required
                    />
                  </div>
                  {formData.main_image && (
                    <div>
                      <label className="block text-sm font-medium mb-2">图片预览</label>
                      <img
                        src={formData.main_image}
                        alt="预览"
                        className="h-32 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                  <div className="flex gap-4">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      {editingId ? '保存修改' : '添加产品'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      取消
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">加载中...</p>
            </div>
          ) : products.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">暂无产品数据</p>
                <Button onClick={() => setShowForm(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  添加第一个产品
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={product.main_image || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {product.article_number}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                        {getCategoryLabel(product.category)}
                      </span>
                      {getColorCount(product) > 0 && (
                        <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded flex items-center gap-1">
                          <Palette className="w-3 h-3" />
                          {getColorCount(product)} 色
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.open(`/products/${product.slug}`, '_blank')}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        查看
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(product.id || null)
                          setFormData({
                            slug: product.slug,
                            name: product.name,
                            article_number: product.article_number,
                            category: product.category,
                            main_image: product.main_image,
                          })
                          setShowForm(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(product.id || '')}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
