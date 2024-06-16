'use client';

import { useAppSelector } from '@/redux/hooks';

import AvatarSettings from '@/components/settings/avatar-settings';
import { EmailForm } from '@/components/settings/email-form';
import { NameForm } from '@/components/settings/name-form';
import ToggableCard from '@/components/toggable-card';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  const { user: currentUser } = useAppSelector((state) => state.auth);

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl">Basic Information</h1>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <ToggableCard heading="Legal name" subHeading={currentUser?.name}>
            <NameForm />
          </ToggableCard>
          <ToggableCard heading="Personal email" subHeading={currentUser?.email}>
            <EmailForm />
          </ToggableCard>
          <ToggableCard
            heading="Avatar Settings"
            subHeading="Update your profile picture and adjust the size and position."
          >
            <AvatarSettings />
          </ToggableCard>
          <Separator />
        </div>
      </div>
    </div>
  );
}
