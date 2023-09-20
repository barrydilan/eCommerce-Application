import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion, useCycle } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

import {
  animate,
  initialAnimation,
  modalAnimate,
  modalExit,
  modalInitial,
  modalTransition,
} from './constants/constants.ts';
import emptyCart from '../../assets/icons/empty-cart-icon.svg';
import {
  useCreateCartMutation,
  useGetCartByIdQuery,
  useLazyGetCartListQuery,
  useUpdateCartMutation,
} from '../../entities/cart';
import { formatPrice, pennieToMoney } from '../../entities/product';
import { userSlice } from '../../entities/user';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import {
  buttonTapAnimation,
  buttonTransition,
  emptyCartAnimate,
  emptyCartInitial,
  emptyCartTransition,
  itemAnimation,
  itemExit,
  itemInitial,
  itemTransition,
} from '../../shared/ui/animations.tsx';
import LoadingAnimation from '../../shared/ui/LoadingAnimation.tsx';
import CartItem from '../../widgets/CartItem/CartItem.tsx';

export default function Cart() {
  const [promoValue, setPromoValue] = useState('');
  const [isModalShown, setIsModalShown] = useCycle(false, true);
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

    if (!promoValue) return;

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
    <motion.div
      layout
      initial={initialAnimation}
      animate={animate}
      transition={itemTransition}
      className={
        isCart
          ? `
          mx-auto
          my-16
          flex
          h-full
          flex-col
          px-3
          pb-16
          dark:text-primary
          sm:px-5
          md:max-w-[850px]
          md:py-12
          lg:mb-0
          `
          : `
          flex
          h-full
          flex-col
          overflow-y-auto
          border-b-2 
          border-text-grey/30
          dark:text-primary
          lg:fixed
          lg:w-[200px]
          lg:px-10
          lg:py-28
          lg:pb-[210px]
          xl:w-[360px]
      `
      }
    >
      <h2 className="text-2xl">Your Order</h2>
      {isCartEmpty ? (
        <div className="m-auto grid justify-items-center self-center">
          <img width="250px" src={emptyCart} alt="" />
          <motion.p
            key="empty-cart"
            initial={emptyCartInitial}
            animate={emptyCartAnimate}
            transition={emptyCartTransition}
            className={`text-center text-lg text-text-grey ${
              isCart ? 'w-fit' : 'lg:w-[150px] xl:w-[300px]'
            } mx-auto mt-5`}
          >
            <span className="text-3xl font-bold">Your cart is empty!</span> <br />
            <div className="mt-2">
              <span className="text-text-grey">Visit </span>
              <Link className="text-accent transition-all hover:text-accent/70" to="/">
                Product catalog
              </Link>{' '}
              to find good meals :)
            </div>
          </motion.p>
        </div>
      ) : (
        <motion.div
          initial={itemInitial}
          animate={itemAnimation}
          transition={itemTransition}
          exit={itemExit}
          layout
          className="mt-6 grid gap-6"
        >
          {cart.lineItems.map(({ id, productId, quantity }, i) => (
            <CartItem key={id} productId={productId} id={id} quantity={quantity} delay={i} />
          ))}
          <form
            className={`${
              isCart ? 'border-separation-line pb-10 dark:border-dark-separation-line' : 'border-text-grey/30 pb-5 pt-0'
            } flex flex-wrap justify-end gap-6 border-b-2 border-separation-line pb-6`}
          >
            <input
              value={promoValue}
              onChange={(e) => setPromoValue(e.target.value)}
              type="text"
              placeholder="Promocode"
              className={`${
                isCart ? 'w-full md:w-56' : 'w-full'
              } h-14 rounded-md border-2 border-text-grey/30 bg-separation-line pl-4 text-text-dark`}
            />
            <motion.button
              whileTap={buttonTapAnimation}
              transition={buttonTransition}
              onClick={handleApplyPromo}
              type="submit"
              className={`${
                isCart ? 'w-full md:w-36' : 'w-full'
              } h-14 rounded-md bg-accent-lightest leading-[40px] tracking-wide text-accent transition-all hover:bg-accent/20`}
            >
              Apply
            </motion.button>
          </form>

          <div className="flex flex-col items-end text-text-dark">
            {oldPrice ? (
              <span className="justify-self-end text-text-grey line-through md:text-base">{oldPrice}</span>
            ) : null}
            <h3 className="text-3 mt-1 text-text-dark dark:text-primary lg:text-xl">
              <span className="text-text-grey">Total Price:&nbsp;</span>
              <span className="font-semibold"> {totalPrice}</span>
            </h3>
          </div>

          <motion.button
            whileTap={buttonTapAnimation}
            transition={buttonTransition}
            type="button"
            className={`${
              isCart ? 'w-full md:w-96' : 'w-full'
            } ml-auto h-14 rounded-md bg-accent tracking-wide text-primary transition-all duration-200 hover:bg-accent/80`}
          >
            CHECKOUT
          </motion.button>

          <div className="relative flex">
            <motion.button
              whileTap={buttonTapAnimation}
              transition={buttonTransition}
              className={`${
                isCart
                  ? 'mt-5 w-full border-separation-line hover:bg-separation-line dark:border-dark-separation-line dark:hover:bg-dark-separation-line md:w-96'
                  : 'mt-3 w-full border-text-grey/30 hover:bg-text-grey/30'
              } ml-auto h-14 rounded-md border-2 px-3 text-text-grey transition-all duration-200 dark:text-primary`}
              type="button"
              onClick={() => setIsModalShown()}
            >
              CLEAR CART
            </motion.button>

            <AnimatePresence>
              {isModalShown && (
                <motion.div
                  initial={modalInitial}
                  animate={modalAnimate}
                  exit={modalExit}
                  transition={modalTransition}
                  key="modal"
                  className={`${
                    isCart ? 'right-0 top-0' : 'lg:right-0 lg:top-[60px] xl:left-[150px] xl:top-10'
                  } absolute rounded-md border-2 border-text-grey/30 bg-separation-line p-2 dark:bg-dark-separation-line`}
                >
                  <p className="text-text-dark dark:text-primary">Are you sure?</p>
                  <div className="mt-2 flex justify-between">
                    <button onClick={() => setIsModalShown()} className="rounded-md px-2 text-text-grey" type="button">
                      No
                    </button>
                    <button
                      onClick={() => {
                        setIsModalShown();
                        handleClearCart();
                      }}
                      className="rounded-md bg-accent-lightest px-2 text-accent"
                      type="button"
                    >
                      Yes
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
