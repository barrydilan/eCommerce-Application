import { useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import { useAddLineItemMutation, useLazyGetCartByIdQuery } from '../../entities/cart';
import { AddLineItemRequestBody, RemoveLineItemRequestBody } from '../../entities/cart/types/types';
import { correctPrice, ProductAttributeNames, useGetProductQuery } from '../../entities/product';
import getAttribute from '../../pages/ProductPage/lib/helpers/getAttribute';
import LoadingAnimation from '../../shared/ui/LoadingAnimation';

interface ICartItemProps {
  productId: string;
}

export default function CartItem(props: ICartItemProps) {
  const { productId } = props;
  const { data } = useGetProductQuery(productId);
  const cartId = useSelector((state: RootState) => state.userReducer.cartId);
  const [getCart, { data: cart }] = useLazyGetCartByIdQuery();
  const [updateLineItem, { data: newCart }] = useAddLineItemMutation();

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
      const result = await updateLineItem({ cartId, body }).unwrap();
      return result;
    } catch (e) {
      // throw new Error(e);
    }
    return null;
  };

  const removeOneFromCart = async () => {
    try {
      const targetItem = cart?.lineItems.find((item) => item.productId === productId);
      if (targetItem) {
        const { lineItemId } = targetItem;
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
        const result = await updateLineItem({ cartId, body }).unwrap();
        return result;
      }
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
  const name = data.name.en;
  const { attributes, prices, images } = data.masterVariant;
  const imgUrl = images[0].url as string;
  const rawPrice = prices[0].value.centAmount;
  const price = correctPrice(rawPrice);
  const calories = getAttribute(attributes, ProductAttributeNames.CALORIES);
  const weight = getAttribute(attributes, ProductAttributeNames.WEIGHT);

  return (
    <div className="relative mb-16 border-b-2 border-dark-separation-line pb-8">
      <div className="relative flex items-start gap-x-4 lg:gap-x-4 xl:gap-x-4">
        <div className="xs:max-w-1/2 max-w-[40%] lg:max-w-[40%] xl:max-w-[35%]">
          <img className="h-full w-full object-cover md:w-full" src={imgUrl} alt="" />
        </div>
        <div className="">
          <h3 className="text-lg xs:text-2xl sm:text-2xl lg:text-sm xl:mr-7 xl:text-base">{name}</h3>
          <p className="mt-1 hidden text-xs text-text-grey xl:block">
            {calories}kcal <br />
            {weight} g
          </p>
        </div>
        <button
          type="button"
          className="absolute right-[-20px] top-[-45px] cursor-pointer text-3xl font-semibold text-text-grey transition-all ease-in hover:text-text-dark md:right-[-5px] md:top-[-35px]"
        >
          ×
        </button>
      </div>
      <div className="mb-4 mt-4 flex items-end justify-end">
        <span className="block text-right text-lg font-medium xs:text-xl sm:text-xl lg:ml-auto lg:mt-2 lg:text-sm xl:text-lg">
          ${price}
        </span>
      </div>
      <div className="flex items-center justify-end gap-x-3 lg:mt-2 xl:mb-3 xl:mt-4 xl:gap-x-3">
        <button
          onClick={removeOneFromCart}
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-lightest px-2 text-center text-xl leading-[40px] text-accent sm:text-xl lg:px-1 lg:text-sm xl:h-9 xl:w-9 xl:px-2 xl:text-lg"
        >
          -
        </button>
        <div className="text-lg sm:text-xl lg:text-sm xl:text-lg">1</div>
        <button
          onClick={addToCart}
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-lightest px-2 text-center text-xl text-accent sm:text-xl lg:px-1 lg:text-sm xl:h-9 xl:w-9 xl:px-2 xl:text-lg"
        >
          +
        </button>
      </div>
    </div>
  );
}
