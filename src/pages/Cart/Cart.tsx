import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import CartItem from '../../widgets/CartItem/CartItem';

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();

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
      <CartItem productId="d37d2e04-5dc4-41bb-808c-5c3ba4da3b59" />
    </div>
  );
}
