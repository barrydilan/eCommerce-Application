import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { RootState } from '../../app/store';
import { useGetCartByIdQuery } from '../../entities/cart';

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartId = useSelector((state: RootState) => state.userReducer.cartId);
  const { data } = useGetCartByIdQuery(cartId);
  console.log(data);

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
      <div className="relative flex items-start gap-x-4 lg:gap-x-1 xl:gap-x-2">
        <div className="lg:max-w-[33%] xl:max-w-[35%]">
          <img className="h-full w-full object-cover" src="src/assets/img/cart-img.png" alt="" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl  lg:text-sm xl:mr-7 xl:text-base">Set four flavours of salmon</h3>
          <p className="mt-1 hidden text-xs text-text-grey lg:block">
            2205kcal <br />
            1405 g
          </p>
        </div>
        <button
          type="button"
          className="absolute right-0 top-0 cursor-pointer text-3xl font-semibold text-text-grey transition-all ease-in hover:text-text-dark"
        >
          ×
        </button>
      </div>
      <div className="flex items-center justify-between">
        <span className="block text-lg font-medium sm:text-xl lg:ml-auto lg:mt-2 lg:text-sm xl:text-lg">$24,50</span>
      </div>
      <div className="flex items-center justify-end gap-x-3 lg:mt-2 xl:mb-3 xl:mt-4 xl:gap-x-3">
        <button
          type="button"
          className="h-7 w-7 rounded-full bg-accent-lightest px-2 text-center text-xl leading-[40px] text-accent sm:text-xl lg:px-1 lg:text-sm xl:h-9 xl:w-9 xl:px-2 xl:text-lg"
        >
          -
        </button>
        <div className="text-lg sm:text-xl lg:text-sm xl:text-lg">1</div>
        <button
          type="button"
          className="h-7 w-7 rounded-full bg-accent-lightest px-2 text-center text-xl text-accent sm:text-xl lg:px-1 lg:text-sm xl:h-9 xl:w-9 xl:px-2 xl:text-lg"
        >
          +
        </button>
      </div>
    </div>
  );
}
