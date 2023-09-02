import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithReauth from '../../../shared/api/baseQueryWithReauth.ts';
import { PROJECT_KEY } from '../../../shared/const';
import prepareFilterQuery from '../../user/model/prepareFilterQuery.ts';
import IGetProductListParams from '../types/interfaces.ts';
import { ProductResponse, ProductResult } from '../types/types.ts';

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getProductList: build.query<ProductResponse, IGetProductListParams>({
			query: ({ limit = 5, sort, filter }) => ({
				url: prepareFilterQuery(filter),
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

export const { useGetProductListQuery, useLazyGetProductListQuery, useGetProductQuery } = productApi;
