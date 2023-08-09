import menuIcon from '../../assets/icons/menu.svg';
import cartIcon from '../../assets/icons/shopping-cart.svg';
import deliveryIcon from '../../assets/icons/delivery.svg';
import paymentIcon from '../../assets/icons/credit-card.svg';
import contactsIcon from '../../assets/icons/phone.svg';
import logOutIcon from '../../assets/icons/log-out.svg';

function NavMenu() {
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
        lg:mt-16
        "
    >
      <li className="navMenuItem">
        <a href="/" className="navMenuLink text-text-grey">
          <img src={menuIcon} alt="" className="navMenuIcon md:inline-block" />
          Our&nbsp;menu
        </a>
      </li>
      <li className="navMenuItem lg:hidden">
        <a href="/cart" className="navMenuLink text-text-grey">
          <img src={cartIcon} alt="" className="navMenuIcon md:inline-block" />
          Cart
        </a>
      </li>
      <li className="navMenuItem">
        <a href="/delivery" className="navMenuLink text-text-grey">
          <img src={deliveryIcon} alt="" className="navMenuIcon md:inline-block" />
          Delivery
        </a>
      </li>
      <li className="navMenuItem">
        <a href="/payment" className="navMenuLink text-text-grey">
          <img src={paymentIcon} alt="" className="navMenuIcon md:inline-block" />
          Payment
        </a>
      </li>
      <li className="navMenuItem">
        <a href="/contacts" className="navMenuLink text-text-grey">
          <img src={contactsIcon} alt="" className="navMenuIcon md:inline-block" />
          Contacts
        </a>
      </li>
      <li className="navMenuItem hidden md:absolute md:bottom-6 md:block">
        <button type="button" className="navMenuLink text-text-grey">
          <img src={logOutIcon} alt="" className="navMenuIcon md:inline-block" />
          Log out
        </button>
      </li>
    </ul>
  );
}

export default NavMenu;
