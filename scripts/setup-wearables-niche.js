#!/usr/bin/env node

/**
 * Wearables Niche Setup Script
 * 
 * This script automates the setup of a wearables niche site using the affiliate template platform.
 * It creates the necessary site configuration, products, and content structure.
 */

const fs = require('fs');
const path = require('path');

// Wearables site configuration
const wearablesSiteConfig = {
  name: "Wearables Hub",
  domain: "wearables-hub.com",
  logoUrl: "/images/wearables-logo.png",
  primaryColor: "#3B82F6",
  secondaryColor: "#1E40AF",
  siteTitle: "Wearables Hub - Best Smartwatches & Fitness Trackers",
  siteDescription: "Discover the latest smartwatches, fitness trackers, and health monitoring devices. Expert reviews, comparisons, and deals on Apple Watch, Fitbit, Garmin, Oura Ring, and more.",
  heroTitle: "Your Ultimate Guide to Wearable Technology",
  heroSubtitle: "Find the perfect smartwatch, fitness tracker, or health monitor for your lifestyle",
  aboutTitle: "About Wearables Hub",
  aboutDescription: "We're passionate about wearable technology and helping you find the perfect device to track your fitness, monitor your health, and stay connected.",
  contactEmail: "hello@wearables-hub.com",
  metaTitle: "Wearables Hub - Best Smartwatches & Fitness Trackers 2025",
  metaDescription: "Expert reviews and comparisons of the latest smartwatches, fitness trackers, and health monitoring devices. Find your perfect wearable tech.",
  metaKeywords: "smartwatch, fitness tracker, apple watch, fitbit, garmin, oura ring, health monitor, wearable technology",
  featuredPostsTitle: "Latest Wearable Tech Reviews",
  featuredPostsSubtitle: "Stay updated with the newest smartwatches and fitness trackers",
  featuredProductsTitle: "Top-Rated Wearables",
  featuredProductsSubtitle: "Our picks for the best smartwatches and fitness trackers",
  newsletterTitle: "Stay Updated on Wearable Tech",
  newsletterSubtitle: "Get the latest reviews, deals, and tech news delivered to your inbox",
  footerText: "© 2025 Wearables Hub. All rights reserved. We may earn commissions from qualifying purchases.",
  socialLinks: {
    twitter: "https://twitter.com/wearableshub",
    facebook: "https://facebook.com/wearableshub",
    instagram: "https://instagram.com/wearableshub",
    youtube: "https://youtube.com/wearableshub"
  }
};

