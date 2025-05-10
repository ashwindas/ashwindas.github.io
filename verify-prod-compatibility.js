#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple color functions
const colors = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`
};

console.log(colors.blue('Running production compatibility checks...'));

// Check next.config.mjs configuration
const checkNextConfig = () => {
  try {
    const configPath = path.join(process.cwd(), 'next.config.mjs');
    if (!fs.existsSync(configPath)) {
      console.log(colors.red('❌ next.config.mjs file not found!'));
      return false;
    }

    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // Check for common issues
    const issues = [];
    
    if (!configContent.includes("output:") || !configContent.includes("'export'")) {
      issues.push('output is not set to "export" for static site generation');
    }
    
    if (!configContent.includes("unoptimized: true") && configContent.includes("images:")) {
      issues.push('Image optimization not disabled for static export (should set unoptimized: true)');
    }
    
    if (issues.length === 0) {
      console.log(colors.green('✅ next.config.mjs configuration looks good!'));
      return true;
    } else {
      console.log(colors.red('❌ Issues found in next.config.mjs:'));
      issues.forEach(issue => console.log(colors.yellow(`  - ${issue}`)));
      return false;
    }
  } catch (error) {
    console.error(colors.red(`Error checking next.config.mjs: ${error.message}`));
    return false;
  }
};

// Check for absolute paths in source files
const checkAbsolutePaths = () => {
  try {
    const srcDir = path.join(process.cwd(), 'src');
    if (!fs.existsSync(srcDir)) {
      console.log(colors.red('❌ src directory not found!'));
      return false;
    }
    
    const issues = [];
    
    // Define safe paths that shouldn't trigger warnings
    const safePaths = [
      'href="/"',
      'href="/images',
      'href="/favicon.ico"',
      'href="/privacy.html"',
      'href="/theme-helper.js"',
      'src="/"',
      'src="/images',
      'src="/favicon.ico"',
      'src="/theme-helper.js"'
    ];
    
    // Function to check if a path is safe
    const isPathSafe = (content, pattern) => {
      return safePaths.some(safePath => content.includes(safePath));
    };
    
    // Function to recursively scan files
    const scanDir = (dir) => {
      const files = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const file of files) {
        const filePath = path.join(dir, file.name);
        
        if (file.isDirectory()) {
          scanDir(filePath);
        } else if (file.name.endsWith('.js') || file.name.endsWith('.jsx') || file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
          const content = fs.readFileSync(filePath, 'utf8');
          
          // Check for absolute URLs that might cause issues
          if (content.includes("href='/") && !content.includes("href='/'") && !content.includes("href='/images") && 
              !content.includes("href='/favicon.ico'") && !content.includes("href='/privacy.html'")) {
            issues.push(`${filePath}: Contains absolute URL paths (href='/...') that might break in production`);
          }
          
          if (content.includes('src="/') && !content.includes('src="/"') && !content.includes('src="/images') && 
              !content.includes('src="/favicon.ico"') && !content.includes('src="/theme-helper.js"')) {
            issues.push(`${filePath}: Contains absolute URL paths (src="/...") that might break in production`);
          }
        }
      }
    };
    
    scanDir(srcDir);
    
    if (issues.length === 0) {
      console.log(colors.green('✅ No problematic absolute paths found in source files!'));
      return true;
    } else {
      console.log(colors.red('❌ Potential issues with absolute paths:'));
      issues.forEach(issue => console.log(colors.yellow(`  - ${issue}`)));
      return false;
    }
  } catch (error) {
    console.error(colors.red(`Error checking for absolute paths: ${error.message}`));
    return false;
  }
};

// Run checks
const nextConfigOk = checkNextConfig();
const absolutePathsOk = checkAbsolutePaths();

if (nextConfigOk && absolutePathsOk) {
  console.log(colors.green('✅ All production compatibility checks passed!'));
  process.exit(0);
} else {
  console.log(colors.red('❌ Some production compatibility checks failed. Fix the issues before deploying.'));
  process.exit(1);
} 