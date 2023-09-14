import { rootApi } from '../../../shared/api';
import CartListResponse from '../types/types.ts';

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
		getCartById: build.query<CartListResponse, string>({
			query: (id) => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/carts/${id}`,
			}),
		}),
	}),
});

export const { useGetCartListQuery, useGetCartByIdQuery } = readCartApi;
