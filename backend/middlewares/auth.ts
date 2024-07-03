import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { IUser } from '../models/user';

// See https://github.com/hoangvvo/next-connect/blob/main/src/express.ts
type NextFunction = (err?: unknown) => void;

export const isAuthenticated = async (
  req: NextRequest,
  event: unknown,
  next: NextFunction
) => {
  const session = await getToken({ req });

  if (!session) {
    return NextResponse.json(
      {
        message: 'Login first to access this resource.',
      },
      { status: 401 }
    );
  }

  req.user = session.user as IUser;

  return next();
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: NextRequest, event: any, next: any) => {
    if (!roles.includes(req.user.role)) {
      return NextResponse.json(
        {
          errMessage: `Role (${req.user.role}) is now allowed to access this resource.`,
        },
        { status: 403 }
      );
    }

    return next();
  };
};