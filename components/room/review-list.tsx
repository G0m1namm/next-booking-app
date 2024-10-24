/**
 * Taken from v0 by Vercel.
 * @see https://v0.dev/t/7Dmm3uY7gAD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { IReview } from '@/backend/models/room';
import Review from './review';

type Props = {
  reviews: IReview[];
};

export default function ReviewList({ reviews }: Props) {
  if (!reviews?.length) {
    return (
      <div className="w-full h-24 grid place-content-center">No comments added yet</div>
    );
  }
  return (
    <div className="mx-4 space-y-6 py-8">
      <div className="space-y-4">
        {reviews.map((review) => (
          <Review key={`comment-${review?._id}`} review={review} />
        ))}
      </div>
    </div>
  );
}
