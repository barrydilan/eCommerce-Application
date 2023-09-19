import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import {
  useCreateCartMutation,
  useGetCartByIdQuery,
  useLazyGetCartListQuery,
  useUpdateCartMutation,
} from '../../entities/cart';
import { formatPrice, pennieToMoney } from '../../entities/product';
import { userSlice } from '../../entities/user';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import LoadingAnimation from '../../shared/ui/LoadingAnimation.tsx';
import CartItem from '../../widgets/CartItem/CartItem.tsx';

export default function Cart() {
  const [promoValue, setPromoValue] = useState('');
  const [isModalShown, setIsModalShown] = useState(false);
  const { cartId, userId, isLogged } = useAppSelector((state) => state.userReducer);
  const { data: cart } = useGetCartByIdQuery(cartId);
  const [getCartList] = useLazyGetCartListQuery();
  const dispatch = useAppDispatch();
  const { updateCartId } = userSlice.actions;
  const [createCart] = useCreateCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const pathName = useLocation().pathname;
  const isCart = pathName === '/cart';

  const isCartEmpty = !cart?.totalLineItemQuantity;
  const cartVersion = cart?.version ?? 1;

  useEffect(() => {
    async function fetchCreateCart() {
      try {
        const newCart = await createCart({ currency: 'USD' }).unwrap();

        if (newCart?.id) dispatch(updateCartId(newCart.id));
      } catch (e) {
        if (e && typeof e === 'object' && 'message' in e) throw new Error(`Could not create a cart! ${e.message}`);
      }
    }

    async function fetchCartList() {
      try {
        const response = await getCartList().unwrap();
        const id = response.results.find(({ customerId }) => customerId === userId)?.id;

        if (id) dispatch(updateCartId(id));
      } catch (e) {
        if (e && typeof e === 'object' && 'message' in e) throw new Error(`Could not query a cart! ${e.message}`);
      }
    }

    if (isLogged) fetchCartList();
    else if (!isLogged && !cartId) {
      fetchCreateCart();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartId, userId]);

  if (!cart)
    return (
      <div className="flex h-full items-center justify-center overflow-hidden">
        <LoadingAnimation />
      </div>
    );

  const totalPriceAmount = cart?.totalPrice?.centAmount;
  const totalPrice = formatPrice(pennieToMoney(totalPriceAmount), cart?.totalPrice?.currencyCode);
  const discountAmount = cart?.lineItems
    ?.at(0)
    ?.discountedPricePerQuantity.at(0)
    ?.discountedPrice?.includedDiscounts?.at(0)?.discountedAmount.centAmount;
  const totalItems = cart?.totalLineItemQuantity;
  const oldPrice = discountAmount ? formatPrice(pennieToMoney(totalPriceAmount + discountAmount * totalItems)) : null;

  async function handleClearCart() {
    try {
      if (!cart) return;

      const actions = cart.lineItems.map(({ id }) => {
        return {
          action: 'removeLineItem',
          lineItemId: id,
          variantId: 1,
        };
      });

      updateCart({
        cartId,
        body: {
          version: cartVersion,
          actions,
        },
      });
    } catch (e) {
      if (e && typeof e === 'object' && 'message' in e) throw new Error(`Could not clear cart! ${e.message}`);
    }
  }

  async function handleApplyPromo(e: React.SyntheticEvent) {
    e.preventDefault();

    try {
      const body = {
        version: cartVersion,
        actions: [
          {
            action: 'addDiscountCode',
            code: promoValue,
          },
        ],
      };

      updateCart({ cartId, body }).unwrap();
    } catch (err) {
      if (err && typeof err === 'object' && 'message' in err) throw new Error(`Could not apply promo! ${err.message}`);
    }
  }

  return (
    <div
      className={
        isCart
          ? `
          mx-auto
          my-16
          px-3
          pb-8
          dark:text-primary
          sm:px-5
          md:max-w-[850px]
          md:py-12
          lg:mb-0
          `
          : `
          mx-auto
          my-[104px]
          h-full
          overflow-y-auto
          border-b-2
          border-text-grey/30
          dark:text-primary
          lg:fixed
          lg:w-[200px] 
          lg:px-2 
          lg:pb-[210px]
          xl:w-[360px]
          xl:px-5
          xl:pb-[150px]
      `
      }
    >
      <h2 className={`${isCart ? 'text-2xl lg:mt-0' : 'lg:mt-2'} `}>Your Order</h2>
      {!cart.lineItems?.length ? (
        <p className={`${isCart ? 'w-auto' : 'lg:w-[150px] xl:w-[300px]'} mx-auto mt-5 text-center`}>
          Empty cart ? <br /> Visit{' '}
          <Link className="text-lg text-accent" to="/">
            Product catalog
          </Link>{' '}
          to add some.
        </p>
      ) : null}

      {isCartEmpty ? null : (
        <div className="mt-6 flex flex-col gap-5">
          {cart.lineItems.map(({ id, productId, quantity }) => (
            <CartItem key={id} productId={productId} id={id} quantity={quantity} />
          ))}

          <form
            className={`${
              isCart
                ? 'border-separation-line pb-10 pt-5 dark:border-dark-separation-line'
                : 'border-text-grey/30 pb-5 pt-0'
            } flex flex-wrap justify-end gap-5 border-b-2 border-separation-line pb-10  `}
          >
            <input
              value={promoValue}
              onChange={(e) => setPromoValue(e.target.value)}
              type="text"
              placeholder="Promocode"
              className={`${
                isCart ? '' : 'w-[185px]'
              } h-10 rounded-md border-2 border-text-grey/30 bg-separation-line pl-4 text-text-dark`}
            />
            <button
              onClick={handleApplyPromo}
              type="submit"
              className="h-10 w-[133px] rounded-xl bg-accent leading-[40px] text-primary transition-all duration-200 hover:bg-accent-lightest"
            >
              Apply Promo
            </button>
          </form>

          <div className={`${isCart ? 'py-4' : 'py-0'} flex flex-col items-end py-4 text-text-dark`}>
            {oldPrice ? (
              <span className="justify-self-end text-text-grey line-through md:text-base">{oldPrice}</span>
            ) : null}
            <h3 className="mt-1 text-xl text-text-dark dark:text-primary lg:text-lg">
              <span className="text-text-grey">Total Price:&nbsp;</span> {totalPrice}
            </h3>
          </div>

          <button
            type="button"
            className={`${
              isCart ? 'w-[300px]' : 'w-[150px]'
            } ml-auto h-10   rounded-xl bg-accent text-primary transition-all duration-200 hover:bg-accent-lightest`}
          >
            CHECKOUT
          </button>

          <div className="relative">
            <button
              className={`${
                isCart
                  ? 'mt-5 border-separation-line hover:bg-separation-line  dark:border-dark-separation-line dark:hover:bg-dark-separation-line'
                  : 'mt-3 border-text-grey/30 hover:bg-text-grey/30'
              } mr-auto h-10  rounded-xl border-2 px-3  text-text-grey transition-all duration-200 dark:text-primary `}
              type="button"
              onClick={() => setIsModalShown((prev) => !prev)}
            >
              CLEAR CART
            </button>
            <div
              className={`${isModalShown ? 'opacity-100' : 'opacity-0'} ${
                isCart ? 'left-[150px] top-0' : 'lg:left-0 lg:top-[60px] xl:left-[150px] xl:top-0'
              } absolute rounded-md border-2 border-text-grey/30 bg-separation-line p-2 transition-all duration-300 dark:bg-dark-separation-line`}
            >
              <p>Are you sure?</p>
              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => setIsModalShown(false)}
                  className="rounded-md border-2 border-text-grey/30 px-2 "
                  type="button"
                >
                  No
                </button>
                <button
                  onClick={() => {
                    setIsModalShown(false);
                    handleClearCart();
                  }}
                  className="rounded-md border-2 border-text-grey/30 px-2 "
                  type="button"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
