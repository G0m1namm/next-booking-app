import { GetRoomResponseType } from '@/backend/controllers/roomControllers';
import { IRoom } from '@/backend/models/room';

import { getBaseUrl } from '@/lib/getBaseUrl';

import Pagination from '../pagination';
import Search from '../search';
import RoomCard from './room-card';

type RequiredNonNullableObject<T extends object> = {
  [P in keyof Required<T>]: NonNullable<T[P]>;
};

type Props = {
  roomsList: RequiredNonNullableObject<GetRoomResponseType>;
};

export default function RoomList({ roomsList }: Props) {
  const { rooms, totalPages, totalFiltered, limit } = roomsList;
  return (
    <section id="rooms_list" className="container">
      <div className="flex justify-center py-4 mb-10">
        <Search />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 md:gap-5 xl:gap-8">
        {rooms?.map((room: IRoom, roomIdx: number) => (
          <div
            key={`room_${room._id}`}
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
          >
            <meta itemProp="name" content={room.name} />
            <meta itemProp="position" content={roomIdx.toString()} />
            <meta itemProp="url" content={`${getBaseUrl()}/rooms/${room._id}`} />
            <RoomCard room={room} className="grid grid-cols-[100%]" />
          </div>
        ))}
      </div>
      {limit < totalFiltered && <Pagination total={totalPages} />}
    </section>
  );
}
