import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ILoginUserParams {
	password: string;
	email: string;
	scope?: string;
}

interface ILoginUserResponse {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	token_type: string;
}

const AUTH_SERVICE_URL = 'https://auth.europe-west1.gcp.commercetools.com';
const CLIENT_ID = 'placeholder';
const CLIENT_SECRET = 'placeholder';
const PROJECT_KEY = 'async-await-ecommerce-application';

const DEFAULT_CUSTOMER_SCOPE = `view_published_products:${PROJECT_KEY} manage_my_orders:${PROJECT_KEY} manage_my_profile:${PROJECT_KEY}`;

export const authApi = createApi({
	reducerPath: 'productAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: AUTH_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Authorization', `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`);
		},
	}),
	endpoints: (build) => ({
		loginUser: build.mutation<ILoginUserResponse, ILoginUserParams>({
			query: ({ password, email, scope = DEFAULT_CUSTOMER_SCOPE }) => ({
				url: `/oauth/${PROJECT_KEY}/customers/token`,
				method: 'POST',
				body: {},
				params: {
					grant_type: 'password',
					username: email,
					password,
					scope,
				},
			}),
		}),
	}),
});

export const { useLoginUserMutation } = authApi;
