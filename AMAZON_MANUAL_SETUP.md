# Manual Amazon Associates Link Management

Since your Amazon Associates account is not yet approved, this guide covers manual link management using your tracking IDs.

## Your Tracking IDs

You have three tracking IDs for different product categories:

| Tracking ID | Category | Description |
|-------------|----------|-------------|
| `weartech00-20` | Wearable Tech | Wearable and mobile health technology and accessories |
| `jmpkch23-20` | General Merchandise | General merchandise and products |
| `hothoneyfever00-20` | Hot Honey | Hot honey products and related items |

## Method 1: Bulk URL Conversion

### Using the Admin Interface

1. **Access the Manual Amazon Page**:
   - Go to your admin dashboard
   - Navigate to `/products/manual-amazon`
   - Or visit: `http://localhost:3002/products/manual-amazon`

2. **Convert URLs**:
   - Select the appropriate tracking ID for your product category
   - Paste Amazon URLs (one per line)
   - Click "Convert to Affiliate Links"
   - Copy or export the generated affiliate links

### Using the API Directly

```bash
# Convert multiple URLs
curl -X POST http://localhost:3002/api/products/manual-amazon \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "https://amazon.com/product1",
      "https://amazon.com/product2"
    ],
    "trackingId": "jmpkch23-20"
  }'
```

### URL Format Examples

**Original Amazon URLs**:
```
https://www.amazon.com/dp/B08N5WRWNW
https://www.amazon.com/Apple-iPhone-14-Pro-128GB/dp/B0BDJ6ZQ1B
https://www.amazon.com/Samsung-Galaxy-S23-Ultra-SM-S918B/dp/B0BSH9J6YF
```

**Converted Affiliate URLs**:
```
https://www.amazon.com/dp/B08N5WRWNW?tag=jmpkch23-20
https://www.amazon.com/Apple-iPhone-14-Pro-128GB/dp/B0BDJ6ZQ1B?tag=jmpkch23-20
https://www.amazon.com/Samsung-Galaxy-S23-Ultra-SM-S918B/dp/B0BSH9J6YF?tag=jmpkch23-20
```

## Method 2: Amazon SiteStripe

### Setup SiteStripe

1. **Install SiteStripe**:
   - Go to your Amazon Associates dashboard
   - Navigate to "Tools" → "SiteStripe"
   - Follow the installation instructions for your browser

2. **Using SiteStripe**:
   - Visit any Amazon product page
   - Click the SiteStripe bar at the top of the page
   - Select your tracking ID from the dropdown
   - Copy the generated affiliate link

### SiteStripe Features

- **Text Links**: Generate affiliate links for text
- **Image Links**: Generate affiliate links for product images
- **Product Previews**: Create rich product previews
- **Custom Tracking**: Select different tracking IDs per link

## Method 3: Manual URL Construction

### URL Structure

Amazon affiliate URLs follow this pattern:
```
https://www.amazon.com/dp/PRODUCT_ID?tag=YOUR_TRACKING_ID
```

### Examples by Category

**Wearable Tech** (`weartech00-20`):
```
https://www.amazon.com/dp/B08N5WRWNW?tag=weartech00-20
https://www.amazon.com/dp/B0BDJ6ZQ1B?tag=weartech00-20
```

**General Merchandise** (`jmpkch23-20`):
```
https://www.amazon.com/dp/B0BSH9J6YF?tag=jmpkch23-20
https://www.amazon.com/dp/B08N5WRWNW?tag=jmpkch23-20
```

**Hot Honey Products** (`hothoneyfever00-20`):
```
https://www.amazon.com/dp/B08N5WRWNW?tag=hothoneyfever00-20
https://www.amazon.com/dp/B0BDJ6ZQ1B?tag=hothoneyfever00-20
```

## Best Practices

### 1. Category Matching

- **Wearable Tech**: Use `weartech00-20` for smartwatches, fitness trackers, health monitors
- **General**: Use `jmpkch23-20` for most products
- **Hot Honey**: Use `hothoneyfever00-20` for hot honey products and related items

### 2. URL Validation

Always verify your affiliate URLs:
- Check that the `tag` parameter is added correctly
- Test the links to ensure they work
- Verify the tracking ID matches your category

### 3. Link Management

- **Keep Records**: Maintain a spreadsheet of your affiliate links
- **Track Performance**: Monitor which links perform best
- **Update Regularly**: Replace broken or outdated links

### 4. Compliance

- **FTC Disclosure**: Always disclose affiliate relationships
- **Amazon ToS**: Follow Amazon's terms of service
- **Regional Compliance**: Ensure compliance with local laws

## API Endpoints

### Get Available Tracking IDs
```bash
GET /api/products/manual-amazon
```

Response:
```json
{
  "success": true,
  "data": {
    "trackingIds": [
      {
        "id": "weartech00-20",
        "category": "wearable-tech",
        "description": "Wearable and mobile health technology and accessories"
      },
      {
        "id": "jmpkch23-20",
        "category": "general",
        "description": "General merchandise"
      },
      {
        "id": "hothoneyfever00-20",
        "category": "hot-honey",
        "description": "Hot honey products"
      }
    ]
  }
}
```

### Convert URLs
```bash
POST /api/products/manual-amazon
Content-Type: application/json

{
  "urls": ["https://amazon.com/product1"],
  "trackingId": "jmpkch23-20"
}
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "originalUrl": "https://amazon.com/product1",
      "trackingId": "jmpkch23-20",
      "affiliateUrl": "https://amazon.com/product1?tag=jmpkch23-20",
      "category": "general",
      "description": "General merchandise"
    }
  ],
  "count": 1
}
```

## Troubleshooting

### Common Issues

1. **Invalid URLs**: Ensure URLs are from Amazon domains
2. **Missing Tracking ID**: Verify the tracking ID is correct
3. **CORS Errors**: Check that your domain is allowed
4. **API Errors**: Verify the request format

### Error Responses

```json
{
  "error": "URLs array is required"
}
```

```json
{
  "error": "Invalid Amazon URLs found",
  "invalidUrls": ["https://example.com/product"]
}
```

## Next Steps

Once your Amazon Associates account is approved:

1. **API Integration**: Switch to the automated Amazon API
2. **Product Search**: Use the search and lookup endpoints
3. **Real-time Data**: Get live product information
4. **Analytics**: Track performance with detailed metrics

## Support

- **Amazon Associates**: [https://affiliate-program.amazon.com](https://affiliate-program.amazon.com)
- **SiteStripe Help**: [https://affiliate-program.amazon.com/help/node/topic/GTZQK8K8XK8K8K8K](https://affiliate-program.amazon.com/help/node/topic/GTZQK8K8XK8K8K8K)
- **FTC Guidelines**: [https://www.ftc.gov/tips-advice/business-center/guidance/advertising-marketing-internet-rules-road](https://www.ftc.gov/tips-advice/business-center/guidance/advertising-marketing-internet-rules-road) 