'use client';

import { IRoom } from '@/backend/models/room';

import { getBaseUrl } from '@/lib/getBaseUrl';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import Pagination from '../pagination';
import Search from '../search';
import RoomCard from './room-card';

type Props = {
  limit?: number;
  page?: number;
  totalResults?: number;
  totalFiltered?: number;
  totalPages?: number;
  rooms?: IRoom[];
};

export default function RoomList({ roomsList }: Readonly<{ roomsList: Props }>) {
  const { rooms, totalPages, totalFiltered, limit } = roomsList;
  const [parent] = useAutoAnimate(/* optional config */);
  return (
    <section id="rooms_list" className="container">
      <div className="flex justify-center py-4 mb-10">
        <Search />
      </div>
      <div
        ref={parent}
        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 md:gap-5 xl:gap-8"
      >
        {Boolean(rooms?.length) &&
          rooms?.map((room: IRoom, roomIdx: number) => (
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
        {Boolean(!rooms?.length) && (
          <div className="w-full h-[400px] grid place-content-center col-span-full text-lg">
            No rooms were found
          </div>
        )}
      </div>
      {!!limit && !!totalFiltered && limit < totalFiltered && (
        <Pagination total={totalPages!} />
      )}
    </section>
  );
}
