'use client';

import React from 'react';

import { useSession } from 'next-auth/react';

import NoAuthLayout from './no-auth-layout';
import UserLayout from './user-layout';
import { usePathname } from 'next/navigation';

const layouts = {
  authenticated: UserLayout,
  unauthenticated: NoAuthLayout,
  loading: NoAuthLayout,
};

export default function LayoutWrapper({
  children,
}: Readonly<React.PropsWithChildren<unknown>>) {
  const { status } = useSession();
  const pathname = usePathname();
  const Layout = pathname === '/' ? layouts['authenticated'] : layouts[status];
  return (
    <Layout>
      <main className="page-shell-container">{children}</main>
    </Layout>
  );
}
