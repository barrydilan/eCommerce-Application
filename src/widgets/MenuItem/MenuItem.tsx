import { useState } from 'react';

import StarsRating from 'react-star-rate';

import productImg from '../../assets/img/productImg.png';
import AddToCartBtn from '../../features/AddToCart/AddToCartBtn';

/*
const customStyles = {
    itemShapes: ThinStar,
    activeFillColor: '#FCDE44',
    inactiveFillColor: '#F1F1F1',
};
 */

export default function MenuItem() {
  const [rating, setRating] = useState(4.5);
  // const handleRating = (rate: number) => {
  //   setRating(rate);
  // };

  return (
    <div className="flex w-full rounded-2xl border-1 border-border-black/10">
      <div className="m-h-[120px] flex flex-[80%] gap-x-2">
        <img
          className="mr-2 inline-block h-full max-w-[45%] flex-none xs:max-w-[35%]"
          src={productImg}
          alt={productImg}
        />
        <div className="my-4 flex flex-1 flex-col gap-y-1 xs:gap-y-4 sm:my-4">
          <div className="flex flex-1 flex-col gap-y-1">
            <h2 className="text-sm font-light text-text-dark xs:text-lg sm:text-xl">Vegan meal</h2>
            <h4 className="text-xs font-extralight text-text-grey sm:text-base">622 kcal</h4>
            <h4 className="text-xs font-extralight text-text-grey sm:text-base">340 g</h4>
          </div>
          <div className="mb-2 flex items-center gap-x-2 text-sm">
            <StarsRating
              value={rating}
              allowHalf
              onChange={() => {
                setRating(rating);
              }}
            />
            <p className="text-xs font-extralight text-text-grey sm:text-base">{rating}</p>
          </div>
        </div>
      </div>
      <div className="my-4 flex flex-[20%] flex-col items-end justify-between pr-2 sm:my-4 sm:pr-4">
        <h3 className="text-sm font-light text-text-dark xs:text-lg sm:text-xl">$ 24,50</h3>
        <AddToCartBtn />
      </div>
    </div>
  );
}
