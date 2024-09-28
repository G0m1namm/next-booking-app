import { IBooking } from '@/backend/models/booking';
import { getAuthHeader } from '@/backend/utils/getAuthHeader';

import BookingsList from '@/components/bookings/bookings-list';
import { getApiUrl } from '@/lib/getBaseUrl';

import { columns } from './columns';
import ErrorPage from './error';

export const metadata = {
  title: 'My Bookings',
  description: 'Manage your bookings',
};

const getBookings = async () => {
  const headers = getAuthHeader();
  const res = await fetch(`${getApiUrl()}/booking/all`, headers);
  const info = await res.json();
  return info;
};

export default async function Page() {
  const data = await getBookings();

  if (!data.success) {
    return <ErrorPage error={data} />;
  }

  const bookings = data.bookings as IBooking[];
  const bookingsDataParsed = bookings.map((booking) => {
    return {
      id: booking._id as string,
      checkIn: booking.checkInDate,
      checkOut: booking.checkOutDate,
      amount: booking.amountPaid,
    };
  });

  return (
    <div className="pt-10 container">
      <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>
      <BookingsList data={bookingsDataParsed} columns={columns} />
    </div>
  );
}
