/* eslint-disable react/no-array-index-key */
import emptyStar from '../../assets/icons/emptyStar.svg';
import fullStar from '../../assets/icons/star.svg';

export default function Rating() {
  const totalStars = 5;
  const activeStars = 3;
  return (
    <div className="flex">
      {[...new Array(totalStars)].map((_arr, index) => {
        return <img className="relative" key={index} src={index < activeStars ? fullStar : emptyStar} alt="star" />;
      })}
    </div>
  );
}
