import { NextRequest, NextResponse } from 'next/server';

import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import Room, { IImage, IReview, IRoom } from '../models/room';
import APIFilters from '../utils/apiFilters';
import ErrorHandler from '../utils/errorHandler';
import { revalidatePath, revalidateTag } from 'next/cache';
import Booking from '../models/booking';
import { deleteFIle } from '@/lib/cloudinary';

const FILTERS_NOT_ALLOWED = ['location', 'page', 'numOfKids', 'numOfAdults'];
const RESULTS_PER_PAGE = 8;

export interface IRoomResponse {
  success: boolean;
  room?: IRoom;
  rooms?: IRoom[];
}

export interface IPagination {
  limit?: number;
  page?: number;
  totalResults?: number;
  totalFiltered?: number;
  totalPages?: number;
}

export interface GetRoomResponseType extends Omit<IRoomResponse, 'room'>, IPagination {}

// Get all rooms => GET /api/rooms
export const getAllRooms = catchAsyncErrors<GetRoomResponseType>(
  async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const numOfAdults = !isNaN(Number(searchParams.get('numOfAdults'))) ? Number(searchParams.get('numOfAdults')) : 0;
    const numOfKids = !isNaN(Number(searchParams.get('numOfKids'))) ? Number(searchParams.get('numOfKids')) : 0;
    const numOfBeds = !isNaN(Number(searchParams.get('numOfBeds'))) ? Number(searchParams.get('numOfBeds')) : 0;
    const queryParams: Record<string, string | number | object> = {};
    const totalResults = await Room.countDocuments();

    searchParams.forEach((value, key) => (queryParams[key] = value));

    if (queryParams?.name) {
      queryParams.name = {
        $regex: queryParams.name,
        $options: 'i', // Case-sensitive
      };
    }

    if(numOfAdults || numOfKids) {
      queryParams.guestCapacity = {
        $gte: numOfAdults + numOfKids
      }
    }

    if(numOfBeds) {
      queryParams.numOfBeds = {
        $gte: numOfBeds
      }
    }

    FILTERS_NOT_ALLOWED.forEach((filter) => delete queryParams[filter]);

    const apiFilters = new APIFilters(Room, queryParams);
    let rooms: IRoom[] = await apiFilters.search();
    const totalFiltered = rooms.length;
    rooms = await apiFilters.pagination(page, RESULTS_PER_PAGE);
    const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

    return NextResponse.json({
      success: true,
      limit: RESULTS_PER_PAGE,
      page,
      totalResults,
      totalFiltered,
      totalPages,
      rooms,
    });
  }
);

// Create new room => POST /api/admin/rooms
export const newRoom = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  body.user = req.user._id;

  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room,
  });
});

// Get single room => GET /api/rooms/:id
export const getRoomById = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id).populate({
      path: 'reviews',
      populate: { path: 'user', model: 'User', select: 'name avatar' },
    });

    if (!room) throw new ErrorHandler('Room not found', 404);

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// Update single room => PUT /api/admin/rooms/:id
export const updateRoomById = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) throw new ErrorHandler('Room not found', 404);

    room = await Room.findByIdAndUpdate(params.id, body, { new: true });

    revalidateTag('RoomDetails');
    revalidateTag('Rooms');

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// Delete single room => DELETE /api/admin/rooms/:id
export const deleteRoomById = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);

    if (!room) throw new ErrorHandler('Room not found', 404);

    // TODO: delete images related to the room
    const allPromises = room.images.map((image: IImage, index: number) => {
      return deleteFIle(image.public_id);
    });

    await Promise.allSettled(allPromises);

    await room.deleteOne();

    return NextResponse.json({
      success: true,
    });
  }
);

// Upload images to single room => PUT /api/admin/rooms/:id/upload_images
export const uploadImages = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) throw new ErrorHandler('Room not found', 404);

    const withNewImages = body.images;

    room = await Room.findByIdAndUpdate(params.id, { images: withNewImages });

    revalidateTag('RoomDetails');
    revalidateTag('Rooms');

    return NextResponse.json({
      success: true,
      images: room.images,
    });
  }
);

// Upload images to single room => PUT /api/admin/rooms/:id/delete_image
export const deleteImage = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) throw new ErrorHandler('Room not found', 404);

    const isDeleted = await deleteFIle(body.imageId);

    if (isDeleted) {
      const newImagesList = room.images.filter(
        (image: IImage) => image.public_id !== body.imageId
      );

      room = await Room.findByIdAndUpdate(params.id, { images: newImagesList });

      revalidateTag('RoomDetails');
      revalidateTag('Rooms');
    }

    return NextResponse.json({
      success: true,
      images: room.images,
    });
  }
);

// Create/Update room review => POST /api/rooms/reviews
export const createRoomReview = catchAsyncErrors(async (req: NextRequest) => {
  const { rating, comment, roomId } = await req.json();

  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment,
  };
  try {
    const room = (await Room.findById(roomId)) as IRoom;
    room.user = req.user._id;
    const isReviewed = room.reviews.find(
      (r: IReview) => r.user._id.toString() === req.user._id.toString()
    );
    if (isReviewed) {
      room.reviews.forEach((review: IReview) => {
        if (review.user._id.toString() === req.user._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      room.reviews.push(review as IReview);
      room.numOfReviews = room.reviews.length;
    }

    room.ratings =
      room.reviews.reduce((acc, item) => item.rating + acc, 0) / room.reviews.length;

    await room.save();

    revalidatePath('/rooms/[id]', 'page');

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.log(error);

    throw new ErrorHandler(error.message, 400);
  }
});

// Delete room review - Admin View => PUT /api/admin/rooms/:id/reviews
export const deleteRoomReview = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { reviewId } = await req.json();

    try {
      const room = (await Room.findById(params.id)) as IRoom;

      const reviews = room.reviews.filter((review) => review._id.toString() !== reviewId);
      const numOfReviews = reviews.length;
      const ratings =
        numOfReviews === 0
          ? 0
          : reviews.reduce((acc, item) => item.rating + acc, 0) / room.reviews.length;

      await Room.findByIdAndUpdate(params.id, { reviews, numOfReviews, ratings });

      revalidatePath('/admin/rooms/[id]/reviews', 'page');

      return NextResponse.json({
        success: true,
      });
    } catch (error: any) {
      console.log(error);

      throw new ErrorHandler(error.message, 400);
    }
  }
);

// Can user review room => GET /api/reviews/can_review
export const canReview = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get('roomId');
  try {
    const bookings = await Booking.find({ user: req.user._id, room: roomId });
    const isAllowed = bookings.length > 0 ? true : false;

    return NextResponse.json({
      canReview: isAllowed,
    });
  } catch (error: any) {
    throw new ErrorHandler(error.message, 400);
  }
});

// Get all rooms - Admin view => GET /api/admin/rooms
export const getAllRoomsAdmin = catchAsyncErrors(async () => {
  const rooms = await Room.find();

  return NextResponse.json({
    success: true,
    rooms,
  });
});
