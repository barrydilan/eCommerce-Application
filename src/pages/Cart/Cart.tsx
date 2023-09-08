import crossIcon from '../../assets/icons/cross.svg';

export default function Cart() {
  return (
    <div
      className="
      mt-28
    px-6
    sm:mt-16
    sm:px-20
    md:px-[6px]
    md:py-[6px]
"
    >
      <h2 className="mb-6 text-xl sm:mt-24 md:mt-12">Your order</h2>
      <div className="relative flex items-center gap-x-4 border-b-1 border-text-grey/40 pb-4 md:gap-x-1">
        <div className="flex items-center gap-x-4 md:max-w-[40%] md:gap-x-2">
          <img className="h-full w-full object-cover" src="src/assets/img/cart-img.png" alt="" />
        </div>
        <div className="flex w-2/3 flex-col gap-y-10">
          <h3 className="text-lg sm:text-xl md:text-base">Vegan Meal</h3>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-x-2 pl-2">
              <div className="text-lg sm:text-xl md:text-sm">-</div>
              <div className="text-lg sm:text-xl md:text-sm">1</div>
              <div className="text-lg sm:text-xl md:text-sm">+</div>
            </div>
            <span className="block self-end pb-1 text-lg xs:pb-3 sm:text-xl md:pb-[0.7rem] md:text-sm">$24,50</span>
          </div>
        </div>
        <div className="absolute right-0 top-0">
          <img src={crossIcon} alt="" />
        </div>
      </div>
    </div>
  );
}
