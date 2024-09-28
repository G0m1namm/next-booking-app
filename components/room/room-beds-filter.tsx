import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { parseAsInteger, useQueryState } from 'nuqs';

export default function RoomBedsFilter() {
  const [bedsCount, setBedsCount] = useQueryState(
    'numOfBeds',
    parseAsInteger.withOptions({ shallow: false })
  );

  const increaseCount = (setStateCallback: typeof setBedsCount) => {
    setStateCallback((prev) => (prev ?? 0) + 1);
  };

  const decreaseCount = (setStateCallback: typeof setBedsCount) => {
    setStateCallback((prev) => (prev === 1 ? null : (prev ?? 0) - 1));
  };

  return (
    <div className="flex flex-col gap-3 px-8 py-4 -mt-6 sm:mt-0">
      <div className="flex items-center justify-center space-x-2 p-2">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 sm:h-8 sm:w-8 shrink-0 rounded-full"
          onClick={() => decreaseCount(setBedsCount)}
          disabled={(bedsCount ?? 0) < 1}
        >
          <MinusIcon className="h-4 w-4" />
          <span className="sr-only">Decrease</span>
        </Button>
        <div className="flex-1 text-center">
          <div className="text-lg font-bold tracking-tighter">{bedsCount ?? 0}</div>
          <div className="text-[0.70rem] uppercase text-muted-foreground">Beds</div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 sm:h-8 sm:w-8 shrink-0 rounded-full"
          onClick={() => increaseCount(setBedsCount)}
          disabled={(bedsCount ?? 0) > 9}
        >
          <PlusIcon className="h-4 w-4" />
          <span className="sr-only">Increase</span>
        </Button>
      </div>
    </div>
  );
}
