'use client';

import { ColumnDef } from '@tanstack/react-table';

import RoomsDataTable from './rooms-data-table';
import { UserData } from '@/app/(administrator)/admin/users/columns';
import { useEffect } from 'react';
import { resetBreadcrumbs } from '@/redux/features/breadcrumbs/breadcrumbs-slice';
import { useAppDistpatch } from '@/redux/hooks';

type Props = {
  data: UserData[];
  columns: ColumnDef<UserData>[];
};

export default function AdminUsersList({ data, columns }: Readonly<Props>) {
  const dispatch = useAppDistpatch();

  useEffect(() => {
    dispatch(resetBreadcrumbs());
  }, []);

  return <RoomsDataTable data={data} columns={columns} />;
}
