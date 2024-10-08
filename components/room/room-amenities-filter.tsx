import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { CookieIcon } from '@radix-ui/react-icons';
import { AirVentIcon, PawPrintIcon, WashingMachineIcon, WifiIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { parseAsBoolean, useQueryStates } from 'nuqs';

const amenities = [
  {
    label: 'Breakfast Included',
    value: 'isBreakfast',
    id: 'breakfast_filter',
    icon: <CookieIcon className="flex-none size-6" />,
  },
  {
    label: 'Internet Service',
    value: 'isInternet',
    id: 'internet_filter',
    icon: <WifiIcon className="flex-none size-6" />,
  },
  {
    label: 'Air Conditioned',
    value: 'isAirConditioned',
    id: 'air_conditioned_filter',
    icon: <AirVentIcon className="flex-none size-6" />,
  },
  {
    label: 'Pets allowed',
    value: 'isPetAllowed',
    id: 'pets_filter',
    icon: <PawPrintIcon className="flex-none size-6" />,
  },
  {
    label: 'Room Cleaning',
    value: 'isRoomCleaning',
    id: 'cleaning_filter',
    icon: <WashingMachineIcon className="flex-none size-6" />,
  },
];

export default function RoomAmenitiesFilter() {
  const [amenitiesState, setAmenitiesState] = useQueryStates(
    {
      isBreakfast: parseAsBoolean.withOptions({ shallow: false }),
      isInternet: parseAsBoolean.withOptions({ shallow: false }),
      isAirConditioned: parseAsBoolean.withOptions({ shallow: false }),
      isPetAllowed: parseAsBoolean.withOptions({ shallow: false }),
      isRoomCleaning: parseAsBoolean.withOptions({ shallow: false }),
    },
    {
      history: 'push',
    }
  );

  const toggleGroupHandler = async (values: string[]) => {
    await setAmenitiesState({
      isBreakfast: values.includes('isBreakfast') || null,
      isInternet: values.includes('isInternet') || null,
      isAirConditioned: values.includes('isAirConditioned') || null,
      isPetAllowed: values.includes('isPetAllowed') || null,
      isRoomCleaning: values.includes('isRoomCleaning') || null,
    });
  };

  return (
    <div className="">
      <ToggleGroup
        type="multiple"
        size="lg"
        className="grid grid-cols-[150px,150px] sm:grid-cols-[300px,300px] w-fit p-1"
        onValueChange={toggleGroupHandler}
      >
        {amenities.map((amenity) => (
          <ToggleGroupItem
            key={amenity.value}
            className={twMerge(
              'flex items-center justify-start sm:justify-center text-left h-max space-x-3 !px-4 !py-4 sm:!px-8',
              'data-[state=on]:bg-black data-[state=on]:text-white hover:',
              'w-[300px] hover:bg-violet-100 hover:text-violet-600'
            )}
            value={amenity.value}
            aria-labelledby={amenity.id}
          >
            {amenity.icon}
            <p id={amenity.id} className="text-base">
              {amenity.label}
            </p>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
