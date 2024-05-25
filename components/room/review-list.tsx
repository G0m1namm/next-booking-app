import { IReview } from '@/backend/models/room';
import { StarFilledIcon } from '@radix-ui/react-icons';

type Props = {
  reviews: IReview[];
};

export default function ReviewList({ reviews }: Props) {
  if (!reviews.length) {
    return (
      <div className="w-full h-24 grid place-content-center">No comments added yet</div>
    );
  }
  return (
    <div className="w-full space-y-3">
      {reviews.map((review) => (
        <div key={`review_${review.user._id}`}>
          <h3>
            {review.rating} <StarFilledIcon />
          </h3>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
