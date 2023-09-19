import { useGetCartByIdQuery, useUpdateCartMutation } from '../../entities/cart';
import { AddLineItemRequestBody } from '../../entities/cart/types/types';
import { useAppSelector } from '../../shared/lib/hooks';
import { LineItem } from '../../shared/types';

export default function AddToCartBtn(props: { productId: string }) {
  const { cartId } = useAppSelector((state) => state.userReducer);
  const { data: cart } = useGetCartByIdQuery(cartId);
  const [updateLineItem, { isLoading: updateIsLoading }] = useUpdateCartMutation();
  const { productId } = props;

  if (!cart) return null;

  const { lineItems } = cart;
  const currItem = lineItems?.find((item) => item?.productId === productId) as LineItem;
  const quantity = currItem?.quantity ?? 0;

  const disabled = quantity > 0;

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
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        addToCart();
      }}
      className={`${
        updateIsLoading ? 'cursor-wait opacity-30' : ''
      } mt-auto inline-block min-w-[30px] max-w-[50px] self-end rounded-md bg-accent-lightest text-2xl text-accent transition delay-150 duration-300 ease-in-out hover:bg-accent hover:text-accent-light disabled:bg-separation-line disabled:text-text-grey`}
    >
      +
    </button>
  );
}
