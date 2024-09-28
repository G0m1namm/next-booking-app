'use client';

import { IdCardIcon } from '@radix-ui/react-icons';
import { LockKeyholeIcon } from 'lucide-react';
import Link from 'next/link';

import NavCard from '@/components/nav-card';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  return (
    <div className="pt-20 container">
      <h1 className="text-2xl font-semibold">Account Settings</h1>
      <Separator className="my-4" />
      <div className="grid gap-4">
        <Link href="/account-settings/profile">
          <NavCard
            icon={<IdCardIcon />}
            title="Personal Info"
            description="Update your personal information such as name, email, and avatar."
          />
        </Link>
        <Link href="/account-settings/privacy">
          <NavCard
            icon={<LockKeyholeIcon />}
            title="Privacy Settings"
            description="Update your privacy settings such as the passwrord."
          />
        </Link>
      </div>
    </div>
  );
}
