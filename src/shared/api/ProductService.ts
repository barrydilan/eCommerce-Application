import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IProduct {
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
}

const ACCESS_TOKEN = 'PLACEHOLDER';
const PROJECT_KEY = 'PLACEHOLDER';
const PRODUCT_SERVICE_URL = `https://api.europe-west1.gcp.commercetools.com/${PROJECT_KEY}`;

const productService = createApi({
	reducerPath: 'productService',
	baseQuery: fetchBaseQuery({
		baseUrl: PRODUCT_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Authorization', `Bearer ${ACCESS_TOKEN}`);
		},
	}),
	endpoints: (build) => ({
		fetchProducts: build.query<IProduct[], number>({
			query: (limit = 5) => ({
				url: '/products',
				params: {
					_limit: limit,
				},
			}),
		}),
	}),
});

export default productService;
