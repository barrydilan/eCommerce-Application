import { useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import { useAddLineItemMutation, useLazyGetCartByIdQuery } from '../../entities/cart';
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
    const body = {
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
      console.log('updated cart', result.lineItems);
    } catch (error) {
      console.error(error);
    }
  };

  const removeOneFromCart = async () => {
    try {
      const targetItem = cart?.lineItems.filter((item) => item.productId === productId);
      const lineItemId = targetItem?.[0].id;
      const body = {
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
      console.log('updated cart', result.lineItems);
    } catch (error) {
      console.error(error);
    }
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
      <div className="flex items-center justify-between">
        <span className="block text-lg font-medium sm:text-xl lg:ml-auto lg:mt-2 lg:text-sm xl:text-lg">${price}</span>
      </div>
      <div className="flex items-center justify-end gap-x-3 lg:mt-2 xl:mb-3 xl:mt-4 xl:gap-x-3">
        <button
          onClick={removeOneFromCart}
          type="button"
          className="h-7 w-7 rounded-full bg-accent-lightest px-2 text-center text-xl leading-[40px] text-accent sm:text-xl lg:px-1 lg:text-sm xl:h-9 xl:w-9 xl:px-2 xl:text-lg"
        >
          -
        </button>
        <div className="text-lg sm:text-xl lg:text-sm xl:text-lg">1</div>
        <button
          onClick={addToCart}
          type="button"
          className="h-7 w-7 rounded-full bg-accent-lightest px-2 text-center text-xl text-accent sm:text-xl lg:px-1 lg:text-sm xl:h-9 xl:w-9 xl:px-2 xl:text-lg"
        >
          +
        </button>
      </div>
    </>
  );
}
