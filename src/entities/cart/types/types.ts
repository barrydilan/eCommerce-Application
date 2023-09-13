import { CartResponse } from '../../../shared/types';

type CartListResponse = Readonly<{
	limit: number;
	offset: number;
	count: number;
	total: number;
	results: CartResponse[];
}>;

export default CartListResponse;
