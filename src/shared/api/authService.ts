import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const AUTH_SERVICE_URL = 'https://auth.europe-west1.gcp.commercetools.com';
const CLIENT_ID = 'PLACEHOLDER';
const CLIENT_SECRET = 'PLACEHOLDER';

const authService = createApi({
	reducerPath: 'productAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: AUTH_SERVICE_URL,
		prepareHeaders: (headers) => {
			headers.set('Authorization', `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`);
		},
	}),
	endpoints: (build) => ({
		fetchAccessToken: build.mutation({
			query: () => ({
				url: '/oauth/token',
				method: 'POST',
				body: {},
				params: {
					grant_type: 'client_credentials',
				},
			}),
		}),
	}),
});

export default authService;
