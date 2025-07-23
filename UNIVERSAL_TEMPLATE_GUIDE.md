# Universal Affiliate Template Guide

This is a **universal, forkable affiliate marketing template** that can be adapted for any niche without hardcoded content. The template is designed to be completely configurable through the database, making it suitable for any industry or product category.

## 🎯 Key Features

### Universal Design
- **No hardcoded content**: All text, titles, and descriptions are configurable
- **Multi-niche support**: Works for any industry (tech, fitness, beauty, home, etc.)
- **Forkable architecture**: Easy to clone and customize for different niches
- **Database-driven configuration**: All site content stored in the database

### Configurable Elements
- Site title and description
- Hero section content
- About page content
- Featured posts/products titles
- Newsletter content
- Footer text
- Contact information
- SEO meta tags
- Social media links

## 🚀 Quick Start

### 1. Fork the Repository
```bash
git clone https://github.com/your-username/affiliate-template-72325.git
cd affiliate-template-72325
```

### 2. Set Up Environment
```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
```

### 3. Configure Your Site
The template uses a database-driven configuration system. You can customize your site by updating the `sites` table in the database.

#### Example Site Configurations

**Tech Review Site:**
```sql
UPDATE sites SET 
  name = 'TechGear Reviews',
  site_title = 'Best Tech Products & Reviews',
  hero_title = 'Find the Best Tech Products',
  hero_subtitle = 'Comprehensive reviews of the latest gadgets and technology',
  about_title = 'About TechGear Reviews',
  about_description = 'Your trusted source for honest tech product reviews',
  featured_posts_title = 'Latest Tech Reviews',
  featured_products_title = 'Top Tech Products'
WHERE domain = 'your-domain.com';
```

**Fitness Equipment Site:**
```sql
UPDATE sites SET 
  name = 'FitGear Reviews',
  site_title = 'Best Fitness Equipment & Reviews',
  hero_title = 'Transform Your Fitness Journey',
  hero_subtitle = 'Find the best fitness equipment and workout gear',
  about_title = 'About FitGear Reviews',
  about_description = 'Your trusted source for fitness equipment reviews',
  featured_posts_title = 'Latest Fitness Reviews',
  featured_products_title = 'Top Fitness Products'
WHERE domain = 'your-domain.com';
```

**Home & Garden Site:**
```sql
UPDATE sites SET 
  name = 'HomeGarden Reviews',
  site_title = 'Best Home & Garden Products',
  hero_title = 'Create Your Perfect Home',
  hero_subtitle = 'Discover the best home improvement and garden products',
  about_title = 'About HomeGarden Reviews',
  about_description = 'Your trusted source for home and garden product reviews',
  featured_posts_title = 'Latest Home Reviews',
  featured_products_title = 'Top Home Products'
WHERE domain = 'your-domain.com';
```

## 📝 Configuration Fields

The `sites` table contains these configurable fields:

### Basic Site Info
- `name`: Site name
- `domain`: Domain name
- `logoUrl`: Logo image URL
- `primaryColor`: Primary brand color
- `secondaryColor`: Secondary brand color

### Content Configuration
- `siteTitle`: Main site title
- `siteDescription`: Site description
- `heroTitle`: Hero section title
- `heroSubtitle`: Hero section subtitle
- `aboutTitle`: About page title
- `aboutDescription`: About page description
- `contactEmail`: Contact email address

### SEO Configuration
- `metaTitle`: SEO meta title
- `metaDescription`: SEO meta description
- `metaKeywords`: SEO meta keywords

### Content Section Titles
- `featuredPostsTitle`: Featured posts section title
- `featuredPostsSubtitle`: Featured posts section subtitle
- `featuredProductsTitle`: Featured products section title
- `featuredProductsSubtitle`: Featured products section subtitle
- `newsletterTitle`: Newsletter section title
- `newsletterSubtitle`: Newsletter section subtitle

### Footer Configuration
- `footerText`: Footer copyright text
- `socialLinks`: JSON object with social media links

## 🎨 Customization Examples

