const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// Define all pages to test
const WEB_PAGES = [
  { name: 'home', path: '/' },
  { name: 'products', path: '/products' },
  { name: 'blog', path: '/blog' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
  { name: 'privacy', path: '/privacy' },
  { name: 'terms', path: '/terms' },
  { name: 'disclosure', path: '/disclosure' },
];

const ADMIN_PAGES = [
  { name: 'signin', path: '/auth/signin' },
  { name: 'dashboard', path: '/dashboard' },
  { name: 'sites', path: '/sites' },
  { name: 'products', path: '/products' },
  { name: 'cms', path: '/cms' },
  { name: 'ai', path: '/ai' },
  { name: 'generate', path: '/generate' },
  { name: 'approval', path: '/approval' },
  { name: 'analytics', path: '/analytics' },
  { name: 'newsletter', path: '/newsletter' },
  { name: 'social', path: '/social' },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
];

async function ensureDir(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotDir = path.join(__dirname, '..', 'screenshots', timestamp);
  await ensureDir(screenshotDir);

  console.log(`Creating screenshots in: ${screenshotDir}`);

  // Test Web App
  console.log('\n📸 Capturing Web App Screenshots...');
  const webDir = path.join(screenshotDir, 'web');
  await ensureDir(webDir);

  for (const viewport of VIEWPORTS) {
    const viewportDir = path.join(webDir, viewport.name);
    await ensureDir(viewportDir);

    const page = await browser.newPage();
    await page.setViewport({ width: viewport.width, height: viewport.height });

    for (const webPage of WEB_PAGES) {
      try {
        const url = `http://localhost:3003${webPage.path}`;
        console.log(`  - ${viewport.name}: ${webPage.name} (${url})`);
        
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for animations
        
        const screenshotPath = path.join(viewportDir, `${webPage.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        
        // Also capture visible viewport only
        const viewportScreenshotPath = path.join(viewportDir, `${webPage.name}-viewport.png`);
        await page.screenshot({ path: viewportScreenshotPath, fullPage: false });
      } catch (error) {
        console.error(`    ❌ Error capturing ${webPage.name}: ${error.message}`);
      }
    }
    await page.close();
  }

  // Test Admin App
  console.log('\n📸 Capturing Admin App Screenshots...');
  const adminDir = path.join(screenshotDir, 'admin');
  await ensureDir(adminDir);

  for (const viewport of VIEWPORTS) {
    const viewportDir = path.join(adminDir, viewport.name);
    await ensureDir(viewportDir);

    const page = await browser.newPage();
    await page.setViewport({ width: viewport.width, height: viewport.height });

    for (const adminPage of ADMIN_PAGES) {
      try {
        const url = `http://localhost:3002${adminPage.path}`;
        console.log(`  - ${viewport.name}: ${adminPage.name} (${url})`);
        
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for animations
        
        const screenshotPath = path.join(viewportDir, `${adminPage.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        
        // Also capture visible viewport only
        const viewportScreenshotPath = path.join(viewportDir, `${adminPage.name}-viewport.png`);
        await page.screenshot({ path: viewportScreenshotPath, fullPage: false });
      } catch (error) {
        console.error(`    ❌ Error capturing ${adminPage.name}: ${error.message}`);
      }
    }
    await page.close();
  }

  await browser.close();
  
  console.log('\n✅ Screenshots captured successfully!');
  console.log(`📁 View screenshots in: ${screenshotDir}`);
  
  // Generate HTML report
  await generateReport(screenshotDir, timestamp);
}

async function generateReport(screenshotDir, timestamp) {
  const reportPath = path.join(screenshotDir, 'report.html');
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Visual Test Report - ${timestamp}</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
    h1, h2, h3 { margin: 0 0 20px 0; }
    .container { max-width: 1400px; margin: 0 auto; }
    .app-section { background: white; padding: 20px; margin-bottom: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .viewport-section { margin-bottom: 40px; }
    .page-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .page-card { background: #f9f9f9; border-radius: 4px; overflow: hidden; }
    .page-card h4 { margin: 0; padding: 10px; background: #333; color: white; font-size: 14px; }
    .screenshot { width: 100%; height: auto; display: block; }
    .screenshot-container { position: relative; }
    .screenshot-label { position: absolute; top: 5px; right: 5px; background: rgba(0,0,0,0.7); color: white; padding: 2px 6px; border-radius: 3px; font-size: 11px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Visual Test Report</h1>
    <p>Generated: ${new Date(timestamp).toLocaleString()}</p>
    
    <div class="app-section">
      <h2>Web App</h2>
      ${VIEWPORTS.map(viewport => `
        <div class="viewport-section">
          <h3>${viewport.name.charAt(0).toUpperCase() + viewport.name.slice(1)} (${viewport.width}x${viewport.height})</h3>
          <div class="page-grid">
            ${WEB_PAGES.map(page => `
              <div class="page-card">
                <h4>${page.name} - ${page.path}</h4>
                <div class="screenshot-container">
                  <img class="screenshot" src="web/${viewport.name}/${page.name}.png" alt="${page.name} ${viewport.name}" />
                  <span class="screenshot-label">Full Page</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
    
    <div class="app-section">
      <h2>Admin App</h2>
      ${VIEWPORTS.map(viewport => `
        <div class="viewport-section">
          <h3>${viewport.name.charAt(0).toUpperCase() + viewport.name.slice(1)} (${viewport.width}x${viewport.height})</h3>
          <div class="page-grid">
            ${ADMIN_PAGES.map(page => `
              <div class="page-card">
                <h4>${page.name} - ${page.path}</h4>
                <div class="screenshot-container">
                  <img class="screenshot" src="admin/${viewport.name}/${page.name}.png" alt="${page.name} ${viewport.name}" />
                  <span class="screenshot-label">Full Page</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</body>
</html>
  `;
  
  await fs.writeFile(reportPath, html);
  console.log(`\n📄 HTML report generated: ${reportPath}`);
}

// Run the visual tests
captureScreenshots().catch(console.error);