import { test, expect } from '@playwright/test';
import { mockClient } from '../mock-client-data';

test.describe('Complete User Journey - EcoTrack Project', () => {
  test('Full client flow from landing to payment', async ({ page }) => {
    // 1. Landing Page
    await page.goto('/');
    
    // Verify landing page content
    await expect(page.getByText('Build your MVP fast')).toBeVisible();
    await expect(page.getByText('Websites, mobile apps, and brands for student entrepreneurs and business owners.')).toBeVisible();
    
    // Check project showcase
    await expect(page.getByText('GatorEx')).toBeVisible();
    await expect(page.getByText('Rydify')).toBeVisible();
    await expect(page.getByText('Vybr')).toBeVisible();
    
    // Click start project button
    await page.getByRole('button', { name: /start your project/i }).click();
    
    // Should show loading animation
    await expect(page.getByText('Starting your project...')).toBeVisible();
    
    // Wait for redirect to signup
    await page.waitForURL('**/signup');
    
    // 2. Signup Page
    await expect(page.getByText('Create Your Account')).toBeVisible();
    
    // Fill signup form with mock client data
    await page.getByLabel(/full name/i).fill(mockClient.user.name);
    await page.getByLabel(/email/i).fill(mockClient.user.email);
    await page.getByLabel(/password/i).fill(mockClient.user.password);
    await page.getByLabel(/confirm password/i).fill(mockClient.user.password);
    await page.getByLabel(/user type/i).selectOption(mockClient.user.userType);
    
    // Submit form
    await page.getByRole('button', { name: /create account/i }).click();
    
    // Should show loading state
    await expect(page.getByText('Creating your account...')).toBeVisible();
    
    // Wait for redirect to dashboard
    await page.waitForURL('**/dashboard');
    
    // 3. Dashboard Page - Step 1
    await expect(page.getByText('Step 1 of 3')).toBeVisible();
    await expect(page.getByText('Project Details')).toBeVisible();
    
    // Fill project details
    await page.getByLabel(/project name/i).fill(mockClient.project.name);
    await page.getByLabel(/description/i).fill(mockClient.project.description);
    await page.getByLabel(/website/i).fill(mockClient.project.website);
    
    // Upload logo (simulate file upload)
    const fileInput = page.getByLabel(/logo/i);
    await fileInput.setInputFiles({
      name: 'logo.png',
      mimeType: 'image/png',
      buffer: Buffer.from('fake-image-data')
    });
    
    // Go to step 2
    await page.getByRole('button', { name: /next step/i }).click();
    
    // Step 2: Features and Target Audience
    await expect(page.getByText('Step 2 of 3')).toBeVisible();
    await expect(page.getByText('Features & Target Audience')).toBeVisible();
    
    // Add features
    for (const feature of mockClient.project.keyFeatures) {
      await page.getByPlaceholder(/add a feature/i).fill(feature);
      await page.getByRole('button', { name: /add feature/i }).click();
    }
    
    // Fill target audience
    await page.getByLabel(/target audience/i).fill(mockClient.project.targetAudience);
    
    // Go to step 3
    await page.getByRole('button', { name: /next step/i }).click();
    
    // Step 3: Timeline and Budget
    await expect(page.getByText('Step 3 of 3')).toBeVisible();
    await expect(page.getByText('Timeline & Budget')).toBeVisible();
    
    // Select timeline and budget
    await page.getByLabel(/timeline/i).selectOption(mockClient.project.timeline);
    await page.getByLabel(/budget/i).selectOption(mockClient.project.budget);
    
    // Start AI consultation
    await page.getByRole('button', { name: /start ai consultation/i }).click();
    
    // Should show loading and redirect
    await expect(page.getByText('Starting AI consultation...')).toBeVisible();
    await page.waitForURL('**/ai-consultation');
    
    // 4. AI Consultation Page
    await expect(page.getByText(/hello! i'm your ai consultant/i)).toBeVisible();
    
    // Test chat interaction
    const chatInput = page.getByPlaceholderText(/type your message/i);
    const sendButton = page.getByRole('button', { name: /send/i });
    
    // Send user responses
    for (const response of mockClient.aiConsultation.userResponses) {
      await chatInput.fill(response);
      await sendButton.click();
      
      // Wait for AI response
      await page.waitForTimeout(1000);
    }
    
    // Should show completion screen
    await expect(page.getByText(/consultation complete/i)).toBeVisible();
    
    // Click review project details
    await page.getByRole('button', { name: /review project details/i }).click();
    await page.waitForURL('**/project-review');
    
    // 5. Project Review Page
    await expect(page.getByText('Project Review')).toBeVisible();
    await expect(page.getByText(mockClient.project.name)).toBeVisible();
    await expect(page.getByText(mockClient.project.description)).toBeVisible();
    
    // Verify all features are displayed
    for (const feature of mockClient.project.keyFeatures) {
      await expect(page.getByText(feature)).toBeVisible();
    }
    
    // Confirm project
    await page.getByRole('button', { name: /confirm & start development/i }).click();
    await expect(page.getByText('Processing your request...')).toBeVisible();
    await page.waitForURL('**/awaiting-developer');
    
    // 6. Awaiting Developer Page
    await expect(page.getByText(/development in progress/i)).toBeVisible();
    await expect(page.getByText(/1 day, 23 hours/i)).toBeVisible();
    
    // Check progress bar
    const progressBar = page.locator('[role="progressbar"]');
    await expect(progressBar).toBeVisible();
    
    // Click upgrade to full app
    await page.getByRole('button', { name: /start full app development/i }).click();
    await expect(page.getByText('Redirecting to full app consultation...')).toBeVisible();
    await page.waitForURL('**/full-app-consultation');
    
    // 7. Full App Consultation Page
    await expect(page.getByText(/excellent! i can see you're ready to take your project/i)).toBeVisible();
    
    // Test advanced consultation
    const fullAppChatInput = page.getByPlaceholderText(/type your message/i);
    const fullAppSendButton = page.getByRole('button', { name: /send/i });
    
    // Send technical requirements
    for (const response of mockClient.fullAppConsultation.userResponses) {
      await fullAppChatInput.fill(response);
      await fullAppSendButton.click();
      await page.waitForTimeout(1000);
    }
    
    // Should show completion and roadmap button
    await expect(page.getByText(/consultation complete/i)).toBeVisible();
    await page.getByRole('button', { name: /view full app roadmap/i }).click();
    await page.waitForURL('**/full-app-roadmap');
    
    // 8. Full App Roadmap Page
    await expect(page.getByText('Full App Development Roadmap')).toBeVisible();
    
    // Check development phases
    await expect(page.getByText('Database Architecture')).toBeVisible();
    await expect(page.getByText('Authentication System')).toBeVisible();
    await expect(page.getByText('Core Features')).toBeVisible();
    
    // Check pricing plans
    await expect(page.getByText('Basic Plan')).toBeVisible();
    await expect(page.getByText('Standard Plan')).toBeVisible();
    await expect(page.getByText('Premium Plan')).toBeVisible();
    
    // Select standard plan
    await page.getByText('Standard Plan').click();
    
    // Proceed to payment
    await page.getByRole('button', { name: /proceed to payment/i }).click();
    await expect(page.getByText('Redirecting to payment...')).toBeVisible();
    await page.waitForURL('**/payment');
    
    // 9. Payment Page
    await expect(page.getByText('Secure Payment')).toBeVisible();
    await expect(page.getByText('Order Summary')).toBeVisible();
    
    // Fill payment form
    await page.getByLabel(/card number/i).fill(mockClient.payment.cardNumber);
    await page.getByLabel(/expiry date/i).fill(mockClient.payment.expiryDate);
    await page.getByLabel(/cvv/i).fill(mockClient.payment.cvv);
    await page.getByLabel(/full name/i).fill(mockClient.payment.name);
    await page.getByLabel(/email/i).fill(mockClient.payment.email);
    await page.getByLabel(/address/i).fill(mockClient.payment.address);
    await page.getByLabel(/city/i).fill(mockClient.payment.city);
    await page.getByLabel(/zip code/i).fill(mockClient.payment.zipCode);
    
    // Submit payment
    await page.getByRole('button', { name: /pay now/i }).click();
    
    // Should show processing state
    await expect(page.getByText('Processing payment...')).toBeVisible();
    
    // Wait for success screen
    await expect(page.getByText(/payment successful/i)).toBeVisible();
    await expect(page.getByText(/thank you for your payment/i)).toBeVisible();
    
    // Verify order summary
    await expect(page.getByText(mockClient.project.name)).toBeVisible();
    await expect(page.getByText('Standard Plan')).toBeVisible();
  });
  
  test('OAuth signup flow', async ({ page }) => {
    await page.goto('/signup');
    
    // Test Google OAuth
    await page.getByRole('button', { name: /continue with google/i }).click();
    await expect(page.getByText('Redirecting to Google...')).toBeVisible();
    
    // Test Apple OAuth
    await page.getByRole('button', { name: /continue with apple/i }).click();
    await expect(page.getByText('Redirecting to Apple...')).toBeVisible();
  });
  
  test('Mobile responsive design', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Test landing page on mobile
    await page.goto('/');
    await expect(page.getByText('Build your MVP fast')).toBeVisible();
    
    // Test navigation on mobile
    await page.getByRole('button', { name: /start your project/i }).click();
    await page.waitForURL('**/signup');
    
    // Test signup form on mobile
    await expect(page.getByLabel(/full name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
  });
  
  test('Error handling and validation', async ({ page }) => {
    await page.goto('/signup');
    
    // Test form validation
    await page.getByRole('button', { name: /create account/i }).click();
    
    // Should show validation errors
    await expect(page.getByText(/name is required/i)).toBeVisible();
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
    
    // Test password mismatch
    await page.getByLabel(/password/i).fill('password123');
    await page.getByLabel(/confirm password/i).fill('different123');
    await page.getByRole('button', { name: /create account/i }).click();
    
    await expect(page.getByText(/passwords do not match/i)).toBeVisible();
  });
  
  test('Loading states and animations', async ({ page }) => {
    await page.goto('/');
    
    // Test loading animation on CTA
    const startButton = page.getByRole('button', { name: /start your project/i });
    await startButton.click();
    
    // Should show loading animation
    await expect(page.getByText('Starting your project...')).toBeVisible();
    
    // Wait for redirect
    await page.waitForURL('**/signup');
    
    // Test form submission loading
    await page.getByLabel(/full name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByLabel(/confirm password/i).fill('password123');
    
    await page.getByRole('button', { name: /create account/i }).click();
    await expect(page.getByText('Creating your account...')).toBeVisible();
  });
});
