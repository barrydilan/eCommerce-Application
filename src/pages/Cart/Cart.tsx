export default function Cart() {
  return (
    <div
      className="
    mt-14
    px-[10px]
    sm:mt-16
    md:px-[6px]
    md:py-[6px]
"
    >
      <h2 className="mb-6 mt-12 text-xl">Your order</h2>
      <div className="relative flex items-center justify-between gap-x-1 border-b-1 border-text-grey/40 pb-4">
        <img src="src/assets/img/cart-img.png" alt="" />
        <div className="flex flex-col gap-y-4">
          <h3 className="text-xs">Vegan Meal</h3>
          <div className="flex items-center gap-x-2 pl-2">
            <div className="text-xs">-</div>
            <div className="text-xs">1</div>
            <div className="text-xs">+</div>
          </div>
        </div>
        <div className="block self-end pb-1">
          <span className="block self-end text-xs">$24,50</span>
        </div>
        <div className="absolute right-0 top-0">X</div>
      </div>
    </div>
  );
}
