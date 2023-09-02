import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithReauth from '../../../shared/api/baseQueryWithReauth.ts';
import { PROJECT_KEY } from '../../../shared/const';
import { ProductResponse, ProductResult } from '../types/types.ts';

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getProductList: build.query<ProductResponse, number>({
			query: (limit = 5) => ({
				url: `/${PROJECT_KEY}/products`,
				params: {
					limit,
				},
			}),
		}),

		getProduct: build.query<ProductResult, string>({
			query: (id) => ({
				url: `/${PROJECT_KEY}/products/${id}`,
			}),
		}),
	}),
});

export const { useGetProductListQuery, useGetProductQuery } = productApi;
