import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ACCESS_TOKEN, API_HOST_URL, PROJECT_KEY } from '../../../shared/const';

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
	baseQuery: fetchBaseQuery({
		baseUrl: API_HOST_URL,
		prepareHeaders: (headers) => {
			headers.set('Authorization', `Bearer ${ACCESS_TOKEN}`);
		},
	}),
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
