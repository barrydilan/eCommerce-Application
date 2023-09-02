import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithReauth from '../../../shared/api/baseQueryWithReauth.ts';
import { PROJECT_KEY } from '../../../shared/const';
import IGetProductListParams from '../types/interfaces.ts';
import { ProductResponse, ProductResult } from '../types/types.ts';

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getProductList: build.query<ProductResponse, IGetProductListParams>({
			query: ({ limit = 5, sort }) => ({
				url: `/${PROJECT_KEY}/product-projections/search`,
				params: {
					limit,
					sort: `${sort.field} ${sort.order}`,
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
