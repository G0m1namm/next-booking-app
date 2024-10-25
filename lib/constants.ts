import { env } from "@/app/env-var";

// Upload Preset IDs
export const UPLOAD_AVATAR_PRESET_ID = env.NEXT_PUBLIC_CLOUDINARY_AVATAR_PRESET_ID;
export const UPLOAD_ROOMS_PRESET_ID = env.NEXT_PUBLIC_CLOUDINARY_ROOMS_PRESET_ID;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
