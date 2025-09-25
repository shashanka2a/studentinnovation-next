# 🔐 OAuth Setup Guide for GatorInnovation

This guide will help you set up Google and Apple OAuth authentication for the GatorInnovation platform.

## 📋 Overview

The OAuth implementation includes:
- **Google OAuth**: Sign in with Google accounts
- **Apple OAuth**: Sign in with Apple ID
- **Automatic user profile creation** from OAuth data
- **Seamless integration** with existing authentication flow

## 🛠️ Setup Instructions

### **1. Supabase OAuth Configuration**

#### **Enable OAuth Providers in Supabase:**
1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Providers**
3. Enable **Google** and **Apple** providers

#### **Google OAuth Setup:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API** and **Google Identity API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure:
   - **Application type**: Web application
   - **Authorized redirect URIs**: 
     - `https://your-project.supabase.co/auth/v1/callback`
     - `http://localhost:54321/auth/v1/callback` (for development)
6. Copy **Client ID** and **Client Secret**
7. In Supabase, enter these credentials for Google provider

#### **Apple OAuth Setup:**
1. Go to [Apple Developer Console](https://developer.apple.com/)
2. Navigate to **Certificates, Identifiers & Profiles**
3. Create a new **App ID** with Sign In with Apple capability
4. Create a **Services ID** for web authentication
5. Configure:
   - **Domains and Subdomains**: `your-project.supabase.co`
   - **Return URLs**: `https://your-project.supabase.co/auth/v1/callback`
6. Create a **Private Key** for Sign In with Apple
7. In Supabase, enter these credentials for Apple provider

### **2. Environment Variables**

Add these to your `.env.local`:

```env
# OAuth Providers (for Supabase configuration)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
APPLE_CLIENT_ID="your-apple-client-id"
APPLE_CLIENT_SECRET="your-apple-client-secret"

# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
```

### **3. Database Schema Updates**

The OAuth implementation automatically creates user profiles with:
- **User ID**: From OAuth provider
- **Email**: From OAuth provider
- **Name**: From OAuth metadata
- **Avatar**: From OAuth provider
- **User Type**: Defaults to `STUDENT_ENTREPRENEUR`

### **4. API Routes**

#### **OAuth Sign-in Routes:**
- `POST /api/auth/google` - Initiate Google OAuth
- `POST /api/auth/apple` - Initiate Apple OAuth
- `GET /auth/callback` - Handle OAuth callback

#### **Authentication Flow:**
1. User clicks "Continue with Google/Apple"
2. Redirected to OAuth provider
3. User authorizes the application
4. Redirected back to `/auth/callback`
5. User profile created/updated in database
6. User redirected to dashboard

### **5. Frontend Integration**

#### **OAuth Buttons Added to Signup Page:**
```tsx
// Google Sign-in
<Button onClick={handleGoogleSignIn}>
  Continue with Google
</Button>

// Apple Sign-in
<Button onClick={handleAppleSignIn}>
  Continue with Apple
</Button>
```

#### **Loading States:**
- Spinner animation during OAuth process
- Disabled state to prevent multiple clicks
- Error handling with user feedback

### **6. User Experience Flow**

#### **New User (OAuth):**
1. Clicks "Continue with Google/Apple"
2. Redirected to OAuth provider
3. Authorizes application
4. Profile automatically created
5. Redirected to dashboard

#### **Existing User (OAuth):**
1. Clicks "Continue with Google/Apple"
2. Redirected to OAuth provider
3. Authorizes application
4. Profile updated with latest info
5. Redirected to dashboard

#### **Existing User (Email):**
1. Uses email/password form
2. Existing authentication flow
3. No changes to current process

### **7. Security Features**

#### **OAuth Security:**
- **JWT tokens** from Supabase
- **Secure redirect URLs** validation
- **State parameter** for CSRF protection
- **Session management** with automatic refresh

#### **Data Protection:**
- **User profile creation** with OAuth metadata
- **Automatic profile updates** on subsequent logins
- **Secure token handling** through Supabase
- **Input validation** and sanitization

### **8. Testing OAuth Flow**

#### **Development Testing:**
1. Start development server: `npm run dev`
2. Navigate to `/signup`
3. Click "Continue with Google" or "Continue with Apple"
4. Complete OAuth flow
5. Verify user profile creation in database

#### **Production Testing:**
1. Deploy to production environment
2. Update OAuth redirect URLs
3. Test with real Google/Apple accounts
4. Verify user profile creation and updates

### **9. Troubleshooting**

#### **Common Issues:**

**OAuth Redirect Mismatch:**
- Ensure redirect URLs match exactly in OAuth provider settings
- Check Supabase OAuth configuration

**User Profile Not Created:**
- Check database connection
- Verify Prisma schema is up to date
- Check server logs for errors

**OAuth Provider Errors:**
- Verify client ID and secret are correct
- Check OAuth provider settings
- Ensure APIs are enabled

#### **Debug Steps:**
1. Check browser console for errors
2. Check server logs for authentication errors
3. Verify environment variables are set
4. Test OAuth flow in incognito mode

### **10. Production Deployment**

#### **OAuth Provider Updates:**
1. Update redirect URLs to production domain
2. Configure production OAuth credentials
3. Test OAuth flow in production environment

#### **Environment Variables:**
1. Set production OAuth credentials
2. Update Supabase production settings
3. Configure production redirect URLs

### **11. Additional Features**

#### **User Profile Management:**
- OAuth users can update profile information
- Avatar syncing with OAuth provider
- Name updates from OAuth metadata

#### **Account Linking:**
- Link multiple OAuth providers to same account
- Merge accounts with same email address
- Account deletion with OAuth cleanup

## 🎯 Implementation Complete

The OAuth system is now fully integrated with:
- ✅ Google OAuth authentication
- ✅ Apple OAuth authentication  
- ✅ Automatic user profile creation
- ✅ Seamless integration with existing flow
- ✅ Security best practices
- ✅ Error handling and user feedback
- ✅ Production deployment ready

## 📚 Additional Resources

- [Supabase OAuth Documentation](https://supabase.com/docs/guides/auth/social-login)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
- [Apple Sign In Setup](https://developer.apple.com/sign-in-with-apple/)
- [Next.js Authentication](https://nextjs.org/docs/authentication)

---

**🎉 OAuth authentication is now ready for your users!**
