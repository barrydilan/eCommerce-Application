import crossIcon from '../../assets/icons/cross.svg';

export default function Cart() {
  return (
    <div
      className="
      mt-28
    px-6
    sm:mt-16
    sm:px-28
    md:px-[6px]
    md:py-[6px]
"
    >
      <h2 className="mb-6 text-xl sm:mt-24 md:mt-12">Your order</h2>
      <div className="relative flex items-center gap-x-4 border-b-1 border-text-grey/40 pb-4 md:gap-x-1 lg:gap-x-2">
        <div className="flex items-center gap-x-4 md:max-w-[33%] md:gap-x-2 lg:max-w-[35%]">
          <img className="h-full w-full object-cover" src="src/assets/img/cart-img.png" alt="" />
        </div>
        <div className="flex w-3/4 flex-col gap-y-10 md:gap-y-7 lg:gap-y-9">
          <h3 className="text-lg sm:text-xl md:text-xs lg:text-base">Vegan Meal</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3 md:pl-1 lg:gap-x-2">
              <div className="rounded-full bg-accent-lightest px-2 text-xl text-accent sm:text-xl md:px-1 md:text-sm lg:px-2 lg:text-lg">
                -
              </div>
              <div className="text-lg sm:text-xl md:text-sm">1</div>
              <div className="rounded-full bg-accent-lightest px-2 text-xl text-accent sm:text-xl md:px-1 md:text-sm lg:px-2 lg:text-lg">
                +
              </div>
            </div>
            <span className="block text-lg sm:text-xl md:text-xs lg:text-base">$24,50</span>
          </div>
        </div>
        <div className="absolute right-0 top-0">
          <img src={crossIcon} alt="" />
        </div>
      </div>
    </div>
  );
}
