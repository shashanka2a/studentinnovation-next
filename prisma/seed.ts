import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create super admin user
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@gatorinnovation.com' },
    update: {},
    create: {
      id: 'super-admin-1',
      email: 'admin@gatorinnovation.com',
      name: 'GatorInnovation Admin',
      userType: 'STUDENT_ENTREPRENEUR',
      role: 'SUPER_ADMIN',
      isActive: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  })

  console.log('✅ Created super admin user')

  // Create sample users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'demo@studentinnovation.com' },
      update: {},
      create: {
        id: 'demo-user-1',
        email: 'demo@studentinnovation.com',
        name: 'Alex Johnson',
        userType: 'STUDENT_ENTREPRENEUR',
        role: 'CLIENT',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
    }),
    prisma.user.upsert({
      where: { email: 'sarah@business.com' },
      update: {},
      create: {
        id: 'demo-user-2',
        email: 'sarah@business.com',
        name: 'Sarah Chen',
        userType: 'BUSINESS_OWNER',
        role: 'CLIENT',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      }
    })
  ])

  console.log('✅ Created users')

  // Create sample projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        name: 'StudyBuddy',
        description: 'A social learning platform for students to find study partners and share resources',
        category: 'WEB_APP',
        status: 'IN_DEVELOPMENT',
        timeline: '1-week',
        budget: '1000-2500',
        targetAudience: 'College students and high school students',
        features: ['User profiles', 'Study group matching', 'Resource sharing', 'Progress tracking'],
        userId: users[0].id
      }
    }),
    prisma.project.create({
      data: {
        name: 'LocalEats',
        description: 'A mobile app connecting local restaurants with customers for pickup and delivery',
        category: 'MOBILE_APP',
        status: 'IN_CONSULTATION',
        timeline: '2-weeks',
        budget: '2500-5000',
        targetAudience: 'Local restaurant owners and food enthusiasts',
        features: ['Restaurant listings', 'Order management', 'Payment processing', 'Delivery tracking'],
        userId: users[1].id
      }
    })
  ])

  console.log('✅ Created projects')

  // Create sample consultations
  const consultations = await Promise.all([
    prisma.consultation.create({
      data: {
        type: 'AI_CONSULTATION',
        status: 'ACTIVE',
        messages: [
          {
            id: '1',
            type: 'ai',
            content: "👋 Hello! I'm your AI consultant and I'm thrilled to help you bring your vision to life! I've reviewed your project details and I can already see the potential in what you're building. Let's dive deeper into your vision - what's the main problem your product solves, and how do you envision it making a difference for your users?",
            timestamp: new Date()
          },
          {
            id: '2',
            type: 'user',
            content: "I want to create a platform where students can find study partners based on their courses and learning goals. The main problem is that students often struggle to find compatible study partners and end up studying alone.",
            timestamp: new Date()
          },
          {
            id: '3',
            type: 'ai',
            content: "That's a fantastic idea! I can see the value in connecting students with compatible study partners. Let's think about the key features that would make this platform successful. What specific matching criteria do you think would be most important for students?",
            timestamp: new Date()
          }
        ],
        requirements: {
          coreFeatures: ['User profiles', 'Study partner matching', 'Course-based filtering'],
          targetUsers: 'College and high school students',
          keyGoals: ['Improve study efficiency', 'Build study communities', 'Share learning resources']
        },
        recommendations: {
          suggestedFeatures: ['Study group creation', 'Progress tracking', 'Resource sharing'],
          technicalStack: ['React/Next.js', 'Node.js', 'PostgreSQL'],
          timeline: '4-6 weeks for MVP'
        },
        userId: users[0].id,
        projectId: projects[0].id
      }
    })
  ])

  console.log('✅ Created consultations')

  // Create sample milestones
  const milestones = await Promise.all([
    prisma.milestone.create({
      data: {
        title: 'Project Setup & Planning',
        description: 'Initial project setup, requirements gathering, and technical planning',
        status: 'COMPLETED',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        completedAt: new Date(),
        projectId: projects[0].id
      }
    }),
    prisma.milestone.create({
      data: {
        title: 'User Authentication & Profiles',
        description: 'Implement user registration, login, and profile management',
        status: 'IN_PROGRESS',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
        projectId: projects[0].id
      }
    }),
    prisma.milestone.create({
      data: {
        title: 'Study Partner Matching Algorithm',
        description: 'Develop and implement the core matching algorithm',
        status: 'PENDING',
        dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 3 weeks from now
        projectId: projects[0].id
      }
    })
  ])

  console.log('✅ Created milestones')

  // Create sample payments
  const payments = await Promise.all([
    prisma.payment.create({
      data: {
        amount: 1500.00,
        currency: 'USD',
        status: 'COMPLETED',
        stripePaymentId: 'pi_demo_payment_1',
        paidAt: new Date(),
        userId: users[0].id,
        projectId: projects[0].id
      }
    }),
    prisma.payment.create({
      data: {
        amount: 2500.00,
        currency: 'USD',
        status: 'PENDING',
        userId: users[1].id,
        projectId: projects[1].id
      }
    })
  ])

  console.log('✅ Created payments')

  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
