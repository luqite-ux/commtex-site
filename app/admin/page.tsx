'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Package, Eye, Users } from 'lucide-react'

interface AdminStats {
  newsCount: number
  productsCount: number
  viewCount: number
  inquiries: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({ 
    newsCount: 0, 
    productsCount: 0,
    viewCount: 0,
    inquiries: 0
  })
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser()
      
      if (!currentUser) {
        router.push('/admin/login')
        return
      }
      
      setUser(currentUser)

      const [{ count: newsCount }, { count: productsCount }] = await Promise.all([
        supabase.from('news').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
      ])

      setStats({
        newsCount: newsCount || 0,
        productsCount: productsCount || 0,
        viewCount: 2450,
        inquiries: 12,
      })
      setLoading(false)
    }

    fetchData()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar onLogout={handleLogout} userEmail={user?.email} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">环球出海拓客网站系统</h1>
              <p className="text-gray-500 text-sm mt-1">欢迎回来！</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">新闻文章</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{stats.newsCount}</p>
                    <p className="text-xs text-gray-500 mt-1">已发布</p>
                  </div>
                  <FileText className="w-12 h-12 text-blue-100" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">产品数量</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{stats.productsCount}</p>
                    <p className="text-xs text-gray-500 mt-1">在线中</p>
                  </div>
                  <Package className="w-12 h-12 text-green-100" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">网站浏览</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{stats.viewCount}</p>
                    <p className="text-xs text-gray-500 mt-1">本月</p>
                  </div>
                  <Eye className="w-12 h-12 text-purple-100" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">询盘记录</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{stats.inquiries}</p>
                    <p className="text-xs text-gray-500 mt-1">待处理</p>
                  </div>
                  <Users className="w-12 h-12 text-orange-100" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/admin/news">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">新闻管理</CardTitle>
                  <CardDescription>发布、编辑、删除新闻文章</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    管理新闻
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/products">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">产品管理</CardTitle>
                  <CardDescription>管理产品信息、色卡和图片</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    管理产品
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/media">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">媒体库</CardTitle>
                  <CardDescription>上传和管理所有图片资源</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    进入媒体库
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
