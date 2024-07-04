import dbConnect from '@/backend/config/dbConnect';
import { getAllRoomsAdmin, newRoom } from '@/backend/controllers/roomControllers';
import { NextRequest, NextResponse } from 'next/server';
import { createEdgeRouter } from 'next-connect';
import { authorizeRoles, isAuthenticated } from '@/backend/middlewares/auth';

const router = createEdgeRouter<NextRequest, unknown>();

dbConnect();

router.use(isAuthenticated, authorizeRoles("admin")).post(newRoom);
router.use(isAuthenticated, authorizeRoles("admin")).get(getAllRoomsAdmin);

export async function GET(
  request: NextRequest,
  ctx: unknown
): Promise<NextResponse<void | Response>> {
  return router.run(request, ctx) as Promise<NextResponse<void | Response>>;
}

export async function POST(
  request: NextRequest,
  ctx: unknown
): Promise<NextResponse<void | Response>> {
  return router.run(request, ctx) as Promise<NextResponse<void | Response>>;
}
