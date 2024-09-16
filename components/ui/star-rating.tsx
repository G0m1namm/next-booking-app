import { Rating } from 'react-simple-star-rating';

type StarRatingProps = React.ComponentProps<typeof Rating>;

const StarRating = ({ ...props }: StarRatingProps) => {
  return (
    <Rating
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
