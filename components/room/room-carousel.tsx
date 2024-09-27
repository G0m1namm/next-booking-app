'use client';

import * as React from 'react';

import { IImage } from '@/backend/models/room';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { DialogContent } from '@radix-ui/react-dialog';

type Props = {
  images: IImage[];
  name: string;
};

export function RoomCarousel({ images, name }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="relative">
        <Image
          src={images[0].url}
          alt={`${name} main image`}
          className="object-cover w-full h-auto max-h-[450px]"
          width={300}
          height={200}
          priority={true}
        />
        <span className="absolute -bottom-2 sm:-bottom-7 right-0 p-2 sm:p-4 border-2 sm:border-4 border-violet-100 bg-black text-white text-tiny sm:text-base">
          View Gallery
        </span>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="grid place-content-center">
          <DialogContent>
            <DialogTitle className="sr-only">Room Image Gallery</DialogTitle>
            <DialogDescription className="sr-only">
              Click on arrows to check the other images
            </DialogDescription>
            <Carousel className="rounded-lg overflow-hidden h-[450px] container">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={image.url}
                      alt={`${name} {${index + 1}}`}
                      className="object-cover w-full h-auto max-h-[450px]"
                      width={300}
                      height={200}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
}
