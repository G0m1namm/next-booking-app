import type { Metadata } from 'next';

import AdminLayout from '@/layouts/admin-layout';
import GlobalProvider from '@/providers/global-provider';
import { Lato, Playfair_Display } from 'next/font/google';

import { cn } from '@/lib/utils';

import '../globals.css';

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '700'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600'],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-violet-50 font-sans antialiased',
          lato.variable,
          playfair.variable
        )}
      >
        <GlobalProvider>
          <AdminLayout>{children}</AdminLayout>
        </GlobalProvider>
      </body>
    </html>
  );
}
