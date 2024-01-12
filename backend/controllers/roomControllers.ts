import { NextRequest, NextResponse } from "next/server";
import Room, { IRoom } from "../models/room";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import APIFilters from "../utils/apiFilters";

// Get all rooms => GET /api/rooms
export const allRooms = catchAsyncErrors(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)
    const queryParams: Record<string, string> = {};
    searchParams.forEach((value, key) => queryParams[key] = value)
    const rooms: IRoom[] = await new APIFilters(Room, queryParams).search()

    return NextResponse.json({
        success: true,
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