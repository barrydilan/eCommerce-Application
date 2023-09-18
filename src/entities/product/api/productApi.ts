import rootApi from '../../../shared/api/rootApi.ts';
import { ProductResult } from '../../../shared/types';
import prepareFilterQuery from '../../user/model/prepareFilterQuery.ts';
import { IGetProductListParams } from '../types/interfaces.ts';
import { CategoriesResponse, CategoryResult, ProductResponse } from '../types/types.ts';

export const productApi = rootApi.injectEndpoints({
	endpoints: (build) => ({
		getProductList: build.query<ProductResponse, IGetProductListParams>({
			query: ({ limit = 5, offset = 0, sort, filters, searchQuery, withTotal = true }) => ({
				url: prepareFilterQuery(filters),
				params: {
					limit,
					offset,
					...(sort && { sort: `${sort.field} ${sort.order}` }),
					...(searchQuery && { fuzzy: `true`, 'text.en': searchQuery }),
					withTotal,
				},
			}),
		}),

		getProduct: build.query<ProductResult, string>({
			query: (id) => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/product-projections/${id}`,
			}),
		}),

		getCategories: build.query<CategoriesResponse, number | void>({
			query: (limit = 20) => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/categories`,
				params: {
					limit,
				},
			}),
		}),

		getCategory: build.query<CategoryResult, string>({
			query: (key) => ({
				url: `/${import.meta.env.VITE_PROJECT_KEY}/categories/key=${key}`,
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
