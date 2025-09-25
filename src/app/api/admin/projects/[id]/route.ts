import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin, getProjectDetails, updateProjectStatus } from '@/lib/admin-auth'

// GET /api/admin/projects/[id] - Get project details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin access
    await requireAdmin()

    // Get project details
    const project = await getProjectDetails(params.id)

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ project })
  } catch (error) {
    console.error('Admin project details error:', error)
    
    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/admin/projects/[id] - Update project status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin access
    await requireAdmin()

    const body = await request.json()
    const { status, notes } = body

    // Update project status
    const project = await updateProjectStatus(params.id, status, notes)

    return NextResponse.json({ project })
  } catch (error) {
    console.error('Admin project update error:', error)
    
    if (error instanceof Error && error.message === 'Admin access required') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
