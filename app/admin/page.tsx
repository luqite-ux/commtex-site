'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface AdminStats {
  newsCount: number
  productsCount: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({ newsCount: 0, productsCount: 0 })
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      // Get user
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser()
      setUser(currentUser)

      // Get stats
      const [{ count: newsCount }, { count: productsCount }] = await Promise.all([
        supabase.from('news').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
      ])

      setStats({
        newsCount: newsCount || 0,
        productsCount: productsCount || 0,
      })
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#8B4513]">Admin Dashboard</h1>
            <p className="text-muted-foreground">欢迎, {user?.email}</p>
          </div>
          <form
            action={async () => {
              'use server'
              await supabase.auth.signOut()
            }}
          >
            <Button variant="outline">退出登录</Button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#8B4513]">
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">新闻文章</h3>
            <p className="text-4xl font-bold text-[#8B4513]">{stats.newsCount}</p>
            <p className="text-sm text-muted-foreground mt-2">总发布数</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#8B4513]">
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">产品</h3>
            <p className="text-4xl font-bold text-[#8B4513]">{stats.productsCount}</p>
            <p className="text-sm text-muted-foreground mt-2">总数</p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/news">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer p-8 text-center">
              <h2 className="text-2xl font-bold text-[#8B4513] mb-4">新闻管理</h2>
              <p className="text-muted-foreground mb-6">
                发布、编辑、删除新闻文章
              </p>
              <Button className="bg-[#8B4513] hover:bg-[#A0522D]">
                管理新闻
              </Button>
            </div>
          </Link>

          <Link href="/admin/products">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer p-8 text-center">
              <h2 className="text-2xl font-bold text-[#8B4513] mb-4">产品管理</h2>
              <p className="text-muted-foreground mb-6">
                管理产品信息、色卡和图片
              </p>
              <Button className="bg-[#8B4513] hover:bg-[#A0522D]">
                管理产品
              </Button>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
