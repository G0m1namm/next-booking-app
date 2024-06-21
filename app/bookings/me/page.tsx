import { IBooking } from '@/backend/models/booking';

import BookingsList from '@/components/bookings/bookings-list';
import { getApiUrl } from '@/lib/getBaseUrl';

import { columns } from './columns';
import ErrorPage from './error';

export const metadata = {
  title: 'My Bookings',
  description: 'Manage your bookings',
};

const getBookings = async () => {
  const res = await fetch(`${getApiUrl()}/booking/all`, {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Cookie:
        'next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..iD9L53CpSEXqdAz8.JmfHV6RvJRUc_8eIeZz7YoWQOO0Mb6vT6igRJn3VAuBQxQxlh0XUjlo-_HcHADWL77fr9_P4PT-v9lPtnSkwHJ1fuIfiI02p7vadFD6e9TT3qBtdTWy9ka9-yR9UsLKsSA8vrHdisbUerjCsucDWSovSh7AncM7bvnKZiGYN90ZKJESrqlfFG0Z88D-jNcajc5sb7ceEGY3evrbCQU6IjXLU3peeAYsxcPojx-gZucJ_05crZ9MbQRRdk9609C98AUcUQYhN76VKiC--0wZl9BdKCR3M-ZSFvcdIVLlIU18oZBXsODpsLD_YZjB7vfrwhRbtGKduwtbBeiBa9TpTNgY21_qhAUS6oCc-bTtXi7PJAcKrtAhwX3Bv-tLsoG1-QcQl-lWBVTSxIA6EZJ21qaLi4MMKq-xsJ6SQP0kiHtdP1QRyvzMKjvkx84vjZTttdSgUv4xlrA.WPJYZpyqnza-FtOteAoq6g',
    },
  });
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
    <div className="pt-10">
      <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>
      <BookingsList data={bookingsDataParsed} columns={columns} />
    </div>
  );
}
