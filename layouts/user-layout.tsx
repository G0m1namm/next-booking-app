import React from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';

export default function UserLayout({ children }: React.PropsWithChildren<unknown>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
