import { ColumnDef } from '@tanstack/react-table';

import RoomsDataTable from './rooms-data-table';
import { UserData } from '@/app/(administrator)/admin/users/columns';

type Props = {
  data: UserData[];
  columns: ColumnDef<UserData>[];
};

export default function AdminUsersList({ data, columns }: Readonly<Props>) {
  return <RoomsDataTable data={data} columns={columns} />;
}
