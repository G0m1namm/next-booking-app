import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;
  let DB_URI: string = process.env.DB_URI!;
  await mongoose.connect(DB_URI);
};

export default dbConnect;
