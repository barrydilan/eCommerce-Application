import { NavLink } from 'react-router-dom';

import LogOutBtn from '../../features/LogOutBtn/LogOutBtn.tsx';
import CartIcon from '../ui/CartIcon.tsx';
import ContactsIcon from '../ui/ContactsIcon.tsx';
import MainIcon from '../ui/MenuIcon';

function NavMenu() {
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
      <LogOutBtn isHeader={false} />
    </ul>
  );
}

export default NavMenu;
