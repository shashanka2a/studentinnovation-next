import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'

// GET /api/consultations/[id] - Get specific consultation
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabase()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const consultation = await prisma.consultation.findFirst({
      where: {
        id: params.id,
        userId: user.id
      },
      include: {
        project: true
      }
    })

    if (!consultation) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 })
    }

    return NextResponse.json({ consultation })
  } catch (error) {
    console.error('Error fetching consultation:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/consultations/[id] - Update consultation
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabase()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      messages,
      requirements,
      recommendations,
      status
    } = body

    const consultation = await prisma.consultation.updateMany({
      where: {
        id: params.id,
        userId: user.id
      },
      data: {
        messages,
        requirements,
        recommendations,
        status,
        updatedAt: new Date()
      }
    })

    if (consultation.count === 0) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 })
    }

    const updatedConsultation = await prisma.consultation.findUnique({
      where: { id: params.id },
      include: {
        project: true
      }
    })

    return NextResponse.json({ consultation: updatedConsultation })
  } catch (error) {
    console.error('Error updating consultation:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/consultations/[id]/messages - Add message to consultation
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabase()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { message } = body

    // Get current consultation
    const consultation = await prisma.consultation.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    })

    if (!consultation) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 })
    }

    // Add message to existing messages array
    const currentMessages = consultation.messages as any[]
    const updatedMessages = [...currentMessages, message]

    const updatedConsultation = await prisma.consultation.update({
      where: { id: params.id },
      data: {
        messages: updatedMessages,
        updatedAt: new Date()
      },
      include: {
        project: true
      }
    })

    return NextResponse.json({ consultation: updatedConsultation })
  } catch (error) {
    console.error('Error adding message to consultation:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
