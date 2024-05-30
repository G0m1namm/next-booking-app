'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

import UserNav from './user-nav';

export default function Header() {
  const { status } = useSession();

  return (
    <header className="w-full sticky top-0 left-0 z-10 border-b border-slate-200 bg-white">
      <div className="page-shell-container mx-auto px-24 h-20 flex items-center justify-between">
        <h2 className="text-400 text-primary-foreground">BookIt</h2>
        <div className="flex items-center space-x-4">
          <UserNav />
          {status === 'unauthenticated' && <Link href="/login">LogIn</Link>}
        </div>
      </div>
    </header>
  );
}
