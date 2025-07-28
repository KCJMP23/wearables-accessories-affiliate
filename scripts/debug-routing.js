const puppeteer = require('puppeteer');

async function debugRouting() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });
  
  const page = await browser.newPage();
  
  // Enable console logging
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  console.log('Testing homepage...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  console.log('Homepage loaded successfully');
  
  console.log('Testing about page...');
  try {
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
    console.log('About page loaded successfully');
  } catch (error) {
    console.log('About page error:', error.message);
  }
  
  console.log('Testing blog page...');
  try {
    await page.goto('http://localhost:3000/blog', { waitUntil: 'networkidle0' });
    console.log('Blog page loaded successfully');
  } catch (error) {
    console.log('Blog page error:', error.message);
  }
  
  await browser.close();
}

debugRouting().catch(console.error); 