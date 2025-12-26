# Deployment Guide - Sebiche Portfolio

## Prerequisites
- GitHub account
- Vercel account (free tier is fine)
- Formspree account (free tier)

## Step 1: Formspree Setup

1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account
3. Create a new form called "Portfolio Contact"
4. Copy the endpoint URL (looks like `https://formspree.io/f/xABCDEFG`)
5. Save this for Step 3

## Step 2: Push to GitHub

```bash
# Make sure all changes are committed
git add -A
git commit -m "feat: complete portfolio transformation"

# Push to GitHub
git push origin feat/app-router-migration

# Create pull request and merge to main
# Or push directly to main:
git checkout main
git merge feat/app-router-migration
git push origin main
```

## Step 3: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to [https://vercel.com/](https://vercel.com/)
2. Click "Add New Project"
3. Import your GitHub repository `soysebiche/sebiche`
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add: `NEXT_PUBLIC_FORMSPREE_ENDPOINT` = `YOUR_FORMSPREE_URL`

6. Click "Deploy"

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variable
vercel env add NEXT_PUBLIC_FORMSPREE_ENDPOINT

# Deploy to production
vercel --prod
```

## Step 4: Post-Deployment

### 1. Update Formspree Settings
- Go to your Formspree form settings
- Add your Vercel domain to "Allowed Domains"
- Example: `sebiche.vercel.app`

### 2. Test Contact Form
- Visit your deployed site
- Fill out contact form
- Check Formspree dashboard for submission

### 3. Configure Custom Domain (Optional)
In Vercel dashboard:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### 4. Enable Analytics
Vercel Analytics is automatically enabled.
Check dashboard for metrics after 24 hours.

## Step 5: Replace Placeholder Logos

### Current Placeholders
- `/public/logos/linio.svg` - placeholder
- `/public/logos/liverpool.svg` - placeholder

### To Replace:
1. Get high-resolution logos from companies
2. Convert to SVG or WebP format
3. Replace files in `/public/logos/`
4. Commit and push:
   ```bash
   git add public/logos/
   git commit -m "feat: add real company logos"
   git push
   ```

## Step 6: SEO Configuration

### Google Search Console
1. Go to [https://search.google.com/search-console](https://search.google.com/search-console)
2. Add your property (domain or URL prefix)
3. Verify ownership (use HTML tag method)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### Update Metadata
In `app/layout.tsx`, update:
- `verification.google` with your verification code
- `openGraph.url` with your actual domain
- `twitter.images` with your actual OG image

## Monitoring

### Vercel Analytics
- Automatic page view tracking
- Real-time visitor data
- No configuration needed

### Formspree
- Email notifications for new submissions
- Spam filtering included
- Export submissions as CSV

### Lighthouse
Run regular audits:
```bash
npm run build
npx lighthouse https://yourdomain.com --view
```

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies in `package.json`
- Test build locally: `npm run build`

### Contact Form Not Working
- Verify Formspree endpoint in environment variables
- Check Formspree dashboard for errors
- Verify domain is allowed in Formspree settings

### Images Not Loading
- Check file paths are correct
- Verify images exist in `/public` directory
- Check Next.js image optimization settings

## Performance Optimization

### After Deployment
1. Run Lighthouse audit
2. Check Core Web Vitals in Vercel Analytics
3. Optimize images if needed
4. Monitor bundle size

### Target Metrics
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## Maintenance

### Regular Updates
```bash
# Update dependencies monthly
npm update

# Check for security issues
npm audit

# Test after updates
npm run build
npm run dev
```

### Content Updates
- Case studies: Edit files in `/app/case-studies/`
- Homepage: Edit `/app/page.tsx`
- Metadata: Edit `/app/layout.tsx`

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review Next.js documentation
3. Check Formspree status page
4. Review this guide

---

**Deployment Checklist:**
- [ ] Formspree account created
- [ ] Form endpoint configured
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] Site deployed successfully
- [ ] Contact form tested
- [ ] Custom domain configured (optional)
- [ ] Google Search Console verified
- [ ] Real logos uploaded
- [ ] Lighthouse audit passed

**Estimated Time:** 30-45 minutes
