import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { AUTH_SERVICE_URL, CLIENT_ID, CLIENT_SECRET } from '../const';

const authQuery = fetchBaseQuery({
	baseUrl: AUTH_SERVICE_URL,
	prepareHeaders: (headers) => {
		headers.set('Authorization', `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`);
	},
});

export default authQuery;
