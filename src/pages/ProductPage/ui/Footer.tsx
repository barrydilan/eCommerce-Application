import heartAccent from '../../../assets/icons/heart-accent.svg';
import minus from '../../../assets/icons/minus.svg';
import plus from '../../../assets/icons/plus.svg';
import shoppingCart from '../../../assets/icons/shopping-cart-accent.svg';

function Footer() {
  return (
    <div className="relative mt-6 md:order-last md:flex md:w-[85%] md:items-center md:justify-end md:gap-x-5 md:self-end md:pb-5">
      <button
        type="button"
        className="absolute hidden h-10 w-10 items-center justify-center rounded-full border-1 border-primary/30 md:right-[calc(100%+15px)] md:top-auto md:flex md:h-10 md:w-10 md:border-accent"
      >
        <img src={heartAccent} alt="" />
      </button>
      <div className="flex items-center gap-x-4">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border-1 border-text-dark p-2 sm:h-8 sm:w-8"
          type="button"
        >
          <img src={minus} alt="minus" />
        </button>
        <span className="sm:text-xl">01</span>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border-1 border-text-dark p-2 sm:h-8 sm:w-8"
          type="button"
        >
          <img src={plus} alt="plus" />
        </button>
      </div>
      <button
        type="button"
        className="mt-3 block w-full rounded-md bg-accent-lightest px-4 py-3 text-accent md:mt-0 md:w-fit"
      >
        <span className="mx-auto flex w-fit gap-x-2">
          <img src={shoppingCart} alt="" />
          <span className="inline-block">Add to Cart</span>
        </span>
      </button>
    </div>
  );
}

export default Footer;
