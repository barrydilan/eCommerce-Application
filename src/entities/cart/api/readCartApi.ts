import { rootApi } from '../../../shared/api';
import { CartResponse } from '../../../shared/types';
import { CartListResponse } from '../types/types.ts';

export const readCartApi = rootApi.injectEndpoints({
	endpoints: (build) => ({
		getCartList: build.query<CartListResponse, void>({
			query: () => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/me/carts`,
				params: {
					withTotal: false,
				},
			}),
		}),

		getCartById: build.query<CartResponse, string>({
			query: (id) => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/me/carts/${id}`,
			}),
		}),
	}),
});

export const { useGetCartListQuery, useGetCartByIdQuery, useLazyGetCartByIdQuery } = readCartApi;
