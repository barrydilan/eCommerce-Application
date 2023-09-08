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
      <div className="relative flex items-center justify-between gap-x-4 border-b-1 border-text-grey/40 pb-4 md:gap-x-1">
        <div className="flex items-center gap-x-4 md:max-w-[40%] md:gap-x-2">
          <img className="h-full w-full object-cover" src="src/assets/img/cart-img.png" alt="" />
          <div className="flex flex-col gap-y-8 md:gap-y-8">
            <h3 className="text-lg sm:text-xl md:text-xs">Vegan Meal</h3>
            <div className="flex items-center gap-x-2 pl-2">
              <div className="text-lg sm:text-xl md:text-xs">-</div>
              <div className="text-lg sm:text-xl md:text-xs">1</div>
              <div className="text-lg sm:text-xl md:text-xs">+</div>
            </div>
          </div>
        </div>
        <span className="block self-end pb-[0.75rem] text-lg xs:pb-3 sm:text-xl md:pb-[0.7rem] md:text-xs">$24,50</span>
        <div className="absolute right-0 top-0">X</div>
      </div>
    </div>
  );
}
