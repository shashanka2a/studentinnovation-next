import { test, expect } from '@playwright/test';

test.describe('Basic App Flow Test', () => {
  test('should complete basic client journey', async ({ page }) => {
    console.log('🚀 Starting basic app flow test...');
    
    // Step 1: Visit landing page
    await page.goto('/');
    console.log('✅ Landed on homepage');
    
    // Verify landing page content
    await expect(page.locator('h1')).toContainText('Professional landing pages');
    await expect(page.locator('text=Landing Page')).toBeVisible();
    await expect(page.locator('text=Full Application')).toBeVisible();
    console.log('✅ Landing page content verified');
    
    // Step 2: Navigate to signup
    await page.goto('/signup');
    console.log('✅ Navigated to signup page');
    
    // Fill signup form with mock data
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.selectOption('select[name="projectType"]', 'landing-page');
    console.log('✅ Filled signup form');
    
    // Submit signup form
    await page.click('button[type="submit"]');
    console.log('✅ Submitted signup form');
    
    // Wait for redirect to client dashboard
    await page.waitForURL('/client-dashboard');
    console.log('✅ Redirected to client dashboard');
    
    // Step 3: Start new project
    await page.click('text=Start New Project');
    await page.waitForURL('/new-project');
    console.log('✅ Navigated to new project page');
    
    // Step 4: Fill project form - Step 1
    await page.fill('input[name="name"]', 'Test Landing Page');
    await page.fill('textarea[name="description"]', 'A test landing page for our app');
    await page.fill('input[name="website"]', 'https://test.com');
    await page.fill('textarea[name="targetAudience"]', 'Test audience');
    console.log('✅ Filled project overview');
    
    // Go to next step
    await page.click('text=Next Step');
    console.log('✅ Moved to step 2');
    
    // Step 5: Fill project form - Step 2
    await page.fill('input[name="heroHeadline"]', 'Test Headline');
    await page.fill('input[name="heroSubheadline"]', 'Test Subheadline');
    await page.fill('input[name="primaryCTA"]', 'Get Started');
    await page.fill('input[name="secondaryCTA"]', 'Learn More');
    await page.fill('textarea[name="aboutContent"]', 'Test about content');
    console.log('✅ Filled content and features');
    
    // Go to next step
    await page.click('text=Next Step');
    console.log('✅ Moved to step 3');
    
    // Step 6: Fill project form - Step 3
    await page.fill('input[name="brandColors.primary"]', '#3B82F6');
    await page.fill('input[name="brandColors.secondary"]', '#1E40AF');
    await page.fill('input[name="brandColors.accent"]', '#F59E0B');
    console.log('✅ Filled design and branding');
    
    // Go to next step
    await page.click('text=Next Step');
    console.log('✅ Moved to step 4');
    
    // Step 7: Fill project form - Step 4
    await page.fill('input[name="domain"]', 'test.com');
    await page.selectOption('select[name="hosting"]', 'managed');
    await page.check('input[name="seo"]');
    await page.check('input[name="analytics"]');
    await page.fill('input[name="contactEmail"]', 'test@example.com');
    await page.fill('input[name="contactPhone"]', '+1-555-0123');
    console.log('✅ Filled technical setup');
    
    // Submit project (final step)
    await page.click('text=Review Project');
    console.log('✅ Submitted project for review');
    
    // Step 8: Verify project review page
    await page.waitForURL('/project-review');
    console.log('✅ Navigated to project review');
    
    // Check if project data is displayed
    await expect(page.locator('h1')).toContainText('Review Your Landing Page');
    await expect(page.locator('text=Test Landing Page')).toBeVisible();
    await expect(page.locator('text=Test Headline')).toBeVisible();
    await expect(page.locator('text=Test Subheadline')).toBeVisible();
    await expect(page.locator('text=Get Started')).toBeVisible();
    console.log('✅ Project review data verified');
    
    // Check if landing page preview is displayed
    await expect(page.locator('text=Landing Page Preview')).toBeVisible();
    console.log('✅ Landing page preview section found');
    
    // Check if preview shows the correct content
    const previewSection = page.locator('text=Landing Page Preview').locator('..');
    await expect(previewSection.locator('text=Test Headline')).toBeVisible();
    await expect(previewSection.locator('text=Test Subheadline')).toBeVisible();
    await expect(previewSection.locator('text=Get Started')).toBeVisible();
    console.log('✅ Preview content verified');
    
    // Check if brand colors are applied in preview
    const previewButton = page.locator('button').filter({ hasText: 'Get Started' });
    await expect(previewButton).toBeVisible();
    console.log('✅ Preview button found');
    
    // Check if key features are displayed
    await expect(page.locator('text=What Happens Next?')).toBeVisible();
    console.log('✅ Next steps section found');
    
    // Step 9: Confirm and start development
    await page.click('text=Confirm & Start Development');
    console.log('✅ Clicked confirm and start development');
    
    // Wait for redirect to payment page
    await page.waitForURL('/payment');
    console.log('✅ Navigated to payment page');
    
    // Step 10: Verify payment page
    await expect(page.locator('text=Professional Landing Page')).toBeVisible();
    await expect(page.locator('text=$500')).toBeVisible();
    await expect(page.locator('text=Ready in 2 days')).toBeVisible();
    console.log('✅ Payment page content verified');
    
    // Check payment breakdown
    await expect(page.locator('text=Custom Design')).toBeVisible();
    await expect(page.locator('text=SEO')).toBeVisible();
    await expect(page.locator('text=Domain & Hosting')).toBeVisible();
    console.log('✅ Payment breakdown verified');
    
    // Check what's included section
    await expect(page.locator('text=What\'s Included')).toBeVisible();
    console.log('✅ What\'s included section found');
    
    // Verify payment button
    await expect(page.locator('button:has-text("Pay $500")')).toBeVisible();
    console.log('✅ Payment button found');
    
    console.log('🎉 Basic app flow test completed successfully!');
  });

  test('should test admin dashboard access', async ({ page }) => {
    console.log('🚀 Starting admin dashboard test...');
    
    // Step 1: Access admin login
    await page.goto('/admin/login');
    console.log('✅ Navigated to admin login');
    
    // Verify admin login page
    await expect(page.locator('h1')).toContainText('Admin Access');
    await expect(page.locator('text=Admin Login')).toBeVisible();
    console.log('✅ Admin login page verified');
    
    // Fill admin login form (any credentials work now)
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password123');
    console.log('✅ Filled admin login form');
    
    // Submit admin login
    await page.click('button[type="submit"]');
    console.log('✅ Submitted admin login');
    
    // Wait for redirect to admin dashboard
    await page.waitForURL('/admin/projects');
    console.log('✅ Redirected to admin dashboard');
    
    // Step 2: Verify admin dashboard
    await expect(page.locator('h1')).toContainText('Admin Dashboard');
    await expect(page.locator('text=Project Management')).toBeVisible();
    console.log('✅ Admin dashboard header verified');
    
    // Check if projects table is displayed
    await expect(page.locator('text=Project Name')).toBeVisible();
    await expect(page.locator('text=Client')).toBeVisible();
    await expect(page.locator('text=Status')).toBeVisible();
    await expect(page.locator('text=Type')).toBeVisible();
    await expect(page.locator('text=Created')).toBeVisible();
    await expect(page.locator('text=Actions')).toBeVisible();
    console.log('✅ Projects table headers verified');
    
    // Check if "No projects yet" message is displayed
    await expect(page.locator('text=No projects yet')).toBeVisible();
    console.log('✅ No projects message verified');
    
    console.log('🎉 Admin dashboard test completed successfully!');
  });

  test('should test client dashboard access', async ({ page }) => {
    console.log('🚀 Starting client dashboard test...');
    
    // Step 1: Access client dashboard directly
    await page.goto('/client-dashboard');
    console.log('✅ Navigated to client dashboard');
    
    // Verify client dashboard
    await expect(page.locator('h1')).toContainText('My Projects');
    await expect(page.locator('text=Dashboard')).toBeVisible();
    console.log('✅ Client dashboard header verified');
    
    // Check if "No projects yet" message is displayed
    await expect(page.locator('text=No projects yet')).toBeVisible();
    await expect(page.locator('text=Start your first project')).toBeVisible();
    console.log('✅ No projects message verified');
    
    // Check if "Start New Project" button is visible
    await expect(page.locator('button:has-text("Start New Project")')).toBeVisible();
    console.log('✅ Start New Project button found');
    
    // Click on "Start New Project"
    await page.click('button:has-text("Start New Project")');
    console.log('✅ Clicked Start New Project');
    
    // Verify redirect to new project page
    await page.waitForURL('/new-project');
    await expect(page.locator('h1')).toContainText('Create Your Project');
    console.log('✅ Redirected to new project page');
    
    console.log('🎉 Client dashboard test completed successfully!');
  });

  test('should test project form steps', async ({ page }) => {
    console.log('🚀 Starting project form test...');
    
    // Go to new project page
    await page.goto('/new-project');
    console.log('✅ Navigated to new project page');
    
    // Verify form steps are visible
    await expect(page.locator('text=Project Overview')).toBeVisible();
    console.log('✅ Step 1 (Project Overview) verified');
    
    // Fill step 1
    await page.fill('input[name="name"]', 'Test Project');
    await page.fill('textarea[name="description"]', 'Test description');
    console.log('✅ Filled step 1 data');
    
    // Go to step 2
    await page.click('text=Next Step');
    await expect(page.locator('text=Content & Features')).toBeVisible();
    console.log('✅ Moved to step 2 (Content & Features)');
    
    // Fill step 2
    await page.fill('input[name="heroHeadline"]', 'Test Headline');
    await page.fill('input[name="heroSubheadline"]', 'Test Subheadline');
    console.log('✅ Filled step 2 data');
    
    // Go to step 3
    await page.click('text=Next Step');
    await expect(page.locator('text=Design & Branding')).toBeVisible();
    console.log('✅ Moved to step 3 (Design & Branding)');
    
    // Fill step 3
    await page.fill('input[name="brandColors.primary"]', '#3B82F6');
    console.log('✅ Filled step 3 data');
    
    // Go to step 4
    await page.click('text=Next Step');
    await expect(page.locator('text=Technical Setup')).toBeVisible();
    console.log('✅ Moved to step 4 (Technical Setup)');
    
    // Fill step 4
    await page.fill('input[name="domain"]', 'test.com');
    await page.fill('input[name="contactEmail"]', 'test@example.com');
    console.log('✅ Filled step 4 data');
    
    // Submit project
    await page.click('text=Review Project');
    console.log('✅ Submitted project for review');
    
    // Verify redirect to project review
    await page.waitForURL('/project-review');
    await expect(page.locator('h1')).toContainText('Review Your Landing Page');
    console.log('✅ Redirected to project review');
    
    console.log('🎉 Project form test completed successfully!');
  });
});
