import type { Metadata } from 'next';

import GlobalProvider from '@/providers/global-provider';
import { Open_Sans as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';

import '../globals.css';
import NoAuthLayout from '@/layouts/no-auth-layout';

const openSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'NextBooking | Administrator',
  description: 'Book your next appointment online!',
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          openSans.variable
        )}
      >
        <GlobalProvider>
          <NoAuthLayout>{children}</NoAuthLayout>
        </GlobalProvider>
      </body>
    </html>
  );
}
