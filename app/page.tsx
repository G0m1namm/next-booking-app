import RoomList from "@/components/room/room-list";
import { getRooms } from "@/lib/room/actions";

import ErrorPage from "./error";

interface Props {
  searchParams: string
}

export default async function Page({ searchParams }: Props) {
  const data = await getRooms(searchParams)

  if (!data.success) {
    return (
      <ErrorPage error={data} />
    )
  }

  return (
    <main className="page-shell-container mx-auto flex min-h-screen flex-col items-center justify-between">
      <RoomList roomsList={data} />
    </main>
  )
}
