'use client';

import { SessionProvider } from 'next-auth/react';

import { Toaster } from '@/components/ui/sonner';

type Props = {
  children: React.ReactNode;
};

export default function GlobalProvider({ children }: Props) {
  return (
    <SessionProvider>
      {children}
      <Toaster expand={false} />
    </SessionProvider>
  );
}
