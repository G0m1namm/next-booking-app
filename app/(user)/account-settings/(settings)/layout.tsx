import React from 'react';

import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-svh pt-20 container">
      <div className="mb-5">
        <Link href="/account-settings" className="flex items-center">
          <ArrowLeftIcon size={24} className="mr-2" /> Back
        </Link>
      </div>
      {children}
    </div>
  );
}
