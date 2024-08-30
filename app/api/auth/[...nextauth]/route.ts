import dbConnect from '@/backend/config/dbConnect';
import User, { IUser } from '@/backend/models/user';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextRequest, NextResponse } from 'next/server';

type Credentials = {
  email: string;
  password: string;
};

type Token = {
  user: IUser;
};

async function auth(req: NextRequest, res: any) {
  return await NextAuth(req, res, {
    session: {
      strategy: 'jwt',
    },
    providers: [
      CredentialsProvider({
        // @ts-ignore
        async authorize(credentials: Credentials) {
          dbConnect();

          const { email, password } = credentials;
          const user = await User.findOne({ email }).select(['+password', '+avatar']);

          if (!user) {
            throw new Error('Invalid Email or Password');
          }

          const isPasswordMatched = await bcrypt.compare(password, user.password);

          if (!isPasswordMatched) {
            throw new Error('Invalid Email or Password');
          }

          return user;
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        user && (token.user = user);

        if (req.url?.includes('/api/auth/session?')) {
          // @ts-ignore
          const updatedUser = await User.findById(token?.user?._id).select('avatar');

          // @ts-ignore
          token.user.avatar = updatedUser?.avatar;
        }
        /* eslint-disable @typescript-eslint/ban-ts-comment */

        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user as IUser;

        // @ts-ignore
        delete session.user.password;
        return session;
      },
    },
    pages: {
      signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}

export { auth as GET, auth as POST };
