import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin, getAdminDashboardData } from '@/lib/admin-auth'

// GET /api/admin/dashboard - Get admin dashboard data
export async function GET(request: NextRequest) {
  try {
    // Check admin access
    await requireAdmin()

    // Get dashboard data
    const data = await getAdminDashboardData()

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Admin dashboard error:', error)
    
    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
