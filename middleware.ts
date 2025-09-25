import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession()

  // Protected routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/ai-consultation',
    '/project-review',
    '/awaiting-developer',
    '/full-app-consultation',
    '/full-app-roadmap',
    '/payment',
    '/project-management'
  ]

  // Admin routes that require admin access
  const adminRoutes = [
    '/admin'
  ]

  // OAuth callback route
  const isOAuthCallback = req.nextUrl.pathname === '/auth/callback'

  // API routes that require authentication
  const protectedApiRoutes = [
    '/api/projects',
    '/api/consultations',
    '/api/payments',
    '/api/user'
  ]

  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  const isAdminRoute = adminRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  const isProtectedApiRoute = protectedApiRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  const isAdminApiRoute = req.nextUrl.pathname.startsWith('/api/admin')

  // Allow OAuth callback to proceed without redirect
  if (isOAuthCallback) {
    return res
  }

  // Check admin access for admin routes
  if ((isAdminRoute || isAdminApiRoute) && session) {
    const userEmail = session.user?.email
    const adminEmails = [
      'jagannathamshashank@gmail.com',
      'payal@starterspace.com',
      'quang@starterspace.com'
    ]
    
    if (!userEmail || !adminEmails.includes(userEmail.toLowerCase())) {
      return NextResponse.redirect(new URL('/signup?error=admin_access_required', req.url))
    }
  }

  // Redirect to signup if accessing protected route without session
  if ((isProtectedRoute || isProtectedApiRoute || isAdminRoute || isAdminApiRoute) && !session) {
    const redirectUrl = new URL('/signup', req.url)
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect authenticated users away from auth pages
  if (session && (req.nextUrl.pathname === '/signup' || req.nextUrl.pathname === '/login')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
