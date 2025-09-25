import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabase()
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
      }
    })
    
    if (error) {
      console.error('Apple OAuth error:', error)
      return NextResponse.json({ 
        error: 'Apple sign-in failed',
        details: error.message 
      }, { status: 400 })
    }
    
    return NextResponse.json({ 
      message: 'Redirecting to Apple...',
      url: data.url 
    })
  } catch (error) {
    console.error('Apple OAuth error:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
