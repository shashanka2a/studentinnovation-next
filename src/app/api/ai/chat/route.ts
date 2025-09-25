import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'

// POST /api/ai/chat - Handle AI chat messages
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabase()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { message, consultationId, projectId } = body

    // Get or create consultation
    let consultation
    if (consultationId) {
      consultation = await prisma.consultation.findFirst({
        where: {
          id: consultationId,
          userId: user.id
        }
      })
    } else {
      // Create new consultation
      consultation = await prisma.consultation.create({
        data: {
          type: 'AI_CONSULTATION',
          userId: user.id,
          projectId: projectId,
          messages: [message]
        }
      })
    }

    if (!consultation) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 })
    }

    // Simulate AI response (replace with actual AI integration)
    const aiResponse = await generateAIResponse(message, consultation)

    // Update consultation with new messages
    const currentMessages = consultation.messages as any[]
    const updatedMessages = [
      ...currentMessages,
      message,
      {
        id: Date.now().toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      }
    ]

    const updatedConsultation = await prisma.consultation.update({
      where: { id: consultation.id },
      data: {
        messages: updatedMessages,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({ 
      consultation: updatedConsultation,
      aiResponse 
    })
  } catch (error) {
    console.error('Error processing AI chat:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Simulate AI response (replace with actual AI service)
async function generateAIResponse(userMessage: any, consultation: any) {
  // This is a placeholder - replace with actual AI service integration
  const responses = [
    "That's a great point! Let me help you think through this further. What specific challenges are you facing with this approach?",
    "I understand your vision. Based on what you've shared, I'd recommend focusing on the core user experience first. What's the main problem your users are trying to solve?",
    "Excellent! This sounds like a solid foundation. Let's dive deeper into the technical requirements. What platforms are you considering for this project?",
    "That's a smart approach! I can see the potential in your idea. Let's discuss the timeline and budget to make sure we can deliver something amazing within your constraints.",
    "Perfect! I'm getting a clear picture of your project. Let's talk about the key features that will make this product stand out. What's the most important feature for your users?"
  ]

  // Simple response selection based on message content
  const messageContent = userMessage.content?.toLowerCase() || ''
  
  if (messageContent.includes('problem') || messageContent.includes('challenge')) {
    return "I can see you're thinking about the core problem your product solves. That's the foundation of any great product! Can you tell me more about who your target users are and what specific pain points they experience?"
  }
  
  if (messageContent.includes('feature') || messageContent.includes('functionality')) {
    return "Great! Features are important, but let's make sure we're building the right ones. What's the primary action you want users to take when they use your product?"
  }
  
  if (messageContent.includes('timeline') || messageContent.includes('deadline')) {
    return "Timeline is crucial for project success! Based on your requirements, I'd recommend starting with an MVP approach. What's the minimum viable version that would still provide value to your users?"
  }
  
  if (messageContent.includes('budget') || messageContent.includes('cost')) {
    return "Budget planning is smart! Let's make sure we're allocating resources effectively. What's your priority - getting to market quickly or building a more comprehensive solution?"
  }

  // Default response
  return responses[Math.floor(Math.random() * responses.length)]
}
