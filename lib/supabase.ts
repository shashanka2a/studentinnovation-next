import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthError } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client component client
export const createClientSupabase = () => createClientComponentClient()

// Server component client
export const createServerSupabase = () => createServerComponentClient({ cookies })

// Auth helpers
export const getCurrentUser = async () => {
  const supabase = createServerSupabase()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    console.error('Error getting current user:', error)
    return null
  }
  
  return user
}

export const getCurrentUserProfile = async () => {
  const supabase = createServerSupabase()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }
  
  // Get user profile from our database
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()
  
  if (profileError) {
    console.error('Error getting user profile:', profileError)
    return null
  }
  
  return profile
}

// Database helpers
export const getUserProjects = async (userId: string) => {
  const supabase = createServerSupabase()
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select(`
      *,
      consultations(*),
      milestones(*),
      payments(*)
    `)
    .eq('userId', userId)
    .order('createdAt', { ascending: false })
  
  if (error) {
    console.error('Error fetching user projects:', error)
    return []
  }
  
  return projects
}

export const getProjectById = async (projectId: string) => {
  const supabase = createServerSupabase()
  
  const { data: project, error } = await supabase
    .from('projects')
    .select(`
      *,
      user:users(*),
      consultations(*),
      milestones(*),
      payments(*)
    `)
    .eq('id', projectId)
    .single()
  
  if (error) {
    console.error('Error fetching project:', error)
    return null
  }
  
  return project
}

// Auth middleware
export const requireAuth = async () => {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  return user
}

// Role-based access control
export const requireRole = async (allowedRoles: string[]) => {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  const profile = await getCurrentUserProfile()
  
  if (!profile || !allowedRoles.includes(profile.userType)) {
    throw new Error('Insufficient permissions')
  }
  
  return { user, profile }
}

// OAuth authentication helpers
export const signInWithGoogle = async () => {
  const supabase = createClientSupabase()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
    }
  })
  
  if (error) {
    throw new Error(`Google sign-in failed: ${error.message}`)
  }
  
  return data
}

export const signInWithApple = async () => {
  const supabase = createClientSupabase()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
    }
  })
  
  if (error) {
    throw new Error(`Apple sign-in failed: ${error.message}`)
  }
  
  return data
}

// Handle OAuth callback
export const handleOAuthCallback = async (code: string, provider: string) => {
  const supabase = createServerSupabase()
  
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)
  
  if (error) {
    throw new Error(`OAuth callback failed: ${error.message}`)
  }
  
  if (data.user) {
    // Create or update user profile in our database
    await createOrUpdateUserProfile(data.user)
  }
  
  return data
}

// Create or update user profile from OAuth data
export const createOrUpdateUserProfile = async (user: any) => {
  const supabase = createServerSupabase()
  
  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()
    
    if (existingUser) {
      // Update existing user
      const { data, error } = await supabase
        .from('users')
        .update({
          name: user.user_metadata?.full_name || user.user_metadata?.name || existingUser.name,
          avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture || existingUser.avatar,
          updatedAt: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single()
      
      if (error) throw error
      return data
    } else {
      // Create new user
      const { data, error } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0],
          avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture,
          userType: 'STUDENT_ENTREPRENEUR', // Default type
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        .select()
        .single()
      
      if (error) throw error
      return data
    }
  } catch (error) {
    console.error('Error creating/updating user profile:', error)
    throw error
  }
}

// Sign out
export const signOut = async () => {
  const supabase = createClientSupabase()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    throw new Error(`Sign out failed: ${error.message}`)
  }
}
