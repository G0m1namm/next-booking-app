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
    <header className="w-full sticky top-0 left-0 z-10 border-b border-slate-200 bg-white">
      <div className="page-shell-container container h-20 flex items-center justify-between">
        <h2 className="text-lg text-violet-500">
          <Link href="/">NextBooking</Link>
        </h2>
        <div className="flex items-center space-x-4">
          {isAuthenticated && <UserNav />}
          {!isAuthenticated && <Link href="/login">LogIn</Link>}
        </div>
      </div>
    </header>
  );
}
