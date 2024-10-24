'use client';

import React from 'react';

import { IRoom } from '@/backend/models/room';
import { useMediaQuery } from '@mantine/hooks';
import { CookieIcon } from '@radix-ui/react-icons';
import {
  AirVentIcon,
  BedDoubleIcon,
  PawPrintIcon,
  User2Icon,
  WashingMachineIcon,
  WifiIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import { Separator } from '../ui/separator';
import { ReviewForm } from './review-form';
import ReviewList from './review-list';
import { RoomCarousel } from './room-carousel';
import RoomMap from './room-map';
import { StarRating } from '../ui/star-rating';
import dynamic from 'next/dynamic';
import { Skeleton } from '../ui/skeleton';
import { twMerge } from 'tailwind-merge';

const RoomDatePicker = dynamic(() => import('./room-date-picker'), {
  ssr: false,
  loading: () => (
    <Skeleton
      className={twMerge(
        'h-20 w-svw fixed bottom-0 left-0 z-10',
        'slg:w-[290px] slg:h-[430px] slg:static slg:z-0',
        'xl:w-[530px]'
      )}
    />
  ),
});

type Props = {
  data: IRoom;
};

export default function RoomDetails({ data }: Props) {
  const isDesktop = useMediaQuery('(min-width: 992px)');

  return (
    <div className="w-full flex flex-col min-h-svh container px-4">
      <div className="h-[300px] md:h-[500px] flex flex-col justify-end">
        <div className="flex flex-col mb-10">
          <StarRating
            initialValue={data?.ratings}
            showTooltip={false}
            readonly
            className="scale-[0.4] sm:scale-50 -my-2 -mx-16 sm:-mx-12"
          />
          <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-playfair">{data.name}</h1>
        </div>
      </div>
      <RoomCarousel images={data.images} name={data.name} />
      <address className="not-italic mt-3 text-tiny sm:text-base">{data.address}</address>
      <div className="flex flex-col md:flex-row w-full my-14 gap-10">
        <div className="flex-1">
          <div
            className="sm:text-lg leading-tight mb-10"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
          <ul className="space-y-5">
            <li className="flex items-center space-x-2 relative dark-border-b pb-1">
              <User2Icon className="size-5" />
              <p className="flex">{data.guestCapacity} Guests</p>
            </li>
            <li className="flex items-center space-x-2 relative dark-border-b pb-1">
              <BedDoubleIcon className="size-5" />
              <p className="flex">{data.numOfBeds} Beds</p>
            </li>
          </ul>
          <div className="flex flex-col mb-6 mt-32 text-base leading-tight">
            <h2 className="text-xl sm:text-2xl mb-6 font-medium font-playfair leading-none">
              Ammenities
            </h2>
            <ul className="space-y-5">
              {data.isBreakfast && (
                <li className="flex items-center space-x-2 relative dark-border-b pb-1">
                  <CookieIcon className="size-5" />
                  <p className="flex"> Breakfast</p>
                </li>
              )}
              {data.isInternet && (
                <li className="flex items-center space-x-2 relative dark-border-b pb-1">
                  <WifiIcon className="size-5" />
                  <p className="flex"> Internet</p>
                </li>
              )}
              {data.isAirConditioned && (
                <li className="flex items-center space-x-2 relative dark-border-b pb-1">
                  <AirVentIcon className="size-5" />
                  <p className="flex"> Air Conditioned</p>
                </li>
              )}
              {data.isPetAllowed && (
                <li className="flex items-center space-x-2 relative dark-border-b pb-1">
                  <PawPrintIcon className="size-5" />
                  <p className="flex"> Pets allowed</p>
                </li>
              )}
              {data.isRoomCleaning && (
                <li className="flex items-center space-x-2 relative dark-border-b pb-1">
                  <WashingMachineIcon className="size-5" />
                  <p className="flex"> Room Cleaning</p>
                </li>
              )}
            </ul>
          </div>
          <Separator className="my-10" />
          <div id="reviews">
            <h2 className="text-xl font-playfair font-medium mb-2">Reviews</h2>
            {data._id && <ReviewForm roomId={data._id} />}
            <ReviewList reviews={data.reviews} />
          </div>
        </div>
        <aside className="grid top-0 flex-none w-fit gap-10">
          {data._id && (
            <RoomDatePicker pricePerNight={data.pricePerNight} roomId={data._id} inline />
          )}
          {data.location?.coordinates && (
            <div className={cn('my-5 grid gap-3', { hidden: !isDesktop })}>
              <h4 className="text-base">Room Location</h4>
              <div className="overflow-hidden rounded-lg shadow-md h-fit sticky top-0">
                <RoomMap coordinates={data.location.coordinates} />
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
