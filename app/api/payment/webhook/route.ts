import dbConnect from '@/backend/config/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import { createEdgeRouter } from 'next-connect';
import { webhookCheckout } from '@/backend/controllers/paymentControllers';

const router = createEdgeRouter<NextRequest, unknown>();

dbConnect();

router.post(webhookCheckout);

export async function POST(
  request: NextRequest,
  ctx: unknown
): Promise<NextResponse<void | Response>> {
  return router.run(request, ctx) as Promise<NextResponse<void | Response>>;
}
