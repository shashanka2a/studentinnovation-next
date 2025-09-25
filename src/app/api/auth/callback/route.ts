import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
      const supabase = createServerSupabase()
      
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('OAuth callback error:', error)
        return NextResponse.redirect(`${origin}/signup?error=oauth_callback_failed`)
      }

      if (data.user) {
        // Create or update user profile in our database
        try {
          await createOrUpdateUserProfile(data.user)
        } catch (profileError) {
          console.error('Error creating/updating user profile:', profileError)
          // Continue anyway - user can update profile later
        }

        // Redirect to dashboard or intended page
        return NextResponse.redirect(`${origin}${next}`)
      }
    }

    // If no code or user, redirect to signup with error
    return NextResponse.redirect(`${origin}/signup?error=oauth_callback_failed`)
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/signup?error=oauth_callback_failed`)
  }
}

// Create or update user profile from OAuth data
async function createOrUpdateUserProfile(user: any) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id }
    })
    
    if (existingUser) {
      // Update existing user
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.user_metadata?.full_name || user.user_metadata?.name || existingUser.name,
          avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture || existingUser.avatar,
          updatedAt: new Date()
        }
      })
      return updatedUser
    } else {
      // Create new user
      const newUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0],
          avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture,
          userType: 'STUDENT_ENTREPRENEUR', // Default type
        }
      })
      return newUser
    }
  } catch (error) {
    console.error('Error creating/updating user profile:', error)
    throw error
  }
}
