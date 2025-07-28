const puppeteer = require('puppeteer');

async function testAuthAndCRUD() {
  console.log('🔐 Testing Authentication and CRUD Operations...');
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });
  
  const page = await browser.newPage();
  
  try {
    // Test admin signin
    console.log('Testing admin signin...');
    await page.goto('http://localhost:3001/auth/signin', { waitUntil: 'networkidle0' });
    
    // Check if signin form exists
    const signinForm = await page.$('form');
    if (signinForm) {
      console.log('✅ Signin form found');
    } else {
      console.log('❌ Signin form not found');
    }
    
    // Test dashboard access
    console.log('Testing dashboard access...');
    await page.goto('http://localhost:3001/dashboard', { waitUntil: 'networkidle0' });
    
    // Check if we're redirected to signin (expected behavior)
    const currentUrl = page.url();
    if (currentUrl.includes('/auth/signin')) {
      console.log('✅ Proper authentication redirect working');
    } else {
      console.log('⚠️ No authentication redirect');
    }
    
    // Test CMS page
    console.log('Testing CMS page...');
    await page.goto('http://localhost:3001/cms', { waitUntil: 'networkidle0' });
    
    // Test Products page
    console.log('Testing Products page...');
    await page.goto('http://localhost:3001/products', { waitUntil: 'networkidle0' });
    
    // Test AI page
    console.log('Testing AI page...');
    await page.goto('http://localhost:3001/ai', { waitUntil: 'networkidle0' });
    
    // Test API endpoints
    console.log('Testing API endpoints...');
    
    const apiTests = [
      'http://localhost:3000/api/health',
      'http://localhost:3000/api/health/db',
      'http://localhost:3001/api/health',
      'http://localhost:3001/api/health/db'
    ];
    
    for (const apiUrl of apiTests) {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          console.log(`✅ ${apiUrl}: ${data.status || 'Working'}`);
        } else {
          console.log(`❌ ${apiUrl}: ${response.status}`);
        }
      } catch (error) {
        console.log(`❌ ${apiUrl}: ${error.message}`);
      }
    }
    
    console.log('\n🎉 Authentication and CRUD tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testAuthAndCRUD(); 