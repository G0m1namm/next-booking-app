import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';

export type HandlerType<T> = (
  req: NextRequest,
  params: any
) => Promise<NextResponse<T | ApiError>>;

export interface IValidationError {
  message: string;
}

export const catchAsyncErrors =
  <T>(handler: HandlerType<T>) =>
  async (req: NextRequest, params: any) => {
    try {
      return await handler(req, params);
    } catch (error: any) {
      if (error?.name === 'CastError') {
        error.message = `Resource not found. Invalid ${error?.path}`;
        error.statusCode = 400;
      }
      if (error?.name === 'ValidationError') {
        error.message = Object.values<IValidationError>(error.errors).map(
          (value) => value.message
        );
        error.statusCode = 400;
      }

      // Handling Mongoose Duplicate Validation Error
      if (error.code === 11000) {
        error.message = `Duplicate ${Object.keys(error.keyValue)} entered`;
        error.statusCode = 400;
      }
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: error.statusCode || 500 }
      );
    }
  };
