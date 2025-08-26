# CERTI Website Deployment Guide - Cloudflare Pages

## Prerequisites
- ✅ Next.js project built successfully (`npm run build`)
- ✅ Cloudflare account (free tier available)
- ✅ Git repository (GitHub, GitLab, or Bitbucket)

## Method 1: Deploy via Cloudflare Dashboard (Recommended)

### Step 1: Access Cloudflare Dashboard
1. Go to [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. Sign in to your Cloudflare account
3. Click on "Pages" in the left sidebar

### Step 2: Create New Project
1. Click "Create a project"
2. Choose "Connect to Git" (if you have a Git repo) or "Direct Upload"
3. If using Git:
   - Connect your GitHub/GitLab/Bitbucket account
   - Select your `certi-website` repository
   - Choose the branch (usually `main` or `master`)

### Step 3: Configure Build Settings
1. **Project name**: `certi-website` (or your preferred name)
2. **Production branch**: `main` (or your default branch)
3. **Framework preset**: `Next.js`
4. **Build command**: `npm run build`
5. **Build output directory**: `.next`
6. **Root directory**: Leave empty (or `/` if your project is in a subdirectory)

### Step 4: Environment Variables (if needed)
- Add any environment variables your app requires
- For now, you can leave this empty

### Step 5: Deploy
1. Click "Save and Deploy"
2. Wait for the build to complete (usually 2-5 minutes)
3. Your site will be available at: `https://your-project-name.pages.dev`

## Method 2: Deploy via Wrangler CLI (Alternative)

### Step 1: Get Cloudflare API Token
1. Go to [https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use "Custom token" template
4. Add these permissions:
   - Account: Cloudflare Pages:Edit
   - Zone: Cloudflare Pages:Edit
5. Copy the token

### Step 2: Set Environment Variables
```bash
# Set your Cloudflare account ID
$env:CLOUDFLARE_ACCOUNT_ID="your-account-id"

# Set your API token
$env:CLOUDFLARE_API_TOKEN="your-api-token"
```

### Step 3: Deploy
```bash
wrangler pages deploy .next --project-name=certi-website
```

## Method 3: Direct Upload (Simplest)

### Step 1: Build and Prepare
1. Run `npm run build` (already done)
2. The build output is in `.next` directory

### Step 2: Upload via Dashboard
1. In Cloudflare Pages, choose "Direct Upload"
2. Drag and drop your `.next` folder contents
3. Set project name and deploy

## Post-Deployment

### Custom Domain (Optional)
1. In your Pages project, go to "Custom domains"
2. Add your domain (e.g., `certi.com`)
3. Update DNS records as instructed

### Environment Variables
- Add any API keys or configuration needed
- Redeploy after adding variables

### Monitoring
- Check "Analytics" tab for visitor stats
- Monitor "Functions" tab for any serverless functions
- Check "Deployments" for build history

## Troubleshooting

### Build Failures
- Check build logs in the dashboard
- Verify all dependencies are in `package.json`
- Ensure TypeScript compilation passes

### Runtime Errors
- Check browser console for client-side errors
- Verify all static assets are properly exported
- Check for any server-side code that won't work in static export

### Performance
- Enable Cloudflare's CDN features
- Use Cloudflare's image optimization
- Enable Brotli compression

## Support
- Cloudflare Pages Documentation: [https://developers.cloudflare.com/pages](https://developers.cloudflare.com/pages)
- Cloudflare Community: [https://community.cloudflare.com](https://community.cloudflare.com)

---

**Your website is now ready for deployment! Choose Method 1 (Dashboard) for the easiest experience.**
