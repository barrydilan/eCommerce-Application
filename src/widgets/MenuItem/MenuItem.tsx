import { useState } from 'react';

import { Link } from 'react-router-dom';
import StarsRating from 'react-star-rate';

import AddToCartBtn from '../../features/AddToCart/AddToCartBtn';

interface IMenuItemProps {
  name: string;
  price: string;
  image: string;
  id: string;
  calories: string | number;
  weight: string | number;
}

export default function MenuItem({ name, price, image, id, calories, weight }: IMenuItemProps) {
  const [rating, setRating] = useState(4.5);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <li className="w-full list-none">
      <Link to={`/${id}`}>
        <div className="flex rounded-2xl border-1 border-border-black/10">
          <div className="m-h-[170px] flex flex-[80%] gap-x-2">
            <img
              onLoad={() => setIsLoading(false)}
              loading="lazy"
              className={`${
                isLoading ? 'h-full w-48 opacity-0' : 'opacity-100'
              } mr-2 inline-block h-full max-w-[45%] flex-none rounded-2xl object-cover transition-all duration-300 ease-bounce xs:max-w-[26%] xl:max-w-[19.5%]`}
              src={image}
              alt={name}
            />
            <div className="my-4 flex flex-1 flex-col gap-y-1 xs:gap-y-4 sm:my-4">
              <div className="flex flex-1 flex-col gap-y-1">
                <h2 className="text-sm font-light text-text-dark xs:text-lg sm:text-xl">{name}</h2>
                <h4 className="text-xs font-extralight text-text-grey sm:text-base">{calories} kcal</h4>
                <h4 className="text-xs font-extralight text-text-grey sm:text-base">{weight} g</h4>
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
            <h3 className="text-sm font-light text-text-dark xs:text-lg sm:text-xl">$ {price}</h3>
            <AddToCartBtn />
          </div>
        </div>
      </Link>
    </li>
  );
}
