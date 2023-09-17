import CartItem from '../../widgets/CartItem/CartItem';

export default function Cart() {
  return (
    <div
      className="
      mx-auto
      mt-24
      border-b-2
      border-text-grey/30
      px-6
      dark:text-primary
      sm:px-28
      md:max-w-[850px]
"
    >
      <h2 className="mb-6 text-xl sm:mt-24 lg:mt-10">Your order</h2>
      <CartItem productId="04f60ec8-bce0-4b2d-9d1f-610397b13763" />
      <CartItem productId="04f60ec8-bce0-4b2d-9d1f-610397b13763" />
      <CartItem productId="04f60ec8-bce0-4b2d-9d1f-610397b13763" />
      <CartItem productId="04f60ec8-bce0-4b2d-9d1f-610397b13763" />
      <CartItem productId="04f60ec8-bce0-4b2d-9d1f-610397b13763" />
      <CartItem productId="04f60ec8-bce0-4b2d-9d1f-610397b13763" />
    </div>
  );
}
