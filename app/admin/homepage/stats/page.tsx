'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Save, Eye, Plus, Trash2 } from 'lucide-react'

interface StatItem {
  id: string
  value: string
  label: string
  suffix: string
}

export default function StatsConfigPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<StatItem[]>([
    { id: '1', value: '20', label: '年行业经验', suffix: '+' },
    { id: '2', value: '500', label: '合作品牌', suffix: '+' },
    { id: '3', value: '50', label: '出口国家', suffix: '+' },
    { id: '4', value: '1000', label: '面料品种', suffix: '+' },
  ])
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

  const updateStat = (id: string, field: keyof StatItem, value: string) => {
    setStats(prev => prev.map(stat => 
      stat.id === id ? { ...stat, [field]: value } : stat
    ))
  }

  const addStat = () => {
    const newStat: StatItem = {
      id: Date.now().toString(),
      value: '100',
      label: '新统计项',
      suffix: '+'
    }
    setStats(prev => [...prev, newStat])
  }

  const removeStat = (id: string) => {
    if (stats.length <= 2) {
      alert('至少需要保留两个统计项')
      return
    }
    setStats(prev => prev.filter(stat => stat.id !== id))
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    alert('保存成功！')
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar onLogout={handleLogout} userEmail={user?.email} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">统计数据配置</h1>
              <p className="text-gray-500 text-sm mt-1">配置首页数据统计展示</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => window.open('/', '_blank')}>
                <Eye className="w-4 h-4 mr-2" />
                预览首页
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? '保存中...' : '保存设置'}
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          <Card>
            <CardHeader>
              <CardTitle>统计数据项</CardTitle>
              <CardDescription>这些数据将显示在首页的统计区域</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={stat.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-400 font-medium w-8">{index + 1}.</span>
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">数值</label>
                        <Input 
                          value={stat.value}
                          onChange={(e) => updateStat(stat.id, 'value', e.target.value)}
                          placeholder="100"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">后缀</label>
                        <Input 
                          value={stat.suffix}
                          onChange={(e) => updateStat(stat.id, 'suffix', e.target.value)}
                          placeholder="+"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">标签文字</label>
                        <Input 
                          value={stat.label}
                          onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
                          placeholder="年行业经验"
                        />
                      </div>
                    </div>
                    <div className="bg-white px-4 py-2 rounded border text-center min-w-[120px]">
                      <div className="text-2xl font-bold text-blue-600">{stat.value}{stat.suffix}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeStat(stat.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4 border-dashed"
                onClick={addStat}
              >
                <Plus className="w-4 h-4 mr-2" />
                添加统计项
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
