'use client';

import { IdCardIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import NavCard from '@/components/nav-card';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Account Settings</h1>
      <Separator className="my-4" />
      <div className="grid gap-4">
        <Link href="/account-settings/profile">
          <NavCard
            icon={<IdCardIcon />}
            title="Personal Info"
            description="Update your personal information such as name, email, and password."
          />
        </Link>
      </div>
    </div>
  );
}
