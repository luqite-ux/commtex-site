'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Save, Eye } from 'lucide-react'

export default function SloganConfigPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [config, setConfig] = useState({
    mainSlogan: 'Premium Fabrics for Global Fashion',
    subSlogan: '专注高端面料，服务全球时尚',
    ctaTitle: '开启合作之旅',
    ctaDescription: '无论您需要小批量样品还是大规模生产订单，我们都能为您提供专业的解决方案。',
    ctaButtonText: '立即咨询',
    ctaButtonLink: '/contact',
    aboutTitle: '关于康美纺织',
    aboutDescription: '康美纺织成立于2003年，是一家专注于高端羊绒、羊毛面料研发与生产的企业。我们拥有先进的生产设备和专业的技术团队，致力于为全球客户提供优质的面料产品和服务。'
  })
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

  const updateConfig = (field: string, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }))
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
              <h1 className="text-2xl font-bold text-gray-900">Slogan文字配置</h1>
              <p className="text-gray-500 text-sm mt-1">配置首页各区域的标语和文案</p>
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
          <div className="space-y-6 max-w-4xl">
            {/* 主标语 */}
            <Card>
              <CardHeader>
                <CardTitle>首页主标语</CardTitle>
                <CardDescription>显示在首页顶部的核心宣传语</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">英文主标语</label>
                  <Input 
                    value={config.mainSlogan}
                    onChange={(e) => updateConfig('mainSlogan', e.target.value)}
                    placeholder="Premium Fabrics for Global Fashion"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">中文副标语</label>
                  <Input 
                    value={config.subSlogan}
                    onChange={(e) => updateConfig('subSlogan', e.target.value)}
                    placeholder="专注高端面料，服务全球时尚"
                  />
                </div>
              </CardContent>
            </Card>

            {/* CTA区域 */}
            <Card>
              <CardHeader>
                <CardTitle>行动召唤区域 (CTA)</CardTitle>
                <CardDescription>引导用户联系咨询的区域文案</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                  <Input 
                    value={config.ctaTitle}
                    onChange={(e) => updateConfig('ctaTitle', e.target.value)}
                    placeholder="开启合作之旅"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">描述文字</label>
                  <Textarea 
                    value={config.ctaDescription}
                    onChange={(e) => updateConfig('ctaDescription', e.target.value)}
                    placeholder="描述文字..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">按钮文字</label>
                    <Input 
                      value={config.ctaButtonText}
                      onChange={(e) => updateConfig('ctaButtonText', e.target.value)}
                      placeholder="立即咨询"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">按钮链接</label>
                    <Input 
                      value={config.ctaButtonLink}
                      onChange={(e) => updateConfig('ctaButtonLink', e.target.value)}
                      placeholder="/contact"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 关于我们 */}
            <Card>
              <CardHeader>
                <CardTitle>关于我们区域</CardTitle>
                <CardDescription>首页关于公司的简介文案</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                  <Input 
                    value={config.aboutTitle}
                    onChange={(e) => updateConfig('aboutTitle', e.target.value)}
                    placeholder="关于康美纺织"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">公司简介</label>
                  <Textarea 
                    value={config.aboutDescription}
                    onChange={(e) => updateConfig('aboutDescription', e.target.value)}
                    placeholder="公司简介..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
