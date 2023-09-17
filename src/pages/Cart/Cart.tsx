import { useEffect } from 'react';

import { useCreateCartMutation, useGetCartByIdQuery, useLazyGetCartListQuery } from '../../entities/cart';
import { userSlice } from '../../entities/user';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import LoadingAnimation from '../../shared/ui/LoadingAnimation.tsx';
import CartItem from '../../widgets/CartItem/CartItem.tsx';

export default function Cart() {
  const { cartId, userId } = useAppSelector((state) => state.userReducer);
  const { data } = useGetCartByIdQuery(cartId);
  const [getCartList] = useLazyGetCartListQuery();
  const dispatch = useAppDispatch();
  const { updateCartId } = userSlice.actions;
  const [createCart] = useCreateCartMutation();

  useEffect(() => {
    async function fetchCreateCart() {
      try {
        const newCart = await createCart({ currency: 'USD' }).unwrap();

        if (newCart?.id) dispatch(updateCartId(newCart.id));
      } catch (e) {
        if (e && typeof e === 'object' && 'message' in e) throw new Error(`Could not create a cart ${e.message}`);
      }
    }

    if (!userId && !cartId) {
      fetchCreateCart();
      return;
    }

    async function fetchCartList() {
      const response = await getCartList().unwrap();
      const id = response.results.find(({ customerId }) => customerId === userId)?.id;

      if (id) dispatch(updateCartId(id));
    }

    if (!cartId) fetchCartList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartId, userId]);

  if (!data)
    return (
      <div className="flex h-full items-center justify-center overflow-hidden">
        <LoadingAnimation />
      </div>
    );

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
      {!data.lineItems?.length ? <p className="text-center">Your cart is empty</p> : null}

      {data.lineItems?.length
        ? data.lineItems.map(({ id, productId, quantity }) => (
            <CartItem key={id} productId={productId} id={id} quantity={quantity} />
          ))
        : null}
    </div>
  );
}
