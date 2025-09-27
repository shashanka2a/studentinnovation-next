import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'

// POST /api/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabase()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      // Basic Info
      name,
      description,
      website,
      logo,
      targetAudience,
      
      // Landing Page Specific
      projectType,
      heroHeadline,
      heroSubheadline,
      heroImage,
      primaryCTA,
      secondaryCTA,
      aboutContent,
      keyFeatures,
      benefits,
      testimonials,
      teamInfo,
      contactEmail,
      contactPhone,
      
      // Social Links
      socialLinks,
      
      // Design Preferences
      brandColors,
      brandVoice,
      layoutStyle,
      imageStyle,
      
      // Technical Requirements
      domain,
      hosting,
      seo,
      analytics,
      
      // Project Type & Pricing
      budget,
      timeline
    } = body

    // Create project in database
    const project = await prisma.project.create({
      data: {
        // Basic Info
        name,
        description,
        website,
        logo,
        targetAudience,
        
        // Landing Page Specific
        projectType: projectType || 'landing-page',
        heroHeadline,
        heroSubheadline,
        heroImage,
        primaryCTA,
        secondaryCTA,
        aboutContent,
        features: keyFeatures || [],
        benefits: benefits || [],
        testimonials: testimonials || [],
        teamInfo,
        contactEmail,
        contactPhone,
        
        // Social Links
        socialTwitter: socialLinks?.twitter || '',
        socialLinkedin: socialLinks?.linkedin || '',
        socialInstagram: socialLinks?.instagram || '',
        socialFacebook: socialLinks?.facebook || '',
        
        // Design Preferences
        brandPrimaryColor: brandColors?.primary || '#3B82F6',
        brandSecondaryColor: brandColors?.secondary || '#1E40AF',
        brandAccentColor: brandColors?.accent || '#F59E0B',
        brandVoice: brandVoice || 'professional',
        layoutStyle: layoutStyle || 'modern',
        imageStyle: imageStyle || 'photography',
        
        // Technical Requirements
        domain,
        hosting: hosting || 'managed',
        seoEnabled: seo !== false,
        analyticsEnabled: analytics !== false,
        
        // Project Type & Pricing
        budget: budget || (projectType === 'landing-page' ? '$500' : '$2,500'),
        timeline: timeline || (projectType === 'landing-page' ? '2 days' : '1 week'),
        
        // Set initial status
        status: 'IN_DEVELOPMENT',
        category: projectType === 'landing-page' ? 'LANDING_PAGE' : 'WEB_APP',
        
        // Relations
        userId: user.id
      }
    })

    return NextResponse.json({ 
      success: true, 
      project,
      message: 'Project created successfully' 
    })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ 
      error: 'Failed to create project',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// GET /api/projects - Get user's projects
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabase()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch projects',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}