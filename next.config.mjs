/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 90],
    localPatterns: [
      {
        pathname: '/images/**',
      },
      {
        pathname: '/logo/**',
      },
      {
        pathname: '/chatbot/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.thum.io',
        pathname: '/get/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'react-icons'],
  },
};

export default nextConfig;
