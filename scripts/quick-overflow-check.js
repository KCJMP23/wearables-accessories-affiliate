const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

async function checkOverflow() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const outputDir = path.join(__dirname, '..', 'overflow-check');
  await fs.mkdir(outputDir, { recursive: true });

  console.log('🔍 Checking for overflow issues...\n');

  // Check admin sites page (from screenshot)
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:3000/sites', { waitUntil: 'networkidle0', timeout: 30000 });
  
  await page.screenshot({ 
    path: path.join(outputDir, 'admin-sites-current.png'), 
    fullPage: true 
  });

  const adminSitesIssues = await page.evaluate(() => {
    const issues = [];
    
    // Check if page has horizontal scroll
    if (document.documentElement.scrollWidth > window.innerWidth) {
      issues.push({
        type: 'horizontal-scroll',
        element: 'body',
        details: `Page width: ${document.documentElement.scrollWidth}px, Viewport: ${window.innerWidth}px`
      });
    }
    
    // Check site cards
    const cards = document.querySelectorAll('[class*="card"], [class*="Card"], [class*="rounded-lg"]');
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const computed = window.getComputedStyle(card);
      
      // Check if card extends beyond viewport
      if (rect.right > window.innerWidth) {
        issues.push({
          type: 'card-overflow',
          element: card.className,
          details: `Card ${i} extends ${rect.right - window.innerWidth}px beyond viewport`
        });
      }
      
      // Check text overflow
      const hasTextOverflow = card.scrollWidth > card.clientWidth;
      if (hasTextOverflow && computed.overflow !== 'hidden') {
        issues.push({
          type: 'text-overflow',
          element: card.className,
          details: `Card ${i} has text overflow`
        });
      }
    });
    
    // Check grid/flex containers
    const containers = document.querySelectorAll('[class*="grid"], [class*="flex"]');
    containers.forEach((container, i) => {
      const rect = container.getBoundingClientRect();
      if (rect.width > window.innerWidth) {
        issues.push({
          type: 'container-overflow',
          element: container.className,
          details: `Container ${i} width: ${rect.width}px exceeds viewport`
        });
      }
    });
    
    // Check sidebar
    const sidebar = document.querySelector('aside, [class*="sidebar"], nav');
    const main = document.querySelector('main, [class*="main"]');
    if (sidebar && main) {
      const sidebarRect = sidebar.getBoundingClientRect();
      const mainRect = main.getBoundingClientRect();
      if (mainRect.left < sidebarRect.right) {
        issues.push({
          type: 'sidebar-overlap',
          element: 'main-content',
          details: `Main content overlaps sidebar by ${sidebarRect.right - mainRect.left}px`
        });
      }
    }
    
    return issues;
  });

  console.log('Admin Sites Page Issues:');
  if (adminSitesIssues.length === 0) {
    console.log('  ✅ No overflow issues found');
  } else {
    adminSitesIssues.forEach(issue => {
      console.log(`  ❌ ${issue.type}: ${issue.details}`);
    });
  }

  // Check other viewports
  const viewports = [
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 667 }
  ];

  for (const viewport of viewports) {
    console.log(`\n${viewport.name} (${viewport.width}x${viewport.height}):`);
    
    await page.setViewport({ width: viewport.width, height: viewport.height });
    await page.reload({ waitUntil: 'networkidle0' });
    
    await page.screenshot({ 
      path: path.join(outputDir, `admin-sites-${viewport.name}.png`), 
      fullPage: true 
    });
    
    const mobileIssues = await page.evaluate(() => {
      const issues = [];
      
      if (document.documentElement.scrollWidth > window.innerWidth) {
        issues.push(`Horizontal scroll: ${document.documentElement.scrollWidth - window.innerWidth}px`);
      }
      
      const cards = document.querySelectorAll('[class*="card"], [class*="Card"]');
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
          issues.push(`Card ${i} overflow: ${rect.right - window.innerWidth}px`);
        }
      });
      
      return issues;
    });
    
    if (mobileIssues.length === 0) {
      console.log('  ✅ No issues');
    } else {
      mobileIssues.forEach(issue => {
        console.log(`  ❌ ${issue}`);
      });
    }
  }

  await browser.close();
  console.log(`\n📁 Screenshots saved to: ${outputDir}`);
}

checkOverflow().catch(console.error);