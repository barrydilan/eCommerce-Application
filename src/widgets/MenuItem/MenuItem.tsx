import { useState } from 'react';

import { Link } from 'react-router-dom';
import StarsRating from 'react-star-rate';

import spicyIcon from '../../assets/icons/spicy.svg';
import veganIcon from '../../assets/icons/vegan.svg';
import { ProductAttribute, ProductAttributeNames } from '../../entities/product';
import formatPrice from '../../entities/product/lib/helpers/formatPrice.ts';
import pennieToMoney from '../../entities/product/lib/helpers/pennieToMoney.ts';
import { ProductPrice } from '../../entities/product/types/types.ts';
import AddToCartBtn from '../../features/AddToCart/AddToCartBtn';
import getAttribute from '../../pages/ProductPage/lib/helpers/getAttribute.ts';

interface IMenuItemProps {
  name: string;
  image: string;
  id: string;
  attributes: ProductAttribute[];
  prices: ProductPrice[];
  isSpicy: boolean;
  isVegan: boolean;
}

export default function MenuItem({ name, image, id, attributes, prices, isSpicy, isVegan }: IMenuItemProps) {
  const [rating, setRating] = useState(4.5);
  const [isLoading, setIsLoading] = useState(true);

  const {
    discounted: { value: { centAmount: discountPrice = undefined } = {} } = {},
    value: { centAmount: currPrice, currencyCode },
  } = prices.at(0) as ProductPrice;

  const centPrice = discountPrice ?? currPrice;
  const centOldPrice = discountPrice ? currPrice : null;

  const calories = getAttribute(attributes, ProductAttributeNames.CALORIES);
  const weight = getAttribute(attributes, ProductAttributeNames.WEIGHT);

  const corePrice = formatPrice(pennieToMoney(centPrice), currencyCode);
  const oldPrice = centOldPrice ? formatPrice(pennieToMoney(centOldPrice), currencyCode) : null;

  return (
    <li className="w-full list-none">
      <Link to={`/product/${id}`}>
        <div className="flex h-[170px] rounded-2xl border-1 border-border-black/10 pr-4 transition-all ease-in-out hover:bg-accent-light dark:border-dark-separation-line dark:hover:bg-dark-separation-line md:pr-8">
          <div className="relative flex flex-[75%] gap-x-4 sm:gap-x-7">
            <img
              onLoad={() => setIsLoading(false)}
              loading="lazy"
              className={`${
                isLoading ? 'h-full w-48 opacity-0' : 'opacity-100'
              } inline-block h-full max-w-[50%] flex-none rounded-2xl object-cover transition-all duration-300 ease-bounce md:w-[160px]`}
              src={image}
              alt={name}
            />
            {isSpicy || isVegan ? (
              <span className="absolute left-2 top-2 z-[1] inline-block max-w-[30px] rounded-xl bg-accent-light p-1">
                <img src={isSpicy ? spicyIcon : veganIcon} alt={`${isSpicy ? 'spicyIcon' : 'veganIcon'}`} />
              </span>
            ) : null}
            <div className="flex flex-col justify-center gap-y-3 py-4 md:py-7">
              <div className="flex flex-col gap-y-3">
                <div className="truncate-text mr-3 text-lg text-text-dark dark:text-primary lg:mr-7">{name}</div>
                <div className="grid gap-1">
                  <h4 className="text-text-grey">{calories} kcal</h4>
                  <h4 className="text-text-grey">{weight} g</h4>
                </div>
              </div>
              <div className="flex max-w-[40px] items-center gap-x-2">
                <StarsRating
                  value={rating}
                  allowHalf
                  onChange={() => {
                    setRating(rating);
                  }}
                />
                <p className="text-text-grey">{rating}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end justify-end py-4 md:py-7">
            {oldPrice ? (
              <span className="justify-self-end text-sm text-text-grey line-through md:text-base">{oldPrice}</span>
            ) : null}
            <h3 className="mt-1 text-lg font-semibold text-text-dark dark:text-primary lg:text-lg">{corePrice}</h3>
            <AddToCartBtn productId={id} />
          </div>
        </div>
      </Link>
    </li>
  );
}
