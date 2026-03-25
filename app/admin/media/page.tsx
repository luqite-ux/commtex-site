'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AdminSidebar } from '@/components/admin/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Trash2, Copy } from 'lucide-react'
import Image from 'next/image'

interface MediaFile {
  id: string
  name: string
  url: string
  size: number
  created_at: string
}

export default function MediaCenter() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        
        const { error } = await supabase.storage
          .from('media')
          .upload(`admin/${fileName}`, file)

        if (error) throw error
      }

      // Refresh file list
      loadFiles()
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const loadFiles = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.storage
        .from('media')
        .list('admin/')

      if (error) throw error

      // Get signed URLs for files
      const filesWithUrls = await Promise.all(
        (data || []).map(async (file) => {
          const { data: signedData } = await supabase.storage
            .from('media')
            .createSignedUrl(`admin/${file.name}`, 3600)

          return {
            id: file.name,
            name: file.name,
            url: signedData?.signedUrl || '',
            size: file.metadata?.size || 0,
            created_at: file.created_at || new Date().toISOString(),
          }
        })
      )

      setFiles(filesWithUrls)
    } catch (error) {
      console.error('Load files error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) loadFiles()
  }, [user])

  const handleDelete = async (fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from('media')
        .remove([`admin/${fileName}`])

      if (error) throw error
      setFiles(files.filter(f => f.id !== fileName))
    } catch (error) {
      console.error('Delete error:', error)
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
          <h1 className="text-3xl font-bold text-gray-900">媒体中心</h1>
          <p className="text-gray-500 text-sm mt-1">上传和管理所有图片资源</p>
        </header>

        <main className="flex-1 overflow-auto p-8">
          {/* Upload Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>上传新文件</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="text-lg font-medium text-gray-700">
                      {uploading ? '上传中...' : '拖拽文件或点击选择'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">支持 PNG, JPG, GIF 等格式</p>
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Files Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file) => (
              <Card key={file.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative w-full h-48 bg-gray-200">
                  {file.url && (
                    <Image
                      src={file.url}
                      alt={file.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="text-sm font-medium truncate mb-2">{file.name}</p>
                  <p className="text-xs text-gray-500 mb-4">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigator.clipboard.writeText(file.url)}
                      className="flex-1"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(file.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {files.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500">暂无文件，请上传图片</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
