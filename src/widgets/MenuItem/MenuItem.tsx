import { useState } from 'react';

import { Link } from 'react-router-dom';
import StarsRating from 'react-star-rate';

import spicyIcon from '../../assets/icons/spicy.svg';
import veganIcon from '../../assets/icons/vegan.svg';
import { correctPrice, ProductAttribute, ProductAttributeNames } from '../../entities/product';
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

  const discountPrice = getAttribute(attributes, ProductAttributeNames.DISCOUNT_PRICE);
  const calories = getAttribute(attributes, ProductAttributeNames.CALORIES);
  const weight = getAttribute(attributes, ProductAttributeNames.WEIGHT);
  const price = prices[0].value.centAmount;
  const rawPrice = discountPrice ?? price;
  const rawOldPrice = discountPrice ? price : null;

  const corePrice = correctPrice(Number(rawPrice));
  const oldPrice = rawOldPrice ? correctPrice(rawOldPrice) : null;

  return (
    <li className="w-full list-none">
      <Link to={`/product/${id}`}>
        <div className="flex rounded-2xl border-1 border-border-black/10 transition-all ease-in-out hover:bg-accent-light dark:border-dark-separation-line dark:hover:bg-dark-separation-line">
          <div className="m-h-[170px] relative flex flex-[75%] gap-x-3 sm:gap-x-7">
            <img
              onLoad={() => setIsLoading(false)}
              loading="lazy"
              className={`${
                isLoading ? 'h-full w-48 opacity-0' : 'opacity-100'
              } inline-block h-full max-w-[40%] flex-none rounded-2xl object-cover transition-all duration-300 ease-bounce xs:max-w-[35%] xl:max-w-[19.5%]`}
              src={image}
              alt={name}
            />
            {isSpicy || isVegan ? (
              <span className="absolute left-2 top-2 z-[1] inline-block max-w-[30px] rounded-xl bg-accent-light p-1">
                <img src={isSpicy ? spicyIcon : veganIcon} alt={`${isSpicy ? 'spicyIcon' : 'veganIcon'}`} />
              </span>
            ) : null}
            <div className="my-1 flex flex-col gap-y-2 xs:gap-y-3">
              <div className="flex flex-1 flex-col gap-y-3 sm:gap-y-1">
                <div className="truncate-text text-text-dark dark:text-primary sm:text-base">{name}</div>
                <div>
                  <h4 className="text-xs text-text-grey">{calories} kcal</h4>
                  <h4 className="text-xs text-text-grey">{weight} g</h4>
                </div>
              </div>
              <div className="mb-2 flex max-w-[40px] items-center gap-x-2">
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
          <div className="flex flex-col items-center justify-evenly">
            {oldPrice ? (
              <span className="justify-self-end text-sm text-text-grey line-through md:text-base">$ {oldPrice}</span>
            ) : null}
            <h3 className="text-base font-medium text-text-dark dark:text-primary">$ {corePrice}</h3>
            <AddToCartBtn />
          </div>
        </div>
      </Link>
    </li>
  );
}
