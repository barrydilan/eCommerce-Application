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
        p-2
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
            <div className={`py rounded-xl px-2 py-1 ${isActive ? 'bg-accent-lightest lg:bg-primary' : ''}`}>
              <MainIcon isActive={isActive || isPending} /> <span>Our menu</span>
            </div>
          )}
        </NavLink>
      </li>
      <li className="navMenuItem lg:hidden">
        <NavLink to="/cart" className="navMenuLink text-text-grey hover:text-accent">
          {({ isActive, isPending }) => (
            <div className={`py rounded-xl px-2 py-1 ${isActive ? 'bg-accent-lightest lg:bg-primary' : ''}`}>
              <CartIcon isActive={isActive || isPending} /> <span>Cart</span>
            </div>
          )}
        </NavLink>
      </li>
      <li className="navMenuItem">
        <NavLink to="/about" className="navMenuLink text-text-grey hover:text-accent">
          {({ isActive, isPending }) => (
            <div className={`py rounded-xl px-2 py-1 ${isActive ? 'bg-accent-lightest lg:bg-primary' : ''}`}>
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
