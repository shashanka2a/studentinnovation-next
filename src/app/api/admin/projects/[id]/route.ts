import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT /api/admin/projects/[id] - Update project (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // No authentication required for MVP

    const body = await request.json()
    const { landingPageUrl, adminNotes, screenshots } = body

    const project = await prisma.project.update({
      where: {
        id: params.id
      },
      data: {
        landingPageUrl,
        adminNotes,
        screenshots: screenshots || [],
        updatedAt: new Date()
      }
    })

    return NextResponse.json({ 
      success: true, 
      project,
      message: 'Project updated successfully' 
    })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ 
      error: 'Failed to update project',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}