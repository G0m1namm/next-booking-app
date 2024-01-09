import dbConnect from "@/backend/config/dbConnect";
import { updateRoomById } from "@/backend/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
    params: {
        id: 'string'
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>()

dbConnect()

router.put(updateRoomById)

export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}