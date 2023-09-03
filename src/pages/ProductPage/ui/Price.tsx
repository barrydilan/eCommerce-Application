import { calcPriceDiscountPercentage, correctPrice } from '../../../entities/product';

interface IPriceProps {
  rawPrice: number;
  rawOldPrice: number;
}

function Price({ rawPrice, rawOldPrice }: IPriceProps) {
  const discountPercentage = calcPriceDiscountPercentage(rawOldPrice / 100, rawPrice / 100);
  const price = correctPrice(rawPrice);
  const oldPrice = correctPrice(rawOldPrice);

  return (
    <div className="relative">
      <h2 className="pr-4 text-3xl font-bold text-text-dark">$ {price}</h2>
      <span className="absolute -top-6 left-14 text-sm font-light text-text-grey line-through">$ {oldPrice}</span>
      <p className="mt-1 text-sm font-light text-accent">You save: {discountPercentage}%</p>
    </div>
  );
}

export default Price;
