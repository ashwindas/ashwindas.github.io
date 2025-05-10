# Website Deployment Guide

This guide explains how to safely deploy updates to the website hosted on GitHub Pages.

## Deployment Tools

We've created several tools to ensure safe and reliable deployments:

1. **verify-prod-compatibility.js**: Checks for common configuration issues that might cause production failures
2. **test-production.sh**: Builds and serves the site locally to test it in a production-like environment
3. **deploy.sh**: Builds the site for production (includes compatibility checks)
4. **safe-deploy.sh**: A comprehensive workflow that tests, builds, and deploys the site with safety checks

## Recommended Deployment Workflow

For the safest deployment process, follow these steps:

1. Make your changes to the website code
2. Run compatibility checks: `node verify-prod-compatibility.js`
3. Test locally in development mode: `npm run dev`
4. Test in a production-like environment: `./test-production.sh`
5. When confident, use the all-in-one deployment script: `./safe-deploy.sh`

The `safe-deploy.sh` script will:
- Run compatibility checks
- Build the site for production
- Start a local server to verify the production build
- Commit and push changes to the main branch
- Deploy to GitHub Pages

## Manual Deployment (If Needed)

If you need to deploy manually:

```bash
# 1. Build the site
./deploy.sh

# 2. Commit the changes
git add .
git commit -m "Your commit message"
git push origin main

# 3. Deploy to GitHub Pages
git push origin `git subtree split --prefix out main`:gh-pages --force
```

## Troubleshooting Common Issues

If you encounter issues during deployment:

1. **404 Errors for Assets**: Check for correct `basePath` and `assetPrefix` in `next.config.mjs`
2. **Broken Links**: Ensure all internal links use relative paths
3. **Missing Images**: Verify image paths and make sure `unoptimized: true` is set in `next.config.mjs`
4. **Custom Domain Issues**: Check the CNAME file in the output directory

## Testing After Deployment

After deploying, always check:
1. Home page loads correctly
2. Internal navigation works
3. Images and assets load properly
4. External links open correctly
5. The site works on mobile devices 