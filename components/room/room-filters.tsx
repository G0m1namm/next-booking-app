import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import RoomGuestsFilter from './room-guests-filter';
import RoomBedsFilter from './room-beds-filter';

type Props = {};

export default function RoomFilters({}: Props) {
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
        </NavigationMenuList>
      </NavigationMenu>
    </ul>
  );
}
