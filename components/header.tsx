'use client';

import UserNav from './user-nav';

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="w-full sticky top-0 left-0 z-10 border-b border-slate-200 bg-white">
      <div className="page-shell-container mx-auto px-24 h-20 flex items-center justify-between">
        <h2 className="text-400 text-primary-foreground">BookIt</h2>
        <UserNav />
      </div>
    </header>
  );
}
