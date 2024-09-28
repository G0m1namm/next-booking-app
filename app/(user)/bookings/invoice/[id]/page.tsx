import { IBooking } from '@/backend/models/booking';
import { getAuthHeader } from '@/backend/utils/getAuthHeader';
import BookingInvoice from '@/components/bookings/booking-invoice';

import { getApiUrl } from '@/lib/getBaseUrl';

export const metadata = {
  title: 'Booking Invoice',
  description: 'Booking invoice details',
};

const getBookingDetails = async (bookingId: string) => {
  const headers = getAuthHeader();
  const res = await fetch(`${getApiUrl()}/booking/${bookingId}`, headers);
  const info = await res.json();

  return info;
};

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Readonly<Props>) {
  const data = await getBookingDetails(params.id);

  if (!data.success) {
    throw new Error(data.message);
  }

  const booking = data.booking as IBooking;

  return (
    <div className="pt-10 container">
      <BookingInvoice booking={booking} />
    </div>
  );
}
