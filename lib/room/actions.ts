import {
  GetRoomResponseType,
  IPagination,
  IRoomResponse,
} from '@/backend/controllers/roomControllers';
import { ApiError } from 'next/dist/server/api-utils';

import { getApiUrl } from '../getBaseUrl';

export const getRooms = async (
  searchParams: string
): Promise<GetRoomResponseType & Pick<ApiError, 'message'>> => {
  const query = new URLSearchParams(searchParams);
  try {
    console.log("API => ", `${getApiUrl()}/rooms?${query.toString()}`);
    
    const res = await fetch(`${getApiUrl()}/rooms?${query.toString()}`, {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Data => ", res);
    const data = await res.json();
    
    return data;
  } catch (error) {
    console.log("Error => ", error);
    
    return {
      success: true,
      message: 'Failed to retrieve the rooms',
    };
  }
};

export const getSingleRoom = async (
  id: string
): Promise<IPagination & IRoomResponse & Pick<ApiError, 'message'>> => {
  try {
    const res = await fetch(`${getApiUrl()}/rooms/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      next: {
        tags: ['RoomDetails'],
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return {
      success: true,
      message: 'Failed to retrieve the room details',
    };
  }
};
