import dbConnect from '@/backend/config/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import { createEdgeRouter } from 'next-connect';
import { authorizeRoles, isAuthenticated } from '@/backend/middlewares/auth';
import { deleteBooking } from '@/backend/controllers/bookingControllers';

const router = createEdgeRouter<NextRequest, unknown>();

dbConnect();

router.use(isAuthenticated, authorizeRoles("admin")).delete(deleteBooking);

export async function DELETE(
  request: NextRequest,
  ctx: unknown
): Promise<NextResponse<void | Response>> {
  return router.run(request, ctx) as Promise<NextResponse<void | Response>>;
}