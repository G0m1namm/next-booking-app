import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"

type Props = {}

export default function UserNav({ }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="relative size-8 rounded-full">
                    <Avatar className="size-8">
                        <AvatarImage src="/avatar.jpg" alt="user avatar" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                    <DropdownMenuItem>My Bookings</DropdownMenuItem>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-400">Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}