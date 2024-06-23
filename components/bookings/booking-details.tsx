import { IBooking } from '@/backend/models/booking';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ExternalLinkIcon } from '@radix-ui/react-icons';

type Props = {
  booking: IBooking;
};

export default function BookingDetails({ booking }: Readonly<Props>) {
  return (
    <div className="flex gap-10 flex-wrap">
      <div className="flex-1 flex flex-col gap-6 min-w-[400px]">
        <div className="flex gap-8 justify-between items-center">
          <div className="flex gap-2 items-center">
            <h2 className="text-lg font-medium">Invoice</h2>
            <Badge
              variant={booking.paymentInfo.status === 'PAID' ? 'success' : 'destructive'}
              className="text-tiny"
            >
              {booking.paymentInfo.status}
            </Badge>
          </div>
          <Button variant="secondary" size="sm" asChild>
            <Link href={`/bookings/invoice/${booking._id}`} target="_blank">
              Check Invoice
              <ExternalLinkIcon className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-8">
          <h2 className="text-lg h-fit font-medium">User information</h2>
          <ul className="w-full">
            <li className="flex justify-between gap-8">
              <span className="font-light">Name:</span>
              <span>{booking.user.name}</span>
            </li>
            <li className="flex justify-between gap-8">
              <span className="font-light">Email:</span>
              <span>{booking.user.email}</span>
            </li>
            <li className="flex justify-between gap-8">
              <span className="font-light">Amount Paid:</span>
              <span>${booking.amountPaid}</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-8">
          <h2 className="text-lg font-medium">Booking information</h2>
          <ul className="w-full">
            <li className="flex justify-between gap-8">
              <span className="font-light">Check In:</span>
              <span>{new Date(booking.checkInDate).toLocaleString()}</span>
            </li>
            <li className="flex justify-between gap-8">
              <span className="font-light">Check Out:</span>
              <span>{new Date(booking.checkOutDate).toLocaleString()}</span>
            </li>
            <li className="flex justify-between gap-8">
              <span className="font-light">Days of Stay:</span>
              <span>{booking.daysOfStay}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid gap-2">
        <h2 className="text-lg font-medium">Booked Room</h2>
        <Link href={`/rooms/${booking.room._id}`} target="_blank">
          <Card
            className="w-full md:w-[500px] relative rounded-lg overflow-hidden after:absolute
          after:top-0 after:left-0 after:w-full after:h-full after:z-[1] after:bg-gradient-to-t from-black"
          >
            <Button
              variant="secondary"
              size="icon"
              asChild
              className="absolute top-4 right-4 z-[3] size-6 p-1"
            >
              <ExternalLinkIcon />
            </Button>
            <div className="aspect-video">
              <Image
                src={booking.room.images[0].url}
                alt={booking.room.name}
                fill
                className="w-full object-cover z-0"
              />
            </div>
            <CardContent className="relative z-[2]">
              <h3 className="text-white text-lg">{booking.room.name}</h3>
              <Badge variant="secondary" className="text-tiny">
                {booking.room.category}
              </Badge>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
