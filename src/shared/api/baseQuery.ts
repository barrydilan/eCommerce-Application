import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { RootState } from '../../app/store';
import { API_HOST_URL } from '../const';

const baseQuery = fetchBaseQuery({
	baseUrl: API_HOST_URL,
	prepareHeaders: (headers, { getState }) => {
		const { accessToken } = (getState() as RootState).userReducer;
		headers.set('Authorization', `Bearer ${accessToken}`);
	},
});

export default baseQuery;
