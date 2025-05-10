#!/bin/bash

echo "Starting production test environment..."
echo "========================================"

# Clean up previous test builds
echo "Cleaning previous test builds..."
rm -rf out

# Set NODE_ENV to production to simulate production build
echo "Setting up production environment variables..."
export NODE_ENV=production

# Build the project with production settings
echo "Building production version..."
npm run build

# Check build status
if [ $? -ne 0 ]; then
  echo "❌ Build failed! Fix the issues before deploying to production."
  exit 1
fi

# Check for critical files in the output directory
echo "Checking for critical files in build output..."
if [ ! -f "out/index.html" ]; then
  echo "❌ Missing index.html in build output!"
  exit 1
fi

if [ ! -d "out/_next" ]; then
  echo "❌ Missing _next directory in build output!"
  exit 1
fi

# Test the production build with a static server
echo "Starting a local server to test the production build..."
echo "Visit http://localhost:3000 to test your production build"
echo "Press Ctrl+C to stop the server"

# Install serve if not present
if ! command -v npx serve &> /dev/null; then
  echo "Installing serve package..."
  npm install -g serve
fi

# Serve the output directory
npx serve -s out

echo "========================================"
echo "Production test completed successfully!" 