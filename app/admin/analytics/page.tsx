'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Users, MousePointer, Clock, TrendingUp, Globe, FileText, Package } from 'lucide-react'

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!currentUser) {
        router.push('/admin/login')
        return
      }
      setUser(currentUser)
      setLoading(false)
    }
    checkAuth()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>
  }

  // 模拟数据
  const stats = {
    pageViews: 12580,
    visitors: 3420,
    avgDuration: '2:35',
    bounceRate: '42%',
  }

  const topPages = [
    { path: '/', name: '首页', views: 4520 },
    { path: '/products', name: '产品中心', views: 2850 },
    { path: '/about', name: '关于我们', views: 1680 },
    { path: '/contact', name: '联系我们', views: 1240 },
    { path: '/news', name: '新闻动态', views: 980 },
  ]

  const topCountries = [
    { name: '美国', visits: 1250, percent: 28 },
    { name: '意大利', visits: 980, percent: 22 },
    { name: '德国', visits: 650, percent: 15 },
    { name: '法国', visits: 520, percent: 12 },
    { name: '英国', visits: 420, percent: 10 },
  ]

  const recentActivity = [
    { type: 'view', page: '产品详情 - SS250403ZS', time: '5分钟前' },
    { type: 'inquiry', page: '联系表单提交', time: '12分钟前' },
    { type: 'view', page: '关于我们', time: '18分钟前' },
    { type: 'view', page: '新闻 - 2026色彩趋势', time: '25分钟前' },
    { type: 'view', page: '产品中心', time: '32分钟前' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar onLogout={handleLogout} userEmail={user?.email} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">数据分析</h1>
              <p className="text-gray-500 text-sm mt-1">网站访问统计和用户行为分析</p>
            </div>
            <div className="text-sm text-gray-500">
              数据更新时间: {new Date().toLocaleString('zh-CN')}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          {/* 核心指标 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">本月浏览量</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.pageViews.toLocaleString()}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12.5% 较上月
                    </p>
                  </div>
                  <Eye className="w-12 h-12 text-blue-100" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">独立访客</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.visitors.toLocaleString()}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +8.3% 较上月
                    </p>
                  </div>
                  <Users className="w-12 h-12 text-green-100" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">平均停留时间</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.avgDuration}</p>
                    <p className="text-xs text-gray-500 mt-1">分:秒</p>
                  </div>
                  <Clock className="w-12 h-12 text-purple-100" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">跳出率</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.bounceRate}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                      -3.2% 较上月
                    </p>
                  </div>
                  <MousePointer className="w-12 h-12 text-orange-100" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 热门页面 */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  热门页面
                </CardTitle>
                <CardDescription>本月访问量最高的页面</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPages.map((page, index) => (
                    <div key={page.path} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-medium">
                          {index + 1}
                        </span>
                        <span className="text-sm text-gray-700">{page.name}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{page.views.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 访客来源国家 */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  访客地区分布
                </CardTitle>
                <CardDescription>按国家/地区统计</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCountries.map((country) => (
                    <div key={country.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700">{country.name}</span>
                        <span className="text-sm text-gray-500">{country.percent}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${country.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 最近活动 */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  最近活动
                </CardTitle>
                <CardDescription>实时访问记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'inquiry' ? 'bg-green-500' : 'bg-blue-500'
                      }`} />
                      <div>
                        <p className="text-sm text-gray-700">{activity.page}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 提示信息 */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 text-gray-500">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">数据分析说明</p>
                  <p className="text-sm">当前展示的是模拟数据。如需接入真实统计，可以集成 Google Analytics、百度统计或 Vercel Analytics。</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
