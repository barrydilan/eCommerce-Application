import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithReauth from '../../../shared/api/baseQueryWithReauth.ts';
import { PROJECT_KEY } from '../../../shared/const';
import prepareFilterQuery from '../../user/model/prepareFilterQuery.ts';
import IGetProductListParams from '../types/interfaces.ts';
import { CategoriesResponse, ProductResponse, ProductResult } from '../types/types.ts';

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getProductList: build.query<ProductResponse, IGetProductListParams>({
			query: ({ limit = 5, sort, filters }) => ({
				url: prepareFilterQuery(filters),
				params: {
					limit,
					sort: `${sort.field} ${sort.order}`,
				},
			}),
		}),

		getProduct: build.query<ProductResult, string>({
			query: (id) => ({
				url: `/${PROJECT_KEY}/product-projections/${id}`,
			}),
		}),

		getCategories: build.query<CategoriesResponse, number>({
			query: (limit) => ({
				url: `/${PROJECT_KEY}/categories`,
				params: {
					limit,
				},
			}),
		}),
	}),
});

export const { useGetProductListQuery, useLazyGetProductListQuery, useGetProductQuery, useGetCategoriesQuery } =
	productApi;
