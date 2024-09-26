import { getAuthHeader } from '@/backend/utils/getAuthHeader';

import { getApiUrl } from '@/lib/getBaseUrl';

import { columns } from './columns';
import ErrorPage from './error';
import AdminPageLayout from '@/layouts/admin-page-layout';
import { Badge } from '@/components/ui/badge';



import AdminBookingsList from '@/components/room/admin-bookings-list';
import { IBooking } from '@/backend/models/booking';

export const metadata = {
  title: 'All Bookings | Administrator',
  description: 'Manage all bookings in the system.',
};

const getAllBookings = async () => {
  const authHeaders = getAuthHeader();
  const res = await fetch(`${getApiUrl()}/admin/bookings`, {
    headers: authHeaders.headers,
    next: {
      tags: ['Bookings'],
    },
  });
  const info = await res.json();
  return info;
};

export default async function Page() {
  const data = await getAllBookings();

  if (!data.success) {
    return <ErrorPage error={data} />;
  }

  const bookings = data.bookings as IBooking[];
  const bookingsDataParsed = bookings.map((booking) => {
    return {
      bookingId: booking._id?.toString(),
      checkInDate: booking.checkInDate.toString(),
      checkOutDate: booking.checkOutDate.toString(),
    };
  });

  return (
    <AdminPageLayout title={<PageHeader totalBookings={bookings.length} />}>
      <AdminBookingsList data={bookingsDataParsed} columns={columns} />
    </AdminPageLayout>
  );
}

function PageHeader({ totalBookings }: Readonly<{ totalBookings: number }>) {
  return (
    <div className="flex w-full justify-between items-center">
      <h1 className="text-xl font-semibold md:text-2xl inline-flex items-center gap-3">
        <span>All Bookings</span>
        <Badge className="inline-block text-lg">{totalBookings}</Badge>
      </h1>
    </div>
  );
}
