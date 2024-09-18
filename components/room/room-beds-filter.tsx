import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {};

export default function RoomBedsFilter({}: Props) {
  const [bedsCount, setBedsCount] = useState(0);

  const increaseCount = (setStateCallback: Dispatch<SetStateAction<number>>) => {
    setStateCallback((prev) => prev + 1);
  };

  const decreaseCount = (setStateCallback: Dispatch<SetStateAction<number>>) => {
    setStateCallback((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col gap-3 px-8 py-4">
      <div className="flex items-center justify-center space-x-2 p-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          onClick={() => decreaseCount(setBedsCount)}
          disabled={bedsCount < 1}
        >
          <MinusIcon className="h-4 w-4" />
          <span className="sr-only">Decrease</span>
        </Button>
        <div className="flex-1 text-center">
          <div className="text-lg font-bold tracking-tighter">{bedsCount}</div>
          <div className="text-[0.70rem] uppercase text-muted-foreground">Beds</div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          onClick={() => increaseCount(setBedsCount)}
          disabled={bedsCount > 9}
        >
          <PlusIcon className="h-4 w-4" />
          <span className="sr-only">Increase</span>
        </Button>
      </div>
    </div>
  );
}