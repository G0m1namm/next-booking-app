import AdminPageLayout from '@/layouts/admin-page-layout';
import { getSingleRoom } from '@/lib/room/actions';
import { IRoom } from '@/backend/models/room';
import ErrorPage from '../../error';
import AdminUploadRoomImages from '@/components/room/admin-upload-room-images';

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
    <AdminPageLayout title="Upload Images">
      <AdminUploadRoomImages room={room} />
    </AdminPageLayout>
  );
}
