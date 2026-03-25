'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface NewsArticle {
  id?: string
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image: string
  published_at: string
}

export default function NewsManagement() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<NewsArticle>({
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    cover_image: '',
    published_at: new Date().toISOString().split('T')[0],
  })
  const supabase = createClient()

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false })

    if (!error && data) {
      setNews(data as NewsArticle[])
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      const { error } = await supabase
        .from('news')
        .update(formData)
        .eq('id', editingId)

      if (!error) {
        fetchNews()
        resetForm()
      }
    } else {
      const { error } = await supabase.from('news').insert([formData])

      if (!error) {
        fetchNews()
        resetForm()
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('确定删除此文章?')) {
      await supabase.from('news').delete().eq('id', id)
      fetchNews()
    }
  }

  const resetForm = () => {
    setFormData({
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      cover_image: '',
      published_at: new Date().toISOString().split('T')[0],
    })
    setShowForm(false)
    setEditingId(null)
  }

  if (loading) return <div className="p-8">加载中...</div>

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#8B4513]">新闻管理</h1>
          <div className="space-x-2">
            <Link href="/admin">
              <Button variant="outline">返回</Button>
            </Link>
            <Button
              onClick={() => {
                setShowForm(!showForm)
                resetForm()
              }}
              className="bg-[#8B4513] hover:bg-[#A0522D]"
            >
              {showForm ? '取消' : '新建文章'}
            </Button>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">标题</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">摘要</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">内容（Markdown）</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono"
                  rows={10}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">封面图片 URL</label>
                <input
                  type="url"
                  value={formData.cover_image}
                  onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">发布日期</label>
                <input
                  type="date"
                  value={formData.published_at.split('T')[0]}
                  onChange={(e) =>
                    setFormData({ ...formData, published_at: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <Button
                type="submit"
                className="bg-[#8B4513] hover:bg-[#A0522D] w-full"
              >
                {editingId ? '更新' : '发布'}
              </Button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {news.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md p-6 flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#8B4513]">{article.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{article.excerpt}</p>
                <p className="text-xs text-gray-500 mt-2">
                  发布于: {new Date(article.published_at).toLocaleDateString('zh-CN')}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingId(article.id || null)
                    setFormData(article)
                    setShowForm(true)
                  }}
                >
                  编辑
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(article.id || '')}
                  className="text-red-600 hover:bg-red-50"
                >
                  删除
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
