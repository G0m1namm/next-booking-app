import { getBaseUrl } from "@/lib/getBaseUrl";
import { getRooms } from "@/lib/room/actions";
import ErrorPage from "./error";
import { IRoom } from "@/backend/models/room";
import RoomCard from "@/components/room/room-card";

type Props = {

}

export default async function Page({ }: Props) {
  const data = await getRooms()

  if (!data?.rooms) {
    return (
      <ErrorPage error={data} />
    )
  }

  return (
    <main className="page-shell-container mx-auto flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 md:gap-5 xl:gap-8">
          {data.rooms.map((room: IRoom, roomIdx: number) => (
            <div key={`room_${room._id}`} itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
              <meta itemProp="name" content={room.name} />
              <meta itemProp="position" content={roomIdx.toString()} />
              <meta itemProp="url" content={`${getBaseUrl()}/rooms/${room._id}`} />
              <RoomCard room={room} className="grid grid-cols-[100%]" />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
