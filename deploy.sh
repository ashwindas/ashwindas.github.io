#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment process for GitHub Pages...${NC}"

# Save current CNAME if it exists
if [ -f "out/CNAME" ]; then
  echo -e "${YELLOW}Backing up existing CNAME file...${NC}"
  cp out/CNAME /tmp/CNAME_backup
fi

# Clean previous builds
echo -e "${YELLOW}Cleaning previous builds...${NC}"
rm -rf .next out

# Make sure the public directory has all required static assets
echo -e "${YELLOW}Checking for essential static assets...${NC}"
if [ ! -f "public/favicon.ico" ]; then
  echo -e "${RED}Warning: favicon.ico not found in public directory!${NC}"
  echo -e "${YELLOW}If you have a favicon in src/app, please move it to the public directory.${NC}"
  exit 1
fi

# Run production build
echo -e "${YELLOW}Building production version...${NC}"
NODE_ENV=production npm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed! See errors above.${NC}"
  exit 1
fi

# Ensure .nojekyll file exists to bypass Jekyll processing on GitHub Pages
echo -e "${YELLOW}Creating .nojekyll file...${NC}"
touch out/.nojekyll

# Restore CNAME if backup exists or create from settings
if [ -f "/tmp/CNAME_backup" ]; then
  echo -e "${YELLOW}Restoring CNAME file...${NC}"
  cp /tmp/CNAME_backup out/CNAME
  rm /tmp/CNAME_backup
elif [ -f "public/CNAME" ]; then
  echo -e "${YELLOW}Using CNAME from public directory...${NC}"
  cp public/CNAME out/CNAME
else
  # Check if custom domain is set in repo settings via GitHub CLI if available
  if command -v gh &> /dev/null; then
    echo -e "${YELLOW}Checking for custom domain in repository settings...${NC}"
    CUSTOM_DOMAIN=$(gh api repos/:owner/:repo/pages | grep -o '"cname":"[^"]*"' | sed 's/"cname":"//;s/"//')
    if [ ! -z "$CUSTOM_DOMAIN" ]; then
      echo -e "${YELLOW}Found custom domain: ${CUSTOM_DOMAIN}${NC}"
      echo "$CUSTOM_DOMAIN" > out/CNAME
    fi
  else
    echo -e "${YELLOW}No CNAME found. If using a custom domain, uncomment and update:${NC}"
    echo -e "${YELLOW}# echo \"yourdomain.com\" > out/CNAME${NC}"
  fi
fi

# For demonstration purposes, list the files in the out directory
echo -e "${YELLOW}Files ready for deployment:${NC}"
ls -la out

echo -e "${GREEN}Build successful!${NC}"
echo -e "${YELLOW}To deploy to GitHub Pages, you can:${NC}"
echo -e "1. Push the 'out' directory to the 'gh-pages' branch of your repository"
echo -e "2. Configure GitHub Pages to use the 'gh-pages' branch in your repository settings"
echo -e "3. If using GitHub Actions, add the generated files to your workflow"

# Instructions for deploying manually
echo -e "${YELLOW}Manual deployment commands:${NC}"
echo -e "git add out -f"
echo -e "git commit -m \"Deploy to GitHub Pages\""
echo -e "git subtree push --prefix out origin gh-pages"

echo -e "${GREEN}Deployment preparation complete!${NC}" 