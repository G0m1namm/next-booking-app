import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import RoomGuestsFilter from './room-guests-filter';
import RoomBedsFilter from './room-beds-filter';
import RoomAmenitiesFilter from './room-amenities-filter';
import { useMediaQuery, useToggle } from '@mantine/hooks';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { Button } from '../ui/button';

type Props = {};

export default function RoomFilters({}: Props) {
  const isTablet = useMediaQuery('(min-width: 640px)');
  const [open, toggle] = useToggle([false, true]);

  if (!isTablet) {
    return (
      <Drawer open={open} onOpenChange={toggle}>
        <div className="relative dark-border-r">
          <DrawerTrigger asChild>
            <Button variant="ghost" className="-ml-4 px-[55px]">
              Filters
            </Button>
          </DrawerTrigger>
          <DrawerContent className="rounded-none">
            <div className="grid place-content-center">
              <DrawerHeader>
                <DrawerTitle>Filter by:</DrawerTitle>
              </DrawerHeader>
              <ul>
                <li>
                  <p>How many you want to include?</p>
                  <RoomGuestsFilter />
                  <RoomBedsFilter />
                </li>
                <li>
                  <p className="mb-3">Which amenities you want to have?</p>
                  <RoomAmenitiesFilter />
                </li>
              </ul>
              <DrawerFooter className="pt-2 mt-3">
                <DrawerClose asChild>
                  <Button variant="secondary">Hide filters</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </div>
      </Drawer>
    );
  }

  return (
    <ul>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="relative dark-border-r">
            <NavigationMenuTrigger className="h-full !bg-transparent">
              Guests
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <RoomGuestsFilter />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="relative dark-border-r">
            <NavigationMenuTrigger className="h-full !bg-transparent">
              Beds
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <RoomBedsFilter />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="relative dark-border-r">
            <NavigationMenuTrigger className="h-full !bg-transparent">
              Amenities
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <RoomAmenitiesFilter />
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </ul>
  );
}
