import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";

// Get all rooms => GET /api/rooms
export const allRooms = async (req: NextRequest) => {
    const rooms = await Room.find()

    return NextResponse.json({
        success: true,
        rooms
    })
}

// Create new room => POST /api/admin/rooms
export const newRoom = async (req: NextRequest) => {
    const body = await req.json()

    const room = await Room.create(body)

    return NextResponse.json({
        success: true,
        room
    })
}

// Get single room => GET /api/rooms/:id
export const getRoomById = async (req: NextRequest, {params}: {params: {id: string}}) => {
    const room = await Room.findById(params.id)

    if(!room) return NextResponse.json(
        {
            message: "Room not found"
        },
        { status: 404 }
    )

    return NextResponse.json({
        success: true,
        room
    })
}

// Update single room => PUT /api/admin/rooms/:id
export const updateRoomById = async (req: NextRequest, {params}: {params: {id: string}}) => {
    let room = await Room.findById(params.id)
    const body = await req.json()
    
    if(!room) return NextResponse.json(
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
}