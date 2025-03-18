# Ashwin Das Gururaja - Personal Website

This is a personal portfolio website built with Next.js, Tailwind CSS, DaisyUI, and TypeScript. It features a modern, responsive design with dark/light mode support.

## Features

- **Modern Design**: Clean, responsive layout with DaisyUI components
- **Dark/Light Mode**: Toggle between dark and light themes
- **Smooth Scrolling**: Easy navigation between sections
- **Responsive**: Optimized for all screen sizes
- **SEO-friendly**: Proper metadata and semantic HTML
- **TypeScript**: Type-safe codebase
- **Optimized Images**: Using Next.js Image component
- **Security**: Content Security Policy (CSP) via meta tags
- **Privacy**: Includes a privacy policy page

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ashwindas/ashwindas.github.io.git
   cd ashwindas.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Automatic Deployment (GitHub Actions)

The website is configured for GitHub Pages deployment using GitHub Actions. When you push to the main branch, it will automatically build and deploy the site.

### Manual Deployment

You can also deploy the site manually using the provided deployment script:

1. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

2. This will create a production build in the `out` directory and provide instructions for pushing to GitHub Pages.

3. Follow the instructions printed by the script to push to the `gh-pages` branch.

### Static Export Configuration

This project is configured for static export (no server-side rendering), making it compatible with GitHub Pages and other static hosting providers. The build process:

- Generates static HTML, CSS, and JavaScript files
- Creates a complete, self-contained website in the `out` directory
- Includes necessary files like `.nojekyll` to ensure proper GitHub Pages deployment

### Static Assets and Favicon

All static assets should be placed in the `public` directory, including:
- favicon.ico (must be in public directory, not in src/app)
- images
- robots.txt
- sitemap.xml

The favicon is linked explicitly in the HTML head and specified in the metadata for cross-browser compatibility.

### Security Features

- All traffic is enforced to use HTTPS via:
  - Strict-Transport-Security header (HSTS)
  - Content Security Policy with upgrade-insecure-requests directive
  - HTTPS-only resource loading
- Content Security Policy protects against XSS attacks
- X-Content-Type-Options prevents MIME type sniffing

## Project Structure

- `/src/app`: Main application code, including pages and layouts
- `/src/components`: Reusable React components
- `/public/images`: Static images, including profile pictures
- `/public`: Other static assets like favicon.ico, robots.txt, sitemap.xml, and the privacy policy
- `/.github/workflows`: GitHub Actions workflows for deployment (if configured)

## Customization

- Update personal information in `src/app/page.tsx`
- Add or modify sections as needed
- Replace the profile image at `public/images/headshot.jpg`
- Customize colors and theme in `tailwind.config.js`
- Update the DaisyUI theme in `tailwind.config.js`

## Security and Privacy

- Content Security Policy (CSP) is implemented via meta tags
  - Development mode includes `unsafe-eval` for Next.js hot reloading
  - Production mode uses stricter CSP without `unsafe-eval`
- Security headers like X-Content-Type-Options are included
- HTTPS is enforced with HSTS headers
- A privacy policy is available at `/privacy.html`

## Troubleshooting

### Common Issues

- **CSP Errors**: If you see Content Security Policy errors in the console, the CSP is likely blocking necessary scripts. The site automatically adapts CSP for development vs. production.
- **Static Export Errors**: Make sure all pages are compatible with static export (no server-side only features).
- **404 Page**: A custom 404 page is included for better user experience when pages aren't found.
- **Favicon Issues**: Make sure favicon.ico is placed in the public directory, not in src/app. This is essential for proper static exports.

## License

This project is open source and available under the [MIT License](LICENSE).
