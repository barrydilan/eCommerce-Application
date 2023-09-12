import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithReauth from '../../../shared/api/baseQueryWithReauth.ts';
import CartListResponse from '../types/types.ts';

export const readCartApi = createApi({
	reducerPath: 'readCartApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getCartList: build.query<CartListResponse, void>({
			query: () => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/carts`,
				params: {
					withTotal: false,
				},
			}),
		}),
	}),
});

export const { useGetCartListQuery } = readCartApi;
