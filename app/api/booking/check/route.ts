import dbConnect from '@/backend/config/dbConnect';
import { checkRoomBookingAvailability } from '@/backend/controllers/bookingControllers';
import { NextRequest, NextResponse } from 'next/server';
import { createEdgeRouter } from 'next-connect';

const router = createEdgeRouter<NextRequest, unknown>();

dbConnect();

router.get(checkRoomBookingAvailability);

export async function GET(
  request: NextRequest,
  ctx: unknown
): Promise<NextResponse<void | Response>> {
  return router.run(request, ctx) as Promise<NextResponse<void | Response>>;
}
