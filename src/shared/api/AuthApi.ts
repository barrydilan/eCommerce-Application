import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { AUTH_SERVICE_URL, CLIENT_ID, CLIENT_SECRET, DEFAULT_CUSTOMER_SCOPE, PROJECT_KEY } from '../model';

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

		anonymousSession: build.mutation<IAuthResponse, string>({
			query: (scope) => ({
				url: `/oauth/${PROJECT_KEY}/anonymous/token`,
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
