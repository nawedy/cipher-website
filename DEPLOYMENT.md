# Cipher Intelligence Platform - Deployment Guide

## 🚀 Vercel Deployment Setup

### Prerequisites
- GitHub repository with latest code
- Vercel account connected to GitHub
- NeonDB database configured
- Stripe account with products created

### 1. Environment Variables Setup

Copy the following environment variables to your Vercel project settings:

```bash
# Database Configuration
DATABASE_URL=your_neon_database_url

# Stripe Configuration (from new-env-variables.txt)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Application Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NODE_ENV=production
```

### 2. Vercel Project Configuration

1. **Import Project**: Connect your GitHub repository to Vercel
2. **Framework Preset**: Next.js (auto-detected)
3. **Build Settings**: 
   - Build Command: `npm run build`
   - Output Directory: `.next` (default)
   - Install Command: `npm install`
4. **Node.js Version**: 18.x (recommended)

### 3. Domain Configuration

1. **Custom Domain**: Add your custom domain in Vercel dashboard
2. **SSL**: Automatically configured by Vercel
3. **Redirects**: Configure in `vercel.json` if needed

### 4. Database Migration

Ensure your NeonDB database has the latest schema:

```sql
-- Run any pending migrations
-- Tables should already be created from previous setup
```

### 5. Stripe Webhook Configuration

1. **Webhook Endpoint**: `https://your-domain.vercel.app/api/stripe/webhook`
2. **Events to Listen**: 
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
3. **Webhook Secret**: Add to environment variables

### 6. Post-Deployment Checklist

- [ ] Test homepage loads correctly
- [ ] Test product pages load
- [ ] Test Stripe checkout flow
- [ ] Verify webhook endpoints respond
- [ ] Check database connections
- [ ] Test mobile responsiveness
- [ ] Verify SSL certificate

### 7. Performance Optimization

The project includes:
- ✅ Next.js App Router
- ✅ Turbopack for development
- ✅ Image optimization
- ✅ Code splitting
- ✅ Static generation where possible
- ✅ API route optimization

### 8. Monitoring & Analytics

Consider adding:
- Vercel Analytics
- Error tracking (Sentry)
- Performance monitoring
- User analytics

### 9. Production Environment Variables

**Required for Production:**

```bash
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=https://your-production-domain.com
NODE_ENV=production
```

### 10. Deployment Commands

```bash
# Local testing before deployment
npm run build
npm run start

# Type checking
npm run type-check

# Linting
npm run lint
```

### 11. Troubleshooting

**Common Issues:**
- **Build Failures**: Check TypeScript errors with `npm run type-check`
- **Environment Variables**: Ensure all required vars are set in Vercel
- **Database Connection**: Verify DATABASE_URL format and permissions
- **Stripe Issues**: Check webhook endpoint and secret key

**Support:**
- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- NeonDB Documentation: https://neon.tech/docs

---

## 🎯 Revenue Products Ready for Launch

The following products are configured and ready for immediate sales:

1. **AI Business Diagnostic Report**
   - Standard: $497 (was $2,500)
   - Premium: $997 (was $5,000)

2. **Website Conversion Audit**
   - Price: $197 (was $500)
   - Delivery: 24 hours

3. **AI Implementation Starter Kits**
   - Price: $97 (was $297)
   - Instant download

**Projected Revenue**: $115,000 in 90 days

---

*Last Updated: January 2025* 