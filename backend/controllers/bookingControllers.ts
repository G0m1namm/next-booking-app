import { eachDayOfInterval } from 'date-fns';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import Booking, { IBooking } from '../models/booking';
import ErrorHandler from '../utils/errorHandler';

// Create a new room booking   => POST  /api/booking/new
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
  revalidatePath('/bookings/me', 'page');

  return NextResponse.json({
    success: true,
    booking,
  });
});

// Check room booking availability   => GET  /api/booking/check
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

// Get all booked days of a room   =>  GET /api/booking/all-booked-days
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

// Get all booked days of a room   => GET  /api/booking/all
export const getBookings = catchAsyncErrors(async (req: NextRequest) => {
  const bookings = await Booking.find({ user: req.user._id });

  return NextResponse.json({
    success: true,
    bookings,
  });
});

// Get booking details   => GET  /api/booking/:id
export const getBookingDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const booking = (await Booking.findById(params.id).populate([
      'user',
      'room',
    ])) as IBooking;

    if (booking?.user._id.toString() !== req.user._id && req?.user?.role !== 'admin') {
      throw new ErrorHandler("You don't have access to this view", 403);
    }

    return NextResponse.json({
      success: true,
      booking,
    });
  }
);

const fetchLastSixMonthsSales = async () => {
  const months = [];
  for (let i = 0; i < 6; i++) {
    const firstDay = new Date(new Date().getFullYear(), new Date().getMonth() - i, 1);
    const lastDay = new Date(new Date().getFullYear(), new Date().getMonth() - i + 1, 0);

    const sales = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: firstDay, $lte: lastDay },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$amountPaid' },
          numberOfBookings: { $sum: 1 },
        },
      },
    ]);

    months.push({
      month: firstDay.toLocaleString('default', { month: 'long' }),
      totalSales: sales.length > 0 ? sales[0].totalSales : 0,
      numberOfBookings: sales.length > 0 ? sales[0].numberOfBookings : 0,
    });
  }

  return months;
};

const fetchTopPerformingRooms = async (startDate: Date, endDate: Date) => {
  const rooms = await Booking.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: '$room',
        bookingsCount: { $sum: 1 },
      },
    },
    {
      $sort: {
        bookingsCount: -1,
      },
    },
    {
      $limit: 3,
    },
    {
      $lookup: {
        from: 'rooms',
        localField: '_id',
        foreignField: '_id',
        as: 'roomData',
      },
    },
    {
      $unwind: '$roomData',
    },
    {
      $project: {
        _id: 0,
        roomName: '$roomData.name',
        bookingsCount: 1,
      },
    },
  ]);

  return rooms ?? [];
};

// Get sales statistics   => GET  /api/admin/sales_stats
export const getSalesStats = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const startDate = new Date(searchParams.get('startDate') as string);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(searchParams.get('endDate') as string);
  endDate.setHours(23, 59, 59, 999);

  const bookings = await Booking.find({
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  const numberOfBookings = bookings.length;
  const totalSales = bookings.reduce((acc, booking) => acc + booking.amountPaid, 0);

  const lastSixMonthsSales = await fetchLastSixMonthsSales();
  const topPerformingRooms = await fetchTopPerformingRooms(startDate, endDate);

  return NextResponse.json({
    success: true,
    numberOfBookings,
    totalSales,
    lastSixMonthsSales,
    topPerformingRooms,
  });
});

// Get all bookings - Admin view => GET /api/admin/bookings
export const getAllBookingsAdmin = catchAsyncErrors(async () => {
  const bookings = await Booking.find();

  return NextResponse.json({
    success: true,
    bookings,
  });
});

// Delete booking - Admin view   => DELETE  /api/admin/bookings/:id
export const deleteBooking = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const booking = await Booking.findById(params.id);

    if (!booking) {
      throw new ErrorHandler('Booking not found with this ID', 404);
    }

    await booking?.deleteOne();

    return NextResponse.json({
      success: true,
    });
  }
);
