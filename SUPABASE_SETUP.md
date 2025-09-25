# 🚀 Supabase Setup Guide for GatorInnovation

This guide will help you set up your Supabase database and configure the GatorInnovation platform.

## 📋 Your Supabase Configuration

### **Database Details:**
- **Host**: `db.hvadstswmmshkxxdpelu.supabase.co`
- **Port**: `5432`
- **Database**: `postgres`
- **Username**: `postgres`
- **Password**: `wkiYQ9m6bmlenTQa`
- **URL**: `postgresql://postgres:wkiYQ9m6bmlenTQa@db.hvadstswmmshkxxdpelu.supabase.co:5432/postgres`

### **Supabase Project:**
- **Project URL**: `https://hvadstswmmshkxxdpelu.supabase.co`
- **Project ID**: `hvadstswmmshkxxdpelu`

## 🛠️ Setup Instructions

### **1. Environment Variables**

Create a `.env.local` file in your project root with the following:

```env
# Database
DATABASE_URL="postgresql://postgres:wkiYQ9m6bmlenTQa@db.hvadstswmmshkxxdpelu.supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://hvadstswmmshkxxdpelu.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
APPLE_CLIENT_ID="your-apple-client-id"
APPLE_CLIENT_SECRET="your-apple-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### **2. Get Supabase API Keys**

1. Go to your Supabase project dashboard: `https://supabase.com/dashboard/project/hvadstswmmshkxxdpelu`
2. Navigate to **Settings** → **API**
3. Copy the following keys:
   - **Project URL**: `https://hvadstswmmshkxxdpelu.supabase.co`
   - **anon public key**: Copy this to `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret key**: Copy this to `SUPABASE_SERVICE_ROLE_KEY`

### **3. Database Setup**

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

#### **Open Database Studio:**
```bash
npm run db:studio
```

### **4. Supabase Dashboard Configuration**

#### **Authentication Setup:**
1. Go to **Authentication** → **Settings**
2. Configure **Site URL**: `http://localhost:3000`
3. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback` (for production)

#### **OAuth Providers:**
1. Go to **Authentication** → **Providers**
2. Enable **Google** and **Apple** providers
3. Configure OAuth credentials (see OAuth_SETUP.md)

#### **Database Policies:**
1. Go to **Authentication** → **Policies**
2. Enable **Row Level Security (RLS)** for all tables
3. Create policies for user data access

### **5. Test Database Connection**

Run the setup script to test your connection:

```bash
node setup-supabase.js
```

This will:
- Test database connectivity
- Verify schema can be pushed
- Confirm seeding works

### **6. Database Schema**

Your database will include these tables:

#### **Users Table:**
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar TEXT,
  userType TEXT DEFAULT 'STUDENT_ENTREPRENEUR',
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

#### **Projects Table:**
```sql
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  logo TEXT,
  category TEXT DEFAULT 'WEB_APP',
  status TEXT DEFAULT 'DRAFT',
  timeline TEXT,
  budget TEXT,
  targetAudience TEXT,
  features TEXT[] DEFAULT '{}',
  userId TEXT REFERENCES users(id) ON DELETE CASCADE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  completedAt TIMESTAMP
);
```

#### **Consultations Table:**
```sql
CREATE TABLE consultations (
  id TEXT PRIMARY KEY,
  type TEXT DEFAULT 'AI_CONSULTATION',
  status TEXT DEFAULT 'ACTIVE',
  messages JSONB DEFAULT '[]',
  requirements JSONB DEFAULT '{}',
  recommendations JSONB DEFAULT '{}',
  userId TEXT REFERENCES users(id) ON DELETE CASCADE,
  projectId TEXT REFERENCES projects(id) ON DELETE CASCADE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  completedAt TIMESTAMP
);
```

#### **Milestones Table:**
```sql
CREATE TABLE milestones (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'PENDING',
  dueDate TIMESTAMP,
  completedAt TIMESTAMP,
  projectId TEXT REFERENCES projects(id) ON DELETE CASCADE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

#### **Payments Table:**
```sql
CREATE TABLE payments (
  id TEXT PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'PENDING',
  stripePaymentId TEXT,
  stripeSessionId TEXT,
  userId TEXT REFERENCES users(id) ON DELETE CASCADE,
  projectId TEXT REFERENCES projects(id) ON DELETE CASCADE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  paidAt TIMESTAMP
);
```

### **7. Row Level Security (RLS) Policies**

Enable RLS and create policies for data security:

#### **Users Table Policies:**
```sql
-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);
```

#### **Projects Table Policies:**
```sql
-- Users can only see their own projects
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = userId);

CREATE POLICY "Users can create own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = userId);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = userId);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = userId);
```

### **8. Testing Your Setup**

#### **Database Connection Test:**
```bash
npm run db:studio
```
This will open Prisma Studio where you can view and edit your data.

#### **API Testing:**
```bash
npm run dev
```
Then test the following endpoints:
- `GET /api/user` - Get current user
- `GET /api/projects` - Get user projects
- `POST /api/projects` - Create new project

### **9. Production Deployment**

#### **Environment Variables for Production:**
```env
DATABASE_URL="postgresql://postgres:wkiYQ9m6bmlenTQa@db.hvadstswmmshkxxdpelu.supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://hvadstswmmshkxxdpelu.supabase.co"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

#### **Supabase Production Settings:**
1. Update **Site URL** to your production domain
2. Add production **Redirect URLs**
3. Configure production **OAuth providers**
4. Set up **Database backups**

### **10. Troubleshooting**

#### **Common Issues:**

**Database Connection Failed:**
- Verify the DATABASE_URL is correct
- Check if your IP is whitelisted in Supabase
- Ensure the database is accessible

**Authentication Errors:**
- Verify SUPABASE_ANON_KEY is correct
- Check if RLS policies are properly configured
- Ensure OAuth providers are enabled

**Schema Push Failed:**
- Check if Prisma schema is valid
- Verify database permissions
- Ensure no conflicting tables exist

#### **Debug Steps:**
1. Test database connection: `npm run db:studio`
2. Check Supabase logs in dashboard
3. Verify environment variables
4. Test API endpoints individually

### **11. Security Best Practices**

#### **Database Security:**
- Enable **Row Level Security (RLS)** on all tables
- Use **parameterized queries** (Prisma handles this)
- Implement **proper user isolation**
- Regular **security audits**

#### **Authentication Security:**
- Use **strong JWT tokens**
- Implement **session management**
- Enable **OAuth security features**
- Regular **token rotation**

## 🎯 Next Steps

1. **Set up environment variables** with your Supabase keys
2. **Run database setup** commands
3. **Configure OAuth providers** (see OAuth_SETUP.md)
4. **Test the complete flow** from signup to project creation
5. **Deploy to production** when ready

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [OAuth Setup Guide](./OAUTH_SETUP.md)

---

**🎉 Your Supabase database is now ready for the GatorInnovation platform!**
