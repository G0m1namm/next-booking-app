import { eachDayOfInterval } from 'date-fns';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import Booking from '../models/booking';

// Create a new room booking   =>   /api/booking/new
export const newBooking = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();
  const { room, checkInDate, checkOutDate, daysOfStay, amountPaid, paymentInfo } = body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });

  revalidatePath('/rooms/[id]', 'page');

  return NextResponse.json({
    success: true,
    booking,
  });
});

// Check room booking availability   =>   /api/booking/check
export const checkRoomBookingAvailability = catchAsyncErrors(async (req: NextRequest) => {
  // Get params from request url
  const { searchParams } = new URL(req.url);

  const roomId = searchParams.get('roomId');
  const checkInDate: Date = new Date(searchParams.get('checkInDate') as string);
  const checkOutDate: Date = new Date(searchParams.get('checkOutDate') as string);

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      { checkInDate: { $lte: checkOutDate } },
      { checkOutDate: { $gte: checkInDate } },
    ],
  });

  // Check if there is any booking available
  const isAvailable = bookings?.length === 0;

  return NextResponse.json({
    success: true,
    isAvailable,
  });
});

// Get all booked days of a room   =>   /api/booking/all-booked-days
export const getAllBookedDays = catchAsyncErrors(async (req: NextRequest) => {
  // Get params from request url
  const { searchParams } = new URL(req.url);

  const roomId = searchParams.get('roomId');

  const bookings = await Booking.find({ room: roomId });
  const allBookedDates = bookings.flatMap((booking) =>
    eachDayOfInterval({
      start: booking.checkInDate,
      end: booking.checkOutDate,
    })
  );

  return NextResponse.json({
    success: true,
    allBookedDates,
  });
});

// Get all booked days of a room   =>   /api/booking/all
export const getBookings = catchAsyncErrors(async (req: NextRequest) => {
  const bookings = await Booking.find({ user: req.user._id });

  return NextResponse.json({
    success: true,
    bookings,
  });
});
