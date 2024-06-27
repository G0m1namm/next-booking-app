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

export const getAuthorizedRoles = (...roles: string[]) => {
    return function (
      req: NextRequest,
      event: unknown,
      next: NextFunction) {
        if (!roles.includes(req.user?.role)) {
            return NextResponse.json({message: `Role (${req.user?.role}) does not have access to this resource`}, {status: 403});
        }
        next();
    };
}