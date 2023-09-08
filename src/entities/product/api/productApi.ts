import { createApi } from '@reduxjs/toolkit/query/react';

import bearerBaseQuery from '../../../shared/api/baseQuery.ts';
import { PROJECT_KEY } from '../../../shared/const';

type IProductResponse = Readonly<{
	limit: number;
	count: number;
	total: number;
	results: [
		{
			id: string;
			masterData: {
				current: {
					name: {
						'de-DE': string;
						'en-US': string;
						uk: string;
					};
					description: {
						'de-DE': string;
						'en-US': string;
						uk: string;
					};
				};
			};
		},
	];
}>;

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: bearerBaseQuery,
	endpoints: (build) => ({
		fetchProducts: build.query<IProductResponse[], number>({
			query: (limit = 5) => ({
				url: `/${PROJECT_KEY}/products`,
				params: {
					_limit: limit,
				},
			}),
		}),
	}),
});

export const { useFetchProductsQuery } = productApi;
