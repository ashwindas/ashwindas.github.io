#!/bin/bash

# IMPORTANT: Do not push to GitHub without explicit permission from the repository owner
# This script runs tests locally but does not push any changes

# Color output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Detect if running in CI
IS_CI=false
if [ -n "$CI" ] || [ -n "$GITHUB_ACTIONS" ]; then
  IS_CI=true
  echo "Running in CI environment"
fi

# Handle arguments
HEADLESS=false
if [ "$1" == "--headless" ] || [ "$IS_CI" == "true" ]; then
  HEADLESS=true
fi

echo "Running automated tests for the website..."
echo -e "${YELLOW}Note: This is a static export, so some tests may require special handling for client-side interactions${NC}"
echo "Building for tests..."

# Build the website
npm run build

# Check if the build was successful
if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed! See errors above.${NC}"
  exit 1
fi

echo "Starting server for tests..."
# Use a different port for CI to avoid conflicts
PORT=8000
if [ "$IS_CI" == "true" ]; then
  PORT=8080
fi

npx serve out -p $PORT &
SERVER_PID=$!

echo "Waiting for server to start..."
sleep 5

# Set test status variable
TEST_STATUS=0

if [ "$HEADLESS" == "true" ]; then
  echo "Running tests in headless mode..."
  npx cypress run --config video=false
  TEST_STATUS=$?
else
  echo "Running tests in interactive mode..."
  npx cypress open
  TEST_STATUS=$?
fi

# Cleanup: Kill the server
echo "Stopping test server..."
kill $SERVER_PID 2>/dev/null

echo -e "${YELLOW}Note about tests:${NC}"
echo -e "1. Some interaction tests are specially modified for static exports"
echo -e "2. React hydration errors are ignored by the test configuration"
echo -e "3. Screenshots of failures can be found in cypress/screenshots/"
echo

# Determine exit status for CI
if [ "$IS_CI" == "true" ]; then
  if [ $TEST_STATUS -ne 0 ]; then
    echo -e "${RED}Tests failed in CI environment. Exiting with code 1.${NC}"
    exit 1
  else 
    echo -e "${GREEN}All tests passed in CI environment!${NC}"
  fi
fi

exit 0 