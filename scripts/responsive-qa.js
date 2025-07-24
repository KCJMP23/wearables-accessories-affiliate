const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// Key pages to test
const ADMIN_PAGES = [
  { name: 'sites', path: '/sites', title: 'Sites Management' },
  { name: 'dashboard', path: '/', title: 'Dashboard' },
  { name: 'products', path: '/products', title: 'Products' },
];

const WEB_PAGES = [
  { name: 'home', path: '/', title: 'Home' },
  { name: 'products', path: '/products', title: 'Products' },
  { name: 'blog', path: '/blog', title: 'Blog' },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
];

async function captureAndAnalyze(page, url, pageName, viewport, outputDir) {
  try {
    console.log(`  📸 ${viewport.name}: ${pageName}`);
    
    await page.setViewport({ width: viewport.width, height: viewport.height });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(1000);
    
    // Take screenshot
    const screenshotPath = path.join(outputDir, `${pageName}-${viewport.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    
    // Analyze for overflow
    const analysis = await page.evaluate(() => {
      const issues = [];
      
      // Check viewport overflow
      if (document.documentElement.scrollWidth > window.innerWidth) {
        issues.push({
          type: 'horizontal-scroll',
          details: `Page has horizontal scroll (${document.documentElement.scrollWidth}px > ${window.innerWidth}px)`
        });
      }
      
      // Check specific elements
      const cards = document.querySelectorAll('[class*="card"], [class*="Card"]');
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
          issues.push({
            type: 'card-overflow',
            selector: `.card-${i}`,
            details: `Card extends beyond viewport by ${rect.right - window.innerWidth}px`
          });
        }
      });
      
      // Check sidebar
      const sidebar = document.querySelector('[class*="sidebar"], nav, aside');
      if (sidebar) {
        const sidebarRect = sidebar.getBoundingClientRect();
        const mainContent = document.querySelector('main, [class*="main"], [class*="content"]');
        if (mainContent) {
          const contentRect = mainContent.getBoundingClientRect();
          if (contentRect.left < sidebarRect.right) {
            issues.push({
              type: 'sidebar-overlap',
              details: `Content overlaps sidebar by ${sidebarRect.right - contentRect.left}px`
            });
          }
        }
      }
      
      return issues;
    });
    
    return { 
      page: pageName, 
      viewport: viewport.name, 
      issues: analysis,
      screenshot: screenshotPath 
    };
    
  } catch (error) {
    console.error(`    ❌ Error: ${error.message}`);
    return { 
      page: pageName, 
      viewport: viewport.name, 
      error: error.message 
    };
  }
}

async function generateReport(results, outputDir) {
  const report = {
    timestamp: new Date().toISOString(),
    totalIssues: results.reduce((acc, r) => acc + (r.issues?.length || 0), 0),
    results: results
  };
  
  // Generate JSON report
  await fs.writeFile(
    path.join(outputDir, 'report.json'), 
    JSON.stringify(report, null, 2)
  );
  
  // Generate summary
  console.log('\n📊 QA Summary:');
  console.log(`Total issues found: ${report.totalIssues}`);
  
  const issuesByType = {};
  results.forEach(r => {
    if (r.issues) {
      r.issues.forEach(issue => {
        issuesByType[issue.type] = (issuesByType[issue.type] || 0) + 1;
      });
    }
  });
  
  console.log('\nIssues by type:');
  Object.entries(issuesByType).forEach(([type, count]) => {
    console.log(`  - ${type}: ${count}`);
  });
  
  console.log('\nDetailed issues:');
  results.forEach(r => {
    if (r.issues && r.issues.length > 0) {
      console.log(`\n${r.page} (${r.viewport}):`);
      r.issues.forEach(issue => {
        console.log(`  - ${issue.type}: ${issue.details}`);
      });
    }
  });
}

async function runResponsiveQA() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputDir = path.join(__dirname, '..', 'qa-responsive', timestamp);
  await fs.mkdir(outputDir, { recursive: true });

  console.log(`\n🔍 Running Responsive QA...`);
  console.log(`📁 Output: ${outputDir}\n`);

  const results = [];
  const page = await browser.newPage();

  // Test Admin Dashboard
  console.log('🏢 Testing Admin Dashboard...');
  for (const viewport of VIEWPORTS) {
    for (const adminPage of ADMIN_PAGES) {
      const url = `http://localhost:3000${adminPage.path}`;
      const result = await captureAndAnalyze(page, url, `admin-${adminPage.name}`, viewport, outputDir);
      results.push(result);
    }
  }

  // Test Public Website  
  console.log('\n🌐 Testing Public Website...');
  for (const viewport of VIEWPORTS) {
    for (const webPage of WEB_PAGES) {
      const url = `http://localhost:3001${webPage.path}`;
      const result = await captureAndAnalyze(page, url, `web-${webPage.name}`, viewport, outputDir);
      results.push(result);
    }
  }

  await browser.close();
  
  await generateReport(results, outputDir);
  
  console.log(`\n✅ QA Complete! Results in: ${outputDir}`);
}

runResponsiveQA().catch(console.error);