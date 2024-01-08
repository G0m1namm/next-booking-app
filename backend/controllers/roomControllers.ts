import { NextRequest, NextResponse } from "next/server";

export const allRooms = (req: NextRequest) => {
    return NextResponse.json({
        data: "Hello"
    })
}