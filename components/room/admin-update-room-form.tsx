'use client';

import { IRoom } from '@/backend/models/room';
import AdminNewRoomForm from './admin-new-room-form';
import { useUpdateRoomMutation } from '@/redux/api/room';
import { useAppDistpatch } from '@/redux/hooks';
import { useEffect } from 'react';
import { setBreadcrumbs } from '@/redux/features/breadcrumbs/breadcrumbs-slice';

export default function AdminUpdateRoomForm({ room }: Readonly<{ room: IRoom }>) {
  const dispatch = useAppDistpatch();

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        { href: '/admin/rooms', label: 'All Rooms' },
        { href: '', label: `Edit ${room.name}` },
      ])
    );
  }, []);

  return <AdminNewRoomForm room={room} useOnSubmitMutation={useUpdateRoomMutation} />;
}
