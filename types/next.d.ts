import { IUser } from '@/backend/models/user';

declare module 'next/server' {
  interface NextRequest {
    user: IUser;
  }
}
