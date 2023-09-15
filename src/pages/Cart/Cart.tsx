import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { RootState } from '../../app/store';
import { useAddLineItemMutation } from '../../entities/cart';
import CartItem from '../../widgets/CartItem/CartItem';

export default function Cart() {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const cartId = useSelector((state: RootState) => state.userReducer.cartId);
  // const { data } = useGetCartByIdQuery(cartId);
  // const [cartVersion, setCartVersion] = useState(data?.version || 1);
  // const body = {
  //   version: cartVersion,
  //   actions: [
  //     {
  //       action: 'addLineItem',
  //       productId: '215849a9-b440-40d1-9f91-e11bc15f1254',
  //       variantId: 1,
  //       quantity: 1,
  //     },
  //   ],
  // };
  // const [addLineItem] = useAddLineItemMutation();
  // const addToCart = async () => {
  //   try {
  //     const result = await addLineItem({ cartId, body });
  //     setCartVersion(result.data.version);
  //     console.log('updated cart', result.data.lineItems);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const isMobile = window.screen.width < 768;
  // const isCart = location.pathname.includes('cart');

  // useEffect(() => {
  //   if (!isMobile && isCart) {
  //     navigate('categories/all?sort=price+desc');
  //   }
  // });

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
      <CartItem />
    </div>
  );
}
