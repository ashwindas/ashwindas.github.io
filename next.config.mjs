/** @type {import('next').NextConfig} */
const nextConfig = {
  // Always use static export for consistent behavior
  output: 'export',
  // Configure images for static export
  images: {
    unoptimized: true,
  },
  // Keep React strict mode enabled
  reactStrictMode: true,
  // Force SWC transforms for better stability
  experimental: {
    forceSwcTransforms: true,
  },
  // Set basePath and assetPrefix properly for GitHub Pages
  basePath: '',
  assetPrefix: '/',
  // Add trailing slash for consistent static export
  trailingSlash: true,
  // Increase timeout for builds
  staticPageGenerationTimeout: 180,
  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  }
}

export default nextConfig 