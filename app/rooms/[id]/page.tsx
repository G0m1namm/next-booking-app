import RoomDetails from "@/components/room/room-details";
import { getSingleRoom } from "@/lib/room/actions";

type Props = {
    params: {
        id: string
    }
}

export default async function Page({ params: { id } }: Props) {
    const { room } = await getSingleRoom(id)

    if (!room) return

    return (
        <RoomDetails data={room} />
    )
}