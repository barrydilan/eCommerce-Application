import { rootApi } from '../../../shared/api';
import { CartResponse } from '../../../shared/types';
import { ICreateCartParams, IDeleteCartParams, IUpdateCartParams } from '../types/interfaces.ts';

export const updateCartApi = rootApi.injectEndpoints({
	endpoints: (build) => ({
		createCart: build.mutation<CartResponse, ICreateCartParams>({
			query: (body) => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/me/carts`,
				method: 'POST',
				body,
			}),
		}),

		updateCart: build.mutation<CartResponse, IUpdateCartParams>({
			query: ({ cartId, body }) => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/me/carts/${cartId}`,
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'CartItems', id: 'LIST' }],
		}),

		deleteCart: build.mutation<CartResponse, IDeleteCartParams>({
			query: ({ cartId, version }) => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/me/carts/${cartId}`,
				method: 'DELETE',
				params: {
					version,
				},
			}),
		}),
	}),
});

export const { useUpdateCartMutation, useCreateCartMutation, useDeleteCartMutation } = updateCartApi;
