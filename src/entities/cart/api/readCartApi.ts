import { rootApi } from '../../../shared/api';
import { CartResponse } from '../../../shared/types/types.ts';
import { CartListResponse } from '../types/types.ts';

export const readCartApi = rootApi.injectEndpoints({
	endpoints: (build) => ({
		getCartList: build.query<CartListResponse, void>({
			query: () => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/carts`,
				params: {
					withTotal: false,
				},
			}),
		}),
		getCartById: build.query<CartResponse, string>({
			query: (id) => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/carts/${id}`,
			}),
		}),
	}),
});

export const { useGetCartListQuery, useGetCartByIdQuery } = readCartApi;
