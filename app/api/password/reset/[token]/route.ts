import dbConnect from '@/backend/config/dbConnect';
import { resetPassword } from '@/backend/controllers/authControllers';
import { NextRequest, NextResponse } from 'next/server';
import { createEdgeRouter } from 'next-connect';

const router = createEdgeRouter<NextRequest, unknown>();

dbConnect();

router.put(resetPassword);

export async function PUT(
  request: NextRequest,
  ctx: unknown
): Promise<NextResponse<void | Response>> {
  return router.run(request, ctx) as Promise<NextResponse<void | Response>>;
}
