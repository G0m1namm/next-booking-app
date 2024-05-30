import type { Metadata } from 'next';

import LayoutWrapper from '@/layouts/layout-wrapper';
import GlobalProvider from '@/providers/global-provider';
import { Open_Sans as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';

import './globals.css';

const openSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  icons: '/favicon.ico',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          openSans.variable
        )}
      >
        <GlobalProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </GlobalProvider>
      </body>
    </html>
  );
}
