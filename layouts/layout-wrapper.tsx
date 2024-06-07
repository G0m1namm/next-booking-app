'use client';

import React from 'react';

import { useSession } from 'next-auth/react';

import NoAuthLayout from './no-auth-layout';
import UserLayout from './user-layout';

const layouts = {
  authenticated: UserLayout,
  unauthenticated: NoAuthLayout,
  loading: NoAuthLayout,
};

export default function LayoutWrapper({ children }: React.PropsWithChildren<unknown>) {
  const { status } = useSession();
  const Layout = layouts[status];
  return (
    <Layout>
      <main className="container">{children}</main>
    </Layout>
  );
}
