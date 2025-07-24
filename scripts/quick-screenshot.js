const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

async function takeScreenshot() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotDir = path.join(__dirname, '..', 'screenshots', 'css-check', timestamp);
  await fs.mkdir(screenshotDir, { recursive: true });

  try {
    // Capture web home page
    console.log('Capturing Web Home...');
    await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded', timeout: 5000 });
    await page.screenshot({ 
      path: path.join(screenshotDir, 'web-home.png'), 
      fullPage: false 
    });
    console.log('✓ Web Home captured');

    // Capture admin signin page
    console.log('Capturing Admin Signin...');
    await page.goto('http://localhost:3000/auth/signin', { waitUntil: 'domcontentloaded', timeout: 5000 });
    await page.screenshot({ 
      path: path.join(screenshotDir, 'admin-signin.png'), 
      fullPage: false 
    });
    console.log('✓ Admin Signin captured');

    console.log(`\n✅ Screenshots saved to: ${screenshotDir}`);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

takeScreenshot();