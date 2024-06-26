import { NextRequest, NextResponse } from 'next/server';

import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import Room, { IReview, IRoom } from '../models/room';
import APIFilters from '../utils/apiFilters';
import ErrorHandler from '../utils/errorHandler';
import { revalidatePath } from 'next/cache';

const FILTERS_NOT_ALLOWED = ['location', 'page'];
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
    const queryParams: Record<string, string | number | object> = {};
    const totalResults = await Room.countDocuments();

    searchParams.forEach((value, key) => (queryParams[key] = value));

    if (queryParams?.location) {
      queryParams.address = {
        $regex: queryParams.location,
        $options: 'i', // Case-sensitive
      };
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

  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room,
  });
});

// Get single room => GET /api/rooms/:id
export const getRoomById = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id).populate({path: 'reviews', populate: {path: 'user', model: "User", select: 'name avatar'}});

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
    await room.deleteOne();

    return NextResponse.json({
      success: true,
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
    const room = await Room.findById(roomId) as IRoom;
    const isReviewed = room.reviews.find((r: IReview) => r.user.toString() === req.user._id.toString());
    if(isReviewed) {
      room.reviews.forEach((review: IReview) => {
        if(review.user.toString() === req.user._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      room.reviews.push(review as IReview);
      room.numOfReviews = room.reviews.length;
    }

    room.ratings = room.reviews.reduce((acc, item) => item.rating + acc, 0) / room.reviews.length;

    await room.save();

    revalidatePath("/rooms/[id]", "page");

    return NextResponse.json({
      success: true
    });
  } catch (error: any) {
    throw new ErrorHandler(error.message, 400);
  }
})