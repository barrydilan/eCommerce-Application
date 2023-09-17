import { useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import { useAddLineItemMutation, useLazyGetCartByIdQuery } from '../../entities/cart';
import { AddLineItemRequestBody, RemoveLineItemRequestBody } from '../../entities/cart/types/types';
import { ProductAttributeNames, useGetProductQuery } from '../../entities/product';
import formatPrice from '../../entities/product/lib/helpers/formatPrice.ts';
import pennieToMoney from '../../entities/product/lib/helpers/pennieToMoney.ts';
import { ProductPrice } from '../../entities/product/types/types.ts';
import getAttribute from '../../pages/ProductPage/lib/helpers/getAttribute';
import LoadingAnimation from '../../shared/ui/LoadingAnimation';

interface ICartItemProps {
  productId: string;
  id: string;
  quantity: number;
}

export default function CartItem(props: ICartItemProps) {
  const { productId, id: lineItemId, quantity } = props;
  const { data } = useGetProductQuery(productId);
  const cartId = useSelector((state: RootState) => state.userReducer.cartId);
  const [getCart, { data: cart, isLoading: cartIsLoading }] = useLazyGetCartByIdQuery();
  const [updateLineItem, { data: newCart, isLoading: updateItemsIsLoading }] = useAddLineItemMutation();

  const memoizedGetCart = useCallback(
    (_cartId: string) => {
      getCart(_cartId, false);
    },
    [getCart],
  );

  useEffect(() => {
    memoizedGetCart(cartId);
  }, [cartId, memoizedGetCart, newCart]);

  const addToCart = async () => {
    const body: AddLineItemRequestBody = {
      version: cart?.version || 1,
      actions: [
        {
          action: 'addLineItem',
          productId,
          variantId: 1,
          quantity: 1,
        },
      ],
    };
    try {
      return await updateLineItem({ cartId, body }).unwrap();
    } catch (e) {
      // throw new Error(e);
    }
    return null;
  };

  const removeOneFromCart = async () => {
    try {
      const body: RemoveLineItemRequestBody = {
        version: cart?.version || 1,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
            variantId: 1,
            quantity: 1,
          },
        ],
      };
      return await updateLineItem({ cartId, body }).unwrap();
    } catch (e) {
      // throw new Error(e);
    }
    return null;
  };

  if (!data)
    return (
      <div className="flex h-full items-center justify-center overflow-hidden">
        <LoadingAnimation />
      </div>
    );

  const { attributes, prices, images } = data.masterVariant;
  const {
    discounted: { value: { centAmount: discountPrice = undefined } = {} } = {},
    value: { centAmount: currPrice, currencyCode },
  } = prices.at(0) as ProductPrice;

  const centPrice = discountPrice ?? currPrice;
  const centOldPrice = discountPrice ? currPrice : null;

  const corePrice = formatPrice(pennieToMoney(centPrice), currencyCode);
  const oldPrice = centOldPrice ? formatPrice(pennieToMoney(centOldPrice), currencyCode) : null;

  const name = data.name.en;
  const imgUrl = images[0].url as string;
  const calories = getAttribute(attributes, ProductAttributeNames.CALORIES);
  const weight = getAttribute(attributes, ProductAttributeNames.WEIGHT);

  return (
    <>
      <div className="relative flex items-start gap-x-4 lg:gap-x-1 xl:gap-x-2">
        <div className="lg:max-w-[33%] xl:max-w-[35%]">
          <img className="h-full w-full object-cover" src={imgUrl} alt="" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl  lg:text-sm xl:mr-7 xl:text-base">{name}</h3>
          <p className="mt-1 hidden text-xs text-text-grey lg:block">
            {calories}kcal <br />
            {weight} g
          </p>
        </div>
        <button
          type="button"
          className="absolute right-0 top-0 cursor-pointer text-3xl font-semibold text-text-grey transition-all ease-in hover:text-text-dark"
        >
          ×
        </button>
      </div>
      <div className="grid items-center justify-end">
        {oldPrice ? (
          <span className="justify-self-end text-sm text-text-grey line-through md:text-base">{oldPrice}</span>
        ) : null}
        <h3 className="mt-1 text-lg font-semibold text-text-dark dark:text-primary lg:text-lg">{corePrice}</h3>
      </div>
      <div className="flex items-center justify-end gap-x-3 lg:mt-2 xl:mb-3 xl:mt-4 xl:gap-x-3">
        <button
          disabled={cartIsLoading || updateItemsIsLoading}
          onClick={removeOneFromCart}
          type="button"
          className={`h-7 w-7 rounded-full bg-accent-lightest px-2 text-center text-xl leading-[40px] text-accent sm:text-xl lg:px-1 lg:text-sm xl:h-9 xl:w-9 xl:px-2 xl:text-lg ${
            cartIsLoading || updateItemsIsLoading ? 'cursor-wait opacity-30' : ''
          }`}
        >
          -
        </button>
        <div className="text-lg sm:text-xl lg:text-sm xl:text-lg">{quantity}</div>
        <button
          disabled={cartIsLoading || updateItemsIsLoading}
          onClick={addToCart}
          type="button"
          className={`h-7 w-7 rounded-full bg-accent-lightest px-2 text-center text-xl text-accent sm:text-xl lg:px-1 lg:text-sm xl:h-9 xl:w-9 xl:px-2 xl:text-lg ${
            cartIsLoading || updateItemsIsLoading ? 'cursor-wait opacity-30' : ''
          }`}
        >
          +
        </button>
      </div>
    </>
  );
}
