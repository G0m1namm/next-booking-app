'use client';

import { ColumnDef } from '@tanstack/react-table';

import RoomsDataTable from './rooms-data-table';
import { BookingData } from '@/app/(administrator)/admin/bookings/columns';
import { useAppDistpatch } from '@/redux/hooks';
import { useEffect } from 'react';
import { resetBreadcrumbs } from '@/redux/features/breadcrumbs/breadcrumbs-slice';

type Props = {
  data: BookingData[];
  columns: ColumnDef<BookingData>[];
};

export default function AdminBookingsList({ data, columns }: Readonly<Props>) {
  const dispatch = useAppDistpatch();

  useEffect(() => {
    dispatch(resetBreadcrumbs());
  }, []);
  return <RoomsDataTable data={data} columns={columns} />;
}
