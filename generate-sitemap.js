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

console.log(colors.blue('Generating sitemap.xml...'));

// Base URL of your website
const BASE_URL = 'https://ashwindas.github.io';

// Main pages to include in sitemap
const pages = [
  '',  // Home page
  '#about',
  '#experience',
  '#photography',
  '#conferences',
  '#hackathons'
];

// Current date in ISO format for lastmod
const currentDate = new Date().toISOString();

// Generate sitemap XML content
const generateSitemapXML = () => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  pages.forEach(page => {
    const url = page ? `${BASE_URL}/${page}` : BASE_URL;
    
    xml += '  <url>\n';
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>1.0</priority>\n';
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};

// Write the sitemap to public directory
try {
  const sitemapContent = generateSitemapXML();
  const publicDir = path.join(process.cwd(), 'public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapContent);
  
  console.log(colors.green(`✅ Sitemap generated successfully at: ${sitemapPath}`));
} catch (error) {
  console.error(colors.red(`Error generating sitemap: ${error.message}`));
  process.exit(1);
}

// Update package.json script
try {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    if (!packageJson.scripts.sitemap) {
      packageJson.scripts.sitemap = 'node generate-sitemap.js';
      packageJson.scripts.build = 'npm run sitemap && next build';
      
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log(colors.green('✅ Added sitemap script to package.json'));
    }
  }
} catch (error) {
  console.error(colors.yellow(`Warning: Could not update package.json: ${error.message}`));
} 