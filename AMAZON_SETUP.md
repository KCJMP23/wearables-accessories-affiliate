# Amazon Associates Integration Setup

## 🛒 Complete Amazon Associates Setup Guide

### Step 1: Amazon Associates Account Setup

1. **Sign up for Amazon Associates**
   - Go to: https://affiliate-program.amazon.com/
   - Click "Join Now" and create your account
   - Choose your preferred Amazon store (US, UK, Canada, etc.)
   - Complete the application with required information
   - Wait for approval (usually 1-3 business days)

2. **Get Your Associate Tag**
   - After approval, log into your Associates account
   - Go to "Account Settings" → "Account Information"
   - Note your Associate Tag (format varies by region):
     - **US**: `yourname-20`
     - **UK**: `yourname-21`
     - **Canada**: `yourname-22`
     - **Germany**: `yourname-23`

### Step 2: AWS API Credentials Setup

1. **Create AWS Account** (if you don't have one)
   - Go to: https://aws.amazon.com/
   - Sign up for a free AWS account

2. **Create IAM User for API Access**
   - Go to AWS Console → IAM
   - Click "Users" → "Create user"
   - Name: `amazon-associates-api`
   - Select "Programmatic access"

3. **Attach Required Policies**
   - Search for and attach: `AmazonProductAdvertisingAPIPolicy`
   - This policy allows access to the Product Advertising API

4. **Generate Access Keys**
   - After creating the user, go to "Security credentials" tab
   - Click "Create access key"
   - **IMPORTANT**: Download the CSV file with your keys
   - You'll get:
     - Access Key ID (starts with `AKIA...`)
     - Secret Access Key (starts with `wJalr...`)

### Step 3: Environment Variables Setup

Add these to your `.env.local` file:

```bash
# Amazon Associates Configuration
AMAZON_ACCESS_KEY_ID=your_access_key_id_here
AMAZON_SECRET_ACCESS_KEY=your_secret_access_key_here
AMAZON_ASSOCIATE_TAG=your_associate_tag_here
AMAZON_REGION=us-east-1
```

### Step 4: Test Your Setup

1. **Start the admin app**:
   ```bash
   cd apps/admin && pnpm dev
   ```

2. **Test the API connection**:
   ```bash
   curl -X POST http://localhost:3001/api/products/test-amazon
   ```

3. **Expected response**:
   ```json
   {
     "success": true,
     "message": "Amazon API connection successful",
     "products": [
       {
         "asin": "B08N5WRWNW",
         "title": "Example Laptop",
         "price": "$999.99",
         "rating": 4.5,
         "affiliateUrl": "https://www.amazon.com/dp/B08N5WRWNW?tag=yourname-20"
       }
     ]
   }
   ```

### Step 5: Using Amazon Products in Your Platform

#### Via Admin Dashboard
1. Go to Admin → Products
2. Click "Add Product"
3. Paste an Amazon product URL
4. The system will auto-populate product details
5. Save the product with your affiliate links

#### Via API
```javascript
import { amazonService } from '@affiliate/ai';

// Search for products
const products = await amazonService.searchProducts({
  keywords: 'wireless headphones',
  itemCount: 10,
  minPrice: 50,
  maxPrice: 200
});

// Get product by ASIN
const product = await amazonService.getProductByASIN('B08N5WRWNW');

// Get product by URL
const product = await amazonService.getProductByURL('https://www.amazon.com/dp/B08N5WRWNW');
```

### Step 6: Advanced Features

#### Product Categories
```javascript
// Get top-rated products in a category
const topProducts = await amazonService.getTopProducts('Electronics', 20);

// Get current deals
const deals = await amazonService.getDeals(15);
```

#### Custom Affiliate URLs
```javascript
// Generate affiliate URL with campaign tracking
const affiliateUrl = amazonService.generateAffiliateUrl('B08N5WRWNW', 'summer-sale');
```

### Step 7: Compliance and Best Practices

#### FTC Compliance
- Always disclose affiliate relationships
- Add disclosure to your site footer
- Include disclosure in blog posts
- Example: "This post contains affiliate links. We may earn a commission if you make a purchase."

#### Amazon Associates Program Requirements
- Follow Amazon's Associates Program Operating Agreement
- Don't use prohibited content or methods
- Maintain accurate tracking and reporting
- Respond to Amazon's requests promptly

#### Content Guidelines
- Write honest, unbiased product reviews
- Don't make false claims about products
- Include both pros and cons
- Update content regularly for accuracy

### Step 8: Troubleshooting

#### Common Issues

**"Invalid credentials" error**
- Check your Access Key ID and Secret Access Key
- Ensure your AWS user has the correct permissions
- Verify your Associate Tag is correct

**"API quota exceeded" error**
- Amazon has rate limits on API calls
- Implement caching to reduce API calls
- Consider upgrading your AWS plan if needed

**"Product not found" error**
- Check if the ASIN is valid
- Some products may not be available in your region
- Try searching with different keywords

#### Testing Your Setup

1. **Test API Connection**:
   ```bash
   curl -X GET http://localhost:3001/api/products/test-amazon
   ```

2. **Test Product Search**:
   ```bash
   curl -X POST http://localhost:3001/api/products/test-amazon
   ```

3. **Check Environment Variables**:
   ```bash
   echo $AMAZON_ACCESS_KEY_ID
   echo $AMAZON_ASSOCIATE_TAG
   ```

### Step 9: Monitoring and Analytics

#### Track Your Performance
- Monitor click-through rates
- Track conversion rates
- Analyze which products perform best
- Use Amazon's reporting tools

#### Revenue Optimization
- Focus on high-converting products
- Test different affiliate link placements
- Optimize your content for conversions
- Regular performance reviews

### Step 10: Legal and Tax Considerations

#### Tax Requirements
- Report affiliate income on your tax returns
- Keep detailed records of earnings
- Consult with a tax professional

#### Legal Compliance
- Follow FTC guidelines for affiliate marketing
- Comply with Amazon's terms of service
- Respect intellectual property rights
- Maintain proper business licenses if required

---

## 🎯 Quick Start Checklist

- [ ] Amazon Associates account approved
- [ ] AWS API credentials created
- [ ] Environment variables configured
- [ ] API connection tested
- [ ] First product added via admin
- [ ] Affiliate links working
- [ ] FTC disclosure added
- [ ] Performance monitoring set up

Your Amazon Associates integration is now ready for production! 🚀 