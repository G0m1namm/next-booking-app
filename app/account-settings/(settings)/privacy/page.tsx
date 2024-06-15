'use client';

import { useToggle } from '@mantine/hooks';

import { ResetPasswordForm } from '@/components/settings/reset-password-form';
import ToggableCard from '@/components/toggable-card';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  const [open, toggle] = useToggle([true, false]);
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl">Privacy Settings</h1>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <ToggableCard heading="Reset Password" open={open} onAction={toggle}>
            <ResetPasswordForm />
          </ToggableCard>
          <Separator />
        </div>
      </div>
    </div>
  );
}
