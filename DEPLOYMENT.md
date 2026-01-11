# Deployment Guide for Vercel

This guide will help you deploy the Madhesh Literature Festival 2026 website to Vercel.

## Prerequisites

1. A Vercel account (free tier is sufficient)
2. Git installed on your machine
3. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Option 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Prepare Your Repository

1. Initialize git (if not already done):
```bash
git init
```

2. Add all files:
```bash
git add .
```

3. Commit your changes:
```bash
git commit -m "Initial commit - Ready for deployment"
```

4. Create a GitHub repository and push:
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign up or log in with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project settings:
   - **Project Name:** `mlf-2026` (or your preferred name)
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

6. Click "Deploy"

### Step 3: Wait for Deployment

Vercel will:
- Install dependencies
- Build your project
- Deploy to a production URL

This usually takes 1-3 minutes.

### Step 4: Access Your Website

Once deployed, Vercel will provide you with:
- **Production URL:** `https://mlf-2026.vercel.app` (or similar)
- **Deployment Dashboard:** Monitor builds and analytics

## Option 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### Step 3: Deploy

Navigate to your project directory and run:

```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? **mlf-2026**
- In which directory is your code located? **/**

### Step 4: Deploy to Production

```bash
vercel --prod
```

## Post-Deployment Configuration

### Custom Domain (Optional)

1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update your DNS settings as instructed

### Environment Variables (If Needed)

If you add features requiring environment variables:

1. Go to Project Settings → Environment Variables
2. Add your variables (e.g., `VITE_API_URL`)
3. Redeploy for changes to take effect

### Automatic Deployments

Once connected to Git, Vercel will automatically:
- Deploy every push to the `main` branch (Production)
- Create preview deployments for pull requests
- Provide unique URLs for each deployment

## Testing Your Deployment

Visit your production URL and test:

1. ✅ Home page loads correctly
2. ✅ Navigation works
3. ✅ Speakers page with search and pagination
4. ✅ All images load
5. ✅ Responsive design on mobile
6. ✅ Smooth scrolling and animations

## Troubleshooting

### Build Fails

**Error:** `Module not found`
- **Solution:** Run `npm install` locally and commit `package-lock.json`

**Error:** `Build exceeded maximum duration`
- **Solution:** Optimize build by removing unused dependencies

### 404 Errors on Routes

**Problem:** `/speakers` shows 404
- **Solution:** The `vercel.json` file handles this with rewrites. Ensure it's committed.

### Slow Performance

1. Check Vercel Analytics for bottlenecks
2. Optimize images (use WebP format)
3. Enable Edge Functions if needed

## Continuous Deployment

Every time you push to your repository:

```bash
git add .
git commit -m "Update speakers section"
git push
```

Vercel automatically:
1. Detects the push
2. Builds the project
3. Deploys to production
4. Notifies you via email

## Monitoring

Access your deployment dashboard at:
```
https://vercel.com/<username>/mlf-2026
```

Monitor:
- Build logs
- Analytics
- Performance metrics
- Deployment history

## Rollback

If something goes wrong:

1. Go to Vercel Dashboard
2. Select "Deployments"
3. Find a previous successful deployment
4. Click "⋯" → "Promote to Production"

## Cost

- **Hobby Plan:** Free
  - Unlimited deployments
  - 100 GB bandwidth/month
  - Automatic HTTPS
  - Perfect for this project

- **Pro Plan:** $20/month (if you need more)
  - Higher limits
  - Team collaboration
  - Advanced analytics

## Support

- Vercel Docs: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions
- Status: https://www.vercel-status.com/

## Quick Commands Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs <deployment-url>

# Remove deployment
vercel rm <deployment-name>
```

---

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported and deployed
- [ ] Production URL works
- [ ] All routes accessible
- [ ] Mobile responsive
- [ ] Images loading
- [ ] No console errors
- [ ] Custom domain configured (optional)
- [ ] Automatic deployments enabled

Congratulations! Your MLF 2026 website is now live! 🎉
