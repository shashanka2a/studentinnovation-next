import { test, expect } from '@playwright/test';

test.describe('Simple App Flow Test', () => {
  test('should test basic page navigation and content', async ({ page }) => {
    console.log('🚀 Starting simple app flow test...');
    
    // Test 1: Landing page
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Professional landing pages');
    console.log('✅ Landing page loaded');
    
    // Test 2: Signup page
    await page.goto('/signup');
    await expect(page.locator('h1')).toContainText('Create Your Account');
    console.log('✅ Signup page loaded');
    
    // Test 3: New project page
    await page.goto('/new-project');
    await expect(page.locator('h1')).toContainText('Create Your Project');
    console.log('✅ New project page loaded');
    
    // Test 4: Project review page
    await page.goto('/project-review');
    await expect(page.locator('h1')).toContainText('Review Your Landing Page');
    console.log('✅ Project review page loaded');
    
    // Test 5: Payment page
    await page.goto('/payment');
    await expect(page.locator('h1')).toContainText('Complete Your Order');
    console.log('✅ Payment page loaded');
    
    // Test 6: Client dashboard
    await page.goto('/client-dashboard');
    await expect(page.locator('h1')).toContainText('My Projects');
    console.log('✅ Client dashboard loaded');
    
    // Test 7: Admin login
    await page.goto('/admin/login');
    await expect(page.locator('h1')).toContainText('Admin Access');
    console.log('✅ Admin login page loaded');
    
    // Test 8: Admin dashboard
    await page.goto('/admin/projects');
    await expect(page.locator('h1')).toContainText('Admin Dashboard');
    console.log('✅ Admin dashboard loaded');
    
    console.log('🎉 Simple app flow test completed successfully!');
  });

  test('should test project form basic functionality', async ({ page }) => {
    console.log('🚀 Starting project form test...');
    
    // Go to new project page
    await page.goto('/new-project');
    console.log('✅ Navigated to new project page');
    
    // Test form fields are present
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('textarea[name="description"]')).toBeVisible();
    await expect(page.locator('input[name="website"]')).toBeVisible();
    console.log('✅ Form fields are visible');
    
    // Test form navigation
    await page.fill('input[name="name"]', 'Test Project');
    await page.fill('textarea[name="description"]', 'Test description');
    console.log('✅ Filled basic form data');
    
    // Test next step button
    await page.click('text=Next Step');
    console.log('✅ Clicked next step');
    
    // Test step 2 fields
    await expect(page.locator('input[name="heroHeadline"]')).toBeVisible();
    await expect(page.locator('input[name="heroSubheadline"]')).toBeVisible();
    console.log('✅ Step 2 fields are visible');
    
    // Fill step 2
    await page.fill('input[name="heroHeadline"]', 'Test Headline');
    await page.fill('input[name="heroSubheadline"]', 'Test Subheadline');
    console.log('✅ Filled step 2 data');
    
    // Test next step
    await page.click('text=Next Step');
    console.log('✅ Moved to step 3');
    
    // Test step 3 fields
    await expect(page.locator('input[name="brandColors.primary"]')).toBeVisible();
    console.log('✅ Step 3 fields are visible');
    
    // Fill step 3
    await page.fill('input[name="brandColors.primary"]', '#3B82F6');
    console.log('✅ Filled step 3 data');
    
    // Test next step
    await page.click('text=Next Step');
    console.log('✅ Moved to step 4');
    
    // Test step 4 fields
    await expect(page.locator('input[name="domain"]')).toBeVisible();
    await expect(page.locator('input[name="contactEmail"]')).toBeVisible();
    console.log('✅ Step 4 fields are visible');
    
    // Fill step 4
    await page.fill('input[name="domain"]', 'test.com');
    await page.fill('input[name="contactEmail"]', 'test@example.com');
    console.log('✅ Filled step 4 data');
    
    // Test submit
    await page.click('text=Review Project');
    console.log('✅ Submitted project for review');
    
    // Verify redirect to project review
    await page.waitForURL('/project-review');
    await expect(page.locator('h1')).toContainText('Review Your Landing Page');
    console.log('✅ Redirected to project review');
    
    console.log('🎉 Project form test completed successfully!');
  });

  test('should test admin dashboard access', async ({ page }) => {
    console.log('🚀 Starting admin dashboard test...');
    
    // Test admin login page
    await page.goto('/admin/login');
    await expect(page.locator('h1')).toContainText('Admin Access');
    console.log('✅ Admin login page loaded');
    
    // Test admin login form
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password123');
    console.log('✅ Filled admin login form');
    
    // Submit admin login
    await page.click('button[type="submit"]');
    console.log('✅ Submitted admin login');
    
    // Wait for redirect to admin dashboard
    await page.waitForURL('/admin/projects');
    await expect(page.locator('h1')).toContainText('Admin Dashboard');
    console.log('✅ Redirected to admin dashboard');
    
    // Test admin dashboard content
    await expect(page.locator('text=Project Management')).toBeVisible();
    await expect(page.locator('text=Project Name')).toBeVisible();
    await expect(page.locator('text=Client')).toBeVisible();
    await expect(page.locator('text=Status')).toBeVisible();
    console.log('✅ Admin dashboard content verified');
    
    console.log('🎉 Admin dashboard test completed successfully!');
  });

  test('should test client dashboard access', async ({ page }) => {
    console.log('🚀 Starting client dashboard test...');
    
    // Test client dashboard
    await page.goto('/client-dashboard');
    await expect(page.locator('h1')).toContainText('My Projects');
    console.log('✅ Client dashboard loaded');
    
    // Test client dashboard content
    await expect(page.locator('text=Dashboard')).toBeVisible();
    await expect(page.locator('button:has-text("Start New Project")')).toBeVisible();
    console.log('✅ Client dashboard content verified');
    
    // Test navigation to new project
    await page.click('button:has-text("Start New Project")');
    await page.waitForURL('/new-project');
    await expect(page.locator('h1')).toContainText('Create Your Project');
    console.log('✅ Navigated to new project page');
    
    console.log('🎉 Client dashboard test completed successfully!');
  });

  test('should test responsive design', async ({ page }) => {
    console.log('🚀 Starting responsive design test...');
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    console.log('✅ Mobile viewport test passed');
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    console.log('✅ Tablet viewport test passed');
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    console.log('✅ Desktop viewport test passed');
    
    console.log('🎉 Responsive design test completed successfully!');
  });
});
