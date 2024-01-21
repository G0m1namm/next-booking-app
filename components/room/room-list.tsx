import { IRoom } from "@/backend/models/room"
import RoomCard from "./room-card"
import { getBaseUrl } from "@/lib/getBaseUrl"

type Props = {
    rooms: IRoom[],
    page: number,
    limit: number
}

export default function RoomList({ rooms }: Props) {
    return (
        <section id="rooms_list">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 md:gap-5 xl:gap-8">
                {rooms.map((room: IRoom, roomIdx: number) => (
                    <div key={`room_${room._id}`} itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
                        <meta itemProp="name" content={room.name} />
                        <meta itemProp="position" content={roomIdx.toString()} />
                        <meta itemProp="url" content={`${getBaseUrl()}/rooms/${room._id}`} />
                        <RoomCard room={room} className="grid grid-cols-[100%]" />
                    </div>
                ))}
            </div>
        </section>
    )
}