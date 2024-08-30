import dbConnect from '@/backend/config/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import { createEdgeRouter } from 'next-connect';
import { authorizeRoles, isAuthenticated } from '@/backend/middlewares/auth';
import { deleteUser, getUserDetails, updateUser } from '@/backend/controllers/authControllers';

const router = createEdgeRouter<NextRequest, unknown>();

dbConnect();

router.use(isAuthenticated, authorizeRoles("admin")).get(getUserDetails);
router.use(isAuthenticated, authorizeRoles("admin")).put(updateUser);
router.use(isAuthenticated, authorizeRoles("admin")).delete(deleteUser);

export async function GET(
  request: NextRequest,
  ctx: unknown
): Promise<NextResponse<void | Response>> {
  return router.run(request, ctx) as Promise<NextResponse<void | Response>>;
}

export async function PUT(
  request: NextRequest,
  ctx: unknown
): Promise<NextResponse<void | Response>> {
  return router.run(request, ctx) as Promise<NextResponse<void | Response>>;
}

export async function DELETE(
  request: NextRequest,
  ctx: unknown
): Promise<NextResponse<void | Response>> {
  return router.run(request, ctx) as Promise<NextResponse<void | Response>>;
}