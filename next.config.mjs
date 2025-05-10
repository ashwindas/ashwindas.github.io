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
  // No basePath or assetPrefix needed when using custom domain
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