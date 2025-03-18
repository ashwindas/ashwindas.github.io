/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  // Configure images for static export
  images: {
    unoptimized: true,
  },
  // Keep React strict mode enabled but turn off during development for easier debugging
  reactStrictMode: process.env.NODE_ENV === 'production',
  // Force SWC transforms for better stability
  experimental: {
    forceSwcTransforms: true,
  },
  // Properly format the basePath for GitHub Pages (empty for local development)
  basePath: '',
  // Development indicators configuration
  devIndicators: {
    position: 'bottom-right',
  },
  // Ensure webpack fast refresh is enabled
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Improve hot module replacement in development
      config.optimization.moduleIds = 'named';
    }
    return config;
  },
  // Increase timeout for development builds
  staticPageGenerationTimeout: 180,
  // Disable the build ID to ensure consistent file names
  generateBuildId: () => 'build',
}

export default nextConfig 