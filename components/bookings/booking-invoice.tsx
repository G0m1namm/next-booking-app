'use client';

import { IBooking } from '@/backend/models/booking';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { formatISO9075 } from 'date-fns';
import { formatPrice } from '@/lib/utils';
import { Button } from '../ui/button';
import { DownloadIcon, PrinterIcon } from 'lucide-react';

type Props = {
  booking: IBooking;
};

export default function BookingInvoice({ booking }: Props) {
  return (
    <div className="max-w-[1000px] mx-auto grid gap-6">
      <div className="flex gap-4">
        <Button variant="outline">
          Print
          <PrinterIcon size={16} className="ml-2" />
        </Button>
        <Button>
          Download
          <DownloadIcon size={16} className="ml-2" />
        </Button>
      </div>
      <Card className="rounded-lg">
        <CardHeader className="flex-row gap-4 justify-between items-end">
          <div>
            <h1 className="text-2xl text-violet-600 font-semibold">NextBooking</h1>
            <h2 className="text-xl font-semibold inline-flex items-center">
              Invoice
              <Badge
                variant={
                  booking.paymentInfo.status === 'PAID' ? 'success' : 'destructive'
                }
                className="text-tiny ml-2"
              >
                {booking.paymentInfo.status}
              </Badge>
            </h2>
          </div>
          <div className="grid gap-2">
            <p className="text-base font-light">INV#{booking._id}</p>
            <p className="text-tiny font-light">
              Due Date: {new Date(booking.paidAt).toLocaleString()}
            </p>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="print:px-2 py-4 grid gap-6">
          <div className="flex justify-between gap-5 md:gap-10">
            <div className="grid gap-2 place-content-start">
              <span className="text-tiny">Bill to:</span>
              <ul className="text-tiny">
                <li className="font-medium text-base">{booking.user.name}</li>
                <li>{booking.user.email}</li>
              </ul>
            </div>
            <div className="grid gap-2">
              <span className="text-tiny">From:</span>
              <ul className="text-tiny">
                <li className="font-medium text-base">NextBooking</li>
                <li>455 Foggy, Heights</li>
                <li>California, USA</li>
                <li>info@nextbooking.com</li>
              </ul>
            </div>
          </div>
          <div>
            <Table>
              <TableCaption className="text-tiny mt-10">
                NOTICE: A finance charge of 1.5% will be made on unpaid balances after 30
                days -
              </TableCaption>
              <TableHeader className="text-tiny">
                <TableRow>
                  <TableHead>Room</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Price/night</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-base">
                <TableRow className="bg-slate-100">
                  <TableCell className="grid gap-1 py-6">
                    <span className="text-base font-medium">{booking.room.name}</span>
                    <span className="text-tiny">
                      From{' '}
                      {formatISO9075(booking.checkInDate, { representation: 'date' })} -
                      To {formatISO9075(booking.checkOutDate, { representation: 'date' })}
                    </span>
                  </TableCell>
                  <TableCell>{booking.daysOfStay}</TableCell>
                  <TableCell>{formatPrice(booking.room.pricePerNight)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell className="font-bold uppercase">Grand Total:</TableCell>
                  <TableCell>{formatPrice(booking.amountPaid)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <Separator className="print:hidden" />
        <CardFooter className="pt-4 justify-center hidden print:flex">
          <p className="text-tiny">
            Invoice was created on a computer and it's valid without the signature
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
