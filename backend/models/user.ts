const bcrypt = require('bcryptjs');
const crypto = require('crypto');
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: {
    public_id: string;
    url: string;
  };
  createdAt: Date;
  resetPasswordToken: string | undefined;
  resetPasswordExpire: Date | undefined;
  comparePassword: (newPassword: string) => Promise<boolean>;
  getResetPasswordToken: () => string;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Your password must be at least 6 characters'],
    select: false,
    unique: true,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  role: {
    type: String,
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (
  newPassword: string
): Promise<boolean> {
  return await bcrypt.compare(newPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function (): string {
  const TTL_TOKEN = 30 * 60 * 1000; // 30 minutes
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + TTL_TOKEN;
  return resetToken;
};
export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
