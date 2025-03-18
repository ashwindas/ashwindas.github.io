#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting development environment...${NC}"

# Kill any existing Next.js processes
echo -e "${YELLOW}Cleaning up any existing Next.js processes...${NC}"
pkill -f "next dev" || true

# Clean previous development artifacts
echo -e "${YELLOW}Cleaning cache files...${NC}"
rm -rf .next node_modules/.cache

# Check for favicon
if [ ! -f "public/favicon.ico" ]; then
  echo -e "${RED}Warning: favicon.ico not found in public directory!${NC}"
  echo -e "${YELLOW}Please make sure favicon.ico is in the public directory.${NC}"
  exit 1
fi

# Start the development server with clean environment
echo -e "${YELLOW}Starting Next.js development server...${NC}"
NODE_ENV=development NEXT_TELEMETRY_DISABLED=1 npm run dev

echo -e "${GREEN}Development server stopped.${NC}" 