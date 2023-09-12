import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { RootState } from '../../app/store';

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_HOST_URL,
	prepareHeaders: (headers, { getState }) => {
		const { accessToken } = (getState() as RootState).userReducer;
		headers.set('Authorization', `Bearer ${accessToken}`);
	},
});

export default baseQuery;
