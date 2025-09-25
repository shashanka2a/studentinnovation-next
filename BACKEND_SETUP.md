# 🚀 GatorInnovation Backend Architecture Setup

This document provides a comprehensive guide to setting up the complete backend architecture for the GatorInnovation platform.

## 📋 Architecture Overview

### **Tech Stack:**
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **API**: Next.js API Routes
- **Middleware**: Custom authentication middleware
- **AI Integration**: OpenAI/Anthropic (future)

### **Database Schema:**
- **Users**: Authentication and profile management
- **Projects**: Project details and status tracking
- **Consultations**: AI chat sessions and requirements
- **Milestones**: Project development phases
- **Payments**: Stripe payment processing

## 🛠️ Setup Instructions

### **1. Environment Variables**

Copy `env.example` to `.env.local` and configure:

```bash
cp env.example .env.local
```

**Required Variables:**
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/gatorinnovation"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### **2. Database Setup**

#### **Install Dependencies:**
```bash
npm install
```

#### **Generate Prisma Client:**
```bash
npm run db:generate
```

#### **Push Schema to Database:**
```bash
npm run db:push
```

#### **Seed Database:**
```bash
npm run db:seed
```

#### **Open Prisma Studio (Optional):**
```bash
npm run db:studio
```

### **3. Supabase Configuration**

#### **Create Supabase Project:**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key
4. Configure authentication settings

#### **Database Setup:**
1. Use Supabase PostgreSQL database
2. Update `DATABASE_URL` with Supabase connection string
3. Run migrations: `npm run db:push`

#### **Authentication Setup:**
1. Enable email authentication
2. Configure redirect URLs
3. Set up RLS (Row Level Security) policies

### **4. Stripe Configuration**

#### **Create Stripe Account:**
1. Go to [stripe.com](https://stripe.com)
2. Get your API keys from dashboard
3. Set up webhook endpoints

#### **Webhook Setup:**
1. Create webhook endpoint: `https://yourdomain.com/api/payments/webhook`
2. Select events: `checkout.session.completed`, `payment_intent.payment_failed`
3. Copy webhook secret to environment variables

### **5. API Routes Overview**

#### **Authentication Routes:**
- `GET /api/user` - Get current user profile
- `PUT /api/user` - Update user profile
- `DELETE /api/user` - Delete user account

#### **Project Management:**
- `GET /api/projects` - Get user's projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get specific project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

#### **AI Consultation:**
- `GET /api/consultations` - Get user's consultations
- `POST /api/consultations` - Create consultation
- `POST /api/ai/chat` - Handle AI chat messages

#### **Payment Processing:**
- `POST /api/payments/create-checkout-session` - Create Stripe session
- `POST /api/payments/webhook` - Handle Stripe webhooks

### **6. Middleware Configuration**

The `middleware.ts` file handles:
- **Authentication**: Protects routes requiring login
- **Redirects**: Redirects authenticated users from auth pages
- **Session Management**: Refreshes expired sessions

### **7. Database Models**

#### **User Model:**
```typescript
{
  id: string
  email: string
  name?: string
  avatar?: string
  userType: 'STUDENT_ENTREPRENEUR' | 'BUSINESS_OWNER' | 'STARTUP_FOUNDER'
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### **Project Model:**
```typescript
{
  id: string
  name: string
  description?: string
  website?: string
  logo?: string
  category: ProjectCategory
  status: ProjectStatus
  timeline?: string
  budget?: string
  targetAudience?: string
  features: string[]
  userId: string
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### **Consultation Model:**
```typescript
{
  id: string
  type: 'AI_CONSULTATION' | 'FULL_APP_CONSULTATION' | 'TECHNICAL_REVIEW'
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
  messages: Json
  requirements: Json
  recommendations: Json
  userId: string
  projectId?: string
  createdAt: DateTime
  updatedAt: DateTime
}
```

### **8. Security Features**

#### **Authentication:**
- Supabase JWT tokens
- Automatic session refresh
- Protected API routes

#### **Authorization:**
- User-based access control
- Project ownership validation
- Role-based permissions

#### **Data Protection:**
- Input validation
- SQL injection prevention (Prisma)
- XSS protection
- CSRF protection

### **9. Deployment Checklist**

#### **Environment Setup:**
- [ ] Configure production environment variables
- [ ] Set up production database
- [ ] Configure Supabase production project
- [ ] Set up Stripe production keys

#### **Database:**
- [ ] Run production migrations
- [ ] Set up database backups
- [ ] Configure connection pooling

#### **Security:**
- [ ] Enable HTTPS
- [ ] Configure CORS
- [ ] Set up rate limiting
- [ ] Enable security headers

### **10. Development Commands**

```bash
# Database
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema changes
npm run db:migrate     # Create and run migrations
npm run db:seed        # Seed database with sample data
npm run db:studio      # Open Prisma Studio
npm run db:reset       # Reset database

# Development
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
```

### **11. API Usage Examples**

#### **Create Project:**
```typescript
const response = await fetch('/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'My Awesome App',
    description: 'A revolutionary new platform',
    category: 'WEB_APP',
    timeline: '1-week',
    budget: '1000-2500',
    features: ['User authentication', 'Dashboard', 'Analytics']
  })
})
```

#### **Start AI Consultation:**
```typescript
const response = await fetch('/api/ai/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: { content: 'I want to build a social media app' },
    projectId: 'project-id'
  })
})
```

#### **Create Payment Session:**
```typescript
const response = await fetch('/api/payments/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    projectId: 'project-id',
    amount: 1500,
    currency: 'USD'
  })
})
```

## 🎯 Next Steps

1. **Install Dependencies**: Run `npm install`
2. **Configure Environment**: Set up `.env.local`
3. **Setup Database**: Run `npm run db:push`
4. **Seed Data**: Run `npm run db:seed`
5. **Test APIs**: Use the provided examples
6. **Deploy**: Follow deployment checklist

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

**🎉 Your backend architecture is now ready for development!**
