const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// Define all pages to audit
const ADMIN_PAGES = [
  { name: 'dashboard', path: '/', title: 'Dashboard' },
  { name: 'sites', path: '/sites', title: 'Sites Management' },
  { name: 'products', path: '/products', title: 'Products' },
  { name: 'cms', path: '/cms', title: 'CMS' },
  { name: 'ai', path: '/ai', title: 'AI Tools' },
  { name: 'generate', path: '/generate', title: 'Generate Content' },
  { name: 'approval', path: '/approval', title: 'Content Approval' },
  { name: 'analytics', path: '/analytics', title: 'Analytics' },
  { name: 'newsletter', path: '/newsletter', title: 'Newsletter' },
  { name: 'social', path: '/social', title: 'Social Media' },
];

const WEB_PAGES = [
  { name: 'home', path: '/', title: 'Home' },
  { name: 'products', path: '/products', title: 'Products' },
  { name: 'blog', path: '/blog', title: 'Blog' },
  { name: 'about', path: '/about', title: 'About' },
  { name: 'contact', path: '/contact', title: 'Contact' },
  { name: 'privacy', path: '/privacy', title: 'Privacy' },
  { name: 'terms', path: '/terms', title: 'Terms' },
  { name: 'disclosure', path: '/disclosure', title: 'Disclosure' },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080, device: 'Desktop HD' },
  { name: 'laptop', width: 1366, height: 768, device: 'Laptop' },
  { name: 'tablet', width: 768, height: 1024, device: 'iPad' },
  { name: 'mobile', width: 375, height: 667, device: 'iPhone SE' },
];

async function capturePageAudit(browser, url, page, viewport, outputDir) {
  const browserPage = await browser.newPage();
  
  try {
    await browserPage.setViewport({ width: viewport.width, height: viewport.height });
    
    console.log(`  📸 ${viewport.device}: ${page.title}`);
    
    await browserPage.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await browserPage.waitForTimeout(2000); // Wait for animations
    
    // Take full page screenshot
    const screenshotPath = path.join(outputDir, `${page.name}-${viewport.name}.png`);
    await browserPage.screenshot({ path: screenshotPath, fullPage: true });
    
    // Check for overflow issues
    const overflowIssues = await browserPage.evaluate(() => {
      const issues = [];
      const elements = document.querySelectorAll('*');
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const styles = window.getComputedStyle(el);
        
        // Check horizontal overflow
        if (rect.width > window.innerWidth) {
          issues.push({
            selector: el.className || el.tagName,
            type: 'horizontal-overflow',
            width: rect.width,
            viewportWidth: window.innerWidth
          });
        }
        
        // Check if text is truncated
        if (el.scrollWidth > el.clientWidth && styles.overflow !== 'hidden') {
          issues.push({
            selector: el.className || el.tagName,
            type: 'text-overflow',
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth
          });
        }
      });
      
      return issues;
    });
    
    return {
      page: page.name,
      viewport: viewport.name,
      url,
      overflowIssues,
      screenshot: screenshotPath
    };
    
  } catch (error) {
    console.error(`    ❌ Error: ${error.message}`);
    return {
      page: page.name,
      viewport: viewport.name,
      url,
      error: error.message
    };
  } finally {
    await browserPage.close();
  }
}

