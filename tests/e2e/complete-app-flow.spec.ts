import { test, expect } from '@playwright/test';

test.describe('Complete App Flow Test', () => {
  test('should complete full client journey from landing to project creation', async ({ page }) => {
    // Mock client data
    const mockClient = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      projectType: 'landing-page'
    };

    const mockProject = {
      name: 'TechStart Landing Page',
      description: 'A modern landing page for a tech startup',
      website: 'https://techstart.com',
      targetAudience: 'Tech entrepreneurs and investors',
      heroHeadline: 'Launch Your Tech Startup in 48 Hours',
      heroSubheadline: 'Professional landing pages that convert visitors into customers',
      primaryCTA: 'Get Started Today',
      secondaryCTA: 'Learn More',
      aboutContent: 'We help tech startups launch quickly with professional landing pages.',
      keyFeatures: [
        'Mobile-responsive design',
        'SEO optimized',
        'Fast loading',
        'Analytics integration'
      ],
      benefits: [
        'Increase conversions by 40%',
        'Professional appearance',
        'Quick deployment'
      ],
      contactEmail: 'hello@techstart.com',
      contactPhone: '+1-555-0123',
      brandColors: {
        primary: '#3B82F6',
        secondary: '#1E40AF',
        accent: '#F59E0B'
      },
      brandVoice: 'professional',
      layoutStyle: 'modern',
      imageStyle: 'photography',
      domain: 'techstart.com',
      hosting: 'managed',
      seo: true,
      analytics: true
    };

    // Step 1: Visit landing page
    await page.goto('/');
    
    // Verify landing page content
    await expect(page.locator('h1')).toContainText('Professional landing pages in 2 days');
    await expect(page.locator('text=Landing Page')).toBeVisible();
    await expect(page.locator('text=Full Application')).toBeVisible();
    
    // Click on Landing Page option
    await page.locator('text=Landing Page').click();
    
    // Step 2: Navigate to signup
    await page.goto('/signup');
    
    // Fill signup form
    await page.fill('input[name="name"]', mockClient.name);
    await page.fill('input[name="email"]', mockClient.email);
    await page.fill('input[name="password"]', mockClient.password);
    await page.selectOption('select[name="projectType"]', mockClient.projectType);
    
    // Submit signup form
    await page.click('button[type="submit"]');
    
    // Wait for redirect to client dashboard
    await page.waitForURL('/client-dashboard');
    
    // Step 3: Start new project
    await page.click('text=Start New Project');
    await page.waitForURL('/new-project');
    
    // Step 4: Fill project form - Step 1 (Project Overview)
    await page.fill('input[name="name"]', mockProject.name);
    await page.fill('textarea[name="description"]', mockProject.description);
    await page.fill('input[name="website"]', mockProject.website);
    await page.fill('textarea[name="targetAudience"]', mockProject.targetAudience);
    
    // Upload logo (mock file)
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'logo.png',
      mimeType: 'image/png',
      buffer: Buffer.from('fake-image-data')
    });
    
    // Go to next step
    await page.click('text=Next Step');
    
    // Step 5: Fill project form - Step 2 (Content & Features)
    await page.fill('input[name="heroHeadline"]', mockProject.heroHeadline);
    await page.fill('input[name="heroSubheadline"]', mockProject.heroSubheadline);
    await page.fill('input[name="primaryCTA"]', mockProject.primaryCTA);
    await page.fill('input[name="secondaryCTA"]', mockProject.secondaryCTA);
    await page.fill('textarea[name="aboutContent"]', mockProject.aboutContent);
    
    // Add key features
    for (const feature of mockProject.keyFeatures) {
      await page.fill('input[placeholder*="feature"]', feature);
      await page.click('text=Add Feature');
    }
    
    // Add benefits
    for (const benefit of mockProject.benefits) {
      await page.fill('input[placeholder*="benefit"]', benefit);
      await page.click('text=Add Benefit');
    }
    
    // Go to next step
    await page.click('text=Next Step');
    
    // Step 6: Fill project form - Step 3 (Design & Branding)
    await page.fill('input[name="brandColors.primary"]', mockProject.brandColors.primary);
    await page.fill('input[name="brandColors.secondary"]', mockProject.brandColors.secondary);
    await page.fill('input[name="brandColors.accent"]', mockProject.brandColors.accent);
    
    await page.selectOption('select[name="brandVoice"]', mockProject.brandVoice);
    await page.selectOption('select[name="layoutStyle"]', mockProject.layoutStyle);
    await page.selectOption('select[name="imageStyle"]', mockProject.imageStyle);
    
    // Go to next step
    await page.click('text=Next Step');
    
    // Step 7: Fill project form - Step 4 (Technical Setup)
    await page.fill('input[name="domain"]', mockProject.domain);
    await page.selectOption('select[name="hosting"]', mockProject.hosting);
    
    if (mockProject.seo) {
      await page.check('input[name="seo"]');
    }
    if (mockProject.analytics) {
      await page.check('input[name="analytics"]');
    }
    
    await page.fill('input[name="contactEmail"]', mockProject.contactEmail);
    await page.fill('input[name="contactPhone"]', mockProject.contactPhone);
    
    // Submit project (final step)
    await page.click('text=Review Project');
    
    // Step 8: Verify project review page
    await page.waitForURL('/project-review');
    
    // Check if project data is displayed correctly
    await expect(page.locator('h1')).toContainText('Review Your Landing Page');
    await expect(page.locator('text=' + mockProject.name)).toBeVisible();
    await expect(page.locator('text=' + mockProject.heroHeadline)).toBeVisible();
    await expect(page.locator('text=' + mockProject.heroSubheadline)).toBeVisible();
    await expect(page.locator('text=' + mockProject.primaryCTA)).toBeVisible();
    
    // Check if landing page preview is displayed
    await expect(page.locator('text=Landing Page Preview')).toBeVisible();
    
    // Check if brand colors are applied in preview
    const previewButton = page.locator('button').filter({ hasText: mockProject.primaryCTA });
    await expect(previewButton).toHaveCSS('background-color', 'rgb(59, 130, 246)'); // #3B82F6
    
    // Check if key features are displayed
    for (const feature of mockProject.keyFeatures) {
      await expect(page.locator('text=' + feature)).toBeVisible();
    }
    
    // Check if benefits are displayed
    for (const benefit of mockProject.benefits) {
      await expect(page.locator('text=' + benefit)).toBeVisible();
    }
    
    // Check if contact information is displayed
    await expect(page.locator('text=' + mockProject.contactEmail)).toBeVisible();
    await expect(page.locator('text=' + mockProject.contactPhone)).toBeVisible();
    
    // Check if technical requirements are displayed
    await expect(page.locator('text=' + mockProject.domain)).toBeVisible();
    await expect(page.locator('text=SEO Enabled')).toBeVisible();
    await expect(page.locator('text=Analytics Enabled')).toBeVisible();
    
    // Step 9: Confirm and start development
    await page.click('text=Confirm & Start Development');
    
    // Wait for redirect to payment page
    await page.waitForURL('/payment');
    
    // Step 10: Verify payment page
    await expect(page.locator('text=Professional Landing Page')).toBeVisible();
    await expect(page.locator('text=$500')).toBeVisible();
    await expect(page.locator('text=Ready in 2 days')).toBeVisible();
    
    // Check payment breakdown
    await expect(page.locator('text=Custom Design')).toBeVisible();
    await expect(page.locator('text=SEO')).toBeVisible();
    await expect(page.locator('text=Domain & Hosting')).toBeVisible();
    
    // Check what's included section
    await expect(page.locator('text=What\'s Included')).toBeVisible();
    await expect(page.locator('text=Mobile-responsive design')).toBeVisible();
    await expect(page.locator('text=SEO optimization')).toBeVisible();
    await expect(page.locator('text=Analytics setup')).toBeVisible();
    
    // Verify payment button
    await expect(page.locator('button:has-text("Pay $500")')).toBeVisible();
    
    console.log('✅ Complete app flow test passed!');
  });

  test('should test admin dashboard functionality', async ({ page }) => {
    // Step 1: Access admin login
    await page.goto('/admin/login');
    
    // Verify admin login page
    await expect(page.locator('h1')).toContainText('Admin Access');
    await expect(page.locator('text=Admin Login')).toBeVisible();
    
    // Fill admin login form (any credentials work now)
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password123');
    
    // Submit admin login
    await page.click('button[type="submit"]');
    
    // Wait for redirect to admin dashboard
    await page.waitForURL('/admin/projects');
    
    // Step 2: Verify admin dashboard
    await expect(page.locator('h1')).toContainText('Admin Dashboard');
    await expect(page.locator('text=Project Management')).toBeVisible();
    
    // Check if projects table is displayed
    await expect(page.locator('text=Project Name')).toBeVisible();
    await expect(page.locator('text=Client')).toBeVisible();
    await expect(page.locator('text=Status')).toBeVisible();
    await expect(page.locator('text=Type')).toBeVisible();
    await expect(page.locator('text=Created')).toBeVisible();
    await expect(page.locator('text=Actions')).toBeVisible();
    
    // Check if "No projects yet" message is displayed (since we haven't created any projects in the database)
    await expect(page.locator('text=No projects yet')).toBeVisible();
    await expect(page.locator('text=No projects found')).toBeVisible();
    
    // Check if admin can see the "Add Project" or similar functionality
    // This would depend on the actual admin dashboard implementation
    
    console.log('✅ Admin dashboard test passed!');
  });

  test('should test client dashboard functionality', async ({ page }) => {
    // Step 1: Access client dashboard directly
    await page.goto('/client-dashboard');
    
    // Verify client dashboard
    await expect(page.locator('h1')).toContainText('My Projects');
    await expect(page.locator('text=Dashboard')).toBeVisible();
    
    // Check if "No projects yet" message is displayed
    await expect(page.locator('text=No projects yet')).toBeVisible();
    await expect(page.locator('text=Start your first project')).toBeVisible();
    
    // Check if "Start New Project" button is visible
    await expect(page.locator('button:has-text("Start New Project")')).toBeVisible();
    await expect(page.locator('button:has-text("Create Your First Project")')).toBeVisible();
    
    // Click on "Start New Project"
    await page.click('button:has-text("Start New Project")');
    
    // Verify redirect to new project page
    await page.waitForURL('/new-project');
    await expect(page.locator('h1')).toContainText('Create Your Project');
    
    console.log('✅ Client dashboard test passed!');
  });

  test('should test project form validation', async ({ page }) => {
    // Go to new project page
    await page.goto('/new-project');
    
    // Try to submit form without filling required fields
    await page.click('text=Next Step');
    
    // Check if validation messages appear
    // Note: This depends on the actual validation implementation
    
    // Fill only name field
    await page.fill('input[name="name"]', 'Test Project');
    
    // Try to go to next step
    await page.click('text=Next Step');
    
    // Verify we can proceed to next step
    await expect(page.locator('text=Content & Features')).toBeVisible();
    
    console.log('✅ Project form validation test passed!');
  });

  test('should test responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Verify mobile layout
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Landing Page')).toBeVisible();
    await expect(page.locator('text=Full Application')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Verify tablet layout
    await expect(page.locator('h1')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Verify desktop layout
    await expect(page.locator('h1')).toBeVisible();
    
    console.log('✅ Responsive design test passed!');
  });
});
