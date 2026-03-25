'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Briefcase, Building2, Globe, Award } from 'lucide-react'

// 示例案例数据 - 将来可以从数据库加载
const sampleCases = [
  {
    id: '1',
    client: 'Max Mara',
    country: '意大利',
    industry: '高端时装',
    description: '为Max Mara提供高品质羊绒面料，应用于秋冬大衣系列',
    image: '/images/cashmere-fabric.jpg',
    year: '2024',
  },
  {
    id: '2',
    client: 'Brunello Cucinelli',
    country: '意大利',
    industry: '奢侈品牌',
    description: '定制开发超细羊绒混纺面料，用于高端针织系列',
    image: '/images/wool-fabric.jpg',
    year: '2023',
  },
  {
    id: '3',
    client: 'Loro Piana',
    country: '意大利',
    industry: '奢侈面料',
    description: '合作开发羊驼毛混纺面料，应用于限量版外套系列',
    image: '/images/alpaca-fabric.jpg',
    year: '2024',
  },
]

export default function CasesPage() {
  const [user, setUser] = useState<any>(null)
  const [cases, setCases] = useState(sampleCases)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!currentUser) router.push('/admin/login')
      setUser(currentUser)
    }
    fetchUser()
  }, [])

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
              <h1 className="text-3xl font-bold text-gray-900">案例展示</h1>
              <p className="text-gray-500 text-sm mt-1">管理成功合作案例</p>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              添加案例
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">合作品牌</p>
                    <p className="text-2xl font-bold">{cases.length}</p>
                  </div>
                  <Building2 className="w-8 h-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">覆盖国家</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <Globe className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">行业领域</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                  <Briefcase className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">年度新增</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <Award className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 案例列表 */}
          <Card>
            <CardHeader>
              <CardTitle>案例列表</CardTitle>
              <CardDescription>展示与知名品牌的成功合作案例</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cases.map((caseItem) => (
                  <Card key={caseItem.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={caseItem.image}
                        alt={caseItem.client}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">{caseItem.client}</h3>
                        <span className="text-xs text-gray-400">{caseItem.year}</span>
                      </div>
                      <div className="flex gap-2 mb-3">
                        <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded">
                          {caseItem.country}
                        </span>
                        <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded">
                          {caseItem.industry}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {caseItem.description}
                      </p>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          编辑
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                          删除
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 功能提示 */}
              <div className="mt-8 p-6 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">功能说明</h4>
                <p className="text-sm text-orange-700">
                  案例展示功能目前使用示例数据。如需启用完整功能，需要在数据库中创建 cases 表来存储案例数据。
                  您可以联系开发人员添加此功能。
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
