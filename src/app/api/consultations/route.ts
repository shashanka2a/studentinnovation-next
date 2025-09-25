import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'

// GET /api/consultations - Get user's consultations
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabase()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const consultations = await prisma.consultation.findMany({
      where: { userId: user.id },
      include: {
        project: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ consultations })
  } catch (error) {
    console.error('Error fetching consultations:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/consultations - Create new consultation
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabase()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      type,
      projectId,
      messages,
      requirements,
      recommendations
    } = body

    const consultation = await prisma.consultation.create({
      data: {
        type,
        projectId,
        messages,
        requirements,
        recommendations,
        userId: user.id
      },
      include: {
        project: true
      }
    })

    return NextResponse.json({ consultation }, { status: 201 })
  } catch (error) {
    console.error('Error creating consultation:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
