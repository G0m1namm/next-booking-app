'use client';

import { ColumnDef } from '@tanstack/react-table';

import { RoomData } from '@/app/(administrator)/admin/rooms/columns';
import RoomsDataTable from './rooms-data-table';
import { useEffect } from 'react';
import { resetBreadcrumbs } from '@/redux/features/breadcrumbs/breadcrumbs-slice';
import { useAppDistpatch } from '@/redux/hooks';

type Props = {
  data: RoomData[];
  columns: ColumnDef<RoomData>[];
};

export default function AdminRoomsList({ data, columns }: Readonly<Props>) {
  const dispatch = useAppDistpatch();

  useEffect(() => {
    dispatch(resetBreadcrumbs());
  }, []);

  return <RoomsDataTable data={data} columns={columns} />;
}
