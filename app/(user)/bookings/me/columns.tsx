'use client';

import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { formatRFC7231 } from 'date-fns';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type Booking = {
  id: string;
  amount: number;
  checkIn: Date;
  checkOut: Date;
};

export const columns: ColumnDef<Booking>[] = [
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
    accessorKey: 'id',
    header: () => <div className="text-base text-black">Booking ID</div>,
    cell: ({ row }) => (
      <div className="text-tiny">{formatRFC7231(row.getValue('id'))}</div>
    ),
  },
  {
    accessorKey: 'checkIn',
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
      <div className="text-tiny">{formatRFC7231(row.getValue('checkIn'))}</div>
    ),
  },
  {
    accessorKey: 'checkOut',
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
    cell: ({ row }) => <div className="text-tiny">{row.getValue('checkOut')}</div>,
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right text-base text-black">Amount Paid</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="text-right font-medium text-tiny">{formatted}</div>;
    },
  },
  {
    id: 'actions',
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
            <DropdownMenuLabel className="text-base ">Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(booking.id)}>
              Copy booking ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/bookings/${booking.id}`}>View booking details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/bookings/invoice/${booking.id}`}>View invoice</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
