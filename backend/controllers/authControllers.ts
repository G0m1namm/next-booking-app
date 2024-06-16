import { NextRequest, NextResponse } from 'next/server';

import { deleteFIle, signatureParams } from '@/lib/cloudinary';

import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import User, { IUser } from '../models/user';
import ErrorHandler from '../utils/errorHandler';

// Register a user => /api/auth/register
export const registerUser = catchAsyncErrors(async (req: NextRequest) => {
  const { name, email, password } = await req.json();

  await User.create({
    name,
    email,
    password,
  });

  return NextResponse.json({
    success: true,
  });
});

// Update user profile => /api/me/update
export const updateProfile = catchAsyncErrors(async (req: NextRequest) => {
  const { name, email } = await req.json();

  const user = await User.findByIdAndUpdate(req.user._id, { name, email });

  return NextResponse.json({
    success: true,
    user,
  });
});

// Update user profile => /api/me/update_password
export const updatePassword = catchAsyncErrors(async (req: NextRequest) => {
  const { oldPassword, newPassword } = await req.json();

  const user = await User.findById(req.user._id).select('+password');
  const isMatched = await user.comparePassword(oldPassword);

  if (!isMatched) {
    throw new ErrorHandler('Old password is incorrect', 400);
  }

  user.password = newPassword;
  await user.save();

  return NextResponse.json({
    success: true,
    user,
  });
});

// Update user avatar => /api/me/update_avatar
export const updateAvatar = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const user = (await User.findByIdAndUpdate(req.user._id, { avatar: body })) as IUser;

  if (req?.user?.avatar?.public_id) {
    await deleteFIle(req?.user?.avatar?.public_id);
  }

  return NextResponse.json({
    success: true,
    user,
  });
});

// Enable sign requests to Cloudinary => /api/sign-cloudinary-params
export const signCloudinaryRequest = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const signature = signatureParams(body);

  return NextResponse.json({
    success: true,
    signature,
  });
});
