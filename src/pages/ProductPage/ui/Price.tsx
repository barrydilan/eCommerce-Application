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
    <div className="grid">
      {oldPrice ? <span className="justify-self-end text-base text-text-grey line-through">$ {oldPrice}</span> : null}
      <h2 className="pr-4 text-3xl font-bold text-text-dark dark:text-primary md:text-2xl">$ {price}</h2>
      {discountPercentage ? <p className="mt-1 text-sm text-accent">You save: {discountPercentage}%</p> : null}
    </div>
  );
}

export default Price;
