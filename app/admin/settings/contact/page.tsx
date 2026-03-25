'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ContactSettings() {
  const [user, setUser] = useState<any>(null)
  const [contact, setContact] = useState({
    phone: '',
    email: '',
    address: '',
    wechat: '',
    whatsapp: '',
    copyright: '',
  })
  const [saving, setSaving] = useState(false)
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

  const handleSave = async () => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({
          key: 'contact',
          value: contact,
        })

      if (error) throw error
      alert('联系方式已保存')
    } catch (error) {
      console.error('Save error:', error)
      alert('保存失败')
    } finally {
      setSaving(false)
    }
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
          <h1 className="text-3xl font-bold text-gray-900">联系方式设置</h1>
          <p className="text-gray-500 text-sm mt-1">配置网站联系信息和底部版权</p>
        </header>

        <main className="flex-1 overflow-auto p-8">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>联系信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  电话
                </label>
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+86 138 0000 0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  邮箱
                </label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="info@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  地址
                </label>
                <textarea
                  value={contact.address}
                  onChange={(e) => setContact({ ...contact, address: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入公司地址"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  微信
                </label>
                <input
                  type="text"
                  value={contact.wechat}
                  onChange={(e) => setContact({ ...contact, wechat: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入微信账号"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={contact.whatsapp}
                  onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+86 138 0000 0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  底部版权信息
                </label>
                <textarea
                  value={contact.copyright}
                  onChange={(e) => setContact({ ...contact, copyright: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="© 2024 环球出海. All rights reserved."
                />
              </div>

              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {saving ? '保存中...' : '保存设置'}
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
