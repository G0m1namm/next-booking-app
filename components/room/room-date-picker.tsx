'use client';

import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { IRoom } from '@/backend/models/room';
import { useCreateBookingMutation } from '@/redux/api/booking';
import { useMediaQuery, useToggle } from '@mantine/hooks';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format, differenceInDays, formatDistanceStrict } from 'date-fns';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
type Props = {
  inline?: true;
  pricePerNight: number;
  roomId: Pick<IRoom, '_id'>;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RoomDatePicker({
  className,
  inline,
  pricePerNight,
  roomId,
}: Props) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [open, toggle] = useToggle([false, true]);

  const daysBooked = React.useMemo(() => {
    // Add base validation for date
    if (!date?.from || !date?.to) {
      return 0;
    }

    return differenceInDays(date.to, date.from);
  }, [date]);
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const isLargeDesktop = useMediaQuery('(min-width: 1280px)');

  const [createBooking, { isLoading }] = useCreateBookingMutation();

  // Calculate total price based on the number of days booked
  const totalPrice = pricePerNight * daysBooked;

  // Description for the date picker
  const description =
    daysBooked && date?.from && date?.to
      ? `${format(date?.from, 'LLL dd, y')} - ${format(date?.to, 'LLL dd, y')}`
      : 'Add dates to see the total price';

  const handleSave = () => {
    if (!date?.from || !date?.to) {
      return;
    }

    createBooking({
      room: roomId,
      checkInDate: date.from,
      checkOutDate: date.to,
      daysOfStay: daysBooked,
      amountPaid: totalPrice,
      paymentInfo: {
        id: 'STRIPE_ID',
        status: 'PAID',
      },
    });
  };

  if (!isDesktop) {
    let title = daysBooked ? `${daysBooked} nights` : '';
    if (date?.from && !date?.to) {
      title = 'Select end date';
    } else if (!date?.from && date?.to) {
      title = 'Select start date';
    } else if (!date?.from && !date?.to) {
      title = 'Select dates';
    }

    return (
      <div className="fixed bottom-0 left-0 w-svw h-fit py-4 bg-white border-t z-10">
        <div className="container">
          <Drawer open={open} onOpenChange={toggle}>
            <div className="flex items-center gap-4">
              <DrawerTrigger asChild>
                <Button
                  variant="link"
                  className="grid gap-1 justify-start h-fit text-left -ml-3 flex-1"
                >
                  <span>
                    <strong>${totalPrice} USD</strong>
                  </span>
                  {date?.from && date?.to && (
                    <span className="text-tiny">{description}</span>
                  )}
                </Button>
              </DrawerTrigger>
              <Button size="lg" className="py-6" onClick={handleSave}>
                Reserve
              </Button>
            </div>
            <DrawerContent>
              <div className="grid place-content-center relative">
                <DrawerHeader className="text-center">
                  <DrawerTitle>{title}</DrawerTitle>
                  <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                <Calendar
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
                <DrawerFooter className="pt-2">
                  <DrawerClose asChild>
                    <Button variant="secondary">Save</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    );
  }

  if (inline) {
    return (
      <Card className="px-2 h-fit">
        <CardHeader>
          <CardTitle>
            <span>{`${totalPrice.toLocaleString('us-US')} USD`}</span>
            <span className="italic text-base text-muted-foreground">
              {date?.to && date.from && `/ ${formatDistanceStrict(date?.to, date?.from)}`}
            </span>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={isLargeDesktop ? 2 : 1}
            className="-m-3"
          />
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!date?.from || !date?.to || isLoading}
            loading={isLoading}
          >
            Reserve
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
