import { useLocation } from 'react-router-dom';

import CartItem from '../../widgets/CartItem/CartItem';

export default function Cart() {
  const pathName = useLocation().pathname;
  const isCart = pathName === '/cart';

  return (
    <div
      className={
        !isCart
          ? `
      mx-auto
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
      xl:w-[332px]`
          : `mx-auto
      mt-24
      border-b-2
      border-text-grey/30
      px-6
      dark:text-primary
      sm:px-28
      md:max-w-[850px]`
      }
    >
      <h2 className="mb-6 text-xl sm:mt-24 lg:mt-10">Your order</h2>
      <CartItem productId="d37d2e04-5dc4-41bb-808c-5c3ba4da3b59" />
    </div>
  );
}
