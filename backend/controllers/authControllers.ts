import { NextRequest, NextResponse } from "next/server"

import { catchAsyncErrors } from "../middlewares/catchAsyncErrors"
import User from "../models/user"

// Register a user => /api/auth/register
export const registerUser = catchAsyncErrors(async (req: NextRequest) => {
    const { name, email, password } = await req.json()

    await User.create({
        name,
        email,
        password
    })

    return NextResponse.json({
        success: true,
    })
})