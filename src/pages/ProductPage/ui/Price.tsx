import { calcPriceDiscountPercentage } from '../../../entities/product';
import formatPrice from '../../../entities/product/lib/helpers/formatPrice.ts';
import pennieToMoney from '../../../entities/product/lib/helpers/pennieToMoney.ts';

interface IPriceProps {
  centPrice: number;
  centOldPrice: number | null;
  currencyCode: string;
}

function Price({ centPrice, centOldPrice, currencyCode }: IPriceProps) {
  const moneyOldPrice = centOldPrice ? pennieToMoney(centOldPrice) : null;
  const moneyPrice = pennieToMoney(centPrice);

  const corePrice = formatPrice(moneyPrice, currencyCode);
  const coreOldPrice = moneyOldPrice ? formatPrice(moneyOldPrice, currencyCode) : null;
  const discountPercentage = moneyOldPrice ? calcPriceDiscountPercentage(moneyOldPrice, moneyPrice) : null;

  return (
    <div className="grid">
      {coreOldPrice ? (
        <span className="justify-self-end text-base text-text-grey line-through">{coreOldPrice}</span>
      ) : null}
      <h2 className="pr-4 text-3xl font-bold text-text-dark dark:text-primary md:text-2xl">{corePrice}</h2>
      {discountPercentage ? <p className="mt-1 text-sm text-accent">You save: {discountPercentage}%</p> : null}
    </div>
  );
}

export default Price;
