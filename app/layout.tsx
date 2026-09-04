import React from "react"
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ChatWidget } from '@/components/chat-widget'
import { I18nProviderWrapper } from '@/components/providers/i18n-provider'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif"
});
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gocommtex.com'),
  title: 'Commtex | Premium Natural Fiber Fabrics',
  description: 'Commtex - 18 years of expertise in premium natural fiber fabrics. Specializing in wool, cashmere, yak, alpaca, and silk for autumn/winter fashion collections.',
  keywords: 'textile, fabric, wool, cashmere, yak, alpaca, silk, natural fiber, fashion fabric, autumn winter fabric',
  generator: 'v0.app',
  alternates: { canonical: '/' },
  openGraph: { title: 'Commtex | Premium Natural Fiber Fabrics', description: 'Premium natural fiber fabrics for autumn and winter collections.', type: 'website', url: 'https://gocommtex.com' },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        <I18nProviderWrapper>
          {children}
          <ChatWidget />
        </I18nProviderWrapper>
        <Analytics />
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_TENANT_ID && (
          <script
            async
            src={`https://admin.globle-trade.com/api/public/analytics.js?tenantId=${encodeURIComponent(process.env.NEXT_PUBLIC_TENANT_ID)}`}
          />
        )}
      </body>
    </html>
  )
}
