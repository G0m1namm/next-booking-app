'use client';

import { Provider } from 'react-redux';

import { store } from '@/redux/store';
import { SessionProvider } from 'next-auth/react';

import { Toaster } from '@/components/ui/sonner';

type Props = {
  children: React.ReactNode;
};

export default function GlobalProvider({ children }: Props) {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
      <Toaster expand={false} position="top-center" richColors />
    </SessionProvider>
  );
}
