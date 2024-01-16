import ErrorHandler from "@/backend/utils/errorHandler";
import Room from "@/components/room/room";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { getRooms } from "@/lib/room/actions";

type Props = {

}

export default async function Page({ }: Props) {
  const data = await getRooms()

  if (!data?.rooms) {
    throw new ErrorHandler('Page did not loaded correctly', 401)
  }

  return (
    <main className="page-shell-container mx-auto flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 md:gap-5 xl:gap-8">
          {data.rooms.map((room, roomIdx) => (
            <div key={`room_${room._id}`} itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
              <meta itemProp="name" content={room.name} />
              <meta itemProp="position" content={roomIdx.toString()} />
              <meta itemProp="url" content={`${getBaseUrl()}/rooms/${room._id}`} />
              <Room room={room} className="grid grid-cols-[100%]" />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
