'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { HTMLAttributes } from 'react'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { IRoom } from '@/backend/models/room';
import Link from 'next/link';

interface Props extends HTMLAttributes<HTMLDivElement> {
    aspectRatio?: 'portrait' | 'square';
    room?: IRoom
}

export default function RoomCard({ aspectRatio, className, room }: Props) {
    return (
        <div className={cn("relative space-y-3", className)}>
            {room?._id && (
                <Link className='absolute top-0 left-0 w-full h-full' href={`/rooms/${room._id}`} rel='noopener noreferrer nofollow' />
            )}
            <div className='overflow-hidden rounded-lg'>
                <Image
                    src={room?.images.length ? room.images[0].url : '/images/default_room_image.jpg'}
                    alt={room?.name ?? 'default house - no available'}
                    className={cn('w-full h-auto object-cover', aspectRatio === 'portrait' ? 'aspect-[9/16]' : 'aspect-square')}
                    width={400}
                    height={400}
                />
            </div>
            <div className='space-y-1'>
                <div className='flex justify-between items-center space-x-7'>
                    <strong className='block text-ellipsis overflow-hidden whitespace-nowrap text-100 leading-normal'>{room?.name}</strong>
                    <div className='flex items-center leading-normal'>
                        <StarFilledIcon className='size-4' />
                        <span>{room?.ratings}</span>
                    </div>
                </div>
                <span className='flex'>
                    <strong>${room?.pricePerNight} </strong>/ night
                </span>
            </div>
        </div>
    )
}