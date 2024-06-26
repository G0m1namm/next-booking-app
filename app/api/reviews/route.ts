import dbConnect from '@/backend/config/dbConnect';
import { createRoomReview } from '@/backend/controllers/roomControllers';
import { NextRequest, NextResponse } from 'next/server';
import { createEdgeRouter } from 'next-connect';
import { isAuthenticated } from '@/backend/middlewares/auth';

const router = createEdgeRouter<NextRequest, unknown>();

dbConnect();

router.use(isAuthenticated).put(createRoomReview);

export async function PUT(
  request: NextRequest,
  ctx: unknown
): Promise<NextResponse<void | Response>> {
  return router.run(request, ctx) as Promise<NextResponse<void | Response>>;
}
