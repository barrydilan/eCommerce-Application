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
                <h2 className="text-sm text-text-dark sm:text-xl">{name}</h2>
                <h4 className="text-xs text-text-grey sm:text-base">{calories} kcal</h4>
                <h4 className="text-xs text-text-grey sm:text-base">{weight} g</h4>
              </div>
              <div className="mb-2 flex items-center gap-x-2 text-sm">
                <StarsRating
                  value={rating}
                  allowHalf
                  onChange={() => {
                    setRating(rating);
                  }}
                />
                <p className="text-xs text-text-grey sm:text-base">{rating}</p>
              </div>
            </div>
          </div>
          <div className="my-4 flex flex-[20%] flex-col items-end justify-between pr-2 sm:my-4 sm:pr-4">
            <div className="grid">
              {oldPrice ? (
                <span className="justify-self-end text-[10px] text-text-grey line-through">$ {oldPrice}</span>
              ) : null}
              <h3 className="text-sm text-text-dark sm:text-xl">$ {corePrice}</h3>
            </div>
            <AddToCartBtn />
          </div>
        </div>
      </Link>
    </li>
  );
}
