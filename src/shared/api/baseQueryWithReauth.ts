import { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/dist/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import authQuery from './authQuery.ts';
import baseQuery from './baseQuery.ts';
import { userSlice } from '../../entities/user';
import { DEFAULT_CUSTOMER_SCOPE, PROJECT_KEY } from '../const';
import { ErrorCodeStatus } from '../types';

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions,
) => {
	const { loggedOut, updateAccessToken } = userSlice.actions;
	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === ErrorCodeStatus.UNAUTHORIZED) {
		const refreshResult = await authQuery(
			{
				url: `/oauth/${PROJECT_KEY}/anonymous/token`,
				method: 'POST',
				params: {
					grant_type: 'client_credentials',
					scope: DEFAULT_CUSTOMER_SCOPE,
				},
			},
			api,
			extraOptions,
		);

		if (
			refreshResult.data &&
			typeof refreshResult.data === 'object' &&
			'access_token' in refreshResult.data &&
			'refresh_token' in refreshResult.data
		) {
			api.dispatch(
				updateAccessToken({
					accessToken: refreshResult.data.access_token as string,
					refreshToken: refreshResult.data.refresh_token as string,
				}),
			);
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(loggedOut());
		}
	}

	return result;
};

export default baseQueryWithReauth;
