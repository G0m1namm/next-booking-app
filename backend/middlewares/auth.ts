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
  const session = await getToken({ req, secret: `${process.env.JWT_SECRET}` });
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
