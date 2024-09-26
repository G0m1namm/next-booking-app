'use client';

import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { parseAsInteger, useQueryState } from 'nuqs';
type Props = {};

export default function RoomGuestsFilter({}: Props) {
  const [kidsCount, setKidsCount] = useQueryState(
    'numOfKids',
    parseAsInteger.withOptions({ shallow: false })
  );
  const [adultsCount, setAdultsCount] = useQueryState(
    'numOfAdults',
    parseAsInteger.withOptions({ shallow: false })
  );

  const increaseCount = (setStateCallback: typeof setKidsCount) => {
    setStateCallback((prev) => (prev ?? 0) + 1);
  };

  const decreaseCount = (setStateCallback: typeof setKidsCount) => {
    setStateCallback((prev) => (prev === 1 ? null : (prev ?? 0) - 1));
  };

  return (
    <ul className="flex flex-col gap-3 px-8 py-4">
      <li>
        <div className="flex items-center justify-center space-x-2 p-2">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 sm:h-8 sm:w-8 shrink-0 rounded-full"
            onClick={() => decreaseCount(setAdultsCount)}
            disabled={(adultsCount ?? 0) < 1}
          >
            <MinusIcon className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="text-lg font-bold tracking-tighter">{adultsCount ?? 0}</div>
            <div className="text-[0.70rem] uppercase text-muted-foreground">Adults</div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 sm:h-8 sm:w-8 shrink-0 rounded-full"
            onClick={() => increaseCount(setAdultsCount)}
            disabled={(adultsCount ?? 0) > 9}
          >
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </li>
      <li>
        <div className="flex items-center justify-center space-x-2 p-2">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 sm:h-8 sm:w-8 shrink-0 rounded-full"
            onClick={() => decreaseCount(setKidsCount)}
            disabled={(kidsCount ?? 0) < 1}
          >
            <MinusIcon className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="text-lg font-bold tracking-tighter">{kidsCount ?? 0}</div>
            <div className="text-[0.70rem] uppercase text-muted-foreground">Kids</div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 sm:h-8 sm:w-8 shrink-0 rounded-full"
            onClick={() => increaseCount(setKidsCount)}
            disabled={(kidsCount ?? 0) > 9}
          >
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </li>
    </ul>
  );
}
