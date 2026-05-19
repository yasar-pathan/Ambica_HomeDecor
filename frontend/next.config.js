/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async rewrites() {
    const envUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const host = envUrl.replace(/\/api(\/v1)?\/?$/, '').replace(/\/+$/, '');
    return [
      {
        source: '/api/proxy/:path*',
        // Route requests to the insecure backend on the server-side to bypass browser Mixed Content blocks
        destination: `${host}/api/v1/:path*`,
      },
    ];
  },
};
module.exports = nextConfig;