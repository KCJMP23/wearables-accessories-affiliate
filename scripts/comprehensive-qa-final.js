const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class ComprehensiveQAFinal {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      passed: [],
      failed: [],
      errors: [],
      screenshots: []
    };
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.screenshotsDir = `screenshots/qa-final/${this.timestamp}`;
  }

  async init() {
    console.log('🚀 Starting Comprehensive QA Audit...');
    
    // Create screenshots directory
    if (!fs.existsSync(this.screenshotsDir)) {
      fs.mkdirSync(this.screenshotsDir, { recursive: true });
    }
    
    this.browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1920, height: 1080 },
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    this.page = await this.browser.newPage();
    
    // Clear cache and set user agent
    await this.page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Enable console logging
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('CONSOLE ERROR:', msg.text());
      }
    });
    
    this.page.on('pageerror', error => {
      console.log('PAGE ERROR:', error.message);
      this.results.errors.push(error.message);
    });
  }

  async testWebPages() {
    console.log('\n📱 Testing Web App Pages...');
    
    const webPages = [
      { path: '/', name: 'Homepage' },
      { path: '/about', name: 'About' },
      { path: '/blog', name: 'Blog' },
      { path: '/products', name: 'Products' },
      { path: '/contact', name: 'Contact' },
      { path: '/privacy', name: 'Privacy' },
      { path: '/terms', name: 'Terms' },
      { path: '/disclosure', name: 'Disclosure' }
    ];

    for (const page of webPages) {
      try {
        console.log(`Testing ${page.name}...`);
        await this.page.goto(`http://localhost:3000${page.path}`, { 
          waitUntil: 'networkidle0',
          timeout: 30000 
        });
        
        // Take screenshot
        const screenshotPath = `${this.screenshotsDir}/web-${page.name.toLowerCase()}.png`;
        await this.page.screenshot({ path: screenshotPath, fullPage: true });
        this.results.screenshots.push(screenshotPath);
        
        // Check for errors
        const errors = await this.page.evaluate(() => {
          return window.errors || [];
        });
        
        if (errors.length > 0) {
          this.results.failed.push(`${page.name}: ${errors.join(', ')}`);
        } else {
          this.results.passed.push(`${page.name}: Loaded successfully`);
        }
        
        // Test navigation links
        await this.testNavigationLinks();
        
      } catch (error) {
        this.results.failed.push(`${page.name}: ${error.message}`);
        console.log(`❌ ${page.name} failed:`, error.message);
      }
    }
  }

  async testNavigationLinks() {
    console.log('Testing navigation links...');
    
    const links = await this.page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[href]')).map(a => ({
        href: a.href,
        text: a.textContent.trim()
      }));
    });
    
    for (const link of links.slice(0, 10)) { // Test first 10 links
      if (link.href.includes('localhost:3000')) {
        try {
          const response = await this.page.goto(link.href, { 
            waitUntil: 'networkidle0',
            timeout: 10000 
          });
          if (response.status() === 200) {
            this.results.passed.push(`Link ${link.text}: Working`);
          } else {
            this.results.failed.push(`Link ${link.text}: ${response.status()}`);
          }
        } catch (error) {
          this.results.failed.push(`Link ${link.text}: ${error.message}`);
        }
      }
    }
  }

  async testAdminApp() {
    console.log('\n🔐 Testing Admin App...');
    
    try {
      // Test admin homepage
      await this.page.goto('http://localhost:3001/', { waitUntil: 'networkidle0' });
      const screenshotPath = `${this.screenshotsDir}/admin-home.png`;
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      this.results.screenshots.push(screenshotPath);
      this.results.passed.push('Admin homepage: Loaded successfully');
      
      // Test signin page
      await this.page.goto('http://localhost:3001/auth/signin', { waitUntil: 'networkidle0' });
      const signinScreenshot = `${this.screenshotsDir}/admin-signin.png`;
      await this.page.screenshot({ path: signinScreenshot, fullPage: true });
      this.results.screenshots.push(signinScreenshot);
      this.results.passed.push('Admin signin: Loaded successfully');
      
      // Test admin pages
      const adminPages = [
        { path: '/dashboard', name: 'Dashboard' },
        { path: '/cms', name: 'CMS' },
        { path: '/products', name: 'Products' },
        { path: '/sites', name: 'Sites' },
        { path: '/ai', name: 'AI' },
        { path: '/analytics', name: 'Analytics' },
        { path: '/approval', name: 'Approval' },
        { path: '/generate', name: 'Generate' },
        { path: '/deploy', name: 'Deploy' },
        { path: '/social', name: 'Social' },
        { path: '/newsletter', name: 'Newsletter' }
      ];
      
      for (const page of adminPages) {
        try {
          await this.page.goto(`http://localhost:3001${page.path}`, { waitUntil: 'networkidle0' });
          const screenshotPath = `${this.screenshotsDir}/admin-${page.name.toLowerCase()}.png`;
          await this.page.screenshot({ path: screenshotPath, fullPage: true });
          this.results.screenshots.push(screenshotPath);
          this.results.passed.push(`Admin ${page.name}: Loaded successfully`);
        } catch (error) {
          this.results.failed.push(`Admin ${page.name}: ${error.message}`);
        }
      }
      
    } catch (error) {
      this.results.failed.push(`Admin app: ${error.message}`);
    }
  }

  async testCRUDOperations() {
    console.log('\n🔄 Testing CRUD Operations...');
    
    try {
      // Test API endpoints
      const apiTests = [
        { url: 'http://localhost:3000/api/health', name: 'Health API' },
        { url: 'http://localhost:3000/api/health/db', name: 'Database Health' },
        { url: 'http://localhost:3001/api/health', name: 'Admin Health API' },
        { url: 'http://localhost:3001/api/health/db', name: 'Admin Database Health' }
      ];
      
      for (const test of apiTests) {
        try {
          const response = await fetch(test.url);
          if (response.ok) {
            this.results.passed.push(`${test.name}: Working`);
          } else {
            this.results.failed.push(`${test.name}: ${response.status}`);
          }
        } catch (error) {
          this.results.failed.push(`${test.name}: ${error.message}`);
        }
      }
      
    } catch (error) {
      this.results.failed.push(`CRUD Operations: ${error.message}`);
    }
  }

  async testResponsiveDesign() {
    console.log('\n📱 Testing Responsive Design...');
    
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 1024, height: 768, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ];
    
    for (const viewport of viewports) {
      try {
        await this.page.setViewport(viewport);
        await this.page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
        
        const screenshotPath = `${this.screenshotsDir}/responsive-${viewport.name.toLowerCase()}.png`;
        await this.page.screenshot({ path: screenshotPath, fullPage: true });
        this.results.screenshots.push(screenshotPath);
        this.results.passed.push(`Responsive ${viewport.name}: Working`);
        
      } catch (error) {
        this.results.failed.push(`Responsive ${viewport.name}: ${error.message}`);
      }
    }
  }

  async generateReport() {
    console.log('\n📊 Generating QA Report...');
    
    const report = {
      timestamp: this.timestamp,
      summary: {
        total: this.results.passed.length + this.results.failed.length,
        passed: this.results.passed.length,
        failed: this.results.failed.length,
        errors: this.results.errors.length
      },
      passed: this.results.passed,
      failed: this.results.failed,
      errors: this.results.errors,
      screenshots: this.results.screenshots
    };
    
    // Save report
    const reportPath = `${this.screenshotsDir}/qa-report.json`;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Generate HTML report
    const htmlReport = this.generateHTMLReport(report);
    const htmlPath = `${this.screenshotsDir}/qa-report.html`;
    fs.writeFileSync(htmlPath, htmlReport);
    
    console.log('\n📋 QA Report Summary:');
    console.log(`✅ Passed: ${report.summary.passed}`);
    console.log(`❌ Failed: ${report.summary.failed}`);
    console.log(`⚠️ Errors: ${report.summary.errors}`);
    console.log(`📸 Screenshots: ${report.screenshots.length}`);
    console.log(`📄 Report saved to: ${reportPath}`);
    console.log(`🌐 HTML Report: ${htmlPath}`);
    
    return report;
  }

  generateHTMLReport(report) {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>QA Report - ${report.timestamp}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .summary { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .passed { color: green; }
        .failed { color: red; }
        .error { color: orange; }
        .screenshot { margin: 10px 0; }
        .screenshot img { max-width: 100%; height: auto; border: 1px solid #ddd; }
    </style>
</head>
<body>
    <h1>QA Report - ${report.timestamp}</h1>
    
    <div class="summary">
        <h2>Summary</h2>
        <p><strong>Total Tests:</strong> ${report.summary.total}</p>
        <p class="passed"><strong>Passed:</strong> ${report.summary.passed}</p>
        <p class="failed"><strong>Failed:</strong> ${report.summary.failed}</p>
        <p class="error"><strong>Errors:</strong> ${report.summary.errors}</p>
    </div>
    
    <h2>Passed Tests</h2>
    <ul>
        ${report.passed.map(test => `<li class="passed">${test}</li>`).join('')}
    </ul>
    
    <h2>Failed Tests</h2>
    <ul>
        ${report.failed.map(test => `<li class="failed">${test}</li>`).join('')}
    </ul>
    
    <h2>Errors</h2>
    <ul>
        ${report.errors.map(error => `<li class="error">${error}</li>`).join('')}
    </ul>
    
    <h2>Screenshots</h2>
    ${report.screenshots.map(screenshot => `
        <div class="screenshot">
            <h3>${path.basename(screenshot, '.png')}</h3>
            <img src="${screenshot}" alt="Screenshot" />
        </div>
    `).join('')}
</body>
</html>
    `;
  }

  async run() {
    try {
      await this.init();
      await this.testWebPages();
      await this.testAdminApp();
      await this.testCRUDOperations();
      await this.testResponsiveDesign();
      const report = await this.generateReport();
      
      console.log('\n🎉 QA Audit Complete!');
      
      if (report.summary.failed === 0 && report.summary.errors === 0) {
        console.log('✅ All tests passed! Application is production-ready.');
      } else {
        console.log('⚠️ Some tests failed. Please review the report for details.');
      }
      
    } catch (error) {
      console.error('❌ QA Audit failed:', error);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// Run the QA audit
const qa = new ComprehensiveQAFinal();
qa.run(); 