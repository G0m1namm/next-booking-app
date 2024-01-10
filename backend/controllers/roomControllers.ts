import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

// Get all rooms => GET /api/rooms
export const allRooms = catchAsyncErrors(async (req: NextRequest) => {
    const rooms = await Room.find()

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

    if (!room) return NextResponse.json(
        {
            message: "Room not found"
        },
        { status: 404 }
    )

    return NextResponse.json({
        success: true,
        room
    })
})

// Update single room => PUT /api/admin/rooms/:id
export const updateRoomById = catchAsyncErrors(async (req: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id)
    const body = await req.json()

    if (!room) return NextResponse.json(
        {
            message: "Room not found"
        },
        { status: 404 }
    )

    room = await Room.findByIdAndUpdate(params.id, body, { new: true })

    return NextResponse.json({
        success: true,
        room
    })
})

// Delete single room => DELETE /api/admin/rooms/:id
export const deleteRoomById = catchAsyncErrors(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id)

    if (!room) return NextResponse.json(
        {
            message: "Room not found"
        },
        { status: 404 }
    )

    // TODO: delete images related to the room
    await room.deleteOne()

    return NextResponse.json({
        success: true
    })
})