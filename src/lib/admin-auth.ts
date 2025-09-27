import { createServerSupabase } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function checkAdminAuth(request: NextRequest) {
  try {
    const supabase = createServerSupabase()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return {
        isAuthenticated: false,
        isAdmin: false,
        user: null,
        error: 'Unauthorized'
      }
    }

    // Get user from database to check role
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true
      }
    })

    if (!dbUser || !dbUser.isActive) {
      return {
        isAuthenticated: false,
        isAdmin: false,
        user: null,
        error: 'User not found or inactive'
      }
    }

    const isAdmin = dbUser.role === 'ADMIN' || dbUser.role === 'SUPER_ADMIN'

    return {
      isAuthenticated: true,
      isAdmin,
      user: dbUser,
      error: null
    }
  } catch (error) {
    console.error('Admin auth check error:', error)
    return {
      isAuthenticated: false,
      isAdmin: false,
      user: null,
      error: 'Authentication error'
    }
  }
}

export async function requireAdmin(request: NextRequest) {
  const authResult = await checkAdminAuth(request)
  
  if (!authResult.isAuthenticated || !authResult.isAdmin) {
    return {
      success: false,
      error: 'Admin access required',
      redirect: '/admin/login'
    }
  }

  return {
    success: true,
    user: authResult.user
  }
}
