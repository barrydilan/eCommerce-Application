import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

import { useGetCartByIdQuery } from '../../entities/cart';
import LogOutBtn from '../../features/LogOutBtn/LogOutBtn.tsx';
import { useAppSelector } from '../../shared/lib/hooks';
import CartIcon from '../ui/CartIcon.tsx';
import ContactsIcon from '../ui/ContactsIcon.tsx';
import MainIcon from '../ui/MenuIcon';

const spanInitial = {
  scale: 0,
};

const spanAnimate = {
  scale: 1,
};

const spanTransition = {
  type: 'spring',
  stiffness: 900,
  damping: 35,
};

const spanExit = {
  scale: 0,
};

function NavMenu() {
  const { cartId } = useAppSelector((state) => state.userReducer);
  const { data: cart } = useGetCartByIdQuery(cartId);

  const cartItemsCount = cart?.totalLineItemQuantity;

  return (
    <ul
      className="
        flex
        w-full
        justify-between
        bg-primary
        p-2
        dark:bg-dark-bg-primary
        lg:mt-12
        lg:max-h-full
        lg:flex-col
        lg:items-end
        lg:justify-start
        lg:gap-9
        lg:px-0
        xl:pl-4
        "
    >
      <li className="navMenuItem">
        <NavLink to="/categories/all" className="navMenuLink text-text-grey hover:text-accent">
          {({ isActive, isPending }) => (
            <div className={`py rounded-xl px-2 py-1 ${isActive ? 'bg-accent-lightest lg:bg-opacity-0' : ''}`}>
              <MainIcon isActive={isActive || isPending} /> <span>Our menu</span>
            </div>
          )}
        </NavLink>
      </li>
      <li className="navMenuItem">
        <NavLink to="/cart" className="navMenuLink text-text-grey hover:text-accent">
          {({ isActive, isPending }) => (
            <div className={`py relative rounded-xl px-2 py-1 ${isActive ? 'bg-accent-lightest lg:bg-opacity-0' : ''}`}>
              <AnimatePresence>
                {!!cartItemsCount && (
                  <motion.span
                    key={cartItemsCount}
                    initial={spanInitial}
                    animate={spanAnimate}
                    transition={spanTransition}
                    exit={spanExit}
                    className="absolute -top-2 left-12 flex h-6 w-6 items-center justify-center rounded-full bg-shop-cart-red text-primary lg:left-5"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </AnimatePresence>
              <CartIcon isActive={isActive || isPending} /> <span>Cart</span>
            </div>
          )}
        </NavLink>
      </li>
      <li className="navMenuItem">
        <NavLink to="/about" className="navMenuLink text-text-grey hover:text-accent">
          {({ isActive, isPending }) => (
            <div className={`py rounded-xl px-2 py-1 ${isActive ? 'bg-accent-lightest lg:bg-opacity-0' : ''}`}>
              <ContactsIcon isActive={isActive || isPending} /> <span>Contacts</span>
            </div>
          )}
        </NavLink>
      </li>
      <LogOutBtn isHeader={false} />
    </ul>
  );
}

export default NavMenu;
