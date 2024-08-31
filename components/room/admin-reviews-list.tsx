'use client';

import { ColumnDef } from '@tanstack/react-table';

import RoomsDataTable from './rooms-data-table';
import { ReviewData } from '@/app/(administrator)/admin/rooms/[id]/reviews/columns';
import { useAppDistpatch } from '@/redux/hooks';
import { useEffect } from 'react';
import { setBreadcrumbs } from '@/redux/features/breadcrumbs/breadcrumbs-slice';
import { useParams } from 'next/navigation';

type Props = {
  roomName: string;
  data: ReviewData[];
  columns: ColumnDef<ReviewData>[];
};

export default function AdminReviewsList({ roomName, data, columns }: Readonly<Props>) {
  const dispatch = useAppDistpatch();
  const params = useParams();

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        { href: '/admin/rooms', label: 'All Rooms' },
        { href: `/admin/rooms/${params?.id}`, label: `Room ${roomName}` },
        { href: '', label: `Reviews` },
      ])
    );
  }, []);

  return <RoomsDataTable data={data} columns={columns} />;
}
