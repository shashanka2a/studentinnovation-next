#!/usr/bin/env node

/**
 * Update Super Admin User Script
 * Set jagannathamshashank@gmail.com as super admin
 */

const { PrismaClient } = require('@prisma/client')

console.log('🚀 Updating super admin user...')

async function updateSuperAdmin() {
  const prisma = new PrismaClient()
  
  try {
    console.log('📊 Testing database connection...')
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    console.log('🌱 Updating super admin user...')
    
    // Update existing user to be super admin
    const superAdmin = await prisma.user.upsert({
      where: { email: 'jagannathamshashank@gmail.com' },
      update: {
        role: 'SUPER_ADMIN',
        isActive: true,
        name: 'Shashank Jagannatham'
      },
      create: {
        id: 'super-admin-shashank',
        email: 'jagannathamshashank@gmail.com',
        name: 'Shashank Jagannatham',
        userType: 'STUDENT_ENTREPRENEUR',
        role: 'SUPER_ADMIN',
        isActive: true,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
    })
    
    console.log('✅ Super admin user updated/created successfully!')
    console.log('')
    console.log('🔑 Super Admin Credentials:')
    console.log('   Email: jagannathamshashank@gmail.com')
    console.log('   Name: Shashank Jagannatham')
    console.log('   Role: SUPER_ADMIN')
    console.log('   ID:', superAdmin.id)
    console.log('')
    console.log('🚀 You can now access the admin dashboard at: /admin/login')
    
  } catch (error) {
    console.error('❌ Super admin update failed:', error)
    console.log('')
    console.log('🔧 Manual Setup Required:')
    console.log('1. Go to your Supabase dashboard')
    console.log('2. Navigate to Table Editor → users')
    console.log('3. Find the user with email: jagannathamshashank@gmail.com')
    console.log('4. Update the role field to: SUPER_ADMIN')
    console.log('5. Update the isActive field to: true')
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

updateSuperAdmin()
