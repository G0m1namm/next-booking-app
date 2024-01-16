import dbConnect from "@/backend/config/dbConnect";
import { getAllRooms } from "@/backend/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext { }

const router = createEdgeRouter<NextRequest, RequestContext>()

dbConnect()

router.get(getAllRooms)

export async function GET(request: NextRequest, ctx: RequestContext): Promise<NextResponse<void | Response>> {
    return router.run(request, ctx) as Promise<NextResponse<void | Response>>;
}