import dbConnect from '@/backend/config/dbConnect';
import { getBookingDetails } from '@/backend/controllers/bookingControllers';
import { isAuthenticated } from '@/backend/middlewares/auth';
import { NextRequest, NextResponse } from 'next/server';
import { createEdgeRouter } from 'next-connect';

const router = createEdgeRouter<NextRequest, unknown>();

dbConnect();

router.use(isAuthenticated).get(getBookingDetails);

export async function GET(
  request: NextRequest,
  ctx: unknown
): Promise<NextResponse<void | Response>> {
  return router.run(request, ctx) as Promise<NextResponse<void | Response>>;
}
