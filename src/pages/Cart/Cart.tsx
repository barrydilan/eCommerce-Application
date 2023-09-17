import CartItem from '../../widgets/CartItem/CartItem';

export default function Cart() {
  return (
    <div
      className="
      my-28
      border-b-2
      border-text-grey/30
      px-6
      dark:text-primary
      sm:mt-16
      sm:px-28
      lg:fixed 
      lg:mx-3
      lg:px-0
      lg:py-[6px]
      xl:w-[332px]
"
    >
      <h2 className="mb-6 text-xl sm:mt-24 lg:mt-10">Your order</h2>
      <CartItem productId="efb69837-6e83-487e-832f-9cbbea245ab6" />
    </div>
  );
}
