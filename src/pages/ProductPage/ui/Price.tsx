import { calcPriceDiscountPercentage, correctPrice } from '../../../entities/product';

interface IPriceProps {
  rawPrice: number;
  rawOldPrice: number | null;
}

function Price({ rawPrice, rawOldPrice }: IPriceProps) {
  const price = correctPrice(rawPrice);
  const oldPrice = rawOldPrice ? correctPrice(rawOldPrice) : null;
  const discountPercentage = rawOldPrice ? calcPriceDiscountPercentage(rawOldPrice / 100, rawPrice / 100) : null;

  return (
    <div className="relative">
      <h2 className="pr-4 text-3xl font-bold text-text-dark">$ {price}</h2>
      {oldPrice ? (
        <span className="absolute -top-6 left-14 text-sm text-text-grey line-through">$ {oldPrice}</span>
      ) : null}
      {discountPercentage ? <p className="mt-1 text-sm text-accent">You save: {discountPercentage}%</p> : null}
    </div>
  );
}

export default Price;
