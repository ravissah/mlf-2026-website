# 🚀 Quick Deploy to Vercel - 5 Minutes

## Prerequisites
- GitHub account
- Vercel account (free) - sign up at [vercel.com](https://vercel.com)

## Method 1: Via Vercel Dashboard (Easiest - 5 minutes)

### Step 1: Create GitHub Repository (2 min)

1. **Initialize Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: MLF 2026 website ready for deployment"
   ```

2. **Create repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `mlf-2026-website`
   - Set to Public or Private
   - **Don't** initialize with README
   - Click "Create repository"

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/mlf-2026-website.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Vercel (3 min)

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"

2. **Import Project:**
   - Click "New Project"
   - Find your `mlf-2026-website` repository
   - Click "Import"

3. **Configure (Auto-detected):**
   - **Framework Preset:** Vite (auto-detected)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes

5. **Done! 🎉**
   - Your site is live at: `https://mlf-2026-website.vercel.app`

---

## Method 2: Via CLI (Fastest for developers)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

**Done!** Your site is live.

---

## What Happens During Deployment?

1. ✅ Vercel clones your repository
2. ✅ Installs dependencies (`npm install`)
3. ✅ Builds your project (`npm run build`)
4. ✅ Deploys to global CDN
5. ✅ Provides production URL
6. ✅ Enables automatic deployments

---

## After Deployment

### Test Your Site
Visit these URLs on your deployed site:
- ✅ Home: `https://your-site.vercel.app/`
- ✅ Speakers: `https://your-site.vercel.app/speakers`

### Test These Features:
- [ ] Navigation works
- [ ] Speakers search works
- [ ] Pagination works
- [ ] Mobile responsive
- [ ] All images load
- [ ] No console errors

---

## Automatic Deployments

Every time you push code:

```bash
git add .
git commit -m "Update content"
git push
```

Vercel automatically:
- Builds your changes
- Deploys to production
- Notifies you via email

---

## Custom Domain (Optional)

1. Go to your project on Vercel
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `madheshlitfest.com`)
4. Update DNS records as instructed
5. Done! SSL certificate is automatic

---

## Troubleshooting

### Build Fails?
```bash
# Test build locally first
npm run build

# If it works locally, check Vercel build logs
```

### 404 on /speakers?
- The `vercel.json` file handles this
- Make sure it's committed to Git

### Need Help?
- Check `DEPLOYMENT.md` for detailed guide
- Visit Vercel dashboard for build logs
- Check Vercel docs: https://vercel.com/docs

---

## Quick Commands Reference

```bash
# Build locally
npm run build

# Preview build locally
npm run preview

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# View deployments
vercel ls

# Open project in browser
vercel open
```

---

## 🎯 Expected Result

After deployment, you'll have:

- ✅ **URL:** `https://mlf-2026-website.vercel.app`
- ✅ **Speed:** Fast global CDN
- ✅ **SSL:** Automatic HTTPS
- ✅ **Updates:** Auto-deploy on push
- ✅ **Cost:** $0 (Free tier)

---

## Success! 🎉

Your Madhesh Literature Festival 2026 website is now:
- ✅ Live on the internet
- ✅ Accessible worldwide
- ✅ Fast and responsive
- ✅ Automatically updated on push
- ✅ Secured with HTTPS

**Share your URL with the world!**

---

## Next Steps

1. **Share the URL** with your team
2. **Test thoroughly** on different devices
3. **Monitor** via Vercel dashboard
4. **Update content** as needed
5. **Add custom domain** (optional)
6. **Enable analytics** (optional)

---

**Need detailed instructions? See `DEPLOYMENT.md`**

**Happy deploying! 🚀**
