const { createJiti } = require('jiti');
const jiti = createJiti(__filename);

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti('./app/env-var');

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: `${process.env.NODE_ENV === 'development' ? 'http://' : 'https://'}${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`,
  },
  images: {
    remotePatterns: [{ hostname: 'res.cloudinary.com' }],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core'],
};

module.exports = nextConfig;
