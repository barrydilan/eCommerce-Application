import { useEffect } from 'react';

import {
  useCreateCartMutation,
  useDeleteCartMutation,
  useGetCartByIdQuery,
  useLazyGetCartListQuery,
} from '../../entities/cart';
import FormatPrice from '../../entities/product/lib/helpers/formatPrice.ts';
import pennieToMoney from '../../entities/product/lib/helpers/pennieToMoney.ts';
import { userSlice } from '../../entities/user';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import LoadingAnimation from '../../shared/ui/LoadingAnimation.tsx';
import CartItem from '../../widgets/CartItem/CartItem.tsx';

export default function Cart() {
  const { cartId, userId, isLogged } = useAppSelector((state) => state.userReducer);
  const { data } = useGetCartByIdQuery(cartId);
  const [getCartList] = useLazyGetCartListQuery();
  const dispatch = useAppDispatch();
  const { updateCartId } = userSlice.actions;
  const [createCart] = useCreateCartMutation();
  const [deleteCart] = useDeleteCartMutation();

  const isCartEmpty = !data?.lineItems?.length;

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

  if (!data)
    return (
      <div className="flex h-full items-center justify-center overflow-hidden">
        <LoadingAnimation />
      </div>
    );

  async function clearCart() {
    try {
      await deleteCart({ cartId, version: data?.version ?? 1 });
      const { id } = await createCart({ currency: 'USD' }).unwrap();

      dispatch(updateCartId(id));
    } catch (e) {
      if (e && typeof e === 'object' && 'message' in e) throw new Error(`Could not clear cart! ${e.message}`);
    }
  }

  const totalPrice = FormatPrice(pennieToMoney(data?.totalPrice?.centAmount), data?.totalPrice?.currencyCode);

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
      {!data.lineItems?.length ? <p className="text-center">Your cart is empty</p> : null}

      {isCartEmpty ? null : (
        <>
          {data.lineItems.map(({ id, productId, quantity }) => (
            <CartItem key={id} productId={productId} id={id} quantity={quantity} />
          ))}

          <div className="mt-6 text-text-dark">
            <span className="text-text-grey">Total Price</span>: {totalPrice}
          </div>

          <button type="button" className="h-[40px] rounded-xl bg-accent">
            CHECKOUT
          </button>
          <button type="button" onClick={clearCart}>
            Clear all
          </button>
        </>
      )}
    </div>
  );
}
