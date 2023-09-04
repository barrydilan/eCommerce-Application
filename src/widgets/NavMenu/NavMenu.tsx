import { NavLink, useNavigate } from 'react-router-dom';

import logOutIcon from '../../assets/icons/log-out.svg';
import { COOKIE_ACCESS_TOKEN, userSlice } from '../../entities/user';
import { COOKIE_REFRESH_TOKEN, COOKIE_USER_ID } from '../../entities/user/consts/constants.ts';
import { deleteCookie } from '../../shared/lib/helpers';
import { useAppDispatch, useAppSelector, useRevokeAccessRefreshTokens } from '../../shared/lib/hooks';
import CartIcon from '../ui/CartIcon.tsx';
import ContactsIcon from '../ui/ContactsIcon.tsx';
import DeliveryIcon from '../ui/DeliveryIcon.tsx';
import MainIcon from '../ui/MenuIcon';
import PaymentIcon from '../ui/PaymentIcon.tsx';

function NavMenu() {
  const {
    isLogged,
    accessToken: oldAccessToken,
    refreshToken: oldRefreshToken,
  } = useAppSelector((state) => state.userReducer);
  const revokeTokens = useRevokeAccessRefreshTokens();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loggedOut } = userSlice.actions;

  async function handleLogout() {
    dispatch(loggedOut());
    navigate('/');
    deleteCookie(COOKIE_ACCESS_TOKEN, COOKIE_USER_ID, COOKIE_REFRESH_TOKEN);
    revokeTokens(oldAccessToken, oldRefreshToken);
  }

  return (
    <ul
      className="
        mt-2
        flex
        w-full
        justify-between
        md:mt-8
        md:max-h-full
        md:flex-col
        md:items-end
        md:justify-start
        md:gap-6
        lg:mt-12
        "
    >
      <li className="navMenuItem">
        <NavLink to="/product/all" className="navMenuLink text-text-grey hover:text-accent">
          {({ isActive, isPending }) => (
            <>
              <MainIcon isActive={isActive || isPending} /> <span>Our menu</span>
            </>
          )}
        </NavLink>
      </li>
      <li className="navMenuItem lg:hidden">
        <NavLink to="/cart" className="navMenuLink text-text-grey hover:text-accent">
          {({ isActive, isPending }) => (
            <>
              <CartIcon isActive={isActive || isPending} /> <span>Cart</span>
            </>
          )}
        </NavLink>
      </li>
      <li className="navMenuItem">
        <NavLink to="/delivery" className="navMenuLink text-text-grey hover:text-accent">
          {({ isActive, isPending }) => (
            <>
              <DeliveryIcon isActive={isActive || isPending} /> <span>Delivery</span>
            </>
          )}
        </NavLink>
      </li>
      <li className="navMenuItem">
        <NavLink to="/payment" className="navMenuLink text-text-grey hover:text-accent">
          {({ isActive, isPending }) => (
            <>
              <PaymentIcon isActive={isActive || isPending} /> <span>Payment</span>
            </>
          )}
        </NavLink>
      </li>
      <li className="navMenuItem">
        <NavLink to="/about" className="navMenuLink text-text-grey hover:text-accent">
          {({ isActive, isPending }) => (
            <>
              <ContactsIcon isActive={isActive || isPending} /> <span>Contacts</span>
            </>
          )}
        </NavLink>
      </li>
      {isLogged && (
        <li className="navMenuItem hidden md:absolute md:bottom-6 md:block">
          <button onClick={handleLogout} type="button" className="navMenuLink text-text-dark">
            <img src={logOutIcon} alt="" className="navMenuIcon md:inline-block" />
            Log out
          </button>
        </li>
      )}
    </ul>
  );
}

export default NavMenu;
