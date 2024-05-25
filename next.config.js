/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URI: 'mongodb://localhost:27017/next-booking-app',
    NEXTAUTH_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXTAUTH_SECRET: 'my-secret',
  },
  basePath: process.env.NEXT_PUBLIC_BASE_URL,
  images: {
    remotePatterns: [{ hostname: 'res.cloudinary.com' }],
  },
};

module.exports = nextConfig;
