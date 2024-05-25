import dbConnect from '@/backend/config/dbConnect';
import User, { IUser } from '@/backend/models/user';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type Credentials = {
  email: string;
  password: string;
};

export async function auth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await NextAuth(req, res, {
    session: {
      strategy: 'jwt',
    },
    providers: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      CredentialsProvider({
        async authorize(credentials: Credentials) {
          dbConnect();
          const { email, password } = credentials;
          const user = await User.findOne({ email }).select(
            '+password'
          );

          if (!user) {
            throw new Error('Invalid Email or Password');
          }

          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );

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
        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user as IUser;
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}

export { auth as GET, auth as POST };
