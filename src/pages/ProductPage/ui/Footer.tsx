import MinusIcon from './MinusIcon';
import PlusIcon from './PlusIcon';
import heartAccent from '../../../assets/icons/heart-accent.svg';
import shoppingCart from '../../../assets/icons/shopping-cart-accent.svg';
import { useGetCartByIdQuery, useUpdateCartMutation } from '../../../entities/cart';
import { AddLineItemRequestBody, RemoveLineItemRequestBody } from '../../../entities/cart/types/types.ts';
import { padZero } from '../../../shared/lib/helpers';
import { useAppSelector, useGetPath } from '../../../shared/lib/hooks';
import { LineItem } from '../../../shared/types';

function Footer() {
  const { cartId } = useAppSelector((state) => state.userReducer);
  const { data: cart } = useGetCartByIdQuery(cartId);
  const productId = useGetPath();
  const [updateLineItem, { isLoading: updateIsLoading }] = useUpdateCartMutation();

  if (!cart) return null;

  const { lineItems } = cart;
  const currItem = lineItems?.find((item) => item?.productId === productId) as LineItem;
  const quantity = currItem?.quantity ?? 0;
  const lineItemId = currItem?.id ?? '';

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

      updateLineItem({ cartId, body }).unwrap();
    } catch (e) {
      // throw new Error(e);
    }
  };

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

  return (
    <div className="relative mt-6 md:order-last md:flex md:w-[85%] md:items-center md:justify-end md:gap-x-5 md:self-end md:pb-5">
      <button
        type="button"
        className="absolute hidden h-10 w-10 items-center justify-center rounded-full border-1 border-primary/30 dark:hover:bg-dark-separation-line md:right-[calc(100%+15px)] md:top-auto md:flex md:h-10 md:w-10 md:border-accent"
      >
        <img src={heartAccent} alt="" />
      </button>
      <div className="flex items-center gap-x-4">
        <button
          disabled={quantity === 0 || updateIsLoading}
          onClick={removeOneFromCart}
          className={`${updateIsLoading ? 'cursor-wait opacity-30' : ''} ${
            quantity === 0 ? 'opacity-30' : ''
          } flex h-8 w-8 items-center justify-center rounded-full border-1 border-text-dark p-2 transition-all duration-300 dark:border-primary dark:hover:bg-dark-separation-line sm:h-8 sm:w-8`}
          type="button"
        >
          <MinusIcon />
        </button>
        <span className="dark:text-primary sm:text-xl">{padZero(quantity)}</span>
        <button
          disabled={updateIsLoading}
          onClick={addToCart}
          className={`${
            updateIsLoading ? 'cursor-wait opacity-30' : ''
          } flex h-8 w-8 items-center justify-center rounded-full border-1 border-text-dark p-2 transition-all duration-300 dark:border-primary dark:hover:bg-dark-separation-line sm:h-8 sm:w-8`}
          type="button"
        >
          <PlusIcon />
        </button>
      </div>
      <button
        onClick={addToCart}
        type="button"
        className="dark: mt-3 block w-full rounded-md bg-accent-lightest px-4 py-3 text-accent transition-all duration-300 dark:border-2 dark:border-text-grey dark:bg-dark-bg-primary dark:hover:bg-dark-separation-line md:mt-0 md:w-fit"
      >
        <span className="mx-auto flex w-fit gap-x-2">
          <img src={shoppingCart} alt="" />
          <span className="inline-block">Add to Cart</span>
        </span>
      </button>
    </div>
  );
}

export default Footer;
