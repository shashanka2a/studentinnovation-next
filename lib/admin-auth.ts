import { createServerSupabase } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'

// Admin email whitelist
const ADMIN_EMAILS = [
  'jagannathamshashank@gmail.com',
  'payal@starterspace.com',
  'quang@starterspace.com'
]

// Check if user is admin
export const isAdmin = async (userEmail: string): Promise<boolean> => {
  return ADMIN_EMAILS.includes(userEmail.toLowerCase())
}

// Require admin access
export const requireAdmin = async () => {
  const supabase = createServerSupabase()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    throw new Error('Authentication required')
  }

  const isAdminUser = await isAdmin(user.email!)
  
  if (!isAdminUser) {
    throw new Error('Admin access required')
  }

  return { user, isAdmin: true }
}

// Get admin dashboard data
export const getAdminDashboardData = async () => {
  try {
    // Get all projects with user details
    const projects = await prisma.project.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            userType: true,
            createdAt: true
          }
        },
        consultations: {
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        milestones: {
          orderBy: { createdAt: 'desc' }
        },
        payments: {
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Get statistics
    const stats = await getAdminStats()
    
    // Get recent activity
    const recentActivity = await getRecentActivity()

    return {
      projects,
      stats,
      recentActivity
    }
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error)
    throw error
  }
}

// Get admin statistics
export const getAdminStats = async () => {
  const [
    totalProjects,
    activeProjects,
    completedProjects,
    totalRevenue,
    totalUsers,
    pendingConsultations
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: 'IN_DEVELOPMENT' } }),
    prisma.project.count({ where: { status: 'COMPLETED' } }),
    prisma.payment.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true }
    }),
    prisma.user.count(),
    prisma.consultation.count({ where: { status: 'ACTIVE' } })
  ])

  return {
    totalProjects,
    activeProjects,
    completedProjects,
    totalRevenue: totalRevenue._sum.amount || 0,
    totalUsers,
    pendingConsultations
  }
}

// Get recent activity
export const getRecentActivity = async () => {
  const [recentProjects, recentPayments, recentConsultations] = await Promise.all([
    prisma.project.findMany({
      take: 5,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.payment.findMany({
      take: 5,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        project: {
          select: {
            name: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.consultation.findMany({
      take: 5,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        project: {
          select: {
            name: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  ])

  return {
    recentProjects,
    recentPayments,
    recentConsultations
  }
}

// Update project status
export const updateProjectStatus = async (projectId: string, status: string, notes?: string) => {
  const project = await prisma.project.update({
    where: { id: projectId },
    data: {
      status: status as any,
      updatedAt: new Date()
    },
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
  })

  // Add milestone if status changed to completed
  if (status === 'COMPLETED') {
    await prisma.milestone.create({
      data: {
        title: 'Project Completed',
        description: notes || 'Project has been completed successfully',
        status: 'COMPLETED',
        completedAt: new Date(),
        projectId: projectId
      }
    })
  }

  return project
}

// Get project details for admin
export const getProjectDetails = async (projectId: string) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          userType: true,
          createdAt: true
        }
      },
      consultations: {
        orderBy: { createdAt: 'desc' }
      },
      milestones: {
        orderBy: { createdAt: 'desc' }
      },
      payments: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  return project
}
