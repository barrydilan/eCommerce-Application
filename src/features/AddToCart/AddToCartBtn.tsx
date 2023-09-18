import { useGetCartByIdQuery, useUpdateCartMutation } from '../../entities/cart';
import { AddLineItemRequestBody } from '../../entities/cart/types/types';
import { useAppSelector } from '../../shared/lib/hooks';

export default function AddToCartBtn(props: { productId: string }) {
  const { cartId } = useAppSelector((state) => state.userReducer);
  const { data: cart } = useGetCartByIdQuery(cartId);
  const [updateLineItem] = useUpdateCartMutation();
  const { productId } = props;

  const addToCart = async () => {
    const body: AddLineItemRequestBody = {
      version: cart?.version || 1,
      actions: [
        {
          action: 'addLineItem',
          productId,
          variantId: 1,
          quantity: 1,
        },
      ],
    };
    try {
      return await updateLineItem({ cartId, body }).unwrap();
    } catch (e) {
      // throw new Error(e);
    }
    return null;
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.nativeEvent.stopImmediatePropagation();
        addToCart();
      }}
      className="mt-auto inline-block min-w-[30px] max-w-[50px] self-end rounded-md bg-accent-lightest text-2xl text-accent transition delay-150 duration-300 ease-in-out hover:bg-accent hover:text-accent-light"
    >
      +
    </button>
  );
}
