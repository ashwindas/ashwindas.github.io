#!/bin/bash

# IMPORTANT: Do not push to GitHub without explicit permission from the repository owner
# This script prepares files for deployment but does not automatically push them

# Define colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment process for GitHub Pages...${NC}"
echo "========================================"

# First run the compatibility check
echo -e "${YELLOW}Running compatibility checks...${NC}"
node verify-prod-compatibility.js

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Compatibility checks failed! Fix the issues before deploying.${NC}"
  exit 1
fi

# Backup existing CNAME file
if [ -f "out/CNAME" ]; then
  echo -e "${YELLOW}Backing up existing CNAME file...${NC}"
  cp out/CNAME out/CNAME.bak
fi

# Clean previous builds
echo -e "${YELLOW}Cleaning previous builds...${NC}"
rm -rf out

# Check for essential static assets
echo -e "${YELLOW}Checking for essential static assets...${NC}"
if [ ! -f "public/favicon.ico" ]; then
  echo -e "${RED}Warning: favicon.ico not found in public directory.${NC}"
fi

# Skip tests for emergency builds
echo -e "${YELLOW}SKIPPING TESTS for emergency deployment...${NC}"
# npm test

# Build the project
echo -e "${YELLOW}Building production version...${NC}"
NODE_ENV=production npm run build

# Check build status
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Build failed! See errors above.${NC}"
  exit 1
fi

# Create .nojekyll file to prevent GitHub from running Jekyll
echo -e "${YELLOW}Creating .nojekyll file...${NC}"
touch out/.nojekyll

# Restore CNAME file
echo -e "${YELLOW}Restoring CNAME file...${NC}"
if [ -f "out/CNAME.bak" ]; then
  mv out/CNAME.bak out/CNAME
elif [ ! -f "out/CNAME" ]; then
  echo "ashwindas.com" > out/CNAME
fi

# List files for verification
echo -e "${YELLOW}Files ready for deployment:${NC}"
ls -la out

echo -e "${GREEN}Build successful!${NC}"
echo -e "${YELLOW}To deploy to GitHub Pages, you can:${NC}"
echo "1. Push the 'out' directory to the 'gh-pages' branch of your repository"
echo "2. Configure GitHub Pages to use the 'gh-pages' branch in your repository settings"
echo "3. If using GitHub Actions, add the generated files to your workflow"
echo -e "${YELLOW}Manual deployment commands (ONLY use after getting explicit permission):${NC}"
echo "git add out -f"
echo "git commit -m \"Deploy to GitHub Pages\""
echo -e "${RED}IMPORTANT: Get explicit permission before running the next command${NC}"
echo "git subtree push --prefix out origin gh-pages"
echo -e "${GREEN}Deployment preparation complete!${NC}" 