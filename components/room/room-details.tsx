'use client'

import { IRoom } from '@/backend/models/room'
import React from 'react'
import { RoomCarousel } from './room-carousel'
import { StarFilledIcon, DotFilledIcon } from '@radix-ui/react-icons'
import { Separator } from '../ui/separator'

type Props = {
    data: IRoom
}

export default function RoomDetails({ data }: Props) {
    return (
        <div className='container mx-auto w-full flex flex-col min-h-svh'>
            <div className="flex flex-col mb-10">
                <h1 className='text-400'>{data.name}</h1>
                <address className='text-200'>{data.address}</address>
            </div>
            <RoomCarousel images={data.images} name={data.name} />
            <div className='flex flex-col md:flex-row w-full my-10'>
                <div className="flex-1">
                    <div className="flex w-fit items-stretch border border-foreground rounded-md py-4 px-8 space-x-6">
                        <div className="flex flex-1 flex-col space-y-2">
                            <span className='flex justify-center items-center w-full text-center leading-tight text-400 font-semibold'>{data.ratings}</span>
                            <div className="w-full text-center leading-tight flex space-x-1 justify-center">
                                <StarFilledIcon className='size-5' />
                                <StarFilledIcon className='size-5' />
                                <StarFilledIcon className='size-5' />
                                <StarFilledIcon className='size-5' />
                                <StarFilledIcon className='size-5' />
                            </div>
                        </div>
                        <Separator className='h-full' orientation='vertical' />
                        <div className="flex flex-1 flex-col justify-center space-y-2">
                            <span className='flex justify-center items-center w-full text-center leading-tight text-400 font-semibold'>{data.guestCapacity}</span>
                            <span className='flex justify-center items-center w-full text-center leading-tight text-100'>Guests</span>
                        </div>
                        <Separator className='h-full' orientation='vertical' />
                        <div className="flex flex-1 flex-col justify-center space-y-2">
                            <span className='flex justify-center items-center w-full text-center leading-tight text-400 font-semibold'>{data.numOfBeds}</span>
                            <span className='flex justify-center items-center w-full text-center leading-tight text-100'>Beds</span>
                        </div>
                        <Separator className='h-full' orientation='vertical' />
                        <div className="flex flex-1 flex-col justify-center space-y-2">
                            <span className='flex justify-center items-center w-full text-center leading-tight text-400 font-semibold'>{data.numOfReviews}</span>
                            <a className='flex justify-center items-center w-full text-center leading-tight text-100 underline' href="#reviews">Reviews</a>
                        </div>
                    </div>
                </div>
                <aside className='sticky top-0 flex-none w-[300px]'>
                    Room Map
                </aside>
            </div>
        </div>
    )
}