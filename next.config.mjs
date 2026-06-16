/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.thum.io',
        pathname: '/get/**',
      },
    ],
  },
};

export default nextConfig;
