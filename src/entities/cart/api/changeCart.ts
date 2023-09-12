import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithReauth from '../../../shared/api/baseQueryWithReauth.ts';
import { CartResponse } from '../types/types.ts';

interface ICreateCartParams {
	currency: 'USD' | 'UAH' | 'EUR';
}

export const changeCartApi = createApi({
	reducerPath: 'changeCartApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		createCart: build.mutation<CartResponse, ICreateCartParams>({
			query: (body) => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/carts`,
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const { useCreateCartMutation } = changeCartApi;