// Sample products for wearables niche
const wearablesProducts = [
  {
    name: "Apple Watch Series 9",
    description: "The latest Apple Watch with advanced health monitoring, faster performance, and new features.",
    manufacturer: "Apple",
    basePrice: 399.00,
    mainImageUrl: "/images/products/apple-watch-series-9.jpg",
    specifications: {
      display: "Always-On Retina display",
      battery: "Up to 18 hours",
      waterResistance: "Water resistant to 50m",
      connectivity: "GPS, Cellular optional",
      healthFeatures: ["ECG", "Blood Oxygen", "Temperature Sensing", "Crash Detection"]
    }
  },
  {
    name: "Samsung Galaxy Watch 6",
    description: "Premium Android smartwatch with advanced health tracking and seamless Samsung ecosystem integration.",
    manufacturer: "Samsung",
    basePrice: 349.99,
    mainImageUrl: "/images/products/samsung-galaxy-watch-6.jpg",
    specifications: {
      display: "Super AMOLED",
      battery: "Up to 40 hours",
      waterResistance: "Water resistant to 50m",
      connectivity: "Bluetooth 5.2, Wi-Fi",
      healthFeatures: ["Heart Rate", "Blood Pressure", "ECG", "Sleep Tracking"]
    }
  },
  {
    name: "Fitbit Charge 6",
    description: "Advanced fitness tracking with heart rate monitoring, sleep tracking, and Google apps integration.",
    manufacturer: "Fitbit",
    basePrice: 159.95,
    mainImageUrl: "/images/products/fitbit-charge-6.jpg",
    specifications: {
      display: "AMOLED touchscreen",
      battery: "Up to 7 days",
      waterResistance: "Water resistant to 50m",
      connectivity: "Bluetooth 5.0",
      healthFeatures: ["Heart Rate", "Sleep Tracking", "Stress Management", "SpO2"]
    }
  },
  {
    name: "Garmin Fenix 7",
    description: "Premium multisport GPS watch with advanced training metrics and outdoor navigation.",
    manufacturer: "Garmin",
    basePrice: 699.99,
    mainImageUrl: "/images/products/garmin-fenix-7.jpg",
    specifications: {
      display: "Transflective MIP",
      battery: "Up to 18 days",
      waterResistance: "Water resistant to 100m",
      connectivity: "GPS, GLONASS, Galileo",
      healthFeatures: ["Heart Rate", "Pulse Ox", "Training Load", "Recovery Time"]
    }
  },
  {
    name: "Oura Ring Gen 3",
    description: "Advanced sleep and recovery tracking in a sleek ring form factor.",
    manufacturer: "Oura",
    basePrice: 299.00,
    mainImageUrl: "/images/products/oura-ring-gen3.jpg",
    specifications: {
      battery: "Up to 7 days",
      waterResistance: "Water resistant to 100m",
      connectivity: "Bluetooth Low Energy",
      healthFeatures: ["Sleep Tracking", "Recovery Monitoring", "Activity Tracking", "Temperature Sensing"]
    }
  },
  {
    name: "Whoop Strap 4.0",
    description: "Performance optimization through advanced recovery and strain tracking.",
    manufacturer: "Whoop",
    basePrice: 0.00, // Subscription-based
    mainImageUrl: "/images/products/whoop-strap-4.jpg",
    specifications: {
      battery: "Up to 5 days",
      waterResistance: "Water resistant to 10m",
      connectivity: "Bluetooth Low Energy",
      healthFeatures: ["Strain Score", "Recovery Score", "Sleep Coach", "Cardiovascular Strain"]
    }
  },
  {
    name: "Xiaomi Mi Band 8",
    description: "Affordable fitness tracking with comprehensive health monitoring features.",
    manufacturer: "Xiaomi",
    basePrice: 49.99,
    mainImageUrl: "/images/products/xiaomi-mi-band-8.jpg",
    specifications: {
      display: "AMOLED",
      battery: "Up to 16 days",
      waterResistance: "Water resistant to 50m",
      connectivity: "Bluetooth 5.1",
      healthFeatures: ["Heart Rate", "Sleep Tracking", "Stress Monitoring", "SpO2"]
    }
  },
  {
    name: "Google Pixel Watch 2",
    description: "Google's latest smartwatch with advanced health features and seamless Android integration.",
    manufacturer: "Google",
    basePrice: 349.99,
    mainImageUrl: "/images/products/google-pixel-watch-2.jpg",
    specifications: {
      display: "AMOLED",
      battery: "Up to 24 hours",
      waterResistance: "Water resistant to 50m",
      connectivity: "Bluetooth 5.0, Wi-Fi",
      healthFeatures: ["Heart Rate", "ECG", "Sleep Tracking", "Stress Management"]
    }
  }
];

// Sample categories for wearables
const wearablesCategories = [
  {
    name: "Smartwatches",
    description: "Advanced smartwatches with app support and comprehensive features",
    slug: "smartwatches"
  },
  {
    name: "Fitness Trackers",
    description: "Dedicated fitness tracking devices with health monitoring",
    slug: "fitness-trackers"
  },
  {
    name: "Health Monitoring",
    description: "Specialized devices for health and wellness tracking",
    slug: "health-monitoring"
  },
  {
    name: "Accessories",
    description: "Charging stands, bands, protectors, and other accessories",
    slug: "accessories"
  }
];

// Sample blog posts for wearables
const wearablesBlogPosts = [
  {
    title: "Best Smartwatches for 2025: Complete Buyer's Guide",
    content: "Comprehensive guide to the top smartwatches available in 2025, including Apple Watch Series 9, Samsung Galaxy Watch 6, and more.",
    summary: "Find the perfect smartwatch for your needs with our detailed comparison of the best models available in 2025.",
    category: "Buying Guides",
    tags: ["smartwatch", "apple watch", "samsung", "buying guide", "2025"]
  },
  {
    title: "Apple Watch vs Fitbit: Which Fitness Tracker is Right for You?",
    content: "Detailed comparison between Apple Watch and Fitbit ecosystems, helping you choose the right platform for your fitness goals.",
    summary: "Compare Apple Watch and Fitbit features, pricing, and ecosystem to find your perfect fitness companion.",
    category: "Comparisons",
    tags: ["apple watch", "fitbit", "comparison", "fitness tracker"]
  },
  {
    title: "How to Maximize Your Smartwatch Battery Life",
    content: "Practical tips and tricks to extend your smartwatch battery life and get the most out of your device.",
    summary: "Learn how to optimize your smartwatch settings and usage patterns for longer battery life.",
    category: "How-To",
    tags: ["battery life", "smartwatch tips", "optimization", "how-to"]
  },
  {
    title: "Top Fitness Trackers Under $100",
    content: "Best budget-friendly fitness trackers that offer great value without breaking the bank.",
    summary: "Discover affordable fitness trackers that provide excellent features and tracking capabilities.",
    category: "Buying Guides",
    tags: ["budget", "fitness tracker", "under $100", "affordable"]
  },
  {
    title: "Understanding Oura Ring Sleep Scores",
    content: "Complete guide to interpreting your Oura Ring sleep data and improving your sleep quality.",
    summary: "Learn how to read and understand your Oura Ring sleep scores to optimize your rest and recovery.",
    category: "How-To",
    tags: ["oura ring", "sleep tracking", "sleep scores", "recovery"]
  }
];

