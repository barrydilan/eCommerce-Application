import { rootApi } from '../../../shared/api';
import { CartResponse } from '../../../shared/types';
import { ICreateCartParams } from '../types/interfaces.ts';
import { AddLineItemRequestBody } from '../types/types.ts';

export const updateCartApi = rootApi.injectEndpoints({
	endpoints: (build) => ({
		getCart: build.mutation<CartResponse, ICreateCartParams>({
			query: (body) => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/carts`,
				method: 'POST',
				body,
			}),
		}),
		addLineItem: build.mutation<CartResponse, { cartId: string; body: AddLineItemRequestBody }>({
			query: ({ cartId, body }) => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/carts/${cartId}`,
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const { useGetCartMutation, useAddLineItemMutation } = updateCartApi;
