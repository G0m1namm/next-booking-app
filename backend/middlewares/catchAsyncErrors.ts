import { NextRequest, NextResponse } from "next/server";

type HandlerType = (req: NextRequest, params: any) => Promise<NextResponse>

export const catchAsyncErrors = (handler: HandlerType) => async (req: NextRequest, params: any) => {
    try {
        await handler(req, params)
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, { status: error.statusCode || 500 })
    }
}