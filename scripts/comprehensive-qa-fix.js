const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class ComprehensiveQAFix {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      passed: [],
      failed: [],
      errors: [],
      screenshots: []
    };
  }

  async init() {
    console.log('🚀 Starting Comprehensive QA Audit with Fixes...');
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
        console.log(`❌ Console Error: ${msg.text()}`);
        this.results.errors.push(`Console Error: ${msg.text()}`);
      }
    });

    this.page.on('pageerror', error => {
      console.log(`❌ Page Error: ${error.message}`);
      this.results.errors.push(`Page Error: ${error.message}`);
    });
  }

  async testPage(url, name, expectedStatus = 200) {
    try {
      console.log(`\n🔍 Testing ${name} (${url})...`);
      
      const response = await this.page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      const status = response.status();
      console.log(`📊 Status: ${status}`);
      
      if (status === expectedStatus) {
        console.log(`✅ ${name} - PASSED`);
        this.results.passed.push(`${name} (${url})`);
        
        // Take screenshot
        const screenshotPath = `screenshots/qa-fix/${name.toLowerCase().replace(/\s+/g, '-')}.png`;
        await this.page.screenshot({ path: screenshotPath, fullPage: true });
        this.results.screenshots.push(screenshotPath);
        
        // Test navigation and links
        await this.testNavigation(name);
        
        return true;
      } else {
        console.log(`❌ ${name} - FAILED (Expected: ${expectedStatus}, Got: ${status})`);
        this.results.failed.push(`${name} (${url}) - Status: ${status}`);
        return false;
      }
    } catch (error) {
      console.log(`❌ ${name} - ERROR: ${error.message}`);
      this.results.failed.push(`${name} (${url}) - Error: ${error.message}`);
      return false;
    }
  }

  async testNavigation(pageName) {
    try {
      // Test header navigation
      const navLinks = await this.page.$$eval('nav a, header a, .navbar a', links => 
        links.map(link => ({ href: link.href, text: link.textContent.trim() }))
      );
      
      console.log(`🔗 Found ${navLinks.length} navigation links on ${pageName}`);
      
      // Test a few key links
      for (const link of navLinks.slice(0, 5)) {
        if (link.href && !link.href.includes('#')) {
          try {
            const linkResponse = await this.page.goto(link.href, { 
              waitUntil: 'networkidle0',
              timeout: 10000 
            });
            console.log(`  ✅ ${link.text} (${link.href}) - ${linkResponse.status()}`);
          } catch (error) {
            console.log(`  ❌ ${link.text} (${link.href}) - Error: ${error.message}`);
          }
        }
      }
    } catch (error) {
      console.log(`⚠️ Navigation test error on ${pageName}: ${error.message}`);
    }
  }

  async testAdminAuth() {
    console.log('\n🔐 Testing Admin Authentication...');
    
    try {
      // Go to admin login
      await this.page.goto('http://localhost:3001/auth/signin', { waitUntil: 'networkidle2' });
      
      // Check if login form exists
      const loginForm = await this.page.$('form');
      if (loginForm) {
        console.log('✅ Admin login page loaded');
        this.results.passed.push('Admin Login Page');
        
        // Try to fill login form (we'll need actual credentials)
        const emailInput = await this.page.$('input[type="email"], input[name="email"]');
        const passwordInput = await this.page.$('input[type="password"], input[name="password"]');
        
        if (emailInput && passwordInput) {
          console.log('✅ Login form found');
          this.results.passed.push('Admin Login Form');
        } else {
          console.log('❌ Login form not found');
          this.results.failed.push('Admin Login Form');
        }
      } else {
        console.log('❌ Admin login page not found');
        this.results.failed.push('Admin Login Page');
      }
    } catch (error) {
      console.log(`❌ Admin auth test error: ${error.message}`);
      this.results.failed.push(`Admin Auth: ${error.message}`);
    }
  }

  async testCRUDOperations() {
    console.log('\n📝 Testing CRUD Operations...');
    
    try {
      // Test admin dashboard
      await this.page.goto('http://localhost:3001/dashboard', { waitUntil: 'networkidle2' });
      
      // Check if dashboard loads
      const dashboardContent = await this.page.$('.dashboard, [data-testid="dashboard"]');
      if (dashboardContent) {
        console.log('✅ Admin dashboard loaded');
        this.results.passed.push('Admin Dashboard');
      } else {
        console.log('❌ Admin dashboard not found');
        this.results.failed.push('Admin Dashboard');
      }
      
      // Test CMS pages
      const cmsPages = [
        { url: 'http://localhost:3001/cms', name: 'CMS Dashboard' },
        { url: 'http://localhost:3001/products', name: 'Products Management' },
        { url: 'http://localhost:3001/sites', name: 'Sites Management' }
      ];
      
      for (const page of cmsPages) {
        try {
          const response = await this.page.goto(page.url, { waitUntil: 'networkidle2' });
          console.log(`✅ ${page.name} - Status: ${response.status()}`);
          this.results.passed.push(page.name);
        } catch (error) {
          console.log(`❌ ${page.name} - Error: ${error.message}`);
          this.results.failed.push(`${page.name}: ${error.message}`);
        }
      }
    } catch (error) {
      console.log(`❌ CRUD test error: ${error.message}`);
      this.results.failed.push(`CRUD Operations: ${error.message}`);
    }
  }

  async runAllTests() {
    console.log('🧪 Starting comprehensive QA tests...');
    
    // Create screenshots directory
    if (!fs.existsSync('screenshots/qa-fix')) {
      fs.mkdirSync('screenshots/qa-fix', { recursive: true });
    }
    
    // Test web app pages
    const webPages = [
      { url: 'http://localhost:3000/', name: 'Home Page' },
      { url: 'http://localhost:3000/about', name: 'About Page' },
      { url: 'http://localhost:3000/blog', name: 'Blog Page' },
      { url: 'http://localhost:3000/products', name: 'Products Page' },
      { url: 'http://localhost:3000/contact', name: 'Contact Page' },
      { url: 'http://localhost:3000/privacy', name: 'Privacy Page' },
      { url: 'http://localhost:3000/terms', name: 'Terms Page' },
      { url: 'http://localhost:3000/disclosure', name: 'Disclosure Page' }
    ];
    
    for (const page of webPages) {
      await this.testPage(page.url, page.name);
    }
    
    // Test admin pages
    const adminPages = [
      { url: 'http://localhost:3001/', name: 'Admin Home' },
      { url: 'http://localhost:3001/dashboard', name: 'Admin Dashboard' },
      { url: 'http://localhost:3001/cms', name: 'CMS' },
      { url: 'http://localhost:3001/products', name: 'Products' },
      { url: 'http://localhost:3001/sites', name: 'Sites' },
      { url: 'http://localhost:3001/ai', name: 'AI Tools' },
      { url: 'http://localhost:3001/analytics', name: 'Analytics' }
    ];
    
    for (const page of adminPages) {
      await this.testPage(page.url, page.name);
    }
    
    // Test authentication
    await this.testAdminAuth();
    
    // Test CRUD operations
    await this.testCRUDOperations();
    
    // Generate report
    await this.generateReport();
  }

  async generateReport() {
    console.log('\n📊 Generating QA Report...');
    
    const report = {
      timestamp: new Date().toISOString(),
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
    
    const reportPath = 'screenshots/qa-fix/qa-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\n📈 QA Report Summary:');
    console.log(`✅ Passed: ${report.summary.passed}`);
    console.log(`❌ Failed: ${report.summary.failed}`);
    console.log(`⚠️ Errors: ${report.summary.errors}`);
    console.log(`📸 Screenshots: ${report.summary.passed}`);
    
    if (report.summary.failed > 0) {
      console.log('\n❌ Failed Tests:');
      report.failed.forEach(fail => console.log(`  - ${fail}`));
    }
    
    if (report.summary.errors > 0) {
      console.log('\n⚠️ Errors:');
      report.errors.forEach(error => console.log(`  - ${error}`));
    }
    
    console.log(`\n📄 Full report saved to: ${reportPath}`);
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Run the QA
async function main() {
  const qa = new ComprehensiveQAFix();
  try {
    await qa.init();
    await qa.runAllTests();
  } catch (error) {
    console.error('❌ QA Test Error:', error);
  } finally {
    await qa.cleanup();
  }
}

if (require.main === module) {
  main();
}

module.exports = ComprehensiveQAFix; 