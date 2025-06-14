// next.config.js
// Next.js configuration for Cipher Intelligence platform with performance optimizations

/** @type {import('next').NextConfig} */
const nextConfig = {
  
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Enable strict mode for better development experience
  reactStrictMode: true,
  
  // Enable SWC minification for better performance
  swcMinify: true,

  // Compiler options for optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Headers configuration for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects for division URLs
  async redirects() {
    return [
      {
        source: '/strategy',
        destination: 'https://strategy.cipherintelligence.com',
        permanent: true,
        basePath: false,
      },
      {
        source: '/growth',
        destination: 'https://growth.cipherintelligence.com',
        permanent: true,
        basePath: false,
      },
      {
        source: '/labs',
        destination: 'https://labs.cipherintelligence.com',
        permanent: true,
        basePath: false,
      },
      {
        source: '/studio',
        destination: 'https://studio.cipherintelligence.com',
        permanent: true,
        basePath: false,
      },
      {
        source: '/ai',
        destination: 'https://ai.cipherintelligence.com',
        permanent: true,
        basePath: false,
      },
    ];
  },

  // Environment variables that should be available on the client
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  },

  // Webpack configuration for additional optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add support for importing SVGs as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            enforce: true,
          },
          common: {
            name: 'commons',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },

  // TypeScript configuration
  typescript: {
    // Dangerously allow production builds to successfully complete even if type errors
    // Set to false for stricter type checking
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Warning: Only enable this during builds if you want to skip ESLint
    ignoreDuringBuilds: false,
  },

  // Output configuration for static export if needed
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,

  // Experimental features for better performance
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
    '@/components/ui': {
      transform: '@/components/ui/{{member}}',
    },
  },

  // Bundle analyzer configuration (uncomment when needed)
  // ...(process.env.ANALYZE === 'true' && {
  //   webpack: (config) => {
  //     config.plugins.push(new (require('@next/bundle-analyzer'))());
  //     return config;
  //   },
  // }),
};

module.exports = nextConfig;