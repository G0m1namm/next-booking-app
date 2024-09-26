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
    <section id="rooms_list">
      <div className="w-full h-[40vh] max-h-[450px]">
        <div className="w-full h-full flex items-center justify-center">
          <article className="py-8 px-4 text-violet-700 text-center">
            <h1 className="text-4xl 2xl:text-5xl font-playfair">Rooms</h1>
            <p className="">Explore a new way of living</p>
          </article>
        </div>
      </div>
      <div className="flex justify-center items-center sticky top-[78px] z-10 w-full dark-border-t bg-white">
        <Search />
      </div>
      <div className="relative dark-border-t">
        <div ref={parent} className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-1 p-1">
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
                <RoomCard room={room} className="bg-violet-50" />
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
      </div>
    </section>
  );
}
