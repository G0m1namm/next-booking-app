import dbConnect from '@/backend/config/dbConnect';
import { signCloudinaryRequest } from '@/backend/controllers/authControllers';
import { isAuthenticated } from '@/backend/middlewares/auth';
import { NextRequest, NextResponse } from 'next/server';
import { createEdgeRouter } from 'next-connect';

const router = createEdgeRouter<NextRequest, unknown>();

dbConnect();

router.use(isAuthenticated).post(signCloudinaryRequest);

export async function POST(
  request: NextRequest,
  ctx: unknown
): Promise<NextResponse<void | Response>> {
  return router.run(request, ctx) as Promise<NextResponse<void | Response>>;
}
