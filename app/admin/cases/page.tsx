'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CasesPage() {
  const [user, setUser] = useState<any>(null)
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
          <h1 className="text-3xl font-bold text-gray-900">案例展示</h1>
          <p className="text-gray-500 text-sm mt-1">管理成功案例</p>
        </header>

        <main className="flex-1 overflow-auto p-8">
          <Card>
            <CardHeader>
              <CardTitle>案例列表</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">此功能即将开放...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
