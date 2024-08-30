import RoomList from '@/components/room/room-list';
import { getRooms } from '@/lib/room/actions';

import ErrorPage from './error';
import { IRoom } from '@/backend/models/room';

interface Props {
  searchParams: string;
}

type Data = {
  limit: number;
  page: number;
  totalResults: number;
  totalFiltered: number;
  totalPages: number;
  rooms: IRoom[] | undefined;
};

export default async function Page({ searchParams }: Props) {
  const data = await getRooms(searchParams);

  if (!data.success) {
    return <ErrorPage error={data} />;
  }

  const { success, message, ...roomsData } = data;

  return (
    <div className="flex-col items-center justify-between">
      {roomsData && <RoomList roomsList={roomsData} />}
    </div>
  );
}
