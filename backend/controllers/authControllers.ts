import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

import { deleteFIle, signatureParams } from '@/lib/cloudinary';
import { getBaseUrl } from '@/lib/getBaseUrl';

import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import User, { IUser } from '../models/user';
import { resetPasswordHTMLTemplate } from '../utils/emailTemplates';
import ErrorHandler from '../utils/errorHandler';
import { sendEmail } from '../utils/sendEmail';

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

// Update user avatar => /api/me/update_avatar?update=true
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

// Create reset password token and send recovery email => /api/password/forgot
export const forgotPassword = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const user = (await User.findOne({ email: body.email })) as IUser;

  if (!user) {
    throw new ErrorHandler('User not found with this email', 404);
  }

  const resetToken = user.getResetPasswordToken();
  user.save({ validateBeforeSave: false });
  const apiUrl = getBaseUrl();
  const resetUrl = `${apiUrl}/password/reset/${resetToken}`;

  try {
    await sendEmail({
      subject: 'Password Recovery',
      template: resetPasswordHTMLTemplate(user.name, resetUrl),
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    throw new ErrorHandler('Email could not be sent', 500);
  }

  return NextResponse.json({
    success: true,
    user,
  });
});

// Reset user password => /api/password/reset/:token
export const resetPassword = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { token: string } }) => {
    const { newPassword, oldPassword } = await req.json();

    const resetToken = crypto.createHash('sha256').update(params.token).digest('hex');
    const user = (await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    }).select('+password')) as IUser;

    if (!user) {
      throw new ErrorHandler('Password reset token is invalid or has expired', 404);
    }

    const isMatched = await user.comparePassword(oldPassword);

    if (!isMatched) {
      throw new ErrorHandler('Old password is incorrect', 400);
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return NextResponse.json({
      success: true,
    });
  }
);

// Get all users - Admin view => /api/admin/users
export const getAllusers = catchAsyncErrors(async (req: NextRequest) => {
  const users = await User.find();

  return NextResponse.json({
    success: true,
    users,
  });
});

// Update user - Admin view => /api/admin/users/:id
export const updateUser = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
  const body = await req.json();

  const user = await User.findByIdAndUpdate(params.id, body);

  return NextResponse.json({
    success: true,
    user
  });
});

// Get user details - Admin view => /api/admin/users/:id
export const getUserDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    
  const user = await User.findById(params.id);
  
  if(!user) {
    throw new ErrorHandler('The user was not found', 404); 
  }

  return NextResponse.json({
    success: true,
    user
  });
});

// Delete user - Admin view => /api/admin/users/:id
export const deleteUser = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
  const user = await User.findById(params.id);

  if(!user) {
    throw new ErrorHandler('The user was not found', 404); 
  }

  if (req?.user?.avatar?.public_id) {
    await deleteFIle(req?.user?.avatar?.public_id);
  }

  await user.deleteOne();

  return NextResponse.json({
    success: true,
  });
});