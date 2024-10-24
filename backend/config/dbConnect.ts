import { env } from '@/app/env-var';
import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  let DB_URI: string = "";

  if (process.env.NODE_ENV === "development")
    DB_URI = env.DB_LOCAL_URI!;
  if (process.env.NODE_ENV === "production") DB_URI = env.DB_URI!;

  await mongoose.connect(DB_URI);
};

export default dbConnect;
