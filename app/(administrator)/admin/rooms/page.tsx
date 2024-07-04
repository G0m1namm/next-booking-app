import { getAuthHeader } from '@/backend/utils/getAuthHeader';

import { getApiUrl } from '@/lib/getBaseUrl';

import { columns } from './columns';
import ErrorPage from './error';
import { IRoom } from '@/backend/models/room';
import AdminPageLayout from '@/layouts/admin-page-layout';
import AdminRoomsList from '@/components/room/admin-rooms-list';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'All Rooms | Administrator',
  description: 'Manage all rooms in the system.',
};

const getAllRooms = async () => {
  const authHeaders = getAuthHeader();
  const res = await fetch(`${getApiUrl()}/admin/rooms`, {
    headers: authHeaders.headers,
    next: {
      tags: ['Rooms'],
    },
  });
  const info = await res.json();
  return info;
};

export default async function Page() {
  const data = await getAllRooms();

  if (!data.success) {
    return <ErrorPage error={data} />;
  }

  const rooms = data.rooms as IRoom[];
  const roomsDataParsed = rooms.map((room) => {
    return {
      id: room._id?.toString() as string,
      name: room.name,
    };
  });

  return (
    <AdminPageLayout title={<RoomPageHeader totalRooms={rooms.length} />}>
      <AdminRoomsList data={roomsDataParsed} columns={columns} />
    </AdminPageLayout>
  );
}

function RoomPageHeader({ totalRooms }: { totalRooms: number }) {
  return (
    <div className="flex w-full justify-between items-center">
      <h1 className="text-xl font-semibold md:text-2xl inline-flex items-center gap-3">
        <span>All Rooms</span>
        <Badge className="inline-block text-lg">{totalRooms}</Badge>
      </h1>
      <Button asChild>
        <Link href="/admin/rooms/new">Create Room</Link>
      </Button>
    </div>
  );
}