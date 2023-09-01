import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithReauth from '../../../shared/api/baseQueryWithReauth.ts';
import { PROJECT_KEY } from '../../../shared/const';

type ProductAttribute = Readonly<{
	name: string;
	value: string | number;
}>;

type ProductPrice = Readonly<{
	value: {
		type: string;
		fractionDigits: number;
		centAmount: number;
		currencyCode: string;
	};
	id: string;
}>;

type ProductImage = Readonly<{
	dimensions: {
		h: number;
		w: number;
	};
	url: string;
}>;

type ProductResult = Readonly<{
	id: string;
	masterData: {
		current: {
			name: {
				de: string;
				en: string;
				uk: string;
			};
			masterVariant: {
				id: number;
				attributes: ProductAttribute[];
				images: ProductImage[];
				prices: ProductPrice[];
			};
		};
	};
}>;

type ProductResponse = Readonly<{
	limit: number;
	count: number;
	total: number;
	results: ProductResult[];
}>;

export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getProductList: build.query<ProductResponse, number>({
			query: (limit = 5) => ({
				url: `/${PROJECT_KEY}/products`,
				params: {
					_limit: limit,
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
