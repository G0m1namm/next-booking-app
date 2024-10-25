import { env } from '@/app/env-var';
import dbConnect from '@/backend/config/dbConnect';
import User, { IUser } from '@/backend/models/user';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextRequest } from 'next/server';

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
      jwt: async ({ token, trigger, user }) => {
        user && (token.user = user);

        if (trigger === 'update') {
          const userInfo = await User.findById((token?.user as any)?._id).select('+avatar');
          const newInfo: any = {
            ...user,
            name: userInfo.name,
            email: userInfo.email,
            role: userInfo.role
          }

          if(userInfo.avatar) newInfo.avatar = userInfo.avatar;
          
          token.user = newInfo
        }

        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user as IUser;
        delete (session.user as any).password;
        return session;
      },
    },
    pages: {
      signIn: '/login',
    },
    secret: env.NEXTAUTH_SECRET,
  });
}

export { auth as GET, auth as POST };
