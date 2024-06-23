import { IBooking } from '@/backend/models/booking';
import { getAuthHeader } from '@/backend/utils/getAuthHeader';
import BookingDetails from '@/components/bookings/booking-details';
import { BackButton } from '@/components/ui/button';

import { getApiUrl } from '@/lib/getBaseUrl';

export const metadata = {
  title: 'Booking Details',
  description: 'View booking details',
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
    <div className="pt-10">
      <div className="mb-5">
        <BackButton href="/bookings" />
      </div>
      <h1 className="text-2xl font-semibold mb-6">Booking Info #{booking._id}</h1>
      <BookingDetails booking={booking} />
    </div>
  );
}
