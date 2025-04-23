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
  // Add security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin'
          }
        ]
      }
    ]
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