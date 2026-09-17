import { NextResponse as ServiceGuardNextResponse, type NextRequest as ServiceGuardRequest } from 'next/server'
import { isServiceGuardExcludedPath, isWebsiteServiceAvailable } from './lib/service-status'
import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/admin-session'

function existingServiceExpiryIntegration(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = pathname.startsWith('/admin/login') || pathname.startsWith('/admin/logout')

  if (!isPublic && pathname.startsWith('/admin')) {
    if (!request.cookies.get(SESSION_COOKIE)?.value) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('reason', 'unauthorized')
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next/static|_next/image).*)'] }

export async function middleware(request: ServiceGuardRequest) {
  if (!isServiceGuardExcludedPath(request.nextUrl.pathname) && !await isWebsiteServiceAvailable()) return ServiceGuardNextResponse.rewrite(new URL('/service-expired', request.url))
  return existingServiceExpiryIntegration(request)
}
