import React, { useEffect, useState } from 'react';

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
  const { cartId, userId, isLogged } = useAppSelector((state) => state.userReducer);
  const { data: cart } = useGetCartByIdQuery(cartId);
  const [getCartList] = useLazyGetCartListQuery();
  const dispatch = useAppDispatch();
  const { updateCartId } = userSlice.actions;
  const [createCart] = useCreateCartMutation();
  const [updateCart] = useUpdateCartMutation();

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
      className="
      my-28
      grid
      h-full
      overflow-y-scroll
      px-6
      dark:text-primary
      sm:mt-16
      sm:px-28
      lg:fixed
      lg:mx-3
      lg:p-10
      lg:pb-20
      xl:w-[332px]
"
    >
      <h2 className="mb-6 text-2xl sm:mt-24 lg:mt-10">Your Order</h2>
      {!cart.lineItems?.length ? <p className="text-center">Your cart is empty</p> : null}

      {isCartEmpty ? null : (
        <>
          {cart.lineItems.map(({ id, productId, quantity }) => (
            <CartItem key={id} productId={productId} id={id} quantity={quantity} />
          ))}

          <div className="mt-6 text-text-dark">
            {oldPrice ? (
              <span className="justify-self-end text-text-grey line-through md:text-base">{oldPrice}</span>
            ) : null}
            <h3 className="mt-1 text-lg text-text-dark dark:text-primary lg:text-lg">
              <span className="text-text-grey">Total Price:</span> {totalPrice}
            </h3>
          </div>

          <form>
            <input
              value={promoValue}
              onChange={(e) => setPromoValue(e.target.value)}
              type="text"
              className="max-h-1/2"
            />
            <button
              onClick={handleApplyPromo}
              type="submit"
              className="flex h-[40px] items-center justify-center rounded-xl bg-accent-lightest p-4"
            >
              Apply Promo
            </button>
          </form>

          <button type="button" className="h-[40px] rounded-xl bg-accent">
            CHECKOUT
          </button>
          <button type="button" onClick={handleClearCart}>
            Clear all
          </button>
        </>
      )}
    </div>
  );
}
