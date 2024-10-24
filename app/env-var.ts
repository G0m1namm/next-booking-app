import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DB_URI: z.string().url(),
    DB_LOCAL_URI: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(10),
    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),
    CLOUDINARY_CLOUD_NAME: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    EMAIL_SERVER_USER: z.string().min(1),
    EMAIL_SERVER_PASSWORD: z.string().min(1),
    EMAIL_SERVER_HOST: z.string().min(1),
    EMAIL_SERVER_PORT: z.string().min(3),
    EMAIL_FROM: z.string().email(),
    GEOCODER_API_KEY: z.string().min(1),
    GEOCODER_PROVIDER: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    TEST_USER_PASSWORD: z.string().min(6),
    MAPBOX_ACCESS_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: z.string().min(1),
    NEXT_PUBLIC_CLOUDINARY_AVATAR_PRESET_ID: z.string().min(1),
    NEXT_PUBLIC_CLOUDINARY_ROOMS_PRESET_ID: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    NEXT_PUBLIC_CLOUDINARY_AVATAR_PRESET_ID: process.env.NEXT_PUBLIC_CLOUDINARY_AVATAR_PRESET_ID,
    NEXT_PUBLIC_CLOUDINARY_ROOMS_PRESET_ID: process.env.NEXT_PUBLIC_CLOUDINARY_ROOMS_PRESET_ID,
  },
});
