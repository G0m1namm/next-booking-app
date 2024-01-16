import { NextRequest, NextResponse } from "next/server";
import Room, { IRoom } from "../models/room";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import APIFilters from "../utils/apiFilters";

const FILTERS_NOT_ALLOWED = ['location', 'page']
const RESULTS_PER_PAGE = 8;

interface IRoomResponse {
    success: boolean,
    room?: IRoom,
    rooms?: IRoom[]
}

interface IPagination {
    limit?: number,
    page?: number,
    totalResults?: number,
    totalFiltered?: number
}

export interface GetRoomResponseType extends Omit<IRoomResponse, 'room'>, IPagination { }

// Get all rooms => GET /api/rooms
export const getAllRooms = catchAsyncErrors<GetRoomResponseType>(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get('page')) || 1;
    const queryParams: Record<string, any> = {};
    const totalResults = await Room.countDocuments()

    searchParams.forEach((value, key) => queryParams[key] = value)

    if (queryParams?.location) {
        queryParams.address = {
            $regex: queryParams.location,
            $options: 'i' // Case-sensitive
        }
    }

    FILTERS_NOT_ALLOWED.forEach(filter => delete queryParams[filter])

    const apiFilters = new APIFilters(Room, queryParams)
    let rooms: IRoom[] = await apiFilters.search()
    const totalFiltered = rooms.length
    rooms = await apiFilters.pagination(page, RESULTS_PER_PAGE)

    return NextResponse.json({
        success: true,
        limit: RESULTS_PER_PAGE,
        page,
        totalResults,
        totalFiltered,
        rooms
    })
})

// Create new room => POST /api/admin/rooms
export const newRoom = catchAsyncErrors(async (req: NextRequest) => {
    const body = await req.json()

    const room = await Room.create(body)

    return NextResponse.json({
        success: true,
        room
    })
})

// Get single room => GET /api/rooms/:id
export const getRoomById = catchAsyncErrors(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id)

    if (!room) throw new ErrorHandler("Room not found", 404)

    return NextResponse.json({
        success: true,
        room
    })
})

// Update single room => PUT /api/admin/rooms/:id
export const updateRoomById = catchAsyncErrors(async (req: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id)
    const body = await req.json()

    if (!room) throw new ErrorHandler("Room not found", 404)

    room = await Room.findByIdAndUpdate(params.id, body, { new: true })

    return NextResponse.json({
        success: true,
        room
    })
})

// Delete single room => DELETE /api/admin/rooms/:id
export const deleteRoomById = catchAsyncErrors(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id)

    if (!room) throw new ErrorHandler("Room not found", 404)

    // TODO: delete images related to the room
    await room.deleteOne()

    return NextResponse.json({
        success: true
    })
})