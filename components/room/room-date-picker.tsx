'use client';

import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { IRoom } from '@/backend/models/room';
import {
  useCreateBookingMutation,
  useGetAllBookedDaysQuery,
  useLazyCheckBookingAvailabilityQuery,
  useLazyInitStripeCheckoutQuery,
} from '@/redux/api/booking';
import { useMediaQuery, useToggle } from '@mantine/hooks';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format, differenceInDays, formatDistanceStrict } from 'date-fns';
import { CalendarOff, Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
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
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';

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
    from: undefined,
    to: undefined,
  });
  const router = useRouter();
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

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const [checkRoomAvailability, { data: bookingAvailability }] =
    useLazyCheckBookingAvailabilityQuery();
  const { data: currentRoomBookedDaysData } = useGetAllBookedDaysQuery({ roomId });
  const [
    initStripeCheckout,
    {
      isLoading: isInitiatingStripe,
      data: stripeCheckoutData,
      isError: isInitStripeError,
      isSuccess: isInitStripeSuccess,
    },
  ] = useLazyInitStripeCheckoutQuery();

  const checkAvailability = React.useCallback(
    (range: DateRange | undefined) => {
      if (!range?.from || !range?.to) {
        return;
      }

      checkRoomAvailability({
        id: roomId,
        checkInDate: range.from.toISOString(),
        checkOutDate: range.to.toISOString(),
      });
    },
    [checkRoomAvailability, roomId]
  );

  const selectDateHandler = React.useCallback(
    (range: DateRange | undefined) => {
      if (range?.from && range?.to) checkAvailability(range);
      setDate(range);
    },
    [checkAvailability]
  );

  const isRoomUnavailable =
    bookingAvailability?.isAvailable === false &&
    daysBooked > 0 &&
    !!date?.from &&
    !!date?.to;
  const isButtonDisabled = !date?.from || !date?.to || isLoading || isRoomUnavailable;
  const bookedDates =
    currentRoomBookedDaysData?.allBookedDates?.map(
      (bookedDate: string) => new Date(bookedDate)
    ) || [];

  // Calculate total price based on the number of days booked
  const totalPrice = pricePerNight * daysBooked;
  const formatedTotalToPay = totalPrice
    ? `$${totalPrice.toLocaleString('us-US')} USD`
    : `$${pricePerNight.toLocaleString('us-US')} USD`;

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

  const handlePayment = () => {
    if (!date?.from || !date?.to) {
      return;
    }

    initStripeCheckout({
      id: roomId,
      checkInDate: date.from.toISOString(),
      checkOutDate: date.to.toISOString(),
      amount: totalPrice,
      daysOfStay: daysBooked,
    });
  };

  React.useEffect(() => {
    if (isInitStripeSuccess) {
      router.replace(stripeCheckoutData?.url);
    }
    if (isInitStripeError) {
      toast.error('An error occurred while starting the payment process');
    }
  }, [isInitStripeSuccess, isInitStripeError]);

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
                    <strong>
                      {totalPrice
                        ? `${totalPrice.toLocaleString('us-US')} USD`
                        : `$${pricePerNight} USD / Night`}
                    </strong>
                  </span>
                  {date?.from && date?.to && (
                    <span className="text-tiny">{description}</span>
                  )}
                </Button>
              </DrawerTrigger>
              <Button
                size="lg"
                className="py-6"
                onClick={handleSave}
                disabled={isButtonDisabled}
              >
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
                  onSelect={selectDateHandler}
                  numberOfMonths={2}
                />
                {isRoomUnavailable && (
                  <Alert variant="destructive" className="w-full">
                    <CalendarOff className="h-4 w-4" />
                    <AlertTitle>Room occupied</AlertTitle>
                    <AlertDescription>
                      The room is not available for the selected dates. Please choose
                      another date.
                    </AlertDescription>
                  </Alert>
                )}
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
      <Card className="px-2 h-fit rounded-none">
        <CardHeader>
          <CardTitle>
            <span>{formatedTotalToPay}</span>
            <span className="italic text-base text-muted-foreground">
              {date?.to && date.from
                ? `/ ${formatDistanceStrict(date?.to, date?.from)}`
                : `/ night`}
            </span>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            disabled={bookedDates}
            onSelect={selectDateHandler}
            numberOfMonths={isLargeDesktop ? 2 : 1}
            className="-m-3"
          />
          {isRoomUnavailable && (
            <Alert variant="destructive" className="w-full">
              <CalendarOff className="h-5 w-5" />
              <AlertTitle>Room occupied</AlertTitle>
              <AlertDescription>
                The room is not available for the selected dates. Please choose another
                date.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          {!isAuthenticated && (
            <Button variant="outline" asChild>
              <Link href="/login" target="_self">
                Log In to Pay
              </Link>
            </Button>
          )}
          <Button
            className="w-full"
            type="button"
            onClick={handlePayment}
            disabled={isButtonDisabled || !isAuthenticated || isInitiatingStripe}
            loading={isInitiatingStripe}
          >
            {isInitiatingStripe && <Loader2Icon className="h-5 w-5 mr-2 animate-spin" />}
            {isInitiatingStripe ? 'Processing' : `Pay - ${formatedTotalToPay}`}
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
            onSelect={selectDateHandler}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
