'use client';

import AdminNewRoomForm from '@/components/room/admin-new-room-form';
import { Button } from '@/components/ui/button';
import AdminPageLayout from '@/layouts/admin-page-layout';
import { useCreateRoomMutation } from '@/redux/api/room';
import { setBreadcrumbs } from '@/redux/features/breadcrumbs/breadcrumbs-slice';
import { useAppDistpatch } from '@/redux/hooks';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Page() {
  const dispatch = useAppDistpatch();

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        { href: '/admin/rooms', label: 'All Rooms' },
        { href: '', label: 'Create Room' },
      ])
    );
  }, []);

  return (
    <AdminPageLayout title={<NewRoonPageHeader />}>
      <AdminNewRoomForm useOnSubmitMutation={useCreateRoomMutation} />
    </AdminPageLayout>
  );
}

function NewRoonPageHeader() {
  return (
    <div className="flex w-full justify-between items-center">
      <h1 className="text-xl font-semibold md:text-2xl inline-flex items-center gap-3">
        New Room
      </h1>
      <div className="flex items-center gap-4">
        <Button asChild variant="outline">
          <Link href="/admin/rooms">Discard</Link>
        </Button>
        <Button type="submit" form="admin-new-room-form">
          Save Room
        </Button>
      </div>
    </div>
  );
}
