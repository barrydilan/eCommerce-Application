import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithReauth from '../../../shared/api/baseQueryWithReauth.ts';
import { PROJECT_KEY } from '../../../shared/const';
import prepareFilterQuery from '../../user/model/prepareFilterQuery.ts';
import { IGetProductListParams } from '../types/interfaces.ts';
import { CategoriesResponse, CategoryResult, ProductResponse, ProductResult } from '../types/types.ts';

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getProductList: build.query<ProductResponse, IGetProductListParams>({
			query: ({ limit = 5, offset = 0, sort, filters, searchQuery }) => ({
				url: prepareFilterQuery(filters),
				params: {
					limit,
					offset,
					...(sort && { sort: `${sort.field} ${sort.order}` }),
					...(searchQuery && { fuzzy: `true`, 'text.en': searchQuery }),
				},
			}),
		}),

		getProduct: build.query<ProductResult, string>({
			query: (id) => ({
				url: `/${PROJECT_KEY}/product-projections/${id}`,
			}),
		}),

		getCategories: build.query<CategoriesResponse, number | void>({
			query: (limit = 20) => ({
				url: `/${PROJECT_KEY}/categories`,
				params: {
					limit,
				},
			}),
		}),

		getCategory: build.query<CategoryResult, string>({
			query: (key) => ({
				url: `/${PROJECT_KEY}/categories/key=${key}`,
			}),
		}),
	}),
});

export const {
	useGetProductListQuery,
	useLazyGetProductListQuery,
	useGetProductQuery,
	useGetCategoriesQuery,
	useGetCategoryQuery,
} = productApi;
