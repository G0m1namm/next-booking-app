'use client';

import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { formatISO9075 } from 'date-fns';
import { useDeleteBookingMutation } from '@/redux/api/booking';

export type BookingData = {
  bookingId: string;
  checkInDate: string;
  checkOutDate: string;
};

export const columns: ColumnDef<BookingData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'bookingId',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Booking ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-base pl-4">{row.getValue('bookingId')}</div>,
  },
  {
    accessorKey: 'checkInDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Check In
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-base pl-4">
        {formatISO9075(row.getValue('checkInDate'), { representation: 'date' })}
      </div>
    ),
  },
  {
    accessorKey: 'checkOutDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Check Out
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-base pl-4">
        {formatISO9075(row.getValue('checkOutDate'), { representation: 'date' })}
      </div>
    ),
  },
  {
    id: 'actions',
    header: () => <div className="text-base text-black">Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const booking = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(booking.bookingId)}
              className="cursor-pointer"
            >
              Copy booking ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/bookings/${booking.bookingId}`} className="cursor-pointer">
                View booking details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/bookings/invoice/${booking.bookingId}`}
                className="cursor-pointer"
              >
                View invoice
              </Link>
            </DropdownMenuItem>
            <DeleteBookingMenuItem id={booking.bookingId} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const DeleteBookingMenuItem = ({ id }: { id: string }) => {
  const [deleteBooking, { isSuccess, isLoading }] = useDeleteBookingMutation();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      toast.loading('Your booking is being deleted...');
    }
    if (isSuccess) {
      toast.success('Booking successfully deleted');
      router.refresh();
    }
  }, [isSuccess, isLoading]);

  return (
    <DropdownMenuItem asChild>
      <AlertDialog>
        <AlertDialogTrigger className="text-destructive hover:!text-destructive-foreground hover:!bg-destructive cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-tiny outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full">
          Delete Booking
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the booking
              information.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteBooking(id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenuItem>
  );
};
