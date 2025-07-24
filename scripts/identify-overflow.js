const puppeteer = require('puppeteer');

async function identifyOverflow() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Test tablet viewport
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto('http://localhost:3000/sites', { waitUntil: 'networkidle0' });
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Identify the specific element causing overflow
  const overflowElement = await page.evaluate(() => {
    const allElements = document.querySelectorAll('*');
    let maxOverflow = 0;
    let culprit = null;
    
    allElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const overflow = rect.right - window.innerWidth;
      
      if (overflow > maxOverflow && rect.width > 10) {
        maxOverflow = overflow;
        culprit = {
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          text: el.textContent?.substring(0, 50),
          overflow: Math.round(overflow),
          rect: {
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width)
          },
          computedStyle: {
            display: window.getComputedStyle(el).display,
            position: window.getComputedStyle(el).position,
            margin: window.getComputedStyle(el).margin,
            padding: window.getComputedStyle(el).padding,
            width: window.getComputedStyle(el).width
          }
        };
      }
    });
    
    return culprit;
  });
  
  console.log('🔍 Overflow Analysis for Tablet (768px):');
  if (overflowElement) {
    console.log('\n❌ Found overflow element:');
    console.log(`  Tag: ${overflowElement.tagName}`);
    console.log(`  Class: ${overflowElement.className || '(none)'}`);
    console.log(`  ID: ${overflowElement.id || '(none)'}`);
    console.log(`  Text: ${overflowElement.text}`);
    console.log(`  Overflow: ${overflowElement.overflow}px`);
    console.log(`  Position: left=${overflowElement.rect.left}, right=${overflowElement.rect.right}, width=${overflowElement.rect.width}`);
    console.log(`  Styles:`, overflowElement.computedStyle);
  } else {
    console.log('✅ No overflow found!');
  }
  
  await browser.close();
}

identifyOverflow().catch(console.error);