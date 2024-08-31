import { columns } from './columns';
import ErrorPage from './error';
import { IRoom } from '@/backend/models/room';
import AdminPageLayout from '@/layouts/admin-page-layout';
import { Badge } from '@/components/ui/badge';
import { getSingleRoom } from '@/lib/room/actions';
import AdminReviewsList from '@/components/room/admin-reviews-list';

export const metadata = {
  title: 'All Reviews | Administrator',
  description: 'Manage all reviews in the room.',
};

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
  const reviews = room.reviews.map((review) => ({
    id: review._id.toString(),
    name: review.user.name,
    comment: review.comment,
    rating: review.rating,
  }));

  return (
    <AdminPageLayout title={<RoomPageHeader totalReviews={reviews.length} />}>
      <AdminReviewsList roomName={room.name} data={reviews} columns={columns} />
    </AdminPageLayout>
  );
}

function RoomPageHeader({ totalReviews }: Readonly<{ totalReviews: number }>) {
  return (
    <div className="flex w-full justify-between items-center">
      <h1 className="text-xl font-semibold md:text-2xl inline-flex items-center gap-3">
        <span>All Reviews</span>
        <Badge className="inline-block text-lg">{totalReviews}</Badge>
      </h1>
    </div>
  );
}
