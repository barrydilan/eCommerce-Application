import { CartResponse } from '../../../shared/types';

type CartListResponse = Readonly<{
	limit: number;
	offset: number;
	count: number;
	total: number;
	results: CartResponse[];
}>;

type AddLineItemRequestBody = {
	version: number;
	actions: {
		action: string;
		productId: string;
		variantId: number;
		quantity: number;
	}[];
};

export type { AddLineItemRequestBody, CartListResponse };
