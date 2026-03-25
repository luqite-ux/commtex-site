'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, Trash2, Save, Palette } from 'lucide-react'

interface ColorSwatch {
  id: string
  name: string
  hex: string
  category: string
}

const defaultColors: ColorSwatch[] = [
  { id: '1', name: '珍珠白', hex: '#F5F5F0', category: '基础色' },
  { id: '2', name: '象牙白', hex: '#FFFFF0', category: '基础色' },
  { id: '3', name: '米色', hex: '#F5F5DC', category: '基础色' },
  { id: '4', name: '驼色', hex: '#C19A6B', category: '经典色' },
  { id: '5', name: '咖啡色', hex: '#4A3728', category: '经典色' },
  { id: '6', name: '深灰', hex: '#4A4A4A', category: '经典色' },
  { id: '7', name: '藏青', hex: '#2C3E50', category: '经典色' },
  { id: '8', name: '酒红', hex: '#722F37', category: '时尚色' },
  { id: '9', name: '墨绿', hex: '#2F4538', category: '时尚色' },
  { id: '10', name: '雾霾蓝', hex: '#6B8E9F', category: '时尚色' },
  { id: '11', name: '烟粉', hex: '#E8C4C4', category: '时尚色' },
  { id: '12', name: '姜黄', hex: '#E49B0F', category: '时尚色' },
]

export default function ColorsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [colors, setColors] = useState<ColorSwatch[]>(defaultColors)
  const [filter, setFilter] = useState('全部')
  const router = useRouter()
  const supabase = createClient()

  const categories = ['全部', ...Array.from(new Set(colors.map(c => c.category)))]

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

  const updateColor = (id: string, field: keyof ColorSwatch, value: string) => {
    setColors(prev => prev.map(color => 
      color.id === id ? { ...color, [field]: value } : color
    ))
  }

  const addColor = () => {
    const newColor: ColorSwatch = {
      id: Date.now().toString(),
      name: '新颜色',
      hex: '#CCCCCC',
      category: '基础色'
    }
    setColors(prev => [...prev, newColor])
  }

  const removeColor = (id: string) => {
    setColors(prev => prev.filter(color => color.id !== id))
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    alert('保存成功！')
  }

  const filteredColors = filter === '全部' 
    ? colors 
    : colors.filter(c => c.category === filter)

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
              <h1 className="text-2xl font-bold text-gray-900">色卡库管理</h1>
              <p className="text-gray-500 text-sm mt-1">管理产品可用的颜色色卡</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={addColor}>
                <Plus className="w-4 h-4 mr-2" />
                添加颜色
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? '保存中...' : '保存设置'}
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <Palette className="w-10 h-10 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{colors.length}</p>
                    <p className="text-sm text-gray-500">总颜色数</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {categories.filter(c => c !== '全部').map(cat => (
              <Card key={cat}>
                <CardContent className="pt-6">
                  <div>
                    <p className="text-2xl font-bold">{colors.filter(c => c.category === cat).length}</p>
                    <p className="text-sm text-gray-500">{cat}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 筛选 */}
          <div className="flex gap-2 mb-6">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={filter === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* 颜色列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredColors.map((color) => (
              <Card key={color.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-lg shadow-inner border"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="flex-1 space-y-2">
                      <Input 
                        value={color.name}
                        onChange={(e) => updateColor(color.id, 'name', e.target.value)}
                        placeholder="颜色名称"
                        className="h-8"
                      />
                      <div className="flex gap-2">
                        <Input 
                          type="color"
                          value={color.hex}
                          onChange={(e) => updateColor(color.id, 'hex', e.target.value)}
                          className="w-12 h-8 p-1"
                        />
                        <Input 
                          value={color.hex}
                          onChange={(e) => updateColor(color.id, 'hex', e.target.value)}
                          placeholder="#FFFFFF"
                          className="flex-1 h-8 font-mono text-sm"
                        />
                      </div>
                      <select
                        value={color.category}
                        onChange={(e) => updateColor(color.id, 'category', e.target.value)}
                        className="w-full h-8 text-sm border rounded px-2"
                      >
                        <option value="基础色">基础色</option>
                        <option value="经典色">经典色</option>
                        <option value="时尚色">时尚色</option>
                      </select>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeColor(color.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
