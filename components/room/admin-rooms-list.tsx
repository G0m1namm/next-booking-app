import { ColumnDef } from '@tanstack/react-table';

import { RoomData } from '@/app/(administrator)/admin/rooms/columns';
import RoomsDataTable from './rooms-data-table';

type Props = {
  data: RoomData[];
  columns: ColumnDef<RoomData>[];
};

export default function AdminRoomsList({ data, columns }: Readonly<Props>) {
  return <RoomsDataTable data={data} columns={columns} />;
}
