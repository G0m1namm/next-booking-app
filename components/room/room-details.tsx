'use client';

import React from 'react';

import { IRoom } from '@/backend/models/room';
import { StarFilledIcon, CookieIcon } from '@radix-ui/react-icons';
import {
  AirVentIcon,
  ArrowLeftIcon,
  PawPrintIcon,
  WashingMachineIcon,
  WifiIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Separator } from '../ui/separator';
import { ReviewForm } from './review-form';
import ReviewList from './review-list';
import { RoomCarousel } from './room-carousel';

type Props = {
  data: IRoom;
};

export default function RoomDetails({ data }: Props) {
  return (
    <div className="container mx-auto w-full flex flex-col min-h-svh pt-20">
      <div className="mb-5">
        <Link href="/" className="flex items-center">
          <ArrowLeftIcon size={24} className="mr-2" /> Back
        </Link>
      </div>
      <div className="flex flex-col mb-10">
        <h1 className="text-400">{data.name}</h1>
        <address className="text-200">{data.address}</address>
      </div>
      <RoomCarousel images={data.images} name={data.name} />
      <div className="flex flex-col md:flex-row w-full my-10">
        <div className="flex-1">
          <div className="flex w-fit items-stretch border border-foreground rounded-md py-4 px-8 space-x-8 mb-6">
            <div className="flex flex-col space-y-2">
              <span className="flex justify-center items-center w-full text-center leading-tight text-400 font-semibold">
                {data.ratings}
              </span>
              <div className="w-full text-center leading-tight flex space-x-1 justify-center">
                <StarFilledIcon className="size-5" />
                <StarFilledIcon className="size-5" />
                <StarFilledIcon className="size-5" />
                <StarFilledIcon className="size-5" />
                <StarFilledIcon className="size-5" />
              </div>
            </div>
            <Separator className="h-auto bg-slate-300" orientation="vertical" />
            <div className="flex flex-1 flex-col justify-center space-y-2">
              <span className="flex justify-center items-center w-full text-center leading-tight text-400 font-semibold">
                {data.guestCapacity}
              </span>
              <span className="flex justify-center items-center w-full text-center leading-tight text-100">
                Guests
              </span>
            </div>
            <Separator className="h-auto bg-slate-300" orientation="vertical" />
            <div className="flex flex-1 flex-col justify-center space-y-2">
              <span className="flex justify-center items-center w-full text-center leading-tight text-400 font-semibold">
                {data.numOfBeds}
              </span>
              <span className="flex justify-center items-center w-full text-center leading-tight text-100">
                Beds
              </span>
            </div>
            <Separator className="h-auto bg-slate-300" orientation="vertical" />
            <div className="flex flex-1 flex-col justify-center space-y-2">
              <span className="flex justify-center items-center w-full text-center leading-tight text-400 font-semibold">
                {data.numOfReviews}
              </span>
              <a
                className="flex justify-center items-center w-full text-center leading-tight text-100 underline"
                href="#reviews"
              >
                Reviews
              </a>
            </div>
          </div>
          <div
            className="text-200 mb-6"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
          <div className="flex flex-col space-y-3 mb-6">
            <h2 className="text-400 font-medium">Ammenities</h2>
            {data.isBreakfast && (
              <li className="flex items-center space-x-2">
                <CookieIcon className="size-6" />
                <p className="flex text-200"> Breakfast</p>
              </li>
            )}
            {data.isInternet && (
              <li className="flex items-center space-x-2">
                <WifiIcon className="size-6" />
                <p className="flex text-200"> Internet</p>
              </li>
            )}
            {data.isAirConditioned && (
              <li className="flex items-center space-x-2">
                <AirVentIcon className="size-6" />
                <p className="flex text-200"> Air Conditioned</p>
              </li>
            )}
            {data.isPetAllowed && (
              <li className="flex items-center space-x-2">
                <PawPrintIcon className="size-6" />
                <p className="flex text-200"> Pets allowed</p>
              </li>
            )}
            {data.isRoomCleaning && (
              <li className="flex items-center space-x-2">
                <WashingMachineIcon className="size-6" />
                <p className="flex text-200"> Room Cleaning</p>
              </li>
            )}
          </div>
          <Separator className="my-10" />
          <div id="reviews">
            <h2 className="text-400 font-medium mb-2">Reviews</h2>
            <ReviewForm />
            <ReviewList reviews={data.reviews} />
          </div>
        </div>
        <aside className="sticky top-0 flex-none w-[300px]">Room Map</aside>
      </div>
    </div>
  );
}
