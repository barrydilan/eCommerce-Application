import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { RootState } from '../../app/store';
import { useGetCartByIdQuery, useUpdateCartMutation } from '../../entities/cart';
import { AddLineItemRequestBody, RemoveLineItemRequestBody } from '../../entities/cart/types/types';
import { ProductAttributeNames, useGetProductQuery } from '../../entities/product';
import formatPrice from '../../entities/product/lib/helpers/formatPrice.ts';
import pennieToMoney from '../../entities/product/lib/helpers/pennieToMoney.ts';
import { ProductPrice } from '../../entities/product/types/types.ts';
import getAttribute from '../../pages/ProductPage/lib/helpers/getAttribute';
import { padZero } from '../../shared/lib/helpers';
import { PlusIcon } from '../../shared/ui';
import { buttonTapAnimation, buttonTransition } from '../../shared/ui/animations.tsx';
import LoadingAnimation from '../../shared/ui/LoadingAnimation';
import MinusIcon from '../../shared/ui/MinusIcon.tsx';

interface ICartItemProps {
  productId: string;
  id: string;
  quantity: number;
}

export default function CartItem(props: ICartItemProps) {
  const { productId, id: lineItemId, quantity } = props;
  const { data } = useGetProductQuery(productId);
  const cartId = useSelector((state: RootState) => state.userReducer.cartId);
  const { data: cart } = useGetCartByIdQuery(cartId);
  const [updateCart, { isLoading: updateIsLoading }] = useUpdateCartMutation();
  const pathName = useLocation().pathname;
  const isCart = pathName === '/cart';

  const cartVersion = cart?.version || 1;

  const addToCart = async () => {
    const body: AddLineItemRequestBody = {
      version: cartVersion,
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
      return await updateCart({ cartId, body }).unwrap();
    } catch (e) {
      // throw new Error(e);
    }
    return null;
  };

  const removeOneFromCart = async () => {
    try {
      const body: RemoveLineItemRequestBody = {
        version: cartVersion,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
            variantId: 1,
            quantity: 1,
          },
        ],
      };
      return await updateCart({ cartId, body }).unwrap();
    } catch (e) {
      // throw new Error(e);
    }
    return null;
  };

  const removeAllFromCart = async () => {
    try {
      const body: RemoveLineItemRequestBody = {
        version: cartVersion,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
            variantId: 1,
          },
        ],
      };
      return await updateCart({ cartId, body }).unwrap();
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
    <div
      className={`${
        isCart ? 'border-separation-line dark:border-dark-separation-line' : 'border-text-grey/20'
      } relative border-b-2 pb-[22px]`}
    >
      <div className={`${isCart ? 'mb-5' : ''} relative flex items-start`}>
        <div className={`${isCart ? 'xs:max-w-[25%] md:max-w-[30%]' : 'lg:max-w-[33%] xl:max-w-[35%]'}`}>
          <img
            className={`${isCart ? 'h-[90px] min-w-[90px] md:h-40' : 'h-full'} rounded-md object-cover`}
            src={imgUrl}
            alt={name}
          />
        </div>
        <div className={`${isCart ? 'min-h-[90px] md:min-h-[160px]' : 'min-h-[98px]'} ml-5 grid`}>
          <h3
            className={`truncate-text ${
              isCart ? 'w-full text-lg xs:text-xl xl:mr-7' : 'lg:text-sm xl:mr-7 xl:text-base'
            }`}
          >
            {name}
          </h3>
          <p
            className={`self-end ${
              isCart ? 'text-sm text-text-grey sm:inline-block' : 'text-text-grey xl:inline-block'
            }`}
          >
            {calories}kcal <br />
            {weight} g
          </p>
        </div>
        <button
          disabled={updateIsLoading}
          onClick={removeAllFromCart}
          type="button"
          className={`${
            updateIsLoading ? 'animate-pulse cursor-wait' : ''
          } absolute -top-2 right-0 cursor-pointer text-3xl font-semibold text-text-grey transition-all ease-in hover:text-text-dark  ${
            isCart ? 'leading-4 md:text-4xl' : ''
          }
          
          `}
        >
          ×
        </button>
        <div className="ml-auto grid w-[max-content] items-center justify-end self-end">
          {oldPrice ? (
            <span className={`justify-self-end text-text-grey line-through ${isCart ? 'md:text-lg' : ''}`}>
              {oldPrice}
            </span>
          ) : null}
          <h3
            className={`mt-1 text-lg text-text-dark dark:text-primary  ${
              isCart ? 'md:text-2xl' : 'lg:text-sm xl:text-lg'
            }`}
          >
            {corePrice}
          </h3>
        </div>
      </div>
      <div className="flex items-center justify-start gap-x-3 lg:mt-2 xl:mt-6 xl:gap-x-5">
        <motion.button
          whileTap={buttonTapAnimation}
          transition={buttonTransition}
          disabled={updateIsLoading}
          onClick={removeOneFromCart}
          type="button"
          className={`${
            updateIsLoading ? 'animate-pulse cursor-wait' : ''
          } flex h-7 w-7 items-center justify-center rounded-full bg-accent-lightest fill-accent px-2 text-center text-xl leading-[40px] hover:bg-accent/30 ${
            isCart ? 'md:h-9 md:w-9 md:text-2xl' : 'md:h-7 md:w-7 lg:px-1 lg:text-sm xl:h-9 xl:w-9 xl:px-2 xl:text-lg'
          }`}
        >
          <MinusIcon />
        </motion.button>
        <div className="text-lg sm:text-xl">{padZero(quantity)}</div>
        <motion.button
          whileTap={buttonTapAnimation}
          transition={buttonTransition}
          disabled={updateIsLoading}
          onClick={addToCart}
          type="button"
          className={`${
            updateIsLoading ? 'animate-pulse cursor-wait' : ''
          } flex h-7 w-7 items-center justify-center rounded-full bg-accent-lightest fill-accent px-2 text-center text-xl hover:bg-accent/30 sm:text-xl md:h-9  md:w-9 md:text-2xl ${
            isCart ? 'md:h-9 md:w-9 md:text-2xl' : 'md:h-7 md:w-7 lg:px-1 lg:text-sm xl:h-9 xl:w-9 xl:px-2 xl:text-lg'
          }`}
        >
          <PlusIcon />
        </motion.button>
      </div>
    </div>
  );
}
