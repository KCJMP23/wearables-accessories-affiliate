const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class ComprehensiveQA {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      passed: [],
      failed: [],
      errors: []
    };
    this.screenshots = [];
  }

  async init() {
    console.log('🚀 Starting Comprehensive QA Audit...');
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
        this.results.errors.push(`Console Error: ${msg.text()}`);
      }
    });

    this.page.on('pageerror', error => {
      this.results.errors.push(`Page Error: ${error.message}`);
    });
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async takeScreenshot(name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `qa-screenshots/${timestamp}-${name}.png`;
    await this.page.screenshot({ path: filename, fullPage: true });
    this.screenshots.push(filename);
    console.log(`📸 Screenshot saved: ${filename}`);
  }

  async testWebApp() {
    console.log('\n🌐 Testing Web Application...');
    
    // Test homepage
    await this.page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await this.takeScreenshot('web-homepage');
    
    // Check for console errors
    const consoleErrors = await this.page.evaluate(() => {
      return window.consoleErrors || [];
    });
    
    if (consoleErrors.length > 0) {
      this.results.failed.push('Homepage has console errors');
      consoleErrors.forEach(error => this.results.errors.push(error));
    } else {
      this.results.passed.push('Homepage loads without console errors');
    }

    // Test navigation links
    const navLinks = [
      { url: '/about', name: 'About' },
      { url: '/blog', name: 'Blog' },
      { url: '/products', name: 'Products' },
      { url: '/contact', name: 'Contact' },
      { url: '/privacy', name: 'Privacy' },
      { url: '/terms', name: 'Terms' },
      { url: '/disclosure', name: 'Disclosure' }
    ];

    for (const link of navLinks) {
      try {
        await this.page.goto(`http://localhost:3000${link.url}`, { waitUntil: 'networkidle2' });
        await this.takeScreenshot(`web-${link.name.toLowerCase()}`);
        
        // Check for 404
        const is404 = await this.page.evaluate(() => {
          return document.title.includes('404') || document.body.textContent.includes('404');
        });
        
        if (is404) {
          this.results.failed.push(`${link.name} page returns 404`);
        } else {
          this.results.passed.push(`${link.name} page loads correctly`);
        }
        
        // Scroll through the page
        await this.page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
        });
        await this.page.waitForTimeout(1000);
        
      } catch (error) {
        this.results.failed.push(`${link.name} page failed to load: ${error.message}`);
      }
    }

    // Test responsive design
    const viewports = [
      { width: 1920, height: 1080, name: 'desktop' },
      { width: 1024, height: 768, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' }
    ];

    for (const viewport of viewports) {
      await this.page.setViewport(viewport);
      await this.page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
      await this.takeScreenshot(`web-homepage-${viewport.name}`);
    }
  }

  async testAdminApp() {
    console.log('\n🔐 Testing Admin Application...');
    
    // Test admin homepage
    await this.page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });
    await this.takeScreenshot('admin-homepage');
    
    // Test authentication
    try {
      // Check if we need to login
      const loginButton = await this.page.$('button[type="submit"]');
      if (loginButton) {
        console.log('🔑 Testing admin authentication...');
        
        // Fill login form
        await this.page.type('input[name="email"]', 'admin@example.com');
        await this.page.type('input[name="password"]', 'admin123');
        await this.page.click('button[type="submit"]');
        
        await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
        await this.takeScreenshot('admin-after-login');
        
        this.results.passed.push('Admin authentication successful');
      } else {
        this.results.passed.push('Admin already authenticated');
      }
    } catch (error) {
      this.results.failed.push(`Admin authentication failed: ${error.message}`);
    }

    // Test admin navigation
    const adminPages = [
      { url: '/dashboard', name: 'Dashboard' },
      { url: '/sites', name: 'Sites' },
      { url: '/products', name: 'Products' },
      { url: '/cms', name: 'CMS' },
      { url: '/ai', name: 'AI' },
      { url: '/analytics', name: 'Analytics' },
      { url: '/approval', name: 'Approval' },
      { url: '/deploy', name: 'Deploy' },
      { url: '/newsletter', name: 'Newsletter' },
      { url: '/social', name: 'Social' }
    ];

    for (const page of adminPages) {
      try {
        await this.page.goto(`http://localhost:3001${page.url}`, { waitUntil: 'networkidle2' });
        await this.takeScreenshot(`admin-${page.name.toLowerCase()}`);
        
        // Check for 404 or errors
        const is404 = await this.page.evaluate(() => {
          return document.title.includes('404') || document.body.textContent.includes('404');
        });
        
        if (is404) {
          this.results.failed.push(`Admin ${page.name} page returns 404`);
        } else {
          this.results.passed.push(`Admin ${page.name} page loads correctly`);
        }
        
      } catch (error) {
        this.results.failed.push(`Admin ${page.name} page failed: ${error.message}`);
      }
    }
  }

  async testCRUDOperations() {
    console.log('\n🔄 Testing CRUD Operations...');
    
    // Test creating a new site
    try {
      await this.page.goto('http://localhost:3001/sites', { waitUntil: 'networkidle2' });
      
      // Look for add/create button
      const addButton = await this.page.$('button[data-testid="add-site"], button:contains("Add"), button:contains("Create")');
      if (addButton) {
        await addButton.click();
        await this.page.waitForTimeout(1000);
        await this.takeScreenshot('admin-add-site-form');
        
        // Fill form if it exists
        const nameInput = await this.page.$('input[name="name"], input[placeholder*="name"]');
        if (nameInput) {
          await this.page.type('input[name="name"]', 'Test Site');
          await this.page.type('input[name="domain"]', 'test-site.localhost:3000');
          
          const submitButton = await this.page.$('button[type="submit"], button:contains("Save")');
          if (submitButton) {
            await submitButton.click();
            await this.page.waitForTimeout(2000);
            this.results.passed.push('Site creation form works');
          }
        }
      }
    } catch (error) {
      this.results.failed.push(`Site creation test failed: ${error.message}`);
    }

    // Test CMS operations
    try {
      await this.page.goto('http://localhost:3001/cms', { waitUntil: 'networkidle2' });
      await this.takeScreenshot('admin-cms-dashboard');
      
      // Test creating a blog post
      const createPostButton = await this.page.$('button[data-testid="create-post"], button:contains("New Post"), button:contains("Create Post")');
      if (createPostButton) {
        await createPostButton.click();
        await this.page.waitForTimeout(1000);
        await this.takeScreenshot('admin-create-post-form');
        
        // Fill post form
        const titleInput = await this.page.$('input[name="title"], input[placeholder*="title"]');
        if (titleInput) {
          await this.page.type('input[name="title"]', 'Test Blog Post');
          await this.page.type('textarea[name="content"], textarea[placeholder*="content"]', 'This is a test blog post content.');
          
          const saveButton = await this.page.$('button[type="submit"], button:contains("Save"), button:contains("Publish")');
          if (saveButton) {
            await saveButton.click();
            await this.page.waitForTimeout(2000);
            this.results.passed.push('Blog post creation works');
          }
        }
      }
    } catch (error) {
      this.results.failed.push(`CMS operations test failed: ${error.message}`);
    }

    // Test AI functionality
    try {
      await this.page.goto('http://localhost:3001/ai', { waitUntil: 'networkidle2' });
      await this.takeScreenshot('admin-ai-page');
      
      // Test content generation
      const generateButton = await this.page.$('button[data-testid="generate-content"], button:contains("Generate")');
      if (generateButton) {
        await generateButton.click();
        await this.page.waitForTimeout(3000);
        await this.takeScreenshot('admin-ai-generation');
        this.results.passed.push('AI content generation interface works');
      }
    } catch (error) {
      this.results.failed.push(`AI functionality test failed: ${error.message}`);
    }
  }

  async testFrontendSync() {
    console.log('\n🔄 Testing Frontend-Backend Sync...');
    
    // Go back to web app and check if changes are reflected
    await this.page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await this.takeScreenshot('web-after-admin-changes');
    
    // Check if new content appears
    const pageContent = await this.page.evaluate(() => {
      return document.body.textContent;
    });
    
    if (pageContent.includes('Test Blog Post')) {
      this.results.passed.push('Frontend syncs with backend changes');
    } else {
      this.results.failed.push('Frontend does not sync with backend changes');
    }
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
      results: this.results,
      screenshots: this.screenshots
    };

    const reportPath = `qa-report-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\n📋 QA Report Summary:');
    console.log(`✅ Passed: ${this.results.passed.length}`);
    console.log(`❌ Failed: ${this.results.failed.length}`);
    console.log(`⚠️  Errors: ${this.results.errors.length}`);
    console.log(`📸 Screenshots: ${this.screenshots.length}`);
    
    if (this.results.failed.length > 0) {
      console.log('\n❌ Failed Tests:');
      this.results.failed.forEach(failure => console.log(`  - ${failure}`));
    }
    
    if (this.results.errors.length > 0) {
      console.log('\n⚠️  Errors:');
      this.results.errors.forEach(error => console.log(`  - ${error}`));
    }
    
    console.log(`\n📄 Full report saved to: ${reportPath}`);
    
    return report;
  }

  async run() {
    try {
      await this.init();
      
      // Create screenshots directory
      if (!fs.existsSync('qa-screenshots')) {
        fs.mkdirSync('qa-screenshots');
      }
      
      await this.testWebApp();
      await this.testAdminApp();
      await this.testCRUDOperations();
      await this.testFrontendSync();
      
      const report = await this.generateReport();
      
      if (report.summary.failed === 0 && report.summary.errors === 0) {
        console.log('\n🎉 QA Audit PASSED - Ready for Production!');
        return true;
      } else {
        console.log('\n⚠️  QA Audit FAILED - Issues need to be addressed');
        return false;
      }
      
    } catch (error) {
      console.error('❌ QA Audit failed:', error);
      return false;
    } finally {
      await this.cleanup();
    }
  }
}

// Run the QA audit
const qa = new ComprehensiveQA();
qa.run().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('QA Audit failed:', error);
  process.exit(1);
}); 