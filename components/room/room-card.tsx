'use client';

import React, { HTMLAttributes } from 'react';

import { IRoom } from '@/backend/models/room';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { twMerge } from 'tailwind-merge';
import { ArrowUpRightIcon } from 'lucide-react';
import { StarRating } from '../ui/star-rating';

interface Props extends HTMLAttributes<HTMLDivElement> {
  room?: IRoom;
}

export default function RoomCard({ className, room }: Props) {
  return (
    <div className={cn('relative flex w-full group/room overflow-hidden', className)}>
      {room?._id && (
        <Link
          className="absolute top-0 left-0 w-full h-full z-[2]"
          href={`/rooms/${room._id}`}
          rel="noopener noreferrer nofollow"
        />
      )}
      <span
        className={twMerge(
          'absolute top-0 left-0 bottom-0 right-0 bg-primary',
          'will-change-transform w-full h-full translate-y-full transition-transform',
          'duration-300 ease-smooth group-hover/room:translate-y-0'
        )}
      ></span>
      <div className="overflow-hidden flex-none min-w-1/3 h-[200px] aspect-[3/4] sm:aspect-square relative z-[1]">
        <Image
          src={
            room?.images.length ? room.images[0].url : '/images/default_room_image.jpg'
          }
          alt={room?.name ?? 'default house - no available'}
          className="w-full h-full object-cover origin-center scale-100 transition-transform ease-smooth duration-300 group-hover/room:scale-110"
          width={400}
          height={400}
          loading="lazy"
        />
      </div>
      <div className="px-2 py-2 flex flex-col justify-between w-full transition-colors text-violet-900 group-hover/room:text-white relative z-[1]">
        <div>
          <StarRating
            initialValue={room?.ratings}
            showTooltip={false}
            className="scale-[0.4] sm:scale-50 -my-2 -mx-16 sm:-mx-12"
          />
          <div className="flex justify-between items-center space-x-7">
            <h3 className="text-base sm:text-lg 2x:text-xl font-playfair font-medium">
              {room?.name}
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-end leading-none text-tiny sm:text-base">
            <strong className="text-base sm:text-lg mr-1 leading-none">
              ${room?.pricePerNight}
            </strong>
            /night
          </span>
          <ArrowUpRightIcon className="size-5 sm:size-6 md:size-8" />
        </div>
      </div>
    </div>
  );
}
