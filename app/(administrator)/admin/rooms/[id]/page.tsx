import { Button } from '@/components/ui/button';
import AdminPageLayout from '@/layouts/admin-page-layout';
import Link from 'next/link';
import { getSingleRoom } from '@/lib/room/actions';
import { IRoom } from '@/backend/models/room';
import ErrorPage from '../error';
import AdminUpdateRoomForm from '@/components/room/admin-update-room-form';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: Readonly<Props>) {
  const data = await getSingleRoom(id);

  if (!data.success) {
    return <ErrorPage error={data} />;
  }

  const room = data.room as IRoom;

  return (
    <AdminPageLayout title={<NewRoonPageHeader />}>
      <AdminUpdateRoomForm room={room} />
    </AdminPageLayout>
  );
}

function NewRoonPageHeader() {
  return (
    <div className="flex w-full justify-between items-center">
      <h1 className="text-xl font-semibold md:text-2xl inline-flex items-center gap-3">
        Edit Room
      </h1>
      <div className="flex items-center gap-4">
        <Button asChild variant="outline">
          <Link href="/admin/rooms">Discard</Link>
        </Button>
        <Button type="submit" form="admin-new-room-form">
          Save Room
        </Button>
      </div>
    </div>
  );
}