async function generateReport(results, outputDir) {
  const reportPath = path.join(outputDir, 'qa-report.html');
  
  let issueCount = 0;
  results.forEach(result => {
    if (result.overflowIssues && result.overflowIssues.length > 0) {
      issueCount += result.overflowIssues.length;
    }
  });
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>QA Audit Report</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
      margin: 0; 
      padding: 20px; 
      background: #f5f5f5; 
    }
    .container { max-width: 1400px; margin: 0 auto; }
    h1, h2, h3 { margin: 0 0 20px 0; }
    .summary { 
      background: white; 
      padding: 20px; 
      border-radius: 8px; 
      margin-bottom: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .issue-count { 
      font-size: 48px; 
      font-weight: bold; 
      color: ${issueCount > 0 ? '#dc3545' : '#28a745'};
    }
    .app-section { 
      background: white; 
      padding: 20px; 
      margin-bottom: 30px; 
      border-radius: 8px; 
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .viewport-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
      gap: 20px; 
      margin-bottom: 30px;
    }
    .page-card { 
      background: #f9f9f9; 
      border-radius: 4px; 
      overflow: hidden;
      border: 1px solid #e0e0e0;
    }
    .page-header { 
      background: #333; 
      color: white; 
      padding: 10px; 
      font-weight: bold;
    }
    .screenshot-container { 
      position: relative; 
      padding: 10px;
      max-height: 400px;
      overflow-y: auto;
    }
    .screenshot { 
      width: 100%; 
      height: auto; 
      display: block;
      border: 1px solid #ddd;
    }
    .issues { 
      padding: 10px; 
      background: #fff3cd; 
      border-top: 1px solid #ffeaa7;
    }
    .issue { 
      margin: 5px 0; 
      font-size: 12px;
      color: #856404;
    }
    .no-issues { 
      padding: 10px; 
      background: #d4edda; 
      color: #155724;
      text-align: center;
    }
    .error { 
      padding: 10px; 
      background: #f8d7da; 
      color: #721c24;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>QA Audit Report</h1>
    <div class="summary">
      <h2>Summary</h2>
      <div class="issue-count">${issueCount}</div>
      <p>Total overflow issues found</p>
      <p>Generated: ${new Date().toLocaleString()}</p>
    </div>
    
    ${VIEWPORTS.map(viewport => `
      <div class="app-section">
        <h2>${viewport.device} (${viewport.width}x${viewport.height})</h2>
        
        <h3>Admin Dashboard</h3>
        <div class="viewport-grid">
          ${results.filter(r => r.viewport === viewport.name && ADMIN_PAGES.some(p => p.name === r.page))
            .map(result => `
              <div class="page-card">
                <div class="page-header">${ADMIN_PAGES.find(p => p.name === result.page).title}</div>
                <div class="screenshot-container">
                  <img class="screenshot" src="${path.basename(result.screenshot)}" alt="${result.page}" />
                </div>
                ${result.error ? `
                  <div class="error">Error: ${result.error}</div>
                ` : result.overflowIssues && result.overflowIssues.length > 0 ? `
                  <div class="issues">
                    <strong>Issues Found:</strong>
                    ${result.overflowIssues.map(issue => `
                      <div class="issue">• ${issue.type}: ${issue.selector}</div>
                    `).join('')}
                  </div>
                ` : `
                  <div class="no-issues">✓ No issues found</div>
                `}
              </div>
            `).join('')}
        </div>
        
        <h3>Public Website</h3>
        <div class="viewport-grid">
          ${results.filter(r => r.viewport === viewport.name && WEB_PAGES.some(p => p.name === r.page))
            .map(result => `
              <div class="page-card">
                <div class="page-header">${WEB_PAGES.find(p => p.name === result.page).title}</div>
                <div class="screenshot-container">
                  <img class="screenshot" src="${path.basename(result.screenshot)}" alt="${result.page}" />
                </div>
                ${result.error ? `
                  <div class="error">Error: ${result.error}</div>
                ` : result.overflowIssues && result.overflowIssues.length > 0 ? `
                  <div class="issues">
                    <strong>Issues Found:</strong>
                    ${result.overflowIssues.map(issue => `
                      <div class="issue">• ${issue.type}: ${issue.selector}</div>
                    `).join('')}
                  </div>
                ` : `
                  <div class="no-issues">✓ No issues found</div>
                `}
              </div>
            `).join('')}
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>
  `;
  
  await fs.writeFile(reportPath, html);
  console.log(`\n📄 QA Report generated: ${reportPath}`);
}

async function runQAAudit() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputDir = path.join(__dirname, '..', 'qa-audit', timestamp);
  await fs.mkdir(outputDir, { recursive: true });

  console.log(`\n🔍 Running QA Audit...`);
  console.log(`📁 Output directory: ${outputDir}\n`);

  const results = [];

  // Audit Admin Dashboard
  console.log('🏢 Auditing Admin Dashboard...');
  for (const viewport of VIEWPORTS) {
    for (const page of ADMIN_PAGES) {
      const url = `http://localhost:3000${page.path}`;
      const result = await capturePageAudit(browser, url, page, viewport, outputDir);
      results.push(result);
    }
  }

  // Audit Public Website
  console.log('\n🌐 Auditing Public Website...');
  for (const viewport of VIEWPORTS) {
    for (const page of WEB_PAGES) {
      const url = `http://localhost:3001${page.path}`;
      const result = await capturePageAudit(browser, url, page, viewport, outputDir);
      results.push(result);
    }
  }

  await browser.close();
  
  // Generate report
  await generateReport(results, outputDir);
  
  console.log('\n✅ QA Audit complete!');
  console.log(`📁 Results saved to: ${outputDir}`);
}

runQAAudit().catch(console.error);