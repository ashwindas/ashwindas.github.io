#!/bin/bash

# Define colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE}     SAFE DEPLOYMENT WORKFLOW     ${NC}"
echo -e "${BLUE}=======================================${NC}"

# Step 1: Compatibility checks
echo -e "\n${YELLOW}Step 1: Running compatibility checks...${NC}"
node verify-prod-compatibility.js

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Compatibility checks failed! Fix the issues before deploying.${NC}"
  exit 1
else
  echo -e "${GREEN}✅ Compatibility checks passed!${NC}"
fi

# Step 1.5: Generate sitemap
echo -e "\n${YELLOW}Step 1.5: Generating sitemap...${NC}"
node generate-sitemap.js

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Sitemap generation failed! Fix the issues before deploying.${NC}"
  exit 1
else
  echo -e "${GREEN}✅ Sitemap generated successfully!${NC}"
fi

# Step 2: Build for production
echo -e "\n${YELLOW}Step 2: Building for production...${NC}"
./deploy.sh

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Build failed! See errors above.${NC}"
  exit 1
else 
  echo -e "${GREEN}✅ Build successful!${NC}"
fi

# Step 3: Test the production build locally
echo -e "\n${YELLOW}Step 3: Testing production build locally...${NC}"
echo -e "${YELLOW}Starting local server to test production build...${NC}"
echo -e "${YELLOW}Press Ctrl+C after testing to continue with deployment${NC}"

# Start server in background
npx serve -s out &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Open browser (works on macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
  open http://localhost:3000
  echo -e "${YELLOW}Browser opened to http://localhost:3000${NC}"
else 
  echo -e "${YELLOW}Please open http://localhost:3000 in your browser${NC}"
fi

echo -e "${YELLOW}Press Enter when you've verified the site works correctly...${NC}"
read -p ""

# Kill the server
kill $SERVER_PID

# Step 4: Commit changes
echo -e "\n${YELLOW}Step 4: Committing changes...${NC}"
echo -e "${YELLOW}Enter commit message (or press Enter for default): ${NC}"
read COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
  COMMIT_MSG="Update site content and build"
fi

git add .
git commit -m "$COMMIT_MSG"

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Git commit failed! Check for issues.${NC}"
  exit 1
else
  echo -e "${GREEN}✅ Changes committed successfully!${NC}"
fi

# Step 5: Push to main branch
echo -e "\n${YELLOW}Step 5: Pushing to main branch...${NC}"
git push origin main

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Push to main branch failed!${NC}"
  exit 1
else
  echo -e "${GREEN}✅ Changes pushed to main branch!${NC}"
fi

# Step 6: Deploy to GitHub Pages
echo -e "\n${YELLOW}Step 6: Deploying to GitHub Pages...${NC}"
echo -e "${RED}Are you sure you want to deploy to GitHub Pages? (y/n)${NC}"
read CONFIRM

if [ "$CONFIRM" != "y" ]; then
  echo -e "${YELLOW}Deployment canceled.${NC}"
  exit 0
fi

git push origin `git subtree split --prefix out main`:gh-pages --force

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Deployment to GitHub Pages failed!${NC}"
  exit 1
else
  echo -e "${GREEN}✅ Deployment to GitHub Pages successful!${NC}"
fi

echo -e "\n${GREEN}=======================================${NC}"
echo -e "${GREEN}   DEPLOYMENT COMPLETED SUCCESSFULLY   ${NC}"
echo -e "${GREEN}=======================================${NC}"
echo -e "${YELLOW}Your site should be live at: https://ashwindas.com${NC}" 