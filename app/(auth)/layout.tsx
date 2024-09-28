import type { Metadata } from 'next';

import GlobalProvider from '@/providers/global-provider';
import NoAuthLayout from '@/layouts/no-auth-layout';
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

export const metadata: Metadata = {
  title: 'Home&Fun | Administrator',
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
          lato.variable,
          playfair.variable
        )}
      >
        <GlobalProvider>
          <NoAuthLayout>{children}</NoAuthLayout>
        </GlobalProvider>
      </body>
    </html>
  );
}
