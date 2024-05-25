import dbConnect from '@/backend/config/dbConnect';
import { getRoomById } from '@/backend/controllers/roomControllers';
import { NextRequest, NextResponse } from 'next/server';
import { createEdgeRouter } from 'next-connect';

interface RequestContext {
  params: {
    id: 'string';
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(getRoomById);

export async function GET(
  request: NextRequest,
  ctx: RequestContext
): Promise<NextResponse<void | Response>> {
  return router.run(request, ctx) as Promise<NextResponse<void | Response>>;
}
