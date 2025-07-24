const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// Web pages to test
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
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
];

async function testWebPage(browser, page, viewport, outputDir) {
  const browserPage = await browser.newPage();
  
  try {
    await browserPage.setViewport({ width: viewport.width, height: viewport.height });
    console.log(`  📸 ${viewport.name}: ${page.title}`);
    
    const url = `http://localhost:3001${page.path}`;
    await browserPage.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot
    const screenshotPath = path.join(outputDir, `${page.name}-${viewport.name}.png`);
    await browserPage.screenshot({ path: screenshotPath, fullPage: true });
    
    // Check for issues
    const analysis = await browserPage.evaluate(() => {
      const issues = [];
      
      // Check horizontal scroll
      if (document.documentElement.scrollWidth > window.innerWidth) {
        issues.push({
          type: 'horizontal-scroll',
          details: `Page width: ${document.documentElement.scrollWidth}px > Viewport: ${window.innerWidth}px`
        });
      }
      
      // Check sidebar accommodation
      const sidebar = document.querySelector('aside, [class*="sidebar"], nav[class*="sidebar"]');
      const mainContent = document.querySelector('main, [class*="main-content"], [class*="content-area"]');
      
      if (sidebar && mainContent) {
        const sidebarRect = sidebar.getBoundingClientRect();
        const mainRect = mainContent.getBoundingClientRect();
        
        // Check if content properly accommodates sidebar
        if (window.innerWidth >= 768 && mainRect.left < sidebarRect.right) {
          issues.push({
            type: 'sidebar-overlap',
            details: `Content overlaps sidebar by ${sidebarRect.right - mainRect.left}px`
          });
        }
      }
      
      // Check for overflow elements
      const elements = document.querySelectorAll('*');
      let overflowCount = 0;
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > window.innerWidth && rect.width > 10) {
          overflowCount++;
          if (overflowCount <= 3) {
            issues.push({
              type: 'element-overflow',
              element: el.className || el.tagName,
              details: `Extends ${Math.round(rect.right - window.innerWidth)}px beyond viewport`
            });
          }
        }
      });
      
      if (overflowCount > 3) {
        issues.push({
          type: 'overflow-summary',
          details: `${overflowCount - 3} more elements overflow`
        });
      }
      
      // Check text readability
      const textElements = document.querySelectorAll('p, span, a, h1, h2, h3, h4, h5, h6');
      let unreadableCount = 0;
      
      textElements.forEach(el => {
        const styles = window.getComputedStyle(el);
        const fontSize = parseFloat(styles.fontSize);
        
        if (fontSize < 12 && el.textContent.trim().length > 0) {
          unreadableCount++;
        }
      });
      
      if (unreadableCount > 0) {
        issues.push({
          type: 'text-readability',
          details: `${unreadableCount} text elements may be too small (< 12px)`
        });
      }
      
      return {
        hasSidebar: !!sidebar,
        hasMainContent: !!mainContent,
        issues
      };
    });
    
    return {
      page: page.name,
      viewport: viewport.name,
      url,
      ...analysis,
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
  const timestamp = new Date().toISOString();
  const totalIssues = results.reduce((sum, r) => sum + (r.issues?.length || 0), 0);
  
  // Generate JSON report
  const jsonReport = {
    timestamp,
    totalIssues,
    summary: {
      pagesWithSidebar: results.filter(r => r.hasSidebar).length,
      pagesWithIssues: results.filter(r => r.issues && r.issues.length > 0).length,
      totalTests: results.length
    },
    results
  };
  
  await fs.writeFile(
    path.join(outputDir, 'web-qa-report.json'),
    JSON.stringify(jsonReport, null, 2)
  );
  
  // Generate summary
  console.log('\n📊 QA Summary:');
  console.log(`Total issues found: ${totalIssues}`);
  console.log(`Pages with sidebar: ${jsonReport.summary.pagesWithSidebar}/${WEB_PAGES.length}`);
  console.log(`Pages with issues: ${jsonReport.summary.pagesWithIssues}/${results.length}`);
  
  // Group issues by type
  const issuesByType = {};
  results.forEach(r => {
    if (r.issues) {
      r.issues.forEach(issue => {
        issuesByType[issue.type] = (issuesByType[issue.type] || 0) + 1;
      });
    }
  });
  
  if (Object.keys(issuesByType).length > 0) {
    console.log('\nIssues by type:');
    Object.entries(issuesByType).forEach(([type, count]) => {
      console.log(`  - ${type}: ${count}`);
    });
  }
  
  // List pages with issues
  const pagesWithIssues = [...new Set(results.filter(r => r.issues && r.issues.length > 0).map(r => r.page))];
  if (pagesWithIssues.length > 0) {
    console.log('\nPages with issues:');
    pagesWithIssues.forEach(page => {
      console.log(`  - ${page}`);
    });
  }
}

async function runWebQA() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputDir = path.join(__dirname, '..', 'web-qa-audit', timestamp);
  await fs.mkdir(outputDir, { recursive: true });

  console.log(`\n🔍 Running Web QA Audit...`);
  console.log(`📁 Output: ${outputDir}\n`);

  const results = [];

  // Test all pages across all viewports
  for (const viewport of VIEWPORTS) {
    console.log(`\n📱 Testing ${viewport.name} (${viewport.width}x${viewport.height}):`);
    
    for (const page of WEB_PAGES) {
      const result = await testWebPage(browser, page, viewport, outputDir);
      results.push(result);
    }
  }

  await browser.close();
  
  await generateReport(results, outputDir);
  
  console.log(`\n✅ Web QA Audit complete!`);
  console.log(`📁 Results saved to: ${outputDir}`);
  
  // Return summary for programmatic use
  const totalIssues = results.reduce((sum, r) => sum + (r.issues?.length || 0), 0);
  return {
    success: totalIssues === 0,
    totalIssues,
    outputDir
  };
}

// Run if called directly
if (require.main === module) {
  runWebQA().catch(console.error);
}

module.exports = { runWebQA };