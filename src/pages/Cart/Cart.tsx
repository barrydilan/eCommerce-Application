import { useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { RootState } from '../../app/store';
import { useAddLineItemMutation, useLazyGetCartByIdQuery, useRemoveLineItemMutation } from '../../entities/cart';
import CartItem from '../../widgets/CartItem/CartItem';

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartId = useSelector((state: RootState) => state.userReducer.cartId);
  const [getCart, { data: cart }] = useLazyGetCartByIdQuery();
  const [addLineItem, { data: newCart }] = useAddLineItemMutation();
  const [removeLineItem] = useRemoveLineItemMutation();

  const memoizedGetCart = useCallback(
    (_cartId: string) => {
      getCart(_cartId, false);
    },
    [getCart],
  );

  useEffect(() => {
    memoizedGetCart(cartId);
  }, [cartId, memoizedGetCart, newCart]);

  const body = {
    version: cart?.version || 1,
    actions: [
      {
        action: 'addLineItem',
        productId: 'efb69837-6e83-487e-832f-9cbbea245ab6',
        variantId: 1,
        quantity: 1,
      },
    ],
  };

  const removeBody = {
    version: cart?.version || 1,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId: 'cdf8f33f-3c10-46e3-9909-91b51ba981ba',
        variantId: 1,
        quantity: 1,
      },
    ],
  };

  const addToCart = async () => {
    try {
      const result = await addLineItem({ cartId, body });
      console.log('updated cart', result.data.lineItems);
    } catch (error) {
      console.error(error);
    }
  };

  const removeOneFromCart = async () => {
    try {
      const result = await removeLineItem({ cartId, removeBody });
      console.log('updated cart', result.data.lineItems);
    } catch (error) {
      console.error(error);
    }
  };

  const isMobile = window.screen.width < 768;
  const isCart = location.pathname.includes('cart');

  useEffect(() => {
    if (!isMobile && isCart) {
      navigate('categories/all?sort=price+desc');
    }
  });

  return (
    <div
      className="
      my-28
      border-b-2
      border-text-grey/30
      px-6
      dark:text-primary
      sm:mt-16
      sm:px-28
      lg:fixed 
      lg:mx-3
      lg:px-0
      lg:py-[6px]
      xl:w-[332px]
"
    >
      <h2 className="mb-6 text-xl sm:mt-24 lg:mt-10">Your order</h2>
      <CartItem
        // addToCart={addToCart}
        // removeOneFromCart={removeOneFromCart}
        productId="efb69837-6e83-487e-832f-9cbbea245ab6"
      />
    </div>
  );
}
