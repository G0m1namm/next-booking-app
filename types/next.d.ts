import { IUser } from '@/backend/models/user';

declare module '@radix-ui/react-popover';
declare module 'next/server' {
  interface NextRequest {
    user: IUser;
  }
}
