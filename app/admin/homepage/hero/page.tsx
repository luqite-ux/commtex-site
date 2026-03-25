'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, Trash2, GripVertical, Save, Eye } from 'lucide-react'
import Image from 'next/image'

interface HeroSlide {
  id: string
  image: string
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
  order: number
}

export default function HeroConfigPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [slides, setSlides] = useState<HeroSlide[]>([
    {
      id: '1',
      image: '/images/hero-factory-1.jpg',
      title: 'Premium Cashmere & Wool Fabrics',
      subtitle: '专注高端羊绒羊毛面料 | 20年品质保证',
      buttonText: 'View Products',
      buttonLink: '/products',
      order: 1
    },
    {
      id: '2',
      image: '/images/hero-factory-2.jpg',
      title: 'Crafted with Excellence',
      subtitle: '匠心工艺 | 品质面料',
      buttonText: 'About Us',
      buttonLink: '/about',
      order: 2
    },
    {
      id: '3',
      image: '/images/hero-factory-3.jpg',
      title: 'Global Textile Partner',
      subtitle: '全球合作 | 共创未来',
      buttonText: 'Contact Us',
      buttonLink: '/contact',
      order: 3
    }
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

  const updateSlide = (id: string, field: keyof HeroSlide, value: string) => {
    setSlides(prev => prev.map(slide => 
      slide.id === id ? { ...slide, [field]: value } : slide
    ))
  }

  const addSlide = () => {
    const newSlide: HeroSlide = {
      id: Date.now().toString(),
      image: '/images/hero-fabric.jpg',
      title: '新幻灯片标题',
      subtitle: '幻灯片副标题',
      buttonText: '了解更多',
      buttonLink: '/products',
      order: slides.length + 1
    }
    setSlides(prev => [...prev, newSlide])
  }

  const removeSlide = (id: string) => {
    if (slides.length <= 1) {
      alert('至少需要保留一张轮播图')
      return
    }
    setSlides(prev => prev.filter(slide => slide.id !== id))
  }

  const handleSave = async () => {
    setSaving(true)
    // 模拟保存操作
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
              <h1 className="text-2xl font-bold text-gray-900">英雄轮播图配置</h1>
              <p className="text-gray-500 text-sm mt-1">配置首页顶部轮播图内容</p>
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
          <div className="space-y-6">
            {slides.map((slide, index) => (
              <Card key={slide.id}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                      <CardTitle className="text-lg">轮播图 {index + 1}</CardTitle>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeSlide(slide.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 图片预览 */}
                    <div className="lg:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">背景图片</label>
                      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <Image 
                          src={slide.image} 
                          alt="轮播图"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Input 
                        className="mt-2"
                        placeholder="图片URL"
                        value={slide.image}
                        onChange={(e) => updateSlide(slide.id, 'image', e.target.value)}
                      />
                    </div>
                    
                    {/* 文字配置 */}
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">主标题</label>
                        <Input 
                          value={slide.title}
                          onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                          placeholder="输入主标题"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">副标题</label>
                        <Input 
                          value={slide.subtitle}
                          onChange={(e) => updateSlide(slide.id, 'subtitle', e.target.value)}
                          placeholder="输入副标题"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">按钮文字</label>
                          <Input 
                            value={slide.buttonText}
                            onChange={(e) => updateSlide(slide.id, 'buttonText', e.target.value)}
                            placeholder="按钮文字"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">按钮链接</label>
                          <Input 
                            value={slide.buttonLink}
                            onChange={(e) => updateSlide(slide.id, 'buttonLink', e.target.value)}
                            placeholder="/products"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button 
              variant="outline" 
              className="w-full py-8 border-dashed"
              onClick={addSlide}
            >
              <Plus className="w-5 h-5 mr-2" />
              添加新轮播图
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
