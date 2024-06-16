/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URI: 'mongodb://localhost:27017/next-booking-app',
    NEXTAUTH_SECRET: 'my-secret',
    NEXTAUTH_URL: 'http://localhost:3000',
    CLOUDINARY_URL: `cloudinary://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@${process.env.CLOUDINARY_CLOUD_NAME}`,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_URL,
  images: {
    remotePatterns: [{ hostname: 'res.cloudinary.com' }],
  },
};

module.exports = nextConfig;
