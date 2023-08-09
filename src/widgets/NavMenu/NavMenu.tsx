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
        <a href="/" className="text-center text-xs text-text-grey md:text-sm lg:text-lg lg:font-light">
          <img src={menuIcon} alt="" className="m-auto w-5 md:mr-2 md:inline-block md:w-6 lg:mr-4" />
          Our&nbsp;menu
        </a>
      </li>
      <li className="navMenuItem lg:hidden">
        <a href="/cart" className="text-center text-xs text-text-grey md:text-sm lg:text-lg lg:font-light">
          <img src={cartIcon} alt="" className="m-auto w-5 md:mr-2 md:inline-block md:w-6 lg:mr-4" />
          Cart
        </a>
      </li>
      <li className="navMenuItem">
        <a href="/delivery" className="text-center text-xs text-text-grey md:text-sm lg:text-lg lg:font-light">
          <img src={deliveryIcon} alt="" className="m-auto w-5 md:mr-2 md:inline-block md:w-6 lg:mr-4" />
          Delivery
        </a>
      </li>
      <li className="navMenuItem">
        <a href="/payment" className="text-center text-xs text-text-grey md:text-sm lg:text-lg lg:font-light">
          <img src={paymentIcon} alt="" className="m-auto w-5 md:mr-2 md:inline-block md:w-6 lg:mr-4" />
          Payment
        </a>
      </li>
      <li className="navMenuItem">
        <a href="/contacts" className="text-center text-xs text-text-grey md:text-sm lg:text-lg lg:font-light">
          <img src={contactsIcon} alt="" className="m-auto w-5 md:mr-2 md:inline-block md:w-6 lg:mr-4" />
          Contacts
        </a>
      </li>
      <li className="navMenuItem hidden md:absolute md:bottom-6 md:block">
        <button type="button" className="text-center text-xs text-text-grey md:text-sm lg:text-lg lg:font-light">
          <img src={logOutIcon} alt="" className="m-auto w-5 md:mr-2 md:inline-block md:w-6 lg:mr-4" />
          Log out
        </button>
      </li>
    </ul>
  );
}

export default NavMenu;
