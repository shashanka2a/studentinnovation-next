import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// OAuth sign-in functions
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
  return { data, error };
};

export const signInWithApple = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
  return { data, error };
};

// Handle OAuth callback
export const handleOAuthCallback = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
};

// Create or update user profile
export const createOrUpdateUserProfile = async (user: any, profileData: any) => {
  const { data, error } = await supabase
    .from('users')
    .upsert({
      id: user.id,
      email: user.email,
      name: profileData.name,
      user_type: profileData.userType,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  return { data, error };
};

// Sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
