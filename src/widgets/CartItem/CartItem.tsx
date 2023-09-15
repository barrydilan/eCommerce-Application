interface ICartItemProps {
  addToCart: () => void;
  removeOneFromCart: () => void;
}

export default function CartItem(props: ICartItemProps) {
  const { addToCart, removeOneFromCart } = props;
  return (
    <>
      <div className="relative flex items-start gap-x-4 lg:gap-x-1 xl:gap-x-2">
        <div className="lg:max-w-[33%] xl:max-w-[35%]">
          <img className="h-full w-full object-cover" src="src/assets/img/cart-img.png" alt="" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl  lg:text-sm xl:mr-7 xl:text-base">Set four flavours of salmon</h3>
          <p className="mt-1 hidden text-xs text-text-grey lg:block">
            2205kcal <br />
            1405 g
          </p>
        </div>
        <button
          type="button"
          className="absolute right-0 top-0 cursor-pointer text-3xl font-semibold text-text-grey transition-all ease-in hover:text-text-dark"
        >
          ×
        </button>
      </div>
      <div className="flex items-center justify-between">
        <span className="block text-lg font-medium sm:text-xl lg:ml-auto lg:mt-2 lg:text-sm xl:text-lg">$24,50</span>
      </div>
      <div className="flex items-center justify-end gap-x-3 lg:mt-2 xl:mb-3 xl:mt-4 xl:gap-x-3">
        <button
          onClick={removeOneFromCart}
          type="button"
          className="h-7 w-7 rounded-full bg-accent-lightest px-2 text-center text-xl leading-[40px] text-accent sm:text-xl lg:px-1 lg:text-sm xl:h-9 xl:w-9 xl:px-2 xl:text-lg"
        >
          -
        </button>
        <div className="text-lg sm:text-xl lg:text-sm xl:text-lg">1</div>
        <button
          onClick={addToCart}
          type="button"
          className="h-7 w-7 rounded-full bg-accent-lightest px-2 text-center text-xl text-accent sm:text-xl lg:px-1 lg:text-sm xl:h-9 xl:w-9 xl:px-2 xl:text-lg"
        >
          +
        </button>
      </div>
    </>
  );
}
