import { NavLink, useNavigate } from 'react-router-dom';

import logOutIcon from '../../assets/icons/log-out.svg';
import { COOKIE_ACCESS_TOKEN, userSlice } from '../../entities/user';
import { COOKIE_REFRESH_TOKEN, COOKIE_USER_ID } from '../../entities/user/consts/constants.ts';
import { deleteCookie } from '../../shared/lib/helpers';
import { useAppDispatch, useAppSelector, useRevokeAccessRefreshTokens } from '../../shared/lib/hooks';
import CartIcon from '../ui/CartIcon.tsx';
import ContactsIcon from '../ui/ContactsIcon.tsx';
import MainIcon from '../ui/MenuIcon';

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
        flex
        w-full
        justify-between
        bg-primary
        px-4
        py-2
        dark:bg-dark-bg-primary
        lg:mt-12
        lg:max-h-full
        lg:flex-col
        lg:items-end
        lg:justify-start
        lg:gap-9
        lg:px-0
        xl:pl-8
        "
    >
      <li className="navMenuItem">
        <NavLink to="/categories/all" className="navMenuLink text-text-grey hover:text-accent">
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
        <NavLink to="/about" className="navMenuLink text-text-grey hover:text-accent">
          {({ isActive, isPending }) => (
            <>
              <ContactsIcon isActive={isActive || isPending} /> <span>Contacts</span>
            </>
          )}
        </NavLink>
      </li>
      {isLogged && (
        <li className="navMenuItem hidden md:absolute md:bottom-6 md:block lg:pl-14">
          <button onClick={handleLogout} type="button" className="navMenuLink text-text-dark dark:text-primary">
            <img src={logOutIcon} alt="" className="navMenuIcon md:inline-block" />
            Log out
          </button>
        </li>
      )}
    </ul>
  );
}

export default NavMenu;
