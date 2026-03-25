'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Eye, Calendar, FileText } from 'lucide-react'

interface NewsArticle {
  id?: string
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image: string
  date: string
  images?: any[]
}

export default function NewsManagement() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState<NewsArticle>({
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    cover_image: '',
    date: new Date().toISOString().split('T')[0],
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
      fetchNews()
    }
    init()
  }, [])

  const fetchNews = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false })

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
        .update({
          slug: formData.slug,
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          cover_image: formData.cover_image,
          date: formData.date,
        })
        .eq('id', editingId)

      if (!error) {
        fetchNews()
        resetForm()
      } else {
        alert('更新失败: ' + error.message)
      }
    } else {
      const { error } = await supabase.from('news').insert([{
        slug: formData.slug,
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        cover_image: formData.cover_image,
        date: formData.date,
      }])

      if (!error) {
        fetchNews()
        resetForm()
      } else {
        alert('发布失败: ' + error.message)
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('确定删除此文章?')) {
      const { error } = await supabase.from('news').delete().eq('id', id)
      if (!error) {
        fetchNews()
      } else {
        alert('删除失败: ' + error.message)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      cover_image: '',
      date: new Date().toISOString().split('T')[0],
    })
    setShowForm(false)
    setEditingId(null)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar onLogout={handleLogout} userEmail={user?.email} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">新闻管理</h1>
              <p className="text-gray-500 text-sm mt-1">发布、编辑、删除新闻文章</p>
            </div>
            <Button
              onClick={() => {
                setShowForm(!showForm)
                if (showForm) resetForm()
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              {showForm ? '取消' : '新建文章'}
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{editingId ? '编辑文章' : '新建文章'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">标题 *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Slug (URL路径) *</label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="例如: my-news-article"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">摘要 *</label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">内容（Markdown） *</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={12}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">封面图片 URL *</label>
                      <input
                        type="url"
                        value={formData.cover_image}
                        onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">发布日期 *</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  {formData.cover_image && (
                    <div>
                      <label className="block text-sm font-medium mb-2">封面预览</label>
                      <img
                        src={formData.cover_image}
                        alt="封面预览"
                        className="h-32 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                  <div className="flex gap-4">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      {editingId ? '保存修改' : '发布文章'}
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
          ) : news.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">暂无新闻文章</p>
                <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  发布第一篇文章
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {news.map((article) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {article.cover_image && (
                        <div className="flex-shrink-0">
                          <img
                            src={article.cover_image}
                            alt={article.title}
                            className="w-32 h-24 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {article.date}
                          </span>
                          <span>/{article.slug}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`/news/${article.slug}`, '_blank')}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(article.id || null)
                            setFormData({
                              slug: article.slug,
                              title: article.title,
                              excerpt: article.excerpt,
                              content: article.content,
                              cover_image: article.cover_image,
                              date: article.date,
                            })
                            setShowForm(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(article.id || '')}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
