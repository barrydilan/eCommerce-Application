import { useState } from 'react';

import { Link } from 'react-router-dom';
import StarsRating from 'react-star-rate';

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
}

export default function MenuItem({ name, image, id, attributes, prices }: IMenuItemProps) {
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
        <div className="flex rounded-2xl border-1 border-border-black/10 transition delay-150 duration-300 ease-in-out hover:bg-accent-light">
          <div className="m-h-[170px] flex flex-[75%] gap-x-3 sm:gap-x-7">
            <img
              onLoad={() => setIsLoading(false)}
              loading="lazy"
              className={`${
                isLoading ? 'h-full w-48 opacity-0' : 'opacity-100'
              } inline-block h-full max-w-[45%] flex-none rounded-2xl object-cover transition-all duration-300 ease-bounce xs:max-w-[30%] xl:max-w-[19.5%]`}
              src={image}
              alt={name}
            />
            <div className="my-4 flex flex-col gap-y-2 xs:gap-y-3 sm:my-7">
              <div className="flex w-fit flex-1 flex-col gap-y-3">
                <h2 className="text-text-dark sm:text-xl">{name}</h2>
                <div>
                  <h4 className="text-sm text-text-grey">{calories} kcal</h4>
                  <h4 className="text-sm text-text-grey">{weight} g</h4>
                </div>
              </div>
              <div className="mb-2 flex w-fit items-center gap-x-2">
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
          <div className="my-4 flex flex-auto flex-col items-end justify-between pr-3.5 sm:my-7 sm:pr-7">
            <div className="grid">
              {oldPrice ? (
                <span className="justify-self-end text-sm text-text-grey line-through md:text-base">$ {oldPrice}</span>
              ) : null}
              <h3 className="text-base font-medium text-text-dark sm:text-xl">$ {corePrice}</h3>
            </div>
            <AddToCartBtn />
          </div>
        </div>
      </Link>
    </li>
  );
}
