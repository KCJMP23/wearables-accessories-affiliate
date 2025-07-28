const puppeteer = require('puppeteer');

async function testAuthManual() {
  console.log('🔐 Testing Authentication Manually...');
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });
  
  const page = await browser.newPage();
  
  try {
    // Test admin signin page
    console.log('Testing admin signin page...');
    await page.goto('http://localhost:3001/auth/signin', { waitUntil: 'networkidle0' });
    
    // Wait for the form to load
    await page.waitForSelector('form', { timeout: 10000 });
    console.log('✅ Signin form found');
    
    // Check if email and password fields exist
    const emailField = await page.$('input[type="email"]');
    const passwordField = await page.$('input[type="password"]');
    
    if (emailField && passwordField) {
      console.log('✅ Email and password fields found');
      
      // Fill in the form
      await page.type('input[type="email"]', 'admin@example.com');
      await page.type('input[type="password"]', 'password');
      
      // Submit the form
      await page.click('button[type="submit"]');
      
      // Wait for navigation
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
      
      // Check if we're redirected to dashboard
      const currentUrl = page.url();
      if (currentUrl.includes('/dashboard')) {
        console.log('✅ Authentication successful - redirected to dashboard');
      } else {
        console.log('❌ Authentication failed - still on signin page');
      }
    } else {
      console.log('❌ Email or password fields not found');
    }
    
    // Test protected route access
    console.log('Testing protected route access...');
    await page.goto('http://localhost:3001/dashboard', { waitUntil: 'networkidle0' });
    
    const currentUrl = page.url();
    if (currentUrl.includes('/auth/signin')) {
      console.log('✅ Proper authentication redirect working');
    } else if (currentUrl.includes('/dashboard')) {
      console.log('✅ Already authenticated - dashboard accessible');
    } else {
      console.log('⚠️ Unexpected redirect');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testAuthManual(); 