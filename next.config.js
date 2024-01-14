/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URI: "mongodb://localhost:27017/next-booking-app"
  },
  basePath: process.env.NEXT_PUBLIC_BASE_URL
};

module.exports = nextConfig;
