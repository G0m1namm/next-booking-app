import { ColumnDef } from '@tanstack/react-table';

import RoomsDataTable from './rooms-data-table';
import { BookingData } from '@/app/(administrator)/admin/bookings/columns';

type Props = {
  data: BookingData[];
  columns: ColumnDef<BookingData>[];
};

export default function AdminBookingsList({ data, columns }: Readonly<Props>) {
  return <RoomsDataTable data={data} columns={columns} />;
}
