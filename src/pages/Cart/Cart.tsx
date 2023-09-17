import { useGetCartByIdQuery } from '../../entities/cart';
import { useAppSelector } from '../../shared/lib/hooks';
import LoadingAnimation from '../../shared/ui/LoadingAnimation.tsx';
import CartItem from '../../widgets/CartItem/CartItem.tsx';

export default function Cart() {
  const { cartId } = useAppSelector((state) => state.userReducer);
  const { data } = useGetCartByIdQuery(cartId);

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
        ? data.lineItems.map((item) => <CartItem key={item.id} productId={item.productId} />)
        : null}
    </div>
  );
}
