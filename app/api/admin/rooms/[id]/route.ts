import dbConnect from '@/backend/config/dbConnect';
import { deleteRoomById, updateRoomById } from '@/backend/controllers/roomControllers';
import { NextRequest, NextResponse } from 'next/server';
import { createEdgeRouter } from 'next-connect';
import { authorizeRoles, isAuthenticated } from '@/backend/middlewares/auth';
interface RequestContext {
  params: {
    id: 'string';
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticated, authorizeRoles('admin')).put(updateRoomById);
router.use(isAuthenticated, authorizeRoles('admin')).delete(deleteRoomById);

export async function PUT(
  request: NextRequest,
  ctx: RequestContext
): Promise<NextResponse<void | Response>> {
  return router.run(request, ctx) as Promise<NextResponse<void | Response>>;
}

export async function DELETE(
  request: NextRequest,
  ctx: RequestContext
): Promise<NextResponse<void | Response>> {
  return router.run(request, ctx) as Promise<NextResponse<void | Response>>;
}
