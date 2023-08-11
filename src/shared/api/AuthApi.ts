import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ILoginUserParams {
	password: string;
	email: string;
	scope?: string;
}

interface IAuthResponse {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	token_type: string;
}

const PROJECT_KEY = 'async-await-ecommerce-application';
const CLIENT_ID = 'placeholder';
const CLIENT_SECRET = 'placeholder';

const AUTH_SERVICE_URL = `https://auth.europe-west1.gcp.commercetools.com/oauth/${PROJECT_KEY}`;
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
		loginUser: build.mutation<IAuthResponse, ILoginUserParams>({
			query: ({ password, email, scope = DEFAULT_CUSTOMER_SCOPE }) => ({
				url: `/customers/token`,
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

		anonymousSession: build.mutation<IAuthResponse, string>({
			query: (scope) => ({
				url: `/anonymous/token`,
				method: 'POST',
				body: {},
				params: {
					grant_type: 'client_credentials',
					scope: scope || DEFAULT_CUSTOMER_SCOPE,
				},
			}),
		}),
	}),
});

export const { useLoginUserMutation, useAnonymousSessionMutation } = authApi;
