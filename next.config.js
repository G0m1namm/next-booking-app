/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URI: 'mongodb://localhost:27017/next-booking-app',
    NEXTAUTH_SECRET: 'my-secret',
    NEXTAUTH_URL: 'http://localhost:3000',
    CLOUDINARY_URL: `cloudinary://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@${process.env.CLOUDINARY_CLOUD_NAME}`,
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    CLOUDINARY_AVATAR_PRESET_ID: process.env.CLOUDINARY_AVATAR_PRESET_ID,
    CLOUDINARY_ROOMS_PRESET_ID: process.env.CLOUDINARY_ROOMS_PRESET_ID,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_URL,
  images: {
    remotePatterns: [{ hostname: 'res.cloudinary.com' }],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
