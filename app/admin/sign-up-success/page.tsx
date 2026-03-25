'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SignUpSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <div className="text-4xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-[#8B4513] mb-4">
          注册成功
        </h1>
        <p className="text-muted-foreground mb-6">
          请检查您的邮箱以验证账户。验证后即可登录管理后台。
        </p>
        <Link href="/admin/login">
          <Button className="w-full bg-[#8B4513] hover:bg-[#A0522D]">
            返回登录
          </Button>
        </Link>
      </div>
    </div>
  )
}
