import { Booking } from '@/app/bookings/me/columns';
import { ColumnDef } from '@tanstack/react-table';

import BookingsDataTable from './bookings-data-table';

type Props = {
  data: Booking[];
  columns: ColumnDef<Booking>[];
};

export default function BookingsList({ data, columns }: Props) {
  return <BookingsDataTable data={data} columns={columns} />;
}