// Function to create directories
function createDirectories() {
  const dirs = [
    'public/images/wearables',
    'public/images/products',
    'public/images/blog',
    'content/wearables/posts',
    'content/wearables/products'
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }
  });
}

// Function to generate site configuration file
function generateSiteConfig() {
  const configPath = 'content/wearables/site-config.json';
  fs.writeFileSync(configPath, JSON.stringify(wearablesSiteConfig, null, 2));
  console.log(`✅ Generated site configuration: ${configPath}`);
}

// Function to generate products data
function generateProductsData() {
  const productsPath = 'content/wearables/products/products.json';
  fs.writeFileSync(productsPath, JSON.stringify(wearablesProducts, null, 2));
  console.log(`✅ Generated products data: ${productsPath}`);
}

// Function to generate categories data
function generateCategoriesData() {
  const categoriesPath = 'content/wearables/categories.json';
  fs.writeFileSync(categoriesPath, JSON.stringify(wearablesCategories, null, 2));
  console.log(`✅ Generated categories data: ${categoriesPath}`);
}

// Function to generate blog posts
function generateBlogPosts() {
  wearablesBlogPosts.forEach((post, index) => {
    const postPath = `content/wearables/posts/post-${index + 1}.json`;
    fs.writeFileSync(postPath, JSON.stringify(post, null, 2));
    console.log(`✅ Generated blog post: ${postPath}`);
  });
}

// Function to generate setup instructions
function generateSetupInstructions() {
  const instructions = `
# Wearables Niche Setup Instructions

## Files Generated
- ✅ Site configuration: content/wearables/site-config.json
- ✅ Products data: content/wearables/products/products.json
- ✅ Categories: content/wearables/categories.json
- ✅ Blog posts: content/wearables/posts/

## Next Steps

### 1. Add Site Configuration to Database
1. Go to http://localhost:3000 (Admin Dashboard)
2. Navigate to "Sites" section
3. Click "Add New Site"
4. Copy the configuration from content/wearables/site-config.json
5. Save the site configuration

### 2. Add Products to Database
1. Go to "Products" section in admin dashboard
2. Import products from content/wearables/products/products.json
3. Add product images to public/images/products/
4. Update affiliate links for each product

### 3. Add Categories
1. Go to "Categories" section
2. Import categories from content/wearables/categories.json
3. Organize products into appropriate categories

### 4. Create Blog Content
1. Go to "CMS" section
2. Create blog posts using content from content/wearables/posts/
3. Add featured images for each post
4. Include affiliate links in blog content

### 5. Customize Design
1. Update logo: Add wearables-logo.png to public/images/
2. Update color scheme in site configuration
3. Customize hero section content
4. Update meta tags for SEO

### 6. Set Up Affiliate Links
1. Create Amazon Associates account
2. Set up tracking ID: wearableshub-20
3. Update all product links with affiliate tracking
4. Test all affiliate links

### 7. Launch Checklist
- [ ] Site configuration added to database
- [ ] Products imported and categorized
- [ ] Blog posts created with affiliate links
- [ ] Logo and branding assets added
- [ ] Affiliate links tested and working
- [ ] SEO meta tags updated
- [ ] Mobile responsiveness tested
- [ ] Performance optimized

## Important Notes
- All products use the same database as other niches
- Each niche gets its own site configuration
- Affiliate links should be unique to this niche
- Content should be original and valuable to users
- Follow FTC guidelines for affiliate disclosures

## Support
For technical support, refer to the main documentation or contact the development team.
`;

  fs.writeFileSync('content/wearables/SETUP_INSTRUCTIONS.md', instructions);
  console.log('✅ Generated setup instructions: content/wearables/SETUP_INSTRUCTIONS.md');
}

// Main execution
function main() {
  console.log('🚀 Setting up Wearables Niche...\n');
  
  try {
    createDirectories();
    generateSiteConfig();
    generateProductsData();
    generateCategoriesData();
    generateBlogPosts();
    generateSetupInstructions();
    
    console.log('\n✅ Wearables niche setup completed successfully!');
    console.log('\n📋 Next Steps:');
    console.log('1. Review the generated files in content/wearables/');
    console.log('2. Follow the setup instructions in content/wearables/SETUP_INSTRUCTIONS.md');
    console.log('3. Add your logo and product images');
    console.log('4. Configure affiliate links');
    console.log('5. Launch your wearables niche site!');
    
  } catch (error) {
    console.error('❌ Error during setup:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  wearablesSiteConfig,
  wearablesProducts,
  wearablesCategories,
  wearablesBlogPosts
}; 