### For a Pet Products Niche
```sql
UPDATE sites SET 
  name = 'PetGear Reviews',
  site_title = 'Best Pet Products & Reviews',
  hero_title = 'Give Your Pets the Best',
  hero_subtitle = 'Honest reviews of pet food, toys, and accessories',
  about_title = 'About PetGear Reviews',
  about_description = 'Your trusted source for pet product reviews',
  featured_posts_title = 'Latest Pet Reviews',
  featured_products_title = 'Top Pet Products',
  newsletter_title = 'Stay Updated on Pet Products',
  newsletter_subtitle = 'Get the latest pet product reviews and recommendations'
WHERE domain = 'your-domain.com';
```

### For a Beauty Products Niche
```sql
UPDATE sites SET 
  name = 'BeautyGear Reviews',
  site_title = 'Best Beauty Products & Reviews',
  hero_title = 'Discover Your Perfect Beauty Routine',
  hero_subtitle = 'Honest reviews of skincare, makeup, and beauty tools',
  about_title = 'About BeautyGear Reviews',
  about_description = 'Your trusted source for beauty product reviews',
  featured_posts_title = 'Latest Beauty Reviews',
  featured_products_title = 'Top Beauty Products',
  newsletter_title = 'Stay Updated on Beauty Products',
  newsletter_subtitle = 'Get the latest beauty product reviews and recommendations'
WHERE domain = 'your-domain.com';
```

## 🔧 Technical Architecture

### Database Schema
The template uses a flexible database schema that supports:
- **Multi-site management**: Each site has its own configuration
- **Content management**: Posts, products, and media are site-specific
- **Analytics tracking**: Click tracking and conversion analytics
- **User management**: Admin authentication and role-based access

### Key Tables
- `sites`: Site configuration and branding
- `content`: Blog posts and articles
- `products`: Product information and affiliate links
- `affiliate_links`: Tracking and commission data
- `analytics`: Click and conversion tracking

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables
```env
# Database
DATABASE_URL=your-supabase-connection-string

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Site Configuration
NEXT_PUBLIC_SITE_DOMAIN=your-domain.com

# AI Services (optional)
OPENAI_API_KEY=your-openai-key
CLAUDE_API_KEY=your-claude-key
LEONARDO_API_KEY=your-leonardo-key
```

## 📊 Analytics & Tracking

The template includes built-in analytics for:
- **Click tracking**: Monitor affiliate link clicks
- **Conversion tracking**: Track sales and commissions
- **Content performance**: Analyze which posts/products perform best
- **Site analytics**: Page views, user engagement, etc.

## 🔒 Compliance & Legal

The template includes:
- **FTC compliance**: Proper affiliate disclosure
- **Privacy policy**: GDPR-compliant privacy handling
- **Terms of service**: Standard legal terms
- **Cookie consent**: EU compliance for cookies

## 🎯 Best Practices

### Content Strategy
1. **Research your niche**: Understand your target audience
2. **Create valuable content**: Focus on helpful, honest reviews
3. **Build trust**: Be transparent about affiliate relationships
4. **Optimize for SEO**: Use relevant keywords naturally
5. **Engage with audience**: Respond to comments and questions

### Technical Optimization
1. **Performance**: Maintain fast loading times
2. **Mobile-first**: Ensure responsive design
3. **SEO**: Optimize meta tags and structured data
4. **Security**: Keep dependencies updated
5. **Backup**: Regular database backups

## 🤝 Support

For questions or support:
1. Check the documentation in `/docs`
2. Review the architecture in `/docs/architecture.md`
3. Check the changelog in `CHANGELOG.md`
4. Open an issue on GitHub

## 📈 Scaling

The template is designed to scale:
- **Multiple sites**: Manage multiple niche sites from one admin
- **Content automation**: AI-powered content generation
- **Analytics dashboard**: Track performance across all sites
- **Automated workflows**: Streamline content approval and publishing

---

**This template is designed to be truly universal - fork it, configure it for your niche, and start building your affiliate marketing empire!** 