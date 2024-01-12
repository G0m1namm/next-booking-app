import dbConnect from "@/backend/config/dbConnect";
import { newRoom } from "@/backend/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext { }

const router = createEdgeRouter<NextRequest, RequestContext>()

dbConnect()

router.post(newRoom)

export async function POST(request: NextRequest, ctx: RequestContext): Promise<NextResponse<void | Response>> {
    return router.run(request, ctx) as Promise<NextResponse<void | Response>>;
}