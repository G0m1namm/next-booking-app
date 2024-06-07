'use client';

import ToggableCard from '@/components/toggable-card';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl">Profile Info</h1>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <ToggableCard heading="Legal name" subHeading="Jherson Martelo">
            <div className="grid gap-2 text-2xl">showing new content</div>
          </ToggableCard>
          <Separator />
        </div>
      </div>
    </div>
  );
}
