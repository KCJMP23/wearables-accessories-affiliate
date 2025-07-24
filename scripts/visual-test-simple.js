const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

async function captureScreenshot(browser, url, outputPath) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1920, height: 1080 });
    console.log(`Capturing: ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for initial render
    await page.screenshot({ path: outputPath, fullPage: true });
    console.log(`✓ Saved: ${outputPath}`);
  } catch (error) {
    console.error(`✗ Error capturing ${url}: ${error.message}`);
  } finally {
    await page.close();
  }
}

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotDir = path.join(__dirname, '..', 'screenshots', 'simple', timestamp);
  await fs.mkdir(screenshotDir, { recursive: true });

  console.log(`\nSaving screenshots to: ${screenshotDir}\n`);

  // Web app pages
  const webPages = [
    '/', '/products', '/blog', '/about', '/contact', 
    '/privacy', '/terms', '/disclosure'
  ];

  console.log('📸 Web App (http://localhost:3001)');
  for (const page of webPages) {
    const url = `http://localhost:3001${page}`;
    const filename = page === '/' ? 'home.png' : `${page.slice(1)}.png`;
    await captureScreenshot(browser, url, path.join(screenshotDir, `web-${filename}`));
  }

  // Admin app pages
  const adminPages = [
    '/auth/signin', '/dashboard', '/sites', '/products', 
    '/cms', '/ai', '/generate', '/approval', 
    '/analytics', '/newsletter', '/social'
  ];

  console.log('\n📸 Admin App (http://localhost:3000)');
  for (const page of adminPages) {
    const url = `http://localhost:3000${page}`;
    const filename = page.replace(/\//g, '-').slice(1) + '.png';
    await captureScreenshot(browser, url, path.join(screenshotDir, `admin-${filename}`));
  }

  await browser.close();
  console.log('\n✅ Done!');
  console.log(`View screenshots in: ${screenshotDir}`);
}

main().catch(console.error);