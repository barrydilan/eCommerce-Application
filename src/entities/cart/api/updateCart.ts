import { rootApi } from '../../../shared/api';
import { CartResponse } from '../../../shared/types';
import ICreateCartParams from '../types/interfaces.ts';
import { AddLineItemRequestBody, RemoveLineItemRequestBody } from '../types/types.ts';

export const updateCartApi = rootApi.injectEndpoints({
	endpoints: (build) => ({
		createCart: build.mutation<CartResponse, ICreateCartParams>({
			query: (body) => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/me/carts`,
				method: 'POST',
				body,
			}),
		}),

		addLineItem: build.mutation<
			CartResponse,
			{ cartId: string; body: AddLineItemRequestBody | RemoveLineItemRequestBody }
		>({
			query: ({ cartId, body }) => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/me/carts/${cartId}`,
				method: 'POST',
				body,
			}),
		}),

		removeLineItem: build.mutation<CartResponse, { cartId: string; removeBody: RemoveLineItemRequestBody }>({
			query: ({ cartId, removeBody }) => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/me/carts/${cartId}`,
				method: 'POST',
				removeBody,
			}),
		}),
	}),
});

export const { useCreateCartMutation, useAddLineItemMutation, useRemoveLineItemMutation } = updateCartApi;
