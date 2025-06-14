# Vercel Deployment Guide - Cipher Intelligence Platform

## 🚀 Step-by-Step Deployment Process

### 1. Environment Variables Setup

Go to your Vercel project dashboard and add these environment variables:

#### **Core Application Variables**
```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
```

#### **Database Configuration**
```bash
DATABASE_URL=your_neon_database_connection_string
```

#### **Stripe Configuration (Required)**
```bash
# Core Stripe Keys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# OmniPanel Products (Emergency Campaign)
STRIPE_PRODUCT_ID_OMNIPANEL=prod_SUpvkYAt2gzQzL
STRIPE_PRICE_ID_INDIVIDUAL_FOUNDER=price_1RZqJDP4nRvJbyjDCacGT1gG
STRIPE_PRICE_ID_TEAM_CRISIS_PACK=price_1RZqJNP4nRvJbyjDRDA6mK1D
STRIPE_PRICE_ID_ENTERPRISE_EMERGENCY=price_1RZqJuP4nRvJbyjDWpQ0xqjl
STRIPE_PRICE_ID_SUPPORTER=price_1RZqK3P4nRvJbyjDbC1jdzlL

# AI Business Diagnostic Products
STRIPE_PRODUCT_ID_AI_DIAGNOSTIC_STANDARD=prod_SUxk3fepMLPbU6
STRIPE_PRICE_ID_AI_DIAGNOSTIC_STANDARD=price_1RZxuMP4nRvJbyjDsYfcvDNY
STRIPE_PRODUCT_ID_AI_DIAGNOSTIC_PREMIUM=prod_SUxqG1ZrubAyDq
STRIPE_PRICE_ID_AI_DIAGNOSTIC_PREMIUM=price_1RZxuwP4nRvJbyjDzgYnNeWg

# Website Conversion Audit
STRIPE_PRODUCT_ID_WEBSITE_AUDIT=prod_SUxqr07QvNpf2p
STRIPE_PRICE_ID_WEBSITE_AUDIT=price_1RZxuyP4nRvJbyjDBA1xXx6X

# AI Implementation Starter Kits
STRIPE_PRODUCT_ID_AI_STARTER_KITS=prod_SUxq6GTpjDSNEn
STRIPE_PRICE_ID_AI_STARTER_KITS=price_1RZxuzP4nRvJbyjDPQ7kbEGU

# Success/Cancel URLs
NEXT_PUBLIC_STRIPE_SUCCESS_URL_DIAGNOSTIC=/products/ai-business-diagnostic/success
NEXT_PUBLIC_STRIPE_SUCCESS_URL_AUDIT=/products/website-audit/success
NEXT_PUBLIC_STRIPE_SUCCESS_URL_KITS=/products/ai-starter-kits/success
NEXT_PUBLIC_STRIPE_CANCEL_URL_DIAGNOSTIC=/products/ai-business-diagnostic
NEXT_PUBLIC_STRIPE_CANCEL_URL_AUDIT=/products/website-audit
NEXT_PUBLIC_STRIPE_CANCEL_URL_KITS=/products/ai-starter-kits
```

### 2. Vercel Project Configuration

#### **Build Settings (Auto-detected)**
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node.js Version**: 18.x

#### **Domain Configuration**
1. Add your custom domain in Vercel dashboard
2. Update `NEXT_PUBLIC_APP_URL` to match your domain
3. SSL is automatically configured

### 3. Stripe Webhook Configuration

#### **Create Webhook Endpoint**
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### 4. Database Setup (NeonDB)

#### **Connection String Format**
```
postgresql://username:password@host/database?sslmode=require
```

#### **Required Tables**
The application expects these tables (auto-created via migrations):
- `analytics_data`
- `division_metrics`
- `revenue_timeline`
- `conversion_funnel`

### 5. Deployment Verification Checklist

#### **Pre-Deployment**
- [ ] All environment variables added to Vercel
- [ ] Database connection string configured
- [ ] Stripe webhook endpoint created
- [ ] Domain configured (if using custom domain)

#### **Post-Deployment Testing**
- [ ] Homepage loads correctly
- [ ] Product pages accessible:
  - [ ] `/products` - Main marketplace
  - [ ] `/products/ai-business-diagnostic` - Diagnostic products
  - [ ] `/omnipanel` - Emergency campaign
- [ ] Checkout flow works:
  - [ ] AI Diagnostic Standard ($497)
  - [ ] AI Diagnostic Premium ($997)
  - [ ] Website Audit ($197)
  - [ ] AI Starter Kits ($97)
  - [ ] OmniPanel tiers ($25-$99)
- [ ] Success pages display correctly
- [ ] Analytics dashboard loads
- [ ] Mobile responsiveness verified

### 6. Revenue Products Live URLs

Once deployed, these will be your revenue-generating pages:

#### **Primary Revenue Products**
- **AI Business Diagnostic**: `https://your-domain.vercel.app/products/ai-business-diagnostic`
- **Product Marketplace**: `https://your-domain.vercel.app/products`
- **OmniPanel Campaign**: `https://your-domain.vercel.app/omnipanel`

#### **API Endpoints**
- **Universal Checkout**: `https://your-domain.vercel.app/api/checkout`
- **OmniPanel Checkout**: `https://your-domain.vercel.app/api/stripe/checkout`
- **Stripe Webhook**: `https://your-domain.vercel.app/api/stripe/webhook`

### 7. Performance Optimization

#### **Automatic Optimizations**
- ✅ Next.js Image Optimization
- ✅ Code Splitting
- ✅ Static Generation
- ✅ Edge Functions
- ✅ CDN Distribution

#### **Expected Performance**
- **Lighthouse Score**: 90+ across all metrics
- **First Load**: < 3 seconds
- **Time to Interactive**: < 2 seconds

### 8. Monitoring & Analytics

#### **Built-in Features**
- Real-time analytics dashboard
- Revenue tracking
- Conversion monitoring
- Performance metrics

#### **Vercel Analytics** (Optional)
Enable in Vercel dashboard for additional insights:
- Page views
- User sessions
- Core Web Vitals
- Geographic distribution

### 9. Security Configuration

#### **Automatic Security Features**
- ✅ HTTPS/SSL encryption
- ✅ Security headers configured
- ✅ CORS protection
- ✅ Input validation
- ✅ Stripe webhook signature verification

### 10. Troubleshooting

#### **Common Issues**

**Build Failures:**
- Check TypeScript errors: `npm run type-check`
- Verify all imports are used
- Ensure environment variables are set

**Stripe Issues:**
- Verify webhook secret matches
- Check product IDs are correct
- Ensure test/live mode consistency

**Database Connection:**
- Verify NeonDB connection string format
- Check SSL mode is required
- Ensure database is accessible from Vercel

#### **Support Resources**
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [NeonDB Documentation](https://neon.tech/docs)

---

## 🎯 Revenue Targets

### **Immediate Launch Goals**
- **Week 1**: $2,500 (5 diagnostic reports)
- **Week 2**: $5,000 (10 diagnostic reports + audits)
- **Month 1**: $15,000 (30 diagnostic reports + 50 audits + 100 starter kits)

### **90-Day Projection**
- **Month 1**: $15,000
- **Month 2**: $35,000
- **Month 3**: $65,000
- **Total**: $115,000

---

## ✅ Deployment Complete

Once all steps are completed, your platform will be live and ready for immediate revenue generation. The infrastructure supports scaling to handle high traffic and transaction volumes.

**Estimated time to first sale**: 24-48 hours after deployment and marketing launch. 