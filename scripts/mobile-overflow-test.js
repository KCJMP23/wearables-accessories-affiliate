const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

async function testMobileOverflow() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const outputDir = path.join(__dirname, '..', 'mobile-test');
  await fs.mkdir(outputDir, { recursive: true });

  console.log('🔍 Testing mobile overflow issues...\n');

  // Test viewports
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 }
  ];

  const results = [];

  for (const viewport of viewports) {
    console.log(`\n${viewport.name} (${viewport.width}x${viewport.height}):`);
    
    await page.setViewport({ width: viewport.width, height: viewport.height });
    
    // Test admin sites page
    await page.goto('http://localhost:3000/sites', { waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot
    await page.screenshot({ 
      path: path.join(outputDir, `admin-sites-${viewport.name}.png`), 
      fullPage: true 
    });
    
    // Check for issues
    const issues = await page.evaluate(() => {
      const problems = [];
      
      // Check horizontal scroll
      if (document.documentElement.scrollWidth > window.innerWidth) {
        problems.push({
          type: 'horizontal-scroll',
          details: `Page width: ${document.documentElement.scrollWidth}px > Viewport: ${window.innerWidth}px`
        });
      }
      
      // Check if any elements overflow
      const allElements = document.querySelectorAll('*');
      let overflowCount = 0;
      
      allElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > window.innerWidth && rect.width > 10) {
          overflowCount++;
          if (overflowCount <= 3) { // Only report first 3
            problems.push({
              type: 'element-overflow',
              selector: el.className || el.tagName,
              details: `Extends ${Math.round(rect.right - window.innerWidth)}px beyond viewport`
            });
          }
        }
      });
      
      if (overflowCount > 3) {
        problems.push({
          type: 'summary',
          details: `...and ${overflowCount - 3} more overflow issues`
        });
      }
      
      return problems;
    });
    
    if (issues.length === 0) {
      console.log('  ✅ No overflow issues found!');
    } else {
      issues.forEach(issue => {
        console.log(`  ❌ ${issue.type}: ${issue.details}`);
      });
    }
    
    results.push({ viewport: viewport.name, issues });
  }

  await browser.close();
  
  // Summary
  console.log('\n📊 Summary:');
  const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
  if (totalIssues === 0) {
    console.log('✅ All responsive issues fixed! No overflow detected on mobile or tablet.');
  } else {
    console.log(`❌ Found ${totalIssues} total issues across viewports.`);
  }
  
  console.log(`\n📁 Screenshots saved to: ${outputDir}`);
}

testMobileOverflow().catch(console.error);