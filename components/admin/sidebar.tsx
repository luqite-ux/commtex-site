'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  LayoutDashboard,
  FileText,
  Package,
  Palette,
  Settings,
  LogOut,
  ChevronDown,
  Home,
  Image as ImageIcon,
  Briefcase,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const menuItems = [
  {
    label: '首页仪表板',
    icon: LayoutDashboard,
    href: '/admin',
  },
  {
    label: '首页配置',
    icon: Home,
    children: [
      { label: '英雄轮播图', href: '/admin/homepage/hero' },
      { label: '统计数据', href: '/admin/homepage/stats' },
      { label: 'Slogan文字', href: '/admin/homepage/slogan' },
    ],
  },
  {
    label: '内容管理',
    icon: FileText,
    children: [
      { label: '新闻管理', href: '/admin/news' },
      { label: '产品管理', href: '/admin/products' },
      { label: '案例展示', href: '/admin/cases' },
    ],
  },
  {
    label: '业务支持',
    icon: Briefcase,
    children: [
      { label: '产品分类', href: '/admin/categories' },
      { label: '色卡库', href: '/admin/colors' },
    ],
  },
  {
    label: '媒体中心',
    icon: ImageIcon,
    href: '/admin/media',
  },
  {
    label: '数据分析',
    icon: BarChart3,
    href: '/admin/analytics',
  },
  {
    label: '系统设置',
    icon: Settings,
    children: [
      { label: 'SEO设置', href: '/admin/settings/seo' },
      { label: '询盘记录', href: '/admin/settings/inquiries' },
      { label: '联系方式', href: '/admin/settings/contact' },
    ],
  },
]

interface SidebarProps {
  onLogout: () => void
  userEmail?: string
}

export function AdminSidebar({ onLogout, userEmail }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(['内容管理'])

  const toggleExpand = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  const isActive = (href: string) => pathname === href

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <div>
            <h1 className="text-sm font-bold text-gray-900">环球出海</h1>
            <p className="text-xs text-gray-500">拓客网站系统</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const hasChildren = 'children' in item
          const isExpanded = expandedItems.includes(item.label)

          if (hasChildren) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleExpand(item.label)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>
                {isExpanded && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        <div
                          className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive(child.href)
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {child.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return (
            <Link key={item.href} href={item.href!}>
              <div
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.href!)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="border-t border-gray-200 p-4">
        <div className="text-xs text-gray-600 mb-3 truncate">
          {userEmail || '用户'}
        </div>
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full text-sm"
        >
          <LogOut className="w-4 h-4 mr-2" />
          退出登录
        </Button>
      </div>
    </aside>
  )
}
