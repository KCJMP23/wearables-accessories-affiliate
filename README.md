# Universal Affiliate Template Platform

A **universal, forkable affiliate marketing template** that can be adapted for any niche without hardcoded content. This platform enables the creation and management of multiple niche affiliate websites from a single admin interface, powered by AI-driven content generation.

## 🎯 Universal Design

This template is designed to be **completely universal** - no hardcoded content, no specific niche requirements. Everything is configurable through the database, making it suitable for any industry:

- **Tech Reviews** - Gadgets, software, electronics
- **Fitness Equipment** - Workout gear, supplements, accessories  
- **Home & Garden** - Tools, furniture, decor
- **Beauty Products** - Skincare, makeup, beauty tools
- **Pet Products** - Food, toys, accessories
- **Any Niche** - Fully customizable for any industry

## 🚀 Features

- **Universal Template**: No hardcoded content - works for any niche
- **Database-Driven Configuration**: All site content configurable through database
- **Multi-Site Management**: Manage multiple niche affiliate websites from one dashboard
- **AI-Powered Content Generation**: Automated blog post creation with OpenAI/Claude and Leonardo.AI
- **Affiliate Integration**: Amazon Associates API integration for product data and tracking
- **Content Approval Workflow**: Review and approve AI-generated content before publishing
- **Analytics Dashboard**: Track clicks, conversions, and revenue across all sites
- **Newsletter Management**: Capture and manage email subscribers
- **Responsive Design**: Mobile-first design for all screen sizes
- **SEO Optimized**: Built for high search engine rankings

## 🏗️ Architecture

- **Frontend**: Next.js 15.4.3 with TypeScript 5.8.3
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Database**: Prisma ORM with PostgreSQL
- **UI**: Tailwind CSS 4.1.11 with custom components
- **Monorepo**: Turborepo for efficient development
- **Deployment**: Vercel for seamless hosting

## 📁 Project Structure

```
affiliate-template-72325/
├── apps/
│   ├── admin/          # Admin dashboard (Next.js)
│   └── web/            # Public site template (Next.js)
├── packages/
│   ├── db/             # Database schema and client (Prisma)
│   ├── shared-types/   # Shared TypeScript interfaces
│   ├── ui/             # Shared UI components
│   └── eslint-config-custom/ # Shared ESLint configuration
├── docs/               # Project documentation
└── .cursorrules        # Development guidelines
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd affiliate-template-72325

# Install dependencies
pnpm install

# Generate Prisma client
cd packages/db && pnpm prisma generate && cd ../..

# Start development servers
pnpm dev
```

### Quick Configuration

The template is designed to be **universal** - you can configure it for any niche by updating the database:

```sql
-- Example: Configure for a tech review site
UPDATE sites SET 
  name = 'TechGear Reviews',
  site_title = 'Best Tech Products & Reviews',
  hero_title = 'Find the Best Tech Products',
  hero_subtitle = 'Comprehensive reviews of the latest gadgets and technology'
WHERE domain = 'your-domain.com';
```

See [UNIVERSAL_TEMPLATE_GUIDE.md](./UNIVERSAL_TEMPLATE_GUIDE.md) for detailed configuration examples.
```

### Available Scripts

```bash
# Development
pnpm dev          # Start all apps in development mode
pnpm build        # Build all packages and apps
pnpm lint         # Run ESLint across all packages
pnpm test         # Run tests across all packages
pnpm type-check   # Run TypeScript type checking

# Database
pnpm db:generate  # Generate Prisma client
pnpm db:push      # Push schema to database
pnpm db:migrate   # Run database migrations
pnpm db:studio    # Open Prisma Studio
```

### Development Servers

- **Admin Dashboard**: http://localhost:3001
- **Public Site**: http://localhost:3000

## 📊 Database Schema

The platform uses a comprehensive database schema with the following models:

- **User**: Admin users and authentication
- **Site**: Individual niche affiliate websites
- **Post**: Blog posts with approval workflow
- **Product**: Affiliate products with dynamic pricing
- **Click**: Click tracking and analytics
- **NewsletterSubscription**: Email subscriber management
- **ApiKey**: Secure API key storage

## 🎨 UI Components

The platform includes a comprehensive UI component library:

- **Form Components**: Input, Textarea, Select, Form
- **Layout Components**: Card, Modal, Tabs
- **Feedback Components**: Alert, Toast, LoadingSpinner
- **Data Components**: Table, Pagination, Badge
- **Navigation Components**: Dropdown

All components are:
- Fully responsive
- Accessible (WCAG 2.1 AA compliant)
- TypeScript typed
- Customizable with Tailwind CSS

## 🔒 Security

- Row Level Security (RLS) on all site-specific data
- Secure API key storage in Supabase Vault
- FTC compliance for affiliate links
- Amazon ToS compliance
- Authentication via Supabase Auth

## 🚀 Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Environment Variables

```bash
# Database
DATABASE_URL=your_supabase_database_url

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Services
OPENAI_API_KEY=your_openai_key
CLAUDE_API_KEY=your_claude_key
LEONARDO_API_KEY=your_leonardo_key

# Amazon Associates
AMAZON_ASSOCIATES_TAG=your_amazon_tag
```

## 📈 Performance

- Google PageSpeed score target: 90+
- Responsive design for all screen sizes
- Optimized images and assets
- Efficient database queries with Prisma
- CDN delivery via Vercel

## 🤝 Contributing

1. Follow the `.cursorrules` guidelines
2. Keep files under 500 lines
3. Write production-ready code only
4. Include comprehensive TypeScript types
5. Test thoroughly before submitting

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions, please refer to the documentation in the `docs/` directory or create an issue in the repository.

---

**Built with ❤️ using modern web technologies**