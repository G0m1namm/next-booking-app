'use client';

import { useEffect } from 'react';

import {
  IUserClient,
  setIsAuthenticated,
  setUser,
} from '@/redux/features/user/user-slice';
import { useAppDistpatch, useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import UserNav from './user-nav';

export default function Header() {
  const { data } = useSession();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDistpatch();

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user as IUserClient));
      dispatch(setIsAuthenticated(true));
    }
  }, [data]);

  return (
    <header className="w-full sticky top-0 left-0 z-10 backdrop-blur-md">
      <div className="page-shell-container px-4 h-20 flex items-center justify-between">
        <span className="text-lg 2xl:text-xl font-playfair">
          <Link href="/">Home&Fun</Link>
        </span>
        <div className="flex items-center space-x-4">
          {isAuthenticated && <UserNav />}
          {!isAuthenticated && <Link href="/login">LogIn</Link>}
        </div>
      </div>
    </header>
  );
}
