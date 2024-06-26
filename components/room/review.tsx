import { IReview } from '@/backend/models/room';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Rating } from 'react-simple-star-rating';

type Props = {
  review: IReview;
};

export default function Review({ review }: Props) {
  return (
    <div className="flex items-start gap-4">
      <Avatar className="w-10 h-10 border">
        <AvatarImage src={review?.user?.avatar?.url} alt={review?.user?.name} />
        <AvatarFallback>??</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-start">
          <div className="flex items-center gap-2">
            <div className="font-medium">{review?.user?.name}</div>
            <div className="-mt-1">
              <Rating
                initialValue={review.rating}
                size={16}
                emptyClassName="[&_svg]:text-violet-500/20 [&_svg]:!inline-flex"
                fillClassName="[&_svg]:text-violet-500 [&_svg]:!inline-flex"
                readonly
              />
            </div>
          </div>
        </div>
        <div className="text-muted-foreground">{review.comment}</div>
      </div>
    </div>
  );
}
