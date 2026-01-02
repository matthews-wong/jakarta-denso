import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Enable React Strict Mode for highlighting potential issues
  reactStrictMode: true,

  // Ensure trailing slashes for consistent SEO
  trailingSlash: false, // Changed to false for better social media compatibility

  // Improve SEO with proper page handling
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  // TypeScript and ESLint configuration
  typescript: {
    // Allow production builds to complete even with type errors
    ignoreBuildErrors: false, // Keep false for type safety, but see eslint config below
  },

  eslint: {
    // Allow production builds to complete even with ESLint errors
    ignoreDuringBuilds: true, // This will ignore unused variable warnings
  },

  // Internationalization settings
  i18n: {
    locales: ["id"], // Bahasa Indonesia
    defaultLocale: "id",
  },

  // Image optimization settings - enhanced for SEO
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jakartaintldenso.com",
        pathname: "/**",
      },
      // Allow common image CDNs for better performance
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      }
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // 24 hours
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    dangerouslyAllowSVG: true, // Allow SVG for your 404 image
    // Removed contentSecurityPolicy for better compatibility
  },

  // Experimental features - updated for Next.js 15
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "date-fns",
      "lodash",
      "@hookform/resolvers",
      "framer-motion",
    ],
    serverActions: {
      bodySizeLimit: "2mb", // Increase limit for form submissions
    },
    // Enable modern bundling for better performance
    webpackBuildWorker: true,
    // Optimize for SEO
    optimizeCss: true,
  },

  // Include content files in serverless function bundles for dynamic routes
  outputFileTracingIncludes: {
    "/blogs/[slug]": ["./content/**/*"],
    "/api/blog-posts/[slug]": ["./content/**/*"],
  },

  // Custom headers optimized for SEO but more lenient for Instagram browser
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" }, // More permissive for Instagram browser
          { key: "Referrer-Policy", value: "no-referrer-when-downgrade" }, // Better for SEO
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-DNS-Prefetch-Control", value: "on" }, // Improve performance
          // Removed Strict-Transport-Security for better compatibility
          // Removed Content-Security-Policy for better compatibility with Instagram
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Content-Type", value: "application/xml" }, // Proper content type for sitemaps
          { key: "Cache-Control", value: "public, max-age=3600" }, // Cache for 1 hour, better for crawlers
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          { key: "Content-Type", value: "text/plain" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ]
  },

  // Redirects with proper status codes for SEO
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/kelebihan-kami",
        destination: "/#kelebihan-kami",
        permanent: true,
      },
      {
        source: "/galeri",
        destination: "/#galeri",
        permanent: true,
      },
      {
        source: "/ulasan",
        destination: "/#ulasan",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/#BlogPreview",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/#contact",
        permanent: true,
      },
      {
        source: "/BlogPreview",
        destination: "/#BlogPreview",
        permanent: true,
      },
    ]
  },

  // Enhanced rewrites for better SEO and 404 handling
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      // Handle Instagram UTM parameters without redirecting
      {
        source: "/:path*",
        has: [{ type: "query", key: "utm_source" }],
        destination: "/:path*",
      },
      // Handle hash fragments for home page
      {
        source: "/#:hash",
        destination: "/?hash=:hash",
      },
      // Special handling for Instagram browser
      {
        source: "/l/:path*",
        destination: "/:path*",
      },
    ]
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: "https://jakartaintldenso.com",
    NEXT_PUBLIC_SITE_NAME: "Jakarta Intl Denso Cirebon - AC Mobil",
    NEXT_PUBLIC_SITE_DESCRIPTION: "Layanan profesional Jakarta Intl Denso di Cirebon",
  },

  // Add Webpack configuration for better performance
  webpack: (config, { dev, isServer }) => {
    // Only run in production and on client-side
    if (!dev && !isServer) {
      // Enable tree-shaking and code splitting
      config.optimization.splitChunks.chunks = "all"

      // Use Terser for better minification
      config.optimization.minimize = true
    }

    return config
  },

  // Properly handle 404 and other error pages
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
}

export default nextConfig