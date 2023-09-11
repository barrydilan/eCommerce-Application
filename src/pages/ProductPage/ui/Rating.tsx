import StarsRating from 'react-star-rate';

interface IRatingProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

function Rating({ rating, setRating }: IRatingProps) {
  return (
    <div className="flex flex-[50%] flex-col items-center gap-x-2">
      <div className="flex translate-x-4 scale-125 items-center gap-x-2 self-start">
        <StarsRating
          value={rating}
          onChange={(newRating) => {
            setRating(newRating as number);
          }}
        />
        <span className="inline-block self-center text-base font-semibold dark:text-text-grey">{rating}</span>
      </div>
      <p className="self-start pl-1 pt-1 text-sm text-text-grey">2,032 Reviews</p>
    </div>
  );
}

export default Rating;
