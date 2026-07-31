'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'

function LoginForm() {
  const params = useSearchParams()
  const [pending, setPending] = useState(false)
  const reason = params.get('reason')
  const error = params.get('error')

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-stone-50 to-amber-50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-stone-900">COMMTEX</h1>
          <p className="mt-2 text-sm text-stone-600">网站管理后台登录</p>
          <p className="mt-1 text-xs text-stone-500">登录后将自动进入内容管理后台</p>
        </div>

        {reason === 'unauthorized' && (
          <p className="mb-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
            请先登录后再访问管理后台
          </p>
        )}

        <form
          action="/api/auth/login"
          method="post"
          className="space-y-4"
          onSubmit={() => setPending(true)}
        >
          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-stone-800">
                邮箱
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none placeholder:text-stone-500 focus:border-amber-700 focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-stone-800">
                密码
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none placeholder:text-stone-500 focus:border-amber-700 focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-amber-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-900 disabled:opacity-60"
          >
            {pending ? '登录中…' : '登录'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-stone-600">加载中…</div>}>
      <LoginForm />
    </Suspense>
  )
}
