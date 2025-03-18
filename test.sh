#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Running automated tests for the website...${NC}"

# Check for argument to run in headless mode
HEADLESS=false
if [ "$1" == "--headless" ]; then
  HEADLESS=true
fi

# Clean previous builds
echo -e "${YELLOW}Building for tests...${NC}"
npm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed! See errors above.${NC}"
  exit 1
fi

# Run tests
if [ "$HEADLESS" = true ]; then
  echo -e "${YELLOW}Running tests in headless mode...${NC}"
  npm run cypress:headless
else
  echo -e "${YELLOW}Opening Cypress test runner...${NC}"
  npm run cypress
fi

if [ $? -ne 0 ]; then
  echo -e "${RED}Tests failed! See error details above.${NC}"
  exit 1
else
  echo -e "${GREEN}All tests completed successfully!${NC}"
fi 