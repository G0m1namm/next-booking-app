'use client';

import { IUser } from '@/backend/models/user';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

export default function UserNav() {
  const { data } = useSession();
  const user = data?.user as IUser;
  const avatarUrl = user?.avatar?.url || '/images/avatar.jpg';

  if (data === undefined) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-8 w-16" />
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className="relative size-8 rounded-full">
          <Avatar className="size-8">
            <AvatarImage src={avatarUrl} alt="user avatar" />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background text-black">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => toast('say somethin!')}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem>My Bookings</DropdownMenuItem>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-400 cursor-pointer" onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
