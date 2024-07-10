'use client';

import { IRoom } from '@/backend/models/room';
import AdminNewRoomForm from './admin-new-room-form';
import { useUpdateRoomMutation } from '@/redux/api/room';

export default function AdminUpdateRoomForm({ room }: Readonly<{ room: IRoom }>) {
  return <AdminNewRoomForm room={room} useOnSubmitMutation={useUpdateRoomMutation} />;
}
