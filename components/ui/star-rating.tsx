import { Rating } from 'react-simple-star-rating';
import dynamic from 'next/dynamic';
import { Skeleton } from './skeleton';

const DynamicRating = dynamic(
  () => import('react-simple-star-rating').then((module) => module.Rating),
  {
    loading: () => <Skeleton className="h-4 w-28" />,
    ssr: false,
  }
);

type StarRatingProps = React.ComponentProps<typeof Rating>;

const StarRating = ({ ...props }: StarRatingProps) => {
  return (
    <DynamicRating
      allowFraction
      style={{ overflow: 'hidden' }}
      emptyClassName="[&_svg]:text-violet-500/20 [&_svg]:!inline-flex"
      fillClassName="[&_svg]:text-violet-500 [&_svg]:!inline-flex"
      tooltipClassName="!bg-violet-600"
      showTooltip
      tooltipArray={[
        'Terrible',
        'Terrible+',
        'Bad',
        'Bad+',
        'Average',
        'Average+',
        'Great',
        'Great+',
        'Awesome',
        'Awesome+',
      ]}
      {...props}
    />
  );
};

export { StarRating };
