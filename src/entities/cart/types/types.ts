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

type RemoveLineItemRequestBody = {
	version: number;
	actions: {
		action: string;
		lineItemId: string;
		variantId: number;
		quantity?: number;
	}[];
};

type AddDiscountCodeRequestBody = {
	version: number;
	actions: {
		action: string;
		code: string;
	}[];
};

export type { AddLineItemRequestBody, RemoveLineItemRequestBody, CartListResponse, AddDiscountCodeRequestBody };
