'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  message: string
  status: 'new' | 'read' | 'replied'
  created_at: string
}

export default function InquiriesPage() {
  const [user, setUser] = useState<any>(null)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    if (user) loadInquiries()
  }, [user])

  const loadInquiries = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setInquiries(data || [])
    } catch (error) {
      console.error('Load error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id)

      if (error) throw error
      loadInquiries()
    } catch (error) {
      console.error('Update error:', error)
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
          <h1 className="text-3xl font-bold text-gray-900">询盘记录</h1>
          <p className="text-gray-500 text-sm mt-1">管理客户询盘</p>
        </header>

        <main className="flex-1 overflow-auto p-8">
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <Card key={inquiry.id}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">姓名</p>
                      <p className="font-medium">{inquiry.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">邮箱</p>
                      <p className="font-medium">{inquiry.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">电话</p>
                      <p className="font-medium">{inquiry.phone}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">留言</p>
                    <p className="text-gray-700">{inquiry.message}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm px-2 py-1 rounded ${
                      inquiry.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                      inquiry.status === 'read' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {inquiry.status === 'new' ? '新' : inquiry.status === 'read' ? '已读' : '已回复'}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(inquiry.id, 'read')}
                      >
                        标记已读
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(inquiry.id, 'replied')}
                      >
                        标记已回复
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {inquiries.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500">暂无询盘记录</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
