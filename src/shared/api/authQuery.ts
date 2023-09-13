import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const authQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_AUTH_SERVICE_URL,
	prepareHeaders: (headers) => {
		headers.set(
			'Authorization',
			`Basic ${btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)}`,
		);
	},
});

export default authQuery;
